import { NextResponse } from "next/server";
import { crmConfigured, crmFetch } from "@/lib/crm-proxy";
import { createCheckoutReceipt } from "@/lib/checkout-receipt";
import { PAYMENT_GATEWAYS, type PaymentGatewayId } from "@/lib/payment-config";
import { sendBacWaterUpsellEmail, shouldSendBacWaterUpsell } from "@/lib/bac-water-upsell-email";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MEMO_RE = /^[A-Z2-9]{4}$/;
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function text(value: unknown, max: number) {
  return typeof value === "string" && value.trim().length > 0 && value.trim().length <= max ? value.trim() : null;
}

// POST /api/checkout - proxies to the CRM's /api/store/checkout, which
// places a real order in the same database the CRM dashboard reads from.
// Body must match peptides-crm-app's CheckoutInput shape (lib/order-engine.ts):
// { items: [{slug, quantity}], paymentMethod, paymentMemo, billing: {...}, customerNote? }
export async function POST(req: Request) {
  if (!crmConfigured() || !process.env.CHECKOUT_RECEIPT_SECRET) {
    return NextResponse.json({ error: "Checkout is temporarily unavailable. No order was created." }, { status: 503 });
  }
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid checkout request." }, { status: 400 });
  }

  const input = body as Record<string, unknown>;
  const billing = input.billing && typeof input.billing === "object" ? (input.billing as Record<string, unknown>) : null;
  const paymentMethod = input.paymentMethod as PaymentGatewayId;
  const enabledGateways = new Set(PAYMENT_GATEWAYS.map((gateway) => gateway.id));
  const items = Array.isArray(input.items) ? input.items : [];
  const cleanItems = items.map((item) => {
    const line = item && typeof item === "object" ? (item as Record<string, unknown>) : {};
    return { slug: text(line.slug, 100), quantity: line.quantity };
  });
  const uniqueSlugs = new Set(cleanItems.map((item) => item.slug));
  const email = billing ? text(billing.email, 254) : null;
  const paymentMemo = text(input.paymentMemo, 4);

  if (
    items.length < 1 ||
    items.length > 50 ||
    uniqueSlugs.size !== items.length ||
    cleanItems.some((item) => !item.slug || !SLUG_RE.test(item.slug) || !Number.isInteger(item.quantity) || Number(item.quantity) < 1 || Number(item.quantity) > 100) ||
    !billing ||
    !email ||
    !EMAIL_RE.test(email) ||
    !text(billing.firstName, 80) ||
    !text(billing.lastName, 80) ||
    !text(billing.phone, 40) ||
    !text(billing.address1, 160) ||
    !text(billing.city, 100) ||
    !text(billing.state, 10) ||
    !text(billing.zip, 20) ||
    !["US", "CA"].includes(String(billing.country)) ||
    !enabledGateways.has(paymentMethod) ||
    !paymentMemo ||
    !MEMO_RE.test(paymentMemo) ||
    input.ruoAttested !== true
  ) {
    return NextResponse.json({ error: "Checkout details are incomplete or invalid. No order was created." }, { status: 400 });
  }

  const idempotencyKey = req.headers.get("idempotency-key")?.trim();
  if (!idempotencyKey || idempotencyKey.length < 16 || idempotencyKey.length > 100) {
    return NextResponse.json({ error: "Missing checkout request identifier. Please refresh and try again." }, { status: 400 });
  }

  const cleanBody = {
    items: cleanItems,
    paymentMethod,
    paymentMemo,
    couponCode: text(input.couponCode, 80) ?? undefined,
    affiliateRef: text(input.affiliateRef, 80) ?? undefined,
    customerNote: text(input.customerNote, 1000) ?? undefined,
    ruoAttested: true,
    ruoAttestedAt: text(input.ruoAttestedAt, 40) ?? new Date().toISOString(),
    customerEmail: email,
    billing: {
      firstName: text(billing.firstName, 80),
      lastName: text(billing.lastName, 80),
      email,
      phone: text(billing.phone, 40),
      address1: text(billing.address1, 160),
      city: text(billing.city, 100),
      state: text(billing.state, 10),
      zip: text(billing.zip, 20),
      country: billing.country,
    },
  };
  // The CRM sits behind this server, so it can only ever see this
  // server's own IP unless we forward the real one -- used for fraud
  // review (see Order.ipAddress in the CRM), not for anything that blocks
  // checkout.
  const ipAddress = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || undefined;
  const userAgent = req.headers.get("user-agent") || undefined;
  try {
    const { ok, status, data } = await crmFetch(
      "/api/store/checkout",
      { ...cleanBody, ipAddress, userAgent },
      { timeoutMs: 15_000, headers: { "idempotency-key": idempotencyKey } },
    );
    if (!ok) return NextResponse.json(data, { status });

    const result = data && typeof data === "object" ? (data as Record<string, unknown>) : {};
    const orderId = text(result.id, 100);
    const orderNumber = text(result.number, 100);
    const orderStatus = text(result.status, 40);
    const orderTotal = text(result.total, 30);
    if (!orderId || !orderNumber || !orderStatus || !orderTotal || !/^\d+\.\d{2}$/.test(orderTotal)) {
      console.error("[checkout] CRM returned an invalid success payload", { orderId, orderNumber, orderStatus });
      return NextResponse.json({ error: "The order could not be confirmed. Please contact support before retrying." }, { status: 502 });
    }

    const receipt = createCheckoutReceipt({
      orderId,
      orderNumber,
      status: orderStatus,
      total: orderTotal,
      currency: "USD",
      gateway: paymentMethod,
      memo: paymentMemo,
    });

    // This is deliberately post-order and best-effort: a mail-provider
    // outage must never turn a confirmed order into a checkout failure.
    // Resend's order-scoped idempotency key prevents duplicate sends when
    // the same checkout request is retried.
    if (shouldSendBacWaterUpsell(cleanItems)) {
      await sendBacWaterUpsellEmail({
        to: email,
        firstName: text(billing.firstName, 80)!,
        orderId,
      });
    }

    return NextResponse.json({ order: { number: orderNumber, status: orderStatus, total: orderTotal }, receipt });
  } catch (error) {
    console.error("[checkout] CRM request failed", error);
    return NextResponse.json({ error: "Checkout could not reach the order system. No order was confirmed; please try again." }, { status: 502 });
  }
}

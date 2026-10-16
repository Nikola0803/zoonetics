import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import type { PaymentGatewayId } from "@/lib/payment-config";

export interface CheckoutReceipt {
  version: 1;
  orderId: string;
  orderNumber: string;
  status: string;
  total: string;
  currency: "USD";
  gateway: PaymentGatewayId;
  memo: string;
  expiresAt: number;
}

function receiptSecret() {
  const dedicatedSecret = process.env.CHECKOUT_RECEIPT_SECRET?.trim();
  if (dedicatedSecret) {
    if (dedicatedSecret.length < 32) {
      throw new Error("CHECKOUT_RECEIPT_SECRET must be configured with at least 32 characters.");
    }
    return dedicatedSecret;
  }

  // Existing deployments already have the server-only CRM organization key.
  // Domain-separate it before using it to sign short-lived storefront receipts,
  // so checkout does not fail merely because a second secret was not added to
  // Vercel during rollout. A dedicated receipt secret still takes precedence.
  const crmSecret = process.env.CRM_ORG_API_KEY?.trim();
  if (!crmSecret) {
    throw new Error("Checkout receipt signing is not configured.");
  }
  return `zoonetics-checkout-receipt-v1:${crmSecret}`;
}

function signature(encodedPayload: string) {
  return createHmac("sha256", receiptSecret()).update(encodedPayload).digest("base64url");
}

export function createCheckoutReceipt(payload: Omit<CheckoutReceipt, "version" | "expiresAt">) {
  const receipt: CheckoutReceipt = {
    ...payload,
    version: 1,
    expiresAt: Date.now() + 2 * 60 * 60 * 1000,
  };
  const encodedPayload = Buffer.from(JSON.stringify(receipt)).toString("base64url");
  return `${encodedPayload}.${signature(encodedPayload)}`;
}

export function verifyCheckoutReceipt(token: string): CheckoutReceipt | null {
  const [encodedPayload, providedSignature, extra] = token.split(".");
  if (!encodedPayload || !providedSignature || extra) return null;

  let expectedSignature: string;
  try {
    expectedSignature = signature(encodedPayload);
  } catch {
    return null;
  }

  const expected = Buffer.from(expectedSignature);
  const provided = Buffer.from(providedSignature);
  if (expected.length !== provided.length || !timingSafeEqual(expected, provided)) return null;

  try {
    const receipt = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8")) as CheckoutReceipt;
    if (
      receipt.version !== 1 ||
      !receipt.orderId ||
      !receipt.orderNumber ||
      !receipt.status ||
      !/^\d+\.\d{2}$/.test(receipt.total) ||
      receipt.currency !== "USD" ||
      !["cashapp", "zelle", "venmo"].includes(receipt.gateway) ||
      !/^[A-Z2-9]{4}$/.test(receipt.memo) ||
      !Number.isFinite(receipt.expiresAt) ||
      receipt.expiresAt <= Date.now()
    ) {
      return null;
    }
    return receipt;
  } catch {
    return null;
  }
}

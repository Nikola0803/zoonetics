import { NextResponse } from "next/server";
import { crmConfigured, crmFetch } from "@/lib/crm-proxy";
import { TRADE_PLANS, TRADE_POLICY_VERSION } from "@/lib/trade/config";
import type { TradeApplication } from "@/lib/trade/types";

export const runtime = "nodejs";

const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const LIMIT = 5;

function rateLimited(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const key = forwarded || "local";
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || entry.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > LIMIT;
}

function validate(body: Partial<TradeApplication>) {
  const errors: string[] = [];
  const requiredStrings: (keyof TradeApplication)[] = ["legalName", "email", "phone", "country", "state", "businessName", "entityType", "resaleCertificateStatus", "monthlyCustomerVolume", "marketingApproach", "startedAt"];
  for (const key of requiredStrings) if (typeof body[key] !== "string" || !String(body[key]).trim()) errors.push(`${key} is required`);
  if (!/^\S+@\S+\.\S+$/.test(body.email || "")) errors.push("email is invalid");
  if (!Array.isArray(body.salesChannels) || !body.salesChannels.length) errors.push("salesChannels is required");
  if (!Array.isArray(body.customerTypes) || !body.customerTypes.length) errors.push("customerTypes is required");
  if (!TRADE_PLANS.some((plan) => plan.id === body.requestedPlan)) errors.push("requestedPlan is invalid");
  if (!body.attestResearchOnly || !body.attestPolicies || !body.consentContact) errors.push("all compliance acknowledgements are required");
  if (body.policyVersion !== TRADE_POLICY_VERSION) errors.push("policy version is out of date");
  return errors;
}

export async function POST(request: Request) {
  if (rateLimited(request)) return NextResponse.json({ error: "Too many attempts. Please wait before trying again." }, { status: 429 });
  const body = (await request.json().catch(() => null)) as Partial<TradeApplication> | null;
  if (!body) return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  const errors = validate(body);
  if (errors.length) return NextResponse.json({ error: "Please complete all required application fields.", fields: errors }, { status: 400 });

  const application = { ...body, status: "submitted", submittedAt: new Date().toISOString(), policyVersion: TRADE_POLICY_VERSION };
  if (!crmConfigured()) {
    if (process.env.NODE_ENV === "development") {
      return NextResponse.json({ applicationId: `preview-${crypto.randomUUID().slice(0, 8)}`, status: "submitted", demo: true }, { status: 202 });
    }
    return NextResponse.json({ error: "Partner applications are temporarily unavailable." }, { status: 503 });
  }

  const { ok, status, data } = await crmFetch("/api/store/trade/applications", application);
  return NextResponse.json(data, { status: ok ? 201 : status });
}

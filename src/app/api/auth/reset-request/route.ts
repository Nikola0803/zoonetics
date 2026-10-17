import { NextResponse } from "next/server";
import { crmConfigured, crmFetch } from "@/lib/crm-proxy";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!crmConfigured()) {
    return NextResponse.json({ ok: true }); // silently no-op in dev without CRM
  }
  const body = await req.json().catch(() => ({}));
  const { ok, status, data } = await crmFetch("/api/store/auth/reset-request", body);
  if (!ok) return NextResponse.json(data, { status });
  return NextResponse.json({ ok: true });
}

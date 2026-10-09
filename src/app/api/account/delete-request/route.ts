import { NextResponse } from "next/server";
import { crmConfigured, crmFetch } from "@/lib/crm-proxy";
import { bodyWithServerSession, unauthorized } from "@/lib/server-session";

export const runtime = "nodejs";

// POST /api/account/delete-request { token } -- proxies to the CRM's
// /api/store/account/delete-request. Mirrors /api/verification/request.
export async function POST(req: Request) {
  if (!crmConfigured()) {
    return NextResponse.json({ error: "Account removal isn't connected yet." }, { status: 503 });
  }
  const body = await bodyWithServerSession(req);
  if (!body) return unauthorized();
  const { ok, status, data } = await crmFetch("/api/store/account/delete-request", body);
  return NextResponse.json(data, { status: ok ? 200 : status });
}

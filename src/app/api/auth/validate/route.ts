import { NextResponse } from "next/server";
import { crmConfigured, crmFetch } from "@/lib/crm-proxy";
import { clearSessionCookie, getSessionToken } from "@/lib/server-session";

export const runtime = "nodejs";

// POST /api/auth/validate { token } -> { valid, email?, username?, user_id? }
export async function POST() {
  if (!crmConfigured()) {
    return NextResponse.json({ valid: false });
  }
  const token = await getSessionToken();
  if (!token) return NextResponse.json({ valid: false }, { status: 401 });
  const { ok, data } = await crmFetch("/api/auth/validate", { token });
  const response = NextResponse.json(data, { status: ok ? 200 : 401 });
  if (!ok || !(data && typeof data === "object" && (data as Record<string, unknown>).valid === true)) {
    clearSessionCookie(response);
  }
  return response;
}

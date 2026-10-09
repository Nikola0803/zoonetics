import { NextResponse } from "next/server";
import { crmConfigured, crmFetch } from "@/lib/crm-proxy";
import { setSessionCookie } from "@/lib/server-session";

export const runtime = "nodejs";

// POST /api/auth/login { email, password }
// Proxies to the CRM's /api/store/auth/login, scoped to the EVLV brand.
export async function POST(req: Request) {
  if (!crmConfigured()) {
    return NextResponse.json({ error: "Sign-in isn't configured yet. Set CRM_API_URL / CRM_ORG_API_KEY / CRM_STORE_DOMAIN." }, { status: 503 });
  }
  const body = await req.json().catch(() => ({}));
  const { ok, status, data } = await crmFetch("/api/store/auth/login", body);
  if (!ok) return NextResponse.json(data, { status });
  const result = data && typeof data === "object" ? (data as Record<string, unknown>) : {};
  if (typeof result.token !== "string" || !result.token) {
    return NextResponse.json({ error: "The account service returned an invalid session." }, { status: 502 });
  }
  const { token, ...publicUser } = result;
  const response = NextResponse.json(publicUser);
  setSessionCookie(response, token as string);
  return response;
}

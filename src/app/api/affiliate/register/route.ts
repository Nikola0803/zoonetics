import { NextResponse } from "next/server";
import { crmConfigured, crmFetch } from "@/lib/crm-proxy";
import { getSessionToken } from "@/lib/server-session";

export const runtime = "nodejs";

// Public creator applications are accepted by name and email. When the visitor
// is already signed in, the server-side session token is included so the CRM
// can link the application to their existing contact and order history.
export async function POST(req: Request) {
  if (!crmConfigured()) {
    return NextResponse.json({ error: "Affiliate signup isn't connected yet." }, { status: 503 });
  }
  const submitted = await req.json().catch(() => ({}));
  const token = await getSessionToken();
  const body = { ...(submitted && typeof submitted === "object" ? submitted : {}), ...(token ? { token } : {}) };
  const { ok, status, data } = await crmFetch("/api/store/affiliate/register", body);
  return NextResponse.json(data, { status: ok ? 200 : status });
}

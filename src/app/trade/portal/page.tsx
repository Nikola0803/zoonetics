import { redirect } from "next/navigation";

/**
 * The old route rendered a public, hard-coded portal preview. Partner data
 * must always come from the authenticated customer account and CRM, so keep
 * this legacy URL only as a redirect into the real per-user wholesale panel.
 */
export default function TradePortalPage() {
  redirect("/account?tab=wholesale");
}

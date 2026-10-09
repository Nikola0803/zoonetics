import "server-only";

import { createHash } from "node:crypto";

const BAC_WATER_SLUG = "bacteriostatic-water-30ml";
const DEFAULT_STORE_URL = "https://evlvpeptides.com";

type CheckoutItem = { slug: string | null };

type BacWaterUpsellInput = {
  to: string;
  firstName: string;
  orderId: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function storeUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_STORE_URL).replace(/\/$/, "");
}

export function shouldSendBacWaterUpsell(items: CheckoutItem[]) {
  return items.length > 0 && !items.some((item) => item.slug === BAC_WATER_SLUG);
}

export async function sendBacWaterUpsellEmail({ to, firstName, orderId }: BacWaterUpsellInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) {
    console.warn("[bac-water-upsell] skipped: RESEND_API_KEY or RESEND_FROM_EMAIL is not configured");
    return { ok: false as const, reason: "not_configured" as const };
  }

  const origin = storeUrl();
  const productUrl = `${origin}/shop/${BAC_WATER_SLUG}?utm_source=transactional_email&utm_medium=email&utm_campaign=bac_water_post_purchase&utm_content=cta`;
  const imageUrl = `${origin}/images/products/evlv-bacteriostatic-water-30ml.png`;
  const logoUrl = `${origin}/logo/evlv-logo-light.png`;
  const safeName = escapeHtml(firstName);

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="x-apple-disable-message-reformatting">
    <title>One research supply to check</title>
  </head>
  <body style="margin:0;padding:0;background:#E7E3DA;color:#0E1113;font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">Bacteriostatic Water was not included in your EVLV order.</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#E7E3DA;">
      <tr>
        <td align="center" style="padding:32px 14px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:620px;background:#F7F4EF;border-radius:14px;overflow:hidden;">
            <tr>
              <td align="center" style="background:#0E1113;padding:26px 32px;">
                <img src="${logoUrl}" width="132" alt="EVLV" style="display:block;width:132px;max-width:100%;height:auto;border:0;">
              </td>
            </tr>
            <tr>
              <td style="padding:42px 42px 18px;">
                <p style="margin:0 0 12px;color:#B8875A;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">One quick order check</p>
                <h1 style="margin:0;color:#0E1113;font-family:Georgia,'Times New Roman',serif;font-size:36px;line-height:1.12;font-weight:400;">Complete your research setup.</h1>
                <p style="margin:22px 0 0;color:#4D5551;font-size:16px;line-height:1.65;">Hi ${safeName}, your EVLV order is confirmed. Bacteriostatic Water wasn&rsquo;t included in your checkout.</p>
                <p style="margin:12px 0 0;color:#4D5551;font-size:16px;line-height:1.65;">If your planned laboratory workflow requires it and you don&rsquo;t already have it on hand, you can add it below. Already stocked? You&rsquo;re all set&mdash;no action needed.</p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:8px 42px 10px;">
                <a href="${productUrl}" style="text-decoration:none;">
                  <img src="${imageUrl}" width="330" alt="EVLV Bacteriostatic Water 30 mL" style="display:block;width:330px;max-width:100%;height:auto;border:0;border-radius:12px;">
                </a>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:12px 42px 44px;">
                <h2 style="margin:0 0 5px;color:#0E1113;font-size:19px;line-height:1.3;">Bacteriostatic Water</h2>
                <p style="margin:0 0 24px;color:#6B756F;font-size:14px;">30 mL &middot; Research supply</p>
                <a href="${productUrl}" style="display:inline-block;background:#2F5D50;color:#FFFFFF;text-decoration:none;padding:15px 28px;border-radius:8px;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">View Bacteriostatic Water</a>
              </td>
            </tr>
            <tr>
              <td style="background:#0E1113;padding:26px 34px;text-align:center;">
                <p style="margin:0;color:#F1EEE7;font-size:11px;line-height:1.6;letter-spacing:.3px;">For laboratory research use only. Not for human or veterinary use.</p>
                <p style="margin:8px 0 0;color:#9AA39D;font-size:10px;line-height:1.5;">EVLV is operated by Warrior Distributions LLC.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = `Hi ${firstName},

Your EVLV order is confirmed. Bacteriostatic Water wasn't included in your checkout.

If your planned laboratory workflow requires it and you don't already have it on hand, view it here:
${productUrl}

Already stocked? You're all set—no action needed.

For laboratory research use only. Not for human or veterinary use.
EVLV is operated by Warrior Distributions LLC.`;

  // Resend only needs a stable value for retry deduplication, not our
  // internal order identifier. Keep that identifier inside EVLV.
  const orderFingerprint = createHash("sha256").update(orderId).digest("hex").slice(0, 32);

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `bac-water-upsell/${orderFingerprint}`,
      },
      body: JSON.stringify({
        from,
        to,
        subject: "One research supply to check",
        html,
        text,
      }),
      signal: AbortSignal.timeout(8_000),
    });

    if (response.ok) return { ok: true as const };
    console.error("[bac-water-upsell] Resend rejected the email", response.status, await response.text());
    return { ok: false as const, reason: "provider_error" as const };
  } catch (error) {
    console.error("[bac-water-upsell] send failed", error);
    return { ok: false as const, reason: "network_error" as const };
  }
}

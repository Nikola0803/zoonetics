"use client";

import { useEffect } from "react";
import { captureReferralFromUrl } from "@/lib/referral";
import { trackEvent } from "@/lib/pixel";

/** Mounted once in the root layout - silently captures ?ref=CODE from any
 * landing URL into localStorage so it survives to registration/checkout. */
export function ReferralCapture() {
  useEffect(() => {
    captureReferralFromUrl();
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    const source = params.get("utm_source");
    if (!ref && !source) return;
    let attempts = 0;
    const record = () => {
      attempts += 1;
      if (window.cc) {
        trackEvent("creator_landing", { properties: {
          referralCode: ref?.trim().toUpperCase() || undefined,
          source: source || "affiliate",
          medium: params.get("utm_medium") || undefined,
          campaign: params.get("utm_campaign") || undefined,
          landingPath: window.location.pathname,
        } });
        return;
      }
      if (attempts < 20) window.setTimeout(record, 250);
    };
    record();
  }, []);
  return null;
}

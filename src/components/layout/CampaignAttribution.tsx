"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/pixel";

const GYM_CAMPAIGN = "gym_banner";
const DEDUPE_KEY = "evlv_campaign_gym_banner_scan";

/** Records an explicit internal event for the trackable QR printed on gym banners. */
export function CampaignAttribution() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("utm_campaign") !== GYM_CAMPAIGN) return;
    if (sessionStorage.getItem(DEDUPE_KEY)) return;

    let attempts = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const record = () => {
      attempts += 1;
      if (window.cc) {
        trackEvent("gym_banner_scan", {
          properties: {
            source: params.get("utm_source") || "gym",
            medium: params.get("utm_medium") || "qr",
            campaign: GYM_CAMPAIGN,
            landingPage: `${window.location.pathname}${window.location.search}`,
          },
        });
        sessionStorage.setItem(DEDUPE_KEY, "1");
        return;
      }
      if (attempts < 20) timer = setTimeout(record, 250);
    };

    record();
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  return null;
}

"use client";

import { trackEvent } from "@/lib/pixel";

export type TradeAnalyticsEvent =
  | "trade_page_view"
  | "trade_plan_view"
  | "trade_plan_selected"
  | "trade_calculator_started"
  | "trade_calculator_completed"
  | "trade_apply_started"
  | "trade_apply_step_completed"
  | "trade_application_submitted"
  | "trade_faq_opened"
  | "trade_policy_viewed";

export function trackTradeEvent(event: TradeAnalyticsEvent, properties?: Record<string, string | number | boolean>) {
  trackEvent(event, properties ? { properties } : undefined);
}

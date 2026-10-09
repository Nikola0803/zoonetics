export type TradePlanId = "launch" | "growth" | "pro" | "elite";

export interface TradePlan {
  id: TradePlanId;
  name: string;
  openingOrder: number;
  discountRate: number;
  retailValue: number;
  illustrativeGrossProfit: number;
  useCase: string;
}

export const TRADE_PLANS: readonly TradePlan[] = [
  { id: "launch", name: "Launch", openingOrder: 500, discountRate: 0.25, retailValue: 667, illustrativeGrossProfit: 167, useCase: "Validate a small research-customer channel." },
  { id: "growth", name: "Growth", openingOrder: 1500, discountRate: 0.3, retailValue: 2143, illustrativeGrossProfit: 643, useCase: "Establish a broader initial catalog." },
  { id: "pro", name: "Pro", openingOrder: 3000, discountRate: 0.35, retailValue: 4615, illustrativeGrossProfit: 1615, useCase: "Support an active reseller operation." },
  { id: "elite", name: "Elite", openingOrder: 7500, discountRate: 0.4, retailValue: 12500, illustrativeGrossProfit: 5000, useCase: "High-volume approved reseller access." },
] as const;

export const TRADE_POLICY_VERSION = "2026-10-02";

export function formatTradeCurrency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

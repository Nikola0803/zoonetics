import type { TradePlanId } from "./config";

export type TradeApplicationStatus =
  | "started"
  | "submitted"
  | "under_review"
  | "needs_information"
  | "approved"
  | "declined"
  | "suspended";

export interface TradeApplication {
  legalName: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  businessName: string;
  entityType: string;
  taxIdentifier: string;
  resaleCertificateStatus: string;
  website: string;
  socialProfiles: string;
  salesChannels: string[];
  monthlyCustomerVolume: string;
  customerTypes: string[];
  requestedPlan: TradePlanId;
  marketingApproach: string;
  attestResearchOnly: boolean;
  attestPolicies: boolean;
  consentContact: boolean;
  policyVersion: string;
  source: string;
  utm: Record<string, string>;
  startedAt: string;
  submittedAt?: string;
}

export interface CalculatorInputs {
  wholesaleSpend: number;
  discountRate: number;
  averageRetailPrice: number;
  sellThroughRate: number;
  shippingCost: number;
  processingRate: number;
  otherCosts: number;
}

export interface CalculatorResults {
  retailValue: number;
  grossSales: number;
  costOfSoldInventory: number;
  processingFees: number;
  estimatedProfit: number;
  grossMargin: number;
  breakEvenSales: number;
  breakEvenUnits: number;
  unsoldInventoryValue: number;
}

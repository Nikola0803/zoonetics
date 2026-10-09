/**
 * Manual payment gateway handles, shown at checkout once a customer picks
 * CashApp / Zelle / Venmo. Matches the peptides-crm-app Order schema, which
 * models paymentMethod as "zelle" | "cashapp" | "venmo" with a paymentMemo
 * field, so this checkout flow lines up with what the real CRM expects.
 *
 * Left blank until real handles are set. Checkout gracefully falls back to
 * "we'll email you the details" when a handle is empty, it never invents one.
 */
export type PaymentGatewayId = "cashapp" | "zelle" | "venmo";

/**
 * Payment destinations are intentionally environment-only. A missing handle
 * disables that method; checkout never substitutes a demo or legacy account.
 */
export const PAYMENT_HANDLES: Record<PaymentGatewayId, string> = {
  cashapp: process.env.NEXT_PUBLIC_CASHAPP_HANDLE?.trim() ?? "",
  zelle: process.env.NEXT_PUBLIC_ZELLE_HANDLE?.trim() ?? "",
  venmo: process.env.NEXT_PUBLIC_VENMO_HANDLE?.trim() ?? "",
};

export function getEffectiveHandle(gateway: PaymentGatewayId): { handle: string; isDemo: boolean } {
  return { handle: PAYMENT_HANDLES[gateway], isDemo: false };
}

/**
 * Venmo and Cash App both support real "pay this exact amount" deep links.
 * Zelle has no equivalent, it's direct bank-to-bank with no public payment-
 * request URL scheme, so there's nothing to build a working link/QR to; the
 * best we can honestly offer is a QR that encodes the handle/amount/memo as
 * plain text, to save re-typing, not a one-tap payment.
 */
export function buildQuickPayTarget(
  gateway: PaymentGatewayId,
  amount: number,
  memo: string
): { kind: "payLink"; url: string } | { kind: "infoText"; text: string } {
  const { handle } = getEffectiveHandle(gateway);
  const amountStr = amount.toFixed(2);

  if (gateway === "venmo") {
    const clean = handle.replace(/^@/, "");
    return { kind: "payLink", url: `https://venmo.com/${clean}?txn=pay&amount=${amountStr}&note=${encodeURIComponent(memo)}` };
  }
  if (gateway === "cashapp") {
    const clean = handle.startsWith("$") ? handle.slice(1) : handle;
    return { kind: "payLink", url: `https://cash.app/$${clean}/${amountStr}` };
  }
  return { kind: "infoText", text: `Zelle\nTo: ${handle}\nAmount: $${amountStr}\nMemo: ${memo}` };
}

const ALL_PAYMENT_GATEWAYS: {
  id: PaymentGatewayId;
  label: string;
  icon: string;
  handle: string;
  handleNote: string;
}[] = [
  {
    id: "cashapp",
    label: "Cash App",
    icon: "ri-money-dollar-circle-line",
    handle: PAYMENT_HANDLES.cashapp,
    handleNote: "Use the verified Warrior Distributions business destination shown above.",
  },
  {
    id: "zelle",
    label: "Zelle",
    icon: "ri-bank-line",
    handle: PAYMENT_HANDLES.zelle,
    handleNote: "Confirm the recipient name is Warrior Distributions before sending.",
  },
  {
    id: "venmo",
    label: "Venmo",
    icon: "ri-smartphone-line",
    handle: PAYMENT_HANDLES.venmo,
    handleNote: "Use the verified Warrior Distributions business destination shown above.",
  },
];

export const PAYMENT_GATEWAYS = ALL_PAYMENT_GATEWAYS.filter((gateway) => Boolean(gateway.handle));

export function getPaymentGateway(id: PaymentGatewayId) {
  return PAYMENT_GATEWAYS.find((gateway) => gateway.id === id) ?? null;
}

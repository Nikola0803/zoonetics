import type { Metadata } from "next";
import { Suspense } from "react";
import { TradeApplicationForm } from "./TradeApplicationForm";

export const metadata: Metadata = {
  title: "Apply for EVLV Trade",
  description: "Apply for approved independent reseller access to EVLV Trade.",
  alternates: { canonical: "/trade/apply" },
  robots: { index: false, follow: false },
};

export default function TradeApplyPage() {
  return <div className="min-h-screen bg-ivory-soft"><Suspense fallback={<div className="container-altr py-24 text-sm text-charcoal/50">Preparing your application…</div>}><TradeApplicationForm /></Suspense></div>;
}

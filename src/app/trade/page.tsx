import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TRADE_PLANS, formatTradeCurrency } from "@/lib/trade/config";
import { TradeCalculator } from "./TradeCalculator";
import { PolicyViewLink, TradeFaq, TradeLandingEvents } from "./TradeLandingClient";

export const metadata: Metadata = {
  title: "EVLV Trade - Wholesale Research Supply",
  description: "Apply for wholesale access, documentation, and business tools to build an independent research-supply operation.",
  alternates: { canonical: "/trade" },
  openGraph: { title: "EVLV Trade - Wholesale Research Supply", description: "Wholesale access, batch documentation, and business tools for qualified independent research-supply resellers.", url: "/trade" },
};

const steps = [
  ["01", "Apply and qualify", "Tell us about your organization, customer base, channels, and operating standards."],
  ["02", "Choose a starting plan", "Select an opening level that fits your channel. Approval does not require recurring purchases."],
  ["03", "Build eligible inventory", "Order from a stock-aware Partner Selection List with product-specific pricing and quantities."],
  ["04", "Operate independently", "Sell through approved research channels and retain the margin from your own retail activity."],
];

const toolkit = [
  ["Margin intelligence", "Gated product-level visibility into suggested retail, wholesale cost, dollar profit, and margin."],
  ["Batch documentation", "COAs, lot references, and traceability records organized for research-customer diligence."],
  ["Approved content", "Research-education assets, product imagery, disclosures, and practical brand guidance."],
  ["Inventory planning", "Order-building, availability signals, and reorder tools designed around actual sell-through."],
  ["Wholesale support", "A direct support channel for catalog, documentation, fulfillment, and policy questions."],
  ["Partner releases", "Access to eligible releases, merchandise, and display materials when available."],
];

const faqs = [
  { question: "How do resellers earn?", answer: "Approved resellers purchase eligible inventory at wholesale prices and earn through the margin on their own retail sales. EVLV Trade does not pay for recruiting other resellers, and there are no downlines or uplines." },
  { question: "Does every product receive the plan discount?", answer: "No. The Partner Selection List can include product-specific costs, minimum quantities, stock limits, and exclusions. Your gated price chart is the controlling source for eligible inventory." },
  { question: "Is income guaranteed?", answer: "No. Demand, pricing, product mix, fees, returns, taxes, marketing costs, and unsold inventory all affect results. The calculator and plan examples are planning estimates only." },
  { question: "Do I need to place a recurring order?", answer: "There is no mandatory recurring purchase to remain eligible. Minimums may apply to individual orders or SKUs, and access remains subject to the reseller agreement and responsible-marketing policies." },
  { question: "Can I advertise products for personal use?", answer: "No. EVLV research materials may not be marketed for human or veterinary use, dosing, treatment, disease, weight loss, bodybuilding, anti-aging, or other personal outcomes. RUO language must remain consistent with the surrounding message." },
  { question: "What happens after I apply?", answer: "EVLV reviews the business, channels, customer profile, geography, documentation readiness, and compliance acknowledgements. The team may request additional information before making a decision. Submission is not approval." },
];

export default function TradePage() {
  return (
    <div className="bg-ivory">
      <TradeLandingEvents />
      <section className="overflow-hidden bg-sage-deep text-white">
        <div className="container-altr grid min-h-[680px] items-stretch gap-12 py-12 lg:grid-cols-[1.15fr_.85fr] lg:py-20">
          <div className="flex flex-col justify-center">
            <p className="mb-8 text-xs font-semibold uppercase tracking-[0.24em] text-white/55">EVLV Trade · Independent wholesale</p>
            <h1 className="max-w-4xl font-display text-5xl font-medium leading-[.98] tracking-[-.04em] sm:text-6xl lg:text-7xl">
              Build your independent research-supply business.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/72">
              Wholesale access, batch documentation, business tools, and a premium catalog, backed by EVLV.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="#plans" className="rounded-md bg-white px-7 py-3.5 text-center text-sm font-semibold text-charcoal transition hover:bg-ivory-soft">Explore the plans</Link>
              <Link href="/trade/apply" className="rounded-md border border-white/35 px-7 py-3.5 text-center text-sm font-semibold text-white transition hover:border-white hover:bg-white/10">Apply for access</Link>
            </div>
            <div className="mt-12 grid max-w-2xl grid-cols-3 border-y border-white/15 py-5 text-sm text-white/65">
              <span>Own resale margin</span><span>Batch-level records</span><span>No recruitment pay</span>
            </div>
          </div>
          <div className="relative hidden min-h-[560px] overflow-hidden border-l border-white/15 lg:block">
            <Image src="/images/science/coa-vial-banner.png" alt="EVLV research packaging and documentation" fill priority className="object-cover opacity-80 mix-blend-luminosity" sizes="40vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-sage-deep via-transparent to-sage-deep/20" />
            <div className="absolute bottom-8 left-8 right-0 border border-white/20 bg-charcoal/70 p-6 backdrop-blur">
              <p className="text-xs uppercase tracking-[.2em] text-white/50">The EVLV Trade system</p>
              <p className="mt-3 text-xl font-medium">Inventory economics you can inspect before you order.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-stone bg-ivory-soft">
        <div className="container-altr grid gap-px bg-stone lg:grid-cols-4">
          {steps.map(([number, title, body]) => <article key={number} className="bg-ivory-soft px-6 py-10"><p className="text-xs font-semibold tracking-[.2em] text-sage-deep">{number}</p><h2 className="mt-6 font-display text-xl font-medium">{title}</h2><p className="mt-3 text-sm leading-6 text-charcoal/60">{body}</p></article>)}
        </div>
      </section>

      <section id="plans" className="container-altr py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[.22em] text-sage-deep">Starting levels</p>
          <h2 className="mt-4 font-display text-4xl font-medium tracking-tight text-charcoal">Choose a level that matches your channel.</h2>
        </div>
        <div className="mt-10 grid gap-px overflow-hidden rounded-md border border-stone bg-stone md:grid-cols-2 xl:grid-cols-4">
          {TRADE_PLANS.map((plan) => (
            <article key={plan.id} className="bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[.2em] text-sage-deep">{plan.name}</p>
              <p className="mt-5 font-display text-4xl font-medium text-charcoal">{formatTradeCurrency(plan.openingOrder)}</p>
              <p className="mt-1 text-sm text-charcoal/55">opening order · {Math.round(plan.discountRate * 100)}% from suggested retail</p>
              <dl className="mt-8 space-y-3 border-t border-stone pt-5 text-sm">
                <div className="flex justify-between"><dt className="text-charcoal/55">Retail value</dt><dd>{formatTradeCurrency(plan.retailValue)}</dd></div>
                <div className="flex justify-between"><dt className="text-charcoal/55">Illustrative gross profit</dt><dd>{formatTradeCurrency(plan.illustrativeGrossProfit)}</dd></div>
              </dl>
              <p className="mt-6 text-sm leading-6 text-charcoal/65">{plan.useCase}</p>
              <Link href={`/trade/apply?plan=${plan.id}`} className="mt-7 inline-flex text-sm font-semibold text-sage-deep underline decoration-sage-deep/30 underline-offset-4 hover:decoration-sage-deep">Choose {plan.name}</Link>
            </article>
          ))}
        </div>
        <p className="mt-5 max-w-5xl text-xs leading-5 text-charcoal/50">Illustrative estimates assume complete sell-through at suggested retail before shipping, payment fees, taxes, returns, discounts, marketing costs, and unsold inventory. Eligibility, SKU pricing, and minimum quantities may vary.</p>
      </section>

      <TradeCalculator />

      <section className="container-altr py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-16">
          <div><p className="text-xs font-semibold uppercase tracking-[.22em] text-sage-deep">Partner operating system</p><h2 className="mt-4 font-display text-4xl font-medium tracking-tight">Infrastructure for a credible research-supply business.</h2><p className="mt-5 text-base leading-7 text-charcoal/60">You control your operation. EVLV supplies the catalog framework, documentation, and tools that support responsible resale.</p></div>
          <div className="grid gap-px overflow-hidden rounded-md border border-stone bg-stone sm:grid-cols-2">{toolkit.map(([title, body], index) => <article key={title} className="bg-white p-6"><span className="text-xs font-semibold text-sage-deep">0{index + 1}</span><h3 className="mt-5 font-display text-xl font-medium">{title}</h3><p className="mt-3 text-sm leading-6 text-charcoal/60">{body}</p></article>)}</div>
        </div>
      </section>

      <section className="bg-sage-deep py-20 text-white md:py-28">
        <div className="container-altr grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="rounded-md border border-white/15 p-7 sm:p-9"><p className="text-xs font-semibold uppercase tracking-[.2em] text-white/45">A strong fit</p><h2 className="mt-4 font-display text-3xl font-medium">Built for operators with a real channel.</h2><ul className="mt-7 space-y-4 text-sm leading-6 text-white/68">{["Research suppliers serving qualified organizations", "Established B2B or specialty-commerce operators", "Businesses prepared to maintain documentation", "Teams able to market within approved claims and disclosures"].map((item) => <li key={item} className="flex gap-3"><span className="text-white">✓</span>{item}</li>)}</ul></div>
          <div className="rounded-md border border-white/15 p-7 sm:p-9"><p className="text-xs font-semibold uppercase tracking-[.2em] text-white/45">Not designed for</p><h2 className="mt-4 font-display text-3xl font-medium">No recruitment economics. No personal-use promotion.</h2><ul className="mt-7 space-y-4 text-sm leading-6 text-white/68">{["Applicants seeking commissions for recruiting others", "Personal-consumption or outcome-based selling", "Guaranteed-income or fabricated success-story marketing", "Channels that cannot maintain research-only positioning"].map((item) => <li key={item} className="flex gap-3"><span className="text-white/50">·</span>{item}</li>)}</ul></div>
        </div>
      </section>

      <section className="container-altr py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative min-h-[440px] overflow-hidden rounded-md bg-stone"><Image src="/images/science/coa-vial-banner.png" alt="EVLV batch documentation and research packaging" fill className="object-cover" sizes="(min-width:1024px) 45vw, 100vw" /></div>
          <div><p className="text-xs font-semibold uppercase tracking-[.22em] text-sage-deep">Traceability by design</p><h2 className="mt-4 font-display text-4xl font-medium tracking-tight">Documentation travels with the catalog.</h2><p className="mt-5 text-base leading-7 text-charcoal/65">Approved partners receive batch and COA access for eligible inventory, along with product references and imagery built for research-market diligence.</p><dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-stone bg-stone"><div className="bg-white p-5"><dt className="text-xs text-charcoal/45">Catalog basis</dt><dd className="mt-2 font-medium">Partner Selection List</dd></div><div className="bg-white p-5"><dt className="text-xs text-charcoal/45">Availability</dt><dd className="mt-2 font-medium">Stock-aware</dd></div><div className="bg-white p-5"><dt className="text-xs text-charcoal/45">Pricing</dt><dd className="mt-2 font-medium">SKU-specific</dd></div><div className="bg-white p-5"><dt className="text-xs text-charcoal/45">Records</dt><dd className="mt-2 font-medium">Lot-linked</dd></div></dl></div>
        </div>
      </section>

      <section className="border-y border-stone bg-white py-20 md:py-28">
        <div className="container-altr grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20"><div><p className="text-xs font-semibold uppercase tracking-[.22em] text-sage-deep">Application review</p><h2 className="mt-4 font-display text-4xl font-medium tracking-tight">A clear gate protects every serious operator.</h2><p className="mt-5 text-base leading-7 text-charcoal/60">We assess business identity, channels, customer profile, geography, documentation readiness, and marketing approach. Submission does not guarantee approval.</p><Link href="/trade/apply" className="mt-7 inline-flex rounded-md bg-charcoal px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-sage-deep">Start the application</Link></div><ol className="space-y-3">{[["Submitted", "A complete application enters the review queue."], ["Under review", "EVLV checks channel and compliance fit."], ["Needs information", "The team may ask for documents or clarification."], ["Approved", "Access is provisioned under the current agreement and price chart."]].map(([title, body], index) => <li key={title} className="grid grid-cols-[44px_1fr] gap-4 rounded-md border border-stone p-5"><span className="font-display text-xl text-sage-deep">{index + 1}</span><div><p className="font-medium">{title}</p><p className="mt-1 text-sm text-charcoal/55">{body}</p></div></li>)}</ol></div>
      </section>

      <section id="responsible-marketing" className="container-altr py-20 md:py-28">
        <div className="rounded-md bg-charcoal p-7 text-white sm:p-10 lg:p-14"><div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-16"><div><p className="text-xs font-semibold uppercase tracking-[.22em] text-white/45">Responsible marketing standard</p><h2 className="mt-4 font-display text-4xl font-medium tracking-tight">Research-only means the whole message.</h2><p className="mt-5 text-sm leading-6 text-white/58">A label cannot correct surrounding claims that imply personal consumption or health outcomes.</p></div><div className="grid gap-4 sm:grid-cols-2">{["No human or veterinary use claims", "No dosing, treatment, or disease claims", "No weight-loss, anti-aging, or bodybuilding claims", "No personal-consumption testimonials", "Disclose material brand relationships", "Repeated violations may suspend access"].map((item) => <div key={item} className="border-l border-white/20 pl-4 text-sm leading-6 text-white/70">{item}</div>)}</div></div><div className="mt-10 border-t border-white/15 pt-6 text-xs leading-5 text-white/45">Final agreements, pricing policies, earnings representations, tax treatment, and distribution controls require review by qualified U.S. counsel before production launch. This page is not legal advice.</div></div>
      </section>

      <section className="bg-ivory-soft py-20 md:py-28"><div className="container-altr grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-16"><div><p className="text-xs font-semibold uppercase tracking-[.22em] text-sage-deep">Questions, answered</p><h2 className="mt-4 font-display text-4xl font-medium tracking-tight">Evaluate the model without the hype.</h2><div className="mt-6"><PolicyViewLink /></div></div><TradeFaq items={faqs} /></div></section>

      <section className="bg-sage-deep py-20 text-center text-white md:py-28"><div className="container-altr"><p className="text-xs font-semibold uppercase tracking-[.24em] text-white/45">EVLV Trade</p><h2 className="mx-auto mt-5 max-w-4xl font-display text-4xl font-medium tracking-tight md:text-6xl">Build a research-supply operation you can stand behind.</h2><p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/62">Apply for wholesale access, documentation, and operating tools built around transparent resale economics.</p><div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/trade/apply" className="rounded-md bg-white px-7 py-3.5 text-sm font-semibold text-charcoal transition hover:bg-ivory-soft">Apply for access</Link><Link href="/account?tab=wholesale" className="rounded-md border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white">Partner sign in</Link></div></div></section>
    </div>
  );
}

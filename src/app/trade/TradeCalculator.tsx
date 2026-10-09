"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { calculateTradeEconomics } from "@/lib/trade/calculator";
import { TRADE_PLANS, formatTradeCurrency, type TradePlanId } from "@/lib/trade/config";
import { trackTradeEvent } from "@/lib/trade/analytics";

const money = (value: number) => formatTradeCurrency(Number.isFinite(value) ? value : 0);

export function TradeCalculator() {
  const [planId, setPlanId] = useState<TradePlanId>("growth");
  const plan = TRADE_PLANS.find((item) => item.id === planId) ?? TRADE_PLANS[1];
  const [spend, setSpend] = useState(plan.openingOrder);
  const [discount, setDiscount] = useState(plan.discountRate * 100);
  const [averageRetailPrice, setAverageRetailPrice] = useState(95);
  const [sellThrough, setSellThrough] = useState(75);
  const [shipping, setShipping] = useState(75);
  const [processing, setProcessing] = useState(2.9);
  const [otherCosts, setOtherCosts] = useState(100);
  const started = useRef(false);

  const results = useMemo(() => calculateTradeEconomics({
    wholesaleSpend: spend,
    discountRate: discount / 100,
    averageRetailPrice,
    sellThroughRate: sellThrough / 100,
    shippingCost: shipping,
    processingRate: processing / 100,
    otherCosts,
  }), [spend, discount, averageRetailPrice, sellThrough, shipping, processing, otherCosts]);

  function markStarted() {
    if (!started.current) {
      started.current = true;
      trackTradeEvent("trade_calculator_started", { plan: planId });
    }
  }

  function selectPlan(id: TradePlanId) {
    const selected = TRADE_PLANS.find((item) => item.id === id)!;
    setPlanId(id);
    setSpend(selected.openingOrder);
    setDiscount(selected.discountRate * 100);
    markStarted();
    trackTradeEvent("trade_plan_selected", { plan: id, placement: "calculator" });
  }

  return (
    <section id="calculator" className="bg-charcoal py-20 text-white md:py-28">
      <div className="container-altr">
        <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:gap-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.22em] text-white/45">Inventory economics</p>
            <h2 className="mt-4 font-display text-4xl font-medium tracking-tight md:text-5xl">Know your numbers before ordering.</h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/60">Model a starting order, realistic sell-through, and the costs specific to your channel. Change any input to test a different scenario.</p>

            <div className="mt-9 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {TRADE_PLANS.map((item) => (
                <button key={item.id} type="button" onClick={() => selectPlan(item.id)} aria-pressed={planId === item.id} className={`rounded-md border px-3 py-3 text-sm font-medium transition ${planId === item.id ? "border-white bg-white text-charcoal" : "border-white/15 text-white/65 hover:border-white/40"}`}>{item.name}</button>
              ))}
            </div>

            <div className="mt-6 space-y-5 rounded-md border border-white/12 bg-white/[.04] p-5 sm:p-7" onFocus={markStarted}>
              <NumberField label="Wholesale spend" value={spend} prefix="$" min={100} step={100} onChange={setSpend} />
              <NumberField label="Wholesale discount" value={discount} suffix="%" min={0} max={80} step={1} onChange={setDiscount} />
              <NumberField label="Average retail price" value={averageRetailPrice} prefix="$" min={1} step={5} onChange={setAverageRetailPrice} />
              <RangeField label="Expected sell-through" value={sellThrough} onChange={setSellThrough} />
              <div className="grid gap-4 sm:grid-cols-3">
                <NumberField label="Shipping" value={shipping} prefix="$" min={0} step={5} onChange={setShipping} />
                <NumberField label="Processing" value={processing} suffix="%" min={0} max={25} step={0.1} onChange={setProcessing} />
                <NumberField label="Other costs" value={otherCosts} prefix="$" min={0} step={10} onChange={setOtherCosts} />
              </div>
            </div>
          </div>

          <div className="self-start rounded-md bg-ivory-soft p-6 text-charcoal sm:p-8 lg:sticky lg:top-32">
            <div className="flex items-end justify-between gap-4 border-b border-stone pb-6">
              <div><p className="text-xs font-semibold uppercase tracking-[.2em] text-charcoal/45">Estimated profit after entered costs</p><p className={`mt-3 font-display text-5xl font-medium tracking-tight ${results.estimatedProfit < 0 ? "text-red-700" : "text-sage-deep"}`}>{money(results.estimatedProfit)}</p></div>
              <p className="text-right text-sm text-charcoal/55">{(results.grossMargin * 100).toFixed(1)}%<br />estimated margin</p>
            </div>
            <dl className="mt-6 grid gap-px overflow-hidden rounded-md border border-stone bg-stone sm:grid-cols-2">
              <Result label="Inventory retail value" value={money(results.retailValue)} />
              <Result label="Gross sales at sell-through" value={money(results.grossSales)} />
              <Result label="Cost of sold inventory" value={money(results.costOfSoldInventory)} />
              <Result label="Processing fees" value={money(results.processingFees)} />
              <Result label="Break-even sales" value={money(results.breakEvenSales)} note={`${results.breakEvenUnits} units at entered average`} />
              <Result label="Unsold inventory retail value" value={money(results.unsoldInventoryValue)} />
            </dl>
            <div className="mt-6 rounded-md border border-sage-deep/20 bg-sage-deep/[.06] p-4 text-sm leading-6 text-charcoal/65">
              These are planning estimates, not promised earnings. Actual results depend on SKU mix, pricing, fees, returns, taxes, demand, discounts, and unsold inventory.
            </div>
            <Link href={`/trade/apply?plan=${planId}`} onClick={() => trackTradeEvent("trade_calculator_completed", { plan: planId, sellThrough })} className="mt-6 flex w-full justify-center rounded-md bg-charcoal px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-sage-deep">Apply with this plan</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function NumberField({ label, value, onChange, prefix, suffix, min, max, step }: { label: string; value: number; onChange: (value: number) => void; prefix?: string; suffix?: string; min?: number; max?: number; step?: number }) {
  return <label className="block"><span className="mb-2 block text-sm font-medium text-white/68">{label}</span><span className="flex items-center rounded-md border border-white/15 bg-charcoal px-3 focus-within:border-white/45">{prefix && <span className="text-white/40">{prefix}</span>}<input type="number" value={value} min={min} max={max} step={step} onChange={(e) => onChange(Number(e.target.value))} className="min-w-0 flex-1 bg-transparent px-2 py-2.5 text-base text-white outline-none" />{suffix && <span className="text-white/40">{suffix}</span>}</span></label>;
}

function RangeField({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return <label className="block"><span className="mb-2 flex justify-between text-sm font-medium text-white/68"><span>{label}</span><span>{value}%</span></span><input type="range" min="0" max="100" step="5" value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full accent-white" /></label>;
}

function Result({ label, value, note }: { label: string; value: string; note?: string }) {
  return <div className="bg-white p-4"><dt className="text-xs leading-5 text-charcoal/50">{label}</dt><dd className="mt-1 font-display text-xl font-medium">{value}</dd>{note && <p className="mt-1 text-xs text-charcoal/40">{note}</p>}</div>;
}

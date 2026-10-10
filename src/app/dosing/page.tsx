import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import DoseCalculator from "./DoseCalculator";

export const metadata: Metadata = {
  title: "K9 Dosing Reference | ZooNetics",
  description:
    "Weight-based K9 peptide dosing reference with syringe calculator. BPC-157, TB-500, GHK-Cu — from published animal model research. Research use only.",
};

const WEIGHT_TIERS = [
  { tier: "Toy / Mini",  lbs: "5–10 lb",   kg: "2–4 kg",   bpc: "10–40 mcg",   tb: "0.2–0.6 mg" },
  { tier: "Small",       lbs: "11–25 lb",   kg: "5–11 kg",  bpc: "25–110 mcg",  tb: "0.4–1.7 mg" },
  { tier: "Medium",      lbs: "26–50 lb",   kg: "12–22 kg", bpc: "60–220 mcg",  tb: "1.0–3.3 mg" },
  { tier: "Large",       lbs: "51–80 lb",   kg: "23–36 kg", bpc: "115–360 mcg", tb: "1.8–5.4 mg" },
  { tier: "XL / Giant",  lbs: "81–132 lb",  kg: "37–60 kg", bpc: "185–600 mcg", tb: "3.0–9.0 mg" },
];

export default function DosingPage() {
  return (
    <div className="min-h-screen bg-[#F6F7FC]">

      {/* ── Minimal top nav ── */}
      <nav className="border-b border-[#17233B]/8 bg-white px-5 py-4 md:px-10">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between">
          <Link href="/" className="flex items-center gap-2 transition hover:opacity-80">
            <i className="ri-arrow-left-line text-sm text-[#17233B]/40" />
            <Image src="/brand/zoonetics-dark.webp" alt="ZooNetics by EVLV" width={180} height={45} className="h-8 w-auto" priority />
          </Link>
          <div className="flex items-center gap-2 rounded-full border border-[#D95858]/25 bg-[#D95858]/[0.06] px-4 py-1.5">
            <i className="ri-flask-line text-xs text-[#D95858]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#D95858]">Research Use Only</span>
          </div>
        </div>
      </nav>

      {/* ── Page header ── */}
      <header className="border-b border-[#17233B]/8 bg-white px-5 py-10 md:px-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#4F6EF7]">K9 Dosing Reference</p>
              <h1 className="mt-2 font-display text-[clamp(2rem,4vw,3.6rem)] font-medium leading-[1] tracking-[-0.04em] text-[#17233B]">
                Syringe calculator.
              </h1>
              <p className="mt-3 max-w-lg text-sm leading-6 text-[#17233B]/50">
                Select a compound, enter your dog&apos;s weight — see the reference dose and exact draw amount on a U-100 syringe.
                Compiled from animal model research. Not a veterinary recommendation.
              </p>
            </div>
            <Link
              href="/#collection"
              className="shrink-0 inline-flex items-center gap-2 rounded-full border border-[#17233B]/18 bg-[#17233B] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#4F6EF7]"
            >
              Shop compounds <i className="ri-arrow-right-line" />
            </Link>
          </div>
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="px-5 py-10 md:px-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-8 lg:grid-cols-[1fr_300px]">

            {/* Calculator */}
            <div className="rounded-2xl border border-[#E0E8F5] bg-white p-6 md:p-8">
              <DoseCalculator />
            </div>

            {/* Sidebar */}
            <div className="space-y-5">

              {/* Quick reference table */}
              <div className="rounded-2xl border border-[#E0E8F5] bg-white p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#17233B]/40 mb-4">
                  Quick reference — mid dose
                </p>
                <p className="text-[10px] text-[#17233B]/30 mb-4">
                  BPC-157 at 10 mcg/kg · TB-500 at 0.15 mg/kg
                </p>
                <div className="space-y-2">
                  {WEIGHT_TIERS.map(t => (
                    <div key={t.tier} className="rounded-xl bg-[#F8FAFF] px-4 py-3">
                      <div className="flex items-baseline justify-between mb-1.5">
                        <span className="text-[12px] font-semibold text-[#17233B]">{t.tier}</span>
                        <span className="text-[10px] text-[#17233B]/35">{t.lbs}</span>
                      </div>
                      <div className="text-[10px] text-[#17233B]/30 mb-2">{t.kg}</div>
                      <div className="flex gap-4">
                        <div>
                          <span className="block text-[9px] font-bold text-[#4F6EF7]/70 mb-0.5">BPC-157</span>
                          <span className="text-[12px] font-semibold text-[#4F6EF7]">{t.bpc}</span>
                        </div>
                        <div>
                          <span className="block text-[9px] font-bold text-[#5A7A9E]/70 mb-0.5">TB-500</span>
                          <span className="text-[12px] font-semibold text-[#5A7A9E]">{t.tb}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-[9px] leading-4 text-[#17233B]/30">
                  GHK-Cu and KPV are not weight-tiered in the literature — use flat ranges from the calculator.
                </p>
              </div>

              {/* What you need */}
              <div className="rounded-2xl border border-[#E0E8F5] bg-white p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#17233B]/40 mb-4">
                  What you&apos;ll need
                </p>
                <ul className="space-y-3">
                  {[
                    ["ri-medicine-bottle-line", "#4F6EF7",  "Lyophilized peptide vial",   "Stored in freezer until use"],
                    ["ri-drop-line",            "#5A7A9E",  "Bacteriostatic water",        "BAC water — not saline"],
                    ["ri-syringe-line",         "#7C5CBF",  "U-100 insulin syringes",      "29–31G, 0.3–1 mL"],
                    ["ri-temp-cold-line",       "#17233B",  "Cold storage after mixing",   "2–8 °C, use within 28 days"],
                  ].map(([icon, color, label, sub]) => (
                    <li key={label as string} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg text-sm"
                        style={{ background: `${color}12`, color: color as string }}
                      >
                        <i className={icon as string} />
                      </span>
                      <div>
                        <p className="text-[12px] font-semibold text-[#17233B]">{label as string}</p>
                        <p className="text-[10px] text-[#17233B]/40">{sub as string}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Reconstitution steps */}
              <div className="rounded-2xl border border-[#E0E8F5] bg-white p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#17233B]/40 mb-4">
                  Reconstitution basics
                </p>
                <ol className="space-y-3">
                  {[
                    ["Warm the vial", "20–30 min at room temp before adding water."],
                    ["Add BAC water slowly", "Let it run down the glass side. Swirl gently — never shake."],
                    ["Draw the calculated units", "Tilt vial, draw slowly with a U-100 syringe."],
                    ["Refrigerate", "2–8 °C after reconstitution. Do not refreeze."],
                  ].map(([title, body], i) => (
                    <li key={title as string} className="flex items-start gap-3">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#4F6EF7]/10 text-[10px] font-bold text-[#4F6EF7]">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-[12px] font-semibold text-[#17233B]">{title as string}</p>
                        <p className="text-[10px] leading-4 text-[#17233B]/45">{body as string}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* ── Footer strip ── */}
      <footer className="border-t border-[#17233B]/8 bg-white px-5 py-8 md:px-10">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-[11px] leading-5 text-[#17233B]/40">
            Dose ranges compiled from peer-reviewed animal model literature (Sikiric et al., Pickart et al., Goldstein et al.) for research documentation purposes only.
            Not veterinary advice. ZooNetics compounds are labeled Research Use Only.
          </p>
          <Link
            href="/#collection"
            className="shrink-0 inline-flex items-center gap-2 rounded-full border border-[#17233B]/15 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#17233B] transition hover:bg-[#17233B] hover:text-white"
          >
            View collection <i className="ri-arrow-right-line" />
          </Link>
        </div>
      </footer>

    </div>
  );
}

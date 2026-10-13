"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { getProducts } from "@/lib/products";
import type { CoaEntry, CoaReport } from "@/lib/coa-data";

const K9_PRODUCT_SLUGS = new Set([
  "bpc-157-5mg",
  "bpc-157-10mg",
  "bpc-157-20mg",
  "tb-500-5mg",
  "tb-500-10mg",
  "tb-500-20mg",
  "bpc-tb-500-blend-10mg",
  "bpc-tb-500-blend-20mg",
  "ghk-cu-50mg",
  "kpv-10mg",
  "kpv-oral-500mcg",
  "glow-70mg",
]);

const WHY_POINTS = [
  "HPLC purity analysis with quantification",
  "Mass spectrometry for molecular identity",
  "Multiple samples tested per batch",
  "Reports verifiable directly with the testing lab",
];

const PROTOCOL = [
  ["1", "Sample Collection", "Multiple vials randomly selected from each batch"],
  ["2", "Lab Analysis", "HPLC and mass spectrometry testing at an independent facility"],
  ["3", "Report Publishing", "Results linked to batch numbers on product pages"],
  ["4", "Customer Verification", "Match your vial batch number to the published report"],
];

function reportLabel(report: Pick<CoaReport, "label" | "lot">) {
  return `${report.label} · ${report.lot}`;
}

export function CoasClient({
  coaMap,
}: {
  coaMap: Record<string, CoaEntry>;
}) {
  const products = useMemo(() => getProducts().filter((product) => K9_PRODUCT_SLUGS.has(product.slug)), []);
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get("search") ?? "");

  const filtered = products.filter((p) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    const coa = coaMap[p.slug];
    const searchable = [
      p.name,
      coa?.label,
      ...(coa?.reports?.flatMap((report) => [report.label, report.lot, report.lab]) ?? []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return searchable.includes(q);
  });

  // Real counts only -- no fabricated purity/pass-rate numbers here.
  const withCoa = products.filter((p) => coaMap[p.slug]).length;
  const stats: [string, string][] = [
    [String(products.length), "Products"],
    [String(withCoa), "COAs On File"],
    [String(products.length - withCoa), "Pending Upload"],
  ];

  return (
    <>
      <section className="bg-[#101829] px-5 py-20 text-center text-white md:px-8 md:py-28">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/7 px-4 py-2 text-xs font-extrabold text-[#A9C7FF]">
            <i className="ri-shield-check-line" /> Independent Verification
          </div>
          <h1 className="mb-4 font-display text-4xl font-extrabold tracking-[-0.04em] md:text-6xl">Every Lot. Independently Verified.</h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            Search the current ZOONETICS K9 product line and match the lot on your vial to its independent laboratory report.
          </p>
        </div>
      </section>

      <section className="border-b border-[#17233B]/10 bg-[#FBFCFF] py-12">
        <div className="mx-auto grid max-w-[1400px] grid-cols-3 gap-2 px-4 sm:gap-6 md:px-8">
          {stats.map(([value, label]) => (
            <div key={label} className="p-1 text-center sm:p-4">
              <div className="font-display text-3xl font-extrabold text-[#4F6EF7] md:text-4xl">{value}</div>
              <div className="mt-1 text-sm font-bold text-[#17233B]/50">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#FBFCFF] py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <h2 className="font-display text-2xl font-extrabold tracking-[-0.025em] text-[#17233B] md:text-3xl">K9 Batch Verification Reports</h2>
            <div className="relative w-full sm:w-72">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search batch or product..."
                className="w-full rounded-md border border-stone bg-ivory-soft py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-sage-deep"
              />
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40" />
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="py-16 text-center text-sm text-charcoal/50">No batches match &ldquo;{query}&rdquo;.</p>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => {
                const coa = coaMap[p.slug];
                const cardClass =
                  "flex items-center gap-4 rounded-[18px] border border-[#17233B]/10 bg-white p-4 text-left transition";
                const reports = coa?.reports?.length
                  ? coa.reports
                  : coa
                    ? [{ kind: "combined" as const, url: coa.url, label: "Certificate of Analysis", lot: coa.label ?? "", lab: "Independent lab" }]
                    : [];
                const content = (
                  <>
                    <div className="h-16 w-13 shrink-0 overflow-hidden rounded-md bg-ivory-soft">
                      {p.image && <Image src={p.image} alt={p.name} width={90} height={112} className="h-full w-full object-cover" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-charcoal">{p.name}</p>
                      {coa?.label && <p className="mt-0.5 font-mono text-xs text-charcoal/50">Latest lot: {coa.label}</p>}
                      <div className="mt-2 flex items-center gap-2">
                        {coa ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-sage-mist px-2 py-0.5 text-[10px] font-semibold text-sage-deep">
                            <i className="ri-checkbox-circle-fill" /> COA on file
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-stone/50 px-2 py-0.5 text-[10px] font-semibold text-charcoal/40">
                            <i className="ri-time-line" /> COA pending
                          </span>
                        )}
                      </div>
                    </div>
                  </>
                );

                return coa ? (
                  <div key={p.id} className={`${cardClass} flex-col items-stretch hover:border-[#4F6EF7]/55 hover:shadow-[0_18px_45px_rgba(23,35,59,0.08)]`}>
                    <div className="flex items-center gap-4">{content}</div>
                    <div className="mt-1 grid gap-2 border-t border-stone pt-3">
                      {reports.map((report) => (
                        <a
                          key={`${report.url}-${report.lot}`}
                          href={report.url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-between gap-3 rounded-md bg-ivory-soft px-3 py-2 text-xs font-semibold text-sage-deep transition hover:bg-sage-mist"
                        >
                          <span className="min-w-0 truncate">{reportLabel(report)}</span>
                          <i className="ri-external-link-line shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div key={p.id} className={`${cardClass} cursor-default opacity-70`}>
                    {content}
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </section>

      <section className="bg-[#101829] py-20 text-white md:py-28">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 px-4 md:grid-cols-2 md:px-8">
          <div>
            <h2 className="mb-4 font-display text-3xl font-semibold md:text-4xl">Why independent testing?</h2>
            <p className="mb-6 leading-relaxed text-white/60">
              Independent laboratory analysis verifies the specific tested sample. Published reports include the
              lab, lot number, test date and reported purity, identity, potency or endotoxin result where applicable.
            </p>
            <ul className="space-y-3 text-sm">
              {WHY_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <i className="ri-check-line mt-0.5 text-sage-light" />
                  <span className="text-white/70">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/5 p-8">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sage/30">
                <i className="ri-flask-line text-2xl text-sage-light" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold">Testing Protocol</h3>
                <p className="text-xs text-white/50">Every batch undergoes rigorous QC</p>
              </div>
            </div>
            <div className="space-y-4">
              {PROTOCOL.map(([num, title, desc]) => (
                <div key={num} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sage text-xs font-semibold text-white">{num}</div>
                  <div>
                    <div className="text-sm font-semibold">{title}</div>
                    <div className="text-xs text-white/50">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import Image from "next/image";
import Link from "next/link";

const METHODS = [
  ["HPLC", "Measures purity and helps detect contaminants for compound verification."],
  ["MS", "Confirms molecular weight and supports compound identity verification."],
  ["QC", "Links analytical results to batch and lot numbers for traceability."],
  ["COA", "Presents the testing methods, results, and batch validation in one report."],
];

export function QualityAssurance() {
  return (
    <section className="bg-charcoal py-20 text-white md:py-28">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-4 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50">99%+ purity assurance</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold leading-tight md:text-5xl">Quality assurance without compromise.</h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/60">Independent analytical methods and batch-level documentation help verify that each released compound meets its research specification.</p>
          <div className="mt-10 grid border-l border-t border-white/15 sm:grid-cols-2">
            {METHODS.map(([name, body]) => (
              <div key={name} className="border-b border-r border-white/15 p-6 md:p-7">
                <p className="font-display text-2xl font-semibold text-white">{name}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/52">{body}</p>
              </div>
            ))}
          </div>
          <Link href="/coas" className="mt-8 inline-flex items-center gap-2 bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-charcoal transition hover:bg-ivory">
            View lab test results <i className="ri-arrow-right-line" />
          </Link>
        </div>

        <div className="relative min-h-[560px] overflow-hidden bg-sage-deep">
          <Image src="/images/science/coa-vial-banner.png" alt="EVLV batch Certificates of Analysis" fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 bg-white px-5 py-4 text-charcoal shadow-xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-deep">Batch documentation</p>
            <p className="mt-1 font-display text-xl font-semibold">Traceable by lot.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

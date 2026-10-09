import Image from "next/image";
import Link from "next/link";

const pathways = [
  ["01", "Joint & soft tissue", "A focused research pathway for the tendons, ligaments, and connective tissue that keep dogs moving.", "ri-bone-line"],
  ["02", "Healthy aging", "Evidence-led protocols designed around the changing recovery needs of mature and senior dogs.", "ri-heart-pulse-line"],
  ["03", "Active recovery", "Support for sport, working, and highly active dogs when training places more demand on the body.", "ri-run-line"],
];

const standards = [
  ["01", "Identity", "Independent methods verify that each lot is what its record says it is."],
  ["02", "Purity", "Quantitative results stay connected to the exact lot—not a generic sample."],
  ["03", "Traceability", "CRM inventory, fulfillment, and documentation share one source of truth."],
  ["04", "Restraint", "No veterinary efficacy claim is published without the evidence to support it."],
];

const products = [
  { name: "The Long Run", formula: "BPC-157 + TB-500", type: "Signature blend", focus: "Mobility & recovery research", tone: "bg-[#17382d] text-white", accent: "text-[#e4b07d]" },
  { name: "BPC-157", formula: "Single peptide", type: "Core peptide", focus: "Soft-tissue pathway research", tone: "bg-[#eee5d6] text-[#17382d]", accent: "text-[#a75f3f]" },
  { name: "TB-500", formula: "Single peptide", type: "Core peptide", focus: "Repair-response research", tone: "bg-[#cfdaca] text-[#17382d]", accent: "text-[#5e755f]" },
  { name: "KPV", formula: "Tripeptide", type: "Specialty peptide", focus: "Inflammatory-pathway research", tone: "bg-[#c7d0d5] text-[#17382d]", accent: "text-[#536c78]" },
  { name: "GHK-Cu", formula: "Copper peptide", type: "Specialty peptide", focus: "Skin & tissue research", tone: "bg-[#d9935f] text-[#17382d]", accent: "text-[#713b29]" },
  { name: "NAD+", formula: "Supportive compound", type: "Cellular support", focus: "Metabolic-pathway research", tone: "bg-[#efe0c2] text-[#17382d]", accent: "text-[#9b693c]" },
];

const faqs = [
  ["Are peptide products approved medicines for dogs?", "No. The compounds presented here are research materials and are not approved veterinary medicines. No content on this site is a diagnosis, treatment plan, or replacement for veterinary care."],
  ["How will product quality be documented?", "Each available research lot is designed to connect to identity, purity, and batch documentation through the same CRM-backed lot system used by the parent platform."],
  ["Should I speak with my veterinarian?", "Yes. Always involve a licensed veterinarian in decisions concerning your dog, particularly when your dog has a health condition or uses prescription medication."],
  ["Is the shop live yet?", "Not yet. This launch version establishes the brand, education flow, and integration seams. Catalog, payments, and CRM inventory will be activated only after veterinary and legal review."],
];

function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-3 ${light ? "text-[#f5f0e6]" : "text-[#17382d]"}`}>
      <span className={`grid h-9 w-9 place-items-center rounded-full border ${light ? "border-white/30" : "border-[#17382d]/25"}`}>
        <i className="ri-pulse-line text-lg" aria-hidden />
      </span>
      <span className="font-display text-[1.35rem] font-semibold tracking-[-0.04em]">canis / continuum</span>
    </span>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#f4efe5] text-[#18342b]">
      <header className="absolute inset-x-0 top-0 z-30 border-b border-white/15 text-white">
        <div className="mx-auto flex h-20 max-w-[1480px] items-center justify-between px-5 md:px-10">
          <Link href="#top" aria-label="Canis Continuum home"><BrandMark light /></Link>
          <nav className="hidden items-center gap-8 text-[12px] font-semibold uppercase tracking-[0.13em] lg:flex" aria-label="Main navigation">
            <Link href="#collection" className="transition hover:text-[#d9a777]">Peptides</Link>
            <Link href="#approach" className="transition hover:text-[#d9a777]">Our approach</Link>
            <Link href="#science" className="transition hover:text-[#d9a777]">The science</Link>
            <Link href="#stories" className="transition hover:text-[#d9a777]">Dog stories</Link>
            <Link href="#questions" className="transition hover:text-[#d9a777]">Questions</Link>
          </nav>
          <Link href="#collection" className="rounded-full bg-[#f4efe5] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.13em] text-[#17382d] transition hover:bg-[#d9a777]">View the peptides</Link>
        </div>
      </header>

      <main id="top">
        <section className="relative min-h-[820px] bg-[#17382d] text-white md:min-h-[900px]">
          <Image src="/images/canis/hero-senior-lab.png" alt="A mature black Labrador enjoying a sunrise walk with its owner" fill priority sizes="100vw" className="object-cover object-[62%_center]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,48,39,0.98)_0%,rgba(16,48,39,0.91)_30%,rgba(16,48,39,0.36)_62%,rgba(16,48,39,0.08)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#17382d] to-transparent" />
          <div className="relative mx-auto flex min-h-[820px] max-w-[1480px] items-end px-5 pb-24 pt-36 md:min-h-[900px] md:items-center md:px-10 md:pb-10">
            <div className="max-w-[760px]">
              <p className="mb-7 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e1b78d]"><span className="h-px w-10 bg-[#e1b78d]" /> Research peptides &amp; blends for dogs</p>
              <h1 className="font-display text-[clamp(4rem,9vw,8.4rem)] font-medium leading-[0.82] tracking-[-0.065em]">Peptide science,<span className="block font-serif italic text-[#e4b07d]">for more good years.</span></h1>
              <p className="mt-8 max-w-xl text-base leading-7 text-white/72 md:text-lg">Explore single peptides, purposeful blends, and transparent batch testing—built from the ground up around canine research and responsible owner education.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="#collection" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d9935f] px-7 py-4 text-xs font-bold uppercase tracking-[0.13em] text-[#17382d] transition hover:bg-[#f0c69e]">Explore peptides &amp; blends <i className="ri-arrow-right-line" /></Link>
                <Link href="#science" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 px-7 py-4 text-xs font-bold uppercase tracking-[0.13em] transition hover:bg-white hover:text-[#17382d]">Read our standards</Link>
              </div>
            </div>
          </div>
          <div className="absolute bottom-7 right-8 hidden items-center gap-8 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/55 xl:flex"><span>Lot-level testing</span><span>Research transparency</span><span>Vet-first education</span></div>
        </section>

        <section className="border-b border-[#17382d]/12 bg-[#d9935f] px-5 py-4 text-[#17382d]">
          <div className="mx-auto flex max-w-[1480px] flex-wrap items-center justify-center gap-x-10 gap-y-2 text-center text-[10px] font-bold uppercase tracking-[0.17em] md:justify-between">
            <span>Single peptides</span><i className="ri-checkbox-blank-circle-fill text-[5px]" /><span>Purpose-built blends</span><i className="ri-checkbox-blank-circle-fill text-[5px]" /><span>Batch-level testing</span><i className="ri-checkbox-blank-circle-fill text-[5px]" /><span>Canine-first education</span>
          </div>
        </section>

        <section id="approach" className="px-5 py-24 md:px-10 md:py-36">
          <div className="mx-auto max-w-[1380px]">
            <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#a75f3f]">A new category of care</p>
              <h2 className="font-display text-[clamp(3rem,6vw,6rem)] font-medium leading-[0.92] tracking-[-0.055em]">Built around the life they&apos;re <span className="font-serif italic text-[#a75f3f]">still living.</span></h2>
            </div>
            <div className="mt-16 grid border-y border-[#17382d]/15 md:grid-cols-3">
              {pathways.map(([number, title, text, icon], index) => (
                <article key={number} className={`group py-10 md:px-8 md:py-14 ${index > 0 ? "border-t border-[#17382d]/15 md:border-l md:border-t-0" : ""}`}>
                  <div className="flex items-center justify-between"><span className="text-[10px] font-bold tracking-[0.2em] text-[#a75f3f]">{number}</span><span className="grid h-12 w-12 place-items-center rounded-full bg-[#dce3d4] text-xl transition group-hover:bg-[#17382d] group-hover:text-white"><i className={icon} /></span></div>
                  <h3 className="mt-14 font-display text-3xl font-semibold tracking-[-0.035em]">{title}</h3>
                  <p className="mt-4 max-w-sm text-[15px] leading-7 text-[#18342b]/65">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="collection" className="bg-[#eee5d6] px-5 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-[1380px]">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#a75f3f]">The peptide library</p>
                <h2 className="mt-5 font-display text-[clamp(3.4rem,6vw,6rem)] font-medium leading-[0.9] tracking-[-0.055em]">Singles when precision matters. <span className="font-serif italic text-[#a75f3f]">Blends when pathways overlap.</span></h2>
              </div>
              <p className="max-w-lg text-lg leading-8 text-[#18342b]/66 lg:justify-self-end">The platform is being designed for a growing catalog—not one hero vial. Each formula will have its own purpose, lot record, testing, and plain-language research profile.</p>
            </div>

            <div className="relative mt-14 min-h-[420px] overflow-hidden rounded-[2rem] bg-[#aeb9a6] md:min-h-[620px]">
              <Image src="/images/canis/peptide-family.png" alt="A coordinated family of canine peptide and blend concept products" fill sizes="100vw" className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 bg-gradient-to-t from-[#102b23]/85 via-[#102b23]/30 to-transparent px-7 pb-7 pt-28 text-white md:px-10 md:pb-10">
                <div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#e4b07d]">A system, not a single SKU</p><p className="mt-2 max-w-xl font-display text-2xl font-semibold md:text-4xl">A coherent family for singles, blends, and future formats.</p></div>
                <span className="rounded-full border border-white/35 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em]">Concept packaging</span>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product, index) => (
                <article key={product.name} className={`group flex min-h-[300px] flex-col justify-between rounded-2xl p-7 ${product.tone}`}>
                  <div className="flex items-center justify-between"><span className={`text-[10px] font-bold uppercase tracking-[0.17em] ${product.accent}`}>{product.type}</span><span className="text-[10px] font-bold opacity-40">0{index + 1}</span></div>
                  <div className="mt-16">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] opacity-55">{product.formula}</p>
                    <h3 className="mt-2 font-display text-4xl font-semibold tracking-[-0.05em]">{product.name}</h3>
                    <div className="mt-6 flex items-center justify-between border-t border-current/20 pt-5"><p className="text-sm opacity-65">{product.focus}</p><i className="ri-arrow-right-up-line text-xl transition group-hover:translate-x-1 group-hover:-translate-y-1" /></div>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-5 text-xs leading-5 text-[#18342b]/50">Working catalog concepts only. Final formulas, availability, naming, labeling, and claims require analytical, veterinary, and legal review.</p>
          </div>
        </section>

        <section id="protocol" className="bg-[#17382d] px-5 py-20 text-white md:px-10 md:py-28">
          <div className="mx-auto grid max-w-[1380px] gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-center">
            <div className="relative min-h-[620px] overflow-hidden rounded-[2rem] bg-[#efe6d6]">
              <Image src="/images/canis/product-vial.png" alt="Concept packaging for a canine research protocol" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              <span className="absolute left-5 top-5 rounded-full bg-[#f4efe5] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#17382d]">Concept · pre-launch</span>
            </div>
            <div className="lg:pl-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#e4b07d]">Featured blend / mobility research</p>
              <h2 className="mt-5 font-display text-[clamp(3.5rem,6vw,6.5rem)] font-medium leading-[0.86] tracking-[-0.06em]">The<br /><span className="font-serif italic text-[#e4b07d]">Long Run.</span></h2>
              <p className="mt-7 max-w-xl text-lg leading-8 text-white/66">The first signature blend concept combines BPC-157 and TB-500 around connective-tissue and recovery research. It leads the collection, but it&apos;s one part of a broader canine peptide system.</p>
              <div className="mt-9 grid gap-px overflow-hidden rounded-2xl bg-white/15 sm:grid-cols-3">
                {[["Status","In review"],["Format","To be confirmed"],["Records","Lot linked"]].map(([label,value]) => <div key={label} className="bg-[#17382d] p-5"><p className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/40">{label}</p><p className="mt-2 text-sm font-semibold">{value}</p></div>)}
              </div>
              <Link href="#questions" className="mt-8 inline-flex items-center gap-3 border-b border-[#e4b07d] pb-2 text-xs font-bold uppercase tracking-[0.14em] text-[#e4b07d]">See responsible-use answers <i className="ri-arrow-right-line" /></Link>
            </div>
          </div>
        </section>

        <section id="science" className="bg-[#dce3d4] px-5 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-[1380px]">
            <div className="grid gap-10 lg:grid-cols-2">
              <div><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8d4d34]">Proof over promises</p><h2 className="mt-5 max-w-xl font-display text-[clamp(3.4rem,6vw,6rem)] font-medium leading-[0.9] tracking-[-0.055em]">Trust is a system, not a <span className="font-serif italic text-[#8d4d34]">badge.</span></h2></div>
              <p className="max-w-lg self-end text-lg leading-8 text-[#18342b]/66 lg:justify-self-end">We&apos;re carrying forward the operational backbone already built for EVLV—CRM-backed inventory, lot documentation, account records, and checkout—then adding dog-specific guardrails before activation.</p>
            </div>
            <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {standards.map(([number,title,text]) => <article key={number} className="min-h-72 rounded-2xl border border-[#17382d]/12 bg-[#f4efe5]/65 p-7"><span className="text-[10px] font-bold tracking-[0.2em] text-[#8d4d34]">{number}</span><h3 className="mt-20 font-display text-2xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-[#18342b]/62">{text}</p></article>)}
            </div>
          </div>
        </section>

        <section id="stories" className="bg-[#f4efe5] px-5 py-24 md:px-10 md:py-32">
          <div className="mx-auto grid max-w-[1380px] gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
            <div className="relative min-h-[580px] overflow-hidden rounded-[2rem]">
              <Image src="/images/canis/mobility-story.png" alt="A senior golden retriever walking with its owner" fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17382d]/70 via-transparent to-transparent" />
              <p className="absolute bottom-7 left-7 right-7 max-w-lg font-display text-3xl font-medium leading-tight text-white md:text-4xl">The moments that matter aren&apos;t clinical. They&apos;re the next walk, the next step, the next good day.</p>
            </div>
            <div className="flex flex-col justify-between rounded-[2rem] bg-[#d9935f] p-8 text-[#17382d] md:p-12">
              <div><p className="text-[11px] font-bold uppercase tracking-[0.2em]">Stories, with standards</p><blockquote className="mt-12 font-serif text-[clamp(2.5rem,4vw,4.5rem)] italic leading-[1.02] tracking-[-0.04em]">“We&apos;re here for more of the life between appointments.”</blockquote></div>
              <div className="mt-20 border-t border-[#17382d]/25 pt-6"><p className="text-sm leading-6">Future owner stories will be labeled as individual experiences, never presented as clinical evidence. Results vary, and veterinary care comes first.</p></div>
            </div>
          </div>
        </section>

        <section id="questions" className="bg-[#eee5d6] px-5 py-24 md:px-10 md:py-32">
          <div className="mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-[0.7fr_1.3fr]">
            <div><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8d4d34]">Straight answers</p><h2 className="mt-4 font-display text-5xl font-medium leading-none tracking-[-0.05em]">Before anything else.</h2><p className="mt-6 max-w-sm text-sm leading-7 text-[#18342b]/62">This is an early brand and platform build. Product availability and claims remain intentionally limited until review is complete.</p></div>
            <div className="border-t border-[#17382d]/20">
              {faqs.map(([question,answer]) => <details key={question} className="group border-b border-[#17382d]/20 py-6"><summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-xl font-semibold tracking-[-0.025em] md:text-2xl">{question}<span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#17382d]/25 text-sm transition group-open:rotate-45">+</span></summary><p className="max-w-2xl pt-5 text-[15px] leading-7 text-[#18342b]/65">{answer}</p></details>)}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#102b23] px-5 pb-8 pt-16 text-[#f4efe5] md:px-10 md:pt-24">
        <div className="mx-auto max-w-[1380px]">
          <div className="grid gap-12 border-b border-white/15 pb-16 lg:grid-cols-[1.2fr_0.8fr]">
            <div><BrandMark light /><p className="mt-7 max-w-lg font-display text-4xl font-medium leading-tight tracking-[-0.04em]">A longer horizon for the dogs who give us everything.</p></div>
            <div className="grid grid-cols-2 gap-8 text-sm lg:justify-self-end"><div className="space-y-3 text-white/60"><p className="mb-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#e4b07d]">Explore</p><p><Link href="#collection">Peptides</Link></p><p><Link href="#approach">Approach</Link></p><p><Link href="#science">Standards</Link></p><p><Link href="#questions">Questions</Link></p></div><div className="space-y-3 text-white/60"><p className="mb-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#e4b07d]">Platform</p><p>Multiple peptides</p><p>Signature blends</p><p>Lot traceability</p><p>Pre-launch</p></div></div>
          </div>
          <div className="flex flex-col gap-4 py-7 text-[10px] uppercase tracking-[0.12em] text-white/38 md:flex-row md:items-center md:justify-between"><p>© 2026 Canis Continuum · Working brand concept</p><p>Research materials only · Not veterinary advice · Not intended to diagnose, treat, cure, or prevent disease</p></div>
        </div>
      </footer>
    </div>
  );
}

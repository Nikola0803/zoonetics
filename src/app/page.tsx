import Image from "next/image";
import Link from "next/link";

const pathways = [
  ["01", "Connective-tissue biology", "Research context for signaling pathways observed in tendon, ligament, and soft-tissue models.", "ri-bone-line"],
  ["02", "Healthy-aging models", "A disciplined way to organize compounds studied alongside age-related cellular and recovery pathways.", "ri-heart-pulse-line"],
  ["03", "Recovery research", "Research profiles for compounds investigated in repair-response and activity-stress models.", "ri-run-line"],
];

const standards = [
  ["01", "Identity", "Independent methods verify that each lot is what its record says it is."],
  ["02", "Purity", "Quantitative results stay connected to the exact lot—not a generic sample."],
  ["03", "Traceability", "CRM inventory, fulfillment, and documentation share one source of truth."],
  ["04", "Restraint", "No veterinary efficacy claim is published without the evidence to support it."],
];

const products = [
  { name: "The Long Run", formula: "BPC-157 + TB-500", type: "Signature blend", focus: "Connective-tissue research", formats: ["10 + 10 mg"], color: "#17233B", ink: "#F6F7FC" },
  { name: "BPC-157", formula: "Pentadecapeptide", type: "Single peptide", focus: "Soft-tissue pathway research", formats: ["5 mg", "10 mg"], color: "#5F7CF6", ink: "#FBFAFF" },
  { name: "TB-500", formula: "Thymosin beta-4 fragment", type: "Single peptide", focus: "Repair-response research", formats: ["5 mg", "10 mg"], color: "#5A7A9E", ink: "#F6F7FC" },
  { name: "KPV", formula: "Lys–Pro–Val tripeptide", type: "Specialty peptide", focus: "Inflammatory-pathway research", formats: ["10 mg"], color: "#6C78A8", ink: "#F6F7FC" },
  { name: "GHK-Cu", formula: "Copper peptide complex", type: "Specialty peptide", focus: "Skin & tissue model research", formats: ["50 mg"], color: "#8C68D8", ink: "#FBFAFF" },
  { name: "NAD+", formula: "Nicotinamide adenine dinucleotide", type: "Supportive compound", focus: "Cellular-energy research", formats: ["500 mg"], color: "#4F6F8F", ink: "#FBFAFF" },
];

const studyContexts = [
  { title: "Senior canine models", kicker: "Age-related research", body: "Organize literature and observable endpoints around age-related changes in mobility, recovery, and cellular signaling.", image: "/images/canis/story-before.png", position: "object-center" },
  { title: "Active & working dogs", kicker: "High-load research", body: "Explore repair-response questions associated with repeated activity and demanding working environments.", image: "/images/canis/hero-senior-lab.png", position: "object-[68%_center]" },
  { title: "Large-breed cohorts", kicker: "Biomechanics research", body: "Build breed- and size-aware research questions without turning predisposition into a treatment claim.", image: "/images/canis/story-followup.png", position: "object-center" },
  { title: "Recovery observation", kicker: "Measured follow-up", body: "Define comparable movement tasks, observation windows, and documentation before interpreting any change.", image: "/images/canis/mobility-story.png", position: "object-center" },
];

const researchCycle = [
  ["01", "Frame the question", "Define the canine model, literature basis, and measurable endpoint before selecting a material."],
  ["02", "Match the profile", "Compare single peptides and blends by research rationale—not by a promised veterinary outcome."],
  ["03", "Verify the lot", "Connect identity, purity, and supporting documentation to the exact material under study."],
  ["04", "Record what happened", "Preserve dates, conditions, observations, and adverse events without rewriting the story afterward."],
];

const roadmap = [
  ["Available first", "Single-peptide library", "Focused research profiles with planned formats and lot-level documentation."],
  ["In development", "Signature blends", "Multi-compound concepts organized around clearly stated research rationales."],
  ["Next layer", "Study records", "A structured home for protocols, source material, observations, and linked lots."],
  ["Future", "Partner portal", "A dedicated workflow for qualified veterinary and research collaborators."],
];

const faqs = [
  ["Are peptide products approved medicines for dogs?", "No. The compounds presented here are research materials and are not approved veterinary medicines. No content on this site is a diagnosis, treatment plan, or replacement for veterinary care."],
  ["Why discuss canine research if the products are RUO?", "The canine focus defines the scientific subject matter, literature, and research questions this catalog organizes. It does not change product status: research-use-only materials are not intended for administration to humans or animals."],
  ["How will product quality be documented?", "Each available research lot is designed to connect to identity, purity, and batch documentation through the same CRM-backed lot system used by the parent platform."],
  ["Should I speak with my veterinarian?", "Yes. Always involve a licensed veterinarian in decisions concerning your dog, particularly when your dog has a health condition or uses prescription medication."],
  ["Is the shop live yet?", "Not yet. This launch version establishes the brand, education flow, and integration seams. Catalog, payments, and CRM inventory will be activated only after veterinary and legal review."],
];

function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-3 ${light ? "text-[#F6F7FC]" : "text-[#17233B]"}`}>
      <span className={`relative grid h-10 w-10 place-items-center overflow-hidden rounded-[1rem] ${light ? "bg-white/12" : "bg-[#DCE7FF]"}`}>
        <i className="ri-bubble-chart-fill text-xl text-[#A9C7FF]" aria-hidden />
        <span className="absolute bottom-1 right-1 h-2 w-2 rounded-full bg-[#FF8A72]" />
      </span>
      <span className="font-display text-[1.45rem] font-extrabold tracking-[-0.055em]">Pet<span className={light ? "text-[#A9C7FF]" : "text-[#4F6EF7]"}>Peps</span></span>
    </span>
  );
}

function ProductVial({ color, ink, name }: { color: string; ink: string; name: string }) {
  return (
    <div className="relative mx-auto h-52 w-32" aria-hidden>
      <div className="absolute left-1/2 top-2 h-5 w-24 -translate-x-1/2 rounded-t-lg bg-[#c9bda8] shadow-sm" />
      <div className="absolute left-1/2 top-6 h-5 w-20 -translate-x-1/2 rounded-sm bg-[#7b4a26]" />
      <div className="absolute inset-x-2 bottom-0 top-10 overflow-hidden rounded-b-[1.8rem] rounded-t-xl border border-[#4a2d1c]/30 bg-[linear-gradient(90deg,#6e3c1f,#b26d35_42%,#744021)] shadow-[0_22px_35px_rgba(36,43,32,0.22)]">
        <div className="absolute inset-x-0 top-9 px-3 py-5 text-center" style={{ backgroundColor: color, color: ink }}>
          <i className="ri-pulse-line text-lg" />
          <p className="mt-2 text-[8px] font-bold uppercase tracking-[0.12em]">PetPeps</p>
          <p className="mt-1 font-display text-[11px] font-bold leading-tight">{name}</p>
          <p className="mt-2 text-[6px] font-bold uppercase tracking-[0.16em] opacity-65">Research use only</p>
        </div>
        <div className="absolute inset-y-0 left-2 w-2 bg-white/15 blur-sm" />
      </div>
    </div>
  );
}

function StoryFrame({ image, label, caption, warm = false }: { image: string; label: string; caption: string; warm?: boolean }) {
  return (
    <figure className="group relative aspect-[9/16] min-h-[560px] overflow-hidden rounded-[1.75rem] bg-[#17233B]">
      <Image src={image} alt={caption} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-[1.02]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#101829]/85 via-transparent to-[#101829]/20" />
      <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
        <span className={`rounded-full px-4 py-2 text-[9px] font-bold uppercase tracking-[0.16em] ${warm ? "bg-[#FF8A72] text-[#17233B]" : "bg-[#F6F7FC] text-[#17233B]"}`}>{label}</span>
        <span className="rounded-full bg-black/25 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur">Video placeholder</span>
      </div>
      <div className="absolute inset-0 grid place-items-center">
        <span className="grid h-16 w-16 place-items-center rounded-full border border-white/60 bg-white/15 text-2xl text-white backdrop-blur transition group-hover:scale-110 group-hover:bg-white group-hover:text-[#17233B]"><i className="ri-play-fill translate-x-0.5" /></span>
      </div>
      <figcaption className="absolute inset-x-0 bottom-0 p-6 text-white">
        <p className="font-display text-2xl font-semibold tracking-[-0.035em]">{caption}</p>
        <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/55">Owner-shot vertical video · media slot ready</p>
      </figcaption>
    </figure>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#F6F7FC] text-[#23324D]">
      <header className="absolute inset-x-0 top-0 z-30 border-b border-white/15 text-white">
        <div className="mx-auto flex h-20 max-w-[1480px] items-center justify-between px-5 md:px-10">
          <Link href="#top" aria-label="PetPeps home"><BrandMark light /></Link>
          <nav className="hidden items-center gap-8 text-[12px] font-semibold uppercase tracking-[0.13em] lg:flex" aria-label="Main navigation">
            <Link href="#collection" className="transition hover:text-[#A9C7FF]">Peptides</Link>
            <Link href="#approach" className="transition hover:text-[#A9C7FF]">Our approach</Link>
            <Link href="#science" className="transition hover:text-[#A9C7FF]">The science</Link>
            <Link href="#stories" className="transition hover:text-[#A9C7FF]">Dog stories</Link>
            <Link href="#questions" className="transition hover:text-[#A9C7FF]">Questions</Link>
          </nav>
          <Link href="#collection" className="rounded-full bg-[#F6F7FC] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.13em] text-[#17233B] transition hover:bg-[#A9C7FF]">View the peptides</Link>
        </div>
      </header>

      <main id="top">
        <section className="relative min-h-[820px] bg-[#17233B] text-white md:min-h-[900px]">
          <Image src="/images/canis/hero-senior-lab.png" alt="A mature black Labrador enjoying a sunrise walk with its owner" fill priority sizes="100vw" className="object-cover object-[62%_center]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,24,41,0.98)_0%,rgba(16,24,41,0.91)_30%,rgba(16,24,41,0.42)_62%,rgba(16,24,41,0.12)_100%)]" />
          <div className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-[#4F6EF7]/18 blur-3xl" />
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#17233B] to-transparent" />
          <div className="relative mx-auto flex min-h-[820px] max-w-[1480px] items-end px-5 pb-24 pt-36 md:min-h-[900px] md:items-center md:px-10 md:pb-10">
            <div className="max-w-[760px]">
              <p className="mb-7 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B7C3FF]"><span className="h-px w-10 bg-[#B7C3FF]" /> Research peptides &amp; blends for canine studies</p>
              <h1 className="max-w-[700px] font-display text-[clamp(3.35rem,7vw,6.8rem)] font-medium leading-[0.88] tracking-[-0.055em]">Peptide science,<span className="block font-serif italic text-[#A9C7FF]">for more good years.</span></h1>
              <p className="mt-8 max-w-xl text-base leading-7 text-white/72 md:text-lg">A focused catalog of research-use-only peptides, purposeful blends, and lot-level documentation—organized around canine research questions without presenting veterinary treatment claims.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="#collection" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FF8A72] px-7 py-4 text-xs font-bold uppercase tracking-[0.13em] text-[#17233B] transition hover:bg-[#FFC0B0]">Explore peptides &amp; blends <i className="ri-arrow-right-line" /></Link>
                <Link href="#science" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 px-7 py-4 text-xs font-bold uppercase tracking-[0.13em] transition hover:bg-white hover:text-[#17233B]">Read our standards</Link>
              </div>
            </div>
          </div>
          <div className="absolute bottom-7 right-8 hidden items-center gap-8 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/55 xl:flex"><span>Lot-level testing</span><span>Research transparency</span><span>Vet-first education</span></div>
        </section>

        <section className="border-b border-[#17233B]/12 bg-[#FF8A72] px-5 py-4 text-[#17233B]">
          <div className="mx-auto flex max-w-[1480px] flex-wrap items-center justify-center gap-x-10 gap-y-2 text-center text-[10px] font-bold uppercase tracking-[0.17em] md:justify-between">
            <span>Single peptides</span><i className="ri-checkbox-blank-circle-fill text-[5px]" /><span>Purpose-built blends</span><i className="ri-checkbox-blank-circle-fill text-[5px]" /><span>Batch-level testing</span><i className="ri-checkbox-blank-circle-fill text-[5px]" /><span>Canine-first education</span>
          </div>
        </section>

        <section id="approach" className="px-5 py-24 md:px-10 md:py-36">
          <div className="mx-auto max-w-[1380px]">
            <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D95858]">Why canine research?</p>
              <h2 className="max-w-4xl font-display text-[clamp(2.5rem,4.5vw,4.7rem)] font-medium leading-[0.98] tracking-[-0.045em]">The little changes deserve <span className="font-serif italic text-[#D95858]">better questions.</span></h2>
            </div>
            <div className="mt-16 grid border-y border-[#17233B]/15 md:grid-cols-3">
              {pathways.map(([number, title, text, icon], index) => (
                <article key={number} className={`group py-10 md:px-8 md:py-14 ${index > 0 ? "border-t border-[#17233B]/15 md:border-l md:border-t-0" : ""}`}>
                  <div className="flex items-center justify-between"><span className="text-[10px] font-bold tracking-[0.2em] text-[#D95858]">{number}</span><span className="grid h-12 w-12 place-items-center rounded-full bg-[#DCE7FF] text-xl transition group-hover:bg-[#17233B] group-hover:text-white"><i className={icon} /></span></div>
                  <h3 className="mt-12 font-display text-2xl font-semibold tracking-[-0.03em]">{title}</h3>
                  <p className="mt-4 max-w-sm text-[15px] leading-7 text-[#23324D]/65">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="stories" className="bg-[#F6F7FC] px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1380px]">
            <div className="grid gap-5 lg:grid-cols-[0.8fr_0.8fr_1fr]">
              <StoryFrame image="/images/canis/story-before.png" label="Before" caption="Pausing at the steps" />
              <StoryFrame image="/images/canis/story-followup.png" label="Follow-up" caption="Moving through the day" warm />
              <article className="flex min-h-[560px] flex-col justify-between rounded-[1.75rem] bg-[#17233B] p-8 text-white md:p-10">
                <div>
                  <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.17em] text-[#A9C7FF]"><span className="h-px w-8 bg-[#A9C7FF]" /> Before &amp; follow-up</div>
                  <h2 className="mt-8 max-w-md font-display text-[clamp(2.5rem,3.8vw,4rem)] font-medium leading-[0.98] tracking-[-0.045em]">The small changes are the ones <span className="font-serif italic text-[#A9C7FF]">owners notice.</span></h2>
                  <p className="mt-7 max-w-md text-base leading-7 text-white/65">Same dog. Same movement. Two clearly dated moments. PetPeps will use simple, permissioned footage so the story is easy to see and easy to understand.</p>
                </div>
                <div className="mt-10 border-t border-white/15 pt-6">
                  <p className="text-xs leading-6 text-white/55">Concept footage only—not a product outcome. Owner observations are anecdotal and never replace controlled canine research or veterinary advice.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="collection" className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,#DCE7FF_0%,#EEF2FF_44%,#F6F7FC_100%)] px-5 py-24 md:px-10 md:py-32">
          <div className="pointer-events-none absolute -right-36 top-80 h-[34rem] w-[34rem] rounded-full border border-[#4F6EF7]/15" />
          <div className="pointer-events-none absolute -right-16 top-[25rem] h-72 w-72 rounded-full border border-[#FF8A72]/25" />
          <div className="relative mx-auto max-w-[1380px]">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D95858]">The peptide library</p>
                <h2 className="mt-5 max-w-3xl font-display text-[clamp(2.55rem,4.4vw,4.7rem)] font-medium leading-[0.98] tracking-[-0.045em]">Singles when precision matters. <span className="font-serif italic text-[#D95858]">Blends when pathways overlap.</span></h2>
              </div>
              <p className="max-w-lg text-lg leading-8 text-[#23324D]/66 lg:justify-self-end">The platform is being designed for a growing catalog—not one hero vial. Each formula will have its own purpose, lot record, testing, and plain-language research profile.</p>
            </div>

            <div className="relative mt-14 min-h-[420px] overflow-hidden rounded-[2rem] bg-[#C7D2F2] md:min-h-[620px]">
              <Image src="/images/canis/peptide-family.png" alt="A coordinated family of canine peptide and blend concept products" fill sizes="100vw" className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 bg-gradient-to-t from-[#101829]/85 via-[#101829]/30 to-transparent px-7 pb-7 pt-28 text-white md:px-10 md:pb-10">
                <div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#A9C7FF]">A system, not a single SKU</p><p className="mt-2 max-w-xl font-display text-2xl font-semibold md:text-4xl">A coherent family for singles, blends, and future formats.</p></div>
                <span className="rounded-full border border-white/35 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em]">Concept packaging</span>
              </div>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product, index) => (
                <article key={product.name} className="group overflow-hidden rounded-2xl border border-[#17233B]/12 bg-[#FBFAFF] shadow-[0_18px_50px_rgba(23,35,59,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(23,35,59,0.14)]">
                  <div className="relative grid min-h-[290px] place-items-center overflow-hidden bg-[radial-gradient(circle_at_50%_35%,#F8FAFF_0%,#E8ECFF_58%,#DCE3F5_100%)] px-6 pt-10">
                    <div className="absolute left-5 top-5 flex items-center gap-2"><span className="rounded-full bg-[#FBFAFF] px-3 py-2 text-[9px] font-bold uppercase tracking-[0.14em] text-[#17233B]">{product.type}</span><span className="rounded-full border border-[#17233B]/15 bg-white/45 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.14em] text-[#17233B]/65">RUO</span></div>
                    <span className="absolute right-5 top-7 text-[9px] font-bold text-[#17233B]/35">0{index + 1}</span>
                    <ProductVial color={product.color} ink={product.ink} name={product.name} />
                    <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#D7DEEF] to-transparent" />
                  </div>
                  <div className="p-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#D95858]">{product.focus}</p>
                    <h3 className="mt-3 font-display text-[1.65rem] font-semibold tracking-[-0.035em] text-[#17233B]">{product.name}</h3>
                    <p className="mt-1 min-h-10 text-sm leading-5 text-[#17233B]/55">{product.formula}</p>
                    <div className="mt-5 border-t border-[#17233B]/12 pt-5">
                      <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#17233B]/45">Planned research formats</p>
                      <div className="mt-3 flex flex-wrap gap-2">{product.formats.map((format) => <span key={format} className="rounded-full border border-[#17233B]/15 px-3 py-2 text-[10px] font-bold text-[#17233B]">{format}</span>)}</div>
                    </div>
                    <div className="mt-5 grid grid-cols-2 gap-2 text-[10px] font-semibold text-[#17233B]/60"><span className="flex items-center gap-2"><i className="ri-file-shield-2-line text-[#D95858]" /> Lot-specific COA</span><span className="flex items-center gap-2"><i className="ri-flask-line text-[#D95858]" /> Lyophilized</span></div>
                    <Link href={index === 0 ? "#protocol" : "#science"} className="mt-6 flex w-full items-center justify-between rounded-full bg-[#17233B] px-5 py-4 text-[10px] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#D95858]">View research profile <i className="ri-arrow-right-line text-base" /></Link>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-8 grid gap-4 rounded-2xl bg-[#17233B] p-6 text-white md:grid-cols-[auto_1fr] md:items-center md:p-8">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-[#FF8A72] text-xl text-[#17233B]"><i className="ri-microscope-line" /></span>
              <div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#A9C7FF]">Research use only</p><p className="mt-2 max-w-4xl text-sm leading-6 text-white/65">Catalog concepts are laboratory research materials—not approved veterinary medicines and not intended for administration to humans or animals. Canine language describes the research context only. Final formulas, specifications, availability, labeling, and claims remain subject to analytical, veterinary, and legal review.</p></div>
            </div>
          </div>
        </section>

        <section id="protocol" className="bg-[#17233B] px-5 py-20 text-white md:px-10 md:py-28">
          <div className="mx-auto grid max-w-[1380px] gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-center">
            <div className="relative min-h-[620px] overflow-hidden rounded-[2rem] bg-[#EEF2FF]">
              <Image src="/images/canis/product-vial.png" alt="Concept packaging for a canine research protocol" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              <span className="absolute left-5 top-5 rounded-full bg-[#F6F7FC] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#17233B]">Concept · pre-launch</span>
            </div>
            <div className="lg:pl-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A9C7FF]">Featured blend / mobility research</p>
              <h2 className="mt-5 font-display text-[clamp(2.7rem,4.5vw,4.9rem)] font-medium leading-[0.94] tracking-[-0.05em]">The<br /><span className="font-serif italic text-[#A9C7FF]">Long Run.</span></h2>
              <p className="mt-7 max-w-xl text-lg leading-8 text-white/66">The first signature blend concept combines BPC-157 and TB-500 around connective-tissue and recovery research. It leads the collection, but it&apos;s one part of a broader canine peptide system.</p>
              <div className="mt-9 grid gap-px overflow-hidden rounded-2xl bg-white/15 sm:grid-cols-3">
                {[["Status","In review"],["Format","To be confirmed"],["Records","Lot linked"]].map(([label,value]) => <div key={label} className="bg-[#17233B] p-5"><p className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/40">{label}</p><p className="mt-2 text-sm font-semibold">{value}</p></div>)}
              </div>
              <Link href="#questions" className="mt-8 inline-flex items-center gap-3 border-b border-[#A9C7FF] pb-2 text-xs font-bold uppercase tracking-[0.14em] text-[#A9C7FF]">See responsible-use answers <i className="ri-arrow-right-line" /></Link>
            </div>
          </div>
        </section>

        <section className="bg-[#EEF2FF] px-5 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-[1380px]">
            <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D95858]">Where the questions begin</p>
                <h2 className="mt-5 max-w-3xl font-display text-[clamp(2.5rem,4.3vw,4.6rem)] font-medium leading-[0.98] tracking-[-0.045em]">Built around canine <span className="font-serif italic text-[#D95858]">research contexts.</span></h2>
              </div>
              <div className="lg:justify-self-end">
                <p className="max-w-xl text-lg leading-8 text-[#17233B]/65">Not a human peptide catalog with a paw added. Every profile starts with the canine research question, the limits of the evidence, and what would need to be measured.</p>
                <Link href="#science" className="mt-6 inline-flex items-center gap-2 border-b border-[#17233B]/30 pb-2 text-[10px] font-bold uppercase tracking-[0.15em]">See our evidence standard <i className="ri-arrow-right-line" /></Link>
              </div>
            </div>
            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {studyContexts.map((context, index) => (
                <article key={context.title} className="group overflow-hidden rounded-2xl bg-[#FBFAFF]">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#DCE3F5]">
                    <Image src={context.image} alt="" fill sizes="(max-width: 768px) 100vw, 25vw" className={`object-cover transition duration-700 group-hover:scale-[1.035] ${context.position}`} />
                    <span className="absolute left-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-[#FBFAFF] text-[9px] font-bold text-[#17233B]">0{index + 1}</span>
                  </div>
                  <div className="p-6">
                    <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#D95858]">{context.kicker}</p>
                    <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.035em]">{context.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#17233B]/58">{context.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="science" className="bg-[linear-gradient(135deg,#DCE7FF_0%,#EEF2FF_58%,#F8F3FF_100%)] px-5 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-[1380px]">
            <div className="grid gap-10 lg:grid-cols-2">
              <div><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D95858]">Proof over promises</p><h2 className="mt-5 max-w-xl font-display text-[clamp(2.5rem,4.3vw,4.5rem)] font-medium leading-[0.98] tracking-[-0.045em]">Trust is a system, not a <span className="font-serif italic text-[#D95858]">badge.</span></h2></div>
              <p className="max-w-lg self-end text-lg leading-8 text-[#23324D]/66 lg:justify-self-end">We&apos;re carrying forward the operational backbone already built for EVLV—CRM-backed inventory, lot documentation, account records, and checkout—then adding dog-specific guardrails before activation.</p>
            </div>
            <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {standards.map(([number,title,text]) => <article key={number} className="min-h-72 rounded-2xl border border-[#17233B]/12 bg-[#F6F7FC]/65 p-7"><span className="text-[10px] font-bold tracking-[0.2em] text-[#D95858]">{number}</span><h3 className="mt-20 font-display text-2xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-[#23324D]/62">{text}</p></article>)}
            </div>
          </div>
        </section>

        <section className="bg-[#101829] px-5 py-24 text-white md:px-10 md:py-32">
          <div className="mx-auto max-w-[1380px]">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
              <div><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A9C7FF]">A research cycle, not a treatment cycle</p><h2 className="mt-5 max-w-3xl font-display text-[clamp(2.5rem,4.3vw,4.6rem)] font-medium leading-[0.98] tracking-[-0.045em]">From a canine question to a <span className="font-serif italic text-[#A9C7FF]">defensible record.</span></h2></div>
              <p className="max-w-lg text-lg leading-8 text-white/60 lg:justify-self-end">A clear four-step journey makes a complex category easier to understand while centering the work a responsible research platform actually needs: framing, matching, verification, and documentation.</p>
            </div>
            <div className="relative mt-16 grid gap-4 lg:grid-cols-4">
              <div className="absolute left-[8%] right-[8%] top-7 hidden h-px bg-white/15 lg:block" />
              {researchCycle.map(([number, title, body]) => (
                <article key={number} className="relative rounded-2xl border border-white/12 bg-white/[0.045] p-7 backdrop-blur">
                  <span className="relative z-10 grid h-14 w-14 place-items-center rounded-full border border-[#A9C7FF]/45 bg-[#101829] text-[10px] font-bold tracking-[0.14em] text-[#A9C7FF]">{number}</span>
                  <h3 className="mt-14 font-display text-2xl font-semibold tracking-[-0.035em]">{title}</h3>
                  <p className="mt-4 text-sm leading-6 text-white/55">{body}</p>
                </article>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-[#FF8A72] p-6 text-[#17233B] md:flex-row md:items-center md:justify-between md:p-8"><div><p className="text-[10px] font-bold uppercase tracking-[0.16em]">The free field guide · planned</p><p className="mt-2 font-display text-2xl font-semibold">How to read a peptide research profile and its COA.</p></div><span className="shrink-0 rounded-full bg-[#17233B] px-6 py-4 text-[10px] font-bold uppercase tracking-[0.15em] text-white">Guide in development</span></div>
          </div>
        </section>

        <section className="bg-[linear-gradient(135deg,#FF8A72_0%,#FFB7AD_40%,#B7C3FF_100%)] px-5 py-24 text-[#17233B] md:px-10 md:py-32">
          <div className="mx-auto grid max-w-[1380px] gap-6 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="relative min-h-[560px] overflow-hidden rounded-[2rem] bg-[#17233B]">
              <Image src="/images/canis/hero-senior-lab.png" alt="A senior Labrador on a walk" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-[62%_center]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17233B]/75 via-transparent to-transparent" />
              <p className="absolute bottom-7 left-7 right-7 text-[10px] font-bold uppercase tracking-[0.17em] text-white/75">Canine-first from the first question</p>
            </div>
            <div className="flex flex-col justify-between rounded-[2rem] bg-[#F6F7FC] p-8 md:p-12">
              <div><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D95858]">Why we&apos;re building it</p><h2 className="mt-6 max-w-2xl font-display text-[clamp(2.5rem,4.2vw,4.5rem)] font-medium leading-[0.98] tracking-[-0.045em]">Dogs shouldn&apos;t be an <span className="font-serif italic text-[#D95858]">afterthought.</span></h2><p className="mt-7 max-w-xl text-base leading-7 text-[#17233B]/62">The opportunity is not to make louder promises. It&apos;s to build a focused canine research experience: clearer questions, better records, honest limits, and an expanding library that feels made for this category from day one.</p></div>
              <div className="mt-14 grid grid-cols-3 gap-px overflow-hidden rounded-xl bg-[#17233B]/15 text-center"><div className="bg-[#F6F7FC] p-4"><p className="font-display text-2xl font-semibold">Canine</p><p className="mt-1 text-[8px] font-bold uppercase tracking-[0.14em] opacity-45">Focused</p></div><div className="bg-[#F6F7FC] p-4"><p className="font-display text-2xl font-semibold">Lot</p><p className="mt-1 text-[8px] font-bold uppercase tracking-[0.14em] opacity-45">Linked</p></div><div className="bg-[#F6F7FC] p-4"><p className="font-display text-2xl font-semibold">RUO</p><p className="mt-1 text-[8px] font-bold uppercase tracking-[0.14em] opacity-45">Clear</p></div></div>
            </div>
          </div>
        </section>

        <section className="bg-[#EEF2FF] px-5 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-[1380px]">
            <div className="max-w-3xl"><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D95858]">One library. More layers coming.</p><h2 className="mt-5 font-display text-[clamp(2.5rem,4.3vw,4.6rem)] font-medium leading-[0.98] tracking-[-0.045em]">The peptide catalog is <span className="font-serif italic text-[#D95858]">only the beginning.</span></h2></div>
            <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {roadmap.map(([status, title, body], index) => (
                <article key={title} className={`flex min-h-[340px] flex-col justify-between rounded-2xl p-7 ${index === 0 ? "bg-[#17233B] text-white" : "border border-[#17233B]/12 bg-[#FBFAFF]"}`}>
                  <div className="flex items-center justify-between"><span className={`text-[9px] font-bold uppercase tracking-[0.16em] ${index === 0 ? "text-[#A9C7FF]" : "text-[#D95858]"}`}>{status}</span><span className="text-[9px] font-bold opacity-35">0{index + 1}</span></div>
                  <div><h3 className="font-display text-3xl font-semibold tracking-[-0.045em]">{title}</h3><p className={`mt-4 text-sm leading-6 ${index === 0 ? "text-white/55" : "text-[#17233B]/58"}`}>{body}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="questions" className="bg-[#EEF2FF] px-5 py-24 md:px-10 md:py-32">
          <div className="mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-[0.7fr_1.3fr]">
            <div><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D95858]">Straight answers</p><h2 className="mt-4 font-display text-[clamp(2.35rem,3.5vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.04em]">Before anything else.</h2><p className="mt-6 max-w-sm text-sm leading-7 text-[#23324D]/62">This is an early brand and platform build. Product availability and claims remain intentionally limited until review is complete.</p></div>
            <div className="border-t border-[#17233B]/20">
              {faqs.map(([question,answer]) => <details key={question} className="group border-b border-[#17233B]/20 py-6"><summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-xl font-semibold tracking-[-0.025em] md:text-2xl">{question}<span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#17233B]/25 text-sm transition group-open:rotate-45">+</span></summary><p className="max-w-2xl pt-5 text-[15px] leading-7 text-[#23324D]/65">{answer}</p></details>)}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#101829] px-5 pb-8 pt-16 text-[#F6F7FC] md:px-10 md:pt-24">
        <div className="mx-auto max-w-[1380px]">
          <div className="grid gap-12 border-b border-white/15 pb-16 lg:grid-cols-[1.2fr_0.8fr]">
            <div><BrandMark light /><p className="mt-7 max-w-lg font-display text-3xl font-medium leading-snug tracking-[-0.03em]">A longer horizon for the dogs who give us everything.</p></div>
            <div className="grid grid-cols-2 gap-8 text-sm lg:justify-self-end"><div className="space-y-3 text-white/60"><p className="mb-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#A9C7FF]">Explore</p><p><Link href="#collection">Peptides</Link></p><p><Link href="#approach">Approach</Link></p><p><Link href="#science">Standards</Link></p><p><Link href="#questions">Questions</Link></p></div><div className="space-y-3 text-white/60"><p className="mb-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#A9C7FF]">Platform</p><p>Multiple peptides</p><p>Signature blends</p><p>Lot traceability</p><p>Pre-launch</p></div></div>
          </div>
          <div className="flex flex-col gap-4 py-7 text-[10px] uppercase tracking-[0.12em] text-white/38 md:flex-row md:items-center md:justify-between"><p>© 2026 PetPeps · Working brand concept</p><p>Research materials only · Not veterinary advice · Not intended to diagnose, treat, cure, or prevent disease</p></div>
        </div>
      </footer>
    </div>
  );
}

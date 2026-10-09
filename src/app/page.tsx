import Image from "next/image";
import Link from "next/link";
import ProductCarousel, { type Product } from "./components/ProductCarousel";
import { getProductBySlug } from "@/lib/products";

const crmProduct = (slug: string) => {
  const product = getProductBySlug(slug);
  if (!product) throw new Error(`Missing CRM product: ${slug}`);
  return product;
};

const pathways = [
  ["01", "You notice it first", "The pause at the stairs. The shorter walk. The extra time it takes to stand. Small changes are often what send owners looking for answers.", "ri-eye-line"],
  ["02", "Care gets expensive fast", "When every next step carries another bill, people need a clearer way to understand what is established, what is experimental, and what to ask next.", "ri-wallet-3-line"],
  ["03", "Clarity protects your dog", "A short list, honest evidence limits, and a veterinarian in the conversation are worth more than a giant catalog of confident promises.", "ri-shield-check-line"],
];

const standards = [
  ["01", "Source", "See where a claim comes from: human data, laboratory research, animal models, or owner observation."],
  ["02", "Species", "Human or laboratory findings are never presented as proof that the same outcome occurs in dogs."],
  ["03", "Lot", "Identity and purity results stay connected to the exact research lot—not a generic sample."],
  ["04", "Limits", "Every profile states what is unknown and what still requires veterinary or controlled canine research."],
];

const products: Product[] = [
  { name: "The Long Run", formula: "BPC-157 + TB-500", type: "K9 peptide blend", focus: "Paired repair-pathway research", reason: "A familiar pairing in repair-pathway research conversations, shown with the limits of that evidence intact.", formats: ["10 + 10 mg"], variants: [{ label: "10 + 10 mg", cartProducts: [crmProduct("bpc-tb-500-blend-20mg")] }], color: "#17233B", ink: "#F6F7FC" },
  { name: "Matrix Pair", formula: "GHK-Cu + KPV", type: "K9 research pair", focus: "Skin and tissue model research", reason: "A paired profile for researchers comparing copper-peptide and tissue-model literature in one place.", formats: ["50 + 10 mg"], variants: [{ label: "50 + 10 mg pair", cartProducts: [crmProduct("ghk-cu-50mg"), crmProduct("kpv-10mg")] }], color: "#7869C9", ink: "#FBFAFF" },
  { name: "BPC-157", formula: "Pentadecapeptide", type: "K9 single peptide", focus: "Tissue-pathway research", reason: "Included because it is widely discussed in repair research—not because canine benefit has been established.", formats: ["5 mg", "10 mg"], variants: [{ label: "5 mg", cartProducts: [crmProduct("bpc-157-5mg")] }, { label: "10 mg", cartProducts: [crmProduct("bpc-157-10mg")] }], color: "#5F7CF6", ink: "#FBFAFF" },
  { name: "TB-500", formula: "Thymosin beta-4 fragment", type: "K9 single peptide", focus: "Cell-migration research", reason: "A focused way to review cell-migration and repair-model literature without treating early findings as veterinary proof.", formats: ["5 mg", "10 mg"], variants: [{ label: "5 mg", cartProducts: [crmProduct("tb-500-5mg")] }, { label: "10 mg", cartProducts: [crmProduct("tb-500-10mg")] }], color: "#5A7A9E", ink: "#F6F7FC" },
  { name: "GHK-Cu", formula: "Copper peptide complex", type: "K9 single peptide", focus: "Copper-peptide research", reason: "Included for its established place in copper-peptide, tissue, and skin-model research conversations.", formats: ["50 mg"], variants: [{ label: "50 mg", cartProducts: [crmProduct("ghk-cu-50mg")] }], color: "#8C68D8", ink: "#FBFAFF" },
];

const studyContexts = [
  { title: "Getting up looks harder", kicker: "The first signal", body: "A change in rising, stairs, or jumping is a reason to document what changed and speak with a veterinarian—not guess at a diagnosis.", image: "/images/canis/story-before.png", position: "object-center" },
  { title: "Walks keep getting shorter", kicker: "The routine changes", body: "Owners know a dog’s normal. Tracking distance, pace, and recovery gives the veterinary conversation something concrete.", image: "/images/canis/hero-senior-lab.png", position: "object-[68%_center]" },
  { title: "Recovery takes longer", kicker: "After activity", body: "Repeated soreness or a slower return to normal deserves context, especially for active, working, and large-breed dogs.", image: "/images/canis/story-followup.png", position: "object-center" },
  { title: "You want to compare options", kicker: "Before another expense", body: "Read what each research profile actually supports, what it does not, and which questions belong with your veterinarian.", image: "/images/canis/mobility-story.png", position: "object-center" },
];

const researchCycle = [
  ["01", "Write down the change", "Note when it started, what movement looks different, and whether it is getting worse."],
  ["02", "Start with a veterinarian", "Pain and mobility changes can have many causes. A proper examination belongs before product research."],
  ["03", "Read the evidence by species", "Separate human data, laboratory findings, animal models, and canine evidence instead of blending them together."],
  ["04", "Ask a better next question", "Use the record to discuss reasonable, legal, and evidence-based options—not to self-prescribe an RUO material."],
];

const faqs = [
  ["Are peptide products approved medicines for dogs?", "No. The compounds presented here are research materials and are not approved veterinary medicines. No content on this site is a diagnosis, treatment plan, or replacement for veterinary care."],
  ["Why discuss canine research if the products are RUO?", "The canine focus defines the scientific subject matter, literature, and research questions this catalog organizes. It does not change product status: research-use-only materials are not intended for administration to humans or animals."],
  ["How will product quality be documented?", "Each available research lot is designed to connect to identity, purity, and batch documentation through the same CRM-backed lot system used by the parent platform."],
  ["Should I speak with my veterinarian?", "Yes. Always involve a licensed veterinarian in decisions concerning your dog, particularly when your dog has a health condition or uses prescription medication."],
  ["Why is the collection intentionally small?", "Because more products do not create more certainty. PetPeps focuses on a short list of widely discussed research peptides and blends, then makes the evidence source and limitations visible for each one."],
  ["Can I give a research-use-only peptide to my dog?", "PetPeps research materials are not approved veterinary medicines and are not intended for administration to animals. A product labeled for research use should not be treated as a substitute for a veterinary diagnosis or an approved treatment."],
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
      <header className="absolute inset-x-0 top-0 z-30 px-4 pt-4 text-white md:px-8 md:pt-6">
        <div className="mx-auto flex h-16 max-w-[1420px] items-center justify-between rounded-full border border-white/15 bg-[#101829]/72 px-4 shadow-[0_18px_60px_rgba(16,24,41,0.18)] backdrop-blur-xl md:h-[4.5rem] md:px-6">
          <Link href="#top" aria-label="PetPeps home"><BrandMark light /></Link>
          <nav className="hidden items-center gap-7 text-[11px] font-semibold uppercase tracking-[0.13em] lg:flex" aria-label="Main navigation">
            <Link href="#collection" className="transition hover:text-[#A9C7FF]">K9 peptides</Link>
            <Link href="#approach" className="transition hover:text-[#A9C7FF]">Our approach</Link>
            <Link href="#science" className="transition hover:text-[#A9C7FF]">The science</Link>
            <Link href="#stories" className="transition hover:text-[#A9C7FF]">Dog stories</Link>
            <Link href="#questions" className="transition hover:text-[#A9C7FF]">Questions</Link>
          </nav>
          <Link href="#collection" className="rounded-full bg-[#F6F7FC] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.13em] text-[#17233B] transition hover:bg-[#A9C7FF]"><span className="sm:hidden">Collection</span><span className="hidden sm:inline">Explore collection</span></Link>
        </div>
      </header>

      <main id="top">
        <section className="relative min-h-[780px] bg-[#17233B] text-white md:min-h-[860px]">
          <Image src="/images/canis/hero-senior-lab.png" alt="A mature black Labrador enjoying a sunrise walk with its owner" fill priority sizes="100vw" className="object-cover object-[62%_center]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,24,41,0.98)_0%,rgba(16,24,41,0.91)_30%,rgba(16,24,41,0.42)_62%,rgba(16,24,41,0.12)_100%)]" />
          <div className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-[#4F6EF7]/18 blur-3xl" />
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#17233B] to-transparent" />
          <div className="relative mx-auto flex min-h-[780px] max-w-[1480px] items-end px-5 pb-20 pt-32 md:min-h-[860px] md:items-center md:px-10 md:pb-8">
            <div className="max-w-[760px]">
              <p className="mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B7C3FF]"><span className="h-px w-10 bg-[#B7C3FF]" /> For the dogs who still want to go</p>
              <h1 className="max-w-[700px] font-display text-[clamp(3.35rem,7vw,6.8rem)] font-medium leading-[0.88] tracking-[-0.055em]">When they slow down,<span className="block font-serif italic text-[#A9C7FF]">you feel it.</span></h1>
              <p className="mt-8 max-w-xl text-base leading-7 text-white/72 md:text-lg">PetPeps is a K9-only peptide research library—so dog owners can understand why a compound is being studied, what remains unknown, and what to ask before spending more.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="#collection" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FF8A72] px-7 py-4 text-xs font-bold uppercase tracking-[0.13em] text-[#17233B] transition hover:bg-[#FFC0B0]">See the focused collection <i className="ri-arrow-right-line" /></Link>
                <Link href="#science" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 px-7 py-4 text-xs font-bold uppercase tracking-[0.13em] transition hover:bg-white hover:text-[#17233B]">Understand the evidence</Link>
              </div>
            </div>
          </div>
          <div className="absolute bottom-7 right-8 hidden overflow-hidden rounded-full border border-white/15 bg-[#101829]/48 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/65 backdrop-blur xl:flex"><span className="px-5 py-3">2 focused blends</span><span className="border-l border-white/15 px-5 py-3">3 single peptides</span><span className="border-l border-white/15 px-5 py-3">Evidence by species</span></div>
        </section>

        <section className="border-b border-[#17233B]/12 bg-[#FF8A72] px-5 py-5 text-[#17233B]">
          <div className="mx-auto flex max-w-[1480px] flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left">
            <p className="font-display text-xl font-semibold tracking-[-0.03em]">Care gets expensive fast. Clarity shouldn&apos;t.</p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10px] font-bold uppercase tracking-[0.16em]"><span>Shortlist, not catalog</span><i className="ri-checkbox-blank-circle-fill text-[5px]" /><span>Evidence with limits</span><i className="ri-checkbox-blank-circle-fill text-[5px]" /><span>Vet-first questions</span></div>
          </div>
        </section>

        <section id="stories" className="bg-[#EEF2FF] px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1380px]">
            <div className="mb-12 grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D95858]">The moment you start searching</p>
              <div><h2 className="max-w-3xl font-display text-[clamp(2.5rem,4.2vw,4.4rem)] font-medium leading-[0.98] tracking-[-0.045em]">The changes you notice <span className="font-serif italic text-[#D95858]">before anyone else.</span></h2><p className="mt-5 max-w-2xl text-base leading-7 text-[#23324D]/65">The pause before a step. The walk that ends early. The good day that takes longer to come back from. Start by documenting the change—not by chasing a promise.</p></div>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.8fr_0.8fr_1fr]">
              <StoryFrame image="/images/canis/story-before.png" label="Before" caption="Pausing at the steps" />
              <StoryFrame image="/images/canis/story-followup.png" label="Follow-up" caption="Moving through the day" warm />
              <article className="flex min-h-[560px] flex-col justify-between rounded-[1.75rem] bg-[#17233B] p-8 text-white md:p-10">
                <div>
                  <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.17em] text-[#A9C7FF]"><span className="h-px w-8 bg-[#A9C7FF]" /> Make the change visible</div>
                  <h2 className="mt-8 max-w-md font-display text-[clamp(2.5rem,3.8vw,4rem)] font-medium leading-[0.98] tracking-[-0.045em]">Same dog. Same movement. <span className="font-serif italic text-[#A9C7FF]">No dramatic edit.</span></h2>
                  <p className="mt-7 max-w-md text-base leading-7 text-white/65">Dated, comparable footage helps an owner describe what changed and gives a veterinarian more useful context than memory alone.</p>
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
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D95858]">A deliberately small K9 collection</p>
                <h2 className="mt-5 max-w-3xl font-display text-[clamp(2.55rem,4.4vw,4.7rem)] font-medium leading-[0.98] tracking-[-0.045em]">Fewer formulas. <span className="font-serif italic text-[#D95858]">Better reasons.</span></h2>
              </div>
              <div className="max-w-lg lg:justify-self-end"><p className="text-lg leading-8 text-[#23324D]/66">We cut the noise down to five dog-focused research profiles that repeatedly appear in repair, tissue, and copper-peptide conversations. Being well known is not the same as being proven for dogs—each profile makes that distinction visible.</p><div className="mt-5 flex flex-wrap gap-2"><span className="rounded-full bg-[#17233B] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white">K9 research only</span><span className="rounded-full border border-[#17233B]/20 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#17233B]">2 blends · 3 singles</span></div></div>
            </div>

            <div className="relative mt-14 min-h-[420px] overflow-hidden rounded-[2rem] bg-[#C7D2F2] md:min-h-[620px]">
              <Image src="/images/canis/peptide-family.png" alt="A coordinated family of PetPeps blends and individual research materials" fill sizes="100vw" className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 bg-gradient-to-t from-[#101829]/85 via-[#101829]/30 to-transparent px-7 pb-7 pt-28 text-white md:px-10 md:pb-10">
                 <div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#A9C7FF]">Chosen, not crowded</p><p className="mt-2 max-w-xl font-display text-2xl font-semibold md:text-4xl">A short list with a reason for every formula.</p></div>
                <span className="rounded-full border border-white/35 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em]">Five research profiles</span>
              </div>
            </div>

            <ProductCarousel products={products} />
            <div className="mt-8 grid gap-4 rounded-2xl bg-[#17233B] p-6 text-white md:grid-cols-[auto_1fr] md:items-center md:p-8">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-[#FF8A72] text-xl text-[#17233B]"><i className="ri-microscope-line" /></span>
              <div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#A9C7FF]">Research use only</p><p className="mt-2 max-w-4xl text-sm leading-6 text-white/65">These are laboratory research materials—not approved veterinary medicines and not intended for administration to humans or animals. Canine language describes the research context only; specifications, availability, labeling, and claims remain subject to analytical, veterinary, and legal review.</p></div>
            </div>
          </div>
        </section>

        <section id="approach" className="bg-[#FBFCFF] px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1380px]">
            <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
              <div><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D95858]">Why PetPeps</p><p className="mt-5 max-w-sm text-base leading-7 text-[#23324D]/62">The best product shelf is not the biggest one. It is the one that helps you understand why each option is there—and where the evidence stops.</p></div>
              <h2 className="max-w-4xl font-display text-[clamp(2.5rem,4.5vw,4.7rem)] font-medium leading-[0.98] tracking-[-0.045em]">You know their normal. <span className="font-serif italic text-[#D95858]">We help you question the noise.</span></h2>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {pathways.map(([number, title, text, icon]) => (
                <article key={number} className="group rounded-[1.5rem] border border-[#17233B]/10 bg-white p-7 shadow-[0_16px_50px_rgba(23,35,59,0.05)] md:p-8">
                  <div className="flex items-center justify-between"><span className="text-[10px] font-bold tracking-[0.2em] text-[#D95858]">{number}</span><span className="grid h-12 w-12 place-items-center rounded-full bg-[#DCE7FF] text-xl transition group-hover:bg-[#17233B] group-hover:text-white"><i className={icon} /></span></div>
                  <h3 className="mt-10 font-display text-2xl font-semibold tracking-[-0.03em]">{title}</h3>
                  <p className="mt-4 max-w-sm text-[15px] leading-7 text-[#23324D]/65">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#EEF2FF] px-5 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-[1380px]">
            <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D95858]">What sends owners looking</p>
                <h2 className="mt-5 max-w-3xl font-display text-[clamp(2.5rem,4.3vw,4.6rem)] font-medium leading-[0.98] tracking-[-0.045em]">It usually starts with <span className="font-serif italic text-[#D95858]">one small thing.</span></h2>
              </div>
              <div className="lg:justify-self-end">
                <p className="max-w-xl text-lg leading-8 text-[#17233B]/65">These moments do not identify a cause, but they do matter. PetPeps helps owners turn worry into a clearer record and a more useful conversation.</p>
                <Link href="#science" className="mt-6 inline-flex items-center gap-2 border-b border-[#17233B]/30 pb-2 text-[10px] font-bold uppercase tracking-[0.15em]">See how evidence is graded <i className="ri-arrow-right-line" /></Link>
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

        <section id="science" className="bg-[#101829] px-5 py-24 text-white md:px-10 md:py-32">
          <div className="mx-auto max-w-[1380px]">
            <div className="grid gap-10 border-b border-white/15 pb-16 lg:grid-cols-2 lg:items-end">
              <div><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A9C7FF]">Before you spend more</p><h2 className="mt-5 max-w-3xl font-display text-[clamp(2.5rem,4.3vw,4.6rem)] font-medium leading-[0.98] tracking-[-0.045em]">Know what the evidence can—and <span className="font-serif italic text-[#A9C7FF]">cannot—say.</span></h2></div>
              <p className="max-w-lg text-lg leading-8 text-white/60 lg:justify-self-end">A compound can be popular, studied in people, or promising in a laboratory and still have no established canine benefit. PetPeps keeps those evidence levels separate.</p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {standards.map(([number,title,text]) => <article key={number} className="rounded-[1.4rem] border border-white/12 bg-white/[0.05] p-7"><span className="text-[10px] font-bold tracking-[0.2em] text-[#A9C7FF]">{number}</span><h3 className="mt-12 font-display text-2xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-white/55">{text}</p></article>)}
            </div>
            <div className="mt-20 grid gap-8 lg:grid-cols-[0.65fr_1.35fr]">
              <div><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF8A72]">A safer decision path</p><h3 className="mt-5 max-w-md font-display text-[clamp(2.1rem,3vw,3.3rem)] font-medium leading-[1.02] tracking-[-0.04em]">Worry less blindly. Ask better questions.</h3></div>
              <div className="grid gap-3 sm:grid-cols-2">
                {researchCycle.map(([number, title, body]) => (
                  <article key={number} className="rounded-[1.4rem] border border-white/12 bg-white/[0.04] p-6">
                    <div className="flex items-center gap-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#A9C7FF] text-[10px] font-bold text-[#101829]">{number}</span><h4 className="font-display text-xl font-semibold">{title}</h4></div>
                    <p className="mt-5 text-sm leading-6 text-white/55">{body}</p>
                  </article>
                ))}
              </div>
            </div>
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
              <div><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D95858]">Why PetPeps exists</p><h2 className="mt-6 max-w-2xl font-display text-[clamp(2.5rem,4.2vw,4.5rem)] font-medium leading-[0.98] tracking-[-0.045em]">Love makes you want to act. <span className="font-serif italic text-[#D95858]">Good information makes you slow down.</span></h2><p className="mt-7 max-w-xl text-base leading-7 text-[#17233B]/62">Pet owners deserve more than miracle language and endless choices. They deserve a short list, visible evidence limits, transparent lots, and a clear reminder that a dog in pain needs veterinary care—not an internet shortcut.</p></div>
              <div className="mt-14 grid grid-cols-3 gap-px overflow-hidden rounded-xl bg-[#17233B]/15 text-center"><div className="bg-[#F6F7FC] p-4"><p className="font-display text-2xl font-semibold">Canine</p><p className="mt-1 text-[8px] font-bold uppercase tracking-[0.14em] opacity-45">Focused</p></div><div className="bg-[#F6F7FC] p-4"><p className="font-display text-2xl font-semibold">Lot</p><p className="mt-1 text-[8px] font-bold uppercase tracking-[0.14em] opacity-45">Linked</p></div><div className="bg-[#F6F7FC] p-4"><p className="font-display text-2xl font-semibold">RUO</p><p className="mt-1 text-[8px] font-bold uppercase tracking-[0.14em] opacity-45">Clear</p></div></div>
            </div>
          </div>
        </section>

        <section id="questions" className="bg-[#FBFCFF] px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-[0.7fr_1.3fr]">
            <div><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D95858]">The questions that matter</p><h2 className="mt-4 font-display text-[clamp(2.35rem,3.5vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.04em]">Before you trust a vial.</h2><p className="mt-6 max-w-sm text-sm leading-7 text-[#23324D]/62">What is proven? In which species? Is the lot documented? And is this a research material or an approved veterinary medicine?</p></div>
            <div className="border-t border-[#17233B]/20">
              {faqs.map(([question,answer]) => <details key={question} className="group border-b border-[#17233B]/20 py-6"><summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-xl font-semibold tracking-[-0.025em] md:text-2xl">{question}<span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#17233B]/25 text-sm transition group-open:rotate-45">+</span></summary><p className="max-w-2xl pt-5 text-[15px] leading-7 text-[#23324D]/65">{answer}</p></details>)}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#101829] px-5 pb-8 pt-16 text-[#F6F7FC] md:px-10 md:pt-24">
        <div className="mx-auto max-w-[1380px]">
          <div className="grid gap-12 border-b border-white/15 pb-16 lg:grid-cols-[1.2fr_0.8fr]">
            <div><BrandMark light /><p className="mt-7 max-w-lg font-display text-3xl font-medium leading-snug tracking-[-0.03em]">K9-focused research for the dogs who give us everything.</p></div>
            <div className="grid grid-cols-2 gap-8 text-sm lg:justify-self-end"><div className="space-y-3 text-white/60"><p className="mb-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#A9C7FF]">Explore</p><p><Link href="#collection">Peptides</Link></p><p><Link href="#approach">Approach</Link></p><p><Link href="#science">Standards</Link></p><p><Link href="#questions">Questions</Link></p></div><div className="space-y-3 text-white/60"><p className="mb-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#A9C7FF]">Collection</p><p>Peptide blends</p><p>Single peptides</p><p>Lot documentation</p><p>Research profiles</p></div></div>
          </div>
          <div className="flex flex-col gap-4 py-7 text-[10px] uppercase tracking-[0.12em] text-white/38 md:flex-row md:items-center md:justify-between"><p>© 2026 PetPeps · Canine research library</p><p>Research materials only · Not veterinary advice · Not intended to diagnose, treat, cure, or prevent disease</p></div>
        </div>
      </footer>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import ProductCarousel, { type Product } from "./components/ProductCarousel";
import BeforeAfterSection, { type BeforeAfterPair } from "./components/BeforeAfterSection";
import { getProductBySlug } from "@/lib/products";

const crmProduct = (slug: string) => {
  const product = getProductBySlug(slug);
  if (!product) throw new Error(`Missing CRM product: ${slug}`);
  return product;
};

const products: Product[] = [
  { name: "K9 Reforge", formula: "BPC-157", image: "/images/zoonetics-products/k9-reforge.png", type: "K9 single peptide", lane: "single", focus: "Tissue-pathway research", reason: "A focused BPC-157 profile available in three research formats.", formats: ["5 mg", "10 mg", "20 mg"], variants: [{ label: "5 mg", cartProducts: [crmProduct("bpc-157-5mg")] }, { label: "10 mg", cartProducts: [crmProduct("bpc-157-10mg")] }, { label: "20 mg", cartProducts: [crmProduct("bpc-157-20mg")] }], color: "#72A7FF", ink: "#FBFAFF" },
  { name: "K9 Reload", formula: "TB-500", image: "/images/zoonetics-products/k9-reload.png", type: "K9 single peptide", lane: "single", focus: "Cell-migration research", reason: "A focused TB-500 profile available in three research formats.", formats: ["5 mg", "10 mg", "20 mg"], variants: [{ label: "5 mg", cartProducts: [crmProduct("tb-500-5mg")] }, { label: "10 mg", cartProducts: [crmProduct("tb-500-10mg")] }, { label: "20 mg", cartProducts: [crmProduct("tb-500-20mg")] }], color: "#8FB4D5", ink: "#F6F7FC" },
  { name: "K9 Rebuild", formula: "BPC-157 + TB-500", image: "/images/zoonetics-products/k9-rebuild.png", type: "K9 peptide blend", lane: "mobility", focus: "Paired repair-pathway research", reason: "A pre-paired BPC-157 and TB-500 research blend in two formats.", formats: ["10 mg", "20 mg"], variants: [{ label: "10 mg", cartProducts: [crmProduct("bpc-tb-500-blend-10mg")] }, { label: "20 mg", cartProducts: [crmProduct("bpc-tb-500-blend-20mg")] }], color: "#FF8A72", ink: "#F6F7FC" },
  { name: "K9 Restore", formula: "GHK-Cu", image: "/images/zoonetics-products/k9-restore.png", type: "K9 single peptide", lane: "skin", focus: "Copper-peptide research", reason: "A focused 50 mg GHK-Cu profile for tissue and skin-model research.", formats: ["50 mg"], variants: [{ label: "50 mg", cartProducts: [crmProduct("ghk-cu-50mg")] }], color: "#B7A0FF", ink: "#FBFAFF" },
  { name: "K9 Reclaim", formula: "KPV · injectable + oral", image: "/images/zoonetics-products/k9-reclaim.png", type: "K9 dual-format peptide", lane: "skin", focus: "Barrier and inflammatory-pathway research", reason: "KPV in injectable and oral research formats under one clear profile.", formats: ["10 mg injectable", "500 mcg oral"], variants: [{ label: "10 mg injectable", cartProducts: [crmProduct("kpv-10mg")] }, { label: "500 mcg oral", cartProducts: [crmProduct("kpv-oral-500mcg")] }], color: "#77C9A1", ink: "#FBFAFF" },
  { name: "K9 Recast", formula: "GHK-Cu + BPC-157 + TB-500", image: "/images/zoonetics-products/k9-recast.png", type: "K9 triple blend", lane: "mobility", focus: "Multi-pathway research blend", reason: "A 70 mg triple blend combining GHK-Cu, BPC-157, and TB-500 in one research vial.", formats: ["70 mg"], variants: [{ label: "70 mg", cartProducts: [crmProduct("glow-70mg")] }], color: "#F0B76F", ink: "#17233B" },
];

const storyMoments = [
  { kicker: "Signal 01", title: "The pause before the jump", body: "Half-second hesitation. Stairs handled differently. Early data points worth writing down.", image: "/images/canis/story-before.png", position: "object-center" },
  { kicker: "Signal 02", title: "Morning stiffness that clears by noon", body: "Stiff for the first few minutes, fine by midday. That's a pattern, not a bad morning.", image: "/images/canis/mobility-story.png", position: "object-center" },
  { kicker: "Signal 03", title: "Walks keep getting shorter", body: "You know their normal. When distances shrink on back-to-back days, it's a trend.", image: "/images/canis/story-followup.png", position: "object-center" },
  { kicker: "Signal 04", title: "Recovery takes longer than it used to", body: "Used to shake it off overnight. Repeated slow recovery is one of the clearest early signals.", image: "/images/canis/hero-senior-lab.png", position: "object-[68%_center]" },
];

const testimonialVideos = [
  { initials: "SK", name: "Sarah K.", detail: "Golden Retriever, 9 yrs · Portland", quote: "The walk that changed everything.", image: "/images/canis/story-before.png", position: "object-center", duration: "00:41" },
  { initials: "MT", name: "Marcus T.", detail: "German Shepherd, 7 yrs · Austin", quote: "What I filmed before the vet.", image: "/images/canis/mobility-story.png", position: "object-center", duration: "00:33" },
  { initials: "DM", name: "Diane M.", detail: "Labrador, 11 yrs · Denver", quote: "Eight weeks of honest notes.", image: "/images/canis/hero-senior-lab.png", position: "object-[64%_center]", duration: "00:52" },
  { initials: "JR", name: "James R.", detail: "Border Collie, 6 yrs · Seattle", quote: "Why I started tracking the stairs.", image: "/images/canis/story-followup.png", position: "object-center", duration: "00:38" },
];

const beforeAfterPairs: BeforeAfterPair[] = [
  {
    dog: { breed: "Golden Retriever, 9 yrs", age: "F", compound: "K9 Rebuild", compoundSlug: "bpc-tb-500-blend-10mg" },
    owner: "Sarah K.",
    before: {
      week: "01",
      observation: "Hesitating at the bottom of every staircase. Two minutes to get moving after lying down.",
      quote: "I started filming because I needed proof for myself - not the vet, just me.",
      image: "/images/canis/story-before.png",
    },
    after: {
      week: "08",
      observation: "Back to full walk distance. Taking stairs without stopping. Morning stiffness gone.",
      quote: "The vet noticed the difference before I said anything.",
      image: "/images/canis/story-followup.png",
    },
    note: "Owner-observed accounts. Research use only. Not a veterinary outcome.",
  },
  {
    dog: { breed: "German Shepherd, 7 yrs", age: "M", compound: "K9 Restore", compoundSlug: "ghk-cu-50mg" },
    owner: "Marcus T.",
    before: {
      week: "01",
      observation: "Coat dull along the spine. Dry patches on both elbows. Heavy shedding.",
      quote: "I documented it weekly with photos. I had no idea how much it had changed until I looked back.",
      image: "/images/canis/mobility-story.png",
    },
    after: {
      week: "06",
      observation: "Coat visibly denser and glossy. Dry patches resolved. Shedding normalized.",
      quote: "Week 6 was the week I knew I wasn't imagining it.",
      image: "/images/canis/peptide-family.png",
    },
    note: "Owner-observed accounts. Research use only. Not a veterinary outcome.",
  },
];

const trustStats = [
  { icon: "ri-test-tube-line", value: "≥99%", label: "HPLC-verified purity, every lot" },
  { icon: "ri-file-list-3-line", value: "100%", label: "Lot-linked COAs, pre-checkout" },
  { icon: "ri-flask-line", value: "6", label: "Focused K9 research profiles" },
  { icon: "ri-shield-check-line", value: "RUO", label: "Clearly labeled. No ambiguity." },
];

const peptideProfiles = [
  {
    name: "BPC-157",
    tag: "Mobility + recovery",
    color: "#5F7CF6",
    bg: "#DCE7FF",
    icon: "ri-run-line",
    research: "Studied in animal models for tendon-to-bone healing, muscle repair, and joint pathway activity. One of the most referenced peptides in K9 mobility and connective-tissue research.",
    ownerStory: "\"BPC-157 came up in every research thread I found about connective tissue. It's why I started documenting.\" - Diane M., Labrador owner",
    profile: "K9 Rebuild blend · K9 Reforge",
  },
  {
    name: "TB-500",
    tag: "Recovery + cell migration",
    color: "#5A7A9E",
    bg: "#D6E4F0",
    icon: "ri-heart-pulse-line",
    research: "A synthetic Thymosin Beta-4 fragment studied in animal models for actin regulation, cell migration, and inflammatory modulation. Frequently paired with BPC-157 in repair-pathway research protocols.",
    ownerStory: "\"When recovery started taking longer than the workout, I started documenting. TB-500 kept appearing in the same breath as BPC-157.\" - Marcus T., GSD owner",
    profile: "K9 Rebuild blend · K9 Reload",
  },
  {
    name: "GHK-Cu",
    tag: "Skin + tissue research",
    color: "#8C68D8",
    bg: "#E8E0FF",
    icon: "ri-sparkling-2-line",
    research: "Among the most studied copper peptides in tissue remodeling research: collagen synthesis, wound closure, and skin barrier integrity in animal model contexts.",
    ownerStory: "\"Her coat was dull, thinning along the spine. The documentation process alone gave me better vet conversations.\" - Sarah K., Golden Retriever owner",
    profile: "K9 Recast blend · K9 Restore",
  },
];


const dogProfiles = [
  { icon: "ri-run-line", type: "Senior dogs (7+)", signal: "Stiffness, slower rises, shorter walks.", product: "K9 Rebuild", formula: "BPC-157 + TB-500", color: "#5F7CF6" },
  { icon: "ri-shield-star-line", type: "Active & working K9s", signal: "High-output dogs. Faster recovery between sessions.", product: "K9 Rebuild or K9 Reload", formula: "Blend · TB-500 standalone", color: "#FF8A72" },
  { icon: "ri-first-aid-kit-line", type: "Post-injury recovery", signal: "CCL/ACL, soft tissue, orthopedic surgery.", product: "K9 Rebuild", formula: "BPC-157 + TB-500", color: "#D95858" },
  { icon: "ri-heart-pulse-line", type: "Large breeds at risk", signal: "Shepherds, Labs, Goldens - hip & elbow focus.", product: "K9 Rebuild or K9 Reforge", formula: "Blend · BPC-157 standalone", color: "#8C68D8" },
  { icon: "ri-sparkling-2-line", type: "Coat + tissue focus", signal: "Dull coat, thinning, collagen research context.", product: "K9 Recast or K9 Restore", formula: "Triple blend · GHK-Cu", color: "#5A7A9E" },
];

const faqs = [
  ["What's the difference between K9 Rebuild and K9 Reforge?", "K9 Rebuild is a pre-paired blend of BPC-157 + TB-500 in one vial. K9 Reforge is standalone BPC-157 for researchers isolating a single-compound protocol or sourcing TB-500 separately."],
  ["What does 'research use only' mean in plain language?", "These compounds are not approved veterinary medicines. They are sold for documented, non-clinical research purposes only. We cannot make treatment claims, and we don't. If you choose to observe your dog while using them, involve your veterinarian."],
  ["How long is a typical research observation cycle?", "Animal model literature most commonly documents cycles of 6–12 weeks. Owners who log their observations typically begin noting visible changes between weeks 3–6. ZooNetics does not prescribe dosing protocols; include a veterinarian in your planning."],
  ["Why do you publish lot-level COAs before checkout?", "Because you should be able to verify what you're ordering before you pay. Every product links to its identity, HPLC purity reading, lot number, analytical date, and the producing lab. No verifiable COA means no purchase decision you should feel confident making."],
  ["Can I use these alongside my dog's current medications?", "We can't advise on drug interactions. Involve your veterinarian before combining any research compound with prescribed medications, ongoing treatments, or other supplements."],
  ["What purity standard do your compounds meet?", "Every lot is HPLC-tested for identity and purity. Results are published in the certificate of analysis for that lot. We don't ship without a clean, documented result."],
  ["Why are there blends and singles? Which do I choose?", "Blends are pre-paired compounds frequently studied together in the literature: one vial, one documented protocol. Singles let you isolate one compound or build your own combination. K9 Rebuild is the focused two-compound blend; K9 Recast is the 70 mg triple blend."],
  ["What is the current product status?", "All ZooNetics compounds are labeled for research use only. Any future veterinary-use language will be added only after applicable authorization and final labeling are official. Current status is clearly stated on every product card."],
];

function BrandMark({ light = false, endorsed = false, size = "md" }: { light?: boolean; endorsed?: boolean; size?: "sm" | "md" | "lg" }) {
  // Real logo files — "by EVLV" is built into the lockup
  const src = light ? "/brand/zoonetics-light.webp" : "/brand/zoonetics-dark.webp";
  const heights: Record<string, string> = { sm: "h-8", md: "h-10", lg: "h-12" };
  void endorsed; // "by EVLV" is now part of the logo artwork itself
  return (
    <Image
      src={src}
      alt="ZooNetics by EVLV"
      width={600}
      height={150}
      className={`${heights[size]} w-auto`}
      priority
    />
  );
}

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#F6F7FC] text-[#23324D]">
      <header className="absolute inset-x-0 top-0 z-30 px-4 pt-4 text-white md:px-8 md:pt-6">
        <div className="mx-auto flex h-16 max-w-[1420px] items-center justify-between rounded-full border border-white/15 bg-[#101829]/72 px-4 shadow-[0_18px_60px_rgba(16,24,41,0.18)] backdrop-blur-xl md:h-[4.5rem] md:px-6">
          <Link href="#top" aria-label="ZooNetics home"><BrandMark light /></Link>
          <nav className="hidden items-center gap-7 text-xs font-semibold uppercase tracking-[0.13em] lg:flex" aria-label="Main navigation">
            <Link href="#collection" className="transition hover:text-[#A9C7FF]">K9 peptides</Link>
            <Link href="#science" className="transition hover:text-[#A9C7FF]">The science</Link>
            <Link href="#testimonials" className="transition hover:text-[#A9C7FF]">Reviews</Link>
            <Link href="#before-after" className="transition hover:text-[#A9C7FF]">Before & After</Link>
            <Link href="#questions" className="transition hover:text-[#A9C7FF]">FAQ</Link>
            <Link href="/dosing" className="inline-flex items-center gap-1.5 rounded-full border border-[#A9C7FF]/35 px-3.5 py-1.5 text-[11px] transition hover:border-[#A9C7FF] hover:text-[#A9C7FF]"><i className="ri-syringe-line" />Dosing</Link>
          </nav>
          <Link href="#collection" className="rounded-full bg-[#F6F7FC] px-6 py-3 text-xs font-bold uppercase tracking-[0.13em] text-[#17233B] transition hover:bg-[#A9C7FF]"><span className="sm:hidden">Shop</span><span className="hidden sm:inline">Shop now</span></Link>
        </div>
      </header>

      <main id="top">

        {/* ── HERO ── */}
        <section className="relative min-h-[780px] bg-[#17233B] text-white md:min-h-[900px]">
          <Image src="/images/canis/hero-senior-lab.png" alt="A mature black Labrador enjoying a sunrise walk with its owner" fill priority sizes="100vw" className="object-cover object-[62%_center]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,24,41,0.98)_0%,rgba(16,24,41,0.91)_30%,rgba(16,24,41,0.42)_62%,rgba(16,24,41,0.12)_100%)]" />
          <div className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-[#4F6EF7]/18 blur-3xl" />
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#17233B] to-transparent" />
          <div className="relative mx-auto flex min-h-[780px] max-w-[1480px] items-end px-5 pb-20 pt-32 md:min-h-[900px] md:items-center md:px-10 md:pb-8">
            <div className="max-w-[780px]">
              <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#B7C3FF]"><span className="h-px w-10 bg-[#B7C3FF]" /> For the dogs who still want to go</p>
              <h1 className="max-w-[720px] font-display text-[clamp(3.35rem,7vw,6.8rem)] font-medium leading-[0.88] tracking-[-0.055em]">When they slow down,<span className="block font-serif italic text-[#A9C7FF]">you feel it.</span></h1>
              <p className="mt-8 max-w-xl text-base leading-7 text-white/72 md:text-lg">For owners who&apos;ve moved past guessing. ZooNetics makes research-grade K9 peptides for the ones ready to act - independently verified purity, clean formats, and lot documentation before you buy.</p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link href="#collection" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FF8A72] px-8 py-4 text-sm font-bold uppercase tracking-[0.13em] text-[#17233B] transition hover:bg-[#FFC0B0]">Shop the collection <i className="ri-arrow-right-line" /></Link>
                <Link href="#before-after" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 px-8 py-4 text-sm font-bold uppercase tracking-[0.13em] transition hover:bg-white hover:text-[#17233B]">See before & after</Link>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-5">
                <a href="https://verifiedpeptidereviews.com/vendors/evlv-peptides" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-3 backdrop-blur transition hover:bg-white/18">
                  <Image src="/images/brand/vpr-logo-clean.png" alt="Verified Peptide Reviews" width={28} height={28} className="h-7 w-auto rounded-sm" />
                  <span className="flex flex-col leading-tight">
                    <small className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/50">Verified Peptide Reviews</small>
                    <strong className="text-[14px] font-bold text-white tracking-tight">★★★★★ <span className="text-white/80">4.9 · 712 reviews</span></strong>
                  </span>
                  <em className="hidden text-[11px] font-semibold text-white/40 not-italic sm:block">Verify us ↗</em>
                </a>
                <span className="flex items-center gap-2 text-xs font-semibold text-white/40"><i className="ri-file-list-3-line" /> Lot-linked COAs</span>
                <span className="flex items-center gap-2 text-xs font-semibold text-white/40"><i className="ri-shield-check-line" /> RUO labeled</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── STORY — "It usually starts with one small thing" ── */}
        <section className="bg-[#FBFCFF] px-5 py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-[1380px]">
            <div className="max-w-4xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D95858]">The signal most owners miss</p>
              <h2 className="mt-5 font-display text-[clamp(2.5rem,4.3vw,4.6rem)] font-medium leading-[0.98] tracking-[-0.045em]">Slow isn&apos;t just age. <span className="font-serif italic text-[#D95858]">It&apos;s a signal.</span></h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#17233B]/65">4 in 10 dogs under four already show early joint changes on x-ray. By eight, it&apos;s 1 in 2, and most owners only notice months after the pattern started, because the signs are quiet. These are the four signals worth writing down.</p>
              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="text-[11px] text-[#17233B]/35">Research refs:</span>
                <a href="https://www.nature.com/articles/s41598-024-52324-9" target="_blank" rel="noreferrer" className="text-[11px] font-semibold text-[#4F6EF7] transition hover:underline">Enomoto et al., Scientific Reports 2024 ↗</a>
                <span className="text-[11px] text-[#17233B]/25">·</span>
                <a href="https://epub.ub.uni-muenchen.de/120343/1/1-s2.0-S1090023324000716-main.pdf" target="_blank" rel="noreferrer" className="text-[11px] font-semibold text-[#4F6EF7] transition hover:underline">Roitner et al., Vet. Journal 2024 ↗</a>
              </div>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {storyMoments.map((moment, index) => (
                <article key={moment.title} className="group overflow-hidden rounded-2xl border border-[#17233B]/8 bg-white shadow-[0_12px_40px_rgba(23,35,59,0.05)]">
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#DCE3F5]">
                    <Image src={moment.image} alt="" fill sizes="(max-width: 768px) 100vw, 25vw" className={`object-cover transition duration-700 group-hover:scale-[1.035] ${moment.position}`} />
                    <span className="absolute left-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-white text-[9px] font-bold text-[#17233B]">0{index + 1}</span>
                  </div>
                  <div className="p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#D95858]">{moment.kicker}</p>
                    <h3 className="mt-3 font-display text-xl font-semibold tracking-[-0.035em]">{moment.title}</h3>
                    <p className="mt-3 text-[15px] leading-6 text-[#17233B]/58">{moment.body}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="#profiles" className="inline-flex items-center gap-2 text-sm font-bold text-[#4F6EF7] underline underline-offset-4 transition hover:text-[#D95858]">Match the signal to the right research profile <i className="ri-arrow-down-line" /></Link>
            </div>
          </div>
        </section>

        {/* ── BEFORE & AFTER ── */}
        <BeforeAfterSection pairs={beforeAfterPairs} />

        {/* ── WHO IS THIS FOR ── */}
        <section id="profiles" className="bg-[#17233B] px-5 py-16 text-white md:px-10 md:py-20">
          <div className="mx-auto max-w-[1380px]">
            <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A9C7FF]">Built for the dogs who need it most</p>
                <h2 className="mt-4 font-display text-[clamp(2rem,3.5vw,3.4rem)] font-medium leading-[1] tracking-[-0.04em]">Find your dog&apos;s <span className="font-serif italic text-[#A9C7FF]">research profile.</span></h2>
              </div>
              <Link href="#collection" className="inline-flex items-center gap-2 text-sm font-bold text-[#A9C7FF] underline underline-offset-4 transition hover:text-[#FF8A72]">Browse the full collection <i className="ri-arrow-right-line" /></Link>
            </div>
            <div className="grid gap-3 grid-cols-2 lg:grid-cols-5">
              {dogProfiles.map((p) => (
                <Link key={p.type} href="#collection" className="group rounded-[1rem] border border-white/8 bg-white/[0.04] p-5 transition hover:border-white/20 hover:bg-white/[0.09] cursor-pointer">
                  <span className="grid h-10 w-10 place-items-center rounded-xl text-lg mb-4" style={{ background: `${p.color}22`, color: p.color }}><i className={p.icon} /></span>
                  <h3 className="font-display text-base font-semibold leading-tight tracking-[-0.02em]">{p.type}</h3>
                  <p className="mt-2 text-xs leading-5 text-white/45">{p.signal}</p>
                  <div className="mt-4 border-t border-white/10 pt-3">
                    <p className="text-[11px] font-semibold text-white/60">{p.product}</p>
                    <p className="text-[10px] text-white/30">{p.formula}</p>
                  </div>
                  <p className="mt-3 text-[10px] font-bold text-white/25 transition group-hover:text-white/50 uppercase tracking-[0.1em]">View profile →</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRODUCTS ── */}
        <section id="collection" className="relative overflow-hidden bg-[#F6F7FC] px-5 py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-[1380px]">
            <div className="max-w-4xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D95858]">K9 research peptides and blends</p>
              <h2 className="mt-5 font-display text-[clamp(2.5rem,4.2vw,4.4rem)] font-medium leading-[0.98] tracking-[-0.045em]">A focused shelf. <span className="font-serif italic text-[#D95858]">Clearer choices.</span></h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#23324D]/65">Six K9 research profiles, each with clear formats, visible purity data, and lot-level COA access before checkout.</p>
            </div>
            <ProductCarousel products={products} />
            <div className="mt-5 flex gap-4 rounded-2xl bg-[#17233B] p-5 text-white md:items-center md:px-7">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#FF8A72] text-lg text-[#17233B]"><i className="ri-microscope-line" /></span>
              <p className="max-w-5xl text-sm leading-6 text-white/62"><strong className="text-white">Research use only.</strong> These materials are not approved veterinary medicines and are not intended for administration to humans or animals.</p>
            </div>
          </div>
        </section>

        {/* ── PEPTIDE SCIENCE ── */}
        <section id="science" className="bg-[#101829] px-5 py-20 text-white md:px-10 md:py-28">
          <div className="mx-auto max-w-[1380px]">
            <div className="grid gap-8 border-b border-white/10 pb-14 lg:grid-cols-2 lg:items-end">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A9C7FF]">What the research shows</p>
                <h2 className="mt-5 font-display text-[clamp(2.5rem,4.3vw,4.6rem)] font-medium leading-[0.98] tracking-[-0.045em]">How these peptides <span className="font-serif italic text-[#A9C7FF]">have been helping.</span></h2>
              </div>
              <div className="max-w-lg lg:justify-self-end">
                <p className="text-base leading-7 text-white/50">Preclinical and animal model research only, not veterinary outcomes. We share it so you can research with context, not guesswork.</p>
              </div>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {peptideProfiles.map((p) => (
                <article key={p.name} className="flex flex-col overflow-hidden rounded-[1.4rem] border border-white/8 bg-white/[0.04]">
                  <div className="flex-1 p-6">
                    <span className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em]" style={{ background: `${p.color}22`, color: p.color }}>
                      <i className={p.icon} />{p.tag}
                    </span>
                    <h3 className="mt-5 font-display text-[2.8rem] font-semibold leading-none tracking-[-0.05em]">{p.name}</h3>
                    <p className="mt-4 text-[15px] leading-6 text-white/55">{p.research}</p>
                    <div className="mt-5 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
                      <i className="ri-flask-line text-sm" style={{ color: p.color }} />
                      <p className="text-[13px] text-white/45"><strong className="text-white/70">Available as:</strong> {p.profile}</p>
                    </div>
                  </div>
                  <div className="border-t border-white/8 bg-white/[0.02] p-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/30 mb-3">Owner voice</p>
                    <blockquote>
                      <p className="text-[15px] leading-6 text-white/65 italic [quotes:none]">{p.ownerStory.split(" - ")[0].replace(/^"|"$/g, "").trim()}</p>
                      {p.ownerStory.includes(" - ") && (
                        <cite className="mt-2 block text-xs not-italic text-white/35">- {p.ownerStory.split(" - ")[1]?.trim()}</cite>
                      )}
                    </blockquote>
                    <Link href="#collection" className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.1em] transition hover:opacity-80" style={{ color: p.color }}>
                      View compound <i className="ri-arrow-right-line" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section id="testimonials" className="bg-[#17233B] px-5 py-20 text-white md:px-10 md:py-24">
          <div className="mx-auto max-w-[1380px]">
            <div className="flex flex-wrap items-end justify-between gap-8 border-b border-white/12 pb-12">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF8A72]">From real dog owners</p>
                <h2 className="mt-4 font-display text-[clamp(2.45rem,4vw,4.1rem)] font-medium leading-[0.98] tracking-[-0.045em]">They found it. <span className="font-serif italic text-[#A9C7FF]">Their dogs felt it.</span></h2>
              </div>
              <div>
                <div>
                  <a href="https://verifiedpeptidereviews.com/vendors/evlv-peptides" target="_blank" rel="noreferrer" className="inline-flex items-center gap-4 rounded-2xl border border-white/12 bg-white/[0.06] px-6 py-4 transition hover:bg-white/10">
                    <Image src="/images/brand/vpr-logo-clean.png" alt="Verified Peptide Reviews" width={36} height={36} className="h-9 w-auto rounded" />
                    <div className="flex flex-col leading-tight">
                      <small className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/45">Verified Peptide Reviews</small>
                      <strong className="mt-1 text-base font-bold text-white">★★★★★ 4.9 <span className="font-normal text-white/55">· 712 verified reviews</span></strong>
                    </div>
                    <em className="ml-2 text-xs font-semibold text-[#A9C7FF] not-italic">Verify us ↗</em>
                  </a>
                </div>
              </div>
            </div>

            <div className="scrollbar-none -mx-5 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:mx-0 md:px-0">
              {testimonialVideos.map((v) => (
                <article key={v.name} className="group relative aspect-[9/16] w-[78vw] max-w-[315px] shrink-0 snap-start overflow-hidden rounded-[1.6rem] bg-[#0E1B2E]">
                  <Image src={v.image} alt="" fill sizes="(max-width: 768px) 78vw, 315px" className={`object-cover transition duration-700 group-hover:scale-[1.035] ${v.position}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101829]/95 via-[#101829]/15 to-[#101829]/40" />
                  <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-[11px] font-bold text-[#17233B]">{v.initials}</span>
                    <span className="rounded-full bg-black/30 px-3 py-2 text-[10px] font-bold text-white backdrop-blur">{v.duration}</span>
                  </div>
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="grid h-16 w-16 place-items-center rounded-full border border-white/60 bg-white/15 text-2xl backdrop-blur transition group-hover:scale-110 group-hover:bg-white group-hover:text-[#17233B]"><i className="ri-play-fill translate-x-0.5" /></span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="flex gap-0.5 text-[#FF8A72]">{[...Array(5)].map((_, i) => <i key={i} className="ri-star-fill text-xs" />)}</div>
                    <h3 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-[-0.035em]">{v.quote}</h3>
                    <div className="mt-4 flex items-center justify-between border-t border-white/15 pt-4">
                      <div>
                        <p className="text-sm font-semibold">{v.name}</p>
                        <p className="mt-0.5 text-[11px] text-white/45">{v.detail}</p>
                      </div>
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-xs text-[#A9C7FF]"><i className="ri-verified-badge-line" /></span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── TRUST BAR ── */}
        <section className="bg-[#17233B] px-5 py-14 text-white md:px-10">
          <div className="mx-auto max-w-[1380px]">
            <div className="grid gap-8 md:grid-cols-4">
              {trustStats.map((stat) => (
                <div key={stat.value} className="flex items-center gap-5 md:flex-col md:items-start lg:flex-row lg:items-center">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/10 text-xl text-[#A9C7FF]"><i className={stat.icon} /></span>
                  <div>
                    <p className="font-display text-3xl font-semibold">{stat.value}</p>
                    <p className="mt-1 text-[13px] text-white/50">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="questions" className="bg-[#FBFCFF] px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D95858]">Straight answers</p>
              <h2 className="mt-4 font-display text-[clamp(2.35rem,3.5vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.04em]">The questions owners actually ask.</h2>
              <p className="mt-6 max-w-sm text-[15px] leading-7 text-[#23324D]/62">Compounds, blends vs singles, what RUO means, COAs, cycles, and why we keep the range focused. No hedging.</p>
              <Link href="#collection" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#17233B] px-7 py-4 text-sm font-bold uppercase tracking-[0.13em] text-white transition hover:bg-[#4F6EF7]">Shop the collection <i className="ri-arrow-right-line" /></Link>
            </div>
            <div className="border-t border-[#17233B]/20">
              {faqs.map(([question, answer]) => (
                <details key={question} className="group border-b border-[#17233B]/20 py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-[1.15rem] font-semibold tracking-[-0.025em] md:text-[1.35rem]">{question}<span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#17233B]/25 text-sm transition group-open:rotate-45">+</span></summary>
                  <p className="max-w-2xl pt-5 text-base leading-7 text-[#23324D]/65">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

      </main>

      <footer className="bg-[#101829] px-5 pb-8 pt-16 text-[#F6F7FC] md:px-10 md:pt-24">
        <div className="mx-auto max-w-[1380px]">
          <div className="grid gap-12 border-b border-white/15 pb-16 lg:grid-cols-[1.2fr_0.8fr]">
            <div><BrandMark light size="lg" /><p className="mt-7 max-w-lg font-display text-3xl font-medium leading-snug tracking-[-0.03em]">K9-focused research for the dogs who give us everything.</p></div>
            <div className="grid grid-cols-2 gap-8 text-[15px] lg:justify-self-end">
              <div className="space-y-3 text-white/60">
                <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#A9C7FF]">Explore</p>
                <p><Link href="#collection" className="transition hover:text-white">Peptides</Link></p>
                <p><Link href="#testimonials" className="transition hover:text-white">Reviews</Link></p>
                <p><Link href="#before-after" className="transition hover:text-white">Before &amp; After</Link></p>
                <p><Link href="#questions" className="transition hover:text-white">FAQ</Link></p>
                <p><Link href="/dosing" className="transition hover:text-white">K9 Dosing</Link></p>
              </div>
              <div className="space-y-3 text-white/60">
                <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#A9C7FF]">Collection</p>
                <p>Peptide blends</p>
                <p>Single peptides</p>
                <p>Lot documentation</p>
                <p>Research profiles</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 py-7 text-[11px] uppercase tracking-[0.12em] text-white/38 md:flex-row md:items-center md:justify-between">
            <p>© 2026 ZooNetics · Canine research library</p>
            <p>Research materials only · Not veterinary advice · Not intended to diagnose, treat, cure, or prevent disease</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

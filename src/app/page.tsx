import Image from "next/image";
import Link from "next/link";
import ProductCarousel, { type Product } from "./components/ProductCarousel";
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

const reviews = [
  { stars: 5, quote: "She's 9 and was hesitating at every stair. By week 6 she was doing the full walk to the park without stopping. I filmed it because I didn't believe it myself.", name: "Sarah K.", dog: "Bella, Golden Retriever · 9" },
  { stars: 5, quote: "My shepherd works cattle every day. At 7 he was stiff for days after hard runs. I started documenting on K9 Rebuild and he's been recovering overnight since week 4.", name: "Marcus T.", dog: "Rio, German Shepherd · 7" },
  { stars: 5, quote: "Labs and hips, you know how it goes. Eight weeks in and she was running to greet me at the door again. The vet asked what I had changed.", name: "Diane M.", dog: "Daisy, Labrador · 11" },
  { stars: 5, quote: "I'll be honest, I didn't expect anything at 13. Two months in and he's doing the stairs on his own again. I wish I'd started documenting earlier.", name: "James R.", dog: "Gus, Border Collie · 13" },
];

const faqs = [
  ["What's the difference between K9 Rebuild and K9 Reforge?", "K9 Rebuild is a pre-paired blend of BPC-157 + TB-500 in one vial. K9 Reforge is standalone BPC-157 for researchers isolating a single-compound protocol or sourcing TB-500 separately."],
  ["What does 'research use only' mean in plain language?", "These compounds are not approved veterinary medicines. They are sold for documented, non-clinical research purposes only. We cannot make treatment claims, and we don't. If you choose to observe your dog while using them, involve your veterinarian."],
  ["How long is a typical research observation cycle?", "Animal model literature most commonly documents cycles of 6-12 weeks. Owners who log their observations typically begin noting visible changes between weeks 3-6. ZooNetics does not prescribe dosing protocols; include a veterinarian in your planning."],
  ["Why do you publish lot-level COAs before checkout?", "Because you should be able to verify what you're ordering before you pay. Every product links to its identity, HPLC purity reading, lot number, analytical date, and the producing lab."],
  ["Can I use these alongside my dog's current medications?", "We can't advise on drug interactions. Involve your veterinarian before combining any research compound with prescribed medications, ongoing treatments, or other supplements."],
  ["What purity standard do your compounds meet?", "Every lot is HPLC-tested for identity and purity. Results are published in the certificate of analysis for that lot. We don't ship without a clean, documented result."],
  ["Why are there blends and singles? Which do I choose?", "Blends are pre-paired compounds frequently studied together in the literature: one vial, one documented protocol. Singles let you isolate one compound or build your own combination."],
  ["What is the current product status?", "All ZooNetics compounds are labeled for research use only. Current status is clearly stated on every product card."],
];

function BrandMark({ light = false, size = "md" }: { light?: boolean; size?: "sm" | "md" | "lg" }) {
  const src = light ? "/brand/zoonetics-light.webp" : "/brand/zoonetics-dark.webp";
  const heights: Record<string, string> = { sm: "h-8", md: "h-10", lg: "h-12" };
  return <Image src={src} alt="ZooNetics by EVLV" width={600} height={150} className={`${heights[size]} w-auto`} priority />;
}

function TrustTicker() {
  return (
    <div className="overflow-hidden bg-[#17233B] py-3.5">
      <div className="flex items-center whitespace-nowrap" style={{ animation: "ticker 36s linear infinite" }}>
        {[...Array(2)].map((_, rep) => (
          <span key={rep} className="flex shrink-0 items-center">
            {["USA MADE", "99.6%+ PURE", "HPLC TESTED", "VET APPROVED", "60-DAY GUARANTEE", "3RD PARTY LAB TESTED", "LOT-LEVEL COAS", "RUO CERTIFIED"].map((item, i) => (
              <span key={i} className="flex items-center px-7 text-[11px] font-bold uppercase tracking-[0.18em] text-white/45">
                <span className="mr-7 text-[#A9C7FF]/60">•</span>{item}
              </span>
            ))}
          </span>
        ))}
      </div>
      <style>{`@keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5F2EC] text-[#17233B]">

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-30 border-b border-[#17233B]/8 bg-[#F5F2EC] px-5 md:px-10">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between md:h-[4.5rem]">
          <div>
            <Link href="#top" aria-label="ZooNetics home"><BrandMark /></Link>
            <p className="text-[9px] font-medium text-[#17233B]/35">research-grade K9 peptides. finally.</p>
          </div>
          <nav className="hidden items-center gap-7 text-[11px] font-medium text-[#17233B]/50 lg:flex" aria-label="Main navigation">
            <Link href="#signal" className="transition hover:text-[#17233B]">the problem</Link>
            <Link href="#product" className="transition hover:text-[#17233B]">the research</Link>
            <Link href="#cycle" className="transition hover:text-[#17233B]">how it works</Link>
            <Link href="#reviews" className="transition hover:text-[#17233B]">reviews</Link>
            <Link href="#questions" className="transition hover:text-[#17233B]">faq</Link>
          </nav>
          <Link href="/shop/bpc-tb-500-blend-10mg" className="rounded-full bg-[#17233B] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-[#FF8A72] hover:text-[#17233B]">
            <span className="sm:hidden">shop</span><span className="hidden sm:inline">get k9 rebuild</span>
          </Link>
        </div>
      </header>

      <main id="top">

        {/* ── HERO ── */}
        <section className="bg-[#F5F2EC] px-5 py-16 md:px-10 md:py-20 lg:py-24">
          <div className="mx-auto max-w-[1200px]">
            <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
              <div>
                <h1 className="font-display text-[clamp(3.6rem,8vw,7.5rem)] font-bold leading-[0.88] tracking-[-0.04em] text-[#17233B]">
                  K9 research,<br />for real.
                </h1>
                <p className="mt-6 max-w-md text-[16px] leading-7 text-[#17233B]/60">
                  We independently verify every lot, starting with K9 Rebuild: the BPC-157 + TB-500 blend owners document week by week.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/shop/bpc-tb-500-blend-10mg" className="inline-flex items-center gap-2 rounded-full bg-[#17233B] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#FF8A72] hover:text-[#17233B]">Get K9 Rebuild →</Link>
                  <Link href="#guide" className="inline-flex items-center gap-2 px-7 py-4 text-sm text-[#17233B]/60 underline-offset-4 transition hover:text-[#17233B] hover:underline">get 15% off + free guide</Link>
                </div>
              </div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl md:rounded-3xl">
                <Image src="/images/canis/hero-senior-lab.png" alt="Labrador on a morning walk" fill priority sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-[62%_center]" />
              </div>
            </div>
          </div>
        </section>

        {/* ── TRUST TICKER 1 ── */}
        <TrustTicker />

        {/* ── THE SIGNAL ── */}
        <section id="signal" className="bg-[#F5F2EC] px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1200px]">
            <div className="grid gap-10 md:grid-cols-2 md:items-start md:gap-16">

              {/* Stat box */}
              <div className="bg-[#17233B] p-8 text-white md:p-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A9C7FF]">The clear signal</p>
                <p className="mt-4 font-display text-[6rem] font-bold leading-none tracking-[-0.06em]">1 in 3</p>
                <p className="mt-3 text-[14px] leading-6 text-white/50">dogs shows signs of joint and mobility decline before age 7.</p>
                <div className="mt-8 space-y-3">
                  {[["elbow", 57], ["shoulder", 39], ["stifle (knee)", 36], ["hip", 36]] .map(([joint, pct]) => (
                    <div key={String(joint)}>
                      <div className="mb-1 flex justify-between text-[11px]">
                        <span className="text-white/50">{joint}</span>
                        <span className="text-white/65">{pct}%</span>
                      </div>
                      <div className="h-[3px] w-full rounded-full bg-white/10">
                        <div className="h-[3px] rounded-full bg-[#A9C7FF]/55" style={{ width: `${Number(pct)}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-[10px] leading-5 text-white/28">by joint, in dogs over eight · Roitner et al., The Veterinary Journal, 2024</p>
              </div>

              {/* Headline + copy */}
              <div>
                <h2 className="font-display text-[clamp(2.8rem,5.5vw,5.5rem)] font-bold leading-[0.92] tracking-[-0.04em]">
                  slow isn't age.<br />it's a signal.
                </h2>
                <p className="mt-6 text-[16px] leading-7 text-[#17233B]/60">
                  The pause before the jump. The stiff first steps. The walks that become shorter. They're not just "one-offs." It's joint and soft-tissue stress, and it almost never gets a name.
                </p>

                {/* 3 mini stats */}
                <div className="mt-10 grid grid-cols-3 gap-6 border-t border-[#17233B]/12 pt-10">
                  <div>
                    <p className="font-display text-[2rem] font-bold leading-none tracking-[-0.05em]">6–12</p>
                    <p className="mt-2 text-[11px] leading-5 text-[#17233B]/45">week window in published animal model protocols</p>
                  </div>
                  <div>
                    <p className="font-display text-[2rem] font-bold leading-none tracking-[-0.05em]">99.6%</p>
                    <p className="mt-2 text-[11px] leading-5 text-[#17233B]/45">HPLC purity per lot, third-party verified</p>
                  </div>
                  <div>
                    <p className="font-display text-[1rem] font-bold leading-tight tracking-[-0.01em]">repairable</p>
                    <p className="mt-2 text-[11px] leading-5 text-[#17233B]/45">tissue rebuilds if the body gets the right signal in time</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── PRODUCT SECTION ── */}
        <section id="product" className="bg-[#F5F2EC] px-5 pb-20 md:px-10 md:pb-28">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-12 text-center">
              <h2 className="font-display text-[clamp(2.8rem,6vw,6rem)] font-bold leading-none tracking-[-0.04em]">K9 Rebuild</h2>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#17233B]/38">The research blend</p>
            </div>
            <div className="grid items-start gap-10 md:grid-cols-2 md:gap-14">
              <div className="aspect-square overflow-hidden rounded-2xl bg-white">
                <Image src="/images/zoonetics-products/k9-rebuild.png" alt="K9 Rebuild" width={600} height={600} className="h-full w-full object-contain p-10" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#17233B]/40">BPC-157 + TB-500 · Research Blend</p>

                {/* Purity display */}
                <div className="mt-4 border-b border-[#17233B]/10 pb-6">
                  <p className="font-display text-[4rem] font-bold leading-none tracking-[-0.06em]">99.6%<span className="text-[2rem]">+</span></p>
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#17233B]/45">HPLC Purity</p>
                  <svg className="mt-3 w-full" height="32" viewBox="0 0 300 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polyline points="0,28 50,24 100,18 140,16 180,10 220,7 260,5 300,3" stroke="#17233B" strokeWidth="1" strokeOpacity="0.12" fill="none" />
                    <polyline points="0,28 50,24 100,18 140,16 180,10 220,7 260,5 300,3" stroke="#FF8A72" strokeWidth="1.5" fill="none" />
                  </svg>
                  <a href="#" className="mt-1.5 block text-[11px] text-[#17233B]/38 underline underline-offset-2">see the certificate of analysis →</a>
                </div>

                {/* Format pills */}
                <div className="mt-5 mb-7 flex gap-2">
                  <span className="rounded-full border border-[#17233B]/25 bg-white px-4 py-2 text-[12px] font-semibold text-[#17233B]">injectable vial</span>
                  <span className="rounded-full border border-[#17233B]/10 px-4 py-2 text-[12px] text-[#17233B]/35">oral drops <span className="text-[10px]">coming soon</span></span>
                </div>

                {/* Checklist */}
                <div className="mb-8 space-y-3">
                  {[
                    "Targets joints, tendons & ligaments, not just pain",
                    "The same pair of peptides studied together in the literature",
                    "Most owners start noticing visible changes within weeks",
                    "Lot-level COA linked before every purchase",
                    "FREE BAC water + research guide with every order",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 shrink-0 text-[#17233B]/50">✓</span>
                      <p className="text-[14px] leading-snug text-[#17233B]/65">{item}</p>
                    </div>
                  ))}
                </div>

                {/* Pack size */}
                <div className="mb-5 grid grid-cols-2 gap-2">
                  {[
                    { label: "10 mg", note: "full cycle · small dogs", slug: "bpc-tb-500-blend-10mg" },
                    { label: "20 mg", note: "4-week · medium/large", slug: "bpc-tb-500-blend-20mg", best: true },
                  ].map((pack) => (
                    <Link key={pack.label} href={`/shop/${pack.slug}`}
                      className={`rounded-xl border p-4 text-center transition ${pack.best ? "border-[#17233B] bg-[#17233B] text-white" : "border-[#17233B]/20 hover:border-[#17233B]/50"}`}>
                      <p className={`text-[12px] font-bold ${pack.best ? "text-white" : "text-[#17233B]"}`}>{pack.label}</p>
                      {pack.best && <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.15em] text-[#FF8A72]">most popular</span>}
                      <p className={`mt-0.5 text-[11px] ${pack.best ? "text-white/50" : "text-[#17233B]/40"}`}>{pack.note}</p>
                    </Link>
                  ))}
                </div>

                <Link href="/shop/bpc-tb-500-blend-10mg" className="block w-full rounded-full bg-[#17233B] py-4 text-center text-sm font-bold uppercase tracking-[0.13em] text-white transition hover:bg-[#FF8A72] hover:text-[#17233B]">
                  View K9 Rebuild →
                </Link>
                <div className="mt-3 flex items-center justify-center gap-5 text-[11px] text-[#17233B]/40">
                  <span>99.6%+ purity</span>
                  <span>·</span>
                  <span>third-party tested</span>
                  <span>·</span>
                  <a href="#" className="underline underline-offset-2">see for yourself</a>
                </div>
                <p className="mt-3 text-center text-[10px] text-[#17233B]/28">Research use only. Not for veterinary administration.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── TRUST TICKER 2 ── */}
        <TrustTicker />

        {/* ── NARRATIVE + B&A ── */}
        <section className="bg-[#F5F2EC] px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1200px]">
            <div className="grid gap-16 md:grid-cols-2 md:items-start md:gap-20">

              {/* Text side */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#17233B]/40">You notice the little changes</p>
                <h2 className="mt-4 font-display text-[clamp(2.4rem,5vw,5rem)] font-bold leading-[0.9] tracking-[-0.04em]">
                  Hesitating on<br />the stairs.<br />Stiff in the morning.
                </h2>
                <p className="mt-3 text-[18px] font-medium text-[#17233B]/40">Walks getting shorter.</p>
                <p className="mt-6 text-[15px] leading-7 text-[#17233B]/55">
                  Your dog used to be unstoppable. Now you notice them slowing down. You've tried the usual supplements, but raw ingredients alone only go so far.
                </p>
                <p className="mt-4 text-[15px] leading-7 text-[#17233B]/55">
                  Joints, tendons, and ligaments need more than materials. They need research-grade compounds, verified lot by lot, before you commit.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/shop/bpc-tb-500-blend-10mg" className="inline-flex items-center gap-2 rounded-full bg-[#17233B] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#FF8A72] hover:text-[#17233B]">Get K9 Rebuild →</Link>
                  <Link href="#reviews" className="inline-flex items-center gap-2 px-7 py-4 text-sm text-[#17233B]/55 underline-offset-4 transition hover:text-[#17233B] hover:underline">see owner stories</Link>
                </div>
              </div>

              {/* Split B&A image */}
              <div id="before-after">
                <div className="grid grid-cols-2 gap-1.5 overflow-hidden rounded-2xl">
                  <div className="relative aspect-[3/4]">
                    <Image src="/images/canis/story-before.png" alt="Before" fill sizes="25vw" className="object-cover saturate-0 brightness-[0.58]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <span className="block text-[9px] font-bold uppercase tracking-[0.18em] text-white/55">Before</span>
                      <span className="mt-1 block text-[12px] font-semibold leading-snug text-white">stiff, slow, barely climbing the stairs</span>
                    </div>
                  </div>
                  <div className="relative aspect-[3/4]">
                    <Image src="/images/canis/story-followup.png" alt="After" fill sizes="25vw" className="object-cover brightness-[0.82]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <span className="block text-[9px] font-bold uppercase tracking-[0.18em] text-[#FF8A72]/80">After</span>
                      <span className="mt-1 block text-[12px] font-semibold leading-snug text-white">back to full walks, trotting up the stairs</span>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-center text-[11px] text-[#17233B]/38">Sarah K. · Golden Retriever, 9 · K9 Rebuild · owner observation</p>
              </div>

            </div>
          </div>
        </section>

        {/* ── REVIEWS ── */}
        <section id="reviews" className="bg-[#F5F2EC] px-5 pb-20 md:px-10 md:pb-28">
          <div className="mx-auto max-w-[1200px]">
            <h2 className="mb-12 font-display text-[clamp(2rem,4vw,3.6rem)] font-bold leading-[1.0] tracking-[-0.04em]">
              The kind of change<br />owners tell us about
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {reviews.map((r) => (
                <div key={r.name} className="flex flex-col gap-4 rounded-xl border border-[#17233B]/8 bg-white p-6">
                  <div className="flex gap-0.5 text-[#FF8A72] text-sm">{[...Array(r.stars)].map((_, i) => <span key={i}>★</span>)}</div>
                  <p className="flex-1 text-[14px] leading-6 text-[#17233B]/65">&ldquo;{r.quote}&rdquo;</p>
                  <div className="border-t border-[#17233B]/8 pt-4">
                    <p className="text-[13px] font-semibold text-[#17233B]">{r.name}</p>
                    <p className="text-[11px] text-[#17233B]/42">{r.dog}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[11px] text-[#17233B]/28">Owner-submitted observations. Research use only. Individual results vary and are not guaranteed. Not a substitute for veterinary advice.</p>
          </div>
        </section>

        {/* ── TRUST TICKER 3 ── */}
        <TrustTicker />

        {/* ── BUILT FOR ── */}
        <section className="bg-[#F5F2EC] px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1200px]">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#17233B]/38">Is K9 Rebuild right for your dog?</p>
            <h2 className="mt-3 font-display text-[clamp(2.2rem,4.5vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.04em]">
              built for the dogs<br />who need it most
            </h2>
            <Link href="/shop/bpc-tb-500-blend-10mg" className="mt-8 mb-12 inline-flex items-center gap-2 rounded-full bg-[#17233B] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#FF8A72] hover:text-[#17233B]">
              Get K9 Rebuild →
            </Link>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "Senior Dogs (7+)", body: "Age-related joint stiffness or mobility decline. You've tried glucosamine. This is the next level of research." },
                { title: "Active & Working Dogs", body: "Agility, hunting, working K9s. The constant stress on joints needs more than rest: faster recovery, maintained performance." },
                { title: "Injured Dogs", body: "Recovering from ACL/CCL tears, tendon injuries, or soft-tissue trauma. Support the body's natural repair pathways." },
                { title: "Post-Surgery Dogs", body: "After TPLO, TTA, hip surgery, or other orthopedic procedures. Support tissue recovery and return to baseline." },
                { title: "Large Breeds", body: "German Shepherds, Labs, Goldens, Rottweilers: breeds prone to hip and elbow issues. Targeted support where it's needed." },
                { title: "Any Dog Slowing Down", body: "If you notice the signs (shorter walks, morning stiffness, stair hesitation) start documenting. Early action has the most to work with." },
              ].map((card) => (
                <div key={card.title} className="rounded-xl border border-[#17233B]/8 bg-white p-6">
                  <h3 className="font-display text-[1.05rem] font-bold text-[#17233B]">{card.title}</h3>
                  <p className="mt-3 text-[13px] leading-6 text-[#17233B]/52">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── THE CYCLE ── */}
        <section id="cycle" className="bg-[#F5F2EC] px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1200px]">
            <p className="mb-2 font-display text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-tight tracking-[-0.03em]">Every dog is different</p>
            <p className="mb-14 font-display text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-tight tracking-[-0.03em] text-[#17233B]/35">here's the shape of the cycle</p>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-0">
              {[
                { title: "Notice The Signs", body: "stiff mornings, hesitating at stairs, shorter walks" },
                { title: "Run One Cycle", body: "6-12 weeks of K9 Rebuild, 5 days on, 2 off, lot-linked COA before you start" },
                { title: "See The Change", body: "easier rising first, then the stairs and the walks; most owners notice by weeks 3-6" },
                { title: "Keep The Gains", body: "daily movement, and a maintenance cycle when your dog needs it" },
              ].map((step, i) => (
                <div key={step.title} className="border-t-2 border-[#17233B]/15 pt-7 md:pr-10">
                  <p className="font-display text-[3rem] font-bold leading-none tracking-[-0.06em] text-[#17233B]/8">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-5 font-display text-[1rem] font-bold text-[#17233B]">{step.title}</h3>
                  <p className="mt-2 text-[13px] leading-6 text-[#17233B]/50">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── EMAIL CAPTURE ── */}
        <section id="guide" className="bg-[#17233B] px-5 py-20 text-white md:px-10 md:py-24">
          <div className="mx-auto max-w-[680px] text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A9C7FF]">Free download</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,4rem)] font-bold leading-[0.96] tracking-[-0.04em]">
              the k9 rebuild dosing & research guide
            </h2>
            <p className="mt-5 text-[15px] leading-7 text-white/50">
              Reconstitution, observation checklists, vet conversation templates, and the full cycle. Free for every ZooNetics owner.
            </p>
            <div className="mt-8 flex flex-col gap-0 sm:flex-row">
              <input type="email" placeholder="your@email.com" className="flex-1 rounded-full border border-white/15 bg-white/10 px-6 py-4 text-[15px] text-white outline-none placeholder:text-white/30 focus:border-white/35 sm:rounded-r-none sm:border-r-0" />
              <button type="button" className="rounded-full bg-[#FF8A72] px-8 py-4 text-sm font-bold uppercase tracking-[0.12em] text-[#17233B] transition hover:bg-white sm:rounded-l-none">Send me the guide</button>
            </div>
            <p className="mt-3 text-[11px] text-white/25">No spam. Unsubscribe anytime.</p>
          </div>
        </section>

        {/* ── FULL SHELF ── */}
        <section id="collection" className="bg-[#F5F2EC] px-5 py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-[1200px]">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#17233B]/38">k9 research peptides and blends</p>
            <h2 className="mt-2 mb-2 font-display text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.0] tracking-[-0.04em]">The full shelf.</h2>
            <p className="mb-0 max-w-xl text-[14px] leading-7 text-[#17233B]/48">Six K9 research profiles. Clear formats, visible purity data, lot-level COA before checkout.</p>
            <ProductCarousel products={products} />
            <p className="mt-2 text-[11px] text-[#17233B]/28"><strong className="text-[#17233B]/42">Research use only.</strong> Not approved veterinary medicines. Not intended for administration to humans or animals.</p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="questions" className="bg-[#F5F2EC] px-5 py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-[1200px]">
            <div className="grid gap-14 lg:grid-cols-[0.55fr_1.45fr]">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#17233B]/38">Straight answers</p>
                <h2 className="mt-3 font-display text-[clamp(2rem,3vw,3rem)] font-bold leading-[1.05] tracking-[-0.04em]">The questions owners actually ask.</h2>
                <Link href="/shop/bpc-tb-500-blend-10mg" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#17233B] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#FF8A72] hover:text-[#17233B]">Get K9 Rebuild →</Link>
              </div>
              <div className="border-t border-[#17233B]/12">
                {faqs.map(([q, a]) => (
                  <details key={q} className="group border-b border-[#17233B]/12 py-6">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-[1.05rem] font-bold tracking-[-0.02em] text-[#17233B] md:text-[1.15rem]">
                      {q}<span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#17233B]/20 text-sm transition group-open:rotate-45">+</span>
                    </summary>
                    <p className="max-w-2xl pt-4 text-[14px] leading-7 text-[#17233B]/52">{a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="bg-[#101829] px-5 pb-8 pt-16 text-[#F6F7FC] md:px-10 md:pt-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-12 border-b border-white/12 pb-14 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <BrandMark light size="lg" />
              <p className="mt-6 max-w-md font-display text-2xl font-bold leading-snug tracking-[-0.03em]">K9-focused research for the dogs who give us everything.</p>
            </div>
            <div className="grid grid-cols-2 gap-8 text-[14px] lg:justify-self-end">
              <div className="space-y-3 text-white/55">
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#A9C7FF]">Explore</p>
                <p><Link href="#signal" className="transition hover:text-white">The problem</Link></p>
                <p><Link href="#product" className="transition hover:text-white">K9 Rebuild</Link></p>
                <p><Link href="#reviews" className="transition hover:text-white">Reviews</Link></p>
                <p><Link href="#before-after" className="transition hover:text-white">Before & After</Link></p>
                <p><Link href="#questions" className="transition hover:text-white">FAQ</Link></p>
              </div>
              <div className="space-y-3 text-white/55">
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#A9C7FF]">Collection</p>
                <p><Link href="/shop/bpc-tb-500-blend-10mg" className="transition hover:text-white">K9 Rebuild</Link></p>
                <p><Link href="#collection" className="transition hover:text-white">All compounds</Link></p>
                <p><Link href="/dosing" className="transition hover:text-white">Dosing guide</Link></p>
                <p><Link href="/lab-results" className="transition hover:text-white">Lab results</Link></p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 py-7 text-[10px] uppercase tracking-[0.12em] text-white/30 md:flex-row md:items-center md:justify-between">
            <p>© 2026 ZooNetics · Canine research library</p>
            <p>Research materials only · Not veterinary advice · Not intended to diagnose, treat, cure, or prevent disease</p>
          </div>
        </div>
      </footer>

    </div>
  );
}

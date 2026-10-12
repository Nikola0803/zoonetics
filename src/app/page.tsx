import Image from "next/image";
import Link from "next/link";
import ProductCarousel, { type Product } from "./components/ProductCarousel";
import { getProductBySlug } from "@/lib/products";

// ── PALETTE ──────────────────────────────────────────────────────────────────
const D  = "#2B1810";   // warm dark brown — headlines, body, buttons
const MD = "#6B3E22";   // medium warm brown — stat box bg
const AM = "#C97B15";   // amber / orange accent
const CR = "#F8F4EE";   // warm cream — page bg
const BK = "#1A0C05";   // near-black warm — ticker bg, footer bg
// ─────────────────────────────────────────────────────────────────────────────

const crmProduct = (slug: string) => {
  const product = getProductBySlug(slug);
  if (!product) throw new Error(`Missing CRM product: ${slug}`);
  return product;
};

const products: Product[] = [
  { name: "K9 Reforge", formula: "BPC-157", image: "/images/zoonetics-products/k9-reforge.png", type: "K9 single peptide", lane: "single", focus: "Tissue-pathway research", reason: "A focused BPC-157 profile available in three research formats.", formats: ["5 mg", "10 mg", "20 mg"], variants: [{ label: "5 mg", cartProducts: [crmProduct("bpc-157-5mg")] }, { label: "10 mg", cartProducts: [crmProduct("bpc-157-10mg")] }, { label: "20 mg", cartProducts: [crmProduct("bpc-157-20mg")] }], color: "#C97B15", ink: "#F8F4EE" },
  { name: "K9 Reload", formula: "TB-500", image: "/images/zoonetics-products/k9-reload.png", type: "K9 single peptide", lane: "single", focus: "Cell-migration research", reason: "A focused TB-500 profile available in three research formats.", formats: ["5 mg", "10 mg", "20 mg"], variants: [{ label: "5 mg", cartProducts: [crmProduct("tb-500-5mg")] }, { label: "10 mg", cartProducts: [crmProduct("tb-500-10mg")] }, { label: "20 mg", cartProducts: [crmProduct("tb-500-20mg")] }], color: "#8FB4A8", ink: "#1A0C05" },
  { name: "K9 Rebuild", formula: "BPC-157 + TB-500", image: "/images/zoonetics-products/k9-rebuild.png", type: "K9 peptide blend", lane: "mobility", focus: "Paired repair-pathway research", reason: "A pre-paired BPC-157 and TB-500 research blend in two formats.", formats: ["10 mg", "20 mg"], variants: [{ label: "10 mg", cartProducts: [crmProduct("bpc-tb-500-blend-10mg")] }, { label: "20 mg", cartProducts: [crmProduct("bpc-tb-500-blend-20mg")] }], color: "#6B3E22", ink: "#F8F4EE" },
  { name: "K9 Restore", formula: "GHK-Cu", image: "/images/zoonetics-products/k9-restore.png", type: "K9 single peptide", lane: "skin", focus: "Copper-peptide research", reason: "A focused 50 mg GHK-Cu profile for tissue and skin-model research.", formats: ["50 mg"], variants: [{ label: "50 mg", cartProducts: [crmProduct("ghk-cu-50mg")] }], color: "#9E7B5A", ink: "#F8F4EE" },
  { name: "K9 Reclaim", formula: "KPV", image: "/images/zoonetics-products/k9-reclaim.png", type: "K9 dual-format peptide", lane: "skin", focus: "Barrier and inflammatory-pathway research", reason: "KPV in injectable and oral research formats under one clear profile.", formats: ["10 mg injectable", "500 mcg oral"], variants: [{ label: "10 mg injectable", cartProducts: [crmProduct("kpv-10mg")] }, { label: "500 mcg oral", cartProducts: [crmProduct("kpv-oral-500mcg")] }], color: "#77C9A1", ink: "#1A0C05" },
  { name: "K9 Recast", formula: "GHK-Cu + BPC-157 + TB-500", image: "/images/zoonetics-products/k9-recast.png", type: "K9 triple blend", lane: "mobility", focus: "Multi-pathway research blend", reason: "A 70 mg triple blend combining GHK-Cu, BPC-157, and TB-500 in one research vial.", formats: ["70 mg"], variants: [{ label: "70 mg", cartProducts: [crmProduct("glow-70mg")] }], color: "#C97B15", ink: "#1A0C05" },
];

const reviews = [
  { stars: 5, quote: "She's 11 and could barely make it around the block. Three weeks in and she's walking to the park again. By week six she was playing with our younger dog, which she hadn't done in years.", name: "Karen M.", dog: "Bella, 11" },
  { stars: 5, quote: "My shepherd works cattle every day. At eight he was sore for days after a hard run. Now he shakes it off overnight, honestly moving like he did at four.", name: "Luis T.", dog: "Rio, working shepherd" },
  { stars: 5, quote: "Labs and their hips, you know the story. This is the first thing that's made a difference I can actually see. She runs to the door to meet me again.", name: "Amanda K.", dog: "Daisy, Lab" },
  { stars: 5, quote: "I'll be honest, I didn't think anything would help at his age. Two months in and Gus is doing the stairs on his own again. I'm a believer now.", name: "Mark S.", dog: "Gus, 13" },
];

const faqs = [
  ["what is bpc-157 for dogs?", "BPC-157 (Body Protection Compound 157) is a short chain of amino acids derived from a protein found in stomach tissue. In preclinical animal research, it has been associated with tendon, ligament, and soft-tissue healing and increased local blood flow. It acts as a signaling molecule, directing repair rather than supplying raw building materials."],
  ["what is tb-500 and what does it do for dogs?", "TB-500 is a synthetic version of thymosin beta-4, a naturally occurring peptide found in most tissues. In animal studies it has been associated with cell migration to injured tissue, reduced inflammation, and improved tissue repair. It works differently from BPC-157, which is why the two are frequently studied together."],
  ["are peptides safe for dogs?", "There are no completed controlled canine clinical trials for BPC-157 or TB-500. The safety profile comes from preclinical animal research and reported use. These compounds are sold for research purposes only and are not FDA-approved veterinary medicines. Involve your veterinarian before use."],
  ["how do you dose bpc-157 and tb-500 for a dog?", "The research guide included with every ZooNetics order covers reconstitution, injection technique, and the full cycle. We can't provide personalized dosing advice: that decision belongs with you and your veterinarian. The standard cycle documented in the literature runs 8 weeks, 5 days on and 2 off."],
  ["how long does it take to see results in a dog?", "No promised timeline. Published protocols most commonly run 8 weeks. Owners who document their observations typically begin noting visible changes between weeks 4 and 8. Some see nothing. A 60-day money-back guarantee covers every order."],
  ["can peptides help a dog with arthritis or hip dysplasia?", "The research base is preclinical animal studies, not controlled canine clinical trials. Those studies documented tissue repair and reduced inflammatory markers. Arthritis and hip dysplasia involve structural joint changes that may or may not respond. We make no clinical claims. Consult your veterinarian."],
  ["bpc-157 vs glucosamine for dogs: what's the difference?", "Glucosamine supplies building blocks for cartilage and has a mixed evidence base in human and animal trials. BPC-157 is a signaling molecule that in animal studies activated specific repair pathways rather than supplying materials. Different mechanism, different research base, both unproven in controlled canine trials."],
  ["can i use k9 rebuild with other supplements or medications?", "We can't advise on drug interactions. Involve your veterinarian before combining any research compound with prescribed medications, ongoing treatments, or other supplements. This is especially important for dogs on NSAIDs or immunosuppressants."],
  ["where can i buy bpc-157 and tb-500 for dogs?", "ZooNetics ships K9 Rebuild across the US. Every batch is third-party tested by an independent analytical laboratory for identity, purity, and endotoxins. A lot-level certificate of analysis is published before you can add to cart."],
  ["what does 'research use only' mean?", "It means these compounds are not approved veterinary medicines and are not intended to diagnose, treat, cure, or prevent any disease. They're sold for documented, non-clinical research. We don't make treatment claims. You acknowledge research use at checkout."],
];

const blogPosts = [
  { title: "BPC-157 for Dogs: What the Animal Research Actually Shows", category: "Research", date: "Oct 2026", slug: "bpc-157-dogs-research" },
  { title: "How to Reconstitute K9 Rebuild: A Complete Walkthrough", category: "Guide", date: "Sep 2026", slug: "reconstitution-guide" },
  { title: "Hip Dysplasia in Dogs: Research-Backed Approaches to Mobility", category: "Conditions", date: "Sep 2026", slug: "hip-dysplasia-dogs" },
  { title: "CCL Tears in Dogs: Recovery, Research, and What Owners Document", category: "Conditions", date: "Aug 2026", slug: "ccl-tears-dogs" },
];

function BrandMark({ light = false, size = "md" }: { light?: boolean; size?: "sm" | "md" | "lg" }) {
  const src = light ? "/brand/zoonetics-light.webp" : "/brand/zoonetics-dark.webp";
  const heights: Record<string, string> = { sm: "h-8", md: "h-10", lg: "h-12" };
  return <Image src={src} alt="ZooNetics by EVLV" width={600} height={150} className={`${heights[size]} w-auto`} priority />;
}

function TrustTicker() {
  const items = ["USA MADE", "99.543% PURE", "HPLC TESTED", "VET APPROVED", "60-DAY GUARANTEE", "3RD PARTY LAB TESTED", "LOT-LEVEL COAS", "RUO CERTIFIED"];
  return (
    <div className="overflow-hidden py-3" style={{ background: BK }}>
      <div className="flex items-center whitespace-nowrap" style={{ animation: "ticker 36s linear infinite" }}>
        {[...Array(2)].map((_, rep) => (
          <span key={rep} className="flex shrink-0 items-center">
            {items.map((item, i) => (
              <span key={i} className="flex items-center px-7 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: "rgba(248,244,238,0.45)" }}>
                <span className="mr-7" style={{ color: AM, opacity: 0.7 }}>•</span>{item}
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
    <div className="min-h-screen font-sans" style={{ background: CR, color: D }}>

      {/* ── ANNOUNCEMENT BAR ── */}
      <div className="overflow-hidden px-5 py-2.5 text-center" style={{ background: D }}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: "rgba(248,244,238,0.65)" }}>
          The most researched K9 peptide blend we&apos;ve ever built.{" "}
          <Link href="/shop/bpc-tb-500-blend-10mg" className="underline underline-offset-2" style={{ color: CR }}>shop K9 Rebuild →</Link>
        </p>
      </div>

      {/* ── TRUST TICKER (above nav) ── */}
      <TrustTicker />

      {/* ── NAV ── */}
      <header className="sticky top-0 z-30 border-b px-5 md:px-10" style={{ background: CR, borderColor: `${D}12` }}>
        <div className="mx-auto flex h-[4.25rem] max-w-[1200px] items-center justify-between">
          <div>
            <Link href="#top" aria-label="ZooNetics home"><BrandMark /></Link>
            <p className="text-[9px] font-medium" style={{ color: `${D}50` }}>the research your dog deserves. finally.</p>
          </div>
          <nav className="hidden items-center gap-7 text-[11px] font-medium lg:flex" aria-label="Main navigation">
            <Link href="#signal" className="transition hover:opacity-80" style={{ color: `${D}55` }}>the problem</Link>
            <Link href="#product" className="transition hover:opacity-80" style={{ color: `${D}55` }}>the research</Link>
            <Link href="#cycle" className="transition hover:opacity-80" style={{ color: `${D}55` }}>how it works</Link>
            <Link href="#reviews" className="transition hover:opacity-80" style={{ color: `${D}55` }}>reviews</Link>
            <Link href="#questions" className="transition hover:opacity-80" style={{ color: `${D}55` }}>faq</Link>
          </nav>
          <div className="flex items-center gap-5">
            <Link href="/account" className="hidden text-[11px] font-medium lg:block" style={{ color: `${D}50` }}>account</Link>
            <Link href="/shop/bpc-tb-500-blend-10mg"
              className="rounded-full px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.1em] transition"
              style={{ background: D, color: CR }}>
              <span className="sm:hidden">shop</span><span className="hidden sm:inline">get k9 rebuild</span>
            </Link>
          </div>
        </div>
      </header>

      <main id="top">

        {/* ── HERO ── */}
        <section className="px-5 py-16 md:px-10 md:py-20 lg:py-24" style={{ background: CR }}>
          <div className="mx-auto max-w-[1200px]">
            <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
              <div>
                <h1 className="font-display text-[clamp(3.6rem,8vw,7.5rem)] font-bold leading-[0.88] tracking-[-0.04em]" style={{ color: D }}>
                  K9 research,<br /><span style={{ color: AM }}>for real.</span>
                </h1>
                <div className="mt-4 h-[3px] w-14 rounded-full" style={{ background: AM }} />
                <p className="mt-6 max-w-md text-[16px] leading-7" style={{ color: `${D}70` }}>
                  We make what we give our own dogs, starting with K9 Rebuild: the BPC-157 + TB-500 blend owners document week by week.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/shop/bpc-tb-500-blend-10mg"
                    className="inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-bold transition"
                    style={{ background: D, color: CR }}>
                    Get K9 Rebuild →
                  </Link>
                  <Link href="#guide" className="inline-flex items-center gap-2 px-4 py-4 text-sm transition" style={{ color: `${D}60` }}>
                    get 15% off + free guide
                  </Link>
                </div>
              </div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl md:rounded-3xl">
                <Image src="/images/canis/hero-senior-lab.png" alt="Labrador on a morning walk" fill priority sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-[62%_center]" />
              </div>
            </div>
          </div>
        </section>

        {/* ── TRUST TICKER 2 ── */}
        <TrustTicker />

        {/* ── THE SIGNAL ── */}
        <section id="signal" className="px-5 py-20 md:px-10 md:py-28" style={{ background: CR }}>
          <div className="mx-auto max-w-[1200px]">
            <div className="grid gap-10 md:grid-cols-2 md:items-start md:gap-16">

              {/* Stat box */}
              <div className="p-8 md:p-10" style={{ background: MD }}>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: `${CR}80` }}>The clear signal</p>
                <p className="mt-4 font-display text-[6rem] font-bold leading-none tracking-[-0.06em]" style={{ color: CR }}>1 in 2</p>
                <p className="mt-3 text-[14px] leading-6" style={{ color: `${CR}65` }}>dogs over eight have arthritis on x-ray.</p>
                <div className="mt-8 space-y-3">
                  {[["elbow", "57.4"], ["shoulder", "39.2"], ["stifle (knee)", "36.4"], ["hip", "35.9"]].map(([joint, pct]) => (
                    <div key={String(joint)}>
                      <div className="mb-1 flex justify-between text-[11px]">
                        <span style={{ color: `${CR}55` }}>{joint}</span>
                        <span style={{ color: `${CR}70` }}>{pct}%</span>
                      </div>
                      <div className="h-[3px] w-full rounded-full" style={{ background: `${CR}18` }}>
                        <div className="h-[3px] rounded-full" style={{ width: `${Number(pct)}%`, background: AM }} />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-[11px] leading-5" style={{ color: `${CR}35` }}>But joint wear is rarely the first thing we notice in dogs.</p>
                <p className="mt-3 text-[10px] leading-5" style={{ color: `${CR}30` }}>by joint, in dogs over eight · Roitner et al., The Veterinary Journal, 2024</p>
              </div>

              {/* Headline + copy */}
              <div>
                <h2 className="font-display text-[clamp(2.8rem,5.5vw,5.5rem)] font-bold leading-[0.92] tracking-[-0.04em]" style={{ color: D }}>
                  slow isn&apos;t age.<br />it&apos;s a <span style={{ color: AM }}>signal.</span>
                </h2>
                <p className="mt-6 text-[16px] leading-7" style={{ color: `${D}65` }}>
                  The pause before the jump. The stiff first steps. The walks that get shorter. They&apos;re not just &ldquo;one-offs.&rdquo; It&apos;s joint and soft-tissue stress, and it almost never gets a name until it&apos;s serious.
                </p>

                {/* 3 mini stats */}
                <div className="mt-10 grid grid-cols-3 gap-6 border-t pt-10" style={{ borderColor: `${D}12` }}>
                  <div>
                    <p className="font-display text-[2rem] font-bold leading-none tracking-[-0.05em]" style={{ color: D }}>4 in 10</p>
                    <p className="mt-2 text-[11px] leading-5" style={{ color: `${D}45` }}>dogs under four already show arthritis on x-ray · Enomoto et al.</p>
                  </div>
                  <div>
                    <p className="font-display text-[2rem] font-bold leading-none tracking-[-0.05em]" style={{ color: D }}>2.5%</p>
                    <p className="mt-2 text-[11px] leading-5" style={{ color: `${D}45` }}>of dogs ever get an arthritis diagnosis at the vet · Anderson et al.</p>
                  </div>
                  <div>
                    <p className="font-display text-[1rem] font-bold leading-tight" style={{ color: D }}>repairable</p>
                    <p className="mt-2 text-[11px] leading-5" style={{ color: `${D}45` }}>tissue rebuilds if the body gets the signal in time</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── FEATURED PRODUCT ── */}
        <section id="product" className="px-5 pb-20 md:px-10 md:pb-28" style={{ background: CR }}>
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-12 text-center">
              <h2 className="font-display text-[clamp(2.8rem,6vw,6rem)] font-bold leading-none tracking-[-0.04em]" style={{ color: D }}>K9 Rebuild</h2>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: `${D}38` }}>The research stack</p>
            </div>

            {/* Format toggle (static) */}
            <div className="mb-10 flex justify-center gap-2">
              <span className="flex items-center gap-2 rounded-full border px-5 py-2.5 text-[12px] font-semibold" style={{ border: `1.5px solid ${D}`, color: D, background: "white" }}>
                injectable original <span className="text-[10px] font-normal opacity-60">fastest uptake</span>
              </span>
              <span className="flex items-center gap-2 rounded-full border px-5 py-2.5 text-[12px]" style={{ borderColor: `${D}15`, color: `${D}40` }}>
                oral drops <span className="rounded-sm px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider" style={{ background: AM, color: BK }}>PRE-ORDER</span> <span className="text-[10px] font-normal">salmon flavored · no needles</span>
              </span>
            </div>

            <div className="grid items-start gap-10 md:grid-cols-2 md:gap-14">
              <div className="aspect-square overflow-hidden rounded-2xl bg-white">
                <Image src="/images/zoonetics-products/k9-rebuild.png" alt="K9 Rebuild" width={600} height={600} className="h-full w-full object-contain p-10" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: `${D}40` }}>BPC-157 + TB-500 / The Research Stack / 10 mg + 10 mg</p>

                {/* Purity */}
                <div className="mt-4 flex items-baseline gap-3 border-b pb-6" style={{ borderColor: `${D}10` }}>
                  <div>
                    <p className="font-display text-[3.5rem] font-bold leading-none tracking-[-0.06em]" style={{ color: D }}>99.543%</p>
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: `${D}45` }}>HPLC Purity</p>
                  </div>
                  <a href="/lab-results" className="ml-auto text-[11px] underline underline-offset-2" style={{ color: `${D}38` }}>see the certificate of analysis →</a>
                </div>

                {/* Checklist */}
                <div className="my-6 space-y-3">
                  {[
                    "Targets joints, tendons & ligaments, not just pain",
                    "The same stack working dogs recover with",
                    "Most owners see a difference within weeks",
                    "Backed by a 60-day money-back guarantee",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 shrink-0 text-[13px]" style={{ color: `${D}50` }}>✓</span>
                      <p className="text-[14px] leading-snug" style={{ color: `${D}65` }}>{item}</p>
                    </div>
                  ))}
                </div>

                <p className="mb-5 text-[12px] font-semibold" style={{ color: `${D}50` }}>FREE BAC water + dosing guide with every pack</p>

                {/* Pack selector */}
                <div className="mb-5 flex flex-col gap-2">
                  {[
                    { packs: "1 pack", price: "$75", orig: null, save: null, note: "2-week supply (medium/large dogs)" },
                    { packs: "2 packs", price: "$130", orig: "$150", save: "save $20", note: "most popular", best: true },
                    { packs: "4 packs", price: "$220", orig: "$300", save: "save $80", note: "best value" },
                  ].map((pack) => (
                    <button key={pack.packs} type="button"
                      className="flex w-full items-center justify-between rounded-xl border px-5 py-4 text-left transition"
                      style={pack.best
                        ? { border: `1.5px solid ${D}`, background: `${D}06` }
                        : { border: `1px solid ${D}15` }}>
                      <div className="flex items-center gap-3">
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border" style={{ borderColor: pack.best ? D : `${D}30`, background: pack.best ? D : "transparent" }}>
                          {pack.best && <span className="block h-1.5 w-1.5 rounded-full" style={{ background: CR }} />}
                        </span>
                        <div>
                          <span className="text-[13px] font-bold" style={{ color: D }}>{pack.packs}</span>
                          {pack.best && <span className="ml-2 rounded-sm px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider" style={{ background: AM, color: BK }}>most popular</span>}
                          <span className="ml-2 text-[11px]" style={{ color: `${D}40` }}>{pack.note}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[14px] font-bold" style={{ color: D }}>{pack.price}</span>
                        {pack.orig && <span className="ml-2 text-[11px] line-through" style={{ color: `${D}35` }}>{pack.orig}</span>}
                        {pack.save && <span className="ml-1.5 text-[11px] font-semibold" style={{ color: AM }}>{pack.save}</span>}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Quantity selector */}
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex items-center gap-0 overflow-hidden rounded-full border" style={{ borderColor: `${D}20` }}>
                    <button type="button" className="flex h-10 w-10 items-center justify-center text-lg font-bold transition hover:opacity-70" style={{ color: D }}>−</button>
                    <span className="w-8 text-center text-[14px] font-bold" style={{ color: D }}>1</span>
                    <button type="button" className="flex h-10 w-10 items-center justify-center text-lg font-bold transition hover:opacity-70" style={{ color: D }}>+</button>
                  </div>
                  <Link href="/shop/bpc-tb-500-blend-10mg"
                    className="flex-1 rounded-full py-3.5 text-center text-sm font-bold uppercase tracking-[0.13em] transition hover:opacity-90"
                    style={{ background: D, color: CR }}>
                    Add to cart · $130 <span className="font-normal opacity-70">/ save $20</span>
                  </Link>
                </div>

                <p className="mb-3 text-center text-[12px] font-medium" style={{ color: AM }}>in stock · ships within 24 hours</p>
                <div className="flex items-center justify-center gap-5 text-[11px]" style={{ color: `${D}40` }}>
                  <span>99.543% purity</span>
                  <span>·</span>
                  <span>third-party tested</span>
                  <span>·</span>
                  <a href="/lab-results" className="underline underline-offset-2">see for yourself</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TRUST TICKER 3 ── */}
        <TrustTicker />

        {/* ── NARRATIVE + B&A ── */}
        <section className="px-5 py-20 md:px-10 md:py-28" style={{ background: CR }}>
          <div className="mx-auto max-w-[1200px]">
            <div className="grid gap-16 md:grid-cols-2 md:items-start md:gap-20">

              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: `${D}40` }}>You notice the little changes</p>
                <h2 className="mt-4 font-display text-[clamp(2.4rem,5vw,5rem)] font-bold leading-[0.9] tracking-[-0.04em]" style={{ color: D }}>
                  Hesitating to jump.<br />Stiff in the morning.
                </h2>
                <p className="mt-3 text-[18px] font-medium" style={{ color: `${D}40` }}>Walks getting slower.</p>
                <p className="mt-6 text-[15px] leading-7" style={{ color: `${D}55` }}>
                  Your dog used to be unstoppable. Now, you notice them slowing down. You&apos;ve tried the usual joint supplements but ingredients alone only go so far.
                </p>
                <p className="mt-4 text-[15px] leading-7" style={{ color: `${D}55` }}>
                  Your dog&apos;s joints, tendons, and ligaments need more than raw materials. They need instructions.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/shop/bpc-tb-500-blend-10mg"
                    className="inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-bold transition"
                    style={{ background: D, color: CR }}>
                    Get K9 Rebuild →
                  </Link>
                  <Link href="#mascot" className="inline-flex items-center gap-2 px-4 py-4 text-sm transition" style={{ color: `${D}55` }}>
                    Meet Zero
                  </Link>
                </div>
              </div>

              {/* B&A */}
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
                      <span className="block text-[9px] font-bold uppercase tracking-[0.18em]" style={{ color: `${AM}cc` }}>After</span>
                      <span className="mt-1 block text-[12px] font-semibold leading-snug text-white">trotting the block again</span>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-center text-[11px]" style={{ color: `${D}38` }}>zero · before &amp; after</p>
              </div>

            </div>
          </div>
        </section>

        {/* ── REVIEWS ── */}
        <section id="reviews" className="px-5 pb-20 md:px-10 md:pb-28" style={{ background: CR }}>
          <div className="mx-auto max-w-[1200px]">
            <h2 className="mb-12 font-display text-[clamp(2rem,4vw,3.6rem)] font-bold leading-[1.0] tracking-[-0.04em]" style={{ color: D }}>
              What owners tell us
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {reviews.map((r) => (
                <div key={r.name} className="flex flex-col gap-4 rounded-xl border bg-white p-6" style={{ borderColor: `${D}08` }}>
                  <div className="flex gap-0.5 text-sm" style={{ color: AM }}>{[...Array(r.stars)].map((_, i) => <span key={i}>★</span>)}</div>
                  <p className="flex-1 text-[14px] leading-6" style={{ color: `${D}65` }}>&ldquo;{r.quote}&rdquo;</p>
                  <div className="border-t pt-4" style={{ borderColor: `${D}08` }}>
                    <p className="text-[13px] font-semibold" style={{ color: D }}>{r.name}</p>
                    <p className="text-[11px]" style={{ color: `${D}42` }}>{r.dog}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[11px]" style={{ color: `${D}28` }}>Owner-submitted experiences, shared for marketing purposes. Individual results vary and are not guaranteed. Not a substitute for veterinary advice. Research use only.</p>
          </div>
        </section>

        {/* ── TRUST TICKER 4 ── */}
        <TrustTicker />

        {/* ── BUILT FOR ── */}
        <section className="px-5 py-20 md:px-10 md:py-28" style={{ background: CR }}>
          <div className="mx-auto max-w-[1200px]">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: `${D}38` }}>Is K9 Rebuild right for your dog?</p>
            <h2 className="mt-3 font-display text-[clamp(2.2rem,4.5vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.04em]" style={{ color: D }}>
              built for the dogs<br />who need it most
            </h2>
            <Link href="/shop/bpc-tb-500-blend-10mg"
              className="mt-8 mb-12 inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-bold transition"
              style={{ background: D, color: CR }}>
              Get K9 Rebuild →
            </Link>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "Senior Dogs (7+)", body: "Age-related joint stiffness or mobility decline. You've tried glucosamine. This goes further." },
                { title: "Active & Sport Dogs", body: "Agility, hunting, working K9s. The constant stress on joints needs more than rest: faster recovery, maintained performance." },
                { title: "Injured Dogs", body: "Recovering from ACL/CCL tears, tendon injuries, ligament damage, or soft-tissue trauma. Support the body's natural repair." },
                { title: "Post-Surgery Dogs", body: "After TPLO, TTA, hip surgery, or other orthopedic procedures. Support tissue recovery and get back to normal sooner." },
                { title: "Large Breeds", body: "German Shepherds, Labs, Goldens, Rottweilers: breeds prone to hip and elbow dysplasia. Targeted support where it's needed." },
                { title: "Any Dog Slowing Down", body: "If you notice the signs, start documenting. Stiff mornings, shorter walks, stair hesitation. Early action has the most to work with." },
              ].map((card) => (
                <div key={card.title} className="rounded-xl border bg-white p-6" style={{ borderColor: `${D}08` }}>
                  <h3 className="font-display text-[1.05rem] font-bold" style={{ color: D }}>{card.title}</h3>
                  <p className="mt-3 text-[13px] leading-6" style={{ color: `${D}52` }}>{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── THE CYCLE ── */}
        <section id="cycle" className="px-5 py-20 md:px-10 md:py-28" style={{ background: CR }}>
          <div className="mx-auto max-w-[1200px]">
            <p className="mb-2 font-display text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-tight tracking-[-0.03em]" style={{ color: D }}>Every dog is different</p>
            <p className="mb-14 font-display text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-tight tracking-[-0.03em]" style={{ color: `${D}35` }}>here&apos;s the shape of the cycle</p>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-0">
              {[
                { title: "Notice The Signs", body: "stiff mornings, hesitating at stairs, shorter walks" },
                { title: "Run One Cycle", body: "8 weeks of K9 Rebuild, a small daily dose, 5 days on, 2 off" },
                { title: "See The Change", body: "easier rising first, then the stairs and the walks. most owners notice by weeks 4-8" },
                { title: "Keep The Gains", body: "daily movement, and a maintenance cycle when your dog needs it" },
              ].map((step, i) => (
                <div key={step.title} className="border-t-2 pt-7 md:pr-10" style={{ borderColor: `${D}15` }}>
                  <p className="font-display text-[3rem] font-bold leading-none tracking-[-0.06em]" style={{ color: `${D}08` }}>{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-5 font-display text-[1rem] font-bold" style={{ color: D }}>{step.title}</h3>
                  <p className="mt-2 text-[13px] leading-6" style={{ color: `${D}50` }}>{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── EMAIL CAPTURE ── */}
        <section id="guide" className="px-5 py-20 md:px-10 md:py-24" style={{ background: BK }}>
          <div className="mx-auto max-w-[680px] text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: `${AM}cc` }}>Free download</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,4rem)] font-bold leading-[0.96] tracking-[-0.04em]" style={{ color: CR }}>
              the k9 rebuild dosing &amp; research guide
            </h2>
            <p className="mt-5 text-[15px] leading-7" style={{ color: `${CR}50` }}>
              Reconstitution, handling, the at-home walkthrough, and the full cycle. The exact guide that ships in every box. Plus 15% off your first order.
            </p>
            <div className="mt-8 flex flex-col gap-0 sm:flex-row">
              <input type="email" placeholder="your@email.com"
                className="flex-1 border px-6 py-4 text-[15px] outline-none placeholder:text-white/30 focus:border-white/35 sm:rounded-l-full sm:border-r-0"
                style={{ background: "rgba(248,244,238,0.10)", borderColor: "rgba(248,244,238,0.15)", color: CR, borderRadius: "999px 0 0 999px" }} />
              <button type="button"
                className="px-8 py-4 text-sm font-bold uppercase tracking-[0.12em] transition hover:opacity-90 sm:rounded-r-full"
                style={{ background: AM, color: BK }}>
                Send me the guide
              </button>
            </div>
            <p className="mt-3 text-[11px]" style={{ color: `${CR}25` }}>No spam. Unsubscribe anytime.</p>
          </div>
        </section>

        {/* ── MASCOT / HOW WE KNOW ── */}
        <section id="mascot" className="px-5 py-20 md:px-10 md:py-28" style={{ background: CR }}>
          <div className="mx-auto max-w-[1200px]">
            <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image src="/images/canis/hero-senior-lab.png" alt="Zero - the most documented K9" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: `${D}40` }}>How we know</p>
                <h2 className="mt-4 font-display text-[clamp(2.2rem,4.5vw,4.5rem)] font-bold leading-[0.9] tracking-[-0.04em]" style={{ color: D }}>
                  meet zero,<br />the most documented<br />k9 alive.
                </h2>
                <p className="mt-6 text-[15px] leading-7" style={{ color: `${D}60` }}>
                  Written off at eight with a double ACL and barely walking. Twelve months of K9 Rebuild and weekly observation notes later, Zero is logging miles again. He runs exactly what we sell.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {["Documented weekly", "Vet monitored", "K9 Rebuild, ongoing"].map((badge) => (
                    <span key={badge} className="rounded-full border px-4 py-2 text-[11px] font-semibold" style={{ borderColor: `${D}20`, color: D }}>
                      {badge}
                    </span>
                  ))}
                </div>
                <p className="mt-8 text-[13px] leading-6" style={{ color: `${D}45` }}>
                  1% of every sale goes to the ZooNetics rescue fund: research-grade care for the dogs nobody else will take.
                </p>
                <Link href="/about" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold transition hover:opacity-70" style={{ color: D }}>
                  Learn more about Zero →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── COMING SOON PRODUCTS ── */}
        <section className="px-5 py-20 md:px-10 md:py-28" style={{ background: CR }}>
          <div className="mx-auto max-w-[1200px]">
            <p className="text-center text-[13px] leading-7" style={{ color: `${D}50` }}>
              k9 rebuild is the first stack we&apos;ve released. it won&apos;t be the last.
            </p>
            <h2 className="mt-3 text-center font-display text-[clamp(1.8rem,3.5vw,3rem)] font-bold tracking-[-0.03em]" style={{ color: D }}>
              More ways to support your dog
            </h2>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { name: "K9 Foundation", desc: "the daily chew, built from bloodwork" },
                { name: "K9 Diagnostics", desc: "at-home biomarker panel for dogs" },
                { name: "K9 Recover", desc: "red-light recovery device, K9-sized" },
                { name: "ZooProtocol", desc: "the membership that runs the protocol" },
              ].map((item) => (
                <div key={item.name} className="flex flex-col items-start rounded-xl border bg-white p-6" style={{ borderColor: `${D}08` }}>
                  <span className="mb-4 rounded-sm px-2 py-1 text-[9px] font-bold uppercase tracking-[0.2em]" style={{ background: `${D}08`, color: `${D}40` }}>
                    SOON
                  </span>
                  <h3 className="font-display text-[1.05rem] font-bold" style={{ color: D }}>{item.name}</h3>
                  <p className="mt-2 text-[12px] leading-5" style={{ color: `${D}45` }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WAITLIST DARK CTA ── */}
        <section className="px-5 py-20 md:px-10 md:py-24" style={{ background: BK }}>
          <div className="mx-auto max-w-[680px] text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: `${AM}cc` }}>Under wraps</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.6rem)] font-bold leading-[0.96] tracking-[-0.04em]" style={{ color: CR }}>
              the next releases<br />are almost ready.
            </h2>
            <p className="mt-5 text-[15px] leading-7" style={{ color: `${CR}50` }}>
              What we&apos;re building next for your dog stays under wraps until it&apos;s announced. The waitlist sees every release first, with founding pricing.
            </p>
            <div className="mt-8 flex flex-col gap-0 sm:flex-row">
              <input type="email" placeholder="your@email.com"
                className="flex-1 border px-6 py-4 text-[15px] outline-none placeholder:text-white/30 focus:border-white/35 sm:rounded-l-full sm:border-r-0"
                style={{ background: "rgba(248,244,238,0.10)", borderColor: "rgba(248,244,238,0.15)", color: CR, borderRadius: "999px 0 0 999px" }} />
              <button type="button"
                className="px-8 py-4 text-sm font-bold uppercase tracking-[0.12em] transition hover:opacity-90 sm:rounded-r-full"
                style={{ background: CR, color: D }}>
                join the waitlist
              </button>
            </div>
          </div>
        </section>

        {/* ── ZOOPROTOCOL TEASER ── */}
        <section className="px-5 py-20 md:px-10 md:py-28" style={{ background: CR }}>
          <div className="mx-auto max-w-[1200px]">
            <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: `${D}38` }}>ZooProtocol · Coming soon</p>
                <h2 className="mt-4 font-display text-[clamp(2.2rem,4.5vw,4.5rem)] font-bold leading-[0.9] tracking-[-0.04em]" style={{ color: D }}>
                  the membership<br />that runs it all.
                </h2>
                <p className="mt-6 text-[15px] leading-7" style={{ color: `${D}60` }}>
                  A vet tech draws labs at home. Our system reads them. Your dog gets a protocol built from the numbers, and you only ever add the compounds the data calls for.
                </p>
                <div className="mt-10 grid grid-cols-3 gap-4">
                  {[["Draw", "At-home lab draw by a vet tech"], ["Score", "Biomarker panel reviewed and scored"], ["Plan", "Protocol built from your dog's data"]].map(([step, desc]) => (
                    <div key={step} className="border-t-2 pt-4" style={{ borderColor: AM }}>
                      <p className="font-display text-[1.1rem] font-bold" style={{ color: D }}>{step}</p>
                      <p className="mt-1 text-[11px] leading-5" style={{ color: `${D}45` }}>{desc}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button type="button" className="rounded-full px-7 py-4 text-sm font-bold transition hover:opacity-90" style={{ background: D, color: CR }}>
                    join the waitlist
                  </button>
                  <Link href="/about" className="inline-flex items-center gap-2 px-4 py-4 text-sm transition" style={{ color: `${D}55` }}>
                    how it works
                  </Link>
                </div>
              </div>

              {/* Mock score widget */}
              <div className="rounded-2xl p-8" style={{ background: MD }}>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: `${CR}50` }}>Sample ZooScore</p>
                <div className="mt-6 flex items-end gap-4">
                  <p className="font-display text-[5rem] font-bold leading-none tracking-[-0.06em]" style={{ color: CR }}>72</p>
                  <div className="mb-2">
                    <p className="font-display text-[1.5rem] font-bold leading-none" style={{ color: AM }}>C</p>
                    <p className="text-[11px]" style={{ color: `${CR}50` }}>ZooScore</p>
                  </div>
                </div>
                <p className="mt-2 font-semibold" style={{ color: CR }}>zero</p>
                <p className="text-[12px]" style={{ color: `${CR}50` }}>47 biomarkers reviewed</p>
                <div className="mt-6 space-y-2">
                  {[["Joint inflammation", "elevated"], ["Mobility index", "declining"], ["Recovery rate", "below baseline"]].map(([label, val]) => (
                    <div key={label} className="flex justify-between text-[11px]">
                      <span style={{ color: `${CR}60` }}>{label}</span>
                      <span className="font-semibold" style={{ color: AM }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FULL SHELF ── */}
        <section id="collection" className="px-5 py-20 md:px-10 md:py-24" style={{ background: CR }}>
          <div className="mx-auto max-w-[1200px]">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: `${D}38` }}>k9 research peptides and blends</p>
            <h2 className="mt-2 mb-2 font-display text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.0] tracking-[-0.04em]" style={{ color: D }}>The full shelf.</h2>
            <p className="mb-0 max-w-xl text-[14px] leading-7" style={{ color: `${D}48` }}>Six K9 research profiles. Clear formats, visible purity data, lot-level COA before checkout.</p>
            <ProductCarousel products={products} />
            <p className="mt-2 text-[11px]" style={{ color: `${D}28` }}><strong style={{ color: `${D}42` }}>Research use only.</strong> Not approved veterinary medicines. Not intended for administration to humans or animals.</p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="questions" className="px-5 py-20 md:px-10 md:py-24" style={{ background: CR }}>
          <div className="mx-auto max-w-[1200px]">
            <div className="grid gap-14 lg:grid-cols-[0.55fr_1.45fr]">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: `${D}38` }}>Questions owners ask</p>
                <h2 className="mt-3 font-display text-[clamp(2rem,3vw,3rem)] font-bold leading-[1.05] tracking-[-0.04em]" style={{ color: D }}>straight answers.</h2>
                <p className="mt-4 text-[14px] leading-6" style={{ color: `${D}50` }}>The compounds, the dosing, the safety. No hedging.</p>
                <Link href="/shop/bpc-tb-500-blend-10mg"
                  className="mt-8 inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-bold transition"
                  style={{ background: D, color: CR }}>
                  Get K9 Rebuild →
                </Link>
              </div>
              <div className="border-t" style={{ borderColor: `${D}12` }}>
                {faqs.map(([q, a]) => (
                  <details key={q} className="group border-b py-6" style={{ borderColor: `${D}12` }}>
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[1.0rem] font-semibold tracking-[-0.01em] md:text-[1.05rem]" style={{ color: D }}>
                      {q}
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border text-sm transition group-open:rotate-45" style={{ borderColor: `${D}20`, color: D }}>+</span>
                    </summary>
                    <p className="max-w-2xl pt-4 text-[14px] leading-7" style={{ color: `${D}52` }}>{a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── TRUST TICKER 5 ── */}
        <TrustTicker />

        {/* ── BLOG ── */}
        <section className="px-5 py-20 md:px-10 md:py-24" style={{ background: CR }}>
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-10 flex items-end justify-between">
              <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] font-bold tracking-[-0.03em]" style={{ color: D }}>From the research library</h2>
              <Link href="/journal" className="text-[12px] font-semibold transition hover:opacity-70" style={{ color: D }}>browse all →</Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {blogPosts.map((post) => (
                <Link key={post.slug} href={`/journal/${post.slug}`}
                  className="group flex flex-col gap-4 overflow-hidden rounded-xl border bg-white transition hover:shadow-sm"
                  style={{ borderColor: `${D}08` }}>
                  <div className="aspect-[16/9] overflow-hidden" style={{ background: `${D}06` }}>
                    <div className="h-full w-full" style={{ background: `${D}06` }} />
                  </div>
                  <div className="flex flex-1 flex-col gap-2 px-5 pb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: AM }}>{post.category}</span>
                      <span className="text-[10px]" style={{ color: `${D}30` }}>{post.date}</span>
                    </div>
                    <p className="flex-1 text-[13px] font-semibold leading-snug group-hover:opacity-75" style={{ color: D }}>{post.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* ── FOOTER CTA ── */}
      <div className="px-5 py-20 text-center md:px-10 md:py-24" style={{ background: MD }}>
        <p className="font-display text-[clamp(2.4rem,5vw,5rem)] font-bold leading-[0.92] tracking-[-0.04em]" style={{ color: CR }}>
          start with one vial.
        </p>
        <Link href="/shop/bpc-tb-500-blend-10mg"
          className="mt-8 inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold uppercase tracking-[0.12em] transition hover:opacity-90"
          style={{ background: CR, color: D }}>
          Get K9 Rebuild →
        </Link>
      </div>

      {/* ── FOOTER ── */}
      <footer className="px-5 pb-8 pt-16 md:px-10 md:pt-20" style={{ background: BK, color: CR }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-12 border-b pb-14 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]" style={{ borderColor: `${CR}12` }}>
            <div>
              <BrandMark light size="lg" />
              <p className="mt-4 max-w-xs text-[13px] leading-6" style={{ color: `${CR}45` }}>
                the research your dog deserves. finally.
              </p>
              <a href="mailto:hello@zoonetics.com" className="mt-4 block text-[12px] transition hover:opacity-80" style={{ color: `${CR}40` }}>hello@zoonetics.com</a>
            </div>

            <div className="space-y-3 text-[13px]" style={{ color: `${CR}50` }}>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: `${AM}cc` }}>Shop</p>
              <p><Link href="/shop/bpc-tb-500-blend-10mg" className="transition hover:opacity-100">K9 Rebuild</Link></p>
              <p><Link href="#cycle" className="transition hover:opacity-100">How it works</Link></p>
              <p><Link href="#reviews" className="transition hover:opacity-100">Reviews</Link></p>
              <p><Link href="#collection" className="transition hover:opacity-100">All compounds</Link></p>
            </div>

            <div className="space-y-3 text-[13px]" style={{ color: `${CR}50` }}>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: `${AM}cc` }}>Learn</p>
              <p><Link href="/journal" className="transition hover:opacity-100">Blog</Link></p>
              <p><Link href="/science" className="transition hover:opacity-100">The research</Link></p>
              <p><Link href="/lab-results" className="transition hover:opacity-100">Lab results</Link></p>
              <p><Link href="/dosing" className="transition hover:opacity-100">Dosing guide</Link></p>
            </div>

            <div className="space-y-3 text-[13px]" style={{ color: `${CR}50` }}>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: `${AM}cc` }}>Company</p>
              <p><Link href="#questions" className="transition hover:opacity-100">FAQ</Link></p>
              <p><Link href="/about" className="transition hover:opacity-100">Meet Zero</Link></p>
              <p><Link href="/contact" className="transition hover:opacity-100">Contact</Link></p>
              <p><Link href="/affiliates" className="transition hover:opacity-100">Affiliates</Link></p>
            </div>
          </div>

          <div className="flex flex-col gap-4 py-7 text-[10px] uppercase tracking-[0.12em]" style={{ color: `${CR}30` }}>
            <p className="md:hidden">© 2026 ZooNetics. All rights reserved.</p>
            <p className="md:hidden">Research materials only · Not veterinary advice</p>
            <div className="hidden md:flex md:items-center md:justify-between">
              <p>© 2026 ZooNetics. All rights reserved.</p>
              <p>Research materials only · Not veterinary advice · Not intended to diagnose, treat, cure, or prevent disease</p>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

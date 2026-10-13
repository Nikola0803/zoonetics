import Image from "next/image";
import Link from "next/link";
import ResearchProfileTabs from "./components/ResearchProfileTabs";
import HomeNewsletter from "./components/HomeNewsletter";
import WhatChangedCarousel from "./components/WhatChangedCarousel";
import UGCStoriesSection from "./components/UGCStoriesSection";

// ── PALETTE ──────────────────────────────────────────────────────────────────
const D  = "#10243D";   // clinical navy: headlines, body, buttons
const AM = "#4C7EF3";   // electric cobalt: actions and active states
const CR = "#F7F9FC";   // porcelain: page background
const BK = "#081624";   // midnight: ticker and footer
// ─────────────────────────────────────────────────────────────────────────────

const faqs = [
  ["What Is BPC-157 For Dogs?", "BPC-157 (Body Protection Compound 157) is a short chain of amino acids derived from a protein found in stomach tissue. In preclinical animal research, it has been associated with tendon, ligament, and soft-tissue healing and increased local blood flow. It acts as a signaling molecule, directing repair rather than supplying raw building materials."],
  ["What Is TB-500 And What Does It Do For Dogs?", "TB-500 is a synthetic version of thymosin beta-4, a naturally occurring peptide found in most tissues. In animal studies it has been associated with cell migration to injured tissue, reduced inflammation, and improved tissue repair. It works differently from BPC-157, which is why the two are frequently studied together."],
  ["Are Peptides Safe For Dogs?", "There are no completed controlled canine clinical trials for BPC-157 or TB-500. The safety profile comes from preclinical animal research and reported use. These compounds are sold for research purposes only and are not FDA-approved veterinary medicines. Involve your veterinarian before use."],
  ["How Do You Dose BPC-157 And TB-500 For A Dog?", "ZOONETICS cannot provide personalized dosing or administration advice. These materials are sold for research use only and are not approved veterinary medicines. Any decision involving your dog's health belongs in a conversation with a licensed veterinarian."],
  ["How Long Does It Take To See Results In A Dog?", "No promised timeline. Published protocols most commonly run 8 weeks. Owners who document their observations typically begin noting visible changes between weeks 4 and 8. Some see nothing. A 60-day money-back guarantee covers every order."],
  ["Can Peptides Help A Dog With Arthritis Or Hip Dysplasia?", "The research base is preclinical animal studies, not controlled canine clinical trials. Those studies documented tissue repair and reduced inflammatory markers. Arthritis and hip dysplasia involve structural joint changes that may or may not respond. We make no clinical claims. Consult your veterinarian."],
  ["BPC-157 Vs Glucosamine For Dogs: What's The Difference?", "Glucosamine supplies building blocks for cartilage and has a mixed evidence base in human and animal trials. BPC-157 is a signaling molecule that in animal studies activated specific repair pathways rather than supplying materials. Different mechanism, different research base, both unproven in controlled canine trials."],
  ["Can I Use K9 Rebuild With Other Supplements Or Medications?", "We can't advise on drug interactions. Involve your veterinarian before combining any research compound with prescribed medications, ongoing treatments, or other supplements. This is especially important for dogs on NSAIDs or immunosuppressants."],
  ["Where Can I Buy BPC-157 And TB-500 For Dogs?", "ZOONETICS ships K9 Rebuild across the US. Every batch is third-party tested by an independent analytical laboratory for identity, purity, and endotoxins. A lot-level certificate of analysis is published before you can add to cart."],
  ["What Does 'Research Use Only' Mean?", "It means these compounds are not approved veterinary medicines and are not intended to diagnose, treat, cure, or prevent any disease. They're sold for documented, non-clinical research. We don't make treatment claims. You acknowledge research use at checkout."],
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
  return <Image src={src} alt="ZOONETICS by EVLV" width={600} height={150} className={`${heights[size]} w-auto`} priority />;
}

export default function Home() {
  return (
    <div className="min-h-screen font-sans" style={{ background: CR, color: D }}>

      {/* ── ANNOUNCEMENT BAR ── */}
      <div className="overflow-hidden px-5 py-2.5 text-center" style={{ background: D }}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: "rgba(248,244,238,0.65)" }}>
          Launch access is open · six independently tested K9 peptide profiles.{" "}
          <Link href="/shop" className="underline underline-offset-2" style={{ color: CR }}>shop all products</Link>
        </p>
      </div>

      {/* ── NAV ── */}
      <header className="sticky top-0 z-30 border-b px-5 md:px-10" style={{ background: CR, borderColor: `${D}12` }}>
          <div className="mx-auto flex h-[4.75rem] max-w-[1200px] items-center justify-between">
          <div>
            <Link href="#top" aria-label="ZOONETICS home"><BrandMark /></Link>
          </div>
          <nav className="hidden items-center gap-8 text-[14px] font-bold lg:flex" aria-label="Main navigation">
            <Link href="/shop" className="transition hover:opacity-80" style={{ color: `${D}CC` }}>Shop</Link>
            <Link href="#product" className="transition hover:opacity-80" style={{ color: `${D}CC` }}>What They Are Studied For</Link>
            <Link href="#creators" className="transition hover:opacity-80" style={{ color: `${D}CC` }}>Owner Stories</Link>
            <Link href="/lab-results" className="transition hover:opacity-80" style={{ color: `${D}CC` }}>Lab Results</Link>
            <Link href="#questions" className="transition hover:opacity-80" style={{ color: `${D}CC` }}>FAQ</Link>
          </nav>
          <div className="flex items-center gap-5">
            <Link href="/account" className="hidden text-[13px] font-bold lg:block" style={{ color: `${D}A8` }}>Account</Link>
            <Link href="/shop"
              className="rounded-full px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.1em] transition"
              style={{ background: D, color: CR }}>
              <span className="sm:hidden">shop</span><span className="hidden sm:inline">shop all products</span>
            </Link>
          </div>
        </div>
      </header>

      <main id="top">

        {/* ── HERO ── */}
        <section className="relative overflow-hidden" style={{ background: BK, color: CR }}>
          <div className="mx-auto grid min-h-[760px] max-w-[1440px] lg:grid-cols-2">
            <div className="relative z-10 flex flex-col justify-center px-6 py-20 md:px-12 lg:px-20 lg:py-24">
              <div className="mb-7 flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.2em]" style={{ color: "#8EAEFF" }}>
                <span className="h-2 w-2 rounded-full bg-[#54D6AF]" />
                Peptides Built For Canine Research
              </div>
              <h1 className="max-w-[720px] text-balance font-display text-[clamp(3.05rem,4.7vw,4.9rem)] font-extrabold leading-[0.94] tracking-[-0.05em]">
                <span className="block">Canine peptides.</span><span className="mt-1 block font-serif font-medium italic" style={{ color: "#8EAEFF" }}>Clear purpose. Proven purity.</span>
              </h1>
              <p className="mt-8 max-w-xl text-[17px] font-medium leading-8 text-white/80 md:text-lg">
                Six research profiles for mobility, soft tissue, skin, gut and recovery pathways. Every lot is independently tested for identity and purity before it reaches you.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="/shop" className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-extrabold text-[#081624] transition hover:bg-[#DDE7FF]">
                  Shop All K9 Peptides
                </Link>
                <Link href="#product" className="inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-4 text-sm font-bold text-white transition hover:bg-white/10">
                  Find The Right Profile
                </Link>
              </div>
              <div className="mt-12 grid max-w-xl grid-cols-3 gap-3 border-t border-white/15 pt-7">
                {[['99.543%', 'HPLC purity'], ['Every lot', 'COA published'], ['60 days', 'money-back']].map(([value, label]) => (
                  <div key={label}><p className="font-display text-lg font-extrabold text-white md:text-xl">{value}</p><p className="mt-1 text-[9px] font-bold uppercase tracking-[0.15em] text-white/50">{label}</p></div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[560px] lg:min-h-[780px]">
              <Image src="/images/zoonetics-premium/hero-owner-lab-v3.png" alt="Senior black Labrador preparing for a morning walk with its owner" fill priority sizes="(max-width: 1024px) 100vw, 54vw" className="object-cover object-[78%_center]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081624]/70 via-transparent to-[#081624]/10 lg:bg-gradient-to-r lg:from-[#081624] lg:via-[#081624]/5 lg:to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 grid grid-cols-2 gap-3 md:bottom-10 md:left-10 md:right-10">
                <div className="rounded-2xl border border-white/20 bg-[#081624]/78 p-5 text-white backdrop-blur-xl">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#8EAEFF]">The K9 product line</p>
                  <p className="mt-2 text-base font-extrabold">6 focused profiles</p>
                  <p className="mt-1 text-[11px] font-medium text-white/65">single peptides · targeted blends</p>
                </div>
                <div className="rounded-2xl border border-white/20 bg-white/92 p-5 backdrop-blur-xl" style={{ color: D }}>
                  <div className="flex items-center justify-between"><p className="text-[9px] font-extrabold uppercase tracking-[0.18em]" style={{ color: `${D}A8` }}>Research integrity</p><span className="h-2 w-2 rounded-full bg-[#54D6AF]" /></div>
                  <p className="mt-2 text-base font-extrabold">Lot verified</p>
                  <p className="mt-1 text-[11px] font-semibold" style={{ color: `${D}B8` }}>identity · purity · lot-level COA</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <WhatChangedCarousel />

        <ResearchProfileTabs />

        <UGCStoriesSection />

        {/* ── WHAT ARRIVES ── */}
        <section id="care-path" className="py-16 md:py-24" style={{ background: "#FFFFFF", color: D }}>
          <div className="grid overflow-hidden bg-[#081624] lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative min-h-[520px] lg:min-h-[700px]">
                <Image src="/images/zoonetics-premium/telehealth-consultation-v1.png" alt="Veterinarian and dog owner reviewing a canine health record" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081624]/80 via-transparent to-[#081624]/10" />
                <div className="absolute bottom-6 left-5 right-5 overflow-hidden rounded-2xl border border-white/20 bg-white/95 p-5 shadow-2xl backdrop-blur-xl md:bottom-10 md:left-10 md:right-10 md:p-6" style={{ color: D }}>
                  <div className="flex items-start justify-between gap-5">
                    <div><p className="text-[9px] font-extrabold uppercase tracking-[0.18em]" style={{ color: AM }}>Inside Every K9 Rebuild Kit</p><p className="mt-1 font-display text-xl font-extrabold">Research-ready from day one.</p></div>
                    <span className="rounded-full bg-[#E8F8F2] px-3 py-1 text-[10px] font-extrabold text-[#197A59]">LOT VERIFIED</span>
                  </div>
                  <div className="mt-5 grid grid-cols-3 gap-2 border-t pt-5 text-[10px] font-bold uppercase tracking-[0.08em]" style={{ borderColor: `${D}18` }}>
                    <span><b className="mb-1 block text-lg" style={{ color: AM }}>01</b>Peptide Vials</span><span><b className="mb-1 block text-lg" style={{ color: AM }}>02</b>Sterile Saline</span><span><b className="mb-1 block text-lg" style={{ color: AM }}>03</b>Handling Guide</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center px-7 py-14 text-white md:px-14 lg:px-16 xl:px-20">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#8EAEFF]">What Comes With Your Order</p>
                <h2 className="mt-4 max-w-xl text-balance font-display text-[clamp(2.3rem,3.1vw,3.35rem)] font-extrabold leading-[0.99] tracking-[-0.04em]">The product, the proof and the essentials.</h2>
                <p className="mt-7 max-w-xl text-[16px] font-medium leading-8 text-white/78">Every ZOONETICS order pairs the selected peptide profile with its lot documentation and the materials needed for clear, responsible handling.</p>
                <div className="mt-9 space-y-5">
                  {[
                    ["01", "Independently tested peptide", "Identity and purity verified for the exact lot you receive."],
                    ["02", "Sterile saline included", "The correct companion material is packed with the product."],
                    ["03", "Clear handling guide", "Straightforward storage, preparation and research information."],
                  ].map(([n, title, body]) => (
                    <div key={n} className="grid grid-cols-[34px_1fr] gap-4 border-t border-white/15 pt-5"><span className="text-[11px] font-extrabold text-[#8EAEFF]">{n}</span><div><h3 className="font-display text-lg font-extrabold">{title}</h3><p className="mt-1 text-[12px] font-medium leading-5 text-white/60">{body}</p></div></div>
                  ))}
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link href="/shop" className="inline-flex justify-center rounded-full bg-white px-6 py-3.5 text-[12px] font-extrabold uppercase tracking-[0.12em] text-[#081624]">Shop All K9 Peptides</Link>
                  <span className="text-[11px] font-semibold text-white/55">Six profiles · lot-level COAs</span>
                </div>
                <p className="mt-6 text-[10px] font-medium leading-5 text-white/42">For research use only. Not approved veterinary medicines. Not intended to diagnose, treat, cure, or prevent disease.</p>
              </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="questions" className="px-5 py-16 md:px-10 md:py-24" style={{ background: CR }}>
          <div className="mx-auto max-w-[1200px]">
            <div className="overflow-hidden rounded-[28px] border bg-white shadow-[0_24px_80px_rgba(16,36,61,0.07)]" style={{ borderColor: `${D}10` }}>
              <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
                <div className="flex flex-col justify-between p-8 md:p-11 lg:min-h-[620px]" style={{ background: D, color: CR }}>
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.2em]" style={{ color: AM }}>Before You Choose</p>
                    <h2 className="mt-5 max-w-sm font-display text-[clamp(2.15rem,3vw,3.15rem)] font-extrabold leading-[1] tracking-[-0.04em]">Clear Questions. Straight Answers.</h2>
                    <p className="mt-5 max-w-sm text-[14px] font-medium leading-7 text-white/62">Research use, evidence, handling and product selection explained without the noise.</p>
                    <div className="relative mt-8 aspect-[4/5] overflow-hidden rounded-[20px] border border-white/15 bg-white/5">
                      <Image src="/images/zoonetics-faq/owner-research-guide-v1.png" alt="Dog owner reviewing research information beside her senior Labrador" fill sizes="(max-width: 1024px) 100vw, 36vw" className="object-cover object-center" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#10243D]/35 via-transparent to-transparent" />
                    </div>
                  </div>
                  <div className="mt-9 border-t border-white/15 pt-7">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/42">Still Unsure?</p>
                    <p className="mt-3 max-w-xs text-[14px] font-semibold leading-6 text-white/78">Start with the profile closest to the pathway you are documenting.</p>
                    <Link href="/shop" className="mt-6 inline-flex rounded-full bg-white px-6 py-3.5 text-[11px] font-extrabold uppercase tracking-[0.12em] transition hover:bg-[#DDE7FF]" style={{ color: D }}>Compare Products</Link>
                  </div>
                </div>
                <div className="px-6 py-3 md:px-10 md:py-6">
                  {faqs.map(([q, a], index) => (
                    <details key={q} className="group border-b last:border-b-0" style={{ borderColor: `${D}12` }}>
                      <summary className="flex cursor-pointer list-none items-center gap-4 py-6 md:gap-6 md:py-7" style={{ color: D }}>
                        <span className="text-[10px] font-extrabold tabular-nums tracking-[0.14em]" style={{ color: `${D}55` }}>{String(index + 1).padStart(2, "0")}</span>
                        <span className="flex-1 text-[15px] font-extrabold leading-6 tracking-[-0.01em] first-letter:uppercase md:text-[16px]">{q}</span>
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border text-base transition group-open:rotate-45 group-open:bg-[#10243D] group-open:text-white" style={{ borderColor: `${D}20` }}>+</span>
                      </summary>
                      <p className="max-w-2xl pb-7 pl-10 pr-12 text-[14px] font-medium leading-7 md:pl-14" style={{ color: `${D}A0` }}>{a}</p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── BLOG ── */}
        <section className="border-t px-5 py-16 md:px-10 md:py-20" style={{ background: CR, borderColor: `${D}10` }}>
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-10 flex items-end justify-between">
              <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] font-bold tracking-[-0.03em]" style={{ color: D }}>From the research library</h2>
              <Link href="/journal" className="text-[12px] font-semibold transition hover:opacity-70" style={{ color: D }}>Browse All →</Link>
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
                      <span className="text-[10px]" style={{ color: `${D}52` }}>{post.date}</span>
                    </div>
                    <p className="flex-1 text-[13px] font-semibold leading-snug group-hover:opacity-75" style={{ color: D }}>{post.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>

      <HomeNewsletter />

      {/* ── FOOTER ── */}
      <footer className="px-5 pb-8 pt-16 md:px-10 md:pt-20" style={{ background: BK, color: CR }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-12 border-b pb-14 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]" style={{ borderColor: `${CR}12` }}>
            <div>
              <BrandMark light size="lg" />
              <p className="mt-4 max-w-xs text-[13px] leading-6" style={{ color: `${CR}9E` }}>
                The research your dog deserves. Finally.
              </p>
              <a href="mailto:hello@zoonetics.co" className="mt-4 block text-[12px] transition hover:opacity-80" style={{ color: `${CR}8F` }}>hello@zoonetics.co</a>
            </div>

            <div className="space-y-3 text-[13px]" style={{ color: `${CR}AD` }}>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: `${AM}cc` }}>Shop</p>
              <p><Link href="/shop/bpc-tb-500-blend-10mg" className="transition hover:opacity-100">K9 Rebuild</Link></p>
              <p><Link href="#care-path" className="transition hover:opacity-100">How it works</Link></p>
              <p><Link href="#creators" className="transition hover:opacity-100">Owner Stories</Link></p>
              <p><Link href="#product" className="transition hover:opacity-100">All Research Profiles</Link></p>
            </div>

            <div className="space-y-3 text-[13px]" style={{ color: `${CR}AD` }}>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: `${AM}cc` }}>Learn</p>
              <p><Link href="/journal" className="transition hover:opacity-100">Blog</Link></p>
              <p><Link href="/science" className="transition hover:opacity-100">The research</Link></p>
              <p><Link href="/lab-results" className="transition hover:opacity-100">Lab results</Link></p>
              <p><Link href="/dosing" className="transition hover:opacity-100">Dosing guide</Link></p>
            </div>

            <div className="space-y-3 text-[13px]" style={{ color: `${CR}AD` }}>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: `${AM}cc` }}>Company</p>
              <p><Link href="#questions" className="transition hover:opacity-100">FAQ</Link></p>
              <p><Link href="/about" className="transition hover:opacity-100">About ZOONETICS</Link></p>
              <p><Link href="/contact" className="transition hover:opacity-100">Contact</Link></p>
              <p><Link href="/affiliates" className="transition hover:opacity-100">Affiliates</Link></p>
            </div>
          </div>

          <div className="flex flex-col gap-4 py-7 text-[10px] uppercase tracking-[0.12em]" style={{ color: `${CR}70` }}>
            <p className="md:hidden">© 2026 ZOONETICS. All rights reserved.</p>
            <p className="md:hidden">Research materials only · Not veterinary advice</p>
            <div className="hidden md:flex md:items-center md:justify-between">
              <p>© 2026 ZOONETICS. All rights reserved.</p>
              <p>Research materials only · Not veterinary advice · Not intended to diagnose, treat, cure, or prevent disease</p>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import ResearchProfileTabs from "./components/ResearchProfileTabs";

// ── PALETTE ──────────────────────────────────────────────────────────────────
const D  = "#10243D";   // clinical navy: headlines, body, buttons
const MD = "#183B56";   // deep ocean: proof panels and data surfaces
const AM = "#4C7EF3";   // electric cobalt: actions and active states
const CR = "#F7F9FC";   // porcelain: page background
const BK = "#081624";   // midnight: ticker and footer
// ─────────────────────────────────────────────────────────────────────────────

const faqs = [
  ["what is bpc-157 for dogs?", "BPC-157 (Body Protection Compound 157) is a short chain of amino acids derived from a protein found in stomach tissue. In preclinical animal research, it has been associated with tendon, ligament, and soft-tissue healing and increased local blood flow. It acts as a signaling molecule, directing repair rather than supplying raw building materials."],
  ["what is tb-500 and what does it do for dogs?", "TB-500 is a synthetic version of thymosin beta-4, a naturally occurring peptide found in most tissues. In animal studies it has been associated with cell migration to injured tissue, reduced inflammation, and improved tissue repair. It works differently from BPC-157, which is why the two are frequently studied together."],
  ["are peptides safe for dogs?", "There are no completed controlled canine clinical trials for BPC-157 or TB-500. The safety profile comes from preclinical animal research and reported use. These compounds are sold for research purposes only and are not FDA-approved veterinary medicines. Involve your veterinarian before use."],
  ["how do you dose bpc-157 and tb-500 for a dog?", "ZOONETICS cannot provide personalized dosing or administration advice. These materials are sold for research use only and are not approved veterinary medicines. Any decision involving your dog's health belongs in a conversation with a licensed veterinarian."],
  ["how long does it take to see results in a dog?", "No promised timeline. Published protocols most commonly run 8 weeks. Owners who document their observations typically begin noting visible changes between weeks 4 and 8. Some see nothing. A 60-day money-back guarantee covers every order."],
  ["can peptides help a dog with arthritis or hip dysplasia?", "The research base is preclinical animal studies, not controlled canine clinical trials. Those studies documented tissue repair and reduced inflammatory markers. Arthritis and hip dysplasia involve structural joint changes that may or may not respond. We make no clinical claims. Consult your veterinarian."],
  ["bpc-157 vs glucosamine for dogs: what's the difference?", "Glucosamine supplies building blocks for cartilage and has a mixed evidence base in human and animal trials. BPC-157 is a signaling molecule that in animal studies activated specific repair pathways rather than supplying materials. Different mechanism, different research base, both unproven in controlled canine trials."],
  ["can i use k9 rebuild with other supplements or medications?", "We can't advise on drug interactions. Involve your veterinarian before combining any research compound with prescribed medications, ongoing treatments, or other supplements. This is especially important for dogs on NSAIDs or immunosuppressants."],
  ["where can i buy bpc-157 and tb-500 for dogs?", "ZOONETICS ships K9 Rebuild across the US. Every batch is third-party tested by an independent analytical laboratory for identity, purity, and endotoxins. A lot-level certificate of analysis is published before you can add to cart."],
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
  return <Image src={src} alt="ZOONETICS by EVLV" width={600} height={150} className={`${heights[size]} w-auto`} priority />;
}

function TrustTicker() {
  const items = ["USA MADE", "99.543% HPLC PURITY", "IDENTITY VERIFIED", "60-DAY GUARANTEE", "3RD-PARTY TESTED", "LOT-LEVEL COAS", "RESEARCH USE ONLY"];
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
          Launch access is open · independently tested K9 research products.{" "}
          <Link href="/shop/bpc-tb-500-blend-10mg" className="underline underline-offset-2" style={{ color: CR }}>explore K9 Rebuild →</Link>
        </p>
      </div>

      {/* ── TRUST TICKER (above nav) ── */}
      <TrustTicker />

      {/* ── NAV ── */}
      <header className="sticky top-0 z-30 border-b px-5 md:px-10" style={{ background: CR, borderColor: `${D}12` }}>
          <div className="mx-auto flex h-[4.75rem] max-w-[1200px] items-center justify-between">
          <div>
            <Link href="#top" aria-label="ZOONETICS home"><BrandMark /></Link>
          </div>
          <nav className="hidden items-center gap-8 text-[14px] font-bold lg:flex" aria-label="Main navigation">
            <Link href="#signal" className="transition hover:opacity-80" style={{ color: `${D}CC` }}>Why ZOONETICS</Link>
            <Link href="#care-path" className="transition hover:opacity-80" style={{ color: `${D}CC` }}>How It Works</Link>
            <Link href="#product" className="transition hover:opacity-80" style={{ color: `${D}99` }}>K9 Rebuild</Link>
            <Link href="#product" className="transition hover:opacity-80" style={{ color: `${D}CC` }}>Research Profiles</Link>
            <Link href="#creators" className="transition hover:opacity-80" style={{ color: `${D}CC` }}>Owner Stories</Link>
            <Link href="#questions" className="transition hover:opacity-80" style={{ color: `${D}CC` }}>FAQ</Link>
          </nav>
          <div className="flex items-center gap-5">
            <Link href="/account" className="hidden text-[13px] font-bold lg:block" style={{ color: `${D}A8` }}>Account</Link>
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
        <section className="relative overflow-hidden" style={{ background: BK, color: CR }}>
          <div className="mx-auto grid min-h-[760px] max-w-[1440px] lg:grid-cols-2">
            <div className="relative z-10 flex flex-col justify-center px-6 py-20 md:px-12 lg:px-20 lg:py-24">
              <div className="mb-7 flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.2em]" style={{ color: "#8EAEFF" }}>
                <span className="h-2 w-2 rounded-full bg-[#54D6AF]" />
                Research-Grade Canine Peptides · RUO
              </div>
              <h1 className="max-w-[760px] text-balance font-display text-[clamp(3.35rem,5.25vw,5.6rem)] font-extrabold leading-[0.92] tracking-[-0.055em]">
                <span className="block lg:whitespace-nowrap">More good years.</span><span className="mt-1 block font-serif font-medium italic" style={{ color: "#8EAEFF" }}>That&apos;s the point.</span>
              </h1>
              <p className="mt-8 max-w-xl text-[17px] font-medium leading-8 text-white/80 md:text-lg">
                Independently tested peptide profiles for canine research. Built around mobility, tissue-repair, inflammatory, and recovery pathways. Every lot is identity and purity verified before it reaches the shelf.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="/shop/bpc-tb-500-blend-10mg" className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-extrabold text-[#081624] transition hover:bg-[#DDE7FF]">
                  Explore K9 Rebuild
                </Link>
                <Link href="#care-path" className="inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-4 text-sm font-bold text-white transition hover:bg-white/10">
                  See What&apos;s In The Kit
                </Link>
              </div>
              <div className="mt-12 grid max-w-xl grid-cols-3 gap-3 border-t border-white/15 pt-7">
                {[['99.543%', 'HPLC purity'], ['Every lot', 'COA published'], ['60 days', 'money-back']].map(([value, label]) => (
                  <div key={label}><p className="font-display text-lg font-extrabold text-white md:text-xl">{value}</p><p className="mt-1 text-[9px] font-bold uppercase tracking-[0.15em] text-white/50">{label}</p></div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[560px] lg:min-h-[780px]">
              <Image src="/images/zoonetics-premium/hero-senior-lab-v2.png" alt="Senior black Labrador preparing for a morning walk with its owner" fill priority sizes="(max-width: 1024px) 100vw, 54vw" className="object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081624]/70 via-transparent to-[#081624]/10 lg:bg-gradient-to-r lg:from-[#081624] lg:via-[#081624]/5 lg:to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 grid grid-cols-2 gap-3 md:bottom-10 md:left-10 md:right-10">
                <div className="rounded-2xl border border-white/20 bg-[#081624]/78 p-5 text-white backdrop-blur-xl">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#8EAEFF]">Care record</p>
                  <p className="mt-2 text-base font-extrabold">6 weekly check-ins</p>
                  <p className="mt-1 text-[11px] font-medium text-white/65">same walk · same stairs · clearer trend</p>
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

        {/* ── THE SIGNAL ── */}
        <section id="signal" className="px-5 py-20 md:px-10 md:py-28" style={{ background: CR }}>
          <div className="mx-auto max-w-[1200px]">
            <div className="grid gap-10 md:grid-cols-2 md:items-start md:gap-16">

              {/* Stat box */}
              <div className="p-8 md:p-10" style={{ background: MD }}>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: `${CR}80` }}>The clear signal</p>
                <p className="mt-4 font-display text-[6rem] font-bold leading-none tracking-[-0.06em]" style={{ color: CR }}>1 in 2</p>
                <p className="mt-3 text-[14px] leading-6" style={{ color: `${CR}D1` }}>dogs over eight have arthritis on x-ray.</p>
                <div className="mt-8 space-y-3">
                  {[["elbow", "57.4"], ["shoulder", "39.2"], ["stifle (knee)", "36.4"], ["hip", "35.9"]].map(([joint, pct]) => (
                    <div key={String(joint)}>
                      <div className="mb-1 flex justify-between text-[11px]">
                        <span style={{ color: `${CR}B8` }}>{joint}</span>
                        <span style={{ color: `${CR}70` }}>{pct}%</span>
                      </div>
                      <div className="h-[3px] w-full rounded-full" style={{ background: `${CR}18` }}>
                        <div className="h-[3px] rounded-full" style={{ width: `${Number(pct)}%`, background: AM }} />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-[11px] leading-5" style={{ color: `${CR}80` }}>But joint wear is rarely the first thing we notice in dogs.</p>
                <p className="mt-3 text-[10px] leading-5" style={{ color: `${CR}70` }}>by joint, in dogs over eight · Roitner et al., The Veterinary Journal, 2024</p>
              </div>

              {/* Headline + copy */}
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.2em]" style={{ color: AM }}>The gap between visits</p>
                <h2 className="mt-4 font-display text-[clamp(2.8rem,5.5vw,5.5rem)] font-extrabold leading-[0.9] tracking-[-0.055em]" style={{ color: D }}>
                  Decline starts<br /><span className="font-serif font-medium italic" style={{ color: AM }}>quietly.</span>
                </h2>
                <p className="mt-7 max-w-xl text-[17px] font-medium leading-8" style={{ color: `${D}B8` }}>
                  Dogs rarely give us one dramatic warning. They give us twenty small ones: the pause at the stairs, the shorter route, the extra second before standing. The problem is not noticing. It is remembering the pattern clearly enough to act on it.
                </p>

                {/* 3 mini stats */}
                <div className="mt-10 grid grid-cols-3 gap-6 border-t pt-10" style={{ borderColor: `${D}12` }}>
                  <div>
                    <p className="font-display text-[2rem] font-bold leading-none tracking-[-0.05em]" style={{ color: D }}>4 in 10</p>
                    <p className="mt-2 text-[11px] leading-5" style={{ color: `${D}7A` }}>dogs under four already show arthritis on x-ray · Enomoto et al.</p>
                  </div>
                  <div>
                    <p className="font-display text-[2rem] font-bold leading-none tracking-[-0.05em]" style={{ color: D }}>2.5%</p>
                    <p className="mt-2 text-[11px] leading-5" style={{ color: `${D}7A` }}>of dogs ever get an arthritis diagnosis at the vet · Anderson et al.</p>
                  </div>
                  <div>
                    <p className="font-display text-[1rem] font-bold leading-tight" style={{ color: D }}>trackable</p>
                    <p className="mt-2 text-[11px] leading-5" style={{ color: `${D}7A` }}>small mobility changes become more useful when documented over time</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        <ResearchProfileTabs />

        {/* ── CONNECTED CARE PATH ── */}
        <section id="care-path" className="py-20 md:py-28" style={{ background: "#FFFFFF", color: D }}>
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
                <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#8EAEFF]">More Than A Vial</p>
                <h2 className="mt-4 max-w-xl text-balance font-display text-[clamp(2.45rem,3.35vw,3.65rem)] font-extrabold leading-[0.98] tracking-[-0.04em]">Research products with the proof and tools to use them responsibly.</h2>
                <p className="mt-7 max-w-xl text-[16px] font-medium leading-8 text-white/78">ZOONETICS supplies research-use-only peptide profiles, not veterinary medicines or software subscriptions. Every order is built around product integrity, clear handling, and consistent observation.</p>
                <div className="mt-9 space-y-5">
                  {[
                    ["01", "Choose the research profile", "Select a standalone peptide or blend by compound and research pathway."],
                    ["02", "Verify what arrived", "Check the lot-level COA for identity, purity and analytical testing."],
                    ["03", "Handle and document", "Use the included sterile saline, handling guide and repeatable observation sheet."],
                  ].map(([n, title, body]) => (
                    <div key={n} className="grid grid-cols-[34px_1fr] gap-4 border-t border-white/15 pt-5"><span className="text-[11px] font-extrabold text-[#8EAEFF]">{n}</span><div><h3 className="font-display text-lg font-extrabold">{title}</h3><p className="mt-1 text-[12px] font-medium leading-5 text-white/60">{body}</p></div></div>
                  ))}
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link href="#product" className="inline-flex justify-center rounded-full bg-white px-6 py-3.5 text-[12px] font-extrabold uppercase tracking-[0.12em] text-[#081624]">Shop Research Profiles →</Link>
                  <span className="text-[11px] font-semibold text-white/55">Physical research products · independently tested</span>
                </div>
                <p className="mt-6 text-[10px] font-medium leading-5 text-white/42">For research use only. Not approved veterinary medicines. Not intended to diagnose, treat, cure, or prevent disease.</p>
              </div>
          </div>
        </section>

        {/* ── NARRATIVE + B&A ── */}
        <section className="px-5 py-20 md:px-10 md:py-28" style={{ background: "#FFFFFF" }}>
          <div className="mx-auto max-w-[1200px]">
            <div className="grid gap-14 md:grid-cols-[0.72fr_1.28fr] md:items-start md:gap-16">

              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.2em]" style={{ color: AM }}>The moment owners know</p>
                <h2 className="mt-4 max-w-xl font-display text-[clamp(2.2rem,3.1vw,3.1rem)] font-extrabold leading-[0.98] tracking-[-0.04em]" style={{ color: D }}>
                  They still want the walk.<br /><span className="font-serif font-medium italic" style={{ color: AM }}>Their body says wait.</span>
                </h2>
                <p className="mt-7 max-w-xl text-[16px] font-medium leading-8" style={{ color: `${D}A8` }}>
                  That mismatch is what owners feel first. ZOONETICS exists to turn it into something useful: a baseline, a record, a veterinary conversation, and, where appropriate, a transparent research decision.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/shop/bpc-tb-500-blend-10mg"
                    className="inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-bold transition"
                    style={{ background: D, color: CR }}>
                    Get K9 Rebuild →
                  </Link>
                  <Link href="#product" className="inline-flex items-center gap-2 px-4 py-4 text-sm transition" style={{ color: `${D}99` }}>
                    View All Profiles
                  </Link>
                </div>
              </div>

              {/* B&A */}
              <div id="before-after">
                <div className="grid grid-cols-2 gap-1.5 overflow-hidden rounded-2xl">
                  <div className="relative aspect-[4/5]">
                    <Image src="/images/canis/story-before.png" alt="Before" fill sizes="25vw" className="object-cover saturate-0 brightness-[0.58]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <span className="block text-[9px] font-bold uppercase tracking-[0.18em] text-white/55">Before</span>
                      <span className="mt-1 block text-[12px] font-semibold leading-snug text-white">stiff, slow, barely climbing the stairs</span>
                    </div>
                  </div>
                  <div className="relative aspect-[4/5]">
                    <Image src="/images/canis/story-followup.png" alt="After" fill sizes="25vw" className="object-cover brightness-[0.82]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <span className="block text-[9px] font-bold uppercase tracking-[0.18em]" style={{ color: `${AM}cc` }}>After</span>
                      <span className="mt-1 block text-[12px] font-semibold leading-snug text-white">trotting the block again</span>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-center text-[13px] font-bold uppercase tracking-[0.16em]" style={{ color: `${D}80` }}>Zero · Before &amp; After</p>
              </div>

            </div>
          </div>
        </section>

        {/* ── CREATOR COMMUNITY ── */}
        <section id="creators" className="px-5 py-20 md:px-10 md:py-28" style={{ background: "#EAF0FF" }}>
          <div className="mx-auto max-w-[1200px]">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.2em]" style={{ color: AM }}>Video diaries from real owners</p>
                <h2 className="mt-4 max-w-2xl font-display text-[clamp(2.35rem,3vw,3.1rem)] font-extrabold leading-[0.98] tracking-[-0.04em]" style={{ color: D }}>
                  <span className="block xl:whitespace-nowrap">Don&apos;t Take Our Word For It.</span><span className="mt-1 block font-serif font-medium italic" style={{ color: AM }}>Watch Theirs.</span>
                </h2>
              </div>
              <div className="max-w-xl lg:justify-self-end">
                <p className="text-[16px] font-medium leading-8" style={{ color: `${D}B8` }}>The useful stories include the awkward first video, the routine in between, and the honest follow-up. These are owner observations, not clinical evidence, and that distinction stays visible.</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Owner submitted", "Weekly check-ins", "Individual results vary"].map((tag) => <span key={tag} className="rounded-full border bg-white/80 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.1em]" style={{ borderColor: `${D}12`, color: `${D}99` }}>{tag}</span>)}
                </div>
              </div>
            </div>

            <div className="mt-14 grid gap-4 md:grid-cols-3">
              {[
                { image: "/images/canis/story-before.png", label: "00:42", title: "“He stopped pausing at the first step.”", note: "Sarah + Moose · week 06" },
                { image: "/images/canis/mobility-story.png", label: "00:36", title: "“The weekly videos made it obvious.”", note: "Marco + Rio · week 08" },
                { image: "/images/canis/story-followup.png", label: "00:51", title: "“We had something useful to show our vet.”", note: "Danielle + Nova · care diary" },
              ].map((story, index) => (
                <article key={story.title} className={`group relative overflow-hidden rounded-2xl ${index === 1 ? "md:-translate-y-5" : ""}`}>
                  <div className="relative aspect-[4/5]">
                    <Image src={story.image} alt="Dog owner documentation story" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-[1.025]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#081624]/90 via-[#081624]/8 to-transparent" />
                    <div className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.13em] backdrop-blur" style={{ color: D }}>{story.label}</div>
                    <div className="absolute inset-0 grid place-items-center"><span className="grid h-16 w-16 place-items-center rounded-full border border-white/55 bg-[#081624]/28 text-xl text-white shadow-xl backdrop-blur-md transition group-hover:scale-110 group-hover:bg-white group-hover:text-[#081624]">▶</span></div>
                    <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                      <p className="font-display text-xl font-extrabold leading-tight">{story.title}</p>
                      <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.14em] text-white/70">{story.note}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-4 rounded-2xl bg-white p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
              <div><p className="font-display text-xl font-extrabold" style={{ color: D }}>Every story starts with a baseline.</p><p className="mt-2 text-[13px] font-medium" style={{ color: `${D}85` }}>Owner-submitted experiences · research use only · not clinical evidence.</p></div>
              <Link href="#product" className="inline-flex shrink-0 items-center justify-center rounded-full px-6 py-4 text-sm font-extrabold" style={{ background: D, color: CR }}>Explore Research Profiles ↑</Link>
            </div>
          </div>
        </section>

        {/* ── BUILT FOR ── */}
        <section className="px-5 py-20 md:px-10 md:py-28" style={{ background: CR }}>
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-14 grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: AM }}>Where Owners Start</p>
                <h2 className="mt-4 max-w-3xl text-balance font-display text-[clamp(2.5rem,4vw,4rem)] font-extrabold leading-[0.96] tracking-[-0.04em]" style={{ color: D }}>Built For The Dogs Who Need Better Documentation.</h2>
              </div>
              <Link href="/shop/bpc-tb-500-blend-10mg" className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-bold transition" style={{ background: D, color: CR }}>Explore K9 Rebuild →</Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "Senior Dogs (7+)", body: "For structured observation of age-related mobility patterns, including stiffness, slower rising and shorter walks." },
                { title: "Active & Sport Dogs", body: "Agility, hunting, and working K9s whose owners want a consistent way to document movement and recovery." },
                { title: "Injury Research", body: "For structured research into ACL/CCL, tendon, ligament, and soft-tissue pathways alongside veterinary care." },
                { title: "Post-Procedure Tracking", body: "A clearer observation record after TPLO, TTA, hip, or other orthopedic procedures, guided by your veterinarian." },
                { title: "Large Breeds", body: "German Shepherds, Labs, Goldens and Rottweilers benefit from consistent documentation of hip, elbow and gait changes." },
                { title: "Any Dog Slowing Down", body: "If you notice stiff mornings, shorter walks or stair hesitation, start with a repeatable baseline and veterinary conversation." },
              ].map((card, index) => (
                <div key={card.title} className="group relative min-h-[220px] overflow-hidden rounded-2xl border bg-white p-7 shadow-[0_18px_50px_rgba(16,36,61,0.06)] transition duration-300 hover:-translate-y-1" style={{ borderColor: `${D}0D` }}>
                  <div className="mb-8 flex items-center justify-between"><span className="grid h-10 w-10 place-items-center rounded-full text-[11px] font-extrabold" style={{ background: `${AM}14`, color: AM }}>{String(index + 1).padStart(2, "0")}</span><span className="h-px w-12" style={{ background: `${D}18` }} /></div>
                  <h3 className="font-display text-xl font-extrabold" style={{ color: D }}>{card.title}</h3>
                  <p className="mt-3 text-[13px] font-medium leading-6" style={{ color: `${D}91` }}>{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── THE CYCLE ── */}
        <section id="cycle" className="px-5 py-20 md:px-10 md:py-28" style={{ background: "#EAF0FF" }}>
          <div className="mx-auto max-w-[1200px]">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em]" style={{ color: AM }}>The Documentation Cycle</p>
            <h2 className="mb-14 mt-4 max-w-2xl text-balance font-display text-[clamp(2.4rem,4vw,4rem)] font-extrabold leading-[0.96] tracking-[-0.04em]" style={{ color: D }}>Every Dog Is Different. The Record Should Be Consistent.</h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-0">
              {[
                { title: "Notice The Signs", body: "Stiff mornings, hesitation at stairs and shorter walks." },
                { title: "Set The Baseline", body: "Capture the same movements, routes and recovery markers before research begins." },
                { title: "Document Weekly", body: "Repeat the same check-in so observations become comparable, not anecdotal." },
                { title: "Review The Record", body: "Bring the timeline to your veterinarian and decide what deserves attention next." },
              ].map((step, i) => (
                <div key={step.title} className="border-t-2 pt-7 md:pr-10" style={{ borderColor: `${D}15` }}>
                  <p className="font-display text-[3rem] font-bold leading-none tracking-[-0.06em]" style={{ color: `${D}08` }}>{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-5 font-display text-[1rem] font-bold" style={{ color: D }}>{step.title}</h3>
                  <p className="mt-2 text-[13px] leading-6" style={{ color: `${D}8C` }}>{step.body}</p>
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
              The K9 Rebuild Handling &amp; Research Guide
            </h2>
            <p className="mt-5 text-[15px] leading-7" style={{ color: `${CR}AD` }}>
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
            <p className="mt-3 text-[11px]" style={{ color: `${CR}61` }}>No spam. Unsubscribe anytime.</p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="questions" className="px-5 py-20 md:px-10 md:py-24" style={{ background: CR }}>
          <div className="mx-auto max-w-[1200px]">
            <div className="grid gap-14 lg:grid-cols-[0.55fr_1.45fr]">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: `${D}66` }}>Questions owners ask</p>
                <h2 className="mt-3 font-display text-[clamp(2rem,3vw,3rem)] font-bold leading-[1.05] tracking-[-0.04em]" style={{ color: D }}>Straight Answers.</h2>
                <p className="mt-4 text-[14px] leading-6" style={{ color: `${D}8C` }}>The compounds, the evidence, the limitations. No hedging.</p>
                <Link href="/shop/bpc-tb-500-blend-10mg"
                  className="mt-8 inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-bold transition"
                  style={{ background: D, color: CR }}>
                  Get K9 Rebuild →
                </Link>
              </div>
              <div className="border-t" style={{ borderColor: `${D}12` }}>
                {faqs.map(([q, a]) => (
                  <details key={q} className="group border-b py-6" style={{ borderColor: `${D}12` }}>
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[1.0rem] font-semibold tracking-[-0.01em] first-letter:uppercase md:text-[1.05rem]" style={{ color: D }}>
                      {q}
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border text-sm transition group-open:rotate-45" style={{ borderColor: `${D}20`, color: D }}>+</span>
                    </summary>
                    <p className="max-w-2xl pt-4 text-[14px] leading-7" style={{ color: `${D}91` }}>{a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── BLOG ── */}
        <section className="px-5 py-20 md:px-10 md:py-24" style={{ background: CR }}>
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

      {/* ── FOOTER CTA ── */}
      <div className="px-5 py-20 text-center md:px-10 md:py-24" style={{ background: MD }}>
        <p className="font-display text-[clamp(2.4rem,5vw,5rem)] font-bold leading-[0.92] tracking-[-0.04em]" style={{ color: CR }}>
          Start With One Vial.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/shop/bpc-tb-500-blend-10mg" className="inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-bold uppercase tracking-[0.12em] transition hover:opacity-90" style={{ background: CR, color: D }}>Get K9 Rebuild →</Link>
          <Link href="/ambassadors" className="inline-flex items-center justify-center rounded-full border px-8 py-4 text-sm font-bold uppercase tracking-[0.12em] transition hover:bg-white/10" style={{ borderColor: `${CR}55`, color: CR }}>Become An Affiliate</Link>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="px-5 pb-8 pt-16 md:px-10 md:pt-20" style={{ background: BK, color: CR }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-12 border-b pb-14 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]" style={{ borderColor: `${CR}12` }}>
            <div>
              <BrandMark light size="lg" />
              <p className="mt-4 max-w-xs text-[13px] leading-6" style={{ color: `${CR}9E` }}>
                The research your dog deserves. Finally.
              </p>
              <a href="mailto:hello@zoonetics.com" className="mt-4 block text-[12px] transition hover:opacity-80" style={{ color: `${CR}8F` }}>hello@zoonetics.com</a>
            </div>

            <div className="space-y-3 text-[13px]" style={{ color: `${CR}AD` }}>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: `${AM}cc` }}>Shop</p>
              <p><Link href="/shop/bpc-tb-500-blend-10mg" className="transition hover:opacity-100">K9 Rebuild</Link></p>
              <p><Link href="#cycle" className="transition hover:opacity-100">How it works</Link></p>
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

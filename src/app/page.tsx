import Image from "next/image";
import Link from "next/link";
import ResearchProfileTabs from "./components/ResearchProfileTabs";
import VideoProofSection from "./components/VideoProofSection";

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
          <Link href="/shop" className="underline underline-offset-2" style={{ color: CR }}>explore the K9 product line →</Link>
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
            <Link href="/shop" className="transition hover:opacity-80" style={{ color: `${D}99` }}>K9 Product Line</Link>
            <Link href="#product" className="transition hover:opacity-80" style={{ color: `${D}CC` }}>Research Profiles</Link>
            <Link href="#creators" className="transition hover:opacity-80" style={{ color: `${D}CC` }}>Owner Stories</Link>
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
                Research-Grade Canine Peptides · RUO
              </div>
              <h1 className="max-w-[760px] text-balance font-display text-[clamp(3.35rem,5.25vw,5.6rem)] font-extrabold leading-[0.92] tracking-[-0.055em]">
                <span className="block lg:whitespace-nowrap">More good years.</span><span className="mt-1 block font-serif font-medium italic" style={{ color: "#8EAEFF" }}>That&apos;s the point.</span>
              </h1>
              <p className="mt-8 max-w-xl text-[17px] font-medium leading-8 text-white/80 md:text-lg">
                Independently tested peptide profiles for canine research. Built around mobility, tissue-repair, inflammatory, and recovery pathways. Every lot is identity and purity verified before it reaches the shelf.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="/shop" className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-extrabold text-[#081624] transition hover:bg-[#DDE7FF]">
                  Explore K9 Product Line
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
              <Image src="/images/zoonetics-premium/hero-owner-lab-v3.png" alt="Senior black Labrador preparing for a morning walk with its owner" fill priority sizes="(max-width: 1024px) 100vw, 54vw" className="object-cover object-[78%_center]" />
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

        {/* Narrative bridge between the aspirational hero and the evidence-led story. */}
        <section className="bg-white px-5 py-16 md:px-10 md:py-24">
          <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em]" style={{ color: AM }}>It Usually Starts Small</p>
              <h2 className="mt-5 max-w-xl font-display text-[clamp(2.6rem,4vw,4.2rem)] font-extrabold leading-[0.98] tracking-[-0.05em]" style={{ color: D }}>You notice it before anyone else does.</h2>
              <p className="mt-6 max-w-md text-[16px] font-medium leading-8" style={{ color: `${D}8F` }}>Not a diagnosis. Not one dramatic event. Just a few ordinary moments that no longer feel quite ordinary.</p>
              <div className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#EEF3FF] px-5 py-3 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#4F6EF7]"><span className="h-2 w-2 rounded-full bg-[#4F6EF7]" /> Keep watching the same moments</div>
            </div>

            <div className="overflow-hidden rounded-[28px] border border-[#17233B]/8 bg-[#F5F7FC] shadow-[0_24px_70px_rgba(23,35,59,0.08)]">
              {[
                ["01", "Morning", "Takes longer to stand", "ri-sun-line"],
                ["02", "The usual walk", "Turns around one block earlier", "ri-footprint-line"],
                ["03", "Back at home", "Pauses before the stairs", "ri-home-5-line"],
              ].map(([n, moment, observation, icon], index) => (
                <div key={n} className={`grid grid-cols-[52px_1fr_auto] items-center gap-4 px-5 py-6 md:px-7 ${index < 2 ? "border-b border-[#17233B]/8" : ""}`}>
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-lg text-[#4F6EF7] shadow-sm"><i className={icon} /></span>
                  <div><p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#17233B]/38">{moment}</p><p className="mt-1 font-display text-lg font-extrabold tracking-[-0.02em] text-[#17233B] md:text-xl">{observation}</p></div>
                  <span className="font-display text-3xl font-extrabold text-[#17233B]/8">{n}</span>
                </div>
              ))}
              <div className="flex items-center justify-between gap-4 bg-[#17233B] px-6 py-5 text-white md:px-7"><p className="font-display text-lg font-extrabold">One day is a moment. A week becomes a pattern.</p><i className="ri-arrow-down-line text-xl text-[#A9C7FF]" /></div>
            </div>
          </div>
        </section>

        {/* ── THE SIGNAL ── */}
        <section id="signal" className="overflow-hidden bg-[#101829] text-white">
          <div className="grid lg:min-h-[700px] lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative min-h-[500px] lg:min-h-full">
              <Image src="/images/zoonetics-premium/early-signals-v1.png" alt="Dog owner noticing a change in her dog's daily movement" fill sizes="(max-width: 1024px) 100vw, 53vw" className="object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101829] via-[#101829]/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#101829]" />
              <div className="absolute bottom-6 left-5 right-5 rounded-[24px] border border-white/15 bg-[#101829]/80 p-6 backdrop-blur-xl md:bottom-10 md:left-10 md:max-w-md">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#A9C7FF]">The First Signs Are Small</p>
                <div className="mt-5 grid grid-cols-3 gap-4 text-sm font-bold"><span>Pauses<br /><small className="font-medium text-white/50">at stairs</small></span><span>Shorter<br /><small className="font-medium text-white/50">walks</small></span><span>Slower<br /><small className="font-medium text-white/50">to stand</small></span></div>
              </div>
            </div>
            <div className="flex flex-col justify-center px-6 py-16 md:px-14 lg:px-16 xl:px-20">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#A9C7FF]">The Gap Between Visits</p>
              <h2 className="mt-5 max-w-xl font-display text-[clamp(2.7rem,4.4vw,5rem)] font-extrabold leading-[0.96] tracking-[-0.05em]">You know your dog. You notice the change.</h2>
              <p className="mt-7 max-w-xl text-[17px] font-medium leading-8 text-white/68">It is rarely one dramatic warning. It is the pause at the stairs, the shorter route, or the extra second before standing. One moment is easy to dismiss. A pattern is harder to ignore.</p>
              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[20px] bg-white p-6 text-[#17233B]"><p className="font-display text-5xl font-extrabold tracking-[-0.06em]">1 in 2</p><p className="mt-2 text-sm font-bold leading-6">dogs over eight show arthritis on x-ray.</p></div>
                <div className="rounded-[20px] border border-white/14 bg-white/[0.06] p-6"><p className="font-display text-3xl font-extrabold text-[#A9C7FF]">Track the pattern</p><p className="mt-3 text-sm font-medium leading-6 text-white/58">Repeatable observations can turn a vague concern into a clearer veterinary conversation.</p></div>
              </div>
              <p className="mt-6 text-[10px] font-medium leading-5 text-white/35">Research context: Roitner et al., The Veterinary Journal, 2024. Individual imaging findings do not establish a diagnosis.</p>
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

        <VideoProofSection />

        {/* ── BUILT FOR ── */}
        <section className="px-5 py-20 md:px-10 md:py-28" style={{ background: CR }}>
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-14 grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: AM }}>Where Owners Start</p>
                <h2 className="mt-4 max-w-3xl text-balance font-display text-[clamp(2.25rem,3.25vw,3.35rem)] font-extrabold leading-[0.98] tracking-[-0.04em]" style={{ color: D }}>Built For The Dogs Who Need Better Documentation.</h2>
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

        {/* ── EMAIL CAPTURE ── */}
        <section id="guide" className="px-5 py-20 md:px-10 md:py-24" style={{ background: BK }}>
          <div className="mx-auto max-w-[720px] text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: `${AM}cc` }}>Free download</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,3vw,3rem)] font-extrabold leading-[1.02] tracking-[-0.035em]" style={{ color: CR }}>
              <span className="block">The K9 Rebuild</span><span className="mt-1 block font-serif font-medium italic" style={{ color: "#A9C7FF" }}>Handling &amp; Research Guide</span>
            </h2>
            <p className="mt-5 text-[15px] leading-7" style={{ color: `${CR}AD` }}>
              Reconstitution, handling, the at-home walkthrough, and a repeatable research record. The exact guide that ships in every box. Plus 15% off your first order.
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

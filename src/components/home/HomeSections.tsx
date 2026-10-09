import Image from "next/image";
import Link from "next/link";

const STEPS = [
  {
    number: "01",
    image: "/images/science/standard.jpg",
    title: "Precision sourcing",
    body: "Research compounds are sourced through vetted synthesis partners with defined identity and purity standards.",
  },
  {
    number: "02",
    image: "/images/science/testing.jpg",
    title: "Verified purity",
    body: "Independent analytical testing supports batch-level identity, purity, and traceability documentation.",
  },
  {
    number: "03",
    image: "/images/science/purity.jpg",
    title: "Reliable fulfillment",
    body: "Live stock status and tracked order handling connect the catalog directly to dependable fulfillment.",
  },
];

const SOLUTIONS = [
  ["ri-flask-line", "High purity standards", "Clear specifications with consistent lot-to-lot expectations."],
  ["ri-truck-line", "Fast, reliable service", "Stock-aware ordering and tracked fulfillment from checkout onward."],
  ["ri-file-shield-2-line", "COA verification", "Analytical documentation tied to the exact batch and lot code."],
  ["ri-microscope-line", "Expanding research catalog", "New compounds added without disconnecting the ordering workflow."],
];

export function ResearchProofPanels() {
  return (
    <section className="bg-ivory-soft px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-[1400px] gap-5 lg:grid-cols-2">
        <ProofPanel
          image="/images/home/goal-metabolic.webp"
          eyebrow="Research catalog"
          title="40+ RUO compounds available"
          body="A growing catalog of lyophilized peptides and ancillary research materials with live stock and pricing."
          href="/shop"
          link="View products"
        />
        <ProofPanel
          image="/images/science/coa-vial-banner.png"
          eyebrow="Batch documentation"
          title="Tested, documented, traceable"
          body="Every listed batch can be paired with its Certificate of Analysis for clear identity and purity verification."
          href="/coas"
          link="View COAs"
        />
      </div>
    </section>
  );
}

function ProofPanel({ image, eyebrow, title, body, href, link }: { image: string; eyebrow: string; title: string; body: string; href: string; link: string }) {
  return (
    <article className="group relative min-h-[500px] overflow-hidden bg-charcoal">
      <Image src={image} alt="" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-[1.025]" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-7 text-white md:p-10">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">{eyebrow}</p>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold leading-tight md:text-4xl">{title}</h2>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/68">{body}</p>
        <Link href={href} className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-white">
          {link} <i className="ri-arrow-right-line transition group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

export function HowItWorks() {
  return (
    <section className="bg-ivory-soft py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sage-deep">How it works</p>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-charcoal md:text-5xl">From verification to your research bench.</h2>
          <p className="mt-4 text-base leading-relaxed text-charcoal/60">A connected research supply experience built around product quality, batch visibility, and reliable ordering.</p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {STEPS.map((step) => (
            <article key={step.number} className="bg-white p-3">
              <div className="relative aspect-[4/3] overflow-hidden bg-stone">
                <Image src={step.image} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white font-display text-xs font-semibold text-sage-deep">{step.number}</span>
              </div>
              <div className="px-3 pb-5 pt-6">
                <h3 className="font-display text-2xl font-semibold text-charcoal">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/58">{step.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TrustedSolutions() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-4 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sage-deep">Trusted research supply</p>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-charcoal md:text-5xl">Research-grade confidence, built into the system.</h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-charcoal/60">EVLV connects product data, inventory, documentation, checkout, and orders so the experience stays as dependable as the compounds it represents.</p>
          <div className="mt-9 grid gap-px overflow-hidden border border-stone/70 bg-stone/70 sm:grid-cols-2">
            {SOLUTIONS.map(([icon, title, body]) => (
              <div key={title} className="bg-white p-6">
                <i className={`${icon} text-xl text-sage-deep`} aria-hidden />
                <h3 className="mt-4 font-display text-lg font-semibold text-charcoal">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/55">{body}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative min-h-[600px] overflow-hidden bg-sage-deep">
          <Image src="/images/home/goal-cellular.webp" alt="EVLV research laboratory" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/55 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 bg-sage-deep/90 p-6 text-white backdrop-blur md:bottom-8 md:left-8 md:right-auto md:max-w-sm">
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/55">Connected commerce</p>
            <p className="mt-2 font-display text-2xl font-semibold">Real catalog. Real inventory. Real orders.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SupportCta() {
  return (
    <section className="bg-ivory-soft px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-[1400px] overflow-hidden bg-sage-deep text-white lg:grid-cols-2">
        <div className="flex flex-col justify-center px-7 py-14 md:px-12 lg:px-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">Dedicated support</p>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-tight md:text-5xl">Get help from a real person.</h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/65">Questions about a batch, order, wholesale account, or documentation? The EVLV team is here to help.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-sage-deep">Contact support</Link>
            <Link href="/shop" className="border border-white/40 px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white">Shop products</Link>
          </div>
        </div>
        <div className="relative min-h-[420px]">
          <Image src="/images/home/referral-bg.webp" alt="EVLV support" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}

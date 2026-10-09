import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="bg-ivory-soft px-3 pb-3 md:px-6 md:pb-6">
      <div className="relative mx-auto min-h-[680px] max-w-[1600px] overflow-hidden bg-charcoal md:min-h-[760px]">
        <Image
          src="/images/brand/evlv-glp3-r-hero.png"
          alt="EVLV GLP3-R research compound packaging and vial"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,18,17,0.88)_0%,rgba(9,18,17,0.72)_36%,rgba(9,18,17,0.18)_70%,rgba(9,18,17,0.05)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/45 via-transparent to-transparent" />

        <div className="relative z-10 flex min-h-[680px] items-center px-6 py-20 md:min-h-[760px] md:px-14 lg:px-20 xl:px-28">
          <div className="max-w-2xl text-white">
            <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70">
              <span className="h-px w-9 bg-white/55" /> Independent testing · batch documentation
            </p>
            <h1 className="font-display text-[clamp(3.15rem,7vw,7rem)] font-semibold leading-[0.88] tracking-[-0.06em]">
              High-purity
              <span className="block">research peptides.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
              Analytically verified research compounds with transparent lot documentation, live inventory, and
              dependable fulfillment.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/shop" size="lg" className="!rounded-none !bg-white !text-sage-deep hover:!bg-ivory">
                Shop now <i className="ri-arrow-right-line" />
              </ButtonLink>
              <ButtonLink href="/coas" size="lg" className="!rounded-none !border !border-white/50 !bg-transparent !text-white hover:!bg-white hover:!text-sage-deep">
                View COAs
              </ButtonLink>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-6 gap-y-3 text-[11px] font-medium uppercase tracking-[0.11em] text-white/70">
              {["Authenticity guaranteed", "Third-party tested", "Verified documentation"].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-sm text-white" /> {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 hidden bg-white px-6 py-4 text-sage-deep md:flex md:items-center md:gap-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sage-mist"><i className="ri-flask-line" /></span>
          <div>
            <p className="text-[10px] uppercase tracking-[0.15em] text-charcoal/45">For laboratory use</p>
            <p className="text-sm font-semibold text-charcoal">Research use only</p>
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";

const compounds: Record<string, string> = {
  "K9 Reforge": "BPC-157",
  "K9 Reload": "TB-500",
  "K9 Rebuild": "BPC-157 + TB-500",
  "K9 Restore": "GHK-CU",
  "K9 Reclaim": "KPV",
  "K9 Reclaim Oral": "KPV ORAL",
  "K9 Recast": "GHK-CU + BPC-157 + TB-500",
};

export function K9VialVisual({ title, dosage, className = "" }: { title: string; dosage: string | null; className?: string }) {
  const compound = compounds[title] ?? "K9 RESEARCH PROFILE";
  return (
    <div className={`relative flex items-center justify-center overflow-hidden bg-[#F3F6FC] ${className}`}>
      <div className="relative aspect-square h-auto w-full max-w-full">
        <Image src="/images/zoonetics-products/vial-base-v3.png" alt={`${title} ${dosage ?? ""}`.trim()} fill sizes="(max-width: 768px) 90vw, 600px" className="object-contain" />
        <div className="absolute left-[30%] top-[42%] flex h-[31%] w-[40%] flex-col items-center justify-center text-center text-white">
          <div className="text-[clamp(6px,1.1vw,13px)] font-semibold tracking-[0.2em]">ZOONETICS<span className="text-[#FF8A72]">•</span></div>
          <div className="mt-[4%] text-[clamp(3px,0.48vw,6px)] font-bold tracking-[0.28em] text-white/55">K9 RESEARCH SERIES</div>
          <div className="my-[7%] h-px w-[72%] bg-white/18" />
          <div className="max-w-[94%] text-[clamp(7px,1.35vw,17px)] font-extrabold leading-[0.95] tracking-[-0.03em]">{title.toUpperCase()}</div>
          <div className="mt-[5%] max-w-[92%] text-[clamp(4px,0.58vw,7px)] font-bold leading-tight tracking-[0.05em] text-[#FF8A72]">{compound}</div>
          <div className="mt-[6%] text-[clamp(7px,1.05vw,13px)] font-extrabold tracking-[0.1em]">{dosage}</div>
          <div className="mt-[5%] text-[clamp(3px,0.43vw,5px)] font-bold tracking-[0.24em] text-white/52">RESEARCH USE ONLY</div>
        </div>
      </div>
    </div>
  );
}

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

const accents: Record<string, string> = {
  "K9 Reforge": "#72A7FF",
  "K9 Reload": "#8FB4D5",
  "K9 Rebuild": "#FF8A72",
  "K9 Restore": "#B7A0FF",
  "K9 Reclaim": "#77C9A1",
  "K9 Reclaim Oral": "#77C9A1",
  "K9 Recast": "#F0B76F",
};

export function K9VialVisual({ title, dosage, className = "" }: { title: string; dosage: string | null; className?: string }) {
  const compound = compounds[title] ?? "K9 RESEARCH PROFILE";
  const accent = accents[title] ?? "#FF8A72";
  const isOral = title === "K9 Reclaim Oral";
  return (
    <div className={`relative flex items-center justify-center overflow-hidden bg-[#F3F6FC] ${className}`}>
      <div className="relative aspect-square h-auto w-full max-w-full [container-type:inline-size]">
        <Image src={isOral ? "/images/zoonetics-products/oral-bottle-base-v1.png" : "/images/zoonetics-products/vial-base-v4.png"} alt={`${title} ${dosage ?? ""}`.trim()} fill sizes="(max-width: 768px) 90vw, 600px" className="object-contain" />
        <div className={`absolute flex flex-col items-center justify-center text-center text-white ${isOral ? "left-[28%] top-[42%] h-[33%] w-[44%]" : "left-[31.5%] top-[40%] h-[35%] w-[37%]"}`}>
          <div className="text-[2.7cqw] font-semibold tracking-[0.18em]">ZOONETICS<span style={{ color: accent }}>•</span></div>
          <div className="mt-[4%] text-[1.05cqw] font-bold tracking-[0.28em] text-white/55">K9 RESEARCH SERIES</div>
          <div className="my-[7%] h-px w-[72%] bg-white/18" />
          <div className="max-w-[94%] text-[3.5cqw] font-extrabold leading-[0.92] tracking-[-0.03em]">{title.toUpperCase()}</div>
          <div className="mt-[5%] max-w-[92%] text-[1.4cqw] font-bold leading-tight tracking-[0.05em]" style={{ color: accent }}>{compound}</div>
          {dosage && <div className="mt-[6%] text-[2.8cqw] font-extrabold tracking-[0.1em]">{dosage}</div>}
          <div className="mt-[5%] text-[0.95cqw] font-bold tracking-[0.24em] text-white/52">RESEARCH USE ONLY</div>
        </div>
      </div>
    </div>
  );
}

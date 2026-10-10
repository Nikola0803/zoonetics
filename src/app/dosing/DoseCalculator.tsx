"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

// ── Compound definitions ────────────────────────────────────────────────────

const COMPOUNDS = [
  { id: "long-run", name: "The Long Run", sub: "BPC-157 + TB-500", color: "#4F6EF7", parts: ["bpc", "tb"] as const },
  { id: "bpc-157",  name: "BPC-157",      sub: "Pentadecapeptide",  color: "#4F6EF7", parts: ["bpc"]       as const },
  { id: "tb-500",   name: "TB-500",        sub: "Thymosin β4",       color: "#5A7A9E", parts: ["tb"]        as const },
  { id: "ghk-cu",   name: "GHK-Cu",        sub: "Copper peptide",    color: "#7C5CBF", parts: ["ghk"]       as const },
  { id: "matrix",   name: "Matrix Pair",   sub: "GHK-Cu + KPV",      color: "#7C5CBF", parts: ["ghk","kpv"] as const },
];

type PartId = "bpc" | "tb" | "ghk" | "kpv";

const PARTS: Record<PartId, {
  label: string; unit: "mcg" | "mg"; color: string;
  defaultVialMg: number; vialOptions: number[];
  frequency: string; cycle: string; flat: boolean;
  calc: (kg: number) => { low: number; mid: number; high: number };
}> = {
  bpc: {
    label: "BPC-157", unit: "mcg", color: "#4F6EF7",
    defaultVialMg: 10, vialOptions: [5, 10],
    frequency: "Once daily", cycle: "5 days on · 2 off · 6–8 weeks",
    flat: false,
    calc: (kg) => ({ low: Math.round(kg * 5), mid: Math.round(kg * 10), high: Math.round(kg * 15) }),
  },
  tb: {
    label: "TB-500", unit: "mg", color: "#5A7A9E",
    defaultVialMg: 10, vialOptions: [5, 10],
    frequency: "2× weekly → 1× weekly", cycle: "6–8 weeks",
    flat: false,
    calc: (kg) => ({
      low:  parseFloat((kg * 0.08).toFixed(2)),
      mid:  parseFloat((kg * 0.15).toFixed(2)),
      high: parseFloat((kg * 0.25).toFixed(2)),
    }),
  },
  ghk: {
    label: "GHK-Cu", unit: "mg", color: "#7C5CBF",
    defaultVialMg: 50, vialOptions: [50],
    frequency: "Every other day", cycle: "4–8 weeks",
    flat: true,
    calc: () => ({ low: 1, mid: 2, high: 5 }),
  },
  kpv: {
    label: "KPV", unit: "mcg", color: "#7C5CBF",
    defaultVialMg: 10, vialOptions: [10],
    frequency: "Every other day", cycle: "4–8 weeks",
    flat: true,
    calc: () => ({ low: 100, mid: 300, high: 500 }),
  },
};

// ── Maths ───────────────────────────────────────────────────────────────────

function toMcg(amount: number, unit: "mcg" | "mg") {
  return unit === "mg" ? amount * 1000 : amount;
}

/** Auto-suggest water so a typical dose lands ~mid-barrel (≈50 units). */
function suggestWaterMl(vialMg: number, doseMcg: number): number {
  if (!vialMg || !doseMcg) return 2;
  const raw = (125 * vialMg) / doseMcg; // derived from OptimalDosages pattern (mid-barrel at 50u)
  const rounded = Math.round(raw * 2) / 2;
  return Math.min(10, Math.max(0.5, rounded));
}

function concentration(vialMg: number, waterMl: number) {
  return (vialMg * 1000) / waterMl; // mcg/mL
}

function unitsForDose(vialMg: number, waterMl: number, doseMcg: number) {
  const conc = concentration(vialMg, waterMl);
  return (doseMcg / conc) * 100; // 1 unit = 0.01 mL on U-100
}

function dosesPerVial(vialMg: number, doseMcg: number) {
  return Math.floor((vialMg * 1000) / doseMcg);
}

function formatDose(amount: number, unit: "mcg" | "mg") {
  if (unit === "mcg") {
    return amount >= 1000 ? `${(amount / 1000).toFixed(1)} mg` : `${amount} mcg`;
  }
  return `${amount} mg`;
}

// ── Animated syringe gauge ───────────────────────────────────────────────────

function SyringeGauge({
  units, color, max = 100, compact = false,
}: {
  units: number; color: string; max?: number; compact?: boolean;
}) {
  const safeMax = max > 0 ? max : 100;
  const clamped = Math.max(0, Math.min(safeMax, units));
  const pct = (clamped / safeMax) * 100;

  const [fill, setFill] = useState(compact ? pct : 0);
  useEffect(() => {
    const t = window.setTimeout(() => setFill(pct), 80);
    return () => clearTimeout(t);
  }, [pct]);

  const barrelH = compact ? 14 : 44;
  const badgePct = Math.min(88, Math.max(12, pct));
  const TICK_STEP = 5, MAJOR_STEP = 20;
  const ticks: number[] = [];
  for (let v = 0; v <= safeMax; v += TICK_STEP) ticks.push(v);

  return (
    <div className="w-full">
      <div className="flex w-full items-center">
        {/* Needle */}
        <span className={`shrink-0 bg-[#B0BACC] ${compact ? "h-px w-3" : "h-[2px] w-6"}`} />
        {/* Hub */}
        <span className={`shrink-0 rounded-l-[3px] bg-[#DDE3EE] ${compact ? "h-2 w-1" : "h-[18px] w-2"}`} />

        {/* Barrel */}
        <div className="relative min-w-0 flex-1">
          {/* Floating badge */}
          {!compact && (
            <div
              className="absolute -top-7 z-10 -translate-x-1/2 transition-[left] duration-700 ease-out"
              style={{ left: `${badgePct}%` }}
            >
              <span
                className="inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-white"
                style={{ background: color }}
              >
                {units > safeMax
                  ? `>${safeMax}u`
                  : `${Math.round(clamped * 10) / 10} units`}
              </span>
              <span
                className="mx-auto block h-1.5 w-px"
                style={{ background: color }}
              />
            </div>
          )}

          {/* Barrel body */}
          <div
            className="relative overflow-hidden rounded-r-md border border-[#C8D3E4] bg-gradient-to-b from-[#F4F7FC] to-[#E8EDF5]"
            style={{ height: barrelH }}
          >
            {/* Liquid fill */}
            <div
              className="absolute inset-y-0 left-0 transition-all duration-700 ease-out"
              style={{
                width: `${fill}%`,
                background: `linear-gradient(to bottom, ${color}55, ${color}99)`,
              }}
            />
            {/* Glass highlight */}
            <div className="pointer-events-none absolute inset-x-0 top-[20%] h-px bg-white/70" />

            {/* Ticks */}
            {ticks.map(v => {
              const major = v % MAJOR_STEP === 0;
              return (
                <span
                  key={v}
                  className="absolute bottom-0"
                  style={{ left: `${(v / safeMax) * 100}%` }}
                >
                  <span
                    className={`block w-px ${major ? "bg-[#8898B8]" : "bg-[#C0CCE0]"}`}
                    style={{ height: major ? (compact ? 6 : 13) : compact ? 3 : 7 }}
                  />
                </span>
              );
            })}

            {/* Plunger head inside barrel */}
            <div
              className="absolute inset-y-0 w-[3px] -translate-x-1/2 transition-all duration-700 ease-out"
              style={{ left: `${fill}%`, background: "#6B7A99" }}
            />
          </div>

          {/* Scale labels */}
          {!compact && (
            <div className="relative mt-1 h-4">
              {ticks
                .filter(v => v % MAJOR_STEP === 0)
                .map(v => {
                  const atStart = v === 0, atEnd = v === safeMax;
                  return (
                    <span
                      key={v}
                      className="absolute text-[10px] text-[#8898B8]"
                      style={{
                        left: `${(v / safeMax) * 100}%`,
                        transform: atStart ? "none" : atEnd ? "translateX(-100%)" : "translateX(-50%)",
                      }}
                    >
                      {v}
                    </span>
                  );
                })}
            </div>
          )}
        </div>

        {/* Plunger rod */}
        <span className={`shrink-0 bg-[#DDE3EE] ${compact ? "h-px w-3" : "h-1.5 w-10"}`} />
        {/* Thumb rest */}
        <span className={`shrink-0 rounded-full bg-[#DDE3EE] ${compact ? "h-2.5 w-1" : "h-6 w-1.5"}`} />
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export default function DoseCalculator() {
  const [selectedId, setSelectedId] = useState("long-run");
  const [weightVal,  setWeightVal]  = useState("");
  const [weightUnit, setWeightUnit] = useState<"lb" | "kg">("lb");
  const [vials,  setVials]  = useState<Partial<Record<PartId, number>>>({});
  const [waters, setWaters] = useState<Partial<Record<PartId, number>>>({});

  const compound = COMPOUNDS.find(c => c.id === selectedId)!;
  const weightKg = weightVal
    ? weightUnit === "kg" ? parseFloat(weightVal) : parseFloat(weightVal) / 2.2046
    : null;

  const getVial = (p: PartId) => vials[p] ?? PARTS[p].defaultVialMg;
  const getWater = (p: PartId, midMcg: number) =>
    waters[p] ?? suggestWaterMl(getVial(p), midMcg);

  return (
    <div>
      {/* ── Compound selector ── */}
      <div className="mb-8">
        <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#17233B]/35">Compound</p>
        <div className="flex flex-wrap gap-2">
          {COMPOUNDS.map(c => {
            const active = c.id === selectedId;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedId(c.id)}
                className="flex flex-col gap-0.5 rounded-xl border px-4 py-2.5 text-left transition-all"
                style={{
                  borderColor: active ? c.color : "#E0E8F5",
                  background:  active ? `${c.color}0E` : "#FAFBFF",
                }}
              >
                <span className="text-[13px] font-semibold leading-tight"
                  style={{ color: active ? c.color : "#17233B" }}>
                  {c.name}
                </span>
                <span className="text-[10px]"
                  style={{ color: active ? `${c.color}99` : "#9AAABB" }}>
                  {c.sub}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Weight input ── */}
      <div className="mb-10">
        <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#17233B]/35">Dog&apos;s weight</p>
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="number" min="1" max="200"
            placeholder="e.g. 55"
            value={weightVal}
            onChange={e => setWeightVal(e.target.value)}
            className="w-32 rounded-xl border border-[#D0D8EE] bg-white px-4 py-3 text-2xl font-semibold text-[#17233B] placeholder-[#17233B]/18 focus:border-[#4F6EF7] focus:outline-none focus:ring-2 focus:ring-[#4F6EF7]/10"
          />
          <div className="flex overflow-hidden rounded-xl border border-[#D0D8EE]">
            {(["lb","kg"] as const).map(u => (
              <button
                key={u}
                onClick={() => setWeightUnit(u)}
                className="px-4 py-3 text-sm font-bold uppercase tracking-wide transition"
                style={{
                  background: weightUnit === u ? "#17233B" : "transparent",
                  color:      weightUnit === u ? "#FBFCFF" : "#9AAABB",
                }}
              >{u}</button>
            ))}
          </div>
          {weightKg && (
            <span className="text-sm text-[#17233B]/40">
              = {weightUnit === "lb"
                ? `${weightKg.toFixed(1)} kg`
                : `${(weightKg * 2.2046).toFixed(1)} lb`}
            </span>
          )}
        </div>
      </div>

      {/* ── Results ── */}
      <div className="space-y-12">
        {compound.parts.map((pid, pi) => {
          const part   = PARTS[pid];
          const dose   = weightKg && weightKg > 0 ? part.calc(weightKg) : null;
          const midMcg = dose ? toMcg(dose.mid, part.unit) : 250;
          const vialMg = getVial(pid);
          const waterMl = getWater(pid, midMcg);

          const levels = dose
            ? [
                { label: "Low",  amount: dose.low,  mcg: toMcg(dose.low,  part.unit) },
                { label: "Mid",  amount: dose.mid,  mcg: toMcg(dose.mid,  part.unit) },
                { label: "High", amount: dose.high, mcg: toMcg(dose.high, part.unit) },
              ]
            : null;

          const typicalUnits = dose ? unitsForDose(vialMg, waterMl, midMcg) : 0;

          return (
            <div key={pid}>
              {/* Section label */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: part.color }} />
                  <span className="text-lg font-semibold text-[#17233B]">{part.label}</span>
                  {part.flat && (
                    <span className="rounded-full border border-[#17233B]/10 bg-[#F4F6FB] px-2.5 py-0.5 text-[10px] font-semibold text-[#17233B]/40">
                      flat dose
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-[#17233B]/35">{part.frequency}</span>
              </div>

              {/* Mid dose hero */}
              <div className="mb-6 text-center">
                {dose ? (
                  <>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#17233B]/30 mb-1">
                      {part.flat ? "Reference dose" : `Mid reference - ${weightKg?.toFixed(1)} kg`}
                    </p>
                    <p className="text-5xl font-bold tracking-tight" style={{ color: part.color }}>
                      {dose.mid}
                      <span className="text-xl ml-1.5 font-medium" style={{ color: `${part.color}99` }}>{part.unit}</span>
                    </p>
                  </>
                ) : (
                  <p className="text-[#17233B]/25 text-sm py-4">Enter dog&apos;s weight to calculate</p>
                )}
              </div>

              {/* Syringe card */}
              <div className="rounded-2xl border border-[#E0E8F5] bg-white p-6">
                {/* Main syringe */}
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#17233B]/30 mb-8">
                  Draw to this line
                </p>
                {dose ? (
                  <SyringeGauge units={typicalUnits} color={part.color} />
                ) : (
                  <div className="h-16 w-full rounded-xl bg-[#F4F6FB] flex items-center justify-center">
                    <span className="text-sm text-[#17233B]/25">enter weight above</span>
                  </div>
                )}

                {/* Draw stats */}
                {dose && (
                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span className="text-sm font-semibold" style={{ color: part.color }}>
                      {Math.round(typicalUnits * 10) / 10} units
                    </span>
                    <span className="text-[11px] text-[#17233B]/40">
                      ({((typicalUnits / 100)).toFixed(3)} mL on U-100)
                    </span>
                    <span className="text-[11px] text-[#17233B]/30">·</span>
                    <span className="text-[11px] text-[#17233B]/40">
                      {dosesPerVial(vialMg, midMcg)} doses per {vialMg} mg vial
                    </span>
                  </div>
                )}

                <hr className="my-5 border-[#EBF0F8]" />

                {/* Dose table — low / mid / high with compact syringes */}
                {levels ? (
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#EBF0F8]">
                        <th className="pb-2 pr-3 font-bold uppercase tracking-[0.14em] text-[#17233B]/30">Level</th>
                        <th className="pb-2 pr-3 font-bold uppercase tracking-[0.14em] text-[#17233B]/30">Dose</th>
                        <th className="pb-2 pr-3 font-bold uppercase tracking-[0.14em] text-[#17233B]/30">Draw to</th>
                        <th className="pb-2 text-right font-bold uppercase tracking-[0.14em] text-[#17233B]/30">Doses / vial</th>
                      </tr>
                    </thead>
                    <tbody>
                      {levels.map(l => {
                        const u = unitsForDose(vialMg, waterMl, l.mcg);
                        const isMid = l.label === "Mid";
                        return (
                          <tr
                            key={l.label}
                            className={`border-b border-[#F0F4FA] ${isMid ? "bg-[#F8FAFF]" : ""}`}
                          >
                            <td className="py-2 pr-3 font-semibold text-[#17233B]">{l.label}</td>
                            <td className="py-2 pr-3 text-[#17233B]/60 whitespace-nowrap">
                              {formatDose(l.amount, part.unit)}
                            </td>
                            <td className="py-2 pr-3">
                              <div className="flex items-center gap-2.5">
                                <div className="w-20 shrink-0">
                                  <SyringeGauge units={u} color={part.color} compact />
                                </div>
                                <span className="whitespace-nowrap font-medium" style={{ color: part.color }}>
                                  {Math.round(u * 10) / 10}u
                                </span>
                              </div>
                            </td>
                            <td className="py-2 text-right text-[#17233B]/50">
                              {dosesPerVial(vialMg, l.mcg)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <div className="h-20 flex items-center justify-center text-sm text-[#17233B]/20">
                    — table appears after weight entry
                  </div>
                )}

                {/* Reconstitution controls */}
                <div className="mt-5 flex flex-wrap items-end gap-4 border-t border-[#F0F4FA] pt-5">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#17233B]/30 mb-1.5">Vial size</p>
                    <div className="flex gap-1">
                      {part.vialOptions.map(v => (
                        <button
                          key={v}
                          onClick={() => setVials(prev => ({ ...prev, [pid]: v }))}
                          className="rounded-lg border px-2.5 py-1 text-[11px] font-semibold transition"
                          style={{
                            borderColor: vialMg === v ? part.color : "#D8E0EE",
                            background:  vialMg === v ? `${part.color}10` : "white",
                            color:       vialMg === v ? part.color : "#6B7A99",
                          }}
                        >{v} mg</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#17233B]/30 mb-1.5">BAC water</p>
                    <div className="flex gap-1">
                      {[0.5, 1, 2, 4, 10].filter(w => {
                        const suggested = suggestWaterMl(vialMg, midMcg);
                        return [0.5, 1, 2, 4, 10].includes(w) && (w <= vialMg * 2 || w === suggested);
                      }).map(w => (
                        <button
                          key={w}
                          onClick={() => setWaters(prev => ({ ...prev, [pid]: w }))}
                          className="rounded-lg border px-2.5 py-1 text-[11px] font-semibold transition"
                          style={{
                            borderColor: waterMl === w ? part.color : "#D8E0EE",
                            background:  waterMl === w ? `${part.color}10` : "white",
                            color:       waterMl === w ? part.color : "#6B7A99",
                          }}
                        >
                          {w} mL{w === suggestWaterMl(vialMg, midMcg) && "✦"}
                        </button>
                      ))}
                    </div>
                    <p className="mt-1 text-[9px] text-[#17233B]/30">✦ auto-suggested for mid-barrel draw</p>
                  </div>
                  {dose && (
                    <div className="ml-auto text-right">
                      <p className="text-[9px] text-[#17233B]/30 mb-0.5">Concentration</p>
                      <p className="text-[12px] font-semibold text-[#17233B]/55">
                        {concentration(vialMg, waterMl) >= 1000
                          ? `${(concentration(vialMg, waterMl)/1000).toFixed(1)} mg/mL`
                          : `${concentration(vialMg, waterMl).toFixed(0)} mcg/mL`}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <p className="mt-2.5 text-[11px] text-[#17233B]/30">{part.cycle}</p>

              {pi < compound.parts.length - 1 && (
                <hr className="mt-10 border-[#E8EFF8]" />
              )}
            </div>
          );
        })}
      </div>

      {/* RUO notice */}
      <div className="mt-10 flex items-start gap-3 rounded-xl border border-[#17233B]/8 bg-[#F8FAFF] px-5 py-4">
        <i className="ri-information-line mt-0.5 shrink-0 text-[#17233B]/30 text-sm" />
        <p className="text-[11px] leading-5 text-[#17233B]/40">
          <strong className="font-semibold text-[#17233B]/55">Research Use Only.</strong>{" "}
          Dose ranges compiled from published animal model literature, not veterinary recommendations.
          Involve your veterinarian before making any health decisions for your dog.{" "}
          <Link href="/#questions" className="underline underline-offset-2 hover:text-[#17233B]/60 transition">See FAQ</Link>
        </p>
      </div>
    </div>
  );
}

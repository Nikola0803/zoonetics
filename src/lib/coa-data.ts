import "server-only";
import { crmConfigured, crmGet } from "@/lib/crm-proxy";

export type CoaReportKind = "purity" | "endotoxin" | "combined";

export interface CoaReport {
  kind: CoaReportKind;
  url: string;
  label: string;
  lot: string;
  testedAt?: string;
  lab: "Horizon Analytical" | "Optiq Health Labs";
}

export interface CoaEntry {
  slug: string;
  /** Primary report retained for backwards compatibility with the CRM feed. */
  url: string;
  label?: string;
  reports?: CoaReport[];
}

export interface AdditionalWarriorReportGroup {
  name: string;
  strength: string;
  reports: CoaReport[];
}

const WARRIOR = "/coas/warrior/";

function horizon(lot: string, compound: string, kind: "purity" | "endotoxin", testedAt: string): CoaReport {
  const filename = `dps-${lot.slice(4).toLowerCase()}-${compound}-${kind}.pdf`;
  return {
    kind,
    url: `${WARRIOR}${filename}`,
    label: kind === "purity" ? "Purity & identity" : "Endotoxin",
    lot,
    testedAt,
    lab: "Horizon Analytical",
  };
}

function optiq(filename: string, lot: string, testedAt: string): CoaReport {
  return {
    kind: "combined",
    url: `${WARRIOR}${filename}`,
    label: "Potency, purity & endotoxin",
    lot,
    testedAt,
    lab: "Optiq Health Labs",
  };
}

function entry(slug: string, reports: CoaReport[]): CoaEntry {
  return { slug, url: reports[0].url, label: reports[0].lot, reports };
}

/**
 * Original third-party reports issued to Warrior Distributions, LLC.
 * Only exact compound/strength matches are connected to storefront SKUs.
 * A report for a different strength is intentionally left in the additional
 * archive rather than being presented as evidence for a product it did not test.
 */
const LOCAL_COA_MAP: Record<string, CoaEntry> = {
  "evlv-3-10mg": entry("evlv-3-10mg", [
    horizon("DPS-3733528", "retatrutide", "purity", "2026-09-15"),
    horizon("DPS-3733528", "retatrutide", "endotoxin", "2026-09-15"),
    optiq("reta-10-warrior.pdf", "BTCH-PE-99-334", "2026-09-04"),
  ]),
  "evlv-3-15mg": entry("evlv-3-15mg", [
    horizon("DPS-9173749", "retatrutide", "purity", "2026-09-15"),
    horizon("DPS-9173749", "retatrutide", "endotoxin", "2026-09-15"),
  ]),
  "evlv-3-30mg": entry("evlv-3-30mg", [
    horizon("DPS-9041738", "retatrutide", "purity", "2026-09-15"),
    horizon("DPS-9041738", "retatrutide", "endotoxin", "2026-09-15"),
    optiq("warrior-reta-30mg.pdf", "BTCH-PE-99-336", "2026-09-04"),
  ]),
  "evlv-2-10mg": entry("evlv-2-10mg", [optiq("tirz-10-warrior.pdf", "0330.OPT.260729", "2026-07-31")]),
  "evlv-2-30mg": entry("evlv-2-30mg", [optiq("tirz-30-warrior.pdf", "0332.OPT.260729", "2026-07-31")]),
  "bpc-157-10mg": entry("bpc-157-10mg", [
    horizon("DPS-9628420", "bpc-157", "purity", "2026-09-15"),
    horizon("DPS-9628420", "bpc-157", "endotoxin", "2026-09-15"),
  ]),
  "tb-500-10mg": entry("tb-500-10mg", [
    horizon("DPS-2022011", "tb-500", "purity", "2026-09-15"),
    horizon("DPS-2022011", "tb-500", "endotoxin", "2026-09-15"),
  ]),
  "bpc-tb-500-blend-20mg": entry("bpc-tb-500-blend-20mg", [
    horizon("DPS-7074663", "bpc-157-tb-500", "purity", "2026-09-16"),
    horizon("DPS-7074663", "bpc-157-tb-500", "endotoxin", "2026-09-16"),
  ]),
  "tesamorelin-10mg": entry("tesamorelin-10mg", [
    horizon("DPS-1572576", "tesamorelin", "purity", "2026-09-24"),
    horizon("DPS-1572576", "tesamorelin", "endotoxin", "2026-09-24"),
    horizon("DPS-9789916", "tesamorelin", "purity", "2026-09-15"),
    horizon("DPS-9789916", "tesamorelin", "endotoxin", "2026-09-15"),
  ]),
  "mots-c-10mg": entry("mots-c-10mg", [
    horizon("DPS-6246893", "mots-c", "purity", "2026-09-15"),
    horizon("DPS-6246893", "mots-c", "endotoxin", "2026-09-15"),
    optiq("mot-10-warr.pdf", "20260702-001", "2026-08-07"),
  ]),
  "glow-70mg": entry("glow-70mg", [
    horizon("DPS-7777201", "glow", "purity", "2026-09-15"),
    horizon("DPS-7777201", "glow", "endotoxin", "2026-09-15"),
    optiq("warrior-glow-70.pdf", "20260813-3", "2026-09-03"),
  ]),
  "klow-80mg": entry("klow-80mg", [
    horizon("DPS-8243101", "klow", "purity", "2026-09-15"),
    horizon("DPS-8243101", "klow", "endotoxin", "2026-09-15"),
    optiq("klow-warr.pdf", "2026812-8", "2026-09-03"),
  ]),
  "selank-10mg": entry("selank-10mg", [
    horizon("DPS-4692745", "selank", "purity", "2026-09-15"),
    horizon("DPS-4692745", "selank", "endotoxin", "2026-09-15"),
  ]),
  "semax-10mg": entry("semax-10mg", [
    horizon("DPS-4383620", "semax", "purity", "2026-09-15"),
    horizon("DPS-4383620", "semax", "endotoxin", "2026-09-15"),
  ]),
  "cjc-ipa-blend-10mg": entry("cjc-ipa-blend-10mg", [
    horizon("DPS-6465415", "cjc-1295-ipamorelin", "purity", "2026-09-15"),
    horizon("DPS-6465415", "cjc-1295-ipamorelin", "endotoxin", "2026-09-15"),
  ]),
  "cjc-ipa-blend-20mg": entry("cjc-ipa-blend-20mg", [optiq("cjc-ipa-war.pdf", "20260803-004", "2026-08-07")]),
  "igf-1-lr3-1mg": entry("igf-1-lr3-1mg", [
    horizon("DPS-9375813", "igf-1-lr3", "purity", "2026-09-19"),
    horizon("DPS-9375813", "igf-1-lr3", "endotoxin", "2026-09-19"),
  ]),
  "kpv-10mg": entry("kpv-10mg", [
    horizon("DPS-4673660", "kpv", "purity", "2026-09-24"),
    horizon("DPS-4673660", "kpv", "endotoxin", "2026-09-24"),
  ]),
  "pt-141-10mg": entry("pt-141-10mg", [
    horizon("DPS-9050324", "pt-141", "purity", "2026-09-15"),
    horizon("DPS-9050324", "pt-141", "endotoxin", "2026-09-15"),
  ]),
};

/** Warrior reports for compounds/strengths not currently sold as exact storefront SKUs. */
export const ADDITIONAL_WARRIOR_REPORTS: AdditionalWarriorReportGroup[] = [
  {
    name: "NAD+",
    strength: "1000MG",
    reports: [
      horizon("DPS-1640102", "nad", "purity", "2026-09-15"),
      horizon("DPS-1640102", "nad", "endotoxin", "2026-09-15"),
    ],
  },
  {
    name: "DSIP",
    strength: "10MG",
    reports: [
      horizon("DPS-2552327", "dsip", "purity", "2026-09-16"),
      horizon("DPS-2552327", "dsip", "endotoxin", "2026-09-16"),
    ],
  },
  {
    name: "Sermorelin",
    strength: "5MG",
    reports: [
      horizon("DPS-3441701", "sermorelin", "purity", "2026-09-15"),
      horizon("DPS-3441701", "sermorelin", "endotoxin", "2026-09-15"),
    ],
  },
  {
    name: "GHK-Cu",
    strength: "100MG",
    reports: [
      horizon("DPS-7384458", "ghk-cu", "purity", "2026-09-15"),
      horizon("DPS-7384458", "ghk-cu", "endotoxin", "2026-09-15"),
    ],
  },
  {
    name: "Cagrilintide",
    strength: "10MG",
    reports: [
      horizon("DPS-7613643", "cagrilintide", "purity", "2026-09-16"),
      horizon("DPS-7613643", "cagrilintide", "endotoxin", "2026-09-16"),
    ],
  },
];

export async function getCoaMap(): Promise<Record<string, CoaEntry>> {
  if (!crmConfigured()) return LOCAL_COA_MAP;

  const { ok, data } = await crmGet("/api/store/coas", { revalidate: 120 });
  if (!ok || !Array.isArray(data)) return LOCAL_COA_MAP;

  const map: Record<string, CoaEntry> = { ...LOCAL_COA_MAP };
  for (const c of data as CoaEntry[]) {
    if (c.slug && c.url) map[c.slug] = c;
  }
  return map;
}

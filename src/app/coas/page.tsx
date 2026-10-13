import { Metadata } from "next";
import { Suspense } from "react";
import { CoasClient } from "./CoasClient";
import { getCoaMap } from "@/lib/coa-data";

export const metadata: Metadata = {
  title: "Certificates of Analysis",
  description: "Independent batch verification reports for the current ZOONETICS K9 research product line, searchable by product and lot code.",
  alternates: { canonical: "/coas" },
};

export default async function CoasPage() {
  const coaMap = await getCoaMap();
  return (
    <Suspense fallback={null}>
      <CoasClient coaMap={coaMap} />
    </Suspense>
  );
}

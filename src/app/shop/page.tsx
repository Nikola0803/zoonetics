import { Suspense } from "react";
import { Metadata } from "next";
import { getProducts, getShopListProducts } from "@/lib/products";
import { getLiveProducts, mergeProducts } from "@/lib/product-feed";
import { ShopClient } from "./ShopClient";
import { TrustIconRow } from "@/components/ui/TrustIconRow";

export const metadata: Metadata = {
  title: "Canine Research Peptides | K9 Product Line",
  description: "Compare ZOONETICS canine research peptide profiles for tissue-repair signaling, recovery, inflammatory, barrier, collagen and cell-migration pathways. Review lot-level testing before checkout.",
  alternates: { canonical: "/shop" },
};

const SHOP_TRUST_ITEMS = [
  { icon: "ri-shield-check-line", label: "Independently Verified", sublabel: "Every batch independently tested" },
  { icon: "ri-truck-line", label: "US & Canada Shipping", sublabel: "1-2 business day delivery" },
  { icon: "ri-lock-line", label: "Secure Payments", sublabel: "Encrypted checkout" },
  { icon: "ri-customer-service-2-line", label: "Expert Support", sublabel: "Response within minutes" },
];

export default async function ShopPage() {
  const products = getShopListProducts(mergeProducts(getProducts(), await getLiveProducts())).filter((product) => product.name.startsWith("K9 "));

  return (
    <>
      <Suspense fallback={null}>
        <ShopClient products={products} />
      </Suspense>
      <TrustIconRow items={SHOP_TRUST_ITEMS} tone="plain" />
    </>
  );
}

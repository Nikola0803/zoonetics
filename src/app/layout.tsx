import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { CurrencyProvider } from "@/lib/currency-context";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "ZooNetics — K9 Research Peptides & Blends",
  description:
    "Shop ZooNetics K9 research peptides and blends, including BPC-157, TB-500, and GHK-Cu, with lot-level COAs and research-ready traceability.",
  keywords: ["K9 research peptides", "dog peptide research", "BPC-157 research", "TB-500 research", "GHK-Cu research", "peptide blends"],
  robots: { index: true, follow: true },
  openGraph: {
    title: "ZooNetics",
    description: "K9 research peptides and blends with lot-level COAs, clear formats, and research-ready traceability.",
    images: [
      {
        url: "/images/canis/hero-senior-lab.png",
        width: 1536,
        height: 864,
        alt: "Senior Labrador on a sunrise walk",
      },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css" />
      </head>
      <body>
        <CurrencyProvider>
          <CartProvider>{children}</CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}

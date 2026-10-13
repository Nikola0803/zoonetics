import type { Metadata } from "next";
import { Inter, Manrope, Newsreader } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { CurrencyProvider } from "@/lib/currency-context";
import { ResearchUseGate } from "@/components/layout/ResearchUseGate";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const newsreader = Newsreader({ subsets: ["latin"], variable: "--font-newsreader", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "ZOONETICS - K9 Research Peptides & Blends",
  description:
    "Shop ZOONETICS K9 research peptides and blends, including BPC-157, TB-500, and GHK-Cu, with lot-level COAs and research-ready traceability.",
  keywords: ["K9 research peptides", "dog peptide research", "BPC-157 research", "TB-500 research", "GHK-Cu research", "peptide blends"],
  other: {
    "command-center-verification": "cmv6ghrkn00oop5kqgazu4ahc",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "ZOONETICS",
    description: "K9 research peptides and blends with lot-level COAs, clear formats, and research-ready traceability.",
    images: [
      {
        url: "/images/zoonetics-premium/hero-senior-lab-v2.png",
        width: 1024,
        height: 1536,
        alt: "Senior Labrador on a sunrise walk",
      },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} ${newsreader.variable}`} data-scroll-behavior="smooth">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css" />
      </head>
      <body>
        <CurrencyProvider>
          <CartProvider><ResearchUseGate />{children}</CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}

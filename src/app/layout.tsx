import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Manrope, Newsreader } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { CurrencyProvider } from "@/lib/currency-context";
import { ResearchUseGate } from "@/components/layout/ResearchUseGate";
import { ReferralCapture } from "@/components/layout/ReferralCapture";
import { CampaignAttribution } from "@/components/layout/CampaignAttribution";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { ZooneticsFooter } from "@/components/layout/ZooneticsFooter";
import { ZooneticsHeader } from "@/components/layout/ZooneticsHeader";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const newsreader = Newsreader({ subsets: ["latin"], variable: "--font-newsreader", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://zoonetics.co"),
  applicationName: "ZOONETICS",
  title: { default: "ZOONETICS | Canine Recovery Research", template: "%s | ZOONETICS" },
  description:
    "Explore focused canine recovery research profiles for mobility, soft tissue, skin, gut and recovery, with clear product comparisons and independent lot documentation.",
  keywords: ["canine recovery research", "dog mobility research", "canine soft tissue research", "dog recovery products", "K9 research products", "BPC-157 canine research", "TB-500 canine research", "KPV canine research", "ZOONETICS"],
  alternates: { canonical: "/" },
  other: {
    "command-center-verification": "cmv6ghrkn00oop5kqgazu4ahc",
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://zoonetics.co/",
    siteName: "ZOONETICS",
    title: "ZOONETICS | More Good Days. Stronger Comebacks.",
    description: "Canine recovery research organized around the changes dog owners notice first.",
    images: [
      {
        url: "/images/zoonetics-premium/hero-senior-lab-v2.png",
        width: 1024,
        height: 1536,
        alt: "Senior Labrador on a sunrise walk",
      },
    ],
  },
  twitter: { card: "summary_large_image", title: "ZOONETICS | Canine Recovery Research", description: "Focused canine recovery research for mobility, soft tissue, skin, gut and recovery.", images: ["/images/zoonetics-premium/hero-senior-lab-v2.png"] },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const crmUrl = process.env.NEXT_PUBLIC_CRM_URL?.replace(/\/$/, "");
  const trackingKey = process.env.NEXT_PUBLIC_CRM_TRACKING_KEY;
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} ${newsreader.variable}`} data-scroll-behavior="smooth">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css" />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="ZOONETICS AI summary" />
        <Script id="zoonetics-entity" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@graph": [
            { "@type": "Organization", "@id": "https://zoonetics.co/#organization", name: "ZOONETICS", url: "https://zoonetics.co/", description: "United States canine recovery research company providing focused research products, lot documentation and the ZooProtocol canine observation platform.", sameAs: ["https://www.instagram.com/zooneticsbio/"], knowsAbout: ["canine recovery research", "canine mobility research", "soft tissue research", "BPC-157", "TB-500", "KPV", "GHK-Cu"] },
            { "@type": "WebSite", "@id": "https://zoonetics.co/#website", url: "https://zoonetics.co/", name: "ZOONETICS", publisher: { "@id": "https://zoonetics.co/#organization" }, inLanguage: "en-US" }
          ]
        }) }} />
      </head>
      <body>
        {crmUrl && trackingKey && <Script src={`${crmUrl}/pixel.js`} data-key={trackingKey} strategy="afterInteractive" />}
        <CurrencyProvider>
          <CartProvider>
            <ResearchUseGate />
            <ReferralCapture />
            <CampaignAttribution />
            <ZooneticsHeader />
            {children}
            <ZooneticsFooter />
            <CartDrawer />
          </CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}

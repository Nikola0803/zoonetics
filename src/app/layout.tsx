import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { CurrencyProvider } from "@/lib/currency-context";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "PetPeps — Research Peptides & Blends for Canine Studies",
  description:
    "Research-use-only peptides and purpose-built blends organized for canine studies, with transparent batch testing and responsible education.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "PetPeps",
    description: "Research-use-only peptides and purpose-built blends organized for canine studies.",
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

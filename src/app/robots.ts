import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zoonetics.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/account", "/checkout", "/order-success", "/trade/apply", "/trade/portal"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

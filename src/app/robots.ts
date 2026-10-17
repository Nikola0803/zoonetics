import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zoonetics.co";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/account", "/checkout", "/order-success", "/trade/apply", "/trade/portal"],
      },
      { userAgent: ["GPTBot", "ChatGPT-User", "ClaudeBot", "PerplexityBot", "Google-Extended"], allow: ["/", "/shop", "/journal", "/coas", "/sourcing", "/llms.txt", "/llms-full.txt"], disallow: ["/api/", "/account", "/checkout"] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

import type { MetadataRoute } from "next";

const siteUrl = "https://printypackaging.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/launch-checklist",
          "/status",
          "/missing-items",
          "/image-guide",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
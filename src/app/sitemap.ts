import type { MetadataRoute } from "next";
import { topSeoRoutes } from "@/data/topSeoRoutes";
import { blogPosts } from "@/data/blogs";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { markets } from "@/data/markets";

const siteUrl = "https://printypackaging.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/products`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${siteUrl}/categories`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/markets`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.82,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${siteUrl}/why-printy-packaging`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.78,
    },
  ];

  const seoRoutes: MetadataRoute.Sitemap = topSeoRoutes.map((route) => ({
    url: `${siteUrl}${route.href}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${siteUrl}/products/${product.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.86,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${siteUrl}/categories/${category.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.82,
  }));

  const marketRoutes: MetadataRoute.Sitemap = markets.map((market) => ({
    url: `${siteUrl}/markets/${market.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.78,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.72,
  }));

  return [
    ...staticRoutes,
    ...seoRoutes,
    ...productRoutes,
    ...categoryRoutes,
    ...marketRoutes,
    ...blogRoutes,
  ];
}

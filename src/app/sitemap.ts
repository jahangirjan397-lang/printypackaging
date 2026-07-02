import type { MetadataRoute } from "next";
import { products } from "../data/products";
import { blogPosts } from "../data/blogPosts";
import { categories } from "../data/categories";
import { markets } from "../data/markets";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://printypackaging.com";

  const productUrls = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const categoryUrls = categories.map((category) => ({
    url: `${baseUrl}/categories/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.88,
  }));

  const marketUrls = markets.map((market) => ({
    url: `${baseUrl}/markets/${market.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.84,
  }));

  const blogUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/markets`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.86,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    ...productUrls,
    ...categoryUrls,
    ...marketUrls,
    ...blogUrls,
  ];
}
import type { MetadataRoute } from "next";
import { blogPosts } from "../data/blogPosts";
import { categories } from "../data/categories";
import { markets } from "../data/markets";
import { products } from "../data/products";

const baseUrl = "https://printypackaging.com";
const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/markets`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.86,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/categories/${category.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.88,
  }));

  const marketPages: MetadataRoute.Sitemap = markets.map((market) => ({
    url: `${baseUrl}/markets/${market.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.84,
  }));

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [
    ...staticPages,
    ...productPages,
    ...categoryPages,
    ...marketPages,
    ...blogPages,
  ];
}
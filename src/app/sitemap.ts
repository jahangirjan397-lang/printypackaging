import type { MetadataRoute } from "next";
import { topSeoRoutes } from "@/data/topSeoRoutes";
import { blogPosts } from "@/data/blogs";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { markets } from "@/data/markets";

const siteUrl = "https://printypackaging.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/products`,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${siteUrl}/categories`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/markets`,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/portfolio`,
      changeFrequency: "monthly",
      priority: 0.76,
    },
    {
      url: `${siteUrl}/blog`,
      changeFrequency: "weekly",
      priority: 0.82,
    },
    {
      url: `${siteUrl}/about`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${siteUrl}/why-printy-packaging`,
      changeFrequency: "monthly",
      priority: 0.78,
    },
    {
    url: `${siteUrl}/faq`,
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${siteUrl}/resources`,
    changeFrequency: "monthly",
    priority: 0.72,
  },
];

  const seoRoutes: MetadataRoute.Sitemap = topSeoRoutes.map((route) => ({
    url: `${siteUrl}${route.href}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${siteUrl}/products/${product.slug}`,
    changeFrequency: "weekly",
    priority: 0.86,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${siteUrl}/categories/${category.slug}`,
    changeFrequency: "weekly",
    priority: 0.82,
  }));

  const marketRoutes: MetadataRoute.Sitemap = markets.map((market) => ({
    url: `${siteUrl}/markets/${market.slug}`,
    changeFrequency: "monthly",
    priority: 0.78,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    changeFrequency: "monthly",
    priority: 0.72,
  }));

    const allRoutes: MetadataRoute.Sitemap = [
    ...staticRoutes,
    ...seoRoutes,
    ...productRoutes,
    ...categoryRoutes,
    ...marketRoutes,
    ...blogRoutes,
  ];

  return allRoutes.filter(
    (route, index) =>
      allRoutes.findIndex((item) => item.url === route.url) === index
  );
}


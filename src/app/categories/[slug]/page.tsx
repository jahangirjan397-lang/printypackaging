import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "../../../components/Header";
import CategoryPageTemplate from "../../../components/CategoryPageTemplate";
import { categories, getCategoryBySlug } from "../../../data/categories";
import { products } from "../../../data/products";
import { metaDescription, metaTitle } from "@/lib/seo";

const siteUrl = "https://printypackaging.com";
const brandName = "Printy Packaging";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: `Category Not Found | ${brandName}`,
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const categoryUrl = `${siteUrl}/categories/${category.slug}`;
  const title = metaTitle(
    `${category.name}: Box Styles & Ideas | ${brandName}`,
    `${category.name} | ${brandName}`
  );
  const description = metaDescription(
    category.description,
    155,
    "Get a free custom quote."
  );
  // Share image: first photo of the first product in this category
  const coverImage = category.productSlugs
    .map((productSlug) => products.find((product) => product.slug === productSlug)?.images?.[0])
    .find(Boolean);
  const socialImages = coverImage
    ? [{ url: `${siteUrl}${coverImage.src}`, alt: coverImage.alt }]
    : undefined;

  return {
    title: { absolute: title },
    description,
    keywords: category.keywords,
    alternates: {
      canonical: categoryUrl,
    },
    openGraph: {
      title,
      description,
      url: categoryUrl,
      siteName: brandName,
      type: "website",
      locale: "en_US",
      images: socialImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: socialImages?.map((image) => image.url),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const categoryUrl = `${siteUrl}/categories/${category.slug}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Categories",
        item: `${siteUrl}/categories`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: category.name,
        item: categoryUrl,
      },
    ],
  };

  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.name,
    description: category.description,
    url: categoryUrl,
    isPartOf: {
      "@type": "WebSite",
      name: brandName,
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: brandName,
      url: siteUrl,
    },
  };

  return (
    <>
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageJsonLd),
        }}
      />

      <CategoryPageTemplate category={category} />

  
    </>
  );
}


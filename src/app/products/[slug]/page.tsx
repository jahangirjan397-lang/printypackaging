import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "../../../components/Header";
import ProductPageTemplate from "../../../components/ProductPageTemplate";
import { getProductBySlug, products } from "../../../data/products";

const siteUrl = "https://printypackaging.com";
const brandName = "Printy Packaging";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: `Product Not Found | ${brandName}`,
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const productUrl = `${siteUrl}/products/${product.slug}`;
  const title = `${product.name} | Custom ${product.name} Packaging | ${brandName}`;
  const description = product.description;

  return {
    title,
    description,
    keywords: product.keywords,
    alternates: {
      canonical: productUrl,
    },
    openGraph: {
      title,
      description,
      url: productUrl,
      siteName: brandName,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Header />
      <ProductPageTemplate product={product} />
    </>
  );
}
import type { Metadata } from "next";
import { metaDescription, metaTitle } from "@/lib/seo";
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
  // Buyer-intent title (e.g. "Custom Kraft Mailer Boxes with Logo"), kept under 60 characters
  const title = metaTitle(
    `Custom ${product.name} with Logo | ${brandName}`,
    `Custom ${product.name} | ${brandName}`
  );
  const description = metaDescription(
    product.description,
    155,
    "Free dieline & proof, low MOQ."
  );
  const primaryImage = product.images?.[0];

  const socialImage = primaryImage
    ? {
        url: `${siteUrl}${primaryImage.src}`,
        width: 1200,
        height: 1200,
        alt: primaryImage.alt,
      }
    : undefined;

  return {
    title: { absolute: title },
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
      ...(socialImage ? { images: [socialImage] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(socialImage ? { images: [socialImage.url] } : {}),
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
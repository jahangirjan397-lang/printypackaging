import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import ProductPageTemplate from "../../../components/ProductPageTemplate";
import { getProductBySlug, products } from "../../../data/products";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

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
      title: "Product Not Found | Printy Packaging",
    };
  }

  return {
    title: `${product.name} | Custom ${product.name} Packaging | Printy Packaging`,
    description: product.description,
    keywords: product.keywords,
    alternates: {
      canonical: `https://printypackaging.com/products/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | Printy Packaging`,
      description: product.description,
      url: `https://printypackaging.com/products/${product.slug}`,
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: "Printy Packaging",
    },
    category: product.category,
    url: `https://printypackaging.com/products/${product.slug}`,
  };

  return (
    <>
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <ProductPageTemplate product={product} />

      <Footer />
    </>
  );
}
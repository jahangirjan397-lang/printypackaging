import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import FloatingActions from "../../../components/FloatingActions";
import CategoryPageTemplate from "../../../components/CategoryPageTemplate";
import { categories, getCategoryBySlug } from "../../../data/categories";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

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
      title: "Category Not Found | Printy Packaging",
    };
  }

  return {
    title: `${category.name} | Custom Packaging Category | Printy Packaging`,
    description: category.description,
    keywords: category.keywords,
    alternates: {
      canonical: `https://printypackaging.com/categories/${category.slug}`,
    },
    openGraph: {
      title: `${category.name} | Printy Packaging`,
      description: category.description,
      url: `https://printypackaging.com/categories/${category.slug}`,
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://printypackaging.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Categories",
        item: "https://printypackaging.com/categories",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: category.name,
        item: `https://printypackaging.com/categories/${category.slug}`,
      },
    ],
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

      <CategoryPageTemplate category={category} />

      <Footer />
      <FloatingActions />
    </>
  );
}
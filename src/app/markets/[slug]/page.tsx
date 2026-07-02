import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import FloatingActions from "../../../components/FloatingActions";
import MarketPageTemplate from "../../../components/MarketPageTemplate";
import { getMarketBySlug, markets } from "../../../data/markets";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return markets.map((market) => ({
    slug: market.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const market = getMarketBySlug(slug);

  if (!market) {
    return {
      title: "Market Not Found | Printy Packaging",
    };
  }

  return {
    title: `Custom Packaging for ${market.name} | Printy Packaging`,
    description: market.description,
    keywords: market.keywords,
    alternates: {
      canonical: `https://printypackaging.com/markets/${market.slug}`,
    },
    openGraph: {
      title: `Custom Packaging for ${market.name} | Printy Packaging`,
      description: market.description,
      url: `https://printypackaging.com/markets/${market.slug}`,
      type: "website",
    },
  };
}

export default async function MarketPage({ params }: PageProps) {
  const { slug } = await params;
  const market = getMarketBySlug(slug);

  if (!market) {
    notFound();
  }

  const webpageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Custom Packaging for ${market.name}`,
    description: market.description,
    url: `https://printypackaging.com/markets/${market.slug}`,
  };

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
        name: "Markets",
        item: "https://printypackaging.com/markets",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: market.name,
        item: `https://printypackaging.com/markets/${market.slug}`,
      },
    ],
  };

  return (
    <>
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webpageJsonLd),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      <MarketPageTemplate market={market} />

      <Footer />
      <FloatingActions />
    </>
  );
}
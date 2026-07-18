import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "../../../components/Header";
import FloatingActions from "../../../components/FloatingActions";
import MarketPageTemplate from "../../../components/MarketPageTemplate";
import { getMarketBySlug, markets } from "../../../data/markets";

const siteUrl = "https://printypackaging.com";
const brandName = "Printy Packaging";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

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
      title: `Market Not Found | ${brandName}`,
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const marketUrl = `${siteUrl}/markets/${market.slug}`;
  const title = `Custom Packaging for ${market.name} | ${brandName}`;
  const description = market.description;

  return {
    title,
    description,
    keywords: market.keywords,
    alternates: {
      canonical: marketUrl,
    },
    openGraph: {
      title,
      description,
      url: marketUrl,
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

export default async function MarketPage({ params }: PageProps) {
  const { slug } = await params;
  const market = getMarketBySlug(slug);

  if (!market) {
    notFound();
  }

  const marketUrl = `${siteUrl}/markets/${market.slug}`;
  const pageTitle = `Custom Packaging for ${market.name}`;

  const webpageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageTitle,
    description: market.description,
    url: marketUrl,
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
        name: "Markets",
        item: `${siteUrl}/markets`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: market.name,
        item: marketUrl,
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

      
      <FloatingActions />
    </>
  );
}
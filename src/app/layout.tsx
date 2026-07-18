import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import HeaderGate from "@/components/HeaderGate";
import SiteFooterGate from "@/components/SiteFooterGate";
import LiveChatWidget from "@/components/LiveChatWidget";
import FloatingActions from "@/components/FloatingActions";
import "./globals.css";

const siteUrl = "https://printypackaging.com";
const brandName = "Printy Packaging";
const brandEmail = "sales@printypackaging.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Printy Packaging | Custom Boxes, Rigid Boxes & Food Packaging",
    template: "%s | Printy Packaging",
  },
  description:
    "Printy Packaging provides premium custom boxes, rigid boxes, folding cartons, butter paper, paper bags, labels, stickers, food packaging and luxury printed packaging for USA, UK, Europe, UAE and worldwide brands.",
  keywords: [
    "custom packaging",
    "custom boxes",
    "custom printed boxes",
    "rigid boxes",
    "mailer boxes",
    "folding cartons",
    "food packaging",
    "butter paper",
    "paper bags",
    "labels and stickers",
    "luxury packaging",
    "packaging manufacturer",
    "custom packaging USA",
    "custom boxes USA",
    "custom packaging UK",
    "custom packaging Europe",
    "custom packaging UAE",
  ],
  applicationName: brandName,
  creator: brandName,
  publisher: brandName,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Printy Packaging | Premium Custom Printing & Packaging",
    description:
      "Premium custom boxes, rigid boxes, mailer boxes, folding cartons, food packaging, butter paper, paper bags, labels and stickers for USA, UK, Europe, UAE and worldwide brands.",
    type: "website",
    url: siteUrl,
    siteName: brandName,
    locale: "en_US",
    images: [
      {
        url: `${siteUrl}/images/hero/hero-packaging.webp`,
        width: 1600,
        height: 900,
        alt: "Premium custom printed packaging boxes by Printy Packaging",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Printy Packaging | Premium Custom Printing & Packaging",
    description:
      "Premium custom boxes, rigid boxes, food packaging, paper bags, labels, stickers and luxury packaging for global brands.",
    images: [`${siteUrl}/images/hero/hero-packaging.webp`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/logo-icon.svg",
    shortcut: "/logo-icon.svg",
    apple: "/logo-icon.svg",
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07111F",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brandName,
    alternateName: "PrintyPackaging",
    url: siteUrl,
    logo: `${siteUrl}/logo-icon.svg`,
    email: brandEmail,
    description:
      "Printy Packaging provides custom printed packaging boxes, rigid boxes, mailer boxes, folding cartons, food packaging, butter paper, paper bags, labels, stickers and luxury packaging for USA, UK, Europe, UAE and worldwide brands.",
    areaServed: [
      {
        "@type": "Country",
        name: "United States",
      },
      {
        "@type": "Country",
        name: "United Kingdom",
      },
      {
        "@type": "Place",
        name: "Europe",
      },
      {
        "@type": "Country",
        name: "United Arab Emirates",
      },
      {
        "@type": "Place",
        name: "Worldwide",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: brandEmail,
        contactType: "sales",
        areaServed: ["US", "GB", "EU", "AE"],
        availableLanguage: ["English"],
      },
    ],
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom Packaging Boxes",
          description:
            "Custom printed packaging boxes with material, size, printing and finishing support.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Rigid Boxes",
          description:
            "Luxury rigid boxes for premium product packaging, gifts, cosmetics, perfumes and retail brands.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Mailer Boxes",
          description:
            "Custom mailer boxes for ecommerce, subscription, shipping and retail packaging.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Folding Cartons",
          description:
            "Custom folding cartons for retail, food, cosmetic and healthcare packaging.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Food Packaging",
          description:
            "Custom food packaging, butter paper, paper bags and food-safe printed packaging support.",
        },
      },
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brandName,
    alternateName: "PrintyPackaging",
    url: siteUrl,
    publisher: {
      "@type": "Organization",
      name: brandName,
      logo: `${siteUrl}/logo-icon.svg`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/products?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en">
      <body className="bg-slate-950 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />

        <HeaderGate />
        {children}
        <SiteFooterGate />
        <LiveChatWidget />
        <FloatingActions />
      </body>
    </html>
  );
}
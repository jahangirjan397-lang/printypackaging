import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import HeaderGate from "@/components/HeaderGate";
import SiteFooterGate from "@/components/SiteFooterGate";
import LiveChatWidget from "@/components/LiveChatWidget";
import "./globals.css";

const siteUrl = "https://printypackaging.com";
const brandName = "Printy Packaging";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Printy Packaging | Custom Boxes, Rigid Boxes & Food Packaging",
    template: "%s | Printy Packaging",
  },
  description:
    "Printy Packaging provides premium custom boxes, rigid boxes, folding cartons, butter paper, paper bags, labels, stickers, food packaging and luxury printed packaging for brands worldwide.",
  keywords: [
    "custom packaging",
    "custom boxes",
    "rigid boxes",
    "food packaging",
    "butter paper",
    "printed boxes",
    "folding cartons",
    "paper bags",
    "labels and stickers",
    "luxury packaging",
    "custom printed boxes",
    "packaging manufacturer",
    "custom packaging USA",
    "custom packaging UK",
    "custom packaging Canada",
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
      "Premium custom printing and packaging solutions for USA, UK, Canada, Europe and worldwide brands.",
    type: "website",
    url: siteUrl,
    siteName: brandName,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Printy Packaging | Premium Custom Printing & Packaging",
    description:
      "Premium custom boxes, rigid boxes, food packaging, paper bags, labels, stickers and luxury packaging for global brands.",
  },
  robots: {
    index: true,
    follow: true,
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
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description:
      "Custom printing and packaging company providing custom boxes, rigid boxes, food packaging, paper bags, labels, stickers and luxury packaging.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      availableLanguage: ["English"],
    },
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brandName,
    url: siteUrl,
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
      </body>
    </html>
  );
}

"use client";

import { usePathname } from "next/navigation";

const siteUrl = "https://printypackaging.com";

// Breadcrumb schema (Home > Page) for the top-level pages that do not build
// their own. Product, category, market, dieline and blog pages already have a
// fuller breadcrumb, so they are not listed here.
const pageNames: Record<string, string> = {
  "/categories": "Industries",
  "/markets": "Markets",
  "/blog": "Blog",
  "/about": "About Us",
  "/why-printy-packaging": "Why Printy Packaging",
  "/faq": "FAQ",
  "/resources": "Resources",
  "/terms": "Terms and Conditions",
  "/design-services": "Design Services",
  "/contact": "Contact",
  "/privacy-policy": "Privacy Policy",
  "/refund-policy": "Refund Policy",
  "/shipping-policy": "Shipping Policy",
  "/payment-policy": "Payment Policy",
  "/artwork-policy": "Artwork Policy",
  "/custom-packaging": "Custom Packaging",
  "/packaging-materials": "Packaging Materials",
  "/finishing-options": "Finishing Options",
  "/artwork-guide": "Artwork Guide",
  "/packaging-guide": "Packaging Guide",
  "/sample-kit": "Sample Kit",
  "/box-sizes": "Box Sizes",
  "/client-stories": "Client Stories",
};

export default function PageBreadcrumbSchema() {
  const pathname = usePathname();
  const name = pageNames[pathname];
  if (!name) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name, item: `${siteUrl}${pathname}` },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

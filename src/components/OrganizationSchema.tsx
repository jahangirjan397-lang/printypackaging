export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Printy Packaging",
    alternateName: "PrintyPackaging",
    url: "https://printypackaging.com",
    logo: "https://printypackaging.com/logo-icon.svg",
    email: "sales@printypackaging.com",
    description:
      "Printy Packaging provides custom printed packaging boxes, rigid boxes, mailer boxes, folding cartons, food packaging, butter paper, labels, stickers and luxury packaging for USA, UK, Europe, UAE and worldwide brands.",
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
        email: "sales@printypackaging.com",
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
    sameAs: ["https://printypackaging.com"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
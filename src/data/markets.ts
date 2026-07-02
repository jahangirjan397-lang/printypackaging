export type Market = {
  slug: string;
  name: string;
  region: string;
  tagline: string;
  description: string;
  keywords: string[];
  productSlugs: string[];
  benefits: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
};

export const markets: Market[] = [
  {
    slug: "usa",
    name: "USA",
    region: "United States",
    tagline: "Custom packaging solutions for USA brands",
    description:
      "Printy Packaging helps USA businesses source custom boxes, rigid boxes, food packaging, butter paper, paper bags, labels and luxury packaging with professional printing and finishing support.",
    keywords: [
      "custom packaging USA",
      "custom boxes USA",
      "rigid boxes USA",
      "food packaging USA",
      "printed boxes USA",
    ],
    productSlugs: [
      "rigid-boxes",
      "folding-cartons",
      "mailer-boxes",
      "food-packaging",
      "butter-paper",
      "paper-bags",
      "labels-stickers",
      "luxury-packaging",
    ],
    benefits: [
      "Custom packaging for startups and growing brands",
      "Premium printing and finishing options",
      "Support for ecommerce, food, beauty and retail packaging",
      "Quote guidance for size, material and finishing",
    ],
    faqs: [
      {
        question: "Do you support USA packaging clients?",
        answer:
          "Yes. Printy Packaging is designed to support USA clients with custom packaging guidance, product options and quote requests.",
      },
      {
        question: "Which packaging products are popular for USA brands?",
        answer:
          "Popular options include rigid boxes, mailer boxes, folding cartons, paper bags, labels, butter paper and food packaging.",
      },
    ],
  },
  {
    slug: "uk",
    name: "UK",
    region: "United Kingdom",
    tagline: "Custom packaging solutions for UK businesses",
    description:
      "Explore custom packaging for UK brands including luxury boxes, cosmetic boxes, retail packaging, food packaging and printed paper bags.",
    keywords: [
      "custom packaging UK",
      "custom boxes UK",
      "luxury packaging UK",
      "food packaging UK",
      "printed paper bags UK",
    ],
    productSlugs: [
      "luxury-packaging",
      "rigid-boxes",
      "cosmetic-boxes",
      "folding-cartons",
      "paper-bags",
      "labels-stickers",
    ],
    benefits: [
      "Premium presentation for retail and ecommerce brands",
      "Luxury finishing options for high-end products",
      "Packaging support for cosmetics, food and retail",
      "Clear quote process for custom packaging projects",
    ],
    faqs: [
      {
        question: "Can UK brands request custom packaging quotes?",
        answer:
          "Yes. UK brands can request packaging quotes by sharing product type, size, quantity, material and finishing requirements.",
      },
      {
        question: "Which packaging is best for UK retail brands?",
        answer:
          "Folding cartons, paper bags, labels, rigid boxes and luxury packaging are popular options for UK retail brands.",
      },
    ],
  },
  {
    slug: "canada",
    name: "Canada",
    region: "Canada",
    tagline: "Custom boxes and packaging for Canadian brands",
    description:
      "Printy Packaging provides custom packaging page structure for Canadian businesses looking for printed boxes, rigid packaging, food wrapping and retail packaging solutions.",
    keywords: [
      "custom packaging Canada",
      "custom boxes Canada",
      "rigid boxes Canada",
      "food packaging Canada",
      "printed boxes Canada",
    ],
    productSlugs: [
      "mailer-boxes",
      "rigid-boxes",
      "food-packaging",
      "butter-paper",
      "paper-bags",
      "labels-stickers",
    ],
    benefits: [
      "Packaging options for ecommerce and retail brands",
      "Food-safe packaging and wrapping options",
      "Luxury packaging for premium product lines",
      "Guidance for materials and finishing choices",
    ],
    faqs: [
      {
        question: "Do you provide packaging guidance for Canadian businesses?",
        answer:
          "Yes. The website is structured to guide Canadian buyers through packaging styles, materials, finishes and quote requests.",
      },
      {
        question: "Which packaging pages are useful for Canada clients?",
        answer:
          "Mailer boxes, rigid boxes, food packaging, butter paper, paper bags and labels are useful product pages for Canada clients.",
      },
    ],
  },
  {
    slug: "europe",
    name: "Europe",
    region: "Europe",
    tagline: "Premium packaging solutions for European brands",
    description:
      "European brands can explore custom packaging categories including luxury packaging, food packaging, cosmetic packaging, retail packaging and printing finishing options.",
    keywords: [
      "custom packaging Europe",
      "luxury packaging Europe",
      "custom boxes Europe",
      "food packaging Europe",
      "cosmetic packaging Europe",
    ],
    productSlugs: [
      "luxury-packaging",
      "cosmetic-boxes",
      "perfume-boxes",
      "food-packaging",
      "paper-bags",
      "labels-stickers",
    ],
    benefits: [
      "Premium packaging structure for international brands",
      "Luxury boxes for perfume, cosmetic and gift products",
      "Food packaging and wrapping page support",
      "Internal links for product and category discovery",
    ],
    faqs: [
      {
        question: "Can European buyers explore product-specific packaging pages?",
        answer:
          "Yes. European buyers can browse product pages, category pages and blog guides to understand packaging options.",
      },
      {
        question: "What packaging is best for European luxury brands?",
        answer:
          "Rigid boxes, perfume boxes, magnetic boxes, drawer boxes and luxury packaging are strong choices for premium brands.",
      },
    ],
  },
  {
    slug: "uae",
    name: "UAE",
    region: "United Arab Emirates",
    tagline: "Luxury and retail packaging for UAE brands",
    description:
      "UAE businesses can explore premium packaging options including luxury boxes, perfume boxes, jewelry boxes, paper bags and retail packaging.",
    keywords: [
      "custom packaging UAE",
      "luxury packaging UAE",
      "perfume boxes UAE",
      "custom boxes UAE",
      "paper bags UAE",
    ],
    productSlugs: [
      "perfume-boxes",
      "rigid-boxes",
      "luxury-packaging",
      "jewelry-boxes",
      "paper-bags",
      "labels-stickers",
    ],
    benefits: [
      "Luxury-focused packaging for premium products",
      "Strong options for perfume, jewelry and gift brands",
      "Custom print and finishing guidance",
      "Quote system for international packaging buyers",
    ],
    faqs: [
      {
        question: "Which packaging is popular for UAE luxury brands?",
        answer:
          "Perfume boxes, jewelry boxes, rigid boxes, magnetic boxes and luxury packaging are popular choices.",
      },
      {
        question: "Can UAE brands request custom packaging support?",
        answer:
          "Yes. UAE brands can use the quote form to share product details and packaging requirements.",
      },
    ],
  },
  {
    slug: "australia",
    name: "Australia",
    region: "Australia",
    tagline: "Custom packaging pages for Australian brands",
    description:
      "Australian businesses can explore packaging products including custom boxes, mailer boxes, food packaging, paper bags, butter paper and labels.",
    keywords: [
      "custom packaging Australia",
      "custom boxes Australia",
      "mailer boxes Australia",
      "food packaging Australia",
      "paper bags Australia",
    ],
    productSlugs: [
      "mailer-boxes",
      "food-packaging",
      "butter-paper",
      "paper-bags",
      "folding-cartons",
      "labels-stickers",
    ],
    benefits: [
      "Packaging options for online and retail brands",
      "Food wrapping and food-safe packaging support",
      "Product-specific pages for buyer education",
      "Clear internal links for product discovery",
    ],
    faqs: [
      {
        question: "Can Australian brands explore custom packaging options?",
        answer:
          "Yes. Australian brands can browse product, category and blog pages to understand packaging options.",
      },
      {
        question: "Which products are useful for Australian ecommerce brands?",
        answer:
          "Mailer boxes, labels, paper bags, folding cartons and food packaging are useful options for ecommerce and retail brands.",
      },
    ],
  },
];

export function getMarketBySlug(slug: string) {
  return markets.find((market) => market.slug === slug);
}
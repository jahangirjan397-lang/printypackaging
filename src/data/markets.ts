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

function buildMarketKeywords(region: string, keywords: string[]) {
  return Array.from(
    new Set([
      ...keywords,
      `custom packaging ${region}`,
      `custom boxes ${region}`,
      `printed boxes ${region}`,
      `packaging supplier ${region}`,
      `packaging manufacturer ${region}`,
      `custom product boxes ${region}`,
      `luxury packaging ${region}`,
      `food packaging ${region}`,
      `retail packaging ${region}`,
      "custom packaging",
      "custom boxes",
      "printed packaging",
      "packaging quote",
      "premium packaging",
    ])
  );
}

function buildMarketFaqs(region: string) {
  return [
    {
      question: `Can ${region} brands request custom packaging quotes?`,
      answer: `Yes. ${region} brands can request custom packaging quote guidance by sharing product type, size, quantity, material preference, printing colors, finishing options, artwork status and delivery country.`,
    },
    {
      question: `Which packaging products are popular for ${region} buyers?`,
      answer:
        "Popular products include rigid boxes, mailer boxes, folding cartons, food packaging, paper bags, labels, stickers and luxury packaging depending on the business type.",
    },
    {
      question: `Can ${region} ecommerce brands use custom mailer boxes?`,
      answer:
        "Yes. Ecommerce brands can use custom mailer boxes, shipping boxes, labels, stickers and branded inserts for a better delivery and unboxing experience.",
    },
    {
      question: `Do ${region} buyers need artwork before requesting a quote?`,
      answer:
        "Artwork is helpful but not required for the first inquiry. Buyers can send size, quantity, material, printing and finishing details first.",
    },
  ];
}

export const markets: Market[] = [
  {
    slug: "usa",
    name: "USA",
    region: "United States",
    tagline: "Custom packaging solutions for USA brands",
    description:
      "Printy Packaging helps USA businesses explore custom boxes, rigid boxes, mailer boxes, food packaging, butter paper, paper bags, labels, stickers and luxury packaging with professional printing, material and finishing guidance. USA buyers can use product pages, category pages and quote forms to plan packaging requirements clearly.",
    keywords: buildMarketKeywords("USA", [
      "custom packaging USA",
      "custom boxes USA",
      "rigid boxes USA",
      "food packaging USA",
      "printed boxes USA",
      "mailer boxes USA",
      "luxury packaging USA",
    ]),
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
      "Custom packaging support for startups and growing USA brands",
      "Premium printing and finishing options for retail presentation",
      "Packaging guidance for ecommerce, food, beauty and luxury products",
      "Quote support based on size, material, finishing and artwork status",
      "Helpful internal guides for materials, finishes, samples and dielines",
    ],
    faqs: buildMarketFaqs("USA"),
  },

  {
    slug: "uk",
    name: "UK",
    region: "United Kingdom",
    tagline: "Custom packaging solutions for UK businesses",
    description:
      "UK brands can explore custom packaging options including luxury boxes, cosmetic boxes, retail packaging, food packaging, paper bags, labels, stickers and folding cartons. Printy Packaging helps buyers understand material, finish, artwork and quote details before moving forward.",
    keywords: buildMarketKeywords("UK", [
      "custom packaging UK",
      "custom boxes UK",
      "luxury packaging UK",
      "food packaging UK",
      "printed paper bags UK",
      "cosmetic boxes UK",
    ]),
    productSlugs: [
      "luxury-packaging",
      "rigid-boxes",
      "cosmetic-boxes",
      "folding-cartons",
      "paper-bags",
      "labels-stickers",
    ],
    benefits: [
      "Premium presentation for UK retail and ecommerce brands",
      "Luxury finishing options for high-end product packaging",
      "Packaging support for cosmetics, food, retail and product launches",
      "Clear quote planning for custom packaging projects",
      "Helpful guide pages for materials, artwork and samples",
    ],
    faqs: buildMarketFaqs("UK"),
  },

  {
    slug: "canada",
    name: "Canada",
    region: "Canada",
    tagline: "Custom boxes and packaging for Canadian brands",
    description:
      "Printy Packaging helps Canadian businesses explore custom boxes, rigid packaging, mailer boxes, food wrapping, paper bags, labels and retail packaging. Canada buyers can browse packaging products and guides before submitting quote details.",
    keywords: buildMarketKeywords("Canada", [
      "custom packaging Canada",
      "custom boxes Canada",
      "rigid boxes Canada",
      "food packaging Canada",
      "printed boxes Canada",
      "mailer boxes Canada",
    ]),
    productSlugs: [
      "mailer-boxes",
      "rigid-boxes",
      "food-packaging",
      "butter-paper",
      "paper-bags",
      "labels-stickers",
    ],
    benefits: [
      "Packaging options for Canadian ecommerce and retail brands",
      "Food-safe packaging and wrapping options",
      "Luxury packaging for premium product lines",
      "Material and finishing guidance for packaging quotes",
      "Internal links for product, category and guide discovery",
    ],
    faqs: buildMarketFaqs("Canada"),
  },

  {
    slug: "europe",
    name: "Europe",
    region: "Europe",
    tagline: "Premium packaging solutions for European brands",
    description:
      "European brands can explore custom packaging categories including luxury packaging, food packaging, cosmetic packaging, retail packaging and printing finishing options. Printy Packaging helps international buyers understand product styles, materials, finishes and quote requirements.",
    keywords: buildMarketKeywords("Europe", [
      "custom packaging Europe",
      "luxury packaging Europe",
      "custom boxes Europe",
      "food packaging Europe",
      "cosmetic packaging Europe",
      "printed boxes Europe",
    ]),
    productSlugs: [
      "luxury-packaging",
      "cosmetic-boxes",
      "perfume-boxes",
      "food-packaging",
      "paper-bags",
      "labels-stickers",
    ],
    benefits: [
      "Premium packaging structure for European brands",
      "Luxury boxes for perfume, cosmetic and gift products",
      "Food packaging and food wrapping page support",
      "Product-specific pages for buyer education",
      "Material, finishing and artwork guide support",
    ],
    faqs: buildMarketFaqs("Europe"),
  },

  {
    slug: "uae",
    name: "UAE",
    region: "United Arab Emirates",
    tagline: "Luxury and retail packaging for UAE brands",
    description:
      "UAE businesses can explore premium packaging options including luxury boxes, perfume boxes, jewelry boxes, rigid boxes, paper bags, labels and retail packaging. Printy Packaging supports luxury-focused buyers with material, finish and quote guidance.",
    keywords: buildMarketKeywords("UAE", [
      "custom packaging UAE",
      "luxury packaging UAE",
      "perfume boxes UAE",
      "custom boxes UAE",
      "paper bags UAE",
      "rigid boxes UAE",
    ]),
    productSlugs: [
      "perfume-boxes",
      "rigid-boxes",
      "luxury-packaging",
      "jewelry-boxes",
      "paper-bags",
      "labels-stickers",
    ],
    benefits: [
      "Luxury-focused packaging for premium UAE products",
      "Strong options for perfume, jewelry and gift brands",
      "Custom print and finishing guidance",
      "Quote system for international packaging buyers",
      "Helpful guides for premium materials and finishes",
    ],
    faqs: buildMarketFaqs("UAE"),
  },

  {
    slug: "australia",
    name: "Australia",
    region: "Australia",
    tagline: "Custom packaging pages for Australian brands",
    description:
      "Australian businesses can explore custom packaging products including custom boxes, mailer boxes, food packaging, paper bags, butter paper, folding cartons and labels. Printy Packaging helps buyers compare product options before sending a quote request.",
    keywords: buildMarketKeywords("Australia", [
      "custom packaging Australia",
      "custom boxes Australia",
      "mailer boxes Australia",
      "food packaging Australia",
      "paper bags Australia",
      "printed boxes Australia",
    ]),
    productSlugs: [
      "mailer-boxes",
      "food-packaging",
      "butter-paper",
      "paper-bags",
      "folding-cartons",
      "labels-stickers",
    ],
    benefits: [
      "Packaging options for Australian online and retail brands",
      "Food wrapping and food-safe packaging support",
      "Product-specific pages for buyer education",
      "Clear internal links for product discovery",
      "Quote guidance for material, print and finish planning",
    ],
    faqs: buildMarketFaqs("Australia"),
  },
];

export function getMarketBySlug(slug: string) {
  return markets.find((market) => market.slug === slug);
}


export type Category = {
  slug: string;
  name: string;
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

function buildCategoryKeywords(name: string, keywords: string[]) {
  const categoryName = name.toLowerCase();

  return Array.from(
    new Set([
      ...keywords,
      categoryName,
      `custom ${categoryName}`,
      `printed ${categoryName}`,
      `${categoryName} boxes`,
      `${categoryName} packaging`,
      "custom packaging",
      "custom boxes",
      "printed boxes",
      "packaging manufacturer",
      "packaging supplier",
      "custom packaging USA",
      "custom packaging UK",
      "custom packaging Canada",
      "premium packaging",
      "packaging quote",
    ])
  );
}

export const categories: Category[] = [
  {
    slug: "luxury-packaging",
    name: "Luxury Packaging",
    tagline: "Premium packaging for high-end brands",
    description:
      "Luxury packaging is designed for premium products that need strong presentation, beautiful unboxing and high-value shelf impact. Explore rigid boxes, perfume boxes, jewelry boxes, magnetic boxes, drawer boxes and premium packaging solutions with foil stamping, embossing, debossing, spot UV and soft-touch finishing options.",
    keywords: buildCategoryKeywords("Luxury Packaging", [
      "luxury packaging",
      "premium packaging",
      "custom luxury boxes",
      "rigid boxes",
      "magnetic boxes",
      "drawer boxes",
      "perfume boxes",
      "jewelry boxes",
      "luxury gift boxes",
    ]),
    productSlugs: [
      "rigid-boxes",
      "luxury-packaging",
      "perfume-boxes",
      "jewelry-boxes",
      "magnetic-boxes",
      "drawer-boxes",
    ],
    benefits: [
      "Premium presentation for high-value products",
      "Strong rigid structure and luxury unboxing feel",
      "Foil, embossing, spot UV and soft-touch finish options",
      "Suitable for perfume, jewelry, gifts and cosmetics",
      "Custom size, inserts and branded artwork support",
    ],
    faqs: [
      {
        question: "What products are best for luxury packaging?",
        answer:
          "Luxury packaging is best for perfume, jewelry, cosmetics, gifts, candles, premium retail products and high-value brand presentation.",
      },
      {
        question: "Which finishes are popular for luxury packaging?",
        answer:
          "Popular luxury finishes include soft touch lamination, matte lamination, gold or silver foil, embossing, debossing and spot UV.",
      },
      {
        question: "Can luxury packaging be made in custom sizes?",
        answer:
          "Yes. Luxury packaging can be produced in custom sizes with rigid board, inserts, premium wrap paper and brand-focused artwork.",
      },
    ],
  },

  {
    slug: "food-packaging",
    name: "Food Packaging",
    tagline: "Food-safe packaging for restaurants, bakeries and cafes",
    description:
      "Food packaging includes butter paper, bakery boxes, burger boxes, pizza boxes, food boxes and wrapping solutions for restaurants, cafes, bakeries, food trucks and takeaway brands. Printy Packaging helps food businesses plan branded food-safe packaging with practical material and printing guidance.",
    keywords: buildCategoryKeywords("Food Packaging", [
      "food packaging",
      "custom food boxes",
      "butter paper",
      "bakery boxes",
      "burger boxes",
      "pizza boxes",
      "restaurant packaging",
      "food-safe packaging",
      "takeaway packaging",
    ]),
    productSlugs: [
      "food-packaging",
      "butter-paper",
      "bakery-boxes",
      "burger-boxes",
      "pizza-boxes",
    ],
    benefits: [
      "Food-safe packaging and wrapping options",
      "Useful for restaurants, cafes, bakeries and takeaway brands",
      "Custom logo printing for better food brand visibility",
      "Burger, pizza, bakery and butter paper packaging support",
      "Material guidance for grease resistance and presentation",
    ],
    faqs: [
      {
        question: "What types of food packaging are available?",
        answer:
          "Food packaging options include butter paper, bakery boxes, burger boxes, pizza boxes, snack boxes, takeaway boxes and food wrapping paper.",
      },
      {
        question: "Can food packaging be printed with a restaurant logo?",
        answer:
          "Yes. Food packaging can be printed with logo, brand colors, product details and promotional artwork depending on the material and product type.",
      },
      {
        question: "Which material is best for food packaging?",
        answer:
          "The best material depends on food type, grease resistance, temperature, serving style and delivery method. Food-grade paper, kraft, SBS, greaseproof paper and coated paper may be used.",
      },
    ],
  },

  {
    slug: "retail-packaging",
    name: "Retail Packaging",
    tagline: "Custom packaging for shops, stores and product brands",
    description:
      "Retail packaging helps brands improve shelf presentation, product protection and customer experience. Explore folding cartons, display boxes, window boxes, sleeve boxes, paper bags, labels, stickers and hang tags for retail stores, ecommerce brands and product launches.",
    keywords: buildCategoryKeywords("Retail Packaging", [
      "retail packaging",
      "custom retail boxes",
      "display boxes",
      "window boxes",
      "paper bags",
      "labels",
      "stickers",
      "hang tags",
      "product packaging",
    ]),
    productSlugs: [
      "folding-cartons",
      "display-boxes",
      "window-boxes",
      "sleeve-boxes",
      "paper-bags",
      "labels-stickers",
      "hang-tags",
    ],
    benefits: [
      "Better shelf presentation for product brands",
      "Custom printed boxes, bags, labels and tags",
      "Useful for shops, retail chains and ecommerce brands",
      "Window, sleeve and display options for product visibility",
      "Brand-focused design and finishing support",
    ],
    faqs: [
      {
        question: "What is retail packaging used for?",
        answer:
          "Retail packaging is used to protect products, improve shelf display, communicate brand identity and support the customer buying experience.",
      },
      {
        question: "Which products are included in retail packaging?",
        answer:
          "Retail packaging can include folding cartons, display boxes, window boxes, sleeve boxes, paper bags, labels, stickers and hang tags.",
      },
      {
        question: "Can retail packaging be made for ecommerce brands?",
        answer:
          "Yes. Retail packaging can be planned for ecommerce brands with custom size, printed branding, product labels and shipping-friendly options.",
      },
    ],
  },

  {
    slug: "cosmetic-packaging",
    name: "Cosmetic Packaging",
    tagline: "Packaging for beauty, skincare and cosmetic brands",
    description:
      "Cosmetic packaging is made for skincare, makeup, beauty products, perfumes, soaps and personal care brands that need clean design, premium printing and professional finishing. Explore cosmetic boxes, perfume boxes, soap boxes, labels and folding cartons.",
    keywords: buildCategoryKeywords("Cosmetic Packaging", [
      "cosmetic packaging",
      "custom cosmetic boxes",
      "skincare packaging",
      "makeup boxes",
      "perfume boxes",
      "soap boxes",
      "beauty packaging",
      "printed cosmetic boxes",
    ]),
    productSlugs: [
      "cosmetic-boxes",
      "perfume-boxes",
      "soap-boxes",
      "folding-cartons",
      "labels-stickers",
    ],
    benefits: [
      "Premium packaging for beauty and skincare brands",
      "Useful for creams, serums, perfumes, makeup and soaps",
      "Custom printed boxes with logo and product information",
      "Foil, embossing, spot UV and lamination options",
      "Retail-ready packaging for cosmetic product launches",
    ],
    faqs: [
      {
        question: "What packaging is best for cosmetic products?",
        answer:
          "Cosmetic boxes, folding cartons, perfume boxes, soap boxes and labels are useful options for beauty, skincare and personal care brands.",
      },
      {
        question: "Can cosmetic packaging include premium finishes?",
        answer:
          "Yes. Cosmetic packaging can include matte lamination, gloss lamination, soft touch, foil stamping, embossing, debossing and spot UV.",
      },
      {
        question: "Do cosmetic boxes need custom artwork?",
        answer:
          "Final production should use approved artwork with logo, product text, barcode, ingredients, colors and dieline details.",
      },
    ],
  },

  {
    slug: "printing-finishing",
    name: "Printing & Finishing",
    tagline: "Premium print finishes for professional packaging",
    description:
      "Printing and finishing options improve the final look of packaging with matte lamination, gloss lamination, soft touch, spot UV, foiling, embossing, debossing, die cutting and window patching. These options help packaging feel more professional and brand-focused.",
    keywords: buildCategoryKeywords("Printing & Finishing", [
      "packaging finishing",
      "spot uv",
      "gold foiling",
      "silver foiling",
      "embossing",
      "debossing",
      "lamination",
      "die cutting",
      "soft touch packaging",
    ]),
    productSlugs: [
      "luxury-packaging",
      "rigid-boxes",
      "folding-cartons",
      "paper-bags",
      "labels-stickers",
    ],
    benefits: [
      "Premium look and feel for printed packaging",
      "Better brand presentation and shelf impact",
      "Foil, embossing, spot UV and lamination options",
      "Useful for luxury, cosmetic, retail and product boxes",
      "Improved customer unboxing and product experience",
    ],
    faqs: [
      {
        question: "Which packaging finishes are most popular?",
        answer:
          "Popular finishes include matte lamination, gloss lamination, soft touch, foil stamping, embossing, debossing, spot UV and die cutting.",
      },
      {
        question: "Does finishing affect packaging cost?",
        answer:
          "Yes. Finishing can affect cost depending on the selected option, artwork area, quantity, material and production complexity.",
      },
      {
        question: "Can multiple finishes be used together?",
        answer:
          "Yes. Some packaging projects can combine lamination with foil, embossing, spot UV or other premium effects depending on design and material.",
      },
    ],
  },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}
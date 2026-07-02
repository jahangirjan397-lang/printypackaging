export type Product = {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  description: string;
  keywords: string[];
  features: string[];
  materials: string[];
  finishes: string[];
  industries: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
};

export const products: Product[] = [
  {
    slug: "rigid-boxes",
    name: "Rigid Boxes",
    tagline: "Luxury rigid packaging for premium brands",
    category: "Luxury Packaging",
    description:
      "Custom rigid boxes are ideal for perfumes, cosmetics, jewelry, gifts, candles and premium retail products. Printy Packaging creates luxury rigid packaging with premium materials, printing and finishing options.",
    keywords: [
      "custom rigid boxes",
      "luxury rigid boxes",
      "rigid packaging",
      "premium gift boxes",
      "magnetic rigid boxes",
    ],
    features: [
      "Premium luxury presentation",
      "Strong and durable structure",
      "Custom sizes and styles",
      "Ideal for high-value products",
    ],
    materials: ["Rigid Board", "Art Paper", "Textured Paper", "Specialty Paper"],
    finishes: ["Gold Foiling", "Embossing", "Spot UV", "Soft Touch Lamination"],
    industries: ["Perfume", "Cosmetics", "Jewelry", "Gifts", "Luxury Retail"],
    faqs: [
      {
        question: "Can rigid boxes be made in custom sizes?",
        answer:
          "Yes, rigid boxes can be produced in custom sizes based on your product dimensions and packaging style.",
      },
      {
        question: "Which finishing is best for rigid boxes?",
        answer:
          "Foiling, embossing, soft touch lamination and spot UV are popular premium finishing options for rigid boxes.",
      },
    ],
  },
  {
    slug: "folding-cartons",
    name: "Folding Cartons",
    tagline: "Custom printed cartons for retail and product packaging",
    category: "Folding Cartons",
    description:
      "Custom folding cartons are suitable for cosmetics, food, pharma, retail and general product packaging. They are lightweight, printable and cost-effective for large production quantities.",
    keywords: [
      "custom folding cartons",
      "printed cartons",
      "product boxes",
      "retail packaging boxes",
      "offset printed cartons",
    ],
    features: [
      "Cost-effective production",
      "Sharp offset printing",
      "Easy assembly",
      "Multiple box styles",
    ],
    materials: ["SBS Board", "Art Card", "Kraft Board", "Duplex Board"],
    finishes: ["Matte Lamination", "Gloss Lamination", "Spot UV", "Die Cutting"],
    industries: ["Cosmetics", "Pharma", "Food", "Retail", "Electronics"],
    faqs: [
      {
        question: "Are folding cartons suitable for retail products?",
        answer:
          "Yes, folding cartons are widely used for retail products because they are printable, lightweight and cost-effective.",
      },
      {
        question: "Can folding cartons be printed in CMYK?",
        answer:
          "Yes, folding cartons can be printed in CMYK, Pantone colors and custom brand colors.",
      },
    ],
  },
  {
    slug: "mailer-boxes",
    name: "Mailer Boxes",
    tagline: "Branded mailer boxes for ecommerce and delivery",
    category: "Corrugated Packaging",
    description:
      "Custom mailer boxes are perfect for ecommerce, subscription boxes, shipping and product delivery. They provide product protection and strong brand presentation.",
    keywords: [
      "custom mailer boxes",
      "ecommerce packaging",
      "subscription boxes",
      "shipping boxes",
      "corrugated mailer boxes",
    ],
    features: [
      "Strong shipping protection",
      "Great unboxing experience",
      "Custom inside and outside printing",
      "Ideal for ecommerce brands",
    ],
    materials: ["Corrugated Board", "Kraft Board", "White Corrugated Board"],
    finishes: ["CMYK Printing", "Matte Lamination", "Spot UV", "Die Cutting"],
    industries: ["E-commerce", "Subscription Brands", "Retail", "Apparel"],
    faqs: [
      {
        question: "Are mailer boxes strong enough for shipping?",
        answer:
          "Yes, mailer boxes are made with corrugated board and are designed for protection during delivery.",
      },
      {
        question: "Can mailer boxes be printed inside?",
        answer:
          "Yes, mailer boxes can be printed inside and outside for a premium unboxing experience.",
      },
    ],
  },
  {
    slug: "butter-paper",
    name: "Butter Paper",
    tagline: "Custom printed butter paper for food brands",
    category: "Food Wrapping",
    description:
      "Custom butter paper is used for burgers, sandwiches, bakery items, snacks and food wrapping. It helps food brands improve presentation while keeping products clean and professional.",
    keywords: [
      "custom butter paper",
      "printed butter paper",
      "burger wrapping paper",
      "deli paper",
      "greaseproof paper",
      "food wrapping paper",
    ],
    features: [
      "Food-safe wrapping solution",
      "Custom printed branding",
      "Ideal for burgers and bakery",
      "Professional food presentation",
    ],
    materials: ["Butter Paper", "Greaseproof Paper", "Deli Paper", "Food Grade Paper"],
    finishes: ["Custom Printing", "Single Color Print", "Full Color Print"],
    industries: ["Restaurants", "Bakeries", "Burger Brands", "Cafes", "Food Trucks"],
    faqs: [
      {
        question: "Can butter paper be printed with logo?",
        answer:
          "Yes, butter paper can be custom printed with your logo, pattern and brand design.",
      },
      {
        question: "Is butter paper suitable for burgers?",
        answer:
          "Yes, butter paper is commonly used for burgers, sandwiches and other food wrapping applications.",
      },
    ],
  },
  {
    slug: "food-packaging",
    name: "Food Packaging",
    tagline: "Food-safe custom packaging for restaurants and bakeries",
    category: "Food Packaging",
    description:
      "Custom food packaging includes bakery boxes, burger boxes, pizza boxes, snack boxes and food-safe wrapping solutions for restaurants, cafes and food brands.",
    keywords: [
      "custom food packaging",
      "bakery boxes",
      "burger boxes",
      "restaurant packaging",
      "food boxes",
    ],
    features: [
      "Food-safe packaging options",
      "Custom printed branding",
      "Multiple food packaging styles",
      "Perfect for takeaway and delivery",
    ],
    materials: ["Kraft Board", "SBS Board", "Food Grade Paper", "Corrugated Board"],
    finishes: ["CMYK Printing", "Matte Lamination", "Aqueous Coating", "Die Cutting"],
    industries: ["Restaurants", "Bakeries", "Cafes", "Pizza Brands", "Frozen Food"],
    faqs: [
      {
        question: "Do you make custom food boxes?",
        answer:
          "Yes, we can create custom food boxes for bakery, burgers, pizza, snacks and restaurant products.",
      },
      {
        question: "Can food packaging be branded?",
        answer:
          "Yes, food packaging can be custom printed with your logo, colors and brand design.",
      },
    ],
  },
  {
    slug: "paper-bags",
    name: "Paper Bags",
    tagline: "Custom printed paper bags for retail brands",
    category: "Retail Packaging",
    description:
      "Custom paper bags are used for retail stores, fashion brands, events, gifts and premium shopping experiences. They can be printed with custom designs and brand colors.",
    keywords: [
      "custom paper bags",
      "printed paper bags",
      "retail paper bags",
      "shopping bags",
      "luxury paper bags",
    ],
    features: [
      "Premium retail presentation",
      "Custom sizes and handles",
      "Strong paper materials",
      "Ideal for stores and events",
    ],
    materials: ["Kraft Paper", "Art Paper", "White Paper", "Specialty Paper"],
    finishes: ["Matte Lamination", "Gloss Lamination", "Foiling", "Embossing"],
    industries: ["Retail", "Fashion", "Events", "Gifts", "Luxury Brands"],
    faqs: [
      {
        question: "Can paper bags be printed with brand colors?",
        answer:
          "Yes, paper bags can be printed with logo, brand colors, patterns and promotional designs.",
      },
      {
        question: "Which handles are available for paper bags?",
        answer:
          "Common handle options include rope handles, twisted paper handles and ribbon handles.",
      },
    ],
  },
  {
    slug: "labels-stickers",
    name: "Labels & Stickers",
    tagline: "Custom labels and stickers for product branding",
    category: "Branding",
    description:
      "Custom labels and stickers help brands improve product presentation, packaging identity and promotional impact. They are suitable for jars, bottles, boxes, bags and retail packaging.",
    keywords: [
      "custom labels",
      "custom stickers",
      "printed stickers",
      "product labels",
      "packaging stickers",
    ],
    features: [
      "High-quality product branding",
      "Custom shapes and sizes",
      "Multiple materials",
      "Suitable for packaging and promotion",
    ],
    materials: ["Sticker Paper", "Vinyl", "Transparent Sticker", "Textured Labels"],
    finishes: ["Gloss Finish", "Matte Finish", "Die Cut", "Foil Labels"],
    industries: ["Cosmetics", "Food", "Retail", "Beverages", "E-commerce"],
    faqs: [
      {
        question: "Can stickers be die cut?",
        answer:
          "Yes, stickers can be die cut into custom shapes based on your design and packaging needs.",
      },
      {
        question: "Can labels be waterproof?",
        answer:
          "Yes, vinyl and laminated labels can be used where moisture resistance is required.",
      },
    ],
  },
  {
    slug: "luxury-packaging",
    name: "Luxury Packaging",
    tagline: "Premium packaging with foiling, embossing and high-end finishes",
    category: "Luxury Packaging",
    description:
      "Luxury packaging is designed for premium brands that want strong shelf impact, beautiful unboxing and high-value presentation. It can include rigid boxes, foiling, embossing and specialty materials.",
    keywords: [
      "luxury packaging",
      "premium packaging",
      "custom luxury boxes",
      "foil packaging",
      "high end packaging",
    ],
    features: [
      "High-end brand presentation",
      "Premium materials and finishes",
      "Perfect for luxury products",
      "Custom style and structure",
    ],
    materials: ["Rigid Board", "Specialty Paper", "Textured Paper", "Art Paper"],
    finishes: ["Gold Foiling", "Embossing", "Debossing", "Soft Touch", "Spot UV"],
    industries: ["Perfume", "Jewelry", "Cosmetics", "Gifts", "Premium Retail"],
    faqs: [
      {
        question: "What makes packaging luxury?",
        answer:
          "Luxury packaging usually uses premium materials, high-quality printing, foiling, embossing and strong presentation.",
      },
      {
        question: "Can luxury packaging be fully customized?",
        answer:
          "Yes, luxury packaging can be customized in size, structure, material, printing and finishing.",
      },
    ],
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
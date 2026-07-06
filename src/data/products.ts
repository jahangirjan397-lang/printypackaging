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

function getProductMaterials(name: string, category: string) {
  const text = `${name} ${category}`.toLowerCase();

  if (
    text.includes("rigid") ||
    text.includes("magnetic") ||
    text.includes("drawer") ||
    text.includes("luxury") ||
    text.includes("jewelry") ||
    text.includes("perfume")
  ) {
    return [
      "Rigid Board 1000-2000 GSM",
      "Grey Board 1.5mm-3mm",
      "Chipboard 1.5mm-3mm",
      "Art Paper Wrap 128-170 GSM",
      "Special Texture Paper",
      "Kraft / Black Paper Wrap",
    ];
  }

  if (
    text.includes("mailer") ||
    text.includes("shipping") ||
    text.includes("pizza") ||
    text.includes("corrugated")
  ) {
    return [
      "E-Flute Corrugated Board",
      "B-Flute Corrugated Board",
      "Micro Flute Board",
      "3 Ply Corrugated Board",
      "5 Ply Corrugated Board",
      "White Back / Kraft Corrugated Board",
    ];
  }

  if (
    text.includes("butter") ||
    text.includes("food") ||
    text.includes("bakery") ||
    text.includes("burger")
  ) {
    return [
      "Food Grade SBS 250-400 GSM",
      "Food Grade Kraft 200-350 GSM",
      "Butter Paper 30-80 GSM",
      "Greaseproof Paper 40-70 GSM",
      "PE Coated Paper",
      "Glassine Paper",
    ];
  }

  if (
    text.includes("label") ||
    text.includes("sticker") ||
    text.includes("hang tag")
  ) {
    return [
      "Gloss Sticker Stock",
      "Matte Sticker Stock",
      "Semi Gloss Sticker Stock",
      "Vinyl Sticker",
      "Transparent Sticker",
      "Art Card / Kraft Card",
    ];
  }

  if (text.includes("paper bag") || text.includes("bag")) {
    return [
      "Kraft Paper 120-200 GSM",
      "Art Paper 157-200 GSM",
      "White Kraft Paper",
      "Brown Kraft Paper",
      "Cotton / Rope Handles",
      "Ribbon Handles",
    ];
  }

  return [
    "SBS / Bleach Card 250-450 GSM",
    "Art Card 210-450 GSM",
    "Art Paper 128-200 GSM",
    "Duplex Board 300-500 GSM",
    "Kraft Card 250-450 GSM",
    "Food Grade Card",
  ];
}

function getProductFinishes(name: string, category: string) {
  const text = `${name} ${category}`.toLowerCase();

  if (
    text.includes("rigid") ||
    text.includes("luxury") ||
    text.includes("perfume") ||
    text.includes("jewelry") ||
    text.includes("magnetic") ||
    text.includes("drawer")
  ) {
    return [
      "Soft Touch Lamination",
      "Matte Lamination",
      "Gold / Silver Foiling",
      "Embossing / Debossing",
      "Spot UV",
      "Magnetic Closure / Insert Options",
    ];
  }

  if (
    text.includes("food") ||
    text.includes("butter") ||
    text.includes("bakery") ||
    text.includes("burger") ||
    text.includes("pizza")
  ) {
    return [
      "Food Safe Printing",
      "Matte / Gloss Finish",
      "Grease Resistant Coating",
      "Die Cutting",
      "Window Patching",
      "Food Grade Ink Guidance",
    ];
  }

  if (text.includes("sticker") || text.includes("label")) {
    return [
      "Gloss Finish",
      "Matte Finish",
      "UV Coating",
      "Die Cut Shape",
      "Waterproof Finish",
      "Roll / Sheet Sticker Options",
    ];
  }

  return [
    "Matte Lamination",
    "Gloss Lamination",
    "Soft Touch Lamination",
    "Spot UV",
    "Foiling / Embossing",
    "Die Cutting",
  ];
}

function makeProduct(
  slug: string,
  name: string,
  category: string,
  tagline: string,
  description: string,
  keywords: string[],
  industries: string[]
): Product {
  return {
    slug,
    name,
    category,
    tagline,
    description,
    keywords,
    features: [
      "Custom sizes and styles",
      "Premium printing quality",
      "Brand-focused packaging design",
      "Professional material and finishing options",
    ],
    materials: getProductMaterials(name, category),
    finishes: getProductFinishes(name, category),
    industries,
    faqs: [
      {
        question: `Can ${name.toLowerCase()} be made in custom sizes?`,
        answer: `Yes, ${name.toLowerCase()} can be produced in custom sizes based on your product dimensions, quantity and packaging style.`,
      },
      {
        question: `Can ${name.toLowerCase()} be printed with my logo?`,
        answer: `Yes, ${name.toLowerCase()} can be custom printed with your logo, brand colors, artwork and finishing options.`,
      },
      {
        question: `Which material is best for ${name.toLowerCase()}?`,
        answer: `The best material depends on product weight, usage, presentation and budget. Our team can guide you with the right board, paper and finish.`,
      },
    ],
  };
}

export const products: Product[] = [
  makeProduct(
    "rigid-boxes",
    "Rigid Boxes",
    "Luxury Packaging",
    "Luxury rigid packaging for premium brands",
    "Custom rigid boxes are ideal for perfumes, cosmetics, jewelry, gifts, candles and premium retail products. Printy Packaging creates luxury rigid packaging with premium materials, printing and finishing options.",
    [
      "custom rigid boxes",
      "luxury rigid boxes",
      "rigid packaging",
      "premium gift boxes",
    ],
    ["Perfume", "Cosmetics", "Jewelry", "Gifts", "Luxury Retail"]
  ),

  makeProduct(
    "folding-cartons",
    "Folding Cartons",
    "Folding Cartons",
    "Custom printed cartons for retail and product packaging",
    "Custom folding cartons are suitable for cosmetics, food, pharma, retail and general product packaging. They are lightweight, printable and cost-effective for large production quantities.",
    [
      "custom folding cartons",
      "printed cartons",
      "retail packaging boxes",
      "product boxes",
    ],
    ["Cosmetics", "Pharma", "Food", "Retail", "Electronics"]
  ),

  makeProduct(
    "mailer-boxes",
    "Mailer Boxes",
    "Corrugated Packaging",
    "Branded mailer boxes for ecommerce and delivery",
    "Custom mailer boxes are perfect for ecommerce, subscription boxes, shipping and product delivery. They provide protection and a premium unboxing experience.",
    [
      "custom mailer boxes",
      "ecommerce packaging",
      "subscription boxes",
      "shipping boxes",
    ],
    ["E-commerce", "Subscription Brands", "Retail", "Apparel"]
  ),

  makeProduct(
    "butter-paper",
    "Butter Paper",
    "Food Wrapping",
    "Custom printed butter paper for food brands",
    "Custom butter paper is used for burgers, sandwiches, bakery items, snacks and food wrapping. It helps food brands improve presentation while keeping products clean and professional.",
    [
      "custom butter paper",
      "printed butter paper",
      "burger wrapping paper",
      "deli paper",
      "food wrapping paper",
    ],
    ["Restaurants", "Bakeries", "Burger Brands", "Cafes", "Food Trucks"]
  ),

  makeProduct(
    "food-packaging",
    "Food Packaging",
    "Food Packaging",
    "Food-safe custom packaging for restaurants and bakeries",
    "Custom food packaging includes bakery boxes, burger boxes, pizza boxes, snack boxes and food-safe wrapping solutions for restaurants, cafes and food brands.",
    [
      "custom food packaging",
      "bakery boxes",
      "burger boxes",
      "restaurant packaging",
      "food boxes",
    ],
    ["Restaurants", "Bakeries", "Cafes", "Pizza Brands", "Frozen Food"]
  ),

  makeProduct(
    "paper-bags",
    "Paper Bags",
    "Retail Packaging",
    "Custom printed paper bags for retail brands",
    "Custom paper bags are used for retail stores, fashion brands, events, gifts and premium shopping experiences. They can be printed with custom designs and brand colors.",
    [
      "custom paper bags",
      "printed paper bags",
      "retail paper bags",
      "shopping bags",
    ],
    ["Retail", "Fashion", "Events", "Gifts", "Luxury Brands"]
  ),

  makeProduct(
    "labels-stickers",
    "Labels & Stickers",
    "Branding",
    "Custom labels and stickers for product branding",
    "Custom labels and stickers help brands improve product presentation, packaging identity and promotional impact for jars, bottles, boxes, bags and retail packaging.",
    ["custom labels", "custom stickers", "printed stickers", "product labels"],
    ["Cosmetics", "Food", "Retail", "Beverages", "E-commerce"]
  ),

  makeProduct(
    "luxury-packaging",
    "Luxury Packaging",
    "Luxury Packaging",
    "Premium packaging with foiling, embossing and high-end finishes",
    "Luxury packaging is designed for premium brands that want strong shelf impact, beautiful unboxing and high-value presentation.",
    [
      "luxury packaging",
      "premium packaging",
      "custom luxury boxes",
      "foil packaging",
    ],
    ["Perfume", "Jewelry", "Cosmetics", "Gifts", "Premium Retail"]
  ),

  makeProduct(
    "cosmetic-boxes",
    "Cosmetic Boxes",
    "Cosmetic Packaging",
    "Custom cosmetic packaging for beauty and skincare brands",
    "Custom cosmetic boxes help beauty brands present skincare, makeup, creams, serums and cosmetics with premium printing and professional finishing.",
    [
      "custom cosmetic boxes",
      "makeup boxes",
      "skincare packaging",
      "beauty product packaging",
    ],
    ["Cosmetics", "Skincare", "Beauty", "Retail"]
  ),

  makeProduct(
    "perfume-boxes",
    "Perfume Boxes",
    "Luxury Packaging",
    "Premium perfume boxes for fragrance brands",
    "Custom perfume boxes are designed for fragrance brands that need luxury presentation, strong structure and premium finishing like foiling and embossing.",
    [
      "custom perfume boxes",
      "fragrance packaging",
      "luxury perfume boxes",
      "perfume packaging",
    ],
    ["Perfume", "Fragrance", "Luxury Retail", "Gifts"]
  ),

  makeProduct(
    "candle-boxes",
    "Candle Boxes",
    "Retail Packaging",
    "Custom candle packaging for premium candle brands",
    "Custom candle boxes protect candles and improve presentation for luxury, handmade and retail candle brands.",
    [
      "custom candle boxes",
      "candle packaging",
      "luxury candle boxes",
      "printed candle boxes",
    ],
    ["Candles", "Gifts", "Retail", "Home Decor"]
  ),

  makeProduct(
    "soap-boxes",
    "Soap Boxes",
    "Retail Packaging",
    "Custom soap boxes for handmade and beauty brands",
    "Custom soap boxes are ideal for handmade soap, organic soap, skincare and beauty product packaging.",
    [
      "custom soap boxes",
      "soap packaging",
      "printed soap boxes",
      "kraft soap boxes",
    ],
    ["Soap", "Beauty", "Skincare", "Retail"]
  ),

  makeProduct(
    "jewelry-boxes",
    "Jewelry Boxes",
    "Luxury Packaging",
    "Elegant jewelry boxes for premium presentation",
    "Custom jewelry boxes are used for rings, necklaces, bracelets, watches and premium gift packaging.",
    [
      "custom jewelry boxes",
      "luxury jewelry packaging",
      "ring boxes",
      "gift jewelry boxes",
    ],
    ["Jewelry", "Luxury Retail", "Gifts", "Fashion"]
  ),

  makeProduct(
    "bakery-boxes",
    "Bakery Boxes",
    "Food Packaging",
    "Custom bakery boxes for cakes, pastries and desserts",
    "Custom bakery boxes are suitable for cakes, cupcakes, pastries, cookies and dessert packaging.",
    ["custom bakery boxes", "cake boxes", "pastry boxes", "dessert packaging"],
    ["Bakery", "Cafes", "Desserts", "Food"]
  ),

  makeProduct(
    "burger-boxes",
    "Burger Boxes",
    "Food Packaging",
    "Custom burger boxes for restaurants and food delivery",
    "Custom burger boxes are made for restaurants, cafes, food trucks and takeaway brands that need food-safe branded packaging.",
    [
      "custom burger boxes",
      "burger packaging",
      "restaurant burger boxes",
      "takeaway packaging",
    ],
    ["Restaurants", "Burger Brands", "Food Trucks", "Cafes"]
  ),

  makeProduct(
    "pizza-boxes",
    "Pizza Boxes",
    "Food Packaging",
    "Custom pizza boxes for delivery and takeaway",
    "Custom pizza boxes help pizza brands deliver food safely while promoting their logo and brand identity.",
    [
      "custom pizza boxes",
      "printed pizza boxes",
      "pizza packaging",
      "food delivery boxes",
    ],
    ["Pizza Brands", "Restaurants", "Takeaway", "Food Delivery"]
  ),

  makeProduct(
    "display-boxes",
    "Display Boxes",
    "Retail Packaging",
    "Retail display boxes for shelf-ready product presentation",
    "Custom display boxes help retail products stand out on shelves and counters with strong branding and practical structure.",
    [
      "custom display boxes",
      "retail display boxes",
      "counter display boxes",
      "shelf packaging",
    ],
    ["Retail", "Cosmetics", "Food", "Pharma"]
  ),

  makeProduct(
    "window-boxes",
    "Window Boxes",
    "Retail Packaging",
    "Custom window boxes with clear product visibility",
    "Custom window boxes allow customers to see the product inside while keeping packaging branded and professional.",
    [
      "custom window boxes",
      "clear window packaging",
      "window cartons",
      "retail window boxes",
    ],
    ["Retail", "Food", "Cosmetics", "Gifts"]
  ),

  makeProduct(
    "sleeve-boxes",
    "Sleeve Boxes",
    "Retail Packaging",
    "Custom sleeve packaging for premium product presentation",
    "Custom sleeve boxes are used for product wraps, tray sleeves, cosmetic sleeves and premium retail packaging.",
    ["custom sleeve boxes", "sleeve packaging", "printed sleeves", "box sleeves"],
    ["Cosmetics", "Retail", "Food", "Gifts"]
  ),

  makeProduct(
    "magnetic-boxes",
    "Magnetic Boxes",
    "Luxury Packaging",
    "Luxury magnetic closure boxes for premium brands",
    "Custom magnetic boxes create a premium unboxing experience with strong structure and elegant closure.",
    [
      "magnetic boxes",
      "custom magnetic boxes",
      "magnetic closure packaging",
      "luxury magnetic boxes",
    ],
    ["Perfume", "Jewelry", "Gifts", "Luxury Retail"]
  ),

  makeProduct(
    "drawer-boxes",
    "Drawer Boxes",
    "Luxury Packaging",
    "Premium drawer boxes for gifts and luxury products",
    "Custom drawer boxes provide an elegant sliding structure for luxury products, gifts, cosmetics and premium retail packaging.",
    [
      "drawer boxes",
      "custom drawer boxes",
      "sliding boxes",
      "luxury drawer packaging",
    ],
    ["Gifts", "Cosmetics", "Jewelry", "Luxury Retail"]
  ),

  makeProduct(
    "pharmaceutical-boxes",
    "Pharmaceutical Boxes",
    "Pharma Packaging",
    "Custom pharmaceutical packaging for healthcare products",
    "Custom pharmaceutical boxes are designed for medicine, healthcare products, supplements and medical packaging with clear printing and reliable structure.",
    [
      "pharmaceutical boxes",
      "medicine packaging",
      "healthcare packaging",
      "custom pharma boxes",
    ],
    ["Pharma", "Healthcare", "Supplements", "Medical"]
  ),

  makeProduct(
    "apparel-boxes",
    "Apparel Boxes",
    "Fashion Packaging",
    "Custom apparel packaging for clothing and fashion brands",
    "Custom apparel boxes are used for clothing, fashion accessories, shirts, scarves, shoes and premium retail delivery.",
    [
      "apparel boxes",
      "clothing packaging",
      "fashion packaging",
      "custom clothing boxes",
    ],
    ["Fashion", "Apparel", "Retail", "E-commerce"]
  ),

  makeProduct(
    "hang-tags",
    "Hang Tags",
    "Branding",
    "Custom hang tags for apparel and retail products",
    "Custom hang tags improve brand presentation for apparel, fashion accessories, handmade products and retail packaging.",
    ["custom hang tags", "printed hang tags", "apparel tags", "retail tags"],
    ["Fashion", "Apparel", "Retail", "Handmade Brands"]
  ),
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
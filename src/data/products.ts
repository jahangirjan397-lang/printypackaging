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

function buildKeywords(name: string, category: string, keywords: string[]) {
  const productName = name.toLowerCase();
  const categoryName = category.toLowerCase();

  return Array.from(
    new Set([
      ...keywords,
      productName,
      `custom ${productName}`,
      `printed ${productName}`,
      `${productName} packaging`,
      `${productName} boxes`,
      categoryName,
      `custom ${categoryName}`,
      "custom packaging",
      "custom boxes",
      "printed packaging",
      "packaging manufacturer",
      "custom packaging USA",
      "custom packaging UK",
      "custom packaging Canada",
      "premium packaging",
      "packaging quote",
    ])
  );
}

function buildFeatures(name: string) {
  return [
    `Custom ${name.toLowerCase()} in different sizes and styles`,
    "Premium printing quality for brand-focused presentation",
    "Material guidance based on product weight and usage",
    "Finishing options for retail, ecommerce and luxury packaging",
    "Artwork and dieline support for print-ready packaging",
    "Quote guidance based on size, quantity, material and finish",
    "Suitable for USA, UK, Canada and international buyers",
    "Professional packaging structure for better customer experience",
  ];
}

function buildFaqs(name: string, category: string) {
  const lowerName = name.toLowerCase();

  return [
    {
      question: `Can ${lowerName} be made in custom sizes?`,
      answer: `Yes, ${lowerName} can be produced in custom sizes based on your product dimensions, quantity, packaging style and delivery requirement.`,
    },
    {
      question: `Can ${lowerName} be printed with my logo and brand colors?`,
      answer: `Yes, ${lowerName} can be custom printed with your logo, brand colors, product text, barcode, artwork and premium finishing options.`,
    },
    {
      question: `Which material is best for ${lowerName}?`,
      answer: `The best material depends on product weight, usage, shipping method, brand presentation and budget. Printy Packaging can guide you with suitable board, paper, kraft, corrugated or rigid material options.`,
    },
    {
      question: `Which finishing options are available for ${lowerName}?`,
      answer: `Finishing options can include matte lamination, gloss lamination, soft touch, foil stamping, embossing, debossing, spot UV, die cutting and other options depending on the product and material.`,
    },
    {
      question: `Do you support ${category.toLowerCase()} inquiries for USA, UK and Canada buyers?`,
      answer: `Yes, Printy Packaging is built for international custom packaging inquiries including USA, UK, Canada, Europe, UAE and worldwide buyers.`,
    },
    {
      question: `Do I need artwork before requesting a quote for ${lowerName}?`,
      answer: `Artwork is helpful but not required for the first quote request. You can share size, quantity, material, printing and finishing details first. Final production should use approved artwork and dieline files.`,
    },
    {
      question: `What details should I send for a ${lowerName} quote?`,
      answer: `For a better quote, send box style, product size, quantity, material preference, printing colors, finishing options, artwork status and delivery country.`,
    },
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
    keywords: buildKeywords(name, category, keywords),
    features: buildFeatures(name),
    materials: getProductMaterials(name, category),
    finishes: getProductFinishes(name, category),
    industries,
    faqs: buildFaqs(name, category),
  };
}

export const products: Product[] = [
  makeProduct(
    "rigid-boxes",
    "Rigid Boxes",
    "Luxury Packaging",
    "Luxury rigid packaging for premium brands",
    "Custom rigid boxes are ideal for perfumes, cosmetics, jewelry, gifts, candles and premium retail products. Printy Packaging helps brands create luxury rigid packaging with strong structure, premium wrapping paper, high-end printing and finishing options such as foil, embossing, debossing and spot UV.",
    [
      "custom rigid boxes",
      "luxury rigid boxes",
      "rigid packaging",
      "premium gift boxes",
      "magnetic rigid boxes",
      "rigid gift packaging",
    ],
    ["Perfume", "Cosmetics", "Jewelry", "Gifts", "Luxury Retail"]
  ),

  makeProduct(
    "folding-cartons",
    "Folding Cartons",
    "Folding Cartons",
    "Custom printed cartons for retail and product packaging",
    "Custom folding cartons are suitable for cosmetics, food, pharma, retail and general product packaging. They are lightweight, printable and cost-effective for brands that need professional product boxes with custom size, material, printing and finishing options.",
    [
      "custom folding cartons",
      "printed cartons",
      "retail packaging boxes",
      "product boxes",
      "folding carton packaging",
      "custom printed cartons",
    ],
    ["Cosmetics", "Pharma", "Food", "Retail", "Electronics"]
  ),

  makeProduct(
    "mailer-boxes",
    "Mailer Boxes",
    "Corrugated Packaging",
    "Branded mailer boxes for ecommerce and delivery",
    "Custom mailer boxes are perfect for ecommerce, subscription boxes, shipping and product delivery. They provide protection, easy opening, brand visibility and a premium unboxing experience for online stores and product-based businesses.",
    [
      "custom mailer boxes",
      "ecommerce packaging",
      "subscription boxes",
      "shipping boxes",
      "corrugated mailer boxes",
      "branded mailer boxes",
    ],
    ["E-commerce", "Subscription Brands", "Retail", "Apparel"]
  ),

  makeProduct(
    "butter-paper",
    "Butter Paper",
    "Food Wrapping",
    "Custom printed butter paper for food brands",
    "Custom butter paper is used for burgers, sandwiches, bakery items, snacks and food wrapping. It helps food brands improve presentation, cleanliness and brand visibility with printed food wrapping paper for restaurants, cafes and takeaway businesses.",
    [
      "custom butter paper",
      "printed butter paper",
      "burger wrapping paper",
      "deli paper",
      "food wrapping paper",
      "custom food paper",
    ],
    ["Restaurants", "Bakeries", "Burger Brands", "Cafes", "Food Trucks"]
  ),

  makeProduct(
    "food-packaging",
    "Food Packaging",
    "Food Packaging",
    "Food-safe custom packaging for restaurants and bakeries",
    "Custom food packaging includes bakery boxes, burger boxes, pizza boxes, snack boxes, food wraps and food-safe packaging solutions for restaurants, cafes, bakeries and food brands that need practical branded packaging.",
    [
      "custom food packaging",
      "bakery boxes",
      "burger boxes",
      "restaurant packaging",
      "food boxes",
      "food-safe packaging",
    ],
    ["Restaurants", "Bakeries", "Cafes", "Pizza Brands", "Frozen Food"]
  ),

  makeProduct(
    "paper-bags",
    "Paper Bags",
    "Retail Packaging",
    "Custom printed paper bags for retail brands",
    "Custom paper bags are used for retail stores, fashion brands, events, gifts and premium shopping experiences. They can be printed with custom artwork, brand colors, logo placement and handle options for a professional retail look.",
    [
      "custom paper bags",
      "printed paper bags",
      "retail paper bags",
      "shopping bags",
      "branded paper bags",
      "kraft paper bags",
    ],
    ["Retail", "Fashion", "Events", "Gifts", "Luxury Brands"]
  ),

  makeProduct(
    "labels-stickers",
    "Labels & Stickers",
    "Branding",
    "Custom labels and stickers for product branding",
    "Custom labels and stickers help brands improve product presentation, packaging identity and promotional impact for jars, bottles, boxes, bags, mailers and retail packaging. They can be produced in different shapes, finishes and material options.",
    [
      "custom labels",
      "custom stickers",
      "printed stickers",
      "product labels",
      "branded stickers",
      "packaging labels",
    ],
    ["Cosmetics", "Food", "Retail", "Beverages", "E-commerce"]
  ),

  makeProduct(
    "luxury-packaging",
    "Luxury Packaging",
    "Luxury Packaging",
    "Premium packaging with foiling, embossing and high-end finishes",
    "Luxury packaging is designed for premium brands that want strong shelf impact, beautiful unboxing and high-value presentation. It can include rigid boxes, magnetic boxes, drawer boxes, textured paper, foil stamping, embossing and soft-touch finishes.",
    [
      "luxury packaging",
      "premium packaging",
      "custom luxury boxes",
      "foil packaging",
      "high end packaging",
      "luxury printed boxes",
    ],
    ["Perfume", "Jewelry", "Cosmetics", "Gifts", "Premium Retail"]
  ),

  makeProduct(
    "cosmetic-boxes",
    "Cosmetic Boxes",
    "Cosmetic Packaging",
    "Custom cosmetic packaging for beauty and skincare brands",
    "Custom cosmetic boxes help beauty brands present skincare, makeup, creams, serums and cosmetics with premium printing, professional structure and attractive finishing options for retail and ecommerce sales.",
    [
      "custom cosmetic boxes",
      "makeup boxes",
      "skincare packaging",
      "beauty product packaging",
      "cosmetic packaging boxes",
      "printed cosmetic boxes",
    ],
    ["Cosmetics", "Skincare", "Beauty", "Retail"]
  ),

  makeProduct(
    "perfume-boxes",
    "Perfume Boxes",
    "Luxury Packaging",
    "Premium perfume boxes for fragrance brands",
    "Custom perfume boxes are designed for fragrance brands that need luxury presentation, strong structure and premium finishing like foiling, embossing, spot UV and soft-touch lamination.",
    [
      "custom perfume boxes",
      "fragrance packaging",
      "luxury perfume boxes",
      "perfume packaging",
      "perfume gift boxes",
      "printed perfume boxes",
    ],
    ["Perfume", "Fragrance", "Luxury Retail", "Gifts"]
  ),

  makeProduct(
    "candle-boxes",
    "Candle Boxes",
    "Retail Packaging",
    "Custom candle packaging for premium candle brands",
    "Custom candle boxes protect candles and improve presentation for luxury, handmade and retail candle brands. They can be made with custom size, board material, window options, premium printing and finishing.",
    [
      "custom candle boxes",
      "candle packaging",
      "luxury candle boxes",
      "printed candle boxes",
      "candle gift boxes",
      "retail candle packaging",
    ],
    ["Candles", "Gifts", "Retail", "Home Decor"]
  ),

  makeProduct(
    "soap-boxes",
    "Soap Boxes",
    "Retail Packaging",
    "Custom soap boxes for handmade and beauty brands",
    "Custom soap boxes are ideal for handmade soap, organic soap, skincare products and beauty product packaging. They can be printed with product details, ingredients, logo, kraft style or premium finish.",
    [
      "custom soap boxes",
      "soap packaging",
      "printed soap boxes",
      "kraft soap boxes",
      "organic soap packaging",
      "handmade soap boxes",
    ],
    ["Soap", "Beauty", "Skincare", "Retail"]
  ),

  makeProduct(
    "jewelry-boxes",
    "Jewelry Boxes",
    "Luxury Packaging",
    "Elegant jewelry boxes for premium presentation",
    "Custom jewelry boxes are used for rings, necklaces, bracelets, watches and premium gift packaging. They can include rigid structure, inserts, velvet feel, textured wrap, foil stamping and luxury finishing.",
    [
      "custom jewelry boxes",
      "luxury jewelry packaging",
      "ring boxes",
      "gift jewelry boxes",
      "watch packaging",
      "jewelry gift packaging",
    ],
    ["Jewelry", "Luxury Retail", "Gifts", "Fashion"]
  ),

  makeProduct(
    "bakery-boxes",
    "Bakery Boxes",
    "Food Packaging",
    "Custom bakery boxes for cakes, pastries and desserts",
    "Custom bakery boxes are suitable for cakes, cupcakes, pastries, cookies, desserts and takeaway bakery products. They can include food-safe board, window patching, custom printing and branded bakery presentation.",
    [
      "custom bakery boxes",
      "cake boxes",
      "pastry boxes",
      "dessert packaging",
      "cupcake boxes",
      "bakery packaging",
    ],
    ["Bakery", "Cafes", "Desserts", "Food"]
  ),

  makeProduct(
    "burger-boxes",
    "Burger Boxes",
    "Food Packaging",
    "Custom burger boxes for restaurants and food delivery",
    "Custom burger boxes are made for restaurants, cafes, food trucks and takeaway brands that need food-safe branded packaging. They help protect food while improving presentation and customer experience.",
    [
      "custom burger boxes",
      "burger packaging",
      "restaurant burger boxes",
      "takeaway packaging",
      "burger takeaway boxes",
      "food delivery burger boxes",
    ],
    ["Restaurants", "Burger Brands", "Food Trucks", "Cafes"]
  ),

  makeProduct(
    "pizza-boxes",
    "Pizza Boxes",
    "Food Packaging",
    "Custom pizza boxes for delivery and takeaway",
    "Custom pizza boxes help pizza brands deliver food safely while promoting their logo and brand identity. They can be made with corrugated board, kraft style, food-safe printing and custom size options.",
    [
      "custom pizza boxes",
      "printed pizza boxes",
      "pizza packaging",
      "food delivery boxes",
      "branded pizza boxes",
      "takeaway pizza boxes",
    ],
    ["Pizza Brands", "Restaurants", "Takeaway", "Food Delivery"]
  ),

  makeProduct(
    "display-boxes",
    "Display Boxes",
    "Retail Packaging",
    "Retail display boxes for shelf-ready product presentation",
    "Custom display boxes help retail products stand out on shelves and counters with strong branding, practical structure and clear product presentation for cosmetics, food, pharma and retail items.",
    [
      "custom display boxes",
      "retail display boxes",
      "counter display boxes",
      "shelf packaging",
      "product display boxes",
      "printed display boxes",
    ],
    ["Retail", "Cosmetics", "Food", "Pharma"]
  ),

  makeProduct(
    "window-boxes",
    "Window Boxes",
    "Retail Packaging",
    "Custom window boxes with clear product visibility",
    "Custom window boxes allow customers to see the product inside while keeping packaging branded and professional. They are useful for food, cosmetics, gifts and retail products that benefit from product visibility.",
    [
      "custom window boxes",
      "clear window packaging",
      "window cartons",
      "retail window boxes",
      "window packaging boxes",
      "printed window boxes",
    ],
    ["Retail", "Food", "Cosmetics", "Gifts"]
  ),

  makeProduct(
    "sleeve-boxes",
    "Sleeve Boxes",
    "Retail Packaging",
    "Custom sleeve packaging for premium product presentation",
    "Custom sleeve boxes are used for product wraps, tray sleeves, cosmetic sleeves and premium retail packaging. They give products a clean branded look with efficient material usage.",
    [
      "custom sleeve boxes",
      "sleeve packaging",
      "printed sleeves",
      "box sleeves",
      "product sleeve packaging",
      "custom packaging sleeves",
    ],
    ["Cosmetics", "Retail", "Food", "Gifts"]
  ),

  makeProduct(
    "magnetic-boxes",
    "Magnetic Boxes",
    "Luxury Packaging",
    "Luxury magnetic closure boxes for premium brands",
    "Custom magnetic boxes create a premium unboxing experience with strong structure and elegant closure. They are popular for luxury gifts, perfumes, jewelry, cosmetics and premium retail products.",
    [
      "magnetic boxes",
      "custom magnetic boxes",
      "magnetic closure packaging",
      "luxury magnetic boxes",
      "magnetic gift boxes",
      "premium magnetic boxes",
    ],
    ["Perfume", "Jewelry", "Gifts", "Luxury Retail"]
  ),

  makeProduct(
    "drawer-boxes",
    "Drawer Boxes",
    "Luxury Packaging",
    "Premium drawer boxes for gifts and luxury products",
    "Custom drawer boxes provide an elegant sliding structure for luxury products, gifts, cosmetics and premium retail packaging. They can include inserts, textured wrap, foil stamping and special finishing.",
    [
      "drawer boxes",
      "custom drawer boxes",
      "sliding boxes",
      "luxury drawer packaging",
      "drawer gift boxes",
      "premium sliding boxes",
    ],
    ["Gifts", "Cosmetics", "Jewelry", "Luxury Retail"]
  ),

  makeProduct(
    "pharmaceutical-boxes",
    "Pharmaceutical Boxes",
    "Pharma Packaging",
    "Custom pharmaceutical packaging for healthcare products",
    "Custom pharmaceutical boxes are designed for medicine, healthcare products, supplements and medical packaging with clear printing, reliable structure and professional product information layout.",
    [
      "pharmaceutical boxes",
      "medicine packaging",
      "healthcare packaging",
      "custom pharma boxes",
      "supplement packaging",
      "medical packaging boxes",
    ],
    ["Pharma", "Healthcare", "Supplements", "Medical"]
  ),

  makeProduct(
    "apparel-boxes",
    "Apparel Boxes",
    "Fashion Packaging",
    "Custom apparel packaging for clothing and fashion brands",
    "Custom apparel boxes are used for clothing, fashion accessories, shirts, scarves, shoes and premium retail delivery. They help fashion brands improve product presentation and unboxing experience.",
    [
      "apparel boxes",
      "clothing packaging",
      "fashion packaging",
      "custom clothing boxes",
      "garment packaging",
      "fashion mailer boxes",
    ],
    ["Fashion", "Apparel", "Retail", "E-commerce"]
  ),

  makeProduct(
    "hang-tags",
    "Hang Tags",
    "Branding",
    "Custom hang tags for apparel and retail products",
    "Custom hang tags improve brand presentation for apparel, fashion accessories, handmade products and retail packaging. They can include brand story, price, product details, barcode and premium finishing.",
    [
      "custom hang tags",
      "printed hang tags",
      "apparel tags",
      "retail tags",
      "clothing hang tags",
      "brand hang tags",
    ],
    ["Fashion", "Apparel", "Retail", "Handmade Brands"]
  ),
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

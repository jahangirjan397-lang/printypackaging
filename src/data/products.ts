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
    "Custom rigid boxes are ideal for perfumes, cosmetics, jewelry, gifts, candles and premium retail products. Printy Packaging helps brands create luxury rigid packaging with strong structure, premium wrapping paper, custom inserts, high-end printing and finishing options such as foil stamping, embossing, debossing, spot UV and soft-touch lamination.",
    [
      "custom rigid boxes",
      "luxury rigid boxes",
      "rigid packaging",
      "premium gift boxes",
      "magnetic rigid boxes",
      "rigid gift packaging",
      "custom rigid box packaging",
      "luxury gift boxes",
      "perfume rigid boxes",
      "jewelry rigid boxes",
      "premium product packaging",
      "high end rigid boxes",
    ],
    ["Perfume", "Cosmetics", "Jewelry", "Gifts", "Luxury Retail"]
  ),

  makeProduct(
    "folding-cartons",
    "Folding Cartons",
    "Folding Cartons",
    "Custom printed cartons for retail and product packaging",
    "Custom folding cartons are suitable for cosmetics, food, pharma, retail and general product packaging. They are lightweight, printable and cost-effective for brands that need professional paperboard boxes with custom size, material, printing, barcode placement, dieline support and finishing options.",
    [
      "custom folding cartons",
      "printed cartons",
      "retail packaging boxes",
      "product boxes",
      "folding carton packaging",
      "custom printed cartons",
      "paperboard cartons",
      "retail carton boxes",
      "custom carton packaging",
      "cosmetic folding cartons",
      "food folding cartons",
      "printed product boxes",
    ],
    ["Cosmetics", "Pharma", "Food", "Retail", "Electronics"]
  ),

  makeProduct(
    "mailer-boxes",
    "Mailer Boxes",
    "Corrugated Packaging",
    "Branded mailer boxes for ecommerce and delivery",
    "Custom mailer boxes are perfect for ecommerce, subscription boxes, shipping and product delivery. They provide protection, easy opening, brand visibility and a premium unboxing experience for online stores, apparel brands, subscription businesses and product-based companies.",
    [
      "custom mailer boxes",
      "ecommerce packaging",
      "subscription boxes",
      "shipping boxes",
      "corrugated mailer boxes",
      "branded mailer boxes",
      "printed mailer boxes",
      "custom ecommerce boxes",
      "subscription mailer boxes",
      "corrugated shipping mailers",
      "unboxing packaging",
      "branded shipping boxes",
    ],
    ["E-commerce", "Subscription Brands", "Retail", "Apparel"]
  ),

  makeProduct(
    "butter-paper",
    "Butter Paper",
    "Food Wrapping",
    "Custom printed butter paper for food brands",
    "Custom butter paper is used for burgers, sandwiches, bakery items, snacks and food wrapping. It helps food brands improve presentation, cleanliness and brand visibility with printed food wrapping paper for restaurants, cafes, bakeries, burger brands and takeaway businesses.",
    [
      "custom butter paper",
      "printed butter paper",
      "burger wrapping paper",
      "deli paper",
      "food wrapping paper",
      "custom food paper",
      "branded butter paper",
      "printed food paper",
      "sandwich wrapping paper",
      "bakery wrapping paper",
      "restaurant wrapping paper",
      "greaseproof paper",
    ],
    ["Restaurants", "Bakeries", "Burger Brands", "Cafes", "Food Trucks"]
  ),

  makeProduct(
    "food-packaging",
    "Food Packaging",
    "Food Packaging",
    "Food-safe custom packaging for restaurants and bakeries",
    "Custom food packaging includes bakery boxes, burger boxes, pizza boxes, snack boxes, food wraps, paper bags and food-safe packaging solutions for restaurants, cafes, bakeries, takeaway shops and food brands that need practical branded packaging.",
    [
      "custom food packaging",
      "bakery boxes",
      "burger boxes",
      "restaurant packaging",
      "food boxes",
      "food-safe packaging",
      "takeaway packaging",
      "printed food boxes",
      "custom bakery packaging",
      "food delivery packaging",
      "snack packaging",
      "branded food packaging",
    ],
    ["Restaurants", "Bakeries", "Cafes", "Pizza Brands", "Frozen Food"]
  ),

  makeProduct(
    "paper-bags",
    "Paper Bags",
    "Retail Packaging",
    "Custom printed paper bags for retail brands",
    "Custom paper bags are used for retail stores, fashion brands, events, gifts and premium shopping experiences. They can be printed with custom artwork, brand colors, logo placement and handle options for a professional retail, boutique or luxury brand look.",
    [
      "custom paper bags",
      "printed paper bags",
      "retail paper bags",
      "shopping bags",
      "branded paper bags",
      "kraft paper bags",
      "custom shopping bags",
      "paper bags with logo",
      "luxury paper bags",
      "boutique paper bags",
      "takeaway paper bags",
      "retail carry bags",
    ],
    ["Retail", "Fashion", "Events", "Gifts", "Luxury Brands"]
  ),
  makeProduct(
    "labels-stickers",
    "Labels & Stickers",
    "Branding",
    "Custom labels and stickers for product and packaging branding",
    "Custom labels and stickers help brands improve product presentation, packaging identity and promotional impact for jars, bottles, boxes, bags, mailers and retail packaging. They can be produced in different shapes, sizes, materials and finishes for product labels, packaging labels and branded stickers.",
    [
      "custom labels",
      "custom stickers",
      "printed stickers",
      "product labels",
      "branded stickers",
      "packaging labels",
      "custom product labels",
      "printed labels",
      "logo stickers",
      "sticker labels",
    ],
    ["Cosmetics", "Food", "Retail", "Beverages", "E-commerce"]
  ),

  makeProduct(
    "luxury-packaging",
    "Luxury Packaging",
    "Luxury Packaging",
    "Luxury packaging with foiling, embossing and premium finishes",
    "Luxury packaging is designed for premium brands that want strong shelf impact, beautiful unboxing and high-value presentation. It can include rigid boxes, magnetic boxes, drawer boxes, textured paper, foil stamping, embossing, debossing, spot UV and soft-touch finishes for perfumes, jewelry, cosmetics, gifts and premium retail products.",
    [
      "luxury packaging",
      "premium packaging",
      "custom luxury boxes",
      "foil packaging",
      "high end packaging",
      "luxury printed boxes",
      "premium product packaging",
      "luxury brand packaging",
      "foil stamped boxes",
      "soft touch packaging",
    ],
    ["Perfume", "Jewelry", "Cosmetics", "Gifts", "Premium Retail"]
  ),
    makeProduct(
    "cosmetic-boxes",
    "Cosmetic Boxes",
    "Cosmetic Packaging",
    "Custom cosmetic boxes for beauty, skincare and makeup brands",
    "Custom cosmetic boxes help beauty brands present skincare, makeup, creams, serums, haircare and cosmetic products with premium printing, professional structure and attractive finishing options. Printy Packaging supports cosmetic packaging with custom size, paperboard, rigid style, inserts, foil stamping, spot UV and soft-touch finish guidance.",
    [
      "custom cosmetic boxes",
      "makeup boxes",
      "skincare packaging",
      "beauty product packaging",
      "cosmetic packaging boxes",
      "printed cosmetic boxes",
      "custom makeup boxes",
      "skincare boxes",
      "beauty packaging boxes",
      "cosmetic product packaging",
    ],
    ["Cosmetics", "Skincare", "Beauty", "Retail", "E-commerce"]
  ),

  makeProduct(
    "perfume-boxes",
    "Perfume Boxes",
    "Luxury Packaging",
    "Luxury perfume boxes for fragrance and premium retail brands",
    "Custom perfume boxes are designed for fragrance brands that need luxury presentation, strong structure and premium finishing. Perfume packaging can include rigid boxes, folding cartons, inserts, textured paper, foil stamping, embossing, debossing, spot UV and soft-touch lamination for a premium shelf and gift experience.",
    [
      "custom perfume boxes",
      "fragrance packaging",
      "luxury perfume boxes",
      "perfume packaging",
      "perfume gift boxes",
      "printed perfume boxes",
      "luxury perfume packaging",
      "fragrance boxes",
      "perfume rigid boxes",
      "premium perfume packaging",
    ],
    ["Perfume", "Fragrance", "Luxury Retail", "Gifts", "Cosmetics"]
  ),

  makeProduct(
    "candle-boxes",
    "Candle Boxes",
    "Retail Packaging",
    "Custom candle boxes for premium candle and gift brands",
    "Custom candle boxes protect candles and improve presentation for luxury, handmade, scented and retail candle brands. They can be made with custom size, paperboard, rigid structure, inserts, window options, premium printing and finishing for gift packaging and retail shelf display.",
    [
      "custom candle boxes",
      "candle packaging",
      "luxury candle boxes",
      "printed candle boxes",
      "candle gift boxes",
      "retail candle packaging",
      "scented candle boxes",
      "premium candle packaging",
      "custom candle packaging",
      "luxury candle packaging",
    ],
    ["Candles", "Gifts", "Retail", "Home Decor", "Luxury Brands"]
  ),

  makeProduct(
    "soap-boxes",
    "Soap Boxes",
    "Retail Packaging",
    "Custom soap boxes for handmade, organic and beauty brands",
    "Custom soap boxes are ideal for handmade soap, organic soap, skincare products and beauty product packaging. They can be printed with product details, ingredients, logo, kraft style, window cutouts or premium finishes to support retail display and brand presentation.",
    [
      "custom soap boxes",
      "soap packaging",
      "printed soap boxes",
      "kraft soap boxes",
      "organic soap packaging",
      "handmade soap boxes",
      "soap packaging boxes",
      "custom skincare boxes",
      "natural soap boxes",
      "retail soap packaging",
    ],
    ["Soap", "Beauty", "Skincare", "Retail", "Organic Brands"]
  ),

  makeProduct(
    "jewelry-boxes",
    "Jewelry Boxes",
    "Luxury Packaging",
    "Luxury jewelry boxes for premium presentation and gifting",
    "Custom jewelry boxes are used for rings, necklaces, bracelets, watches and premium gift packaging. They can include rigid structure, drawer style, magnetic closure, custom inserts, velvet feel, textured wrap, foil stamping and luxury finishing for elegant product presentation.",
    [
      "custom jewelry boxes",
      "luxury jewelry packaging",
      "ring boxes",
      "gift jewelry boxes",
      "watch packaging",
      "jewelry gift packaging",
      "luxury jewelry boxes",
      "custom ring boxes",
      "bracelet boxes",
      "premium jewelry packaging",
    ],
    ["Jewelry", "Luxury Retail", "Gifts", "Fashion", "Premium Brands"]
  ),

    makeProduct(
    "bakery-boxes",
    "Bakery Boxes",
    "Food Packaging",
    "Food-grade custom boxes for cakes, pastries and desserts",
    "Custom bakery boxes provide secure and attractive packaging for cakes, cupcakes, pastries, cookies, donuts and desserts. Choose food-grade board, custom sizes, window options, branded logo printing and practical finishing to create professional takeaway and retail packaging for bakeries, cafes, cake shops and dessert brands.",
    [
      "custom bakery boxes",
      "printed bakery boxes",
      "bakery packaging boxes",
      "cake boxes",
      "cake boxes with window",
      "cupcake boxes",
      "pastry boxes",
      "cookie boxes",
      "donut boxes",
      "food grade bakery boxes",
      "bakery boxes with logo",
      "wholesale bakery boxes",
      "takeaway dessert boxes",
      "custom bakery packaging",
    ],
    ["Bakeries", "Cake Shops", "Cafes", "Dessert Brands", "Food Delivery"]
  ),

  makeProduct(
    "burger-boxes",
    "Burger Boxes",
    "Food Packaging",
    "Food-grade branded burger boxes for takeaway and delivery",
    "Custom burger boxes help restaurants, fast-food brands, cafes and food trucks serve burgers in secure food-grade packaging. Choose kraft or white board, custom sizes, logo printing and grease-resistant finish guidance for professional dine-in, takeaway and food delivery presentation.",
    [
      "custom burger boxes",
      "printed burger boxes",
      "burger packaging boxes",
      "burger takeaway boxes",
      "burger boxes with logo",
      "food grade burger boxes",
      "kraft burger boxes",
      "cardboard burger boxes",
      "restaurant burger packaging",
      "fast food packaging boxes",
      "takeaway food boxes",
      "custom fast food packaging",
      "wholesale burger boxes",
      "clamshell burger boxes",
    ],
    [
      "Restaurants",
      "Burger Brands",
      "Fast Food",
      "Food Trucks",
      "Cafes",
      "Food Delivery",
    ]
  ),

  makeProduct(
    "pizza-boxes",
    "Pizza Boxes",
    "Food Packaging",
    "Custom printed pizza boxes for secure delivery and takeaway",
    "Custom pizza boxes are designed for safe takeaway, stacking and food delivery in sizes suited to your menu. Choose corrugated or kraft board, food-safe printing, branded artwork and practical finishing for pizzerias, restaurants, cloud kitchens and food delivery brands.",
    [
      "custom pizza boxes",
      "printed pizza boxes",
      "pizza boxes with logo",
      "branded pizza boxes",
      "corrugated pizza boxes",
      "kraft pizza boxes",
      "food grade pizza boxes",
      "takeaway pizza boxes",
      "pizza delivery boxes",
      "custom size pizza boxes",
      "wholesale pizza boxes",
      "restaurant pizza packaging",
      "personal pizza boxes",
      "large pizza boxes",
    ],
    [
      "Pizza Brands",
      "Pizzerias",
      "Restaurants",
      "Cloud Kitchens",
      "Takeaway",
      "Food Delivery",
    ]
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
    "Custom pharmaceutical boxes for medicine and healthcare products",
    "Custom pharmaceutical boxes are designed for medicine, healthcare products, supplements, medical devices and wellness packaging with clear printing, reliable structure and professional product information layout. Printy Packaging supports pharma packaging with custom size, paperboard, folding cartons, labeling space, barcode area and clean retail presentation.",
    [
      "pharmaceutical boxes",
      "medicine packaging",
      "healthcare packaging",
      "custom pharma boxes",
      "supplement packaging",
      "medical packaging boxes",
      "custom pharmaceutical boxes",
      "medicine boxes",
      "pharma carton boxes",
      "healthcare product packaging",
    ],
    ["Pharma", "Healthcare", "Supplements", "Medical", "Wellness"]
  ),

  makeProduct(
    "apparel-boxes",
    "Apparel Boxes",
    "Fashion Packaging",
    "Custom apparel boxes for clothing, fashion and ecommerce brands",
    "Custom apparel boxes are used for clothing, fashion accessories, shirts, scarves, shoes, premium retail delivery and ecommerce packaging. They help fashion brands improve product presentation, shipping protection and unboxing experience with custom mailer boxes, rigid apparel boxes, printed clothing boxes and branded garment packaging.",
    [
      "apparel boxes",
      "clothing packaging",
      "fashion packaging",
      "custom clothing boxes",
      "garment packaging",
      "fashion mailer boxes",
      "custom apparel boxes",
      "printed apparel boxes",
      "clothing boxes",
      "ecommerce apparel packaging",
    ],
    ["Fashion", "Apparel", "Retail", "E-commerce", "Clothing Brands"]
  ),

  makeProduct(
    "hang-tags",
    "Hang Tags",
    "Branding",
    "Custom hang tags for apparel, fashion and retail products",
    "Custom hang tags improve brand presentation for apparel, fashion accessories, handmade products, retail packaging and premium product branding. They can include brand story, price, product details, barcode, care instructions, logo, custom shape and premium finishing for a professional retail look.",
    [
      "custom hang tags",
      "printed hang tags",
      "apparel tags",
      "retail tags",
      "clothing hang tags",
      "brand hang tags",
      "custom clothing tags",
      "product hang tags",
      "fashion tags",
      "premium hang tags",
    ],
    ["Fashion", "Apparel", "Retail", "Handmade Brands", "Product Branding"]
  ),
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}


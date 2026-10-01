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
    tagline: "Branded packaging for restaurants, bakeries and cafes",
    description:
      "Food packaging includes butter paper, bakery boxes, burger boxes, pizza boxes, food boxes and wrapping solutions for restaurants, cafes, bakeries, food trucks and takeaway brands. Printy Packaging helps food businesses plan branded food packaging with practical material and printing guidance.",
    keywords: buildCategoryKeywords("Food Packaging", [
      "food packaging",
      "custom food boxes",
      "butter paper",
      "bakery boxes",
      "burger boxes",
      "pizza boxes",
      "restaurant packaging",
      "takeaway packaging",
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
      "Branded food packaging and wrapping options",
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
          "The best material depends on food type, grease resistance, temperature, serving style and delivery method. Paper, kraft, SBS, greaseproof paper and coated paper may be used.",
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

  {
    slug: "apparel-packaging",
    name: "Apparel Packaging",
    tagline: "Packaging for clothing, shoes and fashion accessories",
    description:
      "Apparel packaging for clothing brands, boutiques and online fashion stores: branded mailer boxes for shipping, rigid gift boxes for premium pieces, printed hang tags, tissue-friendly inserts and shopping bags that match. We size every box to the folded garment so it arrives flat, not crushed.",
    keywords: buildCategoryKeywords("Apparel Packaging", [
      "apparel packaging",
      "clothing boxes",
      "custom apparel boxes",
      "fashion packaging",
      "t shirt packaging",
      "clothing mailer boxes",
    ]),
    productSlugs: ["apparel-boxes", "mailer-boxes", "hang-tags", "paper-bags", "labels-stickers", "thank-you-cards"],
    benefits: [
      "Boxes sized to folded garments so clothes arrive neat",
      "Matching hang tags, stickers and bags for one brand look",
      "Mailer boxes strong enough to ship without an outer carton",
      "Kraft and recycled board options for eco-minded shoppers",
      "Low minimums for small fashion labels and drops",
    ],
    faqs: [
      {
        question: "Which box is best for shipping clothes?",
        answer: "A corrugated mailer box in E-flute is the most popular choice. It protects folded clothing, looks good when opened, and does not need an extra shipping carton for most couriers.",
      },
      {
        question: "Can you print inside apparel boxes?",
        answer: "Yes. Inside printing is a favourite for fashion brands, for example a pattern, a thank-you line or your social handle revealed when the lid opens.",
      },
      {
        question: "Do you make hang tags to match the boxes?",
        answer: "Yes. We print hang tags, stickers and paper bags from the same artwork and colour settings so your whole range matches.",
      },
    ],
  },

  {
    slug: "bakery-packaging",
    name: "Bakery Packaging",
    tagline: "Boxes for cakes, cupcakes, cookies and pastries",
    description:
      "Bakery packaging in SBS or kraft board: cake boxes with windows, cupcake boxes with inserts that stop sliding, cookie boxes, pastry boxes and greaseproof butter paper. Printed with your bakery logo so every order carries your name out of the shop.",
    keywords: buildCategoryKeywords("Bakery Packaging", [
      "bakery packaging",
      "bakery boxes",
      "cake boxes",
      "cupcake boxes",
      "cookie boxes",
      "pastry boxes",
    ]),
    productSlugs: ["bakery-boxes", "cake-boxes", "cupcake-boxes", "cookie-boxes", "window-boxes", "butter-paper"],
    benefits: [
      "Greaseproof liners for buttery and oily bakes",
      "Windows so customers can see the bake before opening",
      "Inserts that hold cupcakes and macarons in place",
      "Grease-resistant options for buttery pastries",
      "Flat-packed boxes that save space in small kitchens",
    ],
    faqs: [
      {
        question: "Can bakery boxes touch food directly?",
        answer: "Our boxes are not certified for direct food contact, so use a greaseproof or butter paper liner between the food and the box. For oily items such as croissants, a greaseproof liner also keeps the box clean.",
      },
      {
        question: "Can cupcake boxes have inserts?",
        answer: "Yes. We make inserts for 1, 2, 4, 6, 12 or 24 cupcakes, cut to your cupcake size so they do not slide or touch.",
      },
      {
        question: "What is the minimum order for bakery boxes?",
        answer: "Most bakery boxes start from 100 pieces, so a small bakery can order branded boxes without storing thousands.",
      },
    ],
  },

  {
    slug: "confectionery-packaging",
    name: "Confectionery Packaging",
    tagline: "Chocolate, sweets and candy boxes that feel like a gift",
    description:
      "Confectionery packaging for chocolate makers, sweet shops and candy brands: drawer boxes for truffles, window boxes for mixed sweets, pillow boxes for favours and rigid gift boxes for festive collections. Inserts keep each piece separate and fresh-looking.",
    keywords: buildCategoryKeywords("Confectionery Packaging", [
      "confectionery packaging",
      "chocolate boxes",
      "candy boxes",
      "sweet boxes",
      "truffle boxes",
      "chocolate packaging",
    ]),
    productSlugs: ["drawer-boxes", "gift-boxes", "window-boxes", "pillow-boxes", "sleeve-boxes", "labels-stickers"],
    benefits: [
      "Cavity inserts that keep chocolates from touching",
      "Gift-ready rigid and drawer boxes for festive seasons",
      "Foil and embossing for a premium sweet-shop look",
      "Window boxes that show colourful sweets",
      "Glassine or butter paper liners between sweets and the box",
    ],
    faqs: [
      {
        question: "Can you make inserts for chocolates?",
        answer: "Yes. We make card inserts sized to your truffles or bars, for 4, 9, 12, 16 or 24 pieces and more.",
      },
      {
        question: "Which box is best for Eid, Christmas or Valentine's collections?",
        answer: "Rigid drawer boxes and two-piece gift boxes with foil are the most popular for seasonal collections. Sleeves let you change the design each season on the same base box.",
      },
      {
        question: "Can sweets touch the box directly?",
        answer: "Our boxes are not certified for direct food contact, so use a greaseproof or butter paper liner between the food and the box. Many chocolate brands use glassine cups or a butter paper layer.",
      },
    ],
  },

  {
    slug: "candle-packaging",
    name: "Candle Packaging",
    tagline: "Boxes for jar candles, pillar candles and home fragrance",
    description:
      "Candle packaging for jar candles, pillar candles, wax melts and reed diffusers. We add inserts that hold the glass steady in transit, and finishes such as foil and soft-touch lamination that suit a calm, premium home fragrance brand.",
    keywords: buildCategoryKeywords("Candle Packaging", [
      "candle packaging",
      "candle boxes",
      "jar candle boxes",
      "luxury candle boxes",
      "candle gift boxes",
    ]),
    productSlugs: ["candle-boxes", "rigid-boxes", "two-piece-rigid-boxes", "tuck-end-boxes", "labels-stickers", "hang-tags"],
    benefits: [
      "Inserts that stop glass jars from moving and cracking",
      "Rigid gift boxes for premium and seasonal candles",
      "Matching labels for jars and lids",
      "Kraft and minimalist designs for natural brands",
      "Space for scent notes, burn time and safety text",
    ],
    faqs: [
      {
        question: "How do you protect glass candles in shipping?",
        answer: "We use a snug card or corrugated insert and a strong outer box. For courier orders we recommend a mailer box around the retail box.",
      },
      {
        question: "Can you print candle warning labels?",
        answer: "Yes. We print safety and burn instructions on the box or on labels for the jar base.",
      },
      {
        question: "Do you make boxes for reed diffusers too?",
        answer: "Yes. Tall tuck end or rigid boxes with an insert for the bottle and reeds are common for diffusers.",
      },
    ],
  },

  {
    slug: "gift-packaging",
    name: "Gift Packaging",
    tagline: "Gift boxes, hampers and corporate gift packaging",
    description:
      "Gift packaging for retailers, hamper makers and corporate gifting: magnetic closure boxes, drawer boxes, two-piece rigid boxes, printed gift bags and cards to go inside. We help you pick a box that feels special without over-spending on every piece.",
    keywords: buildCategoryKeywords("Gift Packaging", [
      "gift packaging",
      "custom gift boxes",
      "corporate gift boxes",
      "hamper boxes",
      "magnetic gift boxes",
    ]),
    productSlugs: ["gift-boxes", "magnetic-boxes", "rigid-boxes", "drawer-boxes", "paper-bags", "greeting-cards"],
    benefits: [
      "Magnetic and ribbon closures for a memorable unboxing",
      "Inserts for hampers with several items",
      "Printed bags and greeting cards to complete the gift",
      "Foil logos for corporate and client gifts",
      "Reusable boxes that customers keep",
    ],
    faqs: [
      {
        question: "What is the most premium gift box?",
        answer: "A rigid magnetic closure box wrapped in textured paper with a foil logo is the most premium option most brands choose.",
      },
      {
        question: "Can you make corporate gift boxes with our logo only?",
        answer: "Yes. Many corporate gift boxes are plain colour with a single foil or embossed logo, which looks elegant and keeps the cost down.",
      },
      {
        question: "Can gift boxes hold several products?",
        answer: "Yes. We design inserts with a cavity for each item, for example a mug, candle and card in one hamper box.",
      },
    ],
  },

  {
    slug: "jewelry-packaging",
    name: "Jewelry Packaging",
    tagline: "Boxes for rings, necklaces, earrings and watches",
    description:
      "Jewelry packaging for fine and fashion jewelry brands: small rigid boxes with velvet or foam inserts, drawer boxes for necklaces, pillow boxes for gifts and branded cards that hold earrings. Small in size, big on detail, with foil and embossing that match the piece inside.",
    keywords: buildCategoryKeywords("Jewelry Packaging", [
      "jewelry packaging",
      "jewelry boxes",
      "ring boxes",
      "necklace boxes",
      "earring cards",
    ]),
    productSlugs: ["jewelry-boxes", "drawer-boxes", "magnetic-boxes", "two-piece-rigid-boxes", "pillow-boxes", "hang-tags"],
    benefits: [
      "Foam and velvet-feel inserts cut for rings, chains and earrings",
      "Small rigid boxes that feel heavy and valuable",
      "Foil and embossed logos for a luxury finish",
      "Earring and necklace display cards",
      "Matching bags and pouches for the full set",
    ],
    faqs: [
      {
        question: "Which insert is best for rings?",
        answer: "A slotted foam insert holds rings upright and secure. For necklaces we use a pad with a hook or slits.",
      },
      {
        question: "Can jewelry boxes be very small?",
        answer: "Yes. We regularly make boxes from about 5 cm square, sized to your pieces.",
      },
      {
        question: "Do you print earring cards?",
        answer: "Yes. We print earring and necklace cards on thick card with punched holes and your logo, and they can be packed inside the boxes.",
      },
    ],
  },

  {
    slug: "household-packaging",
    name: "Household Packaging",
    tagline: "Boxes for home goods, cleaning and kitchen products",
    description:
      "Household packaging for kitchenware, cleaning products, home decor and small appliances. Retail cartons carry barcodes and usage instructions, hang tab boxes sell on pegs, and corrugated boxes protect heavier items on the way to the shop or the customer.",
    keywords: buildCategoryKeywords("Household Packaging", [
      "household packaging",
      "home goods packaging",
      "kitchenware boxes",
      "cleaning product packaging",
      "home decor boxes",
    ]),
    productSlugs: ["tuck-end-boxes", "folding-cartons", "hang-tab-boxes", "window-boxes", "shipping-boxes", "display-boxes"],
    benefits: [
      "Room for barcodes, instructions and warnings",
      "Hang tab boxes for peg displays in stores",
      "Corrugated boxes for heavy or fragile home goods",
      "Window cut-outs to show the product",
      "Counter displays for small household items",
    ],
    faqs: [
      {
        question: "Which box is best for kitchen utensils?",
        answer: "A tuck end carton with a window or a hang tab box works well for utensils sold in stores. Heavier sets need a corrugated box.",
      },
      {
        question: "Can you print barcodes and instructions?",
        answer: "Yes. We print barcodes, usage steps, warnings and multilingual text, and check barcode size and contrast so it scans.",
      },
      {
        question: "Do you make packaging for small appliances?",
        answer: "Yes. We make corrugated boxes with printed branding and inserts for small appliances and electronics.",
      },
    ],
  },

  {
    slug: "sports-packaging",
    name: "Sports Packaging",
    tagline: "Boxes for sports gear, supplements and fitness products",
    description:
      "Sports packaging for fitness equipment, sportswear, balls, accessories and supplements. Strong corrugated shipping boxes carry heavier gear, hang tab boxes sell small accessories on retail pegs, and bold printing makes the brand stand out on a busy shelf.",
    keywords: buildCategoryKeywords("Sports Packaging", [
      "sports packaging",
      "sports boxes",
      "fitness product packaging",
      "sports equipment boxes",
      "supplement boxes",
    ]),
    productSlugs: ["shipping-boxes", "mailer-boxes", "hang-tab-boxes", "display-boxes", "tuck-end-boxes", "hang-tags"],
    benefits: [
      "Corrugated board that handles heavier equipment",
      "Hang tab boxes for gloves, straps and small accessories",
      "Bright, bold printing for crowded sports shelves",
      "Display boxes for counters and gyms",
      "Hang tags for sportswear and shoes",
    ],
    faqs: [
      {
        question: "Can boxes hold heavy sports equipment?",
        answer: "Yes. We use B-flute or double-wall corrugated board for heavier items such as weights and equipment sets.",
      },
      {
        question: "Do you make supplement boxes?",
        answer: "Yes. We print cartons and labels for supplement tubs and sachets, with space for nutrition facts and barcodes.",
      },
      {
        question: "Can you print bright neon colours?",
        answer: "We can get close to neon shades with Pantone inks. Tell us your colours and we will advise on the best match.",
      },
    ],
  },

  {
    slug: "toys-games-packaging",
    name: "Toys & Games Packaging",
    tagline: "Boxes for toys, puzzles, board games and kids' products",
    description:
      "Toys and games packaging for toy makers, puzzle brands and board game designers: window boxes that show the toy, two-piece game boxes with strong lids, printed instruction booklets and display boxes for shops. Bright colours, rounded safety text and sturdy board built for small hands.",
    keywords: buildCategoryKeywords("Toys & Games Packaging", [
      "toy packaging",
      "toy boxes",
      "board game boxes",
      "puzzle boxes",
      "game packaging",
    ]),
    productSlugs: ["window-boxes", "two-piece-rigid-boxes", "folding-cartons", "display-boxes", "shipping-boxes", "booklets"],
    benefits: [
      "Window boxes that let kids see the toy",
      "Strong two-piece lids for board games and puzzles",
      "Printed rule books and instruction booklets",
      "Space for age warnings and safety marks",
      "Shelf-ready display boxes for toy stores",
    ],
    faqs: [
      {
        question: "Do you make board game boxes?",
        answer: "Yes. We make two-piece rigid game boxes with printed wraps, inserts for pieces and matching rule booklets.",
      },
      {
        question: "Can you print safety warnings?",
        answer: "Yes. We print age warnings, choking hazard text and safety marks. Please supply the exact marks required for your market.",
      },
      {
        question: "Can toy boxes have windows?",
        answer: "Yes. We add clear PET windows in any shape, often matched to the outline of the toy.",
      },
    ],
  },

  {
    slug: "events-packaging",
    name: "Events & Wedding Packaging",
    tagline: "Favour boxes, invitations and event printing",
    description:
      "Event and wedding packaging for planners, venues and couples: favour boxes, printed invitations, gift bags, table tents, tickets and banners, all designed as one matching set. We keep colours and fonts consistent across every piece so the event looks planned down to the last detail.",
    keywords: buildCategoryKeywords("Events & Wedding Packaging", [
      "wedding favour boxes",
      "event packaging",
      "party favour boxes",
      "wedding invitations",
      "event printing",
    ]),
    productSlugs: ["pillow-boxes", "gift-boxes", "invitation-cards", "paper-bags", "table-tents", "tickets"],
    benefits: [
      "Favour boxes for sweets, gifts and keepsakes",
      "Invitations, table cards and tickets in one matching design",
      "Foil and embossing for weddings and galas",
      "Printed gift bags for guests and delegates",
      "Banners and signs for venues",
    ],
    faqs: [
      {
        question: "Can you make a full wedding stationery set?",
        answer: "Yes. We print invitations, envelopes, favour boxes, table tents and thank-you cards from one design so they match.",
      },
      {
        question: "How early should we order for an event?",
        answer: "Allow about 3 to 4 weeks for proofs, production and shipping. Rush options are available for some items.",
      },
      {
        question: "Can each favour box have a guest's name?",
        answer: "Yes, with a printed or handwritten-style name sticker or tag for each guest.",
      },
    ],
  },

  {
    slug: "health-pharma-packaging",
    name: "Health & Pharma Packaging",
    tagline: "Cartons and labels for medicines, supplements and wellness",
    description:
      "Health and pharmaceutical packaging for medicines, supplements, medical devices and wellness products. Clean cartons with precise text, batch and expiry areas, readable barcodes and folded leaflets, printed with the accuracy regulated products need.",
    keywords: buildCategoryKeywords("Health & Pharma Packaging", [
      "pharmaceutical packaging",
      "medicine boxes",
      "supplement packaging",
      "pharma cartons",
      "healthcare packaging",
    ]),
    productSlugs: ["pharmaceutical-boxes", "tuck-end-boxes", "folding-cartons", "labels-stickers", "booklets", "display-boxes"],
    benefits: [
      "Space for batch number, expiry date and barcodes",
      "Sharp small text for dosage and ingredient lists",
      "Folded leaflets and instruction booklets",
      "Tamper-evident label options",
      "Counter displays for pharmacies",
    ],
    faqs: [
      {
        question: "Can you leave space for batch and expiry printing?",
        answer: "Yes. We leave an unvarnished panel so your batch number and expiry date can be printed or stamped after packing.",
      },
      {
        question: "Do you print patient information leaflets?",
        answer: "Yes. We print folded leaflets and booklets sized to fit inside the carton.",
      },
      {
        question: "Can you add Braille?",
        answer: "Braille embossing is available on many cartons. Share the text and we will confirm what is possible for your box size.",
      },
    ],
  },

  {
    slug: "ecommerce-packaging",
    name: "E-commerce & Subscription Packaging",
    tagline: "Mailer boxes and inserts for online brands",
    description:
      "E-commerce packaging for online stores and subscription boxes: printed mailer boxes that ship without an outer carton, kraft and white mailers, shipping boxes, thank-you cards and stickers. Built to survive couriers and to make the unboxing worth sharing.",
    keywords: buildCategoryKeywords("E-commerce Packaging", [
      "ecommerce packaging",
      "subscription box packaging",
      "custom mailer boxes",
      "shipping boxes with logo",
      "packaging inserts",
    ]),
    productSlugs: ["mailer-boxes", "kraft-mailer-boxes", "subscription-boxes", "shipping-boxes", "thank-you-cards", "labels-stickers"],
    benefits: [
      "Mailer boxes strong enough for courier shipping",
      "Inside printing for a shareable unboxing moment",
      "Thank-you cards and stickers that bring repeat orders",
      "Sizes planned to reduce dimensional shipping costs",
      "Low minimums for new online stores",
    ],
    faqs: [
      {
        question: "Can mailer boxes be shipped without an outer box?",
        answer: "Yes. Our corrugated mailer boxes are made to go through couriers on their own with a shipping label on top.",
      },
      {
        question: "How do I keep shipping costs down?",
        answer: "Choose a box that fits the product closely. We help you size the box to avoid paying for empty space in dimensional weight pricing.",
      },
      {
        question: "Do you print thank-you cards and inserts?",
        answer: "Yes. Printed insert cards with discount codes or care instructions are one of the cheapest ways to win repeat customers.",
      },
    ],
  },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}


export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedAt: string;
  keywords: string[];
  sections: {
    heading: string;
    body: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "custom-packaging-quote-guide",
    title: "How to Request a Custom Packaging Quote",
    excerpt:
      "Learn what details buyers should send before requesting a custom packaging quote, including size, quantity, material, printing and finishing.",
    category: "Quote Guide",
    readTime: "5 min read",
    publishedAt: "2026-07-01",
    keywords: [
      "custom packaging quote",
      "packaging quote guide",
      "custom boxes quote",
      "printed packaging quote",
    ],
    sections: [
      {
        heading: "Start with product size",
        body: "A good packaging quote starts with accurate product size. Buyers should share length, width and height with the correct unit such as inches, millimeters or centimeters.",
      },
      {
        heading: "Share quantity options",
        body: "Quantity affects printing, stock, setup and finishing cost. If you need multiple quantity options such as 500, 1000, 1500 or 2000 pieces, mention them clearly in the quote request.",
      },
      {
        heading: "Choose material and GSM",
        body: "Material selection affects strength, print quality, finishing result and final price. Common options include paperboard, kraft, corrugated board, rigid board and food-safe paper.",
      },
      {
        heading: "Mention printing and finishing",
        body: "Buyers should mention CMYK printing, Pantone colors, inside printing, lamination, foil stamping, embossing, debossing, spot UV or window patching if required.",
      },
    ],
    faqs: [
      {
        question: "What details are needed for a packaging quote?",
        answer:
          "You should send box style, product size, quantity, material preference, GSM, printing colors, finishing options, artwork status and delivery country.",
      },
      {
        question: "Can I request multiple quantity prices?",
        answer:
          "Yes. You can request different quantity options such as 500, 1000, 1500 or 2000 pieces for comparison.",
      },
    ],
  },
  {
    slug: "packaging-materials-guide",
    title: "Packaging Materials Guide for Custom Boxes",
    excerpt:
      "Understand paperboard, kraft, corrugated stock, rigid board and food-safe materials before choosing custom packaging.",
    category: "Materials",
    readTime: "6 min read",
    publishedAt: "2026-07-01",
    keywords: [
      "packaging materials",
      "custom box materials",
      "paperboard packaging",
      "kraft packaging",
      "corrugated packaging",
    ],
    sections: [
      {
        heading: "Paperboard for retail boxes",
        body: "Paperboard is commonly used for folding cartons, cosmetic boxes, retail boxes and lightweight product packaging. It supports clean printing and professional finishing.",
      },
      {
        heading: "Kraft for natural packaging",
        body: "Kraft board gives a natural and eco-friendly look. It is useful for food brands, organic products, handmade items and sustainable packaging styles.",
      },
      {
        heading: "Corrugated board for protection",
        body: "Corrugated stock is used for mailer boxes, shipping boxes and ecommerce packaging where strength and product protection are important.",
      },
      {
        heading: "Rigid board for luxury packaging",
        body: "Rigid board is used for premium boxes, magnetic boxes, drawer boxes, gift boxes and luxury retail packaging where strong structure is required.",
      },
    ],
    faqs: [
      {
        question: "Which material is best for custom boxes?",
        answer:
          "The best material depends on product weight, presentation, shipping method, printing quality and budget.",
      },
      {
        question: "Is kraft material good for food packaging?",
        answer:
          "Kraft can be suitable for many food packaging styles, but the final choice depends on food contact, grease resistance and coating requirements.",
      },
    ],
  },
  {
    slug: "finishing-options-for-custom-boxes",
    title: "Finishing Options for Custom Printed Boxes",
    excerpt:
      "Explore matte lamination, gloss lamination, soft touch, foil stamping, embossing, debossing and spot UV for premium packaging.",
    category: "Finishing",
    readTime: "5 min read",
    publishedAt: "2026-07-01",
    keywords: [
      "packaging finishing",
      "foil stamping",
      "embossing",
      "spot uv",
      "lamination",
    ],
    sections: [
      {
        heading: "Matte and gloss lamination",
        body: "Matte lamination gives a smooth premium look, while gloss lamination creates a shiny and bright surface. Both options can protect the printed surface.",
      },
      {
        heading: "Foil stamping",
        body: "Foil stamping adds metallic detail in gold, silver, copper or custom colors. It is commonly used on logos, patterns and luxury packaging details.",
      },
      {
        heading: "Embossing and debossing",
        body: "Embossing raises the design above the surface, while debossing presses the design into the surface. Both add a premium tactile effect.",
      },
      {
        heading: "Spot UV",
        body: "Spot UV highlights selected areas with a glossy raised effect. It works well on logos, product names and decorative design elements.",
      },
    ],
    faqs: [
      {
        question: "Which finish is best for luxury boxes?",
        answer:
          "Soft touch lamination, foil stamping, embossing, debossing and spot UV are popular for luxury boxes.",
      },
      {
        question: "Can multiple finishes be used together?",
        answer:
          "Yes. Many premium packaging projects combine lamination with foil, embossing or spot UV depending on design and material.",
      },
    ],
  },
  {
    slug: "artwork-dieline-checklist",
    title: "Artwork and Dieline Checklist for Packaging",
    excerpt:
      "Learn how to prepare packaging artwork with dielines, bleed, safe area, CMYK, Pantone colors, barcode and final approval.",
    category: "Artwork",
    readTime: "6 min read",
    publishedAt: "2026-07-01",
    keywords: [
      "packaging artwork",
      "dieline checklist",
      "print ready artwork",
      "packaging design guide",
    ],
    sections: [
      {
        heading: "Use the correct dieline",
        body: "A dieline shows cut lines, crease lines, glue area, bleed and safe area. It must match the approved packaging size and structure.",
      },
      {
        heading: "Keep important text inside safe area",
        body: "Logo, barcode, ingredients, product details and important text should stay inside the safe area to avoid trimming or folding issues.",
      },
      {
        heading: "Prepare CMYK or Pantone colors",
        body: "CMYK is common for full color printing, while Pantone colors may be used for exact brand colors or special spot color printing.",
      },
      {
        heading: "Check barcode and spelling",
        body: "Before final approval, customers should check barcode size, spelling, legal text, product claims, ingredients and all design details.",
      },
    ],
    faqs: [
      {
        question: "Do I need a dieline for custom packaging?",
        answer:
          "Yes. Final production should use an approved dieline that matches box size, structure, bleed and safe area.",
      },
      {
        question: "Which file format is best for packaging artwork?",
        answer:
          "Editable AI, PDF, EPS or high-quality print-ready files are commonly preferred for packaging production.",
      },
    ],
  },
  {
    slug: "mailer-boxes-for-ecommerce-brands",
    title: "Why Mailer Boxes Work for Ecommerce Brands",
    excerpt:
      "Mailer boxes are useful for ecommerce, subscription boxes and branded delivery. Learn why they improve protection and unboxing.",
    category: "Ecommerce",
    readTime: "4 min read",
    publishedAt: "2026-07-01",
    keywords: [
      "mailer boxes",
      "ecommerce packaging",
      "subscription boxes",
      "branded mailer boxes",
    ],
    sections: [
      {
        heading: "Strong delivery protection",
        body: "Mailer boxes are usually made from corrugated board, which helps protect products during delivery and handling.",
      },
      {
        heading: "Better unboxing experience",
        body: "A branded mailer box can improve customer experience by making delivery feel more professional and memorable.",
      },
      {
        heading: "Useful for many product types",
        body: "Mailer boxes are useful for apparel, cosmetics, subscription products, gifts, accessories and ecommerce product kits.",
      },
      {
        heading: "Custom printing and finishing",
        body: "Mailer boxes can include outside printing, inside printing, brand messages, stickers, inserts and premium unboxing details.",
      },
    ],
    faqs: [
      {
        question: "Can mailer boxes be printed inside and outside?",
        answer:
          "Yes. Mailer boxes can be printed outside, inside or both depending on artwork, budget and brand requirement.",
      },
      {
        question: "Which material is used for mailer boxes?",
        answer:
          "Mailer boxes usually use corrugated stock such as E-flute, B-flute, micro flute or kraft corrugated board.",
      },
    ],
  },
  {
    slug: "food-packaging-for-restaurants",
    title: "Food Packaging for Restaurants, Cafes and Bakeries",
    excerpt:
      "Learn about food boxes, butter paper, bakery boxes, burger boxes and pizza boxes for food brands and takeaway businesses.",
    category: "Food Packaging",
    readTime: "5 min read",
    publishedAt: "2026-07-01",
    keywords: [
      "food packaging",
      "restaurant packaging",
      "bakery boxes",
      "burger boxes",
      "butter paper",
    ],
    sections: [
      {
        heading: "Food packaging must be practical",
        body: "Food packaging should support product presentation, cleanliness, takeaway handling and customer experience.",
      },
      {
        heading: "Butter paper for food wrapping",
        body: "Butter paper is used for burgers, sandwiches, snacks, bakery items and food wrapping where clean branded presentation is needed.",
      },
      {
        heading: "Bakery and burger boxes",
        body: "Bakery boxes and burger boxes help food brands present products professionally while supporting takeaway and delivery needs.",
      },
      {
        heading: "Material selection matters",
        body: "Food packaging may need food-grade board, kraft, greaseproof paper, PE coating or other suitable material depending on the product.",
      },
    ],
    faqs: [
      {
        question: "Can food packaging be printed with a logo?",
        answer:
          "Yes. Food packaging can be printed with logo, brand colors and product details depending on material and printing requirements.",
      },
      {
        question: "Which food packaging products are common?",
        answer:
          "Common products include butter paper, bakery boxes, burger boxes, pizza boxes, food boxes and food wrapping paper.",
      },
    ],
  },
];

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
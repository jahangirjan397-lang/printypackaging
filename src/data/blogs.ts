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
    // Separate paragraphs with a blank line ("\n\n")
    body: string;
    table?: {
      caption: string;
      headers: string[];
      rows: string[][];
    };
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
  {
    slug: "butter-paper-vs-wax-paper-vs-greaseproof",
    title: "Butter Paper vs Wax Paper vs Greaseproof: Which Food Wrap Should Your Brand Print On?",
    excerpt:
      "Three papers that look almost the same on a burger counter but behave very differently. Here is how to pick the right one, the GSM to ask for, the sizes that work, and the printing mistakes that waste money.",
    category: "Food Packaging",
    readTime: "8 min read",
    publishedAt: "2026-09-28",
    keywords: [
      "custom butter paper",
      "butter paper vs wax paper",
      "custom wax paper",
      "greaseproof paper printing",
      "custom deli paper",
      "printed burger wrapping paper",
      "butter paper GSM",
      "food wrapping paper sizes",
    ],
    sections: [
      {
        heading: "Why this question comes up so often",
        body: "Almost every restaurant or bakery that asks us for printed wrapping paper uses a different name for it. One owner says butter paper, the next says wax paper, a third calls it deli paper, and a burger chain in the UK will ask for greaseproof.\n\nThey are not always talking about the same thing. And the difference matters more than people expect, because the wrong paper either soaks through with oil in ten minutes or costs you twice as much as it should.\n\nSo before you send artwork anywhere, it is worth spending five minutes on what each paper actually is.",
      },
      {
        heading: "The short answer",
        body: "If you only read one part of this article, read this table. It covers the three papers food brands ask about most.",
        table: {
          caption: "Butter paper, wax paper and greaseproof paper compared",
          headers: ["", "Butter paper", "Wax paper (deli paper)", "Greaseproof paper"],
          rows: [
            ["What it is", "Thin, smooth paper made from tightly refined pulp, no wax coating", "Thin paper coated on one or both sides with food-grade wax", "Dense paper refined or treated to stop oil passing through"],
            ["Holds back grease", "Moderate", "Good on the waxed side", "Best of the three"],
            ["Safe in the oven", "Short, low heat only", "No, the wax melts", "Yes, most grades"],
            ["Feels like", "Soft, slightly see-through", "Slightly slick, a little shiny", "Crisp, a bit stiffer"],
            ["Typical GSM", "30 to 40", "25 to 35", "35 to 50"],
            ["Best for", "Sandwiches, wraps, bakery items, tray liners", "Burgers, deli sandwiches, basket liners", "Fried food, oily pastries, fish and chips"],
            ["Print result", "Clean, good for logos and patterns", "Good, colours look a little softer", "Very clean and sharp"],
          ],
        },
      },
      {
        heading: "Butter paper: the everyday choice",
        body: "Butter paper is what most cafes and sandwich shops in South Asia and the Middle East mean when they say food paper. It is light, it folds easily, and it prints well, which is why it is often the cheapest way to get your logo into a customer's hand.\n\nThe catch is grease. A dry sandwich or a croissant is fine. A double smash burger with sauce is not, and you will see oil marks through the paper before the customer reaches their table. If your menu is mostly dry or lightly oily food, butter paper is the sensible pick.",
      },
      {
        heading: "Wax paper: the burger and deli favourite",
        body: "Wax paper, which the US market usually calls deli paper, has a thin food-grade wax layer. That layer is what stops sauce and moisture coming through, and it is why nearly every burger place in the States wraps with it.\n\nTwo things to know. First, wax paper must never go in an oven or a hot press, because the wax melts onto the food. Second, printing sits on top of a slightly slick surface, so very fine text and thin lines can soften. Keep your logo bold and your small print to a minimum.",
      },
      {
        heading: "Greaseproof paper: when food is really oily",
        body: "Greaseproof paper is made dense enough that oil struggles to pass through it, without needing a wax coating. It is the paper behind fish and chips wraps, fried chicken liners and pastry bags in the UK and Europe.\n\nIt costs more per sheet than butter paper. For fried food though, it is usually cheaper in the long run, because customers stop getting oily hands and you stop double-wrapping. If you ask a supplier about grease resistance, the term to use is KIT rating. A higher KIT number means stronger resistance to oil.",
      },
      {
        heading: "What GSM should you ask for?",
        body: "GSM is simply the weight of the paper, grams per square metre. A higher number means a thicker sheet, and a thicker sheet costs more.\n\nFor most wraps, 30 to 35 GSM is plenty. It folds neatly around a burger without cracking at the corners. Go up to 40 to 45 GSM if the paper doubles as a tray or basket liner, where it needs to sit flat and not tear when someone picks up their food. Only go heavier than that for oily fried food or if the sheet has to hold its shape in a bag.\n\nA mistake we see a lot is brands choosing the thickest paper to feel premium. On a wrap, thick paper fights you when you fold it and makes the parcel look bulky. Thinner and well printed usually looks better.",
      },
      {
        heading: "Sizes that actually work",
        body: "There is no single standard, but these sizes cover most orders. If you are not sure, wrap your biggest menu item in a sheet of plain paper and measure what you used, then add an inch.",
        table: {
          caption: "Common custom food paper sheet sizes",
          headers: ["Size (inches)", "Size (cm)", "Good for"],
          rows: [
            ["10 x 10", "25 x 25", "Small burgers, sliders, cookies, pastry wraps"],
            ["12 x 12", "30 x 30", "Standard burgers, basket liners, most sandwiches"],
            ["14 x 14", "35 x 35", "Large burgers, loaded wraps, double patties"],
            ["12 x 16", "30 x 40", "Long subs, hot dogs, deli sandwiches"],
            ["15 x 20", "38 x 50", "Tray liners, sharing platters"],
          ],
        },
      },
      {
        heading: "Printing tips that save money",
        body: "One or two colours is often all you need. A repeating logo pattern in your brand colour looks deliberate and is cheaper than full-colour artwork. Food paper is also thin, so heavy ink coverage can make the sheet feel stiff.\n\nLeave the centre lighter. The middle of the sheet is where the food sits and where grease shows first. A pattern that is denser at the edges and lighter in the middle hides marks better.\n\nAsk for food-safe inks, and ask the supplier to confirm it in writing. In the US, paper that touches food falls under FDA food contact rules. In the UK and EU the reference is regulation EC 1935/2004. A good supplier will not be bothered by the question.\n\nFinally, send your artwork as vector files (AI, PDF or SVG) so the logo repeats cleanly across the sheet.",
      },
      {
        heading: "So which one should you choose?",
        body: "If you sell sandwiches, wraps, baked goods or anything that is not dripping with sauce, start with butter paper. It is the cheapest way to put your brand on every order.\n\nIf you sell burgers, deli sandwiches or anything saucy, go with wax paper and keep your artwork bold.\n\nIf your food is fried or properly oily, pay the bit extra for greaseproof. Your customers' hands and your reviews will thank you.\n\nStill not sure? Send us a photo of the food you want to wrap and roughly how many you sell in a month. We will suggest the paper, the size and a sensible first order quantity, with a free mockup of your logo on the sheet.",
      },
    ],
    faqs: [
      {
        question: "Is butter paper the same as wax paper?",
        answer:
          "No. Butter paper has no wax coating and relies on tightly refined pulp. Wax paper has a thin food-grade wax layer, which makes it better against sauce and moisture but not safe for the oven.",
      },
      {
        question: "Can printed butter paper touch food directly?",
        answer:
          "Yes, as long as it is printed with food-safe inks. Ask your supplier to confirm that the paper and inks meet FDA food contact rules in the US or EC 1935/2004 in the UK and EU.",
      },
      {
        question: "What is the best GSM for burger wrapping paper?",
        answer:
          "30 to 35 GSM wax or greaseproof paper works for most burgers. Use 40 to 45 GSM if the same sheet is also used as a basket or tray liner.",
      },
      {
        question: "Which paper is best for fried chicken or fish and chips?",
        answer:
          "Greaseproof paper. It resists oil far better than butter paper and, unlike wax paper, it will not melt if the food is very hot.",
      },
    ],
  },
];

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}


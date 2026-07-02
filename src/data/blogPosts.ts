export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  keywords: string[];
  relatedProductSlug: string;
  relatedProductName: string;
  sections: {
    heading: string;
    text: string;
  }[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "rigid-boxes-guide",
    title: "Rigid Boxes Guide for Luxury Packaging",
    excerpt:
      "Learn when to use rigid boxes, which materials work best, and which finishes create premium presentation.",
    category: "Luxury Packaging",
    keywords: [
      "rigid boxes guide",
      "luxury rigid boxes",
      "premium packaging guide",
      "custom rigid boxes",
    ],
    relatedProductSlug: "rigid-boxes",
    relatedProductName: "Rigid Boxes",
    sections: [
      {
        heading: "What are rigid boxes?",
        text: "Rigid boxes are premium packaging boxes made with thick board and wrapped with printed or specialty paper. They are commonly used for perfumes, jewelry, cosmetics, candles, gifts and luxury retail products.",
      },
      {
        heading: "Why brands use rigid boxes",
        text: "Rigid boxes improve product presentation, protect high-value items and create a strong unboxing experience. They are ideal when a brand wants packaging to feel premium and memorable.",
      },
      {
        heading: "Best finishing options",
        text: "Foiling, embossing, debossing, spot UV and soft touch lamination are popular finishes for rigid boxes because they add luxury detail and improve brand impact.",
      },
    ],
  },
  {
    slug: "butter-paper-uses",
    title: "Butter Paper Uses for Food Packaging",
    excerpt:
      "A practical guide for restaurants, burger brands, bakeries and cafes using custom printed butter paper.",
    category: "Food Packaging",
    keywords: [
      "butter paper uses",
      "custom butter paper",
      "printed butter paper",
      "food wrapping paper",
    ],
    relatedProductSlug: "butter-paper",
    relatedProductName: "Butter Paper",
    sections: [
      {
        heading: "What is butter paper used for?",
        text: "Butter paper is used for wrapping burgers, sandwiches, bakery items, snacks and takeaway food. It helps food stay clean and improves presentation.",
      },
      {
        heading: "Why printed butter paper helps branding",
        text: "Custom printed butter paper turns normal food wrapping into a brand touchpoint. Restaurants can print logos, patterns and brand colors for a professional look.",
      },
      {
        heading: "Best businesses for butter paper",
        text: "Burger brands, bakeries, cafes, restaurants, food trucks and deli shops can all use printed butter paper to improve packaging presentation.",
      },
    ],
  },
  {
    slug: "food-packaging-materials",
    title: "Best Food Packaging Materials",
    excerpt:
      "Understand food-safe boards, kraft paper, greaseproof paper and wrapping options for restaurants and bakeries.",
    category: "Food Packaging",
    keywords: [
      "food packaging materials",
      "food safe packaging",
      "custom food boxes",
      "restaurant packaging",
    ],
    relatedProductSlug: "food-packaging",
    relatedProductName: "Food Packaging",
    sections: [
      {
        heading: "Choosing food-safe materials",
        text: "Food packaging should be selected based on product type, grease level, delivery time and brand presentation. Kraft paper, SBS board and greaseproof paper are common options.",
      },
      {
        heading: "Packaging for takeaway and delivery",
        text: "Takeaway packaging must protect food during handling and delivery. Boxes should be strong, practical and easy for customers to carry.",
      },
      {
        heading: "Branding food packaging",
        text: "Custom printed food boxes, butter paper and paper bags help restaurants create a consistent brand experience.",
      },
    ],
  },
  {
    slug: "foiling-vs-spot-uv",
    title: "Foiling vs Spot UV for Packaging",
    excerpt:
      "Compare two premium finishing options and learn which one is better for luxury packaging.",
    category: "Printing & Finishing",
    keywords: [
      "foiling vs spot uv",
      "packaging finishing",
      "gold foiling packaging",
      "spot uv boxes",
    ],
    relatedProductSlug: "luxury-packaging",
    relatedProductName: "Luxury Packaging",
    sections: [
      {
        heading: "What is foiling?",
        text: "Foiling adds a metallic finish to logos, text or design elements. Gold and silver foiling are popular for luxury packaging.",
      },
      {
        heading: "What is Spot UV?",
        text: "Spot UV adds a glossy highlight to selected areas of the design. It is useful for logos, patterns and premium visual contrast.",
      },
      {
        heading: "Which finish should you choose?",
        text: "Foiling is better for metallic luxury impact, while Spot UV is better for glossy contrast and subtle premium detailing.",
      },
    ],
  },
  {
    slug: "mailer-boxes-for-ecommerce",
    title: "Mailer Boxes for E-commerce Brands",
    excerpt:
      "Learn why mailer boxes are important for online stores, subscription brands and delivery packaging.",
    category: "E-commerce Packaging",
    keywords: [
      "mailer boxes ecommerce",
      "custom mailer boxes",
      "subscription box packaging",
      "shipping boxes",
    ],
    relatedProductSlug: "mailer-boxes",
    relatedProductName: "Mailer Boxes",
    sections: [
      {
        heading: "Why e-commerce brands use mailer boxes",
        text: "Mailer boxes are strong, practical and good for shipping products directly to customers. They also create a branded unboxing experience.",
      },
      {
        heading: "Inside and outside printing",
        text: "Mailer boxes can be printed outside for branding and inside for unboxing messages, patterns or customer instructions.",
      },
      {
        heading: "Best uses for mailer boxes",
        text: "Mailer boxes are great for apparel, cosmetics, subscription boxes, gifts, accessories and online retail products.",
      },
    ],
  },
  {
    slug: "paper-bags-branding-guide",
    title: "Paper Bags Branding Guide",
    excerpt:
      "Learn how custom paper bags improve retail presentation and customer experience.",
    category: "Retail Packaging",
    keywords: [
      "paper bags branding",
      "custom paper bags",
      "printed shopping bags",
      "retail paper bags",
    ],
    relatedProductSlug: "paper-bags",
    relatedProductName: "Paper Bags",
    sections: [
      {
        heading: "Why paper bags matter",
        text: "Paper bags are not only for carrying products. They also work as walking brand advertising for retail stores and events.",
      },
      {
        heading: "Handle and material options",
        text: "Paper bags can use rope handles, twisted paper handles or ribbon handles depending on brand style and budget.",
      },
      {
        heading: "Finishing options",
        text: "Matte lamination, gloss lamination, foiling and embossing can make paper bags look more premium.",
      },
    ],
  },
  {
    slug: "cosmetic-packaging-guide",
    title: "Cosmetic Packaging Guide",
    excerpt:
      "A guide for skincare, makeup and beauty brands choosing custom cosmetic boxes.",
    category: "Cosmetic Packaging",
    keywords: [
      "cosmetic packaging guide",
      "custom cosmetic boxes",
      "skincare packaging",
      "makeup boxes",
    ],
    relatedProductSlug: "cosmetic-boxes",
    relatedProductName: "Cosmetic Boxes",
    sections: [
      {
        heading: "What cosmetic packaging needs",
        text: "Cosmetic packaging should protect the product, display brand identity and communicate product quality clearly.",
      },
      {
        heading: "Popular materials",
        text: "SBS board, art card and specialty papers are common choices for cosmetic packaging because they print well and look premium.",
      },
      {
        heading: "Best finishes",
        text: "Soft touch lamination, foiling, embossing and spot UV are popular for cosmetic boxes.",
      },
    ],
  },
  {
    slug: "bakery-boxes-guide",
    title: "Bakery Boxes Guide",
    excerpt:
      "Learn how bakeries can use custom boxes for cakes, pastries, cookies and desserts.",
    category: "Food Packaging",
    keywords: [
      "bakery boxes guide",
      "custom bakery boxes",
      "cake boxes",
      "dessert packaging",
    ],
    relatedProductSlug: "bakery-boxes",
    relatedProductName: "Bakery Boxes",
    sections: [
      {
        heading: "Bakery packaging needs",
        text: "Bakery boxes should protect delicate food items, keep presentation clean and make products easy to carry.",
      },
      {
        heading: "Custom sizes",
        text: "Cakes, cupcakes, pastries and cookies often need different box sizes and styles.",
      },
      {
        heading: "Branding bakery boxes",
        text: "Custom printing helps bakeries create a professional look for takeaway, delivery and gift packaging.",
      },
    ],
  },
];

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
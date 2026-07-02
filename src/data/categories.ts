export type Category = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  keywords: string[];
  productSlugs: string[];
};

export const categories: Category[] = [
  {
    slug: "luxury-packaging",
    name: "Luxury Packaging",
    tagline: "Premium packaging for high-end brands",
    description:
      "Luxury packaging is designed for premium products that need strong presentation, beautiful unboxing and high-value shelf impact. Explore rigid boxes, perfume boxes, jewelry boxes, magnetic boxes and drawer boxes.",
    keywords: [
      "luxury packaging",
      "premium packaging",
      "custom luxury boxes",
      "rigid boxes",
      "magnetic boxes",
    ],
    productSlugs: [
      "rigid-boxes",
      "luxury-packaging",
      "perfume-boxes",
      "jewelry-boxes",
      "magnetic-boxes",
      "drawer-boxes",
    ],
  },
  {
    slug: "food-packaging",
    name: "Food Packaging",
    tagline: "Food-safe packaging for restaurants, bakeries and cafes",
    description:
      "Food packaging includes butter paper, bakery boxes, burger boxes, pizza boxes and custom food boxes for restaurants, cafes, bakeries and takeaway brands.",
    keywords: [
      "food packaging",
      "custom food boxes",
      "butter paper",
      "bakery boxes",
      "burger boxes",
      "pizza boxes",
    ],
    productSlugs: [
      "food-packaging",
      "butter-paper",
      "bakery-boxes",
      "burger-boxes",
      "pizza-boxes",
    ],
  },
  {
    slug: "retail-packaging",
    name: "Retail Packaging",
    tagline: "Custom packaging for shops, stores and product brands",
    description:
      "Retail packaging helps brands improve shelf presentation, product protection and customer experience. Explore folding cartons, display boxes, window boxes, sleeve boxes, paper bags and labels.",
    keywords: [
      "retail packaging",
      "custom retail boxes",
      "display boxes",
      "window boxes",
      "paper bags",
      "labels",
    ],
    productSlugs: [
      "folding-cartons",
      "display-boxes",
      "window-boxes",
      "sleeve-boxes",
      "paper-bags",
      "labels-stickers",
      "hang-tags",
    ],
  },
  {
    slug: "cosmetic-packaging",
    name: "Cosmetic Packaging",
    tagline: "Packaging for beauty, skincare and cosmetic brands",
    description:
      "Cosmetic packaging is made for skincare, makeup, beauty products, perfumes and personal care brands that need clean design and premium finishing.",
    keywords: [
      "cosmetic packaging",
      "custom cosmetic boxes",
      "skincare packaging",
      "makeup boxes",
      "perfume boxes",
    ],
    productSlugs: [
      "cosmetic-boxes",
      "perfume-boxes",
      "soap-boxes",
      "folding-cartons",
      "labels-stickers",
    ],
  },
  {
    slug: "printing-finishing",
    name: "Printing & Finishing",
    tagline: "Premium print finishes for professional packaging",
    description:
      "Printing and finishing options improve the final look of packaging with matte lamination, gloss lamination, soft touch, spot UV, foiling, embossing and die cutting.",
    keywords: [
      "packaging finishing",
      "spot uv",
      "gold foiling",
      "embossing",
      "lamination",
      "die cutting",
    ],
    productSlugs: [
      "luxury-packaging",
      "rigid-boxes",
      "folding-cartons",
      "paper-bags",
      "labels-stickers",
    ],
  },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}
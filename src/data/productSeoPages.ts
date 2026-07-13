export const productSeoPages = {
  "rigid-boxes": {
    title: "Custom Rigid Boxes",
    metaTitle: "Custom Rigid Boxes | Luxury Packaging Boxes",
    description:
      "Custom rigid boxes for luxury, cosmetics, gifts and premium product packaging with printing and finishing support.",
    intro:
      "Custom rigid boxes are ideal for premium product presentation, luxury retail packaging, gift boxes, cosmetic boxes and high-value brand packaging.",
    uses: [
      "Luxury product packaging",
      "Cosmetic and skincare boxes",
      "Gift boxes and presentation boxes",
      "Magnetic closure rigid boxes",
    ],
  },
  "mailer-boxes": {
    title: "Custom Mailer Boxes",
    metaTitle: "Custom Mailer Boxes | Ecommerce Packaging",
    description:
      "Custom printed mailer boxes for ecommerce, subscription boxes and shipping-ready brand packaging.",
    intro:
      "Custom mailer boxes are perfect for ecommerce brands, subscription kits, shipping products and branded unboxing experiences.",
    uses: [
      "Ecommerce packaging",
      "Subscription box packaging",
      "Retail shipping boxes",
      "Branded unboxing packaging",
    ],
  },
  "folding-cartons": {
    title: "Custom Folding Cartons",
    metaTitle: "Custom Folding Cartons | Printed Retail Boxes",
    description:
      "Custom folding cartons for retail packaging, cosmetic packaging, food packaging and product boxes.",
    intro:
      "Custom folding cartons are lightweight, printable and suitable for retail shelves, cosmetics, food products and many product categories.",
    uses: [
      "Retail product boxes",
      "Cosmetic cartons",
      "Food cartons",
      "Pharmaceutical-style cartons",
    ],
  },
  "food-packaging": {
    title: "Custom Food Packaging",
    metaTitle: "Custom Food Packaging | Boxes, Bags & Wrapping Paper",
    description:
      "Food packaging boxes, bakery boxes, butter paper, greaseproof paper and printed food wrapping support.",
    intro:
      "Custom food packaging helps bakeries, restaurants, cafes and food brands present products cleanly and professionally.",
    uses: [
      "Bakery boxes",
      "Food wrapping paper",
      "Takeaway packaging",
      "Restaurant packaging",
    ],
  },
  "paper-bags": {
    title: "Custom Paper Bags",
    metaTitle: "Custom Paper Bags | Printed Retail Bags",
    description:
      "Custom printed paper bags for retail, food, fashion, gifts and luxury brand packaging.",
    intro:
      "Custom paper bags are useful for retail stores, food brands, gift shops, fashion brands and premium product handover.",
    uses: [
      "Retail paper bags",
      "Food paper bags",
      "Luxury shopping bags",
      "Gift packaging bags",
    ],
  },
  "labels-stickers": {
    title: "Custom Labels and Stickers",
    metaTitle: "Custom Labels and Stickers | Printed Packaging Labels",
    description:
      "Custom labels and stickers for product packaging, branding, food packaging, cosmetics and retail products.",
    intro:
      "Custom labels and stickers help brands add product information, branding and professional finishing to packaging.",
    uses: [
      "Product labels",
      "Packaging stickers",
      "Food labels",
      "Cosmetic labels",
    ],
  },
} as const;

export type ProductSeoSlug = keyof typeof productSeoPages;
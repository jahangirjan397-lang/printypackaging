export const blogVisuals: Record<string, { src: string; alt: string }> = {
  "custom-packaging-quote-guide": {
    src: "/images/blog/quote-guide-v3.webp",
    alt: "Assorted rigid and drawer gift boxes with inserts laid out for a packaging quote (concept image)",
  },
  "packaging-materials-guide": {
    src: "/images/blog/materials-guide-v3.webp",
    alt: "Paperboard, corrugated board and tissue samples beside folding cartons (concept image)",
  },
  "finishing-options-for-custom-boxes": {
    src: "/images/blog/finishing-options-v3.webp",
    alt: "Print operator checking colour on a press with colour charts",
  },
  "artwork-dieline-checklist": {
    src: "/images/blog/artwork-dieline-v3.webp",
    alt: "Box dieline with fold lines and dimensions for artwork planning",
  },
  "mailer-boxes-for-ecommerce-brands": {
    src: "/images/blog/mailer-ecommerce-v3.webp",
    alt: "Open kraft mailer box with a folded garment and paper bag for ecommerce orders (concept image)",
  },
  "food-packaging-for-restaurants": {
    src: "/images/products/butter-paper/butter-paper-lifestyle.webp",
    alt: "Sandwich wrapped in Printy branded butter paper for cafes and restaurants",
  },
};

export function getBlogVisual(slug: string) {
  const visual = blogVisuals[slug];
  if (!visual) {
    throw new Error(`Missing article image for ${slug}`);
  }
  return visual;
}

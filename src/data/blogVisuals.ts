export const blogVisuals: Record<string, { src: string; alt: string }> = {
  "custom-packaging-quote-guide": {
    src: "/images/products/mailer-boxes/mailer-boxes-hero.webp",
    alt: "Custom mailer box example for packaging quote planning",
  },
  "packaging-materials-guide": {
    src: "/images/blog/materials-guide.webp",
    alt: "Paperboard, corrugated board and printed packaging samples",
  },
  "finishing-options-for-custom-boxes": {
    src: "/images/products/luxury-packaging/luxury-packaging-finish.webp",
    alt: "Close view of a premium printed box finish",
  },
  "artwork-dieline-checklist": {
    src: "/images/products/folding-cartons/folding-cartons-open.webp",
    alt: "Open folding carton showing the box structure for artwork planning",
  },
  "mailer-boxes-for-ecommerce-brands": {
    src: "/images/products/mailer-boxes/mailer-boxes-lifestyle.webp",
    alt: "Printed mailer boxes for ecommerce orders",
  },
  "food-packaging-for-restaurants": {
    src: "/images/products/food-packaging/food-packaging-hero.webp",
    alt: "Bakery and takeaway food boxes with printed branding",
  },
};

export function getBlogVisual(slug: string) {
  const visual = blogVisuals[slug];
  if (!visual) {
    throw new Error(`Missing article image for ${slug}`);
  }
  return visual;
}

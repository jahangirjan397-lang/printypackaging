import { categories } from "./categories";
import { products } from "./products";

// Picks the photos for the industry (category) pages so the same product photo
// is not repeated on page after page. For every product card on an industry
// page we choose, from that product's gallery:
//   1. a photo whose description matches the industry (e.g. "skincare" for
//      cosmetics), then
//   2. a photo no other industry page uses yet, then
//   3. the least-used photo.
// Industry-specific photos supplied later can be set in `industryOverrides`
// and always win.

type PickedImage = { src: string; alt: string };

// Words that make a gallery photo a good fit for an industry
const industryWords: Record<string, string[]> = {
  "food-packaging": ["food", "sandwich", "burger", "pizza", "restaurant", "takeaway"],
  "bakery-packaging": ["bakery", "cake", "cupcake", "cookie", "pastr", "bread"],
  "confectionery-packaging": ["chocolate", "sweet", "candy", "confection", "window"],
  "cosmetic-packaging": ["cosmetic", "skincare", "serum", "beauty", "perfume", "vial"],
  "candle-packaging": ["candle"],
  "apparel-packaging": ["apparel", "clothing", "boutique", "fashion"],
  "jewelry-packaging": ["jewel", "ring", "necklace"],
  "gift-packaging": ["gift"],
  "luxury-packaging": ["luxury", "foil", "gold", "premium"],
  "retail-packaging": ["retail", "boutique", "counter", "display", "shelf"],
  "household-packaging": ["household", "home"],
  "sports-packaging": ["sport", "fitness"],
  "toys-games-packaging": ["toy", "game"],
  "events-packaging": ["wedding", "event", "invitation", "party"],
  "health-pharma-packaging": ["pharma", "medic", "health"],
  "ecommerce-packaging": ["ecommerce", "shipping", "mailer", "unboxing"],
};

// Industry-specific photos (hero and/or per product card). Add entries here
// when real photos for an industry are available.
export const industryOverrides: Record<
  string,
  { hero?: PickedImage; products?: Record<string, PickedImage> }
> = {
  "food-packaging": {
    products: {
      "butter-paper": { src: "/images/products/butter-paper/butter-paper-checkered-v4-brand-v2.webp", alt: "Red and white checkered deli paper sheets for burgers and baskets" },
    },
  },
  "candle-packaging": {
    products: {
      "two-piece-rigid-boxes": { src: "/images/products/rigid-boxes/rigid-boxes-lid-base-v5-brand.webp", alt: "Two-piece lid and base rigid box with a printed pattern" },
    },
  },
  "sports-packaging": {
    hero: { src: "/images/industries/sports-packaging/sports-packaging-1-brand.webp", alt: "Printed window boxes for sports and fitness gear" },
  },
  "toys-games-packaging": {
    hero: { src: "/images/industries/toys-games-packaging/toys-games-packaging-1-brand.webp", alt: "Printed board game boxes with a matching rule booklet" },
  },
  "household-packaging": {
    hero: { src: "/images/industries/household-packaging/household-packaging-1-brand.webp", alt: "Printed boxes for kitchen and home goods" },
  },
  "events-packaging": {
    hero: { src: "/images/industries/events-packaging/events-packaging-1-brand.webp", alt: "Festive printed advent calendar box for seasonal events" },
  },
  "health-pharma-packaging": {
    hero: { src: "/images/industries/health-pharma-packaging/health-pharma-packaging-1-brand.webp", alt: "Printed medicine cartons for pain relief tablets" },
  },
  "confectionery-packaging": {
    hero: { src: "/images/industries/confectionery-packaging/confectionery-packaging-3-brand.webp", alt: "Bright printed candy boxes in bold colours" },
    products: {
      "drawer-boxes": { src: "/images/industries/confectionery-packaging/confectionery-packaging-1-brand.webp", alt: "Drawer-style sweet box with a tray of sweets" },
      "display-boxes": { src: "/images/industries/confectionery-packaging/confectionery-packaging-2-brand.webp", alt: "Chocolate bar display box with matching outer boxes" },
    },
  },
};

function score(alt: string, words: string[]) {
  const text = alt.toLowerCase();
  return words.reduce((total, word) => total + (text.includes(word) ? 1 : 0), 0);
}

function buildIndustryImages() {
  const useCount = new Map<string, number>();
  const result = new Map<string, { hero?: PickedImage; cards: Record<string, PickedImage> }>();

  const pick = (slug: string, words: string[], avoid: Set<string>) => {
    const images = products.find((product) => product.slug === slug)?.images ?? [];
    const candidates = images.filter((image) => !avoid.has(image.src));
    if (candidates.length === 0) return undefined;
    const best = [...candidates].sort(
      (a, b) =>
        score(b.alt, words) - score(a.alt, words) ||
        (useCount.get(a.src) ?? 0) - (useCount.get(b.src) ?? 0),
    )[0];
    useCount.set(best.src, (useCount.get(best.src) ?? 0) + 1);
    return { src: best.src, alt: best.alt };
  };

  for (const category of categories) {
    const words = industryWords[category.slug] ?? [];
    const overrides = industryOverrides[category.slug];
    const onThisPage = new Set<string>();
    const cards: Record<string, PickedImage> = {};

    for (const slug of category.productSlugs) {
      const chosen = overrides?.products?.[slug] ?? pick(slug, words, onThisPage);
      if (chosen) {
        cards[slug] = chosen;
        onThisPage.add(chosen.src);
      }
    }

    // Hero: an override, else another photo of the first product that is not
    // already shown in a card on this page
    const hero =
      overrides?.hero ??
      (category.productSlugs[0]
        ? pick(category.productSlugs[0], words, onThisPage)
        : undefined);

    result.set(category.slug, { hero, cards });
  }

  return result;
}

const industryImages = buildIndustryImages();

export function getIndustryImages(categorySlug: string) {
  return industryImages.get(categorySlug);
}

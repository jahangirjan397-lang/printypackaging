export const siteImages = {
  hero: {
    main: "/images/hero/hero-packaging.webp",
    secondary: "/images/hero/packaging-samples.webp",
  },

  products: {
    mailerBoxes: "/images/products/mailer-boxes.webp",
    rigidBoxes: "/images/products/rigid-boxes.webp",
    foldingCartons: "/images/products/folding-cartons.webp",
    foodPackaging: "/images/products/food-packaging.webp",
    butterPaper: "/images/products/butter-paper.webp",
    paperBags: "/images/products/paper-bags.webp",
    labelsStickers: "/images/products/labels-stickers.webp",
    displayBoxes: "/images/products/display-boxes.webp",
    shippingBoxes: "/images/products/shipping-boxes.webp",
    luxuryBoxes: "/images/products/luxury-boxes.webp",
  },

  categories: {
    retailPackaging: "/images/categories/retail-packaging.webp",
    ecommercePackaging: "/images/categories/ecommerce-packaging.webp",
    foodPackaging: "/images/categories/food-packaging.webp",
    cosmeticPackaging: "/images/categories/cosmetic-packaging.webp",
    luxuryPackaging: "/images/categories/luxury-packaging.webp",
  },

  finishes: {
    foilStamping: "/images/finishes/foil-stamping.webp",
    embossing: "/images/finishes/embossing.webp",
    spotUv: "/images/finishes/spot-uv.webp",
    lamination: "/images/finishes/lamination.webp",
    dieCutting: "/images/finishes/die-cutting.webp",
  },

  markets: {
    usa: "/images/markets/usa-packaging.webp",
    uk: "/images/markets/uk-packaging.webp",
    canada: "/images/markets/canada-packaging.webp",
    europe: "/images/markets/europe-packaging.webp",
    australia: "/images/markets/australia-packaging.webp",
  },

  trust: {
    production: "/images/trust/production-samples.webp",
    qualityCheck: "/images/trust/quality-check.webp",
    artworkSupport: "/images/trust/artwork-support.webp",
    shippingReady: "/images/trust/shipping-ready.webp",
  },
} as const;

export type SiteImages = typeof siteImages;
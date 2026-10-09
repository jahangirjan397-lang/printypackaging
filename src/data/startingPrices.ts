// "From" prices shown on product pages and cards so buyers see a price range
// before they ask for a quote. Each entry holds our estimated COST for one
// reference size at the quantity shown (production plus air delivery to the
// US, since shipping is included on a first order). The price shown is the
// cost plus MARGIN. The exact quote is always worked out per order, so update
// the costs here when real costs change.

// 1.5 = cost + 50% margin
export const MARGIN = 1.5;

export type StartingPrice = {
  // Estimated cost in US dollars per unit (before margin)
  cost: number;
  // Quantity the price is based on
  quantity: number;
  // What one unit is called: box, bag, sheet, card...
  unit: string;
  // Reference size the cost is based on (internal, not shown to buyers)
  size: string;
};

// Boxes are priced at our 100-piece minimum order
const box = (cost: number, size: string, quantity = 100): StartingPrice => ({
  cost,
  quantity,
  unit: "box",
  size,
});

const piece = (
  cost: number,
  size: string,
  quantity: number,
  unit: string,
): StartingPrice => ({ cost, quantity, unit, size });

export const startingPrices: Record<string, StartingPrice> = {
  // Luxury packaging (rigid board, heavier to ship)
  "rigid-boxes": box(10, "8 × 6 × 3 in"),
  "luxury-packaging": box(10, "8 × 6 × 3 in"),
  "perfume-boxes": box(7, "3 × 3 × 5 in"),
  "jewelry-boxes": box(6, "3 × 3 × 1.5 in"),
  "magnetic-boxes": box(11, "8 × 6 × 3 in"),
  "drawer-boxes": box(10.5, "7 × 5 × 2 in"),
  "two-piece-rigid-boxes": box(10, "8 × 6 × 3 in"),
  "gift-boxes": box(9.5, "8 × 6 × 3 in"),

  // Folding cartons
  "folding-cartons": box(1.8, "4 × 2 × 6 in"),
  "tuck-end-boxes": box(1.8, "4 × 2 × 6 in"),

  // Corrugated
  "mailer-boxes": box(6.5, "9 × 6 × 3 in"),
  "kraft-mailer-boxes": box(6, "9 × 6 × 3 in"),
  "black-mailer-boxes": box(7, "9 × 6 × 3 in"),
  "white-mailer-boxes": box(7, "9 × 6 × 3 in"),
  "shipping-boxes": box(7.5, "12 × 9 × 4 in"),
  "subscription-boxes": box(7, "10 × 8 × 3 in"),

  // Food
  "butter-paper": piece(0.25, "12 × 12 in", 1000, "sheet"),
  "food-packaging": box(2, "6 × 6 × 3 in"),
  "bakery-boxes": box(2.5, "8 × 8 × 4 in"),
  "burger-boxes": box(2, "5 × 5 × 3 in"),
  "pizza-boxes": box(3.5, "12 × 12 × 2 in"),
  "cake-boxes": box(3.2, "10 × 10 × 5 in"),
  "cupcake-boxes": box(2.6, "9 × 9 × 4 in"),
  "cookie-boxes": box(2.2, "8 × 4 × 2 in"),
  "gable-boxes": box(2.4, "6 × 4 × 4 in"),

  // Retail
  "paper-bags": piece(2.5, "10 × 5 × 13 in", 100, "bag"),
  "candle-boxes": box(2, "4 × 4 × 4 in"),
  "soap-boxes": box(1.6, "3.5 × 2.5 × 1.5 in"),
  "display-boxes": box(4, "10 × 6 × 4 in"),
  "window-boxes": box(2.2, "5 × 5 × 3 in"),
  "sleeve-boxes": box(2, "6 × 4 × 2 in"),
  "pillow-boxes": box(1.6, "6 × 3 × 1.5 in"),
  "hang-tab-boxes": box(1.8, "4 × 1.5 × 6 in"),
  "cosmetic-boxes": box(1.8, "2 × 2 × 6 in"),
  "pharmaceutical-boxes": box(1.5, "3 × 1.5 × 5 in"),
  "apparel-boxes": box(4.5, "12 × 9 × 2 in"),
  "kraft-boxes": box(2, "5 × 5 × 3 in"),

  // Branding
  "labels-stickers": piece(0.1, "3 × 3 in", 1000, "label"),
  "hang-tags": piece(0.2, "2 × 3.5 in", 1000, "tag"),

  // Custom printing
  "business-cards": piece(0.06, "3.5 × 2 in", 1000, "card"),
  "thank-you-cards": piece(0.12, "4 × 6 in", 1000, "card"),
  flyers: piece(0.12, "8.5 × 11 in", 1000, "flyer"),
  brochures: piece(0.4, "8.5 × 11 in, tri-fold", 1000, "brochure"),
  "catalogs-magazines": piece(3.5, "8.5 × 11 in, 24 pages", 500, "copy"),
  booklets: piece(2.2, "5.5 × 8.5 in, 16 pages", 500, "booklet"),
  postcards: piece(0.1, "4 × 6 in", 1000, "card"),
  "greeting-cards": piece(0.6, "5 × 7 in, folded", 500, "card"),
  "invitation-cards": piece(0.7, "5 × 7 in", 500, "card"),
  posters: piece(2.5, "18 × 24 in", 100, "poster"),
  banners: piece(30, "3 × 6 ft", 10, "banner"),
  "clings-decals": piece(0.8, "4 × 4 in", 500, "decal"),
  menus: piece(1, "8.5 × 11 in", 500, "menu"),
  "table-tents": piece(0.8, "4 × 6 in", 500, "tent"),
  "paper-coasters": piece(0.14, "4 in round", 1000, "coaster"),
  "door-hangers": piece(0.18, "4 × 11 in", 1000, "hanger"),
  bookmarks: piece(0.1, "2 × 6 in", 1000, "bookmark"),
  calendars: piece(6, "11 × 17 in wall, 12 pages", 250, "calendar"),
  letterheads: piece(0.1, "8.5 × 11 in", 1000, "sheet"),
  envelopes: piece(0.2, "#10 (4.1 × 9.5 in)", 1000, "envelope"),
  "presentation-folders": piece(1.6, "9 × 12 in", 500, "folder"),
  "note-pads": piece(2.4, "5.5 × 8.5 in, 50 sheets", 250, "pad"),
  "carbonless-forms": piece(0.45, "8.5 × 11 in, 2-part", 500, "form"),
  tickets: piece(0.08, "2 × 5.5 in", 1000, "ticket"),
};

export function getStartingPrice(slug: string): StartingPrice | undefined {
  return startingPrices[slug];
}

export function formatStartingPrice({ cost, quantity, unit }: StartingPrice) {
  const amount = (cost * MARGIN).toFixed(2);
  return {
    amount: `$${amount}`,
    per: `/${unit}`,
    basis: `at ${quantity.toLocaleString("en-US")} pcs`,
    // e.g. "Starting price for 100 pcs." (the reference size stays internal)
    reference: `Starting price for ${quantity.toLocaleString("en-US")} pcs.`,
  };
}

// Shown under starting prices: sets the expectation that size and quantity
// change the price, while keeping the buyer interested in asking
export const startingPriceNote =
  "Your size and quantity set the final price, and the more you order, the less you pay per unit. Get your exact price free within 1 hour.";

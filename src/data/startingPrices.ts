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
  // Price at 500 and 1,000 pcs as a share of the 100 pcs price, so buyers
  // see that bigger orders cost less per unit
  tiers?: Tiers;
};

type Tiers = readonly [at500: number, at1000: number];

// Drop in unit price from 100 to 500 and 1,000 pcs, taken from the estimation
// sheet (Nov 2026, USA, shipping included): tuck end, burger and pillow boxes
// for card, mailer for corrugated, two-piece and magnetic for rigid, bag, cake.
const CARD: Tiers = [0.5, 0.42];
const CORRUGATED: Tiers = [0.85, 0.65];
const RIGID: Tiers = [0.62, 0.6];
const BAG: Tiers = [0.9, 0.85];
const CAKE: Tiers = [0.8, 0.75];

// Boxes are priced at our 100-piece minimum order
const box = (cost: number, size: string, tiers?: Tiers): StartingPrice => ({
  cost,
  quantity: 100,
  unit: "box",
  size,
  tiers,
});

const piece = (
  cost: number,
  size: string,
  quantity: number,
  unit: string,
  tiers?: Tiers,
): StartingPrice => ({ cost, quantity, unit, size, tiers });

export const startingPrices: Record<string, StartingPrice> = {
  // Luxury packaging (rigid board, heavier to ship)
  "rigid-boxes": box(10, "8 × 6 × 3 in", RIGID),
  "luxury-packaging": box(10, "8 × 6 × 3 in", RIGID),
  "perfume-boxes": box(7, "3 × 3 × 5 in", RIGID),
  "jewelry-boxes": box(6, "3 × 3 × 1.5 in", RIGID),
  "magnetic-boxes": box(11, "8 × 6 × 3 in", RIGID),
  "drawer-boxes": box(10.5, "7 × 5 × 2 in", RIGID),
  "two-piece-rigid-boxes": box(10, "8 × 6 × 3 in", RIGID),
  "gift-boxes": box(9.5, "8 × 6 × 3 in", RIGID),

  // Folding cartons
  "folding-cartons": box(1.8, "4 × 2 × 6 in", CARD),
  "tuck-end-boxes": box(1.8, "4 × 2 × 6 in", CARD),

  // Corrugated
  "mailer-boxes": box(6.5, "9 × 6 × 3 in", CORRUGATED),
  "kraft-mailer-boxes": box(6, "9 × 6 × 3 in", CORRUGATED),
  "black-mailer-boxes": box(7, "9 × 6 × 3 in", CORRUGATED),
  "white-mailer-boxes": box(7, "9 × 6 × 3 in", CORRUGATED),
  "shipping-boxes": box(7.5, "12 × 9 × 4 in", CORRUGATED),
  "subscription-boxes": box(7, "10 × 8 × 3 in", CORRUGATED),

  // Food
  "butter-paper": piece(0.25, "12 × 12 in", 1000, "sheet"),
  "food-packaging": box(2, "6 × 6 × 3 in", CARD),
  "bakery-boxes": box(2.5, "8 × 8 × 4 in", CAKE),
  "burger-boxes": box(2, "5 × 5 × 3 in", CARD),
  "pizza-boxes": box(3.5, "12 × 12 × 2 in", CAKE),
  "cake-boxes": box(3.2, "10 × 10 × 5 in", CAKE),
  "cupcake-boxes": box(2.6, "9 × 9 × 4 in", CAKE),
  "cookie-boxes": box(2.2, "8 × 4 × 2 in", CARD),
  "gable-boxes": box(2.4, "6 × 4 × 4 in", CARD),

  // Retail
  "paper-bags": piece(2.5, "10 × 5 × 13 in", 100, "bag", BAG),
  "candle-boxes": box(2, "4 × 4 × 4 in", CARD),
  "soap-boxes": box(1.6, "3.5 × 2.5 × 1.5 in", CARD),
  "display-boxes": box(4, "10 × 6 × 4 in", CARD),
  "window-boxes": box(2.2, "5 × 5 × 3 in", CARD),
  "sleeve-boxes": box(2, "6 × 4 × 2 in", CARD),
  "pillow-boxes": box(1.6, "6 × 3 × 1.5 in", CARD),
  "hang-tab-boxes": box(1.8, "4 × 1.5 × 6 in", CARD),
  "cosmetic-boxes": box(1.8, "2 × 2 × 6 in", CARD),
  "pharmaceutical-boxes": box(1.5, "3 × 1.5 × 5 in", CARD),
  "apparel-boxes": box(4.5, "12 × 9 × 2 in", CORRUGATED),
  "kraft-boxes": box(2, "5 × 5 × 3 in", CARD),

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

// Prices are hidden on the site (owner 2026-11-14): competitors show no prices
// and every buyer should ask for a quote, so the lead is captured. Set to true
// to show the "from" prices and the 100 / 500 / 1,000 pcs ladder again.
export const SHOW_PRICES = false;

export function getStartingPrice(slug: string): StartingPrice | undefined {
  return SHOW_PRICES ? startingPrices[slug] : undefined;
}

const usd = (n: number) => `$${n.toFixed(2)}`;

export function formatStartingPrice({ cost, quantity, unit, tiers }: StartingPrice) {
  const base = cost * MARGIN;
  // Price per unit at each quantity, smallest order first
  const ladder = [
    { quantity, amount: usd(base) },
    ...(tiers
      ? [
          { quantity: 500, amount: usd(base * tiers[0]) },
          { quantity: 1000, amount: usd(base * tiers[1]) },
        ]
      : []),
  ].map((step) => ({ ...step, label: `${step.quantity.toLocaleString("en-US")} pcs` }));
  // "From" is the lowest unit price, at the largest quantity shown
  const lowest = ladder[ladder.length - 1];
  return {
    amount: lowest.amount,
    per: `/${unit}`,
    quantity: lowest.quantity,
    basis: `at ${lowest.label}`,
    ladder,
    // A rough guide only, never a fixed price (the reference size stays internal)
    reference: `Rough estimate for a standard size at about ${lowest.label}. Your real price can be lower or higher.`,
  };
}

// Shown under starting prices: sets the expectation that size and quantity
// change the price, while keeping the buyer interested in asking
export const startingPriceNote =
  "Size, material, finish and quantity set the final quote. Bigger orders cost less per unit. Send your details for a free, exact quote. We reply within 10-15 minutes.";

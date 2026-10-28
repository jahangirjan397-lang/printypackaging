import type { GeneratorStyle } from "@/data/dielines";

// Box Size Library: one page per popular size, each with the exact dieline
// from the generator, the flat sheet size, what fits inside and a quote link
// that opens with this size filled in. Sizes are inside dimensions in inches.

export type BoxSize = {
  slug: string;
  style: GeneratorStyle;
  styleName: string;
  product: string; // product page slug, also used to prefill the quote form
  board: "card" | "e-flute";
  L: number;
  W: number;
  H: number;
  fits: string[];
};

type Seed = [L: number, W: number, H: number, fits: string[]];

const STYLE: Record<string, { style: GeneratorStyle; styleName: string; product: string; board: "card" | "e-flute"; key: string }> = {
  mailer: { style: "mailer", styleName: "Mailer Box", product: "mailer-boxes", board: "e-flute", key: "mailer-box" },
  tuck: { style: "reverse-tuck-end", styleName: "Tuck End Box", product: "tuck-end-boxes", board: "card", key: "tuck-end-box" },
  auto: { style: "auto-bottom", styleName: "Auto Bottom Box", product: "tuck-end-boxes", board: "card", key: "auto-bottom-box" },
  snap: { style: "snap-lock", styleName: "Snap Lock Bottom Box", product: "tuck-end-boxes", board: "card", key: "snap-lock-box" },
  tray: { style: "four-corner", styleName: "Four Corner Tray", product: "bakery-boxes", board: "card", key: "four-corner-tray" },
};

const seeds: Record<keyof typeof STYLE, Seed[]> = {
  mailer: [
    [6, 4, 2, ["jewellery and accessories", "small skincare items", "phone accessories"]],
    [6, 6, 2, ["candles up to 3 in wide", "cosmetics gift sets", "coasters"]],
    [7, 5, 2, ["socks and small apparel", "notebooks", "beauty samples"]],
    [8, 6, 2, ["folded t-shirts", "planners and journals", "flat lay gift sets"]],
    [8, 6, 4, ["two candles", "mugs", "skincare kits"]],
    [8, 8, 3, ["candles and diffusers", "baked goods", "gift sets"]],
    [9, 6, 3, ["t-shirts and hoodies", "subscription boxes", "skincare sets"]],
    [9, 6, 4, ["shoes for kids", "bottle sets", "coffee bags"]],
    [10, 8, 2, ["shirts and folded clothing", "books", "art prints"]],
    [10, 8, 4, ["subscription boxes", "gift hampers", "bottles with padding"]],
    [10, 10, 4, ["gift hampers", "candles in sets of four", "cakes and bakes"]],
    [11, 8, 2, ["A4 documents and prints", "magazines", "flat apparel"]],
    [12, 9, 3, ["jackets and knitwear", "large books", "framed small prints"]],
    [12, 9, 4, ["sweaters and hoodies", "boxed sets", "wine accessories"]],
    [12, 10, 4, ["bulky clothing", "gift baskets", "multi-item kits"]],
    [12, 12, 4, ["vinyl records", "large gift sets", "home decor"]],
    [13, 10, 3, ["laptops in sleeves", "art supplies", "apparel bundles"]],
    [14, 10, 4, ["coats and bulky items", "baby gift sets", "home textiles"]],
  ],
  tuck: [
    [1.5, 1.5, 4, ["30 ml serum and dropper bottles", "essential oils", "lip gloss"]],
    [2, 1, 5, ["lipsticks", "mascara", "pens"]],
    [2, 2, 4, ["50 ml bottles", "roll-on perfumes", "tea tins"]],
    [2, 2, 6, ["100 ml bottles", "spray bottles", "tall jars"]],
    [2.5, 2.5, 6, ["perfume bottles", "hair oil", "sauces"]],
    [3, 2, 8, ["wine accessories", "tall bottles", "reed diffusers"]],
    [3, 3, 3, ["candle jars up to 8 oz", "cream jars", "small gifts"]],
    [3, 3, 4, ["candles", "cosmetic jars", "tea and coffee"]],
    [3, 3, 6, ["supplements", "pump bottles", "candles with lids"]],
    [3.5, 2.5, 1.25, ["soap bars", "chocolate bars", "small cards"]],
    [3.5, 3.5, 3.5, ["8 oz candles", "body butter jars", "mugs"]],
    [4, 2, 6, ["skincare cartons", "electronics accessories", "tea"]],
    [4, 3, 1.5, ["soap bars", "jewellery", "chocolates"]],
    [4, 4, 4, ["candles", "gift items", "bath bombs"]],
    [4, 4, 6, ["large candles", "kitchen items", "toy packaging"]],
    [5, 5, 5, ["mugs", "gift sets", "small appliances"]],
    [6, 4, 2, ["cosmetics palettes", "wallets", "accessories"]],
    [6, 6, 6, ["gift boxes", "toys", "home decor"]],
  ],
  auto: [
    [3, 3, 8, ["heavier bottles", "wine and spirits accessories", "tall candles"]],
    [3, 3, 10, ["tall bottles", "reed diffusers", "rolled posters"]],
    [4, 4, 8, ["jars and heavier products", "supplements", "food items"]],
    [4, 4, 10, ["large bottles", "kitchen items", "tall gifts"]],
    [5, 5, 8, ["candles in sets", "gift packs", "food tins"]],
    [6, 4, 10, ["heavier retail products", "electronics", "boxed kits"]],
  ],
  snap: [
    [3, 3, 7, ["bottles and jars", "cosmetics", "supplements"]],
    [4, 3, 7, ["retail products that need a firm base", "food items", "accessories"]],
  ],
  tray: [
    [6, 6, 2, ["cookies and macarons", "chocolates", "small bakes"]],
    [9, 9, 3, ["cupcakes and pastries", "brownies", "small cakes"]],
    [10, 10, 4, ["cakes", "pies", "gift trays"]],
    [12, 8, 3, ["doughnuts and pastries", "sandwiches", "platters"]],
  ],
};

const n = (x: number) => String(x).replace(".", "-");

export const boxSizes: BoxSize[] = (Object.keys(seeds) as (keyof typeof STYLE)[]).flatMap((k) =>
  seeds[k].map(([L, W, H, fits]) => ({
    slug: `${STYLE[k].key}-${n(L)}x${n(W)}x${n(H)}-in`,
    style: STYLE[k].style,
    styleName: STYLE[k].styleName,
    product: STYLE[k].product,
    board: STYLE[k].board,
    L,
    W,
    H,
    fits,
  })),
);

export const getBoxSize = (slug: string) => boxSizes.find((b) => b.slug === slug);
export const sizeLabel = (b: BoxSize) => `${b.L} x ${b.W} x ${b.H} in`;

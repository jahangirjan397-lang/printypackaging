import fs from "node:fs";
import path from "node:path";

// Dieline library: the box and print structures Printy Packaging draws in
// house. The first 52 are crops of our own dieline sheets
// (public/images/dielines). More are added from /admin (Decap CMS) as
// content/dielines/<slug>.json and merged in below.
// `product` links to the matching product page; `generator` to the free
// dieline generator style when that structure can be drawn to any size.

export type DielineCategory =
  | "folding-cartons"
  | "mailers-shipping"
  | "trays-sleeves"
  | "food"
  | "displays"
  | "rigid-gift"
  | "inserts"
  | "print-folders";

export type GeneratorStyle =
  | "reverse-tuck-end"
  | "straight-tuck-end"
  | "auto-bottom"
  | "mailer"
  | "shipping-box"
  | "tray"
  | "sleeve"
  | "pillow";

export type Dieline = {
  slug: string;
  name: string;
  category: DielineCategory;
  summary: string;
  bestFor: string[];
  closure: string;
  material: string;
  tip: string;
  product?: string;
  generator?: GeneratorStyle;
  image: { w: number; h: number };
  // Set for dielines added from the admin panel
  src?: string;
  file?: string;
  addedAt?: string;
};

export const dielineCategories: { id: DielineCategory; name: string; text: string }[] = [
  { id: "folding-cartons", name: "Folding cartons & tuck ends", text: "Everyday retail cartons for cosmetics, supplements, candles and small products." },
  { id: "mailers-shipping", name: "Mailers & shipping boxes", text: "Self-locking mailers and corrugated boxes for e-commerce and subscriptions." },
  { id: "trays-sleeves", name: "Trays & sleeves", text: "Open trays, sleeves and corner-glued trays for presentation and bakery." },
  { id: "food", name: "Food packaging", text: "Takeaway, bakery and snack structures that fold fast at the counter." },
  { id: "displays", name: "Displays & retail", text: "Counter displays, dispensers and hanger boxes that sell from the shelf." },
  { id: "rigid-gift", name: "Rigid, magnetic & gift boxes", text: "Premium two-piece, magnetic and specialty gift structures." },
  { id: "inserts", name: "Inserts & partitions", text: "Punch inserts and partitions that hold products in place." },
  { id: "print-folders", name: "Folders, cards & hangers", text: "Presentation folders, disc sleeves, header cards and door hangers." },
];

const builtInDielines: Dieline[] = [
  // ---------- folding cartons ----------
  { slug: "reverse-tuck-end", name: "Reverse Tuck End Box", category: "folding-cartons",
    summary: "The most common folding carton. The top tuck closes from the back and the bottom tuck from the front, so the box opens cleanly and runs fast on gluing lines.",
    bestFor: ["Cosmetics and skincare", "Supplements", "Candles and small gifts", "Retail products up to about 1 kg"],
    closure: "Tuck flaps at top and bottom, closing on opposite panels", material: "SBS / bleach card or kraft, 300–400 gsm",
    tip: "Ideal for light products. For heavier items, switch the bottom to an auto (crash-lock) bottom.",
    product: "tuck-end-boxes", generator: "reverse-tuck-end", image: { w: 523, h: 531 } },
  { slug: "straight-tuck-end", name: "Straight Tuck End Box", category: "folding-cartons",
    summary: "Both tuck flaps close on the same panel, giving an uninterrupted front panel for artwork and a neat look when the box is opened from the top.",
    bestFor: ["Premium cosmetics", "Perfume and serum cartons", "Window boxes", "Products shown front-on"],
    closure: "Top and bottom tucks on the same (back) panel", material: "SBS / bleach card, 300–400 gsm",
    tip: "Choose it when a clean front matters more than the slightly higher board use.",
    product: "tuck-end-boxes", generator: "straight-tuck-end", image: { w: 684, h: 696 } },
  { slug: "tuck-end-auto-bottom", name: "Tuck Top Auto Bottom Box", category: "folding-cartons",
    summary: "A tuck top with a pre-glued crash-lock bottom that pops into place when the box is opened, so it packs quickly and carries more weight.",
    bestFor: ["Heavier jars and bottles", "Fast packing lines", "Food and beverage cartons", "Gift sets"],
    closure: "Tuck top, auto-lock glued bottom", material: "SBS, kraft or E-flute laminated board",
    tip: "Saves packing time on runs of 1,000+ boxes and gives a stronger base.",
    product: "folding-cartons", generator: "auto-bottom", image: { w: 780, h: 711 } },
  { slug: "tuck-end-123-bottom", name: "Tuck End 1-2-3 Bottom Box", category: "folding-cartons",
    summary: "A tuck top with a snap-lock (1-2-3) bottom that is folded by hand in three steps. Stronger than a tuck bottom without the extra gluing of an auto bottom.",
    bestFor: ["Medium-weight products", "Short runs", "Hand-packed retail items"],
    closure: "Tuck top, 1-2-3 snap-lock bottom", material: "SBS or kraft, 300–400 gsm",
    tip: "A good middle ground when an auto bottom is not worth the gluing cost.",
    product: "folding-cartons", image: { w: 711, h: 653 } },
  { slug: "reverse-tuck-end-locking-tab", name: "Reverse Tuck End with Locking Tab", category: "folding-cartons",
    summary: "A reverse tuck end with small locking tabs on the tuck flaps, so the box stays shut on the shelf and in transit.",
    bestFor: ["Products that must not open by accident", "Tamper-aware retail", "Pharma and wellness cartons"],
    closure: "Tucks with locking slits", material: "SBS / bleach card, 300–400 gsm",
    tip: "Add a tear strip or seal sticker if the buyer needs tamper evidence.",
    product: "pharmaceutical-boxes", image: { w: 1100, h: 619 } },
  { slug: "sealend-box", name: "Sealend Box", category: "folding-cartons",
    summary: "Full-overlap end flaps glued shut on both ends, like a cereal box. Strong, cheap to produce and easy to fill on machines.",
    bestFor: ["Food and dry goods", "Machine filling", "Multi-pack cartons"],
    closure: "Glued end flaps top and bottom", material: "Grey back or SBS board",
    tip: "Pair with a tear strip for easy opening.",
    product: "folding-cartons", image: { w: 1100, h: 993 } },
  { slug: "sealend-auto-bottom-box", name: "Sealend Auto Bottom Box", category: "folding-cartons",
    summary: "A glued sealend top with an auto-lock bottom, so the carton erects instantly and is sealed after filling.",
    bestFor: ["Heavier food cartons", "Bulk retail packs", "Automated filling"],
    closure: "Glued top flaps, auto-lock bottom", material: "Grey back, SBS or E-flute",
    tip: "Use when the box is filled from the top and must carry weight.",
    product: "folding-cartons", image: { w: 1056, h: 834 } },
  { slug: "book-end-box", name: "Book End Box", category: "folding-cartons",
    summary: "Opens from the long side like a book cover, giving a large display panel and a premium reveal.",
    bestFor: ["Video and media sets", "Gift cards and sets", "Flat products"],
    closure: "Side tuck with front flap", material: "SBS card or laminated board",
    tip: "Great for products that are wide and flat.",
    product: "gift-boxes", image: { w: 1100, h: 790 } },
  { slug: "triangle-box", name: "Triangle Box", category: "folding-cartons",
    summary: "A three-sided prism carton that stands out on the shelf and suits slim products.",
    bestFor: ["Chocolate bars and sweets", "Gift items", "Promotional packs"],
    closure: "Triangle tuck ends", material: "SBS card, 300–350 gsm",
    tip: "Unusual shapes cost a little more to die-cut but grab attention.",
    product: "gift-boxes", image: { w: 599, h: 799 } },
  { slug: "hexagon-box", name: "Hexagon Box", category: "folding-cartons",
    summary: "A six-sided carton with hexagon lid and base, giving a premium, gift-like look from a single sheet.",
    bestFor: ["Candles and soaps", "Sweets and gifts", "Seasonal packaging"],
    closure: "Hexagon tuck lid and base", material: "SBS or kraft card",
    tip: "Works well with a window or foil logo on the lid.",
    product: "candle-boxes", image: { w: 853, h: 815 } },

  // ---------- mailers & shipping ----------
  { slug: "roll-end-mailer-box", name: "Roll End Tuck Front Mailer Box", category: "mailers-shipping",
    summary: "The classic e-commerce mailer. Double-wall sides fold in, and the lid tucks into the front for a strong, glue-free box with a great unboxing.",
    bestFor: ["E-commerce and subscriptions", "Apparel and accessories", "PR kits and gift boxes"],
    closure: "Lid with front tuck and side ears", material: "E-flute or B-flute corrugated, or heavy card",
    tip: "Print inside the lid for a branded reveal.",
    product: "mailer-boxes", generator: "mailer", image: { w: 753, h: 975 } },
  { slug: "mailer-box-with-tear-strip", name: "Mailer Box with Tear Strip", category: "mailers-shipping",
    summary: "A mailer with a zip tear strip and peel-and-seal tape, so the customer can open it easily and the box can be resealed for returns.",
    bestFor: ["Fashion e-commerce", "Returns-friendly shipping", "Subscription boxes"],
    closure: "Adhesive seal with tear strip", material: "E-flute or B-flute corrugated",
    tip: "Add a second adhesive strip if you want a return-ready box.",
    product: "subscription-boxes", image: { w: 908, h: 1100 } },
  { slug: "double-wall-tuck-top-box", name: "Double Wall Tuck Top Box", category: "mailers-shipping",
    summary: "Folded double walls on all sides with a tuck top lid, making a sturdy box without glue.",
    bestFor: ["Premium mailers", "Gift kits", "Heavier products"],
    closure: "Tuck top with locking double walls", material: "Heavy card or E-flute",
    tip: "Double walls give a clean edge, so the box looks rigid even in card.",
    product: "mailer-boxes", image: { w: 899, h: 1100 } },
  { slug: "full-flap-shipping-box", name: "Full Flap Shipping Box", category: "mailers-shipping",
    summary: "A regular shipping carton where the top and bottom flaps meet, closed with tape. The most economical box for shipping and storage.",
    bestFor: ["Shipping and storage", "Outer cartons", "Wholesale packs"],
    closure: "Taped flaps top and bottom", material: "B, C or BC-flute corrugated",
    tip: "Full overlap flaps add strength when stacking heavy products.",
    product: "shipping-boxes", generator: "shipping-box", image: { w: 1100, h: 485 } },
  { slug: "pizza-box", name: "Pizza Box", category: "mailers-shipping",
    summary: "A flat corrugated box with a hinged lid, front tuck and side locks, made to stay flat and stack in the oven bay.",
    bestFor: ["Pizza and flatbreads", "Cakes and pies", "Flat gift sets"],
    closure: "Lid with front tuck and locking sides", material: "E-flute or B-flute corrugated",
    tip: "Vent holes can be added for hot food.",
    product: "pizza-boxes", image: { w: 554, h: 1100 } },

  // ---------- trays & sleeves ----------
  { slug: "sleeve-and-tray", name: "Sleeve and Tray Box", category: "trays-sleeves",
    summary: "A tray that slides into an outer sleeve, like a drawer. A premium reveal from simple card.",
    bestFor: ["Gift sets", "Chocolates and sweets", "Jewellery and accessories"],
    closure: "Tray slides out of the sleeve", material: "SBS card, kraft or laminated board",
    tip: "Add a ribbon pull or thumb notch so the tray slides out easily.",
    product: "sleeve-boxes", generator: "tray", image: { w: 1100, h: 720 } },
  { slug: "double-wall-frame-tray-with-sleeve", name: "Double Wall Frame Tray with Sleeve", category: "trays-sleeves",
    summary: "A tray with folded double walls and a framed top edge, paired with a sleeve, for a thicker, more premium drawer box.",
    bestFor: ["Luxury gift sets", "Cosmetic kits", "Presentation boxes"],
    closure: "Double-wall tray in an outer sleeve", material: "Heavy SBS or laminated card",
    tip: "Looks close to a rigid drawer box at a lower cost.",
    product: "drawer-boxes", image: { w: 1100, h: 787 } },
  { slug: "four-corner-tray", name: "Four Corner Tray", category: "trays-sleeves",
    summary: "A tray glued at the four corners with a front flap or lid, quick to erect and strong for stacking.",
    bestFor: ["Bakery and pastries", "Fruit and produce", "Display trays"],
    closure: "Glued corners, optional hinged lid", material: "SBS, kraft or E-flute",
    tip: "Ships flat and pops open, saving storage space.",
    product: "bakery-boxes", image: { w: 860, h: 1018 } },
  { slug: "six-corner-tray", name: "Six Corner Tray", category: "trays-sleeves",
    summary: "A tray with a hinged lid glued at six corners, so lid and base erect together in one movement.",
    bestFor: ["Bakery and cake boxes", "Takeaway food", "Gift trays"],
    closure: "Hinged lid with tuck", material: "SBS or kraft card",
    tip: "The best choice for fast assembly on busy counters.",
    product: "bakery-boxes", image: { w: 742, h: 1100 } },
  { slug: "foot-lock-tray", name: "Foot Lock Tray", category: "trays-sleeves",
    summary: "A glue-free tray with double walls that lock into the base with small feet tabs.",
    bestFor: ["Display trays", "Shipping inner trays", "Produce"],
    closure: "Locking tabs into base slots", material: "Card or E-flute",
    tip: "No gluing needed, so it suits short runs.",
    product: "display-boxes", image: { w: 1100, h: 671 } },
  { slug: "single-wall-foot-lock-tray", name: "Single Wall Foot Lock Tray", category: "trays-sleeves",
    summary: "A lighter foot-lock tray with single walls, quick to fold and economical.",
    bestFor: ["Inner trays", "Light retail products", "Sample kits"],
    closure: "Locking tabs", material: "Card or E-flute",
    tip: "Use inside a sleeve for a budget drawer box.",
    product: "sleeve-boxes", image: { w: 772, h: 550 } },
  { slug: "reinforced-wall-tray", name: "Tray with Reinforced Side Walls", category: "trays-sleeves",
    summary: "A tray whose side walls fold over twice for extra strength and a clean top edge.",
    bestFor: ["Heavier products", "Stacking trays", "Premium presentation"],
    closure: "Folded double side walls", material: "Card or corrugated",
    tip: "Strong enough to carry jars and bottles.",
    product: "display-boxes", image: { w: 599, h: 603 } },
  { slug: "auto-bottom-tray", name: "Auto Bottom Tray", category: "trays-sleeves",
    summary: "An open tray with a crash-lock base that erects instantly, used as a display or inner tray.",
    bestFor: ["Counter displays", "Inner trays", "Fast assembly"],
    closure: "Auto-lock base, open top", material: "SBS or E-flute",
    tip: "Add a header panel for a counter display.",
    product: "display-boxes", image: { w: 1083, h: 369 } },
  { slug: "bowl-sleeve", name: "Bowl Sleeve", category: "trays-sleeves",
    summary: "A printed wrap that slides around a bowl or tub, branding plain containers at low cost.",
    bestFor: ["Ready meals and salads", "Noodle and rice bowls", "Dessert tubs"],
    closure: "Glued sleeve", material: "SBS or kraft card",
    tip: "One sleeve design can brand several container sizes.",
    product: "food-packaging", image: { w: 906, h: 304 } },

  // ---------- food ----------
  { slug: "food-tray", name: "Food Tray", category: "food",
    summary: "An open tray with angled corners for serving and carrying food.",
    bestFor: ["Fries and snacks", "Street food", "Events and catering"],
    closure: "Open tray, locked corners", material: "SBS or kraft card",
    tip: "Ask for a grease-resistant coating for oily food.",
    product: "food-packaging", image: { w: 810, h: 680 } },
  { slug: "french-fries-box", name: "French Fries Box", category: "food",
    summary: "A scoop-shaped fries holder with a curved front, easy to fill and eat from.",
    bestFor: ["Fries and chips", "Snacks", "Fast food"],
    closure: "Glued side seam, open top", material: "SBS or kraft card",
    tip: "Bright full-colour print makes small packs very visible.",
    product: "food-packaging", image: { w: 477, h: 657 } },
  { slug: "popcorn-box", name: "Popcorn Box", category: "food",
    summary: "A tapered popcorn holder with a scalloped top edge, from a single sheet.",
    bestFor: ["Popcorn", "Cinemas and events", "Party treats"],
    closure: "Glued seam with locking base", material: "SBS card",
    tip: "Works well with bold stripes or full-bleed artwork.",
    product: "food-packaging", image: { w: 783, h: 619 } },
  { slug: "self-lock-cake-box", name: "Self Lock Cake Box", category: "food",
    summary: "A cake and pastry box that folds and locks without glue, with a hinged lid.",
    bestFor: ["Cakes and pastries", "Cupcakes", "Bakery takeaway"],
    closure: "Locking side tabs, hinged lid", material: "SBS or kraft card",
    tip: "Add a window to show the cake.",
    product: "cake-boxes", image: { w: 565, h: 826 } },
  { slug: "gable-box", name: "Gable Box", category: "food",
    summary: "A box with a built-in carry handle at the top, easy to carry and eye-catching.",
    bestFor: ["Bakery and takeaway", "Party favours", "Gift packs"],
    closure: "Interlocking gable handle, auto bottom", material: "SBS or kraft card",
    tip: "Great for takeaway food and kids' meal packs.",
    product: "gable-boxes", image: { w: 723, h: 642 } },
  { slug: "gable-box-with-hanger", name: "Gable Box with Hanger", category: "food",
    summary: "A gable carry box with a hang hole on the handle, so it can be carried or hung on retail pegs.",
    bestFor: ["Retail gift packs", "Seasonal products", "Snack packs"],
    closure: "Gable handle with hang slot", material: "SBS or kraft card",
    tip: "Doubles as a shelf display and a carry box.",
    product: "gable-boxes", image: { w: 864, h: 780 } },
  { slug: "pillow-box", name: "Pillow Box", category: "food",
    summary: "A curved box with pillow-shaped ends that close by pressing in, from a single sheet with one glue seam.",
    bestFor: ["Gift cards and jewellery", "Sweets and favours", "Small accessories"],
    closure: "Curved press-in ends", material: "SBS, kraft or metallic card",
    tip: "Elegant for small items and very cheap to produce.",
    product: "pillow-boxes", generator: "pillow", image: { w: 569, h: 442 } },
  { slug: "paper-bag", name: "Paper Bag", category: "food",
    summary: "A printed paper carrier bag with gusseted sides, a folded base and handle holes.",
    bestFor: ["Retail carrier bags", "Takeaway", "Events and gifts"],
    closure: "Gusseted sides and glued base", material: "Kraft or art paper, 120–250 gsm",
    tip: "Choose rope or twisted paper handles for a premium feel.",
    product: "paper-bags", image: { w: 1010, h: 676 } },

  // ---------- displays ----------
  { slug: "counter-display-box", name: "Counter Display Box", category: "displays",
    summary: "A counter-top display with angled side wings and a tall header, putting products right at the till.",
    bestFor: ["Impulse products", "Cosmetics and lip balms", "Snacks and sweets"],
    closure: "Auto-lock base with header panel", material: "SBS or E-flute",
    tip: "Make the header panel the main brand message.",
    product: "display-boxes", image: { w: 801, h: 1100 } },
  { slug: "auto-bottom-display-box", name: "Display Box with Auto Bottom", category: "displays",
    summary: "A shipper that turns into a display: tear or fold the lid back and the box becomes a shelf display.",
    bestFor: ["Retail shelf displays", "Multi-unit packs", "Point of sale"],
    closure: "Auto bottom with tear-off lid", material: "SBS or E-flute",
    tip: "Ships products and displays them with one box.",
    product: "display-boxes", image: { w: 1100, h: 703 } },
  { slug: "display-box-with-lid", name: "1-2-3 Bottom Display Box with Lid", category: "displays",
    summary: "A display tray with a snap-lock bottom and a lid that folds back to become the display header.",
    bestFor: ["Shelf-ready packs", "Counter displays", "Sample packs"],
    closure: "1-2-3 bottom, fold-back lid", material: "SBS or E-flute",
    tip: "Ideal when the same box is used for shipping and display.",
    product: "display-boxes", image: { w: 888, h: 615 } },
  { slug: "dispenser-box", name: "Dispenser Box", category: "displays",
    summary: "A box with a dispensing opening at the bottom front, so products can be pulled out one at a time.",
    bestFor: ["Tea bags and sachets", "Gloves and wipes", "Single-serve items"],
    closure: "Tuck top with front dispenser", material: "SBS or kraft card",
    tip: "Add a perforated opening for a first-use reveal.",
    product: "display-boxes", image: { w: 853, h: 1025 } },
  { slug: "five-panel-hanger-box", name: "Five Panel Hanger Box", category: "displays",
    summary: "A tuck end box with an extra panel and hang hole, so it can hang on retail pegs.",
    bestFor: ["Peg-hung retail", "Accessories and electronics", "Hardware"],
    closure: "Tuck ends with hanger panel", material: "SBS card",
    tip: "The hanger panel is a free space for branding.",
    product: "hang-tab-boxes", image: { w: 899, h: 937 } },

  // ---------- rigid & gift ----------
  { slug: "two-piece-rigid-box", name: "Two Piece Rigid Box", category: "rigid-gift",
    summary: "A lid-and-base rigid box made from grey board wrapped in printed or specialty paper, the classic premium gift box.",
    bestFor: ["Luxury gifts", "Perfume and jewellery", "Premium apparel"],
    closure: "Separate lid and base", material: "1–3 mm grey board with wrap paper",
    tip: "Pair with a foam or card insert to hold the product.",
    product: "two-piece-rigid-boxes", image: { w: 1100, h: 574 } },
  { slug: "two-piece-card-box", name: "Two Piece Card Box", category: "rigid-gift",
    summary: "A lid and base folded from card with locking corners, giving a rigid-box look at a lower cost.",
    bestFor: ["Gift boxes", "Apparel", "Stationery sets"],
    closure: "Separate folded lid and base", material: "Heavy SBS or kraft card",
    tip: "Ships flat, unlike rigid boxes.",
    product: "gift-boxes", image: { w: 1100, h: 583 } },
  { slug: "magnetic-closure-box", name: "Magnetic Closure Box", category: "rigid-gift",
    summary: "A rigid book-style box with a hidden magnet in the flap, for a satisfying premium close.",
    bestFor: ["Luxury gifts", "Cosmetics sets", "Electronics and accessories"],
    closure: "Hinged lid with magnets", material: "Grey board wrapped in printed paper",
    tip: "Add foil or emboss on the lid for a high-end look.",
    product: "magnetic-boxes", image: { w: 1100, h: 822 } },
  { slug: "collapsible-magnetic-box", name: "Collapsible Magnetic Box", category: "rigid-gift",
    summary: "A magnetic rigid box that folds flat for shipping and storage, then pops up into a rigid box.",
    bestFor: ["Premium e-commerce", "Gift boxes shipped long distance", "Storage-friendly luxury"],
    closure: "Magnetic lid, folding sides", material: "Grey board with wrap paper",
    tip: "Cuts shipping volume by up to 70% compared with a fixed rigid box.",
    product: "magnetic-boxes", image: { w: 746, h: 1100 } },
  { slug: "double-wall-lock-lid-box", name: "Double Wall Lock Lid Box", category: "rigid-gift",
    summary: "A card box with double walls and a locking lid, sturdy and neat without glue.",
    bestFor: ["Gift boxes", "Small kits", "Premium mailers"],
    closure: "Lid with locking tabs", material: "Heavy SBS or kraft card",
    tip: "Folded walls give smooth edges on all sides.",
    product: "gift-boxes", image: { w: 535, h: 741 } },
  { slug: "half-circle-interlocking-box", name: "Half Circle Interlocking Box", category: "rigid-gift",
    summary: "Four rounded flaps interlock at the top to close the box, no glue or tape needed.",
    bestFor: ["Gift and favour boxes", "Sweets", "Small products"],
    closure: "Interlocking rounded flaps", material: "SBS or kraft card",
    tip: "A decorative closure that customers remember.",
    product: "gift-boxes", image: { w: 723, h: 757 } },
  { slug: "paper-briefcase-box", name: "Paper Briefcase Box", category: "rigid-gift",
    summary: "A carry box shaped like a briefcase, with a handle cut-out and locking top.",
    bestFor: ["Gift sets", "Kids' packs", "Promotional kits"],
    closure: "Locking top with handle", material: "SBS or kraft card",
    tip: "Popular for festive and corporate gift packs.",
    product: "gift-boxes", image: { w: 634, h: 680 } },

  // ---------- inserts ----------
  { slug: "punch-insert", name: "Punch Insert", category: "inserts",
    summary: "A card insert with die-cut holes that hold bottles, jars or cupcakes upright inside a box.",
    bestFor: ["Cupcakes", "Bottles and vials", "Candle sets"],
    closure: "Folds into the box", material: "SBS card or E-flute",
    tip: "Send the exact product diameter so the holes fit snugly.",
    product: "cupcake-boxes", image: { w: 818, h: 569 } },
  { slug: "fence-partition", name: "Fence Partition", category: "inserts",
    summary: "Slotted card strips that slot together into a grid, separating products inside a carton.",
    bestFor: ["Bottles and glass", "Multi-pack shipping", "Fragile items"],
    closure: "Slotted strips", material: "Card or corrugated",
    tip: "Protects glass products from touching in transit.",
    product: "shipping-boxes", image: { w: 1100, h: 180 } },

  // ---------- print & folders ----------
  { slug: "presentation-folder", name: "Presentation Folder", category: "print-folders",
    summary: "A printed folder with pockets that holds documents, brochures and business cards.",
    bestFor: ["Company profiles", "Sales kits", "Events"],
    closure: "Folding pockets", material: "Art card, 300–350 gsm",
    tip: "Add a business card slot on the pocket.",
    product: "brochures", image: { w: 922, h: 838 } },
  { slug: "header-card", name: "Header Card", category: "print-folders",
    summary: "A folded card that staples over a poly bag, with a hang hole for retail pegs.",
    bestFor: ["Bagged accessories", "Socks and small apparel", "Hardware"],
    closure: "Folded over bag and stapled", material: "Art or SBS card",
    tip: "A cheap way to brand plain polybags.",
    product: "hang-tags", image: { w: 542, h: 496 } },
  { slug: "door-hanger", name: "Door Hanger", category: "print-folders",
    summary: "A die-cut card with a round hole that hangs on door handles.",
    bestFor: ["Hotels", "Local marketing", "Events"],
    closure: "Hang slot", material: "Art card, 300–400 gsm",
    tip: "Two-sided print doubles the message space.",
    product: "postcards", image: { w: 480, h: 603 } },
  { slug: "disc-folder", name: "Disc Folder", category: "print-folders",
    summary: "A simple folded card sleeve for a disc or card.",
    bestFor: ["Gift cards", "Media", "Inserts"],
    closure: "Folded flap", material: "Art or SBS card",
    tip: "Also works as a gift card holder.",
    product: "thank-you-cards", image: { w: 400, h: 673 } },
  { slug: "economy-disc-folder", name: "Economy Disc Folder", category: "print-folders",
    summary: "A low-cost folded sleeve with locking flaps.",
    bestFor: ["Media and promo", "Gift cards", "Inserts"],
    closure: "Folded locking flaps", material: "Art card",
    tip: "Economical for large promotional runs.",
    product: "thank-you-cards", image: { w: 914, h: 335 } },
  { slug: "four-panel-cd-jacket", name: "Four Panel Jacket", category: "print-folders",
    summary: "A four-panel folding jacket with a pocket, giving three panels for artwork and text.",
    bestFor: ["Media packs", "Booklets and inserts", "Invitations"],
    closure: "Folding panels with pocket", material: "Art card",
    tip: "Good for invitations with an insert.",
    product: "invitation-cards", image: { w: 906, h: 335 } },
];

// ---------- dielines added from the admin panel ----------
type CmsDieline = {
  name?: string; slug?: string; category?: string; image?: string; file?: string; summary?: string;
  bestFor?: string[]; closure?: string; material?: string; tip?: string; product?: string;
  draft?: boolean; addedAt?: string;
};

function readCmsDielines(): Dieline[] {
  const dir = path.join(process.cwd(), "content", "dielines");
  if (!fs.existsSync(dir)) return [];
  const known = new Set(builtInDielines.map((d) => d.slug));
  const ids = new Set(dielineCategories.map((c) => c.id));
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      try { return JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")) as CmsDieline; } catch { return null; }
    })
    .filter((d): d is CmsDieline => Boolean(d && !d.draft && d.slug && d.name && (d.image || /\.pdf$/i.test(d.file || "")) && d.summary && !known.has(d.slug)))
    .sort((a, b) => String(b.addedAt || "").localeCompare(String(a.addedAt || "")))
    .map((d) => ({
      slug: d.slug!,
      name: d.name!,
      category: (ids.has(d.category as DielineCategory) ? d.category : "folding-cartons") as DielineCategory,
      summary: d.summary!,
      bestFor: (d.bestFor || []).filter(Boolean).slice(0, 6),
      closure: d.closure || "See dieline",
      material: d.material || "Card or corrugated, chosen for your product",
      tip: d.tip || "Send us your product size and we draw this dieline to fit, free with your quote.",
      product: d.product || undefined,
      image: { w: 1000, h: 1000 },
      src: d.image || undefined,
      file: d.file || undefined,
      addedAt: d.addedAt,
    }));
}

export const dielines: Dieline[] = [...builtInDielines, ...readCmsDielines()];

export const dielineCount = dielines.length;

export function dielineImage(d: Dieline) {
  if (d.src) return d.src;
  // admin entries with only a PDF are drawn in the browser; this is the share image
  return d.addedAt ? "/images/dielines/reverse-tuck-end.webp" : `/images/dielines/${d.slug}.webp`;
}

// Admin entry with a PDF but no picture: show the PDF itself
export function showsPdf(d: Dieline) {
  return !d.src && Boolean(d.addedAt) && /\.pdf$/i.test(d.file || "");
}

export function getDielineBySlug(slug: string) {
  return dielines.find((d) => d.slug === slug);
}

export function getCategoryName(id: DielineCategory) {
  return dielineCategories.find((c) => c.id === id)?.name ?? "";
}

// Long-form buyer guides for individual box styles. Each guide becomes a
// product page (see data/products.ts) with size charts, board specs, cost
// drivers and style-specific FAQs rendered by components/StyleGuideSections.

export type StyleGuide = {
  slug: string;
  name: string;
  // Existing product whose photos and category this style belongs to
  parent: string;
  category: string;
  tagline: string;
  description: string;
  keywords: string[];
  industries: string[];
  intro: string[];
  sizeNote: string;
  sizes: { name: string; inches: string; mm: string; bestFor: string }[];
  boardsTitle: string;
  boards: { name: string; spec: string; bestFor: string }[];
  printing: { title: string; text: string }[];
  costFactors: { title: string; text: string }[];
  savingTips: string[];
  compare: { option: string; chooseIf: string }[];
  checklist: string[];
  faqs: { question: string; answer: string }[];
  related: string[];
};

const mailerSizes = [
  { name: "Small accessories", inches: '6 x 4 x 2"', mm: "152 x 102 x 51 mm", bestFor: "Jewelry, cosmetics minis, cards" },
  { name: "Beauty & skincare set", inches: '8 x 6 x 2"', mm: "203 x 152 x 51 mm", bestFor: "2-3 bottles, sample kits" },
  { name: "Standard ecommerce", inches: '9 x 6 x 3"', mm: "229 x 152 x 76 mm", bestFor: "Candles, supplements, small gifts" },
  { name: "Folded apparel", inches: '10 x 8 x 4"', mm: "254 x 203 x 102 mm", bestFor: "T-shirts, socks bundles, gift sets" },
  { name: "Flat apparel", inches: '12 x 9 x 3"', mm: "305 x 229 x 76 mm", bestFor: "Shirts, hoodies, books" },
  { name: "Subscription box", inches: '12 x 10 x 4"', mm: "305 x 254 x 102 mm", bestFor: "Monthly boxes, curated kits" },
  { name: "Large bundle", inches: '14 x 10 x 4"', mm: "356 x 254 x 102 mm", bestFor: "Multi-item orders, shoes" },
  { name: "Oversized", inches: '16 x 12 x 4"', mm: "406 x 305 x 102 mm", bestFor: "Bedding, jackets, large kits" },
];

const corrugatedBoards = [
  { name: "F-flute (micro flute)", spec: "about 0.8 mm", bestFor: "Light retail mailers under 0.5 kg, sharpest print" },
  { name: "E-flute", spec: "about 1.1–1.6 mm", bestFor: "Most ecommerce mailers up to about 2–3 kg" },
  { name: "B-flute", spec: "about 2.5–3 mm", bestFor: "Heavier or fragile items, courier-heavy routes" },
  { name: "E/B double wall", spec: "about 4–4.5 mm", bestFor: "Glass, ceramics and high-value shipments" },
];

const mailerCompare = [
  { option: "Mailer box (roll end tuck front)", chooseIf: "You want a premium unboxing and the box ships on its own" },
  { option: "Shipping box (regular slotted)", chooseIf: "You pack several items and want the lowest cost per box" },
  { option: "Folding carton", chooseIf: "The product sits on a shelf and ships inside an outer carton" },
  { option: "Rigid box", chooseIf: "The box itself is part of a luxury gift and ships inside a mailer" },
];

const mailerChecklist = [
  "Measure the product (or the product in its inner packaging) and add 3–5 mm clearance on each side",
  "Give us inside dimensions as Length x Width x Depth",
  "Tell us the packed weight so we can pick the right flute",
  "Decide outside only, inside only, or inside + outside print",
  "Share logo files as AI, PDF or SVG (vector) and brand colours as Pantone or CMYK",
  "Say if you need inserts, dividers or tissue with the box",
  "Tell us the delivery country and target date",
];

export const styleGuides: StyleGuide[] = [
  {
    slug: "kraft-mailer-boxes",
    name: "Kraft Mailer Boxes",
    parent: "mailer-boxes",
    category: "Corrugated Packaging",
    tagline: "Natural brown corrugated mailers with your brand printed on",
    description:
      "Custom kraft mailer boxes made from brown corrugated board, printed with your logo inside or out. A natural, eco-minded look for ecommerce, subscription and gift brands, with free dieline support, MOQ from 100 boxes and 12–15 business day production.",
    keywords: ["kraft mailer boxes", "custom kraft mailer boxes", "brown mailer boxes", "eco friendly mailer boxes", "kraft shipping boxes with logo", "printed kraft mailers"],
    industries: ["Ecommerce", "Apparel", "Candles", "Organic Food", "Subscription Boxes"],
    intro: [
      "Kraft mailer boxes use corrugated board with an unbleached brown outer liner. The natural fibre colour gives an honest, eco-conscious look that suits organic, handmade, apparel and lifestyle brands, and it hides the scuffs a box picks up in the post better than white board does.",
      "Because the brown liner is not bleached, ink sits on a tan background. Dark inks such as black, navy or deep green print crisply, while light colours look softer. For a bold light logo we can print an opaque white base first, or keep the outside plain and print the inside in full colour for a reveal when the customer opens the box.",
      "Every kraft mailer is made to your inside dimensions, so the product does not rattle and you do not pay to ship air. Boxes are delivered flat and fold into shape without tape or glue.",
    ],
    sizeNote: "Popular stock-like sizes we make often. Any custom size is possible — quote your inside Length x Width x Depth.",
    sizes: mailerSizes,
    boardsTitle: "Kraft corrugated board options",
    boards: corrugatedBoards,
    printing: [
      { title: "One or two colour logo", text: "The most economical way to brand kraft. A single dark ink logo on the lid gives a clean, premium look." },
      { title: "CMYK on kraft", text: "Full colour prints well but colours read warmer and slightly muted on brown. Ask for a digital proof to see the effect." },
      { title: "White ink base", text: "An opaque white layer under colours keeps light and bright artwork true on kraft." },
      { title: "Inside print", text: "Print the inside in full colour or a pattern while keeping the outside plain kraft for a surprise unboxing." },
    ],
    costFactors: [
      { title: "Quantity", text: "Set-up cost is shared across the run, so the price per box drops sharply as quantity rises." },
      { title: "Box size and board", text: "Larger boxes and thicker flutes use more board. Choosing E-flute over B-flute where the weight allows saves money." },
      { title: "Print coverage", text: "A small logo costs less than full-coverage artwork; printing both inside and outside adds a second pass." },
      { title: "Ink colours", text: "One or two spot colours are cheaper than CMYK plus white base." },
      { title: "Add-ons", text: "Inserts, tissue, stickers and special finishes each add to the unit price." },
    ],
    savingTips: [
      "Use a standard size from the chart above if it fits your product",
      "Start with a one-colour logo outside and add inside print later",
      "Choose E-flute unless the packed item is heavy or fragile",
      "Order a larger run — the per-box price falls quickly with quantity",
    ],
    compare: mailerCompare,
    checklist: mailerChecklist,
    faqs: [
      { question: "Are kraft mailer boxes recyclable?", answer: "Yes. Kraft corrugated board is widely recyclable and can be made with recycled content. Avoid plastic lamination if you want the box to stay fully recyclable." },
      { question: "Can you print white or bright colours on kraft?", answer: "Yes. We print an opaque white ink base first so light colours stay bright. Without it, light colours look softer on the brown liner." },
      { question: "What is the minimum order for kraft mailer boxes?", answer: "Our minimum order starts from 100 boxes. The price per box falls as the quantity increases." },
      { question: "How long does production take?", answer: "Standard production is 12–15 business days after you approve the digital proof, plus shipping time to your country." },
      { question: "Which flute should I choose for kraft mailers?", answer: "E-flute suits most ecommerce products up to about 2–3 kg. Choose B-flute or double wall for heavy, fragile or high-value items." },
      { question: "Can I get a sample before the bulk order?", answer: "Yes. We share a free digital proof for every order and a free sample kit on orders of 10,000+ units." },
    ],
    related: ["mailer-boxes", "black-mailer-boxes", "white-mailer-boxes", "shipping-boxes", "subscription-boxes"],
  },
  {
    slug: "black-mailer-boxes",
    name: "Black Mailer Boxes",
    parent: "mailer-boxes",
    category: "Corrugated Packaging",
    tagline: "Bold black mailers for premium ecommerce unboxing",
    description:
      "Custom black mailer boxes with a deep black finish and your logo in white, foil or spot UV. Made to size in E-flute or B-flute corrugated board, MOQ from 100 boxes, free dieline support and 12–15 business day production.",
    keywords: ["black mailer boxes", "custom black mailer boxes", "black shipping boxes", "black boxes with logo", "matte black mailer boxes", "luxury mailer boxes"],
    industries: ["Fashion", "Cosmetics", "Tech Accessories", "Luxury Gifts", "Subscription Boxes"],
    intro: [
      "Black mailer boxes make a strong first impression. A deep black outside instantly reads as premium, which is why fashion, beauty, tech accessory and luxury gift brands use them for ecommerce orders and PR kits.",
      "There are two ways to get a black mailer: board with a black outer liner, or white board fully flood-printed black. Flood printing gives the richest, most even black and lets us add a matte or soft-touch lamination on top. Because black shows scuffs and fingerprints, we recommend an anti-scratch matte lamination for boxes that travel through courier networks.",
      "Logos look best in contrasting treatments: white ink, gold or silver foil, or spot UV gloss on a matte black surface. The inside can stay black, or be printed in a brand colour for a bright reveal.",
    ],
    sizeNote: "Common sizes for black mailers. We make every box to your inside dimensions.",
    sizes: mailerSizes,
    boardsTitle: "Board options for black mailers",
    boards: corrugatedBoards,
    printing: [
      { title: "Full black flood print", text: "The richest black finish, printed over white board and sealed with lamination." },
      { title: "White ink logo", text: "Crisp and economical contrast for text and logos on black." },
      { title: "Gold, silver or holographic foil", text: "Metallic foil stamping for a luxury logo that catches the light." },
      { title: "Spot UV on matte black", text: "A gloss logo on a matte box — subtle, tactile and premium." },
    ],
    costFactors: [
      { title: "Flood printing", text: "Covering the whole box in black uses more ink than a logo-only box." },
      { title: "Lamination", text: "Matte, soft-touch or anti-scratch lamination protects the black but adds a finishing step." },
      { title: "Foil and spot UV", text: "Each special finish needs its own die or plate and adds to set-up cost." },
      { title: "Quantity", text: "Set-up costs are spread across the run, so larger orders cost less per box." },
      { title: "Size and board", text: "Bigger boxes and thicker flutes use more material." },
    ],
    savingTips: [
      "Use white ink for the logo instead of foil on your first order",
      "Laminate only the outside and keep the inside plain",
      "Keep one standard size across several products where possible",
    ],
    compare: mailerCompare,
    checklist: mailerChecklist,
    faqs: [
      { question: "Do black mailer boxes scratch easily?", answer: "Unprotected black print can show scuffs. We recommend anti-scratch matte lamination for black mailers that ship through courier networks." },
      { question: "What logo finishes work best on black?", answer: "White ink, gold or silver foil and spot UV on matte black all give strong contrast. Foil gives the most premium look." },
      { question: "Can the inside be a different colour?", answer: "Yes. Many brands print the inside in a bright brand colour or pattern so the box reveals a surprise when opened." },
      { question: "What is the minimum order?", answer: "Black mailer boxes start from 100 boxes, with lower unit prices at higher quantities." },
      { question: "How long does production take?", answer: "12–15 business days after proof approval, plus shipping." },
    ],
    related: ["mailer-boxes", "kraft-mailer-boxes", "white-mailer-boxes", "subscription-boxes", "rigid-boxes"],
  },
  {
    slug: "white-mailer-boxes",
    name: "White Mailer Boxes",
    parent: "mailer-boxes",
    category: "Corrugated Packaging",
    tagline: "Clean white mailers that make full-colour print pop",
    description:
      "Custom white mailer boxes with a bright white outer liner for vivid full-colour CMYK printing. Ideal for beauty, wellness, kids and lifestyle brands. MOQ from 100 boxes, free dieline and digital proof, 12–15 business day production.",
    keywords: ["white mailer boxes", "custom white mailer boxes", "white shipping boxes", "printed white mailers", "white corrugated boxes with logo"],
    industries: ["Beauty", "Wellness", "Baby & Kids", "Lifestyle", "Ecommerce"],
    intro: [
      "White mailer boxes use corrugated board with a bright white outer liner. The white base lets colours print exactly as designed, which makes them the best choice for full-colour artwork, photography and bright brand palettes.",
      "White board can show dirt and courier marks more than kraft or black. A light aqueous coating or gloss/matte lamination keeps the surface cleaner and adds a finished feel. For a minimal look, a single logo on plain white board is also very popular with skincare and wellness brands.",
      "Like all our mailers, white mailer boxes are made to your inside dimensions, shipped flat, and fold together without tape or glue.",
    ],
    sizeNote: "Common white mailer sizes. Any custom size is available.",
    sizes: mailerSizes,
    boardsTitle: "White corrugated board options",
    boards: corrugatedBoards,
    printing: [
      { title: "Full-colour CMYK", text: "Photos, gradients and multi-colour designs print true on a white base." },
      { title: "Pantone brand colours", text: "Spot colours for exact brand matching across every order." },
      { title: "Inside + outside", text: "Print a message or pattern inside the lid for the unboxing moment." },
      { title: "Coating or lamination", text: "Aqueous coating, gloss or matte lamination to protect the white surface." },
    ],
    costFactors: [
      { title: "Print coverage", text: "Full-coverage artwork costs more than a single logo on white." },
      { title: "Sides printed", text: "Printing inside as well as outside adds a second print pass." },
      { title: "Coating", text: "Lamination adds cost; aqueous coating is a lighter-cost protective option." },
      { title: "Quantity and size", text: "Larger runs lower the unit price; larger boxes use more board." },
    ],
    savingTips: [
      "A single logo on white is the most economical premium look",
      "Use aqueous coating instead of lamination where scuff risk is low",
      "Stick to CMYK unless an exact Pantone match is essential",
    ],
    compare: mailerCompare,
    checklist: mailerChecklist,
    faqs: [
      { question: "Do white mailer boxes get dirty in shipping?", answer: "They can show marks more than kraft. A coating or lamination helps keep them clean, and many brands ship them inside an outer carton for wholesale orders." },
      { question: "Can you match my brand colours exactly?", answer: "Yes. We can print Pantone spot colours for exact brand matching, or CMYK for full-colour artwork." },
      { question: "What is the minimum order?", answer: "From 100 boxes, with the unit price falling as quantity increases." },
      { question: "How long does production take?", answer: "12–15 business days after proof approval, plus shipping to your country." },
      { question: "Do I get a proof before printing?", answer: "Yes. Every order gets a free digital proof, and a free sample kit is included on orders of 10,000+ units." },
    ],
    related: ["mailer-boxes", "kraft-mailer-boxes", "black-mailer-boxes", "subscription-boxes", "cosmetic-boxes"],
  },
  {
    slug: "shipping-boxes",
    name: "Shipping Boxes",
    parent: "mailer-boxes",
    category: "Corrugated Packaging",
    tagline: "Custom printed corrugated shipping boxes sized to your products",
    description:
      "Custom shipping boxes in single and double wall corrugated board, printed with your logo and sized to cut dimensional-weight costs. MOQ from 100 boxes, free dieline support and 12–15 business day production for USA, UK, EU and UAE brands.",
    keywords: ["custom shipping boxes", "printed shipping boxes", "corrugated shipping boxes", "custom boxes for shipping", "shipping boxes with logo", "custom corrugated boxes"],
    industries: ["Ecommerce", "Wholesale", "Home & Kitchen", "Electronics", "Fulfilment"],
    intro: [
      "Custom shipping boxes are the workhorse of ecommerce and wholesale. Most are made as a regular slotted container (RSC): four top and four bottom flaps that close with tape. They are the most board-efficient box design, which keeps the cost per box low even with printing.",
      "Sizing matters more for shipping boxes than for any other style. Couriers such as UPS and FedEx charge by dimensional weight — for US domestic daily rates they commonly divide length x width x height in inches by 139. A box that is even an inch too large on each side can push a parcel into a higher price bracket, so right-sized boxes save money on every shipment.",
      "We print shipping boxes with your logo, handling marks, website or QR code, in one or two colours for the lowest cost, or full colour for retail-ready cartons.",
    ],
    sizeNote: "Sizes buyers often start from. We recommend sizing to your product plus packing material to control dimensional weight.",
    sizes: [
      { name: "Small parcel", inches: '8 x 6 x 4"', mm: "203 x 152 x 102 mm", bestFor: "Single products, accessories" },
      { name: "Medium cube", inches: '10 x 10 x 10"', mm: "254 x 254 x 254 mm", bestFor: "Bundles, home goods" },
      { name: "Long box", inches: '18 x 6 x 6"', mm: "457 x 152 x 152 mm", bestFor: "Bottles, tubes, tools" },
      { name: "Standard carton", inches: '12 x 12 x 8"', mm: "305 x 305 x 203 mm", bestFor: "Multiple items, refills" },
      { name: "Large carton", inches: '16 x 12 x 12"', mm: "406 x 305 x 305 mm", bestFor: "Wholesale packs, bulky items" },
      { name: "Moving / bulk", inches: '18 x 18 x 16"', mm: "457 x 457 x 406 mm", bestFor: "Bulk and master cartons" },
    ],
    boardsTitle: "Single and double wall options",
    boards: [
      { name: "E-flute single wall", spec: "about 1.1–1.6 mm", bestFor: "Light parcels up to about 2–3 kg" },
      { name: "B-flute single wall", spec: "about 2.5–3 mm", bestFor: "General shipping up to about 10 kg" },
      { name: "C-flute single wall", spec: "about 3.5–4 mm", bestFor: "Stacking strength for warehouse storage" },
      { name: "BC double wall", spec: "about 6–7 mm", bestFor: "Heavy, fragile or palletised shipments" },
    ],
    printing: [
      { title: "One-colour flexo", text: "The most economical way to brand shipping boxes — a bold logo on kraft or white." },
      { title: "Handling marks", text: "This way up, fragile and recycling symbols printed in place of stickers." },
      { title: "QR code or website", text: "Drive repeat orders by printing a QR code or offer inside the box." },
      { title: "Full colour", text: "Retail-ready printed cartons for display or premium DTC shipments." },
    ],
    costFactors: [
      { title: "Board grade", text: "Double wall costs more than single wall; choose it only for heavy or fragile goods." },
      { title: "Size", text: "Board area is the biggest material cost. Right-sizing saves on both the box and shipping." },
      { title: "Print colours", text: "One or two colours cost far less than full colour on shipping boxes." },
      { title: "Quantity", text: "Higher quantities spread set-up and lower the unit price." },
    ],
    savingTips: [
      "Size the box to the product to reduce dimensional-weight charges",
      "Use single wall unless the contents are heavy or fragile",
      "Print one colour on kraft for the lowest branded cost",
      "Standardise on two or three sizes for your whole catalogue",
    ],
    compare: mailerCompare,
    checklist: [
      "Measure the product including any inner packaging or void fill",
      "Give inside dimensions as Length x Width x Height",
      "Tell us the packed weight and whether boxes are stacked or palletised",
      "Choose the print: logo, handling marks, QR code or full colour",
      "Share the delivery country and quantity per size",
    ],
    faqs: [
      { question: "What is dimensional weight?", answer: "Couriers charge by the larger of actual weight or dimensional weight. For many US domestic services, dimensional weight is length x width x height in inches divided by 139. Right-sized boxes keep this number low." },
      { question: "Single wall or double wall?", answer: "Single wall suits most ecommerce parcels. Double wall is for heavy, fragile or palletised shipments where extra crush strength is needed." },
      { question: "Can you print on the inside?", answer: "Yes. Inside printing is popular for thank-you messages, offers and QR codes." },
      { question: "What is the minimum order?", answer: "From 100 boxes per size, with lower prices at higher quantities." },
      { question: "How long does production take?", answer: "12–15 business days after proof approval, plus freight." },
    ],
    related: ["mailer-boxes", "kraft-mailer-boxes", "subscription-boxes", "display-boxes", "kraft-boxes"],
  },
  {
    slug: "subscription-boxes",
    name: "Subscription Boxes",
    parent: "mailer-boxes",
    category: "Corrugated Packaging",
    tagline: "Custom subscription boxes built for a repeat unboxing moment",
    description:
      "Custom subscription boxes with inside and outside printing, inserts and consistent colour for every monthly or quarterly drop. MOQ from 100 boxes, free design and dieline support, 12–15 business day production.",
    keywords: ["custom subscription boxes", "subscription box packaging", "monthly subscription boxes", "printed subscription boxes", "subscription mailer boxes"],
    industries: ["Beauty", "Snacks", "Books", "Pet Products", "Wellness"],
    intro: [
      "A subscription box is opened every month by the same customer, so the packaging carries your brand more than any one product inside. Most subscription boxes are custom mailer boxes: they ship on their own, open like a present and protect the contents in transit.",
      "The best subscription boxes are designed for the reveal. Printing the inside of the lid with a message, pattern or social handle turns each delivery into a shareable unboxing moment. Die-cut inserts hold items in place so the box arrives looking exactly as you packed it.",
      "Because you reorder regularly, colour consistency matters. We keep your approved dieline, colour references and specifications on file so repeat orders match the previous run.",
    ],
    sizeNote: "Typical subscription box sizes. We size to your largest planned box contents.",
    sizes: mailerSizes.slice(1, 7),
    boardsTitle: "Board options for subscription boxes",
    boards: corrugatedBoards,
    printing: [
      { title: "Inside lid message", text: "Welcome notes, social handles or a monthly theme printed inside the lid." },
      { title: "Seasonal sleeves or stickers", text: "Keep one box design and change a sleeve or sticker for each edition." },
      { title: "Die-cut inserts", text: "Card or corrugated inserts that hold each item in place." },
      { title: "Full-colour outside", text: "Bold branded outside printing for social-media-ready unboxing." },
    ],
    costFactors: [
      { title: "Inserts", text: "Custom inserts add material and die-cutting, but protect items and improve presentation." },
      { title: "Inside + outside print", text: "Two-sided printing costs more than outside only." },
      { title: "Order rhythm", text: "Ordering a quarter or half-year of boxes at once lowers the unit price." },
      { title: "Size", text: "Designing one size that fits every edition avoids multiple set-ups." },
    ],
    savingTips: [
      "Design one standard box and change a sleeve or sticker each month",
      "Order several months of boxes in one production run",
      "Use a shared insert layout that fits most of your product mix",
    ],
    compare: mailerCompare,
    checklist: [
      "List the largest set of items you will ship in one box",
      "Decide whether you need a fixed insert or loose fill",
      "Plan inside-lid artwork and any seasonal changes",
      "Tell us your monthly volume and reorder rhythm",
      "Share brand colour references for consistent reorders",
    ],
    faqs: [
      { question: "Can each month's box look different?", answer: "Yes. The most cost-effective way is one standard printed box with a changing sleeve, sticker or insert card. Fully different print runs are also possible." },
      { question: "Do you keep my artwork for reorders?", answer: "Yes. We keep your approved dieline and specifications on file so reorders match the previous run." },
      { question: "Can you add inserts?", answer: "Yes. We make die-cut card and corrugated inserts sized to your items." },
      { question: "What is the minimum order?", answer: "From 100 boxes. Ordering several months at once lowers the unit price." },
      { question: "How long does production take?", answer: "12–15 business days after proof approval, plus shipping. Plan reorders about a month ahead of each edition." },
    ],
    related: ["mailer-boxes", "white-mailer-boxes", "black-mailer-boxes", "kraft-mailer-boxes", "cosmetic-boxes"],
  },
];

export function getStyleGuide(slug: string) {
  return styleGuides.find((guide) => guide.slug === slug);
}

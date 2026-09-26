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
  // Style-specific photos shown first in the gallery (parent photos fill the rest)
  images?: { src: string; alt: string; title: string }[];
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

const bakeryBoards = [
  { name: "Food-grade SBS 300–350 GSM", spec: "about 0.40–0.50 mm", bestFor: "Cupcakes, cookies and pastries — bright white print" },
  { name: "Food-grade kraft 300–350 GSM", spec: "about 0.45–0.55 mm", bestFor: "Natural, eco look for artisan bakeries" },
  { name: "Food-grade SBS 400 GSM", spec: "about 0.60 mm", bestFor: "Larger cake boxes and window boxes that need stiffness" },
  { name: "E-flute with food-safe liner", spec: "about 1.5 mm", bestFor: "Heavy tiered cakes and delivery" },
];

const bakeryCompare = [
  { option: "Window cake / bakery box", chooseIf: "Customers should see the product before opening" },
  { option: "Cupcake box with insert", chooseIf: "Each item must stay upright and separate" },
  { option: "Cookie sleeve or tray box", chooseIf: "Flat items that are stacked or sold in rows" },
  { option: "Gable box", chooseIf: "The customer carries it home and you want a built-in handle" },
];

const foodChecklist = [
  "Tell us what goes inside and its size (cake diameter and height, cupcake liner size, cookie diameter)",
  "Say whether you need a window, a handle or an insert",
  "Confirm the food will touch the board directly (we then use food-grade stock)",
  "Share logo files as AI, PDF or SVG and colours as Pantone or CMYK",
  "Give the quantity per size and the delivery country",
];

const P = "/images/products";

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
  {
    slug: "cake-boxes",
    name: "Cake Boxes",
    parent: "bakery-boxes",
    category: "Food Packaging",
    tagline: "Custom printed cake boxes with windows, handles and food-safe board",
    description:
      "Custom cake boxes in food-grade SBS or kraft board, with optional window, handle and cake board. Printed with your bakery branding, MOQ from 100 boxes, free dieline support and 12–15 business day production.",
    keywords: ["custom cake boxes", "cake boxes with window", "printed cake boxes", "cake boxes with logo", "bakery cake boxes", "wholesale cake boxes"],
    industries: ["Bakeries", "Cake Shops", "Cafes", "Home Bakers", "Hotels"],
    intro: [
      "A cake box has one job above all: get the cake home looking exactly as it left the counter. That means the right height so frosting never touches the lid, a base strong enough not to bow, and board that is safe to sit next to food.",
      "Most bakeries choose a lock-corner or tuck-top cake box made from food-grade board, often with a PET window so the cake sells itself on display. Taller and heavier cakes move up to thicker SBS or a food-lined corrugated board, and many shops add a separate cake board so the cake can be lifted out cleanly.",
      "Printing your logo, colours and social handle on the lid turns every takeaway into advertising. We make each box to your cake sizes so there is no sliding in transit.",
    ],
    sizeNote: "Inside sizes for common round and square cakes. Allow at least 1 inch (25 mm) of height above the frosting.",
    sizes: [
      { name: "6 inch cake", inches: "7 x 7 x 5 in", mm: "178 x 178 x 127 mm", bestFor: "Small celebration cakes, cheesecakes" },
      { name: "8 inch cake", inches: "9 x 9 x 5 in", mm: "229 x 229 x 127 mm", bestFor: "Standard birthday cakes" },
      { name: "10 inch cake", inches: "11 x 11 x 6 in", mm: "279 x 279 x 152 mm", bestFor: "Party cakes, two-layer cakes" },
      { name: "12 inch cake", inches: "13 x 13 x 6 in", mm: "330 x 330 x 152 mm", bestFor: "Large sponges and tortes" },
      { name: "Tall cake", inches: "10 x 10 x 10 in", mm: "254 x 254 x 254 mm", bestFor: "Tall and tiered cakes" },
      { name: "Slice box", inches: "4.5 x 3.5 x 3.5 in", mm: "114 x 89 x 89 mm", bestFor: "Single slices and pastries" },
    ],
    boardsTitle: "Food-safe board options",
    boards: bakeryBoards,
    printing: [
      { title: "Logo on the lid", text: "One or two colour lid print — the most economical bakery branding." },
      { title: "Full-colour wrap", text: "Patterns and photography across every panel for premium cake shops." },
      { title: "Window", text: "Food-safe PET window cut to your shape so the cake is on show." },
      { title: "Handle", text: "Built-in carry handle for larger cakes and takeaway." },
    ],
    costFactors: [
      { title: "Window", text: "Adding a PET window adds a patching step and film cost." },
      { title: "Board grade", text: "Thicker SBS or corrugated board for heavy cakes costs more than standard SBS." },
      { title: "Size range", text: "Each cake size needs its own die; fewer sizes means lower set-up cost." },
      { title: "Print coverage", text: "A lid logo is cheaper than full-colour printing on every panel." },
      { title: "Quantity", text: "Bakeries that order several months at once get a much lower unit price." },
    ],
    savingTips: [
      "Standardise on two or three cake sizes",
      "Print one colour on white or kraft for everyday cakes and keep full colour for celebration boxes",
      "Order a bigger run and store boxes flat",
    ],
    compare: bakeryCompare,
    checklist: foodChecklist,
    faqs: [
      { question: "Are your cake boxes food safe?", answer: "Yes. We use food-grade SBS or kraft board and food-safe inks for boxes that hold cakes directly." },
      { question: "How much taller than the cake should the box be?", answer: "Allow at least 1 inch (25 mm) above the highest point of the frosting or decoration so the lid never touches it." },
      { question: "Can I add a window?", answer: "Yes. We add a clear PET window in the lid or front panel, cut to any shape." },
      { question: "Do you make boxes for tall or tiered cakes?", answer: "Yes. Tall cakes use a taller box in thicker board or food-lined corrugated for strength." },
      { question: "What is the minimum order?", answer: "From 100 boxes per size, with lower prices at higher quantities." },
      { question: "How long does production take?", answer: "12–15 business days after proof approval, plus shipping." },
    ],
    related: ["bakery-boxes", "cupcake-boxes", "cookie-boxes", "gable-boxes", "window-boxes"],
    images: [
      { src: `${P}/cake-boxes/cake-boxes-hero-v5.webp`, alt: "Orange printed cake box with the Printy Packaging logo, lid open", title: "Cake Box Hero View" },
      { src: `${P}/cake-boxes/cake-boxes-window-handle-v5.webp`, alt: "Kraft cake box with carry handle and front window", title: "Window Handle Cake Box" },
    ],
  },
  {
    slug: "cupcake-boxes",
    name: "Cupcake Boxes",
    parent: "bakery-boxes",
    category: "Food Packaging",
    tagline: "Cupcake boxes with inserts that keep every cupcake upright",
    description:
      "Custom cupcake boxes for 1, 2, 4, 6, 12 and 24 cupcakes, with die-cut inserts, windows and food-grade board. Printed with your branding, MOQ from 100 boxes, 12–15 business day production.",
    keywords: ["custom cupcake boxes", "cupcake boxes with inserts", "cupcake boxes with window", "printed cupcake boxes", "6 cupcake box", "12 cupcake box"],
    industries: ["Bakeries", "Cupcake Shops", "Cafes", "Event Caterers", "Home Bakers"],
    intro: [
      "The difference between a good and a bad cupcake box is the insert. A die-cut card insert holds each cupcake by its liner so the frosting never smears against the walls or its neighbour, even on a bumpy car ride.",
      "Cupcake boxes usually come in counts of 1, 2, 4, 6, 12 and 24. Box height matters as much as the footprint: tall swirls and toppers need a deeper box, while mini cupcakes need smaller insert holes rather than a smaller box.",
      "A window lid lets customers see the decoration, and printed boxes make gifting boxes of cupcakes feel special. We size the insert holes to your liner size so every cupcake sits snugly.",
    ],
    sizeNote: "Typical sizes for standard cupcakes (about 2 inch / 50 mm liner base). Tell us your liner size and topping height.",
    sizes: [
      { name: "1 cupcake", inches: "4 x 4 x 4 in", mm: "102 x 102 x 102 mm", bestFor: "Single gifts and favours" },
      { name: "2 cupcakes", inches: "7 x 3.75 x 4 in", mm: "178 x 95 x 102 mm", bestFor: "Pairs and add-ons" },
      { name: "4 cupcakes", inches: "7 x 7 x 4 in", mm: "178 x 178 x 102 mm", bestFor: "Small gift boxes" },
      { name: "6 cupcakes", inches: "10 x 7 x 4 in", mm: "254 x 178 x 102 mm", bestFor: "The most popular retail box" },
      { name: "12 cupcakes", inches: "14 x 10 x 4 in", mm: "356 x 254 x 102 mm", bestFor: "Parties and offices" },
      { name: "24 mini cupcakes", inches: "10 x 10 x 3 in", mm: "254 x 254 x 76 mm", bestFor: "Mini cupcakes and events" },
    ],
    boardsTitle: "Food-safe board options",
    boards: bakeryBoards,
    printing: [
      { title: "Die-cut insert", text: "Card inserts with holes sized to your liner keep cupcakes upright." },
      { title: "Window lid", text: "A clear PET window shows off the decoration." },
      { title: "Printed insert", text: "Brand colour or pattern on the insert for a finished look when opened." },
      { title: "Full-colour box", text: "Bright branded printing for gift and celebration boxes." },
    ],
    costFactors: [
      { title: "Insert", text: "Inserts add board and die-cutting but are essential for transport." },
      { title: "Window", text: "Window patching adds a step and film cost." },
      { title: "Count sizes", text: "Each count (4, 6, 12) is a separate die; fewer sizes keeps set-up low." },
      { title: "Quantity", text: "Larger runs lower the unit price sharply." },
    ],
    savingTips: [
      "Offer two counts (for example 6 and 12) instead of five",
      "Print the box and keep the insert plain",
      "Use one box height that fits all your topping styles",
    ],
    compare: bakeryCompare,
    checklist: foodChecklist,
    faqs: [
      { question: "Do cupcake boxes come with inserts?", answer: "Yes. We make die-cut inserts sized to your liner so each cupcake is held upright." },
      { question: "Can the insert be reversible for mini and regular cupcakes?", answer: "Yes. Reversible inserts with mini holes on one side and regular holes on the other are available." },
      { question: "How tall should a cupcake box be?", answer: "Measure from the liner base to the highest point of the frosting or topper and add about 0.5 inch (12 mm)." },
      { question: "What is the minimum order?", answer: "From 100 boxes per size." },
      { question: "How long does production take?", answer: "12–15 business days after proof approval, plus shipping." },
    ],
    related: ["cake-boxes", "cookie-boxes", "bakery-boxes", "window-boxes", "gable-boxes"],
    images: [
      { src: `${P}/cupcake-boxes/cupcake-boxes-hero-v5.webp`, alt: "Single cupcake box with a window and pastel print", title: "Cupcake Box Hero View" },
      { src: `${P}/cupcake-boxes/cupcake-boxes-window-v5.webp`, alt: "Pink window pastry box with a Printy Packaging label and cupcake", title: "Window Cupcake Box" },
      { src: `${P}/cupcake-boxes/cupcake-boxes-insert-v5.webp`, alt: "Kraft four-cupcake box with a die-cut insert", title: "Cupcake Insert" },
      { src: `${P}/cupcake-boxes/cupcake-boxes-two-v5.webp`, alt: "White two-cupcake box, open", title: "Two Cupcake Box" },
    ],
  },
  {
    slug: "cookie-boxes",
    name: "Cookie Boxes",
    parent: "bakery-boxes",
    category: "Food Packaging",
    tagline: "Custom cookie boxes, sleeves and trays for bakeries and gifts",
    description:
      "Custom cookie boxes in food-grade board: tuck-top boxes, sleeves with trays, window boxes and gift boxes. Greaseproof options, your branding, MOQ from 100 boxes, 12–15 business day production.",
    keywords: ["custom cookie boxes", "cookie packaging", "cookie gift boxes", "cookie boxes with window", "printed cookie boxes", "cookie sleeve boxes"],
    industries: ["Bakeries", "Cookie Brands", "Corporate Gifting", "Cafes", "Online Bakeries"],
    intro: [
      "Cookies are flat, fragile and often buttery, so the box has to stop breakage and keep grease off the print. Most cookie brands use either a tuck-top box with a paper liner, or a sleeve-and-tray box that slides open like a drawer for a premium unboxing.",
      "For stacks of cookies, a long narrow box keeps them in a row; for gift assortments, a tray with dividers keeps flavours apart. A window shows off the bake, and a greaseproof liner or coated board stops oil marks from showing through.",
      "Branded cookie boxes are a favourite for corporate gifting and online bakeries because the box itself becomes the gift. We size each box to your cookie diameter and stack height.",
    ],
    sizeNote: "Sizes for standard 3-inch (75 mm) cookies. Send your cookie diameter, thickness and count.",
    sizes: [
      { name: "Stack of 6", inches: "8 x 3.25 x 2 in", mm: "203 x 83 x 51 mm", bestFor: "Cookies stacked in a row" },
      { name: "Box of 4", inches: "7 x 7 x 1.5 in", mm: "178 x 178 x 38 mm", bestFor: "Gift quartets" },
      { name: "Box of 6", inches: "9.5 x 6.5 x 1.5 in", mm: "241 x 165 x 38 mm", bestFor: "Assortments in a single layer" },
      { name: "Box of 12", inches: "12 x 9 x 2 in", mm: "305 x 229 x 51 mm", bestFor: "Party and office boxes" },
      { name: "Single cookie", inches: "4 x 4 x 1 in", mm: "102 x 102 x 25 mm", bestFor: "Favours and samples" },
    ],
    boardsTitle: "Food-safe board options",
    boards: bakeryBoards,
    printing: [
      { title: "Sleeve and tray", text: "A printed sleeve over a plain or kraft tray — premium feel at a sensible cost." },
      { title: "Window", text: "A clear window shows the cookies without opening the box." },
      { title: "Greaseproof liner", text: "A liner or coated board keeps butter and oil off your print." },
      { title: "Dividers", text: "Card dividers keep flavours apart in assortments." },
    ],
    costFactors: [
      { title: "Two-piece construction", text: "Sleeve-and-tray boxes use two parts and cost more than a single tuck box." },
      { title: "Liner or coating", text: "Grease resistance adds material or a coating step." },
      { title: "Dividers and windows", text: "Each adds material and a production step." },
      { title: "Quantity", text: "Higher quantities lower the price per box." },
    ],
    savingTips: [
      "Use a single tuck-top box with a paper liner instead of a sleeve set for everyday orders",
      "Keep the tray plain and print only the sleeve",
      "Choose one footprint for both 6 and 12 packs by changing the stack height",
    ],
    compare: bakeryCompare,
    checklist: foodChecklist,
    faqs: [
      { question: "How do I stop grease marks on cookie boxes?", answer: "Use a greaseproof liner or a coated food-grade board. Both keep butter and oil from showing through the print." },
      { question: "Can cookie boxes have a window?", answer: "Yes. We add a clear PET window in the lid or sleeve." },
      { question: "Do you make sleeve and tray cookie boxes?", answer: "Yes. The printed sleeve slides over a tray, which can include dividers." },
      { question: "What is the minimum order?", answer: "From 100 boxes per size." },
      { question: "How long does production take?", answer: "12–15 business days after proof approval, plus shipping." },
    ],
    related: ["cake-boxes", "cupcake-boxes", "bakery-boxes", "sleeve-boxes", "gable-boxes"],
    images: [
      { src: `${P}/cookie-boxes/cookie-boxes-hero-v5.webp`, alt: "Row of cookie boxes in white, kraft and black, filled with cookies", title: "Cookie Box Range" },
      { src: `${P}/cookie-boxes/cookie-boxes-tray-v5.webp`, alt: "Pink cookie box open with cookies inside", title: "Cookie Tray Box" },
      { src: `${P}/cookie-boxes/cookie-boxes-sleeve-v5.webp`, alt: "Light blue cookie box open with cookies", title: "Cookie Tuck Box" },
      { src: `${P}/cookie-boxes/cookie-boxes-window-v5.webp`, alt: "Kraft cookie gift boxes with a window showing four cookies", title: "Cookie Window Box" },
    ],
  },
  {
    slug: "gable-boxes",
    name: "Gable Boxes",
    parent: "food-packaging",
    category: "Food Packaging",
    tagline: "Gable boxes with built-in handles for takeaway, gifts and events",
    description:
      "Custom gable boxes with a built-in carry handle, in food-grade SBS or kraft board. Ideal for bakery takeaway, meals, party favours and gifts. MOQ from 100 boxes, free dieline support, 12–15 business day production.",
    keywords: ["custom gable boxes", "gable boxes with handle", "kraft gable boxes", "printed gable boxes", "gable gift boxes", "takeaway gable boxes"],
    industries: ["Bakeries", "Restaurants", "Events", "Retail Gifts", "Kids Parties"],
    intro: [
      "A gable box is a folding carton whose top panels rise into a peaked roof with a cut-out handle. It carries like a small bag, stands on a counter like a box, and needs no separate carrier — which is why bakeries, restaurants and event planners love it.",
      "Gable boxes are made from a single sheet of board, usually food-grade SBS for bright printing or kraft for a natural look. They ship flat, fold up quickly and lock closed at the top without glue or tape.",
      "Because every side is visible when the box is carried, gable boxes give you a lot of branding space. Print your logo on both sides and a message on the ends, or add a window to show what is inside.",
    ],
    sizeNote: "Common gable sizes (base length x width x height to the shoulder). Handles add about 2–3 inches on top.",
    sizes: [
      { name: "Favour", inches: "4 x 2.5 x 2.5 in", mm: "102 x 64 x 64 mm", bestFor: "Party favours, sweets" },
      { name: "Small", inches: "6 x 3.5 x 3.5 in", mm: "152 x 89 x 89 mm", bestFor: "Muffins, single pastries" },
      { name: "Medium", inches: "8 x 4.75 x 5.25 in", mm: "203 x 121 x 133 mm", bestFor: "Pastry assortments, kids meals" },
      { name: "Large", inches: "9 x 5 x 6.5 in", mm: "229 x 127 x 165 mm", bestFor: "Cake slices, meal boxes" },
      { name: "Extra large", inches: "10 x 6 x 6 in", mm: "254 x 152 x 152 mm", bestFor: "Gift hampers, family meals" },
    ],
    boardsTitle: "Board options for gable boxes",
    boards: [
      { name: "Food-grade SBS 300–350 GSM", spec: "about 0.40–0.50 mm", bestFor: "Bright full-colour printing" },
      { name: "Kraft 300–350 GSM", spec: "about 0.45–0.55 mm", bestFor: "Natural eco look" },
      { name: "SBS 400 GSM", spec: "about 0.60 mm", bestFor: "Heavier contents and larger sizes" },
      { name: "Coated / greaseproof board", spec: "SBS with coating", bestFor: "Oily food and takeaway meals" },
    ],
    printing: [
      { title: "Both sides branded", text: "Logo on both large panels so it shows however the box is carried." },
      { title: "Full-colour pattern", text: "Patterns and illustrations across every panel for events and gifts." },
      { title: "Window", text: "A PET window on one side to show the contents." },
      { title: "Kraft one-colour", text: "A single dark ink on kraft for a simple, low-cost look." },
    ],
    costFactors: [
      { title: "Size", text: "The tall gable top uses more board than a plain box of the same base." },
      { title: "Coating", text: "Grease-resistant coating for food adds a step." },
      { title: "Print coverage", text: "Full-coverage print costs more than a one-colour logo." },
      { title: "Quantity", text: "Larger runs reduce the unit price." },
    ],
    savingTips: [
      "Print one colour on kraft for everyday takeaway",
      "Use one size for several products",
      "Skip the window unless the contents sell themselves",
    ],
    compare: bakeryCompare,
    checklist: foodChecklist,
    faqs: [
      { question: "Are gable boxes strong enough for food?", answer: "Yes. In 350 GSM food-grade board they carry pastries, meals and gifts comfortably. Heavier contents use thicker board." },
      { question: "Do gable boxes need glue or tape?", answer: "No. They ship flat and lock closed at the top with the built-in handle panels." },
      { question: "Can gable boxes have a window?", answer: "Yes. A clear PET window can be added on a side panel." },
      { question: "What is the minimum order?", answer: "From 100 boxes per size." },
      { question: "How long does production take?", answer: "12–15 business days after proof approval, plus shipping." },
    ],
    related: ["food-packaging", "cake-boxes", "cookie-boxes", "pillow-boxes", "paper-bags"],
    images: [
      { src: `${P}/gable-boxes/gable-boxes-hero-v5.webp`, alt: "Yellow gable boxes with navy Printy Packaging logos", title: "Gable Box Hero View" },
      { src: `${P}/gable-boxes/gable-boxes-colours-v5.webp`, alt: "Gable boxes in kraft, white, navy, green, black and red", title: "Gable Box Colours" },
      { src: `${P}/gable-boxes/gable-boxes-kraft-v5.webp`, alt: "Plain kraft gable box with handle", title: "Kraft Gable Box" },
      { src: `${P}/gable-boxes/gable-boxes-pastry-v5.webp`, alt: "Polka dot gable pastry carrier box", title: "Pastry Carrier Gable Box" },
    ],
  },
  {
    slug: "pillow-boxes",
    name: "Pillow Boxes",
    parent: "folding-cartons",
    category: "Retail Packaging",
    tagline: "Curved pillow boxes for favours, jewelry, gift cards and small products",
    description:
      "Custom pillow boxes in SBS or kraft board with curved, self-closing ends. Perfect for favours, jewelry, gift cards, soap and small retail items. Optional window, MOQ from 100 boxes, 12–15 business day production.",
    keywords: ["custom pillow boxes", "printed pillow boxes", "kraft pillow boxes", "pillow boxes with window", "pillow gift boxes", "favour pillow boxes"],
    industries: ["Weddings & Events", "Jewelry", "Cosmetics", "Gift Cards", "Handmade Products"],
    intro: [
      "Pillow boxes are made from one flat piece of board with curved scores at each end. When the ends are pushed in, they close themselves into a soft pillow shape — no glue, no tape and no inserts.",
      "Because they are flat until used and quick to close, pillow boxes are a favourite for wedding favours, gift cards, jewelry, soaps, hair accessories and samples. They look premium for very little board.",
      "We print pillow boxes in full colour, with patterns or simply a logo on kraft. A window can be added to show the product, and a ribbon or sleeve turns them into gift packaging.",
    ],
    sizeNote: "Popular pillow box sizes (length x width x depth when closed).",
    sizes: [
      { name: "Gift card", inches: "4.5 x 3 x 1 in", mm: "114 x 76 x 25 mm", bestFor: "Gift cards and vouchers" },
      { name: "Small favour", inches: "3.5 x 2.5 x 1 in", mm: "89 x 64 x 25 mm", bestFor: "Sweets and favours" },
      { name: "Jewelry", inches: "5 x 3.5 x 1.25 in", mm: "127 x 89 x 32 mm", bestFor: "Earrings, bracelets" },
      { name: "Soap bar", inches: "6 x 4 x 1.5 in", mm: "152 x 102 x 38 mm", bestFor: "Soap and cosmetics" },
      { name: "Large", inches: "8 x 5 x 2 in", mm: "203 x 127 x 51 mm", bestFor: "Accessories, small apparel" },
    ],
    boardsTitle: "Board options for pillow boxes",
    boards: [
      { name: "SBS 300 GSM", spec: "about 0.40 mm", bestFor: "Full-colour print, most pillow boxes" },
      { name: "SBS 350 GSM", spec: "about 0.45 mm", bestFor: "Larger or heavier contents" },
      { name: "Kraft 300 GSM", spec: "about 0.45 mm", bestFor: "Natural handmade look" },
      { name: "Metallic / textured board", spec: "specialty stocks", bestFor: "Weddings and luxury favours" },
    ],
    printing: [
      { title: "Full-colour pattern", text: "Patterns, florals and photography across the whole box." },
      { title: "Logo on kraft", text: "A one-colour logo on kraft for a clean handmade look." },
      { title: "Window", text: "A clear PET window to show jewelry or products inside." },
      { title: "Foil stamping", text: "Gold or silver foil for weddings and luxury gifts." },
    ],
    costFactors: [
      { title: "Size", text: "Pillow boxes use very little board, so they are one of the lowest-cost styles." },
      { title: "Window and foil", text: "Each extra finish adds a production step." },
      { title: "Print coverage", text: "Full-colour both sides costs more than a single logo." },
      { title: "Quantity", text: "Higher quantities lower the unit price." },
    ],
    savingTips: [
      "Use kraft with a one-colour logo for favours",
      "Keep one size for several products",
      "Add a ribbon or sticker instead of foil for a premium touch",
    ],
    compare: [
      { option: "Pillow box", chooseIf: "The product is small and light and you want a gift feel" },
      { option: "Tuck end box", chooseIf: "The product is heavier or needs square edges on a shelf" },
      { option: "Sleeve box", chooseIf: "You want a slide-out drawer reveal" },
      { option: "Gable box", chooseIf: "The item is carried by hand and needs a handle" },
    ],
    checklist: [
      "Send the product size (length x width x thickness)",
      "Say if you need a window, ribbon hole or hang tab",
      "Share logo files as AI, PDF or SVG and colours as Pantone or CMYK",
      "Give the quantity and the delivery country",
    ],
    faqs: [
      { question: "Do pillow boxes need glue?", answer: "No. The curved ends fold in and close themselves." },
      { question: "What can I pack in a pillow box?", answer: "Light items such as favours, gift cards, jewelry, soap, samples and accessories." },
      { question: "Can pillow boxes have a window?", answer: "Yes. We add a clear PET window cut to your shape." },
      { question: "What is the minimum order?", answer: "From 100 boxes." },
      { question: "How long does production take?", answer: "12–15 business days after proof approval, plus shipping." },
    ],
    related: ["folding-cartons", "gable-boxes", "sleeve-boxes", "jewelry-boxes", "soap-boxes"],
    images: [
      { src: `${P}/pillow-boxes/pillow-boxes-hero-v5.webp`, alt: "Striped pillow boxes on a light blue background", title: "Pillow Box Hero View" },
      { src: `${P}/pillow-boxes/pillow-boxes-window-v5.webp`, alt: "Kraft pillow boxes with clear windows", title: "Window Pillow Box" },
      { src: `${P}/pillow-boxes/pillow-boxes-kraft-v5.webp`, alt: "Plain kraft pillow boxes", title: "Kraft Pillow Box" },
      { src: `${P}/pillow-boxes/pillow-boxes-white-v5.webp`, alt: "White pillow boxes on linen", title: "White Pillow Box" },
      { src: `${P}/pillow-boxes/pillow-boxes-printed-v5.webp`, alt: "Floral printed pillow boxes", title: "Printed Pillow Box" },
    ],
  },
];

export function getStyleGuide(slug: string) {
  return styleGuides.find((guide) => guide.slug === slug);
}

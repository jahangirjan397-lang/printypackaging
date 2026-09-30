// Commercial print products shown under "Custom Printing".
// Photos go in public/images/products/<slug>/ and are added from /admin
// (Product Images); until then the page shows a branded placeholder.

export type PrintProduct = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  keywords: string[];
  industries: string[];
};

export const printCategory = "Custom Printing";

export const printProducts: PrintProduct[] = [
  {
    slug: "business-cards",
    name: "Business Cards",
    tagline: "Thick, sharp business cards that people keep",
    description:
      "Custom business cards printed on 350–600 GSM card with matte, soft-touch or gloss lamination, rounded corners, foil logos and spot UV. We check your name, number and QR code before printing so the first box you open is ready to hand out.",
    keywords: ["custom business cards", "printed business cards", "luxury business cards", "foil business cards", "spot uv business cards", "thick business cards"],
    industries: ["Startups", "Retail", "Real Estate", "Salons", "Consultants"],
  },
  {
    slug: "thank-you-cards",
    name: "Thank You Cards",
    tagline: "Packaging inserts that turn orders into repeat customers",
    description:
      "Printed thank you cards and packaging inserts for online orders, with discount codes, care instructions or a handwritten-style note. They sit on top of the product inside your mailer box and cost a few cents each.",
    keywords: ["thank you cards", "packaging inserts", "custom insert cards", "thank you for your order cards", "small business thank you cards"],
    industries: ["E-commerce", "Subscription Brands", "Handmade Brands", "Cosmetics", "Apparel"],
  },
  {
    slug: "flyers",
    name: "Flyers",
    tagline: "Single-sheet flyers for promotions and launches",
    description:
      "Full-colour flyers in A6, A5, A4 or custom sizes on gloss, matte or uncoated paper. Use them in shop windows, delivery bags or at events to announce offers, menus and new products.",
    keywords: ["flyer printing", "custom flyers", "promotional flyers", "a5 flyers", "leaflet printing"],
    industries: ["Restaurants", "Retail", "Events", "Real Estate", "Local Services"],
  },
  {
    slug: "brochures",
    name: "Brochures",
    tagline: "Folded brochures that explain your products clearly",
    description:
      "Bi-fold, tri-fold and Z-fold brochures printed on coated or uncoated paper, with crisp folds and colour-matched brand artwork. Ideal for product ranges, price lists and services you want customers to read at their own pace.",
    keywords: ["brochure printing", "tri fold brochures", "custom brochures", "bi fold brochure printing", "company brochures"],
    industries: ["Manufacturers", "Clinics", "Real Estate", "Education", "Travel"],
  },
  {
    slug: "catalogs-magazines",
    name: "Catalogs & Magazines",
    tagline: "Saddle-stitched and perfect-bound catalogs",
    description:
      "Product catalogs, lookbooks and magazines with saddle-stitched or perfect-bound spines, a heavier cover and full-colour inner pages. We help with page count, paper weight and bleed so your photos print as sharp as they look on screen.",
    keywords: ["catalog printing", "magazine printing", "lookbook printing", "product catalog printing", "perfect bound catalogs"],
    industries: ["Fashion", "Furniture", "Wholesale", "Beauty", "Publishing"],
  },
  {
    slug: "booklets",
    name: "Booklets",
    tagline: "Instruction booklets and small brand books",
    description:
      "Compact booklets for product manuals, recipes, ingredient guides and brand stories, sized to fit inside your box. Stapled or perfect-bound, printed in full colour or one colour to keep the cost down.",
    keywords: ["booklet printing", "instruction booklets", "custom booklets", "product manual printing", "small booklet printing"],
    industries: ["Electronics", "Food Brands", "Cosmetics", "Toys", "Education"],
  },
  {
    slug: "postcards",
    name: "Postcards",
    tagline: "Postcards for mailings, inserts and souvenirs",
    description:
      "Thick postcards printed on both sides, with a matte writing surface on the back if you need it. Popular for direct mail, event reminders, art prints and inserts inside ecommerce orders.",
    keywords: ["postcard printing", "custom postcards", "direct mail postcards", "4x6 postcards", "promotional postcards"],
    industries: ["E-commerce", "Artists", "Tourism", "Real Estate", "Events"],
  },
  {
    slug: "greeting-cards",
    name: "Greeting Cards",
    tagline: "Folded greeting cards with matching envelopes",
    description:
      "Custom greeting cards for holidays, corporate gifting and retail, folded on scored card so the spine stays clean. Add foil, embossing or a textured stock and pair them with printed envelopes.",
    keywords: ["greeting card printing", "custom greeting cards", "christmas cards printing", "corporate greeting cards", "folded cards"],
    industries: ["Gift Shops", "Corporate Gifting", "Artists", "Stationery Brands", "Events"],
  },
  {
    slug: "invitation-cards",
    name: "Invitation Cards",
    tagline: "Wedding, party and launch invitations",
    description:
      "Invitation cards on premium textured, pearl or cotton-feel card with foil, embossing, die-cut shapes and matching envelopes. We print wedding sets, corporate event invites and product launch cards in small or large runs.",
    keywords: ["invitation card printing", "wedding invitations", "custom invitations", "foil invitation cards", "event invitations"],
    industries: ["Weddings", "Events", "Corporate", "Hospitality", "Luxury Brands"],
  },
  {
    slug: "posters",
    name: "Posters",
    tagline: "Bright posters for stores, events and walls",
    description:
      "Posters from A3 up to large format on gloss, satin or matte paper with rich, even colour. Use them for in-store promotions, event branding, menus or art prints.",
    keywords: ["poster printing", "custom posters", "large format posters", "a2 poster printing", "event posters"],
    industries: ["Retail", "Events", "Restaurants", "Artists", "Education"],
  },
  {
    slug: "banners",
    name: "Banners",
    tagline: "Vinyl and fabric banners for indoor and outdoor use",
    description:
      "Weather-resistant vinyl banners and roll-up stands with hemmed edges and eyelets, printed with bold colour that stays readable from a distance. Good for shop fronts, trade shows, markets and events.",
    keywords: ["banner printing", "vinyl banners", "roll up banners", "custom banners", "outdoor banners"],
    industries: ["Events", "Retail", "Trade Shows", "Restaurants", "Sports Clubs"],
  },
  {
    slug: "clings-decals",
    name: "Clings & Decals",
    tagline: "Window clings, wall decals and die-cut vinyl",
    description:
      "Static window clings and adhesive vinyl decals cut to any shape for shop windows, glass doors, walls, vehicles and product displays. Removable options peel off cleanly when your promotion ends.",
    keywords: ["window clings", "vinyl decals", "custom decals", "wall decals", "die cut decals"],
    industries: ["Retail", "Cafes", "Salons", "Automotive", "Events"],
  },
  {
    slug: "menus",
    name: "Menus",
    tagline: "Restaurant and cafe menus that survive service",
    description:
      "Laminated, wipe-clean menus, folded takeaway menus and single-page table menus for restaurants, cafes and food trucks. We print on heavy card that holds up to daily handling and spills.",
    keywords: ["menu printing", "restaurant menus", "takeaway menus", "laminated menus", "cafe menu printing"],
    industries: ["Restaurants", "Cafes", "Food Trucks", "Bakeries", "Hotels"],
  },
  {
    slug: "table-tents",
    name: "Table Tents",
    tagline: "Tabletop cards for offers, menus and QR codes",
    description:
      "Self-standing table tents printed on stiff card, ready to fold, for daily specials, Wi-Fi details, QR code menus and promotions on counters and tables.",
    keywords: ["table tent printing", "table tent cards", "tabletop display cards", "qr code table cards", "restaurant table tents"],
    industries: ["Restaurants", "Cafes", "Hotels", "Events", "Retail Counters"],
  },
  {
    slug: "paper-coasters",
    name: "Paper Coasters",
    tagline: "Absorbent branded coasters for cafes and bars",
    description:
      "Round or square pulpboard coasters printed with your logo, social handle or promotion. They soak up drips, protect tables and keep your brand in front of every customer.",
    keywords: ["custom coasters", "paper coasters", "printed coasters", "bar coasters", "branded coasters"],
    industries: ["Cafes", "Bars", "Hotels", "Restaurants", "Events"],
  },
  {
    slug: "door-hangers",
    name: "Door Hangers",
    tagline: "Door hangers for local marketing and hotels",
    description:
      "Die-cut door hangers on thick card for local deliveries, real estate, service businesses and hotel rooms. Print both sides and add a tear-off coupon if you want responses you can track.",
    keywords: ["door hanger printing", "custom door hangers", "hotel door hangers", "marketing door hangers"],
    industries: ["Real Estate", "Hotels", "Local Services", "Restaurants", "Political Campaigns"],
  },
  {
    slug: "bookmarks",
    name: "Bookmarks",
    tagline: "Bookmarks for bookshops, authors and gifts",
    description:
      "Slim bookmarks printed on sturdy card with optional tassel holes, rounded corners and foil details. A low-cost giveaway for authors, bookshops, libraries and gift boxes.",
    keywords: ["bookmark printing", "custom bookmarks", "promotional bookmarks", "author bookmarks"],
    industries: ["Authors", "Bookshops", "Schools", "Gift Brands", "Events"],
  },
  {
    slug: "calendars",
    name: "Calendars",
    tagline: "Wall and desk calendars for year-round branding",
    description:
      "Wall calendars and tent-style desk calendars printed with your photos and brand, with wire binding or stapled spines. A useful corporate gift that stays on your customer's desk all year.",
    keywords: ["calendar printing", "custom calendars", "desk calendars", "wall calendars", "corporate calendars"],
    industries: ["Corporate Gifting", "Photographers", "Schools", "Retail", "Charities"],
  },
  {
    slug: "letterheads",
    name: "Letterheads",
    tagline: "Branded letterheads for invoices and letters",
    description:
      "Letterheads printed on smooth 100–120 GSM paper that works in office printers, colour-matched to your logo and business cards for a consistent brand.",
    keywords: ["letterhead printing", "custom letterheads", "company letterhead", "business stationery"],
    industries: ["Corporate", "Law Firms", "Clinics", "Consultants", "Schools"],
  },
  {
    slug: "envelopes",
    name: "Envelopes",
    tagline: "Printed envelopes to match your stationery",
    description:
      "Custom printed envelopes in DL, C5, C4 and invitation sizes, with your logo on the front or flap. Pair them with letterheads, greeting cards or invitations.",
    keywords: ["envelope printing", "custom envelopes", "printed envelopes", "business envelopes", "invitation envelopes"],
    industries: ["Corporate", "Weddings", "Events", "Stationery Brands", "Schools"],
  },
  {
    slug: "presentation-folders",
    name: "Presentation Folders",
    tagline: "Pocket folders for proposals and welcome packs",
    description:
      "Presentation folders with glued pockets and a business card slot, printed on heavy laminated card. They keep proposals, price lists and welcome packs neat and professional.",
    keywords: ["presentation folder printing", "pocket folders", "custom folders", "corporate folders"],
    industries: ["Corporate", "Real Estate", "Education", "Agencies", "Events"],
  },
  {
    slug: "note-pads",
    name: "Note Pads",
    tagline: "Branded note pads for desks and giveaways",
    description:
      "Glued note pads with 25, 50 or 100 sheets and a card backing, printed with your logo and colours. Practical giveaways for events, hotels and client offices.",
    keywords: ["notepad printing", "custom note pads", "branded notepads", "promotional notepads"],
    industries: ["Hotels", "Corporate", "Real Estate", "Events", "Schools"],
  },
  {
    slug: "carbonless-forms",
    name: "Carbonless Forms",
    tagline: "Duplicate and triplicate forms, numbered",
    description:
      "NCR carbonless forms in 2 or 3 parts, numbered and bound into books or pads, for invoices, delivery notes, receipts and work orders.",
    keywords: ["carbonless forms", "ncr forms", "invoice books", "receipt books printing", "duplicate forms"],
    industries: ["Workshops", "Delivery Services", "Retail", "Contractors", "Restaurants"],
  },
  {
    slug: "tickets",
    name: "Tickets",
    tagline: "Numbered event and raffle tickets",
    description:
      "Event, raffle and entry tickets with sequential numbering, perforated stubs and security options such as foil or unique backgrounds that are hard to copy.",
    keywords: ["ticket printing", "event tickets", "raffle tickets", "numbered tickets", "custom tickets"],
    industries: ["Events", "Schools", "Charities", "Sports Clubs", "Concerts"],
  },
];

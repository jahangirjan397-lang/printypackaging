// Header menus. `icon` is a NavIcon name (usually the product slug).

export type NavItem = {
  name: string;
  href: string;
  icon: string;
  text?: string;
};

export type NavMenu = {
  title: string;
  heading: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  items: NavItem[];
  // Optional footer link under the grid (e.g. a buying guide)
  extra?: NavItem;
};

const product = (name: string, slug: string): NavItem => ({
  name,
  href: `/products/${slug}`,
  icon: slug,
});

const industry = (name: string, slug: string): NavItem => ({
  name,
  href: `/categories/${slug}`,
  icon: slug,
});

export const navMenus: NavMenu[] = [
  {
    title: "Industries",
    heading: "Packaging by Industry",
    description: "Find the boxes, bags and prints made for your kind of business.",
    ctaText: "All Industries",
    ctaHref: "/categories",
    items: [
      industry("Food & Restaurant", "food-packaging"),
      industry("Bakery", "bakery-packaging"),
      industry("Confectionery", "confectionery-packaging"),
      industry("Cosmetics & Beauty", "cosmetic-packaging"),
      industry("Candles", "candle-packaging"),
      industry("Apparel & Fashion", "apparel-packaging"),
      industry("Jewelry", "jewelry-packaging"),
      industry("Gifts", "gift-packaging"),
      industry("Luxury Brands", "luxury-packaging"),
      industry("Retail", "retail-packaging"),
      industry("Household", "household-packaging"),
      industry("Sports & Fitness", "sports-packaging"),
      industry("Toys & Games", "toys-games-packaging"),
      industry("Events & Weddings", "events-packaging"),
      industry("Health & Pharma", "health-pharma-packaging"),
      industry("E-commerce", "ecommerce-packaging"),
    ],
  },
  {
    title: "Box Styles",
    heading: "Custom Box Styles",
    description: "Pick the structure first. Every style is made to your size.",
    ctaText: "All Products",
    ctaHref: "/products",
    items: [
      product("Mailer Boxes", "mailer-boxes"),
      product("Tuck End Boxes", "tuck-end-boxes"),
      product("Folding Cartons", "folding-cartons"),
      product("Rigid Boxes", "rigid-boxes"),
      product("Magnetic Boxes", "magnetic-boxes"),
      product("Drawer Boxes", "drawer-boxes"),
      product("Two-Piece Rigid Boxes", "two-piece-rigid-boxes"),
      product("Sleeve Boxes", "sleeve-boxes"),
      product("Window Boxes", "window-boxes"),
      product("Pillow Boxes", "pillow-boxes"),
      product("Gable Boxes", "gable-boxes"),
      product("Display Boxes", "display-boxes"),
      product("Hang Tab Boxes", "hang-tab-boxes"),
      product("Shipping Boxes", "shipping-boxes"),
      product("Luxury Packaging", "luxury-packaging"),
    ],
  },
  {
    title: "Materials",
    heading: "Boxes by Material",
    description: "Kraft, corrugated, rigid board or paperboard: choose what protects your product.",
    ctaText: "Materials Guide",
    ctaHref: "/packaging-materials",
    items: [
      product("Kraft Boxes", "kraft-boxes"),
      product("Kraft Mailer Boxes", "kraft-mailer-boxes"),
      product("White Mailer Boxes", "white-mailer-boxes"),
      product("Black Mailer Boxes", "black-mailer-boxes"),
      { name: "Corrugated Boxes", href: "/products/shipping-boxes", icon: "shipping-boxes" },
      { name: "Rigid Board Boxes", href: "/products/rigid-boxes", icon: "rigid-boxes" },
      { name: "Paperboard Cartons", href: "/products/folding-cartons", icon: "folding-cartons" },
    ],
    extra: {
      name: "Not sure which board? Read the materials guide",
      href: "/packaging-materials",
      icon: "materials",
    },
  },
  {
    title: "Custom Printing",
    heading: "Custom Printing",
    description: "Packaging extras, stationery and marketing prints from one supplier.",
    ctaText: "Get a Quote",
    ctaHref: "/#quote",
    items: [
      // Goes with your packaging
      product("Labels & Stickers", "labels-stickers"),
      product("Thank You Cards", "thank-you-cards"),
      product("Hang Tags", "hang-tags"),
      product("Butter Paper", "butter-paper"),
      product("Paper Bags", "paper-bags"),
      { name: "Packaging Sleeves", href: "/products/sleeve-boxes", icon: "sleeve-boxes" },
      // Business stationery
      product("Business Cards", "business-cards"),
      product("Letterheads", "letterheads"),
      product("Envelopes", "envelopes"),
      product("Presentation Folders", "presentation-folders"),
      product("Note Pads", "note-pads"),
      product("Carbonless Forms", "carbonless-forms"),
      // Marketing
      product("Flyers", "flyers"),
      product("Brochures", "brochures"),
      product("Catalogs & Magazines", "catalogs-magazines"),
      product("Booklets", "booklets"),
      product("Postcards", "postcards"),
      product("Posters", "posters"),
      product("Banners", "banners"),
      product("Door Hangers", "door-hangers"),
      product("Clings & Decals", "clings-decals"),
      // Restaurants, events and gifts
      product("Menus", "menus"),
      product("Table Tents", "table-tents"),
      product("Paper Coasters", "paper-coasters"),
      product("Invitation Cards", "invitation-cards"),
      product("Greeting Cards", "greeting-cards"),
      product("Tickets", "tickets"),
      product("Calendars", "calendars"),
      product("Bookmarks", "bookmarks"),
    ],
    extra: {
      name: "Finishes: foil, spot UV, embossing",
      href: "/finishing-options",
      icon: "finishes",
    },
  },
  {
    title: "Resources",
    heading: "Learn & Plan",
    description: "Guides to help you order the right packaging the first time.",
    ctaText: "Resources Hub",
    ctaHref: "/resources",
    items: [
      { name: "Packaging Blog", href: "/blog", icon: "blog", text: "Tips, costs and how-to guides" },
      { name: "Packaging Gallery", href: "/portfolio", icon: "gallery", text: "Box ideas and real styles" },
      { name: "Materials Guide", href: "/packaging-materials", icon: "materials", text: "Kraft, corrugated, rigid board" },
      { name: "Finishing Options", href: "/finishing-options", icon: "finishes", text: "Foil, spot UV, lamination" },
      { name: "Artwork & Dielines", href: "/artwork-guide", icon: "artwork", text: "Get your files print-ready" },
      { name: "Sample Kit", href: "/sample-kit", icon: "sample-kit", text: "Feel materials before ordering" },
      { name: "How Ordering Works", href: "/custom-packaging", icon: "process", text: "From quote to delivery" },
      { name: "FAQ", href: "/faq", icon: "faq", text: "MOQ, timing, shipping, payment" },
    ],
  },
];

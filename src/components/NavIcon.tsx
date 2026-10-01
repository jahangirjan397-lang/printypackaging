import type { ReactNode } from "react";

// Line icons for the header menus, drawn on a 64x64 grid in the same
// outline style as CategoryIcon. Colour comes from the text colour.
const icons: Record<string, ReactNode> = {
  // Box styles
  "mailer-boxes": (
    <>
      <path d="M8 34H56V54H8Z" />
      <path d="M8 34L16 26H48L56 34" />
      <path d="M16 26L22 10H54L48 26" />
      <path d="M26 44H38" />
    </>
  ),
  "tuck-end-boxes": (
    <>
      <path d="M18 18H42V56H18Z" />
      <path d="M42 18L50 12V50L42 56" />
      <path d="M18 18L26 12H50" />
      <path d="M26 12C27 6 41 6 42 12" />
    </>
  ),
  "folding-cartons": (
    <>
      <path d="M6 22H22V44H6Z" />
      <path d="M22 22H40V44H22Z" />
      <path d="M40 22H58V44H40Z" />
      <path d="M22 22L26 12H36L40 22" />
      <path d="M22 44L26 54H36L40 44" />
    </>
  ),
  "rigid-boxes": (
    <>
      <path d="M8 20H56V30H8Z" />
      <path d="M12 30H52V54H12Z" />
      <path d="M26 25H38" />
    </>
  ),
  "two-piece-rigid-boxes": (
    <>
      <path d="M8 10H56V20H8Z" />
      <path d="M12 32H52V56H12Z" />
      <path d="M26 28L32 24L38 28" />
    </>
  ),
  "magnetic-boxes": (
    <>
      <path d="M8 18H56V54H8Z" />
      <path d="M8 30H56" />
      <path d="M26 38V44C26 50 38 50 38 44V38" />
      <path d="M23 38H29M35 38H41" />
    </>
  ),
  "drawer-boxes": (
    <>
      <path d="M6 16H42V42H6Z" />
      <path d="M22 28H58V54H22Z" />
      <path d="M52 38V44" />
    </>
  ),
  "sleeve-boxes": (
    <>
      <path d="M6 26H58V48H6Z" />
      <path d="M20 20H44V54H20Z" />
      <path d="M26 37H38" />
    </>
  ),
  "window-boxes": (
    <>
      <path d="M12 10H52V56H12Z" />
      <path d="M21 20H43V38H21Z" />
      <path d="M21 46H43" />
    </>
  ),
  "pillow-boxes": (
    <>
      <path d="M8 18Q32 30 56 18Q50 32 56 46Q32 34 8 46Q14 32 8 18Z" />
      <path d="M22 32H42" />
    </>
  ),
  "gable-boxes": (
    <>
      <path d="M12 30H52V56H12Z" />
      <path d="M12 30L24 18H40L52 30" />
      <path d="M24 18V8H40V18" />
      <path d="M28 13H36" />
    </>
  ),
  "display-boxes": (
    <>
      <path d="M12 8H52V34" />
      <path d="M12 34V8" />
      <path d="M6 34H58L52 56H12Z" />
      <path d="M20 34V26M28 34V23M36 34V26M44 34V23" />
    </>
  ),
  "hang-tab-boxes": (
    <>
      <path d="M18 22H46V56H18Z" />
      <path d="M24 22V8H40V22" />
      <path d="M28 14H36" />
      <path d="M24 38H40" />
    </>
  ),
  "shipping-boxes": (
    <>
      <path d="M8 22L32 10L56 22V46L32 58L8 46Z" />
      <path d="M8 22L32 34L56 22" />
      <path d="M32 34V58" />
      <path d="M20 16L44 28V36" />
    </>
  ),
  "kraft-boxes": (
    <>
      <path d="M10 22H54V54H10Z" />
      <path d="M10 22L18 12H46L54 22" />
      <path d="M32 46C24 46 23 34 38 31C40 40 37 46 32 46Z" />
      <path d="M32 46L29 50" />
    </>
  ),
  "kraft-mailer-boxes": (
    <>
      <path d="M8 34H56V54H8Z" />
      <path d="M8 34L16 26H48L56 34" />
      <path d="M16 26L22 10H54L48 26" />
      <path d="M30 50C24 50 24 41 35 39C36 45 34 50 30 50Z" />
    </>
  ),
  "white-mailer-boxes": (
    <>
      <path d="M8 34H56V54H8Z" />
      <path d="M8 34L16 26H48L56 34" />
      <path d="M16 26L22 10H54L48 26" />
      <path d="M32 38L34 43L39 44L34 46L32 51L30 46L25 44L30 43Z" />
    </>
  ),
  "black-mailer-boxes": (
    <>
      <path d="M8 34H56V54H8Z" />
      <path d="M8 34L16 26H48L56 34" />
      <path d="M16 26L22 10H54L48 26" />
      <path d="M14 40H50M14 46H50" />
    </>
  ),

  // Industries
  "bakery-boxes": (
    <>
      <path d="M10 34C10 22 20 16 32 16C44 16 54 22 54 34V50H10Z" />
      <path d="M22 24L26 32M32 22V32M42 24L38 32" />
    </>
  ),
  "cake-boxes": (
    <>
      <path d="M12 38H52V56H12Z" />
      <path d="M18 26H46V38H18Z" />
      <path d="M32 18V26" />
      <path d="M32 8C29 12 29 15 32 18C35 15 35 12 32 8Z" />
      <path d="M12 46C20 50 24 42 32 46C40 50 44 42 52 46" />
    </>
  ),
  "cupcake-boxes": (
    <>
      <path d="M16 32H48L43 56H21Z" />
      <path d="M16 32C11 21 22 13 32 18C42 13 53 21 48 32" />
      <path d="M26 34L25 56M38 34L39 56" />
    </>
  ),
  "cookie-boxes": (
    <>
      <circle cx="32" cy="32" r="22" />
      <circle cx="25" cy="25" r="2.5" />
      <circle cx="39" cy="28" r="2.5" />
      <circle cx="28" cy="40" r="2.5" />
      <circle cx="40" cy="41" r="2" />
    </>
  ),
  "burger-boxes": (
    <>
      <path d="M12 28C12 14 52 14 52 28Z" />
      <path d="M10 34H54" />
      <path d="M12 40C18 36 22 44 28 40C34 36 38 44 44 40C48 38 50 40 52 40" />
      <path d="M12 46H52V50C52 53 49 56 46 56H18C15 56 12 53 12 50Z" />
    </>
  ),
  "pizza-boxes": (
    <>
      <path d="M32 58L8 16C22 8 42 8 56 16Z" />
      <path d="M13 23C25 17 39 17 51 23" />
      <circle cx="27" cy="29" r="3" />
      <circle cx="38" cy="33" r="3" />
      <circle cx="32" cy="43" r="3" />
    </>
  ),
  "food-packaging": (
    <>
      <path d="M12 24H52L46 56H18Z" />
      <path d="M12 24L20 14H44L52 24" />
      <path d="M26 6L30 24M40 6L35 24" />
    </>
  ),
  "cosmetic-boxes": (
    <>
      <path d="M22 32H42V56H22Z" />
      <path d="M25 32V18L39 10V32" />
      <path d="M22 42H42" />
    </>
  ),
  "perfume-boxes": (
    <>
      <path d="M16 28H48V56H16Z" />
      <path d="M26 20H38V28H26Z" />
      <path d="M29 10H35V20H29Z" />
      <path d="M24 42H40" />
    </>
  ),
  "soap-boxes": (
    <>
      <path d="M8 38C8 32 12 30 18 30H46C52 30 56 32 56 38V46C56 52 52 54 46 54H18C12 54 8 52 8 46Z" />
      <circle cx="24" cy="18" r="5" />
      <circle cx="38" cy="14" r="3.5" />
      <circle cx="46" cy="23" r="2.5" />
    </>
  ),
  "candle-boxes": (
    <>
      <path d="M20 30H44V56H20Z" />
      <path d="M32 30V24" />
      <path d="M32 8C26 15 27 22 32 24C37 22 38 15 32 8Z" />
      <path d="M20 38C27 41 37 35 44 38" />
    </>
  ),
  "jewelry-boxes": (
    <>
      <circle cx="32" cy="42" r="14" />
      <path d="M24 16L28 10H36L40 16L32 26Z" />
      <path d="M24 16H40" />
    </>
  ),
  "apparel-boxes": (
    <path d="M22 10L8 18L14 30L22 26V56H42V26L50 30L56 18L42 10C40 17 24 17 22 10Z" />
  ),
  "gift-boxes": (
    <>
      <path d="M10 26H54V36H10Z" />
      <path d="M14 36H50V56H14Z" />
      <path d="M32 26V56" />
      <path d="M32 26C27 14 16 16 19 23C21 26 28 26 32 26C36 26 43 26 45 23C48 16 37 14 32 26Z" />
    </>
  ),
  "subscription-boxes": (
    <>
      <path d="M10 26H54V56H10Z" />
      <path d="M10 26L18 16H46L54 26" />
      <path d="M32 32L35 38H41L36 42L38 48L32 44L26 48L28 42L23 38H29Z" />
    </>
  ),
  "pharmaceutical-boxes": (
    <>
      <path d="M18 46L38 26C42 22 48 22 51 26C54 29 54 35 50 39L30 59C26 63 20 62 17 59C14 56 14 50 18 46Z" />
      <path d="M28 36L40 48" />
      <path d="M16 8V24M8 16H24" />
    </>
  ),
  "luxury-packaging": (
    <>
      <path d="M10 25L20 13H44L54 25L32 53Z" />
      <path d="M10 25H54" />
      <path d="M20 13L32 25L44 13" />
      <path d="M32 25V53" />
    </>
  ),

  // Custom printing
  "labels-stickers": (
    <>
      <path d="M12 10H52V38L38 54H12Z" />
      <path d="M52 38H38V54" />
      <circle cx="28" cy="28" r="9" />
    </>
  ),
  "hang-tags": (
    <>
      <path d="M10 32L30 12H52V34L32 54Z" />
      <circle cx="44" cy="20" r="3" />
      <path d="M46 18C52 12 56 10 60 8" />
    </>
  ),
  "paper-bags": (
    <>
      <path d="M12 22H52L48 56H16Z" />
      <path d="M24 22V16C24 6 40 6 40 16V22" />
    </>
  ),
  "butter-paper": (
    <>
      <path d="M10 18H54L42 56H22Z" />
      <path d="M10 18L32 36L54 18" />
      <path d="M22 10C26 6 38 6 42 10" />
    </>
  ),

  // Custom printing
  "business-cards": (
    <>
      <path d="M6 18H46V44H6Z" />
      <path d="M18 24H58V50H18Z" />
      <circle cx="28" cy="35" r="4" />
      <path d="M36 32H50M36 39H46" />
    </>
  ),
  "thank-you-cards": (
    <>
      <path d="M8 14H56V50H8Z" />
      <path d="M32 42C22 35 20 30 22 26C24 22 30 22 32 27C34 22 40 22 42 26C44 30 42 35 32 42Z" />
    </>
  ),
  flyers: (
    <>
      <path d="M14 6H44L52 14V58H14Z" />
      <path d="M44 6V14H52" />
      <path d="M20 20H38V32H20Z" />
      <path d="M20 40H46M20 47H46M20 54H36" />
    </>
  ),
  brochures: (
    <>
      <path d="M6 14L24 10V54L6 58Z" />
      <path d="M24 10L40 14V58L24 54" />
      <path d="M40 14L58 10V54L40 58" />
      <path d="M11 26H19M29 26H35M45 26H53" />
    </>
  ),
  "catalogs-magazines": (
    <>
      <path d="M14 8H50V56H14Z" />
      <path d="M14 8V56" strokeWidth={5} />
      <path d="M22 16H42V32H22Z" />
      <path d="M22 40H42M22 47H36" />
    </>
  ),
  booklets: (
    <>
      <path d="M32 14C24 8 14 8 6 10V52C14 50 24 50 32 56C40 50 50 50 58 52V10C50 8 40 8 32 14Z" />
      <path d="M32 14V56" />
      <path d="M12 22H24M40 22H52M12 30H24M40 30H52" />
    </>
  ),
  postcards: (
    <>
      <path d="M6 14H58V50H6Z" />
      <path d="M34 20V44" />
      <path d="M44 20H52V28H44Z" />
      <path d="M12 24H28M12 32H28M40 36H52M40 42H52" />
    </>
  ),
  "greeting-cards": (
    <>
      <path d="M8 12L30 16V56L8 52Z" />
      <path d="M30 16L56 12V52L30 56" />
      <path d="M43 26L45 31L50 32L45 34L43 39L41 34L36 32L41 31Z" />
    </>
  ),
  "invitation-cards": (
    <>
      <path d="M6 22H58V56H6Z" />
      <path d="M6 22L32 40L58 22" />
      <path d="M14 22V8H50V22" />
      <path d="M24 16H40" />
    </>
  ),
  posters: (
    <>
      <path d="M12 8H52V56H12Z" />
      <path d="M12 44L26 30L36 40L42 34L52 44" />
      <circle cx="40" cy="20" r="5" />
    </>
  ),
  banners: (
    <>
      <path d="M16 6H48V48H16Z" />
      <path d="M32 48V58M22 58H42" />
      <path d="M22 14H42M22 22H42M22 30H36" />
    </>
  ),
  "clings-decals": (
    <>
      <circle cx="30" cy="34" r="22" />
      <path d="M52 34C52 26 44 22 40 26C36 30 38 38 46 38" />
      <path d="M22 30H38M22 38H32" />
    </>
  ),
  menus: (
    <>
      <path d="M12 6H52V58H12Z" />
      <path d="M26 16V26M22 16V22C22 24 30 24 30 22V16" />
      <path d="M38 16V26C42 26 42 16 38 16" />
      <path d="M20 36H44M20 44H44M20 52H34" />
    </>
  ),
  "table-tents": (
    <>
      <path d="M32 8L12 54H52Z" />
      <path d="M32 8L40 54" />
      <path d="M22 36H34M20 44H34" />
    </>
  ),
  "paper-coasters": (
    <>
      <circle cx="32" cy="32" r="24" />
      <circle cx="32" cy="32" r="16" />
      <path d="M26 32L30 36L38 28" />
    </>
  ),
  "door-hangers": (
    <>
      <path d="M18 6H46V58H18Z" />
      <circle cx="32" cy="18" r="6" />
      <path d="M32 12V6" />
      <path d="M24 34H40M24 42H40M24 50H34" />
    </>
  ),
  bookmarks: (
    <>
      <path d="M20 6H44V58L32 48L20 58Z" />
      <circle cx="32" cy="16" r="3" />
      <path d="M26 28H38M26 35H38" />
    </>
  ),
  calendars: (
    <>
      <path d="M8 14H56V56H8Z" />
      <path d="M8 26H56" />
      <path d="M20 8V18M44 8V18" />
      <path d="M18 36H22M30 36H34M42 36H46M18 46H22M30 46H34" />
    </>
  ),
  letterheads: (
    <>
      <path d="M14 6H50V58H14Z" />
      <path d="M20 12H30V20H20Z" />
      <path d="M20 30H44M20 37H44M20 44H44M20 51H34" />
    </>
  ),
  envelopes: (
    <>
      <path d="M6 16H58V50H6Z" />
      <path d="M6 16L32 36L58 16" />
      <path d="M6 50L26 32M58 50L38 32" />
    </>
  ),
  "presentation-folders": (
    <>
      <path d="M8 10H46V56H8Z" />
      <path d="M8 38H46L56 30V52L46 56" />
      <path d="M46 10L56 14V30" />
      <path d="M16 44H30" />
    </>
  ),
  "note-pads": (
    <>
      <path d="M14 12H50V58H14Z" />
      <path d="M20 6V16M28 6V16M36 6V16M44 6V16" />
      <path d="M20 28H44M20 36H44M20 44H36" />
    </>
  ),
  "carbonless-forms": (
    <>
      <path d="M18 6H52V50H18Z" />
      <path d="M12 12V56H46" />
      <path d="M26 16H44M26 24H44M26 32H38" />
      <path d="M26 42H34" />
    </>
  ),
  tickets: (
    <>
      <path d="M6 18H58V28C54 28 52 30 52 32C52 34 54 36 58 36V46H6V36C10 36 12 34 12 32C12 30 10 28 6 28Z" />
      <path d="M40 18V46" strokeDasharray="3 4" />
      <path d="M18 28H32M18 36H28" />
    </>
  ),

  // Industries
  "confectionery-packaging": (
    <>
      <path d="M20 22H44V42H20Z" />
      <path d="M20 22L8 14V50L20 42" />
      <path d="M44 22L56 14V50L44 42" />
      <path d="M26 32H38" />
    </>
  ),
  "household-packaging": (
    <>
      <path d="M8 30L32 10L56 30" />
      <path d="M14 26V56H50V26" />
      <path d="M26 56V40H38V56" />
    </>
  ),
  "sports-packaging": (
    <>
      <circle cx="32" cy="32" r="24" />
      <path d="M32 18L43 26L39 39H25L21 26Z" />
      <path d="M32 8V18M56 28L43 26M46 52L39 39M18 52L25 39M8 28L21 26" />
    </>
  ),
  "toys-games-packaging": (
    <>
      <path d="M8 18H40V50H8Z" />
      <circle cx="16" cy="26" r="2" />
      <circle cx="24" cy="34" r="2" />
      <circle cx="32" cy="42" r="2" />
      <path d="M40 26L56 22L58 50L40 50" />
      <circle cx="48" cy="34" r="2" />
    </>
  ),
  "events-packaging": (
    <>
      <path d="M24 8C14 8 10 16 10 22C10 32 24 36 24 36C24 36 38 32 38 22C38 16 34 8 24 8Z" />
      <path d="M24 36V58" />
      <path d="M44 20C38 20 36 26 36 30C36 36 44 40 44 40C44 40 54 36 54 30C54 26 50 20 44 20Z" />
      <path d="M44 40C44 48 36 52 30 54" />
    </>
  ),
  "retail-packaging": (
    <>
      <path d="M8 24H56L52 58H12Z" />
      <path d="M22 24V18C22 8 42 8 42 18V24" />
      <path d="M24 38H40" />
    </>
  ),
  "ecommerce-packaging": (
    <>
      <path d="M4 18H40V46H4Z" />
      <path d="M40 26H52L60 36V46H40" />
      <circle cx="16" cy="48" r="5" />
      <circle cx="48" cy="48" r="5" />
      <path d="M12 28H28" />
    </>
  ),

  // Resources
  blog: (
    <>
      <path d="M12 8H40L52 20V56H12Z" />
      <path d="M40 8V20H52" />
      <path d="M20 30H44M20 38H44M20 46H34" />
    </>
  ),
  gallery: (
    <>
      <path d="M8 12H56V52H8Z" />
      <circle cx="22" cy="25" r="4" />
      <path d="M8 44L24 32L34 40L42 34L56 46" />
    </>
  ),
  materials: (
    <>
      <path d="M32 8L56 20L32 32L8 20Z" />
      <path d="M8 31L32 43L56 31" />
      <path d="M8 42L32 54L56 42" />
    </>
  ),
  finishes: (
    <>
      <path d="M28 6L32 22L48 26L32 30L28 46L24 30L8 26L24 22Z" />
      <path d="M48 40L50 46L56 48L50 50L48 56L46 50L40 48L46 46Z" />
    </>
  ),
  artwork: (
    <>
      <path d="M12 52L14 42L46 10L54 18L22 50Z" />
      <path d="M40 16L48 24" />
      <path d="M8 58H56" strokeDasharray="4 4" />
    </>
  ),
  "sample-kit": (
    <>
      <path d="M10 24H54V56H10Z" />
      <path d="M10 24L18 12H46L54 24" />
      <path d="M22 40L29 47L43 33" />
    </>
  ),
  guide: (
    <>
      <circle cx="32" cy="32" r="24" />
      <path d="M42 22L28 28L22 42L36 36Z" />
    </>
  ),
  faq: (
    <>
      <path d="M8 12H56V44H30L18 54V44H8Z" />
      <path d="M27 23C27 17 37 17 37 23C37 28 32 28 32 33" />
      <path d="M32 38V39" />
    </>
  ),
  process: (
    <>
      <path d="M8 52H22V40H36V28H50V14" />
      <path d="M44 14H56" />
      <circle cx="15" cy="30" r="4" />
    </>
  ),
  categories: (
    <>
      <path d="M8 8H28V28H8Z" />
      <path d="M36 8H56V28H36Z" />
      <path d="M8 36H28V56H8Z" />
      <path d="M36 36H56V56H36Z" />
    </>
  ),
};

// Industry pages reuse the icon of their main product
const aliases: Record<string, string> = {
  "apparel-packaging": "apparel-boxes",
  "bakery-packaging": "cake-boxes",
  "candle-packaging": "candle-boxes",
  "gift-packaging": "gift-boxes",
  "jewelry-packaging": "jewelry-boxes",
  "health-pharma-packaging": "pharmaceutical-boxes",
  "cosmetic-packaging": "cosmetic-boxes",
};

export function hasNavIcon(name: string) {
  return Boolean(icons[aliases[name] ?? name]);
}

export default function NavIcon({
  name,
  className = "h-8 w-8",
}: {
  name: string;
  className?: string;
}) {
  const icon = icons[aliases[name] ?? name] ?? icons["kraft-boxes"];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
    >
      {icon}
    </svg>
  );
}

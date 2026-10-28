import HandNote from "@/components/HandNote";

const iconProps = {
  "aria-hidden": true,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-7 w-7 shrink-0",
};

// The kinds of brands we make packaging for. Swap in real client logos here
// once customers have given permission to show them.
const brandTypes = [
  {
    name: "Bakeries & Cafes",
    icon: (
      <svg {...iconProps}>
        <path d="M4 12a8 8 0 0 1 16 0v1H4v-1Z" />
        <path d="M5 13v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5M9 9v4M15 9v4" />
      </svg>
    ),
  },
  {
    name: "Cosmetics & Skincare",
    icon: (
      <svg {...iconProps}>
        <rect x="8" y="9" width="8" height="12" rx="2" />
        <path d="M10 9V5h4v4M10 3h4" />
      </svg>
    ),
  },
  {
    name: "Candle Makers",
    icon: (
      <svg {...iconProps}>
        <path d="M7 11h10v10H7zM12 11V8" />
        <path d="M12 3c1.5 1.6 1.5 3.2 0 5-1.5-1.8-1.5-3.4 0-5Z" />
      </svg>
    ),
  },
  {
    name: "Restaurants & Burger Brands",
    icon: (
      <svg {...iconProps}>
        <path d="M4 10a8 5 0 0 1 16 0H4ZM3 14h18M5 17h14a2 2 0 0 1-2 3H7a2 2 0 0 1-2-3Z" />
      </svg>
    ),
  },
  {
    name: "Apparel & Fashion",
    icon: (
      <svg {...iconProps}>
        <path d="M9 3 4 6l2 5 2-1v11h8V10l2 1 2-5-5-3a3 3 0 0 1-6 0Z" />
      </svg>
    ),
  },
  {
    name: "Jewelry Brands",
    icon: (
      <svg {...iconProps}>
        <path d="M6 3h12l3 6-9 12L3 9l3-6ZM3 9h18M9 3l3 18 3-18" />
      </svg>
    ),
  },
  {
    name: "Perfume Houses",
    icon: (
      <svg {...iconProps}>
        <rect x="6" y="9" width="12" height="12" rx="3" />
        <path d="M10 9V6h4v3M9 3h6v3H9z" />
      </svg>
    ),
  },
  {
    name: "Ecommerce Stores",
    icon: (
      <svg {...iconProps}>
        <path d="M3 8 12 3l9 5v8l-9 5-9-5V8Z" />
        <path d="m3 8 9 5 9-5M12 13v8" />
      </svg>
    ),
  },
  {
    name: "Subscription Boxes",
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="8" width="18" height="13" rx="1" />
        <path d="M3 12h18M12 8v13M12 8c-2-4-6-4-6-1s4 1 6 1Zm0 0c2-4 6-4 6-1s-4 1-6 1Z" />
      </svg>
    ),
  },
  {
    name: "Supplements & Pharma",
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="9" width="18" height="7" rx="3.5" transform="rotate(-35 12 12.5)" />
        <path d="m9.5 8.5 5 7" />
      </svg>
    ),
  },
];

export default function BrandTypesStrip() {
  return (
    <section aria-label="Brands we make packaging for" className="bg-white pt-8">
      <div className="flex justify-center px-5">
        <HandNote>Packaging for brands like yours</HandNote>
      </div>

      <div className="brand-marquee mt-4 overflow-hidden border-y border-[#FFD9BF] bg-[#FFF4EC] py-5">
        <ul className="brand-marquee-track flex w-max items-center gap-12 pr-12">
          {/* List is repeated once so the loop has no visible seam */}
          {[...brandTypes, ...brandTypes].map((brand, index) => (
            <li
              key={`${brand.name}-${index}`}
              aria-hidden={index >= brandTypes.length ? true : undefined}
              className="flex items-center gap-3 whitespace-nowrap text-lg font-black tracking-tight text-slate-500"
            >
              <span className="text-[#007C91]">{brand.icon}</span>
              {brand.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

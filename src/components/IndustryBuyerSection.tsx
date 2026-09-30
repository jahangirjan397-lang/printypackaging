import Link from "next/link";

type IndustryIconProps = {
  type: "cosmetic" | "food" | "ecommerce" | "retail" | "gift" | "apparel";
};

const industries = [
  {
    type: "cosmetic" as const,
    title: "Cosmetic Packaging",
    href: "/categories/cosmetic-packaging",
    text: "Rigid boxes, folding cartons, sleeves and premium finishes for beauty and fragrance brands.",
    choices: [
      { label: "Rigid boxes", href: "/products/rigid-boxes" },
      { label: "Folding cartons", href: "/products/folding-cartons" },
      { label: "Foil finishes", href: "/finishing-options" },
    ],
    tone: "bg-[#E6F9FC] text-[#007C91]",
  },
  {
    type: "food" as const,
    title: "Food Packaging",
    href: "/categories/food-packaging",
    text: "Bakery boxes, butter paper, bags and branded wraps for restaurants, bakeries and cafes.",
    choices: [
      { label: "Bakery boxes", href: "/products/bakery-boxes" },
      { label: "Butter paper", href: "/products/butter-paper" },
      { label: "Paper bags", href: "/products/paper-bags" },
    ],
    tone: "bg-[#FFF0E4] text-[#C94F00]",
  },
  {
    type: "ecommerce" as const,
    title: "Ecommerce Packaging",
    href: "/categories/ecommerce-packaging",
    text: "Mailer, shipping and subscription boxes designed for protection and a better unboxing experience.",
    choices: [
      { label: "Mailer boxes", href: "/products/mailer-boxes" },
      { label: "Shipping boxes", href: "/products/shipping-boxes" },
      { label: "Thank you cards", href: "/products/thank-you-cards" },
    ],
    tone: "bg-[#07111F] text-white",
  },
  {
    type: "retail" as const,
    title: "Retail Packaging",
    href: "/categories/retail-packaging",
    text: "Shelf-ready cartons, paper bags, labels and display packaging for physical retail products.",
    choices: [
      { label: "Tuck end boxes", href: "/products/tuck-end-boxes" },
      { label: "Paper bags", href: "/products/paper-bags" },
      { label: "Labels", href: "/products/labels-stickers" },
    ],
    tone: "bg-[#E6F9FC] text-[#007C91]",
  },
  {
    type: "gift" as const,
    title: "Gift Packaging",
    href: "/categories/gift-packaging",
    text: "Luxury rigid and magnetic closure boxes that make premium products feel more valuable.",
    choices: [
      { label: "Rigid boxes", href: "/products/rigid-boxes" },
      { label: "Magnetic boxes", href: "/products/magnetic-boxes" },
      { label: "Gift boxes", href: "/products/gift-boxes" },
    ],
    tone: "bg-[#FFF0E4] text-[#C94F00]",
  },
  {
    type: "apparel" as const,
    title: "Apparel Packaging",
    href: "/categories/apparel-packaging",
    text: "Mailer boxes, branded bags, tags, stickers and inserts for clothing and fashion businesses.",
    choices: [
      { label: "Apparel boxes", href: "/products/apparel-boxes" },
      { label: "Paper bags", href: "/products/paper-bags" },
      { label: "Hang tags", href: "/products/hang-tags" },
    ],
    tone: "bg-[#07111F] text-white",
  },
];

function IndustryIcon({ type }: IndustryIconProps) {
  const commonProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-7 w-7",
    "aria-hidden": true,
  };

  switch (type) {
    case "cosmetic":
      return (
        <svg {...commonProps}>
          <path d="M9 3h6M10 3v4h4V3M8 7h8l1 3v10H7V10l1-3Z" />
          <path d="M10 13h4M12 11v4" />
        </svg>
      );
    case "food":
      return (
        <svg {...commonProps}>
          <path d="M4 8h16l-2 12H6L4 8Z" />
          <path d="M8 8c0-3 2-5 4-5s4 2 4 5" />
          <path d="M9 13c2-2 4-2 6-1-1 3-3 5-6 5 0-2 0-3 0-4Z" />
        </svg>
      );
    case "ecommerce":
      return (
        <svg {...commonProps}>
          <path d="m4 7 8-4 8 4-8 4-8-4Z" />
          <path d="M4 7v10l8 4 8-4V7M12 11v10" />
          <path d="m8 5 8 4" />
        </svg>
      );
    case "retail":
      return (
        <svg {...commonProps}>
          <path d="M5 8h14l-1 13H6L5 8Z" />
          <path d="M8 9V6a4 4 0 0 1 8 0v3" />
          <path d="M9 14h6" />
        </svg>
      );
    case "gift":
      return (
        <svg {...commonProps}>
          <path d="M3 9h18v12H3V9ZM2 5h20v4H2V5ZM12 5v16" />
          <path d="M12 5H8.5C6 5 6 2 8 2c2.2 0 4 3 4 3ZM12 5h3.5C18 5 18 2 16 2c-2.2 0-4 3-4 3Z" />
        </svg>
      );
    default:
      return (
        <svg {...commonProps}>
          <path d="m8 4 4-2 4 2 4 3-3 4v10H7V11L4 7l4-3Z" />
          <path d="M9 4c.5 2 1.5 3 3 3s2.5-1 3-3" />
        </svg>
      );
  }
}

export default function IndustryBuyerSection() {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-[#EEF7FA] px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <span className="inline-flex rounded-full bg-[#FF6A00]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#C94F00]">
              Industries we serve
            </span>
            <h2 className="mt-5 max-w-2xl text-3xl font-black tracking-tight text-[#07111F] sm:text-4xl lg:text-5xl">
              The right packaging for the way you sell.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-slate-600 lg:justify-self-end">
            From beauty shelves to food counters and ecommerce deliveries, we
            help match box structure, material and finishing to your product.
          </p>
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <article
              key={industry.title}
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_16px_45px_rgba(7,17,31,0.06)] transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-[0_24px_65px_rgba(7,17,31,0.10)]"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#00C2E8] via-[#007C91] to-[#FF6A00] opacity-70 transition group-hover:opacity-100" />

              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${industry.tone}`}>
                <IndustryIcon type={industry.type} />
              </div>

              <h3 className="mt-5 text-xl font-black text-[#07111F]">
                <Link href={industry.href} className="transition hover:text-[#C94F00]">
                  {industry.title}
                </Link>
              </h3>
              <p className="mt-3 text-[15px] leading-7 text-slate-600">
                {industry.text}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {industry.choices.map((choice) => (
                  <Link
                    key={choice.href}
                    href={choice.href}
                    className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:bg-[#FFF0E4] hover:text-[#C94F00]"
                  >
                    {choice.label}
                  </Link>
                ))}
              </div>

              <Link
                href={industry.href}
                className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#C94F00] transition group-hover:gap-3 group-hover:text-[#007C91]"
              >
                View {industry.title.toLowerCase()} <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

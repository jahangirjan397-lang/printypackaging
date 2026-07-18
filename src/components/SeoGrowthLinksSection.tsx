import Link from "next/link";

const linkGroups = [
  {
    title: "Custom Packaging",
    links: [
      { label: "Custom Packaging", href: "/custom-packaging" },
      { label: "Custom Packaging USA", href: "/custom-packaging/usa" },
      { label: "Custom Packaging UK", href: "/custom-packaging/uk" },
      { label: "Custom Packaging Canada", href: "/custom-packaging/canada" },
    ],
  },
  {
    title: "Product Packaging",
    links: [
      { label: "Rigid Boxes", href: "/packaging/rigid-boxes" },
      { label: "Mailer Boxes", href: "/packaging/mailer-boxes" },
      { label: "Folding Cartons", href: "/packaging/folding-cartons" },
      { label: "Food Packaging", href: "/packaging/food-packaging" },
    ],
  },
  {
    title: "Brand Packaging",
    links: [
      { label: "Paper Bags", href: "/packaging/paper-bags" },
      { label: "Labels and Stickers", href: "/packaging/labels-stickers" },
      { label: "Packaging Materials", href: "/packaging-materials" },
      { label: "Finishing Options", href: "/finishing-options" },
    ],
  },
];

export default function SeoGrowthLinksSection() {
  return (
    <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-[#FF6A00]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#FF6A00]">
            Explore Packaging
          </span>

          <h2 className="mt-5 text-3xl font-black tracking-tight text-[#07111F] sm:text-4xl lg:text-5xl">
            Find the right custom packaging solution.
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600">
            These pages help buyers find packaging by product type, market,
            material and finishing option.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {linkGroups.map((group) => (
            <div
              key={group.title}
              className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_18px_55px_rgba(7,17,31,0.06)]"
            >
              <h3 className="text-xl font-black text-[#07111F]">
                {group.title}
              </h3>

              <div className="mt-5 grid gap-3">
                {group.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-700 transition hover:border-[#FF6A00] hover:text-[#FF6A00]"
                  >
                    {link.label} →
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

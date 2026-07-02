const groups = [
  {
    title: "Luxury Packaging",
    href: "/products/luxury-packaging",
    items: [
      { name: "Rigid Boxes", href: "/products/rigid-boxes" },
      { name: "Luxury Packaging", href: "/products/luxury-packaging" },
      { name: "Folding Cartons", href: "/products/folding-cartons" },
      { name: "Labels & Stickers", href: "/products/labels-stickers" },
    ],
  },
  {
    title: "Food Packaging",
    href: "/products/food-packaging",
    items: [
      { name: "Butter Paper", href: "/products/butter-paper" },
      { name: "Food Packaging", href: "/products/food-packaging" },
      { name: "Mailer Boxes", href: "/products/mailer-boxes" },
      { name: "Paper Bags", href: "/products/paper-bags" },
    ],
  },
  {
    title: "Retail Packaging",
    href: "/products/paper-bags",
    items: [
      { name: "Paper Bags", href: "/products/paper-bags" },
      { name: "Labels & Stickers", href: "/products/labels-stickers" },
      { name: "Folding Cartons", href: "/products/folding-cartons" },
      { name: "Mailer Boxes", href: "/products/mailer-boxes" },
    ],
  },
];

export default function ProductExplorer() {
  return (
    <section className="bg-white px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.32em] text-[#FF6A00]">
            Product Explorer
          </p>

          <h2 className="mt-4 text-4xl font-black text-[#07111F] md:text-6xl">
            Find packaging by business need
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Help customers quickly choose the best packaging category for their product.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {groups.map((group) => (
            <div
              key={group.title}
              className="pp-card rounded-[2rem] border border-slate-200 bg-[#F7FAFC] p-7"
            >
              <a href={group.href}>
                <div className="mb-6 h-40 rounded-[1.5rem] bg-gradient-to-br from-[#07111F] via-[#007C91] to-[#00C2E8]" />
              </a>

              <h3 className="text-2xl font-black text-[#07111F]">
                {group.title}
              </h3>

              <div className="mt-5 grid gap-3">
                {group.items.map((item) => (
                  <a
                    href={item.href}
                    key={item.name}
                    className="rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-700 transition hover:bg-[#07111F] hover:text-white"
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              <a
                href={group.href}
                className="mt-6 inline-flex font-black text-[#FF6A00] transition hover:text-[#007C91]"
              >
                Explore Category →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
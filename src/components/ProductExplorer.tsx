import Link from "next/link";

const groups = [
  {
    title: "Luxury Packaging",
    href: "/products/luxury-packaging",
    description: "Premium boxes and printed packaging for luxury brands.",
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
    description: "Safe, clean and custom printed packaging for food brands.",
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
    description: "Retail-ready bags, cartons, stickers and shipping boxes.",
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
    <section className="bg-white px-4 py-16 sm:px-5 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#FF6A00] md:text-sm">
            Product Explorer
          </p>

          <h2 className="mt-4 text-3xl font-black leading-tight text-[#07111F] sm:text-4xl md:text-6xl">
            Find packaging by business need
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600 md:text-lg md:leading-8">
            Help customers quickly choose the best packaging category for their
            product.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-3">
          {groups.map((group, index) => (
            <article
              key={group.title}
              className="rounded-[1.7rem] border border-slate-200 bg-[#F7FAFC] p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl md:rounded-[2rem] md:p-7"
            >
              <Link
                href={group.href}
                prefetch={false}
                aria-label={`Explore ${group.title}`}
                className="group block"
              >
                <div className="relative mb-6 h-36 overflow-hidden rounded-[1.4rem] bg-gradient-to-br from-[#07111F] via-[#007C91] to-[#00C2E8] md:h-40 md:rounded-[1.5rem]">
                  <div className="pointer-events-none absolute inset-0 opacity-15 [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:24px_24px]" />

                  <div className="absolute bottom-5 left-5 h-20 w-24 rotate-[-7deg] rounded-2xl bg-white shadow-2xl transition duration-300 group-hover:rotate-[-3deg]" />

                  <div className="absolute bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF6A00] text-sm font-black text-white shadow-xl">
                    {index + 1}
                  </div>
                </div>
              </Link>

              <h3 className="text-2xl font-black text-[#07111F]">
                {group.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {group.description}
              </p>

              <div className="mt-5 grid gap-3">
                {group.items.map((item) => (
                  <Link
                    href={item.href}
                    prefetch={false}
                    key={item.name}
                    className="rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-sm transition hover:bg-[#07111F] hover:text-white"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <Link
                href={group.href}
                prefetch={false}
                className="mt-6 inline-flex font-black text-[#FF6A00] transition hover:text-[#007C91]"
              >
                Explore Category &rarr;
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


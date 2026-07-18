const industries = [
  {
    title: "Cosmetics",
    description:
      "Luxury cosmetic boxes, skincare cartons, serum packaging and beauty product presentation.",
  },
  {
    title: "Food & Bakery",
    description:
      "Food-safe butter paper, bakery boxes, burger wraps and custom printed food packaging.",
  },
  {
    title: "Pharmaceutical",
    description:
      "Clean folding cartons, labels and printed packaging for healthcare and supplement brands.",
  },
  {
    title: "Apparel",
    description:
      "Retail bags, mailer boxes, labels and premium packaging for clothing brands.",
  },
  {
    title: "E-commerce",
    description:
      "Mailer boxes, shipping cartons and branded packaging for online stores.",
  },
  {
    title: "Electronics",
    description:
      "Strong printed boxes and inserts for gadgets, accessories and tech products.",
  },
  {
    title: "Jewelry",
    description:
      "Rigid boxes, drawer boxes and luxury gift packaging for jewelry presentation.",
  },
  {
    title: "Retail",
    description:
      "Shelf-ready cartons, bags, stickers and promotional packaging for retail brands.",
  },
];

export default function Industries() {
  return (
    <section
      id="industries"
      className="relative overflow-hidden bg-[#07111F] px-4 py-16 text-white sm:px-5 md:px-8 md:py-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(0,194,232,0.18),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(255,106,0,0.12),transparent_28%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#FF6A00] md:text-sm">
            Industries We Serve
          </p>

          <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl md:text-6xl">
            Packaging for every business category
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-300 md:text-lg md:leading-8">
            From luxury cosmetics to food-safe packaging, PrintyPackaging helps
            brands create premium packaging experiences for every market.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-6">
          {industries.map((item, index) => (
            <article
              key={item.title}
              className="rounded-[1.7rem] border border-white/10 bg-white/[0.04] p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#00C2E8]/30 hover:bg-white/[0.07] hover:shadow-xl md:p-7"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF6A00] to-[#00C2E8] text-sm font-black text-white shadow-xl shadow-cyan-500/10">
                {index + 1}
              </div>

              <h3 className="text-xl font-black md:text-2xl">{item.title}</h3>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


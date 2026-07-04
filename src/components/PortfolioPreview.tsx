const portfolioItems = [
  {
    title: "Luxury Boxes",
    description: "Premium rigid and magnetic boxes for luxury brand presentation.",
    tag: "Luxury",
  },
  {
    title: "Food Packaging",
    description: "Custom printed food boxes, wraps and safe packaging solutions.",
    tag: "Food",
  },
  {
    title: "Cosmetic Boxes",
    description: "Retail-ready skincare, makeup and beauty product packaging.",
    tag: "Cosmetics",
  },
  {
    title: "Butter Paper",
    description: "Branded wrapping paper for burgers, bakery and restaurant use.",
    tag: "Wrapping",
  },
  {
    title: "Paper Bags",
    description: "Custom retail bags for fashion, gifts and shopping brands.",
    tag: "Retail",
  },
  {
    title: "Labels",
    description: "Printed labels and stickers for products, jars and packaging.",
    tag: "Labels",
  },
];

export default function PortfolioPreview() {
  return (
    <section className="bg-white px-4 py-16 sm:px-5 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#FF6A00] md:text-sm">
            Portfolio
          </p>

          <h2 className="mt-4 text-3xl font-black leading-tight text-[#07111F] sm:text-4xl md:text-5xl">
            Packaging work that builds trust
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600 md:text-lg md:leading-8">
            Explore packaging styles designed for premium presentation, strong
            shelf impact and better customer experience.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-6">
          {portfolioItems.map((item, index) => (
            <article
              key={item.title}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-[#F7FAFC] shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl"
            >
              <div className="relative h-56 overflow-hidden bg-gradient-to-br from-[#07111F] via-[#007C91] to-[#00C2E8] sm:h-60 md:h-64">
                <div className="pointer-events-none absolute inset-0 opacity-15 [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:24px_24px]" />

                <div className="absolute bottom-8 left-8 h-28 w-32 rotate-[-8deg] rounded-2xl bg-white shadow-2xl transition duration-300 group-hover:rotate-[-3deg]" />

                <div className="absolute bottom-10 right-8 h-36 w-24 rounded-2xl bg-[#07111F] shadow-2xl transition duration-300 group-hover:-translate-y-2">
                  <div className="mx-auto mt-6 h-9 w-9 rounded-full border border-[#FF6A00]" />
                  <p className="mt-4 text-center text-[10px] font-black tracking-widest text-white">
                    PACK
                  </p>
                </div>

                <span className="absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1 text-xs font-black text-[#07111F]">
                  {item.tag}
                </span>

                <span className="absolute bottom-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#FF6A00] text-xs font-black text-white">
                  {index + 1}
                </span>
              </div>

              <div className="p-5 text-left md:p-6">
                <h3 className="text-xl font-black text-[#07111F]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>

                <div className="mt-5 inline-flex rounded-full bg-[#FF6A00]/10 px-4 py-2 text-xs font-black text-[#FF6A00]">
                  Project Preview
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
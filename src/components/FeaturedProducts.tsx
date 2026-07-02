export default function FeaturedProducts() {
  const products = [
    {
      title: "Rigid Boxes",
      text: "Luxury rigid packaging for perfumes, cosmetics, gifts and premium products.",
      tag: "Luxury",
    },
    {
      title: "Folding Cartons",
      text: "Custom printed cartons for retail, food, pharma and cosmetic brands.",
      tag: "Offset Print",
    },
    {
      title: "Mailer Boxes",
      text: "Strong branded boxes for e-commerce, subscriptions and shipping.",
      tag: "E-commerce",
    },
    {
      title: "Food Packaging",
      text: "Food-safe packaging for bakeries, restaurants, burger and snack brands.",
      tag: "Food Safe",
    },
    {
      title: "Butter Paper",
      text: "Printed butter paper, deli paper and greaseproof wrapping solutions.",
      tag: "Wrapping",
    },
    {
      title: "Paper Bags",
      text: "Premium retail paper bags with custom printing and luxury finishing.",
      tag: "Retail",
    },
    {
      title: "Labels & Stickers",
      text: "High-quality labels and stickers for product branding and packaging.",
      tag: "Branding",
    },
    {
      title: "Luxury Packaging",
      text: "Premium foiling, embossing, spot UV and high-end presentation boxes.",
      tag: "Premium",
    },
  ];

  return (
    <section id="products" className="bg-[#F7FAFC] px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.32em] text-[#FF6A00]">
            Featured Products
          </p>

          <h2 className="mt-4 text-4xl font-black leading-tight text-[#07111F] md:text-6xl">
            Custom packaging for every product
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Premium boxes, bags, labels and food wrapping solutions built for
            brands that want better presentation and stronger shelf impact.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((item, index) => (
            <article
              key={item.title}
              className="pp-card group overflow-hidden rounded-[1.7rem] border border-slate-200 bg-white shadow-md"
            >
              <div className="relative h-52 overflow-hidden bg-gradient-to-br from-[#07111F] via-[#007C91] to-[#00C2E8] p-5">
                <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:22px_22px]" />

                <div className="absolute bottom-5 left-5 h-28 w-28 rotate-[-8deg] rounded-2xl bg-white shadow-2xl transition group-hover:rotate-[-3deg]" />

                <div className="absolute bottom-8 right-7 h-36 w-24 rounded-2xl bg-[#07111F] shadow-2xl transition group-hover:-translate-y-2">
                  <div className="mx-auto mt-7 h-10 w-10 rounded-full border border-[#FF6A00]" />
                  <p className="mt-4 text-center text-[10px] font-black tracking-widest text-white">
                    BOX
                  </p>
                </div>

                <span className="absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1 text-xs font-black text-[#07111F]">
                  {item.tag}
                </span>

                <span className="absolute bottom-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#FF6A00] text-sm font-black text-white">
                  {index + 1}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-black text-[#07111F]">{item.title}</h3>

                <p className="mt-3 min-h-20 text-sm leading-6 text-slate-600">
                  {item.text}
                </p>

                <button className="mt-5 font-black text-[#FF6A00] transition hover:text-[#007C91]">
                  View Details →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
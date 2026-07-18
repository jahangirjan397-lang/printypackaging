const materials = [
  {
    title: "Kraft Paper",
    text: "Eco-friendly and durable material for natural product packaging.",
    use: "Best for food, retail and eco brands",
  },
  {
    title: "SBS Board",
    text: "Smooth white board for sharp printing and premium folding cartons.",
    use: "Best for cosmetics, pharma and retail",
  },
  {
    title: "Rigid Board",
    text: "Thick luxury board for premium gift boxes and high-end packaging.",
    use: "Best for perfume, jewelry and luxury products",
  },
  {
    title: "Corrugated Board",
    text: "Strong fluted board for shipping, mailer and e-commerce boxes.",
    use: "Best for delivery and subscription boxes",
  },
  {
    title: "Butter Paper",
    text: "Food-safe wrapping paper for burgers, bakery, sandwiches and snacks.",
    use: "Best for food wrapping",
  },
  {
    title: "Greaseproof Paper",
    text: "Oil-resistant paper for clean and professional food presentation.",
    use: "Best for restaurants and bakeries",
  },
];

export default function Materials() {
  return (
    <section
      id="materials"
      className="bg-[#F7FAFC] px-4 py-16 sm:px-5 md:px-8 md:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#FF6A00] md:text-sm">
              Materials
            </p>

            <h2 className="mt-4 text-3xl font-black leading-tight text-[#07111F] sm:text-4xl md:text-6xl">
              Choose the right material for your packaging
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
              The right paper or board improves protection, printing quality,
              shelf presentation and the final customer experience.
            </p>
          </div>

          <div className="rounded-[2rem] bg-gradient-to-br from-[#07111F] via-[#007C91] to-[#00C2E8] p-6 text-white shadow-2xl md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-100 md:text-sm">
              Material Guidance
            </p>

            <h3 className="mt-3 text-2xl font-black leading-tight md:text-3xl">
              We help clients select board, paper and finish based on product
              use, budget and brand style.
            </h3>

            <p className="mt-4 text-sm leading-6 text-cyan-50 md:text-base md:leading-7">
              From kraft to rigid board, every material is selected for print
              result, durability and presentation.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-6">
          {materials.map((item, index) => (
            <article
              key={item.title}
              className="rounded-[1.7rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl md:p-7"
            >
              <div className="mb-6 flex items-center justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00C2E8]/15 text-sm font-black text-[#007C91] md:h-14 md:w-14">
                  {index + 1}
                </div>

                <span className="rounded-full bg-[#FF6A00]/10 px-4 py-2 text-xs font-black text-[#FF6A00]">
                  Material
                </span>
              </div>

              <h3 className="text-xl font-black text-[#07111F] md:text-2xl">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600 md:text-base md:leading-7">
                {item.text}
              </p>

              <div className="mt-5 rounded-2xl bg-[#F7FAFC] p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                  Recommended Use
                </p>

                <p className="mt-2 text-sm font-bold leading-6 text-slate-700">
                  {item.use}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

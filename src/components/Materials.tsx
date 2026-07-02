export default function Materials() {
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

  return (
    <section id="materials" className="bg-[#F7FAFC] px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.32em] text-[#FF6A00]">
              Materials
            </p>

            <h2 className="mt-4 text-4xl font-black leading-tight text-[#07111F] md:text-6xl">
              Choose the right material for your packaging
            </h2>

            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              The right material improves product protection, printing quality,
              shelf presentation and customer experience.
            </p>
          </div>

          <div className="rounded-[2rem] bg-gradient-to-br from-[#07111F] via-[#007C91] to-[#00C2E8] p-8 text-white shadow-2xl">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-cyan-100">
              Material guidance
            </p>
            <h3 className="mt-3 text-3xl font-black">
              We help clients select board, paper and finish based on product use.
            </h3>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {materials.map((item, index) => (
            <article
              key={item.title}
              className="pp-card rounded-[1.7rem] border border-slate-200 bg-white p-7 shadow-md"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00C2E8]/15 text-2xl font-black text-[#007C91]">
                  {index + 1}
                </div>

                <span className="rounded-full bg-[#FF6A00]/10 px-4 py-2 text-xs font-black text-[#FF6A00]">
                  Material
                </span>
              </div>

              <h3 className="text-2xl font-black text-[#07111F]">{item.title}</h3>

              <p className="mt-3 leading-7 text-slate-600">{item.text}</p>

              <p className="mt-5 rounded-2xl bg-[#F7FAFC] p-4 text-sm font-bold text-slate-700">
                {item.use}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
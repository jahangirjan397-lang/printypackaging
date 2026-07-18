const trustItems = [
  {
    title: "Quote-Focused Support",
    text: "We guide buyers with size, quantity, material, printing and finishing details before final quote planning.",
  },
  {
    title: "International Buyer Ready",
    text: "Our website is built for USA, UK, Canada, Europe, UAE and worldwide custom packaging inquiries.",
  },
  {
    title: "Material & Finish Guidance",
    text: "We help explain paperboard, kraft, corrugated stock, rigid board, lamination, foil, embossing and spot UV.",
  },
  {
    title: "Product Page Direction",
    text: "Buyers can explore products, categories, markets and packaging guides before submitting an inquiry.",
  },
];

export default function BuyerTrustSection() {
  return (
    <section className="bg-slate-50 text-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-[#FF6A00]">
            Buyer Trust
          </p>

          <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
            Built for serious packaging buyers.
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Printy Packaging is designed to help brands understand packaging
            options clearly before moving toward quote and production planning.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-white p-7 shadow-lg shadow-slate-200/60"
            >
              <div className="mb-5 h-11 w-11 rounded-2xl bg-[#FF6A00] shadow-lg shadow-orange-500/20" />

              <h3 className="text-xl font-black tracking-tight">
                {item.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-600">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


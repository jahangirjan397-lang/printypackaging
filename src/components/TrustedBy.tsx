export default function TrustedBy() {
  const items = [
    "Startups",
    "Food Brands",
    "Cosmetics",
    "Pharma",
    "E-commerce",
    "Retail",
  ];

  return (
    <section className="border-y border-slate-200 bg-white px-5 py-12 md:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-center text-xs font-black uppercase tracking-[0.32em] text-slate-500 md:text-sm">
          Trusted packaging partner for growing brands
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {items.map((item) => (
            <div
              key={item}
              className="pp-card flex h-20 items-center justify-center rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 text-center text-sm font-black text-[#07111F]"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


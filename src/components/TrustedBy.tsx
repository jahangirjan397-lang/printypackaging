const buyerTypes = [
  "Startups",
  "Food Brands",
  "Cosmetics",
  "Pharma",
  "E-commerce",
  "Retail",
];

export default function TrustedBy() {
  return (
    <section
      aria-labelledby="buyer-types-heading"
      className="border-y border-slate-200 bg-white px-5 py-8 md:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <p
          id="buyer-types-heading"
          className="text-center text-xs font-black uppercase tracking-[0.28em] text-slate-500 md:text-sm"
        >
          Packaging support for growing businesses
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {buyerTypes.map((item) => (
            <div
              key={item}
              className="flex min-h-16 items-center justify-center rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 text-center text-sm font-black text-[#07111F]"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

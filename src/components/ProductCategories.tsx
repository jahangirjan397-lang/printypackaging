export default function WhyChooseUs() {
  const items = [
    "Premium Quality",
    "Custom Solutions",
    "Fast Quote Support",
    "Printing Expertise",
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
          Why Choose Us
        </p>

        <h2 className="mt-4 max-w-3xl text-5xl font-black text-slate-900">
          Packaging made with quality, speed and care.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {items.map((item) => (
            <div
              key={item}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-7"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 font-black text-white">
                ✓
              </div>
              <h3 className="text-xl font-black text-slate-900">{item}</h3>
              <p className="mt-3 text-slate-600">
                Professional packaging support for premium brands worldwide.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

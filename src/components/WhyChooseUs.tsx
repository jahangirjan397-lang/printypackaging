export default function WhyChooseUs() {
  const items = [
    {
      title: "Premium Quality",
      text: "High-quality materials, sharp printing and professional finishing.",
    },
    {
      title: "Custom Solutions",
      text: "Boxes, bags, labels and wrapping papers made for your brand.",
    },
    {
      title: "Fast Support",
      text: "Quick quote support for USA, UK, Europe and worldwide clients.",
    },
    {
      title: "Printing Expertise",
      text: "Offset printing, foiling, embossing, lamination and die cutting.",
    },
  ];

  return (
    <section className="bg-white px-5 py-24 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.32em] text-[#FF6A00]">
            Why Choose Us
          </p>

          <h2 className="mt-4 text-4xl font-black leading-tight text-[#07111F] md:text-6xl">
            Packaging made with quality, speed and care.
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Printy Packaging helps businesses create premium printed packaging
            that protects products, improves presentation and builds trust.
          </p>

          <a
            href="#quote"
            className="mt-8 inline-flex rounded-full bg-[#07111F] px-7 py-4 font-black text-white transition hover:-translate-y-1 hover:bg-[#FF6A00]"
          >
            Start Your Quote
          </a>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {items.map((item) => (
            <div
              key={item.title}
              className="pp-card rounded-[1.7rem] border border-slate-200 bg-[#F7FAFC] p-7"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00C2E8] font-black text-[#07111F]">
                ✓
              </div>

              <h3 className="text-xl font-black text-[#07111F]">{item.title}</h3>

              <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
const reasons = [
  {
    title: "Premium Quality",
    text: "High-quality materials, sharp printing and professional finishing for every packaging order.",
  },
  {
    title: "Custom Solutions",
    text: "Boxes, bags, labels and wrapping papers made around your exact brand and product needs.",
  },
  {
    title: "Fast Support",
    text: "Quick quote support for USA, UK, Europe and worldwide clients with clear communication.",
  },
  {
    title: "Printing Expertise",
    text: "Offset printing, foiling, embossing, lamination, die cutting and complete prepress support.",
  },
];

const highlights = ["Quality Control", "Print Ready Support", "Global Buyers", "Custom Sizes"];

export default function WhyChooseUs() {
  return (
    <section className="bg-white px-4 py-16 sm:px-5 md:px-8 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#FF6A00] md:text-sm">
            Why Choose Us
          </p>

          <h2 className="mt-4 text-3xl font-black leading-tight text-[#07111F] sm:text-4xl md:text-6xl">
            Packaging made with quality, speed and care
          </h2>

          <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
            PrintyPackaging helps businesses create premium printed packaging
            that protects products, improves presentation and builds customer
            trust.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {highlights.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-3 text-sm font-black text-[#07111F]"
              >
                <span className="mr-2 text-[#FF6A00]">&#10003;</span>
                {item}
              </div>
            ))}
          </div>

          <a
            href="#quote"
            className="mt-8 inline-flex rounded-full bg-[#07111F] px-7 py-4 text-sm font-black text-white shadow-xl shadow-slate-900/20 transition hover:-translate-y-1 hover:bg-[#FF6A00]"
          >
            Start Your Quote
          </a>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {reasons.map((item, index) => (
            <article
              key={item.title}
              className="rounded-[1.7rem] border border-slate-200 bg-[#F7FAFC] p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl md:p-7"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00C2E8]/15 text-sm font-black text-[#007C91]">
                {index + 1}
              </div>

              <h3 className="text-lg font-black text-[#07111F] md:text-xl">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600 md:text-base md:leading-7">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


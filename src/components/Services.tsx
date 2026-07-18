const services = [
  {
    title: "Offset Printing",
    description: "High-quality offset printing for boxes, cartons and labels.",
  },
  {
    title: "Digital Printing",
    description: "Fast short-run printing for samples and urgent packaging jobs.",
  },
  {
    title: "Packaging Design",
    description: "Professional artwork and layout support for custom packaging.",
  },
  {
    title: "Die Cutting",
    description: "Accurate cutting, creasing and box shape production.",
  },
  {
    title: "Foiling",
    description: "Gold, silver and custom foil finishing for premium packaging.",
  },
  {
    title: "Embossing",
    description: "Raised logo and texture effects for luxury brand presentation.",
  },
  {
    title: "Lamination",
    description: "Gloss, matte and soft-touch lamination for better protection.",
  },
  {
    title: "Artwork Support",
    description: "Prepress checking, bleed, safety margin and print-ready files.",
  },
];

export default function Services() {
  return (
    <section className="bg-[#F7FAFC] px-4 py-16 sm:px-5 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#FF6A00] md:text-sm">
              Services
            </p>

            <h2 className="mt-4 text-3xl font-black leading-tight text-[#07111F] sm:text-4xl md:text-6xl">
              Complete printing and packaging support
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-600 md:text-lg md:leading-8">
              From design to print finishing, clients get full packaging support
              under one professional workflow.
            </p>

            <div className="mt-7 rounded-3xl border border-[#00C2E8]/20 bg-white p-5 shadow-sm">
              <p className="text-sm font-black text-[#07111F]">
                One team for design, printing, finishing and packaging delivery.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((service) => (
              <article
                key={service.title}
                className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl md:p-6"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#00C2E8]/15 text-sm font-black text-[#007C91]">
                  &#10003;
                </div>

                <h3 className="text-lg font-black text-[#07111F] md:text-xl">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Services() {
  const services = [
    "Offset Printing",
    "Digital Printing",
    "Packaging Design",
    "Die Cutting",
    "Foiling",
    "Embossing",
    "Lamination",
    "Artwork Support",
  ];

  return (
    <section className="bg-[#F7FAFC] px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.32em] text-[#FF6A00]">
              Services
            </p>
            <h2 className="mt-4 text-4xl font-black leading-tight text-[#07111F] md:text-6xl">
              Complete printing and packaging support
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              From design to print finishing, clients get full packaging support
              under one professional workflow.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {services.map((service) => (
              <div
                key={service}
                className="pp-card rounded-[1.5rem] border border-slate-200 bg-white p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00C2E8]/15 font-black text-[#007C91]">
                  ✓
                </div>
                <h3 className="text-xl font-black text-[#07111F]">{service}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
const strengths = [
  {
    number: "01",
    title: "Factory-aware guidance",
    text: "Paper stock, construction, printing and finishing advice from a production-focused team.",
  },
  {
    number: "02",
    title: "Faster quote support",
    text: "Clear requirements help us prepare a practical quote without unnecessary back-and-forth.",
  },
  {
    number: "03",
    title: "Premium print planning",
    text: "CMYK, Pantone, foil, embossing, spot UV and lamination planned for your product.",
  },
  {
    number: "04",
    title: "Worldwide buyer support",
    text: "Packaging guidance for brands across the USA, UK, Canada, Europe, Australia and beyond.",
  },
];

const comparisonRows = [
  {
    feature: "Box style guidance",
    printy: "Included",
    normal: "Limited",
  },
  {
    feature: "Material & GSM advice",
    printy: "Included",
    normal: "Basic",
  },
  {
    feature: "Premium finish planning",
    printy: "Foil, UV, embossing & lamination",
    normal: "Limited options",
  },
  {
    feature: "Quote support channels",
    printy: "Form, WhatsApp & live chat",
    normal: "Form only",
  },
  {
    feature: "Production knowledge",
    printy: "Printing & packaging focused",
    normal: "Mostly sales focused",
  },
];

export default function WhyChoosePrintySection() {
  return (
    <section className="relative overflow-hidden bg-[#07111F] px-4 py-14 text-white sm:px-6 lg:px-8 lg:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(0,194,232,0.16),transparent_30%),radial-gradient(circle_at_88%_78%,rgba(255,106,0,0.13),transparent_27%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <div>
          <span className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-200">
            Why Printy Packaging
          </span>

          <h2 className="mt-5 max-w-xl text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
            Packaging support built around real production.
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
            Plan custom boxes with clearer material choices, practical artwork
            guidance and finishing support before your order reaches production.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {strengths.map((item) => (
              <article
                key={item.number}
                className="rounded-2xl border border-white/10 bg-white/[0.055] p-5 backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-white/[0.08]"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FF6A00] text-xs font-black text-white">
                    {item.number}
                  </span>
                  <h3 className="text-base font-black text-white">
                    {item.title}
                  </h3>
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white text-[#07111F] shadow-[0_30px_100px_rgba(0,0,0,0.28)]">
          <div className="bg-gradient-to-r from-[#0B2031] to-[#103A4B] px-6 py-6 sm:px-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.22em] text-[#60E7FF]">
                  Buyer comparison
                </span>
                <h3 className="mt-2 text-2xl font-black text-white">
                  More guidance at every decision
                </h3>
              </div>
              <span className="w-fit rounded-full bg-[#FF6A00] px-4 py-2 text-xs font-black text-white">
                Printy advantage
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[590px]">
              <div className="grid grid-cols-[1.1fr_1fr_0.8fr] bg-slate-50 px-6 py-3 text-[11px] font-black uppercase tracking-[0.15em] text-slate-500">
                <span>Buyer need</span>
                <span className="text-[#007C91]">With Printy</span>
                <span>Typical seller</span>
              </div>

              <div className="divide-y divide-slate-200">
                {comparisonRows.map((row) => (
                  <div
                    key={row.feature}
                    className="grid grid-cols-[1.1fr_1fr_0.8fr] gap-4 px-6 py-4 text-sm"
                  >
                    <span className="font-black text-[#07111F]">
                      {row.feature}
                    </span>
                    <span className="font-bold leading-6 text-[#007C91]">
                      <span className="mr-2 text-[#FF6A00]">✓</span>
                      {row.printy}
                    </span>
                    <span className="leading-6 text-slate-500">
                      {row.normal}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-orange-100 bg-[#FFF3E9] px-6 py-4">
            <p className="text-sm font-bold leading-6 text-[#07111F]">
              Clearer planning means fewer surprises before printing begins.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const rows = [
  {
    feature: "Custom Sizes",
    printy: "Yes, fully custom",
    others: "Limited options",
  },
  {
    feature: "Premium Finishing",
    printy: "Foil, emboss, UV, lamination",
    others: "Basic finishing",
  },
  {
    feature: "Artwork Support",
    printy: "Prepress checking included",
    others: "Usually not included",
  },
  {
    feature: "Material Guidance",
    printy: "Board and paper suggestion",
    others: "Customer decides alone",
  },
  {
    feature: "Quote Support",
    printy: "Fast packaging quote help",
    others: "Slow or unclear pricing",
  },
  {
    feature: "AI Quote System",
    printy: "Coming soon",
    others: "Not available",
  },
];

export default function ComparisonTable() {
  return (
    <section className="relative overflow-hidden bg-[#07111F] px-4 py-16 text-white sm:px-5 md:px-8 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,194,232,0.16),transparent_30%),radial-gradient(circle_at_85%_75%,rgba(255,106,0,0.14),transparent_28%)]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#00C2E8] md:text-sm">
            Why PrintyPackaging
          </p>

          <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
            Built for serious packaging buyers
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-300 md:text-lg md:leading-8">
            Compare professional packaging support with basic supplier service,
            from custom sizes to artwork checking and premium finishing.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-cyan-500/10 lg:mt-14">
          <div className="hidden grid-cols-3 border-b border-white/10 bg-white/[0.08] p-5 text-left md:grid">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-300">
              Feature
            </p>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#00C2E8]">
              PrintyPackaging
            </p>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-400">
              Basic Supplier
            </p>
          </div>

          {rows.map((row) => (
            <div
              key={row.feature}
              className="grid gap-4 border-b border-white/10 p-5 last:border-0 md:grid-cols-3 md:gap-6"
            >
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500 md:hidden">
                  Feature
                </p>
                <p className="mt-1 font-black text-white md:mt-0">
                  {row.feature}
                </p>
              </div>

              <div className="rounded-2xl bg-[#00C2E8]/10 p-4 md:rounded-none md:bg-transparent md:p-0">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00C2E8] md:hidden">
                  PrintyPackaging
                </p>
                <p className="mt-1 font-bold leading-6 text-[#9FEFFF] md:mt-0">
                  <span className="mr-2 text-[#00C2E8]">&#10003;</span>
                  {row.printy}
                </p>
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500 md:hidden">
                  Basic Supplier
                </p>
                <p className="mt-1 font-bold leading-6 text-slate-400 md:mt-0">
                  {row.others}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-3xl rounded-3xl border border-[#FF6A00]/20 bg-[#FF6A00]/10 p-5 text-center">
          <p className="text-sm font-bold leading-6 text-slate-200 md:text-base">
            PrintyPackaging is being built as a complete packaging quote,
            production guidance and CRM-ready platform for global buyers.
          </p>
        </div>
      </div>
    </section>
  );
}
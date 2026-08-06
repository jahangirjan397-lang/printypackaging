const preProductionChecks = [
  {
    title: "Structure and dimensions",
    text: "Review the product size, box construction and packing method.",
  },
  {
    title: "Material direction",
    text: "Compare board, paper, corrugated and thickness requirements.",
  },
  {
    title: "Print and finishing",
    text: "Confirm colours, coatings, foil, embossing, UV and lamination.",
  },
  {
    title: "Artwork and delivery",
    text: "Check the dieline, artwork status, quantity and delivery country.",
  },
];

export default function WhyChoosePrintySection() {
  return (
    <section className="relative overflow-hidden bg-[#07111F] px-4 py-12 text-white sm:px-6 lg:px-8 lg:py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(0,194,232,0.16),transparent_30%),radial-gradient(circle_at_88%_78%,rgba(255,106,0,0.13),transparent_27%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <div>
          <span className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-200">
            Pre-production clarity
          </span>

          <h2 className="mt-5 max-w-xl text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
            Clear packaging decisions before production begins.
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
            Share the essential project details so structure, material, artwork
            and finishing can be reviewed together before quotation.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {preProductionChecks.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/[0.055] p-4 backdrop-blur-sm"
            >
              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#FF6A00] text-xs font-black text-white"
                >
                  ✓
                </span>

                <div>
                  <h3 className="text-sm font-black text-white sm:text-base">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-5 text-slate-300 sm:text-sm">
                    {item.text}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

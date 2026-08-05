const deliverables = [
  {
    title: "Structure guidance",
    text: "Choose a box style that suits the product, packing method and buyer experience.",
  },
  {
    title: "Material recommendations",
    text: "Compare practical paper, board and corrugated options for the required construction.",
  },
  {
    title: "Print and finish planning",
    text: "Review CMYK, Pantone, foil, embossing, spot UV and lamination before production.",
  },
  {
    title: "Artwork and dieline support",
    text: "Prepare artwork around folds, bleed, safe areas, panels and finishing positions.",
  },
];

const preProductionChecks = [
  "Product dimensions and box construction",
  "Material and thickness direction",
  "Printing colours and finishing requirements",
  "Artwork, dieline and delivery information",
];

export default function WhyChoosePrintySection() {
  return (
    <section className="relative overflow-hidden bg-[#07111F] px-4 py-14 text-white sm:px-6 lg:px-8 lg:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(0,194,232,0.16),transparent_30%),radial-gradient(circle_at_88%_78%,rgba(255,106,0,0.13),transparent_27%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <span className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-200">
            What buyers receive
          </span>

          <h2 className="mt-5 max-w-2xl text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
            Clear packaging decisions before production begins.
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
            Practical guidance helps connect the box structure, material,
            artwork and finishing requirements in one production-ready brief.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {deliverables.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/[0.055] p-5 backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-white/[0.08]"
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FF6A00] text-sm font-black text-white"
                  >
                    ✓
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

        <aside className="overflow-hidden rounded-[2rem] border border-white/10 bg-white text-[#07111F] shadow-[0_30px_100px_rgba(0,0,0,0.28)]">
          <div className="bg-gradient-to-r from-[#0B2031] to-[#103A4B] px-6 py-6 sm:px-7">
            <span className="text-xs font-black uppercase tracking-[0.22em] text-[#60E7FF]">
              Pre-production clarity
            </span>
            <h3 className="mt-2 text-2xl font-black text-white">
              Information reviewed for a practical quote
            </h3>
          </div>

          <div className="space-y-3 p-6 sm:p-7">
            {preProductionChecks.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-[#F7FAFC] p-4"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EAFBFE] text-xs font-black text-[#007C91]"
                >
                  ✓
                </span>
                <p className="text-sm font-bold leading-6 text-[#07111F]">
                  {item}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-orange-100 bg-[#FFF3E9] px-6 py-4">
            <p className="text-sm font-bold leading-6 text-[#07111F]">
              Not sure about a technical option? Share the product and intended
              use so the team can recommend a suitable direction.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}

const checks = [
  {
    title: "Material Inspection",
    text: "Paper, board and packaging material are checked before production starts.",
  },
  {
    title: "Color Matching",
    text: "Print colors are reviewed for consistency, sharpness and brand accuracy.",
  },
  {
    title: "Artwork Check",
    text: "Bleed, safe margin, fonts, images and print-ready files are verified.",
  },
  {
    title: "Die Line Accuracy",
    text: "Cutting, creasing, folding and box structure are checked against the dieline.",
  },
  {
    title: "Finishing Review",
    text: "Foiling, embossing, lamination, UV and special finishes are inspected.",
  },
  {
    title: "Final Packing",
    text: "Completed packaging is counted, packed and prepared safely for delivery.",
  },
];

export default function QualityControl() {
  return (
    <section className="relative overflow-hidden bg-[#07111F] px-4 py-16 text-white sm:px-5 md:px-8 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,194,232,0.16),transparent_30%),radial-gradient(circle_at_85%_75%,rgba(255,106,0,0.14),transparent_28%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#00C2E8] md:text-sm">
            Quality Control
          </p>

          <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl md:text-6xl">
            Every packaging job needs professional checking
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-300 md:text-lg md:leading-8">
            From artwork to final packing, each step is checked to reduce
            production mistakes and deliver premium packaging quality.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-6">
          {checks.map((check, index) => (
            <article
              key={check.title}
              className="rounded-[1.7rem] border border-white/10 bg-white/[0.05] p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#00C2E8]/30 hover:bg-white/[0.08] hover:shadow-xl md:p-7"
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF6A00] text-sm font-black text-white shadow-lg shadow-orange-500/20">
                  QC
                </div>

                <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-black text-slate-200">
                  Step {index + 1}
                </span>
              </div>

              <h3 className="text-lg font-black md:text-xl">{check.title}</h3>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                {check.text}
              </p>

              <div className="mt-5 h-1.5 w-16 rounded-full bg-gradient-to-r from-[#FF6A00] to-[#00C2E8]" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
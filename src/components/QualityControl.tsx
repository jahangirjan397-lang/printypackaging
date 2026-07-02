export default function QualityControl() {
  const checks = [
    "Material Inspection",
    "Color Matching",
    "Artwork Check",
    "Die Line Accuracy",
    "Finishing Review",
    "Final Packing",
  ];

  return (
    <section className="bg-[#07111F] px-5 py-24 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.32em] text-[#00C2E8]">
            Quality Control
          </p>
          <h2 className="mt-4 text-4xl font-black md:text-6xl">
            Every job needs professional checking
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            A serious packaging website must show customers that production is
            controlled from artwork to delivery.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {checks.map((check) => (
            <div
              key={check}
              className="pp-card rounded-[1.7rem] border border-white/10 bg-white/[0.05] p-7"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF6A00] font-black text-white">
                QC
              </div>
              <h3 className="text-xl font-black">{check}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Professional checkpoint for premium packaging production.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
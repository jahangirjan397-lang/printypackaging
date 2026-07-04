const checks = [
  {
    title: "CMYK Color Mode",
    text: "Artwork should be prepared in CMYK for accurate offset and digital printing.",
  },
  {
    title: "Bleed Included",
    text: "Add proper bleed around the design so cutting edges stay clean after trimming.",
  },
  {
    title: "High Resolution",
    text: "Use 300 DPI images and sharp vector graphics for premium print quality.",
  },
  {
    title: "Fonts Outlined",
    text: "Convert fonts to outlines or include font files to avoid missing font issues.",
  },
  {
    title: "Die Line Ready",
    text: "Keep die line, crease, cut and safe margin guides clear and print-ready.",
  },
];

export default function ArtworkGuide() {
  return (
    <section className="bg-[#F7FAFC] px-4 py-16 sm:px-5 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#FF6A00] md:text-sm">
              Artwork Guide
            </p>

            <h2 className="mt-4 text-3xl font-black leading-tight text-[#07111F] sm:text-4xl md:text-5xl">
              Prepare print-ready artwork before production
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-600 md:text-lg md:leading-8">
              Correct artwork setup helps avoid printing errors, color issues,
              cutting problems and production delays.
            </p>

            <div className="mt-7 rounded-3xl bg-[#07111F] p-6 text-white shadow-xl">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#00C2E8]">
                Prepress Support
              </p>

              <p className="mt-3 text-lg font-black leading-7">
                Our team can check bleed, colors, die line, fonts and file setup
                before printing.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {checks.map((item, index) => (
              <article
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#00C2E8]/15 text-sm font-black text-[#007C91]">
                  {index + 1}
                </div>

                <h3 className="text-lg font-black text-[#07111F]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {item.text}
                </p>

                <div className="mt-5 inline-flex rounded-full bg-[#FF6A00]/10 px-3 py-1 text-xs font-black text-[#FF6A00]">
                  Required Check
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
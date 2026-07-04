const fileTypes = ["PDF", "AI", "PSD", "CDR", "ZIP"];

export default function UploadArtworkCTA() {
  return (
    <section className="bg-white px-4 py-16 sm:px-5 md:px-8 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-[#F7FAFC] p-6 shadow-sm md:p-8 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#FF6A00] md:text-sm">
            Artwork Upload
          </p>

          <h2 className="mt-4 text-3xl font-black leading-tight text-[#07111F] sm:text-4xl md:text-5xl">
            Send your design files for print review
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600 md:text-lg md:leading-8">
            Customers can prepare artwork, dielines, logos and print-ready files
            for review before production. Later this can become a complete
            client artwork portal.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-sm font-black text-[#07111F]">
                Prepress checking
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Bleed, safe margin, color mode and die line review.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-sm font-black text-[#07111F]">
                Production ready
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Files can be checked before printing and finishing.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-5 shadow-xl md:p-6">
          <div className="rounded-[1.5rem] border-2 border-dashed border-[#00C2E8] bg-[#F7FAFC] p-6 text-center md:p-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#00C2E8]/15 text-2xl font-black text-[#007C91]">
              UP
            </div>

            <h3 className="mt-5 text-2xl font-black text-[#07111F] md:text-3xl">
              Upload Artwork
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-600 md:text-base">
              Supported files for artwork review and production setup.
            </p>

            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {fileTypes.map((type) => (
                <span
                  key={type}
                  className="rounded-full bg-white px-4 py-2 text-xs font-black text-[#07111F] shadow-sm"
                >
                  {type}
                </span>
              ))}
            </div>

            <button
              type="button"
              className="mt-7 rounded-full bg-[#07111F] px-7 py-4 text-sm font-black text-white shadow-xl shadow-slate-900/20 transition hover:-translate-y-1 hover:bg-[#FF6A00]"
            >
              Coming Soon
            </button>

            <p className="mt-4 text-xs font-bold text-slate-500">
              Portal feature planned for future upgrade.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
export default function ArtworkGuide() {
  const checks = ["CMYK Color Mode", "Bleed Included", "High Resolution", "Fonts Outlined", "Die Line Ready"];

  return (
    <section className="bg-[#F7FAFC] px-5 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-black uppercase tracking-[0.3em] text-[#FF6A00]">Artwork Guide</p>
        <h2 className="mt-4 text-4xl font-black text-[#07111F] md:text-5xl">
          Prepare print-ready artwork
        </h2>

        <div className="mt-12 grid gap-5 md:grid-cols-5">
          {checks.map((item) => (
            <div key={item} className="rounded-3xl bg-white p-6 shadow-md">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#00C2E8] font-black text-[#07111F]">
                ✓
              </div>
              <p className="font-black text-[#07111F]">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
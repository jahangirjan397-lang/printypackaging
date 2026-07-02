export default function ProductFinder() {
  const suggestions = ["Perfume Box", "Burger Wrap", "Rigid Gift Box", "Cosmetic Carton"];

  return (
    <section className="bg-[#F7FAFC] px-5 py-20 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.3em] text-[#FF6A00]">Smart Packaging Finder</p>
          <h2 className="mt-4 text-4xl font-black text-[#07111F] md:text-5xl">
            Let clients find the right packaging faster
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            This section will become our AI Packaging Advisor later. For now, it shows smart product suggestions.
          </p>
        </div>

        <div className="rounded-[2rem] bg-[#07111F] p-6 text-white shadow-2xl">
          <div className="rounded-2xl bg-white p-4 text-[#07111F]">
            <p className="font-black">I sell perfume. What packaging do I need?</p>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {suggestions.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="font-black text-[#00C2E8]">{item}</p>
                <p className="mt-2 text-sm text-slate-300">Recommended solution</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
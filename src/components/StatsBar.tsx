export default function StatsBar() {
  const stats = [
    ["500+", "Packaging Styles"],
    ["24h", "Quote Support"],
    ["100%", "Custom Sizes"],
    ["Global", "Client Support"],
  ];

  return (
    <section className="bg-[#07111F] px-5 py-14 text-white md:px-8">
      <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(([number, label]) => (
          <div
            key={label}
            className="pp-card rounded-3xl border border-white/10 bg-white/[0.04] p-7 text-center"
          >
            <h3 className="text-4xl font-black text-[#00C2E8] md:text-5xl">
              {number}
            </h3>
            <p className="mt-3 font-bold text-slate-300">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
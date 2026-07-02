export default function ComparisonTable() {
  const rows = [
    ["Custom Sizes", "Yes", "Limited"],
    ["Premium Finishing", "Yes", "Basic"],
    ["Artwork Support", "Yes", "No"],
    ["AI Quote System", "Coming Soon", "No"],
  ];

  return (
    <section className="bg-[#07111F] px-5 py-20 text-white md:px-8">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-sm font-black uppercase tracking-[0.3em] text-[#00C2E8]">Why Printy Packaging</p>
        <h2 className="mt-4 text-4xl font-black md:text-5xl">Built for serious packaging buyers</h2>

        <div className="mt-12 overflow-hidden rounded-3xl border border-white/10">
          {rows.map((row) => (
            <div key={row[0]} className="grid grid-cols-3 border-b border-white/10 bg-white/5 p-5 text-left last:border-0">
              <p className="font-black">{row[0]}</p>
              <p className="text-[#00C2E8]">{row[1]}</p>
              <p className="text-slate-400">{row[2]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
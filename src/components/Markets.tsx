export default function Markets() {
  const markets = ["USA", "UK", "Europe", "Canada", "UAE", "Australia"];

  return (
    <section className="bg-[#F7FAFC] px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-sm font-black uppercase tracking-[0.32em] text-[#FF6A00]">
          Target Markets
        </p>
        <h2 className="mt-4 text-4xl font-black text-[#07111F] md:text-6xl">
          Built for international packaging buyers
        </h2>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {markets.map((market) => (
            <div
              key={market}
              className="pp-card rounded-[1.5rem] bg-white p-7 shadow-md"
            >
              <p className="text-3xl font-black text-[#007C91]">{market}</p>
              <p className="mt-2 text-sm font-bold text-slate-500">Market Ready</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

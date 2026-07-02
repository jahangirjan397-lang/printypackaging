import { markets } from "../data/markets";

export default function MarketHub() {
  return (
    <section className="bg-white px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.32em] text-[#FF6A00]">
            Global Markets
          </p>

          <h2 className="mt-4 text-4xl font-black leading-tight text-[#07111F] md:text-6xl">
            Built for international packaging buyers
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Explore custom packaging solutions for USA, UK, Canada, Europe, UAE
            and Australia buyers.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {markets.map((market) => (
            <a
              key={market.slug}
              href={`/markets/${market.slug}`}
              className="pp-card rounded-[2rem] border border-slate-200 bg-[#F7FAFC] p-7"
            >
              <div className="mb-6 h-36 rounded-[1.5rem] bg-gradient-to-br from-[#07111F] via-[#007C91] to-[#00C2E8]" />

              <p className="text-xs font-black uppercase tracking-[0.25em] text-[#FF6A00]">
                {market.region}
              </p>

              <h3 className="mt-3 text-3xl font-black text-[#07111F]">
                {market.name}
              </h3>

              <p className="mt-3 min-h-20 leading-7 text-slate-600">
                {market.tagline}
              </p>

              <span className="mt-5 inline-flex font-black text-[#FF6A00]">
                View Market →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
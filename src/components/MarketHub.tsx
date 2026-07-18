import Link from "next/link";
import { markets } from "../data/markets";

export default function MarketHub() {
  return (
    <section className="bg-white px-4 py-16 sm:px-5 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#FF6A00] md:text-sm">
            Global Markets
          </p>

          <h2 className="mt-4 text-3xl font-black leading-tight text-[#07111F] sm:text-4xl md:text-6xl">
            Built for international packaging buyers
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600 md:text-lg md:leading-8">
            Explore custom packaging solutions for USA, UK, Canada, Europe, UAE
            and Australia buyers with clear product guidance and fast quote
            support.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-6">
          {markets.map((market, index) => (
            <Link
              key={market.slug}
              href={`/markets/${market.slug}`}
              prefetch={false}
              className="group rounded-[2rem] border border-slate-200 bg-[#F7FAFC] p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl md:p-7"
            >
              <div className="relative mb-6 h-36 overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#07111F] via-[#007C91] to-[#00C2E8]">
                <div className="pointer-events-none absolute inset-0 opacity-15 [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:24px_24px]" />

                <div className="absolute bottom-5 left-5 h-20 w-28 rotate-[-8deg] rounded-2xl bg-white shadow-2xl transition duration-300 group-hover:rotate-[-3deg]" />

                <div className="absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FF6A00] text-xs font-black text-white shadow-xl">
                  {index + 1}
                </div>

                <span className="absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1 text-xs font-black text-[#07111F]">
                  {market.region}
                </span>
              </div>

              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#FF6A00]">
                {market.region}
              </p>

              <h3 className="mt-3 text-2xl font-black text-[#07111F] md:text-3xl">
                {market.name}
              </h3>

              <p className="mt-3 min-h-20 text-sm leading-6 text-slate-600 md:text-base md:leading-7">
                {market.tagline}
              </p>

              <span className="mt-5 inline-flex font-black text-[#FF6A00] transition group-hover:text-[#007C91]">
                View Market &rarr;
              </span>
            </Link>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-3xl rounded-3xl border border-slate-200 bg-[#F7FAFC] p-5 text-center">
          <p className="text-sm font-bold leading-6 text-slate-600 md:text-base">
            This section supports country and region landing pages for global
            packaging SEO and international quote inquiries.
          </p>
        </div>
      </div>
    </section>
  );
}


import Image from "next/image";

const trustPoints = [
  "Premium Quality",
  "Fast Delivery",
  "Custom Sizes",
  "Global Support",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#07111F] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(0,194,232,0.2),transparent_30%),radial-gradient(circle_at_82%_30%,rgba(255,106,0,0.14),transparent_28%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-20 lg:grid-cols-2 lg:py-24">
        <div className="max-w-3xl text-center lg:text-left">
          <p className="inline-flex rounded-full border border-[#00C2E8]/40 bg-[#00C2E8]/10 px-4 py-2 text-xs font-black text-[#9FEFFF] shadow-lg shadow-cyan-500/10 md:text-sm">
            Premium Custom Printing & Packaging
          </p>

          <h1 className="mt-6 text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
            Packaging That
            <br />
            Makes Brands
            <br />
            <span className="bg-gradient-to-r from-[#FF6A00] to-[#00C2E8] bg-clip-text text-transparent">
              Unforgettable.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base md:text-lg md:leading-8 lg:mx-0">
            Premium rigid boxes, folding cartons, food packaging, butter paper,
            labels, stickers and luxury printed packaging for USA, UK, Europe
            and worldwide brands.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4 lg:justify-start">
            <a
              href="#quote"
              className="rounded-full bg-[#FF6A00] px-6 py-3 text-sm font-black text-white shadow-xl shadow-orange-500/25 transition hover:-translate-y-1 hover:bg-[#007C91] md:px-7 md:py-4"
            >
              Get Instant Quote
            </a>

            <a
              href="#products"
              className="rounded-full border border-[#00C2E8]/40 bg-white/5 px-6 py-3 text-sm font-black text-white backdrop-blur transition hover:-translate-y-1 hover:bg-[#00C2E8] hover:text-[#07111F] md:px-7 md:py-4"
            >
              Explore Products
            </a>
          </div>

          <div className="mx-auto mt-9 grid max-w-2xl grid-cols-2 gap-3 rounded-3xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur md:grid-cols-4 lg:mx-0">
            {trustPoints.map((item) => (
              <div key={item} className="text-center lg:text-left">
                <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#00C2E8]/15 text-sm font-black text-[#00C2E8] lg:mx-0">
                  ✓
                </div>

                <p className="text-[11px] font-black text-white sm:text-xs md:text-sm">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="absolute -inset-5 rounded-[2.4rem] bg-[#00C2E8]/20 blur-3xl md:-inset-8" />

          <div className="relative overflow-hidden rounded-[2rem] border border-[#00C2E8]/25 bg-white/[0.06] p-3 shadow-2xl shadow-cyan-500/10 backdrop-blur md:rounded-[2.4rem] md:p-4">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[1.5rem] bg-[#b8f3ee] md:rounded-[2rem]">
              <Image
                src="/images/hero/hero-packaging.webp"
                alt="Premium custom printed packaging boxes by Printy Packaging"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#00C2E8]">
                Boxes
              </p>
              <p className="mt-1 text-sm font-black text-white">Custom</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#00C2E8]">
                Finish
              </p>
              <p className="mt-1 text-sm font-black text-white">Premium</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#00C2E8]">
                Support
              </p>
              <p className="mt-1 text-sm font-black text-white">Global</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
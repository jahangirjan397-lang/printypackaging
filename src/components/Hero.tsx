const trustPoints = [
  "Premium Quality",
  "Fast Delivery",
  "Custom Sizes",
  "Global Support",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#07111F] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(0,194,232,0.2),transparent_30%),radial-gradient(circle_at_82%_30%,rgba(255,106,0,0.12),transparent_28%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-20 lg:grid-cols-2 lg:py-24">
        <div className="text-center lg:text-left">
          <p className="inline-flex rounded-full border border-[#00C2E8]/40 bg-[#00C2E8]/10 px-4 py-2 text-xs font-black text-[#9FEFFF] shadow-lg shadow-cyan-500/10 md:text-sm">
            Premium Custom Printing & Packaging
          </p>

          <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Packaging That
            <br />
            Makes Brands
            <br />
            <span className="bg-gradient-to-r from-[#FF6A00] to-[#00C2E8] bg-clip-text text-transparent">
              Unforgettable.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base md:text-lg md:leading-8 lg:mx-0">
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
                  &#10003;
                </div>
                <p className="text-[11px] font-black text-white sm:text-xs md:text-sm">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-none">
          <div className="absolute -inset-4 rounded-[2rem] bg-[#00C2E8]/20 blur-3xl md:-inset-6" />

          <div className="relative rounded-[1.6rem] border border-[#00C2E8]/20 bg-white/[0.07] p-3 shadow-2xl shadow-cyan-500/10 backdrop-blur md:rounded-[2rem] md:p-6">
            <div className="relative h-[280px] overflow-hidden rounded-[1.3rem] bg-gradient-to-br from-[#07111F] via-[#007C91] to-[#00C2E8] sm:h-[330px] md:h-[440px] md:rounded-[1.5rem]">
              <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:28px_28px]" />

              <div className="absolute bottom-8 left-5 h-28 w-44 rotate-[-7deg] rounded-2xl border border-white/20 bg-[#007C91] shadow-2xl sm:h-32 sm:w-48 md:bottom-10 md:left-10 md:h-44 md:w-64" />

              <div className="absolute bottom-20 left-20 h-36 w-32 rotate-[6deg] rounded-2xl border border-white/30 bg-[#F7FAFC] shadow-2xl sm:left-24 sm:h-40 sm:w-36 md:bottom-24 md:left-32 md:h-56 md:w-48" />

              <div className="absolute bottom-12 right-5 h-48 w-32 rounded-2xl border border-[#FF6A00]/30 bg-[#07111F] shadow-2xl sm:h-52 sm:w-36 md:bottom-16 md:right-10 md:h-72 md:w-52">
                <div className="mx-auto mt-10 h-12 w-12 rounded-full border border-[#FF6A00]/80 md:mt-16 md:h-20 md:w-20" />
                <p className="mt-5 text-center text-sm font-black tracking-widest text-[#FFB36B] md:mt-8 md:text-xl">
                  LUXURY
                </p>
                <p className="mt-2 text-center text-[9px] tracking-[0.3em] text-slate-300 md:text-[10px]">
                  PACKAGING
                </p>
              </div>

              <div className="absolute bottom-7 left-7 rounded-xl border border-[#FF6A00]/30 bg-white px-4 py-3 text-[#07111F] shadow-xl md:bottom-12 md:left-14 md:px-6 md:py-4">
                <p className="text-[11px] font-black md:text-sm">
                  Custom Rigid Boxes
                </p>
                <p className="text-[9px] text-slate-500 md:text-xs">
                  Foil &bull; Emboss &bull; Premium Finish
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
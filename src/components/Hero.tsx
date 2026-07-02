export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#07111F] text-white">
      {/* Premium background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(0,194,232,0.22),transparent_32%),radial-gradient(circle_at_82%_30%,rgba(255,106,0,0.12),transparent_30%)]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:46px_46px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 sm:px-6 md:py-20 lg:grid-cols-2 lg:px-8 lg:py-24">
        {/* Left Content */}
        <div className="text-center lg:text-left">
          <span className="inline-flex rounded-full border border-[#00C2E8]/40 bg-[#00C2E8]/10 px-5 py-2 text-xs font-black text-[#9FEFFF] shadow-lg shadow-cyan-500/10 md:text-sm">
            Premium Custom Printing & Packaging
          </span>

          <h1 className="mt-7 text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Packaging That
            <br />
            Makes Brands
            <br />
            <span className="bg-gradient-to-r from-[#FF6A00] to-[#00C2E8] bg-clip-text text-transparent">
              Unforgettable.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg lg:mx-0">
            Premium rigid boxes, folding cartons, food packaging, butter paper,
            labels, stickers and luxury printed packaging for USA, UK, Europe
            and worldwide brands.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4 lg:justify-start">
            <a
              href="#quote"
              className="rounded-full bg-[#FF6A00] px-7 py-4 text-sm font-black text-white shadow-xl shadow-orange-500/30 transition hover:-translate-y-1 hover:bg-[#007C91]"
            >
              Get Instant Quote
            </a>

            <a
              href="#products"
              className="rounded-full border border-[#00C2E8]/40 bg-white/5 px-7 py-4 text-sm font-black text-white backdrop-blur transition hover:-translate-y-1 hover:bg-[#00C2E8] hover:text-[#07111F]"
            >
              Explore Products
            </a>
          </div>

          {/* Trust Bar */}
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-3 rounded-3xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur md:grid-cols-4 lg:mx-0">
            {["Premium Quality", "Fast Delivery", "Custom Sizes", "Global Support"].map(
              (item) => (
                <div key={item} className="text-center lg:text-left">
                  <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#00C2E8]/15 text-[#00C2E8] lg:mx-0">
                    ✓
                  </div>
                  <p className="text-xs font-black text-white md:text-sm">{item}</p>
                </div>
              )
            )}
          </div>
        </div>

        {/* Right Mockup */}
        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-[#00C2E8]/20 blur-3xl" />

          <div className="pp-float relative rounded-[2rem] border border-[#00C2E8]/20 bg-white/[0.07] p-4 shadow-2xl shadow-cyan-500/10 backdrop-blur md:p-6">
            <div className="relative h-[320px] overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#07111F] via-[#007C91] to-[#00C2E8] md:h-[440px]">
              <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:28px_28px]" />

              {/* Box 1 */}
              <div className="absolute bottom-8 left-6 h-32 w-48 rotate-[-7deg] rounded-2xl border border-white/20 bg-[#007C91] shadow-2xl md:bottom-10 md:left-10 md:h-44 md:w-64" />

              {/* Box 2 */}
              <div className="absolute bottom-20 left-24 h-40 w-36 rotate-[6deg] rounded-2xl border border-white/30 bg-[#F7FAFC] shadow-2xl md:bottom-24 md:left-32 md:h-56 md:w-48" />

              {/* Luxury standing box */}
              <div className="absolute bottom-12 right-6 h-52 w-36 rounded-2xl border border-[#FF6A00]/30 bg-[#07111F] shadow-2xl md:bottom-16 md:right-10 md:h-72 md:w-52">
                <div className="mx-auto mt-10 h-14 w-14 rounded-full border border-[#FF6A00]/80 md:mt-16 md:h-20 md:w-20" />
                <p className="mt-6 text-center text-base font-black tracking-widest text-[#FFB36B] md:mt-8 md:text-xl">
                  LUXURY
                </p>
                <p className="mt-2 text-center text-[10px] tracking-[0.35em] text-slate-300">
                  PACKAGING
                </p>
              </div>

              {/* Floating label */}
              <div className="absolute bottom-8 left-8 rounded-xl border border-[#FF6A00]/30 bg-white px-4 py-3 text-[#07111F] shadow-xl md:bottom-12 md:left-14 md:px-6 md:py-4">
                <p className="text-xs font-black md:text-sm">Custom Rigid Boxes</p>
                <p className="text-[10px] text-slate-500 md:text-xs">
                  Foil • Emboss • Premium Finish
                </p>
              </div>

              {/* Small cyan shine */}
              <div className="absolute right-8 top-8 h-20 w-20 rounded-full bg-[#00C2E8]/20 blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
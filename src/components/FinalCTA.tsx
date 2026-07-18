export default function FinalCTA() {
  return (
    <section className="bg-white px-4 py-16 sm:px-5 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#07111F] text-white shadow-2xl md:rounded-[2.2rem]">
        <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
          <div className="p-6 sm:p-8 md:p-12">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#00C2E8] md:text-sm">
              Start Project
            </p>

            <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl md:text-6xl">
              Start your packaging project with confidence
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 md:text-lg md:leading-8">
              Share your product details and we will help you choose the right
              box style, material, printing method and finishing for your custom
              packaging project.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                <p className="text-2xl font-black text-[#00C2E8]">01</p>
                <p className="mt-2 text-sm font-bold text-slate-300">
                  Share size and quantity
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                <p className="text-2xl font-black text-[#00C2E8]">02</p>
                <p className="mt-2 text-sm font-bold text-slate-300">
                  Choose material and finish
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                <p className="text-2xl font-black text-[#00C2E8]">03</p>
                <p className="mt-2 text-sm font-bold text-slate-300">
                  Get packaging quote
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#quote"
                className="rounded-full bg-[#FF6A00] px-7 py-4 text-sm font-black text-white shadow-xl shadow-orange-500/20 transition hover:-translate-y-1 hover:bg-[#007C91] md:px-8"
              >
                Get Custom Quote
              </a>

              <a
                href="#products"
                className="rounded-full border border-white/20 bg-white/[0.04] px-7 py-4 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-white hover:text-[#07111F] md:px-8"
              >
                View Products
              </a>
            </div>
          </div>

          <div className="relative min-h-[320px] bg-gradient-to-br from-[#007C91] via-[#00C2E8] to-[#FF6A00] p-6 sm:p-8">
            <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:24px_24px]" />

            <div className="relative mx-auto mt-6 max-w-sm rounded-[2rem] bg-white p-5 text-[#07111F] shadow-2xl md:mt-10 md:p-6">
              <div className="relative mb-5 h-36 overflow-hidden rounded-2xl bg-gradient-to-br from-[#07111F] via-[#007C91] to-[#00C2E8]">
                <div className="pointer-events-none absolute inset-0 opacity-15 [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:22px_22px]" />

                <div className="absolute bottom-5 left-5 h-16 w-24 rotate-[-8deg] rounded-2xl bg-white shadow-2xl" />

                <div className="absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FF6A00] text-xs font-black text-white">
                  PP
                </div>
              </div>

              <p className="text-xl font-black">Premium Packaging Plan</p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Box style &bull; Material &bull; Printing &bull; Finishing
                &bull; Delivery support
              </p>

              <div className="mt-5 rounded-2xl bg-[#F7FAFC] p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                  Quote Ready
                </p>

                <p className="mt-2 text-sm font-bold leading-6 text-slate-700">
                  Built for custom boxes, food packaging, labels, paper bags and
                  luxury printed packaging.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

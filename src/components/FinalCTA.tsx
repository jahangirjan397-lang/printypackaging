export default function FinalCTA() {
  return (
    <section className="bg-white px-5 py-20 md:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.2rem] bg-[#07111F] text-white shadow-2xl">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="p-8 md:p-12">
            <p className="text-sm font-black uppercase tracking-[0.35em] text-[#00C2E8]">
              Start Project
            </p>

            <h2 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
              Start your packaging project with confidence
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Share your product details and we will help you choose the right
              box style, material, printing method and finishing.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#quote"
                className="rounded-full bg-[#FF6A00] px-8 py-4 font-black text-white transition hover:-translate-y-1 hover:bg-[#007C91]"
              >
                Get Custom Quote
              </a>

              <a
                href="#products"
                className="rounded-full border border-white/20 px-8 py-4 font-black text-white transition hover:bg-white hover:text-[#07111F]"
              >
                View Products
              </a>
            </div>
          </div>

          <div className="relative min-h-[320px] bg-gradient-to-br from-[#007C91] via-[#00C2E8] to-[#FF6A00] p-8">
            <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:24px_24px]" />

            <div className="relative mx-auto mt-10 max-w-sm rounded-[2rem] bg-white p-6 text-[#07111F] shadow-2xl">
              <div className="mb-5 h-36 rounded-2xl bg-gradient-to-br from-[#07111F] via-[#007C91] to-[#00C2E8]" />
              <p className="text-xl font-black">Premium Packaging Plan</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Box style • Material • Printing • Finishing • Delivery support
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
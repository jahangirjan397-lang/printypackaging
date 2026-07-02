export default function QuoteSection() {
  return (
    <section
      id="quote"
      className="relative overflow-hidden bg-gradient-to-r from-[#00C2E8] via-[#7DA6A8] to-[#FF6A00] px-4 py-20 text-white sm:px-5 md:px-8 md:py-24"
    >
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(90deg,white_1px,transparent_1px),linear-gradient(white_1px,transparent_1px)] [background-size:40px_40px]" />

      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
        <div className="text-center lg:text-left">
          <p className="text-xs font-black uppercase tracking-[0.35em] md:text-sm">
            Get Quote
          </p>

          <h2 className="mx-auto mt-4 max-w-xl text-3xl font-black leading-tight sm:text-4xl md:text-6xl lg:mx-0">
            Ready to create custom packaging?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-7 text-white/95 md:text-lg md:leading-8 lg:mx-0">
            Share product type, size, quantity and finishing. Our team will guide
            you with the best packaging solution for your brand.
          </p>

          <div className="mx-auto mt-8 grid max-w-xl grid-cols-2 gap-4 lg:mx-0">
            <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
              <p className="text-2xl font-black">24h</p>
              <p className="text-sm font-bold text-white/90">Fast Quote</p>
            </div>

            <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
              <p className="text-2xl font-black">Custom</p>
              <p className="text-sm font-bold text-white/90">Sizes & Finish</p>
            </div>
          </div>
        </div>

        <form className="rounded-[1.6rem] bg-white p-5 text-[#07111F] shadow-2xl md:rounded-[2rem] md:p-8">
          <div className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <input className="w-full rounded-2xl border border-slate-300 p-4 outline-none transition focus:border-[#00C2E8] focus:ring-4 focus:ring-cyan-100" placeholder="Product type" />
              <input className="w-full rounded-2xl border border-slate-300 p-4 outline-none transition focus:border-[#00C2E8] focus:ring-4 focus:ring-cyan-100" placeholder="Quantity" />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <input className="w-full rounded-2xl border border-slate-300 p-4 outline-none transition focus:border-[#00C2E8] focus:ring-4 focus:ring-cyan-100" placeholder="Size / Dimensions" />

              <select className="w-full rounded-2xl border border-slate-300 p-4 outline-none transition focus:border-[#00C2E8] focus:ring-4 focus:ring-cyan-100">
                <option>Select category</option>
                <option>Rigid Boxes</option>
                <option>Folding Cartons</option>
                <option>Butter Paper</option>
                <option>Food Packaging</option>
                <option>Paper Bags</option>
                <option>Labels & Stickers</option>
              </select>
            </div>

            <select className="w-full rounded-2xl border border-slate-300 p-4 outline-none transition focus:border-[#00C2E8] focus:ring-4 focus:ring-cyan-100">
              <option>Select finishing</option>
              <option>Matte Lamination</option>
              <option>Gloss Lamination</option>
              <option>Spot UV</option>
              <option>Gold Foiling</option>
              <option>Embossing</option>
              <option>Die Cutting</option>
            </select>

            <input className="w-full rounded-2xl border border-slate-300 p-4 outline-none transition focus:border-[#00C2E8] focus:ring-4 focus:ring-cyan-100" placeholder="Email / WhatsApp" />

            <textarea className="min-h-28 w-full rounded-2xl border border-slate-300 p-4 outline-none transition focus:border-[#00C2E8] focus:ring-4 focus:ring-cyan-100" placeholder="Tell us more about your packaging project" />

            <button className="rounded-2xl bg-[#07111F] p-4 font-black text-white transition hover:bg-[#007C91]">
              Request Quote
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
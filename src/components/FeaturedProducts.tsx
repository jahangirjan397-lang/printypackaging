import { products } from "../data/products";

export default function FeaturedProducts() {
  return (
    <section id="products" className="bg-[#F7FAFC] px-4 py-20 sm:px-5 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.32em] text-[#FF6A00] md:text-sm">
            Featured Products
          </p>

          <h2 className="mt-4 text-3xl font-black leading-tight text-[#07111F] sm:text-4xl md:text-6xl">
            Custom packaging for every product
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600 md:text-lg md:leading-8">
            Premium boxes, bags, labels and food wrapping solutions built for
            brands that want better presentation and stronger shelf impact.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-6">
          {products.map((item, index) => (
            <a
              href={`/products/${item.slug}`}
              key={item.slug}
              className="pp-card group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-md md:rounded-[1.7rem]"
            >
              <div className="relative h-44 overflow-hidden bg-gradient-to-br from-[#07111F] via-[#007C91] to-[#00C2E8] p-5 sm:h-48 md:h-52">
                <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:22px_22px]" />

                <div className="absolute bottom-5 left-5 h-24 w-24 rotate-[-8deg] rounded-2xl bg-white shadow-2xl transition group-hover:rotate-[-3deg]" />

                <div className="absolute bottom-8 right-7 h-32 w-24 rounded-2xl bg-[#07111F] shadow-2xl transition group-hover:-translate-y-2">
                  <div className="mx-auto mt-6 h-9 w-9 rounded-full border border-[#FF6A00]" />
                  <p className="mt-4 text-center text-[10px] font-black tracking-widest text-white">
                    BOX
                  </p>
                </div>

                <span className="absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1 text-xs font-black text-[#07111F]">
                  {item.category}
                </span>

                <span className="absolute bottom-5 right-5 flex h-8 w-8 items-center justify-center rounded-full bg-[#FF6A00] text-xs font-black text-white">
                  {index + 1}
                </span>
              </div>

              <div className="p-5 md:p-6">
                <h3 className="text-lg font-black text-[#07111F] md:text-xl">
                  {item.name}
                </h3>

                <p className="mt-3 min-h-20 text-sm leading-6 text-slate-600">
                  {item.tagline}
                </p>

                <span className="mt-5 inline-flex font-black text-[#FF6A00] transition group-hover:text-[#007C91]">
                  View Details →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
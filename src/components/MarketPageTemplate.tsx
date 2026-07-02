import type { Market } from "../data/markets";
import { products } from "../data/products";

export default function MarketPageTemplate({ market }: { market: Market }) {
  const marketProducts = products.filter((product) =>
    market.productSlugs.includes(product.slug)
  );

  return (
    <main>
      <section className="relative overflow-hidden bg-[#07111F] px-5 py-20 text-white md:px-8 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,194,232,0.22),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(255,106,0,0.14),transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap items-center gap-2 text-sm font-bold text-slate-300">
            <a href="/" className="hover:text-[#00C2E8]">
              Home
            </a>
            <span>/</span>
            <a href="/markets" className="hover:text-[#00C2E8]">
              Markets
            </a>
            <span>/</span>
            <span className="text-[#FF6A00]">{market.name}</span>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.35em] text-[#00C2E8]">
                International Market
              </p>

              <h1 className="mt-5 text-4xl font-black leading-tight md:text-7xl">
                Custom Packaging for {market.name}
              </h1>

              <p className="mt-5 text-2xl font-black text-[#FF6A00]">
                {market.tagline}
              </p>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                {market.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#market-products"
                  className="rounded-full bg-[#FF6A00] px-8 py-4 font-black text-white transition hover:bg-[#007C91]"
                >
                  View Products
                </a>

                <a
                  href="/#quote"
                  className="rounded-full border border-white/20 px-8 py-4 font-black text-white transition hover:bg-white hover:text-[#07111F]"
                >
                  Get Quote
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl">
              <div className="relative h-[380px] overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#07111F] via-[#007C91] to-[#00C2E8]">
                <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:24px_24px]" />
                <div className="absolute bottom-8 left-8 h-36 w-44 rotate-[-7deg] rounded-2xl bg-white shadow-2xl" />
                <div className="absolute bottom-16 right-10 h-56 w-40 rounded-2xl bg-[#07111F] shadow-2xl">
                  <div className="mx-auto mt-12 h-16 w-16 rounded-full border border-[#FF6A00]" />
                  <p className="mt-8 text-center text-xl font-black tracking-widest text-white">
                    {market.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="market-products" className="bg-[#F7FAFC] px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.32em] text-[#FF6A00]">
            Recommended Products
          </p>

          <h2 className="mt-4 max-w-3xl text-4xl font-black text-[#07111F] md:text-5xl">
            Packaging solutions for {market.region}
          </h2>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {marketProducts.map((product) => (
              <a
                key={product.slug}
                href={`/products/${product.slug}`}
                className="pp-card overflow-hidden rounded-[1.7rem] bg-white shadow-md"
              >
                <div className="h-44 bg-gradient-to-br from-[#07111F] via-[#007C91] to-[#00C2E8]" />

                <div className="p-6">
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-[#FF6A00]">
                    {product.category}
                  </p>

                  <h3 className="mt-3 text-xl font-black text-[#07111F]">
                    {product.name}
                  </h3>

                  <p className="mt-3 min-h-20 text-sm leading-6 text-slate-600">
                    {product.tagline}
                  </p>

                  <span className="mt-5 inline-flex font-black text-[#FF6A00]">
                    View Product →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.32em] text-[#FF6A00]">
              Market Benefits
            </p>

            <h2 className="mt-4 text-4xl font-black text-[#07111F] md:text-5xl">
              Why {market.name} buyers choose custom packaging
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Market pages help buyers find packaging options by region and help
              search engines understand international service relevance.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {market.benefits.map((benefit) => (
              <div
                key={benefit}
                className="rounded-[1.5rem] border border-slate-200 bg-[#F7FAFC] p-6"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#00C2E8] font-black text-[#07111F]">
                  ✓
                </div>
                <h3 className="font-black text-[#07111F]">{benefit}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F7FAFC] px-5 py-20 md:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-black uppercase tracking-[0.32em] text-[#FF6A00]">
            FAQ
          </p>

          <h2 className="mt-4 text-4xl font-black text-[#07111F]">
            Questions about packaging for {market.name}
          </h2>

          <div className="mt-10 space-y-4">
            {market.faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-[1.5rem] border border-slate-200 bg-white p-6"
              >
                <h3 className="font-black text-[#07111F]">{faq.question}</h3>
                <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#00C2E8] to-[#FF6A00] px-5 py-20 text-white md:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-4xl font-black md:text-6xl">
            Need custom packaging for {market.name}?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg">
            Share your product details and our team will guide you with box
            style, material, printing and finishing.
          </p>

          <a
            href="/#quote"
            className="mt-8 inline-flex rounded-full bg-[#07111F] px-8 py-4 font-black text-white"
          >
            Request Quote
          </a>
        </div>
      </section>
    </main>
  );
}
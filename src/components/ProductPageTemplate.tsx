import type { Product } from "../data/products";
import { products } from "../data/products";

export default function ProductPageTemplate({ product }: { product: Product }) {
  const relatedProducts = products
    .filter((item) => item.slug !== product.slug)
    .slice(0, 4);

  const productQuoteLink = `/?product=${product.slug}#quote`;

  return (
    <main>
      <section className="relative overflow-hidden bg-[#07111F] px-5 py-20 text-white md:px-8 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,194,232,0.22),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(255,106,0,0.14),transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-10 flex flex-wrap items-center gap-2 text-sm font-bold text-slate-300">
            <a href="/" className="hover:text-[#00C2E8]">
              Home
            </a>
            <span>/</span>
            <a href="/products" className="hover:text-[#00C2E8]">
              Products
            </a>
            <span>/</span>
            <span className="text-[#FF6A00]">{product.name}</span>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.35em] text-[#00C2E8]">
                {product.category}
              </p>

              <h1 className="mt-5 text-4xl font-black leading-tight md:text-6xl">
                {product.name}
              </h1>

              <p className="mt-5 text-2xl font-black text-[#FF6A00]">
                {product.tagline}
              </p>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                {product.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={productQuoteLink}
                  className="rounded-full bg-[#FF6A00] px-8 py-4 font-black text-white transition hover:bg-[#007C91]"
                >
                  Get Quote
                </a>

                <a
                  href="/products"
                  className="rounded-full border border-white/20 px-8 py-4 font-black text-white transition hover:bg-white hover:text-[#07111F]"
                >
                  View All Products
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
                    {product.name.split(" ")[0]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="product-details" className="bg-white px-5 py-20 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.32em] text-[#FF6A00]">
              Product Details
            </p>

            <h2 className="mt-4 text-4xl font-black text-[#07111F] md:text-5xl">
              Why choose {product.name}?
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              {product.name} help brands improve presentation, product safety,
              customer experience and professional shelf impact.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {product.features.map((feature) => (
              <div
                key={feature}
                className="rounded-[1.5rem] border border-slate-200 bg-[#F7FAFC] p-6"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#00C2E8] font-black text-[#07111F]">
                  ✓
                </div>
                <h3 className="font-black text-[#07111F]">{feature}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F7FAFC] px-5 py-20 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
          <InfoCard title="Materials" items={product.materials} />
          <InfoCard title="Finishing Options" items={product.finishes} />
          <InfoCard title="Industries" items={product.industries} />
        </div>
      </section>

      <section className="bg-white px-5 py-20 md:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-black uppercase tracking-[0.32em] text-[#FF6A00]">
            FAQ
          </p>

          <h2 className="mt-4 text-4xl font-black text-[#07111F]">
            Questions about {product.name}
          </h2>

          <div className="mt-10 space-y-4">
            {product.faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-[1.5rem] border border-slate-200 bg-[#F7FAFC] p-6"
              >
                <h3 className="font-black text-[#07111F]">{faq.question}</h3>
                <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F7FAFC] px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.32em] text-[#FF6A00]">
            Related Products
          </p>

          <h2 className="mt-4 text-4xl font-black text-[#07111F] md:text-5xl">
            Explore more packaging solutions
          </h2>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((item) => (
              <a
                key={item.slug}
                href={`/products/${item.slug}`}
                className="pp-card rounded-[1.5rem] bg-white p-6 shadow-md"
              >
                <div className="mb-5 h-32 rounded-2xl bg-gradient-to-br from-[#07111F] via-[#007C91] to-[#00C2E8]" />
                <h3 className="text-xl font-black text-[#07111F]">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.tagline}
                </p>
                <span className="mt-5 inline-flex font-black text-[#FF6A00]">
                  View Page →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#00C2E8] to-[#FF6A00] px-5 py-20 text-white md:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-4xl font-black md:text-6xl">
            Need custom {product.name.toLowerCase()}?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg">
            Share your product details and our packaging team will guide you with
            the best material, printing and finishing options.
          </p>

          <a
            href={productQuoteLink}
            className="mt-8 inline-flex rounded-full bg-[#07111F] px-8 py-4 font-black text-white transition hover:-translate-y-1 hover:bg-white hover:text-[#07111F]"
          >
            Request Quote
          </a>
        </div>
      </section>
    </main>
  );
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[1.7rem] bg-white p-7 shadow-md">
      <h3 className="text-2xl font-black text-[#07111F]">{title}</h3>

      <div className="mt-6 grid gap-3">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-2xl bg-[#F7FAFC] px-4 py-3 font-bold text-slate-700"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
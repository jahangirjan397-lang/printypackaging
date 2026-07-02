import type { Category } from "../data/categories";
import { products } from "../data/products";

export default function CategoryPageTemplate({
  category,
}: {
  category: Category;
}) {
  const categoryProducts = products.filter((product) =>
    category.productSlugs.includes(product.slug)
  );

  const otherProducts = products
    .filter((product) => !category.productSlugs.includes(product.slug))
    .slice(0, 4);

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
            <a href="/categories" className="hover:text-[#00C2E8]">
              Categories
            </a>
            <span>/</span>
            <span className="text-[#FF6A00]">{category.name}</span>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.35em] text-[#00C2E8]">
                Packaging Category
              </p>

              <h1 className="mt-5 text-4xl font-black leading-tight md:text-7xl">
                {category.name}
              </h1>

              <p className="mt-5 text-2xl font-black text-[#FF6A00]">
                {category.tagline}
              </p>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                {category.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#category-products"
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
                  <p className="mt-8 text-center text-lg font-black tracking-widest text-white">
                    {category.name.split(" ")[0]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="category-products" className="bg-[#F7FAFC] px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.32em] text-[#FF6A00]">
            Category Products
          </p>

          <h2 className="mt-4 max-w-3xl text-4xl font-black text-[#07111F] md:text-5xl">
            Explore {category.name.toLowerCase()} solutions
          </h2>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categoryProducts.map((product) => (
              <a
                key={product.slug}
                href={`/products/${product.slug}`}
                className="pp-card overflow-hidden rounded-[1.7rem] bg-white shadow-md"
              >
                <div className="h-48 bg-gradient-to-br from-[#07111F] via-[#007C91] to-[#00C2E8]" />

                <div className="p-7">
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-[#FF6A00]">
                    {product.category}
                  </p>

                  <h3 className="mt-3 text-2xl font-black text-[#07111F]">
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
              Category Authority
            </p>

            <h2 className="mt-4 text-4xl font-black text-[#07111F] md:text-5xl">
              Why this category matters for buyers
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Category pages help customers compare related products and help
              search engines understand your website structure. This creates a
              stronger internal linking system for SEO.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {[
              "Clear product grouping",
              "Better internal linking",
              "Stronger SEO structure",
              "Easy buyer navigation",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[1.5rem] border border-slate-200 bg-[#F7FAFC] p-6"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#00C2E8] font-black text-[#07111F]">
                  ✓
                </div>
                <h3 className="font-black text-[#07111F]">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#07111F] px-5 py-20 text-white md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.32em] text-[#00C2E8]">
            More Packaging Options
          </p>

          <h2 className="mt-4 text-4xl font-black md:text-5xl">
            Explore other packaging products
          </h2>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {otherProducts.map((product) => (
              <a
                key={product.slug}
                href={`/products/${product.slug}`}
                className="pp-card rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-6"
              >
                <h3 className="text-xl font-black">{product.name}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {product.tagline}
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
            Need {category.name.toLowerCase()}?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg">
            Share your product details and our team will help you choose the best
            packaging style, material, printing and finishing.
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
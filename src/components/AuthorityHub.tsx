import { products } from "../data/products";

export default function AuthorityHub() {
  const mainProducts = products.slice(0, 12);
  const foodProducts = products.filter((item) =>
    ["food-packaging", "butter-paper", "bakery-boxes", "burger-boxes", "pizza-boxes"].includes(item.slug)
  );
  const luxuryProducts = products.filter((item) =>
    ["rigid-boxes", "luxury-packaging", "perfume-boxes", "magnetic-boxes", "drawer-boxes", "jewelry-boxes"].includes(item.slug)
  );

  return (
    <section className="bg-[#07111F] px-5 py-24 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.32em] text-[#00C2E8]">
            Packaging Authority Hub
          </p>

          <h2 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
            Explore our complete packaging knowledge base
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-300">
            Strong internal linking helps customers and search engines find the
            right product pages faster.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <LinkBox title="Popular Product Pages" items={mainProducts} />
          <LinkBox title="Food Packaging Pages" items={foodProducts} />
          <LinkBox title="Luxury Packaging Pages" items={luxuryProducts} />
        </div>
      </div>
    </section>
  );
}

function LinkBox({
  title,
  items,
}: {
  title: string;
  items: { name: string; slug: string; tagline: string }[];
}) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-7">
      <h3 className="text-2xl font-black">{title}</h3>

      <div className="mt-6 grid gap-3">
        {items.map((item) => (
          <a
            key={item.slug}
            href={`/products/${item.slug}`}
            className="rounded-2xl bg-white/[0.06] p-4 transition hover:bg-[#00C2E8] hover:text-[#07111F]"
          >
            <span className="block font-black">{item.name}</span>
            <span className="mt-1 block text-xs text-slate-300">
              {item.tagline}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
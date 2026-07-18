import Link from "next/link";
import { products } from "../data/products";

type HubProduct = {
  name: string;
  slug: string;
  tagline: string;
};

const foodSlugs = [
  "food-packaging",
  "butter-paper",
  "bakery-boxes",
  "burger-boxes",
  "pizza-boxes",
  "paper-bags",
];

const luxurySlugs = [
  "rigid-boxes",
  "luxury-packaging",
  "perfume-boxes",
  "magnetic-boxes",
  "drawer-boxes",
  "jewelry-boxes",
];

const mainProducts = products.slice(0, 8);
const foodProducts = products.filter((item) => foodSlugs.includes(item.slug));
const luxuryProducts = products.filter((item) => luxurySlugs.includes(item.slug));

export default function AuthorityHub() {
  return (
    <section className="relative overflow-hidden bg-[#07111F] px-4 py-16 text-white sm:px-5 md:px-8 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,194,232,0.16),transparent_30%),radial-gradient(circle_at_85%_75%,rgba(255,106,0,0.14),transparent_28%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#00C2E8] md:text-sm">
            Packaging Authority Hub
          </p>

          <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl md:text-6xl">
            Explore our complete packaging knowledge base
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-300 md:text-lg md:leading-8">
            Strong internal linking helps customers and search engines find the
            right packaging, material and product pages faster.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:mt-14 lg:grid-cols-3 lg:gap-6">
          <LinkBox title="Popular Product Pages" items={mainProducts} />
          <LinkBox
            title="Food Packaging Pages"
            items={foodProducts.length > 0 ? foodProducts : mainProducts.slice(0, 4)}
          />
          <LinkBox
            title="Luxury Packaging Pages"
            items={
              luxuryProducts.length > 0 ? luxuryProducts : mainProducts.slice(4, 8)
            }
          />
        </div>

        <div className="mx-auto mt-8 max-w-3xl rounded-3xl border border-[#00C2E8]/20 bg-[#00C2E8]/10 p-5 text-center">
          <p className="text-sm font-bold leading-6 text-slate-200 md:text-base">
            This hub supports SEO by connecting important product pages with
            clear category-based navigation.
          </p>
        </div>
      </div>
    </section>
  );
}

function LinkBox({ title, items }: { title: string; items: HubProduct[] }) {
  return (
    <article className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#00C2E8]/30 hover:bg-white/[0.08] hover:shadow-xl md:p-7">
      <h3 className="text-xl font-black md:text-2xl">{title}</h3>

      <div className="mt-6 grid gap-3">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/products/${item.slug}`}
            prefetch={false}
            className="group rounded-2xl border border-white/10 bg-white/[0.06] p-4 transition hover:border-[#00C2E8]/40 hover:bg-[#00C2E8] hover:text-[#07111F]"
          >
            <span className="block font-black">{item.name}</span>

            <span className="mt-1 line-clamp-2 block text-xs leading-5 text-slate-300 transition group-hover:text-[#07111F]/80">
              {item.tagline}
            </span>

            <span className="mt-3 inline-flex text-xs font-black text-[#FF6A00] transition group-hover:text-[#07111F]">
              View Product &rarr;
            </span>
          </Link>
        ))}
      </div>
    </article>
  );
}


import Link from "next/link";
import { notFound } from "next/navigation";
import {
  productSeoPages,
  type ProductSeoSlug,
} from "@/data/productSeoPages";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return Object.keys(productSeoPages).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const page = productSeoPages[slug as ProductSeoSlug];

  if (!page) {
    return {};
  }

  return {
    title: page.metaTitle,
    description: page.description,
  };
}

export default async function ProductSeoPage({ params }: PageProps) {
  const { slug } = await params;
  const page = productSeoPages[slug as ProductSeoSlug];

  if (!page) {
    notFound();
  }

  return (
    <main className="bg-white">
      <section className="bg-[#07111F] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#00C2E8]">
            Product Packaging
          </span>

          <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            {page.title}
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
            {page.intro}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/#quote"
              className="inline-flex items-center justify-center rounded-full bg-[#FF6A00] px-6 py-3 text-sm font-black text-white transition hover:bg-[#E85F00]"
            >
              Get Quote
            </Link>

            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-black text-white transition hover:bg-white/15"
            >
              View Products
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-black tracking-tight text-[#07111F] sm:text-4xl">
            Best uses for {page.title.toLowerCase()}
          </h2>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {page.uses.map((use) => (
              <div
                key={use}
                className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6"
              >
                <p className="text-sm font-bold leading-7 text-slate-700">
                  {use}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-[2rem] border border-[#00C2E8]/25 bg-[#00C2E8]/10 p-7">
            <p className="text-sm font-bold leading-7 text-[#07111F]">
              Share your product size, quantity, material, printing colors,
              finishing and delivery country for accurate custom packaging quote
              support.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
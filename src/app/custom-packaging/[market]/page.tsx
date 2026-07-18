import Link from "next/link";
import { notFound } from "next/navigation";
import {
  marketSeoPages,
  type MarketSeoSlug,
} from "@/data/marketSeoPages";

type PageProps = {
  params: Promise<{
    market: string;
  }>;
};

export function generateStaticParams() {
  return Object.keys(marketSeoPages).map((market) => ({
    market,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { market } = await params;
  const page = marketSeoPages[market as MarketSeoSlug];

  if (!page) {
    return {};
  }

  return {
    title: page.metaTitle,
    description: page.description,
  };
}

export default async function MarketSeoPage({ params }: PageProps) {
  const { market } = await params;
  const page = marketSeoPages[market as MarketSeoSlug];

  if (!page) {
    notFound();
  }

  return (
    <main className="bg-white">
      <section className="bg-[#07111F] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#00C2E8]">
            {page.title}
          </span>

          <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            {page.heading}
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
            {page.intro}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/#quote"
              className="inline-flex items-center justify-center rounded-full bg-[#FF6A00] px-6 py-3 text-sm font-black text-white transition hover:bg-[#E85F00]"
            >
              Request Quote
            </Link>

            <Link
              href="/custom-packaging"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-black text-white transition hover:bg-white/15"
            >
              View All Packaging
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-black tracking-tight text-[#07111F] sm:text-4xl">
            What we can help with
          </h2>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {page.points.map((point) => (
              <div
                key={point}
                className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6"
              >
                <p className="text-sm font-bold leading-7 text-slate-700">
                  {point}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-[2rem] border border-[#FF6A00]/20 bg-[#FF6A00]/10 p-7">
            <p className="text-sm font-bold leading-7 text-[#07111F]">
              For accurate quote support, share size, quantity, material,
              printing colors, finishing options and delivery country.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

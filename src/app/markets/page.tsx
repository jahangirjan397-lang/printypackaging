import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import { markets } from "../../data/markets";
import { products } from "../../data/products";

const siteUrl = "https://printypackaging.com";
const brandName = "Printy Packaging";

const fallbackMarketPreview = {
  src: "/images/home/home-hero-mailer-v3.webp",
  alt: "Custom printed packaging boxes for international buyers",
};

// Give each market card its own photo: walk the market's product list in
// order and take the first image no earlier card has used.
const marketPreviews = (() => {
  const used = new Set<string>();
  const previews = new Map<string, { src: string; alt: string }>();

  for (const market of markets) {
    const image =
      market.productSlugs
        .map((slug) => products.find((product) => product.slug === slug))
        .map((product) => product?.images?.[0])
        .find((candidate) => candidate && !used.has(candidate.src)) ??
      fallbackMarketPreview;

    used.add(image.src);
    previews.set(market.slug, image);
  }

  return previews;
})();

function getMarketPreview(slug: string) {
  return marketPreviews.get(slug) ?? fallbackMarketPreview;
}

export const metadata: Metadata = {
  title: "International Packaging Markets",
  description:
    "Explore custom packaging solutions for USA, UK, Canada, Europe, UAE and Australia buyers. Get custom boxes, food packaging, paper bags, labels and luxury packaging support.",
  alternates: {
    canonical: `${siteUrl}/markets`,
  },
  openGraph: {
    title: "International Packaging Markets | Printy Packaging",
    description:
      "Custom packaging solutions for global buyers including USA, UK, Canada, Europe, UAE and Australia.",
    url: `${siteUrl}/markets`,
    siteName: brandName,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "International Packaging Markets | Printy Packaging",
    description:
      "Packaging support for international buyers, brands and ecommerce businesses.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function MarketsPage() {
  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "International Packaging Markets",
    description:
      "Custom packaging market pages for USA, UK, Canada, Europe, UAE and Australia buyers.",
    url: `${siteUrl}/markets`,
    isPartOf: {
      "@type": "WebSite",
      name: brandName,
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: brandName,
      url: siteUrl,
    },
  };

  const marketListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: markets.map((market, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: market.name,
      url: `${siteUrl}/markets/${market.slug}`,
    })),
  };

  return (
    <>
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageJsonLd),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(marketListJsonLd),
        }}
      />

      <main>
        <section className="relative overflow-hidden bg-[#07111F] px-5 py-20 text-white md:px-8 md:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,194,232,0.22),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(255,106,0,0.14),transparent_30%)]" />

          <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="text-center lg:text-left">
              <p className="text-sm font-black uppercase tracking-[0.35em] text-[#00C2E8]">
                International Markets
              </p>

              <h1 className="mt-5 text-4xl font-black leading-tight md:text-7xl">
                Packaging for{" "}
                <span className="bg-gradient-to-r from-[#FF6A00] via-[#F4C27A] to-[#00C2E8] bg-clip-text text-transparent">
                  Global Buyers
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300 lg:mx-0">
                Review packaging options by buyer market, then connect product style,
                material, finishing, artwork and delivery details in one quote-ready flow.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
                <Link
                  href="/#quote"
                  prefetch={false}
                  className="rounded-full bg-[#FF6A00] px-8 py-4 font-black text-white transition hover:-translate-y-1 hover:bg-[#007C91]"
                >
                  Get Global Quote
                </Link>

                <Link
                  href="/products"
                  prefetch={false}
                  className="rounded-full border border-white/20 px-8 py-4 font-black text-white transition hover:bg-white hover:text-[#07111F]"
                >
                  View Products
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 shadow-2xl">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-[#EDE5DC]">
                <Image
                  src="/images/home/home-hero-mailer-v3.webp"
                  alt="Custom packaging prepared for international buyers and ecommerce brands"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="px-2 pb-1 pt-5">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#00C2E8]">
                  International quote support
                </p>
                <p className="mt-2 max-w-lg text-xl font-black text-white sm:text-2xl">
                  Product, material, finish and delivery requirements kept in one buyer journey.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#F7FAFC] px-5 py-20 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.32em] text-[#FF6A00]">
                  Market Pages
                </p>

                <h2 className="mt-4 text-4xl font-black text-[#07111F] md:text-5xl">
                  Choose your buyer market
                </h2>
              </div>

              <p className="max-w-xl text-sm leading-6 text-slate-600 md:text-right">
                Choose your market to review relevant packaging options, then share
                product size, quantity, material, finish and delivery details
                for a clearer international quote request.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {markets.map((market) => (
                <Link
                  key={market.slug}
                  href={`/markets/${market.slug}`}
                  prefetch={false}
                  className="pp-card group rounded-[2rem] bg-white p-7 shadow-md"
                >
                  <div className="relative -mx-7 -mt-7 mb-6 aspect-[4/3] overflow-hidden rounded-t-[2rem] bg-[#EDE5DC]">
                    <Image
                      src={getMarketPreview(market.slug).src}
                      alt={getMarketPreview(market.slug).alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>

                  <p className="text-xs font-black uppercase tracking-[0.25em] text-[#FF6A00]">
                    {market.region}
                  </p>

                  <h2 className="mt-3 text-3xl font-black text-[#07111F]">
                    {market.name}
                  </h2>

                  <p className="mt-3 min-h-20 leading-7 text-slate-600">
                    {market.tagline}
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-2 text-xs font-bold text-slate-600">
                    <span className="rounded-xl bg-[#F7FAFC] px-3 py-2">Product guidance</span>
                    <span className="rounded-xl bg-[#F7FAFC] px-3 py-2">Quote support</span>
                  </div>

                  <span className="mt-5 inline-flex font-black text-[#FF6A00] group-hover:text-[#007C91]">
                    View Market &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-20 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.32em] text-[#FF6A00]">
                International Buyer Support
              </p>

              <h2 className="mt-4 text-4xl font-black text-[#07111F] md:text-5xl">
                Clear packaging guidance across markets
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                International buyers can compare product styles, understand material and
                finishing choices, and prepare the details needed for a clearer
                packaging quote.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {[
                "Clear product options",
                "Quote-ready requirements",
                "Material & finish guidance",
                "International buyer support",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[1.5rem] border border-slate-200 bg-[#F7FAFC] p-6 transition hover:-translate-y-1 hover:border-[#00C2E8]"
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

        <section className="bg-gradient-to-r from-[#00C2E8] to-[#FF6A00] px-5 py-20 text-white md:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-4xl font-black md:text-6xl">
              Need custom packaging for your market?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg">
              Share your country, product size, quantity and finishing needs.
              Our team will guide you with the right packaging solution.
            </p>

            <Link
              href="/#quote"
              prefetch={false}
              className="mt-8 inline-flex rounded-full bg-[#07111F] px-8 py-4 font-black text-white transition hover:-translate-y-1 hover:bg-white hover:text-[#07111F]"
            >
              Request Global Quote
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Header from "../../components/Header";
import { categories } from "../../data/categories";

const siteUrl = "https://printypackaging.com";
const brandName = "Printy Packaging";

export const metadata: Metadata = {
  title: "Packaging Categories | Printy Packaging",
  description:
    "Explore packaging categories including luxury packaging, food packaging, retail packaging, cosmetic packaging and printing finishing solutions.",
  alternates: {
    canonical: `${siteUrl}/categories`,
  },
  openGraph: {
    title: "Packaging Categories | Printy Packaging",
    description:
      "Browse custom packaging categories by product type, business need, market and packaging style.",
    url: `${siteUrl}/categories`,
    siteName: brandName,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Packaging Categories | Printy Packaging",
    description:
      "Find custom packaging by category including food, luxury, retail and cosmetic packaging.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CategoriesPage() {
  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Packaging Categories",
    description:
      "Packaging categories for luxury packaging, food packaging, retail packaging, cosmetic packaging and finishing solutions.",
    url: `${siteUrl}/categories`,
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

  const categoryListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: categories.map((category, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: category.name,
      url: `${siteUrl}/categories/${category.slug}`,
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
          __html: JSON.stringify(categoryListJsonLd),
        }}
      />

      <main>
        <section className="relative overflow-hidden bg-[#07111F] px-5 py-20 text-white md:px-8 md:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,194,232,0.22),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(255,106,0,0.14),transparent_30%)]" />

          <div className="relative mx-auto max-w-7xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.35em] text-[#00C2E8]">
              Packaging Categories
            </p>

            <h1 className="mt-5 text-4xl font-black leading-tight md:text-7xl">
  Find Packaging by{" "}
  <span className="bg-gradient-to-r from-[#FF6A00] via-[#F4C27A] to-[#00C2E8] bg-clip-text text-transparent">
    Category
  </span>
</h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Browse custom packaging solutions by product type, business need,
              market and buyer requirement.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/products"
                prefetch={false}
                className="rounded-full bg-[#FF6A00] px-8 py-4 font-black text-white transition hover:-translate-y-1 hover:bg-[#007C91]"
              >
                View Products
              </Link>

              <Link
                href="/#quote"
                prefetch={false}
                className="rounded-full border border-white/20 px-8 py-4 font-black text-white transition hover:bg-white hover:text-[#07111F]"
              >
                Get Quote
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-[#F7FAFC] px-5 py-20 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.32em] text-[#FF6A00]">
                  Category Hubs
                </p>

                <h2 className="mt-4 text-4xl font-black text-[#07111F] md:text-5xl">
                  Choose by packaging need
                </h2>
              </div>

              <p className="max-w-xl text-sm leading-6 text-slate-600 md:text-right">
                Category pages help clients compare related packaging products
                and reach the right product page faster.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((category, index) => (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  prefetch={false}
                  className="pp-card group rounded-[2rem] bg-white p-7 shadow-md"
                >
                  <div className="relative mb-6 h-44 overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#07111F] via-[#007C91] to-[#00C2E8]">
                    <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:22px_22px]" />

                    <div className="absolute bottom-5 left-5 h-20 w-24 rotate-[-8deg] rounded-2xl bg-white shadow-2xl" />

                    <span className="absolute left-5 top-5 rounded-full bg-white/15 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white backdrop-blur">
                      Category
                    </span>

                    <span className="absolute bottom-5 right-5 flex h-8 w-8 items-center justify-center rounded-full bg-[#FF6A00] text-xs font-black text-white">
                      {index + 1}
                    </span>
                  </div>

                  <p className="text-xs font-black uppercase tracking-[0.25em] text-[#FF6A00]">
                    Packaging Category
                  </p>

                  <h2 className="mt-3 text-3xl font-black text-[#07111F]">
                    {category.name}
                  </h2>

                  <p className="mt-3 min-h-24 leading-7 text-slate-600">
                    {category.tagline}
                  </p>

                  <span className="mt-5 inline-flex font-black text-[#FF6A00] group-hover:text-[#007C91]">
                    View Category &rarr;
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
                Buyer Friendly Navigation
              </p>

              <h2 className="mt-4 text-4xl font-black text-[#07111F] md:text-5xl">
                Help clients reach the right packaging faster
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                Clear categories reduce confusion for buyers. Clients can browse
                by food, luxury, retail or business need, then request a quote
                with complete details.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {[
                "Easy product discovery",
                "Strong internal linking",
                "Better SEO structure",
                "Faster quote decisions",
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
              Not sure which category fits your product?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg">
              Send your product size, quantity and packaging idea. Our team will
              recommend the best category, product style, material and finishing.
            </p>

            <Link
              href="/#quote"
              prefetch={false}
              className="mt-8 inline-flex rounded-full bg-[#07111F] px-8 py-4 font-black text-white transition hover:-translate-y-1 hover:bg-white hover:text-[#07111F]"
            >
              Ask for Recommendation
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}


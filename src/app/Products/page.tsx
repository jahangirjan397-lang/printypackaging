import type { Metadata } from "next";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FloatingActions from "../../components/FloatingActions";
import { products } from "../../data/products";

const siteUrl = "https://printypackaging.com";
const brandName = "Printy Packaging";

export const metadata: Metadata = {
  title: "Custom Packaging Products | Printy Packaging",
  description:
    "Explore custom packaging products including rigid boxes, folding cartons, mailer boxes, butter paper, food packaging, paper bags, labels, stickers and luxury packaging.",
  alternates: {
    canonical: `${siteUrl}/products`,
  },
  openGraph: {
    title: "Custom Packaging Products | Printy Packaging",
    description:
      "Browse premium custom boxes, food packaging, butter paper, paper bags, labels, stickers and luxury packaging solutions.",
    url: `${siteUrl}/products`,
    siteName: brandName,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Packaging Products | Printy Packaging",
    description:
      "Explore professional custom packaging products for brands, food businesses and ecommerce stores.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ProductsPage() {
  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Custom Packaging Products",
    description:
      "Custom packaging products including boxes, food packaging, paper bags, labels, stickers and luxury packaging.",
    url: `${siteUrl}/products`,
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

  const productListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.name,
      url: `${siteUrl}/products/${product.slug}`,
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
          __html: JSON.stringify(productListJsonLd),
        }}
      />

      <main>
        <section className="relative overflow-hidden bg-[#07111F] px-5 py-20 text-white md:px-8 md:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,194,232,0.2),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(255,106,0,0.14),transparent_30%)]" />

          <div className="relative mx-auto max-w-7xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.35em] text-[#00C2E8]">
              Product Library
            </p>

            <h1 className="mt-5 text-4xl font-black leading-tight md:text-7xl">
              Custom Packaging Products
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Explore premium custom boxes, food packaging, butter paper, paper
              bags, labels, stickers and luxury packaging solutions for
              international brands.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/#quote"
                prefetch={false}
                className="rounded-full bg-[#FF6A00] px-8 py-4 font-black text-white transition hover:-translate-y-1 hover:bg-[#007C91]"
              >
                Get Custom Quote
              </Link>

              <Link
                href="/categories"
                prefetch={false}
                className="rounded-full border border-white/20 px-8 py-4 font-black text-white transition hover:bg-white hover:text-[#07111F]"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-[#F7FAFC] px-5 py-20 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.32em] text-[#FF6A00]">
                  All Packaging Products
                </p>

                <h2 className="mt-4 text-4xl font-black text-[#07111F] md:text-5xl">
                  Choose the right packaging style
                </h2>
              </div>

              <p className="max-w-xl text-sm leading-6 text-slate-600 md:text-right">
                Each product page helps clients understand packaging style,
                material options, finishing choices and quote requirements.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product, index) => (
                <Link
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  prefetch={false}
                  className="pp-card group overflow-hidden rounded-[1.7rem] bg-white shadow-md"
                >
                  <div className="relative h-48 bg-gradient-to-br from-[#07111F] via-[#007C91] to-[#00C2E8]">
                    <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:22px_22px]" />

                    <div className="absolute bottom-5 left-5 h-24 w-24 rotate-[-8deg] rounded-2xl bg-white shadow-2xl" />

                    <div className="absolute bottom-7 right-7 h-32 w-24 rounded-2xl bg-[#07111F] shadow-2xl">
                      <div className="mx-auto mt-6 h-9 w-9 rounded-full border border-[#FF6A00]" />
                      <p className="mt-4 text-center text-[10px] font-black tracking-widest text-white">
                        BOX
                      </p>
                    </div>

                    <span className="absolute left-5 top-5 rounded-full bg-white/15 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white backdrop-blur">
                      {product.category}
                    </span>

                    <span className="absolute bottom-5 right-5 flex h-8 w-8 items-center justify-center rounded-full bg-[#FF6A00] text-xs font-black text-white">
                      {index + 1}
                    </span>
                  </div>

                  <div className="p-6">
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-[#FF6A00]">
                      Custom Packaging
                    </p>

                    <h2 className="mt-3 text-xl font-black text-[#07111F]">
                      {product.name}
                    </h2>

                    <p className="mt-3 min-h-20 text-sm leading-6 text-slate-600">
                      {product.tagline}
                    </p>

                    <span className="mt-5 inline-flex font-black text-[#FF6A00] group-hover:text-[#007C91]">
                      View Product &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-20 md:px-8">
          <div className="mx-auto max-w-5xl rounded-[2rem] bg-[#07111F] p-8 text-center text-white md:p-12">
            <p className="text-sm font-black uppercase tracking-[0.32em] text-[#00C2E8]">
              Not Sure Which Packaging You Need?
            </p>

            <h2 className="mt-4 text-4xl font-black md:text-5xl">
              Our team can guide you before order
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-300">
              Share your product size, quantity, material preference and
              finishing needs. We will suggest the right packaging style.
            </p>

            <Link
              href="/#quote"
              prefetch={false}
              className="mt-8 inline-flex rounded-full bg-[#FF6A00] px-8 py-4 font-black text-white transition hover:-translate-y-1 hover:bg-white hover:text-[#07111F]"
            >
              Request Packaging Guidance
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingActions />
    </>
  );
}
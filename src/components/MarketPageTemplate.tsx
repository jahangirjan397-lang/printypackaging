import Link from "next/link";
import type { Market } from "../data/markets";
import { products } from "../data/products";
import BuyerTrustSection from "./BuyerTrustSection";

const siteUrl = "https://printypackaging.com";

const guideLinks = [
  {
    title: "Packaging Materials",
    href: "/packaging-materials",
    text: "Compare paperboard, kraft, corrugated, rigid board and food-safe material options.",
  },
  {
    title: "Finishing Options",
    href: "/finishing-options",
    text: "Explore lamination, foil stamping, embossing, debossing, spot UV and premium coatings.",
  },
  {
    title: "Artwork & Dieline Guide",
    href: "/artwork-guide",
    text: "Understand bleed, safe area, dieline, CMYK, Pantone, barcode and final approval.",
  },
  {
    title: "Sample Kit Guide",
    href: "/sample-kit",
    text: "Learn how samples help review material, structure, print quality and presentation.",
  },
];

const marketTrustSteps = [
  "Share product size and quantity",
  "Select material and GSM",
  "Choose printing and finishing",
  "Get quote guidance from sales team",
];

const marketSupportItems = [
  {
    title: "International Buyer Support",
    text: "Market pages help international buyers understand product options, packaging styles and quote requirements.",
  },
  {
    title: "Product-Specific Navigation",
    text: "Buyers can open product pages directly from each market page and compare recommended packaging products.",
  },
  {
    title: "Quote-Ready Direction",
    text: "Each page guides buyers to share size, quantity, material, GSM, printing, finishing and delivery details.",
  },
  {
    title: "SEO Market Structure",
    text: "Market pages support country-specific search intent and connect products, guides and quote flow together.",
  },
];

function getProductLabel(productName: string) {
  const name = productName.toLowerCase();

  if (
    name.includes("rigid") ||
    name.includes("magnetic") ||
    name.includes("drawer") ||
    name.includes("luxury") ||
    name.includes("perfume") ||
    name.includes("jewelry")
  ) {
    return "LUX";
  }

  if (
    name.includes("food") ||
    name.includes("bakery") ||
    name.includes("burger") ||
    name.includes("pizza") ||
    name.includes("butter")
  ) {
    return "FOOD";
  }

  if (name.includes("label") || name.includes("sticker")) {
    return "LBL";
  }

  if (name.includes("bag")) {
    return "BAG";
  }

  return "BOX";
}

export default function MarketPageTemplate({ market }: { market: Market }) {
  const marketProducts = products.filter((product) =>
    market.productSlugs.includes(product.slug)
  );

  const otherProducts = products
    .filter((product) => !market.productSlugs.includes(product.slug))
    .slice(0, 4);

  const quoteLink = "/#quote";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: market.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const marketPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Custom Packaging for ${market.name}`,
    description: market.description,
    url: `${siteUrl}/markets/${market.slug}`,
    keywords: market.keywords.join(", "),
    publisher: {
      "@type": "Organization",
      name: "Printy Packaging",
      url: siteUrl,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: marketProducts.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: product.name,
        url: `${siteUrl}/products/${product.slug}`,
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Markets",
        item: `${siteUrl}/markets`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: market.name,
        item: `${siteUrl}/markets/${market.slug}`,
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(marketPageSchema) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="relative overflow-hidden bg-[#07111F] px-5 py-20 text-white md:px-8 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,194,232,0.22),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(255,106,0,0.14),transparent_30%)]" />
        <div className="absolute left-0 top-0 h-44 w-44 rounded-full bg-[#00C2E8]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-[#FF6A00]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap items-center gap-2 text-sm font-bold text-slate-300">
            <Link href="/" prefetch={false} className="hover:text-[#00C2E8]">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/markets"
              prefetch={false}
              className="hover:text-[#00C2E8]"
            >
              Markets
            </Link>
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
                  className="rounded-full bg-[#FF6A00] px-8 py-4 font-black text-white transition hover:-translate-y-1 hover:bg-[#007C91]"
                >
                  View Products
                </a>

                <Link
                  href={quoteLink}
                  prefetch={false}
                  className="rounded-full border border-white/20 px-8 py-4 font-black text-white transition hover:bg-white hover:text-[#07111F]"
                >
                  Get Quote
                </Link>
              </div>

              <div className="mt-8 grid gap-3 text-sm font-bold text-slate-300 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                  Global Buyer Support
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                  Material Guidance
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                  Fast Quote Access
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl">
              <div className="relative h-[380px] overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#07111F] via-[#007C91] to-[#00C2E8]">
                <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:24px_24px]" />

                <div className="absolute left-8 top-8 rounded-full bg-white/15 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white backdrop-blur">
                  {market.region}
                </div>

                <div className="absolute bottom-8 left-8 h-36 w-44 rotate-[-7deg] rounded-2xl bg-white shadow-2xl" />

                <div className="absolute bottom-16 right-10 h-56 w-40 rounded-2xl bg-[#07111F] shadow-2xl">
                  <div className="mx-auto mt-12 h-16 w-16 rounded-full border border-[#FF6A00]" />
                  <p className="mt-8 px-4 text-center text-xl font-black tracking-widest text-white">
                    {market.name}
                  </p>
                </div>

                <div className="absolute bottom-8 right-8 rounded-full bg-[#FF6A00] px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-white">
                  Market Ready
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="market-products"
        className="bg-[#F7FAFC] px-5 py-20 md:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.32em] text-[#FF6A00]">
                Recommended Products
              </p>

              <h2 className="mt-4 max-w-3xl text-4xl font-black text-[#07111F] md:text-5xl">
                Packaging solutions for {market.region}
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-6 text-slate-600 md:text-right">
              Explore product styles that can support international buyers with
              custom sizes, materials, printing and finishing options.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {marketProducts.map((product, index) => (
              <article
                key={product.slug}
                className="group overflow-hidden rounded-[1.7rem] bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
              >
                <Link href={`/products/${product.slug}`} prefetch={false}>
                  <div className="relative h-44 overflow-hidden bg-gradient-to-br from-[#07111F] via-[#007C91] to-[#00C2E8]">
                    <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:22px_22px]" />

                    <span className="absolute left-5 top-5 rounded-full bg-white/15 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white backdrop-blur">
                      {getProductLabel(product.name)}
                    </span>

                    <span className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-[#FF6A00] text-xs font-black text-white">
                      {index + 1}
                    </span>

                    <div className="absolute bottom-7 left-7 h-20 w-28 rotate-[-8deg] rounded-2xl bg-white shadow-2xl" />

                    <div className="absolute bottom-10 right-8 h-28 w-20 rounded-2xl bg-[#07111F] shadow-2xl">
                      <div className="mx-auto mt-6 h-8 w-8 rounded-full border border-[#FF6A00]" />
                    </div>
                  </div>
                </Link>

                <div className="p-6">
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-[#FF6A00]">
                    {product.category}
                  </p>

                  <h3 className="mt-3 text-xl font-black text-[#07111F]">
                    <Link
                      href={`/products/${product.slug}`}
                      prefetch={false}
                      className="transition hover:text-[#007C91]"
                    >
                      {product.name}
                    </Link>
                  </h3>

                  <p className="mt-3 min-h-20 text-sm leading-6 text-slate-600">
                    {product.tagline}
                  </p>

                  <div className="mt-5 grid gap-2">
                    <div className="rounded-2xl bg-[#F7FAFC] px-4 py-3 text-xs font-bold text-slate-700">
                      Material: {product.materials[0] || "Custom material"}
                    </div>

                    <div className="rounded-2xl bg-[#F7FAFC] px-4 py-3 text-xs font-bold text-slate-700">
                      Finish: {product.finishes[0] || "Premium finish"}
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      href={`/products/${product.slug}`}
                      prefetch={false}
                      className="rounded-full bg-[#07111F] px-5 py-3 text-sm font-black text-white transition hover:bg-[#007C91]"
                    >
                      View
                    </Link>

                    <Link
                      href={`/?product=${product.slug}#quote`}
                      prefetch={false}
                      className="rounded-full bg-[#FF6A00] px-5 py-3 text-sm font-black text-white transition hover:bg-[#007C91]"
                    >
                      Quote
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <BuyerTrustSection />

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
              search engines understand international service relevance. This
              creates better internal linking for product, guide and market
              pages.
            </p>

            <Link
              href={quoteLink}
              prefetch={false}
              className="mt-8 inline-flex rounded-full bg-[#07111F] px-7 py-4 font-black text-white transition hover:-translate-y-1 hover:bg-[#FF6A00]"
            >
              Ask for Market Support
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {market.benefits.map((benefit) => (
              <div
                key={benefit}
                className="rounded-[1.5rem] border border-slate-200 bg-[#F7FAFC] p-6 transition hover:-translate-y-1 hover:border-[#00C2E8]"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#00C2E8] font-black text-[#07111F]">
                  ✓
                </div>
                <h3 className="font-black leading-7 text-[#07111F]">
                  {benefit}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F7FAFC] px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.32em] text-[#FF6A00]">
                Helpful Guides
              </p>

              <h2 className="mt-4 text-4xl font-black text-[#07111F] md:text-5xl">
                Packaging guides for {market.name} buyers.
              </h2>
            </div>

            <p className="text-lg leading-8 text-slate-600 lg:text-right">
              These resources help buyers understand materials, finishing,
              artwork, dielines and samples before sending a quote inquiry.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {guideLinks.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                prefetch={false}
                className="group rounded-[1.7rem] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-[#FF6A00] hover:shadow-lg"
              >
                <div className="mb-5 h-11 w-11 rounded-2xl bg-[#FF6A00] shadow-lg shadow-orange-500/20 transition group-hover:bg-[#007C91]" />

                <h3 className="text-xl font-black tracking-tight text-[#07111F]">
                  {guide.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">{guide.text}</p>

                <span className="mt-6 inline-flex text-sm font-black text-[#FF6A00]">
                  Read guide →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.32em] text-[#FF6A00]">
              Market Page Authority
            </p>

            <h2 className="mt-4 text-4xl font-black text-[#07111F] md:text-5xl">
              Built for international packaging search.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              A strong market page connects buyer intent, product solutions,
              guide pages and quote actions. This helps both customers and
              search engines understand the website structure clearly.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {marketSupportItems.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-slate-200 bg-[#F7FAFC] p-6 transition hover:-translate-y-1 hover:border-[#00C2E8]"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#00C2E8] font-black text-[#07111F]">
                  ✓
                </div>

                <h3 className="font-black text-[#07111F]">{item.title}</h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F7FAFC] px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.32em] text-[#FF6A00]">
                Quote Process
              </p>

              <h2 className="mt-4 text-4xl font-black text-[#07111F] md:text-5xl">
                Make international quote requests easier
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                Buyers can share complete packaging details in one quote form,
                including product type, size, quantity, material, GSM, printing,
                finishing and artwork status.
              </p>
            </div>

            <div className="grid gap-4">
              {marketTrustSteps.map((step) => (
                <div
                  key={step}
                  className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FF6A00] font-black text-white">
                    ✓
                  </div>
                  <p className="font-black text-[#07111F]">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 md:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-black uppercase tracking-[0.32em] text-[#FF6A00]">
            FAQ
          </p>

          <h2 className="mt-4 text-4xl font-black text-[#07111F]">
            Questions about packaging for {market.name}
          </h2>

          <div className="mt-10 space-y-4">
            {market.faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-[1.5rem] border border-slate-200 bg-[#F7FAFC] p-6"
              >
                <summary className="cursor-pointer list-none font-black text-[#07111F]">
                  <span className="flex items-center justify-between gap-5">
                    {faq.question}
                    <span className="text-[#FF6A00] transition group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>

                <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
              </details>
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
            Explore more product pages
          </h2>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {otherProducts.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                prefetch={false}
                className="pp-card rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-6"
              >
                <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-[#00C2E8]">
                  {product.category}
                </p>

                <h3 className="text-xl font-black">{product.name}</h3>

                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {product.tagline}
                </p>

                <span className="mt-5 inline-flex font-black text-[#FF6A00]">
                  View Page &rarr;
                </span>
              </Link>
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
            style, material, GSM, printing and finishing.
          </p>

          <Link
            href={quoteLink}
            prefetch={false}
            className="mt-8 inline-flex rounded-full bg-[#07111F] px-8 py-4 font-black text-white transition hover:-translate-y-1 hover:bg-white hover:text-[#07111F]"
          >
            Request Quote
          </Link>
        </div>
      </section>
    </main>
  );
}
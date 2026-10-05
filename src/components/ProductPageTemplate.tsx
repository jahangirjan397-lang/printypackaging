import Image from "next/image";
import Link from "next/link";
import DrawnArrow from "./DrawnArrow";
import type { Product } from "../data/products";
import { products } from "../data/products";
import { businessPromises } from "../data/businessInfo";
import { printCategory } from "../data/printProducts";
import BuyerTrustSection from "./BuyerTrustSection";
import ProductGuideLinksSection from "./ProductGuideLinksSection";
import ProductImageGallery from "./ProductImageGallery";
import ProductQuickQuote from "./ProductQuickQuote";
import MobileQuoteBar from "./MobileQuoteBar";
import StyleGuideSections, { GuideTopic } from "./StyleGuideSections";
import {
  formatStartingPrice,
  getStartingPrice,
  startingPriceNote,
} from "../data/startingPrices";
import { getStyleGuide, styleGuides } from "../data/styleGuides";

function getProductVisualLabel(product: Product) {
  const name = product.name.toLowerCase();

  if (
    name.includes("rigid") ||
    name.includes("magnetic") ||
    name.includes("drawer") ||
    name.includes("luxury") ||
    name.includes("jewelry") ||
    name.includes("perfume")
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

function getRelatedProducts(product: Product) {
  const hasImage = (item: Product) => Boolean(item.images?.[0]?.src);

  const sameCategoryProducts = products.filter(
    (item) =>
      item.slug !== product.slug &&
      item.category === product.category &&
      hasImage(item)
  );

  const fallbackProducts = products.filter(
    (item) =>
      item.slug !== product.slug &&
      item.category !== product.category &&
      hasImage(item)
  );

  return [...sameCategoryProducts, ...fallbackProducts].slice(0, 4);
}

export default function ProductPageTemplate({ product }: { product: Product }) {
  const styleGuide = getStyleGuide(product.slug);
  const childStyles = styleGuides.filter((guide) => guide.parent === product.slug);
  const relatedProducts = getRelatedProducts(product);
  // Buttons on the page jump to the short quote form under the hero
  const productQuoteLink = "#product-quote";
  // Style pages without their own price use their parent product's price
  const startingPrice =
    getStartingPrice(product.slug) ??
    (styleGuide ? getStartingPrice(styleGuide.parent) : undefined);
  const price = startingPrice ? formatStartingPrice(startingPrice) : null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: product.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  // Custom packaging is quoted per order (no fixed price or reviews yet), so it
  // is marked up as a Service. Product markup without offers/reviews/rating is
  // reported as an invalid product snippet by Google Search Console.
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Custom ${product.name}`,
    serviceType: product.name,
    description: product.description,
    category: product.category,
    image: product.images?.map(
      (image) => `https://printypackaging.com${image.src}`
    ),
    url: `https://printypackaging.com/products/${product.slug}`,
    provider: {
      "@type": "Organization",
      name: "Printy Packaging",
      url: "https://printypackaging.com",
    },
    areaServed: [
      "United States",
      "United Kingdom",
      "Canada",
      "Europe",
      "United Arab Emirates",
      "Australia",
    ],
    audience: {
      "@type": "BusinessAudience",
      audienceType: product.industries.join(", "),
    },
    // Starting price, so search engines and AI assistants can quote it
    ...(startingPrice && price
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "USD",
            price: price.amount.replace("$", ""),
            eligibleQuantity: {
              "@type": "QuantitativeValue",
              minValue: startingPrice.quantity,
              unitText: startingPrice.unit,
            },
            description: `${price.reference} Final price depends on size, quantity, material and finish.`,
            url: `https://printypackaging.com/products/${product.slug}#product-quote`,
          },
        }
      : {}),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://printypackaging.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: "https://printypackaging.com/products",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `https://printypackaging.com/products/${product.slug}`,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="relative overflow-hidden bg-[#07111F] px-5 pb-14 pt-8 text-white md:px-8 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,194,232,0.22),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(255,106,0,0.14),transparent_30%)]" />
        <div className="absolute left-0 top-0 h-44 w-44 rounded-full bg-[#00C2E8]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-[#FF6A00]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm font-bold text-slate-300 md:mb-10">
            <Link href="/" prefetch={false} className="hover:text-[#00C2E8]">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/products"
              prefetch={false}
              className="hover:text-[#00C2E8]"
            >
              Products
            </Link>
            <span>/</span>
            <span className="text-[#FF6A00]">{product.name}</span>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.35em] text-[#00C2E8]">
                {product.category}
              </p>

              <h1 className="mt-3 text-4xl font-black leading-tight md:mt-5 md:text-6xl">
                {product.name}
              </h1>

              <p className="mt-4 text-xl font-black text-[#FF6A00] md:mt-5 md:text-2xl">
                {product.tagline}
              </p>

              {price && (
                <div className="mt-5 max-w-xl rounded-2xl border border-[#00C2E8]/30 bg-[#00C2E8]/10 px-4 py-3">
                  <p className="flex flex-wrap items-baseline gap-x-2">
                    <span className="text-sm font-bold text-slate-300">From</span>
                    <span className="text-3xl font-black text-white">{price.amount}</span>
                    <span className="text-sm font-black text-white">{price.per}</span>
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-200">{price.reference}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">{startingPriceNote}</p>
                </div>
              )}

              <p className="mt-6 line-clamp-3 max-w-2xl text-base leading-7 text-slate-300 md:line-clamp-none md:text-lg md:leading-8">
                {product.description}
              </p>

              <div className="relative mt-8 flex flex-wrap gap-4 md:mt-14">
                <DrawnArrow
                  direction="down-left"
                  className="pointer-events-none absolute -top-[3.9rem] left-[6.5rem] hidden h-16 w-20 md:block"
                />
                <a
                  href={productQuoteLink}
                  className="rounded-full bg-[#FF6A00] px-8 py-4 font-black text-white transition hover:-translate-y-1 hover:bg-[#007C91]"
                >
                  Get Free Quote
                </a>

                <Link
                  href="/products"
                  prefetch={false}
                  className="rounded-full border border-white/20 px-8 py-4 font-black text-white transition hover:bg-white hover:text-[#07111F]"
                >
                  View All Products
                </Link>
              </div>

              <dl className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  {
                    label: "Minimum order",
                    // Print items are counted in pieces, not boxes
                    value:
                      product.category === printCategory
                        ? businessPromises.minimumOrder.replace(/boxes?/i, "pieces")
                        : businessPromises.minimumOrder,
                  },
                  { label: "Production", value: businessPromises.productionTime },
                  { label: "Quote reply", value: businessPromises.quoteResponse },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-white/[0.06] p-4"
                  >
                    <dt className="text-[11px] font-black uppercase tracking-[0.18em] text-[#00C2E8]">
                      {item.label}
                    </dt>
                    <dd className="mt-1 text-sm font-black text-white">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-4 text-sm font-bold text-slate-300">
                ✓ {businessPromises.designSupport} · ✓ {businessPromises.sampleOffer}
              </p>
            </div>

            {/* On phones the photos come first: buyers want to see the box */}
            <div className="order-first lg:order-none">
              <ProductImageGallery
                productName={product.name}
                images={product.images}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F7FAFC] px-5 py-10 md:px-8 md:py-14">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
          <ProductQuickQuote productName={product.name} productSlug={product.slug} />

          <aside className="rounded-[1.5rem] bg-[#07111F] p-6 text-white">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#00C2E8]">
              What you get
            </p>
            <ul className="mt-4 space-y-3 text-sm font-bold">
              {[
                "Exact price for your size and quantity",
                "Material and board advice",
                businessPromises.designSupport,
                "Free digital proof before production",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true" className="text-[#FF6A00]">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="https://wa.me/923338889954?text=Hello%20Printy%20Packaging%2C%20I%20need%20a%20quote."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-black text-[#07111F] transition hover:bg-[#1ebe5b]"
            >
              Prefer WhatsApp? Chat now
            </a>
          </aside>
        </div>
      </section>

      {childStyles.length > 0 && (
        <section className="border-b border-slate-200 bg-white px-5 py-8 md:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center">
            <p className="shrink-0 text-sm font-black uppercase tracking-[0.2em] text-[#FF6A00]">
              {product.name} styles
            </p>
            <div className="flex flex-wrap gap-2">
              {childStyles.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/products/${guide.slug}`}
                  prefetch={false}
                  className="rounded-full border border-slate-200 bg-[#F7FAFC] px-4 py-2 text-sm font-black text-[#07111F] transition hover:border-[#FF6A00] hover:text-[#FF6A00]"
                >
                  {guide.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {styleGuide ? (
        <StyleGuideSections guide={styleGuide} />
      ) : (
        <section className="bg-[#F7FAFC] px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-5xl">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-[#FF6A00]">
              Product details
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#07111F] sm:text-4xl">
              {product.name} options
            </h2>
            <div className="mt-8 space-y-3">
              <GuideTopic title="Materials" open>
                <OptionList items={product.materials} />
              </GuideTopic>
              <GuideTopic title="Finishing options">
                <OptionList items={product.finishes} />
              </GuideTopic>
              <GuideTopic title="Industries we make them for">
                <OptionList items={product.industries} />
              </GuideTopic>
            </div>
          </div>
        </section>
      )}

      <BuyerTrustSection />

      <ProductGuideLinksSection product={product} />

<section className="bg-white px-5 py-20 md:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-sm font-black uppercase tracking-[0.32em] text-[#FF6A00]">
            FAQ
          </p>

          <h2 className="text-center mt-4 text-4xl font-black text-[#07111F]">
            Questions about {product.name}
          </h2>

          <div className="mt-10 space-y-4">
            {product.faqs.map((faq) => (
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
              <Link
                key={item.slug}
                href={`/products/${item.slug}`}
                prefetch={false}
                className="group pp-card rounded-[1.5rem] bg-white p-6 shadow-md"
              >
                <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
                  {item.images?.[0]?.src ? (
                    <Image
                      src={item.images[0].src}
                      alt={item.images[0].alt || item.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-contain p-2 transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#07111F] via-[#007C91] to-[#00C2E8] px-5 text-center text-sm font-black text-white">
                      {getProductVisualLabel(item)}
                    </div>
                  )}
                </div>

                <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-[#00C2E8]">
                  {item.category}
                </p>

                <h3 className="text-xl font-black text-[#07111F]">
                  {item.name}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.tagline}
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
            Get My Free Quote
          </a>
        </div>
      </section>
              <MobileQuoteBar
        priceLabel={price ? `${price.amount}${price.per}` : undefined}
      />
    </main>
  );
}

function OptionList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full bg-[#F7FAFC] px-4 py-2 text-sm font-bold text-slate-700"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

import Link from "next/link";
import type { Product } from "../data/products";
import { products } from "../data/products";
import BuyerTrustSection from "./BuyerTrustSection";
import ProductBuyerJourneySection from "./ProductBuyerJourneySection";
import ProductGuideLinksSection from "./ProductGuideLinksSection";
import ProductQuoteChecklistSection from "./ProductQuoteChecklistSection";
import ProductSeoBlocks from "./ProductSeoBlocks";
import ProductMerchantCtaPanel from "./ProductMerchantCtaPanel";
function getProductGallery(product: Product) {
  const firstWord = product.name.split(" ")[0] || "Box";

  return [
    {
      title: "Front View",
      label: firstWord,
      description: "Premium branded front packaging presentation.",
    },
    {
      title: "Side View",
      label: "SIDE",
      description: "Clear structure and product protection view.",
    },
    {
      title: "Open View",
      label: "OPEN",
      description: "Unboxing experience and inside packaging layout.",
    },
    {
      title: "Material View",
      label: "GSM",
      description: "Board, paper, flute or wrap material selection.",
    },
    {
      title: "Finish View",
      label: "UV",
      description: "Lamination, UV, foiling and embossing options.",
    },
  ];
}

function getProductSpecs(product: Product) {
  return [
    {
      title: "Custom Size",
      description:
        "Produced according to product dimensions, structure and packing requirement.",
    },
    {
      title: "Material Guidance",
      description: `${product.materials
        .slice(0, 2)
        .join(", ")} and other professional material options can be selected according to product use.`,
    },
    {
      title: "Printing Support",
      description:
        "CMYK, Pantone, inside/outside printing and brand-focused artwork support.",
    },
    {
      title: "Finishing Options",
      description: `${product.finishes
        .slice(0, 2)
        .join(", ")} and other finishing options are available for better brand presentation.`,
    },
  ];
}

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
  const sameCategoryProducts = products.filter(
    (item) => item.slug !== product.slug && item.category === product.category
  );

  const fallbackProducts = products.filter(
    (item) =>
      item.slug !== product.slug &&
      !sameCategoryProducts.some((related) => related.slug === item.slug)
  );

  return [...sameCategoryProducts, ...fallbackProducts].slice(0, 4);
}

export default function ProductPageTemplate({ product }: { product: Product }) {
  const relatedProducts = getRelatedProducts(product);
  const productQuoteLink = `/?product=${product.slug}#quote`;
  const galleryItems = getProductGallery(product);
  const productSpecs = getProductSpecs(product);
  const visualLabel = getProductVisualLabel(product);

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

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: product.category,
    brand: {
      "@type": "Brand",
      name: "Printy Packaging",
    },
    material: product.materials.join(", "),
    url: `https://printypackaging.com/products/${product.slug}`,
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Available materials",
        value: product.materials.join(", "),
      },
      {
        "@type": "PropertyValue",
        name: "Available finishes",
        value: product.finishes.join(", "),
      },
      {
        "@type": "PropertyValue",
        name: "Industries",
        value: product.industries.join(", "),
      },
    ],
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

      <section className="relative overflow-hidden bg-[#07111F] px-5 py-20 text-white md:px-8 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,194,232,0.22),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(255,106,0,0.14),transparent_30%)]" />
        <div className="absolute left-0 top-0 h-44 w-44 rounded-full bg-[#00C2E8]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-[#FF6A00]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-10 flex flex-wrap items-center gap-2 text-sm font-bold text-slate-300">
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

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.35em] text-[#00C2E8]">
                {product.category}
              </p>

              <h1 className="mt-5 text-4xl font-black leading-tight md:text-6xl">
                {product.name}
              </h1>

              <p className="mt-5 text-2xl font-black text-[#FF6A00]">
                {product.tagline}
              </p>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                {product.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={productQuoteLink}
                  prefetch={false}
                  className="rounded-full bg-[#FF6A00] px-8 py-4 font-black text-white transition hover:-translate-y-1 hover:bg-[#007C91]"
                >
                  Get Quote
                </Link>

                <Link
                  href="/products"
                  prefetch={false}
                  className="rounded-full border border-white/20 px-8 py-4 font-black text-white transition hover:bg-white hover:text-[#07111F]"
                >
                  View All Products
                </Link>
              </div>

              <div className="mt-8 grid gap-3 text-sm font-bold text-slate-300 sm:grid-cols-3">
                {["Low MOQ Support", "Custom Size", "Print Ready Help"].map(
                  (item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-white/[0.06] p-4"
                    >
                      {item}
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl">
              <div className="relative h-[380px] overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#07111F] via-[#007C91] to-[#00C2E8]">
                <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:24px_24px]" />

                <div className="absolute left-8 top-8 rounded-full bg-white/15 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white backdrop-blur">
                  Custom Packaging
                </div>

                <div className="absolute bottom-8 left-8 h-36 w-44 rotate-[-7deg] rounded-2xl bg-white shadow-2xl" />

                <div className="absolute bottom-16 right-10 h-56 w-40 rounded-2xl bg-[#07111F] shadow-2xl">
                  <div className="mx-auto mt-12 h-16 w-16 rounded-full border border-[#FF6A00]" />
                  <p className="mt-8 px-4 text-center text-xl font-black tracking-widest text-white">
                    {product.name.split(" ")[0]}
                  </p>
                </div>

                <div className="absolute bottom-8 right-8 rounded-full bg-[#FF6A00] px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-white">
                  Premium Mockup
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="product-gallery" className="bg-white px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.32em] text-[#FF6A00]">
                Product Gallery
              </p>

              <h2 className="mt-4 text-4xl font-black text-[#07111F] md:text-5xl">
                5 visual angles for {product.name}
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-6 text-slate-600 md:text-right">
              These are fast-loading professional placeholders. Real packaging
              images can be replaced later without changing the page structure.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {galleryItems.map((item, index) => (
              <div
                key={item.title}
                className="group overflow-hidden rounded-[1.7rem] border border-slate-200 bg-[#F7FAFC] shadow-sm transition hover:-translate-y-1 hover:border-[#00C2E8] hover:shadow-md"
              >
                <div className="relative h-52 bg-gradient-to-br from-[#07111F] via-[#007C91] to-[#00C2E8]">
                  <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:22px_22px]" />

                  <div className="absolute bottom-6 left-1/2 h-24 w-24 -translate-x-1/2 rotate-[-7deg] rounded-2xl bg-white shadow-2xl transition group-hover:rotate-0" />

                  <div className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#FF6A00] text-xs font-black text-white">
                    {index + 1}
                  </div>

                  <div className="absolute bottom-5 right-5 rounded-full bg-white/15 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white backdrop-blur">
                    {item.label}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-black text-[#07111F]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="product-details" className="bg-[#F7FAFC] px-5 py-20 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.32em] text-[#FF6A00]">
              Product Details
            </p>

            <h2 className="mt-4 text-4xl font-black text-[#07111F] md:text-5xl">
              Why choose {product.name}?
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              {product.name} help brands improve presentation, product safety,
              customer experience and professional shelf impact.
            </p>

            <Link
              href={productQuoteLink}
              prefetch={false}
              className="mt-8 inline-flex rounded-full bg-[#07111F] px-7 py-4 font-black text-white transition hover:-translate-y-1 hover:bg-[#FF6A00]"
            >
              Request Price Guidance
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {productSpecs.map((feature) => (
              <div
                key={feature.title}
                className="rounded-[1.5rem] border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-[#00C2E8]"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#00C2E8] font-black text-[#07111F]">
                  ✓
                </div>
                <h3 className="font-black text-[#07111F]">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BuyerTrustSection />

      <section className="bg-white px-5 py-20 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
          <InfoCard title="Materials" items={product.materials} />
          <InfoCard title="Finishing Options" items={product.finishes} />
          <InfoCard title="Industries" items={product.industries} />
        </div>
      </section>

      <ProductSeoBlocks />

      <ProductGuideLinksSection product={product} />

      <ProductBuyerJourneySection
        product={product}
        quoteLink={productQuoteLink}
      />

            <ProductQuoteChecklistSection
        product={product}
        quoteLink={productQuoteLink}
      />

      <ProductMerchantCtaPanel productTitle={product.name} />

      <section className="bg-[#F7FAFC] px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.32em] text-[#FF6A00]">
                Buyer Guidance
              </p>

              <h2 className="mt-4 text-4xl font-black text-[#07111F] md:text-5xl">
                Make your packaging decision faster
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                Share your product size, quantity, material choice, GSM,
                printing colors and finishing needs. Our sales team will review
                your details and suggest the most practical packaging solution.
              </p>
            </div>

            <div className="grid gap-4">
              {[
                "Send product size and quantity",
                "Select material and GSM",
                "Choose printing and finishing",
                "Receive quote guidance from sales team",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FF6A00] font-black text-white">
                    ✓
                  </div>
                  <p className="font-black text-[#07111F]">{item}</p>
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
                className="pp-card rounded-[1.5rem] bg-white p-6 shadow-md"
              >
                <div className="relative mb-5 h-32 overflow-hidden rounded-2xl bg-gradient-to-br from-[#07111F] via-[#007C91] to-[#00C2E8]">
                  <div className="absolute bottom-4 left-5 h-16 w-20 rotate-[-8deg] rounded-xl bg-white shadow-xl" />
                  <div className="absolute right-4 top-4 rounded-full bg-white/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white">
                    {getProductVisualLabel(item)}
                  </div>
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

          <Link
            href={productQuoteLink}
            prefetch={false}
            className="mt-8 inline-flex rounded-full bg-[#07111F] px-8 py-4 font-black text-white transition hover:-translate-y-1 hover:bg-white hover:text-[#07111F]"
          >
            Request Quote
          </Link>
        </div>
      </section>
                  <ProductQuoteChecklistSection
        product={product}
        quoteLink={productQuoteLink}
      />

      <ProductMerchantCtaPanel productTitle={product.name} />
    </main>
  );
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[1.7rem] bg-[#F7FAFC] p-7 shadow-sm">
      <h3 className="text-2xl font-black text-[#07111F]">{title}</h3>

      <div className="mt-6 grid gap-3">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-2xl bg-white px-4 py-3 font-bold text-slate-700"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}


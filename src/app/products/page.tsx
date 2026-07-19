import type { Metadata } from "next";
import Link from "next/link";
import Header from "../../components/Header";
import { categories as packagingCategories } from "../../data/categories";
import type { Product } from "../../data/products";
import { products } from "../../data/products";

const siteUrl = "https://printypackaging.com";
const brandName = "Printy Packaging";

export const metadata: Metadata = {
  title: "Custom Packaging Products | Boxes, Bags, Labels & Food Packaging",
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

function getProductLabel(product: Product) {
  const name = product.name.toLowerCase();

  if (
    name.includes("rigid") ||
    name.includes("magnetic") ||
    name.includes("drawer") ||
    name.includes("jewelry") ||
    name.includes("perfume")
  ) {
    return "LUX";
  }

  if (
    name.includes("mailer") ||
    name.includes("shipping") ||
    name.includes("pizza")
  ) {
    return "BOX";
  }

  if (
    name.includes("butter") ||
    name.includes("food") ||
    name.includes("bakery") ||
    name.includes("burger")
  ) {
    return "FOOD";
  }

  if (name.includes("label") || name.includes("sticker")) {
    return "LBL";
  }

  if (name.includes("bag")) {
    return "BAG";
  }

  return "PACK";
}

function getProductMockupShape(product: Product) {
  const name = product.name.toLowerCase();

  if (
    name.includes("label") ||
    name.includes("sticker") ||
    name.includes("hang tag")
  ) {
    return "label";
  }

  if (name.includes("paper bag") || name.includes("bag")) {
    return "bag";
  }

  if (name.includes("butter") || name.includes("paper")) {
    return "paper";
  }

  if (
    name.includes("rigid") ||
    name.includes("magnetic") ||
    name.includes("drawer") ||
    name.includes("luxury")
  ) {
    return "rigid";
  }

  return "box";
}

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

  const breadcrumbJsonLd = {
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
        name: "Products",
        item: `${siteUrl}/products`,
      },
    ],
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      <main>
        <section className="relative overflow-hidden bg-[#07111F] px-5 py-20 text-white md:px-8 md:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,194,232,0.2),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(255,106,0,0.14),transparent_30%)]" />

          <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-[#00C2E8]/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-[#FF6A00]/10 blur-3xl" />

          <div className="relative mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <div className="mb-8 flex flex-wrap items-center gap-2 text-sm font-bold text-slate-300">
                  <Link
                    href="/"
                    prefetch={false}
                    className="hover:text-[#00C2E8]"
                  >
                    Home
                  </Link>
                  <span>/</span>
                  <span className="text-[#FF6A00]">Products</span>
                </div>

                <p className="text-sm font-black uppercase tracking-[0.35em] text-[#00C2E8]">
                  Product Library
                </p>

                <h1 className="mt-5 text-4xl font-black leading-tight md:text-7xl">
  Custom Packaging{" "}
  <span className="bg-gradient-to-r from-[#FF6A00] via-[#F4C27A] to-[#00C2E8] bg-clip-text text-transparent">
    Products
  </span>
</h1>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                  Explore premium custom boxes, food packaging, butter paper,
                  paper bags, labels, stickers and luxury packaging solutions
                  for international brands.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
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

                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  <HeroStat value={`${products.length}+`} label="Products" />
                  <HeroStat value={`${packagingCategories.length}+`}
  label="Categories"
/>
                  <HeroStat value="24/7" label="Quote Access" />
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl">
                <div className="relative h-[410px] overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#07111F] via-[#007C91] to-[#00C2E8]">
                  <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:24px_24px]" />

                  <div className="absolute left-8 top-8 rounded-full bg-white/15 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white backdrop-blur">
                    Premium Range
                  </div>

                  <div className="absolute bottom-10 left-8 h-32 w-44 rotate-[-8deg] rounded-2xl bg-white shadow-2xl" />

                  <div className="absolute bottom-16 right-12 h-56 w-40 rounded-2xl bg-[#07111F] shadow-2xl">
                    <div className="mx-auto mt-12 h-16 w-16 rounded-full border border-[#FF6A00]" />
                    <p className="mt-8 text-center text-xl font-black tracking-widest text-white">
                      PP
                    </p>
                  </div>

                  <div className="absolute right-8 top-24 h-24 w-24 rotate-12 rounded-2xl bg-white/90 shadow-2xl" />

                  <div className="absolute bottom-8 right-8 rounded-full bg-[#FF6A00] px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-white">
                    Fast Quotes
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-10 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex gap-3 overflow-x-auto pb-3">
                            {packagingCategories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  prefetch={false}
                  className="shrink-0 rounded-full border border-slate-200 bg-[#F7FAFC] px-5 py-3 text-sm font-black text-[#07111F] transition hover:border-[#00C2E8] hover:bg-[#00C2E8] hover:text-white"
                >
                  {category.name}
                </Link>
              ))}
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

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product, index) => (
                <ProductCard
                  key={product.slug}
                  product={product}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-20 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 md:grid-cols-3">
              <GuideCard
                title="Need help choosing material?"
                text="Select product style, quantity and size. Our team can guide you with SBS, art card, kraft, rigid board, corrugated or food-grade material."
              />

              <GuideCard
                title="Need print and finish advice?"
                text="We can guide CMYK, Pantone, matte, gloss, soft touch, foil, embossing, spot UV, window patching and die cutting options."
              />

              <GuideCard
                title="Need a fast quote?"
                text="Send product details through the quote form and our packaging team will review your requirement for price guidance."
              />
            </div>
          </div>
        </section>

        <section className="bg-[#F7FAFC] px-5 py-20 md:px-8">
          <div className="mx-auto max-w-5xl rounded-[2rem] bg-[#07111F] p-8 text-center text-white shadow-xl md:p-12">
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
    </>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
      <p className="text-3xl font-black text-[#FF6A00]">{value}</p>
      <p className="mt-1 text-sm font-bold text-slate-300">{label}</p>
    </div>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const quoteLink = `/?product=${product.slug}#quote`;
  const material = product.materials[0] || "Custom material";
  const finish = product.finishes[0] || "Premium finish";

  return (
    <article className="group overflow-hidden rounded-[1.7rem] bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/products/${product.slug}`} prefetch={false}>
        <ProductVisual product={product} index={index} />
      </Link>

      <div className="p-6">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-[#FF6A00]">
          {product.category}
        </p>

        <h2 className="mt-3 text-xl font-black text-[#07111F]">
          <Link
            href={`/products/${product.slug}`}
            prefetch={false}
            className="transition hover:text-[#007C91]"
          >
            {product.name}
          </Link>
        </h2>

        <p className="mt-3 min-h-16 text-sm leading-6 text-slate-600">
          {product.tagline}
        </p>

        <div className="mt-5 grid gap-2">
          <div className="rounded-2xl bg-[#F7FAFC] px-4 py-3 text-xs font-bold text-slate-700">
            Material: {material}
          </div>

          <div className="rounded-2xl bg-[#F7FAFC] px-4 py-3 text-xs font-bold text-slate-700">
            Finish: {finish}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href={`/products/${product.slug}`}
            prefetch={false}
            className="inline-flex rounded-full bg-[#07111F] px-5 py-3 text-sm font-black text-white transition hover:bg-[#007C91]"
          >
            View Product
          </Link>

          <Link
            href={quoteLink}
            prefetch={false}
            className="inline-flex rounded-full bg-[#FF6A00] px-5 py-3 text-sm font-black text-white transition hover:bg-[#007C91]"
          >
            Quote
          </Link>
        </div>
      </div>
    </article>
  );
}

function ProductVisual({ product, index }: { product: Product; index: number }) {
  const label = getProductLabel(product);
  const shape = getProductMockupShape(product);

  return (
    <div className="relative h-52 overflow-hidden bg-gradient-to-br from-[#07111F] via-[#007C91] to-[#00C2E8]">
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:22px_22px]" />

      <span className="absolute left-5 top-5 rounded-full bg-white/15 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white backdrop-blur">
        {label}
      </span>

      <span className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-[#FF6A00] text-xs font-black text-white">
        {index + 1}
      </span>

      {shape === "label" && (
        <>
          <div className="absolute bottom-10 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full bg-white shadow-2xl" />
          <div className="absolute bottom-16 left-1/2 h-16 w-16 -translate-x-1/2 rounded-full border border-[#FF6A00]" />
        </>
      )}

      {shape === "bag" && (
        <>
          <div className="absolute bottom-7 left-1/2 h-32 w-28 -translate-x-1/2 rounded-b-2xl rounded-t-md bg-white shadow-2xl" />
          <div className="absolute bottom-32 left-1/2 h-10 w-16 -translate-x-1/2 rounded-t-full border-4 border-white" />
        </>
      )}

      {shape === "paper" && (
        <>
          <div className="absolute bottom-8 left-8 h-28 w-40 rotate-[-10deg] rounded-2xl bg-white shadow-2xl" />
          <div className="absolute bottom-14 right-8 h-24 w-36 rotate-[8deg] rounded-2xl bg-white/90 shadow-2xl" />
        </>
      )}

      {shape === "rigid" && (
        <>
          <div className="absolute bottom-8 left-8 h-28 w-40 rotate-[-7deg] rounded-2xl bg-white shadow-2xl" />
          <div className="absolute bottom-16 right-10 h-32 w-28 rounded-2xl bg-[#07111F] shadow-2xl">
            <div className="mx-auto mt-8 h-10 w-10 rounded-full border border-[#FF6A00]" />
          </div>
        </>
      )}

      {shape === "box" && (
        <>
          <div className="absolute bottom-8 left-8 h-24 w-32 rotate-[-8deg] rounded-2xl bg-white shadow-2xl" />
          <div className="absolute bottom-12 right-10 h-32 w-24 rounded-2xl bg-[#07111F] shadow-2xl">
            <div className="mx-auto mt-7 h-9 w-9 rounded-full border border-[#FF6A00]" />
          </div>
        </>
      )}

      <div className="absolute bottom-5 right-5 rounded-full bg-white/15 px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white backdrop-blur">
        Custom Made
      </div>
    </div>
  );
}

function GuideCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[1.7rem] border border-slate-200 bg-[#F7FAFC] p-7 transition hover:-translate-y-1 hover:border-[#00C2E8]">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00C2E8] font-black text-[#07111F]">
        ✓
      </div>

      <h3 className="text-xl font-black text-[#07111F]">{title}</h3>

      <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}


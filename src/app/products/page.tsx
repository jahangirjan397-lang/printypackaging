import type { Metadata } from "next";
import Image from "next/image";
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
    images: [
      {
        url: `${siteUrl}/images/products/luxury-packaging/luxury-packaging-hero.webp`,
        width: 1200,
        height: 900,
        alt: "Printy Packaging custom boxes and premium packaging range",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Packaging Products | Printy Packaging",
    description:
      "Explore professional custom packaging products for brands, food businesses and ecommerce stores.",
    images: [
      `${siteUrl}/images/products/luxury-packaging/luxury-packaging-hero.webp`,
    ],
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

  const displayProducts = products.filter((product) => product.images?.length);

  const productListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: displayProducts.map((product, index) => ({
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
                  <HeroStat value={`${displayProducts.length}+`} label="Products" />
                  <HeroStat
                    value={`${packagingCategories.length}+`}
                    label="Categories"
                  />
                  <HeroStat value="24/7" label="Quote Access" />
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-cyan-950/40">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-[#EDE5DC]">
                  <Image
                    src="/images/products/luxury-packaging/luxury-packaging-hero.webp"
                    alt="Premium custom packaging presentation by Printy Packaging"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#07111F]/95 via-[#07111F]/75 to-transparent px-6 pb-6 pt-20">
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-[#00C2E8]">
                      Premium Product Range
                    </p>
                    <p className="mt-2 max-w-md text-lg font-black text-white sm:text-xl">
                      Branded packaging made around your product, market and
                      finish requirements.
                    </p>
                  </div>

                  <div className="absolute right-5 top-5 rounded-full bg-[#FF6A00] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white shadow-lg">
                    Made To Order
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  <HeroRangeThumb
                    src="/images/products/food-packaging/food-packaging-hero.webp"
                    alt="Custom food packaging"
                    label="Food"
                  />
                  <HeroRangeThumb
                    src="/images/products/mailer-boxes/mailer-boxes-hero.webp"
                    alt="Custom mailer boxes"
                    label="Ecommerce"
                  />
                  <HeroRangeThumb
                    src="/images/products/rigid-boxes/rigid-boxes-hero.webp"
                    alt="Custom rigid boxes"
                    label="Luxury"
                  />
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
                  Featured Packaging Products
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

            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {displayProducts.map((product, index) => (
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

function HeroRangeThumb({
  src,
  alt,
  label,
}: {
  src: string;
  alt: string;
  label: string;
}) {
  return (
    <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white/10">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 30vw, 13vw"
        className="object-cover transition duration-500 group-hover:scale-105"
      />
      <span className="absolute inset-x-2 bottom-2 rounded-full bg-[#07111F]/85 px-2 py-1 text-center text-[10px] font-black uppercase tracking-[0.14em] text-white backdrop-blur">
        {label}
      </span>
    </div>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const quoteLink = `/?product=${product.slug}#quote`;
  const material = product.materials[0] || "Custom material";
  const finish = product.finishes[0] || "Premium finish";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.7rem] border border-slate-200 bg-white shadow-[0_14px_40px_rgba(7,17,31,0.08)] transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-[0_24px_65px_rgba(7,17,31,0.14)]">
      <Link
        href={`/products/${product.slug}`}
        prefetch={false}
        aria-label={`View ${product.name}`}
      >
        <ProductVisual product={product} index={index} />
      </Link>

      <div className="flex flex-1 flex-col p-6 lg:p-7">
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

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
          {product.tagline}
        </p>

        <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-bold text-slate-700">
          <span className="max-w-full truncate rounded-full bg-[#F7FAFC] px-3 py-2">
            {material}
          </span>
          <span className="max-w-full truncate rounded-full bg-[#F7FAFC] px-3 py-2">
            {finish}
          </span>
        </div>

        <div className="mt-auto flex flex-wrap gap-3 pt-5">
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

function ProductVisual({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const label = getProductLabel(product);
  const shape = getProductMockupShape(product);
  const image = product.images?.[0];

  return (
    <div className="relative aspect-[5/4] overflow-hidden bg-[#EEE9E3]">
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={product.slug === 'jewelry-boxes' ? 'object-contain object-center p-4 brightness-[1.025] contrast-[1.015] transition duration-500 group-hover:scale-[1.015]' : 'object-cover object-center brightness-[1.025] contrast-[1.015] transition duration-500 group-hover:scale-[1.025]'}
        />
      ) : (
        <ProductIllustration product={product} shape={shape} />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-[#07111F]/45 via-transparent to-[#07111F]/10" />

      <span className="absolute left-4 top-4 rounded-full bg-[#07111F]/88 px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white shadow-lg backdrop-blur">
        {label}
      </span>

      <span className="absolute right-4 top-4 flex h-8 min-w-8 items-center justify-center rounded-full bg-[#FF6A00] px-2 text-xs font-black text-white shadow-lg">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
        <span className="rounded-full bg-white/92 px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#07111F] shadow-lg backdrop-blur">
          {image ? "Product Preview" : "Made To Specification"}
        </span>
        <span className="rounded-full bg-[#07111F]/88 px-3 py-2 text-[10px] font-black text-white shadow-lg backdrop-blur">
          View Details →
        </span>
      </div>
    </div>
  );
}

function ProductIllustration({
  product,
  shape,
}: {
  product: Product;
  shape: ReturnType<typeof getProductMockupShape>;
}) {
  return (
    <div
      role="img"
      aria-label={`Custom ${product.name} design illustration`}
      className="absolute inset-0 overflow-hidden bg-gradient-to-br from-[#F9F3EC] via-white to-[#DFF8FC]"
    >
      <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(circle,#00A6C7_1px,transparent_1px)] [background-size:18px_18px]" />
      <svg
        aria-hidden="true"
        viewBox="0 0 320 230"
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        <ellipse
          cx="163"
          cy="192"
          rx="105"
          ry="17"
          fill="#07111F"
          opacity="0.12"
        />

        {shape === "label" && (
          <>
            <circle
              cx="160"
              cy="118"
              r="67"
              fill="white"
              stroke="#07111F"
              strokeWidth="5"
            />
            <circle
              cx="160"
              cy="118"
              r="45"
              fill="#DFF8FC"
              stroke="#00A6C7"
              strokeWidth="3"
            />
          </>
        )}

        {shape === "bag" && (
          <>
            <path
              d="M98 75H222L210 190H110L98 75Z"
              fill="white"
              stroke="#07111F"
              strokeWidth="5"
            />
            <path
              d="M128 80C128 42 192 42 192 80"
              stroke="#FF6A00"
              strokeWidth="8"
              strokeLinecap="round"
            />
          </>
        )}

        {shape === "paper" && (
          <>
            <path
              d="M68 95L190 62L211 148L89 181L68 95Z"
              fill="white"
              stroke="#07111F"
              strokeWidth="5"
            />
            <path
              d="M137 79L253 98L239 180L123 161L137 79Z"
              fill="#DFF8FC"
              stroke="#00A6C7"
              strokeWidth="5"
            />
          </>
        )}

        {shape === "rigid" && (
          <>
            <path
              d="M68 103L157 69L249 101L157 139L68 103Z"
              fill="#26384C"
              stroke="#07111F"
              strokeWidth="5"
            />
            <path
              d="M68 103V169L157 203V139L68 103Z"
              fill="#10243A"
              stroke="#07111F"
              strokeWidth="5"
            />
            <path
              d="M157 139V203L249 165V101L157 139Z"
              fill="#07111F"
              stroke="#07111F"
              strokeWidth="5"
            />
            <path d="M81 105L158 76L236 103" stroke="#00C2E8" strokeWidth="4" />
          </>
        )}

        {shape === "box" && (
          <>
            <path
              d="M77 91L160 58L244 91L160 125L77 91Z"
              fill="white"
              stroke="#07111F"
              strokeWidth="5"
            />
            <path
              d="M77 91V169L160 202V125L77 91Z"
              fill="#EEF8FA"
              stroke="#07111F"
              strokeWidth="5"
            />
            <path
              d="M160 125V202L244 168V91L160 125Z"
              fill="#DFF8FC"
              stroke="#07111F"
              strokeWidth="5"
            />
            <path d="M86 96L160 125L235 95" stroke="#FF6A00" strokeWidth="4" />
          </>
        )}

        <rect x="124" y="111" width="72" height="29" rx="14.5" fill="#07111F" />
        <text
          x="160"
          y="130"
          fill="white"
          fontSize="12"
          fontWeight="800"
          textAnchor="middle"
        >
          PRINTY
        </text>
      </svg>
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

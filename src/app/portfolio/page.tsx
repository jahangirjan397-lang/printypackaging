import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Packaging Gallery | Box Styles, Food Packaging & Print Finishes",
  description:
    "Explore Printy Packaging concept examples for luxury boxes, ecommerce mailers, food packaging, beauty cartons, bakery boxes and branded retail packaging.",
  alternates: { canonical: "https://printypackaging.com/portfolio" },
  openGraph: {
    title: "Packaging Gallery | Printy Packaging",
    description:
      "Explore packaging structures, materials and print presentation through curated concept examples.",
    url: "https://printypackaging.com/portfolio",
    images: ["/images/products/rigid-boxes/rigid-boxes-hero.webp"],
  },
};

const gallery = [
  {
    slug: "rigid-boxes",
    title: "Luxury unboxing",
    category: "Luxury packaging",
    description:
      "Rigid structure, fitted inserts and a considered presentation for premium products.",
  },
  {
    slug: "mailer-boxes",
    title: "Ecommerce delivery",
    category: "Corrugated packaging",
    description:
      "A sturdy branded mailer designed around protection and the opening experience.",
  },
  {
    slug: "food-packaging",
    title: "Restaurant takeaway",
    category: "Food packaging",
    description:
      "Food boxes and serving formats that bring printing and practical use together.",
  },
  {
    slug: "bakery-boxes",
    title: "Bakery display",
    category: "Food packaging",
    description:
      "Window boxes that let baked goods remain visible while presenting the brand.",
  },
  {
    slug: "cosmetic-boxes",
    title: "Beauty retail",
    category: "Cosmetic packaging",
    description:
      "Printed cartons for skincare and beauty products with clean shelf presentation.",
  },
  {
    slug: "paper-bags",
    title: "Retail brand system",
    category: "Retail packaging",
    description:
      "Printed shopping bags that extend a consistent packaging identity beyond the box.",
  },
];

export default function PortfolioPage() {
  const items = gallery.flatMap((item) => {
    const product = products.find((entry) => entry.slug === item.slug);
    return product?.images?.[0] ? [{ ...item, product }] : [];
  });

  return (
    <main className="bg-[#F7FAFC] text-[#07111F]">
      <section className="bg-[#07111F] px-5 py-16 text-white md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="text-sm font-semibold text-slate-300">
            <Link href="/" className="hover:text-[#00C2E8]">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-[#FF6A00]">Packaging Gallery</span>
          </nav>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-[#00C2E8]">
                Packaging inspiration
              </p>
              <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                Explore packaging by structure and purpose.
              </h1>
            </div>
            <p className="max-w-xl text-base leading-8 text-slate-300 lg:pb-2">
              Browse visual concepts for boxes, wraps and retail packaging.
              Each order is planned around its product, material, print and finish requirements.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#FF6A00]">
                Concept gallery
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Packaging directions to explore
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-600">
              Images illustrate packaging styles and are not presented as customer projects.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {items.map(({ product, ...item }) => {
              const cover = product.images![0];
              const detail = product.images![3] ?? product.images![1];

              return (
                <article
                  key={item.slug}
                  className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_14px_38px_rgba(7,17,31,0.07)]"
                >
                  <Link href={`/products/${item.slug}`} className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#EDE5DC]">
                      <Image
                        src={cover.src}
                        alt={cover.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                      <span className="absolute left-4 top-4 rounded-full bg-[#07111F]/90 px-3 py-1.5 text-xs font-bold text-white">
                        Concept example
                      </span>
                    </div>
                  </Link>
                  <div className="p-6">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#007C91]">
                      {item.category}
                    </p>
                    <h3 className="mt-2 text-2xl font-black">{item.title}</h3>
                    <p className="mt-3 min-h-16 text-sm leading-6 text-slate-600">
                      {item.description}
                    </p>
                    {detail && (
                      <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-5">
                        <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-[#EDE5DC]">
                          <Image
                            src={detail.src}
                            alt={detail.alt}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>
                        <span className="text-xs leading-5 text-slate-500">
                          Detail view of this packaging style
                        </span>
                      </div>
                    )}
                    <Link
                      href={`/products/${item.slug}`}
                      className="mt-5 inline-flex font-black text-[#FF6A00] hover:text-[#007C91]"
                    >
                      Explore {product.name} <span aria-hidden="true" className="ml-2">→</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#07111F] px-5 py-14 text-white md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-black">Have a packaging idea in mind?</h2>
            <p className="mt-3 max-w-2xl text-slate-300">
              Share your product, size, quantity and artwork status for a custom quote.
            </p>
          </div>
          <Link
            href="/#quote"
            className="rounded-full bg-[#FF6A00] px-7 py-3 text-center text-sm font-black text-white hover:bg-[#007C91]"
          >
            Request a quote
          </Link>
        </div>
      </section>
    </main>
  );
}

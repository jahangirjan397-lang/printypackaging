import Link from "next/link";
import type { Product } from "../data/products";

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

export default function ProductGuideLinksSection({
  product,
}: {
  product: Product;
}) {
  return (
    <section className="bg-white px-5 py-20 text-slate-950 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.32em] text-[#FF6A00]">
              Packaging Guides
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
              Helpful guides before choosing {product.name.toLowerCase()}.
            </h2>
          </div>

          <p className="text-lg leading-8 text-slate-600 lg:text-right">
            These internal guide pages help buyers understand materials,
            finishes, artwork and samples before sending a custom packaging
            inquiry.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {guideLinks.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              prefetch={false}
              className="group rounded-[1.7rem] border border-slate-200 bg-[#F7FAFC] p-7 shadow-sm transition hover:-translate-y-1 hover:border-[#FF6A00] hover:bg-white hover:shadow-lg"
            >
              <div className="mb-5 h-11 w-11 rounded-2xl bg-[#FF6A00] shadow-lg shadow-orange-500/20 transition group-hover:bg-[#007C91]" />

              <h3 className="text-xl font-black tracking-tight">
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
  );
}


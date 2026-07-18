import Link from "next/link";
import type { Product } from "../data/products";

const checklistItems = [
  "Box style or packaging type",
  "Product size with unit",
  "Required quantity",
  "Material or paperboard preference",
  "Printing colors",
  "Finishing options",
  "Artwork or dieline status",
  "Delivery country",
];

export default function ProductQuoteChecklistSection({
  product,
  quoteLink,
}: {
  product: Product;
  quoteLink: string;
}) {
  return (
    <section className="bg-[#F7FAFC] px-5 py-20 text-slate-950 md:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
        <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-[#07111F] p-8 text-white sm:p-10">
            <p className="text-sm font-black uppercase tracking-[0.32em] text-cyan-300">
              Quote Checklist
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              Before requesting {product.name.toLowerCase()}, prepare these
              details.
            </h2>

            <p className="mt-5 leading-8 text-slate-300">
              Complete information helps the sales team understand your
              packaging need and provide better quote guidance.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href={quoteLink}
                prefetch={false}
                className="rounded-full bg-[#FF6A00] px-7 py-4 text-center text-sm font-black text-white shadow-xl shadow-orange-500/25 transition hover:bg-[#007C91]"
              >
                Request Quote
              </Link>

              <Link
                href="/contact"
                prefetch={false}
                className="rounded-full border border-white/15 px-7 py-4 text-center text-sm font-black text-white transition hover:border-cyan-300 hover:text-cyan-300"
              >
                Contact Support
              </Link>
            </div>
          </div>

          <div className="p-8 sm:p-10">
            <div className="grid gap-3 sm:grid-cols-2">
              {checklistItems.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-[#F7FAFC] px-5 py-4 text-sm font-black text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>

            <p className="mt-6 leading-8 text-slate-600">
              For {product.name}, also share product use, target market and any
              premium finish requirement such as lamination, foil, embossing or
              spot UV.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

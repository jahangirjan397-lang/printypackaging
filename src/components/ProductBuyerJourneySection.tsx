import Link from "next/link";
import type { Product } from "../data/products";

const journeySteps = [
  {
    title: "Share Product Details",
    text: "Send product size, quantity, box style, material preference and delivery country.",
  },
  {
    title: "Review Packaging Options",
    text: "Check suitable materials, printing methods, finishing options and structure direction.",
  },
  {
    title: "Confirm Artwork Direction",
    text: "Prepare logo, dieline, colors, barcode, product text and final artwork approval.",
  },
  {
    title: "Move Toward Quote",
    text: "Once details are clear, your packaging inquiry can be reviewed for quote guidance.",
  },
];

export default function ProductBuyerJourneySection({
  product,
  quoteLink,
}: {
  product: Product;
  quoteLink: string;
}) {
  return (
    <section className="bg-[#07111F] px-5 py-20 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.32em] text-cyan-300">
              Buyer Journey
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
              How to plan {product.name.toLowerCase()} before ordering.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-300">
              A strong packaging quote starts with clear product details,
              material selection, artwork direction and finishing requirements.
              This helps reduce confusion and improves quote accuracy.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href={quoteLink}
                prefetch={false}
                className="rounded-full bg-[#FF6A00] px-7 py-4 text-center text-sm font-black text-white shadow-xl shadow-orange-500/25 transition hover:-translate-y-1 hover:bg-[#007C91]"
              >
                Start Quote
              </Link>

              <Link
                href="/artwork-guide"
                prefetch={false}
                className="rounded-full border border-white/15 px-7 py-4 text-center text-sm font-black text-white transition hover:border-cyan-300 hover:text-cyan-300"
              >
                Artwork Guide
              </Link>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {journeySteps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-[1.7rem] border border-white/10 bg-white/[0.05] p-6 shadow-xl shadow-black/10"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF6A00] text-sm font-black text-white shadow-lg shadow-orange-500/20">
                  {index + 1}
                </div>

                <h3 className="text-xl font-black tracking-tight">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-300">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

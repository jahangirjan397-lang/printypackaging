import type { Metadata } from "next";
import Link from "next/link";
import BuyerTrustSection from "@/components/BuyerTrustSection";
import ProductSeoBlocks from "@/components/ProductSeoBlocks";

export const metadata: Metadata = {
  title: "Why Choose Printy Packaging | Custom Packaging Partner",
  description:
    "Learn why Printy Packaging is built for custom boxes, premium packaging, materials, finishes, artwork guidance and international quote support.",
};

const reasons = [
  "Modern custom packaging website structure",
  "Clear product, category and market pages",
  "Helpful materials and finishing guides",
  "Quote form connected with internal inquiry tracking",
  "Buyer-focused packaging education",
  "USA, UK, Canada, Europe, UAE and worldwide support",
];

export default function WhyPrintyPackagingPage() {
  return (
    <main className="bg-[#07111F] text-white">
      <section className="relative overflow-hidden border-b border-cyan-400/10 bg-gradient-to-br from-[#07111F] via-[#09243A] to-[#061525]">
        <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
          <div>
            <div className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-400/10 px-5 py-2 text-sm font-black text-cyan-200">
              Why Printy Packaging
            </div>

            <h1 className="mt-8 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              A better way to plan{" "}
              <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-cyan-300 bg-clip-text text-transparent">
                custom packaging.
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Printy Packaging is being built as a fast, professional and
              SEO-friendly custom packaging website for global buyers who need
              clear quote guidance, product education and premium packaging
              options.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/?product=mailer-boxes#quote"
                className="rounded-full bg-[#FF6A00] px-7 py-3 text-center text-sm font-black text-white shadow-xl shadow-orange-500/25 transition hover:bg-[#007C91]"
              >
                Get Quote
              </Link>

              <Link
                href="/resources"
                className="rounded-full border border-white/15 px-7 py-3 text-center text-sm font-bold text-white transition hover:border-cyan-300 hover:text-cyan-300"
              >
                View Resources
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-cyan-400/20 bg-white/[0.04] p-6">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-300">
              Project Strength
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight">
              Designed for trust, speed and quote conversion.
            </h2>

            <div className="mt-6 grid gap-3">
              {reasons.map((reason) => (
                <div
                  key={reason}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-bold text-slate-200"
                >
                  {reason}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <BuyerTrustSection />
      <ProductSeoBlocks />

      <section className="bg-[#07111F] px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-[#07111F] via-[#09243A] to-[#061525] p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-300">
                Start your packaging inquiry
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                Send your product details for quote support.
              </h2>

              <p className="mt-4 leading-8 text-slate-300">
                Share box style, size, quantity, material, printing, finishing
                and delivery country.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
              <Link
                href="/contact"
                className="rounded-full border border-white/15 px-7 py-3 text-center text-sm font-black text-white transition hover:border-cyan-300 hover:text-cyan-300"
              >
                Contact
              </Link>

              <Link
                href="/?product=mailer-boxes#quote"
                className="rounded-full bg-[#FF6A00] px-7 py-3 text-center text-sm font-black text-white shadow-xl shadow-orange-500/25 transition hover:bg-[#007C91]"
              >
                Request Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

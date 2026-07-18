import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Packaging Resources | Materials, Finishes, Artwork & Samples",
  description:
    "Explore Printy Packaging resources for custom packaging materials, finishing options, artwork preparation, dielines, samples and quote planning.",
};

const resources = [
  {
    title: "Packaging Materials Guide",
    href: "/packaging-materials",
    text: "Learn about paperboard, kraft, corrugated stock, rigid board, food-safe materials and label stock.",
  },
  {
    title: "Finishing Options Guide",
    href: "/finishing-options",
    text: "Explore lamination, foil stamping, embossing, debossing, spot UV, soft touch and window patching.",
  },
  {
    title: "Artwork & Dieline Guide",
    href: "/artwork-guide",
    text: "Understand dielines, bleed, safe area, CMYK, Pantone, barcode checks and final approval.",
  },
  {
    title: "Sample Kit Guide",
    href: "/sample-kit",
    text: "See how samples help review material, structure, print quality, finish and packaging presentation.",
  },
  {
    title: "Packaging FAQ",
    href: "/faq",
    text: "Read common answers about custom boxes, quotes, materials, finishes, artwork and international orders.",
  },
  {
    title: "Why Printy Packaging",
    href: "/why-printy-packaging",
    text: "Learn why buyers choose Printy Packaging for custom boxes and packaging quote support.",
  },
];

export default function ResourcesPage() {
  return (
    <main className="bg-[#07111F] text-white">
      <section className="relative overflow-hidden border-b border-cyan-400/10 bg-gradient-to-br from-[#07111F] via-[#09243A] to-[#061525]">
        <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-400/10 px-5 py-2 text-sm font-black text-cyan-200">
              Packaging Resources
            </div>

            <h1 className="mt-8 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Helpful guides for{" "}
              <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-cyan-300 bg-clip-text text-transparent">
                custom packaging buyers.
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Explore materials, finishes, artwork, samples and quote planning
              before starting your custom packaging project.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/?product=mailer-boxes#quote"
                className="rounded-full bg-[#FF6A00] px-7 py-3 text-center text-sm font-black text-white shadow-xl shadow-orange-500/25 transition hover:bg-[#007C91]"
              >
                Get Quote
              </Link>

              <Link
                href="/products"
                className="rounded-full border border-white/15 px-7 py-3 text-center text-sm font-bold text-white transition hover:border-cyan-300 hover:text-cyan-300"
              >
                View Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 text-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource) => (
              <Link
                key={resource.href}
                href={resource.href}
                className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-lg shadow-slate-200/60 transition hover:-translate-y-1 hover:border-[#FF6A00]"
              >
                <div className="mb-5 h-11 w-11 rounded-2xl bg-[#FF6A00] shadow-lg shadow-orange-500/20 transition group-hover:bg-[#007C91]" />

                <h2 className="text-2xl font-black tracking-tight">
                  {resource.title}
                </h2>

                <p className="mt-4 leading-8 text-slate-600">
                  {resource.text}
                </p>

                <p className="mt-6 text-sm font-black text-[#FF6A00]">
                  Read guide →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#07111F] px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-[#07111F] via-[#09243A] to-[#061525] p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-300">
                Ready for a quote?
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                Share your packaging details and get quote support.
              </h2>

              <p className="mt-4 leading-8 text-slate-300">
                Send size, quantity, material, printing, finishing and delivery
                country for better custom packaging guidance.
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


import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Printy Packaging | Custom Packaging Partner",
  description:
    "Learn about Printy Packaging, a custom packaging partner helping USA, UK, Canada and international buyers with boxes, materials, finishes and professional quote support.",
};

const values = [
  {
    title: "Custom Packaging Focus",
    text: "We help brands choose the right box style, material, finish and production route for their packaging needs.",
  },
  {
    title: "Buyer-Friendly Support",
    text: "Our quote process is simple, clear and helpful for businesses that need professional packaging guidance.",
  },
  {
    title: "International Market Ready",
    text: "Printy Packaging is built for USA, UK, Canada and global buyers looking for reliable custom packaging solutions.",
  },
];

const processSteps = [
  "Share product size, quantity and packaging style.",
  "We review material, printing, finishing and production needs.",
  "You receive quote guidance with the best possible packaging direction.",
  "After approval, production planning and delivery support can begin.",
];

export default function AboutPage() {
  return (
    <main className="bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              About Printy Packaging
            </p>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Professional custom packaging support for growing brands.
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              Printy Packaging helps businesses create custom boxes with a clear
              focus on box style, material selection, finishing options and fast
              quote support. Our goal is to make packaging simple for brands,
              startups, ecommerce stores and international buyers.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/?product=mailer-boxes#quote"
                className="rounded-full bg-cyan-400 px-7 py-3 text-center text-sm font-bold text-slate-950 shadow-lg shadow-cyan-400/20 transition hover:bg-cyan-300"
              >
                Request a Quote
              </Link>

              <Link
                href="/products"
                className="rounded-full border border-white/20 px-7 py-3 text-center text-sm font-bold text-white transition hover:border-cyan-300 hover:text-cyan-300"
              >
                View Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {values.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/20"
            >
              <h2 className="text-xl font-bold text-white">{item.title}</h2>
              <p className="mt-4 leading-7 text-slate-300">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
              What We Do
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              We guide buyers from packaging idea to quote-ready details.
            </h2>
            <p className="mt-5 leading-8 text-slate-300">
              From mailer boxes and folding cartons to rigid boxes, display
              boxes and premium retail packaging, our website is designed to
              help customers understand options and quickly request the right
              packaging quote.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8">
            <h3 className="text-2xl font-bold">Our Quote Process</h3>

            <div className="mt-8 space-y-5">
              {processSteps.map((step, index) => (
                <div key={step} className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-400 text-sm font-black text-slate-950">
                    {index + 1}
                  </div>
                  <p className="pt-1 leading-7 text-slate-300">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="rounded-3xl border border-cyan-300/20 bg-gradient-to-br from-blue-950 to-slate-950 p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Built for USA, UK, Canada and international packaging buyers.
              </h2>
              <p className="mt-4 leading-8 text-slate-300">
                Our website structure is focused on clear product pages,
                material guidance, finish options, market pages and easy quote
                actions so customers can move quickly from idea to inquiry.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Link
                href="/markets"
                className="rounded-full border border-white/20 px-6 py-3 text-center text-sm font-bold transition hover:border-cyan-300 hover:text-cyan-300"
              >
                Explore Markets
              </Link>

              <Link
                href="/contact"
                className="rounded-full bg-white px-6 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-cyan-100"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
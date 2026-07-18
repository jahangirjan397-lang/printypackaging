import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Printy Packaging | Premium Custom Boxes & Packaging Partner",
  description:
    "Learn about Printy Packaging, a custom packaging partner helping USA, UK, Canada, Europe and worldwide buyers with custom boxes, rigid boxes, food packaging, materials, finishes and quote support.",
  alternates: {
    canonical: "https://printypackaging.com/about",
  },
};

const strengths = [
  {
    title: "Custom Packaging Focus",
    text: "We help brands plan custom boxes, rigid boxes, folding cartons, food packaging, labels, stickers and premium retail packaging.",
  },
  {
    title: "Buyer-Friendly Quote Support",
    text: "Our quote process is simple for international buyers. Share size, quantity, material, printing and finishing details to get better guidance.",
  },
  {
    title: "Premium Finish Planning",
    text: "We guide customers through lamination, foil stamping, embossing, debossing, spot UV, window patching and other finishing options.",
  },
  {
    title: "Global Market Direction",
    text: "Printy Packaging is built for USA, UK, Canada, Europe, UAE and worldwide packaging inquiries.",
  },
];

const processSteps = [
  {
    title: "Share Packaging Details",
    text: "Tell us your box style, size, quantity, material preference, artwork status and delivery country.",
  },
  {
    title: "Review Materials & Finishes",
    text: "We help review paperboard, kraft, corrugated, rigid board, food-safe materials and finishing options.",
  },
  {
    title: "Quote Guidance",
    text: "You receive clear quote support based on the details you provide and the packaging direction you need.",
  },
  {
    title: "Production Planning",
    text: "After approval, final artwork, dieline, printing, finishing and production details can be planned properly.",
  },
];

const markets = [
  "USA custom packaging buyers",
  "UK retail and ecommerce brands",
  "Canada product packaging inquiries",
  "Europe luxury packaging projects",
  "UAE and worldwide business support",
];

const productTypes = [
  "Rigid Boxes",
  "Mailer Boxes",
  "Folding Cartons",
  "Food Packaging",
  "Butter Paper",
  "Paper Bags",
  "Labels & Stickers",
  "Luxury Packaging",
];

export default function AboutPage() {
  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Printy Packaging",
    url: "https://printypackaging.com/about",
    description:
      "Printy Packaging helps brands plan custom boxes, rigid boxes, mailer boxes, folding cartons, food packaging, butter paper, paper bags, labels, stickers and luxury printed packaging.",
    mainEntity: {
      "@type": "Organization",
      name: "Printy Packaging",
      url: "https://printypackaging.com",
      email: "sales@printypackaging.com",
    },
  };

  return (
    <main className="bg-[#07111F] text-white">
      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(aboutJsonLd),
  }}
/>
      <section className="relative overflow-hidden border-b border-cyan-400/10 bg-gradient-to-br from-[#07111F] via-[#09243A] to-[#061525]">
        <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
          <div>
            <div className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-400/10 px-5 py-2 text-sm font-black text-cyan-200 shadow-lg shadow-cyan-500/10">
              About Printy Packaging
            </div>

            <h1 className="mt-8 max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Custom packaging support for{" "}
              <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-cyan-300 bg-clip-text text-transparent">
                serious brands worldwide.
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Printy Packaging helps businesses plan premium custom boxes,
              printed packaging, materials, finishes and quote details for
              retail, ecommerce, food, cosmetic, luxury and international
              packaging projects.
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

          <div className="rounded-[2rem] border border-cyan-400/20 bg-white/[0.04] p-5 shadow-2xl shadow-cyan-950/40">
            <div className="rounded-[1.5rem] border border-white/10 bg-[#07111F] p-6">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-300">
                What We Help With
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-tight">
                Boxes, materials, finishing and quote-ready planning.
              </h2>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {productTypes.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-bold text-slate-200"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-3xl border border-orange-400/20 bg-orange-500/10 p-5">
                <p className="text-sm leading-7 text-slate-300">
                  Our goal is to make packaging easier for buyers by giving
                  clear direction before final quote and production planning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 text-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#FF6A00]">
              Why Printy Packaging
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              Built for custom packaging buyers who need clear guidance.
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              We focus on product style, packaging structure, material choice,
              printing requirements, finishing options and buyer communication.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {strengths.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-lg shadow-slate-200/60"
              >
                <div className="mb-5 h-11 w-11 rounded-2xl bg-[#FF6A00] shadow-lg shadow-orange-500/20" />
                <h3 className="text-xl font-black tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-4 leading-7 text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white text-slate-950">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#FF6A00]">
              Our Process
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              From packaging idea to quote-ready details.
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              A professional packaging quote needs correct size, quantity,
              material, printing, finishing, artwork and shipping details. Our
              process is designed to make those details clear.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-full bg-[#07111F] px-7 py-3 text-center text-sm font-black text-white transition hover:bg-[#FF6A00]"
              >
                Contact Us
              </Link>

              <Link
  href="/contact"
  className="rounded-full border border-slate-300 px-7 py-3 text-center text-sm font-black text-slate-950 transition hover:border-[#FF6A00] hover:text-[#FF6A00]"
>
  Ask a Question
</Link>
            </div>
          </div>

          <div className="grid gap-5">
            {processSteps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-7"
              >
                <div className="flex gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FF6A00] text-sm font-black text-white shadow-lg shadow-orange-500/20">
                    {index + 1}
                  </div>

                  <div>
                    <h3 className="text-xl font-black tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-3 leading-7 text-slate-600">
                      {step.text}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 text-slate-950">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/70">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#FF6A00]">
              Markets We Serve
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight">
              Packaging support for international buyers.
            </h2>

            <div className="mt-7 grid gap-3">
              {markets.map((market) => (
                <div
                  key={market}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-black text-slate-700"
                >
                  {market}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-700">
              Website Goal
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              Faster, cleaner and more helpful than old-style packaging websites.
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              Printy Packaging is being built as a modern, fast and SEO-friendly
              custom packaging website. The goal is to give buyers a better
              experience with clear product pages, category pages, market pages,
              quote support and helpful packaging education.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#07111F] px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-[#07111F] via-[#09243A] to-[#061525] p-8 shadow-2xl shadow-cyan-950/40 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-300">
                Ready to build custom packaging?
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                Send your product details and get packaging quote support.
              </h2>

              <p className="mt-4 max-w-3xl leading-8 text-slate-300">
                Share your product size, quantity, material, printing colors,
                finishing options and delivery country. We will guide you with
                the right custom packaging direction.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
              <a
                href="https://wa.me/923338889954?text=Hello%20Printy%20Packaging%2C%20I%20need%20a%20custom%20packaging%20quote."
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 px-7 py-3 text-center text-sm font-black text-white transition hover:border-cyan-300 hover:text-cyan-300"
              >
                WhatsApp
              </a>

              <Link
                href="/?product=mailer-boxes#quote"
                className="rounded-full bg-[#FF6A00] px-7 py-3 text-center text-sm font-black text-white shadow-xl shadow-orange-500/25 transition hover:bg-[#007C91]"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

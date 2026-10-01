import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { businessPromises } from "@/data/businessInfo";

export const metadata: Metadata = {
  title: "About Us | Custom Packaging Partner",
  description:
    "Meet Printy Packaging: the team that plans, prints and ships custom boxes, rigid boxes and food packaging for brands in the USA, UK, Canada and Europe.",
  alternates: {
    canonical: "https://printypackaging.com/about",
  },
};

const strengths = [
  {
    title: "One Team, Start to Finish",
    text: "The same team handles your quote, dieline, proof, production updates and shipping, so you always know who to ask about your order.",
  },
  {
    title: "A Real Proof Before Printing",
    text: "Every order gets a free dieline and digital proof. Nothing goes to press until you have seen exactly where your logo, text and barcode will sit.",
  },
  {
    title: "Small Runs Welcome",
    text: `Minimum orders start at ${businessPromises.minimumOrder}, so a new brand can test a design without filling a warehouse.`,
  },
  {
    title: "We Fix Our Mistakes",
    text: "If an order arrives wrong because of us, we reprint it free. Our Return & Refund Policy explains exactly how.",
  },
];

const processSteps = [
  {
    title: "Tell us what you are packing",
    text: `Send the product, rough size, quantity and delivery country. We reply ${businessPromises.quoteResponse} with a price and the box style we would use.`,
  },
  {
    title: "Free dieline and digital proof",
    text: "We build the dieline to your product size, place your artwork and send a proof. Change it as many times as you need before approving.",
  },
  {
    title: "Printing and finishing",
    text: `Production takes ${businessPromises.productionTime} after approval, and we keep you updated until your order ships.`,
  },
  {
    title: "Packed and shipped to you",
    text: "Boxes are shipped flat in strong cartons by courier or freight to the USA, UK, Canada, Europe, the UAE, Australia and beyond, with tracking.",
  },
];

const markets = [
  "USA: ecommerce, bakery, cosmetic and subscription brands",
  "UK: retail, gift and food brands",
  "Canada: product and mailer packaging",
  "Europe: luxury and cosmetic packaging",
  "UAE, Australia and worldwide buyers",
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
      "Printy Packaging designs and supplies custom boxes, rigid boxes, mailer boxes, folding cartons, food packaging, butter paper, paper bags, labels and stickers for brands worldwide.",
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
              Custom printed packaging for{" "}
              <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-cyan-300 bg-clip-text text-transparent">
                growing brands worldwide.
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Printy Packaging designs and supplies custom boxes, rigid
              boxes, mailer boxes, food packaging, butter paper and labels for
              bakeries, cosmetic brands, online stores and gift companies. You
              deal with one team from the first quote to the day your cartons
              arrive.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/#quote"
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

          <div className="rounded-[2rem] border border-cyan-400/20 bg-white/[0.04] p-4 shadow-2xl shadow-cyan-950/40">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-[#EDE5DC]">
              <Image
                src="/images/home/home-trust-production-v3.webp"
                alt="Custom printed packaging boxes in several styles (concept image)"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover object-center"
              />
            </div>
            <div className="px-2 pb-1 pt-5">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#00C2E8]">
                From brief to your door
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-white">
                Dieline, proof, printing, finishing and shipping in one place.
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {productTypes.slice(0, 4).map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/15 bg-[#07111F]/80 px-3 py-2 text-xs font-bold text-white backdrop-blur"
                  >
                    {item}
                  </span>
                ))}
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
              Why brands order from us again.
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              We believe small and growing brands deserve the same printed
              packaging big companies get, without huge minimums, slow replies
              or surprises on delivery day.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {strengths.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-lg shadow-slate-200/60"
              >
                <div
                  aria-hidden="true"
                  className="mb-5 h-11 w-11 rounded-2xl bg-[#FF6A00] shadow-lg shadow-orange-500/20 flex items-center justify-center text-white"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                </div>
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
              How an Order Works
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              Four steps from idea to delivered boxes.
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              You do not need a designer or a dieline to start. Tell us what
              you are packing and we handle the structure, the proof and the
              printing, and keep you updated at every step.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-full bg-[#07111F] px-7 py-3 text-center text-sm font-black text-white transition hover:bg-[#FF6A00]"
              >
                Contact Us
              </Link>

              <Link
                href="/faq"
                className="rounded-full border border-slate-300 px-7 py-3 text-center text-sm font-black text-slate-950 transition hover:border-[#FF6A00] hover:text-[#FF6A00]"
              >
                Read the FAQ
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
              Where our boxes go.
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
              Our Commitment
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              Honest answers, fair prices and packaging that arrives right.
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              We tell you when a cheaper board will do the job, when a finish
              is not worth the cost, and when a date is tight. Your artwork
              stays yours, we never show your packaging without permission,
              and if we get something wrong we reprint it.
            </p>

            <div className="mt-6 flex flex-wrap gap-4 text-sm font-black">
              <Link href="/refund-policy" className="text-[#FF6A00] underline-offset-4 hover:underline">
                Return & Refund Policy
              </Link>
              <Link href="/terms" className="text-[#FF6A00] underline-offset-4 hover:underline">
                Terms & Conditions
              </Link>
            </div>
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
                href="/#quote"
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

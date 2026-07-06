import type { Metadata } from "next";
import Link from "next/link";
import QuoteSection from "@/components/QuoteSection";

export const metadata: Metadata = {
  title: "Contact Printy Packaging | Custom Box Quote Support",
  description:
    "Contact Printy Packaging for custom box quotes, packaging questions, materials, finishes and international packaging support.",
};

const contactCards = [
  {
    title: "Quote Support",
    value: "Use our quote form",
    text: "Send product details, size, quantity, material and finishing needs for a packaging quote.",
  },
  {
    title: "WhatsApp",
    value: "+92 333 8889954",
    text: "Message us directly for quick custom packaging guidance.",
  },
  {
    title: "Email",
    value: "info@printypackaging.com",
    text: "Send your packaging details, artwork notes or inquiry requirements.",
  },
];

const quoteTips = [
  "Product type or box style",
  "Size with length, width and height",
  "Required quantity",
  "Material or paperboard preference",
  "Printing colors and finishing options",
  "Delivery country or target market",
];

export default function ContactPage() {
  return (
    <main className="bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Contact Printy Packaging
            </p>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Need custom packaging? Send us your quote details.
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              Our team can help you with box style, size, material, printing,
              finishing and quote direction for custom packaging projects.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="https://wa.me/923338889954?text=Hello%20Printy%20Packaging%2C%20I%20need%20a%20custom%20packaging%20quote."
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-cyan-400 px-7 py-3 text-center text-sm font-bold text-slate-950 shadow-lg shadow-cyan-400/20 transition hover:bg-cyan-300"
              >
                Chat on WhatsApp
              </a>

              <Link
                href="/?product=mailer-boxes#quote"
                className="rounded-full border border-white/20 px-7 py-3 text-center text-sm font-bold text-white transition hover:border-cyan-300 hover:text-cyan-300"
              >
                Open Quote Form
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {contactCards.map((card) => (
            <div
              key={card.title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-8"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
                {card.title}
              </p>
              <h2 className="mt-4 text-2xl font-bold">{card.value}</h2>
              <p className="mt-4 leading-7 text-slate-300">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
              Quote Details
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              For a faster quote, share these details.
            </h2>
            <p className="mt-5 leading-8 text-slate-300">
              Complete details help us understand your packaging project and
              guide you with the right product, material and finishing options.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {quoteTips.map((tip) => (
                <div
                  key={tip}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm font-semibold text-slate-200"
                >
                  {tip}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <QuoteSection />
    </main>
  );
}
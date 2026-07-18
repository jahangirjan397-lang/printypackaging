import type { Metadata } from "next";
import Link from "next/link";
import QuoteSection from "@/components/QuoteSection";

export const metadata: Metadata = {
  title: "Contact Printy Packaging | Custom Box Quote Support",
  description:
    "Contact Printy Packaging for custom box quotes, packaging questions, materials, finishes, artwork guidance and international packaging support for USA, UK, Canada, Europe and worldwide buyers.",
};

const contactCards = [
  {
    title: "Quote Support",
    value: "Fast Packaging Guidance",
    text: "Share product size, quantity, material, printing colors and finishing details for better quote support.",
  },
  {
    title: "WhatsApp",
    value: "+92 333 8889954",
    text: "Message Printy Packaging directly for quick custom packaging inquiry support.",
  },
  {
    title: "Email",
    value: "sales@printypackaging.com",
    text: "Send artwork notes, product details, packaging requirements or business inquiries.",
  },
];

const quoteDetails = [
  "Box style or packaging type",
  "Product size with unit",
  "Required quantity",
  "Material preference",
  "Printing colors",
  "Finishing options",
  "Artwork status",
  "Delivery country",
];

const supportTopics = [
  {
    title: "Custom Boxes",
    text: "Mailer boxes, rigid boxes, folding cartons, retail boxes and ecommerce packaging.",
  },
  {
    title: "Food Packaging",
    text: "Butter paper, food boxes, food-safe materials, paper bags and brand packaging.",
  },
  {
    title: "Premium Finishes",
    text: "Foil stamping, embossing, spot UV, lamination, window patching and luxury finishes.",
  },
  {
    title: "International Buyers",
    text: "Quote support for USA, UK, Canada, Europe, UAE and worldwide packaging inquiries.",
  },
];

export default function ContactPage() {
  return (
    <main className="bg-[#07111F] text-white">
      <section className="relative overflow-hidden border-b border-cyan-400/10 bg-gradient-to-br from-[#07111F] via-[#09243A] to-[#061525]">
        <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
          <div>
            <div className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-400/10 px-5 py-2 text-sm font-black text-cyan-200 shadow-lg shadow-cyan-500/10">
              Contact Printy Packaging
            </div>

            <h1 className="mt-8 max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Need custom packaging?{" "}
              <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-cyan-300 bg-clip-text text-transparent">
                Send your quote details.
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Contact Printy Packaging for custom boxes, materials, printing,
              finishing, artwork guidance and international packaging quote
              support.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="https://wa.me/923338889954?text=Hello%20Printy%20Packaging%2C%20I%20need%20a%20custom%20packaging%20quote."
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[#FF6A00] px-7 py-3 text-center text-sm font-black text-white shadow-xl shadow-orange-500/25 transition hover:bg-[#007C91]"
              >
                Chat on WhatsApp
              </a>

              <Link
                href="/?product=mailer-boxes#quote"
                className="rounded-full border border-white/15 px-7 py-3 text-center text-sm font-bold text-white transition hover:border-cyan-300 hover:text-cyan-300"
              >
                Open Quote Form
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-cyan-400/20 bg-white/[0.04] p-5 shadow-2xl shadow-cyan-950/40">
            <div className="rounded-[1.5rem] border border-white/10 bg-[#07111F] p-6">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-300">
                Faster Quote Help
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-tight">
                Send complete details for better packaging pricing.
              </h2>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {quoteDetails.map((item) => (
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
                  Complete product information helps us understand your custom
                  packaging project and guide you with the right direction.
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
              Contact Options
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              Talk to us about your packaging project.
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              Send a quote request, WhatsApp message or email with your product
              details. We will guide you about box style, material, printing and
              finishing options.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {contactCards.map((card) => (
              <article
                key={card.title}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-lg shadow-slate-200/60"
              >
                <p className="text-sm font-black uppercase tracking-[0.25em] text-[#FF6A00]">
                  {card.title}
                </p>

                <h3 className="mt-4 text-2xl font-black tracking-tight">
                  {card.value}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white text-slate-950">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#FF6A00]">
              What We Can Help With
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              Packaging support for products, brands and international buyers.
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              From basic box inquiries to premium packaging planning, we help
              buyers understand packaging options before moving toward final
              quote and production details.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/products"
                className="rounded-full bg-[#07111F] px-7 py-3 text-center text-sm font-black text-white transition hover:bg-[#FF6A00]"
              >
                View Products
              </Link>

              <Link
                href="/faq"
                className="rounded-full border border-slate-300 px-7 py-3 text-center text-sm font-black text-slate-950 transition hover:border-[#FF6A00] hover:text-[#FF6A00]"
              >
                Read FAQ
              </Link>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {supportTopics.map((topic) => (
              <article
                key={topic.title}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-7"
              >
                <div className="mb-5 h-11 w-11 rounded-2xl bg-[#FF6A00] shadow-lg shadow-orange-500/20" />

                <h3 className="text-xl font-black tracking-tight">
                  {topic.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">{topic.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 text-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
            <div className="grid gap-0 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="bg-[#07111F] p-8 text-white sm:p-10">
                <p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-300">
                  Quote Form
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-tight">
                  Use the form below for packaging quote requests.
                </h2>

                <p className="mt-5 leading-8 text-slate-300">
                  Our quote form is connected with email and internal CRM
                  tracking. Submit your details carefully so your inquiry can be
                  reviewed properly.
                </p>

                <div className="mt-8 rounded-3xl border border-orange-400/20 bg-orange-500/10 p-5">
                  <p className="text-sm leading-7 text-slate-300">
                    Backend quote form is already working. This page only
                    improves presentation and buyer guidance.
                  </p>
                </div>
              </div>

              <div className="bg-white p-8 sm:p-10">
                <h3 className="text-2xl font-black tracking-tight text-slate-950">
                  Before submitting your inquiry
                </h3>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {quoteDetails.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-700"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <p className="mt-6 leading-8 text-slate-600">
                  After submitting your inquiry, our team can review your
                  packaging requirements and guide you with the next step.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <QuoteSection />
    </main>
  );
}

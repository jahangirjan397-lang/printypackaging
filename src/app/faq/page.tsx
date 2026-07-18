import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Packaging FAQ | Custom Boxes Questions | Printy Packaging",
  description:
    "Find answers about custom packaging quotes, box styles, materials, printing, finishing, artwork, samples and international packaging orders for USA, UK, Canada and worldwide buyers.",
};

const faqs = [
  {
    category: "Quote",
    question: "What details do I need for a custom packaging quote?",
    answer:
      "Please share box style, size, quantity, material preference, printing colors, finishing options, artwork status and delivery country. Complete details help us prepare better quote guidance.",
  },
  {
    category: "Box Style",
    question: "Can you help me choose the right box style?",
    answer:
      "Yes. Tell us about your product, product weight, usage, market and brand style. We can guide you toward mailer boxes, folding cartons, rigid boxes, display boxes, food packaging or other suitable options.",
  },
  {
    category: "Market",
    question: "Do you support USA, UK and Canada buyers?",
    answer:
      "Yes. Printy Packaging is built for international buyers including USA, UK, Canada, Europe and worldwide custom packaging inquiries.",
  },
  {
    category: "Material",
    question: "What materials can be used for custom boxes?",
    answer:
      "Common options include paperboard, cardboard, corrugated stock, kraft board, rigid board, art card, SBS style board and food-safe packaging materials depending on the project.",
  },
  {
    category: "Finishing",
    question: "Which finishing options are available?",
    answer:
      "Finishing options may include matte lamination, gloss lamination, soft touch, spot UV, foil stamping, embossing, debossing, window patching and special coating depending on the box type.",
  },
  {
    category: "Size",
    question: "Can I request custom size boxes?",
    answer:
      "Yes. Most packaging products can be made in custom sizes. Share length, width and height with unit details so the quote can be reviewed correctly.",
  },
  {
    category: "Artwork",
    question: "Do I need artwork before requesting a quote?",
    answer:
      "Artwork is helpful but not always required for the first inquiry. You can request a quote with size, quantity and style first. Final production should use approved artwork and dieline details.",
  },
  {
    category: "Pricing",
    question: "Are quote prices final?",
    answer:
      "Initial quotes are based on provided details. Pricing can change if size, quantity, material, finish, shipping country, artwork or production requirements change.",
  },
  {
    category: "Samples",
    question: "Can I ask for a sample or mockup?",
    answer:
      "Sample and mockup options depend on the product type, material, quantity and project stage. You can share your requirement and we will guide you about the best option.",
  },
  {
    category: "Shipping",
    question: "Can packaging be prepared for international shipping?",
    answer:
      "Yes. Packaging projects can be planned for international buyers. Shipping method, delivery country, carton packing and order volume can affect the final quote.",
  },
];

const supportCards = [
  {
    title: "Custom Quote Help",
    text: "Share size, quantity, material and finish details for better pricing guidance.",
  },
  {
    title: "Material Guidance",
    text: "Choose paperboard, kraft, corrugated, rigid board or food-safe packaging materials.",
  },
  {
    title: "Finish Planning",
    text: "Review lamination, foil, spot UV, embossing and premium finishing options.",
  },
];

const quickLinks = [
  { label: "Custom Products", href: "/products" },
  { label: "Packaging Categories", href: "/categories" },
  { label: "Global Markets", href: "/markets" },
  { label: "Contact Support", href: "/contact" },
];

export default function FAQPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="bg-slate-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />

      <section className="relative overflow-hidden border-b border-cyan-400/10 bg-[#061525]">
        <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
          <div>
            <div className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-400/10 px-5 py-2 text-sm font-black text-cyan-200 shadow-lg shadow-cyan-500/10">
              Premium Custom Printing & Packaging
            </div>

            <h1 className="mt-8 max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Frequently asked questions about{" "}
              <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-cyan-300 bg-clip-text text-transparent">
                custom packaging.
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Quick answers for custom boxes, materials, finishes, artwork,
              quote details and international packaging orders.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/?product=mailer-boxes#quote"
                className="rounded-full bg-orange-500 px-7 py-3 text-center text-sm font-black text-white shadow-xl shadow-orange-500/25 transition hover:bg-orange-400"
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
            <div className="rounded-[1.5rem] border border-white/10 bg-[#07111f] p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {supportCards.map((card) => (
                  <div
                    key={card.title}
                    className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"
                  >
                    <div className="mb-4 h-10 w-10 rounded-2xl bg-orange-500/90 shadow-lg shadow-orange-500/20" />
                    <h2 className="text-lg font-black">{card.title}</h2>
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      {card.text}
                    </p>
                  </div>
                ))}

                <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-5 sm:col-span-2">
                  <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-200">
                    Buyer Support
                  </p>
                  <p className="mt-3 text-2xl font-black">
                    USA, UK, Canada & worldwide packaging inquiries.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 text-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/70">
                <p className="text-sm font-black uppercase tracking-[0.25em] text-orange-500">
                  FAQ Guide
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-tight">
                  Common packaging questions answered clearly.
                </h2>

                <p className="mt-4 leading-7 text-slate-600">
                  Use this page to understand quote requirements, box options,
                  materials, finishes, artwork and shipping details before
                  sending your inquiry.
                </p>

                <div className="mt-7 grid gap-3">
                  {quickLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-black transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={faq.question}
                  className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60 open:border-cyan-300"
                  open={index === 0}
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-5">
                    <div>
                      <span className="inline-flex rounded-full bg-cyan-50 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-cyan-700">
                        {faq.category}
                      </span>

                      <h3 className="mt-4 text-xl font-black tracking-tight text-slate-950">
                        {faq.question}
                      </h3>
                    </div>

                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xl font-black text-white transition group-open:rotate-45 group-open:bg-orange-500">
                      +
                    </span>
                  </summary>

                  <p className="mt-5 border-t border-slate-100 pt-5 leading-8 text-slate-600">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#07111f] px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-[#07111f] via-[#09243a] to-[#061525] p-8 shadow-2xl shadow-cyan-950/40 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-300">
                Ready for a quote?
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                Send your packaging details and get professional quote support.
              </h2>

              <p className="mt-4 max-w-3xl leading-8 text-slate-300">
                Share your product size, box style, material, quantity, printing
                colors, finishing options and delivery country. We will guide you
                with the right custom packaging direction.
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
                className="rounded-full bg-orange-500 px-7 py-3 text-center text-sm font-black text-white shadow-xl shadow-orange-500/25 transition hover:bg-orange-400"
              >
                Get Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


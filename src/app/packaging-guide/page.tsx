import Link from "next/link";

const guideCards = [
  {
    title: "Choose the Right Box Style",
    text: "Learn when to use rigid boxes, mailer boxes, folding cartons, display boxes and shipping boxes.",
    href: "/products",
  },
  {
    title: "Understand Packaging Materials",
    text: "Compare paperboard, kraft, rigid board, corrugated stock, butter paper and sticker materials.",
    href: "/packaging-materials",
  },
  {
    title: "Select Premium Finishing",
    text: "Explore lamination, foil stamping, embossing, debossing, spot UV and custom print finishes.",
    href: "/finishing-options",
  },
  {
    title: "Prepare Artwork Correctly",
    text: "Check bleed, dieline, color mode, fonts, images and print-ready artwork requirements.",
    href: "/artwork-guide",
  },
  {
    title: "Get a Sample Kit",
    text: "Review material, color, finishing and sample options before production.",
    href: "/sample-kit",
  },
  {
    title: "Request a Custom Quote",
    text: "Share size, quantity, material, print colors, finishing and delivery country for accurate quote support.",
    href: "/#quote",
  },
];

const faqItems = [
  {
    question: "What information is needed for a custom packaging quote?",
    answer:
      "Share box size, quantity, material, printing colors, finishing options, artwork status and delivery country.",
  },
  {
    question: "Can Printy Packaging help choose the right material?",
    answer:
      "Yes. Our team can guide buyers on paper stock, GSM, rigid board, corrugated stock, kraft, butter paper and finish options.",
  },
  {
    question: "Which packaging products are best for ecommerce brands?",
    answer:
      "Mailer boxes, shipping boxes, labels, stickers, inserts and custom tissue or wrapping paper are common ecommerce packaging options.",
  },
  {
    question: "Which finishes make packaging look premium?",
    answer:
      "Foil stamping, embossing, debossing, spot UV, soft touch lamination and matte lamination can improve premium presentation.",
  },
];

export const metadata = {
  title: "Custom Packaging Guide | Printy Packaging",
  description:
    "Learn how to choose custom boxes, packaging materials, finishing options, artwork setup and quote details for custom printed packaging.",
};

export default function PackagingGuidePage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />

      <section className="bg-[#07111F] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#00C2E8]">
            Packaging Guide
          </span>

          <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Custom packaging guide for brands planning printed boxes and premium
            packaging.
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
            Use this guide to understand box styles, materials, finishing,
            artwork and quote requirements before starting your packaging
            project.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/#quote"
              className="inline-flex items-center justify-center rounded-full bg-[#FF6A00] px-6 py-3 text-sm font-black text-white transition hover:bg-[#E85F00]"
            >
              Start Quote
            </Link>

            <Link
              href="/custom-packaging"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-black text-white transition hover:bg-white/15"
            >
              Custom Packaging
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {guideCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group rounded-[2rem] border border-slate-200 bg-slate-50 p-7 shadow-[0_18px_55px_rgba(7,17,31,0.06)] transition hover:-translate-y-1 hover:border-[#FF6A00] hover:bg-white hover:shadow-[0_28px_80px_rgba(7,17,31,0.10)]"
              >
                <h2 className="text-xl font-black text-[#07111F]">
                  {card.title}
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {card.text}
                </p>

                <span className="mt-5 inline-flex text-sm font-black text-[#FF6A00]">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-black tracking-tight text-[#07111F] sm:text-4xl">
            Custom packaging questions buyers ask
          </h2>

          <div className="mt-8 space-y-4">
            {faqItems.map((item) => (
              <div
                key={item.question}
                className="rounded-[1.5rem] border border-slate-200 bg-white p-6"
              >
                <h3 className="text-lg font-black text-[#07111F]">
                  {item.question}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-[2rem] border border-[#FF6A00]/20 bg-[#FF6A00]/10 p-7">
            <p className="text-sm font-bold leading-7 text-[#07111F]">
              Need help choosing box style, stock, printing or finishing? Send
              your packaging details and our team will guide you.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}


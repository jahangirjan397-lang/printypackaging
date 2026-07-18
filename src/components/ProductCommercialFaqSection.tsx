type ProductCommercialFaqSectionProps = {
  productTitle?: string;
};

export default function ProductCommercialFaqSection({
  productTitle = "custom packaging",
}: ProductCommercialFaqSectionProps) {
  const faqItems = [
    {
      question: `What details are needed for a ${productTitle} quote?`,
      answer:
        "Please share size, quantity, material, printing colors, finishing options, artwork status and delivery country.",
    },
    {
      question: `Can Printy Packaging help with ${productTitle} artwork?`,
      answer:
        "Yes. Our team can guide you with dieline, bleed, color mode, proofing and print-ready artwork requirements.",
    },
    {
      question: `Which finishing options are available for ${productTitle}?`,
      answer:
        "Options can include matte lamination, gloss lamination, soft touch lamination, spot UV, foil stamping, embossing and debossing.",
    },
    {
      question: `Can I request multiple quantities for ${productTitle}?`,
      answer:
        "Yes. You can request multiple quantities such as 500, 1000, 2000 or custom quantities to compare pricing.",
    },
  ];

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
    <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />

      <div className="mx-auto max-w-5xl">
        <span className="inline-flex rounded-full bg-[#00C2E8]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#007C91]">
          Buyer FAQs
        </span>

        <h2 className="mt-5 text-3xl font-black tracking-tight text-[#07111F] sm:text-4xl">
          Questions buyers ask about {productTitle}
        </h2>

        <div className="mt-8 space-y-4">
          {faqItems.map((item) => (
            <div
              key={item.question}
              className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6"
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

        <div className="mt-8 rounded-[2rem] border border-[#FF6A00]/20 bg-[#FF6A00]/10 p-6">
          <p className="text-sm font-bold leading-7 text-[#07111F]">
            Need a custom quote? Send your product details and our packaging
            team will guide you.
          </p>
        </div>
      </div>
    </section>
  );
}


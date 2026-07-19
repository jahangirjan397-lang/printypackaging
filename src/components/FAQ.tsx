const faqs = [
  {
    q: "Do you offer custom box sizes?",
    a: "Yes. We can produce custom sizes based on your product dimensions, quantity, material and packaging style.",
  },
  {
    q: "Can I order rigid boxes?",
    a: "Yes. We offer rigid boxes, drawer boxes, magnetic boxes, two-piece boxes and luxury packaging for premium brands.",
  },
  {
    q: "Do you print butter paper?",
    a: "Yes. We can create custom printed butter paper, greaseproof paper and food wrapping paper for restaurants, bakeries and food brands.",
  },
  {
    q: "Can I upload my artwork?",
    a: "Yes. Artwork upload and approval features are planned for the client portal phase. For now, customers can send files for print review.",
  },
  {
    q: "Do you support USA and Europe clients?",
    a: "Yes. Printy Packaging supports clients across the USA, UK, Europe, Canada, Australia and UAE.",
  },
  {
    q: "Can you help with material and finishing selection?",
    a: "Yes. We can guide clients on paper, board, lamination, foiling, embossing, Spot UV and other finishing options.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export default function FAQ() {
  return (
    <section className="bg-white px-4 py-16 sm:px-5 md:px-8 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#FF6A00] md:text-sm">
            FAQ
          </p>

          <h2 className="mt-4 text-3xl font-black leading-tight text-[#07111F] sm:text-4xl md:text-6xl">
            Frequently asked questions
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600 md:text-lg md:leading-8">
            Quick answers for customers planning custom packaging, printed
            boxes, luxury finishes and food-safe wrapping solutions.
          </p>

          <div className="mt-7 rounded-3xl bg-[#F7FAFC] p-5 shadow-sm">
            <p className="text-sm font-black text-[#07111F]">
              Need a custom quote?
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Share your size, quantity, material and finishing requirements to
              get packaging guidance.
            </p>

            <a
              href="#quote"
              className="mt-5 inline-flex rounded-full bg-[#07111F] px-5 py-3 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-[#FF6A00]"
            >
              Start Quote
            </a>
          </div>
        </div>

        <div className="space-y-4">
          {faqs.map((item, index) => (
            <details
              key={item.q}
              className="group rounded-[1.4rem] border border-slate-200 bg-[#F7FAFC] p-5 shadow-sm transition duration-300 open:bg-white open:shadow-xl md:p-6"
              open={index === 0}
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-5">
                <h3 className="text-base font-black leading-7 text-[#07111F] md:text-lg">
                  {item.q}
                </h3>

                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FF6A00] text-lg font-black leading-none text-white transition group-open:rotate-45">
                  +
                </span>
              </summary>

              <p className="mt-4 text-sm leading-6 text-slate-600 md:text-base md:leading-7">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}


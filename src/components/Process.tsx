const steps = [
  {
    title: "Share Requirements",
    text: "Tell us your product size, quantity, material, printing and finishing needs.",
  },
  {
    title: "Get Quote",
    text: "Our team prepares a clear packaging quote based on your exact job details.",
  },
  {
    title: "Approve Artwork",
    text: "We check artwork, bleed, safe margins, colors and print-ready layout.",
  },
  {
    title: "Production",
    text: "Your packaging moves through printing, finishing, die cutting and packing.",
  },
  {
    title: "Delivery",
    text: "Finished boxes are packed safely and prepared for local or global delivery.",
  },
];

export default function Process() {
  return (
    <section className="bg-white px-4 py-16 sm:px-5 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#FF6A00] md:text-sm">
            Our Process
          </p>

          <h2 className="mt-4 text-3xl font-black leading-tight text-[#07111F] sm:text-4xl md:text-5xl">
            Simple packaging workflow from quote to delivery
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600 md:text-lg md:leading-8">
            A clear step-by-step process helps clients move from product idea to
            final printed packaging with confidence.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-5 lg:mt-14">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="relative rounded-3xl border border-slate-200 bg-[#F7FAFC] p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl md:p-6"
            >
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF6A00] text-sm font-black text-white shadow-lg shadow-orange-500/20">
                {index + 1}
              </div>

              <h3 className="text-center text-base font-black text-[#07111F] md:text-lg">
                {step.title}
              </h3>

              <p className="mt-3 text-center text-sm leading-6 text-slate-600">
                {step.text}
              </p>

              {index < steps.length - 1 && (
                <div className="pointer-events-none absolute right-[-14px] top-1/2 z-10 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-xs font-black text-[#FF6A00] md:flex">
                  &rarr;
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

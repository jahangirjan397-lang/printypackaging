const quotePoints = [
  {
    title: "Fast Quote Review",
    text: "Our sales team reviews your box size, quantity, material and finishing details.",
  },
  {
    title: "Packaging Guidance",
    text: "Not sure about stock, GSM, box style or finish? We help you choose the right option.",
  },
  {
    title: "Multiple Quantity Help",
    text: "Ask for 500, 1000, 2000 or custom quantities to compare pricing and production options.",
  },
];

export default function QuoteConversionStrip() {
  return (
    <section className="bg-white px-4 pt-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-[#07111F] via-[#0B1B2A] to-[#07111F] shadow-[0_26px_90px_rgba(7,17,31,0.18)]">
          <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative overflow-hidden p-8 sm:p-10 lg:p-12">
              <div className="absolute -left-24 -top-24 h-60 w-60 rounded-full bg-[#00C2E8]/20 blur-3xl" />
              <div className="absolute -bottom-28 right-0 h-64 w-64 rounded-full bg-[#FF6A00]/20 blur-3xl" />

              <div className="relative">
                <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#00C2E8]">
                  Ready For Quote
                </span>

                <h2 className="mt-5 max-w-xl text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Send your packaging details and get expert quote support.
                </h2>

                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
                  Share your product size, box style, material, printing colors,
                  finishing options and delivery country. Printy Packaging team
                  will guide you with the right custom packaging solution.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white">
                    Custom Sizes
                  </span>
                  <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white">
                    Material Advice
                  </span>
                  <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white">
                    Finish Options
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 bg-white/[0.04] p-8 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
              <div className="grid gap-4">
                {quotePoints.map((item, index) => (
                  <div
                    key={item.title}
                    className="rounded-3xl border border-white/10 bg-white/[0.06] p-6"
                  >
                    <div className="flex gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FF6A00] text-sm font-black text-white">
                        {index + 1}
                      </span>

                      <div>
                        <h3 className="text-lg font-black text-white">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-slate-300">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-3xl border border-[#00C2E8]/25 bg-[#00C2E8]/10 p-6">
                <p className="text-sm font-bold leading-7 text-slate-100">
                  For fastest response, include length, width, depth, quantity,
                  paper stock, printing colors, finishing and delivery country.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

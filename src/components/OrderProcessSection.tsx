const steps = [
  {
    number: "01",
    title: "Share Packaging Details",
    text: "Send your box size, quantity, material, printing colors, finishing options and delivery country.",
  },
  {
    number: "02",
    title: "Expert Review",
    text: "Our packaging team reviews the structure, paper stock, printing method, finishing and production needs.",
  },
  {
    number: "03",
    title: "Custom Quote",
    text: "You receive a clear quote based on your quantity, material, printing, add-ons and shipping requirements.",
  },
  {
    number: "04",
    title: "Artwork & Sample Support",
    text: "We help with artwork, dieline, proofing and sample guidance before production starts.",
  },
  {
    number: "05",
    title: "Production & Delivery",
    text: "After approval, your packaging moves to printing, finishing, die cutting, packing and dispatch.",
  },
];

export default function OrderProcessSection() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <span className="inline-flex rounded-full bg-[#FF6A00]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#FF6A00]">
              Simple Order Process
            </span>

            <h2 className="mt-5 text-3xl font-black tracking-tight text-[#07111F] sm:text-4xl lg:text-5xl">
              From custom quote to production, we guide every step.
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
              Printy Packaging makes custom packaging easier for brands. Our
              team helps you choose the right box style, material, printing and
              finishing options before production.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/#quote"
                className="inline-flex items-center justify-center rounded-full bg-[#FF6A00] px-6 py-3 text-sm font-black text-white shadow-[0_18px_45px_rgba(255,106,0,0.30)] transition hover:-translate-y-0.5 hover:bg-[#E85F00]"
              >
                Start Your Quote
              </a>

              <a
                href="https://wa.me/923338889954?text=Hello%20PrintyPackaging%2C%20I%20need%20help%20with%20custom%20packaging."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-black text-[#07111F] shadow-[0_12px_35px_rgba(7,17,31,0.08)] transition hover:-translate-y-0.5 hover:border-[#00C2E8]"
              >
                Ask on WhatsApp
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute bottom-0 left-7 top-0 hidden w-px bg-gradient-to-b from-[#00C2E8] via-[#FF6A00] to-transparent sm:block" />

            <div className="space-y-5">
              {steps.map((step) => (
                <article
                  key={step.number}
                  className="relative rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-[0_18px_55px_rgba(7,17,31,0.06)] transition hover:-translate-y-1 hover:bg-white hover:shadow-[0_28px_80px_rgba(7,17,31,0.10)] sm:ml-16"
                >
                  <div className="absolute -left-16 top-6 hidden h-14 w-14 items-center justify-center rounded-2xl bg-[#07111F] text-sm font-black text-white shadow-xl sm:flex">
                    {step.number}
                  </div>

                  <div className="flex items-start gap-4 sm:hidden">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#07111F] text-sm font-black text-white">
                      {step.number}
                    </span>

                    <div>
                      <h3 className="text-xl font-black text-[#07111F]">
                        {step.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {step.text}
                      </p>
                    </div>
                  </div>

                  <div className="hidden sm:block">
                    <h3 className="text-xl font-black text-[#07111F]">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {step.text}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6 rounded-[2rem] border border-[#00C2E8]/25 bg-[#00C2E8]/10 p-6">
              <p className="text-sm font-bold leading-7 text-[#07111F]">
                Tip: For accurate pricing, send size, quantity, material,
                printing colors, finishing options, artwork status and delivery
                country.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


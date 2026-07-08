const supportItems = [
  {
    title: "Live Chat Support",
    text: "Talk with our packaging sales team directly from the website during working hours.",
  },
  {
    title: "WhatsApp Assistance",
    text: "Send box size, quantity, material and artwork details for quick guidance.",
  },
  {
    title: "Custom Quote Help",
    text: "Our team helps you choose the right box style, stock, finish and shipping option.",
  },
];

export default function SalesSupportSection() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-slate-200 bg-[#07111F] shadow-[0_28px_90px_rgba(7,17,31,0.18)]">
        <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative overflow-hidden p-8 sm:p-10 lg:p-12">
            <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-[#00C2E8]/20 blur-3xl" />
            <div className="absolute -bottom-24 right-0 h-64 w-64 rounded-full bg-[#FF6A00]/20 blur-3xl" />

            <div className="relative">
              <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#00C2E8]">
                Sales Support
              </span>

              <h2 className="mt-5 max-w-xl text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                Need packaging help? Our team is ready to guide you.
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
                Share your box size, quantity, material, printing colors and
                finishing requirements. Printy Packaging team will help you
                prepare a professional quote for your custom packaging project.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/#quote"
                  className="inline-flex items-center justify-center rounded-full bg-[#FF6A00] px-6 py-3 text-sm font-black text-white shadow-[0_18px_45px_rgba(255,106,0,0.30)] transition hover:-translate-y-0.5 hover:bg-[#E85F00]"
                >
                  Request Quote
                </a>

                <a
                  href="https://wa.me/923338889954?text=Hello%20PrintyPackaging%2C%20I%20need%20a%20custom%20packaging%20quote."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/15"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 bg-white/[0.04] p-8 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
            <div className="grid gap-4">
              {supportItems.map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-white/10 bg-white/[0.06] p-6"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FF6A00] text-sm font-black text-white">
                      0{index + 1}
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
                Tip: For faster quote, send product size, quantity, material
                type, printing colors and delivery country.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
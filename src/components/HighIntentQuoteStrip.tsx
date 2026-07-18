const quoteBenefits = [
  "Fast quote review",
  "Material and GSM guidance",
  "Artwork and dieline help",
  "WhatsApp and live chat support",
];

export default function HighIntentQuoteStrip() {
  return (
    <section className="bg-slate-50 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_22px_75px_rgba(7,17,31,0.08)] sm:p-10 lg:p-12">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <span className="inline-flex rounded-full bg-[#FF6A00]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#FF6A00]">
              Quote Ready
            </span>

            <h2 className="mt-5 text-3xl font-black tracking-tight text-[#07111F] sm:text-4xl">
              Turn your packaging idea into a clear production quote.
            </h2>

            <p className="mt-4 text-base leading-8 text-slate-600">
              Printy Packaging helps buyers compare box style, material,
              printing, finishing and quantity options before production.
            </p>
          </div>

          <div>
            <div className="grid gap-3 sm:grid-cols-2">
              {quoteBenefits.map((benefit) => (
                <div
                  key={benefit}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-black text-[#07111F]"
                >
                  ✓ {benefit}
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="/#quote"
                className="inline-flex items-center justify-center rounded-full bg-[#FF6A00] px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#E85F00]"
              >
                Get Quote Now
              </a>

              <a
                href="/packaging-guide"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-black text-[#07111F] transition hover:-translate-y-0.5 hover:border-[#00C2E8]"
              >
                Read Packaging Guide
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


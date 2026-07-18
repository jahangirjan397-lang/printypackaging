type ProductMerchantCtaPanelProps = {
  productTitle?: string;
};

export default function ProductMerchantCtaPanel({
  productTitle = "Custom Packaging",
}: ProductMerchantCtaPanelProps) {
  const whatsappMessage = `Hello PrintyPackaging, I need a quote for ${productTitle}. Please guide me about size, material, printing, finishing and pricing.`;

  return (
    <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-slate-200 bg-[#07111F] shadow-[0_28px_90px_rgba(7,17,31,0.16)]">
        <div className="grid gap-0 lg:grid-cols-[1fr_0.9fr]">
          <div className="relative overflow-hidden p-8 sm:p-10 lg:p-12">
            <div className="absolute -left-24 -top-24 h-60 w-60 rounded-full bg-[#00C2E8]/20 blur-3xl" />
            <div className="absolute -bottom-28 right-0 h-64 w-64 rounded-full bg-[#FF6A00]/20 blur-3xl" />

            <div className="relative">
              <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#00C2E8]">
                Fast Custom Quote
              </span>

              <h2 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-4xl">
                Get a professional quote for {productTitle}.
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
                Send your size, quantity, material, printing colors, finishing
                options and delivery country. Our packaging team will help you
                choose the right production option.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/#quote"
                  className="inline-flex items-center justify-center rounded-full bg-[#FF6A00] px-6 py-3 text-sm font-black text-white shadow-[0_18px_45px_rgba(255,106,0,0.30)] transition hover:-translate-y-0.5 hover:bg-[#E85F00]"
                >
                  Request Quote
                </a>

                <a
                  href={`https://wa.me/923338889954?text=${encodeURIComponent(
                    whatsappMessage,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/15"
                >
                  Ask on WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 bg-white/[0.04] p-8 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
            <h3 className="text-2xl font-black text-white">
              For accurate pricing, send:
            </h3>

            <div className="mt-6 grid gap-3">
              {[
                "Length × Width × Depth",
                "Required quantity",
                "Paper stock / GSM",
                "Printing colors",
                "Finishing options",
                "Delivery country",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 text-sm font-bold text-slate-100"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-[#00C2E8]/25 bg-[#00C2E8]/10 p-5">
              <p className="text-sm font-bold leading-7 text-slate-100">
                Artwork not ready? We can guide you with dieline, proofing and
                print-ready file requirements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


const strengths = [
  {
    title: "Factory-Direct Guidance",
    text: "Get packaging advice from people who understand printing, paper stock, die cutting, finishing and production planning.",
  },
  {
    title: "Fast Quote Support",
    text: "Share your size, quantity, material and finishing details. Our sales team helps prepare the right quote quickly.",
  },
  {
    title: "Premium Print Finishes",
    text: "Choose CMYK printing, Pantone colors, lamination, spot UV, foil stamping, embossing and custom die-cut styles.",
  },
  {
    title: "Export-Ready Packaging",
    text: "We help brands with packaging solutions for USA, UK, Canada, Europe, Australia and worldwide markets.",
  },
];

const comparisonRows = [
  {
    feature: "Custom box style guidance",
    printy: "Included",
    normal: "Limited",
  },
  {
    feature: "Material and GSM advice",
    printy: "Included",
    normal: "Basic",
  },
  {
    feature: "Finishing options support",
    printy: "Foil, UV, embossing, lamination",
    normal: "Limited options",
  },
  {
    feature: "Fast quote channels",
    printy: "Form, WhatsApp and live chat",
    normal: "Form only",
  },
  {
    feature: "Production knowledge",
    printy: "Printing and packaging focused",
    normal: "Mostly sales focused",
  },
];

export default function WhyChoosePrintySection() {
  return (
    <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <span className="inline-flex rounded-full bg-[#00C2E8]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#007C91]">
              Why Printy Packaging
            </span>

            <h2 className="mt-5 text-3xl font-black tracking-tight text-[#07111F] sm:text-4xl lg:text-5xl">
              Built to compete with modern custom packaging brands.
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
              Printy Packaging is designed for serious buyers who need custom
              boxes, retail packaging, food packaging and premium finishing
              support with fast communication and practical production guidance.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {strengths.map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(7,17,31,0.06)]"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FF6A00] text-lg font-black text-white">
                    ✓
                  </div>

                  <h3 className="text-lg font-black text-[#07111F]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_28px_90px_rgba(7,17,31,0.12)]">
            <div className="bg-[#07111F] p-7">
              <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#00C2E8]">
                Buyer Comparison
              </span>

              <h3 className="mt-4 text-2xl font-black text-white">
                What buyers get with Printy Packaging
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-300">
                A clear support system for quote, artwork, stock, printing,
                finishing and production planning.
              </p>
            </div>

            <div className="divide-y divide-slate-200">
              <div className="grid grid-cols-[1.1fr_1fr_1fr] bg-slate-50 px-5 py-4 text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                <span>Feature</span>
                <span className="text-[#007C91]">Printy</span>
                <span>Normal Seller</span>
              </div>

              {comparisonRows.map((row) => (
                <div
                  key={row.feature}
                  className="grid grid-cols-[1.1fr_1fr_1fr] gap-3 px-5 py-5 text-sm"
                >
                  <span className="font-black text-[#07111F]">
                    {row.feature}
                  </span>

                  <span className="font-bold leading-6 text-[#007C91]">
                    {row.printy}
                  </span>

                  <span className="leading-6 text-slate-500">
                    {row.normal}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-200 bg-[#FF6A00]/8 p-6">
              <p className="text-sm font-bold leading-7 text-[#07111F]">
                Best for brands that need custom boxes, accurate packaging
                guidance, premium finishing and fast sales support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


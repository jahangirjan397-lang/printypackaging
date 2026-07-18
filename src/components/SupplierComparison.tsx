const comparisonRows = [
  {
    point: "Quote Process",
    printy:
      "Clear product, size, material, GSM, printing and finishing details before quote.",
    common:
      "Buyer often receives price without complete packaging and material guidance.",
  },
  {
    point: "Material Guidance",
    printy:
      "SBS, art card, kraft, rigid board, corrugated, butter paper and food-grade options are explained.",
    common:
      "Customer may need to select material without proper packaging support.",
  },
  {
    point: "GSM / Thickness Support",
    printy:
      "Buyers can share GSM, board thickness, flute type or food paper requirement.",
    common:
      "Material thickness is often unclear, which can create wrong pricing or weak packaging.",
  },
  {
    point: "Finishing Options",
    printy:
      "Matte, gloss, soft touch, spot UV, foil, embossing, debossing and die cutting options are available.",
    common:
      "Finishing is listed but not explained according to brand and product usage.",
  },
  {
    point: "Buyer Experience",
    printy:
      "Easy quote form, product pages, material details, WhatsApp support and guidance sections.",
    common:
      "Buyer may need to ask many separate questions before moving forward.",
  },
];

const trustBadges = [
  "Packaging-focused guidance",
  "International buyer friendly",
  "Material and GSM support",
  "Fast quote direction",
];

export default function SupplierComparison() {
  return (
    <section className="bg-[#F7FAFC] px-5 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.32em] text-[#FF6A00]">
              Buyer Confidence
            </p>

            <h2 className="mt-4 text-4xl font-black leading-tight text-[#07111F] md:text-5xl">
              Built for serious packaging buyers, not just basic box inquiries
            </h2>
          </div>

          <p className="text-lg leading-8 text-slate-600">
            Custom packaging buyers need more than a price. They need clear
            guidance about box style, material, GSM, printing, finishing and
            production requirements before they can make a confident decision.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {trustBadges.map((badge) => (
            <div
              key={badge}
              className="rounded-[1.5rem] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#00C2E8] font-black text-[#07111F]">
                ✓
              </div>
              <p className="font-black text-[#07111F]">{badge}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-5">
          {comparisonRows.map((row) => (
            <article
              key={row.point}
              className="overflow-hidden rounded-[1.7rem] border border-slate-200 bg-white shadow-sm"
            >
              <div className="grid gap-0 lg:grid-cols-[0.7fr_1.15fr_1.15fr]">
                <div className="bg-[#07111F] p-6 text-white">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-[#00C2E8]">
                    Buyer Need
                  </p>
                  <h3 className="mt-3 text-2xl font-black">{row.point}</h3>
                </div>

                <div className="border-t border-slate-200 p-6 lg:border-l lg:border-t-0">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-[#00C2E8]">
                    Printy Packaging Approach
                  </p>
                  <p className="mt-3 text-sm font-bold leading-7 text-slate-700">
                    {row.printy}
                  </p>
                </div>

                <div className="border-t border-slate-200 bg-[#F7FAFC] p-6 lg:border-l lg:border-t-0">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-[#FF6A00]">
                    Common Buyer Problem
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {row.common}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-[2rem] bg-[#07111F] p-8 text-white">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.32em] text-[#00C2E8]">
                Better Quote Preparation
              </p>

              <h3 className="mt-3 text-3xl font-black">
                Help customers send complete details the first time
              </h3>

              <p className="mt-3 max-w-3xl leading-7 text-slate-300">
                A complete inquiry saves time for both buyer and sales team.
                Product size, quantity, material, GSM, printing colors,
                finishing and artwork status make the quote process faster.
              </p>
            </div>

            <a
              href="/#quote"
              className="inline-flex rounded-full bg-[#FF6A00] px-8 py-4 font-black text-white transition hover:-translate-y-1 hover:bg-white hover:text-[#07111F]"
            >
              Get Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

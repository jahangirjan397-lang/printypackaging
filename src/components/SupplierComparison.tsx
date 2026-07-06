const comparisonRows = [
  {
    point: "Quote Process",
    printy: "Clear product, size, material, GSM, printing and finishing details before quote.",
    common: "Often quote is shared with incomplete product and material information.",
  },
  {
    point: "Material Guidance",
    printy: "SBS, art card, kraft, rigid board, corrugated, butter paper and food-grade guidance.",
    common: "Customer may need to decide material without proper packaging support.",
  },
  {
    point: "Finishing Support",
    printy: "Matte, gloss, soft touch, spot UV, foiling, embossing and die cutting options explained.",
    common: "Finishing options are sometimes listed without clear usage guidance.",
  },
  {
    point: "Buyer Experience",
    printy: "Easy quote form, WhatsApp support, product pages and packaging education sections.",
    common: "Buyer may need to ask many separate questions before moving forward.",
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

        <div className="grid gap-5 md:grid-cols-4">
          {trustBadges.map((badge) => (
            <div
              key={badge}
              className="rounded-[1.5rem] bg-white p-5 shadow-sm"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#00C2E8] font-black text-[#07111F]">
                ✓
              </div>
              <p className="font-black text-[#07111F]">{badge}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-md">
          <div className="grid grid-cols-3 bg-[#07111F] text-white">
            <div className="p-5 text-sm font-black uppercase tracking-[0.18em]">
              What Buyer Needs
            </div>
            <div className="p-5 text-sm font-black uppercase tracking-[0.18em] text-[#00C2E8]">
              Printy Packaging Approach
            </div>
            <div className="p-5 text-sm font-black uppercase tracking-[0.18em] text-[#FF6A00]">
              Common Buyer Problem
            </div>
          </div>

          {comparisonRows.map((row) => (
            <div
              key={row.point}
              className="grid border-t border-slate-200 md:grid-cols-3"
            >
              <div className="bg-[#F7FAFC] p-5">
                <p className="font-black text-[#07111F]">{row.point}</p>
              </div>

              <div className="p-5">
                <p className="text-sm font-bold leading-7 text-slate-700">
                  {row.printy}
                </p>
              </div>

              <div className="p-5">
                <p className="text-sm leading-7 text-slate-600">
                  {row.common}
                </p>
              </div>
            </div>
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
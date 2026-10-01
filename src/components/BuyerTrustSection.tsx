import { businessPromises } from "@/data/businessInfo";

// Order basics shown on product, category and market pages. Figures come
// from /admin -> Business Info so they stay the same everywhere.
const trustItems = [
  {
    title: "Minimum order",
    text: `Orders start from ${businessPromises.minimumOrder} for most styles, so you can test a design before ordering in bulk.`,
  },
  {
    title: "Proof before printing",
    text: "You see a digital proof with the dieline, artwork placement and finishes, and nothing is printed until you approve it.",
  },
  {
    title: "Production time",
    text: `Standard production is ${businessPromises.productionTime} after proof approval, plus shipping to your country.`,
  },
  {
    title: "Material & finish advice",
    text: "We explain paperboard, kraft, corrugated and rigid board, and finishes such as lamination, foil, embossing and spot UV.",
  },
];

export default function BuyerTrustSection() {
  return (
    <section className="bg-slate-50 text-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-[#FF6A00]">
            Ordering With Printy
          </p>

          <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
            What to expect when you order.
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            The basics we confirm on every quote, so you know how the order
            works before you commit.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-white p-7 shadow-lg shadow-slate-200/60"
            >
              <div
                aria-hidden="true"
                className="mb-5 h-11 w-11 rounded-2xl bg-[#FF6A00] shadow-lg shadow-orange-500/20 flex items-center justify-center text-white"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
              </div>

              <h3 className="text-xl font-black tracking-tight">
                {item.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-600">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


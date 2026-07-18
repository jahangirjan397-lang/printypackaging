const keywordGroups = [
  {
    heading: "Custom Boxes",
    terms: [
      "Custom printed boxes",
      "Custom packaging boxes",
      "Rigid boxes",
      "Mailer boxes",
      "Folding cartons",
      "Shipping boxes",
    ],
  },
  {
    heading: "Food Packaging",
    terms: [
      "Butter paper",
      "Greaseproof paper",
      "Bakery boxes",
      "Food packaging boxes",
      "Takeaway packaging",
      "Printed food wrapping paper",
    ],
  },
  {
    heading: "Luxury Finishing",
    terms: [
      "Gold foil packaging",
      "Spot UV boxes",
      "Embossed packaging",
      "Soft touch lamination",
      "Matte laminated boxes",
      "Premium rigid boxes",
    ],
  },
  {
    heading: "Global Markets",
    terms: [
      "Custom packaging USA",
      "Custom packaging UK",
      "Custom packaging Canada",
      "Custom packaging Europe",
      "Custom packaging Australia",
      "Worldwide packaging supplier",
    ],
  },
];

export default function SeoKeywordSalesSection() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_80px_rgba(7,17,31,0.09)] sm:p-10 lg:p-12">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <span className="inline-flex rounded-full bg-[#00C2E8]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#007C91]">
              Packaging Search Terms
            </span>

            <h2 className="mt-5 text-3xl font-black tracking-tight text-[#07111F] sm:text-4xl lg:text-5xl">
              Find the right packaging solution for your brand.
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600">
              We naturally cover high-intent packaging topics across custom
              boxes, food packaging, luxury finishes and global supply. This
              helps buyers understand our services and improves search quality
              without keyword stuffing.
            </p>

            <a
              href="/#quote"
              className="mt-7 inline-flex rounded-full bg-[#FF6A00] px-6 py-3 text-sm font-black text-white shadow-[0_18px_45px_rgba(255,106,0,0.30)] transition hover:-translate-y-0.5 hover:bg-[#E85F00]"
            >
              Get Custom Packaging Quote
            </a>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {keywordGroups.map((group) => (
              <div
                key={group.heading}
                className="rounded-[1.6rem] border border-slate-200 bg-slate-50 p-6"
              >
                <h3 className="text-lg font-black text-[#07111F]">
                  {group.heading}
                </h3>

                <div className="mt-4 flex flex-wrap gap-2">
                  {group.terms.map((term) => (
                    <span
                      key={term}
                      className="rounded-full bg-white px-3 py-2 text-xs font-bold text-slate-600 ring-1 ring-slate-200"
                    >
                      {term}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


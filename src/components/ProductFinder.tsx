const suggestions = [
  {
    title: "Perfume Box",
    match: "Luxury rigid box or folding carton",
    description:
      "Best for premium fragrance brands that need strong presentation and shelf impact.",
  },
  {
    title: "Burger Wrap",
    match: "Custom butter paper or food wrap",
    description:
      "Ideal for restaurants, burger shops and food brands that need branded wrapping.",
  },
  {
    title: "Rigid Gift Box",
    match: "Two piece, drawer or magnetic box",
    description:
      "Perfect for gifts, PR kits, jewelry, apparel and luxury product launches.",
  },
  {
    title: "Cosmetic Carton",
    match: "Folding carton with lamination",
    description:
      "Best for skincare, makeup, serum, soap and beauty product packaging.",
  },
];

export default function ProductFinder() {
  return (
    <section className="bg-[#F7FAFC] px-4 py-16 sm:px-5 md:px-8 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#FF6A00] md:text-sm">
            Smart Packaging Finder
          </p>

          <h2 className="mt-4 text-3xl font-black leading-tight text-[#07111F] sm:text-4xl md:text-5xl">
            Help clients find the right packaging faster
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600 md:text-lg md:leading-8">
            Guide customers toward the best box style, material and finishing
            option based on their product type. Later, this section can become
            the PrintyPackaging AI Packaging Advisor.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-2xl font-black text-[#07111F]">4+</p>
              <p className="mt-1 text-sm font-bold text-slate-600">
                smart product examples
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-2xl font-black text-[#07111F]">Fast</p>
              <p className="mt-1 text-sm font-bold text-slate-600">
                quote direction for buyers
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] bg-[#07111F] p-5 text-white shadow-2xl md:p-6">
          <div className="rounded-2xl bg-white p-5 text-[#07111F] shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#FF6A00]">
              Customer Question
            </p>

            <p className="mt-2 text-lg font-black leading-7">
              I sell perfume. What packaging do I need?
            </p>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {suggestions.map((item, index) => (
              <article
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.1]"
              >
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl bg-[#00C2E8]/15 text-xs font-black text-[#00C2E8]">
                  {index + 1}
                </div>

                <h3 className="font-black text-[#00C2E8]">{item.title}</h3>

                <p className="mt-2 text-sm font-black text-white">
                  {item.match}
                </p>

                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {item.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-[#00C2E8]/20 bg-[#00C2E8]/10 p-4">
            <p className="text-sm font-bold leading-6 text-slate-200">
              Next upgrade: product type select, size input, material suggestion
              and automatic quote direction.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
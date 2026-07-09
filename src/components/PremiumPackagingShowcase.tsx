const showcaseItems = [
  {
    title: "Rigid Boxes",
    tag: "Luxury Packaging",
    note: "Premium boxes for cosmetics, gifts, retail and high-end products.",
  },
  {
    title: "Mailer Boxes",
    tag: "Ecommerce Ready",
    note: "Strong printed mailer boxes for online brands and subscription kits.",
  },
  {
    title: "Folding Cartons",
    tag: "Retail Packaging",
    note: "Custom printed folding cartons with material and finish options.",
  },
  {
    title: "Butter Paper",
    tag: "Food Wrapping",
    note: "Printed butter paper and greaseproof wrapping for food brands.",
  },
];

function BoxMockup({ index }: { index: number }) {
  const rotate =
    index === 0
      ? "rotate-[-7deg]"
      : index === 1
        ? "rotate-[5deg]"
        : index === 2
          ? "rotate-[-4deg]"
          : "rotate-[6deg]";

  return (
    <div className="relative flex h-56 items-center justify-center overflow-hidden rounded-[1.8rem] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-[#E8FBFF] shadow-[0_24px_80px_rgba(7,17,31,0.10)]">
      <div className="absolute -left-16 -top-16 h-40 w-40 rounded-full bg-[#00C2E8]/20 blur-3xl" />
      <div className="absolute -bottom-16 -right-16 h-44 w-44 rounded-full bg-[#FF6A00]/18 blur-3xl" />

      <div className={`relative h-28 w-36 ${rotate}`}>
        <div className="absolute left-4 top-8 h-24 w-28 rounded-xl border border-slate-200 bg-white shadow-2xl" />
        <div className="absolute left-0 top-0 h-24 w-28 rounded-xl border border-[#00C2E8]/25 bg-gradient-to-br from-[#00C2E8] to-[#007C91] shadow-xl" />
        <div className="absolute left-8 top-5 h-10 w-16 rounded-lg bg-white/28" />
        <div className="absolute bottom-4 left-5 h-2 w-16 rounded-full bg-white/50" />
        <div className="absolute bottom-8 left-5 h-2 w-20 rounded-full bg-white/35" />
        <div className="absolute -right-2 top-7 h-20 w-12 rounded-lg bg-[#FF6A00]/90 shadow-lg" />
      </div>

      <span className="absolute bottom-4 right-4 rounded-full bg-[#07111F] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white">
        Preview
      </span>
    </div>
  );
}

export default function PremiumPackagingShowcase() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-[#FF6A00]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#FF6A00]">
            Packaging Gallery
          </span>

          <h2 className="mt-5 text-3xl font-black tracking-tight text-[#07111F] sm:text-4xl lg:text-5xl">
            Premium custom packaging visuals for every product line.
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600">
            Real product photos can be added later. For launch, these clean
            packaging visuals keep the website professional, fast and free from
            broken image boxes.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {showcaseItems.map((item, index) => (
            <article
              key={item.title}
              className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_18px_60px_rgba(7,17,31,0.08)] transition hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(7,17,31,0.13)]"
            >
              <BoxMockup index={index} />

              <div className="p-6">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-[#00A6C8]">
                  {item.tag}
                </span>

                <h3 className="mt-3 text-xl font-black text-[#07111F]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.note}
                </p>

                <a
                  href="/#quote"
                  className="mt-5 inline-flex text-sm font-black text-[#FF6A00] transition hover:text-[#07111F]"
                >
                  Request Quote →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
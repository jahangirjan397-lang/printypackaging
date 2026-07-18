import SmartImage from "./SmartImage";

const showcaseItems = [
  {
    title: "Rigid Boxes",
    tag: "Luxury Packaging",
    note: "Premium boxes for cosmetics, gifts, retail and high-end products.",
    image: "",
    alt: "Custom rigid boxes by Printy Packaging",
  },
  {
    title: "Mailer Boxes",
    tag: "Ecommerce Ready",
    note: "Strong printed mailer boxes for online brands and subscription kits.",
    image: "",
    alt: "Custom printed mailer boxes",
  },
  {
    title: "Folding Cartons",
    tag: "Retail Packaging",
    note: "Custom printed folding cartons with material and finish options.",
    image: "",
    alt: "Custom printed folding cartons",
  },
  {
    title: "Butter Paper",
    tag: "Food Wrapping",
    note: "Printed butter paper and greaseproof wrapping for food brands.",
    image: "",
    alt: "Custom printed butter paper food wrapping",
  },
];

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
            Real product photos will be added in the final image phase. Until
            then, the website shows clean premium packaging previews without
            loading missing image files.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {showcaseItems.map((item) => (
            <article
              key={item.title}
              className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_18px_60px_rgba(7,17,31,0.08)] transition hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(7,17,31,0.13)]"
            >
              <SmartImage
                src={item.image}
                alt={item.alt}
                title={item.title}
                tag={item.tag}
                className="h-56 rounded-t-[2rem]"
              />

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


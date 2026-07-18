const industries = [
  {
    title: "Cosmetic Packaging",
    text: "Custom rigid boxes, folding cartons, sleeves and luxury finishes for skincare, beauty and fragrance brands.",
    keywords: "Cosmetic boxes, skincare packaging, beauty product packaging",
  },
  {
    title: "Food Packaging",
    text: "Food-safe boxes, butter paper, paper bags and wrapping solutions for bakeries, restaurants and food brands.",
    keywords: "Food packaging, butter paper, bakery boxes, takeaway packaging",
  },
  {
    title: "Ecommerce Packaging",
    text: "Printed mailer boxes, shipping boxes and subscription packaging for online stores and DTC brands.",
    keywords: "Mailer boxes, ecommerce packaging, subscription boxes",
  },
  {
    title: "Retail Packaging",
    text: "Premium folding cartons, paper bags, labels and display-ready packaging for retail shelves.",
    keywords: "Retail boxes, paper bags, product packaging",
  },
  {
    title: "Gift Packaging",
    text: "Luxury boxes, rigid gift boxes and magnetic closure boxes for premium brand presentation.",
    keywords: "Gift boxes, rigid boxes, luxury packaging",
  },
  {
    title: "Apparel Packaging",
    text: "Custom paper bags, mailer boxes, tags, stickers and packaging inserts for clothing and fashion brands.",
    keywords: "Apparel packaging, clothing boxes, custom bags",
  },
];

export default function IndustryBuyerSection() {
  return (
    <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-[#FF6A00]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#FF6A00]">
            Industries We Serve
          </span>

          <h2 className="mt-5 text-3xl font-black tracking-tight text-[#07111F] sm:text-4xl lg:text-5xl">
            Custom packaging solutions for growing product brands.
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600">
            Printy Packaging helps brands choose the right box style, material,
            printing method and finishing options for their product category.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <article
              key={industry.title}
              className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_18px_55px_rgba(7,17,31,0.07)] transition hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(7,17,31,0.11)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#07111F] text-lg font-black text-white">
                PP
              </div>

              <h3 className="mt-5 text-xl font-black text-[#07111F]">
                {industry.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                {industry.text}
              </p>

              <p className="mt-5 rounded-2xl bg-[#00C2E8]/10 p-4 text-xs font-bold leading-6 text-[#007C91]">
                {industry.keywords}
              </p>

              <a
                href="/#quote"
                className="mt-5 inline-flex text-sm font-black text-[#FF6A00] transition hover:text-[#07111F]"
              >
                Request industry quote →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


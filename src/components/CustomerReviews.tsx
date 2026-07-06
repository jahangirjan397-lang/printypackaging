const reviews = [
  {
    rating: "★★★★★",
    title: "Professional Quote Guidance",
    market: "USA Packaging Buyer",
    text: "The quote process is clear and easy. Product size, material, GSM, printing and finishing details can be shared in one place, which helps buyers get better guidance.",
  },
  {
    rating: "★★★★★",
    title: "Strong Material Support",
    market: "Food Brand Buyer",
    text: "Material selection is important for food and retail packaging. Clear options like SBS, kraft, butter paper, greaseproof paper and corrugated board make the buying process easier.",
  },
  {
    rating: "★★★★★",
    title: "Premium Packaging Presentation",
    market: "Luxury Product Buyer",
    text: "Luxury packaging needs strong structure and premium finishing. Rigid board, soft touch lamination, foiling, embossing and spot UV options help brands create better shelf impact.",
  },
  {
    rating: "★★★★★",
    title: "Helpful for E-commerce Brands",
    market: "E-commerce Buyer",
    text: "Mailer boxes, shipping boxes and branded packaging help online stores improve product protection and unboxing experience for their customers.",
  },
];

const trustPoints = [
  "Custom sizes and styles",
  "Material and GSM guidance",
  "Printing and finishing support",
  "International buyer friendly process",
];

export default function CustomerReviews() {
  return (
    <section className="bg-white px-5 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.32em] text-[#FF6A00]">
              Customer Trust
            </p>

            <h2 className="mt-4 text-4xl font-black leading-tight text-[#07111F] md:text-5xl">
              Packaging guidance that helps buyers feel confident
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Professional packaging buyers need clear material, printing,
              finishing and quote guidance before placing an order. This section
              builds trust and helps new clients understand how Printy Packaging
              supports their project.
            </p>

            <div className="mt-7 grid gap-3">
              {trustPoints.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 rounded-2xl bg-[#F7FAFC] p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#00C2E8] font-black text-[#07111F]">
                    ✓
                  </div>
                  <p className="font-black text-[#07111F]">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {reviews.map((review) => (
              <article
                key={review.title}
                className="rounded-[1.7rem] border border-slate-200 bg-[#F7FAFC] p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#00C2E8] hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-lg font-black tracking-widest text-[#FF6A00]">
                    {review.rating}
                  </p>

                  <span className="rounded-full bg-white px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#007C91]">
                    Trust
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-black text-[#07111F]">
                  {review.title}
                </h3>

                <p className="mt-2 text-xs font-black uppercase tracking-[0.2em] text-[#00C2E8]">
                  {review.market}
                </p>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  “{review.text}”
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-[2rem] bg-[#07111F] p-6 text-white md:p-8">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.32em] text-[#00C2E8]">
                Real Review Ready
              </p>

              <h3 className="mt-3 text-2xl font-black">
                Replace these trust cards with real customer reviews anytime
              </h3>

              <p className="mt-3 leading-7 text-slate-300">
                When real client reviews are available, we can add client name,
                country, product type and verified feedback without changing the
                section design.
              </p>
            </div>

            <a
              href="/#quote"
              className="inline-flex rounded-full bg-[#FF6A00] px-7 py-4 font-black text-white transition hover:-translate-y-1 hover:bg-white hover:text-[#07111F]"
            >
              Request Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
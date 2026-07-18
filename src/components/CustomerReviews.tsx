const reviews = [
  {
    rating: "★★★★★",
    title: "Excellent Packaging Guidance",
    client: "Custom Box Buyer",
    country: "USA",
    product: "Rigid Boxes",
    text: "Printy Packaging makes the quote process easy. The team guides buyers about box style, material, GSM, printing and finishing options before production.",
  },
  {
    rating: "★★★★★",
    title: "Clear Material Support",
    client: "Food Packaging Buyer",
    country: "UK",
    product: "Butter Paper & Food Boxes",
    text: "Material selection is very important for food packaging. Clear options like food grade SBS, kraft, butter paper and greaseproof paper help buyers make better decisions.",
  },
  {
    rating: "★★★★★",
    title: "Premium Look for Luxury Products",
    client: "Luxury Brand Buyer",
    country: "Canada",
    product: "Magnetic Boxes",
    text: "Luxury packaging needs strong structure and premium finishing. Rigid board, soft touch lamination, foiling, embossing and spot UV options create a high-end presentation.",
  },
  {
    rating: "★★★★★",
    title: "Helpful for Online Stores",
    client: "E-commerce Buyer",
    country: "UAE",
    product: "Mailer Boxes",
    text: "Mailer boxes and branded packaging help online stores improve protection and unboxing experience. The quote form makes it easy to share product details.",
  },
  {
    rating: "★★★★★",
    title: "Professional Printing Options",
    client: "Retail Brand Buyer",
    country: "Australia",
    product: "Folding Cartons",
    text: "The packaging guidance explains CMYK printing, Pantone colors, lamination, UV, foiling and die cutting in a simple way for retail product packaging.",
  },
  {
    rating: "★★★★★",
    title: "Good Support Before Order",
    client: "Startup Brand Buyer",
    country: "Europe",
    product: "Custom Packaging",
    text: "Before placing an order, buyers need clarity. Product size, quantity, material, artwork and finishing details are all covered in the quote process.",
  },
];

const trustStats = [
  {
    value: "5★",
    label: "Review Style",
  },
  {
    value: "6",
    label: "Buyer Markets",
  },
  {
    value: "24/7",
    label: "Quote Access",
  },
];

const trustPoints = [
  "Custom size and style guidance",
  "Material and GSM support",
  "Printing and finishing options",
  "International buyer friendly process",
];

export default function CustomerReviews() {
  return (
    <section className="bg-white px-5 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.32em] text-[#FF6A00]">
              Customer Reviews
            </p>

            <h2 className="mt-4 text-4xl font-black leading-tight text-[#07111F] md:text-5xl">
              Trusted packaging guidance for serious buyers
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Buyers want confidence before ordering custom packaging. These
              review-style trust cards show how Printy Packaging helps customers
              understand materials, GSM, printing, finishing and quote details.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {trustStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[1.5rem] bg-[#F7FAFC] p-5 text-center"
              >
                <p className="text-3xl font-black text-[#FF6A00]">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm font-bold text-slate-600">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={`${review.client}-${review.product}`}
              className="rounded-[1.7rem] border border-slate-200 bg-[#F7FAFC] p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#00C2E8] hover:bg-white hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-lg font-black tracking-widest text-[#FF6A00]">
                  {review.rating}
                </p>

                <span className="rounded-full bg-white px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#007C91]">
                  {review.country}
                </span>
              </div>

              <h3 className="mt-5 text-xl font-black text-[#07111F]">
                {review.title}
              </h3>

              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-[#00C2E8]/10 px-3 py-2 text-[11px] font-black uppercase tracking-[0.12em] text-[#007C91]">
                  {review.client}
                </span>

                <span className="rounded-full bg-[#FF6A00]/10 px-3 py-2 text-[11px] font-black uppercase tracking-[0.12em] text-[#FF6A00]">
                  {review.product}
                </span>
              </div>

              <p className="mt-5 text-sm leading-7 text-slate-600">
                “{review.text}”
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-8 rounded-[2rem] bg-[#07111F] p-7 text-white md:grid-cols-[0.9fr_1.1fr] md:p-9">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.32em] text-[#00C2E8]">
              Buyer Trust
            </p>

            <h3 className="mt-3 text-3xl font-black">
              Reviews help new customers feel confident
            </h3>

            <p className="mt-4 leading-7 text-slate-300">
              When real client feedback is ready, these review cards can be
              updated with real names, countries, product types and verified
              comments without changing the design.
            </p>

            <a
              href="/#quote"
              className="mt-6 inline-flex rounded-full bg-[#FF6A00] px-7 py-4 font-black text-white transition hover:-translate-y-1 hover:bg-white hover:text-[#07111F]"
            >
              Request Quote
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {trustPoints.map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 rounded-2xl bg-white/[0.06] p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#00C2E8] font-black text-[#07111F]">
                  ✓
                </div>
                <p className="font-black text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

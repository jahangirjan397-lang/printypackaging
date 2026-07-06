const caseStudies = [
  {
    industry: "Cosmetics & Beauty",
    title: "Premium packaging for skincare, makeup and beauty brands",
    challenge:
      "Beauty brands need packaging that looks premium, protects products and presents brand colors clearly on shelves and online stores.",
    solution:
      "Cosmetic boxes can use SBS / bleach card, art card, soft touch lamination, spot UV, foiling and embossing for premium brand presentation.",
    products: ["Cosmetic Boxes", "Rigid Boxes", "Sleeve Boxes"],
    materials: ["SBS / Bleach Card", "Art Card", "Rigid Board"],
  },
  {
    industry: "Food & Restaurants",
    title: "Food-safe packaging for restaurants, bakeries and cafes",
    challenge:
      "Food businesses need packaging that is clean, practical, food-friendly and suitable for takeaway, delivery and brand presentation.",
    solution:
      "Food packaging can use food grade SBS, kraft, butter paper, greaseproof paper and corrugated board depending on product type.",
    products: ["Burger Boxes", "Bakery Boxes", "Butter Paper"],
    materials: ["Food Grade SBS", "Kraft Paper", "Butter Paper"],
  },
  {
    industry: "E-commerce & Shipping",
    title: "Branded delivery packaging for online stores",
    challenge:
      "Online brands need strong packaging that protects products during delivery and creates a professional unboxing experience.",
    solution:
      "Mailer boxes, shipping boxes and corrugated packaging can be produced with E-flute, B-flute, kraft board and branded printing.",
    products: ["Mailer Boxes", "Shipping Boxes", "Apparel Boxes"],
    materials: ["E-Flute", "B-Flute", "Corrugated Board"],
  },
  {
    industry: "Luxury & Gift Brands",
    title: "High-end packaging for premium product presentation",
    challenge:
      "Luxury products need strong structure, premium feel and finishing options that support high-value presentation.",
    solution:
      "Rigid boxes, magnetic boxes and drawer boxes can use grey board, rigid board, art paper wrap, foiling, embossing and soft touch finish.",
    products: ["Rigid Boxes", "Magnetic Boxes", "Drawer Boxes"],
    materials: ["Rigid Board", "Grey Board", "Art Paper Wrap"],
  },
  {
    industry: "Pharma & Healthcare",
    title: "Clear printed packaging for healthcare products",
    challenge:
      "Healthcare packaging needs clear printing, readable information, reliable structure and professional product presentation.",
    solution:
      "Pharmaceutical boxes can use folding cartons, SBS board, duplex board and clean CMYK printing with proper product information layout.",
    products: ["Pharmaceutical Boxes", "Folding Cartons", "Labels"],
    materials: ["SBS Board", "Duplex Board", "Sticker Stock"],
  },
  {
    industry: "Fashion & Apparel",
    title: "Retail-ready packaging for clothing and fashion brands",
    challenge:
      "Fashion brands need packaging that supports retail identity, gifting experience and professional product delivery.",
    solution:
      "Apparel boxes, paper bags and hang tags can use art paper, kraft paper, art card and premium finishing for stronger brand identity.",
    products: ["Apparel Boxes", "Paper Bags", "Hang Tags"],
    materials: ["Art Paper", "Kraft Paper", "Art Card"],
  },
];

const benefits = [
  "Industry-wise product guidance",
  "Better material selection",
  "Easy quote preparation",
  "Stronger buyer confidence",
];

export default function IndustryCaseStudies() {
  return (
    <section className="bg-white px-5 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.32em] text-[#FF6A00]">
              Industry Use Cases
            </p>

            <h2 className="mt-4 text-4xl font-black leading-tight text-[#07111F] md:text-5xl">
              Packaging solutions planned around real business needs
            </h2>
          </div>

          <p className="text-lg leading-8 text-slate-600">
            Different industries need different packaging materials, printing
            styles and finishing options. These use cases help buyers quickly
            understand which packaging style can fit their product.
          </p>
        </div>

        <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((item) => (
            <div
              key={item}
              className="rounded-[1.5rem] bg-[#F7FAFC] p-5 shadow-sm"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#00C2E8] font-black text-[#07111F]">
                ✓
              </div>
              <p className="font-black text-[#07111F]">{item}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {caseStudies.map((item) => (
            <article
              key={item.industry}
              className="overflow-hidden rounded-[2rem] border border-slate-200 bg-[#F7FAFC] shadow-sm transition hover:-translate-y-1 hover:border-[#00C2E8] hover:bg-white hover:shadow-md"
            >
              <div className="bg-[#07111F] p-6 text-white">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-[#00C2E8]">
                  {item.industry}
                </p>

                <h3 className="mt-3 text-2xl font-black">{item.title}</h3>
              </div>

              <div className="grid gap-5 p-6 md:grid-cols-2">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-[#FF6A00]">
                    Buyer Challenge
                  </p>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.challenge}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-[#00C2E8]">
                    Packaging Solution
                  </p>

                  <p className="mt-3 text-sm font-bold leading-7 text-slate-700">
                    {item.solution}
                  </p>
                </div>
              </div>

              <div className="grid gap-5 border-t border-slate-200 p-6 md:grid-cols-2">
                <div>
                  <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-[#07111F]">
                    Suggested Products
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {item.products.map((product) => (
                      <span
                        key={product}
                        className="rounded-full bg-[#FF6A00]/10 px-3 py-2 text-xs font-black text-[#FF6A00]"
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-[#07111F]">
                    Common Materials
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {item.materials.map((material) => (
                      <span
                        key={material}
                        className="rounded-full bg-[#00C2E8]/10 px-3 py-2 text-xs font-black text-[#007C91]"
                      >
                        {material}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-[2rem] bg-gradient-to-r from-[#00C2E8] to-[#FF6A00] p-8 text-white md:p-10">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.32em]">
                Need Industry-Specific Packaging?
              </p>

              <h3 className="mt-3 text-3xl font-black">
                Tell us your product and business type
              </h3>

              <p className="mt-3 max-w-3xl leading-7">
                Share your product size, quantity, industry, material
                preference and finishing needs. Our team will guide the best
                packaging direction for your brand.
              </p>
            </div>

            <a
              href="/#quote"
              className="inline-flex rounded-full bg-[#07111F] px-8 py-4 font-black text-white transition hover:-translate-y-1 hover:bg-white hover:text-[#07111F]"
            >
              Request Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
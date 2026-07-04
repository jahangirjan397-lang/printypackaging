const boxStyles = [
  {
    name: "Tuck End Boxes",
    description: "Best for retail products, cosmetics, medicines and small packaging.",
    label: "Retail",
  },
  {
    name: "Auto Lock Boxes",
    description: "Strong bottom structure for heavier products and fast assembly.",
    label: "Strong",
  },
  {
    name: "Sleeve Boxes",
    description: "Premium sliding style for luxury products and gift packaging.",
    label: "Luxury",
  },
  {
    name: "Two Piece Boxes",
    description: "Separate lid and base style for premium presentation packaging.",
    label: "Premium",
  },
  {
    name: "Drawer Boxes",
    description: "Elegant pull-out style for gifts, cosmetics and luxury items.",
    label: "Gift",
  },
  {
    name: "Magnetic Boxes",
    description: "High-end rigid packaging with magnetic closure and luxury finish.",
    label: "Rigid",
  },
  {
    name: "Mailer Boxes",
    description: "Perfect for ecommerce shipping, subscription boxes and deliveries.",
    label: "Shipping",
  },
  {
    name: "Window Boxes",
    description: "Clear display window style for food, bakery and retail products.",
    label: "Display",
  },
];

export default function BoxStyles() {
  return (
    <section className="bg-white px-4 py-16 sm:px-5 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#FF6A00] md:text-sm">
            Box Style Library
          </p>

          <h2 className="mt-4 text-3xl font-black leading-tight text-[#07111F] sm:text-4xl md:text-5xl">
            Choose the right packaging style for your product
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600 md:text-lg md:leading-8">
            Explore popular box structures used in custom printed packaging,
            retail boxes, ecommerce mailers and luxury rigid packaging.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-6">
          {boxStyles.map((item, index) => (
            <article
              key={item.name}
              className="group rounded-3xl border border-slate-200 bg-[#F7FAFC] p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#00C2E8]/40 hover:bg-white hover:shadow-xl md:p-6"
            >
              <div className="relative mb-5 h-24 overflow-hidden rounded-2xl bg-gradient-to-br from-[#07111F] via-[#007C91] to-[#00C2E8]">
                <div className="pointer-events-none absolute inset-0 opacity-15 [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:22px_22px]" />

                <div className="absolute bottom-4 left-4 h-14 w-20 rotate-[-7deg] rounded-xl bg-white shadow-xl transition duration-300 group-hover:rotate-[-3deg]" />

                <div className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#07111F]">
                  {item.label}
                </div>

                <div className="absolute bottom-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#FF6A00] text-xs font-black text-white">
                  {index + 1}
                </div>
              </div>

              <h3 className="text-lg font-black text-[#07111F] md:text-xl">
                {item.name}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {item.description}
              </p>

              <a
                href="#quote"
                className="mt-5 inline-flex text-sm font-black text-[#FF6A00] transition hover:text-[#007C91]"
              >
                Request this style &rarr;
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
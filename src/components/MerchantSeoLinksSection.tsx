import Link from "next/link";

const merchantLinks = [
  {
    title: "Custom Packaging",
    href: "/custom-packaging",
    text: "Explore custom printed boxes and packaging solutions.",
  },
  {
    title: "Custom Mailer Boxes",
    href: "/packaging/mailer-boxes",
    text: "Ecommerce-ready mailer boxes for brand shipping.",
  },
  {
    title: "Custom Rigid Boxes",
    href: "/packaging/rigid-boxes",
    text: "Premium rigid boxes for luxury product packaging.",
  },
  {
    title: "Food Packaging",
    href: "/packaging/food-packaging",
    text: "Food boxes, butter paper and wrapping solutions.",
  },
  {
    title: "Packaging Materials",
    href: "/packaging-materials",
    text: "Learn about stock, board, kraft and paper materials.",
  },
  {
    title: "Finishing Options",
    href: "/finishing-options",
    text: "Foil, UV, embossing, lamination and premium finishes.",
  },
];

export default function MerchantSeoLinksSection() {
  return (
    <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-[#FF6A00]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#FF6A00]">
            Packaging Solutions
          </span>

          <h2 className="mt-5 text-3xl font-black tracking-tight text-[#07111F] sm:text-4xl lg:text-5xl">
            Find the right packaging page for your product.
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600">
            These pages help buyers choose box style, material, finishing and
            quote options faster.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {merchantLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_18px_55px_rgba(7,17,31,0.06)] transition hover:-translate-y-1 hover:border-[#FF6A00] hover:shadow-[0_28px_80px_rgba(7,17,31,0.10)]"
            >
              <h3 className="text-xl font-black text-[#07111F]">
                {link.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                {link.text}
              </p>

              <span className="mt-5 inline-flex text-sm font-black text-[#FF6A00]">
                Open page →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

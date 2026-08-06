import Image from "next/image";
import Link from "next/link";

const confidenceVisuals = [
  {
    eyebrow: "Quality & Consistency",
    title: "Production-ready presentation",
    description:
      "See how coordinated boxes, bags and labels can work together as one professional packaging family.",
    image: "/images/home/home-trust-production.webp",
    alt: "Printy Packaging boxes, bags and labels arranged for production review",
    href: "/why-printy-packaging",
    linkText: "Why Choose Printy",
  },
  {
    eyebrow: "Material Guidance",
    title: "Material and finish options",
    description:
      "Compare board, kraft, corrugated stock, foil, embossing and specialty finish directions clearly.",
    image: "/images/home/home-materials-finishes.webp",
    alt: "Packaging materials and finishing samples by Printy Packaging",
    href: "/packaging-materials",
    linkText: "Explore Materials",
  },
  {
    eyebrow: "Production Planning",
    title: "Material and finish review",
    description:
      "Compare material, print and finishing considerations before moving into production.",
    image: "/images/home/home-sample-kit.webp",
    alt: "Packaging material and print samples arranged for production review",
    href: "/sample-kit",
    linkText: "Read Review Guide",
  },
];

export default function PremiumPackagingShowcase() {
  return (
    <section className="bg-white px-4 py-14 sm:px-6 md:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl 2xl:max-w-[1520px]">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.26em] text-[#D95500] md:text-sm">
              Packaging Quality Preview
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-[#07111F] sm:text-4xl lg:text-5xl">
              See packaging quality before you order.
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-7 text-slate-600 md:text-right md:text-base">
            Clear production, material and sample visuals help buyers make faster
            packaging decisions with fewer surprises.
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {confidenceVisuals.map((item) => (
            <article
              key={item.title}
              className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-[#FFFDF9] shadow-[0_16px_50px_rgba(7,17,31,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_25px_75px_rgba(7,17,31,0.13)]"
            >
              <Link
                href={item.href}
                prefetch={false}
                aria-label={item.linkText}
                className="relative block aspect-[4/3] overflow-hidden bg-[#FFFDF9]"
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.025]"
                />
                <span className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#07111F] shadow-sm backdrop-blur">
                  {item.eyebrow}
                </span>
              </Link>

              <div className="p-6 sm:p-7">
                <h3 className="text-xl font-black text-[#07111F] sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.description}
                </p>
                <Link
                  href={item.href}
                  prefetch={false}
                  className="mt-5 inline-flex font-black text-[#D95500] transition hover:text-[#007C91]"
                >
                  {item.linkText} →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

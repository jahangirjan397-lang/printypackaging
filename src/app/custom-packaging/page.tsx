import Link from "next/link";
import { seoKeywordGroups } from "@/data/seoKeywords";

export const metadata = {
  title: "Custom Packaging Boxes | Printy Packaging",
  description:
    "Custom packaging boxes, rigid boxes, mailer boxes, folding cartons, food packaging, paper bags, labels and luxury printed packaging for global brands.",
};

const services = [
  "Custom printed boxes",
  "Rigid boxes",
  "Mailer boxes",
  "Folding cartons",
  "Food packaging",
  "Paper bags",
  "Labels and stickers",
  "Luxury packaging",
];

export default function CustomPackagingPage() {
  return (
    <main className="bg-white">
      <section className="bg-[#07111F] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#00C2E8]">
            Custom Packaging
          </span>

          <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Custom packaging boxes for brands that need premium print,
            finishing and fast quote support.
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
            Printy Packaging helps businesses with custom printed boxes, rigid
            boxes, mailer boxes, folding cartons, food packaging, paper bags,
            labels, stickers and luxury packaging solutions.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/#quote"
              className="inline-flex items-center justify-center rounded-full bg-[#FF6A00] px-6 py-3 text-sm font-black text-white transition hover:bg-[#E85F00]"
            >
              Get Custom Quote
            </Link>

            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-black text-white transition hover:bg-white/15"
            >
              View Products
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div
                key={service}
                className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6"
              >
                <h2 className="text-lg font-black text-[#07111F]">
                  {service}
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Get help with size, material, printing, finishing and quote
                  planning for {service.toLowerCase()}.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-black tracking-tight text-[#07111F] sm:text-4xl">
            Packaging keywords and services we cover
          </h2>

          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
            These topics help buyers find the right packaging solution without
            keyword stuffing. Each term is connected to real packaging services.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {seoKeywordGroups.map((group) => (
              <div
                key={group.title}
                className="rounded-[1.5rem] border border-slate-200 bg-white p-6"
              >
                <h3 className="text-xl font-black text-[#07111F]">
                  {group.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {group.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {group.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-full bg-slate-100 px-3 py-2 text-xs font-bold text-slate-600"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

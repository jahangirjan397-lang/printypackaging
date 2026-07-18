import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Packaging Materials Guide | Paperboard, Kraft, Corrugated & Rigid Board",
  description:
    "Learn about custom packaging materials including paperboard, kraft board, corrugated stock, rigid board, food packaging materials and premium box materials.",
};

const materials = [
  {
    title: "Paperboard",
    text: "Paperboard is commonly used for folding cartons, retail boxes, cosmetic boxes and lightweight product packaging. It is suitable for clean printing and premium finishing.",
  },
  {
    title: "Kraft Board",
    text: "Kraft board gives a natural, eco-friendly and organic packaging look. It is popular for food brands, handmade products, ecommerce packaging and sustainable packaging styles.",
  },
  {
    title: "Corrugated Stock",
    text: "Corrugated material is used for mailer boxes, shipping boxes and ecommerce packaging where strength and protection are important.",
  },
  {
    title: "Rigid Board",
    text: "Rigid board is used for luxury packaging, gift boxes, premium product boxes, magnetic closure boxes and high-end presentation packaging.",
  },
  {
    title: "Food-Safe Materials",
    text: "Food packaging may need food-safe paper, coating, grease resistance, butter paper or suitable board depending on the product and use.",
  },
  {
    title: "Sticker & Label Stock",
    text: "Labels and stickers can use paper stock, vinyl, transparent material, matte finish, gloss finish or special adhesive depending on the branding need.",
  },
];

const guidePoints = [
  "Product weight",
  "Box style",
  "Printing quality",
  "Finishing option",
  "Shipping method",
  "Food-safe requirement",
  "Luxury look",
  "Budget target",
];

export default function PackagingMaterialsPage() {
  return (
    <main className="bg-[#07111F] text-white">
      <section className="relative overflow-hidden border-b border-cyan-400/10 bg-gradient-to-br from-[#07111F] via-[#09243A] to-[#061525]">
        <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
          <div>
            <div className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-400/10 px-5 py-2 text-sm font-black text-cyan-200">
              Packaging Materials Guide
            </div>

            <h1 className="mt-8 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Choose the right material for{" "}
              <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-cyan-300 bg-clip-text text-transparent">
                custom packaging.
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Material selection affects box strength, print quality, finishing,
              shipping protection, food safety and final packaging cost.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/?product=mailer-boxes#quote"
                className="rounded-full bg-[#FF6A00] px-7 py-3 text-center text-sm font-black text-white shadow-xl shadow-orange-500/25 transition hover:bg-[#007C91]"
              >
                Get Material Quote
              </Link>

              <Link
                href="/products"
                className="rounded-full border border-white/15 px-7 py-3 text-center text-sm font-bold text-white transition hover:border-cyan-300 hover:text-cyan-300"
              >
                View Products
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-cyan-400/20 bg-white/[0.04] p-6 shadow-2xl shadow-cyan-950/40">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-300">
              Material Depends On
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight">
              Every packaging project needs the right stock.
            </h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {guidePoints.map((point) => (
                <div
                  key={point}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-bold text-slate-200"
                >
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 text-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#FF6A00]">
              Material Options
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              Common materials used in custom boxes and packaging.
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              The best material depends on your product weight, brand style,
              printing needs, finishing choice and delivery market.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {materials.map((material) => (
              <article
                key={material.title}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-lg shadow-slate-200/60"
              >
                <div className="mb-5 h-11 w-11 rounded-2xl bg-[#FF6A00] shadow-lg shadow-orange-500/20" />
                <h3 className="text-2xl font-black tracking-tight">
                  {material.title}
                </h3>
                <p className="mt-4 leading-8 text-slate-600">
                  {material.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#07111F] px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-[#07111F] via-[#09243A] to-[#061525] p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-300">
                Need help choosing material?
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                Send your product details and we will guide you.
              </h2>

              <p className="mt-4 leading-8 text-slate-300">
                Share product type, size, quantity, box style, printing and
                finish needs for material guidance.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
              <Link
                href="/finishing-options"
                className="rounded-full border border-white/15 px-7 py-3 text-center text-sm font-black text-white transition hover:border-cyan-300 hover:text-cyan-300"
              >
                View Finishes
              </Link>

              <Link
                href="/?product=mailer-boxes#quote"
                className="rounded-full bg-[#FF6A00] px-7 py-3 text-center text-sm font-black text-white shadow-xl shadow-orange-500/25 transition hover:bg-[#007C91]"
              >
                Request Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Packaging Finishing Options | Foil, Embossing, Spot UV & Lamination",
  description:
    "Explore premium packaging finishing options including matte lamination, gloss lamination, soft touch, spot UV, foil stamping, embossing and window patching.",
};

const finishes = [
  {
    title: "Matte Lamination",
    text: "Matte lamination gives packaging a smooth, premium and non-glossy look. It is popular for luxury boxes, cosmetic packaging and retail boxes.",
  },
  {
    title: "Gloss Lamination",
    text: "Gloss lamination creates a shiny surface and helps colors look bright. It is suitable for retail packaging, display boxes and high-impact printed boxes.",
  },
  {
    title: "Soft Touch Finish",
    text: "Soft touch creates a smooth velvet-like premium feel. It is often used for luxury packaging, rigid boxes and high-end brand packaging.",
  },
  {
    title: "Foil Stamping",
    text: "Foil stamping adds metallic shine in gold, silver, copper or custom colors. It is useful for logos, patterns and luxury details.",
  },
  {
    title: "Embossing / Debossing",
    text: "Embossing raises a design above the surface, while debossing presses it into the surface. Both add depth and premium touch.",
  },
  {
    title: "Spot UV",
    text: "Spot UV highlights selected parts of the design with glossy effect. It is used on logos, patterns, product names and luxury packaging areas.",
  },
  {
    title: "Window Patching",
    text: "Window patching adds a transparent film window so customers can see the product inside the box.",
  },
  {
    title: "Special Coatings",
    text: "Special coatings may include varnish, aqueous coating, drip-off effects or protective surface treatments depending on the project.",
  },
];

const selectionTips = [
  "Brand style",
  "Budget range",
  "Product category",
  "Material surface",
  "Printing design",
  "Luxury requirement",
  "Food safety needs",
  "Retail display goal",
];

export default function FinishingOptionsPage() {
  return (
    <main className="bg-[#07111F] text-white">
      <section className="relative overflow-hidden border-b border-cyan-400/10 bg-gradient-to-br from-[#07111F] via-[#09243A] to-[#061525]">
        <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
          <div>
            <div className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-400/10 px-5 py-2 text-sm font-black text-cyan-200">
              Packaging Finishes
            </div>

            <h1 className="mt-8 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Premium finishing options for{" "}
              <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-cyan-300 bg-clip-text text-transparent">
                custom printed boxes.
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Finishing can make packaging look more premium, protect the print
              surface and improve the buyer experience.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/?product=rigid-boxes#quote"
                className="rounded-full bg-[#FF6A00] px-7 py-3 text-center text-sm font-black text-white shadow-xl shadow-orange-500/25 transition hover:bg-[#007C91]"
              >
                Get Finish Quote
              </Link>

              <Link
                href="/packaging-materials"
                className="rounded-full border border-white/15 px-7 py-3 text-center text-sm font-bold text-white transition hover:border-cyan-300 hover:text-cyan-300"
              >
                View Materials
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-cyan-400/20 bg-white/[0.04] p-6">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-300">
              Finish Selection
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight">
              Choose finish based on product and brand feel.
            </h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {selectionTips.map((tip) => (
                <div
                  key={tip}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-bold text-slate-200"
                >
                  {tip}
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
              Premium Options
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              Popular finishes for luxury and retail packaging.
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              Different finishes can be combined depending on artwork, material,
              packaging style and production budget.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {finishes.map((finish) => (
              <article
                key={finish.title}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-lg shadow-slate-200/60"
              >
                <div className="mb-5 h-11 w-11 rounded-2xl bg-[#FF6A00] shadow-lg shadow-orange-500/20" />
                <h3 className="text-xl font-black tracking-tight">
                  {finish.title}
                </h3>
                <p className="mt-4 leading-7 text-slate-600">{finish.text}</p>
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
                Want premium packaging?
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                Ask for foil, embossing, spot UV or lamination options.
              </h2>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
              <Link
                href="/artwork-guide"
                className="rounded-full border border-white/15 px-7 py-3 text-center text-sm font-black text-white transition hover:border-cyan-300 hover:text-cyan-300"
              >
                Artwork Guide
              </Link>

              <Link
                href="/?product=rigid-boxes#quote"
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
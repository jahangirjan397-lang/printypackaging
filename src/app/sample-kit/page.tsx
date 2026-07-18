import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Packaging Sample Kit Guide | Custom Box Samples & Material Review",
  description:
    "Learn how packaging samples help review materials, print quality, finishing, rigid boxes, folding cartons, mailer boxes and custom packaging decisions.",
};

const sampleBenefits = [
  {
    title: "Material Feel",
    text: "Samples help buyers understand paperboard, kraft, corrugated, rigid board and surface texture before final packaging decisions.",
  },
  {
    title: "Print Quality",
    text: "A sample can help review color appearance, artwork placement, logo clarity and printed surface quality.",
  },
  {
    title: "Finish Review",
    text: "Foil, embossing, spot UV, lamination and soft touch finishes are easier to understand when seen physically.",
  },
  {
    title: "Box Structure",
    text: "Samples help test opening style, folding, strength, product fit and overall packaging presentation.",
  },
  {
    title: "Buyer Confidence",
    text: "Samples can help teams make better packaging decisions before moving toward larger production quantities.",
  },
  {
    title: "Brand Presentation",
    text: "A sample can show how premium or practical the final packaging may feel to customers.",
  },
];

const sampleTypes = [
  "Plain structural sample",
  "Printed sample",
  "Material swatch",
  "Finish sample",
  "Rigid box sample",
  "Mailer box sample",
  "Folding carton sample",
  "Food packaging sample",
];

export default function SampleKitPage() {
  return (
    <main className="bg-[#07111F] text-white">
      <section className="relative overflow-hidden border-b border-cyan-400/10 bg-gradient-to-br from-[#07111F] via-[#09243A] to-[#061525]">
        <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
          <div>
            <div className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-400/10 px-5 py-2 text-sm font-black text-cyan-200">
              Packaging Sample Guide
            </div>

            <h1 className="mt-8 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Review samples before{" "}
              <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-cyan-300 bg-clip-text text-transparent">
                final packaging production.
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Packaging samples help buyers understand material, finish,
              structure and presentation before large production planning.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/?product=rigid-boxes#quote"
                className="rounded-full bg-[#FF6A00] px-7 py-3 text-center text-sm font-black text-white shadow-xl shadow-orange-500/25 transition hover:bg-[#007C91]"
              >
                Ask About Samples
              </Link>

              <Link
                href="/artwork-guide"
                className="rounded-full border border-white/15 px-7 py-3 text-center text-sm font-bold text-white transition hover:border-cyan-300 hover:text-cyan-300"
              >
                Artwork Guide
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-cyan-400/20 bg-white/[0.04] p-6">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-300">
              Sample Types
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight">
              Different samples help answer different questions.
            </h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {sampleTypes.map((type) => (
                <div
                  key={type}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-bold text-slate-200"
                >
                  {type}
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
              Why Samples Matter
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              Samples help reduce packaging confusion.
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              Before production, a sample may help review size, structure,
              material, print quality and finishing direction.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sampleBenefits.map((benefit) => (
              <article
                key={benefit.title}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-lg shadow-slate-200/60"
              >
                <div className="mb-5 h-11 w-11 rounded-2xl bg-[#FF6A00] shadow-lg shadow-orange-500/20" />
                <h3 className="text-2xl font-black tracking-tight">
                  {benefit.title}
                </h3>
                <p className="mt-4 leading-8 text-slate-600">
                  {benefit.text}
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
                Planning a packaging project?
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                Share your product and packaging details.
              </h2>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
              <Link
                href="/packaging-materials"
                className="rounded-full border border-white/15 px-7 py-3 text-center text-sm font-black text-white transition hover:border-cyan-300 hover:text-cyan-300"
              >
                Material Guide
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


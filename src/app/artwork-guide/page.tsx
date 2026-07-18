import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Artwork & Dieline Guide | Custom Packaging Print File Checklist",
  description:
    "Learn what artwork details are needed for custom packaging including dieline, bleed, safe area, CMYK, Pantone, barcode, logo, text and final approval.",
};

const checklist = [
  {
    title: "Correct Dieline",
    text: "A dieline shows the final box structure, cut lines, crease lines, bleed area and safe area. It should match the approved box size and style.",
  },
  {
    title: "Bleed Area",
    text: "Artwork should extend beyond the cut line so printing can be trimmed cleanly without white edges.",
  },
  {
    title: "Safe Area",
    text: "Important text, logo, barcode and design elements should stay inside the safe area to avoid trimming or folding issues.",
  },
  {
    title: "CMYK / Pantone",
    text: "Print artwork should use correct color setup. CMYK is common for full color printing, while Pantone may be used for specific brand colors.",
  },
  {
    title: "High Resolution",
    text: "Images and artwork should be high resolution for clean printing. Low quality files can affect final packaging appearance.",
  },
  {
    title: "Barcode Check",
    text: "Barcode size, placement and contrast should be checked before final approval.",
  },
  {
    title: "Text Proofreading",
    text: "Spelling, product details, ingredients, address, claims and legal text should be checked by the customer before production approval.",
  },
  {
    title: "Final Approval",
    text: "Production should move forward only after artwork, size, material, finishing and order details are approved.",
  },
];

const fileTypes = [
  "AI",
  "PDF",
  "EPS",
  "SVG",
  "High-resolution images",
  "Editable source files",
];

export default function ArtworkGuidePage() {
  return (
    <main className="bg-[#07111F] text-white">
      <section className="relative overflow-hidden border-b border-cyan-400/10 bg-gradient-to-br from-[#07111F] via-[#09243A] to-[#061525]">
        <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
          <div>
            <div className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-400/10 px-5 py-2 text-sm font-black text-cyan-200">
              Artwork & Dieline Guide
            </div>

            <h1 className="mt-8 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Prepare print-ready artwork for{" "}
              <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-cyan-300 bg-clip-text text-transparent">
                custom packaging.
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Good artwork preparation helps avoid printing mistakes, cutting
              issues, barcode problems and production delays.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/?product=folding-cartons#quote"
                className="rounded-full bg-[#FF6A00] px-7 py-3 text-center text-sm font-black text-white shadow-xl shadow-orange-500/25 transition hover:bg-[#007C91]"
              >
                Get Artwork Help
              </Link>

              <Link
                href="/finishing-options"
                className="rounded-full border border-white/15 px-7 py-3 text-center text-sm font-bold text-white transition hover:border-cyan-300 hover:text-cyan-300"
              >
                View Finishes
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-cyan-400/20 bg-white/[0.04] p-6">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-300">
              Preferred File Types
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight">
              Send editable or print-ready files where possible.
            </h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {fileTypes.map((type) => (
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
              Print File Checklist
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              Important artwork details before packaging production.
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              Packaging artwork should be checked carefully before final
              approval because printing and die cutting depend on accurate files.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {checklist.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-lg shadow-slate-200/60"
              >
                <div className="mb-5 h-11 w-11 rounded-2xl bg-[#FF6A00] shadow-lg shadow-orange-500/20" />
                <h3 className="text-xl font-black tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-4 leading-7 text-slate-600">{item.text}</p>
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
                Need quote-ready packaging?
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                Send size, quantity, material and artwork status.
              </h2>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
              <Link
                href="/sample-kit"
                className="rounded-full border border-white/15 px-7 py-3 text-center text-sm font-black text-white transition hover:border-cyan-300 hover:text-cyan-300"
              >
                Sample Guide
              </Link>

              <Link
                href="/?product=folding-cartons#quote"
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


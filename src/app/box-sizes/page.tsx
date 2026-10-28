import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import BoxSizePicker from "@/components/BoxSizePicker";
import { boxSizes, sizeLabel, type BoxSize } from "@/data/boxSizes";
import { buildDieline } from "@/lib/dielineGeometry";
import { businessPromises } from "@/data/businessInfo";

const siteUrl = "https://printypackaging.com";
const IN = 25.4;
const BOARD = { card: { name: "SBS card 350 gsm", t: 0.5 }, "e-flute": { name: "E-flute corrugated", t: 1.5 } };

export const metadata: Metadata = {
  title: { absolute: "Box Size Chart & Free Dielines for Popular Box Sizes | Printy" },
  description:
    "Box size chart for mailer, tuck end, auto bottom and bakery boxes: inside size, flat dieline size and what fits, with a free dieline for every size or your own.",
  alternates: { canonical: `${siteUrl}/box-sizes` },
  robots: { index: true, follow: true },
};

function flatSize(b: BoxSize) {
  const dl = buildDieline(b.style, { L: b.L * IN, W: b.W * IN, H: b.H * IN, t: BOARD[b.board].t });
  const [x0, y0, x1, y1] = dl.bbox;
  return { w: x1 - x0, h: y1 - y0 };
}

const tips = [
  ["Measure the product, then add a little room", "Measure length, width and height of the product (or the product set). For a snug fit add about 1/8 in (3 mm) to each side; add more if you use tissue paper or an insert."],
  ["Inside size is what matters", "Every size on this page is the inside size. Board thickness is added on the outside, so a corrugated mailer is a few millimetres larger outside than inside."],
  ["Pick the style for the job", "Mailer boxes travel by post on their own. Tuck end cartons are for retail shelves and lighter products. Auto bottom and snap lock bases hold heavier items. Four corner trays suit bakery and food."],
  ["Use a standard size when you can", "Sizes in this chart nest well on our press sheets, which keeps the price per box down. A custom size is no problem either: add it above and you get the exact dieline straight away."],
];

export default function BoxSizesPage() {
  const groups = [...new Set(boxSizes.map((b) => b.styleName))].map((name) => ({
    name,
    rows: boxSizes.filter((b) => b.styleName === name).map((b) => ({ b, flat: flatSize(b) })),
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tips.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };

  return (
    <main className="bg-slate-50 text-[#07111F]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="mx-auto max-w-6xl px-4 pb-10 pt-10 sm:px-6 lg:px-8">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-[#FF6A00]">Box Size Library</p>
        <h1 className="mt-2 text-3xl font-black sm:text-4xl">Box size chart with a free dieline for every size</h1>
        <p className="mt-3 max-w-3xl text-slate-700">
          Choose a box style and a size, or add your own, and the exact dieline from our own factory rules appears right
          here with its flat size. Download it free, or get a printed price for that size {businessPromises.quoteResponse}.
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold text-slate-700">
          <li>✓ Any size you need, in inches, cm or mm</li>
          <li>✓ Exact 1:1 dielines (PDF, SVG, DXF)</li>
          <li>✓ Price for your size {businessPromises.quoteResponse}</li>
        </ul>
        <div id="picker" className="mt-6 scroll-mt-28">
          <Suspense fallback={<div className="min-h-[24rem] rounded-2xl border border-slate-200 bg-white p-6 font-bold text-slate-500">Loading box sizes…</div>}>
            <BoxSizePicker />
          </Suspense>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <details className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 hover:border-[#07111F]">
            <span>
              <h2 className="text-xl font-black sm:text-2xl">Box size chart</h2>
              <span className="mt-1 block text-sm text-slate-600">Popular sizes with their flat dieline size and what they are used for.</span>
            </span>
            <span className="shrink-0 rounded-full bg-[#07111F] px-4 py-2 text-xs font-black text-white group-open:hidden">See full size chart</span>
            <span className="hidden shrink-0 rounded-full border border-slate-300 px-4 py-2 text-xs font-black group-open:inline">Hide chart</span>
          </summary>
          {groups.map((g) => (
            <div key={g.name} className="mt-8">
              <h3 className="text-lg font-black">{g.name}</h3>
              <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead className="bg-slate-50 text-xs font-black uppercase tracking-wide text-slate-500">
                    <tr>
                      <th scope="col" className="px-4 py-3">Inside size</th>
                      <th scope="col" className="px-4 py-3">Flat dieline size</th>
                      <th scope="col" className="px-4 py-3">Board</th>
                      <th scope="col" className="px-4 py-3">Good for</th>
                      <th scope="col" className="px-4 py-3"><span className="sr-only">Dieline</span></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {g.rows.map(({ b, flat }) => (
                      <tr key={b.slug} className="hover:bg-orange-50/50">
                        <th scope="row" className="whitespace-nowrap px-4 py-3 font-black">
                          {sizeLabel(b)}
                          <span className="block text-xs font-bold text-slate-500">{Math.round(b.L * IN)} x {Math.round(b.W * IN)} x {Math.round(b.H * IN)} mm</span>
                        </th>
                        <td className="whitespace-nowrap px-4 py-3 font-bold">
                          {(flat.w / IN).toFixed(2)} x {(flat.h / IN).toFixed(2)} in
                          <span className="block text-xs text-slate-500">{Math.round(flat.w)} x {Math.round(flat.h)} mm</span>
                        </td>
                        <td className="px-4 py-3 text-slate-600">{BOARD[b.board].name}</td>
                        <td className="px-4 py-3 text-slate-700">{b.fits.join(", ")}</td>
                        <td className="whitespace-nowrap px-4 py-3 text-right">
                          <Link href={`/box-sizes?size=${b.slug}#picker`} scroll={false} className="font-black text-[#007C91] hover:text-[#FF6A00]">
                            View dieline →
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
          </details>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-black sm:text-3xl">How to choose the right box size</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {tips.map(([q, a], i) => (
            <div key={q} className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-black text-[#FF6A00]">0{i + 1}</p>
              <h3 className="mt-1 font-black">{q}</h3>
              <p className="mt-1 text-sm text-slate-700">{a}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl bg-[#07111F] p-6 text-white sm:flex-row sm:items-center">
          <div>
            <p className="text-lg font-black">Not sure which size or style?</p>
            <p className="mt-1 text-sm text-slate-300">Tell us what goes inside and we suggest the size, style and board, with a price {businessPromises.quoteResponse}.</p>
          </div>
          <Link href="/#quote" prefetch={false} className="rounded-full bg-[#FF6A00] px-6 py-3 text-sm font-black text-[#07111F] hover:bg-white">
            Ask for a size suggestion →
          </Link>
        </div>
      </section>
    </main>
  );
}

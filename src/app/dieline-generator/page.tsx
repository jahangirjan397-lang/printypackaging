import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import DielineGenerator from "@/components/DielineGenerator";
import { generatorStyles } from "@/lib/dielineGeometry";

const url = "https://printypackaging.com/dieline-generator";

export const metadata: Metadata = {
  title: { absolute: "Free Box Dieline Generator (PDF & SVG) | Printy Packaging" },
  description:
    "Make a free box dieline in your exact size. Tuck end, mailer, shipping box, tray, sleeve and pillow box templates as 1:1 PDF or SVG in seconds.",
  alternates: { canonical: url },
  openGraph: {
    title: "Free Box Dieline Generator | Printy Packaging",
    description: "Enter your box size and download a 1:1 dieline template as PDF or SVG. Free.",
    url,
    siteName: "Printy Packaging",
    type: "website",
    images: [{ url: "https://printypackaging.com/images/dielines/reverse-tuck-end.webp", width: 523, height: 531, alt: "Reverse tuck end box dieline" }],
  },
  robots: { index: true, follow: true },
};

const faqs = [
  { q: "Is the dieline generator free?", a: "Yes. Pick a box style, enter your inside size and download the dieline as a 1:1 PDF or SVG. There is no cost and no software to install." },
  { q: "Which size should I enter?", a: "Enter the inside size of the box (the space your product needs): length, width and height. The generator adds board thickness, glue flaps and tuck flaps for you." },
  { q: "Can I print from this dieline?", a: "It is a production-style starting template with standard proportions. Before printing, our prepress team checks every dieline against your product, board and print method for free when you order with us." },
  { q: "What do the lines mean?", a: "Solid lines are cut lines and red dashed lines are fold (crease) lines. The light blue area shows where glue goes on auto-bottom boxes." },
  { q: "Which software opens the files?", a: "The PDF and SVG open in Adobe Illustrator, CorelDRAW, Affinity Designer and the free Inkscape. Place your artwork on a layer above the dieline." },
];

export default function DielineGeneratorPage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Free Box Dieline Generator",
      url,
      applicationCategory: "DesignApplication",
      operatingSystem: "Any (web browser)",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      provider: { "@type": "Organization", name: "Printy Packaging", url: "https://printypackaging.com" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://printypackaging.com" },
        { "@type": "ListItem", position: 2, name: "Dieline Library", item: "https://printypackaging.com/dielines" },
        { "@type": "ListItem", position: 3, name: "Dieline Generator", item: url },
      ],
    },
  ];

  return (
    <main className="bg-slate-50 text-[#07111F]">
      {schema.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <section className="bg-gradient-to-br from-[#07111F] via-[#09243A] to-[#061525] text-white">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
          <nav className="text-xs font-bold text-slate-400">
            <Link href="/" className="hover:text-white">Home</Link> / <Link href="/dielines" className="hover:text-white">Dieline Library</Link> / <span className="text-slate-200">Generator</span>
          </nav>
          <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
            Free box dieline generator
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
            Choose a style, enter your inside size and download a 1:1 dieline as PDF or SVG. {generatorStyles.length} popular box styles, ready for your artwork in seconds.
          </p>
        </div>
      </section>

      <section className="mx-auto -mt-6 max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="min-h-[30rem] rounded-[1.5rem] border border-slate-200 bg-white p-8 font-bold text-slate-500 shadow-xl">Loading the dieline generator…</div>}>
          <DielineGenerator />
        </Suspense>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="text-2xl font-black">How to use your dieline</h2>
            <ol className="mt-4 space-y-3 text-slate-700">
              <li><b>1. Measure the product</b>, then add a few millimetres so it slides in easily. Enter that as the inside size.</li>
              <li><b>2. Download</b> the PDF or SVG and open it in Illustrator, CorelDRAW or Inkscape.</li>
              <li><b>3. Place your artwork</b> on a new layer, extending colours 3 mm past the cut line (bleed).</li>
              <li><b>4. Send it to us</b> for a free check and a printing price. We correct the structure for your board before production.</li>
            </ol>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/dielines" className="rounded-full border-2 border-[#07111F] px-6 py-3 text-sm font-black hover:border-[#007C91] hover:text-[#007C91]">See all 50+ box styles</Link>
              <Link href="/dieline-checker" className="rounded-full border-2 border-[#07111F] px-6 py-3 text-sm font-black hover:border-[#007C91] hover:text-[#007C91]">Check your artwork PDF</Link>
              <Link href="/#quote" className="rounded-full bg-[#FF6A00] px-6 py-3 text-sm font-black text-white shadow-lg shadow-orange-500/25 hover:bg-[#007C91]">Get a printing price</Link>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-black">Dieline questions</h2>
            <div className="mt-4 space-y-3">
              {faqs.map((f) => (
                <details key={f.q} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <summary className="cursor-pointer font-black">{f.q}</summary>
                  <p className="mt-2 leading-7 text-slate-600">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

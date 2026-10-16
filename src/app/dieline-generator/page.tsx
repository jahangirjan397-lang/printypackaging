import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import DielineGenerator from "@/components/DielineGenerator";

const url = "https://printypackaging.com/dieline-generator";

export const metadata: Metadata = {
  title: { absolute: "Free Box Dieline Generator (PDF & SVG) | Printy Packaging" },
  description:
    "Make a free box dieline in your exact size: reverse tuck end, straight tuck end or auto bottom, slit lock option, 1:1 PDF, SVG, DXF or PNG with all dimensions and a 3D preview.",
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
  { q: "Which software opens the files?", a: "The PDF and SVG open in Adobe Illustrator, CorelDRAW, Affinity Designer and the free Inkscape. The DXF opens in CAD and cutting-table software, and the PNG is a 300 dpi picture for quick sharing. Place your artwork on a layer above the dieline." },
  { q: "Inside or outside size?", a: "Inside size is the space your product needs, and is what we draw the dieline from. If you only know the outside size of a box, switch to Outside and we take off the board thickness for you." },
];

// the four steps, with small line icons of our own
const steps = [
  { title: "Choose style & size", icon: <><path d="M10 9 17 5l7 4v9l-7 4-7-4Z" /><path d="M10 9l7 4 7-4M17 13v9" /><path d="M5 12v13M3.5 13.5 5 12l1.5 1.5M3.5 23.5 5 25l1.5-1.5" /></> },
  { title: "Download the dieline", icon: <><path d="M4 11h7V5h10v6h7v10h-7v6H11v-6H4Z" strokeDasharray="0" /><path d="M16 12v9M12.5 17.5 16 21l3.5-3.5" /></> },
  { title: "See it in 3D", icon: <><path d="M16 4 26 9.5v11L16 26 6 20.5v-11Z" /><path d="M6 9.5 16 15l10-5.5M16 15v11" /><path d="M11 18.5l3 1.6" /></> },
  { title: "Get a printing price", icon: <><path d="M4 6h3l2.6 12.4a1.6 1.6 0 0 0 1.6 1.3h10a1.6 1.6 0 0 0 1.5-1.1L25 10H9" /><circle cx="12" cy="25" r="1.6" /><circle cx="21" cy="25" r="1.6" /></> },
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
            Choose a style, enter your size and download a 1:1 dieline as PDF, SVG, DXF or PNG. Tuck end and auto bottom boxes drawn to the same rules as our production dielines, ready for your artwork in seconds.
          </p>
          <ol className="mt-8 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
            {steps.map((st, i) => (
              <li key={st.title} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-white text-[#007C91]">
                  <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{st.icon}</svg>
                </span>
                <span className="text-sm font-black leading-tight">
                  <span className="block text-[10px] uppercase tracking-[0.16em] text-cyan-300">Step {i + 1}</span>
                  {st.title}
                </span>
              </li>
            ))}
          </ol>
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

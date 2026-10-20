import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import DielineGenerator from "@/components/DielineGenerator";
import DielineReviews from "@/components/DielineReviews";
import { boxSizes, sizeLabel } from "@/data/boxSizes";
import { generatorStyles } from "@/lib/dielineGeometry";

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

const stats = [
  { k: "Structures", v: String(generatorStyles.length), t: "Tuck ends · auto and snap lock bottoms · four and six corner · mailer" },
  { k: "Exports", v: "4", t: "PDF · SVG · DXF · PNG" },
  { k: "Geometry", v: "1:1", t: "mm, cm or inches, cut & crease layers" },
];

const howTo = [
  { t: "Choose a structure", a: "Pick the box style. Every one is drawn from our own production dielines, so panels, flaps and tucks match what our factory cuts." },
  { t: "Enter the size", a: "Type the inside size your product needs, or the outside size of a box you already have. Switch between mm, cm and inches at any time." },
  { t: "Check and download", a: "Look over the flat layout with every size marked, turn the box in 3D, then download PDF, SVG, DXF or PNG and place your artwork on top." },
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
    <main className="bg-[#FBFAF7] text-[#07111F]">
      {schema.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <section className="mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-6 lg:px-8 lg:pt-14">
        <nav className="text-xs font-bold text-slate-500">
          <Link href="/" className="hover:text-[#07111F]">Home</Link> / <Link href="/dielines" className="hover:text-[#07111F]">Dieline Library</Link> / <span className="text-[#07111F]">Generator</span>
        </nav>
        <div className="mt-6 grid items-end gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h1 className="text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl">Free Box Dieline Generator</h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              Choose a structure, enter your size and download a 1:1 dieline as PDF, SVG, DXF or PNG. Drawn to the same rules as the dielines in our own factory, with every size marked.
            </p>
            <a href="#generator" className="mt-6 inline-block border-b-2 border-[#FF6A00] pb-1 text-sm font-black">Create a free dieline ↓</a>
            <ul className="mt-6 grid gap-x-6 gap-y-2 text-sm font-bold text-slate-700 sm:grid-cols-2">
              {["Printy factory rules", "No account needed", "1:1 scale, cut & crease layers", "3D preview with your logo"].map((t) => (
                <li key={t}><span className="mr-2 text-[#007C91]">✓</span>{t}</li>
              ))}
            </ul>
          </div>
          <dl className="divide-y divide-slate-300 border-y border-slate-300">
            {stats.map((st) => (
              <div key={st.k} className="grid grid-cols-[6rem_4rem_1fr] items-center gap-3 py-4 text-sm">
                <dt className="font-bold text-slate-500">{st.k}</dt>
                <dd className="font-mono text-2xl font-black">{st.v}</dd>
                <dd className="font-bold text-slate-600">{st.t}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-3 pb-14 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="min-h-[30rem] rounded-2xl border border-slate-300 bg-white p-8 font-bold text-slate-500">Loading the dieline generator…</div>}>
          <DielineGenerator />
        </Suspense>
        <DielineReviews />
        <div className="mt-10">
          <h2 className="text-2xl font-black text-[#07111F]">Popular box sizes</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {boxSizes.filter((_, i) => i % 4 === 0).map((b) => (
              <li key={b.slug}>
                <Link href={`/box-sizes?size=${b.slug}`} className="inline-block rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-[#07111F] hover:border-[#07111F]">
                  {b.styleName} {sizeLabel(b)}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm font-bold">
            <Link href="/box-sizes" className="text-[#007C91] hover:text-[#FF6A00]">All box sizes with free dielines →</Link>
          </p>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div>
            <h2 className="text-3xl font-black tracking-tight">How to make a box dieline online</h2>
            <ol className="mt-6 space-y-6">
              {howTo.map((h, i) => (
                <li key={h.t} className="grid grid-cols-[3rem_1fr] gap-3">
                  <span className="font-mono text-2xl font-black text-[#FF6A00]">0{i + 1}</span>
                  <div>
                    <h3 className="font-black">{h.t}</h3>
                    <p className="mt-1 leading-7 text-slate-600">{h.a}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="text-3xl font-black tracking-tight">Dieline questions</h2>
            <div className="mt-6 divide-y divide-slate-200 border-y border-slate-200">
              {faqs.map((f) => (
                <details key={f.q} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-black">
                    {f.q}<span className="text-[#FF6A00] transition group-open:rotate-45">+</span>
                  </summary>
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

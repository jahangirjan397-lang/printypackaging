import type { Metadata } from "next";
import Link from "next/link";
import DielineChecker from "@/components/DielineChecker";

const url = "https://printypackaging.com/dieline-checker";

export const metadata: Metadata = {
  title: { absolute: "Free Packaging Artwork & Dieline Checker | Printy Packaging" },
  description:
    "Check your box artwork PDF before printing: bleed, dieline layer, RGB colour, fonts, text near the cut and image resolution. Free, and your file never leaves your browser.",
  alternates: { canonical: url },
  openGraph: {
    title: "Free Packaging Artwork & Dieline Checker",
    description: "Find print problems in your packaging PDF in seconds. Free.",
    url,
    siteName: "Printy Packaging",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const checks = [
  { t: "Bleed", d: "Artwork should run 3 mm past every cut line so no white edges show after die-cutting." },
  { t: "Dieline layer", d: "Cut and fold lines belong on their own layer in a spot colour (e.g. \"Dieline\"), never printed." },
  { t: "CMYK, not RGB", d: "Screens use RGB; presses use CMYK and Pantone. RGB colours shift when printed." },
  { t: "Fonts", d: "Fonts must be embedded or outlined, or the printer's software swaps them." },
  { t: "Safe area", d: "Keep text and logos 3 mm inside cut and fold lines." },
  { t: "Image resolution", d: "Photos and logos need about 300 ppi at the printed size." },
  { t: "Size", d: "The layout must match the box style and inside size you order." },
];

const faqs = [
  { q: "Is my file uploaded anywhere?", a: "No. The check runs inside your browser. Your PDF is not sent to our server unless you choose to send it with a quote request." },
  { q: "Which files can I check?", a: "PDF files, ideally exported as PDF/X-1a or PDF/X-4 from Illustrator, InDesign, CorelDRAW or Affinity." },
  { q: "Does a green result mean it is ready to print?", a: "It means the common problems were not found. Our prepress team still checks every file by hand before production, free with your order." },
];

export default function DielineCheckerPage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Packaging Artwork & Dieline Checker",
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
  ];

  return (
    <main className="bg-slate-50 text-[#07111F]">
      {schema.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <section className="bg-gradient-to-br from-[#07111F] via-[#09243A] to-[#061525] text-white">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
          <nav className="text-xs font-bold text-slate-400">
            <Link href="/" className="hover:text-white">Home</Link> / <Link href="/dielines" className="hover:text-white">Dieline Library</Link> / <span className="text-slate-200">Checker</span>
          </nav>
          <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">Free packaging artwork checker</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
            Drop in your box artwork PDF and see print problems before they cost you a reprint: bleed, dieline layer, RGB, fonts, safe area and image resolution.
          </p>
        </div>
      </section>

      <section className="mx-auto -mt-6 max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <DielineChecker />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-black">What we check</h2>
            <ul className="mt-4 space-y-3">
              {checks.map((c) => (
                <li key={c.t} className="rounded-2xl border border-slate-200 bg-white p-4"><b>{c.t}.</b> <span className="text-slate-700">{c.d}</span></li>
              ))}
            </ul>
            <p className="mt-6 flex flex-wrap gap-3">
              <Link href="/dieline-generator" className="rounded-full border-2 border-[#07111F] px-6 py-3 text-sm font-black hover:border-[#007C91] hover:text-[#007C91]">Get a free dieline</Link>
              <Link href="/artwork-guide" className="rounded-full border-2 border-[#07111F] px-6 py-3 text-sm font-black hover:border-[#007C91] hover:text-[#007C91]">Artwork guide</Link>
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-black">Questions</h2>
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

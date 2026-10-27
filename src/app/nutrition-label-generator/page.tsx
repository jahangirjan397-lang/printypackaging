import type { Metadata } from "next";
import Link from "next/link";
import NutritionLabelTool from "@/components/NutritionLabelTool";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://printypackaging.com/nutrition-label-generator",
  },
  title: "Free Nutrition Facts Label Generator (FDA & UK/EU)",
  description:
    "Make an FDA Nutrition Facts label or a UK/EU nutrition table in seconds. FDA rounding and % Daily Values done for you. Free PNG and print-ready SVG, no sign-up.",
};

const steps = [
  { title: "Pick your market", text: "USA uses the FDA Nutrition Facts panel. The UK and EU use a nutrition table per 100g." },
  { title: "Type your values", text: "Enter the numbers from your recipe analysis. Rounding and % Daily Values are calculated for you." },
  { title: "Download and print", text: "Get a high-resolution PNG or a vector SVG your designer or printer can use straight away." },
];

const usRules = [
  ["Calories", "Under 5 = 0 · up to 50 to the nearest 5 · above 50 to the nearest 10"],
  ["Total, saturated and trans fat", "Under 0.5g = 0 · under 5g to the nearest 0.5g · 5g and up to the nearest 1g"],
  ["Cholesterol", "Under 2mg = 0 · 2-5mg = \"Less than 5mg\" · above 5mg to the nearest 5mg"],
  ["Sodium and potassium", "Under 5mg = 0 · 5-140mg to the nearest 5mg · above 140mg to the nearest 10mg"],
  ["Carbs, fiber, sugars, protein", "Under 0.5g = 0 · under 1g = \"Less than 1g\" · 1g and up to the nearest 1g"],
];

const faqs = [
  {
    q: "Is this nutrition label generator really free?",
    a: "Yes. You can make as many labels as you like and download the PNG and SVG files without signing up.",
  },
  {
    q: "Does it follow FDA rounding rules?",
    a: "Yes. Calories, fats, cholesterol, sodium, carbohydrates, sugars and protein are rounded with the FDA rules, and % Daily Values use the current FDA reference amounts (for example 78g total fat, 2,300mg sodium, 50g added sugars).",
  },
  {
    q: "What is the difference between the US and UK/EU label?",
    a: "The US label shows values per serving with % Daily Values. The UK/EU table shows values per 100g, with an optional per-portion column and % Reference Intake, and lists salt instead of sodium (salt = sodium × 2.5).",
  },
  {
    q: "Where do I get the nutrition values?",
    a: "From a lab analysis of your product or a nutrition analysis of your recipe (for example with a nutrition database or a food technologist). This tool formats and rounds the numbers, it does not analyse food.",
  },
  {
    q: "Can I print the label on my packaging?",
    a: "Yes. Use the SVG for print: it is vector, so it stays sharp at any size. Printy Packaging can print it on product labels, stickers, food boxes and wrap paper, from 100 pieces.",
  },
];

export default function NutritionLabelPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Free Nutrition Facts Label Generator",
      url: "https://printypackaging.com/nutrition-label-generator",
      applicationCategory: "BusinessApplication",
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
    <main className="bg-[#F7FAFC] text-[#07111F]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 pb-10 pt-12 lg:px-8 lg:pt-16">
          <p className="inline-flex rounded-full border border-[#FF6A00]/40 bg-[#FF6A00]/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-[#FF6A00]">
            Free tool · FDA & UK/EU
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl">
            Nutrition Facts Label Generator
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Make a US FDA Nutrition Facts panel or a UK/EU nutrition table in
            under a minute. Rounding and % Daily Values are done for you, and
            the download is print-ready.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <NutritionLabelTool />
        <p className="mt-6 max-w-4xl text-xs leading-5 text-slate-500">
          This tool formats and rounds the values you enter; it does not analyse food. Check your final label against the current
          FDA (21 CFR 101.9) or UK/EU (Regulation 1169/2011) rules for your product, including serving sizes, allergens and any
          extra nutrients you must declare.
        </p>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">How it works</h2>
          <ol className="mt-8 grid gap-5 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="rounded-3xl border border-slate-200 bg-[#F7FAFC] p-6">
                <span className="text-sm font-black text-[#FF6A00]">Step {i + 1}</span>
                <h3 className="mt-2 text-xl font-black">{s.title}</h3>
                <p className="mt-2 leading-7 text-slate-600">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-2xl font-black tracking-tight">FDA rounding rules we apply</h2>
          <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            {usRules.map(([what, rule]) => (
              <div key={what} className="grid gap-1 border-b border-slate-100 px-5 py-3 last:border-0 sm:grid-cols-[0.8fr_1.2fr]">
                <span className="font-black">{what}</span>
                <span className="text-sm leading-6 text-slate-600">{rule}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-black tracking-tight">UK & EU nutrition tables</h2>
          <p className="mt-5 leading-8 text-slate-600">
            The UK and EU declare energy (kJ and kcal), fat, saturates, carbohydrate, sugars, protein and salt per 100g. You can add a
            per-portion column with % Reference Intake (based on 8400kJ / 2000kcal). Values are rounded with the EU guidance: for
            example fat 10g and over to the nearest gram, under 10g to 0.1g, and salt under 1g to 0.01g.
          </p>
          <h3 className="mt-8 text-xl font-black">Printing tips</h3>
          <ul className="mt-3 space-y-2 leading-7 text-slate-600">
            <li>• Use the SVG for print so the text stays sharp at any size.</li>
            <li>• Keep the label on a plain white or light background for contrast.</li>
            <li>• Leave a few millimetres of space around the panel on the box or label.</li>
            <li>• Small pack? The FDA allows tabular and linear formats; ask us and we&apos;ll set it up.</li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/products/labels-stickers" className="rounded-full bg-[#FF6A00] px-6 py-3 text-sm font-black text-[#07111F] hover:bg-[#007C91] hover:text-white">
              Print custom labels
            </Link>
            <Link href="/products/food-packaging" className="rounded-full border border-slate-300 px-6 py-3 text-sm font-black hover:border-[#07111F]">
              Food packaging
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-5 py-16 lg:px-8">
          <h2 className="text-3xl font-black tracking-tight">Questions</h2>
          <div className="mt-6 space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-slate-200 bg-[#F7FAFC] px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-black">
                  {f.q}
                  <span aria-hidden="true" className="text-xl text-[#FF6A00] transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 leading-7 text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";

const seoBlocks = [
  {
    title: "Custom Size Packaging",
    text: "Custom packaging can be planned around product size, weight, presentation style and shipping needs.",
  },
  {
    title: "Material Selection",
    text: "Material choice affects strength, print quality, finishing result, product protection and final price.",
  },
  {
    title: "Printing & Branding",
    text: "Packaging can support CMYK printing, Pantone colors, logo placement, product text, barcode and retail design.",
  },
  {
    title: "Premium Finishing",
    text: "Finishing options such as lamination, foil, embossing, debossing and spot UV can improve product presentation.",
  },
  {
    title: "Quote Planning",
    text: "A clear quote needs box style, size, quantity, material, printing, finishing, artwork status and delivery country.",
  },
  {
    title: "Buyer Guidance",
    text: "Packaging buyers can use product pages, category pages, market pages and guides to understand options before ordering.",
  },
];

const guideLinks = [
  { label: "Materials Guide", href: "/packaging-materials" },
  { label: "Finishing Guide", href: "/finishing-options" },
  { label: "Artwork Guide", href: "/artwork-guide" },
  { label: "Sample Guide", href: "/sample-kit" },
];

export default function ProductSeoBlocks() {
  return (
    <section className="bg-white text-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#FF6A00]">
              Packaging Planning
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              Important details before ordering custom packaging.
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              Strong product pages need helpful information about size,
              material, printing, finishing, artwork and quote requirements.
              These blocks help buyers understand what matters before sending an
              inquiry.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {guideLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-black text-slate-700 transition hover:border-[#FF6A00] hover:text-[#FF6A00]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {seoBlocks.map((block) => (
              <article
                key={block.title}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-7"
              >
                <div className="mb-5 h-11 w-11 rounded-2xl bg-[#FF6A00] shadow-lg shadow-orange-500/20" />

                <h3 className="text-xl font-black tracking-tight">
                  {block.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">{block.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

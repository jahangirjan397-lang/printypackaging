import Link from "next/link";
import type { StyleGuide } from "@/data/styleGuides";
import { businessPromises } from "@/data/businessInfo";
import { products } from "@/data/products";

function SectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-black uppercase tracking-[0.28em] text-[#FF6A00]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-black tracking-tight text-[#07111F] sm:text-4xl">
        {title}
      </h2>
      {text && <p className="mt-4 leading-7 text-slate-600">{text}</p>}
    </div>
  );
}

export default function StyleGuideSections({ guide }: { guide: StyleGuide }) {
  const lowerName = guide.name.toLowerCase();
  const related = guide.related
    .map((slug) => products.find((product) => product.slug === slug))
    .filter((product): product is (typeof products)[number] => Boolean(product));

  return (
    <div className="bg-white text-[#07111F]">
      {/* Overview */}
      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Buyer guide"
              title={`What are ${lowerName}?`}
            />
            <div className="mt-6 space-y-5 text-lg leading-8 text-slate-600">
              {guide.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </div>

          <aside className="rounded-[2rem] bg-[#07111F] p-7 text-white lg:sticky lg:top-28">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#00C2E8]">
              At a glance
            </p>
            <dl className="mt-5 space-y-4 text-sm">
              {[
                ["Minimum order", businessPromises.minimumOrder],
                ["Production", businessPromises.productionTime],
                ["Quote reply", businessPromises.quoteResponse],
                ["Design", businessPromises.designSupport],
                ["Samples", businessPromises.sampleOffer],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 border-b border-white/10 pb-3">
                  <dt className="text-slate-400">{label}</dt>
                  <dd className="text-right font-black">{value}</dd>
                </div>
              ))}
            </dl>
            <Link
              href={`/?product=${guide.slug}#quote`}
              className="mt-6 block rounded-full bg-[#FF6A00] px-6 py-3 text-center text-sm font-black text-white transition hover:bg-[#007C91]"
            >
              Get {guide.name} pricing
            </Link>
          </aside>
        </div>
      </section>

      {/* Sizes */}
      <section className="bg-[#F7FAFC] px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Size guide"
            title={`Popular sizes for ${lowerName}`}
            text={guide.sizeNote}
          />
          <div className="mt-8 overflow-x-auto rounded-[1.5rem] border border-slate-200 bg-white">
            <table className="w-full min-w-[640px] text-left text-sm">
              <caption className="sr-only">{guide.name} size chart</caption>
              <thead className="bg-[#07111F] text-xs uppercase tracking-[0.14em] text-white">
                <tr>
                  <th scope="col" className="px-5 py-4 font-black">Use</th>
                  <th scope="col" className="px-5 py-4 font-black">Inches (L x W x D)</th>
                  <th scope="col" className="px-5 py-4 font-black">Millimetres</th>
                  <th scope="col" className="px-5 py-4 font-black">Best for</th>
                </tr>
              </thead>
              <tbody>
                {guide.sizes.map((size) => (
                  <tr key={size.name} className="border-t border-slate-100">
                    <th scope="row" className="px-5 py-4 font-black">{size.name}</th>
                    <td className="px-5 py-4 font-bold text-[#007C91]">{size.inches}</td>
                    <td className="px-5 py-4 text-slate-600">{size.mm}</td>
                    <td className="px-5 py-4 text-slate-600">{size.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Boards */}
      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Material"
            title={guide.boardsTitle}
            text="Pick the lightest board that protects your product — it keeps both the box price and the shipping cost down."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {guide.boards.map((board) => (
              <div key={board.name} className="rounded-[1.5rem] border border-slate-200 bg-[#F7FAFC] p-6">
                <p className="text-lg font-black">{board.name}</p>
                <p className="mt-1 text-sm font-black text-[#FF6A00]">{board.spec}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{board.bestFor}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Printing */}
      <section className="bg-[#07111F] px-5 py-16 text-white md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-[#00C2E8]">
            Printing &amp; finishing
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            Printing options for {lowerName}
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {guide.printing.map((item) => (
              <div key={item.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-6">
                <p className="font-black">{item.title}</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost */}
      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading
              eyebrow="Pricing"
              title={`What affects the price of ${lowerName}?`}
            />
            <div className="mt-8 space-y-4">
              {guide.costFactors.map((factor, index) => (
                <div key={factor.title} className="flex gap-4 rounded-[1.5rem] border border-slate-200 p-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FF6A00] text-sm font-black text-white">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-black">{factor.title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{factor.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] bg-[#F7FAFC] p-7 lg:self-start">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#007C91]">
              How to save
            </p>
            <h3 className="mt-3 text-2xl font-black">Ways to lower your cost per box</h3>
            <ul className="mt-5 space-y-3">
              {guide.savingTips.map((tip) => (
                <li key={tip} className="flex gap-3 leading-7 text-slate-700">
                  <span aria-hidden="true" className="font-black text-[#00A6C7]">✓</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Compare */}
      <section className="bg-[#F7FAFC] px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Compare styles"
            title="Is this the right box style?"
          />
          <div className="mt-8 overflow-x-auto rounded-[1.5rem] border border-slate-200 bg-white">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-[#07111F] text-xs uppercase tracking-[0.14em] text-white">
                <tr>
                  <th scope="col" className="px-5 py-4 font-black">Style</th>
                  <th scope="col" className="px-5 py-4 font-black">Choose it if…</th>
                </tr>
              </thead>
              <tbody>
                {guide.compare.map((row) => (
                  <tr key={row.option} className="border-t border-slate-100">
                    <th scope="row" className="px-5 py-4 font-black">{row.option}</th>
                    <td className="px-5 py-4 text-slate-600">{row.chooseIf}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 rounded-[2rem] border border-slate-200 p-7 md:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Quote checklist"
              title="What to send for an accurate quote"
              text={`Send these details and we reply ${businessPromises.quoteResponse} with pricing and a free dieline.`}
            />
            <Link
              href={`/?product=${guide.slug}#quote`}
              className="mt-6 inline-flex rounded-full bg-[#FF6A00] px-7 py-3 text-sm font-black text-white transition hover:bg-[#007C91]"
            >
              Request a quote
            </Link>
          </div>
          <ol className="space-y-3">
            {guide.checklist.map((item, index) => (
              <li key={item} className="flex gap-3 rounded-2xl bg-[#F7FAFC] p-4 text-sm leading-6 text-slate-700">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#07111F] text-xs font-black text-white">
                  {index + 1}
                </span>
                {item}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-[#F7FAFC] px-5 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow="Related styles" title="Compare similar packaging" />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {related.map((product) => (
                <Link
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  className="rounded-[1.5rem] border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-[#FF6A00]"
                >
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#007C91]">
                    {product.category}
                  </p>
                  <p className="mt-2 font-black">{product.name}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{product.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

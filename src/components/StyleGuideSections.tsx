import Link from "next/link";
import type { ReactNode } from "react";
import type { StyleGuide } from "@/data/styleGuides";
import { businessPromises } from "@/data/businessInfo";
import { products } from "@/data/products";

// One collapsible topic of the buyer guide. The text stays in the page (for
// search engines and Ctrl+F) but the page is much shorter to scroll.
export function GuideTopic({
  title,
  children,
  open = false,
}: {
  title: string;
  children: ReactNode;
  open?: boolean;
}) {
  return (
    <details
      open={open}
      className="group rounded-[1.5rem] border border-slate-200 bg-white open:shadow-md"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-5 [&::-webkit-details-marker]:hidden">
        <h3 className="text-lg font-black text-[#07111F] md:text-xl">{title}</h3>
        <span
          aria-hidden="true"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F7FAFC] text-xl font-black text-[#FF6A00] transition group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <div className="border-t border-slate-100 px-5 pb-6 pt-5 md:px-6">{children}</div>
    </details>
  );
}

export default function StyleGuideSections({ guide }: { guide: StyleGuide }) {
  const lowerName = guide.name.toLowerCase();
  const related = guide.related
    .map((slug) => products.find((product) => product.slug === slug))
    .filter((product): product is (typeof products)[number] => Boolean(product));

  return (
    <section className="bg-[#F7FAFC] px-5 py-14 text-[#07111F] md:px-8 md:py-20">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-black uppercase tracking-[0.28em] text-[#FF6A00]">
          Buyer guide
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
          Everything to know about {lowerName}
        </h2>
        <p className="mt-3 max-w-3xl leading-7 text-slate-600">
          Sizes, board, printing and price, in one place. Tap a topic to open it.
        </p>

        <div className="mt-8 space-y-3">
          <GuideTopic title={`What are ${lowerName}?`} open>
            <div className="space-y-4 leading-7 text-slate-600">
              {guide.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </GuideTopic>

          <GuideTopic title={`Popular sizes for ${lowerName}`}>
            {guide.sizeNote && <p className="mb-4 leading-7 text-slate-600">{guide.sizeNote}</p>}
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full min-w-[560px] text-left text-sm">
                <caption className="sr-only">{guide.name} size chart</caption>
                <thead className="bg-[#07111F] text-xs uppercase tracking-[0.12em] text-white">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-black">Use</th>
                    <th scope="col" className="px-4 py-3 font-black">Inches (L x W x D)</th>
                    <th scope="col" className="px-4 py-3 font-black">Millimetres</th>
                    <th scope="col" className="px-4 py-3 font-black">Best for</th>
                  </tr>
                </thead>
                <tbody>
                  {guide.sizes.map((size) => (
                    <tr key={size.name} className="border-t border-slate-100">
                      <th scope="row" className="px-4 py-3 font-black">{size.name}</th>
                      <td className="px-4 py-3 font-bold text-[#007C91]">{size.inches}</td>
                      <td className="px-4 py-3 text-slate-600">{size.mm}</td>
                      <td className="px-4 py-3 text-slate-600">{size.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GuideTopic>

          <GuideTopic title={guide.boardsTitle}>
            <p className="mb-4 leading-7 text-slate-600">
              Pick the lightest board that protects your product — it keeps both the box
              price and the shipping cost down.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {guide.boards.map((board) => (
                <div key={board.name} className="rounded-2xl bg-[#F7FAFC] p-4">
                  <p className="font-black">{board.name}</p>
                  <p className="mt-1 text-sm font-black text-[#FF6A00]">{board.spec}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{board.bestFor}</p>
                </div>
              ))}
            </div>
          </GuideTopic>

          <GuideTopic title={`Printing options for ${lowerName}`}>
            <div className="grid gap-3 sm:grid-cols-2">
              {guide.printing.map((item) => (
                <div key={item.title} className="rounded-2xl bg-[#F7FAFC] p-4">
                  <p className="font-black">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </GuideTopic>

          <GuideTopic title={`What affects the price of ${lowerName}?`}>
            <ol className="space-y-3">
              {guide.costFactors.map((factor, index) => (
                <li key={factor.title} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FF6A00] text-xs font-black text-white">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-black">{factor.title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{factor.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-5 rounded-2xl bg-[#F7FAFC] p-5">
              <p className="font-black">Ways to lower your cost per box</p>
              <ul className="mt-3 space-y-2">
                {guide.savingTips.map((tip) => (
                  <li key={tip} className="flex gap-2 text-sm leading-6 text-slate-700">
                    <span aria-hidden="true" className="font-black text-[#00A6C7]">✓</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </GuideTopic>

          <GuideTopic title="Is this the right box style?">
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead className="bg-[#07111F] text-xs uppercase tracking-[0.12em] text-white">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-black">Style</th>
                    <th scope="col" className="px-4 py-3 font-black">Choose it if…</th>
                  </tr>
                </thead>
                <tbody>
                  {guide.compare.map((row) => (
                    <tr key={row.option} className="border-t border-slate-100">
                      <th scope="row" className="px-4 py-3 font-black">{row.option}</th>
                      <td className="px-4 py-3 text-slate-600">{row.chooseIf}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {related.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="self-center text-sm font-black text-slate-500">Compare:</span>
                {related.map((product) => (
                  <Link
                    key={product.slug}
                    href={`/products/${product.slug}`}
                    prefetch={false}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black transition hover:border-[#FF6A00] hover:text-[#FF6A00]"
                  >
                    {product.name}
                  </Link>
                ))}
              </div>
            )}
          </GuideTopic>

          <GuideTopic title="What to send for an accurate quote">
            <p className="mb-4 leading-7 text-slate-600">
              Send these details and we reply {businessPromises.quoteResponse} with pricing
              and a free dieline.
            </p>
            <ol className="space-y-2">
              {guide.checklist.map((item, index) => (
                <li key={item} className="flex gap-3 rounded-2xl bg-[#F7FAFC] p-3 text-sm leading-6 text-slate-700">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#07111F] text-xs font-black text-white">
                    {index + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
            <a
              href="#product-quote"
              className="mt-5 inline-flex rounded-full bg-[#FF6A00] px-6 py-3 text-sm font-black text-white transition hover:bg-[#007C91]"
            >
              Get {guide.name} pricing
            </a>
          </GuideTopic>
        </div>
      </div>
    </section>
  );
}

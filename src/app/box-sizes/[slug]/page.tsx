import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { boxSizes, getBoxSize, sizeLabel, type BoxSize } from "@/data/boxSizes";
import { buildDieline, dielineToSvg } from "@/lib/dielineGeometry";
import { businessPromises } from "@/data/businessInfo";
import { metaDescription, metaTitle } from "@/lib/seo";
import CustomSizeBox from "@/components/CustomSizeBox";

const siteUrl = "https://printypackaging.com";
const IN = 25.4;
const BOARD = { card: { name: "SBS card 350 gsm", t: 0.5 }, "e-flute": { name: "E-flute corrugated", t: 1.5 } };

type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return boxSizes.map((b) => ({ slug: b.slug }));
}

function facts(b: BoxSize) {
  const board = BOARD[b.board];
  const dl = buildDieline(b.style, { L: b.L * IN, W: b.W * IN, H: b.H * IN, t: board.t });
  const [x0, y0, x1, y1] = dl.bbox;
  const fw = x1 - x0, fh = y1 - y0;
  // how many blanks fit on a 20 x 30 in press sheet (simple grid, best orientation, 5 mm gutters)
  const sw = 30 * IN, sh = 20 * IN, g = 5;
  const fit = (a: number, c: number) => Math.max(0, Math.floor((sw + g) / (a + g))) * Math.max(0, Math.floor((sh + g) / (c + g)));
  const perSheet = Math.max(fit(fw, fh), fit(fh, fw));
  const svg = dielineToSvg(dl, `${b.styleName} ${sizeLabel(b)} dieline`, { preview: true, unit: "in", dims: true, labels: true })
    .replace(/ width="[\d.]+mm" height="[\d.]+mm"/, ' width="100%"');
  return { board, fw, fh, perSheet, svg };
}

const inch = (mm: number) => (mm / IN).toFixed(2);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const b = getBoxSize(slug);
  if (!b) return { title: "Size not found", robots: { index: false, follow: false } };
  const url = `${siteUrl}/box-sizes/${b.slug}`;
  const title = metaTitle(`${b.styleName} ${sizeLabel(b)}: Free Dieline & Price | Printy`, `${b.styleName} ${sizeLabel(b)} Dieline | Printy`);
  const description = metaDescription(
    `${sizeLabel(b)} ${b.styleName.toLowerCase()} for ${b.fits[0]}: free exact dieline (PDF, SVG, DXF), flat size and a printed price ${businessPromises.quoteResponse}.`,
    155,
  );
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: "Printy Packaging", type: "article" },
    robots: { index: true, follow: true },
  };
}

export default async function BoxSizePage({ params }: PageProps) {
  const { slug } = await params;
  const b = getBoxSize(slug);
  if (!b) notFound();
  const { board, fw, fh, perSheet, svg } = facts(b);
  const url = `${siteUrl}/box-sizes/${b.slug}`;
  const mm = (x: number) => Math.round(x * IN);
  const generatorHref = `/dieline-generator?${new URLSearchParams({ style: b.style, L: (b.L * IN).toFixed(2), W: (b.W * IN).toFixed(2), H: (b.H * IN).toFixed(2), board: b.board, unit: "in" })}`;
  const quoteHref = `/?${new URLSearchParams({ product: b.product, L: String(b.L), W: String(b.W), H: String(b.H), unit: "in", note: `${b.styleName} ${sizeLabel(b)} (from the box size library)` })}#quote`;
  const related = boxSizes.filter((x) => x.style === b.style && x.slug !== b.slug).slice(0, 8);
  const flat = `${inch(fw)} x ${inch(fh)} in (${Math.round(fw)} x ${Math.round(fh)} mm)`;

  const faqs = [
    {
      q: `What is the flat size of a ${sizeLabel(b)} ${b.styleName.toLowerCase()} dieline?`,
      a: `Opened flat, the ${b.styleName.toLowerCase()} for an inside size of ${sizeLabel(b)} measures ${flat} on our ${board.name} rules, including glue flap and tucks.`,
    },
    ...(b.board === "card" ? [{
      q: `How many ${sizeLabel(b)} boxes fit on one press sheet?`,
      a: perSheet > 0
        ? `About ${perSheet} per 20 x 30 in sheet in a simple grid. Our estimator nests the blanks more tightly when it prices your order, so the real number can be higher.`
        : `This box is larger than a 20 x 30 in sheet, so it is printed on a bigger sheet. We plan this for you when we price it.`,
    }] : []),
    {
      q: `What material do you use for a ${sizeLabel(b)} ${b.styleName.toLowerCase()}?`,
      a: b.board === "e-flute"
        ? `Usually E-flute corrugated board (about 1.5 mm), printed in full colour, which is strong enough for shipping. Kraft, white and black boards are all available.`
        : `Usually SBS (bleach) card around 350 gsm, printed in full colour with a matte or gloss finish. Kraft card and thicker boards are available.`,
    },
    {
      q: `How quickly can I get a price for this size?`,
      a: `Send the quantity through the quote form and you will have your price ${businessPromises.quoteResponse}, shipping included.`,
    },
  ];

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Box Sizes", item: `${siteUrl}/box-sizes` },
        { "@type": "ListItem", position: 3, name: `${b.styleName} ${sizeLabel(b)}`, item: url },
      ],
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
      <section className="mx-auto max-w-6xl px-4 pb-6 pt-8 sm:px-6 lg:px-8">
        <nav className="text-xs font-bold text-slate-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#007C91]">Home</Link> /{" "}
          <Link href="/box-sizes" className="hover:text-[#007C91]">Box Sizes</Link> / <span>{sizeLabel(b)}</span>
        </nav>
        <h1 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">Custom {b.styleName} {sizeLabel(b)}</h1>
        <p className="mt-3 max-w-3xl text-slate-700">
          A {sizeLabel(b)} {b.styleName.toLowerCase()} (inside size) suits {b.fits.join(", ")}. Below is the exact dieline
          from our own factory rules, its flat size, and a quote link that opens with this size already filled in.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href={quoteHref} prefetch={false} className="rounded-full bg-[#FF6A00] px-6 py-3 text-sm font-black text-[#07111F] hover:bg-[#007C91] hover:text-white">
            Get the price for this size →
          </Link>
          <Link href={generatorHref} prefetch={false} className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-black hover:border-[#07111F]">
            Download the free dieline (PDF, SVG, DXF)
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 pb-10 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:px-8">
        <figure className="rounded-2xl border border-slate-200 bg-white p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`}
            alt={`${b.styleName} ${sizeLabel(b)} dieline with cut and crease lines`}
            className="h-auto w-full"
          />
          <figcaption className="mt-2 text-xs font-bold text-slate-500">Solid lines are cuts, dashed lines are folds. Open it in the generator to download at 1:1.</figcaption>
        </figure>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-black">Size facts</h2>
          <dl className="mt-3 divide-y divide-slate-100 text-sm">
            {[
              ["Style", b.styleName],
              ["Inside size", `${sizeLabel(b)} (${mm(b.L)} x ${mm(b.W)} x ${mm(b.H)} mm)`],
              ["Flat dieline size", flat],
              ["Board", board.name],
              ...(b.board === "card" ? [["Per 20 x 30 in sheet", perSheet > 0 ? `about ${perSheet}` : "needs a larger sheet"]] : []),
              ["Good for", b.fits.join(", ")],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-2">
                <dt className="font-bold text-slate-500">{k}</dt>
                <dd className="text-right font-bold">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs font-bold text-slate-500">
            Have your design? Send the open file and we fit your full artwork on this dieline, then send a proof to approve.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
        <CustomSizeBox defaultStyle={b.style} title={`Not quite ${sizeLabel(b)}? Make the dieline in your own size`} />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-black">Questions about this size</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {faqs.map((f) => (
            <div key={f.q} className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="text-sm font-black">{f.q}</h3>
              <p className="mt-1 text-sm text-slate-700">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black">Other {b.styleName.toLowerCase()} sizes</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/box-sizes/${r.slug}`} className="inline-block rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-bold hover:border-[#07111F]">
                  {sizeLabel(r)}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm font-bold">
            <Link href="/box-sizes" className="text-[#007C91] hover:text-[#FF6A00]">See all box sizes →</Link>
          </p>
        </section>
      )}
    </main>
  );
}

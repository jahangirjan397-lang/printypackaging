import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductQuickQuote from "@/components/ProductQuickQuote";
import { dielines, getCategoryName, getDielineBySlug } from "@/data/dielines";
import { getProductBySlug } from "@/data/products";
import { metaDescription, metaTitle } from "@/lib/seo";

const siteUrl = "https://printypackaging.com";

type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return dielines.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const d = getDielineBySlug(slug);
  if (!d) return { title: "Dieline not found", robots: { index: false, follow: false } };
  const url = `${siteUrl}/dielines/${d.slug}`;
  const title = metaTitle(`${d.name} Dieline Template (Free) | Printy Packaging`, `${d.name} Dieline Template | Printy`);
  const description = metaDescription(`${d.name} dieline: ${d.summary}`, 155, "Get it free in your size.");
  const image = { url: `${siteUrl}/images/dielines/${d.slug}.webp`, width: d.image.w, height: d.image.h, alt: `${d.name} dieline` };
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: "Printy Packaging", type: "article", images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
    robots: { index: true, follow: true },
  };
}

export default async function DielinePage({ params }: PageProps) {
  const { slug } = await params;
  const d = getDielineBySlug(slug);
  if (!d) notFound();

  const product = d.product ? getProductBySlug(d.product) : undefined;
  const related = dielines.filter((x) => x.category === d.category && x.slug !== d.slug).slice(0, 4);
  const url = `${siteUrl}/dielines/${d.slug}`;

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "ImageObject",
      name: `${d.name} dieline template`,
      description: d.summary,
      contentUrl: `${siteUrl}/images/dielines/${d.slug}.webp`,
      width: d.image.w,
      height: d.image.h,
      creator: { "@type": "Organization", name: "Printy Packaging" },
      license: `${siteUrl}/terms`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Dieline Library", item: `${siteUrl}/dielines` },
        { "@type": "ListItem", position: 3, name: d.name, item: url },
      ],
    },
  ];

  const facts = [
    { k: "Closure", v: d.closure },
    { k: "Typical material", v: d.material },
    { k: "Category", v: getCategoryName(d.category) },
  ];

  return (
    <main className="bg-slate-50 text-[#07111F]">
      {schema.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <section className="bg-gradient-to-br from-[#07111F] via-[#09243A] to-[#061525] text-white">
        <div className="mx-auto max-w-7xl px-6 pb-10 pt-12 lg:px-8">
          <nav className="text-xs font-bold text-slate-400">
            <Link href="/" className="hover:text-white">Home</Link> / <Link href="/dielines" className="hover:text-white">Dieline Library</Link> / <span className="text-slate-200">{d.name}</span>
          </nav>
          <h1 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">{d.name} dieline</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">{d.summary}</p>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
        <div>
          <figure className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60">
            <div className="flex items-center justify-center rounded-2xl bg-[repeating-linear-gradient(0deg,#f8fafc,#f8fafc_19px,#eef2f6_20px),repeating-linear-gradient(90deg,transparent,transparent_19px,#eef2f6_20px)] p-4">
              <Image src={`/images/dielines/${d.slug}.webp`} alt={`${d.name} dieline template showing cut and fold lines`} width={d.image.w} height={d.image.h} priority sizes="(max-width: 1024px) 92vw, 640px" className="h-auto max-h-[34rem] w-auto" />
            </div>
            <figcaption className="mt-3 text-sm font-bold text-slate-500">{d.name} flat layout. Panels, flaps and glue areas shown in standard proportions.</figcaption>
          </figure>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {facts.map((f) => (
              <div key={f.k} className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#007C91]">{f.k}</p>
                <p className="mt-1 font-bold">{f.v}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-black">Best for</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {d.bestFor.map((b) => (
                <li key={b} className="flex gap-2 text-slate-700"><span className="text-[#FF6A00]">✓</span>{b}</li>
              ))}
            </ul>
            <h2 className="mt-6 text-xl font-black">Packaging tip</h2>
            <p className="mt-2 leading-7 text-slate-700">{d.tip}</p>
            {product && (
              <p className="mt-4">
                <Link href={`/products/${product.slug}`} className="font-black text-[#007C91] hover:text-[#FF6A00]">See printed {product.name.toLowerCase()} →</Link>
              </p>
            )}
          </div>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          {d.generator ? (
            <div className="rounded-[1.5rem] bg-[#07111F] p-6 text-white shadow-xl">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">Instant · Free</p>
              <h2 className="mt-2 text-2xl font-black">Make this dieline in your size</h2>
              <p className="mt-2 text-slate-300">Enter length, width and height and download a 1:1 PDF or SVG in seconds.</p>
              <Link href={`/dieline-generator?style=${d.generator}`} className="mt-5 inline-block rounded-full bg-[#FF6A00] px-6 py-3 text-sm font-black text-white shadow-lg shadow-orange-500/25 hover:bg-[#007C91]">
                Open generator →
              </Link>
            </div>
          ) : (
            <div className="rounded-[1.5rem] bg-[#07111F] p-6 text-white shadow-xl">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">Free with every quote</p>
              <h2 className="mt-2 text-2xl font-black">Get this dieline in your size</h2>
              <p className="mt-2 text-slate-300">Tell us your product size below. Our designer draws the {d.name.toLowerCase()} dieline to fit and sends it with your price.</p>
            </div>
          )}
          <ProductQuickQuote
            productName={`${d.name} (dieline + printing)`}
            productSlug={d.product ?? ""}
            heading={`Price & free dieline: ${d.name.toLowerCase()}`}
            formName="dieline_quick_quote"
          />
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-14 lg:px-8">
          <h2 className="text-2xl font-black">Related box styles</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <Link key={r.slug} href={`/dielines/${r.slug}`} className="group rounded-3xl border border-slate-200 bg-white p-4 transition hover:-translate-y-1 hover:border-[#FF6A00]">
                <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-slate-50 p-3">
                  <Image src={`/images/dielines/${r.slug}.webp`} alt={`${r.name} dieline`} width={r.image.w} height={r.image.h} sizes="280px" className="max-h-full w-auto object-contain" />
                </div>
                <h3 className="mt-3 font-black group-hover:text-[#FF6A00]">{r.name}</h3>
              </Link>
            ))}
          </div>
          <p className="mt-6"><Link href="/dielines" className="font-black text-[#007C91] hover:text-[#FF6A00]">← All box dielines</Link></p>
        </section>
      )}
    </main>
  );
}

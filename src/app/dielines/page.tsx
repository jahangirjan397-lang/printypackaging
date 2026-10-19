import type { Metadata } from "next";
import Link from "next/link";
import { dielineCategories, dielineCount, dielines } from "@/data/dielines";
import DielineVisual from "@/components/DielineVisual";

const url = "https://printypackaging.com/dielines";

// real dielines (drawn by our generator) for the top of the page
const heroDielines = dielines.filter((d) => d.gen && !d.addedAt).slice(0, 4);

export const metadata: Metadata = {
  title: { absolute: `Box Dieline Library: ${dielineCount} Free Templates | Printy Packaging` },
  description:
    "Browse 50+ box dielines: tuck ends, mailers, trays, displays, rigid, magnetic and food boxes. Get any style in your size free, or make one with our generator.",
  alternates: { canonical: url },
  openGraph: {
    title: "Box Dieline Library | Printy Packaging",
    description: "50+ packaging structures with dieline drawings. Free dieline in your size.",
    url,
    siteName: "Printy Packaging",
    type: "website",
    images: [{ url: "https://printypackaging.com/images/dielines/roll-end-mailer-box.webp", width: 753, height: 975, alt: "Mailer box dieline" }],
  },
  robots: { index: true, follow: true },
};

export default function DielinesPage() {
  const latest = dielines.filter((d) => d.addedAt).slice(0, 8);
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Box Dieline Library",
      url,
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: dielineCount,
        itemListElement: dielines.map((d, i) => ({ "@type": "ListItem", position: i + 1, name: `${d.name} dieline`, url: `${url}/${d.slug}` })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://printypackaging.com" },
        { "@type": "ListItem", position: 2, name: "Dieline Library", item: url },
      ],
    },
  ];

  return (
    <main className="bg-slate-50 text-[#07111F]">
      {schema.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <section className="bg-gradient-to-br from-[#07111F] via-[#09243A] to-[#061525] text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8">
          <div>
            <div className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-1.5 text-sm font-black text-cyan-200">
              Dieline Library
            </div>
            <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl">
              {dielineCount} box dielines,{" "}
              <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-cyan-300 bg-clip-text text-transparent">free in your size.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Every structure our team draws: tuck ends, mailers, trays, displays, rigid and magnetic boxes, food packs and more. Pick a style, see how it folds, and get the dieline in your exact size.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/dieline-generator" className="rounded-full bg-[#FF6A00] px-7 py-3 text-center text-sm font-black text-[#07111F] shadow-xl shadow-orange-500/25 hover:bg-[#007C91] hover:text-white">
                Open the free dieline generator
              </Link>
              <Link href="/#quote" className="rounded-full border border-white/20 px-7 py-3 text-center text-sm font-black hover:border-cyan-300 hover:text-cyan-300">
                Get a printing price
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {heroDielines.map((d) => (
              <Link key={d.slug} href={`/dielines/${d.slug}`} className="flex aspect-square flex-col rounded-2xl bg-white p-3 transition hover:ring-2 hover:ring-[#FF6A00]">
                <div className="flex flex-1 items-center justify-center overflow-hidden"><DielineVisual d={d} /></div>
                <p className="mt-1 truncate text-center text-[11px] font-black text-[#07111F]">{d.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <nav aria-label="Dieline categories" className="sticky top-16 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 py-3 lg:px-8">
          {dielineCategories.map((c) => (
            <a key={c.id} href={`#${c.id}`} className="whitespace-nowrap rounded-full border border-slate-200 px-4 py-1.5 text-sm font-black text-slate-700 hover:border-[#FF6A00] hover:text-[#FF6A00]">
              {c.name}
            </a>
          ))}
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {latest.length > 0 && (
          <section id="new" className="scroll-mt-32 pb-12">
            <h2 className="text-2xl font-black sm:text-3xl">Newly added</h2>
            <p className="mt-2 text-slate-600">Fresh structures from our design team.</p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {latest.map((d) => (
                <Link key={d.slug} href={`/dielines/${d.slug}`} className="group rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-[#FF6A00] hover:shadow-lg">
                  <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl bg-slate-50 p-3">
                    <DielineVisual d={d} />
                  </div>
                  <h3 className="mt-4 font-black leading-tight group-hover:text-[#FF6A00]">{d.name}</h3>
                  <p className="mt-2 inline-block rounded-full bg-cyan-50 px-2.5 py-0.5 text-xs font-black text-[#007C91]">New</p>
                </Link>
              ))}
            </div>
          </section>
        )}
        {dielineCategories.map((c) => {
          const all = dielines.filter((d) => d.category === c.id);
          if (!all.length) return null;
          // real dielines in the grid; styles not drawn yet are listed below it
          const items = all.filter((d) => d.gen || d.file || d.src);
          const later = all.filter((d) => !(d.gen || d.file || d.src));
          return (
            <section key={c.id} id={c.id} className="scroll-mt-32 pb-12">
              <h2 className="text-2xl font-black sm:text-3xl">{c.name}</h2>
              <p className="mt-2 text-slate-600">{c.text}</p>
              {items.length > 0 && (
                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {items.map((d) => (
                    <Link key={d.slug} href={`/dielines/${d.slug}`} className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:border-[#07111F] hover:shadow-lg">
                      <div className="flex aspect-[4/3] items-center justify-center border-b border-slate-100 bg-white p-5">
                        <DielineVisual d={d} />
                      </div>
                      <div className="flex flex-1 flex-col p-4">
                        <h3 className="font-black leading-tight group-hover:text-[#FF6A00]">{d.name}</h3>
                        {d.gen && <p className="mt-1 font-mono text-xs text-slate-500">{d.gen.L} × {d.gen.W} × {d.gen.H} mm · any size</p>}
                        <p className="mt-auto pt-3 text-[11px] font-black uppercase tracking-wider text-[#007C91]">{d.gen ? "PDF · SVG · DXF" : d.file ? "PDF" : "Dieline"}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
              {later.length > 0 && (
                <div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-white px-4 py-3">
                  <p className="text-xs font-black uppercase tracking-wider text-slate-500">Also drawn to your size, free with your quote</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {later.map((d) => (
                      <Link key={d.slug} href={`/dielines/${d.slug}`} className="rounded-full border border-slate-200 px-3 py-1 text-sm font-bold text-slate-700 hover:border-[#FF6A00] hover:text-[#FF6A00]">{d.name}</Link>
                    ))}
                  </div>
                </div>
              )}
            </section>
          );
        })}
      </div>

      <section className="bg-[#07111F] px-6 py-14 text-white lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-3xl font-black">Need a style that is not here?</h2>
            <p className="mt-2 max-w-2xl text-slate-300">Send us a photo of the box or your product size. We draw a custom dieline for free with every quote.</p>
          </div>
          <Link href="/#quote" className="rounded-full bg-[#FF6A00] px-7 py-3 text-center text-sm font-black text-[#07111F] shadow-xl shadow-orange-500/25 hover:bg-[#007C91] hover:text-white">
            Request a custom dieline
          </Link>
        </div>
      </section>
    </main>
  );
}

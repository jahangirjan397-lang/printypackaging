import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/stories/Reveal";
import StoryVideo from "@/components/stories/StoryVideo";
import ProductQuickQuote from "@/components/ProductQuickQuote";
import { getClientStories, getClientStory, youtubeId } from "@/data/clientStories";

const siteUrl = "https://printypackaging.com";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getClientStories().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getClientStory(slug);
  if (!s) return {};
  const title = `${s.brand}: ${s.product} | Client Story`;
  return {
    title: title.length <= 60 ? title : `${s.brand} | Client Story`,
    description: s.summary.slice(0, 158),
    alternates: { canonical: `${siteUrl}/client-stories/${s.slug}` },
    robots: s.demo ? { index: false, follow: false } : undefined,
    openGraph: { title, description: s.summary.slice(0, 158), url: `${siteUrl}/client-stories/${s.slug}`, images: [s.poster] },
  };
}

export default async function ClientStoryPage({ params }: Props) {
  const { slug } = await params;
  const s = getClientStory(slug);
  if (!s) notFound();

  const yt = youtubeId(s.videoUrl);
  const mp4 = !yt && s.videoUrl ? s.videoUrl : undefined;
  const others = getClientStories().filter((o) => o.slug !== s.slug).slice(0, 3);

  // Structured data: the video, the Q&A and the breadcrumb. No prices, no ratings.
  const jsonLd = [
    s.videoUrl
      ? {
          "@context": "https://schema.org",
          "@type": "VideoObject",
          name: `${s.brand} unboxing their ${s.product.toLowerCase()}`,
          description: s.summary,
          thumbnailUrl: [`${siteUrl}${s.poster}`],
          uploadDate: s.publishedAt,
          ...(yt ? { embedUrl: `https://www.youtube.com/embed/${yt}` } : { contentUrl: `${siteUrl}${mp4}` }),
        }
      : null,
    s.questions.length
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: s.questions.map((q) => ({ "@type": "Question", name: q.question, acceptedAnswer: { "@type": "Answer", text: q.answer } })),
        }
      : null,
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Client Stories", item: `${siteUrl}/client-stories` },
        { "@type": "ListItem", position: 3, name: s.brand, item: `${siteUrl}/client-stories/${s.slug}` },
      ],
    },
  ].filter(Boolean);

  return (
    <main className="overflow-hidden bg-[#F7F4EF] text-[#07111F]">
      {!s.demo && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}

      {/* ---------- hero: video + headline ---------- */}
      <section className="relative isolate bg-[#07111F] px-5 pb-24 pt-14 text-white md:px-8 md:pb-32 md:pt-20">
        <div className="cs-blob absolute -left-40 top-20 -z-10 h-[32rem] w-[32rem] rounded-full bg-[#FF6A00]/25 blur-3xl" />
        <div className="cs-blob absolute -right-32 -top-20 -z-10 h-[28rem] w-[28rem] rounded-full bg-[#00C2E8]/20 blur-3xl [animation-delay:-7s]" />

        <div className="mx-auto max-w-7xl">
          <nav className="text-xs font-bold text-slate-400" aria-label="Breadcrumb">
            <Link href="/client-stories" className="hover:text-white">Client stories</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-200">{s.brand}</span>
          </nav>
          {s.demo && (
            <p className="mt-4 inline-block rounded bg-yellow-300 px-3 py-1 text-xs font-black text-black">
              DESIGN PREVIEW — sample text, shown on localhost only, never on the live site
            </p>
          )}

          <div className="mt-10 grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal className="order-2 lg:order-1">
              <StoryVideo youtube={yt} videoUrl={mp4} poster={s.poster} posterAlt={s.posterAlt} title={`${s.brand} unboxing`} priority />
            </Reveal>

            <Reveal delay={120} className="order-1 lg:order-2">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#FFB27A]">{[s.industry, s.location].filter(Boolean).join(" · ")}</p>
              <h1 className="mt-4 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">{s.brand}</h1>
              <p className="mt-5 text-xl font-bold leading-8 text-slate-200">{s.headline}</p>
              <p className="mt-4 max-w-2xl leading-8 text-slate-400">{s.summary}</p>

              {s.quote && (
                <figure className="relative mt-9 rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur">
                  <span className="absolute -top-6 left-6 text-7xl font-black leading-none text-[#FF6A00]" aria-hidden="true">“</span>
                  <blockquote className="text-lg font-bold leading-8">{s.quote}</blockquote>
                  {s.person && <figcaption className="mt-3 text-sm font-bold text-[#FFB27A]">— {s.person}</figcaption>}
                </figure>
              )}

              <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {s.specs.map((sp, i) => (
                  <Reveal key={sp.label} delay={200 + i * 90} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <dt className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">{sp.label}</dt>
                    <dd className="mt-1 text-sm font-black">{sp.value}</dd>
                  </Reveal>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- challenge / solution ---------- */}
      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          <Reveal className="rounded-[2rem] bg-white p-9 shadow-[0_20px_50px_rgba(7,17,31,0.06)]">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#007C91]">What they needed</p>
            <p className="mt-4 text-lg leading-8 text-slate-700">{s.challenge}</p>
          </Reveal>
          <Reveal delay={150} className="rounded-[2rem] bg-[#FF6A00] p-9 text-[#07111F]">
            <p className="text-sm font-black uppercase tracking-[0.25em]">What we made</p>
            <p className="mt-4 text-lg font-bold leading-8">{s.solution}</p>
            {s.productSlug && (
              <Link href={`/products/${s.productSlug}`} className="mt-6 inline-block text-sm font-black underline decoration-2 underline-offset-4">
                See {s.product} →
              </Link>
            )}
          </Reveal>
        </div>
      </section>

      {/* ---------- timeline ---------- */}
      {s.steps.length > 0 && (
        <section className="bg-white px-5 py-20 md:px-8 md:py-24">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <p className="text-sm font-black uppercase tracking-[0.3em] text-[#007C91]">How it went</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">From first message to their door</h2>
            </Reveal>
            <Reveal className="relative mt-14">
              <div className="absolute left-0 right-0 top-6 hidden h-1 rounded-full bg-slate-100 md:block" />
              <div className="cs-line absolute left-0 right-0 top-6 hidden h-1 rounded-full bg-gradient-to-r from-[#FF6A00] to-[#00C2E8] md:block" />
              <ol className="relative grid gap-8 md:grid-cols-5">
                {s.steps.map((st, i) => (
                  <li key={st.label} className="relative pl-16 md:pl-0">
                    <span className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-[#07111F] text-sm font-black text-white shadow-lg md:relative">
                      {i + 1}
                    </span>
                    <p className="mt-0 text-lg font-black md:mt-5">{st.label}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{st.detail}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>
      )}

      {/* ---------- gallery ---------- */}
      {s.gallery && s.gallery.length > 0 && (
        <section className="px-5 py-20 md:px-8">
          <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {s.gallery.map((g, i) => (
              <Reveal key={g.src} delay={i * 100} className="cs-card relative aspect-square overflow-hidden rounded-[1.6rem]">
                <Image src={g.src} alt={g.alt} fill sizes="(min-width:1024px) 33vw, 50vw" className="cs-card-img object-cover" />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ---------- Q&A ---------- */}
      {s.questions.length > 0 && (
        <section className="px-5 py-20 md:px-8 md:py-24">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <p className="text-sm font-black uppercase tracking-[0.3em] text-[#007C91]">Questions they asked</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">The real conversation, in short</h2>
            </Reveal>
            <div className="mt-10 space-y-3">
              {s.questions.map((q, i) => (
                <Reveal key={q.question} delay={i * 80}>
                  <details className="cs-qa group rounded-2xl bg-white p-6 shadow-[0_10px_30px_rgba(7,17,31,0.05)]">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-black">
                      {q.question}
                      <span className="cs-qa-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FF6A00]/10 text-xl text-[#FF6A00] transition">+</span>
                    </summary>
                    <p className="cs-qa-body mt-3 leading-7 text-slate-600">{q.answer}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- quote form ---------- */}
      <section id="product-quote" className="scroll-mt-24 bg-[#07111F] px-5 py-20 text-white md:px-8 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl">Want packaging like this?</h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              Every order is made for your size, quantity and finish. Send the details and get your exact price, shipping included, within 10-15 minutes.
            </p>
          </Reveal>
          <Reveal delay={120} className="rounded-[2rem] bg-white p-6 text-[#07111F] sm:p-8">
            <ProductQuickQuote productName={s.product} productSlug={s.productSlug || "custom-packaging"} heading={`Get your ${s.product.toLowerCase()} price`} formName="client_story_quote" />
          </Reveal>
        </div>
      </section>

      {/* ---------- more stories ---------- */}
      {others.length > 0 && (
        <section className="px-5 py-20 md:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-black">More client stories</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {others.map((o) => (
                <Link key={o.slug} href={`/client-stories/${o.slug}`} className="cs-card group overflow-hidden rounded-[1.6rem] bg-white">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={o.poster} alt={o.posterAlt} fill sizes="33vw" className="cs-card-img object-cover" />
                  </div>
                  <p className="p-5 font-black">{o.brand}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

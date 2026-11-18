import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/stories/Reveal";
import { getClientStories } from "@/data/clientStories";

const siteUrl = "https://printypackaging.com";

export function generateMetadata(): Metadata {
  const hasStories = getClientStories().some((s) => !s.demo);
  return {
    title: "Client Stories | Real Custom Packaging Projects",
    description:
      "Real brands, real boxes: watch our clients unbox their custom packaging and see how each project was made, from dieline to delivery.",
    alternates: { canonical: `${siteUrl}/client-stories` },
    // Not indexed until the first real story is published
    robots: hasStories ? undefined : { index: false, follow: true },
    openGraph: {
      title: "Client Stories | Printy Packaging",
      description: "Real brands unbox their custom packaging.",
      url: `${siteUrl}/client-stories`,
    },
  };
}

export default function ClientStoriesPage() {
  const stories = getClientStories();
  const countries = new Set(stories.map((s) => (s.location || "").split(",").pop()?.trim()).filter(Boolean));

  return (
    <main className="overflow-hidden bg-[#F7F4EF] text-[#07111F]">
      {/* ---------- hero ---------- */}
      <section className="relative isolate overflow-hidden bg-[#07111F] px-5 pb-28 pt-20 text-white md:px-8 md:pb-36 md:pt-28">
        <div className="cs-blob absolute -left-32 -top-40 -z-10 h-[30rem] w-[30rem] rounded-full bg-[#FF6A00]/30 blur-3xl" />
        <div className="cs-blob absolute -right-40 top-10 -z-10 h-[34rem] w-[34rem] rounded-full bg-[#00C2E8]/20 blur-3xl [animation-delay:-6s]" />
        <svg className="cs-ring absolute -right-24 -top-24 -z-10 h-[28rem] w-[28rem] opacity-25" viewBox="0 0 200 200" aria-hidden="true">
          <circle cx="100" cy="100" r="96" fill="none" stroke="white" strokeWidth="0.6" strokeDasharray="2 6" />
          <circle cx="100" cy="100" r="70" fill="none" stroke="#FF6A00" strokeWidth="0.6" strokeDasharray="1 9" />
        </svg>

        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-black uppercase tracking-[0.28em] text-[#FFB27A]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF6A00]" /> Client stories
            </p>
            <h1 className="mt-6 text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              Real brands.
              <br />
              <span className="cs-shine-text">Real boxes.</span>
              <br />
              Real unboxings.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Short videos from the brands we make packaging for, and the full story behind each project: what they
              needed, what we made, and the questions they asked along the way.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#stories" className="rounded-full bg-[#FF6A00] px-7 py-3.5 text-sm font-black text-[#07111F] shadow-lg shadow-orange-500/30 transition hover:bg-white">
                Watch the stories
              </a>
              <Link href="/#quote" className="rounded-full border border-white/25 px-7 py-3.5 text-sm font-black text-white transition hover:border-white hover:bg-white/10">
                Start your project
              </Link>
            </div>
          </Reveal>

          {/* floating story previews */}
          <div className="relative hidden h-[30rem] lg:block" aria-hidden="true">
            {stories.slice(0, 3).map((s, i) => (
              <div
                key={s.slug}
                className="cs-bob absolute w-48 overflow-hidden rounded-[1.6rem] border-4 border-white/10 shadow-2xl"
                style={{
                  ["--r" as string]: `${[-8, 5, -2][i]}deg`,
                  left: `${[4, 46, 22][i]}%`,
                  top: `${[8, 0, 40][i]}%`,
                  animationDelay: `${i * -2}s`,
                  zIndex: 3 - i,
                }}
              >
                <div className="relative aspect-[9/16]">
                  <Image src={s.poster} alt="" fill sizes="192px" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07111F]/80 to-transparent" />
                  <p className="absolute bottom-3 left-3 right-3 text-xs font-black">{s.brand}</p>
                </div>
              </div>
            ))}
            {stories.length === 0 && (
              <div className="cs-bob absolute left-1/4 top-10 flex aspect-[9/16] w-52 items-center justify-center rounded-[1.6rem] border-4 border-dashed border-white/20 text-center text-sm font-black text-white/50">
                Your brand
                <br />
                could be here
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ---------- numbers strip ---------- */}
      <section className="relative z-10 -mt-14 px-5 md:px-8">
        <Reveal className="mx-auto grid max-w-5xl grid-cols-3 divide-x divide-slate-200 rounded-3xl bg-white py-6 text-center shadow-[0_25px_60px_rgba(7,17,31,0.12)]">
          {[
            [String(stories.length || "—"), stories.length === 1 ? "client story" : "client stories"],
            [String(countries.size || "—"), countries.size === 1 ? "country" : "countries"],
            ["100%", "shared with the client's permission"],
          ].map(([n, label]) => (
            <div key={label} className="px-3">
              <p className="text-3xl font-black text-[#FF6A00] sm:text-4xl">{n}</p>
              <p className="mt-1 text-xs font-bold text-slate-500 sm:text-sm">{label}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ---------- story reel ---------- */}
      <section id="stories" className="scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-[#007C91]">The reel</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Unboxed by the people who ordered them</h2>
          </Reveal>

          {stories.length ? (
            <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {stories.map((s, i) => (
                <Reveal as="li" key={s.slug} delay={i * 120}>
                  <Link href={`/client-stories/${s.slug}`} className="cs-card group block overflow-hidden rounded-[2rem] bg-[#07111F] text-white">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image src={s.poster} alt={s.posterAlt} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="cs-card-img object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#07111F] via-[#07111F]/20 to-transparent" />
                      <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-[#07111F]">{s.product}</span>
                      {s.videoUrl && (
                        <span className="cs-pulse absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#FF6A00]">
                          <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5 fill-[#07111F]" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
                        </span>
                      )}
                      {s.demo && <span className="absolute left-5 top-14 rounded bg-yellow-300 px-2 py-0.5 text-[10px] font-black text-black">DESIGN PREVIEW — localhost only</span>}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFB27A]">{[s.industry, s.location].filter(Boolean).join(" · ")}</p>
                        <h3 className="mt-2 text-2xl font-black leading-tight">{s.brand}</h3>
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-300">{s.headline}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between px-6 py-4 text-sm font-black">
                      <span>Read the story</span>
                      <span className="transition group-hover:translate-x-1.5">→</span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </ul>
          ) : (
            <Reveal className="mt-14 rounded-[2rem] border-2 border-dashed border-slate-300 bg-white p-12 text-center">
              <p className="text-2xl font-black">The first stories are on their way</p>
              <p className="mx-auto mt-3 max-w-lg text-slate-600">
                We only share a project when the client says yes. Their unboxing videos will appear here soon.
              </p>
            </Reveal>
          )}
        </div>
      </section>

      {/* ---------- how a story is made ---------- */}
      <section className="bg-white px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-3">
          {[
            ["01", "The client says yes", "Every story is shared with the client's written permission. Nothing private is ever shown."],
            ["02", "They film the unboxing", "A short video on their phone, the moment the boxes arrive. No studio, no script."],
            ["03", "We tell the whole project", "What they needed, what we made, how long it took and what they asked us."],
          ].map(([n, title, text], i) => (
            <Reveal key={n} delay={i * 140} className="relative rounded-[2rem] bg-[#F7F4EF] p-8">
              <p className="text-6xl font-black text-[#FF6A00]/20">{n}</p>
              <h3 className="mt-2 text-xl font-black">{title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="px-5 py-20 md:px-8 md:py-28">
        <Reveal className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-[#07111F] px-8 py-16 text-center text-white md:px-16">
          <div className="cs-blob absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#FF6A00]/30 blur-3xl" />
          <div className="cs-blob absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-[#00C2E8]/25 blur-3xl [animation-delay:-5s]" />
          <h2 className="relative text-4xl font-black tracking-tight sm:text-5xl">Your brand could be the next story</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-lg text-slate-300">
            Send your size and quantity. We confirm the details and email your exact price within 10-15 minutes.
          </p>
          <Link href="/#quote" className="relative mt-8 inline-block rounded-full bg-[#FF6A00] px-8 py-4 text-sm font-black text-[#07111F] shadow-lg shadow-orange-500/30 transition hover:bg-white">
            Get my price
          </Link>
        </Reveal>
      </section>
    </main>
  );
}

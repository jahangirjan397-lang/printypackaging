import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Bricolage_Grotesque, Instrument_Serif } from "next/font/google";
import DesignServiceForm from "@/components/DesignServiceForm";
import Reveal from "@/components/studio/Reveal";
import StudioGallery from "@/components/studio/StudioGallery";
import StudioCatalog, { type CatalogGroup } from "@/components/studio/StudioCatalog";
import { getProductBySlug } from "@/data/products";

// Printy Studio: the design service has its own look (fonts, colours, layout)
// so it feels like a creative studio, not the packaging catalogue
const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-studio", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-studio-serif", display: "swap" });

export const metadata: Metadata = {
  alternates: {
    canonical: "https://printypackaging.com/design-services",
  },
  title: "Packaging Design & Graphic Design Services",
  description:
    "Printy Studio designs packaging, labels, logos, brand kits, Amazon listing images and print. Print-ready files on exact dielines, by the in-house team at Printy Packaging.",
};

const INK = "#16112B";
const VIOLET = "#6D4AFF";
const LIME = "#D9FF3F";
const CREAM = "#FBF7F0";

const services = [
  { title: "Packaging design", text: "Boxes, mailers, rigid boxes, bags and sleeves, designed on the exact dieline with foil, emboss and spot UV layers.", bg: VIOLET, fg: "#fff", span: "lg:col-span-2" },
  { title: "Labels & stickers", text: "Jar, bottle and product labels with ingredients, barcodes and legal text laid out cleanly.", bg: LIME, fg: INK, span: "" },
  { title: "Logo & brand identity", text: "Logo, colours, fonts and a simple brand guide, so everything looks like one brand.", bg: "#FF8A65", fg: INK, span: "" },
  { title: "Amazon & e-commerce", text: "Listing images, infographics, A+ content and store banners that sell the product.", bg: "#fff", fg: INK, span: "" },
  { title: "Print design", text: "Catalogs, brochures, flyers, menus, business cards, thank-you cards and inserts.", bg: "#FFE7A8", fg: INK, span: "" },
  { title: "Print-ready file fixes", text: "Your artwork fitted to the dieline, with bleed, CMYK and separate finish layers.", bg: INK, fg: "#fff", span: "lg:col-span-2" },
];

const packages = [
  { name: "Packaging Design", best: "One product or one box", items: ["Artwork on the exact dieline", "3D mockup preview", "Revision rounds included", "Print-ready AI + PDF files"] },
  { name: "Brand + Packaging", best: "New brands and relaunches", items: ["Logo and brand colours", "Box or bag design + labels", "Thank-you card or insert", "Brand guide + all source files"], featured: true },
  { name: "Monthly Design Partner", best: "Agencies and growing brands", items: ["Design hours every month", "Packaging, labels, ads, print", "One designer who knows you", "White-label for agencies"] },
];

const steps = [
  { title: "Brief", text: "Tell us about the product, the style you love and your deadline." },
  { title: "Quote", text: "A designer replies within 10-15 minutes with questions or a clear price." },
  { title: "Concepts", text: "See directions on your real dieline and 3D mockups, then refine one." },
  { title: "Files or print", text: "Get print-ready files, or we produce it for you with a proof first." },
];

const faqs = [
  { q: "Is design free if I order packaging from you?", a: "Yes. When you order your packaging with Printy Packaging, our team sets up your artwork on the dieline at no extra cost. Printy Studio is for design-only projects, full brand work, or extras such as logos and Amazon images." },
  { q: "Do I get the source files?", a: "Yes. You get print-ready PDFs and the editable source files (usually Adobe Illustrator), so you can print with us or with any printer." },
  { q: "How many revisions are included?", a: "Each quote lists the revision rounds included. Most projects finish well within them, because we agree the direction with mockups first." },
  { q: "Can you design on my own dieline?", a: "Yes. Send your dieline, or make one in our free dieline generator, and we design straight onto it." },
  { q: "Do you work with agencies?", a: "Yes. We design white-label for agencies and print brokers: your client sees your brand and we deliver files under your name." },
];

// The full design + print range, linked to the product pages
const catalogPlan = [
  { name: "Packaging", blurb: "Boxes, bags, wraps and labels: we design them on the exact dieline and print them from 100 pieces.", slugs: ["rigid-boxes", "mailer-boxes", "folding-cartons", "magnetic-boxes", "perfume-boxes", "cosmetic-boxes", "candle-boxes", "food-packaging", "bakery-boxes", "paper-bags", "butter-paper", "labels-stickers"] },
  { name: "Business & stationery", blurb: "Everything with your name on it: cards, letterheads, folders and the little extras that go in the box.", slugs: ["business-cards", "letterheads", "envelopes", "presentation-folders", "note-pads", "carbonless-forms", "thank-you-cards", "bookmarks"] },
  { name: "Marketing print", blurb: "Flyers, brochures, catalogs and signs that look like your brand and get read.", slugs: ["flyers", "brochures", "catalogs-magazines", "booklets", "postcards", "posters", "banners", "door-hangers", "clings-decals"] },
  { name: "Food, retail & events", blurb: "Menus, table tents, tags, invitations and tickets for restaurants, shops and events.", slugs: ["menus", "table-tents", "paper-coasters", "hang-tags", "invitation-cards", "greeting-cards", "tickets", "calendars"] },
];

const trade = [
  { title: "Trade pricing", text: "Volume pricing for designers, agencies and print brokers, quoted per project so your margin is clear." },
  { title: "White-label", text: "Your brand on the files and paperwork. Your client deals with you, we stay in the background." },
  { title: "Free dielines & file checks", text: "Exact dielines in any size and a print-ready check on every file before production." },
  { title: "One contact person", text: "A dedicated account manager on email and WhatsApp who knows your clients' jobs." },
];

const marquee = ["Packaging", "Labels", "Logos", "Brand kits", "Amazon A+", "Menus", "Catalogs", "Stickers", "Mockups", "Dielines"];

export default function DesignServicesPage() {
  const catalog: CatalogGroup[] = catalogPlan.map((g) => ({
    name: g.name,
    blurb: g.blurb,
    items: g.slugs.flatMap((slug) => {
      const p = getProductBySlug(slug);
      return p ? [{ slug, name: p.name, tagline: p.tagline, img: p.images?.[0]?.src }] : [];
    }),
  }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <div className={`${display.variable} ${serif.variable}`} style={{ fontFamily: "var(--font-studio)", background: CREAM, color: INK }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <header className="sticky top-0 z-40 border-b border-[#16112B]/10 bg-[#FBF7F0]/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
          <Link href="/design-services" className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold tracking-tight">
              printy<span style={{ color: VIOLET }}>.</span>studio
            </span>
            <span className="hidden text-xs font-semibold text-[#16112B]/50 sm:inline">by Printy Packaging</span>
          </Link>
          <nav aria-label="Studio" className="hidden items-center gap-6 whitespace-nowrap text-sm font-semibold lg:flex">
            <a href="#work" className="hover:text-[#6D4AFF]">Work</a>
            <a href="#services" className="hover:text-[#6D4AFF]">Services</a>
            <a href="#catalog" className="hover:text-[#6D4AFF]">Products</a>
            <a href="#packages" className="hover:text-[#6D4AFF]">Packages</a>
            <a href="#trade" className="hover:text-[#6D4AFF]">For resellers</a>
            <a href="#process" className="hover:text-[#6D4AFF]">Process</a>
          </nav>
          <a href="#start" className="whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5" style={{ background: INK }}>
            Start a project →
          </a>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div aria-hidden="true" className="studio-float absolute -left-10 top-24 h-40 w-40 rounded-full" style={{ background: LIME }} />
          <div aria-hidden="true" className="studio-float-slow absolute right-[8%] top-10 h-24 w-24 rotate-12 rounded-3xl" style={{ background: VIOLET }} />
          <div aria-hidden="true" className="studio-float absolute bottom-10 left-[45%] h-14 w-36 rounded-full" style={{ background: "#FF8A65" }} />

          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pt-24">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border-2 border-[#16112B] bg-white px-4 py-1.5 text-sm font-bold">
                <span className="h-2 w-2 rounded-full" style={{ background: VIOLET }} /> Design studio for product brands
              </p>
              <h1 className="mt-7 text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
                Design that makes people{" "}
                <span className="font-normal italic" style={{ fontFamily: "var(--font-studio-serif)", color: VIOLET }}>
                  pick it up.
                </span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-[#16112B]/70">
                Packaging, labels, logos, Amazon images and print, designed by
                people who work on real dielines every day. So it looks
                amazing on screen and prints right the first time.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#start" className="rounded-full px-7 py-3.5 text-sm font-bold transition hover:-translate-y-0.5" style={{ background: VIOLET, color: "#fff" }}>
                  Get a design quote
                </a>
                <a href="#work" className="rounded-full border-2 border-[#16112B] px-7 py-3 text-sm font-bold transition hover:bg-[#16112B] hover:text-white">
                  See our work
                </a>
              </div>
              <p className="mt-6 text-sm font-semibold text-[#16112B]/60">Reply within 10-15 minutes · source files included</p>
            </div>

            <div className="relative mx-auto h-[420px] w-full max-w-[460px]">
              <div className="studio-float-slow absolute left-0 top-6 w-[62%] -rotate-6 overflow-hidden rounded-[28px] border-4 border-white shadow-2xl">
                <div className="relative aspect-[4/5]">
                  <Image src="/images/products/perfume-boxes/perfume-boxes-front-v3-brand.webp" alt="Perfume box design" fill priority sizes="300px" className="object-cover" />
                </div>
              </div>
              <div className="studio-float absolute right-0 top-0 w-[52%] rotate-6 overflow-hidden rounded-[28px] border-4 border-white shadow-2xl">
                <div className="relative aspect-square">
                  <Image src="/images/products/labels-stickers/labels-stickers-hero-brand.webp" alt="Label design" fill priority sizes="260px" className="object-cover" />
                </div>
              </div>
              <div className="studio-float-slow absolute bottom-0 right-6 w-[56%] -rotate-2 overflow-hidden rounded-[28px] border-4 border-white shadow-2xl">
                <div className="relative aspect-[4/3]">
                  <Image src="/images/products/business-cards/business-cards-1-brand-v2.webp" alt="Business card design" fill sizes="280px" className="object-cover" />
                </div>
              </div>
              <svg aria-hidden="true" viewBox="0 0 120 120" className="studio-spin absolute -bottom-4 left-2 h-28 w-28">
                <defs>
                  <path id="studio-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
                </defs>
                <circle cx="60" cy="60" r="58" fill={LIME} />
                <text fontSize="11.5" fontWeight="700" letterSpacing="2.4" fill={INK}>
                  <textPath href="#studio-circle">PACKAGING • LABELS • BRANDING • PRINT •</textPath>
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* Marquee */}
        <div className="overflow-hidden border-y-2 border-[#16112B] py-4" style={{ background: VIOLET }} aria-hidden="true">
          <div className="studio-marquee flex w-max gap-10 whitespace-nowrap text-3xl font-extrabold" style={{ color: LIME }}>
            {[...marquee, ...marquee].map((m, i) => (
              <span key={i} className="flex items-center gap-10">
                {m} <span className="text-white">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* Work */}
        <section id="work" className="scroll-mt-20 mx-auto max-w-7xl px-5 py-24 lg:px-8">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                Recent{" "}
                <span className="font-normal italic" style={{ fontFamily: "var(--font-studio-serif)", color: VIOLET }}>work</span>
                , sorted by what you need.
              </h2>
              <p className="max-w-sm text-[#16112B]/70">Tap a category to filter. Every piece was designed print-ready, on a real dieline or print size.</p>
            </div>
          </Reveal>
          <div className="mt-10">
            <StudioGallery />
          </div>
        </section>

        {/* Services bento */}
        <section id="services" className="scroll-mt-20 bg-white py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Reveal>
              <h2 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                One studio for the box{" "}
                <span className="font-normal italic" style={{ fontFamily: "var(--font-studio-serif)", color: VIOLET }}>and</span>{" "}
                the brand around it.
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((s, i) => (
                <Reveal key={s.title} delay={i * 80} className={s.span}>
                  <article className="studio-tilt flex h-full min-h-[220px] flex-col justify-between rounded-[28px] border-2 border-[#16112B] p-7" style={{ background: s.bg, color: s.fg }}>
                    <span className="text-sm font-bold opacity-60">0{i + 1}</span>
                    <div>
                      <h3 className="mt-8 text-2xl font-extrabold tracking-tight">{s.title}</h3>
                      <p className="mt-3 leading-7 opacity-80">{s.text}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Everything we design & print */}
        <section id="catalog" className="scroll-mt-20 mx-auto max-w-7xl px-5 py-24 lg:px-8">
          <Reveal>
            <h2 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Everything we{" "}
              <span className="font-normal italic" style={{ fontFamily: "var(--font-studio-serif)", color: VIOLET }}>design</span>{" "}
              and print.
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-[#16112B]/70">
              Pick a product to see sizes, materials and finishes. Every one
              can be designed by our studio and printed by Printy Packaging.
            </p>
          </Reveal>
          <div className="mt-10">
            <StudioCatalog groups={catalog} />
          </div>
        </section>

        {/* Packages */}
        <section id="packages" className="scroll-mt-20 mx-auto max-w-7xl px-5 py-24 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                Pick a starting point.
              </h2>
              <p className="mt-5 text-lg text-[#16112B]/70">
                We quote the exact project. Ordering packaging with Printy
                Packaging? Artwork setup on the dieline is free.
              </p>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {packages.map((p, i) => (
              <Reveal key={p.name} delay={i * 100}>
                <article
                  className={`studio-tilt flex h-full flex-col rounded-[32px] border-2 border-[#16112B] p-8 ${p.featured ? "lg:-translate-y-4" : ""}`}
                  style={{ background: p.featured ? INK : "#fff", color: p.featured ? "#fff" : INK }}
                >
                  {p.featured && (
                    <span className="mb-5 w-fit rounded-full px-3 py-1 text-xs font-bold" style={{ background: LIME, color: INK }}>
                      Most popular
                    </span>
                  )}
                  <h3 className="text-3xl font-extrabold tracking-tight">{p.name}</h3>
                  <p className="mt-1 text-sm font-semibold opacity-60">{p.best}</p>
                  <ul className="mt-7 flex-1 space-y-3">
                    {p.items.map((it) => (
                      <li key={it} className="flex gap-3">
                        <span aria-hidden="true" style={{ color: p.featured ? LIME : VIOLET }}>✦</span>
                        {it}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#start"
                    className="mt-8 rounded-full px-6 py-3 text-center text-sm font-bold transition hover:-translate-y-0.5"
                    style={{ background: p.featured ? LIME : INK, color: p.featured ? INK : "#fff" }}
                  >
                    Get a quote
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Trade program */}
        <section id="trade" className="scroll-mt-20 relative overflow-hidden py-24" style={{ background: VIOLET, color: "#fff" }}>
          <div aria-hidden="true" className="studio-float-slow absolute -right-16 -top-16 h-64 w-64 rounded-full" style={{ background: LIME, opacity: 0.9 }} />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <Reveal>
              <p className="inline-flex rounded-full bg-white/15 px-4 py-1.5 text-sm font-bold">For designers, agencies & resellers</p>
              <h2 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                Your clients. Our studio{" "}
                <span className="font-normal italic" style={{ fontFamily: "var(--font-studio-serif)", color: LIME }}>and</span>{" "}
                factory.
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/80">
                Sell packaging and print to your clients without running a
                print shop. Send the brief or the files, we design, print and
                ship under your name.
              </p>
              <a href="#start" className="mt-8 inline-flex rounded-full px-7 py-3.5 text-sm font-bold transition hover:-translate-y-0.5" style={{ background: LIME, color: INK }}>
                Open a trade account →
              </a>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {trade.map((t, i) => (
                <Reveal key={t.title} delay={i * 90}>
                  <article className="studio-tilt h-full rounded-[28px] border-2 border-white/25 bg-white/10 p-6 backdrop-blur">
                    <span className="text-3xl" aria-hidden="true" style={{ color: LIME }}>✦</span>
                    <h3 className="mt-4 text-xl font-extrabold">{t.title}</h3>
                    <p className="mt-2 leading-7 text-white/80">{t.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="scroll-mt-20 py-24" style={{ background: INK, color: "#fff" }}>
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Reveal>
              <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                How it{" "}
                <span className="font-normal italic" style={{ fontFamily: "var(--font-studio-serif)", color: LIME }}>works</span>
              </h2>
            </Reveal>
            <ol className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, i) => (
                <Reveal key={s.title} delay={i * 100}>
                  <li>
                    <span className="block text-7xl font-extrabold leading-none" style={{ color: i % 2 ? LIME : VIOLET }}>0{i + 1}</span>
                    <h3 className="mt-5 text-2xl font-extrabold">{s.title}</h3>
                    <p className="mt-3 leading-7 text-white/70">{s.text}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* Start a project */}
        <section id="start" className="scroll-mt-20 mx-auto grid max-w-7xl gap-14 px-5 py-24 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <Reveal>
              <h2 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                Let&apos;s make something people{" "}
                <span className="font-normal italic" style={{ fontFamily: "var(--font-studio-serif)", color: VIOLET }}>remember.</span>
              </h2>
              <p className="mt-5 text-lg text-[#16112B]/70">
                Share a few details and a designer replies within 10-15
                minutes. Need it printed too? Use the{" "}
                <Link href="/#quote" className="font-bold underline decoration-[#6D4AFF] decoration-2 underline-offset-4">
                  packaging quote form
                </Link>{" "}
                and the design setup is included.
              </p>
            </Reveal>
            <div className="mt-10 space-y-3">
              {faqs.map((f) => (
                <details key={f.q} className="group rounded-2xl border-2 border-[#16112B]/10 bg-white px-5 py-4 open:border-[#16112B]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold">
                    {f.q}
                    <span aria-hidden="true" className="text-xl transition group-open:rotate-45" style={{ color: VIOLET }}>+</span>
                  </summary>
                  <p className="mt-3 leading-7 text-[#16112B]/70">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
          <Reveal delay={100}>
            <div className="rounded-[36px] border-2 border-[#16112B] p-2" style={{ background: LIME }}>
              <DesignServiceForm />
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="border-t-2 border-[#16112B]" style={{ background: INK, color: "#fff" }}>
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-12 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div>
            <p className="text-2xl font-extrabold">
              printy<span style={{ color: LIME }}>.</span>studio
            </p>
            <p className="mt-1 text-sm text-white/60">The design studio of Printy Packaging · sales@printypackaging.com</p>
          </div>
          <div className="flex flex-wrap gap-5 text-sm font-semibold text-white/80">
            <Link href="/" className="hover:text-[#D9FF3F]">Printy Packaging</Link>
            <Link href="/products" className="hover:text-[#D9FF3F]">Packaging products</Link>
            <Link href="/dieline-generator" className="hover:text-[#D9FF3F]">Free dieline generator</Link>
            <Link href="/privacy-policy" className="hover:text-[#D9FF3F]">Privacy</Link>
            <Link href="/terms" className="hover:text-[#D9FF3F]">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

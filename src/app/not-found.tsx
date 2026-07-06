import Link from "next/link";

const helpfulLinks = [
  { label: "View Products", href: "/products" },
  { label: "Browse Categories", href: "/categories" },
  { label: "Explore Markets", href: "/markets" },
  { label: "Contact Printy Packaging", href: "/contact" },
];

export default function NotFound() {
  return (
    <main className="min-h-[70vh] bg-slate-950 text-white">
      <section className="mx-auto max-w-5xl px-6 py-20 text-center sm:py-28 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
          404 Page Not Found
        </p>

        <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-6xl">
          This packaging page could not be found.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          The page may have moved, the link may be incorrect, or the packaging
          product route may not exist yet.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="rounded-full bg-cyan-400 px-7 py-3 text-sm font-black text-slate-950 shadow-lg shadow-cyan-400/20 transition hover:bg-cyan-300"
          >
            Go Home
          </Link>

          <Link
            href="/?product=mailer-boxes#quote"
            className="rounded-full border border-white/20 px-7 py-3 text-sm font-bold text-white transition hover:border-cyan-300 hover:text-cyan-300"
          >
            Request Quote
          </Link>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {helpfulLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm font-bold text-slate-200 transition hover:border-cyan-300 hover:text-cyan-300"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
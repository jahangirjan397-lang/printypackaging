import Link from "next/link";

const productLinks = [
  { label: "Products", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "Markets", href: "/markets" },
  { label: "Get Quote", href: "/?product=mailer-boxes#quote" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms / Quote Policy", href: "/terms" },
];

const marketLinks = [
  "USA custom packaging buyers",
  "UK packaging brands",
  "Canada ecommerce packaging",
  "International box inquiries",
];

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400 text-lg font-black text-slate-950">
                PP
              </span>
              <span>
                <span className="block text-xl font-black tracking-tight">
                  Printy Packaging
                </span>
                <span className="block text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
                  Custom Boxes
                </span>
              </span>
            </Link>

            <p className="mt-5 max-w-md leading-7 text-slate-300">
              Printy Packaging helps businesses with custom boxes, packaging
              styles, materials, finishes and quote support for USA, UK, Canada
              and international buyers.
            </p>

            <div className="mt-6 flex flex-col gap-3 text-sm text-slate-300">
              <a
                href="mailto:info@printypackaging.com"
                className="transition hover:text-cyan-300"
              >
                info@printypackaging.com
              </a>

              <a
                href="https://wa.me/923338889954?text=Hello%20Printy%20Packaging%2C%20I%20need%20a%20custom%20packaging%20quote."
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-cyan-300"
              >
                WhatsApp: +92 333 8889954
              </a>

              <span>Lahore, Pakistan — Serving international buyers</span>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">
              Explore
            </h2>

            <div className="mt-5 space-y-3">
              {productLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-slate-300 transition hover:text-cyan-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">
              Company
            </h2>

            <div className="mt-5 space-y-3">
              {companyLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-slate-300 transition hover:text-cyan-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">
              Markets
            </h2>

            <div className="mt-5 space-y-3">
              {marketLinks.map((market) => (
                <p key={market} className="text-sm text-slate-300">
                  {market}
                </p>
              ))}
            </div>

            <Link
              href="/?product=mailer-boxes#quote"
              className="mt-6 inline-flex rounded-full bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
            >
              Start Quote
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Printy Packaging. All rights reserved.</p>

          <p>
            Custom packaging support for boxes, printing, materials and
            finishing.
          </p>
        </div>
      </div>
    </footer>
  );
}
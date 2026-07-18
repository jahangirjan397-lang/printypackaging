import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";

const productLinks = [
  { label: "Rigid Boxes", href: "/products/rigid-boxes" },
  { label: "Mailer Boxes", href: "/products/mailer-boxes" },
  { label: "Folding Cartons", href: "/products/folding-cartons" },
  { label: "Food Packaging", href: "/products/food-packaging" },
  { label: "Butter Paper", href: "/products/butter-paper" },
  { label: "Labels & Stickers", href: "/products/labels-stickers" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Why Printy Packaging", href: "/why-printy-packaging" },
  { label: "FAQ", href: "/faq" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms / Quote Policy", href: "/terms" },
];

const guideLinks = [
  { label: "Resources Hub", href: "/resources" },
  { label: "Packaging Materials", href: "/packaging-materials" },
  { label: "Finishing Options", href: "/finishing-options" },
  { label: "Artwork & Dieline Guide", href: "/artwork-guide" },
  { label: "Sample Kit Guide", href: "/sample-kit" },
];

const marketLinks = [
  { label: "USA Packaging", href: "/markets/usa" },
  { label: "UK Packaging", href: "/markets/uk" },
  { label: "Canada Packaging", href: "/markets/canada" },
  { label: "Europe Packaging", href: "/markets/europe" },
  { label: "UAE Packaging", href: "/markets/uae" },
  { label: "Australia Packaging", href: "/markets/australia" },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-cyan-400/10 bg-[#07111F] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.8fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <BrandLogo variant="light" size="large" />

            <p className="mt-5 max-w-md leading-8 text-slate-300">
              Printy Packaging helps brands with custom boxes, rigid boxes,
              food packaging, materials, finishes, artwork guidance and quote
              support for USA, UK, Canada, Europe, UAE and worldwide buyers.
            </p>

            <div className="mt-6 space-y-3 text-sm font-bold text-slate-300">
              <a
                href="mailto:sales@printypackaging.com"
                className="block transition hover:text-[#FF6A00]"
              >
                sales@printypackaging.com
              </a>

              <a
                href="https://wa.me/923338889954?text=Hello%20Printy%20Packaging%2C%20I%20need%20a%20custom%20packaging%20quote."
                target="_blank"
                rel="noreferrer"
                className="block transition hover:text-[#FF6A00]"
              >
                                WhatsApp: +92 333 888 9954
              </a>

                            <p>Lahore, Pakistan - Serving USA | UK | Europe | UAE and worldwide packaging buyers</p>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/?product=mailer-boxes#quote"
                className="rounded-full bg-[#FF6A00] px-6 py-3 text-center text-sm font-black text-white shadow-lg shadow-orange-500/20 transition hover:bg-[#007C91]"
              >
                Get Quote
              </Link>

              <Link
                href="/resources"
                className="rounded-full border border-white/15 px-6 py-3 text-center text-sm font-black text-white transition hover:border-cyan-300 hover:text-cyan-300"
              >
                Packaging Guides
              </Link>
            </div>
          </div>

          <FooterColumn title="Products" links={productLinks} />
          <FooterColumn title="Guides" links={guideLinks} />
          <FooterColumn title="Markets" links={marketLinks} />
          <FooterColumn title="Company" links={companyLinks} />
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-4 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
                        <p>Copyright {year} Printy Packaging. All rights reserved.</p>

            <p>
              Custom boxes, printed packaging, premium finishes and quote
              support.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h2 className="text-sm font-black uppercase tracking-[0.25em] text-cyan-300">
        {title}
      </h2>

      <div className="mt-5 space-y-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block text-sm font-bold text-slate-300 transition hover:text-[#FF6A00]"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import SocialIcons from "@/components/SocialIcons";
import { isDraftPolicy } from "@/data/policyStatus";

const productLinks = [
  { label: "Rigid Boxes", href: "/products/rigid-boxes" },
  { label: "Mailer Boxes", href: "/products/mailer-boxes" },
  { label: "Folding Cartons", href: "/products/folding-cartons" },
  { label: "Food Packaging", href: "/products/food-packaging" },
  { label: "Butter Paper", href: "/products/butter-paper" },
  { label: "Labels & Stickers", href: "/products/labels-stickers" },
];

const companyLinks = [
  { label: "Packaging Gallery", href: "/portfolio" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Why Printy Packaging", href: "/why-printy-packaging" },
  { label: "Packaging Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
];

// Draft policies stay out of the footer until approved (Terms is always
// linked because the page already existed before the rewrite)
const policyLinks = [
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Shipping Policy", href: "/shipping-policy" },
  { label: "Artwork Policy", href: "/artwork-policy" },
  { label: "Payment Policy", href: "/payment-policy" },
  { label: "Privacy Policy", href: "/privacy-policy" },
].filter((link) => link.href === "/terms" || !isDraftPolicy(link.href.slice(1)));

const guideLinks = [
  { label: "Resources Hub", href: "/resources" },
  { label: "Packaging Materials", href: "/packaging-materials" },
  { label: "Finishing Options", href: "/finishing-options" },
  { label: "Artwork & Dieline Guide", href: "/artwork-guide" },
  { label: "Sample & Material Guide", href: "/sample-kit" },
  { label: "Packaging Buying Guide", href: "/packaging-guide" },
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
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.25fr_0.8fr_0.8fr_0.8fr_0.8fr]">
          <div className="col-span-2 lg:col-span-1">
            <span className="sm:hidden"><BrandLogo variant="light" size="small" /></span>
            <span className="hidden sm:inline-flex"><BrandLogo variant="light" size="large" /></span>

            <p className="mt-4 max-w-md text-sm leading-6 text-slate-300 sm:mt-5 sm:text-base sm:leading-8">
              Printy Packaging helps brands with custom boxes, rigid boxes,
              food packaging, materials, finishes, artwork guidance and quote
              support for USA, UK, Canada, Europe, UAE and worldwide buyers.
            </p>

            <div className="mt-5 space-y-2.5 text-sm font-bold text-slate-300">
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
                Chat on WhatsApp
              </a>

              <p>
                Serving USA | UK | Canada | Europe | UAE | Australia and
                worldwide packaging buyers
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/#quote"
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

        <div className="mt-10 border-t border-white/10 pt-6">
          <nav
            aria-label="Policies"
            className="mb-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold text-slate-300 sm:text-sm"
          >
            {policyLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-[#FF6A00]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3 text-xs text-slate-400 sm:text-sm md:flex-row md:items-center md:justify-between">
                                    <p>Copyright {year} Printy Packaging. All rights reserved.</p>

            <SocialIcons
              showAll
              platforms={["linkedin", "instagram", "facebook", "youtube", "x"]}
            />
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

      <div className="mt-4 space-y-2.5">
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

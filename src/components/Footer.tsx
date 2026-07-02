export default function Footer() {
  const productLinks = [
    "Rigid Boxes",
    "Folding Cartons",
    "Butter Paper",
    "Food Packaging",
    "Paper Bags",
    "Labels",
  ];

  const companyLinks = [
    "About Us",
    "Industries",
    "Materials",
    "Finishing",
    "Portfolio",
    "Blog",
  ];

  const supportLinks = [
    "Get Quote",
    "Artwork Guide",
    "FAQ",
    "Client Support",
    "Contact",
    "Sample Kit",
  ];

  return (
    <footer id="contact" className="bg-[#07111F] px-5 py-16 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.9fr_0.9fr_0.9fr]">
          <div>
            <h3 className="text-3xl font-black">
              Printy<span className="text-[#00C2E8]">Packaging</span>
            </h3>

            <p className="mt-5 max-w-sm leading-7 text-slate-400">
              Premium custom printing and packaging solutions for USA, UK,
              Europe and worldwide brands.
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="font-black text-[#FF6A00]">Need packaging help?</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Send your product details and our team will guide you with box
                style, material and finishing options.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-white/5 px-4 py-2 text-xs font-bold text-slate-300">
                Custom Boxes
              </span>
              <span className="rounded-full bg-white/5 px-4 py-2 text-xs font-bold text-slate-300">
                Rigid Boxes
              </span>
              <span className="rounded-full bg-white/5 px-4 py-2 text-xs font-bold text-slate-300">
                Butter Paper
              </span>
            </div>
          </div>

          <FooterColumn title="Products" links={productLinks} />
          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Support" links={supportLinks} />
        </div>

        <div className="mt-12 grid gap-4 border-t border-white/10 pt-6 text-sm text-slate-500 md:grid-cols-2">
          <p>© 2026 Printy Packaging. All rights reserved.</p>
          <p className="md:text-right">
            Custom Boxes • Rigid Boxes • Butter Paper • Food Packaging
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="font-black text-white">{title}</h4>

      <ul className="mt-5 space-y-3 text-slate-400">
        {links.map((link) => (
          <li key={link}>
            <a href="#quote" className="transition hover:text-[#00C2E8]">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
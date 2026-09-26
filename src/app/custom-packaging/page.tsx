import Image from "next/image";
import Link from "next/link";

export const metadata = {
  alternates: {
    canonical: "https://printypackaging.com/custom-packaging",
  },
  title: "Custom Packaging Boxes",
  description:
    "Custom packaging boxes, rigid boxes, mailer boxes, folding cartons, food packaging, paper bags, labels and luxury printed packaging for global brands.",
};

const solutions = [
  { title: "Rigid Boxes", href: "/products/rigid-boxes", text: "Premium structure for gifts, cosmetics, perfume, jewelry and luxury presentation." },
  { title: "Mailer Boxes", href: "/products/mailer-boxes", text: "Corrugated ecommerce and subscription packaging with branded print and finishes." },
  { title: "Folding Cartons", href: "/products/folding-cartons", text: "Retail-ready paperboard cartons for lightweight products and shelf presentation." },
  { title: "Food Packaging", href: "/products/food-packaging", text: "Food-focused packaging formats with material and print guidance for your application." },
  { title: "Butter Paper", href: "/products/butter-paper", text: "Printed food wrap and butter paper options for restaurants, cafes and bakery use." },
  { title: "Paper Bags", href: "/products/paper-bags", text: "Custom branded paper bags for retail, takeaway and product presentation." },
  { title: "Labels & Stickers", href: "/products/labels-stickers", text: "Custom labels and stickers for branding, product information and packaging details." },
  { title: "Luxury Packaging", href: "/products/luxury-packaging", text: "Premium packaging concepts using rigid structures, specialty papers and high-end finishes." },
];

const buyerSteps = [
  { number: "01", title: "Choose the packaging style", text: "Start with the product type, structure and how the packaging will be used." },
  { number: "02", title: "Confirm size and quantity", text: "Share product dimensions and quantity options so material and production planning can be reviewed." },
  { number: "03", title: "Select materials and finishes", text: "Compare board, paper, printing, lamination, foil, embossing, spot UV and other relevant options." },
  { number: "04", title: "Send artwork and request quote", text: "Upload artwork or references, then move into quote, proof and production planning." },
];

export default function CustomPackagingPage() {
  return (
    <main className="bg-white">
      <section className="relative overflow-hidden bg-[#07111F] px-5 py-16 text-white md:px-8 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(0,194,232,0.20),transparent_32%),radial-gradient(circle_at_82%_30%,rgba(255,106,0,0.14),transparent_28%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.32em] text-[#00C2E8]">
              Custom Packaging
            </p>

            <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Packaging built around your{" "}
              <span className="bg-gradient-to-r from-[#FF6A00] via-[#F4C27A] to-[#00C2E8] bg-clip-text text-transparent">
                product, brand and buying needs.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Compare custom boxes, materials, printing and finishing in one connected
              buyer journey. Move from packaging idea to product page, quote, artwork and
              production planning without restarting the process.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/#quote"
                className="rounded-full bg-[#FF6A00] px-7 py-4 text-sm font-black text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-1 hover:bg-[#007C91]"
              >
                Get Custom Quote
              </Link>

              <Link
                href="/products"
                className="rounded-full border border-white/20 px-7 py-4 text-sm font-black text-white transition hover:bg-white hover:text-[#07111F]"
              >
                Explore Products
              </Link>
            </div>

            <div className="mt-8 grid gap-3 text-sm font-bold text-slate-300 sm:grid-cols-2">
              {["Custom sizes & structures", "Material & GSM guidance", "Printing & finishing options", "Artwork & quote support"].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 shadow-2xl">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-[#EDE5DC]">
              <Image
                src="/images/home/home-hero-retail-v3.webp"
                alt="Custom printed packaging range for retail food ecommerce and premium brands"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover object-center"
              />
            </div>
            <div className="px-2 pb-1 pt-5">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#00C2E8]">
                Made around your specification
              </p>
              <p className="mt-2 max-w-lg text-xl font-black text-white sm:text-2xl">
                Structure, material, print and finishing connected in one packaging workflow.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F7FAFC] px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.32em] text-[#FF6A00]">
                Packaging Solutions
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-[#07111F] md:text-5xl">
                Start with the packaging style that matches your product
              </h2>
            </div>

            <p className="text-lg leading-8 text-slate-600 lg:text-right">
              Open a product page to review structure, materials, finishes and quote requirements,
              or send your product details and ask for guidance.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {solutions.map((solution) => (
              <Link
                key={solution.href}
                href={solution.href}
                className="group rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#00C2E8] hover:shadow-lg"
              >
                <div
                  aria-hidden="true"
                  className="mb-5 h-11 w-11 rounded-2xl bg-[#FF6A00] transition group-hover:bg-[#007C91] flex items-center justify-center text-white"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z" /><path d="M4 21.5V5.5" /><path d="M9 8h7M9 12h5" /></svg>
                </div>
                <h3 className="text-xl font-black text-[#07111F]">{solution.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{solution.text}</p>
                <span className="mt-5 inline-flex text-sm font-black text-[#FF6A00]">
                  View product →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.32em] text-[#00A7C7]">
              From Brief To Production
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-[#07111F] md:text-5xl">
              A clear four-step custom packaging process
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {buyerSteps.map((step) => (
              <article key={step.number} className="rounded-[1.6rem] border border-slate-200 bg-[#F7FAFC] p-6">
                <span className="text-sm font-black text-[#FF6A00]">{step.number}</span>
                <h3 className="mt-4 text-xl font-black text-[#07111F]">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#07111F] px-5 py-16 text-white md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-[#00C2E8]">
              Ready For A Quote?
            </p>
            <h2 className="mt-4 text-3xl font-black md:text-4xl">
              Send the details once and keep the buyer journey connected.
            </h2>
            <p className="mt-4 max-w-3xl leading-7 text-slate-300">
              Share product type, size, quantity, material, printing, finishing, artwork status and delivery country.
            </p>
          </div>

          <Link
            href="/#quote"
            className="rounded-full bg-[#FF6A00] px-8 py-4 text-center font-black text-white transition hover:-translate-y-1 hover:bg-[#007C91]"
          >
            Request Custom Quote
          </Link>
        </div>
      </section>
    </main>
  );
}

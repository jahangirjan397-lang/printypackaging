import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Printy Packaging | Custom Packaging Quote Support",
  description:
    "Contact Printy Packaging for custom boxes, rigid boxes, mailer boxes, folding cartons, food packaging, butter paper, labels, stickers and luxury printed packaging quote support.",
  alternates: {
    canonical: "https://printypackaging.com/contact",
  },
};

const contactOptions = [
  {
    title: "Email Quote Support",
    value: "sales@printypackaging.com",
    detail:
      "Send your box size, quantity, material, printing colors, finishing options and artwork details.",
    href: "mailto:sales@printypackaging.com",
    action: "Email Us",
  },
  {
    title: "WhatsApp Support",
    value: "+92 333 888 9954",
    detail:
      "Fast support for packaging questions, artwork guidance, quote details and order discussion.",
    href: "https://wa.me/923338889954",
    action: "Open WhatsApp",
  },
  {
    title: "USA Quote Support",
    value: "Online support available",
    detail:
      "Official USA phone support will be added after business number verification. Quotes are available online now.",
    href: "/#quote",
    action: "Request Quote",
  },
];

const supportSteps = [
  "Share product size, quantity and box style",
  "Choose material, printing colors and finishing",
  "Upload artwork or ask for design guidance",
  "Receive quote support and production guidance",
];

export default function ContactPage() {
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Printy Packaging",
    url: "https://printypackaging.com/contact",
    description:
      "Contact Printy Packaging for custom packaging quote support, email support and WhatsApp guidance.",
    mainEntity: {
      "@type": "Organization",
      name: "Printy Packaging",
      url: "https://printypackaging.com",
      email: "sales@printypackaging.com",
      contactPoint: [
        {
          "@type": "ContactPoint",
          email: "sales@printypackaging.com",
          contactType: "sales",
          areaServed: ["US", "GB", "EU", "AE"],
          availableLanguage: ["English"],
        },
      ],
    },
  };

  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactJsonLd),
        }}
      />

      <section className="relative overflow-hidden bg-[#07111F] px-4 py-20 text-white sm:px-5 md:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(0,194,232,0.22),transparent_30%),radial-gradient(circle_at_82%_30%,rgba(255,106,0,0.14),transparent_28%)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-full border border-[#00C2E8]/40 bg-[#00C2E8]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#9FEFFF]">
              Contact Printy Packaging
            </p>

            <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight md:text-6xl">
              Custom packaging quote support for serious brands.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
              Need custom boxes, rigid boxes, mailer boxes, folding cartons,
              food packaging, butter paper, paper bags, labels or stickers?
              Share your details and our team will guide you.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/#quote"
                className="rounded-full bg-[#FF6A00] px-7 py-4 text-sm font-black text-white shadow-xl shadow-orange-500/25 transition hover:-translate-y-1 hover:bg-[#007C91]"
              >
                Request Custom Quote
              </Link>

              <a
                href="mailto:sales@printypackaging.com"
                className="rounded-full border border-[#00C2E8]/40 bg-white/5 px-7 py-4 text-sm font-black text-white backdrop-blur transition hover:-translate-y-1 hover:bg-[#00C2E8] hover:text-[#07111F]"
              >
                Email Sales Team
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-5 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-3">
            {contactOptions.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#00C2E8]/60 hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00C2E8]/12 text-xl font-black text-[#007C91]">
                  ✓
                </div>

                <h2 className="mt-5 text-xl font-black text-[#07111F]">
                  {item.title}
                </h2>

                <p className="mt-2 text-base font-black text-[#FF6A00]">
                  {item.value}
                </p>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {item.detail}
                </p>

                <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-[#007C91] group-hover:text-[#FF6A00]">
                  {item.action}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F7FAFC] px-4 py-16 sm:px-5 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#007C91]">
              How To Get A Quote
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-[#07111F] md:text-4xl">
              Send the right details and get faster packaging guidance.
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
              For accurate pricing, share product dimensions, required quantity,
              material preference, printing colors and finishing requirements.
              Artwork files can be shared later if they are not ready yet.
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="grid gap-4">
              {supportSteps.map((step, index) => (
                <div
                  key={step}
                  className="flex gap-4 rounded-2xl border border-slate-100 bg-[#F7FAFC] p-4"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FF6A00] text-sm font-black text-white">
                    {index + 1}
                  </div>

                  <p className="text-sm font-bold leading-6 text-[#07111F]">
                    {step}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-[#00C2E8]/30 bg-[#00C2E8]/10 p-5">
              <p className="text-sm font-black text-[#07111F]">
                Buyer trust note:
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-700">
                Printy Packaging uses email, WhatsApp, quote form and live chat
                support. USA phone support will be added after official business
                number setup and verification.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-5 md:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-[#07111F] p-6 text-white shadow-2xl md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#00C2E8]">
                Ready To Start?
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
                Request a packaging quote for your next product.
              </h2>

              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
                Get guidance for custom box sizes, rigid packaging, ecommerce
                mailers, food packaging, printed butter paper, labels and
                stickers.
              </p>
            </div>

            <Link
              href="/#quote"
              className="rounded-full bg-[#FF6A00] px-7 py-4 text-center text-sm font-black text-white shadow-xl shadow-orange-500/25 transition hover:-translate-y-1 hover:bg-[#007C91]"
            >
              Go To Quote Form
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
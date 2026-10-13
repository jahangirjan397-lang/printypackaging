import Link from "next/link";
import { teamEmails } from "@/data/businessInfo";

export type PolicySection = {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

// Shared layout for legal pages (terms, refund policy): a short hero, a
// sticky list of sections to jump to, and plain-language sections.
export default function PolicyPage({
  eyebrow,
  title,
  intro,
  updated,
  highlights,
  sections,
  related,
  draft = false,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  highlights: { label: string; value: string }[];
  sections: PolicySection[];
  related: { label: string; href: string }[];
  // Shows an "awaiting approval" notice while the wording is not final
  draft?: boolean;
}) {
  return (
    <main className="bg-slate-50 text-slate-950">
      <section className="border-b border-cyan-400/10 bg-gradient-to-br from-[#07111F] via-[#09243A] to-[#061525] text-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
          <p className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-cyan-200">
            {eyebrow}
          </p>
          <h1 className="mt-6 max-w-4xl text-3xl font-black tracking-tight sm:text-4xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            {intro}
          </p>
          <p className="mt-4 text-sm font-bold text-slate-400">Last updated: {updated}</p>

          {draft && (
            <p className="mt-5 max-w-3xl rounded-xl border border-amber-300/40 bg-amber-400/10 px-4 py-3 text-sm font-bold text-amber-200">
              Draft for review: this policy is waiting for final approval and
              may change. Please contact us for the current terms of your order.
            </p>
          )}

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/[0.05] p-4"
              >
                <p className="text-xs font-black uppercase tracking-[0.15em] text-cyan-300">
                  {item.label}
                </p>
                <p className="mt-2 text-sm font-bold leading-6 text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8 lg:py-16">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <nav
            aria-label="On this page"
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#FF6A00]">
              On this page
            </p>
            <ol className="mt-3 grid gap-1 text-sm font-bold text-slate-600">
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="block rounded-lg px-2 py-1.5 transition hover:bg-slate-100 hover:text-[#FF6A00]"
                  >
                    {index + 1}. {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <div className="grid gap-5">
          {/* One continuous document; sections are separated by thin rules */}
          <div className="divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white px-6 shadow-sm sm:px-10">
            {sections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-32 py-7 first:pt-8 last:pb-8"
              >
                <h2 className="text-base font-black tracking-tight text-[#07111F] sm:text-lg">
                  <span className="mr-1.5 text-[#FF6A00]">{index + 1}.</span>
                  {section.title}
                </h2>
                {section.paragraphs?.map((text) => (
                  <p key={text} className="mt-3 leading-8 text-slate-600">
                    {text}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="mt-3 grid gap-2">
                    {section.bullets.map((text) => (
                      <li key={text} className="flex gap-3 leading-7 text-slate-600">
                        <span
                          aria-hidden="true"
                          className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF6A00]"
                        />
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <div className="rounded-3xl bg-[#07111F] p-6 text-white sm:p-8">
            <h2 className="text-lg font-black">Questions about this policy?</h2>
            <p className="mt-3 leading-7 text-slate-300">
              Our support team handles order updates, claims, reprints and
              shipping. Email{" "}
              <a
                href={`mailto:${teamEmails.support}`}
                className="font-bold text-cyan-300 hover:text-[#FF6A00]"
              >
                {teamEmails.support}
              </a>{" "}
              with your order number, or{" "}
              <a
                href="https://wa.me/923338889954"
                target="_blank"
                rel="noreferrer"
                className="font-bold text-cyan-300 hover:text-[#FF6A00]"
              >
                message us on WhatsApp
              </a>
              . We reply within one business day. For new quotes, email{" "}
              <a
                href={`mailto:${teamEmails.sales}`}
                className="font-bold text-cyan-300 hover:text-[#FF6A00]"
              >
                {teamEmails.sales}
              </a>
              .
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {related.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-black transition hover:border-cyan-300 hover:text-cyan-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms and Quote Policy | Printy Packaging",
  description:
    "Read Printy Packaging terms, quote policy, custom packaging inquiry rules, artwork notes, pricing guidance and production responsibility.",
};

const policies = [
  {
    title: "Quote Requests",
    text: "Quotes are prepared based on the information provided by the customer, including size, quantity, material, printing colors, finishes, shipping country and project notes. Missing or unclear details may affect final pricing.",
  },
  {
    title: "Pricing Changes",
    text: "Packaging prices may change due to material cost, paper market changes, finishing requirements, shipping method, currency rate, production complexity or updated customer requirements.",
  },
  {
    title: "Artwork and Design",
    text: "Customers are responsible for providing correct artwork, logos, text, barcode, dieline approval and final content. Production should only move forward after the customer reviews and approves the required details.",
  },
  {
    title: "Color and Finish Variation",
    text: "Printed colors, lamination, foil, embossing, spot UV and other finishes may have minor variation due to material, printing process, screen display difference and production conditions.",
  },
  {
    title: "Samples and Mockups",
    text: "Digital previews, mockups or sample guidance are for understanding the packaging direction. Final production details should be confirmed before order approval.",
  },
  {
    title: "Production Timing",
    text: "Production and delivery timelines depend on order complexity, material availability, artwork approval, finishing process, shipping location and other operational factors.",
  },
  {
    title: "Customer Approval",
    text: "Before production, customers should carefully check size, quantity, material, printing, finishing, spelling, barcode, artwork and delivery details. Approved details are treated as final for production planning.",
  },
  {
    title: "Website Information",
    text: "Website content is provided for general packaging information and quote guidance. It should not be treated as a final contract unless confirmed in writing by Printy Packaging.",
  },
];

export default function TermsPage() {
  return (
    <main className="bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24 lg:px-8">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Terms / Quote Policy
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Custom packaging quote terms and customer approval policy.
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            These terms explain how quote requests, pricing guidance, artwork
            review and production approval are handled for Printy Packaging
            inquiries.
          </p>

          <p className="mt-4 text-sm text-slate-400">
            Last updated: July 2026
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
        <div className="space-y-6">
          {policies.map((policy) => (
            <article
              key={policy.title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-7"
            >
              <h2 className="text-2xl font-bold text-white">{policy.title}</h2>
              <p className="mt-4 leading-8 text-slate-300">{policy.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-cyan-300/20 bg-cyan-400/10 p-7">
          <h2 className="text-2xl font-bold">Need a Confirmed Quote?</h2>
          <p className="mt-4 leading-8 text-slate-300">
            For accurate pricing, send complete product size, quantity,
            material, printing and finishing details through our quote form.
          </p>

          <Link
            href="/?product=mailer-boxes#quote"
            className="mt-6 inline-flex rounded-full bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
          >
            Request a Quote
          </Link>
        </div>
      </section>
    </main>
  );
}
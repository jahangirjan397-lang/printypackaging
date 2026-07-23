import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms and Quote Policy",
  description:
    "Read Printy Packaging terms, quote policy, artwork approval, pricing guidance, production timing and customer responsibility for custom packaging orders.",
};

const policies = [
  {
    title: "Quote Requests",
    text: "Quotes are prepared based on the information provided by the customer, including box style, size, quantity, material, printing colors, finishes, shipping country and project notes. Missing or unclear details may affect final pricing.",
  },
  {
    title: "Pricing Changes",
    text: "Packaging prices may change due to material cost, paper market changes, finishing requirements, shipping method, currency rate, production complexity or updated customer requirements.",
  },
  {
    title: "Artwork and Design",
    text: "Customers are responsible for providing correct artwork, logos, text, barcode, dieline approval and final content. Production should move forward only after the customer reviews and approves the required details.",
  },
  {
    title: "Color and Finish Variation",
    text: "Printed colors, lamination, foil, embossing, spot UV and other finishes may have minor variation due to material, printing process, screen display difference and production conditions.",
  },
  {
    title: "Samples and Mockups",
    text: "Digital previews, mockups or sample guidance are used for understanding the packaging direction. Final production details should be confirmed before order approval.",
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

const quoteChecklist = [
  "Product or box style",
  "Exact size with unit",
  "Required quantity",
  "Material preference",
  "Printing colors",
  "Finishing options",
  "Shipping country",
  "Artwork or dieline status",
];

export default function TermsPage() {
  return (
    <main className="bg-[#07111F] text-white">
      <section className="relative overflow-hidden border-b border-cyan-400/10 bg-gradient-to-br from-[#07111F] via-[#09243A] to-[#061525]">
        <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-20 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
          <div>
            <div className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-400/10 px-5 py-2 text-sm font-black text-cyan-200 shadow-lg shadow-cyan-500/10">
              Terms / Quote Policy
            </div>

            <h1 className="mt-8 max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Clear quote terms for{" "}
              <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-cyan-300 bg-clip-text text-transparent">
                custom packaging orders.
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              These terms explain how quote requests, artwork approval, pricing
              guidance, production timing and customer responsibilities are
              handled for Printy Packaging inquiries.
            </p>

            <p className="mt-5 text-sm font-bold text-slate-400">
              Last updated: July 2026
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/?product=mailer-boxes#quote"
                className="rounded-full bg-[#FF6A00] px-7 py-3 text-center text-sm font-black text-white shadow-xl shadow-orange-500/25 transition hover:bg-[#007C91]"
              >
                Get Quote
              </Link>

              <Link
                href="/contact"
                className="rounded-full border border-white/15 px-7 py-3 text-center text-sm font-bold text-white transition hover:border-cyan-300 hover:text-cyan-300"
              >
                Contact Support
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-cyan-400/20 bg-white/[0.04] p-5 shadow-2xl shadow-cyan-950/40">
            <div className="rounded-[1.5rem] border border-white/10 bg-[#07111F] p-6">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-300">
                Before Quote
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-tight">
                Send complete details for accurate pricing.
              </h2>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {quoteChecklist.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-bold text-slate-200"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-3xl border border-orange-400/20 bg-orange-500/10 p-5">
                <p className="text-sm leading-7 text-slate-300">
                  Complete information helps avoid wrong pricing, production
                  confusion and approval delays.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 text-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/70">
                <p className="text-sm font-black uppercase tracking-[0.25em] text-[#FF6A00]">
                  Policy Guide
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-tight">
                  Simple rules for safe packaging orders.
                </h2>

                <p className="mt-4 leading-7 text-slate-600">
                  Custom packaging depends on size, material, printing,
                  finishing, artwork approval and delivery details. These terms
                  help keep the quote and production process clear.
                </p>

                <div className="mt-7 rounded-3xl bg-[#07111F] p-6 text-white">
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-300">
                    Important
                  </p>
                  <p className="mt-3 leading-7 text-slate-300">
                    Final production should start only after customer approval
                    of artwork, size, material and order details.
                  </p>
                </div>
              </div>
            </aside>

            <div className="grid gap-5">
              {policies.map((policy, index) => (
                <article
                  key={policy.title}
                  className="rounded-3xl border border-slate-200 bg-white p-7 shadow-lg shadow-slate-200/60"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FF6A00] text-sm font-black text-white shadow-lg shadow-orange-500/20">
                      {index + 1}
                    </div>

                    <div>
                      <h2 className="text-2xl font-black tracking-tight text-slate-950">
                        {policy.title}
                      </h2>

                      <p className="mt-4 leading-8 text-slate-600">
                        {policy.text}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#07111F] px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-[#07111F] via-[#09243A] to-[#061525] p-8 shadow-2xl shadow-cyan-950/40 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-300">
                Need a confirmed quote?
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                Send complete product details before final pricing.
              </h2>

              <p className="mt-4 max-w-3xl leading-8 text-slate-300">
                For accurate pricing, send product size, quantity, material,
                printing colors, finishing options, artwork status and delivery
                country through our quote form.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
              <a
                href="https://wa.me/923338889954?text=Hello%20Printy%20Packaging%2C%20I%20need%20a%20custom%20packaging%20quote."
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 px-7 py-3 text-center text-sm font-black text-white transition hover:border-cyan-300 hover:text-cyan-300"
              >
                WhatsApp
              </a>

              <Link
                href="/?product=mailer-boxes#quote"
                className="rounded-full bg-[#FF6A00] px-7 py-3 text-center text-sm font-black text-white shadow-xl shadow-orange-500/25 transition hover:bg-[#007C91]"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


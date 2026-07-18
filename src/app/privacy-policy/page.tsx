import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Printy Packaging",
  description:
    "Read the Printy Packaging privacy policy for quote inquiries, customer information, website forms, cookies, data use and contact details.",
};

const policySections = [
  {
    title: "Information We Collect",
    text: "When you request a quote or contact Printy Packaging, we may collect your name, email address, phone number, company name, product details, packaging size, quantity, shipping country and any notes submitted through our website forms.",
  },
  {
    title: "How We Use Your Information",
    text: "We use submitted information to understand your packaging requirements, reply to your inquiry, prepare quote guidance, improve our website experience and manage customer communication.",
  },
  {
    title: "Quote Form Data",
    text: "Information submitted through our quote form may be used for email communication and internal quote tracking. Please do not submit passwords, private account credentials or sensitive payment information through the website.",
  },
  {
    title: "Cookies and Analytics",
    text: "Our website may use basic cookies or analytics tools to understand page visits, website performance and user experience. This helps us improve speed, content, navigation and usability.",
  },
  {
    title: "Data Sharing",
    text: "We do not sell customer inquiry information. We may share necessary project details only with trusted production, support or delivery partners when required to help process a packaging request.",
  },
  {
    title: "Data Security",
    text: "We take reasonable steps to protect submitted information, but no website transmission or storage system can be guaranteed to be completely secure.",
  },
  {
    title: "Customer Rights",
    text: "Customers can contact us to request correction, update or removal of their inquiry information where legally and practically possible.",
  },
  {
    title: "Policy Updates",
    text: "We may update this privacy policy when our website, process or legal requirements change. The latest version will be available on this page.",
  },
];

const privacyHighlights = [
  "Quote inquiry details",
  "Customer contact information",
  "Packaging project notes",
  "Website improvement data",
  "Email communication records",
  "Internal quote tracking",
];

const safeUsePoints = [
  "We use inquiry information to reply to packaging requests.",
  "We do not ask for sensitive passwords through website forms.",
  "We do not sell customer inquiry information.",
  "Customers can contact us for information update requests.",
];

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-[#07111F] text-white">
      <section className="relative overflow-hidden border-b border-cyan-400/10 bg-gradient-to-br from-[#07111F] via-[#09243A] to-[#061525]">
        <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
          <div>
            <div className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-400/10 px-5 py-2 text-sm font-black text-cyan-200 shadow-lg shadow-cyan-500/10">
              Privacy Policy
            </div>

            <h1 className="mt-8 max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              How we handle{" "}
              <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-cyan-300 bg-clip-text text-transparent">
                customer information.
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              This privacy policy explains how Printy Packaging may collect,
              use and protect information submitted through our website, quote
              forms and contact channels.
            </p>

            <p className="mt-5 text-sm font-bold text-slate-400">
              Last updated: July 2026
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-full bg-[#FF6A00] px-7 py-3 text-center text-sm font-black text-white shadow-xl shadow-orange-500/25 transition hover:bg-[#007C91]"
              >
                Contact Us
              </Link>

              <Link
                href="/terms"
                className="rounded-full border border-white/15 px-7 py-3 text-center text-sm font-bold text-white transition hover:border-cyan-300 hover:text-cyan-300"
              >
                View Terms
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-cyan-400/20 bg-white/[0.04] p-5 shadow-2xl shadow-cyan-950/40">
            <div className="rounded-[1.5rem] border border-white/10 bg-[#07111F] p-6">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-300">
                What This Covers
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-tight">
                Website forms, quote requests and customer communication.
              </h2>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {privacyHighlights.map((item) => (
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
                  This page is written to help customers understand how inquiry
                  information is used for packaging quote support.
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
                  Privacy Guide
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-tight">
                  Clear information for packaging buyers.
                </h2>

                <p className="mt-4 leading-7 text-slate-600">
                  When customers submit packaging inquiries, we use that
                  information to understand the project, reply properly and
                  support the quote process.
                </p>

                <div className="mt-7 grid gap-3">
                  {safeUsePoints.map((point) => (
                    <div
                      key={point}
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-black text-slate-700"
                    >
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            <div className="grid gap-5">
              {policySections.map((section, index) => (
                <article
                  key={section.title}
                  className="rounded-3xl border border-slate-200 bg-white p-7 shadow-lg shadow-slate-200/60"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FF6A00] text-sm font-black text-white shadow-lg shadow-orange-500/20">
                      {index + 1}
                    </div>

                    <div>
                      <h2 className="text-2xl font-black tracking-tight text-slate-950">
                        {section.title}
                      </h2>

                      <p className="mt-4 leading-8 text-slate-600">
                        {section.text}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white text-slate-950">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#FF6A00]">
              Customer Control
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              Need to update or correct your inquiry information?
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              Customers can contact Printy Packaging to request correction,
              update or removal of inquiry information where legally and
              practically possible.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-full bg-[#07111F] px-7 py-3 text-center text-sm font-black text-white transition hover:bg-[#FF6A00]"
              >
                Contact Support
              </Link>

              <Link
                href="/faq"
                className="rounded-full border border-slate-300 px-7 py-3 text-center text-sm font-black text-slate-950 transition hover:border-[#FF6A00] hover:text-[#FF6A00]"
              >
                Read FAQ
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-700">
              Privacy Note
            </p>

            <h3 className="mt-4 text-2xl font-black tracking-tight">
              Do not send sensitive account details through the quote form.
            </h3>

            <p className="mt-4 leading-8 text-slate-600">
              Our quote form is designed for packaging project details such as
              product size, quantity, material, printing and finishing needs. It
              is not designed for passwords, private account credentials or
              sensitive financial information.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#07111F] px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-[#07111F] via-[#09243A] to-[#061525] p-8 shadow-2xl shadow-cyan-950/40 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-300">
                Have privacy questions?
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                Contact Printy Packaging for information update requests.
              </h2>

              <p className="mt-4 max-w-3xl leading-8 text-slate-300">
                For privacy questions, correction requests or inquiry data
                updates, please contact us through the contact page.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
              <Link
                href="/contact"
                className="rounded-full bg-[#FF6A00] px-7 py-3 text-center text-sm font-black text-white shadow-xl shadow-orange-500/25 transition hover:bg-[#007C91]"
              >
                Contact Us
              </Link>

              <Link
                href="/terms"
                className="rounded-full border border-white/15 px-7 py-3 text-center text-sm font-black text-white transition hover:border-cyan-300 hover:text-cyan-300"
              >
                Terms Policy
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

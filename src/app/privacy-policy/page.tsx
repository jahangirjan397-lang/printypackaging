import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Printy Packaging",
  description:
    "Read the Printy Packaging privacy policy for quote inquiries, contact details, customer information and website usage.",
};

const sections = [
  {
    title: "Information We Collect",
    text: "When you request a quote or contact us, we may collect your name, email address, phone number, company name, product details, packaging size, quantity, shipping country and any notes you submit through our website forms.",
  },
  {
    title: "How We Use Information",
    text: "We use submitted information to understand your packaging requirements, reply to your inquiry, prepare quote guidance, improve our website experience and manage customer communication.",
  },
  {
    title: "Quote Form Data",
    text: "Information submitted through our quote form may be used for email communication and internal quote tracking. We do not ask users to submit sensitive payment passwords or private account credentials through the website.",
  },
  {
    title: "Cookies and Analytics",
    text: "Our website may use basic cookies or analytics tools to understand website performance, page visits and user experience. These tools help us improve speed, content and usability.",
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

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24 lg:px-8">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Privacy Policy
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            How Printy Packaging handles customer information.
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            This privacy policy explains how Printy Packaging may collect, use
            and protect information submitted through our website, quote forms
            and contact channels.
          </p>

          <p className="mt-4 text-sm text-slate-400">
            Last updated: July 2026
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
        <div className="space-y-6">
          {sections.map((section) => (
            <article
              key={section.title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-7"
            >
              <h2 className="text-2xl font-bold text-white">
                {section.title}
              </h2>
              <p className="mt-4 leading-8 text-slate-300">{section.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-cyan-300/20 bg-cyan-400/10 p-7">
          <h2 className="text-2xl font-bold">Contact About Privacy</h2>
          <p className="mt-4 leading-8 text-slate-300">
            For privacy questions or data update requests, contact Printy
            Packaging through our contact page.
          </p>

          <Link
            href="/contact"
            className="mt-6 inline-flex rounded-full bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}
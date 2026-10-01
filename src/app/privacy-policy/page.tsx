import type { Metadata } from "next";
import PolicyPage, { type PolicySection } from "@/components/PolicyPage";
import { teamEmails } from "@/data/businessInfo";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://printypackaging.com/privacy-policy",
  },
  title: "Privacy Policy",
  description:
    "Read the Printy Packaging privacy policy for quote inquiries, customer information, website forms, cookies, data use and contact details.",
};

const sections: PolicySection[] = [
  {
    id: "collect",
    title: "Information we collect",
    paragraphs: [
      "When you request a quote, place an order or contact Printy Packaging, we may collect your name, email address, phone number, company name, delivery address, product details, packaging size, quantity, artwork files and any notes you send through our website forms, email, live chat or WhatsApp.",
    ],
  },
  {
    id: "use",
    title: "How we use your information",
    bullets: [
      "To understand your packaging requirements and reply to your inquiry.",
      "To prepare quotes, proofs and invoices, and to produce and ship your order.",
      "To handle support requests, quality claims and reprints.",
      "To improve our website and customer communication.",
    ],
  },
  {
    id: "forms",
    title: "Quote forms and payments",
    paragraphs: [
      "Information submitted through our quote form is used for email communication and internal quote tracking. Never submit passwords, card numbers or other sensitive payment details through the website, email or chat. Payments are taken through secure payment links from our payment providers, and we do not store full card details.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies and analytics",
    paragraphs: [
      "Our website uses essential cookies to work properly. Analytics cookies, which help us understand page visits and website performance, are used only if you accept them in the cookie banner. You can change your choice at any time by clearing your browser's cookies.",
    ],
  },
  {
    id: "sharing",
    title: "Sharing your information",
    paragraphs: [
      "We do not sell customer information. We share only the details needed with trusted partners who help us run the business, such as production, payment, live chat, email and delivery providers, and only to process your request or order.",
    ],
  },
  {
    id: "security",
    title: "Data security",
    paragraphs: [
      "We take reasonable steps to protect the information you send us, but no website, transmission or storage system can be guaranteed to be completely secure.",
    ],
  },
  {
    id: "retention",
    title: "How long we keep information",
    paragraphs: [
      "We keep quote and order records, including approved proofs, for as long as needed to support repeat orders, claims, accounting and legal requirements, and then delete or anonymise them.",
    ],
  },
  {
    id: "rights",
    title: "Your rights",
    paragraphs: [
      `You can ask us to access, correct, update or delete your information where legally and practically possible by emailing ${teamEmails.support}.`,
    ],
  },
  {
    id: "updates",
    title: "Changes to this policy",
    paragraphs: [
      "We may update this privacy policy when our website, process or legal requirements change. The latest version is always on this page.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage
      eyebrow="Privacy Policy"
      title="How we handle customer information."
      intro="What information Printy Packaging collects through our website, quote forms and contact channels, how it is used, and how to ask us to change or remove it."
      updated="September 2026"
      highlights={[
        { label: "We never", value: "Sell customer information" },
        { label: "Payments", value: "Secure payment links only" },
        { label: "Analytics", value: "Only with your consent" },
        { label: "Your data", value: "Ask us to update or remove it" },
      ]}
      sections={sections}
      related={[
        { label: "Terms & Conditions", href: "/terms" },
        { label: "Return & Refund Policy", href: "/refund-policy" },
        { label: "Shipping Policy", href: "/shipping-policy" },
      ]}
    />
  );
}

import type { Metadata } from "next";
import PolicyPage, { type PolicySection } from "@/components/PolicyPage";
import { draftPolicyRobots, isDraftPolicy } from "@/data/policyStatus";
import { businessPromises, teamEmails } from "@/data/businessInfo";

const isDraft = isDraftPolicy("payment-policy");

export const metadata: Metadata = {
  robots: isDraft ? draftPolicyRobots : undefined,
  title: "Payment & Billing Policy",
  description:
    "Printy Packaging payment and billing policy: accepted payment methods, when payment is due, invoices, taxes, secure payment links, late payments and disputes.",
  alternates: {
    canonical: "https://printypackaging.com/payment-policy",
  },
};

const sections: PolicySection[] = [
  {
    id: "methods",
    title: "How you can pay",
    paragraphs: [
      "The payment methods available for your order, such as card payment or bank transfer, are shown on your quote and invoice.",
    ],
  },
  {
    id: "secure",
    title: "Secure payments only",
    paragraphs: [
      "We send a secure payment link or an official invoice for every order. Never send card numbers, CVV codes or passwords by email, chat, WhatsApp or the quote form, and we will never ask for them that way.",
      `Bank details for transfers appear only on our official invoices. If you ever receive a message asking you to pay a different account, do not pay and contact ${teamEmails.support} immediately.`,
    ],
  },
  {
    id: "when",
    title: "When payment is due",
    bullets: [
      "Payment terms are stated on your quote and invoice.",
      "Production is scheduled only after the agreed payment is received and the proof is approved.",
      "Where an invoice allows a deposit, the remaining balance must be paid in full before the order ships.",
      `Standard production of ${businessPromises.productionTime} starts from the day both payment and proof approval are complete.`,
    ],
  },
  {
    id: "pricing",
    title: "Prices, currency and quotes",
    bullets: [
      "Prices are in the currency shown on your quote, usually US dollars.",
      "Quotes are valid for 30 days. After that, prices may change with board and freight costs.",
      "Changes to size, quantity, material, finishes or delivery after the quote may change the price; we confirm any change before production.",
    ],
  },
  {
    id: "fees",
    title: "Fees, taxes and duties",
    bullets: [
      "Bank, wire and currency conversion fees charged on the customer's side are paid by the customer, so the full invoice amount reaches us.",
      "Import duties, VAT, GST and local taxes are paid by the customer unless the quote says the price is delivered duty paid (DDP).",
    ],
  },
  {
    id: "invoices",
    title: "Invoices and receipts",
    paragraphs: [
      `Every order has an invoice showing the products, quantities, prices, shipping and payment received. Email ${teamEmails.support} for copies of invoices or receipts, or if your company needs its details or a purchase order number on the invoice.`,
    ],
  },
  {
    id: "late",
    title: "Late or missing payments",
    paragraphs: [
      "Orders with unpaid invoices are put on hold and are not shipped until the balance is cleared. If payment is not completed within 30 days of proof approval, we may cancel the order and keep any amount needed to cover work, materials and costs already committed.",
    ],
  },
  {
    id: "refunds",
    title: "Refunds",
    paragraphs: [
      "Printed custom orders are not refundable in cash; faults caused by us are resolved with a reprint. Where a refund applies, such as a cancellation before production, it is paid to the original payment method, less any costs already committed and non-refundable payment fees. Full details are in our Return & Refund Policy.",
    ],
  },
  {
    id: "disputes",
    title: "Chargebacks and payment disputes",
    paragraphs: [
      "Please contact our support team before contacting your bank or payment provider; every valid claim is handled through our reprint process. If a chargeback is opened without doing so, we provide the bank with the approved proof, invoice, delivery tracking and correspondence. The order is then no longer eligible for a reprint, and the customer is responsible for chargeback fees and any costs of recovering the amount owed.",
    ],
  },
];

export default function PaymentPolicyPage() {
  return (
    <PolicyPage
      draft={isDraft}
      eyebrow="Payment & Billing Policy"
      title="Simple, secure payment for every order."
      intro="How to pay for your custom packaging, when payment is due, what fees and taxes apply, and how invoices, refunds and disputes are handled."
      updated="September 2026"
      highlights={[
        { label: "Methods", value: "Shown on your invoice" },
        { label: "Production starts", value: "After payment + proof approval" },
        { label: "Balance", value: "Paid in full before shipping" },
        { label: "Security", value: "Official links and invoices only" },
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

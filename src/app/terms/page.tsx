import type { Metadata } from "next";
import PolicyPage, { type PolicySection } from "@/components/PolicyPage";
import { draftPolicyRobots, isDraftPolicy } from "@/data/policyStatus";
import { businessPromises, teamEmails } from "@/data/businessInfo";

const isDraft = isDraftPolicy("terms");

export const metadata: Metadata = {
  robots: isDraft ? draftPolicyRobots : undefined,
  alternates: {
    canonical: "https://printypackaging.com/terms",
  },
  title: "Terms & Conditions",
  description:
    "Printy Packaging terms for custom packaging orders: quotes, proofs and artwork approval, colour, quantities, payment, production, shipping, claims and disputes.",
};

const sections: PolicySection[] = [
  {
    id: "about",
    title: "About these terms",
    paragraphs: [
      "These terms apply to every quote, order and website visit with Printy Packaging (\"we\", \"us\"). By approving a proof, paying an invoice or placing an order, the customer agrees to these terms and to our Return & Refund, Shipping, Artwork and Payment policies. If a written quote or invoice says something different, the quote or invoice applies to that order.",
    ],
  },
  {
    id: "quotes",
    title: "Quotes and pricing",
    bullets: [
      "Quotes are based on the size, style, material, quantity, printing, finishes and delivery country supplied by the customer. If any of these change, the price may change.",
      "A quote is valid for 30 days, because board and freight prices move.",
      "Prices are in the currency shown on the quote. Import duties and local taxes are not included unless the quote says the price is delivered duty paid (DDP).",
    ],
  },
  {
    id: "artwork",
    title: "Artwork, proofs and approval",
    paragraphs: [
      "Every order receives a free digital proof showing the dieline, artwork placement and finishes. The customer is responsible for checking spelling, text, barcodes, measurements, colours, orientation and every other detail.",
      "Production starts only after written approval of the proof (email or WhatsApp is accepted). Once approved, the proof is the final specification for the order. We are not responsible for errors that were present in an approved proof, and such errors do not qualify for a free reprint.",
    ],
    bullets: [
      "Send vector artwork (AI, PDF or EPS) or images at 300 DPI.",
      "Keep text at least 3 mm inside cut lines and extend background colour 3 mm past them (bleed). Full file requirements are in our Artwork Policy.",
      "The customer confirms they own or have permission to use every logo, image, font and trademark sent to us, and accepts responsibility for any claim arising from that artwork.",
    ],
  },
  {
    id: "colour",
    title: "Colour, finish and size tolerances",
    paragraphs: [
      "We print in CMYK unless Pantone (PMS) colours are agreed in writing. Printed colour can differ from screens, from earlier orders and between materials, for example white board and kraft. Small variations in colour, foil, texture and a cutting variation of up to 2 mm are normal and are not defects. Customers who need exact colour should order Pantone matching or a physical sample before the full run.",
    ],
  },
  {
    id: "quantities",
    title: "Quantities",
    paragraphs: [
      `Our minimum order is usually ${businessPromises.minimumOrder}; some styles differ and the quote will say. Production can run up to 5% over or under the ordered quantity. Overs are not charged. Unders within 5% are normal; if we deliver more than 5% short, we print the missing quantity.`,
    ],
  },
  {
    id: "payment",
    title: "Payment",
    bullets: [
      "Payment terms are shown on the invoice. Production is scheduled only after the agreed payment has been received.",
      "Available payment methods are shown on the quote and invoice. Transfer and bank fees on the customer's side are paid by the customer.",
      "Orders are not shipped until any balance on the invoice has been paid in full. Full details are in our Payment Policy.",
      "Card numbers and passwords must never be sent through the quote form, email or chat. We send secure payment links instead.",
    ],
  },
  {
    id: "production",
    title: "Production time",
    paragraphs: [
      `Standard production is ${businessPromises.productionTime} after proof approval and payment, plus shipping time. Rush production is available on many items for an extra charge; rush orders are non-refundable and cannot be cancelled once confirmed. Production dates are estimates and are not guaranteed, but we tell the customer straight away if an order is running late.`,
    ],
  },
  {
    id: "shipping",
    title: "Shipping and delivery",
    paragraphs: [
      "Standard shipping to one address is included in the price of new orders unless the quote shows it separately. Reprints, replacements, returns and re-deliveries are shipped at the customer's expense. Import duties and taxes are paid by the customer unless the order is DDP. Delivery is complete when tracking shows the order delivered to the address supplied. Full details are in our Shipping Policy.",
    ],
  },
  {
    id: "claims",
    title: "Quality claims and reprints",
    paragraphs: [
      `Defects, damage and missing items must be reported to ${teamEmails.support} within 7 calendar days of delivery (48 hours for transit damage), with photos, a video and the order number, and the goods must be kept as delivered. Our quality team decides whether a claim is valid and its decision is final. A valid claim is resolved by a free reprint of the affected items, with shipping paid by the customer. Printed orders are not refunded in cash. Full details are in our Return & Refund Policy.`,
    ],
  },
  {
    id: "disputes",
    title: "Disputes and chargebacks",
    paragraphs: [
      "The customer agrees to raise any problem with our support team first and to follow the claims process before contacting a bank or payment provider. If a chargeback or payment dispute is opened instead, we will submit the approved proof, order records, delivery tracking and correspondence as evidence; the order is no longer eligible for a reprint, and the customer is responsible for chargeback fees and any costs of recovering the amount owed.",
    ],
  },
  {
    id: "designs",
    title: "Designs, dielines and samples",
    bullets: [
      "Customer logos and artwork remain the customer's property. We use them only to produce the customer's orders.",
      "Dielines, structural designs and templates created by Printy Packaging remain our property and may be reused for the customer's repeat orders.",
      "We only show photos of customer packaging on our website or social media with the customer's permission.",
    ],
  },
  {
    id: "liability",
    title: "Limit of liability",
    paragraphs: [
      "Our total liability for any order is limited to reprinting the defective items or, where a reprint is not possible, the amount paid for those items. We are not liable for indirect or consequential losses, including lost sales, lost profit, missed launch dates, marketplace penalties or the value of products packed in our packaging. Printy Packaging does not certify its packaging as food-grade or food-safe; if packaging will touch food, the customer is responsible for checking it is suitable and for using a liner where needed. Nothing in these terms limits rights that cannot be limited under the law that applies to the customer.",
    ],
  },
  {
    id: "website",
    title: "Website information",
    paragraphs: [
      "Guides, images, prices and examples on this website are general information. Mockups show a design direction and the final product may differ. Only a written quote and an approved proof form part of an order.",
    ],
  },
  {
    id: "changes",
    title: "Changes to these terms",
    paragraphs: [
      "We may update these terms from time to time. The version published on this page when the proof is approved applies to that order.",
    ],
  },
];

export default function TermsPage() {
  return (
    <PolicyPage
      draft={isDraft}
      eyebrow="Terms & Conditions"
      title="Clear terms for custom packaging orders."
      intro="How quotes, proofs, payment, production, shipping, claims and disputes work when you order custom packaging from Printy Packaging."
      updated="September 2026"
      highlights={[
        { label: "Quote valid", value: "30 days" },
        { label: "Proof", value: "Free digital proof on every order" },
        { label: "Production", value: `${businessPromises.productionTime} after approval` },
        { label: "Claims", value: "Within 7 days of delivery" },
      ]}
      sections={sections}
      related={[
        { label: "Return & Refund Policy", href: "/refund-policy" },
        { label: "Shipping Policy", href: "/shipping-policy" },
        { label: "Artwork Policy", href: "/artwork-policy" },
        { label: "Payment Policy", href: "/payment-policy" },
      ]}
    />
  );
}

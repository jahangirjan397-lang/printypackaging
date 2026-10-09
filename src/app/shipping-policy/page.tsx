import type { Metadata } from "next";
import PolicyPage, { type PolicySection } from "@/components/PolicyPage";
import { draftPolicyRobots, isDraftPolicy } from "@/data/policyStatus";
import { businessPromises, teamEmails } from "@/data/businessInfo";

const isDraft = isDraftPolicy("shipping-policy");

export const metadata: Metadata = {
  robots: isDraft ? draftPolicyRobots : undefined,
  title: "Shipping Policy",
  description:
    "Printy Packaging shipping policy: where we ship, delivery times, who pays shipping, duties and taxes, tracking, address changes and damaged or lost parcels.",
  alternates: {
    canonical: "https://printypackaging.com/shipping-policy",
  },
};

const sections: PolicySection[] = [
  {
    id: "where",
    title: "Where we ship",
    paragraphs: [
      "We ship custom packaging and print orders to the USA, UK, Canada, Europe, the UAE, Australia and most other countries, by express courier, air freight or sea freight depending on order size and deadline.",
    ],
  },
  {
    id: "cost",
    title: "Who pays for shipping",
    bullets: [
      "New orders: standard shipping to one delivery address is included in your quoted price, unless the quote shows shipping as a separate line.",
      "Express or rush delivery, extra delivery addresses and special handling (liftgate, appointment or residential delivery for freight) are charged at cost and shown on your quote.",
      "Reprints, replacements, returns sent to us and re-deliveries are shipped at the customer's expense, including reprints approved under our Return & Refund Policy.",
      "Samples and sample kits are shipped at the customer's expense unless your quote says otherwise.",
    ],
  },
  {
    id: "timing",
    title: "Production and delivery time",
    paragraphs: [
      `Production takes ${businessPromises.productionTime} after proof approval and payment. Transit time is added after production and depends on the shipping method and destination. As a guide, express courier takes about 3–7 business days and freight takes longer.`,
      "Delivery dates are estimates, not guarantees. We are not responsible for delays caused by carriers, customs inspections, weather, holidays or other events outside our control, and such delays are not grounds for cancellation, refund or discount.",
    ],
  },
  {
    id: "duties",
    title: "Customs duties and taxes",
    paragraphs: [
      "Unless your quote says the price is delivered duty paid (DDP), the customer is responsible for import duties, VAT, GST, sales tax, brokerage and any customs charges in the destination country. Orders refused because of these charges are not refunded, and any return or storage costs are billed to the customer.",
    ],
  },
  {
    id: "tracking",
    title: "Dispatch and tracking",
    paragraphs: [
      "When your order ships, our support team emails the tracking number, usually within 1–2 business days of dispatch. Larger orders may arrive in several cartons or shipments, each with its own tracking.",
    ],
  },
  {
    id: "address",
    title: "Delivery address",
    bullets: [
      "Please confirm a complete delivery address, a contact name and a phone number before your order ships.",
      "Address changes are possible only before dispatch. Changes after dispatch are made through the carrier where possible and any charge is paid by the customer.",
      "If a parcel is returned because of a wrong address, failed delivery attempts or refusal, re-delivery costs are paid by the customer.",
    ],
  },
  {
    id: "risk",
    title: "When the order becomes yours",
    paragraphs: [
      "Delivery is complete when the carrier's tracking shows the order as delivered to the address you gave us. From that point the customer is responsible for the goods, including storage in suitable dry conditions.",
    ],
  },
  {
    id: "damage",
    title: "Damaged cartons",
    paragraphs: [
      `Check the number of cartons and their condition before signing. Note any visible damage on the delivery receipt, take photos and a video before unpacking, and email ${teamEmails.support} within 48 hours of delivery. We file the claim with the carrier and, once the carrier confirms the damage, we reprint the affected items. Claims reported after 48 hours, or goods signed for as received in good condition without a damage note, may not be accepted by the carrier.`,
    ],
  },
  {
    id: "lost",
    title: "Lost parcels",
    paragraphs: [
      "If tracking has not updated for 7 business days, or a parcel shows delivered but has not arrived, tell us straight away. We open an investigation with the carrier. If the carrier confirms the parcel is lost, we reprint and reship the missing items at our cost on a new order's standard shipping.",
    ],
  },
];

export default function ShippingPolicyPage() {
  return (
    <PolicyPage
      draft={isDraft}
      eyebrow="Shipping Policy"
      title="How your packaging gets to you."
      intro="Where we ship, how long delivery takes, what shipping costs are included, and what to do if a carton arrives damaged or goes missing."
      updated="September 2026"
      highlights={[
        { label: "New orders", value: "Standard shipping included" },
        { label: "Production", value: `${businessPromises.productionTime} + transit` },
        { label: "Duties & taxes", value: "Paid by customer unless DDP" },
        { label: "Transit damage", value: "Report within 48 hours" },
      ]}
      sections={sections}
      related={[
        { label: "Return & Refund Policy", href: "/refund-policy" },
        { label: "Terms & Conditions", href: "/terms" },
        { label: "Contact Support", href: "/contact" },
      ]}
    />
  );
}

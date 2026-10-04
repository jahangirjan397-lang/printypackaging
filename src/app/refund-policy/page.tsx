import type { Metadata } from "next";
import PolicyPage, { type PolicySection } from "@/components/PolicyPage";
import { draftPolicyRobots, isDraftPolicy } from "@/data/policyStatus";
import { teamEmails } from "@/data/businessInfo";

const isDraft = isDraftPolicy("refund-policy");

export const metadata: Metadata = {
  robots: isDraft ? draftPolicyRobots : undefined,
  title: "Return, Reprint & Refund Policy",
  description:
    "How Printy Packaging handles faulty custom packaging: free reprints for our errors, the proof we need, rush orders, cancellations and chargebacks.",
  alternates: {
    canonical: "https://printypackaging.com/refund-policy",
  },
};

const sections: PolicySection[] = [
  {
    id: "made-to-order",
    title: "Custom packaging is made to order",
    paragraphs: [
      "Every box, bag, label and print we produce carries your artwork and is cut to your size. It cannot be resold, so printed orders are not returnable or refundable for a change of mind, a wrong quantity ordered, a design change or because the packaging is no longer needed.",
      "If we make a mistake, we put it right with a free reprint of the affected items, as explained below. Printed orders are not refunded in cash.",
    ],
  },
  {
    id: "report",
    title: "Report a problem within 10 days",
    paragraphs: [
      `Please inspect your order as soon as it arrives. Any defect, damage, missing quantity or printing error must be reported within 10 calendar days of delivery (as shown by the carrier's tracking) by emailing ${teamEmails.support}. Claims received after 10 days are not eligible for a reprint or review.`,
    ],
  },
  {
    id: "evidence",
    title: "What we need to review a claim",
    bullets: [
      "Your order or invoice number.",
      "Clear photos of the problem and a continuous video that shows the affected items, the outer shipping cartons and their labels.",
      "The number of pieces affected, out of the total delivered.",
      "All items and cartons kept as delivered until the claim is closed. Do not use, alter or throw away the order.",
    ],
  },
  {
    id: "decision",
    title: "How claims are decided",
    paragraphs: [
      "Our quality team compares your photos and video with the proof you approved, your order specification and our production records. We reply within 2 business days. The quality team's decision on whether an item is defective and who is responsible is final.",
    ],
  },
  {
    id: "our-fault",
    title: "If the fault is ours",
    paragraphs: [
      "A fault is ours when the delivered items do not match the approved proof and order, for example the wrong size, style or material, clear print defects, missing ordered finishes, or poor cutting and gluing that makes items unusable. In that case:",
    ],
    bullets: [
      "We reprint the affected quantity free of charge. The whole order is reprinted only if the whole order is affected.",
      "When we ask for the items back, you return them within 10 working days of our approval, using the return address we send you.",
      "Shipping costs for the return and for delivering the reprint are paid by the customer. Printing, materials and finishing for the reprint are free.",
      "The reprint goes into production as a priority as soon as the returned items arrive and the fault is confirmed.",
    ],
  },
  {
    id: "customer-fault",
    title: "If the problem comes from the order or artwork",
    paragraphs: [
      "No free reprint is given when the problem was in the proof you approved or the details you supplied, such as spelling, text, barcodes, measurements, colours in your file, image quality or the quantity ordered. We are happy to reprint with corrections as a new order at our normal price plus shipping.",
    ],
  },
  {
    id: "tolerances",
    title: "Normal production tolerances",
    bullets: [
      "Colour: printed colour can differ slightly from screens, earlier orders and between materials such as white board and kraft. Only Pantone-matched orders are checked against a Pantone reference.",
      "Quantity: deliveries within 5% over or under the ordered quantity are normal. Overs are not charged and unders within 5% are not reprinted.",
      "Minor flaws: up to 3% of pieces with small marks, scuffs or slight cutting variation is within normal industry tolerance and is not treated as a defect.",
      "Size: a cutting variation of up to 2 mm is normal for custom boxes.",
    ],
  },
  {
    id: "rush",
    title: "Rush orders",
    paragraphs: [
      "Rush orders reserve press time and materials the moment they are confirmed. They are non-refundable and cannot be cancelled once confirmed. A proven fault on a rush order is handled with the same reprint process above, on our standard production time.",
    ],
  },
  {
    id: "cancellations",
    title: "Cancellations",
    bullets: [
      "Before the proof is approved: the order can be cancelled and payment is refunded, minus any design or dieline work already completed and card or payment fees.",
      "After proof approval, before printing: payment is refunded minus design, plate, die and material costs already committed to your order.",
      "Once printing has started: the order cannot be cancelled or refunded.",
      "Rush orders: cannot be cancelled or refunded once confirmed.",
    ],
  },
  {
    id: "transit",
    title: "Damage or loss in transit",
    paragraphs: [
      "Check cartons before signing for them and note any visible damage on the delivery receipt. Report transit damage within 48 hours of delivery with photos and a video taken before unpacking. We file the claim with the carrier and, once the carrier confirms damage or loss, we reprint the affected items. See our Shipping Policy for full details.",
    ],
  },
  {
    id: "chargebacks",
    title: "Chargebacks and payment disputes",
    paragraphs: [
      "Chargebacks are not a way to resolve quality claims. Please contact our support team first; every valid claim is resolved through the reprint process on this page.",
      "If a chargeback or payment dispute is opened without first following this policy, we will provide the bank with the approved proof, order records, delivery tracking and our correspondence. The order is then no longer eligible for a reprint, and the customer is responsible for any chargeback fees and recovery costs.",
    ],
  },
  {
    id: "samples",
    title: "Samples",
    paragraphs: [
      "Sample and prototype orders are made to order and are non-refundable. A sample that arrives damaged is replaced once, with shipping paid by the customer.",
    ],
  },
];

export default function RefundPolicyPage() {
  return (
    <PolicyPage
      draft={isDraft}
      eyebrow="Return, Reprint & Refund Policy"
      title="If we make a mistake, we reprint it."
      intro="This policy explains what to do if your custom packaging arrives with a problem, what we need to review it, and how reprints, cancellations and disputes are handled."
      updated="September 2026"
      highlights={[
        { label: "Report within", value: "10 days of delivery" },
        { label: "Our error", value: "Free reprint (shipping paid by customer)" },
        { label: "We need", value: "Photos, video and the items kept" },
        { label: "Rush orders", value: "Non-refundable" },
      ]}
      sections={sections}
      related={[
        { label: "Shipping Policy", href: "/shipping-policy" },
        { label: "Terms & Conditions", href: "/terms" },
        { label: "Contact Support", href: "/contact" },
      ]}
    />
  );
}

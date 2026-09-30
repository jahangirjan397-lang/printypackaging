import type { Metadata } from "next";
import PolicyPage, { type PolicySection } from "@/components/PolicyPage";
import { draftPolicyRobots, isDraftPolicy } from "@/data/policyStatus";
import { businessPromises, teamEmails } from "@/data/businessInfo";

const isDraft = isDraftPolicy("artwork-policy");

export const metadata: Metadata = {
  robots: isDraft ? draftPolicyRobots : undefined,
  title: "Artwork & Proof Approval Policy",
  description:
    "How to send print-ready artwork to Printy Packaging: file formats, bleed, colours, proofs, approval, design help and who is responsible for artwork errors.",
  alternates: {
    canonical: "https://printypackaging.com/artwork-policy",
  },
};

const sections: PolicySection[] = [
  {
    id: "files",
    title: "Files we accept",
    bullets: [
      "Best: vector PDF, AI or EPS with fonts converted to outlines.",
      "Also accepted: PSD, TIFF, PNG or JPG at 300 DPI at full print size.",
      "Logos from websites or screenshots are usually too low in quality to print sharply. We will tell you if a file is not suitable.",
      "Send files to your sales contact or by email. Large files can be shared by Google Drive, Dropbox or WeTransfer links.",
    ],
  },
  {
    id: "setup",
    title: "Print-ready setup",
    bullets: [
      "Place artwork on the dieline we send you and keep it on its own layer.",
      "Bleed: extend background colours and images 3 mm (0.125 in) past every cut line.",
      "Safe area: keep text and logos at least 3 mm inside cut and fold lines.",
      "Colours: set files in CMYK. Name any Pantone (PMS) colours you need matched.",
      "Barcodes: at least 100% of standard size, printed in solid black on a light background.",
    ],
  },
  {
    id: "design-help",
    title: "Design and dieline help",
    paragraphs: [
      `${businessPromises.designSupport} is included with every order. We build the dieline to your product size and place your logo and text. Creating a full brand design, illustrations or photography from scratch is quoted separately before any work starts.`,
    ],
  },
  {
    id: "proofs",
    title: "Digital proofs",
    paragraphs: [
      "Before production we send a digital proof showing the dieline, artwork placement, colours and finishes. Changes to the proof are free until you approve it. If a request becomes a new design rather than a change, we will quote it first.",
      "Digital proofs show layout and content. Colours on a screen are not an exact match for printed colour, and the proof is not a colour proof. Ask for a physical sample if colour matching is critical.",
    ],
  },
  {
    id: "approval",
    title: "Approval is final",
    paragraphs: [
      "Please check every detail of the proof: spelling, text, prices, barcodes, ingredients, measurements, colours, orientation and which panel is the front. Written approval by email or WhatsApp confirms the proof as the final specification and sends the order to production.",
      "Printy Packaging is not responsible for mistakes that were visible in an approved proof. Reprints needed to correct them are charged as a new order.",
    ],
  },
  {
    id: "changes-after",
    title: "Changes after approval",
    paragraphs: [
      "Changes after approval are possible only if printing has not started. Any plates, dies or materials already prepared are charged, and the production date moves back.",
    ],
  },
  {
    id: "rights",
    title: "Your rights to the artwork",
    bullets: [
      "You confirm you own, or have permission to use, every logo, image, font, character and trademark you send us.",
      "You are responsible for any claim that artwork infringes someone else's rights, and you agree to cover any cost this causes Printy Packaging.",
      "We may refuse artwork that copies another brand, contains illegal or offensive content, or makes claims we believe are misleading.",
    ],
  },
  {
    id: "regulated",
    title: "Legal and regulated text",
    paragraphs: [
      "You are responsible for the accuracy and legal compliance of product information on your packaging, such as ingredients, allergens, nutrition facts, dosage, safety warnings, recycling marks and country-of-origin text. We print the approved content as supplied and do not check it against the regulations of your market.",
    ],
  },
  {
    id: "storage",
    title: "File storage and reorders",
    paragraphs: [
      `We keep your approved artwork and dieline for at least 12 months so reorders are quick. Your artwork stays yours; we use it only for your orders. Email ${teamEmails.support} if you need your files or want them deleted.`,
    ],
  },
];

export default function ArtworkPolicyPage() {
  return (
    <PolicyPage
      draft={isDraft}
      eyebrow="Artwork & Proof Approval Policy"
      title="Send artwork once, print it right."
      intro="What files to send, how to set them up for print, how proofs and approval work, and who is responsible for the content of your artwork."
      updated="September 2026"
      highlights={[
        { label: "Best file", value: "Vector PDF, AI or EPS" },
        { label: "Bleed / safe area", value: "3 mm each" },
        { label: "Proof changes", value: "Free until you approve" },
        { label: "After approval", value: "Proof is final" },
      ]}
      sections={sections}
      related={[
        { label: "Artwork & Dieline Guide", href: "/artwork-guide" },
        { label: "Terms & Conditions", href: "/terms" },
        { label: "Return & Refund Policy", href: "/refund-policy" },
      ]}
    />
  );
}

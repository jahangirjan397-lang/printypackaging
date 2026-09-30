// Printy Packaging business promises and contact details, shown across the
// site (product pages, quote form, header, contact page).
//
// The values are edited from /admin -> "Business Info" and "Reviews & Team"
// (content/settings/business.json and content/settings/reviews.json).
// They are promises to buyers, so keep them in line with what the business
// really delivers.

import business from "../../content/settings/business.json";
import reviews from "../../content/settings/reviews.json";

// Team inboxes. Sales handles quotes and new orders; support handles
// order updates, quality claims, reprints and shipping questions.
export const teamEmails = {
  sales: "sales@printypackaging.com",
  support: "support@printypackaging.com",
};

// Set to true once the card/PayPal/Stripe merchant accounts are live, to show
// the payment brand icons on the home page.
export const paymentMethodsVerified = false;

export const businessPromises = {
  // Smallest order you accept for most box styles
  minimumOrder: business.minimumOrder,
  // Production time after the buyer approves the proof
  productionTime: business.productionTime,
  // How quickly the sales team replies to a quote request
  quoteResponse: business.quoteResponse,
  // Design / dieline help
  designSupport: business.designSupport,
  // Sample offer shown on product pages and the sample kit page
  sampleOffer: business.sampleOffer,
};

// Public sales phone (e.g. your US or UK business number).
// Leave `display` empty to hide the phone everywhere.
export const salesPhone = {
  display: business.salesPhoneDisplay ?? "",
  // Digits only with country code, e.g. "+19175550123"
  tel: business.salesPhoneTel ?? "",
};

export type SalesPerson = {
  name: string;
  role: string;
  email: string;
  // Optional: path under /public, e.g. "/images/team/jahangir.webp"
  photo?: string;
};

// Real people buyers can contact. The section is hidden while this is empty.
export const salesTeam: SalesPerson[] = reviews.salesTeam as SalesPerson[];

export type CustomerReview = {
  name: string;
  company: string;
  country: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  // Where the review was left (Google, Trustpilot, email…)
  source: string;
};

// Only add genuine reviews from real customers (copy them from Google,
// Trustpilot or client emails with permission). The reviews section and
// the star-rating schema stay hidden until at least one review is added.
export const customerReviews: CustomerReview[] = (
  reviews.customerReviews as CustomerReview[]
).map((review) => ({
  ...review,
  rating: Math.min(5, Math.max(1, Math.round(Number(review.rating)))) as CustomerReview["rating"],
}));

// Public link to your Trustpilot or Google reviews page (optional)
export const reviewsProfileUrl: string = business.reviewsProfileUrl ?? "";

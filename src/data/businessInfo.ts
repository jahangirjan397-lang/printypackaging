// Printy Packaging business promises and contact details, shown across the
// site (product pages, quote form, header, contact page).
//
// Confirmed by the owner (Sept 2026). These are promises to buyers, so keep
// them in line with what the business really delivers.

export const businessPromises = {
  // Smallest order you accept for most box styles
  minimumOrder: "100 boxes",
  // Production time after the buyer approves the proof
  productionTime: "12–15 business days",
  // How quickly the sales team replies to a quote request
  quoteResponse: "within 1 hour (business hours)",
  // Design / dieline help
  designSupport: "Free design & dieline support",
  // Sample offer shown on product pages and the sample kit page
  sampleOffer: "Free sample kit on orders of 10,000+ units",
};

// Public sales phone (e.g. your US or UK business number).
// Leave `display` empty to hide the phone everywhere.
export const salesPhone = {
  display: "",
  // Digits only with country code, e.g. "+19175550123"
  tel: "",
};

export type SalesPerson = {
  name: string;
  role: string;
  email: string;
  // Optional: path under /public, e.g. "/images/team/jahangir.webp"
  photo?: string;
};

// Real people buyers can contact. The section is hidden while this is empty.
export const salesTeam: SalesPerson[] = [];

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
export const customerReviews: CustomerReview[] = [];

// Public link to your Trustpilot or Google reviews page (optional)
export const reviewsProfileUrl = "";

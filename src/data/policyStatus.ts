// Policy pages whose business rules (claim windows, shipping costs,
// cancellation terms, etc.) still need the owner's approval.
//
// While a page is listed here it shows a "draft" banner, is hidden from
// search engines, and is left out of the sitemap and footer. Remove a slug
// once its wording is approved.
export const draftPolicies = new Set<string>([
  "terms",
  "refund-policy",
  "shipping-policy",
  "artwork-policy",
  "payment-policy",
]);

export function isDraftPolicy(slug: string) {
  return draftPolicies.has(slug);
}

export const draftPolicyRobots = { index: false, follow: true };

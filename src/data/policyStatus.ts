// Policy pages whose business rules (claim windows, shipping costs,
// cancellation terms, etc.) still need the owner's approval.
//
// While a page is listed here it shows a "draft" banner, is hidden from
// search engines, and is left out of the sitemap and footer. Remove a slug
// once its wording is approved.
// All policies approved by the owner (30 Sep 2026). Add a slug back here to
// mark a rewritten policy as a draft again.
export const draftPolicies = new Set<string>([]);

export function isDraftPolicy(slug: string) {
  return draftPolicies.has(slug);
}

export const draftPolicyRobots = { index: false, follow: true };

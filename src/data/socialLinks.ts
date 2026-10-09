// Printy Packaging social profiles.
//
// The URLs are edited from /admin -> "Social Links"
// (content/settings/social.json). A platform with an empty url is hidden
// everywhere on the site (footer, contact page, schema), so only real,
// working profiles are ever linked.
//
// These URLs are also sent to Google as `sameAs` in the Organization schema,
// which tells search engines these profiles belong to printypackaging.com.

import socialUrls from "../../content/settings/social.json";

export type SocialPlatform =
  | "linkedin"
  | "instagram"
  | "facebook"
  | "youtube"
  | "tiktok"
  | "pinterest"
  | "x"
  | "googleBusiness";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  url: string;
  // Short line shown on the contact page card
  purpose: string;
};

const platformDetails: Omit<SocialLink, "url">[] = [
  {
    platform: "linkedin",
    label: "LinkedIn",
    purpose: "B2B buyers, brand managers and sourcing teams",
  },
  {
    platform: "instagram",
    label: "Instagram",
    purpose: "Finished boxes, unboxing reels and print finishes",
  },
  {
    platform: "facebook",
    label: "Facebook",
    purpose: "Updates, reviews and direct messages",
  },
  {
    platform: "youtube",
    label: "YouTube",
    purpose: "Production videos, box styles and finish close-ups",
  },
  {
    platform: "tiktok",
    label: "TikTok",
    purpose: "Short packaging and unboxing videos",
  },
  {
    platform: "pinterest",
    label: "Pinterest",
    purpose: "Packaging design ideas buyers save and share",
  },
  {
    platform: "x",
    label: "X (Twitter)",
    purpose: "News and quick updates",
  },
  {
    platform: "googleBusiness",
    label: "Google Business",
    purpose: "Reviews and local search visibility",
  },
];

export const socialLinks: SocialLink[] = platformDetails.map((link) => ({
  ...link,
  url: (socialUrls as Partial<Record<SocialPlatform, string>>)[link.platform] ?? "",
}));

export const activeSocialLinks = socialLinks.filter((link) =>
  /^https:\/\/\S+$/.test(link.url.trim()),
);

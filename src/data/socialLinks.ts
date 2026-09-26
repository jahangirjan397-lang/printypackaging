// Printy Packaging social profiles.
//
// Paste each profile's full URL below. A platform with an empty url is
// hidden everywhere on the site (footer, contact page, schema), so only
// real, working profiles are ever linked.
//
// These URLs are also sent to Google as `sameAs` in the Organization schema,
// which tells search engines these profiles belong to printypackaging.com.

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

export const socialLinks: SocialLink[] = [
  {
    platform: "linkedin",
    label: "LinkedIn",
    url: "",
    purpose: "B2B buyers, brand managers and sourcing teams",
  },
  {
    platform: "instagram",
    label: "Instagram",
    url: "",
    purpose: "Finished boxes, unboxing reels and print finishes",
  },
  {
    platform: "facebook",
    label: "Facebook",
    url: "",
    purpose: "Updates, reviews and direct messages",
  },
  {
    platform: "youtube",
    label: "YouTube",
    url: "",
    purpose: "Production videos, box styles and finish close-ups",
  },
  {
    platform: "tiktok",
    label: "TikTok",
    url: "",
    purpose: "Short packaging and unboxing videos",
  },
  {
    platform: "pinterest",
    label: "Pinterest",
    url: "",
    purpose: "Packaging design ideas buyers save and share",
  },
  {
    platform: "x",
    label: "X (Twitter)",
    url: "",
    purpose: "News and quick updates",
  },
  {
    platform: "googleBusiness",
    label: "Google Business",
    url: "",
    purpose: "Reviews and local search visibility",
  },
];

export const activeSocialLinks = socialLinks.filter((link) =>
  /^https:\/\/\S+$/.test(link.url.trim()),
);

const sessionKey = "printy-lead-source";
// First outside visit is kept for 90 days, so a buyer who found us on Google
// and comes back later by typing the address still counts as SEO.
const firstTouchKey = "printy-first-touch";
const firstTouchDays = 90;

// Map referrer hosts to readable platform names
const referrerPlatforms: Array<[RegExp, string]> = [
  [/(^|\.)linkedin\.com$|(^|\.)lnkd\.in$/, "linkedin"],
  [/(^|\.)instagram\.com$/, "instagram"],
  [/(^|\.)facebook\.com$|(^|\.)fb\.com$|(^|\.)fb\.me$/, "facebook"],
  [/(^|\.)youtube\.com$|(^|\.)youtu\.be$/, "youtube"],
  [/(^|\.)tiktok\.com$/, "tiktok"],
  [/(^|\.)pinterest\.[a-z.]+$|(^|\.)pin\.it$/, "pinterest"],
  [/(^|\.)x\.com$|(^|\.)twitter\.com$|(^|\.)t\.co$/, "x"],
  [/(^|\.)threads\.net$|(^|\.)threads\.com$/, "threads"],
  [/(^|\.)reddit\.com$/, "reddit"],
  [/mail\.|outlook\.|(^|\.)gmail\.com$/, "email"],
  [/(^|\.)google\.[a-z.]+$/, "google"],
  [/(^|\.)bing\.com$/, "bing"],
  [/(^|\.)yahoo\.[a-z.]+$/, "yahoo"],
  [/(^|\.)duckduckgo\.com$/, "duckduckgo"],
  [/(^|\.)chatgpt\.com$|(^|\.)openai\.com$|(^|\.)perplexity\.ai$|(^|\.)claude\.ai$|(^|\.)gemini\.google\.com$/, "ai-chat"],
  [/(^|\.)whatsapp\.com$|(^|\.)wa\.me$/, "whatsapp"],
];

const searchEngines = /^(google|bing|yahoo|duckduckgo)$/;
const socialSites = /^(linkedin|instagram|facebook|youtube|tiktok|pinterest|x|threads|reddit)$/;

// Channel buckets the sheet reports on: SEO, Ads, Social, Email, WhatsApp,
// AI chat, Referral (another website), Direct.
function channelFor(source: string, medium: string, params: URLSearchParams) {
  const m = medium.toLowerCase();
  const s = source.toLowerCase();
  if (
    params.has("gclid") || params.has("gbraid") || params.has("wbraid") ||
    params.has("msclkid") || params.has("ttclid") ||
    /^(cpc|ppc|paid|paid[_-]?social|paidsocial|display|ads?)$/.test(m)
  ) {
    return "Ads";
  }
  if (m === "email" || /cold[-_ ]?email|newsletter|outreach/.test(s) || s === "email") return "Email";
  if (m === "social" || m === "social_share" || socialSites.test(s)) return "Social";
  if (s === "whatsapp") return "WhatsApp";
  if (s === "ai-chat") return "AI chat";
  if (m === "organic" || searchEngines.test(s)) return "SEO";
  if (!s || s === "direct") return "Direct";
  return "Referral";
}

function clean(value: string | null) {
  return (value ?? "").replace(/[^\w .:/-]/g, "").trim().slice(0, 60);
}

function readFirstTouch() {
  try {
    const raw = window.localStorage.getItem(firstTouchKey);
    if (!raw) return "";
    const saved = JSON.parse(raw) as { v?: string; t?: number };
    if (!saved.v || !saved.t || Date.now() - saved.t > firstTouchDays * 86400000) {
      window.localStorage.removeItem(firstTouchKey);
      return "";
    }
    return saved.v;
  } catch {
    return "";
  }
}

// Record where this visit came from, once per browser session.
// Saved text, e.g. "SEO: google | landing: /mailer-boxes"
// or "Ads: google / cpc / rigid-boxes | landing: /rigid-boxes | first: SEO: google".
export function captureLeadSource() {
  try {
    if (window.sessionStorage.getItem(sessionKey)) {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    let source = clean(params.get("utm_source"));
    const medium = clean(params.get("utm_medium"));

    if (!source && document.referrer) {
      const host = new URL(document.referrer).hostname.replace(/^www\./, "");
      if (host && host !== window.location.hostname.replace(/^www\./, "")) {
        source =
          referrerPlatforms.find(([pattern]) => pattern.test(host))?.[1] ?? host;
      }
    }
    if (!source && (params.has("gclid") || params.has("gbraid") || params.has("wbraid"))) source = "google";
    if (!source && params.has("msclkid")) source = "bing";

    const channel = channelFor(source, medium, params);
    const parts = [
      source || "direct",
      medium,
      clean(params.get("utm_campaign")),
    ].filter(Boolean);
    const thisVisit = `${channel}: ${parts.join(" / ")}`;

    // Keep the first outside visit (not "Direct") for 90 days.
    let first = readFirstTouch();
    if (!first && channel !== "Direct") {
      try {
        window.localStorage.setItem(firstTouchKey, JSON.stringify({ v: thisVisit, t: Date.now() }));
      } catch {
        // Storage blocked: only this visit is recorded.
      }
      first = thisVisit;
    }

    // A returning buyer who types the address is credited to the channel that
    // first brought them; the direct visit is still noted.
    const main = channel === "Direct" && first ? first : thisVisit;
    const extra = first && first !== main ? ` | first: ${first}` : channel === "Direct" && first ? " | came back direct" : "";

    window.sessionStorage.setItem(
      sessionKey,
      `${main} | landing: ${window.location.pathname}${extra}`.slice(0, 200),
    );
  } catch {
    // Storage blocked: the quote is still sent, just without a source.
  }
}

export function readLeadSource() {
  try {
    return window.sessionStorage.getItem(sessionKey) ?? "";
  } catch {
    return "";
  }
}

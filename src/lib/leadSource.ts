const storageKey = "printy-lead-source";

// Map referrer hosts to readable platform names
const referrerPlatforms: Array<[RegExp, string]> = [
  [/(^|\.)linkedin\.com$|(^|\.)lnkd\.in$/, "linkedin"],
  [/(^|\.)instagram\.com$/, "instagram"],
  [/(^|\.)facebook\.com$|(^|\.)fb\.com$|(^|\.)fb\.me$/, "facebook"],
  [/(^|\.)youtube\.com$|(^|\.)youtu\.be$/, "youtube"],
  [/(^|\.)tiktok\.com$/, "tiktok"],
  [/(^|\.)pinterest\.[a-z.]+$|(^|\.)pin\.it$/, "pinterest"],
  [/(^|\.)x\.com$|(^|\.)twitter\.com$|(^|\.)t\.co$/, "x"],
  [/(^|\.)google\.[a-z.]+$/, "google"],
  [/(^|\.)bing\.com$/, "bing"],
  [/(^|\.)whatsapp\.com$|(^|\.)wa\.me$/, "whatsapp"],
];

function clean(value: string | null) {
  return (value ?? "").replace(/[^\w .:/-]/g, "").trim().slice(0, 60);
}

// Record where this visit came from, once per browser session (first touch).
export function captureLeadSource() {
  try {
    if (window.sessionStorage.getItem(storageKey)) {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const utmSource = clean(params.get("utm_source"));
    let source = utmSource;

    if (!source && document.referrer) {
      const host = new URL(document.referrer).hostname.replace(/^www\./, "");
      if (host && host !== window.location.hostname.replace(/^www\./, "")) {
        source =
          referrerPlatforms.find(([pattern]) => pattern.test(host))?.[1] ?? host;
      }
    }

    const parts = [
      source || "direct",
      clean(params.get("utm_medium")),
      clean(params.get("utm_campaign")),
    ].filter(Boolean);

    window.sessionStorage.setItem(
      storageKey,
      `${parts.join(" / ")} | landing: ${window.location.pathname}`.slice(0, 200),
    );
  } catch {
    // Storage blocked: the quote is still sent, just without a source.
  }
}

export function readLeadSource() {
  try {
    return window.sessionStorage.getItem(storageKey) ?? "";
  } catch {
    return "";
  }
}

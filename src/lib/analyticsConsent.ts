export const analyticsConsentKey = "printy-analytics-consent";

export type AnalyticsConsentValue = "granted" | "denied";

// Storage access throws when the browser blocks site data (Safari private
// mode, strict privacy settings), so every read and write is guarded.
export function readAnalyticsConsent(): AnalyticsConsentValue | null {
  try {
    const value = window.localStorage.getItem(analyticsConsentKey);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function saveAnalyticsConsent(value: AnalyticsConsentValue) {
  try {
    window.localStorage.setItem(analyticsConsentKey, value);
  } catch {
    // Consent still applies for this visit through component state.
  }
}

export function isLiveHostname(hostname: string) {
  return (
    hostname === "printypackaging.com" || hostname === "www.printypackaging.com"
  );
}

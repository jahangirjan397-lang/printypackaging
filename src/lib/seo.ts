// Keeps titles and meta descriptions inside what Google shows in results
// (about 60 and 155 characters), so the end of the text is not cut off.

export function metaTitle(preferred: string, fallback: string, max = 60) {
  return preferred.length <= max ? preferred : fallback;
}

// `suffix` (e.g. a call to action) is added when the snippet is short enough
export function metaDescription(text: string, max = 155, suffix = "") {
  const snippet = trimToLength(text, max);
  const withSuffix = `${snippet} ${suffix}`.trim();
  return suffix && withSuffix.length <= max ? withSuffix : snippet;
}

function trimToLength(text: string, max: number) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;

  // Use whole sentences when they fit, so the snippet reads naturally
  const sentences = clean.match(/[^.!?]+[.!?]+/g) ?? [];
  let result = "";
  for (const sentence of sentences) {
    const next = `${result} ${sentence.trim()}`.trim();
    if (next.length > max) break;
    result = next;
  }
  if (result.length >= 90) return result;

  return `${clean.slice(0, max - 1).replace(/[\s,;:]+\S*$/, "")}…`;
}

// Flat products (butter paper, labels, hang tags and all print products) are
// sized width x height only; boxes and bags need length x width x height.
// Matches the FU_FLAT test in the follow-up script.
export function isFlatProduct(name: string) {
  const n = name.toLowerCase();
  if (!n || /box|bag|carton|packaging/.test(n)) return false;
  return /butter|paper|wrap|label|sticker|tissue|sheet|tag|card|flyer|brochure|catalog|booklet|poster|banner|cling|decal|menu|table tent|coaster|hanger|bookmark|calendar|letterhead|envelope|folder|note pad|form|ticket/.test(n);
}

// "12 x 8 in" for flat products, "10 x 6 x 4 in" for boxes; "" when empty
export function formatSize(
  size: { length: string; width: string; height: string; unit: string },
  flat: boolean,
) {
  if (flat) {
    return [size.width, size.height].some(Boolean)
      ? `${size.width || "?"} x ${size.height || "?"} ${size.unit} (flat)`
      : "";
  }
  return [size.length, size.width, size.height].some(Boolean)
    ? `${size.length || "?"} x ${size.width || "?"} x ${size.height || "?"} ${size.unit}`
    : "";
}

// Nutrition label maths and drawing for the free generator
// (/nutrition-label-generator). Pure functions, no React, so they can be
// tested on their own and reused for SVG/PNG export.
//
// US: FDA Nutrition Facts (21 CFR 101.9) standard vertical format, with the
// FDA rounding rules and the 2020 Daily Values.
// UK/EU: back-of-pack nutrition table per 100 g (+ optional portion with
// %RI), rounded per the EU Commission guidance on tolerances (Dec 2012).

export type UsInput = {
  servingsPerContainer: string;
  servingSize: string; // household measure, e.g. "1 cookie"
  servingGrams: number;
  calories: number;
  totalFat: number;
  satFat: number;
  transFat: number;
  cholesterol: number; // mg
  sodium: number; // mg
  totalCarb: number;
  fiber: number;
  totalSugars: number;
  addedSugars: number;
  protein: number;
  vitaminD: number; // mcg
  calcium: number; // mg
  iron: number; // mg
  potassium: number; // mg
};

export type UkInput = {
  productName: string;
  portionGrams: number; // 0 = per 100 g only
  portionsPerPack: string;
  kcal: number; // per 100 g
  fat: number;
  saturates: number;
  carbohydrate: number;
  sugars: number;
  fibre: number;
  protein: number;
  salt: number;
};

// FDA Daily Values (2020 labels, adults and children 4+)
export const US_DV = {
  totalFat: 78,
  satFat: 20,
  cholesterol: 300,
  sodium: 2300,
  totalCarb: 275,
  fiber: 28,
  addedSugars: 50,
  vitaminD: 20,
  calcium: 1300,
  iron: 18,
  potassium: 4700,
} as const;

// UK/EU Reference Intakes (adult)
export const UK_RI = { kj: 8400, kcal: 2000, fat: 70, saturates: 20, carbohydrate: 260, sugars: 90, protein: 50, salt: 6 } as const;

const n = (v: number) => (Number.isFinite(v) && v > 0 ? v : 0);
const roundTo = (v: number, step: number) => Math.round(v / step) * step;
const trim = (v: number) => String(Number(v.toFixed(2)));

// ---------- US rounding (FDA) ----------
export function usCalories(v: number) {
  v = n(v);
  if (v < 5) return 0;
  if (v <= 50) return roundTo(v, 5);
  return roundTo(v, 10);
}
// total fat, saturated fat, trans fat
export function usFat(v: number) {
  v = n(v);
  if (v < 0.5) return "0g";
  if (v < 5) return `${trim(roundTo(v, 0.5))}g`;
  return `${Math.round(v)}g`;
}
export function usCholesterol(v: number) {
  v = n(v);
  if (v < 2) return "0mg";
  if (v <= 5) return "Less than 5mg";
  return `${roundTo(v, 5)}mg`;
}
// sodium and potassium
export function usSodium(v: number) {
  v = n(v);
  if (v < 5) return "0mg";
  if (v <= 140) return `${roundTo(v, 5)}mg`;
  return `${roundTo(v, 10)}mg`;
}
// carbohydrate, fiber, sugars, added sugars, protein
export function usGrams(v: number) {
  v = n(v);
  if (v < 0.5) return "0g";
  if (v < 1) return "Less than 1g";
  return `${Math.round(v)}g`;
}
export function usVitaminD(v: number) {
  return `${trim(Math.round(n(v) * 10) / 10)}mcg`;
}
export function usCalcium(v: number) {
  return `${roundTo(n(v), 10)}mg`;
}
export function usIron(v: number) {
  return `${trim(Math.round(n(v) * 10) / 10)}mg`;
}
export function usPercent(v: number, dv: number) {
  return `${Math.round((n(v) / dv) * 100)}%`;
}

// ---------- UK/EU rounding (EU guidance) ----------
// fat, carbohydrate, sugars, fibre, protein
export function ukGrams(v: number) {
  v = n(v);
  if (v === 0) return "0g";
  if (v < 0.5) return "<0.5g";
  if (v < 10) return `${(Math.round(v * 10) / 10).toFixed(1)}g`;
  return `${Math.round(v)}g`;
}
export function ukSaturates(v: number) {
  v = n(v);
  if (v === 0) return "0g";
  if (v < 0.1) return "<0.1g";
  if (v < 10) return `${(Math.round(v * 10) / 10).toFixed(1)}g`;
  return `${Math.round(v)}g`;
}
export function ukSalt(v: number) {
  v = n(v);
  if (v === 0) return "0g";
  if (v < 0.0125) return "<0.01g";
  if (v < 1) return `${(Math.round(v * 100) / 100).toFixed(2)}g`;
  return `${(Math.round(v * 10) / 10).toFixed(1)}g`;
}
export const kcalToKj = (kcal: number) => Math.round(n(kcal) * 4.184);
export function ukPercent(v: number, ri: number) {
  const p = (n(v) / ri) * 100;
  return p > 0 && p < 1 ? "<1%" : `${Math.round(p)}%`;
}

// ---------- SVG drawing ----------
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const FONT = "Helvetica, Arial, sans-serif";

type Svg = { svg: string; width: number; height: number };

export function usLabelSvg(d: UsInput): Svg {
  const W = 280;
  const L = 8; // left padding
  const R = W - 8; // right edge for values
  const parts: string[] = [];
  let y = 8;
  const bar = (h: number) => {
    parts.push(`<rect x="${L}" y="${y}" width="${R - L}" height="${h}" fill="#000"/>`);
    y += h;
  };
  const hair = () => {
    parts.push(`<rect x="${L}" y="${y}" width="${R - L}" height="0.75" fill="#000"/>`);
    y += 0.75;
  };
  const text = (x: number, base: number, size: number, weight: number, content: string, anchor = "start") =>
    parts.push(`<text x="${x}" y="${base}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}" fill="#000">${content}</text>`);

  y += 30;
  // the title always spans the full label width, like the FDA sample
  parts.push(`<text x="${L}" y="${y - 4}" font-family="${FONT}" font-size="33" font-weight="900" textLength="${R - L}" lengthAdjust="spacingAndGlyphs" fill="#000">Nutrition Facts</text>`);
  hair();
  y += 16;
  text(L, y - 3, 13, 400, esc(`${d.servingsPerContainer || "1"} servings per container`));
  y += 18;
  const serving = `${d.servingSize || "1 serving"}${d.servingGrams > 0 ? ` (${trim(d.servingGrams)}g)` : ""}`;
  text(L, y - 4, 15, 900, "Serving size");
  text(R, y - 4, 15, 900, esc(serving), "end");
  bar(10);
  y += 13;
  text(L, y - 2, 9, 900, "Amount per serving");
  y += 26;
  text(L, y - 4, 27, 900, "Calories");
  text(R, y - 2, 36, 900, String(usCalories(d.calories)), "end");
  bar(5);
  y += 14;
  text(R, y - 3, 9.5, 900, "% Daily Value*", "end");

  const row = (label: string, value: string, pct: string | null, indent = 0, boldLabel = true) => {
    hair();
    y += 15;
    const labelHtml = boldLabel ? `<tspan font-weight="900">${label}</tspan><tspan font-weight="400"> ${value}</tspan>` : label;
    text(L + indent, y - 4, 11.5, 400, labelHtml);
    if (pct) text(R, y - 4, 11.5, 900, pct, "end");
  };
  row("Total Fat", usFat(d.totalFat), usPercent(d.totalFat, US_DV.totalFat));
  row(`<tspan font-weight="400">Saturated Fat ${usFat(d.satFat)}</tspan>`, "", usPercent(d.satFat, US_DV.satFat), 14, false);
  row(`<tspan font-weight="400"><tspan font-style="italic">Trans</tspan> Fat ${usFat(d.transFat)}</tspan>`, "", null, 14, false);
  row("Cholesterol", usCholesterol(d.cholesterol), usPercent(d.cholesterol, US_DV.cholesterol));
  row("Sodium", usSodium(d.sodium), usPercent(d.sodium, US_DV.sodium));
  row("Total Carbohydrate", usGrams(d.totalCarb), usPercent(d.totalCarb, US_DV.totalCarb));
  row(`<tspan font-weight="400">Dietary Fiber ${usGrams(d.fiber)}</tspan>`, "", usPercent(d.fiber, US_DV.fiber), 14, false);
  row(`<tspan font-weight="400">Total Sugars ${usGrams(d.totalSugars)}</tspan>`, "", null, 14, false);
  // "Includes Xg Added Sugars" sits under a short line that starts at the indent
  y += 0.75;
  parts.push(`<rect x="${L + 28}" y="${y - 0.75}" width="${R - L - 28}" height="0.75" fill="#000"/>`);
  y += 15;
  text(L + 28, y - 4, 11.5, 400, `Includes ${usGrams(d.addedSugars)} Added Sugars`);
  text(R, y - 4, 11.5, 900, usPercent(d.addedSugars, US_DV.addedSugars), "end");
  hair();
  y += 15;
  text(L, y - 4, 11.5, 400, `<tspan font-weight="900">Protein</tspan> ${usGrams(d.protein)}`);
  bar(10);
  const vit = (label: string, value: string, pct: string, first = false) => {
    if (!first) hair();
    y += 15;
    text(L, y - 4, 11.5, 400, `${label} ${value}`);
    text(R, y - 4, 11.5, 400, pct, "end");
  };
  vit("Vitamin D", usVitaminD(d.vitaminD), usPercent(d.vitaminD, US_DV.vitaminD), true);
  vit("Calcium", usCalcium(d.calcium), usPercent(d.calcium, US_DV.calcium));
  vit("Iron", usIron(d.iron), usPercent(d.iron, US_DV.iron));
  vit("Potassium", usSodium(d.potassium), usPercent(d.potassium, US_DV.potassium));
  bar(5);
  const foot = [
    "* The % Daily Value (DV) tells you how much a nutrient in",
    "a serving of food contributes to a daily diet. 2,000 calories",
    "a day is used for general nutrition advice.",
  ];
  y += 4;
  foot.forEach((line, i) => text(L + 6, y + 9 + i * 10.5, 8.6, 400, line));
  y += 9 + foot.length * 10.5;
  const H = Math.ceil(y + 4);
  const body = `<rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" fill="#fff" stroke="#000" stroke-width="1"/>${parts.join("")}`;
  return { svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${body}</svg>`, width: W, height: H };
}

export function ukLabelSvg(d: UkInput): Svg {
  const hasPortion = d.portionGrams > 0;
  const W = hasPortion ? 360 : 250;
  // right edges of the number columns
  const right100 = hasPortion ? 200 : W - 8;
  const rightPortion = 288;
  const rightRi = W - 8;
  const parts: string[] = [];
  const text = (x: number, base: number, size: number, weight: number, content: string, anchor = "start") =>
    parts.push(`<text x="${x}" y="${base}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}" fill="#000">${content}</text>`);
  const line = (y: number, h = 0.75) => parts.push(`<rect x="0" y="${y}" width="${W}" height="${h}" fill="#000"/>`);

  let y = 24;
  text(8, y - 7, 15, 700, d.productName ? `Nutrition · ${esc(d.productName)}` : "Nutrition");
  line(y, 1.5);
  y += 20;
  text(8, y - 6, 10.5, 700, "Typical values");
  text(right100, y - 6, 10.5, 700, "Per 100g", "end");
  if (hasPortion) {
    text(rightPortion, y - 6, 10.5, 700, esc(`Per ${trim(d.portionGrams)}g`), "end");
    text(rightRi, y - 6, 10.5, 700, "%RI*", "end");
  }
  line(y);

  const f = hasPortion ? d.portionGrams / 100 : 0;
  type Row = { label: string; per100: string; portion?: string; ri?: string; indent?: boolean; tall?: [string, string] };
  const kj = kcalToKj(d.kcal);
  const rows: Row[] = [
    {
      label: "Energy",
      per100: "",
      tall: [`${kj}kJ`, `${Math.round(n(d.kcal))}kcal`],
    },
    { label: "Fat", per100: ukGrams(d.fat), portion: ukGrams(d.fat * f), ri: ukPercent(d.fat * f, UK_RI.fat) },
    { label: "of which saturates", per100: ukSaturates(d.saturates), portion: ukSaturates(d.saturates * f), ri: ukPercent(d.saturates * f, UK_RI.saturates), indent: true },
    { label: "Carbohydrate", per100: ukGrams(d.carbohydrate), portion: ukGrams(d.carbohydrate * f), ri: ukPercent(d.carbohydrate * f, UK_RI.carbohydrate) },
    { label: "of which sugars", per100: ukGrams(d.sugars), portion: ukGrams(d.sugars * f), ri: ukPercent(d.sugars * f, UK_RI.sugars), indent: true },
    ...(n(d.fibre) > 0 ? [{ label: "Fibre", per100: ukGrams(d.fibre), portion: ukGrams(d.fibre * f) } as Row] : []),
    { label: "Protein", per100: ukGrams(d.protein), portion: ukGrams(d.protein * f), ri: ukPercent(d.protein * f, UK_RI.protein) },
    { label: "Salt", per100: ukSalt(d.salt), portion: ukSalt(d.salt * f), ri: ukPercent(d.salt * f, UK_RI.salt) },
  ];
  rows.forEach((r) => {
    if (r.tall) {
      y += 30;
      text(8, y - 18, 11, 400, "Energy");
      text(right100, y - 18, 11, 400, r.tall[0], "end");
      text(right100, y - 5, 11, 400, r.tall[1], "end");
      if (hasPortion) {
        const pkj = Math.round(kj * f);
        const pkcal = Math.round(n(d.kcal) * f);
        text(rightPortion, y - 18, 11, 400, `${pkj}kJ`, "end");
        text(rightPortion, y - 5, 11, 400, `${pkcal}kcal`, "end");
        text(rightRi, y - 12, 11, 400, ukPercent(pkcal, UK_RI.kcal), "end");
      }
    } else {
      y += 18;
      text(r.indent ? 18 : 8, y - 5, 11, 400, esc(r.label));
      text(right100, y - 5, 11, 400, r.per100, "end");
      if (hasPortion) {
        text(rightPortion, y - 5, 11, 400, r.portion ?? "", "end");
        if (r.ri) text(rightRi, y - 5, 11, 400, r.ri, "end");
      }
    }
    line(y);
  });

  const notes: string[] = [];
  if (hasPortion) notes.push("*Reference intake of an average adult (8400kJ/2000kcal)");
  if (hasPortion && d.portionsPerPack) notes.push(esc(`This pack contains ${d.portionsPerPack} portions`));
  notes.forEach((t, i) => text(8, y + 13 + i * 11, 8.5, 400, t));
  y += notes.length ? 8 + notes.length * 11 : 2;
  const H = Math.ceil(y + 4);
  const body = `<rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" fill="#fff" stroke="#000" stroke-width="1"/>${parts.join("")}`;
  return { svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${body}</svg>`, width: W, height: H };
}

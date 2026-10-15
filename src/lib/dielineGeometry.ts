// Parametric dielines for the free generator. Everything is in millimetres.
// A dieline is a list of paths: "cut" (solid) and "fold" (dashed crease),
// plus panel names and dimension lines. The same data is turned into the
// on-screen SVG preview, an SVG download and a 1:1 PDF where cut and crease
// lines use the spot colours "Dieline" and "Crease".

import type { GeneratorStyle } from "@/data/dielines";

export type Pt = [number, number];
export type Seg = { M?: Pt; L?: Pt; C?: [Pt, Pt, Pt] };
export type DPath = { kind: "cut" | "fold" | "glue"; segs: Seg[]; closed?: boolean };
export type DLabel = { at: Pt; text: string; size?: number };
// A measured distance from a to b (horizontal or vertical), drawn with arrows
export type DDim = { a: Pt; b: Pt };
export type Dieline = { paths: DPath[]; labels: DLabel[]; dims: DDim[]; bbox: [number, number, number, number]; notes?: string[] };
export type DielineInput = { L: number; W: number; H: number; t: number };
export type Unit = "mm" | "cm" | "in";

export const generatorStyles: {
  id: GeneratorStyle;
  name: string;
  hint: string;
  dims: [string, string, string];
  board: "card" | "flute";
  library: string;
}[] = [
  { id: "reverse-tuck-end", name: "Reverse Tuck End", hint: "Everyday retail carton", dims: ["Length", "Width", "Height"], board: "card", library: "reverse-tuck-end" },
  { id: "straight-tuck-end", name: "Straight Tuck End", hint: "Clean front panel", dims: ["Length", "Width", "Height"], board: "card", library: "straight-tuck-end" },
  { id: "auto-bottom", name: "Tuck Top Auto Bottom", hint: "Crash-lock base", dims: ["Length", "Width", "Height"], board: "card", library: "tuck-end-auto-bottom" },
  { id: "mailer", name: "Mailer Box", hint: "Roll end tuck front", dims: ["Length", "Width", "Height"], board: "flute", library: "roll-end-mailer-box" },
  { id: "shipping-box", name: "Shipping Box", hint: "Regular slotted carton", dims: ["Length", "Width", "Height"], board: "flute", library: "full-flap-shipping-box" },
  { id: "tray", name: "Tray", hint: "Glued-corner tray", dims: ["Length", "Width", "Height"], board: "card", library: "four-corner-tray" },
  { id: "sleeve", name: "Sleeve", hint: "Slides over a tray", dims: ["Length", "Width", "Height"], board: "card", library: "sleeve-and-tray" },
  { id: "pillow", name: "Pillow Box", hint: "Curved press-in ends", dims: ["Width", "Depth", "Length"], board: "card", library: "pillow-box" },
];

export const unitToMm: Record<Unit, number> = { mm: 1, cm: 10, in: 25.4 };

export function formatLength(mm: number, unit: Unit) {
  if (unit === "mm") return `${Math.round(mm * 10) / 10} mm`;
  if (unit === "cm") return `${(mm / 10).toFixed(1)} cm`;
  return `${(mm / 25.4).toFixed(2)}″`;
}


// ---------- rectangle panels -> cut / fold lines ----------
type Rect = { x0: number; y0: number; x1: number; y1: number; r?: { tl?: number; tr?: number; bl?: number; br?: number } };
const EPS = 0.01;

function sub(intervals: [number, number][], a: number, b: number): [number, number][] {
  // a..b minus the given intervals
  let parts: [number, number][] = [[a, b]];
  for (const [c, d] of intervals) {
    const next: [number, number][] = [];
    for (const [p, q] of parts) {
      if (d <= p + EPS || c >= q - EPS) { next.push([p, q]); continue; }
      if (c > p + EPS) next.push([p, c]);
      if (d < q - EPS) next.push([d, q]);
    }
    parts = next;
  }
  return parts.filter(([p, q]) => q - p > EPS);
}

function overlap(a: number, b: number, c: number, d: number): [number, number] | null {
  const p = Math.max(a, c), q = Math.min(b, d);
  return q - p > EPS ? [p, q] : null;
}

const K = 0.5523; // circle-to-bezier constant

function rectsToPaths(rects: Rect[]): DPath[] {
  const cuts: DPath[] = [], folds: DPath[] = [];
  const line = (kind: "cut" | "fold", a: Pt, b: Pt) => (kind === "cut" ? cuts : folds).push({ kind, segs: [{ M: a }, { L: b }] });
  rects.forEach((r, i) => {
    const others = rects.filter((_, j) => j !== i);
    const rad = r.r || {};
    // edges: top (y0), bottom (y1), left (x0), right (x1)
    const edges: { side: "t" | "b" | "l" | "r"; c: number; a: number; b: number }[] = [
      { side: "t", c: r.y0, a: r.x0 + (rad.tl || 0), b: r.x1 - (rad.tr || 0) },
      { side: "b", c: r.y1, a: r.x0 + (rad.bl || 0), b: r.x1 - (rad.br || 0) },
      { side: "l", c: r.x0, a: r.y0 + (rad.tl || 0), b: r.y1 - (rad.bl || 0) },
      { side: "r", c: r.x1, a: r.y0 + (rad.tr || 0), b: r.y1 - (rad.br || 0) },
    ];
    for (const e of edges) {
      const shared: [number, number][] = [];
      for (const o of others) {
        let ov: [number, number] | null = null;
        if (e.side === "t" && Math.abs(o.y1 - e.c) < EPS) ov = overlap(e.a, e.b, o.x0, o.x1);
        if (e.side === "b" && Math.abs(o.y0 - e.c) < EPS) ov = overlap(e.a, e.b, o.x0, o.x1);
        if (e.side === "l" && Math.abs(o.x1 - e.c) < EPS) ov = overlap(e.a, e.b, o.y0, o.y1);
        if (e.side === "r" && Math.abs(o.x0 - e.c) < EPS) ov = overlap(e.a, e.b, o.y0, o.y1);
        if (ov) shared.push(ov);
      }
      const horiz = e.side === "t" || e.side === "b";
      const P = (u: number): Pt => (horiz ? [u, e.c] : [e.c, u]);
      for (const [p, q] of sub(shared, e.a, e.b)) line("cut", P(p), P(q));
      // folds are drawn once, from the top / left edge of the lower / right panel
      if (e.side === "t" || e.side === "l") for (const [p, q] of shared) line("fold", P(p), P(q));
    }
    const arc = (cx: number, cy: number, rr: number, from: Pt, to: Pt, c1: Pt, c2: Pt) => {
      void cx; void cy; void rr;
      cuts.push({ kind: "cut", segs: [{ M: from }, { C: [c1, c2, to] }] });
    };
    if (rad.tl) { const q = rad.tl; arc(0, 0, q, [r.x0, r.y0 + q], [r.x0 + q, r.y0], [r.x0, r.y0 + q - q * K], [r.x0 + q - q * K, r.y0]); }
    if (rad.tr) { const q = rad.tr; arc(0, 0, q, [r.x1 - q, r.y0], [r.x1, r.y0 + q], [r.x1 - q + q * K, r.y0], [r.x1, r.y0 + q - q * K]); }
    if (rad.bl) { const q = rad.bl; arc(0, 0, q, [r.x0 + q, r.y1], [r.x0, r.y1 - q], [r.x0 + q - q * K, r.y1], [r.x0, r.y1 - q + q * K]); }
    if (rad.br) { const q = rad.br; arc(0, 0, q, [r.x1, r.y1 - q], [r.x1 - q, r.y1], [r.x1, r.y1 - q + q * K], [r.x1 - q + q * K, r.y1]); }
  });
  return [...cuts, ...folds];
}

function bboxOf(paths: DPath[]): [number, number, number, number] {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const p of paths) for (const s of p.segs) for (const pt of [s.M, s.L, ...(s.C || [])]) {
    if (!pt) continue;
    x0 = Math.min(x0, pt[0]); y0 = Math.min(y0, pt[1]); x1 = Math.max(x1, pt[0]); y1 = Math.max(y1, pt[1]);
  }
  return [x0, y0, x1, y1];
}

const r1 = (n: number) => Math.round(n * 10) / 10;
const hd = (x0: number, x1: number, y: number): DDim => ({ a: [x0, y], b: [x1, y] });
const vd = (y0: number, y1: number, x: number): DDim => ({ a: [x, y0], b: [x, y1] });

// ---------- styles ----------
function tuckEnd(d: DielineInput, mode: "reverse" | "straight" | "auto"): Dieline {
  // Folding-carton allowances (ECMA-style): length and width panels gain one
  // board thickness, the panel opposite the glue flap is one thickness
  // narrower, the depth gains two, the tuck is set in by one thickness.
  const { L, W, t } = d;
  const H = d.H + 2 * t;
  const g = Math.min(15, Math.max(12, W * 0.6)); // glue flap
  const xA = g, xB = g + L + t, xC = xB + W + t, xD = xC + L + t, xE = xD + W;
  const lid = W + t, tuck = Math.min(Math.max(12, W * 0.5), 25), dust = Math.min(W * 0.6, H * 0.6, 40);
  const notes = [
    `Panels ${r1(L + t)} / ${r1(W + t)} / ${r1(L + t)} / ${r1(W)} mm, depth ${r1(H)} mm (inside size + board ${t} mm)`,
    `Glue flap ${r1(g)} mm · closing panel ${r1(lid)} mm · tuck ${r1(tuck)} mm, set in ${r1(t + 0.5)} mm`,
    `Dust flaps ${r1(dust)} mm`,
  ];
  const rects: Rect[] = [
    { x0: 0, y0: 3, x1: g, y1: H - 3, r: { tl: 2, bl: 2 } },
    { x0: xA, y0: 0, x1: xB, y1: H }, { x0: xB, y0: 0, x1: xC, y1: H },
    { x0: xC, y0: 0, x1: xD, y1: H }, { x0: xD, y0: 0, x1: xE, y1: H },
  ];
  const labels: DLabel[] = [
    { at: [xA + L / 2, H * 0.55], text: "FRONT" }, { at: [xB + W / 2, H * 0.55], text: "SIDE" },
    { at: [xC + L / 2, H * 0.55], text: "BACK" }, { at: [xD + W / 2, H * 0.55], text: "SIDE" },
    { at: [g / 2, H * 0.55], text: "GLUE", size: 0.6 },
    { at: [xC + L / 2, -lid / 2], text: "LID" },
  ];
  const yd = Math.min(12, H * 0.15);
  const dims: DDim[] = [hd(xA, xB, yd), hd(xB, xC, yd), hd(xC, xD, yd), hd(xD, xE, yd), vd(0, H, xA + Math.min(10, L * 0.18)), vd(-lid, 0, xC + Math.min(10, L * 0.18))];
  const topLid = (x0: number, x1: number) => {
    rects.push({ x0, y0: -lid, x1, y1: 0 });
    rects.push({ x0: x0 + t + 0.5, y0: -lid - tuck, x1: x1 - t - 0.5, y1: -lid, r: { tl: Math.min(8, tuck * 0.6), tr: Math.min(8, tuck * 0.6) } });
  };
  const botLid = (x0: number, x1: number) => {
    rects.push({ x0, y0: H, x1, y1: H + lid });
    rects.push({ x0: x0 + t + 0.5, y0: H + lid, x1: x1 - t - 0.5, y1: H + lid + tuck, r: { bl: Math.min(8, tuck * 0.6), br: Math.min(8, tuck * 0.6) } });
    labels.push({ at: [(x0 + x1) / 2, H + lid / 2], text: "BOTTOM" });
  };
  topLid(xC, xD);
  rects.push({ x0: xB + 0.5, y0: -dust, x1: xC - 1, y1: 0, r: { tl: Math.min(10, dust * 0.5) } });
  rects.push({ x0: xD + 1, y0: -dust, x1: xE - 0.5, y1: 0, r: { tr: Math.min(10, dust * 0.5) } });
  if (mode === "auto") {
    // crash-lock base: hooked flaps on the long panels, glued diagonal flaps on the short panels
    const f = W / 2 + Math.min(10, W * 0.25);
    rects.push({ x0: xA + 1, y0: H, x1: xB - 1, y1: H + f, r: { bl: 4, br: 4 } });
    rects.push({ x0: xC + 1, y0: H, x1: xD - 1, y1: H + f, r: { bl: 4, br: 4 } });
    rects.push({ x0: xB + 0.5, y0: H, x1: xC - 0.5, y1: H + W / 2 });
    rects.push({ x0: xD + 0.5, y0: H, x1: xE - 0.5, y1: H + W / 2 });
    const diag = (x0: number): DPath => ({ kind: "fold", segs: [{ M: [x0, H] }, { L: [x0 + W / 2, H + W / 2] }] });
    const glue = (x0: number): DPath => ({ kind: "glue", closed: true, segs: [{ M: [x0, H] }, { L: [x0 + W / 2, H + W / 2] }, { L: [x0, H + W / 2] }] });
    const paths = [...rectsToPaths(rects), diag(xB + 0.5), diag(xD + 0.5), glue(xB + 0.5), glue(xD + 0.5)];
    notes.push(`Auto bottom: glue the shaded areas · lock flaps ${r1(f)} mm`);
    labels.push({ at: [xA + L / 2, H + f / 2], text: "LOCK" }, { at: [xC + L / 2, H + f / 2], text: "LOCK" });
    return { paths, labels, dims, bbox: bboxOf(paths), notes };
  }
  if (mode === "reverse") botLid(xA, xB);
  else botLid(xC, xD);
  rects.push({ x0: xB + 0.5, y0: H, x1: xC - 1, y1: H + dust, r: { bl: Math.min(10, dust * 0.5) } });
  rects.push({ x0: xD + 1, y0: H, x1: xE - 0.5, y1: H + dust, r: { br: Math.min(10, dust * 0.5) } });
  const paths = rectsToPaths(rects);
  return { paths, labels, dims, bbox: bboxOf(paths), notes };
}

function shippingBox(d: DielineInput): Dieline {
  // FEFCO 0201 style: panels gain one board thickness, depth two, flaps meet
  // in the middle (half the width plus one thickness).
  const { L, W, t } = d;
  const H = d.H + 2 * t;
  const g = 35, s = Math.max(4, 2 * t); // glue flap, slot width
  const xs = [g, g + L + t, g + L + W + 2 * t, g + 2 * L + W + 3 * t, g + 2 * L + 2 * W + 4 * t];
  const fh = W / 2 + t;
  const rects: Rect[] = [{ x0: 0, y0: 4, x1: g, y1: H - 4, r: { tl: 3, bl: 3 } }];
  for (let i = 0; i < 4; i++) {
    rects.push({ x0: xs[i], y0: 0, x1: xs[i + 1], y1: H });
    const a = xs[i] + (i === 0 ? 0 : s / 2), b = xs[i + 1] - (i === 3 ? 0 : s / 2);
    rects.push({ x0: a, y0: -fh, x1: b, y1: 0 }, { x0: a, y0: H, x1: b, y1: H + fh });
  }
  const paths = rectsToPaths(rects);
  const names = ["FRONT", "SIDE", "BACK", "SIDE"];
  const labels: DLabel[] = [...names.map((n, i): DLabel => ({ at: [(xs[i] + xs[i + 1]) / 2, H * 0.55], text: n })), { at: [g / 2, H * 0.55], text: "GLUE", size: 0.6 }, { at: [(xs[0] + xs[1]) / 2, -fh / 2], text: "FLAP" }];
  const yd = Math.min(15, H * 0.15);
  const dims = [hd(xs[0], xs[1], yd), hd(xs[1], xs[2], yd), hd(xs[2], xs[3], yd), hd(xs[3], xs[4], yd), vd(0, H, xs[0] + Math.min(12, L * 0.18)), vd(-fh, 0, xs[2] + Math.min(12, L * 0.18))];
  return { paths, labels, dims, bbox: bboxOf(paths), notes: [`Panels ${r1(L + t)} / ${r1(W + t)} / ${r1(L + t)} / ${r1(W + t)} mm, depth ${r1(H)} mm (board ${t} mm)`, `Flaps ${r1(fh)} mm · slots ${r1(s)} mm · glue flap ${g} mm`] };
}

function sleeve(d: DielineInput): Dieline {
  // slides over a tray of L x W x H: tube of L, H, L, H around, W deep
  const { L, W, H, t } = d;
  const Ls = L + 2 * t, Hs = H + 2 * t, g = 12;
  const xs = [g, g + Ls, g + Ls + Hs, g + 2 * Ls + Hs, g + 2 * Ls + 2 * Hs];
  const rects: Rect[] = [{ x0: 0, y0: 3, x1: g, y1: W - 3, r: { tl: 2, bl: 2 } }];
  for (let i = 0; i < 4; i++) rects.push({ x0: xs[i], y0: 0, x1: xs[i + 1], y1: W });
  const paths = rectsToPaths(rects);
  // thumb notch on the open edge of the top panel
  paths.push({ kind: "cut", segs: [{ M: [xs[2] + Ls / 2 - 10, W] }, { C: [[xs[2] + Ls / 2 - 10, W - 8], [xs[2] + Ls / 2 + 10, W - 8], [xs[2] + Ls / 2 + 10, W]] }] });
  const names = ["TOP", "SIDE", "BOTTOM", "SIDE"];
  const yd = Math.min(10, W * 0.15);
  return {
    paths,
    labels: [...names.map((n, i): DLabel => ({ at: [(xs[i] + xs[i + 1]) / 2, W * 0.55], text: n })), { at: [g / 2, W * 0.55], text: "GLUE", size: 0.6 }],
    dims: [hd(xs[0], xs[1], yd), hd(xs[1], xs[2], yd), hd(xs[2], xs[3], yd), hd(xs[3], xs[4], yd), vd(0, W, xs[0] + Math.min(10, Ls * 0.18))],
    bbox: bboxOf(paths),
    notes: [`Fits a tray ${r1(L)} × ${r1(W)} × ${r1(H)} mm with ${t} mm clearance each side`],
  };
}

function tray(d: DielineInput): Dieline {
  const { L, W, H } = d;
  const tw = Math.min(H * 0.85, 25);
  const rects: Rect[] = [
    { x0: H, y0: H, x1: H + L, y1: H + W }, // base
    { x0: H, y0: 0, x1: H + L, y1: H }, { x0: H, y0: H + W, x1: H + L, y1: 2 * H + W }, // long walls
    { x0: 0, y0: H, x1: H, y1: H + W }, { x0: H + L, y0: H, x1: 2 * H + L, y1: H + W }, // short walls
    // glue tabs on the long walls
    { x0: H - tw, y0: 1, x1: H, y1: H - 1, r: { tl: 3, bl: 3 } }, { x0: H + L, y0: 1, x1: H + L + tw, y1: H - 1, r: { tr: 3, br: 3 } },
    { x0: H - tw, y0: H + W + 1, x1: H, y1: 2 * H + W - 1, r: { tl: 3, bl: 3 } }, { x0: H + L, y0: H + W + 1, x1: H + L + tw, y1: 2 * H + W - 1, r: { tr: 3, br: 3 } },
  ];
  const paths = rectsToPaths(rects);
  return {
    paths,
    labels: [{ at: [H + L / 2, H + W * 0.6], text: "BASE" }, { at: [H + L / 2, H * 0.6], text: "WALL" }, { at: [H / 2, H + W / 2], text: "WALL" }],
    dims: [hd(H, H + L, H + Math.min(12, W * 0.2)), vd(H, H + W, H + Math.min(12, L * 0.15)), vd(0, H, H + L * 0.75)],
    bbox: bboxOf(paths),
    notes: [`Base ${r1(L)} × ${r1(W)} mm · walls ${r1(H)} mm · glue tabs ${r1(tw)} mm`],
  };
}

function mailer(d: DielineInput): Dieline {
  // Roll end tuck front (FEFCO 0427 style, standard proportions)
  const { L, W, H, t } = d;
  const T = Math.max(t, 1.5);
  const xL1 = H - T, xB0 = 2 * H - T, xB1 = xB0 + L, xR1 = xB1 + H, xR2 = xR1 + H - T;
  const yF1 = H - T, yB0 = 2 * H - T, yB1 = yB0 + W, yK = yB1 + H + T, yLid = yK + W + T, yFr = yLid + H, yTk = yFr + Math.min(H * 0.8, 30);
  const ear = Math.min(H * 0.9, W * 0.45);
  const rects: Rect[] = [
    { x0: xB0, y0: yB0, x1: xB1, y1: yB1 }, // base
    { x0: xB0, y0: yF1, x1: xB1, y1: yB0 }, { x0: xB0 + T, y0: 0, x1: xB1 - T, y1: yF1, r: { tl: 3, tr: 3 } }, // front outer + inner wall
    { x0: xL1, y0: yB0, x1: xB0, y1: yB1 }, { x0: 0, y0: yB0 + T, x1: xL1, y1: yB1 - T }, // left outer + inner
    { x0: xB1, y0: yB0, x1: xR1, y1: yB1 }, { x0: xR1, y0: yB0 + T, x1: xR2, y1: yB1 - T }, // right outer + inner
    { x0: xL1 + 1, y0: yF1 + 1, x1: xB0, y1: yB0 - 1, r: { tl: 4 } }, { x0: xB1, y0: yF1 + 1, x1: xR1 - 1, y1: yB0 - 1, r: { tr: 4 } }, // front dust flaps
    { x0: xB0, y0: yB1, x1: xB1, y1: yK }, // back wall
    { x0: xB0 - ear, y0: yB1 + 1, x1: xB0, y1: yK - 1, r: { tl: 4, bl: 4 } }, { x0: xB1, y0: yB1 + 1, x1: xB1 + ear, y1: yK - 1, r: { tr: 4, br: 4 } }, // back dust flaps
    { x0: xB0, y0: yK, x1: xB1, y1: yLid }, // lid
    { x0: xB0 - ear, y0: yK + 2, x1: xB0, y1: yLid - 2, r: { tl: 6, bl: 6 } }, { x0: xB1, y0: yK + 2, x1: xB1 + ear, y1: yLid - 2, r: { tr: 6, br: 6 } }, // lid ears
    { x0: xB0, y0: yLid, x1: xB1, y1: yFr }, // lid front
    { x0: xB0 + 2, y0: yFr, x1: xB1 - 2, y1: yTk, r: { bl: 8, br: 8 } }, // tuck
  ];
  const paths = rectsToPaths(rects);
  const cx = xB0 + L / 2;
  return {
    paths,
    labels: [{ at: [cx, yB0 + W * 0.6], text: "BASE" }, { at: [cx, yK + W * 0.6], text: "LID" }, { at: [cx, yF1 + H * 0.6], text: "FRONT" }, { at: [cx, yB1 + (yK - yB1) * 0.6], text: "BACK" }, { at: [cx, yFr + (yTk - yFr) * 0.55], text: "TUCK" }, { at: [xL1 + H / 2, yB0 + W * 0.6], text: "SIDE" }],
    dims: [hd(xB0, xB1, yB0 + Math.min(14, W * 0.2)), vd(yB0, yB1, xB0 + Math.min(14, L * 0.15)), vd(yF1, yB0, xB0 + L * 0.8), vd(yK, yLid, xB0 + Math.min(14, L * 0.15))],
    bbox: bboxOf(paths),
    notes: [`Roll end tuck front (FEFCO 0427 style) · board ${T} mm`, `Inner walls set in ${T} mm · lid ${r1(W + T)} mm · front tuck ${r1(yTk - yFr)} mm`],
  };
}

function pillow(d: DielineInput): Dieline {
  // L = width of the box face, W = depth (bulge), H = length
  const { L, W, H } = d;
  const g = 12, bulge = Math.max(W * 0.5, 8);
  const xs = [g, g + L, g + 2 * L];
  const paths: DPath[] = [];
  const cut = (segs: Seg[]) => paths.push({ kind: "cut", segs });
  const fold = (segs: Seg[]) => paths.push({ kind: "fold", segs });
  cut([{ M: [0, 4] }, { L: [g, 0] }]); cut([{ M: [0, 4] }, { L: [0, H - 4] }]); cut([{ M: [0, H - 4] }, { L: [g, H] }]);
  cut([{ M: [xs[2], 0] }, { L: [xs[2], H] }]);
  fold([{ M: [xs[0], 0] }, { L: [xs[0], H] }]); fold([{ M: [xs[1], 0] }, { L: [xs[1], H] }]);
  for (let i = 0; i < 2; i++) {
    const a = xs[i], b = xs[i + 1];
    cut([{ M: [a, 0] }, { C: [[a, -bulge * 1.33], [b, -bulge * 1.33], [b, 0]] }]);
    fold([{ M: [a, 0] }, { C: [[a + L * 0.25, bulge * 0.9], [b - L * 0.25, bulge * 0.9], [b, 0]] }]);
    cut([{ M: [a, H] }, { C: [[a, H + bulge * 1.33], [b, H + bulge * 1.33], [b, H]] }]);
    fold([{ M: [a, H] }, { C: [[a + L * 0.25, H - bulge * 0.9], [b - L * 0.25, H - bulge * 0.9], [b, H]] }]);
  }
  return {
    paths,
    labels: [{ at: [g + L / 2, H * 0.55], text: "FRONT" }, { at: [g + 1.5 * L, H * 0.55], text: "BACK" }, { at: [g / 2, H * 0.55], text: "GLUE", size: 0.6 }],
    dims: [hd(xs[0], xs[1], H * 0.3), hd(xs[1], xs[2], H * 0.3), vd(0, H, xs[0] + Math.min(12, L * 0.15))],
    bbox: bboxOf(paths),
    notes: [`Face ${r1(L)} mm · length ${r1(H)} mm · end lobes ${r1(bulge)} mm`],
  };
}

export function buildDieline(style: GeneratorStyle, input: DielineInput): Dieline {
  switch (style) {
    case "reverse-tuck-end": return tuckEnd(input, "reverse");
    case "straight-tuck-end": return tuckEnd(input, "straight");
    case "auto-bottom": return tuckEnd(input, "auto");
    case "shipping-box": return shippingBox(input);
    case "sleeve": return sleeve(input);
    case "tray": return tray(input);
    case "mailer": return mailer(input);
    case "pillow": return pillow(input);
  }
}

// ---------- shared drawing of dimensions ----------
// All sizes in mm of the drawing. `k` scales arrows and text (1 = print size).
type Prim = { line: [Pt, Pt] } | { tri: [Pt, Pt, Pt] } | { text: { at: Pt; str: string; size: number; rot?: boolean } };

function dimPrims(dl: Dieline, unit: Unit, k: number): Prim[] {
  const [x0, y0, x1, y1] = dl.bbox;
  const out: Prim[] = [];
  const arrow = 2.2 * k, fs = 3.2 * k, off = 9 * k;
  const one = (a: Pt, b: Pt, ext?: { from: number; axis: "x" | "y" }) => {
    const horiz = Math.abs(a[1] - b[1]) < 0.01;
    const len = horiz ? Math.abs(b[0] - a[0]) : Math.abs(b[1] - a[1]);
    if (len < 3 * arrow) return;
    if (ext) {
      if (ext.axis === "y") { out.push({ line: [[a[0], ext.from], [a[0], a[1] - k]] }, { line: [[b[0], ext.from], [b[0], b[1] - k]] }); }
      else { out.push({ line: [[ext.from, a[1]], [a[0] + k, a[1]]] }, { line: [[ext.from, b[1]], [b[0] + k, b[1]]] }); }
    }
    out.push({ line: [a, b] });
    if (horiz) {
      const [l, r] = a[0] < b[0] ? [a, b] : [b, a];
      out.push({ tri: [l, [l[0] + arrow, l[1] - arrow * 0.4], [l[0] + arrow, l[1] + arrow * 0.4]] });
      out.push({ tri: [r, [r[0] - arrow, r[1] - arrow * 0.4], [r[0] - arrow, r[1] + arrow * 0.4]] });
      out.push({ text: { at: [(a[0] + b[0]) / 2, a[1] - fs * 0.45], str: formatLength(len, unit), size: fs } });
    } else {
      const [t, btm] = a[1] < b[1] ? [a, b] : [b, a];
      out.push({ tri: [t, [t[0] - arrow * 0.4, t[1] + arrow], [t[0] + arrow * 0.4, t[1] + arrow]] });
      out.push({ tri: [btm, [btm[0] - arrow * 0.4, btm[1] - arrow], [btm[0] + arrow * 0.4, btm[1] - arrow]] });
      out.push({ text: { at: [a[0] + fs * 0.45, (a[1] + b[1]) / 2], str: formatLength(len, unit), size: fs, rot: true } });
    }
  };
  // overall flat size, outside the drawing
  one([x0, y0 - off], [x1, y0 - off], { from: y0 - k, axis: "y" });
  one([x1 + off, y0], [x1 + off, y1], { from: x1 + k, axis: "x" });
  for (const d of dl.dims) one(d.a, d.b);
  return out;
}

// ---------- output ----------
const f2 = (n: number) => (Math.round(n * 100) / 100).toString();
const xmlEsc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

function svgD(p: DPath) {
  return p.segs.map((s) => (s.M ? `M${f2(s.M[0])} ${f2(s.M[1])}` : s.L ? `L${f2(s.L[0])} ${f2(s.L[1])}` : s.C ? `C${s.C.map((q) => `${f2(q[0])} ${f2(q[1])}`).join(" ")}` : "")).join(" ") + (p.closed ? " Z" : "");
}

const COLORS = { cut: "#07111F", fold: "#FF6A00", glue: "#00C2E8", dim: "#007C91", label: "#94A3B8" };

// Printy logo for the footer of downloaded files: a PNG data URI for SVG and
// CMYK pixels (hex) for the PDF. Made in the browser by loadBrandLogo().
export type Brand = { dataUri: string; hex: string; pw: number; ph: number };
const SITE = "printypackaging.com";

export function dielineToSvg(dl: Dieline, title: string, opts: { preview?: boolean; unit?: Unit; dims?: boolean; brand?: Brand } = {}) {
  const unit = opts.unit ?? "mm";
  const [x0, y0, x1, y1] = dl.bbox;
  const span = Math.max(x1 - x0, y1 - y0);
  const k = opts.preview ? Math.max(1, span / 260) : 1; // scale marks so they stay readable on screen
  const m = 16 * k, head = opts.preview ? 0 : 12, foot = opts.preview ? 0 : 16;
  const w = x1 - x0 + 2 * m, h = y1 - y0 + 2 * m + head + foot;
  const tx = m - x0, ty = m - y0 + head;
  const sw = opts.preview ? 0.45 * k : 0.25;
  const prims = opts.dims === false ? [] : dimPrims(dl, unit, k);
  const labelSize = (l: DLabel) => (l.size ?? 1) * (opts.preview ? Math.max(3.5, span / 45) : Math.max(3.5, Math.min(9, span / 45)));
  const parts = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${f2(w)}mm" height="${f2(h)}mm" viewBox="0 0 ${f2(w)} ${f2(h)}" font-family="Arial, Helvetica, sans-serif">`,
    `<title>${xmlEsc(title)}</title>`,
    `<rect width="100%" height="100%" fill="#ffffff"/>`,
    opts.preview ? "" : `<text x="${m}" y="${m * 0.5 + 6}" font-size="4.5" fill="${COLORS.cut}">${xmlEsc(title)} · Printy Packaging free dieline · solid = cut, dashed = fold · 1:1</text>`,
    `<g transform="translate(${f2(tx)} ${f2(ty)})">`,
    `<g id="glue">${dl.paths.filter((p) => p.kind === "glue").map((p) => `<path d="${svgD(p)}" fill="${COLORS.glue}" fill-opacity="0.18"/>`).join("")}</g>`,
    `<g id="labels" fill="${COLORS.label}" font-weight="700" text-anchor="middle" dominant-baseline="middle">${dl.labels.map((l) => `<text x="${f2(l.at[0])}" y="${f2(l.at[1])}" font-size="${f2(labelSize(l))}" letter-spacing="${f2(labelSize(l) * 0.08)}">${xmlEsc(l.text)}</text>`).join("")}</g>`,
    `<g id="dieline-cut" fill="none" stroke="${COLORS.cut}" stroke-width="${f2(sw)}" stroke-linecap="round" stroke-linejoin="round">${dl.paths.filter((p) => p.kind === "cut").map((p) => `<path d="${svgD(p)}"/>`).join("")}</g>`,
    `<g id="dieline-crease" fill="none" stroke="${COLORS.fold}" stroke-width="${f2(sw)}" stroke-dasharray="${f2(sw * 7)} ${f2(sw * 4)}">${dl.paths.filter((p) => p.kind === "fold").map((p) => `<path d="${svgD(p)}"/>`).join("")}</g>`,
    `<g id="dimensions" stroke="${COLORS.dim}" fill="${COLORS.dim}" stroke-width="${f2(sw * 0.7)}">`,
    ...prims.map((p) =>
      "line" in p ? `<path d="M${f2(p.line[0][0])} ${f2(p.line[0][1])}L${f2(p.line[1][0])} ${f2(p.line[1][1])}"/>`
        : "tri" in p ? `<path stroke="none" d="M${p.tri.map((q) => `${f2(q[0])} ${f2(q[1])}`).join("L")}Z"/>`
          : `<text stroke="#ffffff" stroke-width="${f2(p.text.size * 0.35)}" paint-order="stroke" font-size="${f2(p.text.size)}" font-weight="700" text-anchor="middle" dominant-baseline="middle" x="${f2(p.text.at[0])}" y="${f2(p.text.at[1])}"${p.text.rot ? ` transform="rotate(-90 ${f2(p.text.at[0])} ${f2(p.text.at[1])})"` : ""}>${xmlEsc(p.text.str)}</text>`),
    `</g></g>`,
    opts.preview ? "" : `<g id="printy-packaging" transform="translate(${f2(m)} ${f2(h - foot - 2)})">` +
      (opts.brand ? `<image href="${opts.brand.dataUri}" x="0" y="2" width="${f2(9 * opts.brand.pw / opts.brand.ph)}" height="9"/>` : `<text x="0" y="9" font-size="6" font-weight="700" fill="${COLORS.cut}">Printy Packaging</text>`) +
      `<text x="${f2(opts.brand ? 9 * opts.brand.pw / opts.brand.ph + 5 : 52)}" y="6.5" font-size="3.6" font-weight="700" fill="${COLORS.cut}">Free dieline from ${SITE}</text>` +
      `<text x="${f2(opts.brand ? 9 * opts.brand.pw / opts.brand.ph + 5 : 52)}" y="11" font-size="3" fill="${COLORS.dim}">Custom printed boxes from 100 pcs · free design help · ${SITE}/dieline-generator</text></g>`,
    `</svg>`,
  ];
  return parts.join("");
}

// 1:1 vector PDF. Cut and crease lines use the spot colours "Dieline" and
// "Crease" (non-printing in prepress); dimensions and names use "Info".
export function dielineToPdf(dl: Dieline, title: string, unit: Unit = "mm", brand?: Brand): Uint8Array {
  const pt = 72 / 25.4, m = 20, foot = 16;
  const [x0, y0, x1, y1] = dl.bbox;
  const W = (x1 - x0 + 2 * m) * pt, H = (y1 - y0 + 2 * m + 12 + foot) * pt;
  const X = (x: number) => ((x - x0 + m) * pt).toFixed(2);
  const Y = (y: number) => (H - (y - y0 + m + 12) * pt).toFixed(2);
  const ops = (p: DPath) => p.segs.map((s) => (s.M ? `${X(s.M[0])} ${Y(s.M[1])} m` : s.L ? `${X(s.L[0])} ${Y(s.L[1])} l` : s.C ? `${s.C.map((q) => `${X(q[0])} ${Y(q[1])}`).join(" ")} c` : "")).join("\n");
  const esc = (s: string) => s.replace(/″/g, " in").replace(/[\\()]/g, (c) => "\\" + c).replace(/[^\x20-\x7e]/g, "-");
  const text = (at: Pt, str: string, size: number, rot = false, center = true) => {
    const fsz = size * pt, wdt = str.length * fsz * 0.55;
    if (rot) return `BT 0 1 -1 0 ${(Number(X(at[0])) + fsz * 0.35).toFixed(2)} ${(Number(Y(at[1])) - (center ? wdt / 2 : 0)).toFixed(2)} Tm /F1 ${fsz.toFixed(2)} Tf (${esc(str)}) Tj ET`;
    return `BT /F1 ${fsz.toFixed(2)} Tf ${(Number(X(at[0])) - (center ? wdt / 2 : 0)).toFixed(2)} ${(Number(Y(at[1])) - fsz * 0.35).toFixed(2)} Td (${esc(str)}) Tj ET`;
  };
  const prims = dimPrims(dl, unit, 1);
  const body = [
    "/CSg cs 1 scn",
    ...dl.paths.filter((p) => p.kind === "glue").map((p) => ops(p) + "\nh f"),
    "/CSi cs 0.6 scn",
    ...dl.labels.map((l) => text(l.at, l.text, (l.size ?? 1) * 4)),
    "/CSi CS 1 SCN /CSi cs 1 scn 0.35 w [] 0 d",
    ...prims.map((p) => ("line" in p ? `${X(p.line[0][0])} ${Y(p.line[0][1])} m ${X(p.line[1][0])} ${Y(p.line[1][1])} l S`
      : "tri" in p ? `${p.tri.map((q, i) => `${X(q[0])} ${Y(q[1])} ${i ? "l" : "m"}`).join(" ")} h f`
        : text(p.text.at, p.text.str, p.text.size, p.text.rot))),
    "/CSd CS 1 SCN 0.6 w 1 J [] 0 d",
    ...dl.paths.filter((p) => p.kind === "cut").map((p) => ops(p) + "\nS"),
    "/CSc CS 1 SCN 0.6 w [4 3] 0 d",
    ...dl.paths.filter((p) => p.kind === "fold").map((p) => ops(p) + "\nS"),
    "[] 0 d 0 0 0 1 k",
    `BT /F1 8 Tf ${(m * pt).toFixed(2)} ${(H - (m * 0.5 + 6) * pt).toFixed(2)} Td (${esc(title)} - Printy Packaging free dieline - solid = cut, dashed = fold - 1:1 scale) Tj ET`,
    // footer: logo + website, so the file always shows where it came from
    ...(() => {
      const lh = 9 * pt, lw = brand ? lh * brand.pw / brand.ph : 0, bx = m * pt, by = 6 * pt;
      const tx = (bx + (brand ? lw + 5 * pt : 0)).toFixed(2);
      return [
        brand ? `q ${lw.toFixed(2)} 0 0 ${lh.toFixed(2)} ${bx.toFixed(2)} ${by.toFixed(2)} cm /Im1 Do Q` : "",
        `0 0 0 1 k BT /F1 10 Tf ${tx} ${(by + lh * 0.55).toFixed(2)} Td (${brand ? "" : "Printy Packaging - "}Free dieline from ${SITE}) Tj ET`,
        `1 0.2 0.3 0.2 k BT /F1 8 Tf ${tx} ${(by + lh * 0.12).toFixed(2)} Td (Custom printed boxes from 100 pcs - free design help - ${SITE}/dieline-generator) Tj ET`,
      ];
    })(),
  ].join("\n");
  const tint = (c: number[]) => `<< /FunctionType 2 /Domain [0 1] /C0 [0 0 0 0] /C1 [${c.join(" ")}] /N 1 >>`;
  const objs = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W.toFixed(2)} ${H.toFixed(2)}] /Resources << /Font << /F1 5 0 R >>${brand ? " /XObject << /Im1 6 0 R >>" : ""} /ColorSpace << ` +
      `/CSd [/Separation /Dieline /DeviceCMYK ${tint([0.95, 0.8, 0.45, 0.6])}] ` +
      `/CSc [/Separation /Crease /DeviceCMYK ${tint([0, 0.6, 1, 0])}] ` +
      `/CSi [/Separation /Info /DeviceCMYK ${tint([1, 0.2, 0.3, 0.2])}] ` +
      `/CSg [/Separation /Glue /DeviceCMYK ${tint([0.15, 0, 0, 0])}] >> >> /Contents 4 0 R >>`,
    `<< /Length ${body.length} >>\nstream\n${body}\nendstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    ...(brand ? [`<< /Type /XObject /Subtype /Image /Width ${brand.pw} /Height ${brand.ph} /ColorSpace /DeviceCMYK /BitsPerComponent 8 /Filter /ASCIIHexDecode /Length ${brand.hex.length + 1} >>\nstream\n${brand.hex}>\nendstream`] : []),
  ];
  let out = "%PDF-1.4\n";
  const offs: number[] = [];
  objs.forEach((o, i) => { offs.push(out.length); out += `${i + 1} 0 obj\n${o}\nendobj\n`; });
  const xref = out.length;
  out += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n` + offs.map((o) => `${String(o).padStart(10, "0")} 00000 n \n`).join("");
  out += `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return new TextEncoder().encode(out);
}

// Loads the Printy logo once in the browser for the download footer.
let brandCache: Promise<Brand | undefined> | null = null;
export function loadBrandLogo(src = "/email/printy-logo.png"): Promise<Brand | undefined> {
  if (brandCache) return brandCache;
  brandCache = (async () => {
    try {
      const img = await createImageBitmap(await (await fetch(src)).blob());
      const pw = 300, ph = Math.round((300 * img.height) / img.width);
      const c = document.createElement("canvas");
      c.width = pw; c.height = ph;
      const ctx = c.getContext("2d")!;
      ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, pw, ph);
      ctx.drawImage(img, 0, 0, pw, ph);
      const px = ctx.getImageData(0, 0, pw, ph).data;
      let hex = "";
      for (let i = 0; i < px.length; i += 4) {
        const r = px[i] / 255, g = px[i + 1] / 255, b = px[i + 2] / 255, k = 1 - Math.max(r, g, b);
        const cmyk = k >= 1 ? [0, 0, 0, 1] : [(1 - r - k) / (1 - k), (1 - g - k) / (1 - k), (1 - b - k) / (1 - k), k];
        hex += cmyk.map((v) => Math.round(v * 255).toString(16).padStart(2, "0")).join("");
      }
      return { dataUri: c.toDataURL("image/png"), hex, pw, ph };
    } catch {
      return undefined;
    }
  })();
  return brandCache;
}

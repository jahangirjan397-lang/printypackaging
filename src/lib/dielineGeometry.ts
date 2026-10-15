// Parametric dielines for the free generator. Everything is in millimetres.
// A dieline is a list of paths: "cut" (solid) and "fold" (dashed crease).
// The same paths are turned into an SVG preview/download and a 1:1 PDF.

import type { GeneratorStyle } from "@/data/dielines";

export type Pt = [number, number];
export type Seg = { M?: Pt; L?: Pt; C?: [Pt, Pt, Pt] };
export type DPath = { kind: "cut" | "fold" | "glue"; segs: Seg[]; closed?: boolean };
export type DLabel = { at: Pt; text: string; size?: number };
export type Dieline = { paths: DPath[]; labels: DLabel[]; bbox: [number, number, number, number]; notes?: string[] };
export type DielineInput = { L: number; W: number; H: number; t: number };

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
  { id: "auto-bottom", name: "Tuck Top Auto Bottom", hint: "Crash-lock base for heavier items", dims: ["Length", "Width", "Height"], board: "card", library: "tuck-end-auto-bottom" },
  { id: "mailer", name: "Mailer Box", hint: "Roll end tuck front", dims: ["Length", "Width", "Height"], board: "flute", library: "roll-end-mailer-box" },
  { id: "shipping-box", name: "Shipping Box (RSC)", hint: "Regular slotted carton", dims: ["Length", "Width", "Height"], board: "flute", library: "full-flap-shipping-box" },
  { id: "tray", name: "Tray", hint: "Glued-corner tray", dims: ["Length", "Width", "Height"], board: "card", library: "sleeve-and-tray" },
  { id: "sleeve", name: "Sleeve", hint: "Slides over a tray", dims: ["Length", "Width", "Height"], board: "card", library: "sleeve-and-tray" },
  { id: "pillow", name: "Pillow Box", hint: "Curved press-in ends", dims: ["Width", "Depth", "Length"], board: "card", library: "pillow-box" },
];

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
    `Panels: ${r1(L + t)} / ${r1(W + t)} / ${r1(L + t)} / ${r1(W)} mm, depth ${r1(H)} mm (inside size + board ${t} mm)`,
    `Glue flap ${r1(g)} mm, closing panel ${r1(lid)} mm, tuck ${r1(tuck)} mm set in ${r1(t + 0.5)} mm each side`,
    `Dust flaps ${r1(dust)} mm deep`,
  ];
  const rects: Rect[] = [
    { x0: 0, y0: 3, x1: g, y1: H - 3, r: { tl: 2, bl: 2 } },
    { x0: xA, y0: 0, x1: xB, y1: H }, { x0: xB, y0: 0, x1: xC, y1: H },
    { x0: xC, y0: 0, x1: xD, y1: H }, { x0: xD, y0: 0, x1: xE, y1: H },
  ];
  const labels: DLabel[] = [];
  const topLid = (x0: number, x1: number) => {
    rects.push({ x0, y0: -lid, x1, y1: 0 });
    rects.push({ x0: x0 + t + 0.5, y0: -lid - tuck, x1: x1 - t - 0.5, y1: -lid, r: { tl: Math.min(8, tuck * 0.6), tr: Math.min(8, tuck * 0.6) } });
  };
  const botLid = (x0: number, x1: number) => {
    rects.push({ x0, y0: H, x1, y1: H + lid });
    rects.push({ x0: x0 + t + 0.5, y0: H + lid, x1: x1 - t - 0.5, y1: H + lid + tuck, r: { bl: Math.min(8, tuck * 0.6), br: Math.min(8, tuck * 0.6) } });
  };
  // top: lid on the third panel, dust flaps on the side panels
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
    const diag = (x0: number, w: number): DPath => ({ kind: "fold", segs: [{ M: [x0, H] }, { L: [x0 + Math.min(w, W / 2), H + Math.min(w, W / 2)] }] });
    const glue = (x0: number, w: number): DPath => ({ kind: "glue", closed: true, segs: [{ M: [x0, H] }, { L: [x0 + Math.min(w, W / 2), H + Math.min(w, W / 2)] }, { L: [x0, H + W / 2] }] });
    const extra = [diag(xB + 0.5, W), diag(xD + 0.5, W), glue(xB + 0.5, W), glue(xD + 0.5, W)];
    const paths = [...rectsToPaths(rects), ...extra];
    notes.push(`Auto bottom: glue the shaded areas; lock flaps ${r1(W / 2 + Math.min(10, W * 0.25))} mm`);
    labels.push({ at: [xA + L / 2, H / 2], text: `L ${r1(L)}` }, { at: [xB + W / 2, H / 2], text: `W ${r1(W)}` },
      { at: [xD + W / 2, H / 2], text: `H ${r1(d.H)}` }, { at: [g / 2, H / 2], text: "glue", size: 3 });
    return { paths, labels, bbox: bboxOf(paths), notes };
  }
  if (mode === "reverse") botLid(xA, xB);
  else botLid(xC, xD);
  rects.push({ x0: xB + 0.5, y0: H, x1: xC - 1, y1: H + dust, r: { bl: Math.min(10, dust * 0.5) } });
  rects.push({ x0: xD + 1, y0: H, x1: xE - 0.5, y1: H + dust, r: { br: Math.min(10, dust * 0.5) } });
  const paths = rectsToPaths(rects);
  labels.push({ at: [xA + L / 2, H / 2], text: `L ${r1(L)}` }, { at: [xB + W / 2, H / 2], text: `W ${r1(W)}` },
    { at: [xD + W / 2, H / 2], text: `H ${r1(d.H)}` }, { at: [g / 2, H / 2], text: "glue", size: 3 });
  return { paths, labels, bbox: bboxOf(paths), notes };
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
  const labels: DLabel[] = [
    { at: [(xs[0] + xs[1]) / 2, H / 2], text: `L ${r1(L)}` }, { at: [(xs[1] + xs[2]) / 2, H / 2], text: `W ${r1(W)}` },
    { at: [(xs[2] + xs[3]) / 2, H / 2], text: `H ${r1(d.H)}` }, { at: [g / 2, H / 2], text: "glue", size: 4 },
  ];
  return { paths, labels, bbox: bboxOf(paths), notes: [`Panels ${r1(L + t)} / ${r1(W + t)} / ${r1(L + t)} / ${r1(W + t)} mm, depth ${r1(H)} mm (board ${t} mm)`, `Flaps ${r1(fh)} mm, slots ${r1(s)} mm, glue flap ${g} mm`] };
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
  return { paths, labels: [{ at: [(xs[0] + xs[1]) / 2, W / 2], text: `L ${r1(Ls)}` }, { at: [(xs[1] + xs[2]) / 2, W / 2], text: `H ${r1(Hs)}` }], bbox: bboxOf(paths) };
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
  return { paths, labels: [{ at: [H + L / 2, H + W / 2], text: `base ${r1(L)} x ${r1(W)}` }, { at: [H + L / 2, H / 2], text: `H ${r1(H)}` }], bbox: bboxOf(paths) };
}

function mailer(d: DielineInput): Dieline {
  // Roll end tuck front (simplified standard proportions)
  const { L, W, H, t } = d;
  const T = Math.max(t, 1.5);
  const xL2 = 0, xL1 = H - T, xB0 = 2 * H - T, xB1 = xB0 + L, xR1 = xB1 + H, xR2 = xR1 + H - T; // inner side wall, outer side wall, base
  void xL2;
  const yF2 = 0, yF1 = H - T, yB0 = 2 * H - T, yB1 = yB0 + W, yK = yB1 + H + T, yLid = yK + W + T, yFr = yLid + H, yTk = yFr + Math.min(H * 0.8, 30);
  void yF2;
  const ear = Math.min(H * 0.9, W * 0.45);
  const rects: Rect[] = [
    { x0: xB0, y0: yB0, x1: xB1, y1: yB1 }, // base
    { x0: xB0, y0: yF1, x1: xB1, y1: yB0 }, { x0: xB0 + T, y0: 0, x1: xB1 - T, y1: yF1, r: { tl: 3, tr: 3 } }, // front outer + inner wall
    { x0: xL1, y0: yB0, x1: xB0, y1: yB1 }, { x0: 0, y0: yB0 + T, x1: xL1, y1: yB1 - T }, // left outer + inner
    { x0: xB1, y0: yB0, x1: xR1, y1: yB1 }, { x0: xR1, y0: yB0 + T, x1: xR2, y1: yB1 - T }, // right outer + inner
    // dust flaps on the front wall ends
    { x0: xL1 + 1, y0: yF1 + 1, x1: xB0, y1: yB0 - 1, r: { tl: 4 } }, { x0: xB1, y0: yF1 + 1, x1: xR1 - 1, y1: yB0 - 1, r: { tr: 4 } },
    { x0: xB0, y0: yB1, x1: xB1, y1: yK }, // back wall
    { x0: xB0 - ear, y0: yB1 + 1, x1: xB0, y1: yK - 1, r: { tl: 4, bl: 4 } }, { x0: xB1, y0: yB1 + 1, x1: xB1 + ear, y1: yK - 1, r: { tr: 4, br: 4 } }, // back dust flaps
    { x0: xB0, y0: yK, x1: xB1, y1: yLid }, // lid
    { x0: xB0 - ear, y0: yK + 2, x1: xB0, y1: yLid - 2, r: { tl: 6, bl: 6 } }, { x0: xB1, y0: yK + 2, x1: xB1 + ear, y1: yLid - 2, r: { tr: 6, br: 6 } }, // lid ears
    { x0: xB0, y0: yLid, x1: xB1, y1: yFr }, // lid front
    { x0: xB0 + 2, y0: yFr, x1: xB1 - 2, y1: yTk, r: { bl: 8, br: 8 } }, // tuck
  ];
  const paths = rectsToPaths(rects);
  return { paths, labels: [{ at: [xB0 + L / 2, yB0 + W / 2], text: `base ${r1(L)} x ${r1(W)}` }, { at: [xB0 + L / 2, yK + W / 2], text: "lid" }, { at: [xB0 + L / 2, yF1 + H / 2], text: `H ${r1(H)}` }], bbox: bboxOf(paths), notes: [`Roll end tuck front (FEFCO 0427 style), board ${T} mm`, `Inner walls set in ${T} mm, lid ${r1(W + T)} mm, front tuck ${r1(yTk - yFr)} mm`] };
}

function pillow(d: DielineInput): Dieline {
  // L = width of the box face, W = depth (bulge), H = length
  const { L, W, H } = d;
  const g = 12, bulge = Math.max(W * 0.5, 8);
  const xs = [g, g + L, g + 2 * L];
  const paths: DPath[] = [];
  const cut = (segs: Seg[]) => paths.push({ kind: "cut", segs });
  const fold = (segs: Seg[]) => paths.push({ kind: "fold", segs });
  // body sides
  cut([{ M: [0, 4] }, { L: [g, 0] }]); cut([{ M: [0, 4] }, { L: [0, H - 4] }]); cut([{ M: [0, H - 4] }, { L: [g, H] }]);
  cut([{ M: [xs[2], 0] }, { L: [xs[2], H] }]);
  fold([{ M: [xs[0], 0] }, { L: [xs[0], H] }]); fold([{ M: [xs[1], 0] }, { L: [xs[1], H] }]);
  for (let i = 0; i < 2; i++) {
    const a = xs[i], b = xs[i + 1];
    // outer cut lobes and inner curved creases, top and bottom
    cut([{ M: [a, 0] }, { C: [[a, -bulge * 1.33], [b, -bulge * 1.33], [b, 0]] }]);
    fold([{ M: [a, 0] }, { C: [[a + L * 0.25, bulge * 0.9], [b - L * 0.25, bulge * 0.9], [b, 0]] }]);
    cut([{ M: [a, H] }, { C: [[a, H + bulge * 1.33], [b, H + bulge * 1.33], [b, H]] }]);
    fold([{ M: [a, H] }, { C: [[a + L * 0.25, H - bulge * 0.9], [b - L * 0.25, H - bulge * 0.9], [b, H]] }]);
  }
  return { paths, labels: [{ at: [g + L / 2, H / 2], text: `W ${r1(L)}` }, { at: [g + 1.5 * L, H / 2], text: `length ${r1(H)}` }], bbox: bboxOf(paths) };
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

// ---------- output ----------
const f2 = (n: number) => (Math.round(n * 100) / 100).toString();

function svgD(p: DPath) {
  return p.segs.map((s) => (s.M ? `M${f2(s.M[0])} ${f2(s.M[1])}` : s.L ? `L${f2(s.L[0])} ${f2(s.L[1])}` : s.C ? `C${s.C.map((q) => `${f2(q[0])} ${f2(q[1])}`).join(" ")}` : "")).join(" ") + (p.closed ? " Z" : "");
}

export function dielineToSvg(dl: Dieline, title: string, opts: { margin?: number; preview?: boolean } = {}) {
  const m = opts.margin ?? 15;
  const [x0, y0, x1, y1] = dl.bbox;
  const w = x1 - x0 + 2 * m, h = y1 - y0 + 2 * m + 12;
  const tx = m - x0, ty = m - y0 + 12;
  const sw = opts.preview ? Math.max(w, h) / 500 : 0.25;
  const parts = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${f2(w)}mm" height="${f2(h)}mm" viewBox="0 0 ${f2(w)} ${f2(h)}">`,
    `<title>${title}</title>`,
    `<rect width="100%" height="100%" fill="#ffffff"/>`,
    `<text x="${m}" y="${m * 0.5 + 6}" font-family="Arial, Helvetica, sans-serif" font-size="5" fill="#07111F">${title} · Printy Packaging free dieline · cut = solid, fold = dashed · units: mm</text>`,
    `<g transform="translate(${f2(tx)} ${f2(ty)})">`,
    ...dl.paths.filter((p) => p.kind === "glue").map((p) => `<path d="${svgD(p)}" fill="#00C2E8" fill-opacity="0.15" stroke="none"/>`),
    `<g id="cut" fill="none" stroke="#07111F" stroke-width="${f2(sw)}" stroke-linecap="round">`,
    ...dl.paths.filter((p) => p.kind === "cut").map((p) => `<path d="${svgD(p)}"/>`),
    `</g>`,
    `<g id="fold" fill="none" stroke="#E5484D" stroke-width="${f2(sw)}" stroke-dasharray="${f2(sw * 8)} ${f2(sw * 5)}">`,
    ...dl.paths.filter((p) => p.kind === "fold").map((p) => `<path d="${svgD(p)}"/>`),
    `</g>`,
    ...dl.labels.map((l) => `<text x="${f2(l.at[0])}" y="${f2(l.at[1])}" text-anchor="middle" dominant-baseline="middle" font-family="Arial, Helvetica, sans-serif" font-size="${l.size ?? Math.max(3, Math.min(8, (x1 - x0) / 60))}" fill="#64748B">${l.text}</text>`),
    `</g></svg>`,
  ];
  return parts.join("");
}

// Minimal 1:1 vector PDF (no fonts embedded: uses the standard Helvetica).
export function dielineToPdf(dl: Dieline, title: string): Uint8Array {
  const mm = 72 / 25.4, m = 15;
  const [x0, y0, x1, y1] = dl.bbox;
  const W = (x1 - x0 + 2 * m) * mm, H = (y1 - y0 + 2 * m + 12) * mm;
  const X = (x: number) => ((x - x0 + m) * mm).toFixed(2);
  const Y = (y: number) => (H - (y - y0 + m + 12) * mm).toFixed(2);
  const ops = (p: DPath) => p.segs.map((s) => (s.M ? `${X(s.M[0])} ${Y(s.M[1])} m` : s.L ? `${X(s.L[0])} ${Y(s.L[1])} l` : s.C ? `${s.C.map((q) => `${X(q[0])} ${Y(q[1])}`).join(" ")} c` : "")).join("\n");
  const esc = (s: string) => s.replace(/[\\()]/g, (c) => "\\" + c).replace(/[^\x20-\x7e]/g, "-");
  const body = [
    "0.88 0.95 0.98 rg",
    ...dl.paths.filter((p) => p.kind === "glue").map((p) => ops(p) + "\nh f"),
    "0.027 0.067 0.122 RG 0.6 w 1 J [] 0 d",
    ...dl.paths.filter((p) => p.kind === "cut").map((p) => ops(p) + "\nS"),
    "0.9 0.28 0.3 RG 0.6 w [4 3] 0 d",
    ...dl.paths.filter((p) => p.kind === "fold").map((p) => ops(p) + "\nS"),
    "[] 0 d BT /F1 9 Tf 0.027 0.067 0.122 rg",
    `${(m * mm).toFixed(2)} ${(H - (m * 0.5 + 6) * mm).toFixed(2)} Td (${esc(title)} - Printy Packaging free dieline - cut = solid, fold = dashed - 1:1 scale, mm) Tj ET`,
    "0.39 0.45 0.55 rg",
    ...dl.labels.map((l) => `BT /F1 ${Math.round((l.size ?? 6) * mm)} Tf ${X(l.at[0])} ${Y(l.at[1])} Td (${esc(l.text)}) Tj ET`),
  ].join("\n");
  const objs = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W.toFixed(2)} ${H.toFixed(2)}] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>`,
    `<< /Length ${body.length} >>\nstream\n${body}\nendstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  ];
  let out = "%PDF-1.4\n";
  const offs: number[] = [];
  objs.forEach((o, i) => { offs.push(out.length); out += `${i + 1} 0 obj\n${o}\nendobj\n`; });
  const xref = out.length;
  out += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n` + offs.map((o) => `${String(o).padStart(10, "0")} 00000 n \n`).join("");
  out += `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return new TextEncoder().encode(out);
}

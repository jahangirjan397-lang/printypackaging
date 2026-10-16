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
export type Dieline = { paths: DPath[]; labels: DLabel[]; dims: DDim[]; bbox: [number, number, number, number]; notes?: string[]; areas?: Rect[] };
export type DielineInput = { L: number; W: number; H: number; t: number; slitLock?: boolean };
export type Unit = "mm" | "cm" | "in";

const allGeneratorStyles: {
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
  { id: "four-corner", name: "Four Corner Box", hint: "Tray with a tuck lid", dims: ["Length", "Width", "Height"], board: "card", library: "four-corner-tray" },
  { id: "tray", name: "Tray", hint: "Glued-corner tray", dims: ["Length", "Width", "Height"], board: "card", library: "four-corner-tray" },
  { id: "sleeve", name: "Sleeve", hint: "Slides over a tray", dims: ["Length", "Width", "Height"], board: "card", library: "sleeve-and-tray" },
  { id: "pillow", name: "Pillow Box", hint: "Curved press-in ends", dims: ["Width", "Depth", "Length"], board: "card", library: "pillow-box" },
];

// Only styles checked line by line against our own production dielines are
// offered on the site. Others stay in the code until they are matched to our
// CorelDRAW files and approved (auto bottom, mailer, shipping box, tray,
// sleeve, pillow).
export const VERIFIED_STYLES: GeneratorStyle[] = ["reverse-tuck-end", "straight-tuck-end", "auto-bottom", "four-corner"];
export const generatorStyles = allGeneratorStyles.filter((s) => VERIFIED_STYLES.includes(s.id));

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

// panels of the last layout, used to fill the box shape in themed previews
let lastAreas: Rect[] = [];

function rectsToPaths(rects: Rect[]): DPath[] {
  lastAreas = rects;
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
const IN = 25.4;
// Small tucks are fully rounded (a half circle), larger ones get round corners
const tuckR = (w: number, tuck: number) => (w <= 41 ? Math.min(tuck, (w - 1.01) / 2) : Math.min(8, tuck * 0.6));
// Glue flap and tuck size used on our tuck-end dielines
const flapSize = (L: number, W: number) => (W >= 4 * IN ? 0.75 * IN : L > 4 * IN ? 0.625 * IN : L <= 1.5 * IN ? 0.375 * IN : 0.5 * IN);
const hd = (x0: number, x1: number, y: number): DDim => ({ a: [x0, y], b: [x1, y] });
const vd = (y0: number, y1: number, x: number): DDim => ({ a: [x, y0], b: [x, y1] });

// ---------- styles ----------
function tuckEnd(d: DielineInput, mode: "reverse" | "straight" | "auto"): Dieline {
  // Printy factory rules (measured from our own production dielines):
  // panels are drawn at the inside size, the closing panel equals the width,
  // glue flap and tuck are 1/2", 5/8" or 3/4" by box size, dust flaps are
  // the width less 1".
  const { L, W, t } = d;
  const H = d.H;
  // our auto-lock dielines use a 1/2" glue flap and tuck at every size
  const g = mode === "auto" ? 0.5 * IN : flapSize(L, W); // glue flap
  const xA = g, xB = g + L, xC = xB + W, xD = xC + L, xE = xD + W;
  const lid = W, tuck = mode === "auto" ? 0.5 * IN : flapSize(L, W), dust = W >= 63.5 ? W - IN : W / 2;
  void t;
  const notes = [
    `Panels ${r1(L)} / ${r1(W)} / ${r1(L)} / ${r1(W)} mm, height ${r1(H)} mm (Printy factory rules)`,
    `Glue flap ${r1(g)} mm · closing panel ${r1(lid)} mm · tuck ${r1(tuck)} mm · dust flaps ${r1(dust)} mm`,
  ];
  if (mode === "auto" && Math.min(L, W) < 1.5 * IN) notes.push("Auto bottom needs length and width of at least 1.5 in (38 mm)");
  const rects: Rect[] = [
    { x0: xA, y0: 0, x1: xB, y1: H }, { x0: xB, y0: 0, x1: xC, y1: H },
    { x0: xC, y0: 0, x1: xD, y1: H }, { x0: xD, y0: 0, x1: xE, y1: H },
  ];
  const labels: DLabel[] = [
    { at: [xA + L / 2, H * 0.55], text: "FRONT" }, { at: [xB + W / 2, H * 0.55], text: "SIDE" },
    { at: [xC + L / 2, H * 0.55], text: "BACK" }, { at: [xD + W / 2, H * 0.55], text: "SIDE" },
    { at: [g / 2, H * 0.55], text: "GLUE", size: 0.6 },
    { at: [xA + L / 2, -lid / 2], text: "LID" },
  ];
  const yd = Math.min(12, H * 0.15);
  const dims: DDim[] = [hd(xA, xB, yd), hd(xB, xC, yd), hd(xC, xD, yd), hd(xD, xE, yd), vd(0, H, xA + Math.min(10, L * 0.18)), vd(-lid, 0, xA + Math.min(10, L * 0.18))];
  // slit locks: short cuts at both ends of the tuck fold, as on our dielines
  const slits: DPath[] = [];
  // on our auto-lock dielines: slits 1/8" in and 1/16" deep, tuck corners = half the tuck
  const slitIn = mode === "auto" ? 0.125 * IN : 2, slitLen = mode === "auto" ? IN / 16 : 2.5;
  const slit = (x: number, y: number, dir: number) => slits.push({ kind: "cut", segs: [{ M: [x, y] }, { L: [x, y + dir * slitLen] }] });
  const topLid = (x0: number, x1: number) => {
    if (d.slitLock || mode === "auto") { slit(x0 + slitIn, -lid, 1); slit(x1 - slitIn, -lid, 1); }
    rects.push({ x0, y0: -lid, x1, y1: 0 });
    const tr = mode === "auto" ? tuck / 2 : tuckR(x1 - x0, tuck);
    rects.push({ x0: x0 + 0.5, y0: -lid - tuck, x1: x1 - 0.5, y1: -lid, r: { tl: tr, tr } });
  };
  const botLid = (x0: number, x1: number) => {
    if (d.slitLock) { slit(x0 + 2, H + lid, -1); slit(x1 - 2, H + lid, -1); }
    rects.push({ x0, y0: H, x1, y1: H + lid });
    rects.push({ x0: x0 + 0.5, y0: H + lid, x1: x1 - 0.5, y1: H + lid + tuck, r: { bl: tuckR(x1 - x0, tuck), br: tuckR(x1 - x0, tuck) } });
    labels.push({ at: [(x0 + x1) / 2, H + lid / 2], text: "BOTTOM" });
  };
  // Dust flaps as on our dielines: a small relief nick at both ends of the
  // fold, and the rounded corner on the side away from the lid.
  const dustFlaps: { a: number; b: number; y: number; dir: number; roundLeft: boolean; depth?: number; taper?: "left" | "right" }[] = [];
  const finish = (base: DPath[]) => {
    // tapered glue flap, like our files
    const tg = mode === "auto" ? 0.125 * IN : Math.min(g * 0.3, H * 0.1);
    let out = base.filter((p) => !(p.kind === "cut" && p.segs.length === 2 && p.segs[0].M && p.segs[1].L &&
      Math.abs(p.segs[0].M[0] - xA) < 0.01 && Math.abs(p.segs[1].L[0] - xA) < 0.01));
    out.push({ kind: "cut", segs: [{ M: [xA, 0] }, { L: [0, tg] }, { L: [0, H - tg] }, { L: [xA, H] }] }, { kind: "fold", segs: [{ M: [xA, 0] }, { L: [xA, H] }] });
    lastAreas = [...lastAreas, { x0: 0, y0: tg, x1: xA, y1: H - tg }];
    for (const f of dustFlaps) {
      // the panel edge under the flap becomes a fold instead of a cut
      out = out.filter((p) => !(p.kind === "cut" && p.segs.length === 2 && p.segs[0].M && p.segs[1].L &&
        Math.abs(p.segs[0].M[1] - f.y) < 0.01 && Math.abs(p.segs[1].L[1] - f.y) < 0.01 &&
        Math.min(p.segs[0].M[0], p.segs[1].L[0]) >= f.a - 0.01 && Math.max(p.segs[0].M[0], p.segs[1].L[0]) <= f.b + 0.01));
      const Y = (v: number) => f.y + f.dir * v;
      if (f.taper) {
        // tapered flap from our auto-lock dielines: straight side with a 1/8" relief,
        // other side rounded (W/8) into a slant ending 1 mm short of the fold
        const D = f.depth ?? dust, w = f.b - f.a, rel = 0.125 * IN, Rr = w / 8, inX = 0.17 * w;
        const right = f.taper === "right";
        const e = right ? f.b : f.a, s0 = right ? f.a : f.b, sg = right ? 1 : -1; // sg points from straight side to taper side
        const segsT: Seg[] = [
          { M: [s0, f.y] }, { L: [s0 + sg * rel, Y(rel)] }, { L: [s0 + sg * rel, Y(D)] },
          { L: [e - sg * (inX + Rr), Y(D)] },
          { C: [[e - sg * (inX + Rr - Rr * K), Y(D)], [e - sg * inX, Y(D - Rr + Rr * K)], [e - sg * inX, Y(D - Rr)]] },
          { L: [e - sg * 4.17, Y(6.35)] }, { L: [e - sg * 1, Y(rel)] }, { L: [e - sg * 1, f.y] },
        ];
        out.push({ kind: "cut", segs: segsT }, { kind: "cut", segs: [{ M: [e - sg * 1, f.y] }, { L: [e, f.y] }] },
          { kind: "fold", segs: [{ M: [s0, f.y] }, { L: [e - sg * 1, f.y] }] });
        lastAreas = [...lastAreas, { x0: Math.min(s0 + sg * rel, e - sg * inX), x1: Math.max(s0 + sg * rel, e - sg * inX), y0: Math.min(f.y, Y(D)), y1: Math.max(f.y, Y(D)), r: f.dir < 0 ? (right ? { tr: Rr } : { tl: Rr }) : (right ? { br: Rr } : { bl: Rr }) }];
        continue;
      }
      const sN = Math.min(2, (f.b - f.a) * 0.07), R = Math.min(10, dust * 0.5, (f.b - f.a) / 2 - sN);
      const segs: Seg[] = [{ M: [f.a, f.y] }, { L: [f.a + sN, Y(sN)] }];
      if (f.roundLeft) segs.push({ L: [f.a + sN, Y(dust - R)] }, { C: [[f.a + sN, Y(dust - R + R * K)], [f.a + sN + R - R * K, Y(dust)], [f.a + sN + R, Y(dust)]] });
      else segs.push({ L: [f.a + sN, Y(dust)] });
      if (!f.roundLeft) segs.push({ L: [f.b - sN - R, Y(dust)] }, { C: [[f.b - sN - R + R * K, Y(dust)], [f.b - sN, Y(dust - R + R * K)], [f.b - sN, Y(dust - R)]] });
      else segs.push({ L: [f.b - sN, Y(dust)] });
      segs.push({ L: [f.b - sN, Y(sN)] }, { L: [f.b, f.y] });
      out.push({ kind: "cut", segs }, { kind: "fold", segs: [{ M: [f.a, f.y] }, { L: [f.b, f.y] }] });
      lastAreas = [...lastAreas, { x0: f.a + sN, x1: f.b - sN, y0: Math.min(f.y, Y(dust)), y1: Math.max(f.y, Y(dust)), r: f.dir < 0 ? (f.roundLeft ? { tl: R } : { tr: R }) : (f.roundLeft ? { bl: R } : { br: R }) }];
    }
    return out;
  };
  topLid(xA, xB); // our dielines put the lid on the first panel
  if (mode === "auto") {
    // our auto-lock layout: top dust flaps L/2 deep, tapering towards the back panel
    dustFlaps.push({ a: xB, b: xC, y: 0, dir: -1, roundLeft: false, depth: L / 2, taper: "right" }, { a: xD, b: xE, y: 0, dir: -1, roundLeft: true, depth: L / 2, taper: "left" });
  } else {
    dustFlaps.push({ a: xB, b: xC, y: 0, dir: -1, roundLeft: false }, { a: xD, b: xE, y: 0, dir: -1, roundLeft: true });
  }
  if (mode === "auto") {
    // Crash-lock base measured from our auto-lock dielines:
    // hook flaps (front, back): 3/4 W deep, 1/8" relief each side, 45 deg fold from
    // the corner to a point W/2 in and W/2 down, a ledge of (L - W)/2, 45 deg cuts;
    // glue flaps (sides): W/2 deep with a 45 deg edge.
    const rel = 0.125 * IN, dep = 0.75 * W, drop = dep - W / 2;
    const extra: DPath[] = [];
    const hook = (x0: number, x1: number) => {
      const P: Pt = [x1 - W / 2, H + W / 2];
      const Q: Pt = [P[0] - Math.max(0, (x1 - x0 - W) / 2), P[1]];
      const lb = Math.max(x0 + rel, Q[0] - drop), rb = Math.min(x1 - rel, P[0] + drop);
      const segs: Seg[] = [{ M: [x0, H] }, { L: [x0 + rel, H + rel] }, { L: [x0 + rel, H + dep] }, { L: [lb, H + dep] }, { L: Q }];
      if (Q[0] < P[0] - 0.01) segs.push({ L: P });
      segs.push({ L: [rb, H + dep] }, { L: [x1 - rel, H + dep] }, { L: [x1 - rel, H + rel] }, { L: [x1, H] });
      extra.push({ kind: "cut", segs }, { kind: "fold", segs: [{ M: [x1, H] }, { L: P }] });
      lastAreas = [...lastAreas, { x0: x0 + rel, y0: H, x1: x1 - rel, y1: H + dep }];
      labels.push({ at: [x0 + (x1 - x0) * 0.32, H + dep * 0.45], text: "LOCK", size: 0.7 });
    };
    const side = (x0: number, x1: number) => {
      extra.push({ kind: "cut", segs: [{ M: [x0, H] }, { L: [x0, H + W / 2] }, { L: [x0 + (x1 - x0) / 2, H + W / 2] }, { L: [x1, H] }] });
      lastAreas = [...lastAreas, { x0, y0: H, x1: x0 + (x1 - x0) / 2, y1: H + W / 2 }];
    };
    hook(xA, xB); side(xB, xC); hook(xC, xD); side(xD, xE);
    // the whole bottom edge of the body folds
    const base = finish(rectsToPaths(rects)).filter((p) => !(p.kind === "cut" && p.segs.length === 2 && p.segs[0].M && p.segs[1].L &&
      Math.abs(p.segs[0].M[1] - H) < 0.01 && Math.abs(p.segs[1].L[1] - H) < 0.01 &&
      Math.min(p.segs[0].M[0], p.segs[1].L[0]) >= xA - 0.01));
    const paths = [...base, { kind: "fold" as const, segs: [{ M: [xA, H] as Pt }, { L: [xE, H] as Pt }] }, ...extra, ...slits];
    notes.push(`Crash-lock bottom (Printy auto-lock layout) · hook flaps ${r1(dep)} mm · side flaps ${r1(W / 2)} mm · slit lock on the tuck`);
    dims.push(vd(H, H + dep, xA + rel + Math.min(8, L * 0.1)));
    return { paths, labels, dims, bbox: bboxOf(paths), notes };
  }
  if (mode === "reverse") botLid(xC, xD);
  else botLid(xA, xB);
  // bottom lid on the third panel (reverse) or the first (straight): round away from it
  dustFlaps.push({ a: xB, b: xC, y: H, dir: 1, roundLeft: mode === "reverse" }, { a: xD, b: xE, y: H, dir: 1, roundLeft: mode !== "reverse" });
  const paths = [...finish(rectsToPaths(rects)), ...slits];
  if (d.slitLock) notes.push("Slit locks on both tucks");
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
  // Double wall tuck top mailer, laid out like our own production dielines:
  // tuck (H) / lid (W) / back wall (H) / base (W) / front wall (H) down the
  // middle; double side walls (inner H + outer H) beside the base; square
  // dust flaps on the front and back walls; a double score of one board
  // thickness at the lid hinge and between the side walls.
  const { L, W, H, t } = d;
  const c = t >= 1 ? Math.max(1.6, t * 1.1) : 0.8; // double-score gap
  const x0 = 2 * H, x1 = x0 + L; // base columns
  const yT = 0, yL = H, yG = H + W, yK = yG + c, yB = 2 * H + W, yF = yB + W, yE = yF + H - c;
  const ear = H * 0.92, nick = 0.5;
  const rects: Rect[] = [
    { x0, y0: yT, x1, y1: yL, r: { tl: Math.min(10, H * 0.25), tr: Math.min(10, H * 0.25) } }, // tuck
    { x0: x0 - ear, y0: yT + H * 0.05, x1: x0, y1: yL - 1, r: { tl: H * 0.45, bl: H * 0.25 } }, { x0: x1, y0: yT + H * 0.05, x1: x1 + ear, y1: yL - 1, r: { tr: H * 0.45, br: H * 0.25 } }, // tuck ears
    { x0, y0: yL, x1, y1: yG }, // lid
    { x0: x0 - ear * 0.7, y0: yL + W * 0.08, x1: x0, y1: yG - W * 0.08, r: { tl: 8, bl: 8 } }, { x0: x1, y0: yL + W * 0.08, x1: x1 + ear * 0.7, y1: yG - W * 0.08, r: { tr: 8, br: 8 } }, // lid ears
    { x0, y0: yG, x1, y1: yK }, // hinge double score
    { x0, y0: yK, x1, y1: yB }, // back wall
    { x0: H + c, y0: yK, x1: x0, y1: yB - nick }, { x0: x1, y0: yK, x1: x1 + H - c, y1: yB - nick }, // back dust flaps
    { x0, y0: yB, x1, y1: yF }, // base
    { x0: H + c, y0: yB, x1: x0, y1: yF }, { x0: H, y0: yB, x1: H + c, y1: yF }, { x0: 0, y0: yB, x1: H, y1: yF }, // left outer, score, inner
    { x0: x1, y0: yB, x1: x1 + H - c, y1: yF }, { x0: x1 + H - c, y0: yB, x1: x1 + H, y1: yF }, { x0: x1 + H, y0: yB, x1: x1 + 2 * H, y1: yF }, // right
    { x0, y0: yF, x1, y1: yE }, // front wall
    { x0: H + c, y0: yF + nick, x1: x0, y1: yE }, { x0: x1, y0: yF + nick, x1: x1 + H - c, y1: yE }, // front dust flaps
  ];
  // locking tabs on the inner side walls
  const tab = Math.min(8, H * 0.12), tl = Math.min(25, W * 0.15);
  for (const yy of [yB + W * 0.25 - tl / 2, yB + W * 0.75 - tl / 2]) {
    rects.push({ x0: -tab, y0: yy, x1: 0, y1: yy + tl, r: { tl: 2, bl: 2 } }, { x0: x1 + 2 * H, y0: yy, x1: x1 + 2 * H + tab, y1: yy + tl, r: { tr: 2, br: 2 } });
  }
  const paths = rectsToPaths(rects);
  const cx = x0 + L / 2;
  return {
    paths,
    labels: [{ at: [cx, yT + H * 0.55], text: "TUCK" }, { at: [cx, yL + W * 0.55], text: "LID" }, { at: [cx, yK + (yB - yK) * 0.55], text: "BACK" }, { at: [cx, yB + W * 0.55], text: "BASE" }, { at: [cx, yF + H * 0.55], text: "FRONT" }, { at: [H * 0.5, yB + W * 0.55], text: "SIDE" }, { at: [x1 + 1.5 * H, yB + W * 0.55], text: "SIDE" }],
    dims: [hd(x0, x1, yB + Math.min(14, W * 0.2)), vd(yB, yF, x0 + Math.min(14, L * 0.15)), vd(yF, yE, x0 + L * 0.8), vd(yL, yG, x0 + Math.min(14, L * 0.15)), hd(0, H, yB + W * 0.85)],
    bbox: bboxOf(paths),
    notes: [`Double wall tuck top (Printy layout) · base ${r1(L)} × ${r1(W)} mm · walls ${r1(H)} mm`, `Double score ${r1(c)} mm at the lid hinge and side walls · locking tabs on the inner walls`],
  };
}

// Four corner box with a tuck lid, measured from our own production dielines
// ("Four corner box" 15 x 12 x 7 in and 4 x 4 x 2.5 in, "FOUR CORNER" 8 x 7 x 3 in):
// tuck / lid (W) / back wall (H) / base (W) / front wall (H) down the middle;
// side walls (H) beside the base; corner wings (H) beside the back and front
// walls, 1/16" shorter at their free edge with a small 45° cut at the hinge;
// dust flaps beside the lid; a half-round finger notch in the front wall.
function fourCorner(d: DielineInput): Dieline {
  const { L, W, H } = d;
  const e = IN / 16;
  const band = W <= 4 * IN ? 0 : W <= 8 * IN ? 1 : 2;
  const tk = [0.75, 1, 1.5][band] * IN; // tuck depth
  const D = Math.max(6, Math.min(H, W / 2 - [0.375, 0.5, 1][band] * IN)); // lid dust flap depth
  const notch = (L <= 8 * IN ? 0.75 : 0.875) * IN;
  const x0 = H, x1 = H + L;
  const yL = tk, yK = yL + W, yB = yK + H, yF = yB + W, yE = yF + H;
  const rects: Rect[] = [
    { x0, y0: 0, x1, y1: yL }, // tuck (outline replaced below)
    { x0: x0 - D, y0: yL, x1: x0, y1: yK }, { x0: x1, y0: yL, x1: x1 + D, y1: yK }, // lid dust flaps (outline replaced)
    { x0, y0: yL, x1, y1: yK }, // lid
    { x0, y0: yK, x1, y1: yB }, // back wall
    { x0: 0, y0: yK + e, x1: x0, y1: yB }, { x0: x1, y0: yK + e, x1: x1 + H, y1: yB }, // back corner wings
    { x0, y0: yB, x1, y1: yF }, // base
    { x0: 0, y0: yB, x1: x0, y1: yF }, { x0: x1, y0: yB, x1: x1 + H, y1: yF }, // side walls
    { x0, y0: yF, x1, y1: yE }, // front wall
    { x0: 0, y0: yF, x1: x0, y1: yE - e }, { x0: x1, y0: yF, x1: x1 + H, y1: yE - e }, // front corner wings
  ];
  const same = (a: number, b: number) => Math.abs(a - b) < 0.01;
  const seg = (p: DPath) => ({ a: p.segs[0].M!, b: (p.segs[1].L ?? p.segs[1].C?.[2])! });
  const on = (p: DPath, fx: (x: number, y: number) => boolean) => { const { a, b } = seg(p); return fx(a[0], a[1]) && fx(b[0], b[1]); };
  let paths = rectsToPaths(rects).filter((p) => {
    if (p.kind !== "cut") return true;
    // the tuck and dust flaps get their own shapes
    if (on(p, (x, y) => y <= yL + 0.01 && x >= x0 - 0.01 && x <= x1 + 0.01) && !on(p, (_, y) => same(y, yL))) return false;
    if (on(p, (x, y) => y >= yL - 0.01 && y <= yK + 0.01 && (x <= x0 + 0.01 || x >= x1 - 0.01)) && !on(p, (x) => same(x, x0) || same(x, x1))) return false;
    // the wings' 1/16" step at the hinge becomes a small 45° cut
    const { a, b } = seg(p);
    if (same(a[0], b[0]) && on(p, (x, y) => (same(x, x0) || same(x, x1)) && ((y >= yK - 0.01 && y <= yK + e + 0.01) || (y >= yE - e - 0.01 && y <= yE + 0.01)))) return false;
    return true;
  }).map((p) => {
    // wings and side walls are separate pieces: the line between them is cut, not folded
    const { a, b } = seg(p);
    const between = p.kind === "fold" && same(a[1], b[1]) && (same(a[1], yB) || same(a[1], yF)) && (Math.max(a[0], b[0]) <= x0 + 0.01 || Math.min(a[0], b[0]) >= x1 - 0.01);
    return between ? { ...p, kind: "cut" as const } : p;
  });
  // trim the wing edges back by e where the 45° cut takes over, and open the notch
  paths = paths.flatMap((p) => {
    if (p.kind !== "cut") return [p];
    const { a, b } = seg(p);
    const trim = (y: number) => same(a[1], y) && same(b[1], y);
    if (trim(yK + e) || trim(yE - e)) {
      const fix = (pt: Pt): Pt => (same(pt[0], x0) ? [x0 - e, pt[1]] : same(pt[0], x1) ? [x1 + e, pt[1]] : pt);
      return [{ kind: "cut", segs: [{ M: fix(a) }, { L: fix(b) }] } as DPath];
    }
    if (trim(yE) && Math.min(a[0], b[0]) <= x0 + 0.01 && Math.max(a[0], b[0]) >= x1 - 0.01) {
      const cx = (x0 + x1) / 2, r = notch / 2;
      return [
        { kind: "cut", segs: [{ M: [x0, yE] }, { L: [cx - r, yE] }] },
        { kind: "cut", segs: [{ M: [cx - r, yE] }, { C: [[cx - r, yE - r * K], [cx - r * K, yE - r], [cx, yE - r]] }, { C: [[cx + r * K, yE - r], [cx + r, yE - r * K], [cx + r, yE]] }] },
        { kind: "cut", segs: [{ M: [cx + r, yE] }, { L: [x1, yE] }] },
      ] as DPath[];
    }
    return [p];
  });
  const cut = (segs: Seg[]) => paths.push({ kind: "cut", segs });
  for (const [x, s] of [[x0, -1], [x1, 1]] as const) {
    cut([{ M: [x, yK] }, { L: [x + s * e, yK + e] }]);
    cut([{ M: [x, yE] }, { L: [x + s * e, yE - e] }]);
  }
  // tuck: sides lean in 1/8" over half the depth, then round into the top edge
  const inset = IN / 8, c = tk / 2;
  cut([
    { M: [x0, yL] }, { L: [x0 + inset, tk / 2] },
    { C: [[x0 + inset, tk / 2 - (tk / 2) * K], [x0 + inset + c - c * K, 0], [x0 + inset + c, 0]] },
    { L: [x1 - inset - c, 0] },
    { C: [[x1 - inset - c + c * K, 0], [x1 - inset, tk / 2 - (tk / 2) * K], [x1 - inset, tk / 2]] },
    { L: [x1, yL] },
  ]);
  // lid dust flaps: a shallow slant out from each hinge corner, rounding into the outer edge
  for (const s of [-1, 1] as const) {
    const hx = s < 0 ? x0 : x1, ox = hx + s * D, sx = hx + s * D * 0.6, sy = D * 0.15, cy = D * 0.6;
    cut([
      { M: [hx, yL] }, { L: [sx, yL + sy] },
      { C: [[sx + s * D * 0.4 * K, yL + sy + cy * (1 - K) * 0.3], [ox, yL + sy + cy - cy * K], [ox, yL + sy + cy]] },
      { L: [ox, yK - sy - cy] },
      { C: [[ox, yK - sy - cy + cy * K], [sx + s * D * 0.4 * K, yK - sy - cy * (1 - K) * 0.3], [sx, yK - sy]] },
      { L: [hx, yK] },
    ]);
  }
  const cx = x0 + L / 2;
  return {
    paths,
    labels: [
      { at: [cx, yL / 2], text: "TUCK", size: 0.7 }, { at: [cx, yL + W * 0.55], text: "LID" }, { at: [cx, yK + H * 0.55], text: "BACK" },
      { at: [cx, yB + W * 0.55], text: "BASE" }, { at: [cx, yF + H * 0.45], text: "FRONT" },
      { at: [H / 2, yB + W * 0.55], text: "SIDE" }, { at: [x1 + H / 2, yB + W * 0.55], text: "SIDE" },
    ],
    dims: [hd(x0, x1, yB + Math.min(14, W * 0.2)), vd(yB, yF, x0 + Math.min(14, L * 0.15)), vd(yK, yB, x0 + L * 0.8), vd(yL, yK, x0 + Math.min(14, L * 0.15)), hd(0, H, yB + W * 0.8), vd(0, yL, x1 - Math.min(14, L * 0.15))],
    bbox: bboxOf(paths),
    notes: [
      `Four corner box (Printy layout) · base ${r1(L)} × ${r1(W)} mm · walls ${r1(H)} mm`,
      `Tuck ${r1(tk)} mm · lid dust flaps ${r1(D)} mm · corner wings ${r1(H)} mm, 1/16″ short · finger notch ${r1(notch)} mm`,
    ],
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
  lastAreas = [];
  const dl = buildRaw(style, input);
  return { ...dl, areas: lastAreas.length ? lastAreas : undefined };
}

function buildRaw(style: GeneratorStyle, input: DielineInput): Dieline {
  switch (style) {
    case "reverse-tuck-end": return tuckEnd(input, "reverse");
    case "straight-tuck-end": return tuckEnd(input, "straight");
    case "auto-bottom": return tuckEnd(input, "auto");
    case "shipping-box": return shippingBox(input);
    case "sleeve": return sleeve(input);
    case "tray": return tray(input);
    case "mailer": return mailer(input);
    case "pillow": return pillow(input);
    case "four-corner": return fourCorner(input);
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

// Panel outline with its rounded corners, for the board fill
function roundRectD(r: Rect) {
  const q = r.r || {};
  const tl = q.tl || 0, tr = q.tr || 0, br = q.br || 0, bl = q.bl || 0;
  return `M${f2(r.x0 + tl)} ${f2(r.y0)}H${f2(r.x1 - tr)}${tr ? `A${f2(tr)} ${f2(tr)} 0 0 1 ${f2(r.x1)} ${f2(r.y0 + tr)}` : ""}V${f2(r.y1 - br)}${br ? `A${f2(br)} ${f2(br)} 0 0 1 ${f2(r.x1 - br)} ${f2(r.y1)}` : ""}H${f2(r.x0 + bl)}${bl ? `A${f2(bl)} ${f2(bl)} 0 0 1 ${f2(r.x0)} ${f2(r.y1 - bl)}` : ""}V${f2(r.y0 + tl)}${tl ? `A${f2(tl)} ${f2(tl)} 0 0 1 ${f2(r.x0 + tl)} ${f2(r.y0)}` : ""}Z`;
}


// Same rounded panel as roundRectD, as PDF path operators
function roundRectOps(r: Rect, X: (x: number) => string, Y: (y: number) => string) {
  const q = r.r || {};
  const tl = q.tl || 0, tr = q.tr || 0, br = q.br || 0, bl = q.bl || 0;
  const c = (x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) => `${X(x1)} ${Y(y1)} ${X(x2)} ${Y(y2)} ${X(x3)} ${Y(y3)} c`;
  return [
    `${X(r.x0 + tl)} ${Y(r.y0)} m`, `${X(r.x1 - tr)} ${Y(r.y0)} l`,
    tr ? c(r.x1 - tr + tr * K, r.y0, r.x1, r.y0 + tr - tr * K, r.x1, r.y0 + tr) : "",
    `${X(r.x1)} ${Y(r.y1 - br)} l`,
    br ? c(r.x1, r.y1 - br + br * K, r.x1 - br + br * K, r.y1, r.x1 - br, r.y1) : "",
    `${X(r.x0 + bl)} ${Y(r.y1)} l`,
    bl ? c(r.x0 + bl - bl * K, r.y1, r.x0, r.y1 - bl + bl * K, r.x0, r.y1 - bl) : "",
    `${X(r.x0)} ${Y(r.y0 + tl)} l`,
    tl ? c(r.x0, r.y0 + tl - tl * K, r.x0 + tl - tl * K, r.y0, r.x0 + tl, r.y0) : "",
    "h",
  ].filter(Boolean).join(" ");
}

// Looks for the on-screen dieline (downloads stay clean for production)
export type ThemeId = "printy" | "kraft" | "blueprint";
export const THEMES: Record<ThemeId, { name: string; bg: string; fill: string; cut: string; fold: string; glue: string; dim: string; label: string }> = {
  printy: { name: "Printy Clean", bg: "#ffffff", fill: "#EEF6FA", cut: "#07111F", fold: "#FF6A00", glue: "#00C2E8", dim: "#007C91", label: "#7C93A8" },
  kraft: { name: "Kraft Board", bg: "#FBF7F1", fill: "#D8B888", cut: "#4A2E14", fold: "#FFFFFF", glue: "#FFFFFF", dim: "#07111F", label: "#7A5530" },
  blueprint: { name: "Night Blueprint", bg: "#07111F", fill: "#0E2740", cut: "#FFFFFF", fold: "#FF8A3D", glue: "#00C2E8", dim: "#00C2E8", label: "#6E8CA8" },
};

// Printy logo for the footer of downloaded files: a PNG data URI for SVG and
// CMYK pixels (hex) for the PDF. Made in the browser by loadBrandLogo().
export type Brand = { dataUri: string; hex: string; pw: number; ph: number };
const SITE = "printypackaging.com";

export function dielineToSvg(dl: Dieline, title: string, opts: { preview?: boolean; unit?: Unit; dims?: boolean; labels?: boolean; brand?: Brand; theme?: ThemeId } = {}) {
  const th = THEMES[opts.theme ?? "printy"];
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
    `<rect width="100%" height="100%" fill="${th.bg}"/>`,
    opts.preview ? "" : `<text x="${m}" y="${m * 0.5 + 6}" font-size="4.5" fill="${th.cut}">${xmlEsc(title)} · Printy Packaging free dieline · solid = cut, dashed = fold · 1:1</text>`,
    `<g transform="translate(${f2(tx)} ${f2(ty)})">`,
    th.fill && dl.areas ? `<g id="board" fill="${th.fill}">${dl.areas.map((a) => `<path d="${roundRectD(a)}"/>`).join("")}</g>` : "",
    `<g id="glue">${dl.paths.filter((p) => p.kind === "glue").map((p) => `<path d="${svgD(p)}" fill="${th.glue}" fill-opacity="0.35"/>`).join("")}</g>`,
    `<g id="labels" fill="${th.label}" font-weight="700" text-anchor="middle" dominant-baseline="middle">${(opts.labels === false ? [] : dl.labels).map((l) => `<text x="${f2(l.at[0])}" y="${f2(l.at[1])}" font-size="${f2(labelSize(l))}" letter-spacing="${f2(labelSize(l) * 0.08)}">${xmlEsc(l.text)}</text>`).join("")}</g>`,
    `<g id="dieline-cut" fill="none" stroke="${th.cut}" stroke-width="${f2(sw)}" stroke-linecap="round" stroke-linejoin="round">${dl.paths.filter((p) => p.kind === "cut").map((p) => `<path d="${svgD(p)}"/>`).join("")}</g>`,
    `<g id="dieline-crease" fill="none" stroke="${th.fold}" stroke-width="${f2(sw)}" stroke-dasharray="${f2(sw * 7)} ${f2(sw * 4)}">${dl.paths.filter((p) => p.kind === "fold").map((p) => `<path d="${svgD(p)}"/>`).join("")}</g>`,
    `<g id="dimensions" stroke="${th.dim}" fill="${th.dim}" stroke-width="${f2(sw * 0.7)}">`,
    ...prims.map((p) =>
      "line" in p ? `<path d="M${f2(p.line[0][0])} ${f2(p.line[0][1])}L${f2(p.line[1][0])} ${f2(p.line[1][1])}"/>`
        : "tri" in p ? `<path stroke="none" d="M${p.tri.map((q) => `${f2(q[0])} ${f2(q[1])}`).join("L")}Z"/>`
          : `<text stroke="${th.bg}" stroke-width="${f2(p.text.size * 0.35)}" paint-order="stroke" font-size="${f2(p.text.size)}" font-weight="700" text-anchor="middle" dominant-baseline="middle" x="${f2(p.text.at[0])}" y="${f2(p.text.at[1])}"${p.text.rot ? ` transform="rotate(-90 ${f2(p.text.at[0])} ${f2(p.text.at[1])})"` : ""}>${xmlEsc(p.text.str)}</text>`),
    `</g></g>`,
    opts.preview ? "" : `<g id="printy-packaging" transform="translate(${f2(m)} ${f2(h - foot - 2)})">` +
      (opts.brand ? `<image href="${opts.brand.dataUri}" x="0" y="2" width="${f2(9 * opts.brand.pw / opts.brand.ph)}" height="9"/>` : `<text x="0" y="9" font-size="6" font-weight="700" fill="${th.cut}">Printy Packaging</text>`) +
      `<text x="${f2(opts.brand ? 9 * opts.brand.pw / opts.brand.ph + 5 : 52)}" y="6.5" font-size="3.6" font-weight="700" fill="${th.cut}">Free dieline from ${SITE}</text>` +
      `<text x="${f2(opts.brand ? 9 * opts.brand.pw / opts.brand.ph + 5 : 52)}" y="11" font-size="3" fill="${th.dim}">Custom printed boxes from 100 pcs · free design help</text></g>`,
    `</svg>`,
  ];
  return parts.join("");
}

// DXF (AutoCAD R12, millimetres) for CAD and cutting tables: cut lines on
// layer CUT, creases on CREASE, glue areas on GLUE. Curves become short lines.
export function dielineToDxf(dl: Dieline): string {
  const [, , , y1] = dl.bbox;
  const out: string[] = ["0", "SECTION", "2", "HEADER", "9", "$INSUNITS", "70", "4", "0", "ENDSEC",
    "0", "SECTION", "2", "TABLES", "0", "TABLE", "2", "LAYER", "70", "3"];
  for (const [name, color] of [["CUT", 7], ["CREASE", 1], ["GLUE", 4]] as const) out.push("0", "LAYER", "2", name, "70", "0", "62", String(color), "6", "CONTINUOUS");
  out.push("0", "ENDTAB", "0", "ENDSEC", "0", "SECTION", "2", "ENTITIES");
  const layer = { cut: "CUT", fold: "CREASE", glue: "GLUE" } as const;
  const line = (lay: string, a: Pt, b: Pt) => out.push("0", "LINE", "8", lay, "10", a[0].toFixed(3), "20", (y1 - a[1]).toFixed(3), "30", "0", "11", b[0].toFixed(3), "21", (y1 - b[1]).toFixed(3), "31", "0");
  for (const p of dl.paths) {
    let cur: Pt | null = null, start: Pt | null = null;
    for (const sg of p.segs) {
      if (sg.M) { cur = sg.M; start = sg.M; }
      else if (sg.L && cur) { line(layer[p.kind], cur, sg.L); cur = sg.L; }
      else if (sg.C && cur) {
        const [c1, c2, e] = sg.C, a = cur;
        let prev = a;
        for (let i = 1; i <= 12; i++) {
          const t = i / 12, u = 1 - t;
          const q: Pt = [u * u * u * a[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * e[0], u * u * u * a[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * e[1]];
          line(layer[p.kind], prev, q); prev = q;
        }
        cur = e;
      }
    }
    if (p.closed && cur && start && (cur[0] !== start[0] || cur[1] !== start[1])) line(layer[p.kind], cur, start);
  }
  out.push("0", "ENDSEC", "0", "EOF");
  return out.join("\r\n");
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
    // board colour on its own non-printing spot, so the file looks like the preview
    "/CSb cs 1 scn",
    ...(dl.areas || []).map((a) => roundRectOps(a, X, Y) + " f"),
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
        `1 0.2 0.3 0.2 k BT /F1 8 Tf ${tx} ${(by + lh * 0.12).toFixed(2)} Td (Custom printed boxes from 100 pcs - free design help) Tj ET`,
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
      `/CSg [/Separation /Glue /DeviceCMYK ${tint([0.15, 0, 0, 0])}] /CSb [/Separation /Board /DeviceCMYK ${tint([0.06, 0.02, 0, 0])}] >> >> /Contents 4 0 R >>`,
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

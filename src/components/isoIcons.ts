// Isometric line drawings of our box styles for the menus and the dieline
// generator: each icon is a list of SVG path strings on a 64x64 grid, built
// from simple 3D boxes, open lids and flaps so they all share one look.

type V3 = [number, number, number]; // x to the right, y up, z towards the viewer

const C = 0.866, S = 0.5;

function make(ox: number, oy: number, k: number) {
  const P = ([x, y, z]: V3) => `${(ox + (x - z) * C * k).toFixed(1)} ${(oy + (x + z) * S * k - y * k).toFixed(1)}`;
  const poly = (pts: V3[], close = true) => `M${pts.map(P).join("L")}${close ? "Z" : ""}`;
  const line = (a: V3, b: V3) => `M${P(a)}L${P(b)}`;
  // the three visible faces of a closed box
  const box = (x: number, y: number, z: number, L: number, H: number, W: number, top = true) => {
    const out = [
      poly([[x + L, y, z], [x + L, y, z + W], [x + L, y + H, z + W], [x + L, y + H, z]]),
      poly([[x, y, z + W], [x + L, y, z + W], [x + L, y + H, z + W], [x, y + H, z + W]]),
    ];
    if (top) out.push(poly([[x, y + H, z], [x + L, y + H, z], [x + L, y + H, z + W], [x, y + H, z + W]]));
    return out;
  };
  // an open box: walls only, with the far walls' top edges showing
  const openBox = (x: number, y: number, z: number, L: number, H: number, W: number) => [
    ...box(x, y, z, L, H, W, false),
    poly([[x, y + H, z + W], [x, y + H, z], [x + L, y + H, z], [x + L, y + H, z + W]], false),
  ];
  // a flap hinged on an edge from a to b, tipped by angle (radians from flat) towards dir
  const flap = (a: V3, b: V3, depth: number, dir: V3, ang: number) => {
    const d: V3 = [dir[0] * Math.cos(ang) * depth, Math.sin(ang) * depth, dir[2] * Math.cos(ang) * depth];
    return poly([a, b, [b[0] + d[0], b[1] + d[1], b[2] + d[2]], [a[0] + d[0], a[1] + d[1], a[2] + d[2]]]);
  };
  return { P, poly, line, box, openBox, flap };
}

const rad = (deg: number) => (deg * Math.PI) / 180;

// tall carton with the lid open backwards, tuck on the lid and a dust flap up
function tuckCarton(reverse: boolean) {
  const g = make(32, 30, 1);
  const L = 16, W = 12, H = 28;
  const lidEnd: V3 = [0, H + Math.sin(rad(105)) * W, Math.cos(rad(105)) * W];
  return [
    ...g.box(0, -14, 0, L, H, W, false),
    g.poly([[0, H - 14, W], [0, H - 14, 0], [L, H - 14, 0], [L, H - 14, W]], false),
    // lid hinged on the back edge
    g.poly([[0, H - 14, 0], [L, H - 14, 0], [L, lidEnd[1] - 14, lidEnd[2]], [0, lidEnd[1] - 14, lidEnd[2]]]),
    // tuck on the lid
    g.poly([[1, lidEnd[1] - 14, lidEnd[2]], [L - 1, lidEnd[1] - 14, lidEnd[2]], [L - 2, lidEnd[1] - 14 + 1.5, lidEnd[2] + (reverse ? 4.5 : -4.5)], [2, lidEnd[1] - 14 + 1.5, lidEnd[2] + (reverse ? 4.5 : -4.5)]]),
    // dust flap standing on the right wall
    g.poly([[L, H - 14, 1.5], [L, H - 14 + 6, 3], [L, H - 14 + 6, W - 3], [L, H - 14, W - 1.5]]),
  ];
}

function shippingBox() {
  const g = make(32, 34, 1);
  const L = 24, W = 18, H = 16;
  return [
    ...g.openBox(0, -6, 0, L, H, W),
    g.flap([0, H - 6, W], [L, H - 6, W], 8, [0, 0, 1], rad(55)),
    g.flap([L, H - 6, 0], [L, H - 6, W], 6, [1, 0, 0], rad(70)),
    g.flap([0, H - 6, 0], [L, H - 6, 0], 8, [0, 0, -1], rad(70)),
  ];
}

function mailer() {
  const g = make(31, 38, 1);
  const L = 28, W = 22, H = 8;
  const a = rad(112);
  const end: V3 = [0, H + Math.sin(a) * W, Math.cos(a) * W];
  return [
    ...g.openBox(0, -4, 0, L, H, W),
    g.poly([[0, H - 4, 0], [L, H - 4, 0], [L, end[1] - 4, end[2]], [0, end[1] - 4, end[2]]]),
    // front tuck flap on the lid
    g.poly([[0, end[1] - 4, end[2]], [L, end[1] - 4, end[2]], [L - 1.5, end[1] - 4 - 3.5, end[2] + 1.5], [1.5, end[1] - 4 - 3.5, end[2] + 1.5]]),
  ];
}

function rigid() {
  // base with a full-depth lid sitting on it
  const g = make(32, 38, 1);
  return [...g.box(1, -8, 1, 24, 9, 18, false), ...g.box(0, 1, 0, 26, 6, 20)];
}

function twoPiece() {
  const g = make(32, 40, 1);
  return [...g.openBox(1, -8, 1, 24, 10, 18), ...g.box(0, 9, 0, 26, 5, 20)];
}

function magnetic() {
  const g = make(30, 38, 1);
  const L = 26, W = 20, H = 9;
  const a = rad(100);
  return [
    ...g.box(0, -6, 0, L, H, W),
    // book-style cover: back spine up, then the front flap hanging open
    g.poly([[0, H - 6, 0], [L, H - 6, 0], [L, H - 6 + 14, Math.cos(a) * 14], [0, H - 6 + 14, Math.cos(a) * 14]]),
    g.line([L * 0.5 - 3, 0, W], [L * 0.5 + 3, 0, W]),
  ];
}

function drawer() {
  const g = make(30, 34, 1);
  const L = 26, W = 18, H = 9;
  return [...g.box(0, -4, 0, L, H, W), ...g.openBox(L - 2, -4.5, 3, 12, H - 1, W - 6), g.line([L + 10, 0, W / 2], [L + 10, 2, W / 2])].slice(0);
}

function sleeve() {
  const g = make(32, 36, 1);
  const L = 26, W = 18, H = 10;
  return [
    ...g.box(0, -5, 0, L, H, W),
    // band around the middle
    g.poly([[L * 0.32, -5, W], [L * 0.62, -5, W], [L * 0.62, H - 5, W], [L * 0.32, H - 5, W]]),
    g.poly([[L * 0.32, H - 5, 0], [L * 0.62, H - 5, 0], [L * 0.62, H - 5, W], [L * 0.32, H - 5, W]]),
  ];
}

function windowBox() {
  const g = make(32, 34, 1);
  const L = 22, W = 14, H = 22;
  return [
    ...g.box(0, -10, 0, L, H, W),
    g.poly([[4, -3, W], [L - 4, -3, W], [L - 4, H - 14, W], [4, H - 14, W]]),
  ];
}

function gable() {
  const g = make(32, 40, 1);
  const L = 18, W = 14, H = 18;
  const top = H - 10;
  return [
    ...g.box(0, -10, 0, L, H, W, false),
    // two sloping roofs meeting at the ridge, with a handle
    g.poly([[0, top, W], [L, top, W], [L, top + 8, W / 2], [0, top + 8, W / 2]]),
    g.poly([[L, top, 0], [L, top, W], [L, top + 8, W / 2]]),
    g.poly([[0, top + 8, W / 2], [L, top + 8, W / 2], [L, top + 15, W / 2], [0, top + 15, W / 2]]),
    g.poly([[5, top + 10.5, W / 2], [L - 5, top + 10.5, W / 2], [L - 5, top + 13, W / 2], [5, top + 13, W / 2]]),
  ];
}

function display() {
  const g = make(32, 40, 1);
  const L = 26, W = 16, H = 6;
  return [
    ...g.openBox(0, -6, 0, L, H, W),
    // tall printed header at the back
    g.poly([[0, 0, 0], [L, 0, 0], [L, 18, 0], [0, 18, 0]]),
    g.line([4, 12, 0], [L - 4, 12, 0]),
  ];
}

function hangTab() {
  const g = make(32, 38, 1);
  const L = 18, W = 10, H = 20;
  const top = H - 12;
  return [
    ...g.box(0, -12, 0, L, H, W),
    // header rising from the back edge, with the sombrero hole
    g.poly([[0, top, 0], [L, top, 0], [L, top + 11, 0], [0, top + 11, 0]]),
    g.poly([[L / 2 - 4, top + 6, 0], [L / 2 - 1.5, top + 6, 0], [L / 2 - 1, top + 8, 0], [L / 2 + 1, top + 8, 0], [L / 2 + 1.5, top + 6, 0], [L / 2 + 4, top + 6, 0]], false),
  ];
}

function plainBox(taped: boolean) {
  const g = make(32, 34, 1);
  const L = 24, W = 18, H = 16;
  const out = g.box(0, -8, 0, L, H, W);
  if (taped) out.push(g.line([0, H - 8, W / 2], [L, H - 8, W / 2]), g.line([L, H - 8, W / 2], [L, H - 13, W / 2]));
  return out;
}

function pizza() {
  const g = make(32, 36, 1);
  const L = 26, W = 26, H = 4;
  return [...g.box(0, -2, -4, L, H, W), g.line([3, H - 2, W - 4], [L - 3, H - 2, W - 4])];
}

function lockBottom() {
  // closed carton with its crash-lock base drawn underneath, exploded view
  const g = make(32, 26, 1);
  const L = 16, W = 12, H = 22;
  return [
    ...g.box(0, 0, 0, L, H, W),
    g.line([0, H, W - 3], [L, H, W - 3]),
    g.poly([[0, -9, 0], [L, -9, 0], [L, -9, W], [0, -9, W]]),
    g.line([0, -9, 0], [L, -9, W]),
    g.line([L, -9, 0], [0, -9, W]),
  ];
}

// flip left to right, so two related icons do not look the same
function mirror(paths: string[]): string[] {
  return paths.map((d) => {
    let i = 0;
    return d.replace(/-?\d+(?:\.\d+)?/g, (n) => (i++ % 2 === 0 ? (64 - Number(n)).toFixed(1) : n));
  });
}

// closed mailer: lid shut with the front tuck line; optional ribbon or tape on the lid
function mailerClosed(mark: "none" | "ribbon" | "tape") {
  const g = make(31, 36, 1);
  const L = 28, W = 22, H = 9;
  const out = [...g.box(0, -4, 0, L, H, W), g.line([0, H - 6, W], [L, H - 6, W])];
  if (mark === "ribbon") out.push(g.line([L / 2, H - 4, 0], [L / 2, H - 4, W]), g.line([0, H - 4, W / 2], [L, H - 4, W / 2]), g.line([L / 2, H - 4, W], [L / 2, -4, W]));
  if (mark === "tape") out.push(g.line([L / 2 - 2, H - 4, 0], [L / 2 - 2, H - 4, W]), g.line([L / 2 + 2, H - 4, 0], [L / 2 + 2, H - 4, W]));
  return out;
}

// closed carton with the tuck line across the top
function cartonClosed() {
  const g = make(32, 32, 1);
  const L = 16, W = 12, H = 28;
  return [...g.box(0, -14, 0, L, H, W), g.line([0, H - 14, W - 3], [L, H - 14, W - 3])];
}

// lid on a base with a ribbon and bow
function giftBox() {
  const g = make(32, 40, 1);
  const L = 24, W = 18;
  return [
    ...g.box(1, -8, 1, L - 2, 10, W - 2, false), ...g.box(0, 2, 0, L, 5, W),
    g.line([L / 2, 7, 0], [L / 2, 7, W]), g.line([0, 7, W / 2], [L, 7, W / 2]),
    g.line([L / 2, 7, W], [L / 2, -8, W]),
    `M${g.P([L / 2, 7, W / 2])}C${g.P([L / 2 - 6, 13, W / 2 - 2])} ${g.P([L / 2 - 7, 9, W / 2 + 4])} ${g.P([L / 2, 7, W / 2])}`,
    `M${g.P([L / 2, 7, W / 2])}C${g.P([L / 2 + 6, 13, W / 2 + 2])} ${g.P([L / 2 + 7, 9, W / 2 - 4])} ${g.P([L / 2, 7, W / 2])}`,
  ];
}

function pillow() {
  return [
    "M10 22C20 14 44 14 54 22L54 42C44 50 20 50 10 42Z",
    "M10 22C16 28 16 36 10 42",
    "M54 22C48 28 48 36 54 42",
    "M18 23C28 19 36 19 46 23",
  ];
}

// scale and centre every icon inside the 64x64 grid with a 5 unit margin,
// so no lid or flap is cut off at the edge
function fit(paths: string[]): string[] {
  const nums = paths.flatMap((d) => (d.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number));
  const xs = nums.filter((_, i) => i % 2 === 0), ys = nums.filter((_, i) => i % 2 === 1);
  const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
  const k = Math.min(54 / (x1 - x0), 54 / (y1 - y0), 1.25);
  const dx = 32 - ((x0 + x1) / 2) * k, dy = 32 - ((y0 + y1) / 2) * k;
  return paths.map((d) => {
    let i = 0;
    return d.replace(/-?\d+(?:\.\d+)?/g, (n) => (i++ % 2 === 0 ? Number(n) * k + dx : Number(n) * k + dy).toFixed(1));
  });
}

// ---------- print products: sheets, cards and stationery in the same 3D view ----------
// flat items lie on the table (x-z plane at height y); standing ones sit in the x-y plane.
const pr = () => make(32, 32, 1);
type G = ReturnType<typeof make>;
const sheet = (g: G, x: number, z: number, L: number, W: number, y = 0) => g.poly([[x, y, z], [x + L, y, z], [x + L, y, z + W], [x, y, z + W]]);
const stand = (g: G, x: number, y: number, L: number, H: number, z = 0) => g.poly([[x, y, z], [x + L, y, z], [x + L, y + H, z], [x, y + H, z]]);
// text lines across a flat sheet
const flatLines = (g: G, x: number, z0: number, len: number, n: number, gap: number, y = 0) =>
  Array.from({ length: n }, (_, i) => g.line([x, y, z0 + i * gap], [x + len * (i === n - 1 ? 0.6 : 1), y, z0 + i * gap]));
// text lines on a standing sheet
const upLines = (g: G, x: number, y0: number, len: number, n: number, gap: number, z = 0) =>
  Array.from({ length: n }, (_, i) => g.line([x, y0 - i * gap, z], [x + len * (i === n - 1 ? 0.6 : 1), y0 - i * gap, z]));
const ringXZ = (g: G, cx: number, y: number, cz: number, r: number, n = 24) =>
  g.poly(Array.from({ length: n }, (_, i): V3 => [cx + r * Math.cos((i / n) * 2 * Math.PI), y, cz + r * Math.sin((i / n) * 2 * Math.PI)]));
const ringXY = (g: G, cx: number, cy: number, z: number, r: number, n = 20) =>
  g.poly(Array.from({ length: n }, (_, i): V3 => [cx + r * Math.cos((i / n) * 2 * Math.PI), cy + r * Math.sin((i / n) * 2 * Math.PI), z]));

function labels() {
  const g = pr();
  return [sheet(g, 0, 0, 26, 20), ringXZ(g, 7, 0, 6, 4), ringXZ(g, 19, 0, 6, 4), ringXZ(g, 7, 0, 14.5, 4), g.poly([[15.5, 0, 11], [22.5, 0, 11], [22.5, 0, 18], [15.5, 0, 18]])];
}
function paperBag() {
  const g = pr();
  const L = 18, W = 10, H = 22;
  return [
    ...g.openBox(0, 0, 0, L, H, W),
    // rope handle on the front
    `M${g.P([5, H, W])}C${g.P([5, H + 10, W])} ${g.P([L - 5, H + 10, W])} ${g.P([L - 5, H, W])}`,
    g.line([L, H, W / 2], [L, H - 4, W / 2]),
  ];
}
function envelope() {
  const g = pr();
  const L = 28, W = 18;
  return [sheet(g, 0, 0, L, W), g.poly([[0, 0, 0], [L / 2, 0, W * 0.55], [L, 0, 0]], false), g.line([0, 0, W], [L * 0.38, 0, W * 0.45]), g.line([L, 0, W], [L * 0.62, 0, W * 0.45])];
}
function flyers() {
  const g = pr();
  return [sheet(g, 3, -3, 18, 24, -1.5), sheet(g, 0, 0, 18, 24), g.poly([[3, 0, 3], [15, 0, 3], [15, 0, 10], [3, 0, 10]]), ...flatLines(g, 3, 14, 12, 3, 3)];
}
function postcard() {
  const g = pr();
  return [sheet(g, 0, 0, 28, 18), g.line([14, 0, 3], [14, 0, 15]), g.poly([[20, 0, 3], [25, 0, 3], [25, 0, 8], [20, 0, 8]]), ...flatLines(g, 16.5, 11, 8.5, 2, 3), ...flatLines(g, 3, 5, 8, 3, 3)];
}
function clings() {
  const g = pr();
  return [stand(g, 0, 0, 22, 26), stand(g, 2, 2, 18, 22), ringXY(g, 11, 13, 0, 5), g.line([8.5, 13, 0], [13.5, 13, 0])];
}
function invitation() {
  const g = pr();
  const L = 26, W = 16;
  return [
    stand(g, 4, 0, 18, 18, 5),
    g.line([7, 13, 5], [19, 13, 5]), g.line([7, 10, 5], [16, 10, 5]),
    sheet(g, 0, 0, L, W), g.poly([[0, 0, 0], [L / 2, 0, W * 0.5], [L, 0, 0]], false),
  ];
}
function bookmark() {
  const g = pr();
  return [g.poly([[0, 0, 0], [4, 4, 0], [8, 0, 0], [8, 30, 0], [0, 30, 0]]), ringXY(g, 4, 25, 0, 1.6), g.line([2, 19, 0], [6, 19, 0]), g.line([2, 16, 0], [6, 16, 0])];
}
function thankYou() {
  const g = pr();
  // folded card standing like a tent, small heart on the front
  return [
    g.poly([[0, 0, 0], [24, 0, 0], [24, 16, 6], [0, 16, 6]]),
    g.poly([[24, 16, 6], [24, 0, 12], [24, 0, 0]], false),
    `M${g.P([12, 5, 1.9])}C${g.P([7, 9, 3.4])} ${g.P([9, 12.5, 4.7])} ${g.P([12, 10, 3.8])}C${g.P([15, 12.5, 4.7])} ${g.P([17, 9, 3.4])} ${g.P([12, 5, 1.9])}`,
  ];
}
function folder() {
  const g = pr();
  // open folder: back cover flat, front cover lifted, a pocket and a sheet
  return [sheet(g, 0, 0, 22, 26), sheet(g, 2, 3, 17, 21, 0.8), g.poly([[0, 0, 26], [22, 0, 26], [22, 10, 33], [0, 10, 33]]), g.poly([[0, 0, 26], [22, 0, 26], [22, 0, 18], [0, 0, 22]], false)];
}
function brochure() {
  const g = pr();
  // tri-fold standing in a zigzag
  const a: V3 = [0, 0, 0], b: V3 = [10, 0, 6], c: V3 = [20, 0, 0], d: V3 = [30, 0, 6], h = 24;
  const up = (p: V3): V3 => [p[0], h, p[2]];
  return [g.poly([a, b, up(b), up(a)]), g.poly([b, c, up(c), up(b)]), g.poly([c, d, up(d), up(c)]), g.line([2, 18, 1.2], [8, 18, 4.8]), g.line([12, 18, 4.8], [18, 18, 1.2]), g.line([22, 18, 1.2], [28, 18, 4.8])];
}
function poster() {
  const g = pr();
  return [stand(g, 0, 0, 22, 30), g.poly([[3, 6, 0], [9, 14, 0], [13, 10, 0], [19, 18, 0], [19, 6, 0]]), ringXY(g, 7, 22, 0, 2.5), g.line([3, 3, 0], [19, 3, 0])];
}
function menu() {
  const g = pr();
  // open bi-fold menu standing
  const h = 26;
  return [g.poly([[0, 0, 7], [13, 0, 0], [13, h, 0], [0, h, 7]]), g.poly([[13, 0, 0], [26, 0, 7], [26, h, 7], [13, h, 0]]),
    g.line([3, 20, 5.4], [10, 20, 1.6]), g.line([3, 16, 5.4], [10, 16, 1.6]), g.line([3, 12, 5.4], [10, 12, 1.6]),
    g.line([16, 20, 1.6], [23, 20, 5.4]), g.line([16, 16, 1.6], [23, 16, 5.4]), g.line([16, 12, 1.6], [23, 12, 5.4])];
}
function greeting() {
  const g = pr();
  // card opened like a book, standing; a star on the front
  const h = 24;
  const star = Array.from({ length: 10 }, (_, i): V3 => { const r = i % 2 ? 2 : 4.5, t = -Math.PI / 2 + (i * Math.PI) / 5; return [19 + r * Math.cos(t) * 0.8, 13 - r * Math.sin(t), 2.6 + r * Math.cos(t) * 0.25]; });
  return [g.poly([[0, 0, 9], [12, 0, 0], [12, h, 0], [0, h, 9]]), g.poly([[12, 0, 0], [26, 0, 5], [26, h, 5], [12, h, 0]]), g.poly(star)];
}
function hangTag() {
  const g = pr();
  return [g.poly([[6, 0, 0], [26, 0, 0], [26, 0, 14], [6, 0, 14], [0, 0, 7]]), ringXZ(g, 5, 0, 7, 1.6), `M${g.P([3.4, 0, 7])}C${g.P([-4, 4, 2])} ${g.P([-6, 6, 12])} ${g.P([-10, 2, 9])}`, ...flatLines(g, 10, 4, 12, 3, 3)];
}
function businessCards() {
  const g = pr();
  return [sheet(g, 0, 0, 22, 13, 0), sheet(g, 0, 0, 22, 13, 1.2), sheet(g, 3, 6, 22, 13, 3.4), g.poly([[6, 3.4, 9], [10, 3.4, 9], [10, 3.4, 13], [6, 3.4, 13]]), ...flatLines(g, 12, 9, 10, 3, 2.2, 3.4)];
}
function notePad() {
  const g = pr();
  const out = [...g.box(0, 0, 0, 20, 4, 26), ...flatLines(g, 3, 8, 14, 5, 3.2, 4)];
  for (let i = 0; i < 6; i++) out.push(ringXY(g, 2.5 + i * 3, 5, 0, 1.2, 10));
  return out;
}
function catalog() {
  const g = pr();
  return [...g.box(0, 0, 0, 20, 3, 26), g.line([1.2, 3, 0], [1.2, 3, 26]), g.poly([[4, 3, 3], [17, 3, 3], [17, 3, 13], [4, 3, 13]]), ...flatLines(g, 4, 17, 13, 2, 3, 3)];
}
function banner() {
  const g = pr();
  // roll-up banner on its base
  return [...g.box(-2, 0, -2, 20, 3, 5), stand(g, 0, 3, 16, 34, 0.5), g.poly([[3, 30, 0.5], [13, 30, 0.5], [13, 22, 0.5], [3, 22, 0.5]]), ...upLines(g, 3, 17, 10, 3, 3.5, 0.5)];
}
function tableTent() {
  const g = pr();
  return [g.poly([[0, 0, 0], [26, 0, 0], [26, 20, 5], [0, 20, 5]]), g.line([26, 0, 10], [26, 20, 5]), g.line([4, 13, 3.25], [22, 13, 3.25]), g.line([4, 9, 2.25], [15, 9, 2.25])];
}
function ticket() {
  const g = pr();
  const L = 30, W = 13;
  return [
    g.poly([[0, 0, 0], [L, 0, 0], [L, 0, W * 0.38], [L - 2, 0, W / 2], [L, 0, W * 0.62], [L, 0, W], [0, 0, W], [0, 0, W * 0.62], [2, 0, W / 2], [0, 0, W * 0.38]]),
    ...Array.from({ length: 5 }, (_, i) => g.line([21, 0, 1 + i * 2.4], [21, 0, 2.2 + i * 2.4])),
    ...flatLines(g, 5, 4, 12, 3, 2.5),
  ];
}
function butterPaper() {
  const g = pr();
  const out = [sheet(g, 0, 0, 26, 26)];
  for (let i = 1; i < 4; i++) out.push(g.line([i * 6.5, 0, 0], [i * 6.5, 0, 26]), g.line([0, 0, i * 6.5], [26, 0, i * 6.5]));
  return out;
}
function letterhead() {
  const g = pr();
  return [sheet(g, 3, -3, 20, 28, -1.2), sheet(g, 0, 0, 20, 28), g.poly([[3, 0, 3], [8, 0, 3], [8, 0, 7], [3, 0, 7]]), g.line([11, 0, 4], [17, 0, 4]), ...flatLines(g, 3, 12, 14, 4, 3)];
}
function carbonless() {
  const g = pr();
  return [sheet(g, 4, -4, 20, 26, -2.4), sheet(g, 2, -2, 20, 26, -1.2), sheet(g, 0, 0, 20, 26), ...flatLines(g, 3, 4, 14, 2, 3), g.poly([[3, 0, 11], [17, 0, 11], [17, 0, 21], [3, 0, 21]]), g.line([3, 0, 16], [17, 0, 16]), g.line([10, 0, 11], [10, 0, 21])];
}
function booklet() {
  const g = pr();
  // open booklet: two pages rising from the spine
  const L = 14, W = 22;
  return [g.poly([[0, 0, 0], [L, 3, 0], [L, 3, W], [0, 0, W]]), g.poly([[L, 3, 0], [2 * L, 0, 0], [2 * L, 0, W], [L, 3, W]]),
    g.line([3, 0.6, 5], [11, 2.4, 5]), g.line([3, 0.6, 9], [11, 2.4, 9]), g.line([3, 0.6, 13], [11, 2.4, 13]),
    g.line([17, 2.4, 5], [25, 0.6, 5]), g.line([17, 2.4, 9], [25, 0.6, 9]), g.line([17, 2.4, 13], [25, 0.6, 13])];
}
function doorHanger() {
  const g = pr();
  return [stand(g, 0, 0, 12, 32), ringXY(g, 6, 26, 0, 3.2), g.line([6, 22.8, 0], [10, 20, 0]), ...upLines(g, 2, 15, 8, 3, 3)];
}
function coasters() {
  const g = pr();
  return [ringXZ(g, 10, 0, 10, 10), ringXZ(g, 10, 1.4, 10, 10), ringXZ(g, 10, 1.4, 10, 6.5), ringXZ(g, 26, 0, 4, 7)];
}
function calendar() {
  const g = pr();
  // desk calendar: tent stand with rings and a date grid
  const out = [g.poly([[0, 0, 0], [26, 0, 0], [26, 22, 5], [0, 22, 5]]), g.line([26, 0, 10], [26, 22, 5])];
  for (let i = 0; i < 4; i++) out.push(ringXY(g, 5 + i * 5.3, 22.5, 5, 1.3, 10));
  for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) { const y = 15 - r * 4.5, z = (y * 5) / 22; out.push(g.line([4 + c * 5.3, y, z], [6.5 + c * 5.3, y, z])); }
  return out;
}

const raw: Record<string, string[]> = {
  "labels-stickers": labels(),
  "paper-bags": paperBag(),
  envelopes: envelope(),
  flyers: flyers(),
  postcards: postcard(),
  "clings-decals": clings(),
  "invitation-cards": invitation(),
  bookmarks: bookmark(),
  "thank-you-cards": thankYou(),
  "presentation-folders": folder(),
  brochures: brochure(),
  posters: poster(),
  menus: menu(),
  "greeting-cards": greeting(),
  "hang-tags": hangTag(),
  "business-cards": businessCards(),
  "note-pads": notePad(),
  "catalogs-magazines": catalog(),
  banners: banner(),
  "table-tents": tableTent(),
  tickets: ticket(),
  "butter-paper": butterPaper(),
  letterheads: letterhead(),
  "carbonless-forms": carbonless(),
  booklets: booklet(),
  "door-hangers": doorHanger(),
  "paper-coasters": coasters(),
  calendars: calendar(),
  "tuck-end-boxes": tuckCarton(true),
  "reverse-tuck-end": tuckCarton(true),
  "straight-tuck-end": tuckCarton(false),
  "auto-bottom": lockBottom(),
  "folding-cartons": cartonClosed(),
  "shipping-boxes": shippingBox(),
  "mailer-boxes": mailer(),
  "kraft-mailer-boxes": mirror(mailer()),
  "white-mailer-boxes": mailerClosed("none"),
  "black-mailer-boxes": mirror(mailerClosed("tape")),
  "subscription-boxes": mailerClosed("ribbon"),
  "ecommerce-packaging": mirror(shippingBox()),
  "rigid-boxes": rigid(),
  "two-piece-rigid-boxes": twoPiece(),
  "magnetic-boxes": magnetic(),
  "drawer-boxes": drawer(),
  "sleeve-boxes": sleeve(),
  "window-boxes": windowBox(),
  "gable-boxes": gable(),
  "display-boxes": display(),
  "hang-tab-boxes": hangTab(),
  "kraft-boxes": mirror(plainBox(true)),
  "gift-boxes": giftBox(),
  "pizza-boxes": pizza(),
  "pillow-boxes": pillow(),
};

export const isoIcons: Record<string, string[]> = Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, fit(v)]));

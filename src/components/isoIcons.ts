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

function pillow() {
  return [
    "M10 22C20 14 44 14 54 22L54 42C44 50 20 50 10 42Z",
    "M10 22C16 28 16 36 10 42",
    "M54 22C48 28 48 36 54 42",
    "M18 23C28 19 36 19 46 23",
  ];
}

export const isoIcons: Record<string, string[]> = {
  "tuck-end-boxes": tuckCarton(true),
  "reverse-tuck-end": tuckCarton(true),
  "straight-tuck-end": tuckCarton(false),
  "auto-bottom": lockBottom(),
  "folding-cartons": tuckCarton(false),
  "shipping-boxes": shippingBox(),
  "mailer-boxes": mailer(),
  "kraft-mailer-boxes": mailer(),
  "white-mailer-boxes": mailer(),
  "black-mailer-boxes": mailer(),
  "subscription-boxes": mailer(),
  "ecommerce-packaging": shippingBox(),
  "rigid-boxes": rigid(),
  "two-piece-rigid-boxes": twoPiece(),
  "magnetic-boxes": magnetic(),
  "drawer-boxes": drawer(),
  "sleeve-boxes": sleeve(),
  "window-boxes": windowBox(),
  "gable-boxes": gable(),
  "display-boxes": display(),
  "hang-tab-boxes": hangTab(),
  "kraft-boxes": plainBox(true),
  "gift-boxes": twoPiece(),
  "pizza-boxes": pizza(),
  "pillow-boxes": pillow(),
};

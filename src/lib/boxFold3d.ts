// 3D fold-up of a tuck-end carton, like a packaging CAD fold preview: the flat
// sheet (glue flap, four walls, lids, tucks, dust flaps) laid out as on our
// dieline, folding on its creases into the finished box, and the lid opening
// and closing. Every panel hangs on its crease, so each fold is one rotation.
// Units are millimetres. Client-only (uses canvas and WebGL).

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export type Board = "bleach" | "kraft";
export type Finish = "matte" | "gloss";
export type Base = "reverse" | "straight" | "crash";
export type BoxLook = {
  board: Board;
  finish: Finish;
  printColor: string | null; // null = plain board
  logo: ImageBitmap | HTMLImageElement | null;
  logoSize: number; // 0.2 - 0.9 of the panel width
  printAll: boolean; // logo on all four walls + lid
  base: Base; // how the bottom closes
};
export type BoxDims = { L: number; W: number; H: number; t: number };

const IN = 25.4;
// same flap rules as the dieline (src/lib/dielineGeometry.ts, tuckEnd)
const flapSize = (L: number, W: number) => (W >= 4 * IN ? 0.75 * IN : L > 4 * IN ? 0.625 * IN : L <= 1.5 * IN ? 0.375 * IN : 0.5 * IN);
const tuckR = (w: number, tuck: number) => (w <= 41 ? Math.min(tuck, (w - 1.01) / 2) : Math.min(8, tuck * 0.6));
const ease = (f: number, a: number, b: number) => { const x = Math.min(1, Math.max(0, (f - a) / (b - a))); return x * x * (3 - 2 * x); };
const rand = (() => { let s = 7; return () => ((s = (s * 16807) % 2147483647) / 2147483647); })();

// ---------- board textures ----------
function boardCanvas(w: number, h: number, board: Board) {
  const k = Math.min(1, 1024 / Math.max(w, h));
  const c = document.createElement("canvas");
  c.width = Math.max(8, Math.round(w * k * 2));
  c.height = Math.max(8, Math.round(h * k * 2));
  const g = c.getContext("2d")!;
  if (board === "kraft") {
    g.fillStyle = "#B88A55";
    g.fillRect(0, 0, c.width, c.height);
    const n = Math.round((c.width * c.height) / 90);
    for (let i = 0; i < n; i++) {
      const x = rand() * c.width, y = rand() * c.height, len = 2 + rand() * 9, a = rand() * Math.PI;
      g.strokeStyle = rand() > 0.5 ? "rgba(90,58,28,0.16)" : "rgba(235,205,160,0.16)";
      g.lineWidth = 0.6 + rand() * 0.8;
      g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a) * len, y + Math.sin(a) * len); g.stroke();
    }
  } else {
    g.fillStyle = "#FAFAF8";
    g.fillRect(0, 0, c.width, c.height);
    const n = Math.round((c.width * c.height) / 40);
    for (let i = 0; i < n; i++) {
      g.fillStyle = rand() > 0.5 ? "rgba(0,0,0,0.025)" : "rgba(255,255,255,0.5)";
      g.fillRect(rand() * c.width, rand() * c.height, 1.2, 1.2);
    }
  }
  return c;
}

function printedTexture(w: number, h: number, look: BoxLook, withLogo: boolean) {
  const c = boardCanvas(w, h, look.board);
  const g = c.getContext("2d")!;
  if (look.printColor) {
    g.globalAlpha = look.board === "kraft" ? 0.88 : 0.97; // a hint of the board shows through, like real ink
    g.fillStyle = look.printColor;
    g.fillRect(0, 0, c.width, c.height);
    g.globalAlpha = 1;
  }
  if (withLogo && look.logo) {
    const lw = c.width * look.logoSize;
    const ratio = (look.logo.height || 1) / (look.logo.width || 1);
    const lh = Math.min(lw * ratio, c.height * 0.8);
    const lw2 = lh / ratio;
    g.drawImage(look.logo, (c.width - lw2) / 2, (c.height - lh) / 2, lw2, lh);
  }
  // a faint darkening along the edges, as printed board shows at its creases
  const e = Math.max(3, Math.min(c.width, c.height) * 0.03);
  const edge = (x0: number, y0: number, x1: number, y1: number, rx: number, ry: number, rw: number, rh: number) => {
    const gr = g.createLinearGradient(x0, y0, x1, y1);
    gr.addColorStop(0, "rgba(0,0,0,0.09)");
    gr.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = gr;
    g.fillRect(rx, ry, rw, rh);
  };
  edge(0, 0, e, 0, 0, 0, e, c.height); edge(c.width, 0, c.width - e, 0, c.width - e, 0, e, c.height);
  edge(0, 0, 0, e, 0, 0, c.width, e); edge(0, c.height, 0, c.height - e, 0, c.height - e, c.width, e);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

// ---------- panel outlines (x along the crease, y away from it) ----------
type P = [number, number];
const rect = (x0: number, y0: number, x1: number, y1: number): P[] => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
// flap with rounded corners at the free edge (y = d)
function rounded(x0: number, x1: number, d: number, r: number): THREE.Shape {
  const s = new THREE.Shape();
  r = Math.max(0, Math.min(r, (x1 - x0) / 2, d));
  s.moveTo(x0, 0); s.lineTo(x1, 0); s.lineTo(x1, d - r);
  s.quadraticCurveTo(x1, d, x1 - r, d); s.lineTo(x0 + r, d);
  s.quadraticCurveTo(x0, d, x0, d - r); s.lineTo(x0, 0);
  return s;
}
const poly = (pts: P[]) => new THREE.Shape(pts.map(([x, y]) => new THREE.Vector2(x, y)));

// ---------- scene ----------
export class BoxFoldScene {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(30, 1, 1, 100000);
  private controls: OrbitControls;
  private pivot = new THREE.Group();
  private sheet = new THREE.Group();
  private ground: THREE.Mesh;
  private key: THREE.DirectionalLight;
  private disposables: { dispose: () => void }[] = [];
  private raf = 0;
  private ro: ResizeObserver;
  private fold = 0; // 0 flat sheet ... 1 closed box
  private goal = 0;
  private dims: BoxDims = { L: 100, W: 60, H: 100, t: 0.5 };
  private flat = { cx: 0, cy: 0, w: 1, h: 1 };
  private pose: (f: number) => void = () => undefined;
  private steer = true; // the camera follows the fold until the visitor drags
  spin = false;
  private heldUntil = 0;

  constructor(private host: HTMLElement) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.NeutralToneMapping;
    host.appendChild(this.renderer.domElement);
    Object.assign(this.renderer.domElement.style, { display: "block", width: "100%", height: "100%" });

    // studio reflections, so faces read as board and gloss looks like gloss
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    const room = new RoomEnvironment();
    this.scene.environment = pmrem.fromScene(room, 0.04).texture;
    this.scene.environmentIntensity = 0.55;
    room.dispose();
    pmrem.dispose();
    this.scene.add(new THREE.HemisphereLight(0xffffff, 0xb9c4cf, 0.7));
    this.key = new THREE.DirectionalLight(0xfff8ef, 2.4);
    this.key.castShadow = true;
    this.key.shadow.mapSize.set(2048, 2048);
    this.key.shadow.radius = 6;
    this.scene.add(this.key, this.key.target);
    const fill = new THREE.DirectionalLight(0xdfefff, 0.5);
    fill.position.set(-1, 0.6, 0.8);
    this.scene.add(fill);
    // soft light on the inside (unprinted) face, seen first while it folds
    const back = new THREE.DirectionalLight(0xffffff, 1.3);
    back.position.set(0.3, 0.8, -1);
    this.scene.add(back);

    this.ground = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.ShadowMaterial({ opacity: 0.22, depthWrite: false }));
    this.ground.rotation.x = -Math.PI / 2;
    this.ground.receiveShadow = true;
    this.pivot.add(this.sheet);
    this.scene.add(this.ground, this.pivot);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.enablePan = false;
    // the turntable pauses while the visitor drags, and carries on 2 s after
    this.controls.addEventListener("start", () => { this.steer = false; this.heldUntil = Infinity; });
    this.controls.addEventListener("end", () => { this.heldUntil = performance.now() + 2000; });

    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(host);
    this.resize();
    let last = performance.now();
    const loop = (now: number) => {
      this.raf = requestAnimationFrame(loop);
      const dt = Math.min(1, (now - last) / 1000);
      last = now;
      const moving = this.fold !== this.goal;
      if (moving) {
        // about 6.5 s for the whole fold, slow enough to follow every flap
        const step = dt / 6.5;
        this.fold = Math.abs(this.goal - this.fold) <= step ? this.goal : this.fold + Math.sign(this.goal - this.fold) * step;
        this.pose(this.fold);
        this.place();
        const r = this.pivot.rotation.y % (Math.PI * 2);
        this.pivot.rotation.y = (r > Math.PI ? r - Math.PI * 2 : r < -Math.PI ? r + Math.PI * 2 : r) * Math.max(0, 1 - dt * 4);
      }
      // 360° turntable once the walls are up (a full turn in about 14 s)
      if (this.spin && !moving && this.fold >= 0.3 && now > this.heldUntil) this.pivot.rotation.y += dt * 0.45;
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    };
    this.raf = requestAnimationFrame(loop);
  }

  private resize() {
    const w = this.host.clientWidth || 600, h = this.host.clientHeight || 400;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.place(true);
  }

  // 0 = flat sheet, 0.72 = lid open, 1 = closed box
  foldTo(f: number, instant = false) {
    this.goal = Math.min(1, Math.max(0, f));
    this.steer = true;
    if (instant) { this.fold = this.goal; this.pose(this.fold); this.place(true); }
  }
  get progress() { return this.fold; }

  // Center the sheet and frame the camera for the current fold: square-on to
  // the flat sheet, turning to a 3/4 view from above as the walls come up.
  private place(force = false) {
    const { L, W, H } = this.dims;
    const p = ease(this.fold, 0, 0.3);
    const cx = this.flat.cx + (L / 2 - this.flat.cx) * p;
    const cy = this.flat.cy + (H / 2 - this.flat.cy) * p;
    this.sheet.position.set(-cx, -cy, (W / 2) * p);
    if (p < 0.02) this.pivot.rotation.y = 0;
    const lowY = -cy - this.dims.t * 1.2;
    const flatLow = -cy + this.flat.cy - this.flat.h / 2 - 2;
    this.ground.position.y = flatLow + (lowY - flatLow) * p;
    // the flat sheet stands upright, so its shadow only shows once it is a box
    (this.ground.material as THREE.ShadowMaterial).opacity = 0.22 * p * p;
    if (!this.steer && !force) return;
    const half = THREE.MathUtils.degToRad(this.camera.fov / 2);
    const flatDist = (Math.max(this.flat.w / this.camera.aspect, this.flat.h) / 2 / Math.tan(half)) * 1.2;
    const lidUp = this.fold > 0.3 ? 1 - ease(this.fold, 0.7, 0.95) : 0;
    const r = 0.5 * Math.hypot(L, W, H + W * 0.9 * lidUp);
    const boxDist = (r / Math.sin(half)) * 1.4;
    const dist = flatDist + (boxDist - flatDist) * ease(this.fold, 0.1, 0.6);
    // Start on the inside (unprinted) face, so the walls fold up towards the
    // viewer as on a real carton, then swing round to the printed front.
    const q = ease(this.fold, 0.05, 0.65);
    const az = Math.PI + (0.66 - Math.PI) * q, el = 0.22 + 0.28 * q;
    const dir = new THREE.Vector3(Math.sin(az) * Math.cos(el), Math.sin(el), Math.cos(az) * Math.cos(el));
    this.controls.target.set(0, lidUp * W * 0.25 * p, 0);
    this.camera.position.copy(this.controls.target).addScaledVector(dir, dist);
    this.camera.near = dist / 50;
    this.camera.far = dist * 20;
    this.camera.updateProjectionMatrix();
    this.controls.minDistance = boxDist * 0.4;
    this.controls.maxDistance = flatDist * 3;
    const span = Math.max(this.flat.w, this.flat.h);
    this.key.position.set(span * 0.8, span * 1.6, span * 1.4);
    const sc = this.key.shadow.camera;
    sc.left = sc.bottom = -span; sc.right = sc.top = span; sc.near = 1; sc.far = span * 6;
    sc.updateProjectionMatrix();
    this.ground.scale.set(span * 6, span * 6, 1);
  }

  private clear() {
    for (const d of this.disposables) d.dispose();
    this.disposables = [];
    this.sheet.clear();
  }

  // One panel: board of thickness T with the printed face on +z. `layer`
  // pushes it one board further inside, for flaps that close behind others.
  private panel(shape: THREE.Shape, look: BoxLook, logo: boolean, layer = 0) {
    const T = Math.max(0.6, Math.min(this.dims.t, 4));
    const g = new THREE.Group();
    const body = new THREE.ExtrudeGeometry(shape, { depth: T, bevelEnabled: false, curveSegments: 10 });
    body.translate(0, 0, -T * (layer + 1));
    const inside = new THREE.MeshStandardMaterial({ color: look.board === "kraft" ? 0xc9a273 : 0xededea, roughness: 0.95 });
    const edge = new THREE.MeshStandardMaterial({ color: look.board === "kraft" ? 0x9a7046 : 0xd9d9d2, roughness: 1 });
    const bm = new THREE.Mesh(body, [inside, edge]);
    bm.castShadow = bm.receiveShadow = true;
    // printed face: its own surface so the artwork maps 0..1 over the panel
    const face = new THREE.ShapeGeometry(shape, 10);
    face.computeBoundingBox();
    const bb = face.boundingBox!, w = bb.max.x - bb.min.x || 1, h = bb.max.y - bb.min.y || 1;
    const pos = face.attributes.position, uv = face.attributes.uv;
    for (let i = 0; i < pos.count; i++) uv.setXY(i, (pos.getX(i) - bb.min.x) / w, (pos.getY(i) - bb.min.y) / h);
    face.translate(0, 0, -T * layer + T * 0.08);
    const rough = look.finish === "gloss" ? 0.3 : look.board === "kraft" ? 0.95 : 0.8;
    const printed = new THREE.MeshPhysicalMaterial({ map: printedTexture(w, h, look, logo), roughness: rough, clearcoat: look.finish === "gloss" ? 0.7 : 0, clearcoatRoughness: 0.2 });
    const fm = new THREE.Mesh(face, printed);
    fm.receiveShadow = true;
    g.add(bm, fm);
    this.disposables.push(body, face, inside, edge, printed, printed.map!);
    return g;
  }

  build(dims: BoxDims, look: BoxLook) {
    this.clear();
    this.dims = dims;
    const { L, W, H } = dims;
    const T = Math.max(0.6, Math.min(dims.t, 4));
    const auto = look.base === "crash";
    const gl = auto ? 0.5 * IN : flapSize(L, W);
    const tuck = auto ? 0.5 * IN : flapSize(L, W);
    const dust = Math.min(W >= 63.5 ? W - IN : W / 2, L / 2 - 1);
    const hinge = (parent: THREE.Object3D, x: number, y: number, z = 0) => { const h = new THREE.Group(); h.position.set(x, y, z); parent.add(h); return h; };
    // a frame turned upside down (about z), for the flaps under the box
    const under = (parent: THREE.Object3D, width: number) => { const h = hinge(parent, width, 0); h.rotation.z = Math.PI; return h; };

    // walls in dieline order: glue | P0 | P1 | P2 | P3, P0 stays put
    const p0 = hinge(this.sheet, 0, 0);
    p0.add(this.panel(poly(rect(0, 0, L, H)), look, true));
    const p1 = hinge(p0, L, 0); p1.add(this.panel(poly(rect(0, 0, W, H)), look, look.printAll));
    const p2 = hinge(p1, W, 0); p2.add(this.panel(poly(rect(0, 0, L, H)), look, look.printAll));
    const p3 = hinge(p2, L, 0); p3.add(this.panel(poly(rect(0, 0, W, H)), look, look.printAll));
    const tg = Math.min(gl * 0.3, H * 0.1);
    const glue = hinge(p0, 0, 0);
    glue.add(this.panel(poly([[0, 0], [0, H], [-gl, H - tg], [-gl, tg]]), look, false, 1));

    // tuck closure: lid on the crease, tuck on the lid; the tuck leans so it
    // slides down inside the far wall and never through it
    type Lid = { lid: THREE.Group; tuck: THREE.Group };
    const closure = (frame: THREE.Object3D, logo: boolean): Lid => {
      const lid = hinge(frame, 0, T * 0.6);
      lid.add(this.panel(poly(rect(0, 0, L, W)), look, logo));
      const tk = hinge(lid, 0, W);
      tk.add(this.panel(rounded(0.5, L - 0.5, tuck, tuckR(L, tuck)), look, false, 1));
      return { lid, tuck: tk };
    };
    const poseLid = (r: Lid, c: number, u: number) => {
      r.lid.rotation.x = -c;
      const lean = Math.asin(Math.min(1, Math.max(0, (W - 2 * T - W * Math.sin(c)) / tuck)));
      r.tuck.rotation.x = -u * (Math.PI - lean - c);
    };
    const dustFlap = (frame: THREE.Object3D, depth: number, r: number, layer = 0) => {
      const d = hinge(frame, 0, 0);
      d.add(this.panel(rounded(0.8, W - 0.8, depth, r), look, false, layer));
      return d;
    };

    const top = closure(hinge(p0, 0, H), look.printAll);
    const topDust = [dustFlap(hinge(p1, 0, H), auto ? L / 2 - 1 : dust, Math.min(10, dust * 0.5)), dustFlap(hinge(p3, 0, H), auto ? L / 2 - 1 : dust, Math.min(10, dust * 0.5))];

    let poseBottom: (f: number) => void;
    let low: number;
    if (auto) {
      // crash-lock base: side flaps fold in, then the two hook flaps lock under them
      const dep = 0.75 * W, rel = 0.125 * IN;
      const hook = (wall: THREE.Object3D, layer: number) => {
        const h = hinge(under(wall, L), 0, 0);
        h.add(this.panel(poly([[0, 0], [L, 0], [L - rel, dep * 0.7], [L / 2 + W / 4, dep], [rel, dep]]), look, false, layer));
        return h;
      };
      const side = (wall: THREE.Object3D) => {
        const h = hinge(under(wall, W), 0, 0);
        h.add(this.panel(poly([[0, 0], [W, 0], [W / 2, W / 2], [0, W / 2]]), look, false, 2));
        return h;
      };
      const hooks = [hook(p0, 0), hook(p2, 1)], sides = [side(p1), side(p3)];
      poseBottom = (f) => {
        for (const s of sides) s.rotation.x = -(Math.PI / 2) * ease(f, 0.3, 0.44);
        hooks[1].rotation.x = -(Math.PI / 2) * ease(f, 0.4, 0.54);
        hooks[0].rotation.x = -(Math.PI / 2) * ease(f, 0.48, 0.62);
      };
      low = dep;
    } else {
      const bottom = closure(under(look.base === "reverse" ? p2 : p0, L), false);
      const botDust = [dustFlap(under(p1, W), dust, Math.min(10, dust * 0.5)), dustFlap(under(p3, W), dust, Math.min(10, dust * 0.5))];
      poseBottom = (f) => {
        for (const d of botDust) d.rotation.x = -(Math.PI / 2) * ease(f, 0.3, 0.42);
        poseLid(bottom, (Math.PI / 2) * ease(f, 0.42, 0.62), ease(f, 0.38, 0.48));
      };
      low = W + tuck + T;
    }

    this.pose = (f) => {
      const w = (Math.PI / 2) * ease(f, 0, 0.3);
      p1.rotation.y = p2.rotation.y = p3.rotation.y = w;
      glue.rotation.y = -w;
      poseBottom(f);
      for (const d of topDust) d.rotation.x = -(Math.PI / 2) * ease(f, 0.62, 0.74);
      poseLid(top, (Math.PI / 2) * ease(f, 0.74, 0.97), ease(f, 0.7, 0.8));
    };
    const highY = H + T + W + tuck;
    this.flat = { cx: (-gl + 2 * L + 2 * W) / 2, cy: (highY - low) / 2, w: gl + 2 * L + 2 * W, h: highY + low };
    this.pose(this.fold);
    this.place(true);
  }

  snapshot() { return this.renderer.domElement.toDataURL("image/png"); }

  dispose() {
    cancelAnimationFrame(this.raf);
    this.ro.disconnect();
    this.controls.dispose();
    this.clear();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}

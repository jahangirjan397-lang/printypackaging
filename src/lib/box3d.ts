// Realistic 3D tuck-end box with three.js: four walls, bottom, a lid hinged
// at the back, a tuck flap and two dust flaps that open and close, real board
// thickness, bleached card or kraft board textures, and the buyer's logo.
// Units are millimetres. Client-only (uses canvas and WebGL).

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export type Board = "bleach" | "kraft";
export type Finish = "matte" | "gloss";
export type BoxLook = {
  board: Board;
  finish: Finish;
  printColor: string | null; // null = plain board
  logo: ImageBitmap | HTMLImageElement | null;
  logoSize: number; // 0.2 - 0.9 of the panel width
  printAll: boolean; // logo on all four walls + lid
  base?: "tuck" | "crash"; // how the bottom closes: reverse tuck or crash-lock auto bottom
};
export type BoxDims = { L: number; W: number; H: number; t: number };

const rand = (() => { let s = 7; return () => ((s = (s * 16807) % 2147483647) / 2147483647); })();

// ---------- board textures (drawn once per panel) ----------
function boardCanvas(w: number, h: number, board: Board, inside: boolean) {
  const k = Math.min(1, 1024 / Math.max(w, h));
  const c = document.createElement("canvas");
  c.width = Math.max(8, Math.round(w * k * 2));
  c.height = Math.max(8, Math.round(h * k * 2));
  const g = c.getContext("2d")!;
  if (board === "kraft") {
    g.fillStyle = inside ? "#C9A273" : "#B88A55";
    g.fillRect(0, 0, c.width, c.height);
    const n = Math.round((c.width * c.height) / 90);
    for (let i = 0; i < n; i++) {
      const x = rand() * c.width, y = rand() * c.height, len = 2 + rand() * 9, a = rand() * Math.PI;
      g.strokeStyle = rand() > 0.5 ? "rgba(90,58,28,0.16)" : "rgba(235,205,160,0.16)";
      g.lineWidth = 0.6 + rand() * 0.8;
      g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a) * len, y + Math.sin(a) * len); g.stroke();
    }
  } else {
    g.fillStyle = inside ? "#EDEDEA" : "#FAFAF8";
    g.fillRect(0, 0, c.width, c.height);
    const n = Math.round((c.width * c.height) / 40);
    for (let i = 0; i < n; i++) {
      g.fillStyle = rand() > 0.5 ? "rgba(0,0,0,0.025)" : "rgba(255,255,255,0.5)";
      g.fillRect(rand() * c.width, rand() * c.height, 1.2, 1.2);
    }
  }
  return c;
}

function printedTexture(w: number, h: number, look: BoxLook, withLogo: boolean, marks?: (g: CanvasRenderingContext2D, k: number) => void) {
  const c = boardCanvas(w, h, look.board, false);
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
  marks?.(g, c.width / w);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

function plainTexture(w: number, h: number, board: Board) {
  const t = new THREE.CanvasTexture(boardCanvas(w, h, board, true));
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// ---------- scene ----------
export class Box3DScene {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(32, 1, 1, 100000);
  private controls: OrbitControls;
  private root = new THREE.Group();
  private lidPivot = new THREE.Group();
  private tuckPivot = new THREE.Group();
  private dustL = new THREE.Group();
  private dustR = new THREE.Group();
  private disposables: { dispose: () => void }[] = [];
  private raf = 0;
  private progress = 0; // 0 closed, 1 open
  private target = 0;
  private ro: ResizeObserver;
  autoRotate = true;

  constructor(private host: HTMLElement) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.NeutralToneMapping;
    this.renderer.toneMappingExposure = 1.12;
    host.appendChild(this.renderer.domElement);
    this.renderer.domElement.style.display = "block";
    this.renderer.domElement.style.width = "100%";
    this.renderer.domElement.style.height = "100%";

    this.scene.add(new THREE.HemisphereLight(0xffffff, 0xd5dde4, 1.7));
    const key = new THREE.DirectionalLight(0xffffff, 2.1);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.radius = 6;
    this.scene.add(key, key.target);
    const fill = new THREE.DirectionalLight(0xdfefff, 0.5);
    this.scene.add(fill);
    const under = new THREE.DirectionalLight(0xffffff, 0.9);
    under.position.set(0.4, -1, 0.6);
    this.scene.add(under);
    (this as unknown as { key: THREE.DirectionalLight }).key = key;
    (this as unknown as { fill: THREE.DirectionalLight }).fill = fill;

    const ground = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.ShadowMaterial({ opacity: 0.16 }));
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    ground.name = "ground";
    this.scene.add(ground, this.root);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.enablePan = false;
    this.controls.maxPolarAngle = Math.PI; // allow looking at the base from below
    this.controls.addEventListener("start", () => { this.autoRotate = false; });

    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(host);
    this.resize();
    const loop = () => {
      this.raf = requestAnimationFrame(loop);
      // ease the open / close animation
      this.progress += (this.target - this.progress) * 0.08;
      if (Math.abs(this.target - this.progress) < 0.001) this.progress = this.target;
      this.pose();
      if (this.autoRotate) this.root.rotation.y += 0.004;
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    };
    loop();
  }

  private resize() {
    const w = this.host.clientWidth || 600, h = this.host.clientHeight || 400;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  setOpen(open: boolean) { this.target = open ? 1 : 0; }
  get isOpen() { return this.target === 1; }

  // Open / close like a real carton. progress 0 = closed, 1 = open.
  // Closing: dust flaps fold in first (1 -> 0.7), then the lid swings down
  // (0.55 -> 0) while the tuck hangs straight down and slides inside the front
  // wall, never through it. Opening plays the same steps backwards.
  private pose() {
    const s = (a: number, b: number) => { const x = Math.min(1, Math.max(0, (this.progress - a) / (b - a))); return x * x * (3 - 2 * x); };
    const a = Math.PI * 0.62 * s(0, 0.55); // lid opening angle
    this.lidPivot.rotation.x = -a;
    // while the lid is low, keep the tuck hanging down with its face on the
    // inside of the front wall; once the lid is high, let it flatten out
    const reach = this.tuckReach, len = this.tuckLen || 1;
    const lean = Math.asin(Math.min(1, Math.max(0, (reach - reach * Math.cos(Math.min(a, Math.PI / 2))) / len)));
    const hold = a - lean, flat = -Math.PI / 2 * 0.98;
    const u = s(0.42, 0.75);
    this.tuckPivot.rotation.x = hold * (1 - u) + flat * u;
    const d = Math.PI / 2 * (1 - s(0.7, 1));
    this.dustR.rotation.z = d;
    this.dustL.rotation.z = -d;
  }
  private tuckReach = 0;
  private tuckLen = 0;

  // camera presets: a 3/4 view from above, or from below to see the base
  view(kind: "top" | "bottom") {
    const span = this.lastSpan || 100;
    this.autoRotate = false;
    if (kind === "bottom") this.camera.position.set(span * 1.5, -span * 1.5, span * 1.7);
    else this.camera.position.set(span * 1.6, span * 1.2, span * 2.1);
    this.controls.update();
  }

  private clear() {
    for (const d of this.disposables) d.dispose();
    this.disposables = [];
    this.root.clear();
    this.lidPivot = new THREE.Group();
    this.tuckPivot = new THREE.Group();
    this.dustL = new THREE.Group();
    this.dustR = new THREE.Group();
  }

  // a panel w x h with thickness T: +z face printed (outside), -z plain (inside)
  private panel(w: number, h: number, T: number, look: BoxLook, logo: boolean, marks?: (g: CanvasRenderingContext2D, k: number) => void) {
    const geo = new THREE.BoxGeometry(w, h, T);
    const rough = look.finish === "gloss" ? 0.32 : look.board === "kraft" ? 0.95 : 0.82;
    const outside = new THREE.MeshPhysicalMaterial({ map: printedTexture(w, h, look, logo, marks), roughness: rough, clearcoat: look.finish === "gloss" ? 0.6 : 0, clearcoatRoughness: 0.25 });
    const inside = new THREE.MeshStandardMaterial({ map: plainTexture(w, h, look.board), roughness: 0.95 });
    const edge = new THREE.MeshStandardMaterial({ color: look.board === "kraft" ? 0x9a7046 : 0xd9d9d2, roughness: 1 });
    const mesh = new THREE.Mesh(geo, [edge, edge, edge, edge, outside, inside]);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.disposables.push(geo, outside, inside, edge, outside.map!, inside.map!);
    return mesh;
  }

  build(dims: BoxDims, look: BoxLook) {
    this.clear();
    const { L, W, H } = dims;
    const T = Math.max(0.6, Math.min(dims.t, 4)); // keep the edge visible
    const tuck = Math.min(Math.max(W * 0.3, 10), 25);
    // dust flaps fold in from both sides, so each stays short of the middle
    const dust = Math.min(W * 0.5, H * 0.4, (L - 2 * T) / 2 - 1);
    const r = this.root;
    const add = (m: THREE.Object3D, x: number, y: number, z: number, ry = 0, rx = 0, parent: THREE.Object3D = r) => {
      m.position.set(x, y, z); m.rotation.set(rx, ry, 0); parent.add(m); return m;
    };
    add(this.panel(L, H, T, look, true), 0, H / 2, W / 2 - T / 2);
    add(this.panel(L, H, T, look, look.printAll), 0, H / 2, -W / 2 + T / 2, Math.PI);
    add(this.panel(W - 2 * T, H, T, look, look.printAll), L / 2 - T / 2, H / 2, 0, Math.PI / 2);
    add(this.panel(W - 2 * T, H, T, look, look.printAll), -L / 2 + T / 2, H / 2, 0, -Math.PI / 2);
    // base seen from below: the closed bottom tuck, or the crash-lock flaps
    const bw = L - 2 * T, bd = W - 2 * T;
    const seams = (g: CanvasRenderingContext2D, k: number) => {
      g.strokeStyle = look.board === "kraft" ? "rgba(70,45,20,0.55)" : "rgba(40,50,60,0.38)";
      g.lineWidth = Math.max(1.5, 0.45 * k);
      g.lineJoin = "round";
      g.beginPath();
      if (look.base === "crash") {
        // two side flaps with 45° edges, two hook flaps meeting in a stepped seam
        const d = Math.min(bd / 2, bw / 2), step = Math.min(bd * 0.12, 6);
        g.moveTo(0, 0); g.lineTo(d * k, (bd / 2) * k); g.lineTo(0, bd * k);
        g.moveTo(bw * k, 0); g.lineTo((bw - d) * k, (bd / 2) * k); g.lineTo(bw * k, bd * k);
        g.moveTo(d * k, (bd / 2) * k); g.lineTo((bw / 2) * k, (bd / 2) * k); g.lineTo((bw / 2) * k, (bd / 2 + step) * k); g.lineTo((bw - d) * k, (bd / 2 + step) * k);
      } else {
        // reverse tuck: the closing panel's free edge runs along the front
        g.moveTo(0, (bd - 0.8) * k); g.lineTo(bw * k, (bd - 0.8) * k);
      }
      g.stroke();
    };
    add(this.panel(bw, bd, T, look, false, seams), 0, T / 2, 0, 0, Math.PI / 2);

    // lid hinged on the back wall, tuck hinged on the lid, dust flaps on the side walls
    // hinge on the outer top corner of the back wall, so the lid folds round it
    this.lidPivot.position.set(0, H, -W / 2);
    r.add(this.lidPivot);
    add(this.panel(L, W, T, look, look.printAll), 0, T / 2, W / 2, 0, -Math.PI / 2, this.lidPivot);
    // tuck hinge sits just inside the front wall, so the closed tuck slides in behind it
    this.tuckReach = W - T - 0.3;
    this.tuckLen = tuck;
    this.tuckPivot.position.set(0, 0, this.tuckReach);
    this.lidPivot.add(this.tuckPivot);
    add(this.panel(L - 2 * T - 1, tuck, T, look, false), 0, -tuck / 2, -T / 2, Math.PI, 0, this.tuckPivot);
    this.dustR.position.set(L / 2 - T, H, 0);
    this.dustL.position.set(-L / 2 + T, H, 0);
    r.add(this.dustR, this.dustL);
    // dust flaps stop short of the front wall, leaving room for the tuck to pass
    // from the back wall to 1 mm behind the tuck
    const dw = W - 3 * T - 1.3, dz = -(T + 1.3) / 2;
    add(this.panel(dw, dust, T, look, false), -T / 2, dust / 2, dz, -Math.PI / 2, 0, this.dustR);
    add(this.panel(dw, dust, T, look, false), T / 2, dust / 2, dz, Math.PI / 2, 0, this.dustL);
    this.pose();

    // frame the camera, lights and ground around the box
    const span = Math.max(L, W, H + W * 0.7); // room for the open lid
    const ground = this.scene.getObjectByName("ground")!;
    ground.scale.set(span * 8, span * 8, 1);
    const key = (this as unknown as { key: THREE.DirectionalLight }).key;
    key.position.set(span * 1.4, span * 2.4, span * 2.2);
    const cam = key.shadow.camera;
    cam.left = cam.bottom = -span * 1.6; cam.right = cam.top = span * 1.6; cam.near = 1; cam.far = span * 8;
    cam.updateProjectionMatrix();
    (this as unknown as { fill: THREE.DirectionalLight }).fill.position.set(-span * 1.5, span, -span);
    this.controls.target.set(0, (H + W * 0.35) * 0.55, 0);
    this.controls.minDistance = span * 1.2;
    this.controls.maxDistance = span * 6;
    if (!this.camera.position.lengthSq() || this.lastSpan !== span) {
      this.camera.position.set(span * 1.6, span * 1.2, span * 2.1);
      this.lastSpan = span;
    }
    this.controls.update();
  }
  private lastSpan = 0;

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

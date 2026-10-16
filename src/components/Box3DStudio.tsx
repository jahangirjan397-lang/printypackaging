"use client";

import { useEffect, useRef, useState } from "react";
import type { Board, BoxLook, Finish } from "@/lib/box3d";

const swatches = [
  { name: "No print", value: null },
  { name: "White", value: "#ffffff" },
  { name: "Black", value: "#111418" },
  { name: "Navy", value: "#0B2545" },
  { name: "Orange", value: "#FF6A00" },
  { name: "Teal", value: "#007C91" },
  { name: "Pink", value: "#E8A5B9" },
  { name: "Sage", value: "#9CB59A" },
];

type SceneApi = {
  build: (d: { L: number; W: number; H: number; t: number }, look: BoxLook) => void;
  setOpen: (o: boolean) => void;
  view: (kind: "top" | "bottom") => void;
  snapshot: () => string;
  dispose: () => void;
  autoRotate: boolean;
};

// Realistic 3D preview: bleach card or kraft board, matte or gloss, any print
// colour and the buyer's own logo (kept in the browser, never uploaded).
export default function Box3DStudio({ L, W, H, t, title, base = "reverse" }: { L: number; W: number; H: number; t: number; title: string; base?: "reverse" | "straight" | "crash" }) {
  const host = useRef<HTMLDivElement>(null);
  const scene = useRef<SceneApi | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [board, setBoard] = useState<Board>("bleach");
  const [finish, setFinish] = useState<Finish>("matte");
  const [printColor, setPrintColor] = useState<string | null>(null);
  const [logo, setLogo] = useState<ImageBitmap | HTMLImageElement | null>(null);
  const [logoName, setLogoName] = useState("Printy logo");
  const [logoSize, setLogoSize] = useState(0.62);
  const [printAll, setPrintAll] = useState(false);
  const [open, setOpen] = useState(false);
  const [spin, setSpin] = useState(true);
  const [angle, setAngle] = useState<"top" | "bottom">("top");

  // load three.js and the default logo once
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const { Box3DScene } = await import("@/lib/box3d");
        if (!alive || !host.current) return;
        scene.current = new Box3DScene(host.current) as unknown as SceneApi;
        const img = new Image();
        img.src = "/email/printy-logo.png";
        await img.decode().catch(() => undefined);
        if (alive) { setLogo(img); setReady(true); }
      } catch {
        if (alive) setFailed(true);
      }
    })();
    return () => { alive = false; scene.current?.dispose(); scene.current = null; };
  }, []);

  useEffect(() => {
    if (!ready || !scene.current) return;
    scene.current.build({ L, W, H, t }, { board, finish, printColor, logo, logoSize, printAll, base });
  }, [ready, L, W, H, t, board, finish, printColor, logo, logoSize, printAll, base]);

  useEffect(() => { scene.current?.setOpen(open); }, [open, ready]);
  useEffect(() => { if (scene.current) scene.current.autoRotate = spin; }, [spin, ready]);

  async function onLogo(f: File | undefined) {
    if (!f) return;
    try {
      const bmp = await createImageBitmap(f);
      setLogo(bmp);
      setLogoName(f.name);
    } catch { /* unsupported image */ }
  }

  function saveImage() {
    const url = scene.current?.snapshot();
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}-3d.png`;
    a.click();
  }

  if (failed) return <p className="p-10 text-center font-bold text-slate-500">3D view needs WebGL, which this browser has turned off.</p>;

  const chip = (on: boolean) => `rounded-full border px-3 py-1.5 text-xs font-black transition ${on ? "border-[#FF6A00] bg-orange-50 text-[#07111F]" : "border-slate-200 text-slate-600 hover:border-[#007C91]"}`;

  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_15rem]">
      <div className="relative h-[28rem] overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_50%_35%,#ffffff,#e9f1f6)]">
        <div ref={host} className="absolute inset-0" />
        {!ready && <p className="absolute inset-0 flex items-center justify-center font-bold text-slate-500">Building your 3D box…</p>}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
          <button type="button" onClick={() => setOpen((o) => !o)} className="rounded-full bg-[#07111F] px-4 py-2 text-xs font-black text-white shadow hover:bg-[#007C91]">
            {open ? "Close the box" : "Open the box"}
          </button>
          <button type="button" onClick={() => setSpin((s) => !s)} className="rounded-full bg-white/90 px-4 py-2 text-xs font-black text-[#07111F] shadow">
            {spin ? "Stop turning" : "Turn"}
          </button>
          <button type="button" onClick={() => { const next = angle === "top" ? "bottom" : "top"; setAngle(next); setSpin(false); scene.current?.view(next); }} className="rounded-full bg-white/90 px-4 py-2 text-xs font-black text-[#07111F] shadow">
            {angle === "top" ? "See the bottom" : "See the top"}
          </button>
          <button type="button" onClick={saveImage} className="rounded-full bg-white/90 px-4 py-2 text-xs font-black text-[#07111F] shadow">Save image</button>
        </div>
        <p className="pointer-events-none absolute right-3 top-3 rounded-full bg-white/80 px-3 py-1 text-[11px] font-black text-slate-500">Drag to turn · scroll to zoom</p>
      </div>

      <div className="space-y-4 text-sm">
        <div>
          <p className="mb-1.5 text-xs font-black uppercase tracking-[0.14em] text-[#007C91]">Board</p>
          <div className="flex flex-wrap gap-1.5">
            <button type="button" className={chip(board === "bleach")} onClick={() => setBoard("bleach")}>Bleached card</button>
            <button type="button" className={chip(board === "kraft")} onClick={() => setBoard("kraft")}>Kraft</button>
          </div>
        </div>
        <div>
          <p className="mb-1.5 text-xs font-black uppercase tracking-[0.14em] text-[#007C91]">Finish</p>
          <div className="flex flex-wrap gap-1.5">
            <button type="button" className={chip(finish === "matte")} onClick={() => setFinish("matte")}>Matte</button>
            <button type="button" className={chip(finish === "gloss")} onClick={() => setFinish("gloss")}>Gloss</button>
          </div>
        </div>
        <div>
          <p className="mb-1.5 text-xs font-black uppercase tracking-[0.14em] text-[#007C91]">Print colour</p>
          <div className="flex flex-wrap items-center gap-1.5">
            {swatches.map((s) => (
              <button key={s.name} type="button" title={s.name} aria-label={s.name} onClick={() => setPrintColor(s.value)}
                className={`h-7 w-7 rounded-full border-2 ${printColor === s.value ? "border-[#FF6A00]" : "border-slate-200"}`}
                style={{ background: s.value ?? (board === "kraft" ? "#B88A55" : "repeating-linear-gradient(45deg,#fff,#fff 3px,#e2e8f0 3px,#e2e8f0 6px)") }} />
            ))}
            <label className="relative h-7 w-7 cursor-pointer overflow-hidden rounded-full border-2 border-slate-200 bg-[conic-gradient(red,yellow,lime,cyan,blue,magenta,red)]" title="Any colour">
              <input type="color" className="absolute inset-0 opacity-0" onChange={(e) => setPrintColor(e.target.value)} aria-label="Pick any colour" />
            </label>
          </div>
        </div>
        <div>
          <p className="mb-1.5 text-xs font-black uppercase tracking-[0.14em] text-[#007C91]">Your logo</p>
          <label className="flex cursor-pointer items-center justify-between gap-2 rounded-xl border border-dashed border-slate-300 px-3 py-2 text-xs font-black text-slate-600 hover:border-[#FF6A00]">
            <span className="truncate">{logoName}</span>
            <span className="text-[#FF6A00]">Upload</span>
            <input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" className="sr-only" onChange={(e) => onLogo(e.target.files?.[0])} />
          </label>
          <input type="range" min={0.2} max={0.9} step={0.02} value={logoSize} onChange={(e) => setLogoSize(Number(e.target.value))} className="mt-2 w-full accent-[#FF6A00]" aria-label="Logo size" />
          <label className="mt-1 flex items-center gap-2 text-xs font-bold text-slate-600">
            <input type="checkbox" checked={printAll} onChange={(e) => setPrintAll(e.target.checked)} /> Print on all sides and lid
          </label>
          <p className="mt-1 text-[11px] font-bold text-slate-400">Your logo stays on your device. PNG with a clear background looks best.</p>
        </div>
      </div>
    </div>
  );
}

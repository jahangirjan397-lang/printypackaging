"use client";

import { useEffect, useRef, useState } from "react";

// A simple 3D view of the closed box (CSS 3D, no extra library). Faces use
// the real proportions of the inside size; the front shows the brand logo.
export default function Box3D({ L, W, H, logo = "/email/printy-logo.png", label }: { L: number; W: number; H: number; logo?: string; label?: string }) {
  const [rot, setRot] = useState({ x: -22, y: -35 });
  const [spin, setSpin] = useState(true);
  const drag = useRef<{ x: number; y: number; rx: number; ry: number } | null>(null);

  useEffect(() => {
    if (!spin) return;
    let raf = 0;
    const tick = () => { setRot((r) => ({ ...r, y: r.y + 0.25 })); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [spin]);

  const k = 230 / Math.max(L, W, H);
  const l = L * k, w = W * k, h = H * k;
  const face = "absolute left-1/2 top-1/2 border border-[#07111F]/25 [backface-visibility:hidden]";
  const board = "bg-[linear-gradient(135deg,#ffffff,#eef6fa)]";
  const side = "bg-[linear-gradient(135deg,#f4f9fc,#e2eef5)]";

  const faces: { key: string; w: number; h: number; t: string; cls: string; logo?: boolean }[] = [
    { key: "front", w: l, h, t: `translateZ(${w / 2}px)`, cls: board, logo: true },
    { key: "back", w: l, h, t: `rotateY(180deg) translateZ(${w / 2}px)`, cls: board },
    { key: "right", w, h, t: `rotateY(90deg) translateZ(${l / 2}px)`, cls: side },
    { key: "left", w, h, t: `rotateY(-90deg) translateZ(${l / 2}px)`, cls: side },
    { key: "top", w: l, h: w, t: `rotateX(90deg) translateZ(${h / 2}px)`, cls: side },
    { key: "bottom", w: l, h: w, t: `rotateX(-90deg) translateZ(${h / 2}px)`, cls: side },
  ];

  return (
    <div
      className="relative flex h-[26rem] w-full cursor-grab touch-none select-none items-center justify-center active:cursor-grabbing"
      style={{ perspective: "1100px" }}
      onPointerDown={(e) => { setSpin(false); drag.current = { x: e.clientX, y: e.clientY, rx: rot.x, ry: rot.y }; (e.target as Element).setPointerCapture?.(e.pointerId); }}
      onPointerMove={(e) => { const d = drag.current; if (d) setRot({ x: Math.max(-80, Math.min(80, d.rx - (e.clientY - d.y) * 0.4)), y: d.ry + (e.clientX - d.x) * 0.4 }); }}
      onPointerUp={() => { drag.current = null; }}
      aria-label="3D preview of the box, drag to turn"
      role="img"
    >
      <div className="relative" style={{ width: 0, height: 0, transformStyle: "preserve-3d", transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)` }}>
        {faces.map((f) => (
          <div key={f.key} className={`${face} ${f.cls} flex items-center justify-center`}
            style={{ width: f.w, height: f.h, marginLeft: -f.w / 2, marginTop: -f.h / 2, transform: f.t }}>
            {f.logo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logo} alt="" draggable={false} className="pointer-events-none max-h-[40%] w-[72%] object-contain" />
            )}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute bottom-3 left-0 right-0 text-center text-[11px] font-black text-slate-500">
        {label ? `${label} · ` : ""}drag to turn
      </div>
    </div>
  );
}

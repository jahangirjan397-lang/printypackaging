"use client";

import { useState } from "react";
import type { GeneratorStyle } from "@/data/dielines";
import { buildDieline, dielineToDxf, dielineToPdf, dielineToSvg, loadBrandLogo } from "@/lib/dielineGeometry";
import DielineLeadGate, { readDielineLead, trackDieline } from "@/components/DielineLeadGate";

type Format = "pdf" | "svg" | "dxf";

function save(name: string, data: BlobPart, type: string) {
  const url = URL.createObjectURL(new Blob([data], { type }));
  const a = document.createElement("a");
  a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

// Library page: download the dieline shown on the page (drawn by our
// generator at this size), as 1:1 PDF, SVG or DXF.
export default function DielineDirectDownload({ gen, name }: { gen: { style: GeneratorStyle; L: number; W: number; H: number; slitLock?: boolean }; name: string }) {
  const [pending, setPending] = useState<Format | null>(null);
  const size = `${gen.L} x ${gen.W} x ${gen.H} mm`;
  const title = `${name} ${size}`;
  const base = `printy-dieline-${gen.style}-${gen.L}x${gen.W}x${gen.H}mm`.replace(/[^a-z0-9.x-]/gi, "-");

  async function run(kind: Format) {
    const dl = buildDieline(gen.style, { L: gen.L, W: gen.W, H: gen.H, t: 0.5, slitLock: gen.slitLock });
    const brand = await loadBrandLogo();
    if (kind === "pdf") save(`${base}.pdf`, dielineToPdf(dl, title, "mm", brand) as BlobPart, "application/pdf");
    else if (kind === "svg") save(`${base}.svg`, dielineToSvg(dl, title, { unit: "mm", brand }), "image/svg+xml");
    else save(`${base}.dxf`, dielineToDxf(dl), "application/dxf");
    trackDieline("dieline_download", { style: gen.style, format: kind, source: "library" });
  }
  const ask = (kind: Format) => (readDielineLead() ? run(kind) : setPending(kind));

  return (
    <>
      <div className="mt-5 flex flex-wrap gap-2">
        <button type="button" onClick={() => ask("pdf")} className="rounded-full bg-[#FF6A00] px-6 py-3 text-sm font-black text-white shadow-lg shadow-orange-500/25 hover:bg-[#e65f00]">
          Download PDF
        </button>
        {(["svg", "dxf"] as const).map((f) => (
          <button key={f} type="button" onClick={() => ask(f)} className="rounded-full border border-white/25 px-5 py-3 text-sm font-black uppercase text-white hover:border-cyan-300 hover:text-cyan-300">
            {f}
          </button>
        ))}
      </div>
      {pending && (
        <DielineLeadGate
          what={pending.toUpperCase()}
          styleName={name}
          sizeText={size}
          material="Card / SBS 0.5 mm"
          source="dieline-library"
          onClose={() => setPending(null)}
          onDone={() => { const k = pending; setPending(null); void run(k); }}
        />
      )}
    </>
  );
}

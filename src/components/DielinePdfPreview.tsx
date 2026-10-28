"use client";

import { useEffect, useRef, useState } from "react";

// Shows page 1 of a dieline PDF uploaded from the admin panel, drawn by
// pdf.js, with the size measured from the file (trim box, else the page).
export default function DielinePdfPreview({ file, compact = false }: { file: string; compact?: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [size, setSize] = useState("");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = "/vendor/pdf.worker-6.3.289.min.mjs";
        const task = pdfjs.getDocument({ url: file });
        const doc = await task.promise;
        const page = await doc.getPage(1);
        const base = page.getViewport({ scale: 1 });
        const want = compact ? 360 : 1100;
        const vp = page.getViewport({ scale: Math.min(want / base.width, want / base.height) * (window.devicePixelRatio || 1) });
        const c = canvas.current;
        if (!c || cancelled) return;
        c.width = vp.width;
        c.height = vp.height;
        await page.render({ canvas: c, viewport: vp }).promise;
        const mm = (pt: number) => Math.round(pt * 25.4 / 72 * 10) / 10;
        setSize(`${mm(base.width)} × ${mm(base.height)} mm`);
        await task.destroy();
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();
    return () => { cancelled = true; };
  }, [file, compact]);

  if (failed) return <p className="p-6 text-center text-sm font-bold text-slate-500">Preview not available. Use the download button to open the PDF.</p>;
  return (
    <div className="flex w-full flex-col items-center">
      <canvas ref={canvas} className={`h-auto max-w-full ${compact ? "max-h-full" : "max-h-[34rem]"}`} aria-label="Dieline preview" />
      {!compact && size && <p className="mt-2 text-xs font-bold text-slate-500">File size at 1:1 scale: {size}</p>}
    </div>
  );
}

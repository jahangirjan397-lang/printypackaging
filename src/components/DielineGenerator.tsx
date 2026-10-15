"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { GeneratorStyle } from "@/data/dielines";
import { buildDieline, dielineToPdf, dielineToSvg, formatLength, generatorStyles, loadBrandLogo, unitToMm, type Unit } from "@/lib/dielineGeometry";
import DielineLeadGate, { readDielineLead, trackDieline } from "@/components/DielineLeadGate";
import Box3D from "@/components/Box3D";

const boards = [
  { id: "card", name: "Card / SBS", sub: "0.5 mm", t: 0.5 },
  { id: "e-flute", name: "E-flute", sub: "1.5 mm", t: 1.5 },
  { id: "b-flute", name: "B-flute", sub: "3 mm", t: 3 },
];

// Common starting sizes in mm (L, W, H)
const presets: Record<"card" | "flute", { name: string; mm: [number, number, number] }[]> = {
  card: [
    { name: "Lip balm / serum", mm: [30, 30, 90] },
    { name: "Perfume 50 ml", mm: [55, 45, 120] },
    { name: "Candle jar", mm: [85, 85, 95] },
    { name: "Supplement", mm: [70, 70, 130] },
  ],
  flute: [
    { name: "Small mailer", mm: [230, 160, 60] },
    { name: "Medium", mm: [300, 220, 100] },
    { name: "Large", mm: [400, 300, 150] },
    { name: "Shoe box", mm: [330, 210, 120] },
  ],
};

const decimals: Record<Unit, number> = { mm: 0, cm: 1, in: 2 };
const show = (mm: number, unit: Unit) => String(Number((mm / unitToMm[unit]).toFixed(decimals[unit])));

function download(name: string, data: BlobPart, type: string) {
  const url = URL.createObjectURL(new Blob([data], { type }));
  const a = document.createElement("a");
  a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-2 text-sm font-black text-[#07111F]">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#07111F] text-xs text-white">{n}</span> {children}
    </h2>
  );
}

// Rendered on the client only (inside <Suspense>, because of useSearchParams),
// so reading the URL and localStorage in the initial state is safe.
export default function DielineGenerator() {
  const params = useSearchParams();
  const linked = generatorStyles.find((s) => s.id === params.get("style"));
  const startFlute = linked?.board === "flute";
  const [style, setStyle] = useState<GeneratorStyle>(linked?.id ?? "reverse-tuck-end");
  const [unit, setUnit] = useState<Unit>("mm");
  const [dims, setDims] = useState(() => {
    // a library page can open the generator at an exact size (mm)
    const q = ["L", "W", "H"].map((k) => Number(params.get(k)));
    if (q.every((n) => n >= 10 && n <= 1500)) return { L: String(q[0]), W: String(q[1]), H: String(q[2]) };
    const p = presets[startFlute ? "flute" : "card"][startFlute ? 0 : 1].mm;
    return { L: String(p[0]), W: String(p[1]), H: String(p[2]) };
  });
  const [slitLock, setSlitLock] = useState(params.get("slit") === "1");
  const [board, setBoard] = useState(startFlute ? "e-flute" : "card");
  const [showDims, setShowDims] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [view, setView] = useState<"2d" | "3d">("2d");
  const [pending, setPending] = useState<"svg" | "pdf" | null>(null);
  const [registered, setRegistered] = useState(() => Boolean(readDielineLead()));

  const meta = generatorStyles.find((s) => s.id === style)!;
  const nums = { L: Number(dims.L) * unitToMm[unit], W: Number(dims.W) * unitToMm[unit], H: Number(dims.H) * unitToMm[unit] };
  const valid = [nums.L, nums.W, nums.H].every((n) => Number.isFinite(n) && n >= 10 && n <= 1500);
  const boardInfo = boards.find((b) => b.id === board)!;

  const result = useMemo(() => {
    if (!valid) return null;
    const dl = buildDieline(style, { ...nums, t: boardInfo.t, slitLock });
    const [x0, y0, x1, y1] = dl.bbox;
    return { dl, flat: [x1 - x0, y1 - y0] as [number, number] };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [style, dims.L, dims.W, dims.H, unit, boardInfo.t, valid, slitLock]);

  const sizeText = `${dims.L} x ${dims.W} x ${dims.H} ${unit}`;
  const title = `${meta.name} ${sizeText}`;
  const fileBase = `printy-dieline-${style}-${dims.L}x${dims.W}x${dims.H}${unit}`.replace(/[^a-z0-9.x-]/gi, "-");

  // switching unit converts the numbers, so the box keeps its real size
  function changeUnit(next: Unit) {
    if (next === unit) return;
    const conv = (v: string) => (v && Number(v) ? show(Number(v) * unitToMm[unit], next) : v);
    setDims((d) => ({ L: conv(d.L), W: conv(d.W), H: conv(d.H) }));
    setUnit(next);
  }

  function pickStyle(id: GeneratorStyle) {
    const s = generatorStyles.find((x) => x.id === id)!;
    if (s.board !== meta.board) {
      const p = presets[s.board][s.board === "flute" ? 0 : 1].mm;
      setDims({ L: show(p[0], unit), W: show(p[1], unit), H: show(p[2], unit) });
      setBoard(s.board === "flute" ? "e-flute" : "card");
    }
    setStyle(id);
  }

  async function doDownload(kind: "svg" | "pdf") {
    if (!result) return;
    const brand = await loadBrandLogo();
    if (kind === "svg") download(`${fileBase}.svg`, dielineToSvg(result.dl, title, { unit, dims: showDims, brand }), "image/svg+xml");
    else download(`${fileBase}.pdf`, dielineToPdf(result.dl, title, unit, brand) as BlobPart, "application/pdf");
    trackDieline("dieline_download", { style, format: kind });
  }

  const askDownload = (kind: "svg" | "pdf") => (registered ? doDownload(kind) : setPending(kind));

  return (
    <div className="grid gap-6 lg:grid-cols-[23rem_1fr]">
      {/* ---------- controls ---------- */}
      <div className="space-y-6 rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60">
        <section>
          <Step n={1}>Choose a box style</Step>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {generatorStyles.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => pickStyle(s.id)}
                aria-pressed={style === s.id}
                className={`flex items-center gap-2 rounded-2xl border p-2 text-left transition ${style === s.id ? "border-[#FF6A00] bg-orange-50 ring-2 ring-[#FF6A00]/20" : "border-slate-200 hover:border-[#007C91]"}`}
              >
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-white p-1">
                  <Image src={`/images/dielines/${s.library}.webp`} alt="" width={44} height={44} className="max-h-full w-auto object-contain" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[13px] font-black leading-tight text-[#07111F]">{s.name}</span>
                  <span className="block text-[11px] font-bold leading-tight text-slate-500">{s.hint}</span>
                </span>
              </button>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between gap-2">
            <Step n={2}>Inside size</Step>
            <div role="radiogroup" aria-label="Units" className="flex rounded-full bg-slate-100 p-1 text-xs font-black">
              {(["mm", "cm", "in"] as Unit[]).map((u) => (
                <button key={u} type="button" role="radio" aria-checked={unit === u} onClick={() => changeUnit(u)}
                  className={`rounded-full px-3 py-1 transition ${unit === u ? "bg-[#07111F] text-white shadow" : "text-slate-600 hover:text-[#07111F]"}`}>
                  {u === "in" ? "inch" : u}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {(["L", "W", "H"] as const).map((k, i) => (
              <label key={k} className="block">
                <span className="mb-1 block text-xs font-black text-slate-600">{meta.dims[i]}</span>
                <span className="relative block">
                  <input
                    inputMode="decimal"
                    value={dims[k]}
                    onChange={(e) => setDims((d) => ({ ...d, [k]: e.target.value.replace(/[^0-9.]/g, "") }))}
                    className="field-input field-compact pr-9 text-center font-black"
                    aria-label={`${meta.dims[i]} in ${unit}`}
                  />
                  <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] font-bold text-slate-400">{unit}</span>
                </span>
              </label>
            ))}
          </div>
          {!valid && <p className="mt-2 text-xs font-bold text-red-600">Enter sizes between {formatLength(10, unit)} and {formatLength(1500, unit)}.</p>}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {presets[meta.board].map((p) => (
              <button key={p.name} type="button" onClick={() => setDims({ L: show(p.mm[0], unit), W: show(p.mm[1], unit), H: show(p.mm[2], unit) })}
                className="rounded-full border border-slate-200 px-2.5 py-1 text-[11px] font-black text-slate-600 hover:border-[#FF6A00] hover:text-[#FF6A00]">
                {p.name}
              </button>
            ))}
          </div>
        </section>

        {(style === "reverse-tuck-end" || style === "straight-tuck-end") && (
          <label className="-mt-2 flex items-center gap-2 text-xs font-black text-slate-700">
            <input type="checkbox" checked={slitLock} onChange={(e) => setSlitLock(e.target.checked)} />
            Slit lock on the tucks (keeps the lid shut)
          </label>
        )}

        <section>
          <Step n={3}>Board</Step>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {boards.map((b) => (
              <button key={b.id} type="button" onClick={() => setBoard(b.id)} aria-pressed={board === b.id}
                className={`rounded-xl border px-2 py-2 text-center text-xs font-black transition ${board === b.id ? "border-[#007C91] bg-cyan-50 text-[#07111F]" : "border-slate-200 text-slate-600 hover:border-[#007C91]"}`}>
                {b.name}<span className="block text-[10px] font-bold text-slate-500">{b.sub}</span>
              </button>
            ))}
          </div>
        </section>

        {result && (
          <div className="rounded-2xl bg-[#07111F] p-4 text-white">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-300">Flat size</p>
            <p className="mt-1 text-2xl font-black">{formatLength(result.flat[0], unit)} × {formatLength(result.flat[1], unit)}</p>
            {result.dl.notes && (
              <ul className="mt-2 space-y-1 text-[11px] font-bold leading-4 text-slate-300">
                {result.dl.notes.map((n) => <li key={n}>· {n}</li>)}
              </ul>
            )}
          </div>
        )}

        <div>
          <Step n={4}>Download</Step>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button type="button" disabled={!result} onClick={() => askDownload("pdf")} className="rounded-full bg-[#FF6A00] px-4 py-3.5 text-sm font-black text-white shadow-lg shadow-orange-500/25 transition hover:bg-[#007C91] disabled:opacity-50">
              ⬇ PDF
            </button>
            <button type="button" disabled={!result} onClick={() => askDownload("svg")} className="rounded-full border-2 border-[#07111F] px-4 py-3 text-sm font-black text-[#07111F] transition hover:border-[#007C91] hover:text-[#007C91] disabled:opacity-50">
              ⬇ SVG
            </button>
          </div>
          <p className="mt-2 text-center text-[11px] font-bold leading-5 text-slate-500">
            1:1 scale · Illustrator, CorelDRAW, Inkscape · cut &amp; crease on spot colours
          </p>
        </div>
      </div>

      {/* ---------- preview ---------- */}
      <div className="flex min-w-0 flex-col rounded-[1.5rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-3">
          <div>
            <p className="font-black text-[#07111F]">{meta.name}</p>
            <p className="text-xs font-bold text-slate-500">{sizeText} inside · {boardInfo.name} {boardInfo.sub}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-black">
            <span role="tablist" aria-label="View" className="flex rounded-full bg-slate-100 p-0.5">
              {(["2d", "3d"] as const).map((v) => (
                <button key={v} type="button" role="tab" aria-selected={view === v} onClick={() => setView(v)}
                  className={`rounded-full px-3 py-1 ${view === v ? "bg-[#FF6A00] text-white shadow" : "text-slate-600"}`}>
                  {v === "2d" ? "Dieline" : "3D box"}
                </button>
              ))}
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-slate-50 px-2.5 py-1 text-slate-600"><i className="h-0.5 w-4 bg-[#07111F]" /> Cut</span>
            <span className="flex items-center gap-1.5 rounded-full bg-slate-50 px-2.5 py-1 text-slate-600"><i className="h-0 w-4 border-t-2 border-dashed border-[#FF6A00]" /> Fold</span>
            <button type="button" onClick={() => setShowDims((v) => !v)} aria-pressed={showDims}
              className={`rounded-full px-2.5 py-1 ${showDims ? "bg-cyan-50 text-[#007C91]" : "bg-slate-50 text-slate-400"}`}>
              ↔ Dimensions
            </button>
            <span className="flex overflow-hidden rounded-full border border-slate-200">
              <button type="button" aria-label="Zoom out" onClick={() => setZoom((z) => Math.max(0.6, Math.round((z - 0.2) * 10) / 10))} className="px-2.5 py-1 hover:bg-slate-50">−</button>
              <button type="button" aria-label="Reset zoom" onClick={() => setZoom(1)} className="border-x border-slate-200 px-2 py-1 hover:bg-slate-50">{Math.round(zoom * 100)}%</button>
              <button type="button" aria-label="Zoom in" onClick={() => setZoom((z) => Math.min(3, Math.round((z + 0.2) * 10) / 10))} className="px-2.5 py-1 hover:bg-slate-50">+</button>
            </span>
          </div>
        </div>
        <div className="relative max-h-[44rem] flex-1 overflow-auto bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] p-4">
          {result && view === "3d" ? (
            <Box3D L={nums.L} W={nums.W} H={nums.H} label={`${meta.name} ${sizeText}`} />
          ) : result ? (
            <div
              className="mx-auto [&>svg]:h-auto [&>svg]:w-full"
              style={{ width: `${Math.round(zoom * 100)}%`, maxWidth: `${Math.round(zoom * 48)}rem` }}
              // our own generated SVG string, no user HTML
              dangerouslySetInnerHTML={{ __html: dielineToSvg(result.dl, title, { preview: true, unit, dims: showDims }) }}
            />
          ) : (
            <p className="py-24 text-center font-bold text-slate-500">Enter a size to see your dieline.</p>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-5 py-3">
          <p className="max-w-xl text-[11px] font-bold leading-5 text-slate-500">
            Standard ECMA/FEFCO-style allowances. Our prepress team checks every dieline against your product and board before production, free.
          </p>
          <div className="flex gap-2">
            <Link href={`/dielines/${meta.library}`} className="rounded-full border border-slate-200 px-4 py-2 text-xs font-black text-[#07111F] hover:border-[#007C91]">About this style</Link>
            <Link href="/dieline-checker" className="rounded-full bg-[#07111F] px-4 py-2 text-xs font-black text-white hover:bg-[#007C91]">Check my artwork</Link>
          </div>
        </div>
      </div>

      {pending && (
        <DielineLeadGate
          what={pending.toUpperCase()}
          styleName={meta.name}
          sizeText={sizeText}
          material={`${boardInfo.name} ${boardInfo.sub}`}
          source="dieline-generator"
          onClose={() => setPending(null)}
          onDone={() => { setRegistered(true); const kind = pending; setPending(null); void doDownload(kind); }}
        />
      )}
    </div>
  );
}

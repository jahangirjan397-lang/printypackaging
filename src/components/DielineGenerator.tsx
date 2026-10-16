"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { GeneratorStyle } from "@/data/dielines";
import { buildDieline, dielineToPdf, dielineToSvg, formatLength, generatorStyles, loadBrandLogo, unitToMm, type Unit } from "@/lib/dielineGeometry";
import DielineLeadGate, { readDielineLead, trackDieline } from "@/components/DielineLeadGate";
import Box3DStudio from "@/components/Box3DStudio";

const boards = [
  { id: "card", name: "Card / SBS", sub: "0.5 mm", t: 0.5 },
  { id: "e-flute", name: "E-flute", sub: "1.5 mm", t: 1.5 },
  { id: "b-flute", name: "B-flute", sub: "3 mm", t: 3 },
];

// Common starting sizes in mm (L, W, H)
const presets: Record<"card" | "flute", { name: string; mm: [number, number, number] }[]> = {
  card: [
    { name: "Lip balm", mm: [30, 30, 90] },
    { name: "Perfume", mm: [55, 45, 120] },
    { name: "Candle", mm: [85, 85, 95] },
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

// small line drawing of each style, drawn by the same generator at a sample size
const thumbs: Record<string, string> = Object.fromEntries(
  generatorStyles.map((s) => [s.id, dielineToSvg(buildDieline(s.id, { L: 60, W: 40, H: 90, t: 0.5 }), s.name, { preview: true, dims: false })]),
);

function download(name: string, data: BlobPart, type: string) {
  const url = URL.createObjectURL(new Blob([data], { type }));
  const a = document.createElement("a");
  a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

function Step({ n, title }: { n: number; title: string }) {
  return (
    <h2 className="mb-3 flex items-center gap-2.5 text-[15px] font-black text-[#07111F]">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#07111F] text-[11px] text-white">{n}</span>
      {title}
    </h2>
  );
}

function Segmented<T extends string>({ value, options, onChange, label }: { value: T; options: { id: T; text: string }[]; onChange: (v: T) => void; label: string }) {
  return (
    <div role="radiogroup" aria-label={label} className="flex rounded-full bg-slate-100 p-1 text-xs font-black">
      {options.map((o) => (
        <button key={o.id} type="button" role="radio" aria-checked={value === o.id} onClick={() => onChange(o.id)}
          className={`rounded-full px-3.5 py-1.5 transition ${value === o.id ? "bg-white text-[#07111F] shadow-sm" : "text-slate-500 hover:text-[#07111F]"}`}>
          {o.text}
        </button>
      ))}
    </div>
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
  const tuckStyle = style === "reverse-tuck-end" || style === "straight-tuck-end";

  const result = useMemo(() => {
    if (!valid) return null;
    const dl = buildDieline(style, { ...nums, t: boardInfo.t, slitLock: tuckStyle && slitLock });
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
  const zoomBy = (d: number) => setZoom((z) => Math.min(3, Math.max(0.6, Math.round((z + d) * 10) / 10)));

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-2xl shadow-slate-300/40">
      {/* ---------- top bar ---------- */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
        <div>
          <p className="text-lg font-black text-[#07111F]">Make your dieline</p>
          <p className="text-xs font-bold text-slate-500">Drawn to the same rules as our production dielines</p>
        </div>
        <Segmented label="Units" value={unit} onChange={changeUnit} options={[{ id: "mm", text: "mm" }, { id: "cm", text: "cm" }, { id: "in", text: "inch" }]} />
      </div>

      <div className="grid lg:grid-cols-[22rem_1fr]">
        {/* ---------- steps ---------- */}
        <div className="space-y-7 border-b border-slate-100 p-5 sm:p-6 lg:border-b-0 lg:border-r">
          <section>
            <Step n={1} title="Box style" />
            <div className="grid grid-cols-3 gap-2">
              {generatorStyles.map((s) => (
                <button key={s.id} type="button" onClick={() => pickStyle(s.id)} aria-pressed={style === s.id}
                  className={`rounded-2xl border p-2 text-center transition ${style === s.id ? "border-[#FF6A00] bg-orange-50/60 ring-2 ring-[#FF6A00]/15" : "border-slate-200 hover:border-slate-400"}`}>
                  {/* our own generated SVG string, no user HTML */}
                  <span className="mx-auto flex h-16 items-center justify-center [&>svg]:h-full [&>svg]:w-auto" dangerouslySetInnerHTML={{ __html: thumbs[s.id] }} />
                  <span className="mt-1.5 block text-[11.5px] font-black leading-tight text-[#07111F]">{s.name}</span>
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs font-bold text-slate-500">{meta.hint}</p>
          </section>

          <section>
            <Step n={2} title="Inside size" />
            <div className="grid grid-cols-3 gap-2">
              {(["L", "W", "H"] as const).map((k, i) => (
                <label key={k} className="block">
                  <span className="mb-1 block text-[11px] font-black uppercase tracking-wide text-slate-500">{meta.dims[i]}</span>
                  <span className="relative block">
                    <input
                      inputMode="decimal"
                      value={dims[k]}
                      onChange={(e) => setDims((d) => ({ ...d, [k]: e.target.value.replace(/[^0-9.]/g, "") }))}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-3 pr-8 text-base font-black text-[#07111F] outline-none transition focus:border-[#007C91] focus:bg-white focus:ring-2 focus:ring-[#007C91]/15"
                      aria-label={`${meta.dims[i]} in ${unit}`}
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-slate-400">{unit}</span>
                  </span>
                </label>
              ))}
            </div>
            {!valid && <p className="mt-2 text-xs font-bold text-red-600">Enter sizes between {formatLength(10, unit)} and {formatLength(1500, unit)}.</p>}
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-400">Try:</span>
              {presets[meta.board].map((p) => (
                <button key={p.name} type="button" onClick={() => setDims({ L: show(p.mm[0], unit), W: show(p.mm[1], unit), H: show(p.mm[2], unit) })}
                  className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-black text-slate-600 transition hover:bg-orange-50 hover:text-[#FF6A00]">
                  {p.name}
                </button>
              ))}
            </div>
          </section>

          <section>
            <Step n={3} title="Board" />
            <div className="grid grid-cols-3 gap-2">
              {boards.map((b) => (
                <button key={b.id} type="button" onClick={() => setBoard(b.id)} aria-pressed={board === b.id}
                  className={`rounded-xl border px-2 py-2 text-center text-xs font-black transition ${board === b.id ? "border-[#007C91] bg-cyan-50 text-[#07111F]" : "border-slate-200 text-slate-600 hover:border-slate-400"}`}>
                  {b.name}<span className="block text-[10px] font-bold text-slate-500">{b.sub}</span>
                </button>
              ))}
            </div>
            {tuckStyle && (
              <label className="mt-3 flex cursor-pointer items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2.5 text-xs font-black text-slate-700">
                Slit lock on the tucks
                <input type="checkbox" checked={slitLock} onChange={(e) => setSlitLock(e.target.checked)} className="h-4 w-4 accent-[#FF6A00]" />
              </label>
            )}
          </section>
        </div>

        {/* ---------- preview ---------- */}
        <div className="flex min-w-0 flex-col bg-slate-50/60">
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 pt-4 sm:px-5">
            <Segmented label="View" value={view} onChange={setView} options={[{ id: "2d", text: "Dieline" }, { id: "3d", text: "3D box" }]} />
            {view === "2d" && (
              <div className="flex items-center gap-2 text-[11px] font-black">
                <button type="button" onClick={() => setShowDims((v) => !v)} aria-pressed={showDims}
                  className={`rounded-full border px-3 py-1.5 transition ${showDims ? "border-[#007C91]/30 bg-cyan-50 text-[#007C91]" : "border-slate-200 bg-white text-slate-500"}`}>
                  ↔ Sizes
                </button>
                <span className="flex overflow-hidden rounded-full border border-slate-200 bg-white">
                  <button type="button" aria-label="Zoom out" onClick={() => zoomBy(-0.2)} className="px-3 py-1.5 hover:bg-slate-50">−</button>
                  <button type="button" aria-label="Reset zoom" onClick={() => setZoom(1)} className="w-12 border-x border-slate-200 py-1.5 hover:bg-slate-50">{Math.round(zoom * 100)}%</button>
                  <button type="button" aria-label="Zoom in" onClick={() => zoomBy(0.2)} className="px-3 py-1.5 hover:bg-slate-50">+</button>
                </span>
              </div>
            )}
          </div>

          <div className="relative m-4 min-h-[26rem] flex-1 overflow-auto rounded-2xl border border-slate-200 bg-white bg-[linear-gradient(#f1f5f9_1px,transparent_1px),linear-gradient(90deg,#f1f5f9_1px,transparent_1px)] [background-size:20px_20px] p-4 sm:m-5 lg:max-h-[42rem]">
            {result && view === "3d" ? (
              <Box3DStudio L={nums.L} W={nums.W} H={nums.H} t={boardInfo.t} title={`${meta.name} ${sizeText}`} base={style === "auto-bottom" ? "crash" : "tuck"} />
            ) : result ? (
              <div
                className="mx-auto [&>svg]:h-auto [&>svg]:w-full"
                // at 100% the whole dieline fits the canvas height; zoom grows from there
                style={{ width: `${Math.round(zoom * 100)}%`, maxWidth: `calc(${(zoom * 32).toFixed(1)}rem * ${(result.flat[0] / result.flat[1]).toFixed(3)})` }}
                // our own generated SVG string, no user HTML
                dangerouslySetInnerHTML={{ __html: dielineToSvg(result.dl, title, { preview: true, unit, dims: showDims }) }}
              />
            ) : (
              <p className="py-24 text-center font-bold text-slate-500">Enter a size to see your dieline.</p>
            )}
          </div>

          {/* ---------- action bar ---------- */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 bg-white px-5 pt-4 sm:px-6">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">Flat size</p>
                <p className="text-lg font-black text-[#07111F]">{result ? `${formatLength(result.flat[0], unit)} × ${formatLength(result.flat[1], unit)}` : "–"}</p>
              </div>
              <div className="flex gap-3 text-[11px] font-bold text-slate-500">
                <span className="flex items-center gap-1.5"><i className="h-0.5 w-4 bg-[#07111F]" /> Cut</span>
                <span className="flex items-center gap-1.5"><i className="h-0 w-4 border-t-2 border-dashed border-[#FF6A00]" /> Fold</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" disabled={!result} onClick={() => askDownload("svg")}
                className="rounded-full border border-slate-300 px-5 py-3 text-sm font-black text-[#07111F] transition hover:border-[#07111F] disabled:opacity-50">
                SVG
              </button>
              <button type="button" disabled={!result} onClick={() => askDownload("pdf")}
                className="rounded-full bg-[#FF6A00] px-6 py-3 text-sm font-black text-white shadow-lg shadow-orange-500/25 transition hover:bg-[#e65f00] disabled:opacity-50">
                Download PDF
              </button>
            </div>
          </div>
          <p className="bg-white px-5 pb-4 pt-3 text-[11px] font-bold leading-5 text-slate-500 sm:px-6">
            1:1 scale, opens in Illustrator, CorelDRAW and Inkscape. Our prepress team checks every dieline free before production.{" "}
            <Link href={`/dielines/${meta.library}`} className="text-[#007C91] underline-offset-2 hover:underline">About this style</Link>
          </p>
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

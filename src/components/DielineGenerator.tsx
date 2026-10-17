"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { GeneratorStyle } from "@/data/dielines";
import { buildDieline, dielineToDxf, dielineToPdf, dielineToSvg, formatLength, generatorStyles, loadBrandLogo, unitToMm, type Unit } from "@/lib/dielineGeometry";
import DielineLeadGate, { readDielineLead, trackDieline } from "@/components/DielineLeadGate";
import Box3DStudio from "@/components/Box3DStudio";
import NavIcon from "@/components/NavIcon";

const boards = [
  { id: "card", name: "SBS card 350 gsm", t: 0.5 },
  { id: "kraft", name: "Kraft card 350 gsm", t: 0.5 },
  { id: "e-flute", name: "E-flute corrugated", t: 1.5 },
  { id: "b-flute", name: "B-flute corrugated", t: 3 },
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

type Format = "pdf" | "svg" | "dxf" | "png";
const SAVE_KEY = "printy-dieline-settings";

const formats: { id: Format; name: string; text: string }[] = [
  { id: "pdf", name: "PDF", text: "1:1 vector, cut & crease spot colours" },
  { id: "svg", name: "SVG", text: "Named vector layers" },
  { id: "dxf", name: "DXF", text: "CAD layers · mm" },
  { id: "png", name: "PNG", text: "300 dpi preview" },
];

// PNG at 300 dpi (capped at 8000 px) from the same 1:1 SVG
async function svgToPng(svg: string): Promise<Blob | null> {
  const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    const doc = new DOMParser().parseFromString(svg, "image/svg+xml").documentElement;
    const wmm = parseFloat(doc.getAttribute("width") || "0"), hmm = parseFloat(doc.getAttribute("height") || "0");
    const k = Math.min(300 / 25.4, 8000 / Math.max(wmm, hmm));
    const c = document.createElement("canvas");
    c.width = Math.round(wmm * k);
    c.height = Math.round(hmm * k);
    c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
    return await new Promise((r) => c.toBlob(r, "image/png"));
  } catch {
    return null;
  } finally {
    URL.revokeObjectURL(url);
  }
}

function download(name: string, data: BlobPart, type: string) {
  const url = URL.createObjectURL(new Blob([data], { type }));
  const a = document.createElement("a");
  a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

function Step({ n, title, aside }: { n: number; title: string; aside?: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-end justify-between gap-2">
      <div>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#07111F] text-[11px] font-black text-white">{n}</span>
        <h2 className="mt-1.5 text-[15px] font-black text-[#07111F]">{title}</h2>
      </div>
      {aside}
    </div>
  );
}

function Toggle<T extends string>({ value, options, onChange, label }: { value: T; options: { id: T; text: string }[]; onChange: (v: T) => void; label: string }) {
  return (
    <div role="radiogroup" aria-label={label} className="flex rounded-lg bg-slate-100 p-1 text-xs font-black">
      {options.map((o) => (
        <button key={o.id} type="button" role="radio" aria-checked={value === o.id} onClick={() => onChange(o.id)}
          className={`flex-1 rounded-md px-3 py-1.5 transition ${value === o.id ? "bg-white text-[#07111F] shadow-sm" : "text-slate-500 hover:text-[#07111F]"}`}>
          {o.text}
        </button>
      ))}
    </div>
  );
}

function Check({ checked, onChange, children }: { checked: boolean; onChange: (v: boolean) => void; children: React.ReactNode }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 py-1 text-[13px] font-bold text-slate-700">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 accent-[#FF6A00]" />
      {children}
    </label>
  );
}

// Rendered on the client only (inside <Suspense>, because of useSearchParams),
// so reading the URL and localStorage in the initial state is safe.
export default function DielineGenerator() {
  const params = useSearchParams();
  // a shared link wins; otherwise come back to the last box made in this browser
  const [saved] = useState(() => {
    if (params.get("L")) return null;
    try {
      return JSON.parse(localStorage.getItem(SAVE_KEY) || "null") as { style: GeneratorStyle; unit: Unit; dims: { L: string; W: string; H: string }; board: string; slit: boolean; ears?: boolean; mode: "inside" | "outside" } | null;
    } catch {
      return null;
    }
  });
  const linked = generatorStyles.find((s) => s.id === (params.get("style") ?? saved?.style));
  const startFlute = linked?.board === "flute";
  const [style, setStyle] = useState<GeneratorStyle>(linked?.id ?? "reverse-tuck-end");
  const [unit, setUnit] = useState<Unit>(saved?.unit ?? "mm");
  const [dims, setDims] = useState(() => {
    if (saved?.dims) return saved.dims;
    // a library page can open the generator at an exact size (mm)
    const q = ["L", "W", "H"].map((k) => Number(params.get(k)));
    if (q.every((n) => n >= 10 && n <= 1500)) return { L: String(q[0]), W: String(q[1]), H: String(q[2]) };
    const p = presets[startFlute ? "flute" : "card"][startFlute ? 0 : 1].mm;
    return { L: String(p[0]), W: String(p[1]), H: String(p[2]) };
  });
  const [slitLock, setSlitLock] = useState(params.get("slit") === "1" || Boolean(saved?.slit));
  // mailer: ear lock tuck and lid (as on our 7 x 5 x 4 in file)
  const [ears, setEars] = useState(params.get("ears") === "1" || Boolean(saved?.ears));
  const [board, setBoard] = useState(() => {
    const b = params.get("board") ?? saved?.board;
    return b && boards.some((x) => x.id === b) ? b : startFlute ? "e-flute" : "card";
  });
  const [mode, setMode] = useState<"inside" | "outside">(saved?.mode ?? "inside");
  const [showDims, setShowDims] = useState(true);
  const [showNames, setShowNames] = useState(true);
  const [copied, setCopied] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [view, setView] = useState<"2d" | "3d">("2d");
  const [pending, setPending] = useState<Format | null>(null);
  const [registered, setRegistered] = useState(() => Boolean(readDielineLead()));

  const meta = generatorStyles.find((s) => s.id === style)!;
  const boardInfo = boards.find((b) => b.id === board)!;
  // the dieline is drawn from the inside size; an outside size loses one board thickness each side
  const less = mode === "outside" ? 2 * boardInfo.t : 0;
  const nums = { L: Number(dims.L) * unitToMm[unit] - less, W: Number(dims.W) * unitToMm[unit] - less, H: Number(dims.H) * unitToMm[unit] - less };
  const valid = [nums.L, nums.W, nums.H].every((n) => Number.isFinite(n) && n >= 10 && n <= 1500);
  const tuckStyle = style === "reverse-tuck-end" || style === "straight-tuck-end";
  // the 3D model is a tuck end carton; other styles show the flat dieline only
  const has3d = tuckStyle || style === "auto-bottom";
  const shown = has3d ? view : "2d";

  const result = useMemo(() => {
    if (!valid) return null;
    const dl = buildDieline(style, { ...nums, t: boardInfo.t, slitLock: tuckStyle && slitLock, ears: style === "mailer" && ears });
    const [x0, y0, x1, y1] = dl.bbox;
    return { dl, flat: [x1 - x0, y1 - y0] as [number, number] };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [style, dims.L, dims.W, dims.H, unit, boardInfo.t, valid, slitLock, ears, mode]);

  useEffect(() => {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify({ style, unit, dims, board, slit: slitLock, ears, mode }));
    } catch { /* private mode */ }
  }, [style, unit, dims, board, slitLock, ears, mode]);

  const sizeText = `${dims.L} x ${dims.W} x ${dims.H} ${unit}${mode === "outside" ? " outside" : ""}`;
  const title = `${meta.name} ${sizeText}`;
  const fileBase = `printy-dieline-${style}-${dims.L}x${dims.W}x${dims.H}${unit}`.replace(/[^a-z0-9.x-]/gi, "-");
  const fmt = (mm: number) => formatLength(mm, unit);

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

  async function doDownload(kind: Format) {
    if (!result) return;
    const brand = await loadBrandLogo();
    if (kind === "svg") download(`${fileBase}.svg`, dielineToSvg(result.dl, title, { unit, dims: showDims, labels: showNames, brand }), "image/svg+xml");
    else if (kind === "dxf") download(`${fileBase}.dxf`, dielineToDxf(result.dl), "application/dxf");
    else if (kind === "png") {
      const png = await svgToPng(dielineToSvg(result.dl, title, { unit, dims: showDims, labels: showNames, brand }));
      if (png) download(`${fileBase}.png`, png, "image/png");
    } else download(`${fileBase}.pdf`, dielineToPdf(result.dl, title, unit, brand) as BlobPart, "application/pdf");
    trackDieline("dieline_download", { style, format: kind });
  }

  const askDownload = (kind: Format) => (registered ? doDownload(kind) : setPending(kind));
  const zoomBy = (d: number) => setZoom((z) => Math.min(3, Math.max(0.6, Math.round((z + d) * 10) / 10)));

  // a link that opens this exact box (sizes in mm)
  async function share() {
    const q = new URLSearchParams({ style, L: String(+nums.L.toFixed(2)), W: String(+nums.W.toFixed(2)), H: String(+nums.H.toFixed(2)), board });
    if (tuckStyle && slitLock) q.set("slit", "1");
    if (style === "mailer" && ears) q.set("ears", "1");
    const url = `${location.origin}/dieline-generator?${q}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      window.prompt("Copy this link", url);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
    trackDieline("dieline_share", { style });
  }

  const summary: [string, string][] = result ? [
    ["Structure", meta.name],
    ["Inside size", `${fmt(nums.L)} × ${fmt(nums.W)} × ${fmt(nums.H)}`],
    ["Outside size", `${fmt(nums.L + 2 * boardInfo.t)} × ${fmt(nums.W + 2 * boardInfo.t)} × ${fmt(nums.H + 2 * boardInfo.t)}`],
    ["Flat size", `${fmt(result.flat[0])} × ${fmt(result.flat[1])}`],
    ["Material", `${boardInfo.name} · ${boardInfo.t} mm`],
  ] : [];

  return (
    <div id="generator" className="scroll-mt-24">
      <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-xl shadow-slate-300/30">
        {/* ---------- top bar ---------- */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-[#FBFAF7] px-4 py-3 sm:px-5">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <p className="font-black text-[#07111F]">Create your box dieline</p>
            <p className="text-xs font-bold text-emerald-700">✓ Settings saved in this browser</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-40"><Toggle label="Units" value={unit} onChange={changeUnit} options={[{ id: "mm", text: "mm" }, { id: "cm", text: "cm" }, { id: "in", text: "in" }]} /></div>
            <button type="button" onClick={share} disabled={!result}
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-black text-[#07111F] transition hover:border-[#07111F] disabled:opacity-50">
              {copied ? "✓ Copied" : "Share"}
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[19rem_1fr]">
          {/* ---------- settings ---------- */}
          <div className="space-y-7 border-b border-slate-200 p-4 sm:p-5 lg:border-b-0 lg:border-r">
            <section>
              <Step n={1} title="Choose the structure" aside={<span className="font-mono text-[11px] text-slate-400">{generatorStyles.length} styles</span>} />
              <div className="space-y-1.5">
                {generatorStyles.map((s) => (
                  <button key={s.id} type="button" onClick={() => pickStyle(s.id)} aria-pressed={style === s.id}
                    className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left transition ${style === s.id ? "border-[#FF6A00] bg-orange-50/70" : "border-slate-200 hover:border-slate-400"}`}>
                    <NavIcon name={s.id} className={`h-9 w-9 ${style === s.id ? "text-[#FF6A00]" : "text-[#007C91]"}`} />
                    <span className="min-w-0">
                      <span className="block text-[13px] font-black leading-tight text-[#07111F]">{s.name}</span>
                      <span className="block text-[11px] font-bold text-slate-500">{s.hint}</span>
                    </span>
                  </button>
                ))}
              </div>
            </section>

            <section>
              <Step n={2} title="Enter the size" />
              <Toggle label="Size measured" value={mode} onChange={setMode} options={[{ id: "inside", text: "Inside size" }, { id: "outside", text: "Outside size" }]} />
              <div className="mt-3 space-y-2">
                {(["L", "W", "H"] as const).map((k, i) => (
                  <label key={k} className="flex items-center gap-2">
                    <span className="w-20 text-xs font-black text-slate-600"><span className="text-[#FF6A00]">{"ABC"[i]}</span> · {meta.dims[i]}</span>
                    <span className="relative flex-1">
                      <input
                        inputMode="decimal"
                        value={dims[k]}
                        onChange={(e) => setDims((d) => ({ ...d, [k]: e.target.value.replace(/[^0-9.]/g, "") }))}
                        className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-3 pr-10 text-right text-sm font-black text-[#07111F] outline-none transition focus:border-[#007C91] focus:ring-2 focus:ring-[#007C91]/15"
                        aria-label={`${meta.dims[i]} in ${unit}`}
                      />
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-slate-400">{unit}</span>
                    </span>
                  </label>
                ))}
              </div>
              <p className="mt-2 rounded-lg bg-cyan-50 px-3 py-2 text-[11px] font-bold leading-4 text-[#006273]">
                {mode === "inside" ? "Length is the front face, width front to back, height bottom to top." : `Outside size of the folded box; we take ${boardInfo.t} mm of board off each side.`}
              </p>
              {!valid && <p className="mt-2 text-xs font-bold text-red-600">Enter sizes between {fmt(10)} and {fmt(1500)}.</p>}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {presets[meta.board].map((p) => (
                  <button key={p.name} type="button" onClick={() => setDims({ L: show(p.mm[0], unit), W: show(p.mm[1], unit), H: show(p.mm[2], unit) })}
                    className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-black text-slate-600 transition hover:bg-orange-50 hover:text-[#FF6A00]">
                    {p.name}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <Step n={3} title="Production settings" />
              <label className="block">
                <span className="mb-1 block text-xs font-black text-slate-600">Material</span>
                <select value={board} onChange={(e) => setBoard(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-[#07111F] outline-none focus:border-[#007C91]">
                  {boards.map((b) => <option key={b.id} value={b.id}>{b.name} ({b.t} mm)</option>)}
                </select>
              </label>
              <div className="mt-3">
                <Check checked={showDims} onChange={setShowDims}>Dimension lines</Check>
                <Check checked={showNames} onChange={setShowNames}>Panel names</Check>
                {tuckStyle && <Check checked={slitLock} onChange={setSlitLock}>Slit lock on the tucks</Check>}
                {style === "mailer" && <Check checked={ears} onChange={setEars}>Ear lock on the tuck and lid</Check>}
              </div>
            </section>
          </div>

          {/* ---------- canvas ---------- */}
          <div className="flex min-w-0 flex-col">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-[#F4F2EE] px-3 py-2">
              <div role="tablist" aria-label="View" className="flex gap-1 text-xs font-black">
                {([["2d", "2D dieline"], ...(has3d ? [["3d", "3D mockup"]] : [])] as ["2d" | "3d", string][]).map(([id, text]) => (
                  <button key={id} type="button" role="tab" aria-selected={shown === id} onClick={() => setView(id)}
                    className={`rounded-md px-3 py-1.5 transition ${shown === id ? "bg-white text-[#07111F] shadow-sm" : "text-slate-500 hover:text-[#07111F]"}`}>
                    {text}
                  </button>
                ))}
              </div>
              {shown === "2d" && (
                <div className="flex items-center gap-1 text-xs font-black text-slate-600">
                  <button type="button" aria-label="Zoom out" onClick={() => zoomBy(-0.2)} className="h-7 w-7 rounded-md hover:bg-white">−</button>
                  <button type="button" aria-label="Reset zoom" onClick={() => setZoom(1)} className="w-12 rounded-md py-1 font-mono hover:bg-white">{Math.round(zoom * 100)}%</button>
                  <button type="button" aria-label="Zoom in" onClick={() => zoomBy(0.2)} className="h-7 w-7 rounded-md hover:bg-white">+</button>
                </div>
              )}
            </div>

            <div className="relative min-h-[28rem] flex-1 overflow-auto bg-white p-4 lg:max-h-[40rem]">
              {result && shown === "3d" ? (
                <Box3DStudio L={nums.L} W={nums.W} H={nums.H} t={boardInfo.t} title={`${meta.name} ${sizeText}`} base={style === "auto-bottom" ? "crash" : style === "straight-tuck-end" ? "straight" : "reverse"} />
              ) : result ? (
                <div
                  className="mx-auto [&>svg]:h-auto [&>svg]:w-full"
                  // at 100% the whole dieline fits the canvas height; zoom grows from there
                  style={{ width: `${Math.round(zoom * 100)}%`, maxWidth: `calc(${(zoom * 33).toFixed(1)}rem * ${(result.flat[0] / result.flat[1]).toFixed(3)})` }}
                  // our own generated SVG string, no user HTML
                  dangerouslySetInnerHTML={{ __html: dielineToSvg(result.dl, title, { preview: true, unit, dims: showDims, labels: showNames, theme: "plain" }) }}
                />
              ) : (
                <p className="py-24 text-center font-bold text-slate-500">Enter a size to see your dieline.</p>
              )}
            </div>

            {/* legend */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-4 py-2.5 text-[11px] font-bold text-slate-500">
              <div className="flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-1.5"><i className="h-0.5 w-5 bg-[#07111F]" /> Cut</span>
                <span className="flex items-center gap-1.5"><i className="h-0 w-5 border-t-2 border-dashed border-[#FF6A00]" /> Fold</span>
                <span className="flex items-center gap-1.5"><i className="h-0.5 w-5 bg-[#00A3C4]" /> Dimensions</span>
              </div>
              {result && <span className="font-mono text-slate-600">{fmt(result.flat[0])} × {fmt(result.flat[1])} flat</span>}
            </div>

            {/* geometry summary */}
            {result && (
              <div className="border-t border-slate-200 bg-[#FBFAF7] px-4 py-4">
                <p className="text-xs font-black text-emerald-700">✓ Geometry generated · scale 1:1 · {unit === "in" ? "inches" : unit === "cm" ? "centimetres" : "millimetres"}</p>
                <dl className="mt-3 grid gap-x-6 gap-y-2 text-xs sm:grid-cols-2 xl:grid-cols-3">
                  {summary.map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-3 border-b border-slate-200 pb-1.5">
                      <dt className="font-bold text-slate-500">{k}</dt>
                      <dd className="text-right font-black text-[#07111F]">{v}</dd>
                    </div>
                  ))}
                </dl>
                {result.dl.notes && <p className="mt-3 text-[11px] font-bold leading-4 text-slate-500">{result.dl.notes[1] ?? result.dl.notes[0]}. Our prepress team checks every dieline against your board before production, free.</p>}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ---------- step 4: download ---------- */}
      <section className="mt-6 rounded-2xl border border-slate-300 bg-white p-5 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#07111F] text-[11px] font-black text-white">4</span>
            <h2 className="mt-1.5 text-lg font-black text-[#07111F]">Download your dieline</h2>
            <p className="mt-1 max-w-xl text-sm text-slate-600">A clean template to put your artwork on, with the Printy footer. Add your email once and every format stays unlocked in this browser.</p>
          </div>
          <Link href={`/dielines/${meta.library}`} className="text-sm font-black text-[#007C91] hover:text-[#FF6A00]">About this style →</Link>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {formats.map((f) => (
            <button key={f.id} type="button" disabled={!result} onClick={() => askDownload(f.id)}
              className={`group rounded-xl border p-4 text-left transition disabled:opacity-50 ${f.id === "pdf" ? "border-[#FF6A00] bg-orange-50/60 hover:bg-orange-50" : "border-slate-200 hover:border-[#07111F]"}`}>
              <span className="flex items-center justify-between">
                <span className="text-lg font-black text-[#07111F]">{f.name}</span>
                <span className={`text-lg ${f.id === "pdf" ? "text-[#FF6A00]" : "text-slate-400 group-hover:text-[#07111F]"}`}>↓</span>
              </span>
              <span className="mt-1 block text-xs font-bold text-slate-500">{f.text}</span>
            </button>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3">
          <p className="text-sm font-bold text-[#07111F]">Want it printed? Custom boxes from 100 pcs, reply within 10 minutes.</p>
          <Link href="/#quote" className="rounded-lg bg-[#FF6A00] px-4 py-2 text-sm font-black hover:bg-[#e65f00]">Get a printing price</Link>
        </div>
      </section>

      {pending && (
        <DielineLeadGate
          what={pending.toUpperCase()}
          styleName={meta.name}
          sizeText={sizeText}
          material={`${boardInfo.name} ${boardInfo.t} mm`}
          source="dieline-generator"
          onClose={() => setPending(null)}
          onDone={() => { setRegistered(true); const kind = pending; setPending(null); void doDownload(kind); }}
        />
      )}
    </div>
  );
}

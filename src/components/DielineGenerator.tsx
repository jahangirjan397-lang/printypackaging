"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { sendGAEvent } from "@next/third-parties/google";
import type { GeneratorStyle } from "@/data/dielines";
import { buildDieline, dielineToPdf, dielineToSvg, generatorStyles } from "@/lib/dielineGeometry";
import { isLiveHostname, readAnalyticsConsent } from "@/lib/analyticsConsent";
import { readLeadSource } from "@/lib/leadSource";

type Unit = "mm" | "cm" | "in";
const toMm: Record<Unit, number> = { mm: 1, cm: 10, in: 25.4 };
const boards = [
  { id: "card", name: "Card / SBS (0.5 mm)", t: 0.5 },
  { id: "e-flute", name: "E-flute corrugated (1.5 mm)", t: 1.5 },
  { id: "b-flute", name: "B-flute corrugated (3 mm)", t: 3 },
];
const LEAD_KEY = "printy_dieline_lead";

function readLead() {
  try { return window.localStorage.getItem(LEAD_KEY) || ""; } catch { return ""; }
}
function saveLead(email: string) {
  try { window.localStorage.setItem(LEAD_KEY, email); } catch { /* private mode */ }
}
function download(name: string, data: BlobPart, type: string) {
  const url = URL.createObjectURL(new Blob([data], { type }));
  const a = document.createElement("a");
  a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
function track(event: string, params: Record<string, string>) {
  if (isLiveHostname(window.location.hostname) && readAnalyticsConsent() === "granted") sendGAEvent("event", event, params);
}

// Rendered on the client only (inside <Suspense>, because of useSearchParams),
// so reading the URL and localStorage in the initial state is safe.
export default function DielineGenerator() {
  const params = useSearchParams();
  const linked = generatorStyles.find((s) => s.id === params.get("style"));
  const flute = linked?.board === "flute";
  const [style, setStyle] = useState<GeneratorStyle>(linked?.id ?? "reverse-tuck-end");
  const [unit, setUnit] = useState<Unit>("mm");
  const [dims, setDims] = useState(flute ? { L: "250", W: "180", H: "80" } : { L: "60", W: "40", H: "120" });
  const [board, setBoard] = useState(flute ? "e-flute" : "card");
  const [pending, setPending] = useState<"svg" | "pdf" | null>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [registered, setRegistered] = useState(() => Boolean(readLead()));

  const meta = generatorStyles.find((s) => s.id === style)!;
  const nums = { L: Number(dims.L) * toMm[unit], W: Number(dims.W) * toMm[unit], H: Number(dims.H) * toMm[unit] };
  const valid = [nums.L, nums.W, nums.H].every((n) => Number.isFinite(n) && n >= 10 && n <= 1500);
  const t = boards.find((b) => b.id === board)!.t;

  const result = useMemo(() => {
    if (!valid) return null;
    const dl = buildDieline(style, { ...nums, t });
    const [x0, y0, x1, y1] = dl.bbox;
    return { dl, flat: [x1 - x0, y1 - y0] as [number, number] };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [style, dims.L, dims.W, dims.H, unit, t, valid]);

  const sizeText = `${dims.L} x ${dims.W} x ${dims.H} ${unit}`;
  const title = `${meta.name} ${sizeText}`;
  const fileBase = `printy-dieline-${style}-${dims.L}x${dims.W}x${dims.H}${unit}`.replace(/[^a-z0-9.x-]/gi, "-");

  function doDownload(kind: "svg" | "pdf") {
    if (!result) return;
    if (kind === "svg") download(`${fileBase}.svg`, dielineToSvg(result.dl, title), "image/svg+xml");
    else download(`${fileBase}.pdf`, dielineToPdf(result.dl, title) as BlobPart, "application/pdf");
    track("dieline_download", { style, format: kind });
  }

  function askDownload(kind: "svg" | "pdf") {
    if (registered) doDownload(kind);
    else { setPending(kind); setError(""); }
  }

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const f = new FormData(event.currentTarget);
    if (String(f.get("website") || "")) return;
    setSending(true); setError("");
    const wantsQuote = f.get("wantsQuote") === "on";
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(f.get("name") || ""),
          email: String(f.get("email") || ""),
          country: String(f.get("country") || ""),
          product: `Free dieline: ${meta.name}`,
          size: sizeText,
          quantity: wantsQuote ? String(f.get("quantity") || "") : "",
          material: boards.find((b) => b.id === board)!.name,
          message: wantsQuote
            ? `Downloaded a free ${meta.name} dieline (${sizeText}) and would like a printing price.`
            : `Downloaded a free ${meta.name} dieline (${sizeText}) from the dieline generator. No price requested yet.`,
          leadSource: `dieline-generator | ${readLeadSource()}`.slice(0, 200),
        }),
      });
      let out: { success?: boolean; message?: string } = {};
      try { out = await res.json(); } catch { /* handled below */ }
      if (!res.ok || !out.success) throw new Error(out.message || "Could not send right now. Please try again.");
      saveLead(String(f.get("email")));
      setRegistered(true);
      track("generate_lead", { form_name: "dieline_generator", product: style });
      const kind = pending;
      setPending(null);
      if (kind) doDownload(kind);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  }

  const fmt = (mm: number) => (unit === "mm" ? `${Math.round(mm)} mm` : unit === "cm" ? `${(mm / 10).toFixed(1)} cm` : `${(mm / 25.4).toFixed(2)} in`);

  return (
    <div className="grid gap-6 lg:grid-cols-[22rem_1fr]">
      {/* controls */}
      <div className="space-y-5 rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60">
        <div>
          <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#007C91]">1 · Box style</p>
          <div className="grid grid-cols-2 gap-2">
            {generatorStyles.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => { setStyle(s.id); setBoard(s.board === "flute" ? "e-flute" : "card"); }}
                className={`rounded-xl border px-3 py-2 text-left text-sm font-black transition ${style === s.id ? "border-[#FF6A00] bg-orange-50 text-[#07111F]" : "border-slate-200 text-slate-700 hover:border-[#007C91]"}`}
              >
                {s.name}
                <span className="block text-[11px] font-bold text-slate-500">{s.hint}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#007C91]">2 · Inside size</p>
            <div className="flex overflow-hidden rounded-full border border-slate-200 text-xs font-black">
              {(["mm", "cm", "in"] as Unit[]).map((u) => (
                <button key={u} type="button" onClick={() => setUnit(u)} className={`px-3 py-1 ${unit === u ? "bg-[#07111F] text-white" : "text-slate-600"}`}>{u}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {(["L", "W", "H"] as const).map((k, i) => (
              <label key={k} className="block">
                <span className="mb-1 block text-xs font-black text-slate-700">{meta.dims[i]}</span>
                <input
                  inputMode="decimal"
                  value={dims[k]}
                  onChange={(e) => setDims((d) => ({ ...d, [k]: e.target.value.replace(/[^0-9.]/g, "") }))}
                  className="field-input field-compact text-center"
                  aria-label={`${meta.dims[i]} in ${unit}`}
                />
              </label>
            ))}
          </div>
          {!valid && <p className="mt-2 text-xs font-bold text-red-600">Enter sizes between 10 mm and 1,500 mm.</p>}
        </div>

        <label className="block">
          <span className="mb-1 block text-xs font-black uppercase tracking-[0.18em] text-[#007C91]">3 · Board</span>
          <select value={board} onChange={(e) => setBoard(e.target.value)} className="field-input field-compact">
            {boards.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
        </label>

        {result && (
          <div className="rounded-xl bg-slate-50 p-3 text-sm font-bold text-slate-700">
            Flat size: <span className="text-[#07111F]">{fmt(result.flat[0])} × {fmt(result.flat[1])}</span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2">
          <button type="button" disabled={!result} onClick={() => askDownload("pdf")} className="rounded-full bg-[#FF6A00] px-4 py-3 text-sm font-black text-white shadow-lg shadow-orange-500/25 transition hover:bg-[#007C91] disabled:opacity-50">
            Download PDF
          </button>
          <button type="button" disabled={!result} onClick={() => askDownload("svg")} className="rounded-full border-2 border-[#07111F] px-4 py-3 text-sm font-black text-[#07111F] transition hover:border-[#007C91] hover:text-[#007C91] disabled:opacity-50">
            Download SVG
          </button>
        </div>
        <p className="text-xs font-bold leading-5 text-slate-500">
          1:1 scale in millimetres. Opens in Illustrator, CorelDRAW and Inkscape. Solid = cut, dashed = fold.
        </p>
      </div>

      {/* preview */}
      <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-200/60">
        <div className="flex flex-wrap items-center justify-between gap-2 px-1 pb-3">
          <p className="font-black text-[#07111F]">{meta.name} <span className="font-bold text-slate-500">· {sizeText}</span></p>
          <Link href={`/dielines/${meta.library}`} className="text-sm font-black text-[#007C91] hover:text-[#FF6A00]">About this style →</Link>
        </div>
        <div className="flex min-h-[22rem] items-center justify-center overflow-hidden rounded-xl bg-[repeating-linear-gradient(0deg,#f8fafc,#f8fafc_19px,#eef2f6_20px),repeating-linear-gradient(90deg,transparent,transparent_19px,#eef2f6_20px)] p-3">
          {result ? (
            <div
              className="w-full max-w-3xl [&>svg]:h-auto [&>svg]:max-h-[36rem] [&>svg]:w-full"
              // our own generated SVG string, no user HTML
              dangerouslySetInnerHTML={{ __html: dielineToSvg(result.dl, title, { preview: true }) }}
            />
          ) : (
            <p className="font-bold text-slate-500">Enter a size to see your dieline.</p>
          )}
        </div>
        <p className="mt-3 px-1 text-xs font-bold leading-5 text-slate-500">
          Standard proportions for a starting template. Before production our prepress team checks every dieline against your product, board and print method, free.
        </p>
      </div>

      {pending && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#07111F]/60 p-4" role="dialog" aria-modal="true" aria-labelledby="dl-gate-title">
          <form onSubmit={submitLead} className="w-full max-w-md rounded-[1.5rem] border-t-4 border-[#FF6A00] bg-white p-6 text-[#07111F] shadow-2xl">
            <div aria-hidden="true" className="pointer-events-none absolute left-[-10000px] h-px w-px overflow-hidden">
              <input name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
            </div>
            <h2 id="dl-gate-title" className="text-xl font-black">Where should we send updates?</h2>
            <p className="mt-1 text-sm font-bold text-slate-600">Your {pending.toUpperCase()} downloads right after. One time only, all future downloads are instant.</p>
            <div className="mt-4 space-y-2.5">
              <input name="name" required minLength={2} autoComplete="name" placeholder="Your name *" className="field-input field-compact" />
              <input name="email" type="email" required autoComplete="email" placeholder="you@company.com *" className="field-input field-compact" />
              <select name="country" className="field-input field-compact" defaultValue="USA">
                {["USA", "UK", "Canada", "Europe", "Australia", "UAE", "Other"].map((c) => <option key={c}>{c}</option>)}
              </select>
              <label className="flex items-start gap-2 text-sm font-bold text-slate-700">
                <input name="wantsQuote" type="checkbox" className="mt-1" defaultChecked />
                Also send me a price to print this box
              </label>
              <select name="quantity" className="field-input field-compact" defaultValue="500">
                {["100", "250", "500", "1,000", "2,500", "5,000+"].map((q) => <option key={q} value={q}>{q} boxes</option>)}
              </select>
            </div>
            {error && <p role="alert" className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-sm font-bold text-red-700">{error}</p>}
            <div className="mt-5 flex items-center justify-between gap-3">
              <button type="button" onClick={() => setPending(null)} className="text-sm font-black text-slate-500 hover:text-[#07111F]">Cancel</button>
              <button type="submit" disabled={sending} className="rounded-full bg-[#FF6A00] px-6 py-3 text-sm font-black text-white shadow-lg shadow-orange-500/25 transition hover:bg-[#007C91] disabled:opacity-70">
                {sending ? "Sending…" : `Get my ${pending.toUpperCase()} →`}
              </button>
            </div>
            <p className="mt-3 text-[11px] font-bold text-slate-400">We only use your email to reply about packaging. See our <Link href="/privacy-policy" className="underline">privacy policy</Link>.</p>
          </form>
        </div>
      )}
    </div>
  );
}

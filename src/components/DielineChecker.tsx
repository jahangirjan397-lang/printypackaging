"use client";

import { useState } from "react";
import type { GeneratorStyle } from "@/data/dielines";
import { buildDieline, generatorStyles } from "@/lib/dielineGeometry";
import type { Finding } from "@/lib/pdfCheck";
import { trackDieline } from "@/components/DielineLeadGate";
import ProductQuickQuote from "@/components/ProductQuickQuote";

type Unit = "mm" | "cm" | "in";
const toMm: Record<Unit, number> = { mm: 1, cm: 10, in: 25.4 };
const icon: Record<Finding["level"], string> = { pass: "✓", warn: "!", fail: "✕", info: "i" };
const tone: Record<Finding["level"], string> = {
  pass: "border-emerald-200 bg-emerald-50 text-emerald-800",
  warn: "border-amber-200 bg-amber-50 text-amber-900",
  fail: "border-red-200 bg-red-50 text-red-800",
  info: "border-slate-200 bg-slate-50 text-slate-700",
};

export default function DielineChecker() {
  const [file, setFile] = useState<File | null>(null);
  const [style, setStyle] = useState<GeneratorStyle | "">("");
  const [unit, setUnit] = useState<Unit>("mm");
  const [dims, setDims] = useState({ L: "", W: "", H: "" });
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Finding[] | null>(null);

  async function run() {
    if (!file) return;
    setBusy(true);
    setResult(null);
    try {
      let expected = null;
      const n = [dims.L, dims.W, dims.H].map((v) => Number(v) * toMm[unit]);
      if (style && n.every((v) => v >= 10 && v <= 1500)) {
        const meta = generatorStyles.find((s) => s.id === style)!;
        const dl = buildDieline(style, { L: n[0], W: n[1], H: n[2], t: meta.board === "flute" ? 1.5 : 0.5 });
        expected = { w: dl.bbox[2] - dl.bbox[0], h: dl.bbox[3] - dl.bbox[1], label: `${meta.name} ${dims.L} × ${dims.W} × ${dims.H} ${unit}` };
      }
      const { checkPdf } = await import("@/lib/pdfCheck");
      const findings = await checkPdf(file, expected);
      setResult(findings);
      trackDieline("dieline_check", {
        fails: String(findings.filter((x) => x.level === "fail").length),
        warns: String(findings.filter((x) => x.level === "warn").length),
      });
    } catch {
      setResult([{ level: "fail", title: "Check could not finish", detail: "The file may be damaged or protected. Save it again as a standard PDF and retry." }]);
    } finally {
      setBusy(false);
    }
  }

  const fails = result?.filter((x) => x.level === "fail").length ?? 0;
  const warns = result?.filter((x) => x.level === "warn").length ?? 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[24rem_1fr]">
      <div className="space-y-5 rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60">
        <div>
          <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#007C91]">1 · Your artwork PDF</p>
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center hover:border-[#FF6A00]">
            <span className="text-3xl">📄</span>
            <span className="mt-2 font-black">{file ? file.name : "Choose a PDF"}</span>
            <span className="mt-1 text-xs font-bold text-slate-500">{file ? `${(file.size / 1048576).toFixed(1)} MB` : "Checked in your browser, never uploaded"}</span>
            <input type="file" accept="application/pdf,.pdf" className="sr-only" onChange={(e) => { setFile(e.target.files?.[0] || null); setResult(null); }} />
          </label>
        </div>

        <div>
          <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#007C91]">2 · Box (optional)</p>
          <select value={style} onChange={(e) => setStyle(e.target.value as GeneratorStyle | "")} className="field-input field-compact">
            <option value="">Skip size check</option>
            {generatorStyles.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          {style && (
            <div className="mt-2 grid grid-cols-[1fr_1fr_1fr_4rem] gap-1.5">
              {(["L", "W", "H"] as const).map((k) => (
                <input key={k} inputMode="decimal" placeholder={k} value={dims[k]} aria-label={k}
                  onChange={(e) => setDims((d) => ({ ...d, [k]: e.target.value.replace(/[^0-9.]/g, "") }))}
                  className="field-input field-compact text-center" />
              ))}
              <select aria-label="Unit" value={unit} onChange={(e) => setUnit(e.target.value as Unit)} className="field-input field-compact px-1">
                <option>mm</option><option>cm</option><option>in</option>
              </select>
            </div>
          )}
        </div>

        <button type="button" disabled={!file || busy} onClick={run} className="w-full rounded-full bg-[#FF6A00] px-6 py-3.5 font-black text-white shadow-lg shadow-orange-500/25 transition hover:bg-[#007C91] disabled:opacity-50">
          {busy ? "Checking…" : "Check my file"}
        </button>
        <p className="text-xs font-bold leading-5 text-slate-500">
          Checks bleed, dieline layer, RGB colour, fonts, text near the edge, image resolution and size against your box.
        </p>
      </div>

      <div className="space-y-4">
        {!result && (
          <div className="flex min-h-[20rem] items-center justify-center rounded-[1.5rem] border border-slate-200 bg-white p-8 text-center font-bold text-slate-500">
            {busy ? "Reading your PDF…" : "Your report appears here."}
          </div>
        )}
        {result && (
          <>
            <div className={`rounded-[1.5rem] p-5 font-black ${fails ? "bg-red-600 text-white" : warns ? "bg-amber-400 text-[#07111F]" : "bg-emerald-600 text-white"}`}>
              {fails ? `${fails} problem(s) to fix before printing` : warns ? `Almost ready: ${warns} thing(s) to check` : "Looks print-ready"}
              {warns > 0 && fails > 0 ? `, plus ${warns} to check` : ""}
            </div>
            <ul className="space-y-2">
              {result.map((r, i) => (
                <li key={i} className={`flex gap-3 rounded-2xl border p-4 ${tone[r.level]}`}>
                  <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-white/70 text-sm font-black">{icon[r.level]}</span>
                  <div>
                    <p className="font-black">{r.title}</p>
                    <p className="mt-0.5 text-sm leading-6">{r.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
            <ProductQuickQuote
              productName="Artwork check + printing"
              productSlug=""
              heading="Want our prepress team to fix it and price the print?"
              formName="dieline_checker_quote"
            />
          </>
        )}
      </div>
    </div>
  );
}

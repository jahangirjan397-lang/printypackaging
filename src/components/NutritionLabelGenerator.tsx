"use client";

import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { readLeadSource } from "@/lib/leadSource";
import { ukLabelSvg, usLabelSvg, type UkInput, type UsInput } from "@/lib/nutritionLabel";

type Mode = "us" | "uk";
type UsForm = Record<keyof UsInput, string> & { productName: string };
type UkForm = Record<keyof UkInput, string>;

const STORE = "printy-nutrition-label-v1";
const TRUSTPILOT = "https://www.trustpilot.com/evaluate/printypackaging.com";

const US_EXAMPLE: UsForm = {
  productName: "Oat Cookies", servingsPerContainer: "8", servingSize: "2 cookies", servingGrams: "30",
  calories: "140", totalFat: "6", satFat: "2.5", transFat: "0", cholesterol: "10", sodium: "95",
  totalCarb: "20", fiber: "2", totalSugars: "9", addedSugars: "8", protein: "2",
  vitaminD: "0", calcium: "20", iron: "1", potassium: "70",
};
const UK_EXAMPLE: UkForm = {
  productName: "Oat Cookies", portionGrams: "30", portionsPerPack: "8",
  kcal: "467", fat: "20", saturates: "8.3", carbohydrate: "67", sugars: "30", fibre: "6.7", protein: "6.7", salt: "0.79",
};
const blank = <T extends Record<string, string>>(o: T, keep: (keyof T)[] = []) =>
  Object.fromEntries(Object.entries(o).map(([k, v]) => [k, keep.includes(k as keyof T) ? v : ""])) as T;

const num = (v: string) => {
  const x = parseFloat(String(v).replace(",", "."));
  return Number.isFinite(x) ? x : 0;
};

type Field<T> = { key: keyof T; label: string; unit?: string; indent?: boolean; text?: boolean; placeholder?: string; wide?: boolean };
const US_FIELDS: { title: string; fields: Field<UsForm>[] }[] = [
  {
    title: "Product & serving",
    fields: [
      { key: "productName", label: "Product name (optional)", text: true, placeholder: "e.g. Oat Cookies", wide: true },
      { key: "servingSize", label: "Serving size", text: true, placeholder: "e.g. 2 cookies" },
      { key: "servingGrams", label: "Serving weight", unit: "g" },
      { key: "servingsPerContainer", label: "Servings per container", text: true, placeholder: "e.g. 8" },
      { key: "calories", label: "Calories", unit: "kcal" },
    ],
  },
  {
    title: "Per serving",
    fields: [
      { key: "totalFat", label: "Total fat", unit: "g" },
      { key: "satFat", label: "Saturated fat", unit: "g", indent: true },
      { key: "transFat", label: "Trans fat", unit: "g", indent: true },
      { key: "cholesterol", label: "Cholesterol", unit: "mg" },
      { key: "sodium", label: "Sodium", unit: "mg" },
      { key: "totalCarb", label: "Total carbohydrate", unit: "g" },
      { key: "fiber", label: "Dietary fiber", unit: "g", indent: true },
      { key: "totalSugars", label: "Total sugars", unit: "g", indent: true },
      { key: "addedSugars", label: "Added sugars", unit: "g", indent: true },
      { key: "protein", label: "Protein", unit: "g" },
    ],
  },
  {
    title: "Vitamins & minerals",
    fields: [
      { key: "vitaminD", label: "Vitamin D", unit: "mcg" },
      { key: "calcium", label: "Calcium", unit: "mg" },
      { key: "iron", label: "Iron", unit: "mg" },
      { key: "potassium", label: "Potassium", unit: "mg" },
    ],
  },
];
const UK_FIELDS: { title: string; fields: Field<UkForm>[] }[] = [
  {
    title: "Product & portion",
    fields: [
      { key: "productName", label: "Product name (optional)", text: true, placeholder: "e.g. Oat Cookies", wide: true },
      { key: "portionGrams", label: "Portion size (optional)", unit: "g" },
      { key: "portionsPerPack", label: "Portions per pack", text: true, placeholder: "e.g. 8" },
    ],
  },
  {
    title: "Per 100g",
    fields: [
      { key: "kcal", label: "Energy", unit: "kcal" },
      { key: "fat", label: "Fat", unit: "g" },
      { key: "saturates", label: "of which saturates", unit: "g", indent: true },
      { key: "carbohydrate", label: "Carbohydrate", unit: "g" },
      { key: "sugars", label: "of which sugars", unit: "g", indent: true },
      { key: "fibre", label: "Fibre (optional)", unit: "g" },
      { key: "protein", label: "Protein", unit: "g" },
      { key: "salt", label: "Salt", unit: "g" },
    ],
  },
];

function slug(s: string) {
  return (s || "nutrition-label").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 50) || "nutrition-label";
}

export default function NutritionLabelGenerator() {
  // Rendered on the client only (see NutritionLabelTool), so the last label
  // made in this browser can be read straight into the initial state
  const [saved] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORE) || "null") as { mode?: Mode; us?: Partial<UsForm>; uk?: Partial<UkForm> } | null;
    } catch {
      return null;
    }
  });
  const [mode, setMode] = useState<Mode>(saved?.mode === "uk" ? "uk" : "us");
  const [us, setUs] = useState<UsForm>({ ...US_EXAMPLE, ...saved?.us });
  const [uk, setUk] = useState<UkForm>({ ...UK_EXAMPLE, ...saved?.uk });
  const [sodium, setSodium] = useState("");
  const [downloaded, setDownloaded] = useState<"" | "png" | "svg">("");

  // Keep the visitor's work in this browser
  useEffect(() => {
    try {
      localStorage.setItem(STORE, JSON.stringify({ mode, us, uk }));
    } catch {}
  }, [mode, us, uk]);

  const label = useMemo(() => {
    if (mode === "us") {
      return usLabelSvg({
        servingsPerContainer: us.servingsPerContainer, servingSize: us.servingSize, servingGrams: num(us.servingGrams),
        calories: num(us.calories), totalFat: num(us.totalFat), satFat: num(us.satFat), transFat: num(us.transFat),
        cholesterol: num(us.cholesterol), sodium: num(us.sodium), totalCarb: num(us.totalCarb), fiber: num(us.fiber),
        totalSugars: num(us.totalSugars), addedSugars: num(us.addedSugars), protein: num(us.protein),
        vitaminD: num(us.vitaminD), calcium: num(us.calcium), iron: num(us.iron), potassium: num(us.potassium),
      });
    }
    return ukLabelSvg({
      productName: uk.productName, portionGrams: num(uk.portionGrams), portionsPerPack: uk.portionsPerPack,
      kcal: num(uk.kcal), fat: num(uk.fat), saturates: num(uk.saturates), carbohydrate: num(uk.carbohydrate),
      sugars: num(uk.sugars), fibre: num(uk.fibre), protein: num(uk.protein), salt: num(uk.salt),
    });
  }, [mode, us, uk]);

  const productName = mode === "us" ? us.productName : uk.productName;
  const fileBase = `${slug(productName)}-${mode === "us" ? "nutrition-facts" : "nutrition-table"}`;

  function download(name: string, blob: Blob) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }
  function downloadSvg() {
    download(`${fileBase}.svg`, new Blob([label.svg], { type: "image/svg+xml" }));
    setDownloaded("svg");
  }
  function downloadPng() {
    const scale = 4; // ~4x for crisp print
    const img = new Image();
    const url = URL.createObjectURL(new Blob([label.svg], { type: "image/svg+xml" }));
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = label.width * scale;
      canvas.height = label.height * scale;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      canvas.toBlob((b) => b && download(`${fileBase}.png`, b), "image/png");
      setDownloaded("png");
    };
    img.src = url;
  }

  const fields = mode === "us" ? US_FIELDS : UK_FIELDS;
  const values: Record<string, string> = mode === "us" ? us : uk;
  const set = (key: string, v: string) => (mode === "us" ? setUs((s) => ({ ...s, [key]: v })) : setUk((s) => ({ ...s, [key]: v })));

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 sm:p-7">
        <div role="tablist" aria-label="Label format" className="grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1.5">
          {([
            ["us", "USA · FDA Nutrition Facts"],
            ["uk", "UK & EU · Nutrition table"],
          ] as const).map(([m, t]) => (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={mode === m}
              onClick={() => { setMode(m); setDownloaded(""); }}
              className={`rounded-xl px-3 py-2.5 text-sm font-black transition ${mode === m ? "bg-[#07111F] text-white shadow" : "text-slate-600 hover:text-[#07111F]"}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-slate-500">
          <span>Type your values: the label updates as you go. {mode === "us" ? "Enter amounts per serving." : "Enter amounts per 100g."}</span>
          <span className="flex gap-2">
            <a href="#label-preview" className="rounded-full bg-[#FF6A00] px-3 py-1 text-[#07111F] lg:hidden">See your label ↓</a>
            <button type="button" onClick={() => (mode === "us" ? setUs(US_EXAMPLE) : setUk(UK_EXAMPLE))} className="rounded-full border border-slate-300 px-3 py-1 hover:border-[#07111F] hover:text-[#07111F]">Example</button>
            <button
              type="button"
              onClick={() => (mode === "us" ? setUs(blank(US_EXAMPLE, ["servingsPerContainer"])) : setUk(blank(UK_EXAMPLE)))}
              className="rounded-full border border-slate-300 px-3 py-1 hover:border-[#07111F] hover:text-[#07111F]"
            >
              Clear
            </button>
          </span>
        </div>

        {fields.map((group) => (
          <fieldset key={group.title} className="mt-6">
            <legend className="text-xs font-black uppercase tracking-[0.2em] text-[#FF6A00]">{group.title}</legend>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {group.fields.map((f) => (
                <label key={String(f.key)} className={`block ${f.wide ? "col-span-2 sm:col-span-3" : ""}`}>
                  <span className={`mb-1 block text-xs font-black text-[#07111F] ${f.indent ? "pl-3 text-slate-600" : ""}`}>{f.label}</span>
                  <span className="relative block">
                    <input
                      value={values[f.key as string] ?? ""}
                      onChange={(e) => set(f.key as string, e.target.value)}
                      inputMode={f.text ? "text" : "decimal"}
                      placeholder={f.placeholder ?? "0"}
                      maxLength={f.text ? 60 : 9}
                      className={`field-input field-compact w-full ${f.unit ? "pr-11" : ""}`}
                    />
                    {f.unit && <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400">{f.unit}</span>}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}

        {mode === "uk" && (
          <div className="mt-4 flex flex-wrap items-end gap-3 rounded-2xl bg-slate-50 p-4 text-sm">
            <label className="block">
              <span className="mb-1 block text-xs font-black text-[#07111F]">Only know sodium? (per 100g)</span>
              <span className="relative block w-36">
                <input value={sodium} onChange={(e) => setSodium(e.target.value)} inputMode="decimal" placeholder="0" className="field-input field-compact w-full pr-9" />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400">g</span>
              </span>
            </label>
            <button type="button" onClick={() => sodium && setUk((s) => ({ ...s, salt: String(Math.round(num(sodium) * 2.5 * 100) / 100) }))} className="rounded-full bg-[#07111F] px-4 py-2 text-xs font-black text-white hover:bg-[#FF6A00] hover:text-[#07111F]">
              Convert to salt (× 2.5)
            </button>
          </div>
        )}
      </div>

      <div id="label-preview" className="scroll-mt-24 lg:sticky lg:top-24">
        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-5 sm:p-7">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#007C91]">Live preview</p>
            <p className="text-xs font-bold text-slate-500">Rounded to {mode === "us" ? "FDA" : "EU"} rules</p>
          </div>
          <div className="mt-4 flex justify-center overflow-x-auto rounded-2xl bg-white p-4 shadow-inner">
            <div className="w-full max-w-[340px]" style={{ maxWidth: mode === "uk" && num(uk.portionGrams) > 0 ? 440 : 340 }} dangerouslySetInnerHTML={{ __html: label.svg.replace("<svg ", '<svg style="width:100%;height:auto" ') }} />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <button type="button" onClick={downloadPng} className="rounded-full bg-[#FF6A00] px-5 py-3 text-sm font-black text-[#07111F] shadow-lg shadow-orange-500/20 transition hover:bg-[#007C91] hover:text-white">
              Download PNG
            </button>
            <button type="button" onClick={downloadSvg} className="rounded-full border-2 border-[#07111F] px-5 py-3 text-sm font-black text-[#07111F] transition hover:bg-[#07111F] hover:text-white">
              Download SVG (vector)
            </button>
          </div>
          <p className="mt-3 text-center text-xs font-bold text-slate-500">Free · no sign-up · high resolution PNG and print-ready SVG</p>
        </div>

        {downloaded && <AfterDownload mode={mode} productName={productName} onClose={() => setDownloaded("")} />}
      </div>
    </div>
  );
}

function AfterDownload({ mode, productName, onClose }: { mode: Mode; productName: string; onClose: () => void }) {
  const [state, setState] = useState<"ask" | "form" | "sending" | "done">("ask");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const what = String(form.get("product") || "Labels & Stickers");
    form.set("message", `Made a ${mode === "us" ? "US FDA Nutrition Facts" : "UK/EU nutrition"} label${productName ? ` for "${productName}"` : ""} with the free generator. Wants a price for ${what.toLowerCase()}.`);
    form.set("leadSource", ["nutrition-label-generator", readLeadSource()].filter(Boolean).join(" | "));
    setState("sending");
    try {
      const response = await fetch("/api/quote", { method: "POST", body: form });
      const result = (await response.json().catch(() => ({}))) as { success?: boolean; message?: string };
      if (!response.ok || !result.success) throw new Error(result.message || "We could not send your request. Please try again.");
      setState("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "We could not send your request. Please try again.");
      setState("form");
    }
  }

  return (
    <section aria-live="polite" className="relative mt-5 rounded-[2rem] border-2 border-[#FF6A00] bg-white p-6">
      <button type="button" onClick={onClose} aria-label="Close" className="absolute right-4 top-3 text-xl font-black text-slate-400 hover:text-[#07111F]">×</button>
      {state === "done" ? (
        <>
          <h3 className="text-xl font-black text-[#07111F]">Thanks! We&apos;ll be in touch shortly</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">Within 10-15 minutes we&apos;ll email you to confirm your label details. Once you confirm, your exact price (shipping included) follows within 10-15 minutes.</p>
          <Review />
        </>
      ) : (
        <>
          <h3 className="text-xl font-black text-[#07111F]">✓ Your label is ready</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Want it printed? We print product labels, stickers and food boxes with your nutrition panel, from 100 pieces, shipped to the USA, UK and Europe.
          </p>
          {state === "ask" ? (
            <div className="mt-4 flex flex-wrap gap-3">
              <button type="button" onClick={() => setState("form")} className="rounded-full bg-[#07111F] px-5 py-2.5 text-sm font-black text-white hover:bg-[#FF6A00] hover:text-[#07111F]">
                Get a printing price
              </button>
              <a href="/design-services" className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-black text-[#07111F] hover:border-[#07111F]">
                Need the full label designed?
              </a>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-4 grid grid-cols-2 gap-3">
              <div aria-hidden="true" className="pointer-events-none absolute left-[-10000px] h-px w-px overflow-hidden">
                <input name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
              </div>
              <Small label="Print it as">
                <select name="product" className="field-input field-compact">
                  <option>Labels & Stickers</option>
                  <option>Food Packaging</option>
                  <option>Bakery Boxes</option>
                  <option>Butter Paper</option>
                </select>
              </Small>
              <Small label="Quantity">
                <select name="quantity" defaultValue="500" className="field-input field-compact">
                  {["100", "250", "500", "1000", "2500", "5000"].map((q) => <option key={q} value={q}>{Number(q).toLocaleString("en-US")}</option>)}
                </select>
              </Small>
              <Small label="Name"><input name="name" required minLength={2} autoComplete="name" className="field-input field-compact" /></Small>
              <Small label="Email"><input name="email" type="email" required autoComplete="email" className="field-input field-compact" /></Small>
              <Small label="Ship to">
                <select name="country" defaultValue={mode === "us" ? "USA" : "UK"} className="field-input field-compact">
                  {["USA", "UK", "Europe", "Canada", "Australia", "Other"].map((c) => <option key={c}>{c}</option>)}
                </select>
              </Small>
              <div className="flex items-end">
                <button type="submit" disabled={state === "sending"} className="w-full rounded-full bg-[#FF6A00] px-5 py-2.5 text-sm font-black text-[#07111F] hover:bg-[#e65f00] disabled:opacity-60">
                  {state === "sending" ? "Sending…" : "Get my price"}
                </button>
              </div>
              {error && <p role="alert" className="col-span-2 text-xs font-bold text-red-700">{error}</p>}
            </form>
          )}
          <Review />
        </>
      )}
    </section>
  );
}

function Review() {
  return (
    <p className="mt-5 border-t border-slate-100 pt-4 text-sm text-slate-600">
      Was this tool helpful?{" "}
      <a href={TRUSTPILOT} target="_blank" rel="noopener noreferrer" className="font-black text-[#007C91] hover:text-[#FF6A00]">
        Leave us a quick review on Trustpilot ★
      </a>
    </p>
  );
}

function Small({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-black text-[#07111F]">{label}</span>
      {children}
    </label>
  );
}

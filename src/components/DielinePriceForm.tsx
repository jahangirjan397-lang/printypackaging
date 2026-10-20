"use client";

import { useState, type FormEvent } from "react";
import { readDielineLead, trackDieline } from "@/components/DielineLeadGate";
import { readLeadSource } from "@/lib/leadSource";

const QUANTITIES = ["100", "250", "500", "1000", "2500", "5000", "10000"];
const COUNTRIES = ["USA", "UK", "Europe", "Australia", "Canada", "UAE", "Other"];
const MATERIALS = {
  card: ["SBS / Bleach Card 350 GSM", "SBS / Bleach Card 300 GSM", "SBS / Bleach Card 400 GSM", "Kraft Card 350 GSM", "Art Card 350 GSM", "Not sure, suggest for me"],
  flute: ["E-flute corrugated, white", "E-flute corrugated, kraft", "B-flute corrugated (heavier items)", "Not sure, suggest for me"],
};
const PRINTING = ["CMYK Full Color Printing (outside)", "CMYK inside + outside", "1 Color logo (outside)", "2 Color (outside)", "No printing / plain", "Not sure, suggest for me"];
const FINISHES = ["Matte Lamination", "Gloss Lamination", "Soft Touch Lamination", "Foil logo + Matte Lamination", "Spot UV + Matte Lamination", "No lamination (aqueous coating)", "Not sure, suggest for me"];
const WHATSAPP = "306985024723";

// "Get my price" under the generator: the box style and size come from the
// generator, the buyer adds material, printing, finish and quantity. It posts to
// the same /api/quote as the website form, so the lead lands in the ERP and the
// auto quote (estimation sheet) emails the price within 10-15 minutes.
export default function DielinePriceForm({ styleName, flute, sizeText }: { styleName: string; flute: boolean; sizeText: string }) {
  const materials = MATERIALS[flute ? "flute" : "card"];
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");
  const [email, setEmail] = useState(() => readDielineLead());
  const [sentTo, setSentTo] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const files = form.getAll("artworkFiles").filter((f): f is File => typeof f !== "string" && f.size > 0);
    if (files.reduce((t, f) => t + f.size, 0) > 4_000_000) {
      setError("Artwork files must be 4 MB or less in total. You can also send them later by email.");
      return;
    }
    const extra = String(form.get("extra") || "").trim();
    form.delete("extra");
    form.set("product", styleName);
    form.set("size", sizeText);
    form.set("artworkStatus", files.length ? "Artwork attached" : "No artwork yet");
    form.set("message", [`Priced from the dieline generator (${styleName} ${sizeText}).`, extra ? `Extra requirements: ${extra}` : ""].filter(Boolean).join(" "));
    form.set("leadSource", ["dieline-generator-price", readLeadSource()].filter(Boolean).join(" | "));
    setState("sending");
    try {
      const response = await fetch("/api/quote", { method: "POST", body: form });
      const result = (await response.json().catch(() => ({}))) as { success?: boolean; message?: string };
      if (!response.ok || !result.success) throw new Error(result.message || "We could not send your request. Please try again.");
      trackDieline("generate_lead", { form_name: "dieline_generator_price" });
      setSentTo(String(form.get("email") || ""));
      setState("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "We could not send your request. Please try again.");
      setState("idle");
    }
  }

  const waText = encodeURIComponent(`Hello Printy Packaging, I made a dieline for a ${styleName} ${sizeText} and I need help with my order.`);
  const mailHref = `mailto:sales@printypackaging.com?subject=${encodeURIComponent(`${styleName} ${sizeText}: my requirements`)}`;
  const contact = (
    <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3 text-xs font-bold">
      <span className="text-slate-500">Special requirements? Talk to our team:</span>
      <button type="button" onClick={() => (window as unknown as { Tawk_API?: { maximize?: () => void } }).Tawk_API?.maximize?.()} className="rounded-full border border-slate-300 bg-white px-3 py-1.5 hover:border-[#07111F]">Chat</button>
      <a href={`https://wa.me/${WHATSAPP}?text=${waText}`} target="_blank" rel="noreferrer" className="rounded-full bg-[#25D366] px-3 py-1.5 text-[#07111F]">WhatsApp</a>
      <a href={mailHref} className="rounded-full border border-slate-300 bg-white px-3 py-1.5 hover:border-[#07111F]">Email</a>
    </div>
  );

  if (state === "done") {
    return (
      <section className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
        <h2 className="text-lg font-black text-emerald-900">Your price is on its way</h2>
        <p className="mt-1 text-sm font-bold text-emerald-900">
          We are pricing your {styleName} {sizeText} now. It will reach {sentTo || "your inbox"} within 10-15 minutes, with shipping included.
        </p>
        {contact}
      </section>
    );
  }

  return (
    <section aria-labelledby="price-title" className="mt-6 rounded-2xl border-2 border-[#FF6A00] bg-white p-4 sm:p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 id="price-title" className="text-lg font-black text-[#07111F]">Get the price for this box</h2>
        <p className="text-xs font-bold text-slate-500">{styleName}, {sizeText} · price by email within 10-15 minutes, shipping included</p>
      </div>
      <form onSubmit={submit} className="mt-3">
        <div aria-hidden="true" className="pointer-events-none absolute left-[-10000px] h-px w-px overflow-hidden">
          <input name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-[7rem_8rem_1fr_1.3fr_auto] lg:items-end">
          <Field label="Quantity">
            <select name="quantity" defaultValue="500" className="field-input field-compact">
              {QUANTITIES.map((q) => <option key={q} value={q}>{Number(q).toLocaleString("en-US")}</option>)}
            </select>
          </Field>
          <Field label="Ship to">
            <select name="country" defaultValue="USA" className="field-input field-compact">
              {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Name">
            <input name="name" required minLength={2} autoComplete="name" className="field-input field-compact" />
          </Field>
          <Field label="Email">
            <input name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" className="field-input field-compact" />
          </Field>
          <button type="submit" disabled={state === "sending"} className="col-span-2 rounded-lg bg-[#FF6A00] px-6 py-2.5 text-sm font-black text-[#07111F] hover:bg-[#e65f00] disabled:opacity-60 lg:col-span-1">
            {state === "sending" ? "Sending…" : "Get my price"}
          </button>
        </div>
        {error && <p role="alert" className="mt-2 text-xs font-bold text-red-700">{error}</p>}
        <details className="group mt-3">
          <summary className="cursor-pointer list-none text-xs font-black text-[#007C91] hover:text-[#FF6A00]">
            <span className="group-open:hidden">+ Material, printing, finish, artwork (optional)</span>
            <span className="hidden group-open:inline">− Hide options</span>
            <span className="ml-1 font-bold text-slate-400 group-open:hidden">· standard: {materials[0]}, full colour, matte</span>
          </summary>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="Material / board">
              <select name="material" defaultValue={materials[0]} className="field-input field-compact">
                {materials.map((m) => <option key={m}>{m}</option>)}
              </select>
            </Field>
            <Field label="Printing">
              <select name="printing" defaultValue={PRINTING[0]} className="field-input field-compact">
                {PRINTING.map((p) => <option key={p}>{p}</option>)}
              </select>
            </Field>
            <Field label="Finish">
              <select name="finishing" defaultValue={FINISHES[0]} className="field-input field-compact">
                {FINISHES.map((f) => <option key={f}>{f}</option>)}
              </select>
            </Field>
            <Field label="WhatsApp">
              <input name="whatsapp" type="tel" autoComplete="tel" className="field-input field-compact" />
            </Field>
            <Field label="Artwork">
              <input type="file" name="artworkFiles" multiple accept=".pdf,.ai,.eps,.psd,.svg,.png,.jpg,.jpeg,.webp,.tif,.tiff,.cdr" className="block w-full text-xs font-bold text-slate-600 file:mr-2 file:rounded-full file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:font-black" />
            </Field>
            <Field label="Anything else? (window, inside print, deadline…)">
              <input name="extra" maxLength={1500} className="field-input field-compact" />
            </Field>
          </div>
        </details>
      </form>
      {contact}
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-black text-[#07111F]">{label}</span>
      {children}
    </label>
  );
}

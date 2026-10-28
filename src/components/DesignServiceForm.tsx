"use client";

import { useState, type FormEvent } from "react";
import { readLeadSource } from "@/lib/leadSource";

export const DESIGN_SERVICES = [
  "Packaging design (box, bag, sleeve)",
  "Label & sticker design",
  "Logo & brand identity",
  "Brand + packaging (full kit)",
  "Amazon listing images & A+ content",
  "Catalog, brochure, flyer or menu",
  "Social media & ad graphics",
  "Print-ready file fix (dieline, bleed, CMYK, foil layers)",
  "Monthly design partner (agencies & growing brands)",
  "Trade / reseller account (designers, agencies, print brokers)",
  "Other design work",
];
const COUNTRIES = ["USA", "UK", "Europe", "Australia", "Canada", "UAE", "Other"];

// Design-only inquiries post to the same /api/quote as the packaging forms, so
// the lead lands in the ERP. The product says "Design service: …" and the
// quantity is one project, so nobody gets asked for a box quantity.
export default function DesignServiceForm() {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");
  const [sentTo, setSentTo] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const files = form.getAll("artworkFiles").filter((f): f is File => typeof f !== "string" && f.size > 0);
    if (files.reduce((t, f) => t + f.size, 0) > 4_000_000) {
      setError("Files must be 4 MB or less in total. You can also send them later by email.");
      return;
    }
    const service = String(form.get("service") || DESIGN_SERVICES[0]);
    const details = String(form.get("details") || "").trim();
    form.delete("service");
    form.delete("details");
    form.set("product", `Design service: ${service}`);
    form.set("quantity", "1 design project");
    form.set("artworkStatus", files.length ? "References attached" : "No files yet");
    form.set("message", [`Design-only request: ${service}.`, details].filter(Boolean).join(" "));
    form.set("leadSource", ["design-service", readLeadSource()].filter(Boolean).join(" | "));
    setState("sending");
    try {
      const response = await fetch("/api/quote", { method: "POST", body: form });
      const result = (await response.json().catch(() => ({}))) as { success?: boolean; message?: string };
      if (!response.ok || !result.success) throw new Error(result.message || "We could not send your request. Please try again.");
      setSentTo(String(form.get("email") || ""));
      setState("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "We could not send your request. Please try again.");
      setState("idle");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-7 text-emerald-900">
        <h3 className="text-2xl font-black">Thanks, your design brief is in</h3>
        <p className="mt-3 leading-7">
          A designer will reply to {sentTo || "your inbox"} within 10-15 minutes with questions or a quote for your project.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
      <div aria-hidden="true" className="pointer-events-none absolute left-[-10000px] h-px w-px overflow-hidden">
        <input name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="What do you need designed? *" wide>
          <select name="service" required defaultValue={DESIGN_SERVICES[0]} className="field-input field-compact">
            {DESIGN_SERVICES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </Field>
        <Field label="Name *">
          <input name="name" required minLength={2} autoComplete="name" className="field-input field-compact" />
        </Field>
        <Field label="Email *">
          <input name="email" type="email" required autoComplete="email" className="field-input field-compact" />
        </Field>
        <Field label="Your website or Instagram">
          <input name="companyWebsite" inputMode="url" autoComplete="url" maxLength={200} placeholder="brand.com or @instagram" className="field-input field-compact" />
        </Field>
        <Field label="Country">
          <select name="country" defaultValue="USA" className="field-input field-compact">
            {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Tell us about the project" wide>
          <textarea name="details" rows={4} maxLength={1500} placeholder="Product, sizes, style you like, deadline…" className="field-input" />
        </Field>
        <Field label="Logo, references or current design (optional)" wide>
          <input type="file" name="artworkFiles" multiple accept=".pdf,.ai,.eps,.psd,.svg,.png,.jpg,.jpeg,.webp,.tif,.tiff" className="block w-full text-xs font-bold text-slate-600 file:mr-2 file:rounded-full file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:font-black" />
        </Field>
      </div>
      {error && <p role="alert" className="mt-3 text-sm font-bold text-red-700">{error}</p>}
      <button type="submit" disabled={state === "sending"} className="mt-5 w-full rounded-full bg-[#FF6A00] px-7 py-3 text-sm font-black text-[#07111F] shadow-xl shadow-orange-500/25 transition hover:bg-[#007C91] hover:text-white disabled:opacity-60">
        {state === "sending" ? "Sending…" : "Get a design quote"}
      </button>
      <p className="mt-3 text-center text-xs font-bold text-slate-500">Reply within 10-15 minutes · no obligation</p>
    </form>
  );
}

function Field({ label, wide = false, children }: { label: string; wide?: boolean; children: React.ReactNode }) {
  return (
    <label className={`block ${wide ? "sm:col-span-2" : ""}`}>
      <span className="mb-1 block text-xs font-black text-[#07111F]">{label}</span>
      {children}
    </label>
  );
}

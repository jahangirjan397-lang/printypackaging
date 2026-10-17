"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import { sendGAEvent } from "@next/third-parties/google";
import { isLiveHostname, readAnalyticsConsent } from "@/lib/analyticsConsent";
import { readLeadSource } from "@/lib/leadSource";

// One-time "where should we send updates" form shown before the first
// dieline download (generator or library file). The lead goes to /api/quote
// like any quote request; after that, downloads are instant in this browser.

const LEAD_KEY = "printy_dieline_lead";

export function readDielineLead() {
  try { return window.localStorage.getItem(LEAD_KEY) || ""; } catch { return ""; }
}
function saveLead(email: string) {
  try { window.localStorage.setItem(LEAD_KEY, email); } catch { /* private mode */ }
}
export function trackDieline(event: string, params: Record<string, string>) {
  if (isLiveHostname(window.location.hostname) && readAnalyticsConsent() === "granted") sendGAEvent("event", event, params);
}

export default function DielineLeadGate({
  what,
  styleName,
  sizeText,
  material,
  source,
  onDone,
  onClose,
}: {
  what: string; // e.g. "PDF"
  styleName: string;
  sizeText?: string;
  material?: string;
  source: string; // e.g. "dieline-generator"
  onDone: () => void;
  onClose: () => void;
}) {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  // Only people who tick the box are sent a price (owner 2026-10-17)
  const [wantsPrice, setWantsPrice] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const f = new FormData(event.currentTarget);
    if (String(f.get("website") || "")) return;
    setSending(true);
    setError("");
    const wantsQuote = f.get("wantsQuote") === "on";
    const label = sizeText ? `${styleName} dieline (${sizeText})` : `${styleName} dieline`;
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(f.get("name") || ""),
          email: String(f.get("email") || ""),
          whatsapp: String(f.get("whatsapp") || ""),
          country: String(f.get("country") || ""),
          product: `Free dieline: ${styleName}`,
          size: sizeText || "",
          quantity: wantsQuote ? String(f.get("quantity") || "") : "",
          material: material || "",
          message: wantsQuote
            ? `Downloaded a free ${label} and would like a printing price.`
            : `Downloaded a free ${label}. No price requested yet.`,
          leadSource: `${source} | ${readLeadSource()}`.slice(0, 200),
        }),
      });
      let out: { success?: boolean; message?: string } = {};
      try { out = await res.json(); } catch { /* handled below */ }
      if (!res.ok || !out.success) throw new Error(out.message || "Could not send right now. Please try again.");
      saveLead(String(f.get("email")));
      trackDieline("generate_lead", { form_name: source, product: styleName });
      onDone();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#07111F]/60 p-4" role="dialog" aria-modal="true" aria-labelledby="dl-gate-title">
      <form onSubmit={submit} className="relative w-full max-w-md rounded-[1.5rem] border-t-4 border-[#FF6A00] bg-white p-6 text-[#07111F] shadow-2xl">
        <div aria-hidden="true" className="pointer-events-none absolute left-[-10000px] h-px w-px overflow-hidden">
          <input name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
        </div>
        <h2 id="dl-gate-title" className="text-xl font-black">Where should we send updates?</h2>
        <p className="mt-1 text-sm font-bold text-slate-600">Your {what} downloads right after. One time only, all future downloads are instant.</p>
        <div className="mt-4 space-y-2.5">
          <input name="name" required minLength={2} autoComplete="name" placeholder="Your name *" className="field-input field-compact" />
          <input name="email" type="email" required autoComplete="email" placeholder="you@company.com *" className="field-input field-compact" />
          <input name="whatsapp" type="tel" required pattern="[+0-9 ()-]{7,}" title="Phone number with country code" autoComplete="tel" placeholder="WhatsApp / phone with country code *" className="field-input field-compact" />
          <select name="country" className="field-input field-compact" defaultValue="USA">
            {["USA", "UK", "Canada", "Europe", "Australia", "UAE", "Other"].map((c) => <option key={c}>{c}</option>)}
          </select>
          <label className="flex items-start gap-2 text-sm font-bold text-slate-700">
            <input name="wantsQuote" type="checkbox" className="mt-1" checked={wantsPrice} onChange={(e) => setWantsPrice(e.target.checked)} />
            Also send me a price to print this box
          </label>
          {wantsPrice && (
            <select name="quantity" required className="field-input field-compact" defaultValue="">
              <option value="" disabled>How many boxes? *</option>
              {["100", "250", "500", "1,000", "2,500", "5,000+"].map((q) => <option key={q} value={q}>{q} boxes</option>)}
            </select>
          )}
        </div>
        {error && <p role="alert" className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-sm font-bold text-red-700">{error}</p>}
        <div className="mt-5 flex items-center justify-between gap-3">
          <button type="button" onClick={onClose} className="text-sm font-black text-slate-500 hover:text-[#07111F]">Cancel</button>
          <button type="submit" disabled={sending} className="rounded-full bg-[#CC4E00] px-6 py-3 text-sm font-black text-white shadow-lg shadow-orange-500/25 transition hover:bg-[#007C91] disabled:opacity-70">
            {sending ? "Sending…" : `Get my ${what} →`}
          </button>
        </div>
        <p className="mt-3 text-[11px] font-bold text-slate-400">We only use your email and number to reply about packaging. See our <Link href="/privacy-policy" className="underline">privacy policy</Link>.</p>
      </form>
    </div>
  );
}

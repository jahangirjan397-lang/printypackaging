"use client";

import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { sendGAEvent } from "@next/third-parties/google";
import { isLiveHostname, readAnalyticsConsent } from "@/lib/analyticsConsent";
import { readLeadSource } from "@/lib/leadSource";

// Exit popup (owner 2026-11-18): a desktop visitor who is about to leave
// without asking anything gets one short offer: "send your size, get the exact
// price in 10-15 minutes". Rules so it helps and never annoys:
// - desktop only (mouse leaves through the top of the window); phones never see it
// - only after 25 seconds on the site, at most once every 7 days
// - never for someone who already sent a form or started a chat
// - never on pages that already ask for details (contact, thank-you, tools)
// Leads arrive in the sheet with Source "Exit popup | <channel>".

const SHOWN_KEY = "printy-exit-shown";
const LEAD_KEY = "printy-lead-sent";
const START_KEY = "printy-visit-start";
const WAIT_MS = 25_000;
const COOLDOWN_MS = 7 * 86_400_000;
const SKIP_PATHS = [/^\/contact/, /^\/thank-you/, /^\/dieline/, /^\/nutrition-label-generator/, /^\/design-services/, /^\/admin/, /^\/launch-checklist/, /^\/missing-items/];

const needs = [
  "Rigid / gift boxes",
  "Mailer boxes",
  "Folding cartons / product boxes",
  "Food boxes & takeaway",
  "Butter / greaseproof paper",
  "Paper bags",
  "Labels & stickers",
  "Something else",
];

function store(kind: "local" | "session") {
  try {
    return kind === "local" ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }
}

function chatStarted() {
  const tawk = (window as unknown as { Tawk_API?: { isChatOngoing?: () => boolean; isVisitorEngaged?: () => boolean } }).Tawk_API;
  try {
    return Boolean(tawk?.isChatOngoing?.() || tawk?.isVisitorEngaged?.());
  } catch {
    return false;
  }
}

export default function ExitIntentPopup() {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [product, setProduct] = useState("");
  const firstField = useRef<HTMLInputElement>(null);

  // Someone who reached the thank-you page has already sent a request.
  useEffect(() => {
    if (pathname.startsWith("/thank-you")) store("local")?.setItem(LEAD_KEY, String(Date.now()));
    const session = store("session");
    if (session && !session.getItem(START_KEY)) session.setItem(START_KEY, String(Date.now()));
  }, [pathname]);

  useEffect(() => {
    if (open) return;
    if (SKIP_PATHS.some((p) => p.test(pathname))) return;
    if (!window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches) return;

    function onLeave(event: MouseEvent) {
      if (event.relatedTarget || event.clientY > 8) return;
      const local = store("local");
      const started = Number(store("session")?.getItem(START_KEY) || Date.now());
      if (Date.now() - started < WAIT_MS) return;
      if (local?.getItem(LEAD_KEY)) return;
      if (Date.now() - Number(local?.getItem(SHOWN_KEY) || 0) < COOLDOWN_MS) return;
      if (chatStarted()) return;
      if (document.querySelector("[role=dialog][aria-modal=true]")) return;

      // On a product page, start with that product.
      const h1 = document.querySelector("h1")?.textContent?.trim() || "";
      setProduct(pathname.startsWith("/products/") && h1 ? h1.slice(0, 80) : "");
      local?.setItem(SHOWN_KEY, String(Date.now()));
      setOpen(true);
      if (isLiveHostname(window.location.hostname) && readAnalyticsConsent() === "granted") {
        sendGAEvent("event", "exit_popup_shown", { page: pathname });
      }
    }

    document.documentElement.addEventListener("mouseout", onLeave);
    return () => document.documentElement.removeEventListener("mouseout", onLeave);
  }, [pathname, open]);

  useEffect(() => {
    if (!open) return;
    firstField.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const need = String(form.get("need") || "");
    form.set("product", need === "Something else" || !need ? product || "Custom packaging" : need);
    form.set("message", ["Sent from the exit popup: please send the exact price.", String(form.get("note") || "")].filter(Boolean).join(" "));
    form.delete("need");
    form.delete("note");
    form.set("leadSource", ["Exit popup", readLeadSource()].filter(Boolean).join(" | ").slice(0, 200));
    setSending(true);
    try {
      const response = await fetch("/api/quote", { method: "POST", body: form });
      let result: { success?: boolean; message?: string; quoteId?: string } = {};
      try {
        result = JSON.parse(await response.text());
      } catch {
        throw new Error("We could not send this right now. Please email sales@printypackaging.com.");
      }
      if (!response.ok || !result.success) throw new Error(result.message || "Request failed.");
      store("local")?.setItem(LEAD_KEY, String(Date.now()));
      if (isLiveHostname(window.location.hostname) && readAnalyticsConsent() === "granted") {
        sendGAEvent("event", "generate_lead", { form_name: "exit_popup", quote_id: result.quoteId || "not_available" });
      }
      setOpen(false);
      router.push("/thank-you");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  }

  if (!open) return null;

  const productOption = product && !needs.includes(product) ? product : "";

  return (
    <div
      className="fixed inset-0 z-[1000001] flex items-center justify-center bg-[#07111F]/55 px-4"
      onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-popup-title"
        className="relative w-full max-w-md rounded-3xl bg-white p-6 text-[#07111F] shadow-[0_30px_80px_rgba(7,17,31,0.35)]"
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-lg font-black text-slate-400 transition hover:bg-slate-100 hover:text-[#07111F]"
        >
          ×
        </button>

        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#FF6A00]">Before you go</p>
        <h2 id="exit-popup-title" className="mt-2 pr-8 text-2xl font-black leading-tight">
          Get your exact price in 10-15 minutes
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Tell us what you need. We check the size and details with you, then email the exact price with shipping included. From 100 pcs, free dieline and PDF proof.
        </p>

        <form onSubmit={submit} className="mt-5 space-y-3">
          <input name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" className="hidden" aria-hidden="true" />
          <div className="grid grid-cols-2 gap-3">
            <input ref={firstField} name="name" required minLength={2} autoComplete="name" placeholder="Your name" className="field-input field-compact" />
            <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" className="field-input field-compact" />
          </div>
          <select name="need" defaultValue={productOption} className="field-input field-compact" aria-label="What do you need?">
            {productOption ? <option value={productOption}>{productOption}</option> : <option value="">What do you need?</option>}
            {needs.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          <input name="note" maxLength={160} placeholder="Size and quantity, if you know them (optional)" className="field-input field-compact" />

          {error && <p className="text-sm font-bold text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={sending}
            className="w-full rounded-full bg-[#FF6A00] px-6 py-3 text-sm font-black text-[#07111F] shadow-lg shadow-orange-500/20 transition hover:bg-[#007C91] hover:text-white disabled:opacity-60"
          >
            {sending ? "Sending…" : "Send me the price"}
          </button>
          <button type="button" onClick={() => setOpen(false)} className="w-full text-xs font-bold text-slate-400 hover:text-slate-600">
            No thanks
          </button>
        </form>
        <p className="mt-3 text-center text-[11px] text-slate-400">One reply from our packaging team. No newsletters.</p>
      </div>
    </div>
  );
}

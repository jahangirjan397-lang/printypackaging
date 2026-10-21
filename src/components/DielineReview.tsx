"use client";

import { useEffect, useRef, useState } from "react";

const DONE_KEY = "pp-dieline-reviewed";

// Shown after a dieline download (or from the follow-up email link ?review=1).
// The review goes to the owner; it is published only after approval.
export default function DielineReview({ styleName, sizeText, downloaded = false }: { styleName: string; sizeText: string; downloaded?: boolean }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">(() => {
    try {
      return localStorage.getItem(DONE_KEY) ? "done" : "idle";
    } catch {
      return "idle";
    }
  });
  const [error, setError] = useState("");
  const box = useRef<HTMLElement>(null);

  // bring the stars into view right after a download, so visitors see them
  useEffect(() => {
    if (state !== "done") box.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function send() {
    if (!rating) {
      setError("Please choose 1 to 5 stars.");
      return;
    }
    setError("");
    setState("sending");
    try {
      const response = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, comment, name, country, consent, style: styleName, size: sizeText, website: "" }),
      });
      const result = (await response.json().catch(() => ({}))) as { success?: boolean; message?: string };
      if (!response.ok || !result.success) throw new Error(result.message || "Could not send your review.");
      try {
        localStorage.setItem(DONE_KEY, "1");
      } catch {
        /* private mode */
      }
      setState("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not send your review.");
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-900">
        Thank you for your feedback! It helps other designers and brands find a dieline that fits.
      </div>
    );
  }

  const shown = hover || rating;
  return (
    <section ref={box} aria-labelledby="dieline-review-title" className="mt-4 rounded-2xl border-2 border-[#FF6A00] bg-orange-50 px-4 py-5 text-center sm:px-6">
      {downloaded && <p className="text-xs font-black uppercase tracking-wide text-emerald-700">✓ Your dieline is downloading</p>}
      <h3 id="dieline-review-title" className="mt-1 text-lg font-black text-[#07111F] sm:text-xl">How was your {styleName} dieline?</h3>
      <p className="mt-0.5 text-xs font-bold text-slate-600">Tap a star. It takes 5 seconds and helps other designers.</p>
      <div className="mt-3 flex items-center justify-center gap-1.5" role="radiogroup" aria-label="Your rating">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={rating === n}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
            onClick={() => setRating(n)}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            className={`text-5xl leading-none transition hover:scale-110 ${n <= shown ? "text-[#FF6A00]" : "text-slate-300"}`}
          >
            ★
          </button>
        ))}
      </div>
      {rating > 0 && (
        <div className="mx-auto mt-4 grid max-w-xl gap-2.5 text-left sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-xs font-black text-[#07111F]">Your review <span className="font-bold text-slate-400">(optional)</span></span>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={600}
              rows={3}
              placeholder="Did it fit? What did you use it for?"
              className="field-input field-compact w-full"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-black text-[#07111F]">Name or initials <span className="font-bold text-slate-400">(optional)</span></span>
            <input value={name} onChange={(e) => setName(e.target.value)} maxLength={60} className="field-input field-compact" />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-black text-[#07111F]">Country <span className="font-bold text-slate-400">(optional)</span></span>
            <input value={country} onChange={(e) => setCountry(e.target.value)} maxLength={60} className="field-input field-compact" />
          </label>
          <label className="flex items-start gap-2 text-xs font-bold text-slate-600 sm:col-span-2">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5" />
            You can show my review (name or initials, country and rating) on printypackaging.com
          </label>
          <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
            <button
              type="button"
              onClick={send}
              disabled={state === "sending"}
              className="rounded-lg bg-[#FF6A00] px-4 py-2 text-sm font-black text-[#07111F] hover:bg-[#e65f00] disabled:opacity-60"
            >
              {state === "sending" ? "Sending…" : "Send review"}
            </button>
            {error && <span role="alert" className="text-xs font-bold text-red-700">{error}</span>}
          </div>
        </div>
      )}
    </section>
  );
}

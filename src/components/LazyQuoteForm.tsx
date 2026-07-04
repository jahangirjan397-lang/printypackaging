"use client";

import dynamic from "next/dynamic";

const QuoteForm = dynamic(() => import("@/components/QuoteForm"), {
  ssr: false,
  loading: () => (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 h-6 w-40 animate-pulse rounded bg-slate-200" />
      <div className="space-y-3">
        <div className="h-11 animate-pulse rounded-xl bg-slate-100" />
        <div className="h-11 animate-pulse rounded-xl bg-slate-100" />
        <div className="h-11 animate-pulse rounded-xl bg-slate-100" />
        <div className="h-24 animate-pulse rounded-xl bg-slate-100" />
        <div className="h-12 w-full animate-pulse rounded-xl bg-slate-200" />
      </div>
    </div>
  ),
});

export default function LazyQuoteForm() {
  return <QuoteForm />;
}
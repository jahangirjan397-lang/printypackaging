"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import {
  isLiveHostname,
  readAnalyticsConsent,
  saveAnalyticsConsent,
} from "@/lib/analyticsConsent";

const measurementId = "G-MLLCT7GVJM";
// Microsoft Clarity project ID (session recordings and heatmaps).
// Set NEXT_PUBLIC_CLARITY_ID in the hosting environment to enable it.
const clarityId = (process.env.NEXT_PUBLIC_CLARITY_ID ?? "").replace(/[^a-z0-9]/gi, "");

type ConsentStatus = "granted" | "denied" | null;

export default function AnalyticsConsent() {
  const [isReady, setIsReady] = useState(false);
  const [isLiveWebsite, setIsLiveWebsite] = useState(false);
  const [consent, setConsent] = useState<ConsentStatus>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setIsLiveWebsite(isLiveHostname(window.location.hostname));

      const savedConsent = readAnalyticsConsent();

      if (savedConsent) {
        setConsent(savedConsent);
      }

      setIsReady(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  function saveConsent(value: Exclude<ConsentStatus, null>) {
    saveAnalyticsConsent(value);
    setConsent(value);
  }

  if (!isReady) {
    return null;
  }

  return (
    <>
      {consent === "granted" && isLiveWebsite && (
        <GoogleAnalytics gaId={measurementId} />
      )}

      {consent === "granted" && isLiveWebsite && clarityId && (
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script",${JSON.stringify(clarityId)});`}
        </Script>
      )}

      {consent === null && (
        <div
          role="dialog"
          aria-labelledby="analytics-consent-title"
          aria-describedby="analytics-consent-description"
          className="fixed bottom-20 left-1/2 z-[1000000] w-[calc(100%-1.5rem)] max-w-2xl -translate-x-1/2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[#07111F] shadow-[0_18px_55px_rgba(7,17,31,0.24)] sm:bottom-4"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p
                id="analytics-consent-title"
                className="text-sm font-black"
              >
                Privacy & analytics
              </p>

              <p
                id="analytics-consent-description"
                className="mt-1 text-xs leading-5 text-slate-600"
              >
                Optional analytics help us improve products and quote support.
                Essential features always work.
                <Link
                  href="/privacy-policy"
                  className="ml-1 font-black text-[#007C91] hover:text-[#FF6A00]"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>

            <div className="grid shrink-0 grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => saveConsent("denied")}
                className="rounded-full border border-slate-300 px-4 py-2 text-xs font-black transition hover:border-[#07111F] hover:bg-slate-100"
              >
                Essential Only
              </button>

              <button
                type="button"
                onClick={() => saveConsent("granted")}
                className="rounded-full bg-[#FF6A00] px-4 py-2 text-xs font-black text-white shadow-md shadow-orange-500/20 transition hover:bg-[#007C91]"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

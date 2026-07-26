"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

const measurementId = "G-MLLCT7GVJM";
const consentKey = "printy-analytics-consent";

type ConsentStatus = "granted" | "denied" | null;

export default function AnalyticsConsent() {
  const [isReady, setIsReady] = useState(false);
  const [isLiveWebsite, setIsLiveWebsite] = useState(false);
  const [consent, setConsent] = useState<ConsentStatus>(null);

  useEffect(() => {
    const hostname = window.location.hostname;

    setIsLiveWebsite(
      hostname === "printypackaging.com" ||
        hostname === "www.printypackaging.com",
    );

    const savedConsent = window.localStorage.getItem(consentKey);

    if (savedConsent === "granted" || savedConsent === "denied") {
      setConsent(savedConsent);
    }

    setIsReady(true);
  }, []);

  function saveConsent(value: Exclude<ConsentStatus, null>) {
    window.localStorage.setItem(consentKey, value);
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

      {consent === null && (
        <div
          role="dialog"
          aria-labelledby="analytics-consent-title"
          aria-describedby="analytics-consent-description"
          className="fixed inset-x-3 bottom-3 z-[1000000] mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-5 text-[#07111F] shadow-[0_24px_80px_rgba(7,17,31,0.28)] sm:p-6"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p
                id="analytics-consent-title"
                className="text-base font-black sm:text-lg"
              >
                Help us improve your packaging experience
              </p>

              <p
                id="analytics-consent-description"
                className="mt-2 text-sm leading-6 text-slate-600"
              >
                We use optional analytics to understand website performance and
                improve product, quote and support pages. Essential website
                features work without analytics.
              </p>

              <Link
                href="/privacy-policy"
                className="mt-2 inline-flex text-sm font-black text-[#007C91] hover:text-[#FF6A00]"
              >
                Read Privacy Policy
              </Link>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => saveConsent("denied")}
                className="rounded-full border border-slate-300 px-5 py-3 text-sm font-black transition hover:border-[#07111F] hover:bg-slate-100"
              >
                Essential Only
              </button>

              <button
                type="button"
                onClick={() => saveConsent("granted")}
                className="rounded-full bg-[#FF6A00] px-5 py-3 text-sm font-black text-white shadow-lg shadow-orange-500/20 transition hover:bg-[#007C91]"
              >
                Accept Analytics
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
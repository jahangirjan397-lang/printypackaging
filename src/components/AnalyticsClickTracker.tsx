"use client";

import { useEffect } from "react";
import { sendGAEvent } from "@next/third-parties/google";

const consentKey = "printy-analytics-consent";

function analyticsAllowed() {
  const hostname = window.location.hostname;

  const isLiveWebsite =
    hostname === "printypackaging.com" ||
    hostname === "www.printypackaging.com";

  return (
    isLiveWebsite &&
    window.localStorage.getItem(consentKey) === "granted"
  );
}

function cleanLinkText(link: HTMLAnchorElement) {
  return (
    link.textContent?.trim().replace(/\s+/g, " ").slice(0, 80) ||
    "unnamed_link"
  );
}

export default function AnalyticsClickTracker() {
  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      if (!analyticsAllowed()) {
        return;
      }

      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const link = target.closest("a");

      if (!(link instanceof HTMLAnchorElement)) {
        return;
      }

      const href = link.getAttribute("href") || "";

      if (!href) {
        return;
      }

      const eventDetails = {
        link_text: cleanLinkText(link),
        page_path: `${window.location.pathname}${window.location.search}`,
      };

      if (href.includes("wa.me/")) {
        sendGAEvent("event", "whatsapp_click", eventDetails);
        return;
      }

      if (href.startsWith("mailto:")) {
        sendGAEvent("event", "email_click", eventDetails);
        return;
      }

      if (href.includes("#quote")) {
        let productSlug = "general";

        try {
          const quoteUrl = new URL(href, window.location.origin);
          productSlug = quoteUrl.searchParams.get("product") || "general";
        } catch {
          productSlug = "general";
        }

        sendGAEvent("event", "quote_cta_click", {
          ...eventDetails,
          product_slug: productSlug,
        });
      }
    }

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return null;
}
"use client";

import { useEffect } from "react";

// Every WhatsApp link on the site points at the main (Greek) business number.
// Once a USA number is added below, visitors in the Americas (by their
// browser's time zone, so pages stay static and nothing is sent anywhere)
// are switched to it instead.
export const WHATSAPP_MAIN = "306985024723";
export const WHATSAPP_USA = "15165501638"; // owner's US number (2026-10-26)

export function isAmericasVisitor() {
  try {
    return /^America\//.test(Intl.DateTimeFormat().resolvedOptions().timeZone || "");
  } catch {
    return false;
  }
}

export default function WhatsAppRegion() {
  // Every WhatsApp click tells the owner (Telegram) which line the visitor went to
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href*="wa.me/"]') : null;
      if (!link) return;
      const line = link.href.includes(`wa.me/${WHATSAPP_USA}`) && WHATSAPP_USA ? "usa" : "main";
      const body = JSON.stringify({ type: "whatsapp", line, path: location.pathname, referrer: document.referrer });
      const blob = new Blob([body], { type: "application/json" });
      if (!navigator.sendBeacon?.("/api/visitor-alert", blob)) {
        fetch("/api/visitor-alert", { method: "POST", body, keepalive: true }).catch(() => {});
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    if (!WHATSAPP_USA || !isAmericasVisitor()) return;
    const swap = (root: ParentNode) => {
      root.querySelectorAll<HTMLAnchorElement>(`a[href*="wa.me/${WHATSAPP_MAIN}"]`).forEach((a) => {
        a.href = a.href.replace(`wa.me/${WHATSAPP_MAIN}`, `wa.me/${WHATSAPP_USA}`);
      });
    };
    swap(document);
    // links rendered later (client navigation, opened menus, the quote form)
    const observer = new MutationObserver(() => swap(document));
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["href"] });
    return () => observer.disconnect();
  }, []);
  return null;
}

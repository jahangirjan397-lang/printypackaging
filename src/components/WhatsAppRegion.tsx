"use client";

import { useEffect } from "react";

// Every WhatsApp link on the site points at the main (Greek) business number.
// Once a USA number is added below, visitors in the Americas (by their
// browser's time zone, so pages stay static and nothing is sent anywhere)
// are switched to it instead.
export const WHATSAPP_MAIN = "306985024723";
export const WHATSAPP_USA = ""; // e.g. "1XXXXXXXXXX" once the owner has a US WhatsApp number

export function isAmericasVisitor() {
  try {
    return /^America\//.test(Intl.DateTimeFormat().resolvedOptions().timeZone || "");
  } catch {
    return false;
  }
}

export default function WhatsAppRegion() {
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

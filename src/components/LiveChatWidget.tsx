"use client";

import { useEffect } from "react";

type TawkWindow = Window &
  typeof globalThis & {
    Tawk_API?: {
      customStyle?: {
        zIndex?: number;
        visibility?: Record<
          "desktop" | "mobile" | "bubble",
          { position?: string; xOffset?: number; yOffset?: number; rotate?: string }
        >;
      };
      [key: string]: unknown;
    };
    Tawk_LoadStart?: Date;
  };

export default function LiveChatWidget() {
  useEffect(() => {
    const propertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
    const widgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID || "default";

    if (!propertyId) {
      return;
    }

    const tawkWindow = window as TawkWindow;
    const hostname = tawkWindow.location.hostname;

    const isLiveWebsite =
      hostname === "printypackaging.com" ||
      hostname === "www.printypackaging.com";

    const allowLocalTesting = tawkWindow.location.search.includes("showchat=1");

    if (!isLiveWebsite && !allowLocalTesting) {
      return;
    }

    if (document.getElementById("tawk-live-chat-script")) {
      return;
    }

    tawkWindow.Tawk_API = tawkWindow.Tawk_API || {};
    tawkWindow.Tawk_LoadStart = new Date();

    tawkWindow.Tawk_API.customStyle = {
      zIndex: 999998,
      // Keep the chat button and its "We Are Here!" bubble clear of the
      // screen edge and the scrollbar so they are never cut off
      visibility: {
        desktop: { position: "br", xOffset: 28, yOffset: 24 },
        mobile: { position: "br", xOffset: 14, yOffset: 18 },
        bubble: { rotate: "0deg", xOffset: -18, yOffset: 0 },
      },
    };

    const script = document.createElement("script");
    script.id = "tawk-live-chat-script";
    script.async = true;
    script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
    script.charset = "UTF-8";
    script.crossOrigin = "anonymous";

    document.body.appendChild(script);
  }, []);

  return null;
}
"use client";

import { useEffect } from "react";

export default function LiveChatWidget() {
  useEffect(() => {
    const propertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
    const widgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID || "default";

    if (!propertyId) {
      return;
    }

    const hostname = window.location.hostname;

    const isLiveWebsite =
      hostname === "printypackaging.com" ||
      hostname === "www.printypackaging.com";

    const allowLocalTesting = window.location.search.includes("showchat=1");

    if (!isLiveWebsite && !allowLocalTesting) {
      return;
    }

    if (document.getElementById("tawk-live-chat-script")) {
      return;
    }

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    window.Tawk_API.customStyle = {
      zIndex: 999998,
    };

    const script = document.createElement("script");
    script.id = "tawk-live-chat-script";
    script.async = true;
    script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    document.body.appendChild(script);
  }, []);

  return null;
}
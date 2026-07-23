"use client";

import { useEffect } from "react";

type TawkApi = {
  customStyle?: {
    zIndex?: number;
  };
  onLoad?: () => void;
  hideWidget?: () => void;
  showWidget?: () => void;
  [key: string]: unknown;
};

type TawkWindow = Window &
  typeof globalThis & {
    Tawk_API?: TawkApi;
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

    tawkWindow.Tawk_API = tawkWindow.Tawk_API || {};
    tawkWindow.Tawk_LoadStart = new Date();

    tawkWindow.Tawk_API.customStyle = {
      zIndex: 999998,
    };

    function syncWidgetVisibility() {
      const tawkApi = tawkWindow.Tawk_API;

      if (!tawkApi) {
        return;
      }

      const isMobileOrTablet = window.matchMedia("(max-width: 1023px)").matches;

      if (isMobileOrTablet) {
        tawkApi.hideWidget?.();
      } else {
        tawkApi.showWidget?.();
      }
    }

    tawkWindow.Tawk_API.onLoad = syncWidgetVisibility;
    window.addEventListener("resize", syncWidgetVisibility);

    if (!document.getElementById("tawk-live-chat-script")) {
      const script = document.createElement("script");
      script.id = "tawk-live-chat-script";
      script.async = true;
      script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
      script.charset = "UTF-8";
      script.setAttribute("crossorigin", "*");

      document.body.appendChild(script);
    } else {
      syncWidgetVisibility();
    }

    return () => {
      window.removeEventListener("resize", syncWidgetVisibility);
    };
  }, []);

  return null;
}
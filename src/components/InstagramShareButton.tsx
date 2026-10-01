"use client";

import { useState } from "react";
import { SocialIcon, brandBackground } from "@/components/SocialIcons";

// Instagram has no web "share a link" page. On phones this opens the system
// share sheet (which lists Instagram); elsewhere it copies the link so it can
// be pasted into a story, post or bio.
export default function InstagramShareButton({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const [message, setMessage] = useState("");

  function copyLink() {
    // execCommand works instantly inside a click, even where the async
    // Clipboard API waits for permission
    const field = document.createElement("textarea");
    field.value = url;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    const copied = document.execCommand("copy");
    field.remove();
    if (!copied) void navigator.clipboard?.writeText(url);
  }

  async function share() {
    if (navigator.share && /Android|iPhone|iPad/i.test(navigator.userAgent)) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // Share sheet closed or unavailable: fall back to copying
      }
    }
    copyLink();
    setMessage("Link copied. Paste it in your Instagram story, post or bio.");
    window.setTimeout(() => setMessage(""), 4000);
  }

  return (
    <span className="relative">
      <button
        type="button"
        onClick={share}
        aria-label="Share on Instagram"
        title="Share on Instagram"
        className="flex h-10 w-10 items-center justify-center rounded-full text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
        style={{ background: brandBackground.instagram }}
      >
        <SocialIcon platform="instagram" className="h-[18px] w-[18px]" />
      </button>
      {message && (
        <span
          role="status"
          className="absolute left-1/2 top-12 z-10 w-64 -translate-x-1/2 rounded-xl bg-[#07111F] px-3 py-2 text-center text-xs font-bold text-white shadow-lg"
        >
          {message}
        </span>
      )}
    </span>
  );
}

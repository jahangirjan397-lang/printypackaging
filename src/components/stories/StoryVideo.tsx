"use client";

import Image from "next/image";
import { useState } from "react";

// Vertical "short" video in a phone-style frame. Only the poster image loads
// with the page; the video (YouTube or .mp4) loads when the visitor taps play,
// so the page stays fast.
export default function StoryVideo({
  videoUrl,
  youtube,
  poster,
  posterAlt,
  title,
  priority = false,
}: {
  videoUrl?: string;
  youtube?: string;
  poster: string;
  posterAlt: string;
  title: string;
  priority?: boolean;
}) {
  const [playing, setPlaying] = useState(false);
  const hasVideo = Boolean(youtube || videoUrl);

  return (
    <div className="cs-phone relative mx-auto aspect-[9/16] w-full max-w-[340px] overflow-hidden rounded-[2.2rem] border-[6px] border-[#0d1b2e] bg-[#0d1b2e] shadow-[0_40px_90px_rgba(7,17,31,0.45)]">
      {playing && youtube ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${youtube}?autoplay=1&playsinline=1&rel=0&modestbranding=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : playing && videoUrl ? (
        <video className="absolute inset-0 h-full w-full object-cover" src={videoUrl} poster={poster} controls autoPlay playsInline />
      ) : (
        <>
          <Image src={poster} alt={posterAlt} fill priority={priority} sizes="340px" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07111F]/85 via-[#07111F]/10 to-transparent" />
          {hasVideo ? (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Play video: ${title}`}
              className="group absolute inset-0 flex items-center justify-center"
            >
              <span className="cs-pulse relative flex h-20 w-20 items-center justify-center rounded-full bg-white/95 shadow-2xl transition duration-300 group-hover:scale-110">
                <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8 fill-[#FF6A00]" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
          ) : null}
          <p className="absolute bottom-5 left-5 right-5 text-sm font-black leading-snug text-white">
            {hasVideo ? "Watch the unboxing" : title}
          </p>
        </>
      )}
      <span className="pointer-events-none absolute left-1/2 top-2 h-1.5 w-16 -translate-x-1/2 rounded-full bg-white/25" />
    </div>
  );
}

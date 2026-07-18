"use client";

import { useState } from "react";

type SmartImageProps = {
  src: string;
  alt: string;
  title?: string;
  tag?: string;
  className?: string;
  imageClassName?: string;
};

function PackagingFallback({
  title = "Custom Packaging",
  tag = "Preview",
}: {
  title?: string;
  tag?: string;
}) {
  return (
    <div className="relative flex h-full min-h-[220px] w-full items-center justify-center overflow-hidden rounded-[inherit] bg-gradient-to-br from-white via-slate-50 to-[#E8FBFF]">
      <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-[#00C2E8]/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-16 h-56 w-56 rounded-full bg-[#FF6A00]/20 blur-3xl" />

      <div className="relative h-32 w-40 rotate-[-6deg]">
        <div className="absolute left-5 top-9 h-24 w-30 rounded-xl border border-slate-200 bg-white shadow-2xl" />
        <div className="absolute left-0 top-0 h-26 w-32 rounded-xl border border-[#00C2E8]/25 bg-gradient-to-br from-[#00C2E8] to-[#007C91] shadow-xl" />
        <div className="absolute left-8 top-5 h-11 w-17 rounded-lg bg-white/25" />
        <div className="absolute bottom-5 left-5 h-2 w-20 rounded-full bg-white/50" />
        <div className="absolute bottom-9 left-5 h-2 w-24 rounded-full bg-white/35" />
        <div className="absolute -right-2 top-8 h-20 w-13 rounded-lg bg-[#FF6A00]/90 shadow-lg" />
      </div>

      <div className="absolute bottom-4 left-4 right-4">
        <span className="inline-flex rounded-full bg-[#07111F] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white">
          {tag}
        </span>

        <p className="mt-2 line-clamp-1 text-sm font-black text-[#07111F]">
          {title}
        </p>
      </div>
    </div>
  );
}

export default function SmartImage({
  src,
  alt,
  title,
  tag,
  className = "",
  imageClassName = "",
}: SmartImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div className={className}>
        <PackagingFallback title={title} tag={tag} />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={() => setHasError(true)}
        className={`h-full w-full object-cover ${imageClassName}`}
      />
    </div>
  );
}


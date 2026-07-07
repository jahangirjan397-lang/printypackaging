"use client";

import Link from "next/link";
import { useState } from "react";

export default function BrandLogo({
  variant = "dark",
  size = "default",
}: {
  variant?: "dark" | "light";
  size?: "small" | "default" | "large";
}) {
  const [logoError, setLogoError] = useState(false);

  const textColor = variant === "light" ? "text-white" : "text-[#07111F]";

  const wrapperSize =
    size === "large"
      ? "h-[58px] w-[58px]"
      : size === "small"
        ? "h-[38px] w-[38px]"
        : "h-[48px] w-[48px]";

  const imageScale =
    size === "large"
      ? "scale-[1.12]"
      : size === "small"
        ? "scale-[1.08]"
        : "scale-[1.1]";

  const textSize =
    size === "large"
      ? "text-[2rem]"
      : size === "small"
        ? "text-[1.25rem]"
        : "text-[1.7rem]";

  const gapSize =
    size === "large"
      ? "gap-2.5"
      : size === "small"
        ? "gap-1.5"
        : "gap-2";

  return (
    <Link
      href="/"
      prefetch={false}
      className={`inline-flex items-center ${gapSize} leading-none`}
      aria-label="PrintyPackaging home"
    >
      {!logoError ? (
        <span
          className={`${wrapperSize} relative flex shrink-0 items-center justify-center overflow-hidden`}
        >
          <img
            src="/logo-icon.svg"
            alt="PrintyPackaging logo icon"
            onError={() => setLogoError(true)}
            className={`h-full w-full object-contain ${imageScale}`}
          />
        </span>
      ) : (
        <span
          className={`${wrapperSize} flex shrink-0 items-center justify-center rounded-xl bg-[#00C2E8] text-sm font-black text-[#07111F]`}
        >
          PP
        </span>
      )}

      <span
        className={`flex translate-y-[1px] items-center whitespace-nowrap ${textSize} font-black tracking-tight ${textColor}`}
      >
        <span>Printy</span>
        <span className="text-[#FF6A00]">Packaging</span>
      </span>
    </Link>
  );
}
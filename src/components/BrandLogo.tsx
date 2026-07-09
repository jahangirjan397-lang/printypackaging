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
      ? "h-[64px] w-[64px]"
      : size === "small"
        ? "h-[42px] w-[42px]"
        : "h-[54px] w-[54px]";

  const imageSize =
    size === "large"
      ? "h-[60px] w-[60px]"
      : size === "small"
        ? "h-[40px] w-[40px]"
        : "h-[52px] w-[52px]";

  const textSize =
    size === "large"
      ? "text-[2rem]"
      : size === "small"
        ? "text-[1.25rem]"
        : "text-[1.7rem]";

  const gapSize =
    size === "large"
      ? "gap-2"
      : size === "small"
        ? "gap-1.5"
        : "gap-1.5";

  const textMove =
    size === "large"
      ? "-translate-y-[2px]"
      : size === "small"
        ? "-translate-y-[1px]"
        : "-translate-y-[2px]";

  return (
    <Link
      href="/"
      prefetch={false}
      className={`inline-flex items-center ${gapSize} leading-none`}
      aria-label="PrintyPackaging home"
    >
      {!logoError ? (
        <span
          className={`${wrapperSize} relative flex shrink-0 items-center justify-center overflow-visible`}
        >
          <img
            src="/logo-icon.svg"
            alt="PrintyPackaging logo icon"
            onError={() => setLogoError(true)}
            className={`${imageSize} block object-contain`}
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
        className={`flex ${textMove} items-center whitespace-nowrap ${textSize} font-black tracking-tight ${textColor}`}
      >
        <span>Printy</span>
        <span className="text-[#FF6A00]">Packaging</span>
      </span>
    </Link>
  );
}
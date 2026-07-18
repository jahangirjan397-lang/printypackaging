"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const trustPoints = [
  "Premium Quality",
  "Fast Delivery",
  "Custom Sizes",
  "Global Support",
];

const heroSlides = [
  {
    eyebrow: "Premium Packaging",
    title: "Luxury printed packaging for premium brands.",
    description:
      "Rigid boxes, folding cartons, mailer boxes and food packaging with custom print support.",
    image: "/images/hero/hero-packaging.webp",
    productLabel: "Printy Packaging",
    accent: "#FF6A00",
    soft: "#BDF7F5",
  },
  {
    eyebrow: "Mailer Boxes",
    title: "Custom mailer boxes for ecommerce brands.",
    description:
      "Strong, printable and premium mailer boxes for shipping, subscription and retail brands.",
    image: "/images/hero/hero-mailer-boxes.webp",
    href: "/products/mailer-boxes",
    productLabel: "Mailer Boxes",
    accent: "#00C2E8",
    soft: "#D9FBFF",
  },
  {
    eyebrow: "Rigid Boxes",
    title: "Luxury rigid boxes for premium products.",
    description:
      "High-end rigid packaging for gifts, cosmetics, perfumes, jewelry and retail products.",
    image: "/images/hero/hero-rigid-boxes.webp",
    href: "/products/rigid-boxes",
    productLabel: "Rigid Boxes",
    accent: "#FF6A00",
    soft: "#FFE4D1",
  },
  {
    eyebrow: "Folding Cartons",
    title: "Retail folding cartons with custom print.",
    description:
      "Professional folding cartons for cosmetics, food, healthcare and retail packaging.",
    image: "/images/hero/hero-folding-cartons.webp",
    href: "/products/folding-cartons",
    productLabel: "Folding Cartons",
    accent: "#007C91",
    soft: "#DDFBFF",
  },
  {
    eyebrow: "Butter Paper",
    title: "Custom butter paper for food brands.",
    description:
      "Food-safe printed butter paper, wrapping paper and greaseproof packaging support.",
    image: "/images/hero/hero-butter-paper.webp",
    href: "/products/butter-paper",
    productLabel: "Butter Paper",
    accent: "#FF6A00",
    soft: "#FFF0D6",
  },
];

function ProductMockup({
  label,
  accent,
  soft,
}: {
  label: string;
  accent: string;
  soft: string;
}) {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        background: `radial-gradient(circle at 18% 18%, ${soft}, transparent 35%), linear-gradient(135deg, #BDF7F5 0%, #F7FAFC 48%, ${soft} 100%)`,
      }}
    >
      <div className="absolute -left-16 top-8 h-44 w-44 rounded-full bg-white/45 blur-2xl" />
      <div className="absolute -right-12 bottom-2 h-48 w-48 rounded-full bg-white/35 blur-3xl" />

      <div
        className="absolute left-[7%] top-[48%] h-[28%] w-[50%] -rotate-3 rounded-2xl shadow-2xl"
        style={{
          background: `linear-gradient(135deg, ${accent}, #F7FAFC)`,
        }}
      >
        <div className="absolute left-5 top-5 h-9 w-9 rounded-xl bg-white/85" />
        <div className="absolute bottom-5 left-5 h-3 w-28 rounded-full bg-white/80" />
        <div className="absolute bottom-10 left-5 h-3 w-44 rounded-full bg-white/55" />
      </div>

      <div
        className="absolute right-[7%] top-[31%] h-[37%] w-[44%] rotate-2 rounded-3xl shadow-2xl"
        style={{
          background: `linear-gradient(145deg, #FFFFFF, ${soft})`,
        }}
      >
        <div
          className="absolute left-6 top-6 h-11 w-11 rounded-2xl"
          style={{ backgroundColor: accent }}
        />
        <div className="absolute bottom-7 left-6 h-3 w-32 rounded-full bg-slate-300/80" />
        <div className="absolute bottom-12 left-6 h-3 w-44 rounded-full bg-slate-200" />
      </div>

      <div
        className="absolute left-[32%] top-[12%] h-[46%] w-[40%] rounded-3xl shadow-2xl"
        style={{
          background: `linear-gradient(145deg, ${accent}, #FF9B5C)`,
        }}
      >
        <div className="absolute left-7 top-7 h-11 w-11 rounded-2xl bg-white/80" />
        <div className="absolute bottom-9 left-8 h-4 w-40 rounded-full bg-white/75" />
        <div className="absolute bottom-16 left-8 h-3 w-56 rounded-full bg-white/45" />
      </div>

      <div className="absolute bottom-6 left-6 rounded-2xl border border-white/60 bg-white/80 px-5 py-3 text-[#07111F] shadow-xl backdrop-blur">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#007C91]">
          Custom Packaging
        </p>
        <p className="mt-1 text-lg font-black">{label}</p>
      </div>
    </div>
  );
}

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const activeSlide = heroSlides[activeIndex];
  const imageFailed = failedImages[activeSlide.image];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroSlides.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  const imageArea = (
    <div className="relative aspect-[16/9] overflow-hidden rounded-[1.5rem] bg-[#BDF7F5] md:rounded-[2rem]">
      {!imageFailed ? (
        <Image
          key={activeSlide.image}
          src={activeSlide.image}
          alt={`${activeSlide.eyebrow} custom packaging by Printy Packaging`}
          fill
          priority={activeIndex === 0}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center transition duration-700"
          onError={() =>
            setFailedImages((current) => ({
              ...current,
              [activeSlide.image]: true,
            }))
          }
        />
      ) : (
        <ProductMockup
          label={activeSlide.productLabel}
          accent={activeSlide.accent}
          soft={activeSlide.soft}
        />
      )}
    </div>
  );

  return (
    <section className="relative overflow-hidden bg-[#07111F] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(0,194,232,0.2),transparent_30%),radial-gradient(circle_at_82%_30%,rgba(255,106,0,0.14),transparent_28%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-20 lg:grid-cols-2 lg:py-24">
        <div className="max-w-3xl text-center lg:text-left">
          <p className="inline-flex rounded-full border border-[#00C2E8]/40 bg-[#00C2E8]/10 px-4 py-2 text-xs font-black text-[#9FEFFF] shadow-lg shadow-cyan-500/10 md:text-sm">
            Premium Custom Printing & Packaging
          </p>

          <h1 className="mt-6 text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
            Packaging That
            <br />
            Makes Brands
            <br />
            <span className="bg-gradient-to-r from-[#FF6A00] to-[#00C2E8] bg-clip-text text-transparent">
              Unforgettable.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base md:text-lg md:leading-8 lg:mx-0">
            Premium rigid boxes, folding cartons, food packaging, butter paper,
            labels, stickers and luxury printed packaging for USA, UK, Europe
            and worldwide brands.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4 lg:justify-start">
            <a
              href="#quote"
              className="rounded-full bg-[#FF6A00] px-6 py-3 text-sm font-black text-white shadow-xl shadow-orange-500/25 transition hover:-translate-y-1 hover:bg-[#007C91] md:px-7 md:py-4"
            >
              Get Instant Quote
            </a>

            <a
              href="#products"
              className="rounded-full border border-[#00C2E8]/40 bg-white/5 px-6 py-3 text-sm font-black text-white backdrop-blur transition hover:-translate-y-1 hover:bg-[#00C2E8] hover:text-[#07111F] md:px-7 md:py-4"
            >
              Explore Products
            </a>
          </div>

          <div className="mx-auto mt-9 grid max-w-2xl grid-cols-2 gap-3 rounded-3xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur md:grid-cols-4 lg:mx-0">
            {trustPoints.map((item) => (
              <div key={item} className="text-center lg:text-left">
                <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#00C2E8]/15 text-sm font-black text-[#00C2E8] lg:mx-0">
                  ✓
                </div>

                <p className="text-[11px] font-black text-white sm:text-xs md:text-sm">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="absolute -inset-5 rounded-[2.4rem] bg-[#00C2E8]/20 blur-3xl md:-inset-8" />

          <div className="relative overflow-hidden rounded-[2rem] border border-[#00C2E8]/25 bg-white/[0.06] p-3 shadow-2xl shadow-cyan-500/10 backdrop-blur md:rounded-[2.4rem] md:p-4">
            {activeSlide.href ? (
              <Link
                href={activeSlide.href}
                aria-label={`Open ${activeSlide.eyebrow} page`}
                className="block transition hover:scale-[1.01]"
              >
                {imageArea}
              </Link>
            ) : (
              imageArea
            )}

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#07111F]/70 px-4 py-4 backdrop-blur md:px-5">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#00C2E8] md:text-xs">
                  {activeSlide.eyebrow}
                </p>

                <h2 className="mt-1 text-lg font-black leading-tight text-white md:text-xl">
                  {activeSlide.title}
                </h2>

                <p className="mt-1 max-w-xl text-xs leading-5 text-slate-300 md:text-sm">
                  {activeSlide.description}
                </p>
              </div>

              {activeSlide.href ? (
                <Link
                  href={activeSlide.href}
                  className="shrink-0 rounded-full bg-[#FF6A00] px-5 py-2.5 text-xs font-black text-white shadow-lg transition hover:bg-[#007C91]"
                >
                  View Product
                </Link>
              ) : (
                <span className="shrink-0 rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-xs font-black text-white">
                  Showcase
                </span>
              )}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.eyebrow}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition ${
                  activeIndex === index
                    ? "w-10 bg-[#FF6A00]"
                    : "w-2.5 bg-white/30 hover:bg-[#00C2E8]"
                }`}
                aria-label={`Show ${slide.eyebrow}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

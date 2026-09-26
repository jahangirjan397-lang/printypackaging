"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const trustPoints = [
  "Custom Structures",
  "Material Guidance",
  "Artwork Support",
  "Worldwide Quotes",
];

const heroSlides = [
  {
    eyebrow: "Rigid Boxes",
    title: "Premium presentation for high-value products.",
    description:
      "Luxury rigid boxes with custom inserts, print and premium finishing.",
    image: "/images/home/home-hero-luxury-v3.webp",
    href: "/products/rigid-boxes",
  },
  {
    eyebrow: "Mailer Boxes",
    title: "A cleaner unboxing experience for ecommerce brands.",
    description:
      "Protective branded mailers designed for shipping, subscriptions and retail delivery.",
    image: "/images/home/home-hero-mailer-v3.webp",
    href: "/products/mailer-boxes",
  },
  {
    eyebrow: "Food Packaging",
    title: "One brand look across every takeaway item.",
    description:
      "Bags, boxes, cups, trays and wraps printed as one coordinated food packaging set.",
    image: "/images/home/home-hero-food-v5.webp",
    href: "/products/food-packaging",
  },
  {
    eyebrow: "Butter Paper",
    title: "Branded food wrapping that customers remember.",
    description:
      "Custom printed butter paper for bakeries, cafes, restaurants and takeaway brands.",
    image: "/images/products/butter-paper/butter-paper-hero.webp",
    href: "/products/butter-paper",
  },
  {
    eyebrow: "Paper Bags",
    title: "Shopping bags that carry your brand outside the store.",
    description:
      "Kraft, white and coloured paper bags with printed logos and rope or twisted handles.",
    image: "/images/products/paper-bags/paper-bags-hero.webp",
    href: "/products/paper-bags",
  },
  {
    eyebrow: "Folding Cartons",
    title: "Printed cartons for retail shelves and product lines.",
    description:
      "Lightweight paperboard cartons with custom print, finishes and dieline support.",
    image: "/images/products/folding-cartons/folding-cartons-hero-v4.webp",
    href: "/products/folding-cartons",
  },
  {
    eyebrow: "Cosmetic Boxes",
    title: "Beauty packaging with clean shelf presence.",
    description:
      "Cartons and presentation boxes for skincare, makeup and beauty brands.",
    image: "/images/products/cosmetic-boxes/cosmetic-boxes-hero-v3.webp",
    href: "/products/cosmetic-boxes",
  },
  {
    eyebrow: "Bakery Boxes",
    title: "Window boxes that keep cakes and pastries on show.",
    description:
      "Food-grade bakery boxes for cakes, cupcakes, cookies and desserts.",
    image: "/images/products/bakery-boxes/bakery-boxes-hero-v4.webp",
    href: "/products/bakery-boxes",
  },
  {
    eyebrow: "Burger Boxes",
    title: "Takeaway boxes that hold up and look good.",
    description:
      "Printed burger boxes for restaurants, food trucks and delivery brands.",
    image: "/images/products/burger-boxes/burger-boxes-hero.webp",
    href: "/products/burger-boxes",
  },
  {
    eyebrow: "Display Boxes",
    title: "Countertop displays that sell at the point of purchase.",
    description:
      "Branded display boxes for retail counters, promotions and product launches.",
    image: "/images/products/display-boxes/display-boxes-hero-v4.webp",
    href: "/products/display-boxes",
  },
];

// Only the current slide and the one after it are mounted at first, so the
// homepage does not download all ten slide images up front.
function markLoaded(loaded: boolean[], index: number) {
  const next = [...loaded];
  next[index] = true;
  next[(index + 1) % heroSlides.length] = true;
  return next;
}

export default function Hero() {
  const [slider, setSlider] = useState(() => ({
    active: 0,
    loaded: markLoaded(
      heroSlides.map(() => false),
      0,
    ),
  }));
  const activeIndex = slider.active;
  const activeSlide = heroSlides[activeIndex];

  function showSlide(index: number) {
    const target = (index + heroSlides.length) % heroSlides.length;
    setSlider((current) => ({
      active: target,
      loaded: markLoaded(current.loaded, target),
    }));
  }

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timer = window.setInterval(() => {
      setSlider((current) => {
        const target = (current.active + 1) % heroSlides.length;
        return { active: target, loaded: markLoaded(current.loaded, target) };
      });
    }, 4500);

    return () => window.clearInterval(timer);
  }, [slider.active]);

  const imageArea = (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-[#FFFDF9] md:rounded-[2rem]">
      {heroSlides.map((slide, index) =>
        slider.loaded[index] ? (
        <Image
          key={slide.image}
          src={slide.image}
          alt={
            index === activeIndex
              ? `${slide.eyebrow} custom packaging by Printy Packaging`
              : ""
          }
          aria-hidden={index !== activeIndex}
          fill
          priority={index === 0}
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`object-cover object-center transition-opacity duration-700 ${
            index === activeIndex ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        />
        ) : null,
      )}
    </div>
  );

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#062A3D_0%,#07111F_58%,#191416_100%)] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(0,194,232,0.2),transparent_30%),radial-gradient(circle_at_82%_30%,rgba(255,106,0,0.14),transparent_28%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-20 lg:grid-cols-2 lg:py-24 2xl:max-w-[1520px] 2xl:gap-16 2xl:px-10">
        <div className="max-w-3xl text-center lg:text-left">
          <p className="inline-flex rounded-full border border-[#00C2E8]/40 bg-[#00C2E8]/10 px-4 py-2 text-xs font-black text-[#9FEFFF] shadow-lg shadow-cyan-500/10 md:text-sm">
            Premium Custom Printing & Packaging
          </p>

          <h1 className="mt-6 text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl md:text-6xl xl:text-7xl 2xl:text-[5rem]">
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
            labels, stickers and luxury printed packaging for USA, UK, Europe,
            UAE and worldwide brands.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4 lg:justify-start">
            <a
              href="#quote"
              className="rounded-full bg-[#FF6A00] px-6 py-3 text-sm font-black text-white shadow-xl shadow-orange-500/25 transition hover:-translate-y-1 hover:bg-[#007C91] md:px-7 md:py-4"
            >
              Request a Custom Quote
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
            <button
              type="button"
              onClick={() => showSlide(activeIndex - 1)}
              className="mr-1 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-sm font-black text-white transition hover:border-[#00C2E8] hover:text-[#00C2E8]"
              aria-label="Previous slide"
            >
              ‹
            </button>
            {heroSlides.map((slide, index) => (
              <button
                key={slide.eyebrow}
                type="button"
                onClick={() => showSlide(index)}
                className={`h-2.5 rounded-full transition ${
                  activeIndex === index
                    ? "w-10 bg-[#FF6A00]"
                    : "w-2.5 bg-white/30 hover:bg-[#00C2E8]"
                }`}
                aria-label={`Show ${slide.eyebrow}`}
              />
            ))}
            <button
              type="button"
              onClick={() => showSlide(activeIndex + 1)}
              className="ml-1 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-sm font-black text-white transition hover:border-[#00C2E8] hover:text-[#00C2E8]"
              aria-label="Next slide"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

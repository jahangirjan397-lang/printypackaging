"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import DrawnArrow from "@/components/DrawnArrow";
import { businessPromises } from "@/data/businessInfo";

// Headline numbers under the hero text (values live in data/businessInfo.ts)
const heroStats = [
  {
    value: businessPromises.minimumOrder.replace(/\s*boxes?$/i, ""),
    label: "Minimum order",
  },
  {
    value: businessPromises.productionTime.replace(/\s*business\s*/i, " "),
    label: "Standard turnaround",
  },
  { value: "Free", label: "Dieline & digital proof" },
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
    image: "/images/products/mailer-boxes/mailer-boxes-lifestyle.webp",
    href: "/products/mailer-boxes",
  },
  {
    eyebrow: "Food Packaging",
    title: "One brand look across every takeaway item.",
    description:
      "Bags, boxes, cups, trays and wraps printed as one coordinated food packaging set.",
    image: "/images/home/home-hero-food-v5-brand.webp",
    href: "/products/food-packaging",
  },
  {
    eyebrow: "Butter Paper",
    title: "Branded food wrapping that customers remember.",
    description:
      "Custom printed butter paper for bakeries, cafes, restaurants and takeaway brands.",
    image: "/images/products/butter-paper/butter-paper-hero-brand.webp",
    href: "/products/butter-paper",
  },
  {
    eyebrow: "Paper Bags",
    title: "Shopping bags that carry your brand outside the store.",
    description:
      "Kraft, white and coloured paper bags with printed logos and rope or twisted handles.",
    image: "/images/products/paper-bags/paper-bags-hero-brand.webp",
    href: "/products/paper-bags",
  },
  {
    eyebrow: "Folding Cartons",
    title: "Printed cartons for retail shelves and product lines.",
    description:
      "Lightweight paperboard cartons with custom print, finishes and dieline support.",
    image: "/images/products/folding-cartons/folding-cartons-hero-v4-brand.webp",
    href: "/products/folding-cartons",
  },
  {
    eyebrow: "Cosmetic Boxes",
    title: "Beauty packaging with clean shelf presence.",
    description:
      "Cartons and presentation boxes for skincare, makeup and beauty brands.",
    image: "/images/products/cosmetic-boxes/cosmetic-boxes-hero-v3-brand.webp",
    href: "/products/cosmetic-boxes",
  },
  {
    eyebrow: "Bakery Boxes",
    title: "Window boxes that keep cakes and pastries on show.",
    description:
      "Branded bakery boxes for cakes, cupcakes, cookies and desserts.",
    image: "/images/products/bakery-boxes/bakery-boxes-hero-v4.webp",
    href: "/products/bakery-boxes",
  },
  {
    eyebrow: "Burger Boxes",
    title: "Takeaway boxes that hold up and look good.",
    description:
      "Printed burger boxes for restaurants, food trucks and delivery brands.",
    image: "/images/products/burger-boxes/burger-boxes-hero-brand-v2.webp",
    href: "/products/burger-boxes",
  },
  {
    eyebrow: "Display Boxes",
    title: "Countertop displays that sell at the point of purchase.",
    description:
      "Branded display boxes for retail counters, promotions and product launches.",
    image: "/images/products/display-boxes/display-boxes-hero-v4-brand.webp",
    href: "/products/display-boxes",
  },
];

// Only the current slide and the one after it are mounted at first, so the
// homepage does not download all ten slide images up front.
// One line for short titles, otherwise two lines of about equal length
function splitTitle(title: string) {
  if (title.length <= 30) return [title];
  const words = title.split(" ");
  let best = 1;
  let bestDiff = Infinity;
  for (let i = 1; i < words.length; i++) {
    const diff = Math.abs(
      words.slice(0, i).join(" ").length - words.slice(i).join(" ").length,
    );
    if (diff < bestDiff) {
      bestDiff = diff;
      best = i;
    }
  }
  return [words.slice(0, best).join(" "), words.slice(best).join(" ")];
}

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
  const titleLines = splitTitle(activeSlide.title);

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
    <div className="relative aspect-[4/3] overflow-hidden bg-[#FFFDF9] [clip-path:url(#pp-curved-screen)]">
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

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-12 sm:px-5 sm:py-14 md:px-8 md:py-16 lg:grid-cols-2 lg:py-14 2xl:max-w-[1520px] 2xl:gap-16 2xl:px-10">
        <div className="max-w-3xl text-center lg:text-left">
          <p className="inline-flex rounded-full border border-[#00C2E8]/40 bg-[#00C2E8]/10 px-4 py-2 text-xs font-black text-[#9FEFFF] shadow-lg shadow-cyan-500/10 md:text-sm">
            Premium Custom Printing & Packaging
          </p>

          <h1 className="mt-5 text-4xl font-black leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.4rem] xl:text-6xl 2xl:text-7xl">
            Packaging That
            <br />
            Makes Brands
            <br />
            <span className="bg-gradient-to-r from-[#FF6A00] to-[#00C2E8] bg-clip-text text-transparent">
              Unforgettable.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base md:leading-7 lg:mx-0">
            Premium rigid boxes, folding cartons, food packaging, butter paper,
            labels, stickers and luxury printed packaging for USA, UK, Europe,
            UAE and worldwide brands.
          </p>

          <div className="relative mt-7 flex flex-wrap justify-center gap-3 sm:gap-4 lg:mt-14 lg:justify-start">
            {/* Hand-drawn arrow pointing at the main call to action (desktop) */}
            <DrawnArrow
              direction="down-left"
              className="pointer-events-none absolute -top-[3.9rem] left-[10.5rem] hidden h-16 w-20 lg:block"
            />
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

          <dl className="mx-auto mt-7 grid max-w-2xl grid-cols-3 gap-4 border-t border-white/10 pt-6 lg:mx-0">
            {heroStats.map((item) => (
              <div key={item.label} className="text-center lg:text-left">
                <dt className="sr-only">{item.label}</dt>
                <dd className="text-2xl font-black text-white md:text-3xl">
                  {item.value}
                </dd>
                <dd className="mt-1 text-[11px] font-bold text-slate-400 sm:text-xs md:text-sm">
                  {item.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-[600px] 2xl:max-w-none">
          <div className="absolute -inset-5 rounded-[2.4rem] bg-[#00C2E8]/10 blur-3xl md:-inset-8" />

          {/* Curved-screen display modelled on a curved LCD stand: a large
              screen with an even thin bezel, a shorter stand below it lit from
              the left, a dark shadow to the left and soft light on the floor */}
          <svg aria-hidden="true" width="0" height="0" className="absolute">
            <defs>
              <clipPath id="pp-curved-screen" clipPathUnits="objectBoundingBox">
                <path d="M0,0 Q0.5,0.1 1,0 L1,1 Q0.5,0.955 0,1 Z" />
              </clipPath>
            </defs>
          </svg>

          <div className="relative">
            {/* Shadow cast to the left of the stand */}
            <div className="pointer-events-none absolute -left-[9%] bottom-[2%] h-[28%] w-[42%] rounded-[50%] bg-black/70 blur-2xl" />
            {/* Soft light on the floor under the stand */}
            <div className="pointer-events-none absolute -bottom-[6%] left-[14%] h-[12%] w-[72%] rounded-[50%] bg-[#BFEFFF]/20 blur-2xl" />

            {/* Screen: even thin black bezel on every side */}
            <div className="relative z-10 bg-[#05080C] p-[5px] [clip-path:url(#pp-curved-screen)] md:p-1.5">
              {activeSlide.href ? (
                <Link
                  href={activeSlide.href}
                  aria-label={`Open ${activeSlide.eyebrow} page`}
                  className="block"
                >
                  {imageArea}
                </Link>
              ) : (
                imageArea
              )}
              {/* Light from the left: the right side of the panel falls darker */}
              <div className="pointer-events-none absolute inset-[5px] bg-[linear-gradient(90deg,rgba(255,255,255,0.06)_0%,transparent_22%,transparent_68%,rgba(0,0,0,0.2)_100%)] [clip-path:url(#pp-curved-screen)] md:inset-1.5" />
              {/* Glass glare and a sheen along the curved top edge */}
              <div className="pointer-events-none absolute inset-[5px] bg-[linear-gradient(115deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.05)_26%,transparent_38%)] [clip-path:url(#pp-curved-screen)] md:inset-1.5" />
              <div className="pointer-events-none absolute inset-[5px] bg-[radial-gradient(ellipse_at_50%_-30%,rgba(255,255,255,0.14),transparent_45%)] [clip-path:url(#pp-curved-screen)] md:inset-1.5" />
            </div>

            {/* Stand: tucked under the screen, lighter on the left, darker on
                the right, with a gently arched bottom edge */}
            <div className="relative z-[5] mx-[0.6%] -mt-3">
              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
              >
                <defs>
                  <linearGradient id="pp-stand-face" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#5A616B" />
                    <stop offset="0.45" stopColor="#3A4048" />
                    <stop offset="1" stopColor="#1E2329" />
                  </linearGradient>
                  <linearGradient id="pp-stand-shade" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#000" stopOpacity="0.4" />
                    <stop offset="0.14" stopColor="#000" stopOpacity="0" />
                    <stop offset="0.75" stopColor="#000" stopOpacity="0" />
                    <stop offset="1" stopColor="#000" stopOpacity="0.25" />
                  </linearGradient>
                </defs>
                <path d="M0,0 L100,0 L100,100 Q50,74 0,100 Z" fill="url(#pp-stand-face)" />
                <path d="M0,0 L100,0 L100,100 Q50,74 0,100 Z" fill="url(#pp-stand-shade)" />
              </svg>

              <div className="relative px-4 pb-9 pt-5 text-center md:pb-10 md:pt-6">
                <h2 className="sr-only">{activeSlide.title}</h2>
                {/* Text follows a gentle arch, like the curved display */}
                <svg
                  aria-hidden="true"
                  viewBox={`0 0 600 ${titleLines.length > 1 ? 104 : 74}`}
                  className="mx-auto block w-full max-w-[500px]"
                >
                  <defs>
                    {[24, 58, 90].map((y, index) => (
                      <path
                        key={y}
                        id={`pp-stand-arc-${index}`}
                        d={`M40,${y + 8} Q300,${y - 8} 560,${y + 8}`}
                      />
                    ))}
                  </defs>
                  <text fill="#00C2E8" fontSize="16" fontWeight="900" letterSpacing="5">
                    <textPath href="#pp-stand-arc-0" startOffset="50%" textAnchor="middle">
                      {activeSlide.eyebrow.toUpperCase()}
                    </textPath>
                  </text>
                  {titleLines.map((line, index) => (
                    <text key={line} fill="#FFFFFF" fontSize="25" fontWeight="900">
                      <textPath
                        href={`#pp-stand-arc-${index + 1}`}
                        startOffset="50%"
                        textAnchor="middle"
                      >
                        {line}
                      </textPath>
                    </text>
                  ))}
                </svg>
                {activeSlide.href ? (
                  <Link
                    href={activeSlide.href}
                    className="inline-flex rounded-full bg-[#FF6A00] px-5 py-2 text-xs font-black text-white shadow-lg transition hover:bg-[#007C91]"
                  >
                    View Product
                  </Link>
                ) : (
                  <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-5 py-2 text-xs font-black text-white">
                    Showcase
                  </span>
                )}
              </div>
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

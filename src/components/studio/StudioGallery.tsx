"use client";

import Image from "next/image";
import { useState } from "react";

type Work = { src: string; title: string; tag: string; tall?: boolean };

const P = "/images/products";
const works: Work[] = [
  { src: `${P}/luxury-packaging/luxury-packaging-front-v3-brand.webp`, title: "Luxury rigid gift box", tag: "Packaging", tall: true },
  { src: `${P}/labels-stickers/labels-stickers-hero-brand.webp`, title: "Product label set", tag: "Labels" },
  { src: `${P}/business-cards/business-cards-1-brand-v2.webp`, title: "Business cards", tag: "Stationery" },
  { src: `${P}/perfume-boxes/perfume-boxes-front-v3-brand.webp`, title: "Perfume box", tag: "Packaging" },
  { src: `${P}/menus/menus-1-brand.webp`, title: "Restaurant menu", tag: "Print" },
  { src: `${P}/thank-you-cards/thank-you-cards-1-brand-v2.webp`, title: "Thank-you cards", tag: "Stationery", tall: true },
  { src: `${P}/cosmetic-boxes/cosmetic-boxes-front-v4-brand.webp`, title: "Cosmetic carton", tag: "Packaging" },
  { src: `${P}/flyers/flyers-1-brand-v2.webp`, title: "Promo flyer", tag: "Print" },
  { src: `${P}/hang-tags/hang-tags-front-v3-brand.webp`, title: "Apparel hang tags", tag: "Labels" },
  { src: `${P}/candle-boxes/candle-boxes-front-v3-brand.webp`, title: "Candle box", tag: "Packaging", tall: true },
  { src: `${P}/brochures/brochures-1-brand.webp`, title: "Brochure", tag: "Print" },
  { src: `${P}/invitation-cards/invitation-cards-1-brand.webp`, title: "Invitation suite", tag: "Stationery" },
  { src: `${P}/paper-bags/paper-bags-front-brand.webp`, title: "Branded paper bag", tag: "Packaging" },
  { src: `${P}/postcards/postcards-1-brand.webp`, title: "Postcards", tag: "Print" },
  { src: `${P}/labels-stickers/labels-stickers-lifestyle-brand.webp`, title: "Jar and bottle labels", tag: "Labels", tall: true },
  { src: `${P}/greeting-cards/greeting-cards-1-brand.webp`, title: "Greeting cards", tag: "Stationery" },
];
const TAGS = ["All", "Packaging", "Labels", "Print", "Stationery"];

export default function StudioGallery() {
  const [tag, setTag] = useState("All");
  const shown = tag === "All" ? works : works.filter((w) => w.tag === tag);

  return (
    <div>
      <div role="tablist" aria-label="Filter design work" className="flex flex-wrap gap-2">
        {TAGS.map((t) => {
          const count = t === "All" ? works.length : works.filter((w) => w.tag === t).length;
          const active = t === tag;
          return (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTag(t)}
              className={`rounded-full border-2 px-5 py-2 text-sm font-bold transition ${active ? "border-[#16112B] bg-[#16112B] text-[#D9FF3F]" : "border-[#16112B]/15 bg-white text-[#16112B] hover:border-[#16112B]"}`}
            >
              {t} <span className="opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3">
        {shown.map((w) => (
          <figure key={w.src} className="studio-tilt group relative mb-5 break-inside-avoid overflow-hidden rounded-[28px] bg-[#EEE8FF]">
            <div className={`relative w-full ${w.tall ? "aspect-[4/5]" : "aspect-[4/3]"}`}>
              <Image src={w.src} alt={w.title} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <figcaption className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-2xl bg-white/90 px-4 py-3 backdrop-blur transition duration-300 sm:translate-y-3 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
              <span className="font-bold text-[#16112B]">{w.title}</span>
              <span className="rounded-full bg-[#6D4AFF] px-3 py-1 text-xs font-bold text-white">{w.tag}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

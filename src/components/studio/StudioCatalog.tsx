"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export type CatalogItem = { slug: string; name: string; tagline: string; img?: string };
export type CatalogGroup = { name: string; blurb: string; items: CatalogItem[] };

// Everything the studio designs and Printy prints, grouped like a print shop
export default function StudioCatalog({ groups }: { groups: CatalogGroup[] }) {
  const [active, setActive] = useState(0);
  const group = groups[active];

  return (
    <div>
      <div role="tablist" aria-label="Product groups" className="flex gap-2 overflow-x-auto pb-2">
        {groups.map((g, i) => (
          <button
            key={g.name}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`shrink-0 rounded-2xl border-2 px-5 py-3 text-left transition ${i === active ? "border-[#16112B] bg-[#16112B] text-white" : "border-[#16112B]/15 bg-white text-[#16112B] hover:border-[#16112B]"}`}
          >
            <span className="block font-extrabold">{g.name}</span>
            <span className={`text-xs font-semibold ${i === active ? "text-[#D9FF3F]" : "text-[#16112B]/50"}`}>{g.items.length} products</span>
          </button>
        ))}
      </div>

      <p className="mt-6 max-w-2xl text-[#16112B]/70">{group.blurb}</p>

      <div key={group.name} className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {group.items.map((item, i) => (
          <Link
            key={item.slug}
            href={`/products/${item.slug}`}
            className="studio-tilt group overflow-hidden rounded-[24px] border-2 border-[#16112B]/10 bg-white hover:border-[#16112B]"
            style={{ animation: `studio-pop 0.5s ${i * 40}ms both` }}
          >
            <div className="relative aspect-square overflow-hidden bg-[#EEE8FF]">
              {item.img && (
                <Image src={item.img} alt={item.name} fill sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw" className="object-cover transition duration-700 group-hover:scale-110" />
              )}
              <span className="absolute left-3 top-3 rounded-full bg-[#D9FF3F] px-3 py-1 text-[11px] font-bold text-[#16112B] opacity-0 transition group-hover:opacity-100">
                Design + print
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-extrabold leading-tight text-[#16112B]">{item.name}</h3>
              <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#16112B]/60">{item.tagline}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

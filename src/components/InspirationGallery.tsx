"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { InspirationImage } from "@/data/inspirationGallery";

type Group = {
  key: string;
  title: string;
  items: (InspirationImage & { productName: string })[];
};

export default function InspirationGallery({ groups }: { groups: Group[] }) {
  const all = groups.flatMap((group) => group.items);
  const [open, setOpen] = useState<number | null>(null);
  const current = open === null ? null : all[open];

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (delta: number) =>
      setOpen((index) =>
        index === null ? null : (index + delta + all.length) % all.length,
      ),
    [all.length],
  );

  useEffect(() => {
    if (open === null) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  // Index of each group's first image in the combined list
  const starts = groups.map((_, index) =>
    groups.slice(0, index).reduce((total, group) => total + group.items.length, 0),
  );

  return (
    <>
      {groups.map((group, groupIndex) => {
        const start = starts[groupIndex];

        return (
          <div key={group.key} className="mt-10">
            <h3 className="text-lg font-black">
              {group.title}{" "}
              <span className="text-sm font-bold text-slate-400">
                ({group.items.length})
              </span>
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {group.items.map((item, index) => (
                <li key={item.src}>
                  <button
                    type="button"
                    onClick={() => setOpen(start + index)}
                    aria-label={`View larger: ${item.label}`}
                    className="group block w-full overflow-hidden rounded-2xl border border-slate-200 bg-[#F7FAFC] text-left transition hover:-translate-y-0.5 hover:border-[#FF6A00] hover:shadow-lg"
                  >
                    <span className="relative block aspect-[4/3]">
                      <Image
                        src={item.src}
                        alt={`${item.label} — packaging style reference`}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition duration-300 group-hover:scale-[1.03]"
                      />
                    </span>
                    <span className="flex items-center justify-between gap-2 px-3 py-2.5">
                      <span className="text-xs font-black text-[#07111F]">
                        {item.label}
                      </span>
                      <span
                        aria-hidden="true"
                        className="text-xs font-black text-[#FF6A00]"
                      >
                        ⤢
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      })}

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.label}
          onClick={close}
          className="fixed inset-0 z-[1000001] flex items-center justify-center bg-[#07111F]/90 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-4xl overflow-hidden rounded-[1.5rem] bg-white shadow-2xl"
          >
            <div className="relative aspect-[4/3] bg-[#F7FAFC]">
              <Image
                key={current.src}
                src={current.src}
                alt={`${current.label} — packaging style reference`}
                fill
                sizes="(max-width: 900px) 100vw, 900px"
                loading="eager"
                className="object-contain"
              />
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl font-black text-[#07111F] shadow-lg hover:bg-[#FF6A00] hover:text-white"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next image"
                className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl font-black text-[#07111F] shadow-lg hover:bg-[#FF6A00] hover:text-white"
              >
                ›
              </button>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#07111F] text-lg font-black text-white hover:bg-[#FF6A00]"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-lg font-black text-[#07111F]">{current.label}</p>
                <p className="text-sm text-slate-500">
                  We make this style with your branding · {(open ?? 0) + 1} / {all.length}
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2">
                <Link
                  href={`/products/${current.product}`}
                  className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-black text-[#07111F] hover:border-[#FF6A00] hover:text-[#FF6A00]"
                >
                  View {current.productName}
                </Link>
                <Link
                  href={`/?product=${current.product}#quote`}
                  className="rounded-full bg-[#FF6A00] px-5 py-2.5 text-sm font-black text-white hover:bg-[#007C91]"
                >
                  Get a quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

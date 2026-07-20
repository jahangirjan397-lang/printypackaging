"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductImage } from "../data/products";

type ProductImageGalleryProps = {
  productName: string;
  images?: ProductImage[];
};

export default function ProductImageGallery({
  productName,
  images = [],
}: ProductImageGalleryProps) {
  const galleryImages = images.slice(0, 5);
  const [activeIndex, setActiveIndex] = useState(0);

  const safeIndex = Math.min(activeIndex, galleryImages.length - 1);
  const activeImage = galleryImages[safeIndex];

  if (!activeImage) {
    return (
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 shadow-2xl">
        <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#07111F] via-[#007C91] to-[#00C2E8]">
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:24px_24px]" />

          <div className="absolute left-6 top-6 rounded-full bg-white/15 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white backdrop-blur">
            Custom Packaging
          </div>

          <div className="absolute bottom-10 left-8 h-36 w-44 rotate-[-7deg] rounded-2xl bg-white shadow-2xl" />

          <div className="absolute bottom-16 right-8 h-56 w-40 rounded-2xl bg-[#07111F] shadow-2xl">
            <div className="mx-auto mt-10 h-16 w-16 rounded-full border border-[#FF6A00]" />

            <p className="mt-7 px-4 text-center text-lg font-black text-white">
              {productName}
            </p>
          </div>

          <div className="absolute bottom-5 right-5 rounded-full bg-[#FF6A00] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white">
            Made To Specification
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 shadow-2xl">
      <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-white">
        <Image
          src={activeImage.src}
          alt={activeImage.alt}
          fill
          priority={safeIndex === 0}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain"
        />

        <div className="absolute bottom-4 left-4 rounded-full bg-[#07111F]/85 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white backdrop-blur">
          {activeImage.title}
        </div>

        <div className="absolute right-4 top-4 rounded-full bg-[#FF6A00] px-3 py-2 text-xs font-black text-white">
          {safeIndex + 1} / {galleryImages.length}
        </div>
      </div>

      {galleryImages.length > 1 && (
        <div className="mt-4 grid grid-cols-5 gap-2">
          {galleryImages.map((image, index) => (
            <button
              key={`${image.src}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`View ${image.title}`}
              aria-pressed={index === safeIndex}
              className={`relative aspect-square overflow-hidden rounded-xl border-2 bg-white transition ${
                index === safeIndex
                  ? "border-[#FF6A00]"
                  : "border-transparent hover:border-[#00C2E8]"
              }`}
            >
              <Image
                src={image.src}
                alt=""
                fill
                sizes="100px"
                className="object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
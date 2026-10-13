"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export type BlogCard = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: { src: string; alt: string };
};

// Blog list with category chips; "All" shows every post
export default function BlogGrid({ posts }: { posts: BlogCard[] }) {
  const categories = ["All", ...new Set(posts.map((post) => post.category))];
  const [active, setActive] = useState("All");
  const shown = active === "All" ? posts : posts.filter((post) => post.category === active);

  return (
    <div>
      {categories.length > 2 && (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter guides by topic">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={active === category}
              onClick={() => setActive(category)}
              className={`rounded-full border px-4 py-2 text-sm font-black transition ${
                active === category
                  ? "border-[#07111F] bg-[#07111F] text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-[#FF6A00] hover:text-[#FF6A00]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-200/60 transition hover:-translate-y-1 hover:border-[#FF6A00]"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-[#EDE5DC]">
              <Image
                src={post.image.src}
                alt={post.image.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
              />
            </div>

            <div className="flex flex-1 flex-col p-7">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-[#FF6A00]">
                {post.category}
              </p>

              <h2 className="mt-3 text-xl font-black leading-snug tracking-tight sm:text-2xl">
                {post.title}
              </h2>

              <p className="mt-3 line-clamp-3 leading-7 text-slate-600">{post.excerpt}</p>

              <div className="mt-auto flex items-center justify-between gap-3 pt-6 text-sm font-bold text-slate-500">
                <span>
                  {post.readTime} · {post.date}
                </span>
                <span className="font-black text-[#FF6A00]">Read →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

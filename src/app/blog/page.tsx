import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/data/blogs";

export const metadata: Metadata = {
  title: "Packaging Blog | Custom Boxes, Materials, Finishes & Quote Guides",
  description:
    "Read Printy Packaging blog guides about custom boxes, packaging materials, finishing options, artwork, dielines, ecommerce packaging and food packaging.",
};

export default function BlogPage() {
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  return (
    <main className="bg-[#07111F] text-white">
      <section className="relative overflow-hidden border-b border-cyan-400/10 bg-gradient-to-br from-[#07111F] via-[#09243A] to-[#061525]">
        <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-400/10 px-5 py-2 text-sm font-black text-cyan-200">
              Packaging Blog
            </div>

            <h1 className="mt-8 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Packaging guides for{" "}
              <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-cyan-300 bg-clip-text text-transparent">
                custom box buyers.
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Learn about custom packaging quotes, materials, finishing,
              artwork, dielines, ecommerce boxes and food packaging before
              starting your project.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/?product=mailer-boxes#quote"
                className="rounded-full bg-[#FF6A00] px-7 py-3 text-center text-sm font-black text-white shadow-xl shadow-orange-500/25 transition hover:bg-[#007C91]"
              >
                Get Quote
              </Link>

              <Link
                href="/resources"
                className="rounded-full border border-white/15 px-7 py-3 text-center text-sm font-bold text-white transition hover:border-cyan-300 hover:text-cyan-300"
              >
                Resources
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 text-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="group grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/70 transition hover:-translate-y-1 hover:border-[#FF6A00] lg:grid-cols-[0.95fr_1.05fr]"
          >
            <div className="relative min-h-80 bg-gradient-to-br from-[#07111F] via-[#007C91] to-[#00C2E8]">
              <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:24px_24px]" />
              <div className="absolute left-8 top-8 rounded-full bg-white/15 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white backdrop-blur">
                Featured
              </div>
              <div className="absolute bottom-8 left-8 h-36 w-44 rotate-[-7deg] rounded-2xl bg-white shadow-2xl" />
              <div className="absolute bottom-14 right-10 h-48 w-36 rounded-2xl bg-[#07111F] shadow-2xl">
                <div className="mx-auto mt-10 h-14 w-14 rounded-full border border-[#FF6A00]" />
              </div>
            </div>

            <div className="p-8 sm:p-10">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#FF6A00]">
                {featuredPost.category}
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                {featuredPost.title}
              </h2>

              <p className="mt-5 leading-8 text-slate-600">
                {featuredPost.excerpt}
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold text-slate-500">
                <span>{featuredPost.readTime}</span>
                <span>•</span>
                <span>{featuredPost.publishedAt}</span>
              </div>

              <span className="mt-8 inline-flex rounded-full bg-[#FF6A00] px-6 py-3 text-sm font-black text-white transition group-hover:bg-[#007C91]">
                Read Article
              </span>
            </div>
          </Link>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {otherPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-lg shadow-slate-200/60 transition hover:-translate-y-1 hover:border-[#FF6A00]"
              >
                <div className="mb-5 h-11 w-11 rounded-2xl bg-[#FF6A00] shadow-lg shadow-orange-500/20 transition group-hover:bg-[#007C91]" />

                <p className="text-xs font-black uppercase tracking-[0.25em] text-[#FF6A00]">
                  {post.category}
                </p>

                <h2 className="mt-4 text-2xl font-black tracking-tight">
                  {post.title}
                </h2>

                <p className="mt-4 leading-7 text-slate-600">{post.excerpt}</p>

                <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold text-slate-500">
                  <span>{post.readTime}</span>
                  <span>•</span>
                  <span>{post.publishedAt}</span>
                </div>

                <span className="mt-6 inline-flex text-sm font-black text-[#FF6A00]">
                  Read guide →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
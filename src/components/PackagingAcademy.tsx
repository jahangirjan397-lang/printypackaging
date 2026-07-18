import Link from "next/link";
import { blogPosts } from "../data/blogPosts";

const posts = blogPosts.slice(0, 4);

export default function PackagingAcademy() {
  return (
    <section
      id="blog"
      className="bg-[#F7FAFC] px-4 py-16 sm:px-5 md:px-8 md:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#FF6A00] md:text-sm">
              Packaging Academy
            </p>

            <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight text-[#07111F] sm:text-4xl md:text-6xl">
              Helpful guides for packaging buyers
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
              Learn about box styles, materials, printing, finishing and artwork
              setup before ordering custom packaging.
            </p>
          </div>

          <Link
            href="/blog"
            prefetch={false}
            className="inline-flex w-fit rounded-full bg-[#07111F] px-7 py-4 text-sm font-black text-white shadow-xl shadow-slate-900/20 transition hover:-translate-y-1 hover:bg-[#FF6A00]"
          >
            View All Guides
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-6">
          {posts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              prefetch={false}
              className="group overflow-hidden rounded-[1.7rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-40 overflow-hidden bg-gradient-to-br from-[#07111F] via-[#007C91] to-[#00C2E8]">
                <div className="pointer-events-none absolute inset-0 opacity-15 [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:24px_24px]" />

                <div className="absolute bottom-5 left-5 h-16 w-24 rotate-[-8deg] rounded-2xl bg-white shadow-2xl transition duration-300 group-hover:rotate-[-3deg]" />

                <div className="absolute bottom-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#FF6A00] text-xs font-black text-white">
                  {index + 1}
                </div>

                <span className="absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1 text-xs font-black text-[#07111F]">
                  Guide
                </span>
              </div>

              <div className="p-6 md:p-7">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#FF6A00]">
                  {post.category}
                </p>

                <h3 className="mt-3 text-lg font-black leading-7 text-[#07111F] md:text-xl">
                  {post.title}
                </h3>

                <p className="mt-3 min-h-20 text-sm leading-6 text-slate-600">
                  {post.excerpt}
                </p>

                <span className="mt-5 inline-flex font-black text-[#FF6A00] transition group-hover:text-[#007C91]">
                  Read Guide &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

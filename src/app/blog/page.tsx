import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { blogPosts, formatBlogDate } from "@/data/blogs";
import { getBlogVisual } from "@/data/blogVisuals";
import BlogGrid from "@/components/BlogGrid";

const siteUrl = "https://printypackaging.com";

export const metadata: Metadata = {
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
  title: "Packaging Blog: Guides for Custom Boxes",
  description:
    "Practical guides for custom box buyers: prices, sizes, materials, finishing, artwork and dielines, mailer boxes and food packaging, from Printy Packaging.",
};

export default function BlogPage() {
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1).map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    readTime: post.readTime,
    date: formatBlogDate(post.publishedAt),
    image: getBlogVisual(post.slug),
  }));

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${siteUrl}/blog#blog`,
    name: "Printy Packaging Blog",
    url: `${siteUrl}/blog`,
    publisher: { "@id": `${siteUrl}#organization` },
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${siteUrl}/blog/${post.slug}`,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt || post.publishedAt,
      image: `${siteUrl}${getBlogVisual(post.slug).src}`,
    })),
  };

  return (
    <main className="bg-[#07111F] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <section className="relative overflow-hidden border-b border-cyan-400/10 bg-gradient-to-br from-[#07111F] via-[#09243A] to-[#061525]">
        <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-400/10 px-5 py-2 text-sm font-black text-cyan-200">
              Packaging Blog
            </div>

            <h1 className="mt-7 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Packaging guides for{" "}
              <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-cyan-300 bg-clip-text text-transparent">
                custom box buyers.
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Straight answers on box prices, sizes, materials, finishing and
              artwork, written from real orders, so you can plan your
              packaging before you ask for a quote.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact#quote"
                className="rounded-full bg-[#FF6A00] px-7 py-3 text-center text-sm font-black text-white shadow-xl shadow-orange-500/25 transition hover:bg-[#007C91]"
              >
                Get Free Quote
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
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="group grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/70 transition hover:-translate-y-1 hover:border-[#FF6A00] lg:grid-cols-[0.95fr_1.05fr]"
          >
            <div className="relative aspect-[4/3] bg-[#EDE5DC] lg:aspect-auto lg:h-full lg:min-h-[24rem]">
              <Image
                src={getBlogVisual(featuredPost.slug).src}
                alt={getBlogVisual(featuredPost.slug).alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover object-center"
              />
            </div>

            <div className="flex flex-col justify-center p-8 sm:p-10">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#FF6A00]">
                Latest guide · {featuredPost.category}
              </p>

              <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
                {featuredPost.title}
              </h2>

              <p className="mt-5 leading-8 text-slate-600">
                {featuredPost.excerpt}
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold text-slate-500">
                <span>{featuredPost.readTime}</span>
                <span>•</span>
                <span>{formatBlogDate(featuredPost.publishedAt)}</span>
              </div>

              <span className="mt-8 inline-flex self-start rounded-full bg-[#FF6A00] px-6 py-3 text-sm font-black text-white transition group-hover:bg-[#007C91]">
                Read Article
              </span>
            </div>
          </Link>

          <div className="mt-14">
            <BlogGrid posts={otherPosts} />
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-start gap-6 rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 sm:p-10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-300">
              Ready to order?
            </p>
            <p className="mt-3 text-3xl font-black tracking-tight">
              Get your exact box price, free.
            </p>
            <p className="mt-3 max-w-xl leading-7 text-slate-300">
              Tell us your box, size and quantity. Reply within 1 hour, from
              just 100 pcs, with a free dieline and digital proof.
            </p>
          </div>
          <Link
            href="/contact#quote"
            className="shrink-0 rounded-full bg-[#FF6A00] px-8 py-4 text-sm font-black text-white shadow-xl shadow-orange-500/25 transition hover:bg-[#007C91]"
          >
            Get Free Quote
          </Link>
        </div>
      </section>
    </main>
  );
}

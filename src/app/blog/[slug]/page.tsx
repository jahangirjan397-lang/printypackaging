import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPostBySlug } from "@/data/blogs";

const siteUrl = "https://printypackaging.com";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog Article Not Found | Printy Packaging",
    };
  }

  return {
    title: `${post.title} | Printy Packaging Blog`,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: {
      canonical: `${siteUrl}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `${siteUrl}/blog/${post.slug}`,
      siteName: "Printy Packaging",
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Organization",
      name: "Printy Packaging",
    },
    publisher: {
      "@type": "Organization",
      name: "Printy Packaging",
      url: siteUrl,
    },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
    keywords: post.keywords.join(", "),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${siteUrl}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <main className="bg-[#07111F] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="relative overflow-hidden border-b border-cyan-400/10 bg-gradient-to-br from-[#07111F] via-[#09243A] to-[#061525]">
        <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-6 py-20 sm:py-24 lg:px-8">
          <div className="mb-8 flex flex-wrap items-center gap-2 text-sm font-bold text-slate-300">
            <Link href="/" className="hover:text-cyan-300">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-cyan-300">
              Blog
            </Link>
            <span>/</span>
            <span className="text-[#FF6A00]">{post.category}</span>
          </div>

          <div className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-400/10 px-5 py-2 text-sm font-black text-cyan-200">
            {post.category}
          </div>

          <h1 className="mt-8 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            {post.title}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            {post.excerpt}
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold text-slate-400">
            <span>{post.readTime}</span>
            <span>•</span>
            <span>{post.publishedAt}</span>
          </div>

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
      </section>

      <section className="bg-white text-slate-950">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#FF6A00]">
                Article Guide
              </p>

              <h2 className="mt-4 text-2xl font-black tracking-tight">
                What this guide covers
              </h2>

              <div className="mt-6 grid gap-3">
                {post.sections.map((section) => (
                  <a
                    key={section.heading}
                    href={`#${section.heading
                      .toLowerCase()
                      .replaceAll(" ", "-")}`}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 transition hover:border-[#FF6A00] hover:text-[#FF6A00]"
                  >
                    {section.heading}
                  </a>
                ))}
              </div>
            </div>
          </aside>

          <article className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7 sm:p-10">
            <div className="space-y-10">
              {post.sections.map((section) => (
                <section
                  key={section.heading}
                  id={section.heading.toLowerCase().replaceAll(" ", "-")}
                >
                  <h2 className="text-3xl font-black tracking-tight text-[#07111F]">
                    {section.heading}
                  </h2>

                  <p className="mt-4 text-lg leading-9 text-slate-600">
                    {section.body}
                  </p>
                </section>
              ))}
            </div>

            <div className="mt-12 rounded-[2rem] bg-[#07111F] p-7 text-white">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-300">
                Need Packaging Help?
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-tight">
                Send your packaging details for quote support.
              </h2>

              <p className="mt-4 leading-8 text-slate-300">
                Share size, quantity, material, printing, finishing, artwork
                status and delivery country for better guidance.
              </p>

              <Link
                href="/?product=mailer-boxes#quote"
                className="mt-6 inline-flex rounded-full bg-[#FF6A00] px-7 py-3 text-sm font-black text-white transition hover:bg-[#007C91]"
              >
                Request Quote
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="bg-slate-50 text-slate-950">
        <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-[#FF6A00]">
            FAQ
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-tight">
            Common questions
          </h2>

          <div className="mt-10 space-y-4">
            {post.faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-[1.5rem] border border-slate-200 bg-white p-6"
              >
                <summary className="cursor-pointer list-none font-black text-[#07111F]">
                  <span className="flex items-center justify-between gap-5">
                    {faq.question}
                    <span className="text-[#FF6A00] transition group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>

                <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#07111F] px-6 py-16 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-300">
            Related Articles
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-tight">
            More packaging guides
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {relatedPosts.map((related) => (
              <Link
                key={related.slug}
                href={`/blog/${related.slug}`}
                className="rounded-3xl border border-white/10 bg-white/[0.05] p-7 transition hover:-translate-y-1 hover:border-[#FF6A00]"
              >
                <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-300">
                  {related.category}
                </p>

                <h3 className="mt-4 text-2xl font-black tracking-tight">
                  {related.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-300">
                  {related.excerpt}
                </p>

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
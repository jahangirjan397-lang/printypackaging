import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  blogPosts,
  formatBlogDate,
  getBlogPostBySlug,
  getRelatedPosts,
} from "@/data/blogs";
import { getBlogVisual } from "@/data/blogVisuals";
import { products } from "@/data/products";
import type { BlogPost } from "@/data/blogs";
import ShareButtons from "@/components/ShareButtons";
import ProductQuickQuote from "@/components/ProductQuickQuote";

const siteUrl = "https://printypackaging.com";
const organizationId = `${siteUrl}#organization`;
const websiteId = `${siteUrl}#website`;
const defaultAuthor = "Printy Packaging Team";

// Google shows about 60 characters of a title and 155-160 of a description
function seoTitle(post: BlogPost) {
  if (post.seoTitle?.trim()) return post.seoTitle.trim();
  const branded = `${post.title} | Printy Packaging`;
  return branded.length <= 60 ? branded : post.title;
}

function seoDescription(post: BlogPost) {
  const text = (post.metaDescription?.trim() || post.excerpt).replace(/\s+/g, " ");
  if (text.length <= 160) return text;
  return `${text.slice(0, 157).replace(/\s+\S*$/, "")}…`;
}

// Products linked from the article: the ones chosen in /admin, otherwise
// products whose name appears in the article text
function articleProducts(post: BlogPost) {
  const chosen = (post.relatedProducts ?? [])
    .map((slug) => products.find((product) => product.slug === slug))
    .filter((product): product is (typeof products)[number] => Boolean(product));
  if (chosen.length) return chosen.slice(0, 4);

  const text = [post.title, ...post.sections.map((s) => `${s.heading} ${s.body}`)]
    .join(" ")
    .toLowerCase();
  return products
    .map((product) => ({
      product,
      hits: text.split(product.name.toLowerCase()).length - 1,
    }))
    .filter((item) => item.hits > 0)
    .sort((a, b) => b.hits - a.hits)
    .slice(0, 3)
    .map((item) => item.product);
}

function headingId(heading: string) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

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

  const image = `${siteUrl}${getBlogVisual(post.slug).src}`;
  const description = seoDescription(post);

  return {
    title: { absolute: seoTitle(post) },
    description,
    keywords: post.keywords,
    authors: [{ name: post.author || defaultAuthor }],
    alternates: {
      canonical: `${siteUrl}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description,
      type: "article",
      url: `${siteUrl}/blog/${post.slug}`,
      siteName: "Printy Packaging",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      images: [{ url: image, alt: getBlogVisual(post.slug).alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [image],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post);

  const articleVisual = getBlogVisual(post.slug);
  const linkedProducts = articleProducts(post);
  const author = post.author || defaultAuthor;
  const updatedAt = post.updatedAt && post.updatedAt > post.publishedAt ? post.updatedAt : "";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: seoDescription(post),
    image: [`${siteUrl}${articleVisual.src}`],
    datePublished: post.publishedAt,
    dateModified: updatedAt || post.publishedAt,
    author:
      author === defaultAuthor
        ? { "@id": organizationId }
        : { "@type": "Person", name: author, worksFor: { "@id": organizationId } },
    publisher: {
      "@id": organizationId,
    },
    isPartOf: {
      "@id": websiteId,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${post.slug}`,
    },
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

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
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

          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
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
                <span>By {author}</span>
                <span>•</span>
                <span>{post.readTime}</span>
                <span>•</span>
                <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
                {updatedAt && (
                  <>
                    <span>•</span>
                    <span>
                      Updated <time dateTime={updatedAt}>{formatBlogDate(updatedAt)}</time>
                    </span>
                  </>
                )}
              </div>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#product-quote"
                  className="rounded-full bg-[#FF6A00] px-7 py-3 text-center text-sm font-black text-white shadow-xl shadow-orange-500/25 transition hover:bg-[#007C91]"
                >
                  Get Free Quote
                </a>

                <Link
                  href="/blog"
                  className="rounded-full border border-white/15 px-7 py-3 text-center text-sm font-bold text-white transition hover:border-cyan-300 hover:text-cyan-300"
                >
                  All Guides
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 shadow-2xl">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-[#EDE5DC]">
                <Image
                  src={articleVisual.src}
                  alt={articleVisual.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
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

              <p className="mt-4 text-2xl font-black tracking-tight">
                What this guide covers
              </p>

              <div className="mt-6 grid gap-3">
                {post.sections.map((section) => (
                  <a
                    key={section.heading}
                    href={`#${headingId(section.heading)}`}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 transition hover:border-[#FF6A00] hover:text-[#FF6A00]"
                  >
                    {section.heading}
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-5 hidden rounded-[2rem] bg-[#07111F] p-7 text-white lg:block">
              <p className="text-xl font-black tracking-tight">
                Need a price for your boxes?
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Send size and quantity. Free quote within 1 hour, from 100
                pcs.
              </p>
              <a
                href="#product-quote"
                className="mt-5 inline-flex rounded-full bg-[#FF6A00] px-6 py-3 text-sm font-black text-white transition hover:bg-[#007C91]"
              >
                Get Free Quote
              </a>
            </div>
          </aside>

          <article className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7 sm:p-10">
            <div className="mb-10 border-b border-slate-200 pb-6">
              <ShareButtons
                url={`${siteUrl}/blog/${post.slug}`}
                title={post.title}
                image={`${siteUrl}${articleVisual.src}`}
              />
            </div>

            {post.keyTakeaways.length > 0 && (
              <div className="mb-10 rounded-[1.5rem] border-l-4 border-[#FF6A00] bg-white p-6 shadow-sm">
                <p className="text-sm font-black uppercase tracking-[0.25em] text-[#FF6A00]">
                  Key takeaways
                </p>
                <ul className="mt-4 space-y-3">
                  {post.keyTakeaways.map((item) => (
                    <li key={item} className="flex gap-3 leading-7 text-slate-700">
                      <span aria-hidden="true" className="mt-0.5 font-black text-[#007C91]">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-10">
              {post.sections.map((section, sectionIndex) => (
                <section
                  key={section.heading}
                  id={headingId(section.heading)}
                >
                  <h2 className="text-3xl font-black tracking-tight text-[#07111F]">
                    {section.heading}
                  </h2>

                  {section.body.split(/\n\s*\n/).map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className="mt-4 text-lg leading-9 text-slate-600"
                    >
                      {paragraph}
                    </p>
                  ))}

                  {section.table && (
                    <div className="mt-6 overflow-x-auto rounded-[1.5rem] border border-slate-200 bg-white">
                      <table className="w-full min-w-[560px] text-left text-sm">
                        <caption className="sr-only">{section.table.caption}</caption>
                        <thead className="bg-[#07111F] text-xs uppercase tracking-[0.14em] text-white">
                          <tr>
                            {section.table.headers.map((header) => (
                              <th key={header} scope="col" className="px-5 py-4 font-black">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {section.table.rows.map((row) => (
                            <tr key={row[0]} className="border-t border-slate-100">
                              {row.map((cell, index) =>
                                index === 0 ? (
                                  <th key={cell} scope="row" className="px-5 py-4 font-black text-[#07111F]">
                                    {cell}
                                  </th>
                                ) : (
                                  <td key={`${row[0]}-${index}`} className="px-5 py-4 text-slate-600">
                                    {cell}
                                  </td>
                                ),
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {sectionIndex === 1 && post.sections.length > 3 && (
                    <div className="mt-10 flex flex-col gap-4 rounded-[1.5rem] bg-[#FFF4EC] p-6 sm:flex-row sm:items-center sm:justify-between">
                      <p className="font-black text-[#07111F]">
                        Already know your box?{" "}
                        <span className="font-bold text-slate-600">
                          Get your exact price free within 1 hour.
                        </span>
                      </p>
                      <a
                        href="#product-quote"
                        className="shrink-0 self-start rounded-full bg-[#FF6A00] px-6 py-3 text-sm font-black text-white transition hover:bg-[#007C91] sm:self-auto"
                      >
                        Get Free Quote
                      </a>
                    </div>
                  )}
                </section>
              ))}
            </div>

            {linkedProducts.length > 0 && (
              <div className="mt-12">
                <p className="text-sm font-black uppercase tracking-[0.25em] text-[#FF6A00]">
                  Products in this guide
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {linkedProducts.map((product) => (
                    <Link
                      key={product.slug}
                      href={`/products/${product.slug}`}
                      className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-3 transition hover:-translate-y-0.5 hover:border-[#FF6A00]"
                    >
                      {product.images?.[0] && (
                        <span className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                          <Image
                            src={product.images[0].src}
                            alt={product.images[0].alt || product.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </span>
                      )}
                      <span>
                        <span className="block font-black text-[#07111F] group-hover:text-[#FF6A00]">
                          Custom {product.name}
                        </span>
                        <span className="mt-0.5 block text-xs leading-5 text-slate-500">
                          {product.tagline}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-10 flex items-start gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#07111F] text-lg font-black text-white">
                {author.slice(0, 1)}
              </span>
              <span>
                <span className="block text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                  Written by
                </span>
                <span className="block font-black text-[#07111F]">{author}</span>
                <span className="mt-1 block text-sm leading-6 text-slate-600">
                  Printy Packaging makes custom boxes, butter paper, labels and
                  retail packaging for brands in the USA, UK, Europe and the
                  UAE. Our guides are written from real orders and supplier
                  experience.
                </span>
              </span>
            </div>

            <div className="mt-10">
              <ProductQuickQuote
                productName={`Custom packaging (blog: ${post.title})`}
                productSlug={linkedProducts[0]?.slug ?? ""}
                heading="Get your custom packaging price"
                formName="blog_quick_quote"
              />
            </div>
          </article>
        </div>
      </section>

      <section className="bg-slate-50 text-slate-950">
        <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
          <p className="text-center text-sm font-black uppercase tracking-[0.25em] text-[#FF6A00]">
            FAQ
          </p>

          <h2 className="text-center mt-4 text-4xl font-black tracking-tight">
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
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] transition hover:-translate-y-1 hover:border-[#FF6A00]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#EDE5DC]">
                  <Image
                    src={getBlogVisual(related.slug).src}
                    alt={getBlogVisual(related.slug).alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-7">
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
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

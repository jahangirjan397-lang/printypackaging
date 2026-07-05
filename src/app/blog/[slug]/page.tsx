import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import FloatingActions from "../../../components/FloatingActions";
import { blogPosts, getBlogPostBySlug } from "../../../data/blogPosts";

const siteUrl = "https://printypackaging.com";
const brandName = "Printy Packaging";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: `Blog Not Found | ${brandName}`,
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const title = `${post.title} | ${brandName}`;
  const description = post.excerpt;

  return {
    title,
    description,
    keywords: post.keywords,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title,
      description,
      url: postUrl,
      siteName: brandName,
      type: "article",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const relatedProductUrl = `/products/${post.relatedProductSlug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    articleSection: post.category,
    author: {
      "@type": "Organization",
      name: brandName,
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: brandName,
      url: siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
  };

  const breadcrumbJsonLd = {
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
        item: postUrl,
      },
    ],
  };

  return (
    <>
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      <main>
        <section className="relative overflow-hidden bg-[#07111F] px-5 py-20 text-white md:px-8 md:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,194,232,0.22),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(255,106,0,0.14),transparent_30%)]" />

          <div className="relative mx-auto max-w-4xl">
            <div className="mb-8 flex flex-wrap items-center gap-2 text-sm font-bold text-slate-300">
              <Link href="/" prefetch={false} className="hover:text-[#00C2E8]">
                Home
              </Link>
              <span>/</span>
              <Link
                href="/blog"
                prefetch={false}
                className="hover:text-[#00C2E8]"
              >
                Blog
              </Link>
              <span>/</span>
              <span className="text-[#FF6A00]">{post.title}</span>
            </div>

            <p className="text-sm font-black uppercase tracking-[0.35em] text-[#00C2E8]">
              {post.category}
            </p>

            <h1 className="mt-5 text-4xl font-black leading-tight md:text-7xl">
              {post.title}
            </h1>

            <p className="mt-6 text-xl leading-8 text-slate-300">
              {post.excerpt}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={relatedProductUrl}
                prefetch={false}
                className="rounded-full bg-[#FF6A00] px-8 py-4 font-black text-white transition hover:-translate-y-1 hover:bg-[#007C91]"
              >
                View {post.relatedProductName}
              </Link>

              <Link
                href="/#quote"
                prefetch={false}
                className="rounded-full border border-white/20 px-8 py-4 font-black text-white transition hover:bg-white hover:text-[#07111F]"
              >
                Get Quote
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-20 md:px-8">
          <article className="mx-auto max-w-4xl">
            {post.sections.map((section) => (
              <div key={section.heading} className="mb-12">
                <h2 className="text-3xl font-black text-[#07111F] md:text-4xl">
                  {section.heading}
                </h2>

                <p className="mt-5 text-lg leading-8 text-slate-600">
                  {section.text}
                </p>
              </div>
            ))}

            <div className="mt-14 rounded-[2rem] bg-[#F7FAFC] p-8">
              <p className="text-sm font-black uppercase tracking-[0.3em] text-[#FF6A00]">
                Related Product
              </p>

              <h3 className="mt-3 text-3xl font-black text-[#07111F]">
                {post.relatedProductName}
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                Learn more about this packaging solution and request a custom
                quote for size, material, printing and finishing guidance.
              </p>

              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href={relatedProductUrl}
                  prefetch={false}
                  className="inline-flex rounded-full bg-[#07111F] px-7 py-4 font-black text-white transition hover:-translate-y-1 hover:bg-[#FF6A00]"
                >
                  Open Product Page
                </Link>

                <Link
                  href="/#quote"
                  prefetch={false}
                  className="inline-flex rounded-full border border-slate-300 px-7 py-4 font-black text-[#07111F] transition hover:border-[#00C2E8] hover:text-[#007C91]"
                >
                  Request Quote
                </Link>
              </div>
            </div>
          </article>
        </section>
      </main>

      <Footer />
      <FloatingActions />
    </>
  );
}
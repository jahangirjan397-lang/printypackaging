import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import FloatingActions from "../../../components/FloatingActions";
import { blogPosts, getBlogPostBySlug } from "../../../data/blogPosts";

type PageProps = {
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
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog Not Found | Printy Packaging",
    };
  }

  return {
    title: `${post.title} | Printy Packaging`,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: {
      canonical: `https://printypackaging.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://printypackaging.com/blog/${post.slug}`,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Organization",
      name: "Printy Packaging",
    },
    publisher: {
      "@type": "Organization",
      name: "Printy Packaging",
    },
    mainEntityOfPage: `https://printypackaging.com/blog/${post.slug}`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://printypackaging.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://printypackaging.com/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://printypackaging.com/blog/${post.slug}`,
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
              <a href="/" className="hover:text-[#00C2E8]">
                Home
              </a>
              <span>/</span>
              <a href="/blog" className="hover:text-[#00C2E8]">
                Blog
              </a>
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
              <a
                href={`/products/${post.relatedProductSlug}`}
                className="rounded-full bg-[#FF6A00] px-8 py-4 font-black text-white transition hover:bg-[#007C91]"
              >
                View {post.relatedProductName}
              </a>

              <a
                href="/#quote"
                className="rounded-full border border-white/20 px-8 py-4 font-black text-white transition hover:bg-white hover:text-[#07111F]"
              >
                Get Quote
              </a>
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

              <p className="mt-4 text-slate-600">
                Learn more about this packaging solution and request a custom quote.
              </p>

              <a
                href={`/products/${post.relatedProductSlug}`}
                className="mt-6 inline-flex rounded-full bg-[#07111F] px-7 py-4 font-black text-white"
              >
                Open Product Page
              </a>
            </div>
          </article>
        </section>
      </main>

      <Footer />
      <FloatingActions />
    </>
  );
}
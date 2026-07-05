import type { Metadata } from "next";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FloatingActions from "../../components/FloatingActions";
import { blogPosts } from "../../data/blogPosts";

const siteUrl = "https://printypackaging.com";
const brandName = "Printy Packaging";

export const metadata: Metadata = {
  title: "Packaging Academy | Custom Packaging Guides | Printy Packaging",
  description:
    "Read professional packaging guides about rigid boxes, butter paper, food packaging, mailer boxes, paper bags, cosmetic boxes and premium finishing options.",
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
  openGraph: {
    title: "Packaging Academy | Custom Packaging Guides | Printy Packaging",
    description:
      "Learn about custom packaging, printing finishes, materials and buyer decisions before starting your packaging project.",
    url: `${siteUrl}/blog`,
    siteName: brandName,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Packaging Academy | Printy Packaging",
    description:
      "Custom packaging guides for smart buyers, brands and ecommerce businesses.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BlogPage() {
  const blogPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Packaging Academy",
    description:
      "Packaging guides about custom boxes, materials, printing, finishing and product packaging decisions.",
    url: `${siteUrl}/blog`,
    isPartOf: {
      "@type": "WebSite",
      name: brandName,
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: brandName,
      url: siteUrl,
    },
  };

  const blogListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: blogPosts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: post.title,
      url: `${siteUrl}/blog/${post.slug}`,
    })),
  };

  return (
    <>
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPageJsonLd),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogListJsonLd),
        }}
      />

      <main>
        <section className="relative overflow-hidden bg-[#07111F] px-5 py-20 text-white md:px-8 md:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,194,232,0.22),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(255,106,0,0.14),transparent_30%)]" />

          <div className="relative mx-auto max-w-7xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.35em] text-[#00C2E8]">
              Packaging Academy
            </p>

            <h1 className="mt-5 text-4xl font-black leading-tight md:text-7xl">
              Packaging Guides for Smart Buyers
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Learn about custom boxes, food packaging, butter paper, printing
              finishes and product packaging decisions before starting your
              project.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/products"
                prefetch={false}
                className="rounded-full bg-[#FF6A00] px-8 py-4 font-black text-white transition hover:-translate-y-1 hover:bg-[#007C91]"
              >
                Explore Products
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

        <section className="bg-[#F7FAFC] px-5 py-20 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.32em] text-[#FF6A00]">
                  Latest Guides
                </p>

                <h2 className="mt-4 text-4xl font-black text-[#07111F] md:text-5xl">
                  Learn before you order
                </h2>
              </div>

              <p className="max-w-xl text-sm leading-6 text-slate-600 md:text-right">
                These guides help clients understand packaging style, material,
                finishing and quote requirements before speaking with the sales
                team.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  prefetch={false}
                  className="pp-card overflow-hidden rounded-[1.7rem] bg-white shadow-md"
                >
                  <div className="relative h-44 bg-gradient-to-br from-[#07111F] via-[#007C91] to-[#00C2E8]">
                    <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:22px_22px]" />

                    <div className="absolute left-5 top-5 rounded-full bg-white/15 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white backdrop-blur">
                      Guide
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-[#FF6A00]">
                      {post.category}
                    </p>

                    <h2 className="mt-3 text-xl font-black text-[#07111F]">
                      {post.title}
                    </h2>

                    <p className="mt-3 min-h-24 text-sm leading-6 text-slate-600">
                      {post.excerpt}
                    </p>

                    <span className="mt-5 inline-flex font-black text-[#FF6A00]">
                      Read Guide &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-20 md:px-8">
          <div className="mx-auto max-w-5xl rounded-[2rem] bg-[#07111F] p-8 text-center text-white md:p-12">
            <p className="text-sm font-black uppercase tracking-[0.32em] text-[#00C2E8]">
              Need Help Choosing Packaging?
            </p>

            <h2 className="mt-4 text-4xl font-black md:text-5xl">
              Share your product details with our team
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-300">
              Our sales team can guide you about box style, material, printing,
              finishing and quantity before production.
            </p>

            <Link
              href="/#quote"
              prefetch={false}
              className="mt-8 inline-flex rounded-full bg-[#FF6A00] px-8 py-4 font-black text-white transition hover:-translate-y-1 hover:bg-white hover:text-[#07111F]"
            >
              Request Custom Quote
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingActions />
    </>
  );
}
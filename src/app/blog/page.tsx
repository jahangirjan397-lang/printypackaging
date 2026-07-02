import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FloatingActions from "../../components/FloatingActions";
import { blogPosts } from "../../data/blogPosts";

export const metadata: Metadata = {
  title: "Packaging Academy | Custom Packaging Guides | Printy Packaging",
  description:
    "Read packaging guides about rigid boxes, butter paper, food packaging, mailer boxes, paper bags, cosmetic boxes and premium finishing options.",
  alternates: {
    canonical: "https://printypackaging.com/blog",
  },
};

export default function BlogPage() {
  return (
    <>
      <Header />

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
              finishes and product packaging decisions before starting your project.
            </p>
          </div>
        </section>

        <section className="bg-[#F7FAFC] px-5 py-20 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-4">
            {blogPosts.map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="pp-card overflow-hidden rounded-[1.7rem] bg-white shadow-md"
              >
                <div className="h-44 bg-gradient-to-br from-[#07111F] via-[#007C91] to-[#00C2E8]" />

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
                    Read Guide →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <FloatingActions />
    </>
  );
}
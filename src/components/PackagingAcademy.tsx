import { blogPosts } from "../data/blogPosts";

export default function PackagingAcademy() {
  const posts = blogPosts.slice(0, 4);

  return (
    <section id="blog" className="bg-[#F7FAFC] px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.32em] text-[#FF6A00]">
              Packaging Academy
            </p>

            <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-[#07111F] md:text-6xl">
              Helpful guides for packaging buyers
            </h2>
          </div>

          <a
            href="/blog"
            className="inline-flex rounded-full bg-[#07111F] px-7 py-4 font-black text-white transition hover:-translate-y-1 hover:bg-[#FF6A00]"
          >
            View All Guides
          </a>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {posts.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="pp-card overflow-hidden rounded-[1.7rem] bg-white shadow-md"
            >
              <div className="h-40 bg-gradient-to-br from-[#07111F] via-[#007C91] to-[#00C2E8]" />

              <div className="p-7">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-[#FF6A00]">
                  {post.category}
                </p>

                <h3 className="mt-3 text-xl font-black text-[#07111F]">
                  {post.title}
                </h3>

                <p className="mt-3 min-h-20 leading-7 text-slate-600">
                  {post.excerpt}
                </p>

                <span className="mt-5 inline-flex font-black text-[#FF6A00] transition hover:text-[#007C91]">
                  Read Guide →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
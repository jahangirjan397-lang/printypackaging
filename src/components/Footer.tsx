import { products } from "../data/products";
import { categories } from "../data/categories";
import { markets } from "../data/markets";
import { blogPosts } from "../data/blogPosts";

export default function Footer() {
  const footerProducts = products.slice(0, 8);
  const footerBlogs = blogPosts.slice(0, 4);

  return (
    <footer id="contact" className="bg-[#07111F] px-5 py-16 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <a href="/" className="text-3xl font-black">
              Printy<span className="text-[#00C2E8]">Packaging</span>
            </a>

            <p className="mt-5 max-w-sm leading-7 text-slate-300">
              Premium custom printing and packaging solutions for USA, UK,
              Europe, Canada and worldwide brands.
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.05] p-5">
              <p className="font-black text-[#FF6A00]">Need packaging help?</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Share your product details and our team will guide you with box
                style, material and finishing options.
              </p>

              <a
                href="/#quote"
                className="mt-4 inline-flex rounded-full bg-[#FF6A00] px-5 py-3 text-sm font-black text-white"
              >
                Request Quote
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-black">Products</h3>
            <div className="mt-5 grid gap-3 text-sm text-slate-300">
              {footerProducts.map((product) => (
                <a
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  className="transition hover:text-[#FF6A00]"
                >
                  {product.name}
                </a>
              ))}
              <a href="/products" className="font-black text-[#FF6A00]">
                View All Products →
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-black">Categories</h3>
            <div className="mt-5 grid gap-3 text-sm text-slate-300">
              {categories.map((category) => (
                <a
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  className="transition hover:text-[#FF6A00]"
                >
                  {category.name}
                </a>
              ))}
              <a href="/categories" className="font-black text-[#FF6A00]">
                All Categories →
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-black">Markets</h3>
            <div className="mt-5 grid gap-3 text-sm text-slate-300">
              {markets.map((market) => (
                <a
                  key={market.slug}
                  href={`/markets/${market.slug}`}
                  className="transition hover:text-[#FF6A00]"
                >
                  {market.name}
                </a>
              ))}
              <a href="/markets" className="font-black text-[#FF6A00]">
                All Markets →
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-black">Company</h3>
            <div className="mt-5 grid gap-3 text-sm text-slate-300">
              <a href="/blog" className="transition hover:text-[#FF6A00]">
                Blog
              </a>
              {footerBlogs.map((post) => (
                <a
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="transition hover:text-[#FF6A00]"
                >
                  {post.title}
                </a>
              ))}
              <a href="/#quote" className="transition hover:text-[#FF6A00]">
                Get Quote
              </a>
              <a href="/#contact" className="transition hover:text-[#FF6A00]">
                Contact
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Printy Packaging. All rights reserved.</p>

          <p>
            Custom Boxes • Rigid Boxes • Butter Paper • Food Packaging • Paper
            Bags
          </p>
        </div>
      </div>
    </footer>
  );
}
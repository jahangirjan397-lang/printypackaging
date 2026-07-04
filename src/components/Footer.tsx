import Link from "next/link";
import { products } from "../data/products";
import { categories } from "../data/categories";
import { markets } from "../data/markets";
import { blogPosts } from "../data/blogPosts";

const footerProducts = products.slice(0, 8);
const footerBlogs = blogPosts.slice(0, 4);

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#07111F] px-4 py-14 text-white sm:px-5 md:px-8 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <Link href="/" className="inline-flex text-3xl font-black">
              Printy<span className="text-[#00C2E8]">Packaging</span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-300 md:text-base">
              Premium custom printing and packaging solutions for USA, UK,
              Europe, Canada and worldwide brands.
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.05] p-5">
              <p className="font-black text-[#FF6A00]">Need packaging help?</p>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                Share your product details and our team will guide you with box
                style, material, printing and finishing options.
              </p>

              <Link
                href="/#quote"
                className="mt-4 inline-flex rounded-full bg-[#FF6A00] px-5 py-3 text-sm font-black text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-1 hover:bg-[#00C2E8] hover:text-[#07111F]"
              >
                Request Quote
              </Link>
            </div>
          </div>

          <FooterColumn title="Products">
            {footerProducts.map((product) => (
              <FooterLink key={product.slug} href={`/products/${product.slug}`}>
                {product.name}
              </FooterLink>
            ))}

            <FooterLink href="/products" strong>
              View All Products &rarr;
            </FooterLink>
          </FooterColumn>

          <FooterColumn title="Categories">
            {categories.map((category) => (
              <FooterLink key={category.slug} href={`/categories/${category.slug}`}>
                {category.name}
              </FooterLink>
            ))}

            <FooterLink href="/categories" strong>
              All Categories &rarr;
            </FooterLink>
          </FooterColumn>

          <FooterColumn title="Markets">
            {markets.map((market) => (
              <FooterLink key={market.slug} href={`/markets/${market.slug}`}>
                {market.name}
              </FooterLink>
            ))}

            <FooterLink href="/markets" strong>
              All Markets &rarr;
            </FooterLink>
          </FooterColumn>

          <FooterColumn title="Company">
            <FooterLink href="/blog">Blog</FooterLink>

            {footerBlogs.map((post) => (
              <FooterLink key={post.slug} href={`/blog/${post.slug}`}>
                {post.title}
              </FooterLink>
            ))}

            <FooterLink href="/#quote">Get Quote</FooterLink>
            <FooterLink href="/#contact">Contact</FooterLink>
          </FooterColumn>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>© 2026 PrintyPackaging. All rights reserved.</p>

          <p className="leading-6">
            Custom Boxes &bull; Rigid Boxes &bull; Butter Paper &bull; Food
            Packaging &bull; Paper Bags
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="font-black text-white">{title}</h3>

      <div className="mt-5 grid gap-3 text-sm text-slate-300">{children}</div>
    </div>
  );
}

function FooterLink({
  href,
  strong = false,
  children,
}: {
  href: string;
  strong?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      prefetch={false}
      className={
        strong
          ? "font-black text-[#FF6A00] transition hover:text-[#00C2E8]"
          : "line-clamp-2 transition hover:text-[#FF6A00]"
      }
    >
      {children}
    </Link>
  );
}
"use client";

import { useState } from "react";
import { products } from "../data/products";
import { categories } from "../data/categories";
import { markets } from "../data/markets";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const featuredProducts = products.slice(0, 12);

  const mainLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "Markets", href: "/markets" },
    { name: "Blog", href: "/blog" },
    { name: "Quote", href: "/#quote" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-5 md:px-8 md:py-4">
        <a
          href="/"
          className="text-xl font-black tracking-tight text-[#07111F] sm:text-2xl md:text-3xl"
        >
          Printy<span className="text-[#FF6A00]">Packaging</span>
        </a>

        <nav className="hidden items-center gap-6 text-sm font-black text-[#07111F] lg:flex">
          <a className="transition hover:text-[#FF6A00]" href="/">
            Home
          </a>

          <div className="group relative">
            <a className="transition hover:text-[#FF6A00]" href="/products">
              Products
            </a>

            <div className="invisible absolute left-1/2 top-8 w-[820px] -translate-x-1/2 rounded-3xl border border-slate-200 bg-white p-6 opacity-0 shadow-2xl transition-all duration-300 group-hover:visible group-hover:top-10 group-hover:opacity-100">
              <div className="mb-5 flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <p className="text-lg font-black text-[#07111F]">
                    Product Pages
                  </p>
                  <p className="mt-1 text-xs font-bold text-slate-500">
                    Popular custom packaging products.
                  </p>
                </div>

                <a
                  href="/products"
                  className="rounded-full bg-[#FF6A00] px-5 py-3 text-xs font-black text-white"
                >
                  View All Products
                </a>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {featuredProducts.map((product) => (
                  <a
                    href={`/products/${product.slug}`}
                    key={product.slug}
                    className="rounded-2xl bg-[#F7FAFC] p-4 transition hover:bg-[#07111F] hover:text-white"
                  >
                    <span className="block font-black">{product.name}</span>
                    <span className="mt-1 block text-xs font-medium text-slate-500">
                      {product.category}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="group relative">
            <a className="transition hover:text-[#FF6A00]" href="/categories">
              Categories
            </a>

            <div className="invisible absolute left-1/2 top-8 w-[520px] -translate-x-1/2 rounded-3xl border border-slate-200 bg-white p-6 opacity-0 shadow-2xl transition-all duration-300 group-hover:visible group-hover:top-10 group-hover:opacity-100">
              <p className="mb-5 text-lg font-black text-[#07111F]">
                Packaging Categories
              </p>

              <div className="grid grid-cols-2 gap-3">
                {categories.map((category) => (
                  <a
                    href={`/categories/${category.slug}`}
                    key={category.slug}
                    className="rounded-2xl bg-[#F7FAFC] p-4 transition hover:bg-[#07111F] hover:text-white"
                  >
                    <span className="block font-black">{category.name}</span>
                    <span className="mt-1 block text-xs font-medium text-slate-500">
                      {category.tagline}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="group relative">
            <a className="transition hover:text-[#FF6A00]" href="/markets">
              Markets
            </a>

            <div className="invisible absolute left-1/2 top-8 w-[520px] -translate-x-1/2 rounded-3xl border border-slate-200 bg-white p-6 opacity-0 shadow-2xl transition-all duration-300 group-hover:visible group-hover:top-10 group-hover:opacity-100">
              <p className="mb-5 text-lg font-black text-[#07111F]">
                International Markets
              </p>

              <div className="grid grid-cols-2 gap-3">
                {markets.map((market) => (
                  <a
                    href={`/markets/${market.slug}`}
                    key={market.slug}
                    className="rounded-2xl bg-[#F7FAFC] p-4 transition hover:bg-[#07111F] hover:text-white"
                  >
                    <span className="block font-black">{market.name}</span>
                    <span className="mt-1 block text-xs font-medium text-slate-500">
                      {market.region}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <a className="transition hover:text-[#FF6A00]" href="/blog">
            Blog
          </a>

          <a className="transition hover:text-[#FF6A00]" href="/#quote">
            Quote
          </a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button className="hidden rounded-full border border-[#007C91]/20 bg-[#007C91]/10 px-5 py-3 text-sm font-black text-[#007C91] transition hover:bg-[#007C91] hover:text-white md:block">
            Translate
          </button>

          <a
            href="/#quote"
            className="hidden rounded-full bg-[#FF6A00] px-6 py-3 text-sm font-black text-white shadow-lg shadow-orange-500/25 transition hover:-translate-y-1 hover:bg-[#007C91] sm:inline-flex"
          >
            Get Quote
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-black text-[#07111F] lg:hidden"
          >
            {mobileOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-5 shadow-xl lg:hidden">
          <div className="grid gap-3 text-sm font-black text-[#07111F]">
            {mainLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-2xl bg-[#F7FAFC] px-4 py-3"
              >
                {link.name}
              </a>
            ))}

            <div className="mt-2 grid gap-2">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                Popular Products
              </p>

              {featuredProducts.slice(0, 8).map((product) => (
                <a
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-2xl border border-slate-200 px-4 py-3"
                >
                  {product.name}
                </a>
              ))}
            </div>

            <a
              href="/#quote"
              onClick={() => setMobileOpen(false)}
              className="rounded-2xl bg-[#FF6A00] px-4 py-3 text-center text-white"
            >
              Get Custom Quote
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
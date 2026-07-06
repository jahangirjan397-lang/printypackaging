"use client";

import Link from "next/link";
import { useState } from "react";

const productLinks = [
  { name: "Rigid Boxes", href: "/products/rigid-boxes", label: "Luxury boxes" },
  { name: "Mailer Boxes", href: "/products/mailer-boxes", label: "Ecommerce" },
  { name: "Folding Cartons", href: "/products/folding-cartons", label: "Retail" },
  { name: "Luxury Packaging", href: "/products/luxury-packaging", label: "Premium" },
  { name: "Food Packaging", href: "/products/food-packaging", label: "Food brands" },
  { name: "Butter Paper", href: "/products/butter-paper", label: "Food wrap" },
  { name: "Paper Bags", href: "/products/paper-bags", label: "Retail bags" },
  { name: "Labels & Stickers", href: "/products/labels-stickers", label: "Branding" },
];

const categoryLinks = [
  { name: "Custom Boxes", href: "/categories/custom-boxes", label: "All box styles" },
  { name: "Food Packaging", href: "/categories/food-packaging", label: "Food-safe options" },
  { name: "Luxury Packaging", href: "/categories/luxury-packaging", label: "Premium products" },
  { name: "Retail Packaging", href: "/categories/retail-packaging", label: "Shops and brands" },
];

const marketLinks = [
  { name: "USA Packaging", href: "/markets/usa", label: "United States" },
  { name: "UK Packaging", href: "/markets/uk", label: "United Kingdom" },
  { name: "Canada Packaging", href: "/markets/canada", label: "Canada" },
  { name: "UAE Packaging", href: "/markets/uae", label: "Dubai and UAE" },
];

const mobileLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Categories", href: "/categories" },
  { name: "Markets", href: "/markets" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Get Quote", href: "/#quote" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-4 py-3 sm:px-5 md:px-8 md:py-4">
        <Link
          href="/"
          prefetch={false}
          className="shrink-0 text-xl font-black tracking-tight text-[#07111F] sm:text-2xl md:text-3xl"
          aria-label="PrintyPackaging home"
        >
          Printy<span className="text-[#FF6A00]">Packaging</span>
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-black text-[#07111F] xl:flex">
          <NavLink href="/">Home</NavLink>

          <MegaMenu
            title="Products"
            href="/products"
            heading="Popular Product Pages"
            description="Fast links to important custom packaging products."
            links={productLinks}
            ctaText="View All Products"
            ctaHref="/products"
            wide
          />

          <MegaMenu
            title="Categories"
            href="/categories"
            heading="Packaging Categories"
            description="Browse packaging by business and product type."
            links={categoryLinks}
            ctaText="All Categories"
            ctaHref="/categories"
          />

          <MegaMenu
            title="Markets"
            href="/markets"
            heading="International Markets"
            description="Packaging support for global buyers."
            links={marketLinks}
            ctaText="All Markets"
            ctaHref="/markets"
          />

          <NavLink href="/blog">Blog</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>
          <NavLink href="/#quote">Quote</NavLink>
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/#quote"
            prefetch={false}
            className="hidden rounded-full bg-[#FF6A00] px-6 py-3 text-sm font-black text-white shadow-lg shadow-orange-500/25 transition hover:-translate-y-1 hover:bg-[#007C91] sm:inline-flex"
          >
            Get Quote
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((current) => !current)}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-black text-[#07111F] transition hover:border-[#FF6A00] hover:text-[#FF6A00] xl:hidden"
            aria-expanded={mobileOpen}
            aria-label="Toggle mobile navigation"
          >
            {mobileOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-5 shadow-xl xl:hidden">
          <div className="grid gap-3 text-sm font-black text-[#07111F]">
            {mobileLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                prefetch={false}
                onClick={() => setMobileOpen(false)}
                className="rounded-2xl bg-[#F7FAFC] px-4 py-3 transition hover:bg-[#07111F] hover:text-white"
              >
                {link.name}
              </Link>
            ))}

            <div className="mt-2 grid gap-2">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                Popular Products
              </p>

              {productLinks.slice(0, 6).map((product) => (
                <Link
                  key={product.href}
                  href={product.href}
                  prefetch={false}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-2xl border border-slate-200 px-4 py-3 transition hover:border-[#FF6A00] hover:text-[#FF6A00]"
                >
                  {product.name}
                </Link>
              ))}
            </div>

            <Link
              href="/#quote"
              prefetch={false}
              onClick={() => setMobileOpen(false)}
              className="rounded-2xl bg-[#FF6A00] px-4 py-3 text-center text-white shadow-lg shadow-orange-500/20"
            >
              Get Custom Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      prefetch={false}
      className="transition hover:text-[#FF6A00]"
    >
      {children}
    </Link>
  );
}

function MegaMenu({
  title,
  href,
  heading,
  description,
  links,
  ctaText,
  ctaHref,
  wide = false,
}: {
  title: string;
  href: string;
  heading: string;
  description: string;
  links: { name: string; href: string; label: string }[];
  ctaText: string;
  ctaHref: string;
  wide?: boolean;
}) {
  return (
    <div className="group relative">
      <Link
        href={href}
        prefetch={false}
        className="transition hover:text-[#FF6A00]"
      >
        {title}
      </Link>

      <div
        className={`invisible absolute left-1/2 top-8 z-50 -translate-x-1/2 rounded-3xl border border-slate-200 bg-white p-6 opacity-0 shadow-2xl transition-all duration-300 group-hover:visible group-hover:top-10 group-hover:opacity-100 ${
          wide ? "w-[760px]" : "w-[520px]"
        }`}
      >
        <div className="mb-5 flex items-center justify-between gap-5 border-b border-slate-200 pb-4">
          <div>
            <p className="text-lg font-black text-[#07111F]">{heading}</p>
            <p className="mt-1 text-xs font-bold text-slate-500">
              {description}
            </p>
          </div>

          <Link
            href={ctaHref}
            prefetch={false}
            className="shrink-0 rounded-full bg-[#FF6A00] px-5 py-3 text-xs font-black text-white transition hover:bg-[#007C91]"
          >
            {ctaText}
          </Link>
        </div>

        <div className={wide ? "grid grid-cols-4 gap-3" : "grid grid-cols-2 gap-3"}>
          {links.map((item) => (
            <Link
              href={item.href}
              prefetch={false}
              key={item.href}
              className="rounded-2xl bg-[#F7FAFC] p-4 transition hover:bg-[#07111F] hover:text-white"
            >
              <span className="block font-black">{item.name}</span>
              <span className="mt-1 block text-xs font-medium text-slate-500">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
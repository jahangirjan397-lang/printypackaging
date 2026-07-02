"use client";

import { useState } from "react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const productLinks = [
    { name: "Rigid Boxes", href: "/products/rigid-boxes" },
    { name: "Folding Cartons", href: "/products/folding-cartons" },
    { name: "Mailer Boxes", href: "/products/mailer-boxes" },
    { name: "Butter Paper", href: "/products/butter-paper" },
    { name: "Food Packaging", href: "/products/food-packaging" },
    { name: "Paper Bags", href: "/products/paper-bags" },
    { name: "Labels & Stickers", href: "/products/labels-stickers" },
    { name: "Luxury Packaging", href: "/products/luxury-packaging" },
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

        <nav className="hidden items-center gap-7 text-sm font-black text-[#07111F] lg:flex">
          <a className="transition hover:text-[#FF6A00]" href="/">
            Home
          </a>

          <div className="group relative">
            <a
              className="cursor-pointer transition hover:text-[#FF6A00]"
              href="/products"
            >
              Products
            </a>

            <div className="invisible absolute left-1/2 top-8 w-[760px] -translate-x-1/2 rounded-3xl border border-slate-200 bg-white p-6 opacity-0 shadow-2xl transition-all duration-300 group-hover:visible group-hover:top-10 group-hover:opacity-100">
              <div className="mb-5 flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <p className="text-lg font-black text-[#07111F]">
                    Product Categories
                  </p>
                  <p className="mt-1 text-xs font-bold text-slate-500">
                    Custom boxes, food packaging, bags, labels and wrapping papers.
                  </p>
                </div>

                <a
                  href="/#quote"
                  className="rounded-full bg-[#FF6A00] px-5 py-3 text-xs font-black text-white"
                >
                  Get Quote
                </a>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {productLinks.map((item) => (
                  <a
                    href={item.href}
                    key={item.name}
                    className="rounded-2xl bg-[#F7FAFC] p-4 transition hover:bg-[#07111F] hover:text-white"
                  >
                    <span className="block font-black">{item.name}</span>
                    <span className="mt-1 block text-xs font-medium text-slate-500">
                      Custom packaging
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <a className="transition hover:text-[#FF6A00]" href="/#industries">
            Industries
          </a>
          <a className="transition hover:text-[#FF6A00]" href="/#materials">
            Materials
          </a>
          <a className="transition hover:text-[#FF6A00]" href="/#finishing">
            Finishing
          </a>
          <a className="transition hover:text-[#FF6A00]" href="/#blog">
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
            {[
              ["Home", "/"],
              ["Products", "/products"],
              ["Industries", "/#industries"],
              ["Materials", "/#materials"],
              ["Finishing", "/#finishing"],
              ["Blog", "/#blog"],
              ["Quote", "/#quote"],
              ["Contact", "/#contact"],
            ].map(([label, link]) => (
              <a
                key={label}
                href={link}
                onClick={() => setMobileOpen(false)}
                className="rounded-2xl bg-[#F7FAFC] px-4 py-3"
              >
                {label}
              </a>
            ))}

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
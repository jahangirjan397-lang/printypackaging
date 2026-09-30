"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import BrandLogo from "@/components/BrandLogo";
import PackagingSearch from "@/components/PackagingSearch";
import NavIcon from "@/components/NavIcon";
import { businessPromises, salesPhone } from "@/data/businessInfo";
import { navMenus, type NavMenu } from "@/data/navigation";

const simpleLinks = [
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [hideTopBar, setHideTopBar] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    function updateHeader() {
      const currentScrollY = window.scrollY;

      setHideTopBar((current) => {
        // Separate thresholds prevent the top bar from oscillating.
        if (!current && currentScrollY > 140) {
          return true;
        }

        if (current && currentScrollY < 24) {
          return false;
        }

        return current;
      });

      ticking.current = false;
    }

    function onScroll() {
      if (!ticking.current) {
        window.requestAnimationFrame(updateHeader);
        ticking.current = true;
      }
    }

    updateHeader();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  function closeMobile() {
    setMobileOpen(false);
    setOpenSection(null);
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div
        className={`grid overflow-hidden bg-[#07111F] text-white transition-[grid-template-rows,opacity] duration-300 ease-out ${
          hideTopBar ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"
        }`}
      >
        <div className="min-h-0">
          <div className="border-b border-[#0B1B2A]">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 text-[11px] font-black sm:px-5 sm:text-xs md:gap-6 md:px-8 2xl:max-w-[1520px] 2xl:px-10">
              <p className="hidden text-white md:block">
                Premium Custom Boxes | Butter Paper | Food Packaging | Labels & Stickers
              </p>

              <div className="flex min-w-0 flex-1 items-center justify-between gap-3 md:flex-none md:justify-end md:gap-5">
                <a
                  href="mailto:sales@printypackaging.com"
                  className="min-w-0 truncate text-cyan-300 transition hover:text-[#FF6A00]"
                >
                  sales@printypackaging.com
                </a>

                <span className="hidden h-4 w-px bg-white/30 md:block" />
                {salesPhone.display && salesPhone.tel ? (
                  <a
                    href={`tel:${salesPhone.tel}`}
                    className="hidden text-cyan-300 transition hover:text-[#FF6A00] md:inline"
                  >
                    Call {salesPhone.display}
                  </a>
                ) : (
                  <span className="hidden text-cyan-300 md:inline">
                    {businessPromises.designSupport}
                  </span>
                )}
                <span className="hidden h-4 w-px bg-white/30 md:block" />
                <span className="hidden md:inline">Shipping to USA | UK | Europe | UAE | Worldwide</span>
                {salesPhone.display && salesPhone.tel ? (
                  <a
                    href={`tel:${salesPhone.tel}`}
                    className="shrink-0 text-cyan-300 md:hidden"
                  >
                    {salesPhone.display}
                  </a>
                ) : (
                  <span className="shrink-0 text-cyan-300 md:hidden">Worldwide Quotes</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-slate-200 bg-white/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:gap-4 sm:px-5 sm:py-4 md:px-8 md:py-5 2xl:max-w-[1520px] 2xl:px-10">
          <div className="shrink-0">
            <span className="sm:hidden"><BrandLogo variant="dark" size="small" /></span>
            <span className="hidden sm:inline-flex"><BrandLogo variant="dark" size="default" /></span>
          </div>

          <nav
            aria-label="Main"
            className="relative hidden items-center gap-4 whitespace-nowrap text-sm font-black text-[#07111F] xl:flex 2xl:gap-7"
          >
            {navMenus.map((menu) => (
              <DesktopMenu key={menu.title} menu={menu} />
            ))}

            {simpleLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch={false}
                className="transition hover:text-[#FF6A00]"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <PackagingSearch />
            {salesPhone.display && salesPhone.tel && (
              <a
                href={`tel:${salesPhone.tel}`}
                className="hidden whitespace-nowrap text-sm font-black text-[#07111F] transition hover:text-[#FF6A00] 2xl:inline"
              >
                {salesPhone.display}
              </a>
            )}
            <Link
              href="/#quote"
              prefetch={false}
              className="hidden rounded-full bg-[#FF6A00] px-6 py-3 text-sm font-black text-white shadow-lg shadow-orange-500/25 transition hover:-translate-y-1 hover:bg-[#007C91] sm:inline-flex"
            >
              Get Quote
            </Link>

            <button
              type="button"
              onClick={() => (mobileOpen ? closeMobile() : setMobileOpen(true))}
              className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-black text-[#07111F] transition hover:border-[#FF6A00] hover:text-[#FF6A00] xl:hidden"
              aria-expanded={mobileOpen}
              aria-label="Toggle mobile navigation"
            >
              {mobileOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="max-h-[calc(100vh-7rem)] overflow-y-auto border-t border-slate-200 bg-white px-4 py-4 shadow-xl xl:hidden">
            <div className="grid gap-2 text-sm font-black text-[#07111F]">
              {navMenus.map((menu) => {
                const isOpen = openSection === menu.title;

                return (
                  <div key={menu.title} className="rounded-2xl bg-[#F7FAFC]">
                    <button
                      type="button"
                      onClick={() => setOpenSection(isOpen ? null : menu.title)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between px-4 py-3 text-left"
                    >
                      {menu.title}
                      <Chevron open={isOpen} />
                    </button>

                    {isOpen && (
                      <div className="grid grid-cols-2 gap-1 px-2 pb-3">
                        {menu.items.map((item) => (
                          <Link
                            key={`${item.href}-${item.name}`}
                            href={item.href}
                            prefetch={false}
                            onClick={closeMobile}
                            className="flex items-center gap-2 rounded-xl px-2 py-2 text-[13px] font-bold text-slate-700 transition hover:bg-white hover:text-[#FF6A00]"
                          >
                            <NavIcon name={item.icon} className="h-6 w-6 text-[#FF6A00]" />
                            {item.name}
                          </Link>
                        ))}
                        <Link
                          href={menu.ctaHref}
                          prefetch={false}
                          onClick={closeMobile}
                          className="col-span-2 mt-1 rounded-xl px-2 py-2 text-[13px] font-black text-[#FF6A00]"
                        >
                          {menu.ctaText} →
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}

              {simpleLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={false}
                  onClick={closeMobile}
                  className="rounded-2xl bg-[#F7FAFC] px-4 py-3 transition hover:bg-[#07111F] hover:text-white"
                >
                  {link.name}
                </Link>
              ))}

              <Link
                href="/#quote"
                prefetch={false}
                onClick={closeMobile}
                className="mt-2 rounded-2xl bg-[#FF6A00] px-4 py-3 text-center text-white shadow-lg shadow-orange-500/20"
              >
                Get Custom Quote
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path d="M5 8l5 5 5-5" />
    </svg>
  );
}

// Compact dropdown card centred under the menu bar (the nav is the
// positioning parent, so wide menus never run off the screen edge). The trigger's padding is stretched down to the header's edge
// so the menu stays open while the pointer moves into it; keyboard users open
// it by tabbing to it.
function DesktopMenu({ menu }: { menu: NavMenu }) {
  const count = menu.items.length;
  const columns = count <= 8 ? "grid-cols-2" : "grid-cols-4";
  const width = count <= 4 ? "w-[480px]" : count <= 8 ? "w-[620px]" : "w-[920px]";
  // Links are always in the HTML for search engines; the icons are only
  // drawn once the menu is first opened, which keeps every page lighter.
  const [opened, setOpened] = useState(false);
  const open = () => setOpened(true);

  return (
    <div className="group -my-8 py-8" onMouseEnter={open} onFocus={open}>
      <button
        type="button"
        aria-haspopup="true"
        className="flex items-center gap-1 transition group-hover:text-[#FF6A00] group-has-[:focus-visible]:text-[#FF6A00]"
      >
        {menu.title}
        <span className="text-[#FF6A00]">
          <Chevron open={false} />
        </span>
      </button>

      <div
        className={`invisible absolute left-1/2 top-[calc(100%+2rem)] z-50 ${width} -translate-x-1/2 whitespace-normal rounded-2xl border border-slate-200 bg-white p-4 opacity-0 shadow-2xl shadow-slate-900/15 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-has-[:focus-visible]:visible group-has-[:focus-visible]:opacity-100`}
      >
        <ul className={`grid gap-x-2 gap-y-0.5 ${columns}`}>
          {menu.items.map((item) => (
            <li key={`${item.href}-${item.name}`}>
              <Link
                href={item.href}
                prefetch={false}
                className="group/item flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition hover:bg-[#FFF4EC]"
              >
                {opened ? (
                  <NavIcon
                    name={item.icon}
                    className="h-7 w-7 text-[#FF6A00] transition group-hover/item:scale-110"
                  />
                ) : (
                  <span aria-hidden="true" className="h-7 w-7 shrink-0" />
                )}
                <span className="min-w-0">
                  <span className="block text-[13px] font-bold text-[#07111F] group-hover/item:text-[#FF6A00]">
                    {item.name}
                  </span>
                  {item.text && (
                    <span className="block text-[11px] font-medium leading-4 text-slate-500">
                      {item.text}
                    </span>
                  )}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-3 flex items-center justify-between gap-3 border-t border-slate-100 px-2 pt-3 text-[13px] font-black">
          {menu.extra ? (
            <Link
              href={menu.extra.href}
              prefetch={false}
              className="flex items-center gap-1.5 text-[#007C91] transition hover:text-[#FF6A00]"
            >
              {opened && <NavIcon name={menu.extra.icon} className="h-4 w-4" />}
              {menu.extra.name}
            </Link>
          ) : (
            <span className="font-medium text-slate-500">{menu.description}</span>
          )}
          <Link
            href={menu.ctaHref}
            prefetch={false}
            className="shrink-0 text-[#FF6A00] transition hover:text-[#007C91]"
          >
            {menu.ctaText} →
          </Link>
        </div>
      </div>
    </div>
  );
}

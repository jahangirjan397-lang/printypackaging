import Link from "next/link";
import { topSeoRoutes } from "@/data/topSeoRoutes";

const featuredLinks = topSeoRoutes.slice(0, 12);

export default function TopSeoLinksSection() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-[0_20px_70px_rgba(7,17,31,0.08)] sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <span className="inline-flex rounded-full bg-[#FF6A00]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#FF6A00]">
                Top Packaging Pages
              </span>

              <h2 className="mt-5 text-3xl font-black tracking-tight text-[#07111F] sm:text-4xl lg:text-5xl">
                Explore high-demand custom packaging solutions.
              </h2>

              <p className="mt-5 text-base leading-8 text-slate-600">
                These pages help buyers find custom boxes, rigid boxes, mailer
                boxes, food packaging and market-specific packaging support for
                USA, UK, Canada and global brands.
              </p>

              <Link
                href="/custom-packaging"
                className="mt-7 inline-flex rounded-full bg-[#FF6A00] px-6 py-3 text-sm font-black text-white shadow-[0_18px_45px_rgba(255,106,0,0.28)] transition hover:-translate-y-0.5 hover:bg-[#E85F00]"
              >
                View Custom Packaging
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {featuredLinks.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className="group rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-black text-[#07111F] shadow-sm transition hover:-translate-y-0.5 hover:border-[#FF6A00] hover:text-[#FF6A00]"
                >
                  {route.title}
                  <span className="ml-2 text-[#FF6A00] transition group-hover:ml-3">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
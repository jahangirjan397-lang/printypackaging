import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FloatingActions from "../../components/FloatingActions";
import { categories } from "../../data/categories";

export const metadata: Metadata = {
  title: "Packaging Categories | Printy Packaging",
  description:
    "Explore packaging categories including luxury packaging, food packaging, retail packaging, cosmetic packaging and printing finishing solutions.",
  alternates: {
    canonical: "https://printypackaging.com/categories",
  },
};

export default function CategoriesPage() {
  return (
    <>
      <Header />

      <main>
        <section className="relative overflow-hidden bg-[#07111F] px-5 py-20 text-white md:px-8 md:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,194,232,0.22),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(255,106,0,0.14),transparent_30%)]" />

          <div className="relative mx-auto max-w-7xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.35em] text-[#00C2E8]">
              Packaging Categories
            </p>

            <h1 className="mt-5 text-4xl font-black leading-tight md:text-7xl">
              Find Packaging by Category
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Browse custom packaging solutions by product type, market and
              buyer need.
            </p>
          </div>
        </section>

        <section className="bg-[#F7FAFC] px-5 py-20 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <a
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="pp-card rounded-[2rem] bg-white p-7 shadow-md"
              >
                <div className="mb-6 h-44 rounded-[1.5rem] bg-gradient-to-br from-[#07111F] via-[#007C91] to-[#00C2E8]" />

                <p className="text-xs font-black uppercase tracking-[0.25em] text-[#FF6A00]">
                  Category
                </p>

                <h2 className="mt-3 text-3xl font-black text-[#07111F]">
                  {category.name}
                </h2>

                <p className="mt-3 min-h-24 leading-7 text-slate-600">
                  {category.tagline}
                </p>

                <span className="mt-5 inline-flex font-black text-[#FF6A00]">
                  View Category →
                </span>
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
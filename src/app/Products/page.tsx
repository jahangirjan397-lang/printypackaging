import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FloatingActions from "../../components/FloatingActions";
import { products } from "../../data/products";

export const metadata: Metadata = {
  title: "Custom Packaging Products | Printy Packaging",
  description:
    "Explore custom packaging products including rigid boxes, folding cartons, mailer boxes, butter paper, food packaging, paper bags, labels, stickers and luxury packaging.",
  alternates: {
    canonical: "https://printypackaging.com/products",
  },
};

export default function ProductsPage() {
  return (
    <>
      <Header />

      <main>
        <section className="relative overflow-hidden bg-[#07111F] px-5 py-20 text-white md:px-8 md:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,194,232,0.2),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(255,106,0,0.14),transparent_30%)]" />

          <div className="relative mx-auto max-w-7xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.35em] text-[#00C2E8]">
              Product Library
            </p>

            <h1 className="mt-5 text-4xl font-black leading-tight md:text-7xl">
              Custom Packaging Products
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Explore premium custom boxes, food packaging, butter paper, paper
              bags, labels, stickers and luxury packaging solutions for
              international brands.
            </p>
          </div>
        </section>

        <section className="bg-[#F7FAFC] px-5 py-20 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product, index) => (
                <a
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  className="pp-card group overflow-hidden rounded-[1.7rem] bg-white shadow-md"
                >
                  <div className="relative h-48 bg-gradient-to-br from-[#07111F] via-[#007C91] to-[#00C2E8]">
                    <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:22px_22px]" />

                    <div className="absolute bottom-5 left-5 h-24 w-24 rotate-[-8deg] rounded-2xl bg-white shadow-2xl" />

                    <div className="absolute bottom-7 right-7 h-32 w-24 rounded-2xl bg-[#07111F] shadow-2xl">
                      <div className="mx-auto mt-6 h-9 w-9 rounded-full border border-[#FF6A00]" />
                      <p className="mt-4 text-center text-[10px] font-black tracking-widest text-white">
                        BOX
                      </p>
                    </div>

                    <span className="absolute bottom-5 right-5 flex h-8 w-8 items-center justify-center rounded-full bg-[#FF6A00] text-xs font-black text-white">
                      {index + 1}
                    </span>
                  </div>

                  <div className="p-6">
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-[#FF6A00]">
                      {product.category}
                    </p>

                    <h2 className="mt-3 text-xl font-black text-[#07111F]">
                      {product.name}
                    </h2>

                    <p className="mt-3 min-h-20 text-sm leading-6 text-slate-600">
                      {product.tagline}
                    </p>

                    <span className="mt-5 inline-flex font-black text-[#FF6A00] group-hover:text-[#007C91]">
                      View Product →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingActions />
    </>
  );
}
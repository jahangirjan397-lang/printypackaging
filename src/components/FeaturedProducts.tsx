import Image from "next/image";
import Link from "next/link";
import { products } from "../data/products";

const featuredProducts = products.slice(0, 8);

export default function FeaturedProducts() {
  return (
    <section
      id="products"
      className="bg-[linear-gradient(180deg,#F7FAFC_0%,#FFFFFF_100%)] px-4 py-14 sm:px-5 md:px-8 md:py-16"
    >
      <div className="mx-auto max-w-7xl 2xl:max-w-[1520px]">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#FF6A00] md:text-sm">
              Featured Products
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-[#07111F] sm:text-4xl md:text-5xl">
              Custom packaging for every product.
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-7 text-slate-600 md:text-right md:text-base">
            Explore premium boxes, bags, labels and food packaging with practical
            material, printing and finishing guidance.
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((item, index) => {
            const productImage = item.images?.[0];

            return (
              <Link
                key={item.slug}
                href={"/products/" + item.slug}
                prefetch={false}
                aria-label={"View details for " + item.name}
                className="group block overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-[0_14px_42px_rgba(7,17,31,0.07)] transition duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-[0_24px_70px_rgba(7,17,31,0.12)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#FFFDF9]">
                  {productImage ? (
                    <Image
                      src={productImage.src}
                      alt={productImage.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.025]"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(0,194,232,0.18),transparent_34%),linear-gradient(135deg,#FFFFFF,#EAF7FA)]" />
                  )}

                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-[#07111F] shadow-sm backdrop-blur">
                    {item.category}
                  </span>
                  <span className="absolute bottom-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#FF6A00] text-xs font-black text-white shadow-lg">
                    {index + 1}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-black text-[#07111F]">{item.name}</h3>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
                    {item.tagline}
                  </p>
                  <span className="mt-5 inline-flex font-black text-[#D95500] transition group-hover:text-[#007C91]">
                    View Details →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

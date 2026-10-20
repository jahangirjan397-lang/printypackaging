import type { Metadata } from "next";
import Link from "next/link";
import { boxSizes, sizeLabel } from "@/data/boxSizes";
import CustomSizeBox from "@/components/CustomSizeBox";

const siteUrl = "https://printypackaging.com";

export const metadata: Metadata = {
  title: { absolute: "Box Size Library: Free Dielines for Popular Box Sizes | Printy" },
  description:
    "Popular custom box sizes with the exact free dieline, flat size, what fits inside and a quote link for each: mailer boxes, tuck end, auto bottom and bakery trays.",
  alternates: { canonical: `${siteUrl}/box-sizes` },
  robots: { index: true, follow: true },
};

export default function BoxSizesPage() {
  const groups = [...new Set(boxSizes.map((b) => b.styleName))].map((name) => ({
    name,
    sizes: boxSizes.filter((b) => b.styleName === name),
  }));

  return (
    <main className="bg-slate-50 text-[#07111F]">
      <section className="mx-auto max-w-6xl px-4 pb-6 pt-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black sm:text-4xl">Box Size Library</h1>
        <p className="mt-3 max-w-3xl text-slate-700">
          The box sizes brands ask us for most. Each page has the exact dieline from our own factory rules, its flat size,
          what usually fits inside, and a quote link that opens with the size filled in. Sizes are inside dimensions.
        </p>
        <div className="mt-5">
          <CustomSizeBox title="Your own size? Make the exact dieline now" />
        </div>
      </section>
      {groups.map((g) => (
        <section key={g.name} className="mx-auto max-w-6xl px-4 pb-8 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black">{g.name} sizes</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {g.sizes.map((b) => (
              <li key={b.slug}>
                <Link href={`/box-sizes/${b.slug}`} className="block rounded-xl border border-slate-200 bg-white p-4 hover:border-[#07111F]">
                  <span className="block text-lg font-black">{sizeLabel(b)}</span>
                  <span className="mt-1 block text-xs font-bold text-slate-500">For {b.fits.slice(0, 2).join(", ")}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}

const capabilities = [
  {
    title: "Dieline Support",
    text: "Structure and artwork guidance before production.",
  },
  {
    title: "Material Guidance",
    text: "Practical board, paper and corrugated recommendations.",
  },
  {
    title: "Print & Finish Planning",
    text: "CMYK, Pantone, foil, embossing, UV and lamination support.",
  },
  {
    title: "Worldwide Quote Support",
    text: "Packaging quotations for international delivery requirements.",
  },
];

export default function StatsBar() {
  return (
    <section
      aria-label="Printy Packaging capabilities"
      className="bg-[#07111F] px-5 py-6 text-white md:px-8 md:py-7"
    >
      <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {capabilities.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
          >
            <div
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#00C2E8]/15 text-sm font-black text-[#00C2E8]"
            >
              ✓
            </div>
            <h2 className="mt-3 text-base font-black text-white">{item.title}</h2>
            <p className="mt-1.5 text-xs leading-5 text-slate-300 sm:text-sm">{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

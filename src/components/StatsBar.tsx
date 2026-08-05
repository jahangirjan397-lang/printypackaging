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
      className="bg-[#07111F] px-5 py-10 text-white md:px-8"
    >
      <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {capabilities.map((item) => (
          <article
            key={item.title}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
          >
            <div
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#00C2E8]/15 font-black text-[#00C2E8]"
            >
              ✓
            </div>
            <h2 className="mt-4 text-lg font-black text-white">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

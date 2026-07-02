export default function FinishingOptions() {
  const options = [
    {
      title: "Matte Lamination",
      text: "Smooth, premium and non-glossy protection for elegant packaging.",
    },
    {
      title: "Gloss Lamination",
      text: "Shiny and vibrant finish that makes colors look rich and sharp.",
    },
    {
      title: "Soft Touch",
      text: "Luxury velvet-like surface for high-end product packaging.",
    },
    {
      title: "Spot UV",
      text: "Highlight logos, patterns and design elements with glossy effects.",
    },
    {
      title: "Gold Foiling",
      text: "Metallic gold finish for luxury boxes and premium branding.",
    },
    {
      title: "Embossing",
      text: "Raised texture effect for logos, patterns and premium details.",
    },
    {
      title: "Debossing",
      text: "Pressed-in design effect for subtle luxury packaging details.",
    },
    {
      title: "Die Cutting",
      text: "Custom shapes, windows and structures for special packaging styles.",
    },
  ];

  return (
    <section
      id="finishing"
      className="relative overflow-hidden bg-[#07111F] px-5 py-24 text-white md:px-8"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,194,232,0.18),transparent_32%),radial-gradient(circle_at_90%_70%,rgba(255,106,0,0.16),transparent_30%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.32em] text-[#FF6A00]">
            Printing & Finishing
          </p>

          <h2 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
            Premium finishes that make packaging stand out
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-300">
            Finishing adds protection, luxury feel and brand impact to your
            packaging design.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {options.map((item) => (
            <article
              key={item.title}
              className="pp-card group rounded-[1.7rem] border border-white/10 bg-white/[0.05] p-7"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF6A00] text-2xl font-black text-white transition group-hover:scale-110 group-hover:bg-[#00C2E8] group-hover:text-[#07111F]">
                ✦
              </div>

              <h3 className="text-xl font-black">{item.title}</h3>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
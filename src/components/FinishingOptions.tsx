const options = [
  {
    title: "Matte Lamination",
    text: "Smooth, premium and non-glossy protection for elegant packaging.",
    tag: "Elegant",
  },
  {
    title: "Gloss Lamination",
    text: "Shiny and vibrant finish that makes colors look rich and sharp.",
    tag: "Vibrant",
  },
  {
    title: "Soft Touch",
    text: "Luxury velvet-like surface for high-end product packaging.",
    tag: "Luxury",
  },
  {
    title: "Spot UV",
    text: "Highlight logos, patterns and design elements with glossy effects.",
    tag: "Highlight",
  },
  {
    title: "Gold Foiling",
    text: "Metallic gold finish for luxury boxes and premium branding.",
    tag: "Premium",
  },
  {
    title: "Embossing",
    text: "Raised texture effect for logos, patterns and premium details.",
    tag: "Raised",
  },
  {
    title: "Debossing",
    text: "Pressed-in design effect for subtle luxury packaging details.",
    tag: "Subtle",
  },
  {
    title: "Die Cutting",
    text: "Custom shapes, windows and structures for special packaging styles.",
    tag: "Custom",
  },
];

export default function FinishingOptions() {
  return (
    <section
      id="finishing"
      className="relative overflow-hidden bg-[#07111F] px-4 py-16 text-white sm:px-5 md:px-8 md:py-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,194,232,0.18),transparent_30%),radial-gradient(circle_at_90%_70%,rgba(255,106,0,0.16),transparent_28%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#FF6A00] md:text-sm">
            Printing & Finishing
          </p>

          <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl md:text-6xl">
            Premium finishes that make packaging stand out
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-300 md:text-lg md:leading-8">
            Finishing adds protection, luxury feel and stronger brand impact to
            your packaging design.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-6">
          {options.map((item, index) => (
            <article
              key={item.title}
              className="group rounded-[1.7rem] border border-white/10 bg-white/[0.05] p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#00C2E8]/30 hover:bg-white/[0.08] hover:shadow-xl md:p-7"
            >
              <div className="mb-6 flex items-center justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF6A00] text-sm font-black text-white transition duration-300 group-hover:bg-[#00C2E8] group-hover:text-[#07111F] md:h-14 md:w-14">
                  {index + 1}
                </div>

                <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-black text-slate-200">
                  {item.tag}
                </span>
              </div>

              <h3 className="text-lg font-black md:text-xl">{item.title}</h3>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                {item.text}
              </p>

              <div className="mt-5 h-1.5 w-16 rounded-full bg-gradient-to-r from-[#FF6A00] to-[#00C2E8]" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
const advantages = [
  {
    title: "Production Knowledge",
    printy: "Printing, paper, finishing and die-cutting guidance",
    competitor: "Mostly sales-focused support",
  },
  {
    title: "Fast Lead Channels",
    printy: "Quote form, WhatsApp and live chat support",
    competitor: "Often form-only process",
  },
  {
    title: "Packaging Education",
    printy: "Material, artwork, finishing and process guidance",
    competitor: "Limited buyer guidance",
  },
  {
    title: "Global Buyer Focus",
    printy: "USA, UK, Canada, Europe and worldwide markets",
    competitor: "Often limited market messaging",
  },
];

export default function CompetitorAdvantageSection() {
  return (
    <section className="bg-[#07111F] px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#00C2E8]">
              Built To Compete
            </span>

            <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              A better buyer experience than ordinary packaging websites.
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-300">
              Our service is designed to compete with leading packaging
              brands by combining premium design, fast response, SEO-focused
              content and practical factory-level packaging knowledge.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/#quote"
                className="inline-flex items-center justify-center rounded-full bg-[#FF6A00] px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#E85F00]"
              >
                Request Quote
              </a>

              <a
                href="/why-printy-packaging"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/15"
              >
                Why Choose Us
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06]">
            <div className="grid grid-cols-[0.9fr_1fr_1fr] border-b border-white/10 bg-white/[0.06] px-5 py-4 text-xs font-black uppercase tracking-[0.16em] text-slate-300">
              <span>Area</span>
              <span className="text-[#00C2E8]">Printy</span>
              <span>Normal Site</span>
            </div>

            {advantages.map((item) => (
              <div
                key={item.title}
                className="grid grid-cols-[0.9fr_1fr_1fr] gap-3 border-b border-white/10 px-5 py-5 text-sm last:border-b-0"
              >
                <span className="font-black text-white">{item.title}</span>
                <span className="font-bold leading-6 text-[#66E7FF]">
                  {item.printy}
                </span>
                <span className="leading-6 text-slate-300">
                  {item.competitor}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


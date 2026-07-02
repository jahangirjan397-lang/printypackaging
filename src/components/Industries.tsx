export default function Industries() {
  const industries = [
    "Cosmetics",
    "Food & Bakery",
    "Pharmaceutical",
    "Apparel",
    "E-commerce",
    "Electronics",
    "Jewelry",
    "Retail",
  ];

  return (
    <section
      id="industries"
      className="relative overflow-hidden bg-[#07111F] px-5 py-24 text-white md:px-8"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(0,194,232,0.18),transparent_32%),radial-gradient(circle_at_80%_80%,rgba(255,106,0,0.12),transparent_30%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.32em] text-[#FF6A00]">
            Industries We Serve
          </p>

          <h2 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
            Packaging for every business category
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-300">
            From luxury cosmetics to food-safe packaging, we help brands create
            premium packaging experiences.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((item) => (
            <div
              key={item}
              className="pp-card rounded-[1.7rem] border border-white/10 bg-white/[0.04] p-7"
            >
              <div className="mb-6 h-14 w-14 rounded-2xl bg-gradient-to-br from-[#FF6A00] to-[#00C2E8]" />

              <h3 className="text-2xl font-black">{item}</h3>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                Custom printed packaging solutions designed for your market.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
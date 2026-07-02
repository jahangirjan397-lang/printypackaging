export default function PortfolioPreview() {
  const items = ["Luxury Boxes", "Food Packaging", "Cosmetic Boxes", "Butter Paper", "Paper Bags", "Labels"];

  return (
    <section className="bg-white px-5 py-20 md:px-8">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-sm font-black uppercase tracking-[0.3em] text-[#FF6A00]">Portfolio</p>
        <h2 className="mt-4 text-4xl font-black text-[#07111F] md:text-5xl">
          Packaging work that builds trust
        </h2>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item} className="group overflow-hidden rounded-3xl bg-[#F7FAFC] shadow-lg">
              <div className="h-64 bg-gradient-to-br from-[#07111F] via-[#007C91] to-[#00C2E8] transition group-hover:scale-105" />
              <div className="p-6 text-left">
                <h3 className="text-xl font-black text-[#07111F]">{item}</h3>
                <p className="mt-2 text-slate-600">Premium custom packaging project preview.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
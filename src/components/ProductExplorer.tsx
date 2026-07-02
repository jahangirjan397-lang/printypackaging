export default function ProductExplorer() {
  const groups = [
    {
      title: "Luxury Packaging",
      items: ["Rigid Boxes", "Magnetic Boxes", "Drawer Boxes", "Gift Boxes"],
    },
    {
      title: "Food Packaging",
      items: ["Butter Paper", "Burger Boxes", "Bakery Boxes", "Pizza Boxes"],
    },
    {
      title: "Retail Packaging",
      items: ["Paper Bags", "Hang Tags", "Labels", "Stickers"],
    },
  ];

  return (
    <section className="bg-white px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.32em] text-[#FF6A00]">
            Product Explorer
          </p>
          <h2 className="mt-4 text-4xl font-black text-[#07111F] md:text-6xl">
            Find packaging by business need
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Organize product pages around what international buyers search for.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {groups.map((group) => (
            <div
              key={group.title}
              className="pp-card rounded-[2rem] border border-slate-200 bg-[#F7FAFC] p-7"
            >
              <div className="mb-6 h-40 rounded-[1.5rem] bg-gradient-to-br from-[#07111F] via-[#007C91] to-[#00C2E8]" />
              <h3 className="text-2xl font-black text-[#07111F]">{group.title}</h3>

              <div className="mt-5 grid gap-3">
                {group.items.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-700"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <button className="mt-6 font-black text-[#FF6A00]">
                Explore Category →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
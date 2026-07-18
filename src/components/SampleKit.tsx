export default function SampleKit() {
  return (
    <section className="bg-[#07111F] px-5 py-20 text-white md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 rounded-[2rem] border border-white/10 bg-white/5 p-8 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.3em] text-[#00C2E8]">Sample Kit</p>
          <h2 className="mt-4 text-4xl font-black md:text-5xl">
            Show clients your materials and finishes
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Later we can add a sample kit request form for international customers.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {["Board", "Foil", "Lamination"].map((item) => (
            <div key={item} className="rounded-3xl bg-white p-6 text-[#07111F]">
              <div className="mb-4 h-20 rounded-2xl bg-gradient-to-br from-[#FF6A00] to-[#00C2E8]" />
              <p className="font-black">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

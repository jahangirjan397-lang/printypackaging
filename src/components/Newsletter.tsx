export default function Newsletter() {
  return (
    <section className="bg-white px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-gradient-to-r from-[#07111F] via-[#007C91] to-[#00C2E8] p-10 text-white">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.32em] text-cyan-100">
              Packaging Updates
            </p>
            <h2 className="mt-4 text-4xl font-black md:text-5xl">
              Get packaging ideas and buyer guides
            </h2>
          </div>

          <div className="rounded-[1.5rem] bg-white p-4 shadow-2xl">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                className="flex-1 rounded-2xl border border-slate-300 p-4 text-[#07111F] outline-none"
                placeholder="Enter your email"
              />
              <button className="rounded-2xl bg-[#FF6A00] px-6 py-4 font-black text-white">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
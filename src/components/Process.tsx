export default function Process() {
  const steps = ["Share Requirements", "Get Quote", "Approve Artwork", "Production", "Delivery"];

  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-orange-500">Our Process</p>
        <h2 className="mt-4 text-4xl font-black text-slate-950 md:text-5xl">Simple packaging workflow</h2>

        <div className="mt-14 grid gap-6 md:grid-cols-5">
          {steps.map((step, index) => (
            <div key={step} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 font-black text-white">
                {index + 1}
              </div>
              <h3 className="font-black text-slate-950">{step}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
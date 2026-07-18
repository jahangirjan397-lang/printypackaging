export default function Testimonials() {
  const reviews = [
    "Excellent packaging quality and fast support.",
    "Professional team for custom boxes and artwork guidance.",
    "Great finishing options and premium look.",
  ];

  return (
    <section className="bg-slate-50 px-6 py-20">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-orange-500">Client Reviews</p>
        <h2 className="mt-4 text-4xl font-black text-slate-950 md:text-5xl">Trusted by growing brands</h2>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <div key={review} className="rounded-3xl bg-white p-8 shadow-lg">
              <p className="text-lg font-bold text-slate-800">“{review}”</p>
              <p className="mt-5 text-sm font-black text-orange-500">Verified Client</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


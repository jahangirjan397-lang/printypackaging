export default function BoxStyles() {
  const styles = [
    "Tuck End Boxes",
    "Auto Lock Boxes",
    "Sleeve Boxes",
    "Two Piece Boxes",
    "Drawer Boxes",
    "Magnetic Boxes",
    "Mailer Boxes",
    "Window Boxes",
  ];

  return (
    <section className="bg-white px-5 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-black uppercase tracking-[0.3em] text-[#FF6A00]">Box Style Library</p>
        <h2 className="mt-4 max-w-3xl text-4xl font-black text-[#07111F] md:text-5xl">
          Choose the right packaging style for your product
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {styles.map((item) => (
            <div key={item} className="pp-card rounded-3xl border border-slate-200 bg-[#F7FAFC] p-7">
              <div className="mb-5 h-24 rounded-2xl bg-gradient-to-br from-[#07111F] via-[#007C91] to-[#00C2E8]" />
              <h3 className="text-xl font-black text-[#07111F]">{item}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Popular box structure for custom printed packaging projects.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
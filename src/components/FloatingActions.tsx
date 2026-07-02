export default function FloatingActions() {
  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-2 border-t border-slate-200 bg-white p-2 shadow-2xl md:hidden">
        <a
          href="#quote"
          className="mx-1 rounded-xl bg-[#FF6A00] px-4 py-3 text-center text-xs font-black text-white"
        >
          Quick Quote
        </a>

        <a
          href="https://wa.me/"
          target="_blank"
          className="mx-1 rounded-xl bg-[#00C2E8] px-4 py-3 text-center text-xs font-black text-[#07111F]"
        >
          WhatsApp
        </a>
      </div>

      <div className="fixed bottom-5 right-5 z-50 hidden flex-col gap-3 md:flex">
        <a
          href="#quote"
          className="rounded-full bg-[#FF6A00] px-5 py-3 text-sm font-black text-white shadow-2xl shadow-orange-500/30 transition hover:-translate-y-1 hover:bg-[#007C91]"
        >
          Quick Quote
        </a>

        <a
          href="https://wa.me/"
          target="_blank"
          className="rounded-full bg-[#00C2E8] px-5 py-3 text-sm font-black text-[#07111F] shadow-2xl shadow-cyan-500/30 transition hover:-translate-y-1 hover:bg-[#007C91] hover:text-white"
        >
          WhatsApp
        </a>
      </div>
    </>
  );
}
export default function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
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
  );
}
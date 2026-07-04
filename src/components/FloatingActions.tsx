const whatsappNumber = "923338889954";

const whatsappMessage =
  "Hello PrintyPackaging, I need a custom packaging quote. Please guide me about box style, material, printing and finishing.";

const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  whatsappMessage
)}`;

export default function FloatingActions() {
  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-2 border-t border-slate-200 bg-white p-2 shadow-2xl md:hidden">
        <a
          href="#quote"
          aria-label="Open quick quote form"
          className="mx-1 rounded-xl bg-[#FF6A00] px-4 py-3 text-center text-xs font-black text-white shadow-lg shadow-orange-500/20 transition active:scale-95"
        >
          Quick Quote
        </a>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with PrintyPackaging on WhatsApp"
          className="mx-1 rounded-xl bg-[#00C2E8] px-4 py-3 text-center text-xs font-black text-[#07111F] shadow-lg shadow-cyan-500/20 transition active:scale-95"
        >
          WhatsApp
        </a>
      </div>

      <div className="fixed bottom-5 right-5 z-50 hidden flex-col gap-3 md:flex">
        <a
          href="#quote"
          aria-label="Open quick quote form"
          className="rounded-full bg-[#FF6A00] px-5 py-3 text-sm font-black text-white shadow-2xl shadow-orange-500/30 transition hover:-translate-y-1 hover:bg-[#007C91]"
        >
          Quick Quote
        </a>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with PrintyPackaging on WhatsApp"
          className="rounded-full bg-[#00C2E8] px-5 py-3 text-sm font-black text-[#07111F] shadow-2xl shadow-cyan-500/30 transition hover:-translate-y-1 hover:bg-[#007C91] hover:text-white"
        >
          WhatsApp
        </a>
      </div>
    </>
  );
}
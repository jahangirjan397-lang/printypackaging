const whatsappNumber = "923338889954";

const whatsappMessage =
  "Hello Printy Packaging, I need a custom packaging quote. Please guide me about box style, material, GSM, printing and finishing options.";

const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  whatsappMessage
)}`;

const quoteLink = "/#quote";

function WhatsAppIcon() {
  return (
    <span
      className="flex h-6 w-6 items-center justify-center rounded-full"
      style={{ backgroundColor: "#25D366" }}
    >
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        className="h-4 w-4 fill-white"
      >
        <path d="M16.04 3C9.43 3 4.06 8.33 4.06 14.9c0 2.1.56 4.15 1.62 5.95L4 29l8.38-1.62a12.18 12.18 0 0 0 3.66.56C22.65 27.94 28 22.61 28 16.04S22.65 3 16.04 3Zm0 22.9c-1.18 0-2.34-.18-3.45-.54l-.5-.16-4.96.96.98-4.82-.25-.5a9.82 9.82 0 0 1-1.48-5.94c0-5.45 4.47-9.88 9.96-9.88S26.3 9.45 26.3 14.9s-4.77 11-10.26 11Zm5.78-7.38c-.32-.16-1.9-.94-2.2-1.04-.3-.12-.52-.16-.74.16-.22.32-.86 1.04-1.06 1.26-.2.22-.4.24-.72.08-.32-.16-1.36-.5-2.6-1.6-.96-.86-1.6-1.92-1.8-2.24-.18-.32-.02-.5.14-.66.14-.14.32-.38.48-.56.16-.2.22-.32.32-.54.1-.22.06-.4-.02-.56-.08-.16-.74-1.78-1.02-2.44-.26-.64-.54-.56-.74-.56h-.64c-.22 0-.56.08-.86.4-.3.32-1.14 1.12-1.14 2.74s1.18 3.18 1.34 3.4c.16.22 2.32 3.54 5.64 4.96.8.34 1.42.54 1.9.7.8.26 1.52.22 2.1.14.64-.1 1.9-.78 2.18-1.54.26-.76.26-1.42.18-1.54-.08-.14-.28-.22-.6-.38Z" />
      </svg>
    </span>
  );
}

export default function FloatingActions() {
  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white p-2 shadow-2xl md:hidden">
        <div className="mb-2 text-center text-[11px] font-black uppercase tracking-[0.18em] text-[#07111F]">
          Need custom packaging price?
        </div>

        <div className="grid grid-cols-2 gap-2">
          <a
            href={quoteLink}
            aria-label="Open custom packaging quote form"
            className="rounded-xl bg-[#FF6A00] px-4 py-3 text-center text-xs font-black text-white shadow-lg shadow-orange-500/20 transition active:scale-95"
          >
            Get Quote
          </a>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Printy Packaging on WhatsApp"
            className="flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-center text-xs font-black text-white shadow-lg transition active:scale-95"
            style={{ backgroundColor: "#25D366" }}
          >
            <WhatsAppIcon />
            WhatsApp
          </a>
        </div>
      </div>

      <div className="fixed bottom-5 right-5 z-50 hidden flex-col gap-3 md:flex">
        <a
          href={quoteLink}
          aria-label="Open custom packaging quote form"
          className="rounded-full bg-[#FF6A00] px-5 py-3 text-sm font-black text-white shadow-2xl shadow-orange-500/30 transition hover:-translate-y-1 hover:bg-[#007C91]"
        >
          Get Quote
        </a>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Printy Packaging on WhatsApp"
          className="flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-black text-white shadow-2xl transition hover:-translate-y-1"
          style={{ backgroundColor: "#25D366" }}
        >
          <WhatsAppIcon />
          WhatsApp
        </a>
      </div>
    </>
  );
}
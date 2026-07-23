const whatsappNumber = "923338889954";

const whatsappMessage =
  "Hello PrintyPackaging, I need a custom packaging quote. Please guide me about box style, size, material and pricing.";

const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  whatsappMessage,
)}`;

function QuoteIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M7 8h10M7 12h7M7 16h4M6 21l3-3h9a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3v3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.33 4.95L2 22l5.29-1.39a9.86 9.86 0 0 0 4.75 1.21h.01c5.46 0 9.91-4.44 9.91-9.9C21.96 6.45 17.51 2 12.04 2Zm0 18.14h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.14.82.84-3.06-.2-.31a8.17 8.17 0 0 1-1.25-4.36c0-4.55 3.7-8.25 8.26-8.25a8.25 8.25 0 0 1-.02 16.48Zm4.53-6.18c-.25-.12-1.47-.73-1.7-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.78.98-.14.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.23.25-.87.85-.87 2.08 0 1.22.89 2.4 1.01 2.57.12.16 1.75 2.67 4.24 3.75.59.25 1.05.4 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.29Z" />
    </svg>
  );
}

export default function FloatingActions() {
  return (
    <div className="fixed bottom-4 left-1/2 z-[999997] flex -translate-x-1/2 items-center gap-3 sm:bottom-6 lg:hidden">
      <a
        href="/#quote"
        className="group flex h-12 w-12 items-center justify-center rounded-full bg-[#FF6A00] text-white shadow-[0_18px_45px_rgba(255,106,0,0.35)] ring-1 ring-white/20 transition hover:-translate-y-0.5 hover:bg-[#E85F00] sm:w-auto sm:justify-start sm:gap-3 sm:px-5"
        aria-label="Get a custom packaging quote"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
          <QuoteIcon />
        </span>
        <span className="hidden whitespace-nowrap text-sm font-black sm:inline">
          Get Quote
        </span>
      </a>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-12 w-12 items-center justify-center rounded-full bg-[#19C463] text-white shadow-[0_18px_45px_rgba(25,196,99,0.32)] ring-1 ring-white/20 transition hover:-translate-y-0.5 hover:bg-[#12A955] sm:w-auto sm:justify-start sm:gap-3 sm:px-5"
        aria-label="Chat with PrintyPackaging on WhatsApp"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
          <WhatsAppIcon />
        </span>
        <span className="hidden whitespace-nowrap text-sm font-black sm:inline">
          WhatsApp
        </span>
      </a>
    </div>
  );
}


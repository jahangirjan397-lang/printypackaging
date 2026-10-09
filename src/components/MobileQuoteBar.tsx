// Bar pinned to the bottom of the screen on phones, so the quote button is
// always one tap away on long product pages. Hidden from tablet width up.
export default function MobileQuoteBar({
  priceLabel,
  href = "#product-quote",
}: {
  priceLabel?: string;
  href?: string;
}) {
  return (
    <>
      {/* Only on pages with the bar: lift WhatsApp and the cookie notice above it */}
      <style>
        {
          "@media (max-width: 767px){.floating-whatsapp{bottom:5.25rem !important}#analytics-consent{bottom:5rem !important}}"
        }
      </style>
      <div
        id="mobile-quote-bar"
        className="fixed inset-x-0 bottom-0 z-[999996] border-t border-slate-200 bg-white/95 px-4 py-2.5 shadow-[0_-10px_30px_rgba(7,17,31,0.12)] backdrop-blur md:hidden"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            {priceLabel ? (
              <>
                <p className="text-[11px] font-bold leading-tight text-slate-500">
                  Starting from
                </p>
                <p className="truncate text-base font-black leading-tight text-[#07111F]">
                  {priceLabel}
                </p>
              </>
            ) : (
              <p className="text-sm font-black leading-tight text-[#07111F]">
                Free quote in 1 hour
              </p>
            )}
          </div>
          <a
            href={href}
            className="shrink-0 rounded-full bg-[#FF6A00] px-5 py-3 text-sm font-black text-white shadow-lg shadow-orange-500/25"
          >
            Get Free Quote
          </a>
        </div>
      </div>
    </>
  );
}

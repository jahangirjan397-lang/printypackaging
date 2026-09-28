import localFont from "next/font/local";

// Caveat (SIL Open Font License) is bundled in src/fonts so builds never
// depend on downloading it from Google Fonts.
const caveat = localFont({
  src: [
    { path: "../fonts/caveat-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/caveat-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
});

type HandNoteProps = {
  children: string;
  // Which way the arrow curls after the text
  arrow?: "down-right" | "right";
  className?: string;
};

// Handwritten note with a hand-drawn arrow that draws itself in
export default function HandNote({
  children,
  arrow = "down-right",
  className = "",
}: HandNoteProps) {
  return (
    <span
      className={`inline-flex items-end gap-1 text-[#07111F] ${caveat.className} ${className}`}
    >
      <span className="-rotate-3 text-2xl font-bold leading-none sm:text-[1.7rem]">
        {children}
      </span>
      {arrow === "down-right" ? (
        <svg
          aria-hidden="true"
          viewBox="0 0 80 60"
          className="hand-arrow h-12 w-16 translate-y-5 text-[#FF6A00]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 8c18-4 38 2 50 16s14 22 14 28" />
          <path d="m58 44 10 8 6-12" />
        </svg>
      ) : (
        <svg
          aria-hidden="true"
          viewBox="0 0 80 40"
          className="hand-arrow h-9 w-16 text-[#FF6A00]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 26c14-16 36-18 64-6" />
          <path d="m60 12 10 8-12 5" />
        </svg>
      )}
    </span>
  );
}

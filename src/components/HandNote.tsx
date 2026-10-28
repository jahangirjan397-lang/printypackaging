import localFont from "next/font/local";
import DrawnArrow from "@/components/DrawnArrow";

// Caveat (SIL Open Font License) is bundled in src/fonts so builds never
// depend on downloading it from Google Fonts.
const caveat = localFont({
  src: [
    { path: "../fonts/caveat-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/caveat-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  // Decorative only: don't let it compete with the hero for bandwidth
  preload: false,
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
        <DrawnArrow direction="down-right" className="h-12 w-14 translate-y-5" />
      ) : (
        <DrawnArrow direction="right" className="h-9 w-16" />
      )}
    </span>
  );
}

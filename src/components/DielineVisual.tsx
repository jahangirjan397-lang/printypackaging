import Image from "next/image";
import type { Dieline } from "@/data/dielines";
import { dielineImage, showsPdf } from "@/data/dielines";
import { buildDieline, dielineToSvg } from "@/lib/dielineGeometry";
import DielinePdfPreview from "@/components/DielinePdfPreview";
import NavIcon from "@/components/NavIcon";

// What a library card or page shows for a dieline:
// - verified styles: the real vector dieline with sizes and arrows
// - admin uploads: their PDF (rendered) or picture
// - everything else: no stand-in picture, just the style icon and a note that
//   we draw the exact dieline in the buyer's size (until we add the style)
export default function DielineVisual({ d, size = "card" }: { d: Dieline; size?: "card" | "page" }) {
  if (d.gen) {
    // clean line drawing with every size; panel names only on the full page
    const svg = dielineToSvg(buildDieline(d.gen.style, { L: d.gen.L, W: d.gen.W, H: d.gen.H, t: 0.5, slitLock: d.gen.slitLock }), d.name, { preview: true, unit: "mm", theme: "plain", labels: size === "page" });
    // our own generated SVG string, no user HTML
    return <div className={`w-full [&>svg]:h-auto [&>svg]:w-full ${size === "page" ? "max-w-2xl [&>svg]:max-h-[34rem]" : "[&>svg]:max-h-48"}`} dangerouslySetInnerHTML={{ __html: svg }} />;
  }
  if (showsPdf(d) && d.file) return <DielinePdfPreview file={d.file} compact={size === "card"} />;
  if (d.src) {
    return <Image src={dielineImage(d)} alt={`${d.name} dieline template`} width={d.image.w} height={d.image.h} sizes={size === "page" ? "(max-width: 1024px) 92vw, 640px" : "(max-width: 640px) 90vw, 280px"} className={size === "page" ? "h-auto max-h-[34rem] w-auto" : "max-h-full w-auto object-contain"} />;
  }
  return (
    <div className={`flex flex-col items-center justify-center text-center ${size === "page" ? "py-16" : "py-2"}`}>
      <NavIcon name={d.product ?? "folding-cartons"} className={`${size === "page" ? "h-28 w-28" : "h-16 w-16"} text-[#007C91]`} />
      <p className={`mt-3 font-black text-[#07111F] ${size === "page" ? "text-lg" : "text-xs"}`}>Exact dieline in your size</p>
      <p className={`mt-1 max-w-xs font-bold text-slate-500 ${size === "page" ? "text-sm" : "text-[11px]"}`}>Drawn by our team, free with your quote</p>
    </div>
  );
}

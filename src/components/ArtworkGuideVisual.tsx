// Technical illustrations for the artwork guide checklist. Each one shows exactly
// what its card explains (cut/crease lines, bleed, safe area, colour, resolution,
// barcode quiet zone, proofreading, approval), in the brand colours. The dieline,
// bleed and safe-area cards use a real reverse tuck end from our dieline generator.

import { buildDieline, dielineToSvg } from "@/lib/dielineGeometry";

export type ArtworkVisualKind =
  | "dieline"
  | "bleed"
  | "safe"
  | "color"
  | "resolution"
  | "barcode"
  | "proof"
  | "approval";

type RealDielineKind = "dieline" | "bleed" | "safe";
const REAL: RealDielineKind[] = ["dieline", "bleed", "safe"];

const NAVY = "#07111F";
const ORANGE = "#FF6A00";
const TEAL = "#007C91";
const MUTED = "#94A3B8";

function Label({ x, y, children, fill = NAVY, anchor = "start" }: { x: number; y: number; children: string; fill?: string; anchor?: "start" | "middle" | "end" }) {
  return (
    <text x={x} y={y} fontSize="10" fontWeight="800" fill={fill} textAnchor={anchor} fontFamily="inherit">
      {children}
    </text>
  );
}

function Color() {
  return (
    <>
      <g style={{ mixBlendMode: "multiply" }}>
        <circle cx="88" cy="82" r="34" fill="#00AEEF" opacity="0.85" />
        <circle cx="122" cy="82" r="34" fill="#EC008C" opacity="0.85" />
        <circle cx="105" cy="112" r="34" fill="#FFF200" opacity="0.85" />
      </g>
      <rect x="166" y="52" width="40" height="40" rx="4" fill={NAVY} />
      <Label x={186} y={106} anchor="middle">K</Label>
      <Label x={105} y={168} anchor="middle">CMYK full colour</Label>
      <g transform="translate(222 36)">
        <rect width="54" height="98" rx="6" fill="#fff" stroke="#E2E8F0" />
        <rect x="5" y="5" width="44" height="58" rx="3" fill={ORANGE} />
        <text x="27" y="78" fontSize="8" fontWeight="900" fill={NAVY} textAnchor="middle" fontFamily="inherit">PANTONE</text>
        <text x="27" y="90" fontSize="8" fontWeight="700" fill={MUTED} textAnchor="middle" fontFamily="inherit">1585 C</text>
      </g>
      <Label x={249} y={152} anchor="middle">Spot brand colour</Label>
    </>
  );
}

function Resolution() {
  const cells: React.ReactNode[] = [];
  const shades = ["#007C91", "#0E94A8", "#22B3C5", "#6FD3DF", "#FF6A00", "#FF8A3D"];
  for (let r = 0; r < 7; r++)
    for (let c = 0; c < 7; c++) {
      const d = Math.hypot(r - 3, c - 3);
      if (d > 3.4) continue;
      cells.push(<rect key={`${r}-${c}`} x={40 + c * 14} y={40 + r * 14} width="14" height="14" fill={shades[Math.min(5, Math.floor(d * 1.6))]} />);
    }
  return (
    <>
      <rect x="34" y="34" width="110" height="110" rx="6" fill="#fff" stroke="#E2E8F0" />
      {cells}
      <rect x="166" y="34" width="110" height="110" rx="6" fill="#fff" stroke="#E2E8F0" />
      <circle cx="221" cy="89" r="48" fill="url(#aw-radial)" />
      <Label x={89} y={166} fill="#E11D48" anchor="middle">72 dpi: blurry</Label>
      <Label x={221} y={166} fill="#16A34A" anchor="middle">300 dpi: sharp</Label>
      <Label x={155} y={190} anchor="middle">Use 300 dpi images at print size</Label>
    </>
  );
}

function Barcode() {
  const bars = [2, 1, 3, 1, 1, 2, 4, 1, 2, 1, 1, 3, 2, 2, 1, 1, 3, 1, 2, 4, 1, 1, 2, 1, 3, 1, 2, 1, 1, 2];
  let x = 96;
  return (
    <>
      <rect x="60" y="34" width="180" height="120" rx="6" fill="#fff" stroke="#E2E8F0" />
      <rect x="74" y="46" width="152" height="80" fill="#F0FDF4" />
      <g fill={NAVY}>
        {bars.map((w, i) => {
          const rect = i % 2 === 0 ? <rect key={i} x={x} y="50" width={w * 1.4} height="66" /> : null;
          x += w * 1.4 + 0.6;
          return rect;
        })}
      </g>
      <text x="150" y="140" fontSize="10" fontWeight="700" fill={NAVY} textAnchor="middle" letterSpacing="2" fontFamily="inherit">0 12345 67890 5</text>
      <path d="M78 58v52M92 58v52" stroke="#16A34A" strokeWidth="1.2" strokeDasharray="3 2" />
      <Label x={60} y={176} fill="#16A34A">Quiet zone</Label>
      <circle cx="252" cy="44" r="14" fill="#16A34A" />
      <path d="M245 44l5 5 9-10" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <Label x={150} y={192} anchor="middle">Dark bars on a light, clear background</Label>
    </>
  );
}

function Proof() {
  return (
    <>
      <rect x="60" y="24" width="180" height="150" rx="6" fill="#fff" stroke="#E2E8F0" />
      <text x="76" y="50" fontSize="11" fontWeight="900" fill={NAVY} fontFamily="inherit">Ingredients</text>
      <text x="76" y="70" fontSize="9" fontWeight="600" fill="#475569" fontFamily="inherit">Shea butter, coconut oil,</text>
      <text x="76" y="86" fontSize="9" fontWeight="600" fill="#475569" fontFamily="inherit">lavendar essential oil,</text>
      <ellipse cx="96" cy="83" rx="23" ry="8" fill="none" stroke="#E11D48" strokeWidth="1.6" />
      <text x="152" y="104" fontSize="9" fontWeight="800" fill="#E11D48" fontFamily="inherit">lavender</text>
      <path d="M119 86l31 12" stroke="#E11D48" strokeWidth="1.2" />
      <text x="76" y="122" fontSize="9" fontWeight="600" fill="#475569" fontFamily="inherit">Net wt 4 oz (113 g)</text>
      <text x="76" y="138" fontSize="9" fontWeight="600" fill="#475569" fontFamily="inherit">Made in USA · www.yourbrand.com</text>
      <circle cx="226" cy="160" r="11" fill={ORANGE} />
      <text x="226" y="164" fontSize="11" fontWeight="900" fill={NAVY} textAnchor="middle" fontFamily="inherit">?</text>
      <Label x={150} y={192} anchor="middle">Check spelling, claims and legal text</Label>
    </>
  );
}

function Approval() {
  return (
    <>
      <rect x="54" y="22" width="150" height="156" rx="6" fill="#fff" stroke="#E2E8F0" />
      <rect x="66" y="34" width="126" height="64" rx="4" fill="#F1F5F9" />
      <path d="M90 52h40v28h-40zM130 52h28v28h-28z" fill="none" stroke={NAVY} strokeWidth="1.2" />
      <path d="M130 52v28" stroke={ORANGE} strokeDasharray="3 2" />
      <text x="70" y="116" fontSize="8" fontWeight="800" fill={MUTED} fontFamily="inherit">SIZE · MATERIAL · FINISH</text>
      {[126, 138, 150].map((y) => (
        <g key={y}>
          <rect x="70" y={y - 7} width="8" height="8" rx="2" fill="#16A34A" />
          <rect x="84" y={y - 5} width={y === 138 ? 70 : 92} height="5" rx="2" fill="#CBD5E1" />
        </g>
      ))}
      <path d="M72 168q10-10 18 0t18-2 16 2" stroke={NAVY} strokeWidth="1.4" fill="none" />
      <g transform="translate(240 78) rotate(-12)">
        <rect x="-50" y="-22" width="100" height="44" rx="8" fill="none" stroke="#16A34A" strokeWidth="3" />
        <text x="0" y="7" fontSize="17" fontWeight="900" fill="#16A34A" textAnchor="middle" fontFamily="inherit">APPROVED</text>
      </g>
      <Label x={250} y={150} anchor="middle">Then production</Label>
      <Label x={250} y={163} anchor="middle">starts</Label>
    </>
  );
}

const VISUALS: Record<Exclude<ArtworkVisualKind, RealDielineKind>, () => React.ReactNode> = {
  color: Color,
  resolution: Resolution,
  barcode: Barcode,
  proof: Proof,
  approval: Approval,
};


// A real 80 x 40 x 50 mm reverse tuck end, drawn by the same code as /dieline-generator
const TUCK = buildDieline("reverse-tuck-end", { L: 80, W: 40, H: 50, t: 0.5 });
const BLEED_MM = 3;

// bolder cut and crease lines so the drawing reads at card size
function thicken(svg: string) {
  return svg.replace(/(<g id="dieline-(?:cut|crease)"[^>]*stroke-width=")([\d.]+)"/g, (_m, pre: string, w: string) => `${pre}${(Number(w) * 2.4).toFixed(2)}"`)
    .replace(/stroke-dasharray="([\d.]+) ([\d.]+)"/, (_m, a: string, b: string) => `stroke-dasharray="${(Number(a) * 2).toFixed(2)} ${(Number(b) * 2).toFixed(2)}"`);
}

function realDielineSvg(kind: RealDielineKind) {
  if (kind === "dieline") {
    return thicken(dielineToSvg(TUCK, "Reverse tuck end dieline", { preview: true, theme: "printy", dims: false, labels: true }));
  }
  let svg = dielineToSvg(TUCK, kind === "bleed" ? "Bleed area" : "Safe area", { preview: true, theme: "printy", dims: false, labels: kind === "safe" });
  if (kind === "bleed") {
    // artwork painted on every panel and carried 3 mm past the cut line (half of a 6 mm stroke)
    svg = svg
      .replace(/<g id="board" fill="[^"]*">(.*?)<\/g>/, (_m, paths: string) => `<defs><linearGradient id="aw-art" gradientUnits="userSpaceOnUse" x1="${TUCK.bbox[0]}" y1="${TUCK.bbox[1]}" x2="${TUCK.bbox[2]}" y2="${TUCK.bbox[3]}"><stop offset="0" stop-color="${TEAL}"/><stop offset="1" stop-color="${ORANGE}"/></linearGradient></defs><g fill="none" stroke="#E11D48" stroke-width="${BLEED_MM * 2 + 1.2}" stroke-linejoin="round">${paths}</g><g id="board" fill="url(#aw-art)" stroke="url(#aw-art)" stroke-width="${BLEED_MM * 2}" stroke-linejoin="round">${paths}</g>`)
      .replace(/<g id="labels"[^>]*>.*?<\/g>/, "");
  } else {
    // safe zone: each panel minus a 3 mm margin, shown by covering the margin in the board colour
    svg = svg.replace(/<g id="board" fill="([^"]*)">(.*?)<\/g>/, (_m, fill: string, paths: string) =>
      `<g id="safe-zone" fill="#BBF7D0">${paths}</g><g id="margin" fill="none" stroke="${fill}" stroke-width="${BLEED_MM * 2}">${paths}</g>`);
  }
  // fill the card width instead of the millimetre size
  return thicken(svg).replace(/width="[\d.]+mm" height="[\d.]+mm"/, 'width="100%" height="100%" preserveAspectRatio="xMidYMid meet"');
}

const REAL_CAPTION: Record<RealDielineKind, React.ReactNode> = {
  dieline: (
    <span className="flex items-center justify-center gap-4">
      <span className="flex items-center gap-1.5"><span className="inline-block h-0.5 w-5 bg-[#07111F]" />Cut</span>
      <span className="flex items-center gap-1.5"><span className="inline-block w-5 border-t-2 border-dashed border-[#FF6A00]" />Crease</span>
      <span className="flex items-center gap-1.5"><span className="inline-block h-2.5 w-4 rounded-sm bg-[#00C2E8]/40" />Glue</span>
    </span>
  ),
  bleed: <span>Artwork runs <b className="text-[#E11D48]">3 mm past</b> every cut line</span>,
  safe: <span>Logo, text and barcode stay in the <b className="text-emerald-700">green safe zone</b></span>,
};

export default function ArtworkGuideVisual({ kind, title }: { kind: ArtworkVisualKind; title: string }) {
  if ((REAL as ArtworkVisualKind[]).includes(kind)) {
    const k = kind as RealDielineKind;
    return (
      <figure className="m-0">
        {/* our own generated SVG string, no user HTML */}
        <div role="img" aria-label={`${title} illustration`} className="h-52 w-full bg-white p-1 [&_svg]:h-full [&_svg]:w-full" dangerouslySetInnerHTML={{ __html: realDielineSvg(k) }} />
        <figcaption className="pt-2 text-center text-[11px] font-extrabold text-[#07111F]">{REAL_CAPTION[k]}</figcaption>
      </figure>
    );
  }
  const Visual = VISUALS[kind as Exclude<ArtworkVisualKind, RealDielineKind>];
  return (
    <svg viewBox="0 0 300 200" role="img" aria-label={`${title} illustration`} className="h-auto w-full">
      <defs>
        <linearGradient id="aw-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={TEAL} />
          <stop offset="1" stopColor={ORANGE} />
        </linearGradient>
        <radialGradient id="aw-radial">
          <stop offset="0" stopColor="#FF8A3D" />
          <stop offset="0.55" stopColor="#22B3C5" />
          <stop offset="1" stopColor={TEAL} />
        </radialGradient>
      </defs>
      <Visual />
    </svg>
  );
}

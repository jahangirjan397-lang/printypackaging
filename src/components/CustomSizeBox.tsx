"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const STYLES = [
  { id: "mailer", name: "Mailer box", board: "e-flute" },
  { id: "reverse-tuck-end", name: "Reverse tuck end", board: "card" },
  { id: "straight-tuck-end", name: "Straight tuck end", board: "card" },
  { id: "auto-bottom", name: "Tuck top auto bottom", board: "card" },
  { id: "snap-lock", name: "Tuck top snap lock (1-2-3)", board: "card" },
  { id: "four-corner", name: "Four corner tray", board: "card" },
  { id: "six-corner", name: "Six corner box", board: "card" },
];
const TO_MM = { in: 25.4, cm: 10, mm: 1 } as const;

// "Your own size": any size in any unit opens the generator with the exact dieline.
export default function CustomSizeBox({ defaultStyle = "mailer", title = "Need a different size? Make your own dieline" }: { defaultStyle?: string; title?: string }) {
  const router = useRouter();
  const [style, setStyle] = useState(defaultStyle);
  const [unit, setUnit] = useState<keyof typeof TO_MM>("in");
  const [size, setSize] = useState({ L: "", W: "", H: "" });
  const [error, setError] = useState("");

  function open() {
    const mm = (["L", "W", "H"] as const).map((k) => Number(size[k]) * TO_MM[unit]);
    if (mm.some((v) => !(v >= 10 && v <= 1500))) {
      setError("Please enter length, width and height (each at least 10 mm / 0.4 in).");
      return;
    }
    const board = STYLES.find((s) => s.id === style)?.board ?? "card";
    const q = new URLSearchParams({ style, L: mm[0].toFixed(2), W: mm[1].toFixed(2), H: mm[2].toFixed(2), board, unit });
    router.push(`/dieline-generator?${q}`);
  }

  return (
    <div className="rounded-2xl border-2 border-dashed border-[#FF6A00] bg-white p-4 sm:p-5">
      <h2 className="text-lg font-black text-[#07111F]">{title}</h2>
      <p className="mt-1 text-sm text-slate-600">Any size, in inches, cm or mm. The generator draws the exact dieline straight away, free.</p>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-[1.6fr_repeat(3,1fr)_5rem_auto]">
        <select aria-label="Box style" value={style} onChange={(e) => setStyle(e.target.value)} className="field-input field-compact col-span-2 sm:col-span-1">
          {STYLES.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
        {(["L", "W", "H"] as const).map((k) => (
          <input
            key={k}
            inputMode="decimal"
            aria-label={{ L: "Length", W: "Width", H: "Height" }[k]}
            placeholder={{ L: "Length", W: "Width", H: "Height" }[k]}
            value={size[k]}
            onChange={(e) => setSize((s) => ({ ...s, [k]: e.target.value.replace(/[^0-9.]/g, "") }))}
            className="field-input field-compact"
          />
        ))}
        <select aria-label="Unit" value={unit} onChange={(e) => setUnit(e.target.value as keyof typeof TO_MM)} className="field-input field-compact">
          <option value="in">in</option>
          <option value="cm">cm</option>
          <option value="mm">mm</option>
        </select>
        <button type="button" onClick={open} className="col-span-2 rounded-lg bg-[#FF6A00] px-4 py-2 text-sm font-black text-[#07111F] hover:bg-[#e65f00] sm:col-span-1">
          Make my dieline →
        </button>
      </div>
      {error && <p role="alert" className="mt-2 text-xs font-bold text-red-700">{error}</p>}
      <p className="mt-2 text-xs font-bold text-slate-500">Another style, a rigid box or something special? Send it with your quote and we make the dieline to your exact size with your order.</p>
    </div>
  );
}

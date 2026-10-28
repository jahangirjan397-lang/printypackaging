"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { boxSizes, sizeLabel, type BoxSize } from "@/data/boxSizes";
import { buildDieline, dielineToSvg } from "@/lib/dielineGeometry";

const IN = 25.4;
const BOARD = { card: { name: "SBS card 350 gsm", t: 0.5 }, "e-flute": { name: "E-flute corrugated", t: 1.5 } };
const TO_MM = { in: 25.4, cm: 10, mm: 1 } as const;
type Unit = keyof typeof TO_MM;

const groups = [...new Set(boxSizes.map((b) => b.styleName))].map((name) => {
  const sizes = boxSizes.filter((b) => b.styleName === name);
  return { name, sizes, base: sizes[0] };
});

type Pick = { base: BoxSize; L: number; W: number; H: number; unit: Unit; fits: string[]; custom: boolean };

const fmt = (v: number) => String(Number(v.toFixed(2)));

// One page for every size: choose a style, click a size (or add your own) and
// the exact dieline, flat size and links appear right here.
export default function BoxSizePicker() {
  const params = useSearchParams();
  const fromLink = boxSizes.find((b) => b.slug === params.get("size"));
  const [group, setGroup] = useState(fromLink?.styleName ?? groups[0].name);
  const [pick, setPick] = useState<Pick>(() => {
    const b = fromLink ?? groups[0].sizes[6] ?? groups[0].base;
    return { base: b, L: b.L, W: b.W, H: b.H, unit: "in", fits: b.fits, custom: false };
  });
  const [own, setOwn] = useState({ L: String(pick.L), W: String(pick.W), H: String(pick.H), unit: "in" as Unit });
  const [error, setError] = useState("");

  // the size chart below links to ?size=…; show that size up here when it changes
  const sizeParam = params.get("size");
  const [lastParam, setLastParam] = useState(sizeParam);
  if (sizeParam !== lastParam) {
    setLastParam(sizeParam);
    const b = boxSizes.find((x) => x.slug === sizeParam);
    if (b) {
      setGroup(b.styleName);
      setPick({ base: b, L: b.L, W: b.W, H: b.H, unit: "in", fits: b.fits, custom: false });
      setOwn({ L: String(b.L), W: String(b.W), H: String(b.H), unit: "in" });
    }
  }

  const g = groups.find((x) => x.name === group) ?? groups[0];

  const view = useMemo(() => {
    const board = BOARD[pick.base.board];
    const k = TO_MM[pick.unit];
    const dl = buildDieline(pick.base.style, { L: pick.L * k, W: pick.W * k, H: pick.H * k, t: board.t });
    const [x0, y0, x1, y1] = dl.bbox;
    const label = `${fmt(pick.L)} x ${fmt(pick.W)} x ${fmt(pick.H)} ${pick.unit}`;
    const svg = dielineToSvg(dl, `${pick.base.styleName} ${label} dieline`, { preview: true, unit: pick.unit, dims: true, labels: true })
      .replace(/ width="[\d.]+mm" height="[\d.]+mm"/, ' width="100%"');
    return { board, label, svg, fw: x1 - x0, fh: y1 - y0, k };
  }, [pick]);

  const mmL = pick.L * view.k, mmW = pick.W * view.k, mmH = pick.H * view.k;
  const generatorHref = `/dieline-generator?${new URLSearchParams({ style: pick.base.style, L: mmL.toFixed(2), W: mmW.toFixed(2), H: mmH.toFixed(2), board: pick.base.board, unit: pick.unit })}`;
  const quoteHref = `/?${new URLSearchParams({ product: pick.base.product, L: fmt(pick.L), W: fmt(pick.W), H: fmt(pick.H), unit: pick.unit, note: `${pick.base.styleName} ${view.label} (box size library)` })}#quote`;

  function choose(b: BoxSize) {
    setPick({ base: b, L: b.L, W: b.W, H: b.H, unit: "in", fits: b.fits, custom: false });
    setOwn({ L: String(b.L), W: String(b.W), H: String(b.H), unit: "in" });
    setError("");
  }

  function addOwn() {
    const v = [own.L, own.W, own.H].map(Number);
    if (v.some((x) => !(x * TO_MM[own.unit] >= 10 && x * TO_MM[own.unit] <= 1500))) {
      setError("Please enter length, width and height (each at least 10 mm / 0.4 in).");
      return;
    }
    setError("");
    setPick({ base: g.base, L: v[0], W: v[1], H: v[2], unit: own.unit, fits: [], custom: true });
  }

  return (
    <div>
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-[1.3fr_1.4fr_repeat(3,1fr)_5.5rem_auto] lg:items-end">
          <label className="col-span-2 block lg:col-span-1">
            <span className="mb-1 block text-xs font-black text-slate-600">Box style</span>
            <select
              value={group}
              onChange={(e) => { const x = groups.find((y) => y.name === e.target.value) ?? groups[0]; setGroup(x.name); choose(x.sizes[0]); }}
              className="field-input field-compact"
            >
              {groups.map((x) => (
                <option key={x.name} value={x.name}>{x.name}</option>
              ))}
            </select>
          </label>
          <label className="col-span-2 block lg:col-span-1">
            <span className="mb-1 block text-xs font-black text-slate-600">Popular size <span className="font-bold text-slate-400">(optional)</span></span>
            <select
              value={pick.custom ? "" : pick.base.slug}
              onChange={(e) => { const b = g.sizes.find((x) => x.slug === e.target.value); if (b) choose(b); }}
              className="field-input field-compact"
            >
              <option value="">Your own size</option>
              {g.sizes.map((b) => (
                <option key={b.slug} value={b.slug}>{sizeLabel(b)}</option>
              ))}
            </select>
          </label>
          {(["L", "W", "H"] as const).map((k) => (
            <label key={k} className="block">
              <span className="mb-1 block text-xs font-black text-slate-600">{{ L: "Length", W: "Width", H: "Height" }[k]}</span>
              <input
                inputMode="decimal"
                value={own[k]}
                onChange={(e) => setOwn((s) => ({ ...s, [k]: e.target.value.replace(/[^0-9.]/g, "") }))}
                onKeyDown={(e) => { if (e.key === "Enter") addOwn(); }}
                className="field-input field-compact"
              />
            </label>
          ))}
          <label className="block">
            <span className="mb-1 block text-xs font-black text-slate-600">Unit</span>
            <select value={own.unit} onChange={(e) => setOwn((s) => ({ ...s, unit: e.target.value as Unit }))} className="field-input field-compact">
              <option value="in">in</option>
              <option value="cm">cm</option>
              <option value="mm">mm</option>
            </select>
          </label>
          <button type="button" onClick={addOwn} className="col-span-2 rounded-lg bg-[#FF6A00] px-5 py-2.5 text-sm font-black text-[#07111F] hover:bg-[#e65f00] lg:col-span-1">
            Show dieline
          </button>
        </div>
        <p className="mt-2 text-xs font-bold text-slate-500">Enter the inside size of your box, or pick a popular size to start from.</p>
        {error && <p role="alert" className="mt-2 text-xs font-bold text-red-700">{error}</p>}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <figure className="rounded-2xl border border-slate-200 bg-white p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`data:image/svg+xml;utf8,${encodeURIComponent(view.svg)}`} alt={`${pick.base.styleName} ${view.label} dieline with cut and crease lines`} className="h-auto w-full" />
          <figcaption className="mt-2 text-xs font-bold text-slate-500">Solid lines are cuts, dashed lines are folds.</figcaption>
        </figure>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-black">{pick.base.styleName} {view.label}</h2>
          <dl className="mt-3 divide-y divide-slate-100 text-sm">
            {[
              ["Inside size", `${view.label} (${Math.round(mmL)} x ${Math.round(mmW)} x ${Math.round(mmH)} mm)`],
              ["Flat dieline size", `${fmt(view.fw / IN)} x ${fmt(view.fh / IN)} in (${Math.round(view.fw)} x ${Math.round(view.fh)} mm)`],
              ["Board", view.board.name],
              ...(pick.fits.length ? [["Good for", pick.fits.join(", ")]] : []),
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-2">
                <dt className="font-bold text-slate-500">{k}</dt>
                <dd className="text-right font-bold">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-4 flex flex-col gap-2">
            <Link href={quoteHref} prefetch={false} className="rounded-full bg-[#FF6A00] px-5 py-3 text-center text-sm font-black text-[#07111F] hover:bg-[#007C91] hover:text-white">
              Get the price for this size →
            </Link>
            <Link href={generatorHref} prefetch={false} className="rounded-full border border-slate-300 px-5 py-3 text-center text-sm font-black hover:border-[#07111F]">
              Download the free dieline (PDF, SVG, DXF)
            </Link>
          </div>
          <p className="mt-3 text-xs font-bold text-slate-500">
            Have your design? Send the open file and we fit your full artwork on this dieline, then send a proof to approve.
          </p>
        </div>
      </div>
    </div>
  );
}

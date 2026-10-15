// Print-readiness check for a packaging PDF, run in the browser with pdf.js.
// Nothing is uploaded: the file is read locally and a list of findings is
// returned (pass / warn / fail with a plain explanation and a fix).

export type Finding = { level: "pass" | "warn" | "fail" | "info"; title: string; detail: string };
export type Expected = { w: number; h: number; label: string } | null; // flat dieline size in mm

const PT = 25.4 / 72; // mm per point
const mm = (pt: number) => Math.round(pt * PT * 10) / 10;

// ---- raw scan of the file (plus compressed object streams) ----
async function inflate(bytes: Uint8Array): Promise<string> {
  try {
    const ds = new DecompressionStream("deflate");
    const out = await new Response(new Blob([bytes as BlobPart]).stream().pipeThrough(ds)).arrayBuffer();
    return new TextDecoder("latin1").decode(out);
  } catch {
    return "";
  }
}

async function rawText(buf: ArrayBuffer): Promise<string> {
  const bytes = new Uint8Array(buf);
  const text = new TextDecoder("latin1").decode(bytes);
  const parts = [text];
  // object streams hold page and font dictionaries in newer PDFs
  const re = /<<[^]*?\/Type\s*\/ObjStm[^]*?>>\s*stream\r?\n/g;
  let m: RegExpExecArray | null;
  let count = 0;
  while ((m = re.exec(text)) && count < 400) {
    const start = m.index + m[0].length;
    const end = text.indexOf("endstream", start);
    if (end < 0) break;
    if (/\/FlateDecode/.test(m[0])) parts.push(await inflate(bytes.subarray(start, end)));
    count++;
  }
  return parts.join("\n");
}

function boxes(raw: string, name: string): number[][] {
  const out: number[][] = [];
  const re = new RegExp(`/${name}\\s*\\[\\s*([-\\d.\\s]+)\\]`, "g");
  let m: RegExpExecArray | null;
  while ((m = re.exec(raw))) {
    const n = m[1].trim().split(/\s+/).map(Number);
    if (n.length === 4 && n.every(Number.isFinite)) out.push(n);
  }
  return out;
}

type Mat = [number, number, number, number, number, number];
const mul = (m1: Mat, m2: Mat): Mat => [
  m1[0] * m2[0] + m1[2] * m2[1], m1[1] * m2[0] + m1[3] * m2[1],
  m1[0] * m2[2] + m1[2] * m2[3], m1[1] * m2[2] + m1[3] * m2[3],
  m1[0] * m2[4] + m1[2] * m2[5] + m1[4], m1[1] * m2[4] + m1[3] * m2[5] + m1[5],
];

export async function checkPdf(file: File, expected: Expected): Promise<Finding[]> {
  const f: Finding[] = [];
  const buf = await file.arrayBuffer();
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = "/vendor/pdf.worker-6.3.289.min.mjs";

  const task = pdfjs.getDocument({ data: new Uint8Array(buf.slice(0)) });
  let doc;
  try {
    doc = await task.promise;
  } catch {
    return [{ level: "fail", title: "The file could not be opened", detail: "Save it again as PDF (PDF/X-1a or PDF/X-4 if your software offers it) and try once more." }];
  }
  const raw = await rawText(buf);

  // 1. pages
  f.push(doc.numPages === 1
    ? { level: "pass", title: "One page", detail: "Packaging artwork should be a single page with the full flat layout." }
    : { level: "warn", title: `${doc.numPages} pages`, detail: "Only the first page was checked. Put the outside print on page 1; inside print can be page 2." });

  const page = await doc.getPage(1);
  const [vx0, vy0, vx1, vy1] = page.view;
  const pageW = vx1 - vx0, pageH = vy1 - vy0;

  // 2. trim and bleed
  const trims = boxes(raw, "TrimBox"), bleeds = boxes(raw, "BleedBox");
  let trimW = pageW, trimH = pageH, bleedMm = 0;
  if (trims.length) {
    const t = trims[0];
    trimW = t[2] - t[0]; trimH = t[3] - t[1];
    const outer = bleeds[0] || [vx0, vy0, vx1, vy1];
    bleedMm = Math.min(t[0] - outer[0], t[1] - outer[1], outer[2] - t[2], outer[3] - t[3]) * PT;
    f.push(bleedMm >= 2.9
      ? { level: "pass", title: `Bleed ${bleedMm.toFixed(1)} mm`, detail: "Colours can run past the cut without white edges." }
      : bleedMm > 0.4
        ? { level: "warn", title: `Bleed only ${bleedMm.toFixed(1)} mm`, detail: "Use 3 mm bleed: extend background colours and images 3 mm past every cut line." }
        : { level: "fail", title: "No bleed", detail: "The page stops exactly at the trim. Extend artwork 3 mm past the cut line and export with 3 mm bleed." });
  } else {
    f.push({ level: "info", title: "No trim box found", detail: "That is normal for dieline layouts where the page is larger than the box. Make sure artwork extends 3 mm past every cut line." });
  }
  f.push({ level: "info", title: `Page ${mm(pageW)} × ${mm(pageH)} mm${trims.length ? `, trim ${mm(trimW)} × ${mm(trimH)} mm` : ""}`, detail: "Size as saved in the file." });

  // 3. size against the expected dieline
  if (expected) {
    const fits = (a: number, b: number) => a >= expected.w - 2 && b >= expected.h - 2;
    const sizes: [number, number][] = [[mm(trimW), mm(trimH)], [mm(pageW), mm(pageH)]];
    const ok = sizes.some(([a, b]) => fits(a, b) || fits(b, a));
    f.push(ok
      ? { level: "pass", title: "Big enough for the dieline", detail: `The layout fits a ${expected.label} (flat ${Math.round(expected.w)} × ${Math.round(expected.h)} mm).` }
      : { level: "fail", title: "Page smaller than the dieline", detail: `A ${expected.label} is ${Math.round(expected.w)} × ${Math.round(expected.h)} mm flat. Check the box size or download the dieline from our generator and place artwork on it.` });
  }

  // 4. dieline on its own layer or spot colour
  const layerNames: string[] = [];
  try {
    const oc = await doc.getOptionalContentConfig();
    for (const [, g] of oc as unknown as Iterable<[string, { name?: string }]>) if (g?.name) layerNames.push(g.name);
  } catch { /* no layers */ }
  const sepNames = [...raw.matchAll(/\/Separation\s*\/([^\s/[\]<>()]+)/g)].map((x) => x[1].replace(/#20/g, " "));
  const dieRe = /die|cut|crease|score|thru|kiss|dieline|stanz/i;
  const dieLayer = layerNames.find((n) => dieRe.test(n));
  const dieSpot = sepNames.find((n) => dieRe.test(n));
  f.push(dieLayer || dieSpot
    ? { level: "pass", title: "Dieline found", detail: `${dieSpot ? `Spot colour "${dieSpot}"` : `Layer "${dieLayer}"`}. Keep it as a stroke only, set to overprint, not printed.` }
    : { level: "warn", title: "No dieline layer or spot colour found", detail: "Put the cut and fold lines on their own layer named \"Dieline\" in a spot colour (e.g. \"Dieline\" or \"CutContour\"), so we can separate it from the print." });
  if (layerNames.length) f.push({ level: "info", title: `Layers: ${layerNames.slice(0, 8).join(", ")}`, detail: "Layer names saved in the PDF." });

  // 5. colour
  const spot = [...new Set(sepNames.filter((n) => !dieRe.test(n) && !/^(All|None|Cyan|Magenta|Yellow|Black)$/i.test(n)))];
  if (spot.length) f.push({ level: "info", title: `Spot colours: ${spot.slice(0, 6).join(", ")}`, detail: "Each spot colour is an extra plate. Check these are Pantone colours you want printed, not left over from stock images." });
  const iccRgb = /\/ICCBased/.test(raw) && /\/N\s+3(?!\s*\d)(?!\s+0\s+R)/.test(raw);
  const rgb = (raw.match(/\/DeviceRGB|\/CalRGB/g) || []).length + (iccRgb ? 1 : 0);
  f.push(rgb
    ? { level: "warn", title: "RGB colour found", detail: "Some elements are RGB. Printing uses CMYK (and Pantone). Convert to CMYK so bright colours don't shift when printed." }
    : { level: "pass", title: "No RGB colour", detail: "Artwork uses print colour spaces." });

  // 6. fonts
  const descriptors = (raw.match(/\/Type\s*\/FontDescriptor/g) || []).length;
  const embedded = (raw.match(/\/FontFile[23]?\s/g) || []).length;
  // Type 3 fonts carry their glyphs inside the PDF, so they count as embedded
  const type3 = (raw.match(/\/Subtype\s*\/Type3/g) || []).length;
  const text = await page.getTextContent();
  const hasText = text.items.some((i) => "str" in i && i.str.trim());
  if (descriptors > embedded + type3) f.push({ level: "fail", title: "Fonts not embedded", detail: `${descriptors - embedded - type3} font(s) are missing from the file and would print in a substitute font. Outline all text (Create Outlines) or embed fonts.` });
  else if (hasText) f.push({ level: "pass", title: "Fonts embedded", detail: "Text is live but fonts are inside the file. Outlining text before sending is still the safest option." });
  else f.push({ level: "pass", title: "Text outlined", detail: "No live text, so fonts cannot be swapped." });

  // 7. text too close to the edge
  if (hasText) {
    const [tx0, ty0, tx1, ty1] = trims[0] || [vx0, vy0, vx1, vy1];
    const safe = 3 / PT;
    const near = text.items.filter((i) => {
      if (!("transform" in i) || !i.str.trim()) return false;
      const x = i.transform[4], y = i.transform[5];
      return x - tx0 < safe || tx1 - (x + (i.width || 0)) < safe || y - ty0 < safe || ty1 - y < safe;
    }).length;
    f.push(near
      ? { level: "warn", title: `${near} text line(s) within 3 mm of the edge`, detail: "Keep text and logos at least 3 mm inside every cut and fold line so they are not cut off." }
      : { level: "pass", title: "Text inside the safe area", detail: "No text within 3 mm of the page edge." });
  }

  // 8. image resolution
  const ops = await page.getOperatorList();
  const O = pdfjs.OPS;
  let ctm: Mat = [1, 0, 0, 1, 0, 0];
  const stack: Mat[] = [];
  let low = 0, veryLow = 0, images = 0, worst = Infinity;
  for (let i = 0; i < ops.fnArray.length; i++) {
    const fn = ops.fnArray[i], a = ops.argsArray[i] as unknown[];
    if (fn === O.save) stack.push(ctm);
    else if (fn === O.restore) ctm = stack.pop() || ctm;
    else if (fn === O.transform) ctm = mul(ctm, a as Mat);
    else if (fn === O.paintFormXObjectBegin) { stack.push(ctm); if (Array.isArray(a[0]) && a[0].length === 6) ctm = mul(ctm, a[0] as Mat); }
    else if (fn === O.paintFormXObjectEnd) ctm = stack.pop() || ctm;
    else if (fn === O.paintImageXObject || fn === O.paintInlineImageXObject) {
      let wpx = typeof a[1] === "number" ? (a[1] as number) : 0;
      if (!wpx && a[0] && typeof a[0] === "object" && "width" in (a[0] as object)) wpx = (a[0] as { width: number }).width;
      const placedIn = Math.hypot(ctm[0], ctm[1]) / 72;
      if (!wpx || placedIn < 0.3) continue; // skip tiny marks
      images++;
      const ppi = wpx / placedIn;
      worst = Math.min(worst, ppi);
      if (ppi < 150) veryLow++;
      else if (ppi < 250) low++;
    }
  }
  if (!images) f.push({ level: "info", title: "No photos or bitmap images", detail: "Vector-only artwork prints sharp at any size." });
  else if (veryLow) f.push({ level: "fail", title: `${veryLow} image(s) below 150 ppi`, detail: `Lowest about ${Math.round(worst)} ppi at print size. These will look blurry or pixelated. Use images of at least 300 ppi at the final size.` });
  else if (low) f.push({ level: "warn", title: `${low} image(s) between 150 and 250 ppi`, detail: `Lowest about ${Math.round(worst)} ppi. Fine for large backgrounds, but logos and product photos should be 300 ppi.` });
  else f.push({ level: "pass", title: `${images} image(s) at print resolution`, detail: `Lowest about ${Math.round(worst)} ppi at print size.` });

  await task.destroy();
  return f;
}

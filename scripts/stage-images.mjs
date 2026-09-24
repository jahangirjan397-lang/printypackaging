import { existsSync, readFileSync, writeFileSync, mkdirSync, copyFileSync, statSync } from "node:fs";
import { basename, dirname, join, relative, resolve, sep } from "node:path";

const libraryRoot = process.argv[2] && resolve(process.argv[2]);
const siteRoot = process.cwd();
if (!libraryRoot || !existsSync(join(libraryRoot, "IMAGE-MANIFEST.csv"))) {
  console.error('Usage: npm run images:stage -- "C:\\path\\to\\Printy-Image-Library"');
  process.exit(1);
}

function parseCsv(text) {
  const rows = [];
  let row = [], field = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '"' && quoted && text[i + 1] === '"') {
      field += '"'; i++;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(field); field = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && text[i + 1] === "\n") i++;
      row.push(field); field = "";
      if (row.some(Boolean)) rows.push(row);
      row = [];
    } else {
      field += char;
    }
  }
  if (quoted) throw new Error("Unclosed quote in IMAGE-MANIFEST.csv");
  if (field || row.length) { row.push(field); rows.push(row); }
  const headers = rows.shift();
  return rows.map((values) => Object.fromEntries(headers.map((key, i) => [key, values[i] ?? ""])));
}

function dimensions(bytes) {
  if (bytes.toString("ascii", 0, 4) !== "RIFF" ||
      bytes.toString("ascii", 8, 12) !== "WEBP") return null;
  const kind = bytes.toString("ascii", 12, 16);
  if (kind === "VP8X" && bytes.length >= 30) {
    return [1 + bytes.readUIntLE(24, 3), 1 + bytes.readUIntLE(27, 3)];
  }
  if (kind === "VP8 " && bytes.length >= 30 &&
      bytes[23] === 0x9d && bytes[24] === 0x01 && bytes[25] === 0x2a) {
    return [bytes.readUInt16LE(26) & 0x3fff, bytes.readUInt16LE(28) & 0x3fff];
  }
  if (kind === "VP8L" && bytes.length >= 25 && bytes[20] === 0x2f) {
    const bits = bytes.readUInt32LE(21);
    return [1 + (bits & 0x3fff), 1 + ((bits >>> 14) & 0x3fff)];
  }
  return null;
}

const entries = parseCsv(readFileSync(join(libraryRoot, "IMAGE-MANIFEST.csv"), "utf8"));
const pending = [], skipped = [], problems = [];
for (const item of entries) {
  const destination = item.website_destination;
  if (!destination.startsWith("public/images/")) {
    skipped.push(item.filename);
    continue; // Editorial and portfolio images need page mapping before launch.
  }
  const folder = item.folder.replace(/^Printy-Image-Library\//, "");
  const source = resolve(libraryRoot, folder, item.filename);
  const target = resolve(siteRoot, destination);
  if ([relative(libraryRoot, source), relative(siteRoot, target)].some((part) => part === ".." || part.startsWith(".."+sep)) ||
      basename(target) !== item.filename) {
    problems.push(`Unsafe manifest path: ${item.filename}`);
    continue;
  }
  if (!existsSync(source)) continue;
  const found = dimensions(readFileSync(source));
  const expected = item.size_px.match(/^(\d+) x (\d+)$/);
  if (!found || !expected ||
      found[0] !== Number(expected[1]) ||
      found[1] !== Number(expected[2])) {
    problems.push(`${item.filename}: expected ${item.size_px} WebP, got ${found?.join(" x ") || "invalid image"}`);
    continue;
  }
  if (statSync(source).size > 2_000_000) {
    problems.push(`${item.filename}: exceeds 2 MB; optimize export first`);
    continue;
  }
  pending.push({ source, target, item });
}
const registryPath = resolve(siteRoot, "src/data/stagedProductImages.json");
const registry = JSON.parse(readFileSync(registryPath, "utf8"));
const requiredViews = ["hero", "front", "open", "finish", "lifestyle"];
let galleriesAdded = 0;
for (const slug of new Set(entries
  .filter((entry) => entry.notes === "No dedicated photo currently")
  .map((entry) => entry.filename.replace(/-(hero|front|open|finish|lifestyle)\.webp$/, "")))) {
  const found = requiredViews.map((view) =>
    pending.find(({item}) => item.filename === `${slug}-${view}.webp`));
  if (!registry[slug] && found.some(Boolean) && !found.every(Boolean)) {
    problems.push(`${slug}: add all five views before staging a new product gallery`);
  }
  if (found.every(Boolean)) {
    registry[slug] = found.map(({item}, index) => ({
      src: `/${item.website_destination.replace(/^public\//, "")}`,
      alt: `${item.brief.split(";")[0]} - ${requiredViews[index]} view`,
      title: `${slug.replaceAll("-", " ")} ${requiredViews[index]} view`,
    }));
    galleriesAdded++;
  }
}
if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}
if (!pending.length) {
  console.error("No finished website WebP files found in the library.");
  process.exit(1);
}
for (const {source,target} of pending) {
  mkdirSync(dirname(target), {recursive:true});
  copyFileSync(source,target);
}
if (galleriesAdded) {
  writeFileSync(registryPath, JSON.stringify(registry, null, 2) + "\n");
}
console.log(`Staged ${pending.length} validated images and mapped ${galleriesAdded} new product galleries. ${skipped.length} planned editorial/portfolio slots need page mapping.`);
console.log("Review the changed files, then run lint, build and preview QA before deploying.");

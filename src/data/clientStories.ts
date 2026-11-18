import fs from "node:fs";
import path from "node:path";

// Client stories live in content/client-stories/<slug>.json and are added from
// /admin (Decap CMS) or by Claude. A story is shown ONLY when the client gave
// written permission (consent = true) and draft is off.
// Never put prices, payment, invoice, shipping origin or the client's personal
// contact details in a story (owner 2026-11-18).

export type StoryQA = { question: string; answer: string };
export type StoryStep = { label: string; detail: string };

export type ClientStory = {
  slug: string;
  brand: string;
  // e.g. "Jen, founder" — first name and role only, never surname/email/phone
  person?: string;
  location?: string; // e.g. "Texas, USA"
  industry: string;
  headline: string;
  summary: string;
  // client's own words, approved by them
  quote?: string;
  // YouTube / YouTube Shorts link, or an uploaded .mp4 path
  videoUrl?: string;
  poster: string;
  posterAlt: string;
  gallery?: { src: string; alt: string }[];
  product: string;
  productSlug?: string;
  specs: { label: string; value: string }[];
  challenge: string;
  solution: string;
  steps: StoryStep[];
  questions: StoryQA[];
  publishedAt: string;
  consent: boolean;
  consentNote?: string; // how/when permission was given (not shown on the site)
  draft?: boolean;
  demo?: boolean;
};

const folder = path.join(process.cwd(), "content", "client-stories");

function readStories(): ClientStory[] {
  let files: string[] = [];
  try {
    files = fs.readdirSync(folder).filter((f) => f.endsWith(".json"));
  } catch {
    return [];
  }
  return files
    .map((file) => {
      try {
        const raw = JSON.parse(fs.readFileSync(path.join(folder, file), "utf8")) as Partial<ClientStory>;
        return { ...raw, slug: raw.slug || file.replace(/\.json$/, "") } as ClientStory;
      } catch {
        return null;
      }
    })
    .filter((s): s is ClientStory => Boolean(s && s.brand && s.headline && s.consent === true && !s.draft))
    .map((s) => ({
      ...s,
      specs: s.specs ?? [],
      steps: s.steps ?? [],
      questions: s.questions ?? [],
      gallery: s.gallery ?? [],
    }))
    .sort((a, b) => String(b.publishedAt).localeCompare(String(a.publishedAt)));
}

// Design preview on localhost only (`next dev`). Never part of a production
// build, so the live site never shows a made-up client.
const demoStory: ClientStory = {
  slug: "demo-story",
  demo: true,
  brand: "Demo Brand (preview only)",
  person: "Client first name, founder",
  location: "City, USA",
  industry: "Gift boxes",
  headline: "Rigid gift boxes with gold foil for a faith-based gift brand",
  summary:
    "Sample text to preview the design. A real story shows the client's own video, what we made, how it went step by step, and the questions they asked.",
  quote: "The client's own words appear here, only with their permission.",
  poster: "/images/products/rigid-boxes/rigid-boxes-hero-v3-brand.webp",
  posterAlt: "Rigid gift box preview",
  product: "Rigid Boxes",
  productSlug: "rigid-boxes",
  specs: [
    { label: "Style", value: "Rigid lid & base" },
    { label: "Finish", value: "Gold foil logo" },
    { label: "Inside", value: "Custom insert" },
    { label: "Made in", value: "About 10 days" },
  ],
  challenge: "What the client needed, in one or two sentences.",
  solution: "What we suggested and made, in two or three sentences.",
  steps: [
    { label: "Brief", detail: "Size, product and look agreed" },
    { label: "Dieline", detail: "Free dieline sent the same day" },
    { label: "Proof", detail: "PDF proof approved by the client" },
    { label: "Production", detail: "Printed, foiled and assembled" },
    { label: "Delivered", detail: "Shipped to the door with tracking" },
  ],
  questions: [
    { question: "Can the logo be in gold foil?", answer: "Yes. Foil, emboss and spot UV can all be added." },
    { question: "Do I get a proof before printing?", answer: "Yes, a free PDF proof to approve first." },
  ],
  publishedAt: "2026-11-18",
  consent: true,
};

export function getClientStories(): ClientStory[] {
  const stories = readStories();
  if (!stories.length && process.env.NODE_ENV === "development") return [demoStory];
  return stories;
}

export function getClientStory(slug: string) {
  return getClientStories().find((s) => s.slug === slug);
}

// YouTube watch / shorts / youtu.be link -> video id
export function youtubeId(url = "") {
  const m = url.match(/(?:youtube\.com\/(?:shorts\/|watch\?v=|embed\/)|youtu\.be\/)([\w-]{6,})/);
  return m ? m[1] : "";
}

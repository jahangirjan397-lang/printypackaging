import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Sends the owner a Telegram message when a real visitor has stayed on the
// site for a few seconds, or opens the live chat. Set TELEGRAM_BOT_TOKEN and
// TELEGRAM_CHAT_ID in the hosting environment; without them this does nothing.

const BOT_PATTERN =
  /bot|crawl|spider|slurp|preview|headless|lighthouse|pagespeed|facebookexternalhit|embedly|whatsapp|telegram|curl|wget|python|axios|node-fetch/i;

// Very small per-instance limit so a script cannot flood the chat
const recent = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 4;

function limited(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  if (recent.size > 500) recent.clear();
  return hits.length > MAX_PER_WINDOW;
}

function sourceOf(referrer: string) {
  if (!referrer) return "Direct / typed link";
  let host = "";
  try {
    host = new URL(referrer).hostname.replace(/^www\./, "");
  } catch {
    return "Unknown";
  }
  if (host.endsWith("printypackaging.com")) return "Inside the site";
  const known: [RegExp, string][] = [
    [/google\./, "Google"],
    [/bing\.com/, "Bing"],
    [/chatgpt\.com|openai\.com/, "ChatGPT"],
    [/perplexity\.ai/, "Perplexity"],
    [/claude\.ai/, "Claude"],
    [/gemini\.google|bard\.google/, "Gemini"],
    [/duckduckgo\.com/, "DuckDuckGo"],
    [/yahoo\./, "Yahoo"],
    [/facebook\.com|fb\.com/, "Facebook"],
    [/instagram\.com/, "Instagram"],
    [/linkedin\.com/, "LinkedIn"],
    [/pinterest\./, "Pinterest"],
  ];
  return known.find(([pattern]) => pattern.test(host))?.[1] ?? host;
}

function clean(value: unknown, max: number) {
  return String(value ?? "")
    .replace(/[\u0000-\u001f]/g, " ")
    .trim()
    .slice(0, max);
}

export async function POST(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const done = new NextResponse(null, { status: 204 });
  if (!token || !chatId) return done;

  const origin = request.headers.get("origin") ?? "";
  if (!/^https:\/\/(www\.)?printypackaging\.com$/.test(origin)) return done;

  const ua = request.headers.get("user-agent") ?? "";
  if (!ua || BOT_PATTERN.test(ua) || !request.headers.get("accept-language")) return done;

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (limited(ip)) return done;

  let body: { type?: string; path?: string; referrer?: string } = {};
  try {
    body = JSON.parse(await request.text());
  } catch {
    return done;
  }

  const path = clean(body.path, 120) || "/";
  if (!path.startsWith("/")) return done;
  const chat = body.type === "chat";

  const decode = (v: string | null) => {
    try {
      return decodeURIComponent(v ?? "");
    } catch {
      return v ?? "";
    }
  };
  const city = decode(request.headers.get("x-vercel-ip-city"));
  const country = request.headers.get("x-vercel-ip-country") ?? "";
  const place = [city, country].filter(Boolean).join(", ") || "Unknown location";
  const device = /mobile|android|iphone/i.test(ua) ? "Mobile" : /ipad|tablet/i.test(ua) ? "Tablet" : "Desktop";

  const text = [
    chat ? "💬 A visitor opened the chat" : "👀 Visitor on the website",
    `🌍 ${place}`,
    `📄 printypackaging.com${path}`,
    `↪️ From: ${sourceOf(clean(body.referrer, 300))}`,
    `📱 ${device}`,
  ].join("\n");

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
      signal: AbortSignal.timeout(8_000),
    });
  } catch {
    // An alert that fails to send must never affect the visitor
  }
  return done;
}

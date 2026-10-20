import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

// A visitor rates the dieline they made. The review goes to the owner by
// email and Telegram; nothing is published until the owner approves it and it
// is added to content/reviews.json. Only real reviews are ever shown.

const recent = new Map<string, number[]>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 3;

function limited(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  if (recent.size > 500) recent.clear();
  return hits.length > MAX_PER_WINDOW;
}

function clean(value: unknown, max: number) {
  return String(value ?? "")
    .replace(/[\u0000-\u001f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

const fail = (message: string, status = 400) => NextResponse.json({ success: false, message }, { status });

export async function POST(request: Request) {
  const origin = request.headers.get("origin") ?? "";
  if (!/^https:\/\/(www\.)?printypackaging\.com$|^http:\/\/localhost(:\d+)?$/.test(origin)) return fail("Not allowed", 403);

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (limited(ip)) return fail("Too many reviews, please try again later.", 429);

  let body: Record<string, unknown> = {};
  try {
    body = JSON.parse(await request.text());
  } catch {
    return fail("Bad request");
  }
  // honeypot: real visitors never fill this hidden field
  if (clean(body.website, 50)) return NextResponse.json({ success: true });

  const rating = Math.round(Number(body.rating));
  if (!(rating >= 1 && rating <= 5)) return fail("Please choose 1 to 5 stars.");
  const review = {
    rating,
    comment: clean(body.comment, 600),
    name: clean(body.name, 60),
    country: clean(body.country, 60) || clean(request.headers.get("x-vercel-ip-country"), 10),
    style: clean(body.style, 80),
    size: clean(body.size, 60),
    consent: body.consent === true,
    date: new Date().toISOString().slice(0, 10),
  };

  const stars = "★".repeat(rating) + "☆".repeat(5 - rating);
  const line = JSON.stringify({ name: review.name || "Anonymous", country: review.country, rating, comment: review.comment, style: review.style, date: review.date });
  const text = [
    `⭐ New dieline review: ${stars}`,
    review.comment ? `"${review.comment}"` : "(no comment)",
    `${review.name || "Anonymous"}${review.country ? ", " + review.country : ""}`,
    `${review.style} ${review.size}`.trim(),
    review.consent ? "✅ OK to show on the website" : "🚫 Did NOT allow showing it on the website",
  ].join("\n");

  const results: string[] = [];

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (token && chatId) {
    try {
      const r = await fetch(`https://api.telegram.org/bot${token.trim()}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId.trim(), text, disable_web_page_preview: true }),
        signal: AbortSignal.timeout(8_000),
      });
      results.push(r.ok ? "telegram" : `telegram-${r.status}`);
    } catch {
      results.push("telegram-failed");
    }
  }

  const { SMTP_HOST, SMTP_USER, SMTP_PASS, QUOTE_RECEIVER_EMAIL } = process.env;
  const from = process.env.QUOTE_FROM_EMAIL || SMTP_USER;
  if (SMTP_HOST && SMTP_USER && SMTP_PASS && QUOTE_RECEIVER_EMAIL && from) {
    try {
      const port = Number(process.env.SMTP_PORT || 465);
      await nodemailer
        .createTransport({
          host: SMTP_HOST,
          port: Number.isFinite(port) ? port : 465,
          secure: process.env.SMTP_SECURE === "true",
          auth: { user: SMTP_USER, pass: SMTP_PASS },
          connectionTimeout: 10_000,
          socketTimeout: 20_000,
        })
        .sendMail({
          from,
          to: QUOTE_RECEIVER_EMAIL,
          subject: `[Printy] New dieline review ${stars} ${review.name || "Anonymous"}`,
          text: `${text}\n\nTo publish (only if OK to show): add this line to content/reviews.json\n${line}`,
          html:
            `<p style="font-size:18px">${stars}</p><p>${escapeHtml(review.comment || "(no comment)")}</p>` +
            `<p>${escapeHtml(review.name || "Anonymous")}${review.country ? ", " + escapeHtml(review.country) : ""}<br>${escapeHtml(review.style)} ${escapeHtml(review.size)}<br>${review.date}</p>` +
            `<p><b>${review.consent ? "OK to show on the website" : "Did NOT allow showing it on the website"}</b></p>` +
            `<p style="color:#64748b;font-size:12px">To publish, add to content/reviews.json:<br><code>${escapeHtml(line)}</code></p>`,
        });
      results.push("email");
    } catch (error) {
      console.error(`[review] email failed: ${error instanceof Error ? error.message : "unknown"}`);
      results.push("email-failed");
    }
  }

  console.log(`[review] ${rating} stars, ${results.join(", ") || "no channel configured"}`);
  return NextResponse.json({ success: true });
}

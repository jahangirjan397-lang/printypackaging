export const runtime = "nodejs";

// A 1x1 image inside the follow-up emails (Apps Script, FollowUp.gs). When a
// client opens the email the image loads and the owner gets a Telegram
// message. Only the lead ID, product and email type travel in the link, never
// the client's name or email. Uses the same TELEGRAM_BOT_TOKEN / _CHAT_ID as
// the visitor alerts.

const GIF = Buffer.from("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", "base64");

const KINDS: Record<string, string> = {
  confirm: "first reply",
  quote: "quote",
  follow: "follow-up",
  pay: "payment link",
};

// One alert per lead and email type per hour (per server instance)
const seen = new Map<string, number>();
const HOUR = 60 * 60 * 1000;

function pixel(state: string) {
  return new Response(GIF, {
    headers: {
      "Content-Type": "image/gif",
      "Cache-Control": "no-store, no-cache, must-revalidate, private",
      "x-alert": state,
    },
  });
}

export async function GET(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return pixel("off");

  const params = new URL(request.url).searchParams;
  const lead = params.get("l") ?? "";
  const kind = params.get("k") ?? "";
  if (!/^PP-\d{8}-[A-F0-9]{8}$/.test(lead) || !KINDS[kind]) return pixel("bad");

  // Mail scanners (mostly Outlook / Hotmail) fetch images the moment the
  // email arrives; a real open comes later, so the first minute is ignored
  const sentAt = Number(params.get("t"));
  if (sentAt && Date.now() - sentAt < 60_000) return pixel("too-soon");

  // Gmail shows images through its proxy, also when the owner looks at the
  // email in his own Sent folder. If the client is not on Gmail, a Gmail
  // proxy fetch can only be the owner, so it is ignored.
  const ua = request.headers.get("user-agent") ?? "";
  if (params.get("g") !== "1" && /GoogleImageProxy/i.test(ua)) return pixel("owner");

  const key = `${lead}:${kind}`;
  const now = Date.now();
  if (now - (seen.get(key) ?? 0) < HOUR) return pixel("repeat");
  seen.set(key, now);
  if (seen.size > 1000) seen.clear();

  const product = String(params.get("p") ?? "").replace(/[^\w &-]/g, "").slice(0, 40);
  const country = request.headers.get("x-vercel-ip-country") ?? "";
  const device = /mobile|android|iphone/i.test(ua) ? "Mobile" : "Desktop / webmail";

  const text = [
    `👁 Client opened your ${KINDS[kind]} email`,
    `🧾 ${lead}${product ? ` · ${product}` : ""}`,
    `📱 ${device}${country ? ` · ${country}` : ""}`,
    kind === "quote" ? "Good moment for a friendly follow-up if they don't reply soon." : "",
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const response = await fetch(`https://api.telegram.org/bot${token.trim()}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId.trim(), text, disable_web_page_preview: true }),
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) {
      console.error(`[email-open] Telegram ${response.status}`);
      return pixel(`telegram-${response.status}`);
    }
    return pixel("sent");
  } catch (error) {
    console.error(`[email-open] Telegram request failed: ${error instanceof Error ? error.message : "unknown"}`);
    return pixel("telegram-unreachable");
  }
}

import assert from "node:assert/strict";

if (process.env.SMTP_HOST || process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
  throw new Error("Quote smoke check requires a server without delivery credentials.");
}

const base = process.argv[2] || "http://127.0.0.1:3000";
const endpoint = new URL("/api/quote", base);

async function expectResponse(label, init, expectedStatus) {
  const response = await fetch(endpoint, { ...init, signal: AbortSignal.timeout(15_000) });
  const data = await response.json();
  assert.equal(response.status, expectedStatus, `${label}: ${JSON.stringify(data)}`);
  assert.equal(data.success, false, `${label} must not report a saved lead`);
  assert.equal(data.quoteId, undefined, `${label} must not issue a quote ID`);
  console.log(`[OK] ${label}: HTTP ${expectedStatus}`);
}

const health = await fetch(endpoint, { signal: AbortSignal.timeout(15_000) });
assert.equal(health.status, 200);
console.log("[OK] Quote API reachable");

await expectResponse("Foreign origin rejected", {
  method: "POST",
  headers: { "content-type": "application/json", origin: "https://example.invalid" },
  body: JSON.stringify({ name: "Test Buyer", email: "buyer@example.com" }),
}, 403);

await expectResponse("Invalid email rejected", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ name: "Test Buyer", email: "invalid" }),
}, 400);

const unsupported = new FormData();
unsupported.set("name", "Test Buyer");
unsupported.set("email", "buyer@example.com");
unsupported.append("artworkFiles", new Blob(["test"]), "sample.exe");
await expectResponse("Unsupported artwork rejected", {
  method: "POST",
  body: unsupported,
}, 400);

const artwork = new FormData();
artwork.set("name", "Test Buyer");
artwork.set("email", "buyer@example.com");
artwork.append("artworkFiles", new Blob(["%PDF-1.4"]), "sample.pdf");
await expectResponse("Unavailable artwork delivery rejected before CRM save", {
  method: "POST",
  body: artwork,
}, 503);

console.log("Quote validation smoke checks passed without sending any lead.");

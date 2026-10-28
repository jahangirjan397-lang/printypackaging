import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Confirms a paid rigid dieline (Stripe Payment Link -> back to the generator with
// ?session_id=...). Returns the style and size the buyer paid for, taken from the
// client_reference_id the generator put on the payment link.
export async function GET(request: Request) {
  const session = new URL(request.url).searchParams.get("session_id") || "";
  const key = process.env.STRIPE_SECRET_KEY;
  if (!/^cs_(live|test)_[A-Za-z0-9]+$/.test(session)) {
    return NextResponse.json({ ok: false, message: "Invalid payment reference." }, { status: 400 });
  }
  if (!key) {
    return NextResponse.json({ ok: false, message: "Payments are not set up yet. Email sales@printypackaging.com and we will send your file." }, { status: 503 });
  }
  try {
    const res = await fetch(`https://api.stripe.com/v1/checkout/sessions/${session}`, {
      headers: { Authorization: `Bearer ${key}` },
      signal: AbortSignal.timeout(10_000),
    });
    const data = (await res.json()) as { payment_status?: string; client_reference_id?: string | null };
    const ref = data.client_reference_id || "";
    if (!res.ok || data.payment_status !== "paid" || !/^rigid-[a-z-]+_\d+x\d+x\d+$/.test(ref)) {
      return NextResponse.json({ ok: false, message: "We could not confirm this payment. Email sales@printypackaging.com and we will send your file." }, { status: 402 });
    }
    return NextResponse.json({ ok: true, ref });
  } catch {
    return NextResponse.json({ ok: false, message: "Payment check failed. Please refresh the page in a minute." }, { status: 502 });
  }
}

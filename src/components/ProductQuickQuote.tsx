"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { sendGAEvent } from "@next/third-parties/google";
import { isLiveHostname, readAnalyticsConsent } from "@/lib/analyticsConsent";
import { readLeadSource } from "@/lib/leadSource";

const quantities = ["100", "250", "500", "1,000", "2,500", "5,000", "10,000+"];
const countries = ["USA", "UK", "Canada", "Europe", "UAE", "Australia", "Other"];

// Short quote form on product pages: the product is already known, so the
// buyer only adds contact details, quantity and size. Posts to the same
// /api/quote endpoint as the full form on the home page.
export default function ProductQuickQuote({
  productName,
  productSlug,
}: {
  productName: string;
  productSlug: string;
}) {
  const router = useRouter();
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [size, setSize] = useState({ length: "", width: "", height: "", unit: "in" });

  const sizeValue = [size.length, size.width, size.height].some(Boolean)
    ? `${size.length || "?"} x ${size.width || "?"} x ${size.height || "?"} ${size.unit}`
    : "";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    formData.set("leadSource", readLeadSource());
    setIsSending(true);

    try {
      const response = await fetch("/api/quote", { method: "POST", body: formData });
      let result: { success?: boolean; message?: string; quoteId?: string } = {};

      try {
        result = JSON.parse(await response.text());
      } catch {
        throw new Error(
          "We could not send your request right now. Please try again or contact us on WhatsApp.",
        );
      }

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Quote request failed.");
      }

      if (isLiveHostname(window.location.hostname) && readAnalyticsConsent() === "granted") {
        sendGAEvent("event", "generate_lead", {
          form_name: "product_quick_quote",
          product: productSlug,
          quote_id: result.quoteId || "not_available",
        });
      }

      router.push("/thank-you");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSending(false);
    }
  }

  return (
    <form
      id="product-quote"
      onSubmit={handleSubmit}
      className="relative scroll-mt-28 rounded-[1.5rem] border-t-4 border-[#FF6A00] bg-white p-5 text-[#07111F] shadow-xl md:p-6"
    >
      <div aria-hidden="true" className="pointer-events-none absolute left-[-10000px] h-px w-px overflow-hidden">
        <input name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
      <input type="hidden" name="product" value={productName} />
      <input type="hidden" name="size" value={sizeValue} />

      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-xl font-black md:text-2xl">Get your {productName.toLowerCase()} price</h2>
          <p className="mt-1 text-sm font-bold text-slate-600">
            Free quote · No commitment · Reply within 1 hour
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2.5 lg:grid-cols-3">
        <label className="block">
          <span className="mb-1 block text-xs font-black">Name *</span>
          <input name="name" required autoComplete="name" placeholder="Your name" className="field-input field-compact" />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-black">Email *</span>
          <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" className="field-input field-compact" />
        </label>
        <label className="col-span-2 block lg:col-span-1">
          <span className="mb-1 block text-xs font-black">
            WhatsApp / Phone <span className="font-bold text-slate-400">(optional)</span>
          </span>
          <input name="whatsapp" type="tel" autoComplete="tel" placeholder="+1 555 000 0000" className="field-input field-compact" />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-black">Quantity</span>
          <select name="quantity" defaultValue="1,000" className="field-input field-compact">
            {quantities.map((quantity) => (
              <option key={quantity} value={quantity}>
                {quantity} pcs
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-black">Country</span>
          <select name="country" className="field-input field-compact">
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </label>
        <fieldset className="col-span-2 lg:col-span-1">
          <legend className="mb-1 text-xs font-black">
            Size <span className="font-bold text-slate-400">(L × W × H, optional)</span>
          </legend>
          <div className="grid grid-cols-[1fr_1fr_1fr_3.6rem] gap-1.5">
            {(["length", "width", "height"] as const).map((side) => (
              <input
                key={side}
                inputMode="decimal"
                aria-label={side}
                placeholder={side[0].toUpperCase()}
                value={size[side]}
                onChange={(event) => setSize((current) => ({ ...current, [side]: event.target.value }))}
                className="field-input field-compact text-center"
              />
            ))}
            <select
              aria-label="Size unit"
              value={size.unit}
              onChange={(event) => setSize((current) => ({ ...current, unit: event.target.value }))}
              className="field-input field-compact px-1"
            >
              <option value="in">in</option>
              <option value="cm">cm</option>
              <option value="mm">mm</option>
            </select>
          </div>
        </fieldset>
      </div>

      {errorMessage && (
        <p role="alert" className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-sm font-bold text-red-700">
          {errorMessage}
        </p>
      )}

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={isSending}
          className="rounded-full bg-[#FF6A00] px-7 py-3.5 font-black text-white shadow-lg shadow-orange-500/25 transition hover:-translate-y-0.5 hover:bg-[#007C91] disabled:cursor-wait disabled:opacity-70"
        >
          {isSending ? "Sending…" : "Get My Free Quote →"}
        </button>
        <Link
          href={`/?product=${productSlug}#quote`}
          prefetch={false}
          className="text-sm font-black text-[#007C91] hover:text-[#FF6A00]"
        >
          Have artwork or more details? Use the full form
        </Link>
      </div>
    </form>
  );
}

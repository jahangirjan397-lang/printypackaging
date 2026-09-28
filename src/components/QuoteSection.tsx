"use client";

import type { FormEvent, ReactNode } from "react";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { sendGAEvent } from "@next/third-parties/google";
import { products } from "../data/products";
import {
  isLiveHostname,
  readAnalyticsConsent,
} from "@/lib/analyticsConsent";
import { readLeadSource } from "@/lib/leadSource";
import { businessPromises } from "@/data/businessInfo";
import HandNote from "@/components/HandNote";
const quoteBenefits = [
  "Custom box style suggestion",
  "Material and GSM guidance",
  "Printing and finishing options",
  "International buyer support",
];

const countries = [
  "USA",
  "UK",
  "Canada",
  "Europe",
  "UAE",
  "Australia",
  "Pakistan",
  "Other",
];

const finishingOptions = [
  "Need suggestion",
  "Matte Lamination",
  "Gloss Lamination",
  "Soft Touch Lamination",
  "Anti Scratch Matte Lamination",
  "Spot UV",
  "Raised UV",
  "Gold Foiling",
  "Silver Foiling",
  "Rose Gold Foiling",
  "Holographic Foiling",
  "Embossing",
  "Debossing",
  "Die Cutting",
  "Window Patching",
  "Aqueous Coating",
  "Drip Off / Varnish",
  "UV Varnish",
  "Multiple Finishes",
];

const artworkOptions = [
  "Artwork ready",
  "Need design support",
  "Need dieline/template",
  "Will send artwork later",
];

const printingOptions = [
  "Need suggestion",
  "No printing / plain packaging",
  "1 Color Printing",
  "2 Color Printing",
  "CMYK Full Color Printing",
  "CMYK + Pantone",
  "Inside + Outside Printing",
];

const materialLibrary = {
  general: [
    "Need suggestion",

    "SBS / Bleach Card 250 GSM",
    "SBS / Bleach Card 300 GSM",
    "SBS / Bleach Card 350 GSM",
    "SBS / Bleach Card 400 GSM",
    "SBS / Bleach Card 450 GSM",

    "Art Card 210 GSM",
    "Art Card 230 GSM",
    "Art Card 250 GSM",
    "Art Card 260 GSM",
    "Art Card 300 GSM",
    "Art Card 350 GSM",
    "Art Card 400 GSM",
    "Art Card 450 GSM",

    "Art Paper 80 GSM",
    "Art Paper 100 GSM",
    "Art Paper 115 GSM",
    "Art Paper 128 GSM",
    "Art Paper 150 GSM",
    "Art Paper 157 GSM",
    "Art Paper 170 GSM",
    "Art Paper 200 GSM",

    "Duplex Board 250 GSM",
    "Duplex Board 300 GSM",
    "Duplex Board 350 GSM",
    "Duplex Board 400 GSM",
    "Duplex Board 450 GSM",
    "Duplex Board 500 GSM",

    "Kraft Card 200 GSM",
    "Kraft Card 250 GSM",
    "Kraft Card 300 GSM",
    "Kraft Card 350 GSM",
    "Kraft Card 400 GSM",
    "Kraft Card 450 GSM",

    "Food Grade Card 250 GSM",
    "Food Grade Card 300 GSM",
    "Food Grade Card 350 GSM",
    "Food Grade Card 400 GSM",

    "Sticker Stock Paper",
    "Gloss Sticker Stock",
    "Matte Sticker Stock",
    "Semi Gloss Sticker Stock",
    "Vinyl Sticker Stock",
    "Transparent Sticker Stock",

    "Rigid Board / Grey Board",
    "Corrugated Board",
  ],

  rigid: [
    "Need suggestion",

    "Rigid Board 800 GSM",
    "Rigid Board 1000 GSM",
    "Rigid Board 1200 GSM",
    "Rigid Board 1500 GSM",
    "Rigid Board 1800 GSM",
    "Rigid Board 2000 GSM",

    "Grey Board 1.2mm",
    "Grey Board 1.5mm",
    "Grey Board 2mm",
    "Grey Board 2.5mm",
    "Grey Board 3mm",

    "Chipboard 1.5mm",
    "Chipboard 2mm",
    "Chipboard 2.5mm",
    "Chipboard 3mm",

    "Art Paper Wrap 128 GSM",
    "Art Paper Wrap 157 GSM",
    "Art Paper Wrap 170 GSM",
    "Special Texture Paper Wrap",
    "Kraft Paper Wrap",
    "Black Paper Wrap",
  ],

  folding: [
    "Need suggestion",

    "SBS / Bleach Card 250 GSM",
    "SBS / Bleach Card 300 GSM",
    "SBS / Bleach Card 350 GSM",
    "SBS / Bleach Card 400 GSM",
    "SBS / Bleach Card 450 GSM",

    "Art Card 210 GSM",
    "Art Card 230 GSM",
    "Art Card 250 GSM",
    "Art Card 260 GSM",
    "Art Card 300 GSM",
    "Art Card 350 GSM",
    "Art Card 400 GSM",
    "Art Card 450 GSM",

    "Duplex Board 300 GSM",
    "Duplex Board 350 GSM",
    "Duplex Board 400 GSM",
    "Duplex Board 450 GSM",
    "Duplex Board 500 GSM",

    "Kraft Card 250 GSM",
    "Kraft Card 300 GSM",
    "Kraft Card 350 GSM",
    "Kraft Card 400 GSM",
    "Kraft Card 450 GSM",
  ],

  corrugated: [
    "Need suggestion",

    "E-Flute Corrugated Board",
    "B-Flute Corrugated Board",
    "C-Flute Corrugated Board",
    "Micro Flute Board",
    "Kraft E-Flute Board",
    "White Back E-Flute Board",
    "Black E-Flute Board",

    "3 Ply Corrugated Board",
    "5 Ply Corrugated Board",
    "7 Ply Corrugated Board",

    "Mailer Box E-Flute Board",
    "Mailer Box B-Flute Board",
    "Shipping Box 3 Ply Board",
    "Shipping Box 5 Ply Board",
    "Display Box Corrugated Board",
  ],

  food: [
    "Need suggestion",

    "Food Grade SBS 250 GSM",
    "Food Grade SBS 300 GSM",
    "Food Grade SBS 350 GSM",
    "Food Grade SBS 400 GSM",

    "Food Grade Kraft 200 GSM",
    "Food Grade Kraft 250 GSM",
    "Food Grade Kraft 300 GSM",
    "Food Grade Kraft 350 GSM",

    "PE Coated Paper",
    "Cup Stock Paper",

    "Greaseproof Paper 40 GSM",
    "Greaseproof Paper 45 GSM",
    "Greaseproof Paper 50 GSM",
    "Greaseproof Paper 60 GSM",
    "Greaseproof Paper 70 GSM",

    "Butter Paper 30 GSM",
    "Butter Paper 40 GSM",
    "Butter Paper 45 GSM",
    "Butter Paper 50 GSM",
    "Butter Paper 60 GSM",
    "Butter Paper 70 GSM",
    "Butter Paper 80 GSM",

    "Glassine Paper",
    "Bakery Box Card",
  ],

  sticker: [
    "Need suggestion",

    "Sticker Stock Paper",
    "Gloss Sticker Paper",
    "Matte Sticker Paper",
    "Semi Gloss Sticker Paper",
    "Kraft Sticker Paper",
    "Vinyl Sticker",
    "Transparent Sticker",
    "Waterproof Label Stock",
    "Gold Foil Sticker",
    "Silver Foil Sticker",
    "Removable Sticker Stock",
    "Permanent Adhesive Sticker Stock",
  ],

  paper: [
    "Need suggestion",

    "Art Paper 80 GSM",
    "Art Paper 100 GSM",
    "Art Paper 115 GSM",
    "Art Paper 128 GSM",
    "Art Paper 150 GSM",
    "Art Paper 157 GSM",
    "Art Paper 170 GSM",
    "Art Paper 200 GSM",

    "Kraft Paper 80 GSM",
    "Kraft Paper 100 GSM",
    "Kraft Paper 120 GSM",
    "Kraft Paper 150 GSM",
    "Kraft Paper 170 GSM",
    "Kraft Paper 200 GSM",

    "Butter Paper 30 GSM",
    "Butter Paper 40 GSM",
    "Butter Paper 45 GSM",
    "Butter Paper 50 GSM",
    "Butter Paper 60 GSM",
    "Butter Paper 70 GSM",
    "Butter Paper 80 GSM",

    "Greaseproof Paper",
    "Glassine Paper",
    "Wrapping Paper",
    "Tissue Paper",
  ],
};

type MaterialType = keyof typeof materialLibrary;

const gsmOptions = [
  "Need suggestion",

  "30 GSM",
  "40 GSM",
  "45 GSM",
  "50 GSM",
  "60 GSM",
  "70 GSM",
  "80 GSM",
  "90 GSM",
  "100 GSM",
  "115 GSM",
  "120 GSM",
  "128 GSM",
  "150 GSM",
  "157 GSM",
  "170 GSM",
  "180 GSM",
  "200 GSM",

  "210 GSM",
  "230 GSM",
  "250 GSM",
  "260 GSM",
  "300 GSM",
  "350 GSM",
  "400 GSM",
  "450 GSM",
  "500 GSM",

  "700 GSM rigid",
  "800 GSM rigid",
  "1000 GSM rigid",
  "1200 GSM rigid",
  "1500 GSM rigid",
  "1800 GSM rigid",
  "2000 GSM rigid",

  "1.2mm board",
  "1.5mm board",
  "2mm board",
  "2.5mm board",
  "3mm board",

  "E-Flute",
  "B-Flute",
  "C-Flute",
  "Micro Flute",
  "3 Ply",
  "5 Ply",
  "7 Ply",
];

function getMaterialType(productName: string): MaterialType {
  const name = productName.toLowerCase();

  if (
    name.includes("rigid") ||
    name.includes("drawer") ||
    name.includes("magnetic") ||
    name.includes("luxury") ||
    name.includes("gift")
  ) {
    return "rigid";
  }

  if (
    name.includes("mailer") ||
    name.includes("shipping") ||
    name.includes("corrugated") ||
    name.includes("e-flute") ||
    name.includes("flute")
  ) {
    return "corrugated";
  }

  if (
    name.includes("food") ||
    name.includes("bakery") ||
    name.includes("butter") ||
    name.includes("paper cup") ||
    name.includes("takeaway") ||
    name.includes("restaurant")
  ) {
    return "food";
  }

  if (
    name.includes("sticker") ||
    name.includes("label") ||
    name.includes("vinyl")
  ) {
    return "sticker";
  }

  if (
    name.includes("paper") ||
    name.includes("bag") ||
    name.includes("wrap") ||
    name.includes("tissue")
  ) {
    return "paper";
  }

  if (
    name.includes("folding") ||
    name.includes("carton") ||
    name.includes("cosmetic") ||
    name.includes("display") ||
    name.includes("retail")
  ) {
    return "folding";
  }

  return "general";
}

function uniqueValues(values: readonly string[]) {
  return Array.from(new Set(values));
}

export default function QuoteSection() {
  const router = useRouter();

  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [size, setSize] = useState({ length: "", width: "", height: "", unit: "in" });
  const sizeValue = [size.length, size.width, size.height].some(Boolean)
    ? `${size.length || "?"} x ${size.width || "?"} x ${size.height || "?"} ${size.unit}`
    : "";
  const [selectedProduct, setSelectedProduct] = useState(
    products[0]?.name || ""
  );

  const materialOptions = useMemo(() => {
    const materialType = getMaterialType(selectedProduct);

    return uniqueValues([
      ...materialLibrary[materialType],
      ...materialLibrary.general,
    ]);
  }, [selectedProduct]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  setErrorMessage("");

  const formData = new FormData(event.currentTarget);
  formData.set("leadSource", readLeadSource());
  const artworkFiles = formData
    .getAll("artworkFiles")
    .filter(
      (entry): entry is File =>
        typeof entry !== "string" && entry.size > 0,
    );

  if (artworkFiles.length > 5) {
    setErrorMessage("Please upload a maximum of 5 artwork or reference files.");
    return;
  }

  const oversizedFile = artworkFiles.find(
    (file) => file.size > 4_000_000,
  );

  if (oversizedFile) {
    setErrorMessage(
      `"${oversizedFile.name}" is larger than 4 MB. Please choose a smaller file.`,
    );
    return;
  }

  const totalUploadSize = artworkFiles.reduce(
    (total, file) => total + file.size,
    0,
  );

  if (totalUploadSize > 4_000_000) {
    setErrorMessage(
      "Your artwork files are larger than 4 MB in total. Please reduce the file size or upload fewer files.",
    );
    return;
  }

  setIsSending(true);

  try {
    const response = await fetch("/api/quote", {
      method: "POST",
      body: formData,
    });

    const responseText = await response.text();

    let result: {
      success?: boolean;
      message?: string;
      quoteId?: string;
    } = {};

    try {
      result = JSON.parse(responseText);
    } catch {
      throw new Error(
        "We could not process your quote request right now. Please try again or contact us through WhatsApp.",
      );
    }

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Quote request failed.");
    }

    if (
      isLiveHostname(window.location.hostname) &&
      readAnalyticsConsent() === "granted"
    ) {
      sendGAEvent("event", "generate_lead", {
        form_name: "custom_packaging_quote",
        quote_id: result.quoteId || "not_available",
      });
    }

    router.push("/thank-you");
  } catch (error) {
    setErrorMessage(
      error instanceof Error
        ? error.message
        : "Something went wrong. Please try again.",
    );
  } finally {
    setIsSending(false);
  }
}

  return (
    <section className="bg-[#F7FAFC] px-5 py-14 md:px-8 md:py-16">
      <Suspense fallback={null}>
        <ProductFromUrl onProductMatch={setSelectedProduct} />
      </Suspense>

      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-12">
          <div className="lg:sticky lg:top-28">
            <p className="text-sm font-black uppercase tracking-[0.32em] text-[#FF6A00]">
              Request Custom Quote
            </p>

            <h2 className="mt-3 text-3xl font-black leading-tight text-[#07111F] sm:text-4xl">
              Get your custom packaging price, fast
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Tell us what you need. We reply with pricing, the right material
              and a free dieline. No design skills needed.
            </p>

            <ul className="mt-6 space-y-2.5">
              {quoteBenefits.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm font-bold text-[#07111F]"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#00C2E8] text-xs font-black text-[#07111F]">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl bg-[#07111F] p-4 text-white">
              <p className="text-sm font-bold text-slate-300">Prefer to chat?</p>
              <a
                href="https://wa.me/923338889954?text=Hello%20Printy%20Packaging%2C%20I%20need%20a%20custom%20packaging%20quote."
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[#25D366] px-4 py-2 text-sm font-black text-[#07111F] transition hover:bg-[#1ebe5b]"
              >
                WhatsApp
              </a>
              <a
                href="mailto:sales@printypackaging.com"
                className="text-sm font-black text-[#00C2E8] hover:underline"
              >
                sales@printypackaging.com
              </a>
            </div>

            <div className="mt-8 hidden justify-end lg:flex">
              <HandNote>{`Free quote ${businessPromises.quoteResponse.replace(" (business hours)", "")}`}</HandNote>
            </div>
          </div>

          <form
            id="quote"
            onSubmit={handleSubmit}
            className="relative scroll-mt-28 rounded-[1.75rem] border-t-4 border-[#FF6A00] bg-white p-5 shadow-xl md:p-7"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-[-10000px] top-auto h-px w-px overflow-hidden"
            >
              <input
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                defaultValue=""
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <FormField label="Name *">
                <input
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Your name"
                  className="field-input field-compact"
                />
              </FormField>

              <FormField label="Email *">
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@brand.com"
                  className="field-input field-compact"
                />
              </FormField>

              <FormField label="WhatsApp / Phone">
                <input
                  name="whatsapp"
                  autoComplete="tel"
                  placeholder="+1 000 000 0000"
                  className="field-input field-compact"
                />
              </FormField>

              <FormField label="Product">
                <select
                  name="product"
                  value={selectedProduct}
                  onChange={(event) => setSelectedProduct(event.target.value)}
                  className="field-input field-compact"
                >
                  {products.map((product) => (
                    <option key={product.slug} value={product.name}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label="Quantity">
                <input
                  name="quantity"
                  inputMode="numeric"
                  placeholder="e.g. 1000"
                  className="field-input field-compact"
                />
              </FormField>

              <FormField label="Country">
                <select name="country" className="field-input field-compact">
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </FormField>
            </div>

            <fieldset className="mt-3">
              <legend className="mb-1.5 text-sm font-black text-[#07111F]">
                Size <span className="font-bold text-slate-400">(optional)</span>
              </legend>
              <input type="hidden" name="size" value={sizeValue} />
              <div className="grid grid-cols-[1fr_1fr_1fr_5.5rem] gap-2">
                {(["length", "width", "height"] as const).map((side) => (
                  <input
                    key={side}
                    inputMode="decimal"
                    aria-label={`Box ${side}`}
                    placeholder={side[0].toUpperCase() + side.slice(1)}
                    value={size[side]}
                    onChange={(event) =>
                      setSize((current) => ({ ...current, [side]: event.target.value }))
                    }
                    className="field-input field-compact"
                  />
                ))}
                <select
                  aria-label="Size unit"
                  value={size.unit}
                  onChange={(event) =>
                    setSize((current) => ({ ...current, unit: event.target.value }))
                  }
                  className="field-input field-compact"
                >
                  <option value="in">in</option>
                  <option value="cm">cm</option>
                  <option value="mm">mm</option>
                </select>
              </div>
            </fieldset>

            <div className="mt-3">
              <FormField label="Anything else?">
                <textarea
                  name="message"
                  rows={2}
                  placeholder="Box style, deadline or anything we should know (optional)"
                  className="field-input field-compact resize-none"
                />
              </FormField>
            </div>

            {/* Optional specs stay in the form (and are submitted) even while collapsed */}
            <details className="group mt-4 rounded-2xl border border-slate-200 bg-slate-50/70">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3">
                <span className="text-sm font-black text-[#07111F]">
                  Add artwork, material &amp; printing{" "}
                  <span className="font-bold text-slate-400">(optional)</span>
                </span>
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-lg font-black text-[#FF6A00] shadow-sm transition group-open:rotate-45"
                >
                  +
                </span>
              </summary>

              <div className="border-t border-slate-200 px-4 pb-4 pt-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <FormField label="Artwork">
                    <select name="artworkStatus" className="field-input field-compact">
                      {artworkOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </FormField>

                  <FormField label="Material">
                    <select name="material" className="field-input field-compact">
                      {materialOptions.map((material) => (
                        <option key={material} value={material}>
                          {material}
                        </option>
                      ))}
                    </select>
                  </FormField>

                  <FormField label="GSM / Thickness">
                    <select name="gsm" className="field-input field-compact">
                      {gsmOptions.map((gsm) => (
                        <option key={gsm} value={gsm}>
                          {gsm}
                        </option>
                      ))}
                    </select>
                  </FormField>

                  <FormField label="Printing">
                    <select name="printing" className="field-input field-compact">
                      {printingOptions.map((printing) => (
                        <option key={printing} value={printing}>
                          {printing}
                        </option>
                      ))}
                    </select>
                  </FormField>

                  <FormField label="Finishing">
                    <select name="finishing" className="field-input field-compact">
                      {finishingOptions.map((finish) => (
                        <option key={finish} value={finish}>
                          {finish}
                        </option>
                      ))}
                    </select>
                  </FormField>

                  <label className="block">
                    <span className="mb-1.5 block text-sm font-black text-[#07111F]">
                      Files
                    </span>
                    <input
                      name="artworkFiles"
                      type="file"
                      multiple
                      accept=".pdf,.ai,.eps,.psd,.svg,.png,.jpg,.jpeg,.webp,.tif,.tiff,.cdr"
                      className="block w-full rounded-xl border border-dashed border-[#00C2E8]/60 bg-white px-3 py-2 text-xs text-slate-700 file:mr-3 file:rounded-full file:border-0 file:bg-[#07111F] file:px-3 file:py-1.5 file:font-black file:text-white"
                    />
                  </label>
                </div>
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Up to 5 files, 4 MB total. PDF, AI, EPS, PSD, SVG, PNG, JPG,
                  WEBP, TIFF or CDR.
                </p>
              </div>
            </details>

            {errorMessage && (
              <div className="mt-4 rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-700">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isSending}
              className="mt-5 w-full rounded-full bg-[#FF6A00] px-8 py-3.5 text-base font-black text-white shadow-lg shadow-orange-500/25 transition hover:-translate-y-0.5 hover:bg-[#007C91] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSending ? "Sending..." : "Get My Free Quote"}
            </button>

            <ul className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs font-bold text-slate-500">
              <li>✓ Reply {businessPromises.quoteResponse}</li>
              <li>✓ MOQ from {businessPromises.minimumOrder}</li>
              <li>✓ Free dieline</li>
            </ul>
          </form>
        </div>
      </div>
    </section>
  );
}

function findProductFromParam(productParam: string | null) {
  if (!productParam) return undefined;

  const cleanParam = productParam.toLowerCase().trim();

  return products.find((product) => {
    const productSlug = product.slug.toLowerCase();
    const productName = product.name.toLowerCase();
    const productNameAsSlug = productName.replaceAll(" ", "-");

    return (
      productSlug === cleanParam ||
      productName === cleanParam ||
      productNameAsSlug === cleanParam
    );
  });
}

// Reads ?product= on every navigation, including links to "/?product=...#quote"
// clicked while already on the homepage. Kept in its own Suspense boundary so
// the quote form itself is still prerendered.
function ProductFromUrl({
  onProductMatch,
}: {
  onProductMatch: (productName: string) => void;
}) {
  const searchParams = useSearchParams();
  const productParam = searchParams.get("product");

  useEffect(() => {
    const matchedProduct = findProductFromParam(productParam);

    if (matchedProduct) {
      onProductMatch(matchedProduct.name);
    }
  }, [productParam, onProductMatch]);

  return null;
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-black text-[#07111F]">
        {label}
      </span>
      {children}
    </label>
  );
}

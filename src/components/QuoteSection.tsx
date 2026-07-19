"use client";

import type { FormEvent, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { products } from "../data/products";

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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const productParam = params.get("product");

    if (!productParam) return;

    const cleanParam = productParam.toLowerCase().trim();

    const matchedProduct = products.find((product) => {
      const productSlug = product.slug.toLowerCase();
      const productName = product.name.toLowerCase();
      const productNameAsSlug = product.name.toLowerCase().replaceAll(" ", "-");

      return (
        productSlug === cleanParam ||
        productName === cleanParam ||
        productNameAsSlug === cleanParam
      );
    });

    if (matchedProduct) {
      setSelectedProduct(matchedProduct.name);
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  setIsSending(true);
  setErrorMessage("");

  const formData = new FormData(event.currentTarget);
  const payload = Object.fromEntries(formData.entries()) as Record<
    string,
    string
  >;

  const originalMessage = payload.message || "";

  payload.message = [
    originalMessage,
    "",
    "Extra Quote Details:",
    `Material GSM / Thickness: ${payload.gsm || "Not selected"}`,
    `Printing Colors: ${payload.printing || "Not selected"}`,
    `Artwork Status: ${payload.artworkStatus || "Not selected"}`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const response = await fetch("/api/quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
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
        "Quote API returned an invalid response. Please open /api/quote and check terminal error logs.",
      );
    }

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Quote request failed.");
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
    <section className="bg-[#F7FAFC] px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.32em] text-[#FF6A00]">
              Request Custom Quote
            </p>

            <h2 className="mt-4 text-4xl font-black leading-tight text-[#07111F] md:text-6xl">
              Get clear packaging price guidance for your project
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Share your box style, size, quantity, material, GSM and finishing
              requirements. Our packaging team will review the details and guide
              you with the best custom packaging solution.
            </p>

            <div className="mt-8 grid gap-4">
              {quoteBenefits.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#00C2E8] font-black text-[#07111F]">
                    ✓
                  </div>
                  <p className="font-black text-[#07111F]">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[1.7rem] bg-[#07111F] p-6 text-white">
              <p className="text-xl font-black">Fast Quote Checklist</p>
              <p className="mt-3 leading-7 text-slate-300">
                For an accurate quote, please send product size, quantity, box
                style, material preference, GSM or board thickness, printing
                colors, finishing details and artwork status.
              </p>
            </div>
          </div>

            <form
  id="quote"
  onSubmit={handleSubmit}
  className="relative scroll-mt-28 rounded-[2rem] bg-white p-6 shadow-xl md:p-8"
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

            <div className="grid gap-5 md:grid-cols-2">
              <FormField label="Full Name">
                <input
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Your name"
                  className="field-input"
                />
              </FormField>

              <FormField label="Email">
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="your@email.com"
                  className="field-input"
                />
              </FormField>

              <FormField label="WhatsApp / Phone">
                <input
                  name="whatsapp"
                  autoComplete="tel"
                  placeholder="+1 000 000 0000"
                  className="field-input"
                />
              </FormField>

              <FormField label="Country">
                <select name="country" className="field-input">
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label="Product Type">
                <select
                  name="product"
                  value={selectedProduct}
                  onChange={(event) => setSelectedProduct(event.target.value)}
                  className="field-input"
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
                  placeholder="500 / 1000 / 5000"
                  className="field-input"
                />
              </FormField>

              <FormField label="Size">
                <input
                  name="size"
                  placeholder="L x W x H"
                  className="field-input"
                />
              </FormField>

              <FormField label="Material">
                <select name="material" className="field-input">
                  {materialOptions.map((material) => (
                    <option key={material} value={material}>
                      {material}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label="GSM / Board Thickness">
                <select name="gsm" className="field-input">
                  {gsmOptions.map((gsm) => (
                    <option key={gsm} value={gsm}>
                      {gsm}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label="Printing Colors">
                <select name="printing" className="field-input">
                  {printingOptions.map((printing) => (
                    <option key={printing} value={printing}>
                      {printing}
                    </option>
                  ))}
                </select>
              </FormField>
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <FormField label="Finishing Options">
                <select name="finishing" className="field-input">
                  {finishingOptions.map((finish) => (
                    <option key={finish} value={finish}>
                      {finish}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label="Artwork Status">
                <select name="artworkStatus" className="field-input">
                  {artworkOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </FormField>
            </div>

            <div className="mt-5">
              <FormField label="Project Details">
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Tell us about your product, packaging style, deadline, shipping country and any special requirement..."
                  className="field-input resize-none"
                />
              </FormField>
            </div>

            <div className="mt-5 rounded-2xl border border-dashed border-[#00C2E8] bg-[#00C2E8]/10 p-5">
                            <p className="font-black text-[#07111F]">
                Artwork & Design Files
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                After submitting your request, our packaging team will contact
                you to collect artwork and reference files securely when required.
              </p>
            </div>

            {errorMessage && (
              <div className="mt-5 rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-700">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isSending}
              className="mt-6 w-full rounded-full bg-[#FF6A00] px-8 py-5 text-lg font-black text-white shadow-lg shadow-orange-500/25 transition hover:-translate-y-1 hover:bg-[#007C91] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSending ? "Sending Quote Request..." : "Submit Quote Request"}
            </button>

            <p className="mt-4 text-center text-sm text-slate-500">
              Your request will be sent to our packaging team for review.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
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
      <span className="mb-2 block text-sm font-black text-[#07111F]">
        {label}
      </span>
      {children}
    </label>
  );
}


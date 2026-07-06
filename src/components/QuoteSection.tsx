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
  "Embossing",
  "Debossing",
  "Die Cutting",
  "Window Patching",
  "Drip Off / Varnish",
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
    "SBS Board / Bleach Card",
    "Art Card 250-400 GSM",
    "Duplex Board 300-500 GSM",
    "Kraft Card 250-450 GSM",
    "Food Grade Card 250-400 GSM",
    "Corrugated Board",
    "Rigid Board / Grey Board",
  ],
  rigid: [
    "Need suggestion",
    "Rigid Board 800 GSM",
    "Rigid Board 1000 GSM",
    "Rigid Board 1200 GSM",
    "Rigid Board 1500 GSM",
    "Rigid Board 1800 GSM",
    "Grey Board 1.5mm",
    "Grey Board 2mm",
    "Grey Board 2.5mm",
    "Grey Board 3mm",
    "Art Paper Wrap 128-157 GSM",
    "Special Texture Paper Wrap",
  ],
  folding: [
    "Need suggestion",
    "SBS Board 250 GSM",
    "SBS Board 300 GSM",
    "SBS Board 350 GSM",
    "SBS Board 400 GSM",
    "Bleach Card 300 GSM",
    "Bleach Card 350 GSM",
    "Art Card 300 GSM",
    "Art Card 350 GSM",
    "Duplex Board 350 GSM",
    "Duplex Board 400 GSM",
    "Kraft Card 300 GSM",
    "Kraft Card 350 GSM",
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
    "Mailer Box Corrugated Board",
  ],
  food: [
    "Need suggestion",
    "Food Grade SBS 250 GSM",
    "Food Grade SBS 300 GSM",
    "Food Grade SBS 350 GSM",
    "Food Grade Kraft 250 GSM",
    "Food Grade Kraft 300 GSM",
    "PE Coated Paper",
    "Greaseproof Paper",
    "Butter Paper",
    "Glassine Paper",
    "Cup Stock Paper",
    "Bakery Box Card",
  ],
  sticker: [
    "Need suggestion",
    "Sticker Stock Paper",
    "Gloss Sticker Paper",
    "Matte Sticker Paper",
    "Semi Gloss Sticker Paper",
    "Vinyl Sticker",
    "Transparent Sticker",
    "Kraft Sticker",
    "Gold Foil Sticker",
    "Silver Foil Sticker",
    "Waterproof Label Stock",
  ],
  paper: [
    "Need suggestion",
    "Art Paper 128 GSM",
    "Art Paper 157 GSM",
    "Art Paper 170 GSM",
    "Kraft Paper 80 GSM",
    "Kraft Paper 100 GSM",
    "Kraft Paper 120 GSM",
    "Butter Paper",
    "Greaseproof Paper",
    "Wrapping Paper",
    "Tissue Paper",
  ],
};

const gsmOptions = [
  "Need suggestion",
  "80 GSM",
  "100 GSM",
  "120 GSM",
  "128 GSM",
  "157 GSM",
  "170 GSM",
  "200 GSM",
  "250 GSM",
  "300 GSM",
  "350 GSM",
  "400 GSM",
  "450 GSM",
  "500 GSM",
  "800 GSM rigid",
  "1000 GSM rigid",
  "1200 GSM rigid",
  "1500 GSM rigid",
  "1.5mm board",
  "2mm board",
  "2.5mm board",
  "3mm board",
  "E-Flute",
  "B-Flute",
  "Micro Flute",
];

function getMaterialType(productName: string) {
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

function uniqueValues(values: string[]) {
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

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Quote request failed.");
      }

      router.push("/thank-you");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSending(false);
    }
  }

  return (
    <section id="quote" className="bg-[#F7FAFC] px-5 py-24 md:px-8">
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
            onSubmit={handleSubmit}
            className="rounded-[2rem] bg-white p-6 shadow-xl md:p-8"
          >
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
              <p className="font-black text-[#07111F]">Artwork Upload</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                File upload will be connected in the next backend level. For
                now, select artwork status above and mention any design support
                requirement in project details.
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
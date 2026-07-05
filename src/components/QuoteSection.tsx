"use client";

import type { FormEvent } from "react";
import { useEffect, useState } from "react";
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
  "Other",
];

const materials = [
  "Need suggestion",
  "SBS Board",
  "Kraft Paper",
  "Rigid Board",
  "Corrugated Board",
  "Art Card",
  "Butter Paper",
];

const finishingOptions = [
  "Need suggestion",
  "Matte Lamination",
  "Gloss Lamination",
  "Spot UV",
  "Gold Foiling",
  "Embossing",
  "Die Cutting",
  "Multiple Finishes",
];

export default function QuoteSection() {
  const router = useRouter();

  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(
    products[0]?.name || ""
  );

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
    const payload = Object.fromEntries(formData.entries());

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
              Share your box style, size, quantity, material and finishing
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
                style, material preference, printing colors, finishing details
                and artwork status.
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
                    <option key={country}>{country}</option>
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
                  {materials.map((material) => (
                    <option key={material}>{material}</option>
                  ))}
                </select>
              </FormField>
            </div>

            <div className="mt-5">
              <FormField label="Finishing Options">
                <select name="finishing" className="field-input">
                  {finishingOptions.map((finish) => (
                    <option key={finish}>{finish}</option>
                  ))}
                </select>
              </FormField>
            </div>

            <div className="mt-5">
              <FormField label="Project Details">
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Tell us about your product, packaging style, printing colors, artwork and deadline..."
                  className="field-input resize-none"
                />
              </FormField>
            </div>

            <div className="mt-5 rounded-2xl border border-dashed border-[#00C2E8] bg-[#00C2E8]/10 p-5">
              <p className="font-black text-[#07111F]">Artwork Upload</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                File upload will be connected in the next backend level. For
                now, mention if artwork is ready or if you need design support.
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
  children: React.ReactNode;
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
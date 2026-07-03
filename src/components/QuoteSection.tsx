"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { products } from "../data/products";

export default function QuoteSection() {
  const router = useRouter();
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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
              Get packaging price guidance for your project
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Share your product details, quantity, size, material and finishing
              needs. Our team will guide you with the best packaging solution.
            </p>

            <div className="mt-8 grid gap-4">
              {[
                "Custom box style suggestion",
                "Material and GSM guidance",
                "Printing and finishing options",
                "International buyer support",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00C2E8] font-black text-[#07111F]">
                    ✓
                  </div>
                  <p className="font-black text-[#07111F]">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[1.7rem] bg-[#07111F] p-6 text-white">
              <p className="text-xl font-black">Fast Quote Checklist</p>
              <p className="mt-3 leading-7 text-slate-300">
                For accurate quote, please send product size, quantity, box
                style, material preference, printing colors and finishing details.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] bg-white p-6 shadow-xl md:p-8"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-black text-[#07111F]">
                  Full Name
                </label>
                <input
                  name="name"
                  required
                  placeholder="Your name"
                  className="w-full rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-4 outline-none focus:border-[#00C2E8]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-[#07111F]">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="w-full rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-4 outline-none focus:border-[#00C2E8]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-[#07111F]">
                  WhatsApp
                </label>
                <input
                  name="whatsapp"
                  placeholder="+1 000 000 0000"
                  className="w-full rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-4 outline-none focus:border-[#00C2E8]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-[#07111F]">
                  Country
                </label>
                <select
                  name="country"
                  className="w-full rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-4 outline-none focus:border-[#00C2E8]"
                >
                  <option>USA</option>
                  <option>UK</option>
                  <option>Canada</option>
                  <option>Europe</option>
                  <option>UAE</option>
                  <option>Australia</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-[#07111F]">
                  Product Type
                </label>
                <select
                  name="product"
                  className="w-full rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-4 outline-none focus:border-[#00C2E8]"
                >
                  {products.map((product) => (
                    <option key={product.slug}>{product.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-[#07111F]">
                  Quantity
                </label>
                <input
                  name="quantity"
                  placeholder="500 / 1000 / 5000"
                  className="w-full rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-4 outline-none focus:border-[#00C2E8]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-[#07111F]">
                  Size
                </label>
                <input
                  name="size"
                  placeholder="L x W x H"
                  className="w-full rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-4 outline-none focus:border-[#00C2E8]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-[#07111F]">
                  Material
                </label>
                <select
                  name="material"
                  className="w-full rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-4 outline-none focus:border-[#00C2E8]"
                >
                  <option>Need suggestion</option>
                  <option>SBS Board</option>
                  <option>Kraft Paper</option>
                  <option>Rigid Board</option>
                  <option>Corrugated Board</option>
                  <option>Art Card</option>
                  <option>Butter Paper</option>
                </select>
              </div>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-black text-[#07111F]">
                Finishing Options
              </label>
              <select
                name="finishing"
                className="w-full rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-4 outline-none focus:border-[#00C2E8]"
              >
                <option>Need suggestion</option>
                <option>Matte Lamination</option>
                <option>Gloss Lamination</option>
                <option>Spot UV</option>
                <option>Gold Foiling</option>
                <option>Embossing</option>
                <option>Die Cutting</option>
                <option>Multiple Finishes</option>
              </select>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-black text-[#07111F]">
                Project Details
              </label>
              <textarea
                name="message"
                rows={5}
                placeholder="Tell us about your product, packaging style, printing colors and artwork..."
                className="w-full rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-4 outline-none focus:border-[#00C2E8]"
              />
            </div>

            <div className="mt-5 rounded-2xl border border-dashed border-[#00C2E8] bg-[#00C2E8]/10 p-5">
              <p className="font-black text-[#07111F]">Artwork Upload</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                File upload will be connected in the next backend level. For now,
                mention if artwork is ready or needs design support.
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
              Your quote request will be sent to our packaging team.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
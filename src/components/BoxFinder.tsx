"use client";

import Link from "next/link";
import { useState } from "react";
import { products } from "@/data/products";

type Choice = { label: string; value: string };

const productTypes: Array<Choice & { slug: string }> = [
  { label: "Cosmetics & skincare", value: "cosmetics", slug: "cosmetic-boxes" },
  { label: "Food & takeaway", value: "food", slug: "food-packaging" },
  { label: "Cakes & bakery", value: "bakery", slug: "bakery-boxes" },
  { label: "Ecommerce shipping", value: "ecommerce", slug: "mailer-boxes" },
  { label: "Luxury gifts", value: "gifts", slug: "rigid-boxes" },
  { label: "Clothing & apparel", value: "apparel", slug: "apparel-boxes" },
  { label: "Candles", value: "candles", slug: "candle-boxes" },
  { label: "Perfume", value: "perfume", slug: "perfume-boxes" },
  { label: "Jewelry", value: "jewelry", slug: "jewelry-boxes" },
  { label: "Retail shelf products", value: "retail", slug: "folding-cartons" },
  { label: "Supplements & pharma", value: "pharma", slug: "pharmaceutical-boxes" },
  { label: "Labels & stickers", value: "labels", slug: "labels-stickers" },
];

// What matters most -> an alternative style worth comparing
const priorities: Array<Choice & { slug: string; note: string }> = [
  {
    label: "Premium unboxing",
    value: "premium",
    slug: "magnetic-boxes",
    note: "Magnetic rigid boxes give the most premium opening.",
  },
  {
    label: "Protection in shipping",
    value: "protection",
    slug: "mailer-boxes",
    note: "Corrugated mailers protect products in the post.",
  },
  {
    label: "Lowest cost at volume",
    value: "cost",
    slug: "folding-cartons",
    note: "Folding cartons are the most economical at higher quantities.",
  },
  {
    label: "Shelf display",
    value: "display",
    slug: "display-boxes",
    note: "Display boxes put your product on the counter.",
  },
];

const quantities: Choice[] = [
  { label: "100 – 500", value: "100-500" },
  { label: "500 – 2,000", value: "500-2000" },
  { label: "2,000 – 10,000", value: "2000-10000" },
  { label: "10,000+", value: "10000+" },
];

function productBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export default function BoxFinder() {
  const [type, setType] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");

  const step = !type ? 1 : !priority ? 2 : !quantity ? 3 : 4;
  const chosenType = productTypes.find((item) => item.value === type);
  const chosenPriority = priorities.find((item) => item.value === priority);
  const main = chosenType ? productBySlug(chosenType.slug) : undefined;
  const alternative =
    chosenPriority && chosenPriority.slug !== chosenType?.slug
      ? productBySlug(chosenPriority.slug)
      : undefined;

  function reset() {
    setType("");
    setPriority("");
    setQuantity("");
  }

  return (
    <section id="box-finder" className="bg-white px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-sm font-black uppercase tracking-[0.32em] text-[#FF6A00]">
            Box Finder
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-[#07111F] sm:text-4xl">
            Not sure which box you need?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Answer three quick questions and we will point you to the right
            packaging style.
          </p>
        </div>

        <div className="mt-10 rounded-[2rem] border border-slate-200 bg-[#F7FAFC] p-6 shadow-sm md:p-8">
          <ol className="mb-8 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-[0.16em]">
            {["Product", "Priority", "Quantity"].map((label, index) => (
              <li key={label} className="flex items-center gap-2">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full ${
                    step > index + 1
                      ? "bg-[#00C2E8] text-[#07111F]"
                      : step === index + 1
                        ? "bg-[#FF6A00] text-white"
                        : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {step > index + 1 ? "✓" : index + 1}
                </span>
                <span className="hidden text-[#07111F] sm:inline">{label}</span>
                {index < 2 && <span className="mx-1 h-px w-6 bg-slate-300" />}
              </li>
            ))}
          </ol>

          {step === 1 && (
            <ChoiceGrid
              question="What are you packaging?"
              choices={productTypes}
              onPick={setType}
            />
          )}

          {step === 2 && (
            <ChoiceGrid
              question="What matters most?"
              choices={priorities}
              onPick={setPriority}
            />
          )}

          {step === 3 && (
            <ChoiceGrid
              question="How many boxes do you need?"
              choices={quantities}
              onPick={setQuantity}
            />
          )}

          {step === 4 && main && (
            <div className="text-center">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#007C91]">
                Our recommendation
              </p>
              <h3 className="mt-3 text-3xl font-black text-[#07111F]">
                {main.name}
              </h3>
              <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-600">
                {main.description}
              </p>
              {alternative && chosenPriority && (
                <p className="mx-auto mt-4 max-w-xl rounded-2xl bg-white p-4 text-sm leading-6 text-slate-600">
                  Also worth comparing:{" "}
                  <Link
                    href={`/products/${alternative.slug}`}
                    className="font-black text-[#FF6A00] hover:text-[#007C91]"
                  >
                    {alternative.name}
                  </Link>
                  . {chosenPriority.note}
                </p>
              )}

              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href={`/?product=${main.slug}#quote`}
                  className="rounded-full bg-[#FF6A00] px-7 py-3 text-sm font-black text-white shadow-lg shadow-orange-500/20 transition hover:bg-[#007C91]"
                >
                  Get a quote for {main.name}
                </Link>
                <Link
                  href={`/products/${main.slug}`}
                  className="rounded-full border border-slate-300 px-7 py-3 text-sm font-black text-[#07111F] transition hover:border-[#FF6A00] hover:text-[#FF6A00]"
                >
                  View {main.name}
                </Link>
              </div>

              <button
                type="button"
                onClick={reset}
                className="mt-5 text-sm font-bold text-slate-500 underline-offset-4 hover:text-[#07111F] hover:underline"
              >
                Start again
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ChoiceGrid({
  question,
  choices,
  onPick,
}: {
  question: string;
  choices: Choice[];
  onPick: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-5 w-full text-center text-xl font-black text-[#07111F]">
        {question}
      </legend>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {choices.map((choice) => (
          <button
            key={choice.value}
            type="button"
            onClick={() => onPick(choice.value)}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-black text-[#07111F] shadow-sm transition hover:-translate-y-0.5 hover:border-[#FF6A00] hover:text-[#FF6A00]"
          >
            {choice.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

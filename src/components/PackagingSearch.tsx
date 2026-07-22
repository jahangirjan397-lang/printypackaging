"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  type FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { categories } from "../data/categories";
import { products } from "../data/products";

type SearchItem = {
  name: string;
  href: string;
  type: "Product" | "Category" | "Market";
  description: string;
  searchText: string;
};

const marketItems: SearchItem[] = [
  {
    name: "USA Packaging",
    href: "/markets/usa",
    type: "Market",
    description: "Custom packaging support for United States buyers.",
    searchText: "usa united states america packaging global delivery",
  },
  {
    name: "UK Packaging",
    href: "/markets/uk",
    type: "Market",
    description: "Custom packaging support for United Kingdom buyers.",
    searchText: "uk united kingdom england packaging global delivery",
  },
  {
    name: "Canada Packaging",
    href: "/markets/canada",
    type: "Market",
    description: "Custom packaging support for Canadian buyers.",
    searchText: "canada canadian packaging global delivery",
  },
  {
    name: "Europe Packaging",
    href: "/markets/europe",
    type: "Market",
    description: "Packaging guidance for European brands.",
    searchText: "europe european packaging global delivery",
  },
  {
    name: "UAE Packaging",
    href: "/markets/uae",
    type: "Market",
    description: "Custom packaging support for UAE and Dubai.",
    searchText: "uae dubai emirates packaging global delivery",
  },
  {
    name: "Australia Packaging",
    href: "/markets/australia",
    type: "Market",
    description: "Custom packaging support for Australian buyers.",
    searchText: "australia australian packaging global delivery",
  },
];

const searchItems: SearchItem[] = [
  ...products.map((product) => ({
    name: product.name,
    href: `/products/${product.slug}`,
    type: "Product" as const,
    description: product.tagline,
    searchText: [
      product.name,
      product.category,
      product.tagline,
      ...product.keywords,
      ...product.materials,
      ...product.finishes,
      ...product.industries,
    ]
      .join(" ")
      .toLowerCase(),
  })),
  ...categories.map((category) => ({
    name: category.name,
    href: `/categories/${category.slug}`,
    type: "Category" as const,
    description: category.tagline,
    searchText: [
      category.name,
      category.tagline,
      ...category.keywords,
      ...category.benefits,
    ]
      .join(" ")
      .toLowerCase(),
  })),
  ...marketItems,
];

const popularSearches = [
  "Rigid boxes",
  "Bakery boxes",
  "Burger boxes",
  "Food packaging",
  "Kraft",
  "Soft touch",
];

function editDistance(firstWord: string, secondWord: string) {
  const rows = secondWord.length + 1;
  const columns = firstWord.length + 1;
  const matrix = Array.from({ length: rows }, () =>
    Array<number>(columns).fill(0)
  );

  for (let row = 0; row < rows; row += 1) {
    matrix[row][0] = row;
  }

  for (let column = 0; column < columns; column += 1) {
    matrix[0][column] = column;
  }

  for (let row = 1; row < rows; row += 1) {
    for (let column = 1; column < columns; column += 1) {
      const replacementCost =
        secondWord[row - 1] === firstWord[column - 1] ? 0 : 1;

      matrix[row][column] = Math.min(
        matrix[row - 1][column] + 1,
        matrix[row][column - 1] + 1,
        matrix[row - 1][column - 1] + replacementCost
      );
    }
  }

  return matrix[rows - 1][columns - 1];
}

function matchesSearch(item: SearchItem, query: string) {
  const queryWords = query.split(/\s+/).filter(Boolean);
  const itemWords = item.searchText.split(/[^a-z0-9]+/).filter(Boolean);

  return queryWords.every((queryWord) => {
    if (item.searchText.includes(queryWord)) {
      return true;
    }

    if (queryWord.length < 4) {
      return false;
    }

    return itemWords.some(
      (itemWord) =>
        Math.abs(itemWord.length - queryWord.length) <= 1 &&
        editDistance(itemWord, queryWord) <= 1
    );
  });
}

export default function PackagingSearch() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleKeyboard(event: KeyboardEvent) {
      const target = event.target as HTMLElement;
      const isTyping =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.isContentEditable;

      if (event.key === "/" && !isTyping) {
        event.preventDefault();
        setOpen(true);
      }

      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 50);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const normalizedQuery = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!normalizedQuery) {
      return [];
    }

    return searchItems
      .filter((item) => matchesSearch(item, normalizedQuery))
      .sort((firstItem, secondItem) => {
        const firstStarts = firstItem.name
          .toLowerCase()
          .startsWith(normalizedQuery);
        const secondStarts = secondItem.name
          .toLowerCase()
          .startsWith(normalizedQuery);

        if (firstStarts && !secondStarts) return -1;
        if (!firstStarts && secondStarts) return 1;

        return firstItem.name.localeCompare(secondItem.name);
      })
      .slice(0, 15);
  }, [normalizedQuery]);

  const resultGroups = [
    {
      title: "Products",
      items: results.filter((item) => item.type === "Product"),
    },
    {
      title: "Categories",
      items: results.filter((item) => item.type === "Category"),
    },
    {
      title: "Markets",
      items: results.filter((item) => item.type === "Market"),
    },
  ].filter((group) => group.items.length > 0);

  function closeSearch() {
    setOpen(false);
    setQuery("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const firstResult = results[0];

    if (!firstResult) {
      return;
    }

    router.push(firstResult.href);
    closeSearch();
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-[#07111F] transition hover:-translate-y-0.5 hover:border-[#00C2E8] hover:bg-[#07111F] hover:text-white"
        aria-label="Search packaging products"
        title="Search packaging"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto px-3 py-4 sm:px-6 sm:py-10 md:py-20">
          <button
            type="button"
            aria-label="Close packaging search"
            onClick={closeSearch}
            className="absolute inset-0 bg-[#07111F]/80 backdrop-blur-md"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="Search Printy Packaging"
            className="relative z-10 w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/20 bg-white shadow-2xl"
          >
            <div className="bg-[#07111F] p-4 sm:p-7">
              <form onSubmit={handleSubmit} className="flex items-center gap-3">
                <div className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl bg-white px-4">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-5 w-5 shrink-0 text-[#007C91]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                  </svg>

                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    type="search"
                    placeholder="Search boxes, materials or industries..."
                    className="h-14 min-w-0 flex-1 bg-transparent text-base font-bold text-[#07111F] outline-none placeholder:font-medium placeholder:text-slate-400"
                  />
                </div>

                <button type="submit" className="sr-only">
                  Open first search result
                </button>

                <button
                  type="button"
                  onClick={closeSearch}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 text-xl font-black text-white transition hover:bg-[#FF6A00]"
                  aria-label="Close search"
                >
                  ×
                </button>
              </form>

              <p className="mt-3 text-xs font-bold text-slate-400">
                Type to see results. Press Enter to open the first result or ESC to close.
              </p>
            </div>

            <div className="max-h-[calc(100vh-10rem)] overflow-y-auto p-5 sm:max-h-[65vh] sm:p-7">
              {!normalizedQuery && (
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#007C91]">
                    Popular Searches
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {popularSearches.map((search) => (
                      <button
                        key={search}
                        type="button"
                        onClick={() => setQuery(search)}
                        className="rounded-full border border-slate-200 bg-[#F7FAFC] px-4 py-2 text-sm font-black text-[#07111F] transition hover:border-[#FF6A00] hover:bg-[#FF6A00] hover:text-white"
                      >
                        {search}
                      </button>
                    ))}
                  </div>

                  <div className="mt-8 rounded-3xl bg-[#00C2E8]/10 p-5">
                    <p className="font-black text-[#07111F]">
                      Search the complete packaging catalog
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Find packaging by product name, industry, material,
                      printing finish or international market.
                    </p>
                  </div>
                </div>
              )}

              {normalizedQuery && results.length === 0 && (
                <div className="py-10 text-center">
                  <p className="text-xl font-black text-[#07111F]">
                    No exact packaging result found
                  </p>
                  <p className="mt-3 text-sm text-slate-600">
                    Try another product, material or industry name.
                  </p>

                  <Link
                    href="/#quote"
                    prefetch={false}
                    onClick={closeSearch}
                    className="mt-6 inline-flex rounded-full bg-[#FF6A00] px-6 py-3 text-sm font-black text-white"
                  >
                    Request Custom Guidance
                  </Link>
                </div>
              )}

              {resultGroups.map((group) => (
                <div key={group.title} className="mb-7 last:mb-0">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#007C91]">
                    {group.title}
                  </p>

                  <div className="mt-3 grid gap-3">
                    {group.items.map((item) => (
                      <Link
                        key={`${item.type}-${item.href}`}
                        href={item.href}
                        prefetch={false}
                        onClick={closeSearch}
                        className="group rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#00C2E8] hover:shadow-lg"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="font-black text-[#07111F] group-hover:text-[#007C91]">
                              {item.name}
                            </p>
                            <p className="mt-1 text-sm leading-6 text-slate-600">
                              {item.description}
                            </p>
                          </div>

                          <span className="shrink-0 rounded-full bg-[#F7FAFC] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#FF6A00]">
                            {item.type}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

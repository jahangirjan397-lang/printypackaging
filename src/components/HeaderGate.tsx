"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";

const pagesWithOwnHeader = [
  "/",
  "/products",
  "/categories",
  "/markets",
];

export default function HeaderGate() {
  const pathname = usePathname();

  const pageAlreadyHasHeader = pagesWithOwnHeader.some((path) => {
    if (pathname === path) {
      return true;
    }

    return pathname.startsWith(`${path}/`);
  });

  if (pageAlreadyHasHeader) {
    return null;
  }

  return <Header />;
}
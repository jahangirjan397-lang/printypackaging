"use client";

import { usePathname } from "next/navigation";
import SiteFooter from "@/components/SiteFooter";

const pagesWithOwnFooter = ["/"];

export default function SiteFooterGate() {
  const pathname = usePathname();

  const pageAlreadyHasFooter = pagesWithOwnFooter.some((path) => {
    if (pathname === path) {
      return true;
    }

    return pathname.startsWith(`${path}/`);
  });

  if (pageAlreadyHasFooter) {
    return null;
  }

  return <SiteFooter />;
}
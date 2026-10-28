"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// Hides site chrome (e.g. the packaging footer) on pages that bring their own
export default function HideOnRoutes({ routes, children }: { routes: string[]; children: ReactNode }) {
  const pathname = usePathname();
  const hidden = routes.some((r) => pathname === r || pathname.startsWith(`${r}/`));
  return hidden ? null : <>{children}</>;
}

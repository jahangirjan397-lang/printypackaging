"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

// Fades and lifts its children into view the first time they scroll on screen.
// Content is visible in the HTML; the script only "arms" the effect, so the
// page still shows everything if JavaScript is slow or off (good for Google).
// `delay` (ms) staggers cards in a grid. Reduced-motion users get no motion.
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const show = () => el.classList.add("cs-in");
    el.classList.add("cs-armed");
    // Already on screen: animate in right away.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
      requestAnimationFrame(() => requestAnimationFrame(show));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          show();
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref as never} className={`cs-reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

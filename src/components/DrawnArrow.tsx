"use client";

import { useEffect, useRef } from "react";

type Direction = "down-right" | "down-left" | "right";

// Orange hand-drawn arrow that keeps drawing itself on a loop once it scrolls into view:
// a dot, a curved line, then the arrowhead. Purely decorative.
const shapes: Record<Direction, { viewBox: string; line: string; head: string; dot: [number, number] }> = {
  "down-right": {
    viewBox: "0 0 72 56",
    dot: [5, 9],
    line: "M9 9c16-3 32-1 42 9s12 18 13 28",
    head: "M56 40l8 8 6-10",
  },
  "down-left": {
    viewBox: "0 0 72 56",
    dot: [67, 9],
    line: "M63 9c-16-3-32-1-42 9S9 36 8 46",
    head: "M16 40l-8 8-6-10",
  },
  right: {
    viewBox: "0 0 80 36",
    dot: [4, 26],
    line: "M8 26c16-14 38-17 62-7",
    head: "M61 11l10 8-11 6",
  },
};

export default function DrawnArrow({
  direction = "down-right",
  className = "h-14 w-16",
}: {
  direction?: Direction;
  className?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);

  // Adds "is-drawn" (which starts the CSS animation) once the arrow is on
  // screen; no React state needed
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      node.classList.add("is-drawn");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-drawn");
          observer.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const shape = shapes[direction];

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      viewBox={shape.viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`drawn-arrow text-[#FF6A00] ${className}`}
    >
      <circle cx={shape.dot[0]} cy={shape.dot[1]} r="2.6" fill="currentColor" stroke="none" />
      <path d={shape.line} pathLength={1} />
      <path d={shape.head} pathLength={1} />
    </svg>
  );
}

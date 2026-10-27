"use client";

import dynamic from "next/dynamic";

// The generator reads the visitor's saved label from localStorage, so it
// renders in the browser only; the page around it stays server-rendered
const NutritionLabelGenerator = dynamic(() => import("@/components/NutritionLabelGenerator"), {
  ssr: false,
  loading: () => <div className="h-[640px] animate-pulse rounded-[2rem] border border-slate-200 bg-white" aria-label="Loading the label generator" />,
});

export default function NutritionLabelTool() {
  return <NutritionLabelGenerator />;
}

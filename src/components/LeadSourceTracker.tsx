"use client";

import { useEffect } from "react";
import { captureLeadSource } from "@/lib/leadSource";

export default function LeadSourceTracker() {
  useEffect(() => {
    captureLeadSource();
  }, []);

  return null;
}

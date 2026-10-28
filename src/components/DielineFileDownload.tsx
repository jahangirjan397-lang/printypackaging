"use client";

import { useState } from "react";
import DielineLeadGate, { readDielineLead, trackDieline } from "@/components/DielineLeadGate";

// Download button for a dieline file uploaded from the admin panel.
export default function DielineFileDownload({ file, styleName }: { file: string; styleName: string }) {
  const [open, setOpen] = useState(false);
  const ext = (file.split(".").pop() || "file").toUpperCase();

  function go() {
    trackDieline("dieline_download", { style: styleName, format: ext.toLowerCase() });
    const a = document.createElement("a");
    a.href = file;
    a.download = "";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  return (
    <>
      <button
        type="button"
        onClick={() => (readDielineLead() ? go() : setOpen(true))}
        className="mt-4 inline-block rounded-full border-2 border-white/80 px-6 py-3 text-sm font-black text-white hover:border-cyan-300 hover:text-cyan-300"
      >
        Download {ext} template
      </button>
      {open && (
        <DielineLeadGate
          what={ext}
          styleName={styleName}
          source="dieline-library"
          onClose={() => setOpen(false)}
          onDone={() => { setOpen(false); go(); }}
        />
      )}
    </>
  );
}

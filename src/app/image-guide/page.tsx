const imageSteps = [
  "Download clean blank packaging mockups or take real product photos.",
  "Avoid competitor logos, famous brands and trademarked packaging.",
  "Place PrintyPackaging logo or sample artwork on the box mockup.",
  "Export final image as WebP for fast website loading.",
  "Use correct file name and folder so the website can pick it easily.",
];

const fileNames = [
  "public/images/products/rigid-boxes.webp",
  "public/images/products/mailer-boxes.webp",
  "public/images/products/folding-cartons.webp",
  "public/images/products/butter-paper.webp",
  "public/images/products/paper-bags.webp",
  "public/images/products/labels-stickers.webp",
  "public/images/hero/hero-packaging.webp",
  "public/images/trust/production-samples.webp",
];

export const metadata = {
  title: "Image Guide",
  description:
    "Internal image sourcing and naming guide for Printy Packaging website.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ImageGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <span className="inline-flex rounded-full bg-[#FF6A00]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#FF6A00]">
          Internal Guide
        </span>

        <h1 className="mt-5 text-4xl font-black tracking-tight text-[#07111F] sm:text-5xl">
          Printy Packaging Image Workflow
        </h1>

        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">
          Use this guide when preparing images for the website. The goal is
          professional visuals, fast loading and no copyright or branding issues.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_18px_60px_rgba(7,17,31,0.07)]">
            <h2 className="text-2xl font-black text-[#07111F]">
              Best Image Method
            </h2>

            <div className="mt-6 space-y-4">
              {imageSteps.map((step, index) => (
                <div
                  key={step}
                  className="flex gap-4 rounded-2xl bg-slate-50 p-4"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#07111F] text-sm font-black text-white">
                    {index + 1}
                  </span>
                  <p className="text-sm font-bold leading-7 text-slate-700">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_18px_60px_rgba(7,17,31,0.07)]">
            <h2 className="text-2xl font-black text-[#07111F]">
              Website File Names
            </h2>

            <div className="mt-6 space-y-3">
              {fileNames.map((name) => (
                <div
                  key={name}
                  className="rounded-2xl bg-[#07111F] px-4 py-3 font-mono text-xs font-bold text-[#00C2E8]"
                >
                  {name}
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-8 rounded-[2rem] border border-[#00C2E8]/25 bg-[#00C2E8]/10 p-7">
          <p className="text-sm font-bold leading-7 text-[#07111F]">
            Recommended export: WebP format, product images 900×900px, hero
            image 1600px wide, file size around 100KB to 300KB where possible.
          </p>
        </div>
      </div>
    </main>
  );
}


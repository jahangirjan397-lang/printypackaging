import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Share project details",
    text: "Send the product type, size, quantity, intended use and delivery country.",
  },
  {
    number: "02",
    title: "Review and recommend",
    text: "We review the structure, material, printing, finishing and artwork requirements.",
  },
  {
    number: "03",
    title: "Approve quote and artwork",
    text: "Confirm pricing, specifications, dieline, proofing and production details.",
  },
  {
    number: "04",
    title: "Produce and deliver",
    text: "Printing, finishing, die cutting, packing and dispatch move forward after approval.",
  },
];

export default function OrderProcessSection() {
  return (
    <section className="bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full bg-[#FF6A00]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#C94F00]">
              Simple order process
            </span>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-[#07111F] sm:text-4xl lg:text-5xl">
              From packaging brief to delivery in four clear steps.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
              A clear sequence keeps the structure, artwork, quotation and
              production decisions in the right order.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/#quote"
              className="inline-flex items-center justify-center rounded-full bg-[#FF6A00] px-6 py-3 text-sm font-black text-white shadow-[0_16px_40px_rgba(255,106,0,0.25)] transition hover:-translate-y-0.5 hover:bg-[#E85F00]"
            >
              Request a Custom Quote
            </Link>
            <a
              href="https://wa.me/923338889954?text=Hello%20Printy%20Packaging%2C%20I%20need%20help%20with%20custom%20packaging."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-black text-[#07111F] transition hover:border-[#007C91] hover:text-[#007C91]"
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>

        <div className="relative mt-10">
          <div className="absolute left-[12%] right-[12%] top-7 hidden h-px bg-gradient-to-r from-[#00C2E8] via-[#FF6A00] to-[#00C2E8] lg:block" />
          <div className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <article
                key={step.number}
                className="group relative rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-cyan-300 hover:bg-white hover:shadow-[0_20px_55px_rgba(7,17,31,0.09)]"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#07111F] text-sm font-black text-white shadow-lg transition group-hover:bg-[#007C91]">
                    {step.number}
                  </span>
                  {index < steps.length - 1 && (
                    <span aria-hidden="true" className="hidden text-xl font-black text-[#FF6A00] lg:block">
                      →
                    </span>
                  )}
                </div>
                <h3 className="mt-5 text-lg font-black text-[#07111F]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {step.text}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-cyan-200 bg-[#EAFBFE] px-5 py-4">
          <p className="text-sm font-bold leading-6 text-[#07111F]">
            <span className="mr-2 text-[#007C91]">Not sure what to choose?</span>
            Share the product, quantity and intended use so suitable materials
            and construction can be recommended.
          </p>
        </div>
      </div>
    </section>
  );
}

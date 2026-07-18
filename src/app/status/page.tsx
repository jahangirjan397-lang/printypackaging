const checks = [
  {
    name: "Website",
    status: "Running",
    note: "Next.js app is loading correctly.",
  },
  {
    name: "Quote Form",
    status: "Configured",
    note: "Quote form component is available on homepage.",
  },
  {
    name: "Live Chat",
    status: "Configured",
    note: "Tawk.to loads on live domain only.",
  },
  {
    name: "WhatsApp",
    status: "Active",
    note: "WhatsApp quick action is available.",
  },
  {
    name: "Image Fallback",
    status: "Active",
    note: "Missing images show premium fallback visuals.",
  },
];

export const metadata = {
  title: "Website Status | Printy Packaging",
  description: "Website status check for Printy Packaging.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function StatusPage() {
  return (
    <main className="min-h-screen bg-[#07111F] px-4 py-14 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#00C2E8]">
          System Status
        </span>

        <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
          Printy Packaging Website Status
        </h1>

        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">
          Quick status screen for website checks before staging or live
          deployment.
        </p>

        <div className="mt-10 grid gap-5">
          {checks.map((check) => (
            <div
              key={check.name}
              className="rounded-[1.6rem] border border-white/10 bg-white/[0.06] p-6"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-black">{check.name}</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    {check.note}
                  </p>
                </div>

                <span className="inline-flex w-fit rounded-full bg-[#19C463]/15 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#66F2A0]">
                  {check.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-[1.6rem] border border-[#FF6A00]/25 bg-[#FF6A00]/10 p-6">
          <p className="text-sm font-bold leading-7 text-slate-100">
            Before live push: run npm run build, test homepage, quote form,
            WhatsApp, Tawk chat and mobile layout.
          </p>
        </div>
      </div>
    </main>
  );
}

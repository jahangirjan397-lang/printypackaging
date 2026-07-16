import { competitorUpgradePlan } from "@/data/competitorUpgradePlan";

export const metadata = {
  title: "Competitor Upgrade Plan | Printy Packaging",
  description:
    "Internal competitor upgrade tracker for Printy Packaging website.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CompetitorUpgradePlanPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <span className="inline-flex rounded-full bg-[#FF6A00]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#FF6A00]">
          Internal Competitor Plan
        </span>

        <h1 className="mt-5 text-4xl font-black tracking-tight text-[#07111F] sm:text-5xl">
          Beat Competitor Website Checklist
        </h1>

        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">
          This internal page tracks what Printy Packaging needs to beat strong
          packaging competitors in design, merchant experience, trust and SEO.
        </p>

        <div className="mt-10 grid gap-6">
          {competitorUpgradePlan.map((item) => (
            <section
              key={item.area}
              className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_18px_60px_rgba(7,17,31,0.07)]"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <h2 className="text-2xl font-black text-[#07111F]">
                    {item.area}
                  </h2>

                  <div className="mt-5 grid gap-4 lg:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-5">
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                        Competitor Strength
                      </p>
                      <p className="mt-3 text-sm font-bold leading-7 text-slate-700">
                        {item.competitorStrength}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#00C2E8]/10 p-5">
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#007C91]">
                        Printy Target
                      </p>
                      <p className="mt-3 text-sm font-bold leading-7 text-[#07111F]">
                        {item.printyTarget}
                      </p>
                    </div>
                  </div>
                </div>

                <span className="inline-flex w-fit rounded-full bg-[#FF6A00]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#FF6A00]">
                  {item.status}
                </span>
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
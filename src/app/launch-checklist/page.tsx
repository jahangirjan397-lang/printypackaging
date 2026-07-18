const checklist = [
  {
    group: "Main Pages",
    items: [
      "Homepage loads correctly",
      "Products page works",
      "Categories page works",
      "Markets page works",
      "Blog page works",
      "About page works",
      "Contact page works",
    ],
  },
  {
    group: "Lead System",
    items: [
      "Quote form submits successfully",
      "Admin email receives quote",
      "Client auto reply works",
      "Google Sheet CRM receives new row",
      "WhatsApp button opens correctly",
      "Tawk live chat appears only on live domain",
    ],
  },
  {
    group: "Design QA",
    items: [
      "Header logo alignment correct",
      "Footer not duplicated",
      "Mobile layout clean",
      "Floating buttons not overlapping",
      "No broken image icons",
      "Packaging Gallery fallback works",
    ],
  },
  {
    group: "SEO QA",
    items: [
      "Page titles are correct",
      "Meta descriptions are correct",
      "Sitemap exists",
      "Robots file exists",
      "Favicon/logo works",
      "Open Graph social preview ready",
    ],
  },
];

export const metadata = {
  title: "Launch Checklist | Printy Packaging",
  description: "Internal launch QA checklist for Printy Packaging website.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LaunchChecklistPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <span className="inline-flex rounded-full bg-[#FF6A00]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#FF6A00]">
          Internal QA
        </span>

        <h1 className="mt-5 text-4xl font-black tracking-tight text-[#07111F] sm:text-5xl">
          Printy Packaging Launch Checklist
        </h1>

        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">
          Use this page before pushing the website live. Check every section on
          localhost, staging and final live domain.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {checklist.map((section) => (
            <section
              key={section.group}
              className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_18px_60px_rgba(7,17,31,0.07)]"
            >
              <h2 className="text-2xl font-black text-[#07111F]">
                {section.group}
              </h2>

              <div className="mt-6 space-y-4">
                {section.items.map((item) => (
                  <label
                    key={item}
                    className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <input
                      type="checkbox"
                      className="mt-1 h-5 w-5 rounded border-slate-300 accent-[#FF6A00]"
                    />
                    <span className="text-sm font-bold leading-7 text-slate-700">
                      {item}
                    </span>
                  </label>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-8 rounded-[2rem] border border-[#00C2E8]/25 bg-[#00C2E8]/10 p-7">
          <p className="text-sm font-bold leading-7 text-[#07111F]">
            Rule: live domain par push sirf tab karna hai jab build pass ho,
            checklist clear ho, aur quote/chat system test ho jaye.
          </p>
        </div>
      </div>
    </main>
  );
}


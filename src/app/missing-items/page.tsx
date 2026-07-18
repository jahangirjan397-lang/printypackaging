const missingGroups = [
  {
    title: "Images",
    items: [
      "Real hero packaging image",
      "Rigid boxes image",
      "Mailer boxes image",
      "Folding cartons image",
      "Butter paper image",
      "Production/sample table image",
    ],
  },
  {
    title: "Live Launch",
    items: [
      "Deploy custom Next.js website to domain",
      "Remove old/demo website content",
      "Add live environment variables",
      "Test quote form on live domain",
      "Test Tawk chat on live domain",
    ],
  },
  {
    title: "SEO Growth",
    items: [
      "Add more product-specific landing pages",
      "Write packaging guide blog posts",
      "Add internal links from blog to products",
      "Improve product page FAQs",
      "Add market pages for USA, UK, Canada and Europe",
    ],
  },
  {
    title: "Trust Building",
    items: [
      "Add real portfolio photos",
      "Add production process photos",
      "Add customer review section",
      "Add sample kit details",
      "Add artwork/dieline support proof",
    ],
  },
];

export const metadata = {
  title: "Missing Items Tracker | Printy Packaging",
  description: "Internal tracker for Printy Packaging website missing items.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MissingItemsPage() {
  return (
    <main className="min-h-screen bg-white px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <span className="inline-flex rounded-full bg-[#FF6A00]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#FF6A00]">
          Website Tracker
        </span>

        <h1 className="mt-5 text-4xl font-black tracking-tight text-[#07111F] sm:text-5xl">
          What Printy Packaging Still Needs
        </h1>

        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">
          This page helps us remember what is still missing so we can keep
          improving the website without forgetting important launch and sales
          items.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {missingGroups.map((group) => (
            <section
              key={group.title}
              className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7 shadow-[0_18px_60px_rgba(7,17,31,0.06)]"
            >
              <h2 className="text-2xl font-black text-[#07111F]">
                {group.title}
              </h2>

              <div className="mt-6 space-y-4">
                {group.items.map((item) => (
                  <label
                    key={item}
                    className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4"
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

        <div className="mt-8 rounded-[2rem] border border-[#FF6A00]/20 bg-[#FF6A00]/10 p-7">
          <p className="text-sm font-bold leading-7 text-[#07111F]">
            Rule: every new level should improve one of these areas — images,
            live launch, SEO growth, trust, conversion or speed.
          </p>
        </div>
      </div>
    </main>
  );
}

import Link from "next/link";

const contactCards = [
  {
    title: "Email Quote Support",
    value: "sales@printypackaging.com",
    detail: "Send product size, quantity, material and artwork details.",
    href: "mailto:sales@printypackaging.com",
  },
  {
    title: "WhatsApp Support",
    value: "+92 333 888 9954",
    detail: "Fast support for packaging questions, artwork and quote guidance.",
    href: "https://wa.me/923338889954",
  },
  {
    title: "USA Quote Support",
    value: "Online quote support available",
    detail: "USA phone support will be added after official business number setup.",
    href: "#quote",
  },
];

export default function ContactTrustSection() {
  return (
    <section className="bg-white px-4 py-16 sm:px-5 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] border border-slate-200 bg-[#F7FAFC] p-6 shadow-sm md:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#007C91]">
                Trusted Quote Support
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#07111F] md:text-4xl">
                Get support before you order custom packaging.
              </h2>

              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
                Share your box style, size, quantity, material, printing colors
                and finishing options. Our quote support team will guide you
                with packaging, artwork and production details.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#quote"
                  className="rounded-full bg-[#FF6A00] px-6 py-3 text-sm font-black text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-1 hover:bg-[#007C91]"
                >
                  Start Quote Request
                </a>

                <Link
                  href="/contact"
                  className="rounded-full border border-[#00C2E8]/40 bg-white px-6 py-3 text-sm font-black text-[#07111F] transition hover:-translate-y-1 hover:bg-[#00C2E8] hover:text-[#07111F]"
                >
                  Contact Details
                </Link>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {contactCards.map((card) => (
                <a
                  key={card.title}
                  href={card.href}
                  className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#00C2E8]/50 hover:shadow-xl"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#00C2E8]/12 text-lg font-black text-[#007C91]">
                    ✓
                  </div>

                  <h3 className="mt-4 text-base font-black text-[#07111F]">
                    {card.title}
                  </h3>

                  <p className="mt-2 text-sm font-black text-[#FF6A00]">
                    {card.value}
                  </p>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {card.detail}
                  </p>

                  <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-[#007C91] group-hover:text-[#FF6A00]">
                    Open support
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import Link from "next/link";

export const metadata = {
  title: "Thank You | Printy Packaging",
  description:
    "Thank you for submitting your custom packaging quote request to Printy Packaging.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-[#07111F]">
      <section className="relative overflow-hidden px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,194,232,0.22),transparent_34%),radial-gradient(circle_at_80%_30%,rgba(255,106,0,0.18),transparent_32%)]" />
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#00C2E8]/15 blur-3xl" />
        <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-[#FF6A00]/15 blur-3xl" />

        <div className="relative mx-auto flex min-h-[62vh] max-w-4xl flex-col items-center justify-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#00C2E8] text-5xl font-black text-[#07111F] shadow-[0_18px_50px_rgba(0,194,232,0.30)]">
            ✓
          </div>

          <p className="mt-8 text-sm font-black uppercase tracking-[0.35em] text-[#00C2E8]">
            Quote Request Submitted
          </p>

          <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Thank you for your packaging request
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Your project details have been received. Our packaging team will
            review your size, quantity, material, printing and finishing details
            and contact you soon.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-[#FF6A00] px-8 py-4 text-sm font-black text-white shadow-[0_18px_45px_rgba(255,106,0,0.30)] transition hover:-translate-y-0.5 hover:bg-[#E85F00]"
            >
              Back to Home
            </Link>

            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-8 py-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/15"
            >
              View Products
            </Link>

            <a
              href="https://wa.me/923338889954?text=Hello%20PrintyPackaging%2C%20I%20submitted%20a%20quote%20request%20on%20your%20website."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-8 py-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/15"
            >
              WhatsApp Support
            </a>
          </div>

          <div className="mt-10 grid w-full gap-4 sm:grid-cols-3">
            {[
              "Quote details received",
              "Sales team review",
              "Packaging guidance soon",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 text-sm font-bold text-slate-200"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}


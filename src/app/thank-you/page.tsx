import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FloatingActions from "../../components/FloatingActions";

export const metadata: Metadata = {
  title: "Thank You | Quote Request Received | Printy Packaging",
  description:
    "Thank you for requesting a custom packaging quote from Printy Packaging.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return (
    <>
      <Header />

      <main>
        <section className="relative overflow-hidden bg-[#07111F] px-5 py-24 text-white md:px-8 md:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,194,232,0.22),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(255,106,0,0.16),transparent_30%)]" />

          <div className="relative mx-auto max-w-4xl text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#00C2E8] text-4xl font-black text-[#07111F]">
              ✓
            </div>

            <p className="mt-8 text-sm font-black uppercase tracking-[0.35em] text-[#00C2E8]">
              Quote Request Submitted
            </p>

            <h1 className="mt-5 text-4xl font-black leading-tight md:text-7xl">
              Thank you for your packaging request
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Your project details have been received on this front-end flow.
              Backend email delivery will be connected in the next level.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href="/products"
                className="rounded-full bg-[#FF6A00] px-8 py-4 font-black text-white transition hover:bg-[#007C91]"
              >
                Explore Products
              </a>

              <a
                href="/blog"
                className="rounded-full border border-white/20 px-8 py-4 font-black text-white transition hover:bg-white hover:text-[#07111F]"
              >
                Read Guides
              </a>
            </div>
          </div>
        </section>

        <section className="bg-[#F7FAFC] px-5 py-20 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-black uppercase tracking-[0.32em] text-[#FF6A00]">
                What Happens Next
              </p>

              <h2 className="mt-4 text-4xl font-black text-[#07111F] md:text-5xl">
                Our quote process
              </h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Review Details",
                  text: "We review your product type, size, quantity and packaging requirements.",
                },
                {
                  step: "02",
                  title: "Suggest Options",
                  text: "We suggest box style, material, printing and finishing options.",
                },
                {
                  step: "03",
                  title: "Prepare Quote",
                  text: "We prepare pricing guidance and next steps for your packaging project.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="rounded-[2rem] bg-white p-7 shadow-md"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#07111F] font-black text-white">
                    {item.step}
                  </div>

                  <h3 className="text-2xl font-black text-[#07111F]">
                    {item.title}
                  </h3>

                  <p className="mt-4 leading-7 text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingActions />
    </>
  );
}
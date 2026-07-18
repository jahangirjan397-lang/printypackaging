const paymentMethods = [
  {
    title: "Bank Transfer",
    text: "Local and business bank transfer options can be shared after quote confirmation.",
  },
  {
    title: "International Wire",
    text: "International buyers can request invoice-based wire transfer guidance for approved orders.",
  },
  {
    title: "Wise / Payoneer Support",
    text: "Wise or Payoneer invoice support may be available depending on buyer country and order details.",
  },
  {
    title: "Card / PayPal on Request",
    text: "Card or PayPal payment options can be discussed after invoice confirmation, if available.",
  },
];

const paymentSteps = [
  "Share packaging details and receive quote guidance.",
  "Confirm size, quantity, material, printing and finishing.",
  "Invoice and payment method details are shared for approved orders.",
  "Production starts after advance payment and final artwork approval.",
];

export default function PaymentMethodsSection() {
  return (
    <section className="bg-white px-4 py-16 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <span className="inline-flex rounded-full bg-[#FF6A00]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#FF6A00]">
              Payment Methods
            </span>

            <h2 className="mt-5 text-3xl font-black tracking-tight text-[#07111F] sm:text-4xl">
              Safe payment guidance after quote confirmation.
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600">
              Printy Packaging works on custom quote-based orders. Payment
              details are shared after the packaging requirements, invoice and
              production details are confirmed.
            </p>

            <div className="mt-7 rounded-[1.5rem] border border-[#FF6A00]/20 bg-[#FF6A00]/10 p-5">
              <p className="text-sm font-bold leading-7 text-[#07111F]">
                For buyer safety, do not send payment before receiving official
                quote confirmation and invoice details from Printy Packaging.
              </p>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {paymentMethods.map((method) => (
                <article
                  key={method.title}
                  className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6"
                >
                  <h3 className="text-lg font-black text-[#07111F]">
                    {method.title}
                  </h3>

                  <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
                    {method.text}
                  </p>
                </article>
              ))}
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-[#07111F] p-7 text-white">
              <h3 className="text-xl font-black">Order Payment Process</h3>

              <div className="mt-5 grid gap-3">
                {paymentSteps.map((step, index) => (
                  <div key={step} className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FF6A00] text-xs font-black text-white">
                      {index + 1}
                    </div>

                    <p className="pt-1 text-sm font-bold leading-6 text-slate-200">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

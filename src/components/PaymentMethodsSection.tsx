const paymentMethods = [
  {
    label: "Cards",
    title: "Major Credit & Debit Cards",
    text: "Card checkout can be enabled through an approved payment provider after the business payment account is verified.",
  },
  {
    label: "PayPal",
    title: "PayPal",
    text: "PayPal can be offered on approved invoices where the connected business account and buyer location are supported.",
  },
  {
    label: "Bank",
    title: "Bank / Wire Transfer",
    text: "Invoice-based bank or wire transfer can be used for approved custom packaging orders and larger business payments.",
  },
  {
    label: "US",
    title: "ACH / Zelle",
    text: "US payment options can be enabled where the relevant verified business account supports them.",
  },
  {
    label: "Wallets",
    title: "Digital Wallets",
    text: "Apple Pay, Google Pay or other wallet options can be enabled later when supported by the connected payment provider.",
  },
  {
    label: "Invoice",
    title: "Deposit + Balance",
    text: "Custom orders can use an approved deposit and balance schedule according to the final quote and invoice terms.",
  },
];

const paymentSteps = [
  "Approve product, size, quantity, material, print and finishing details.",
  "Receive the final quote or invoice with the available payment method.",
  "Complete the agreed deposit or full payment through the approved channel.",
  "Production proceeds after payment and final artwork or proof approval.",
];

export default function PaymentMethodsSection() {
  return (
    <section className="bg-white px-5 py-16 text-slate-950 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.32em] text-[#00A7C7]">
              Secure Payment Options
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight text-[#07111F] md:text-5xl">
              Flexible ways to pay after quote approval
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Printy Packaging is quote-led rather than fixed-price ecommerce.
              The final payment method is confirmed with the approved quote or invoice
              and can vary by buyer country, order value and connected business account.
            </p>

            <div className="mt-7 rounded-[1.5rem] border border-[#00C2E8]/25 bg-[#00C2E8]/10 p-5">
              <p className="text-sm font-bold leading-7 text-[#07111F]">
                Payment provider accounts will be connected only after business verification.
                This section does not collect card or banking details.
              </p>
            </div>
          </div>

          <div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {paymentMethods.map((method) => (
                <article
                  key={method.title}
                  className="rounded-[1.5rem] border border-slate-200 bg-[#F7FAFC] p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#00C2E8]"
                >
                  <div className="inline-flex min-h-10 items-center rounded-xl bg-[#07111F] px-3 text-xs font-black uppercase tracking-[0.16em] text-[#00C2E8]">
                    {method.label}
                  </div>

                  <h3 className="mt-4 text-lg font-black text-[#07111F]">
                    {method.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {method.text}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-6 rounded-[2rem] bg-[#07111F] p-6 text-white">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-sm">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-[#00C2E8]">
                    Payment flow
                  </p>
                  <h3 className="mt-3 text-2xl font-black">
                    Quote → invoice → approved payment → production
                  </h3>
                </div>

                <div className="grid flex-1 gap-3 sm:grid-cols-2">
                  {paymentSteps.map((step, index) => (
                    <div key={step} className="flex gap-3 rounded-2xl bg-white/[0.06] p-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FF6A00] text-xs font-black">
                        {index + 1}
                      </div>
                      <p className="text-sm font-bold leading-6 text-slate-200">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

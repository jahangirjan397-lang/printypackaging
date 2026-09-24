const paymentMethods = [
  {
    label: "Cards",
    icon: "cards",
    title: "Major Credit & Debit Cards",
    text: "Card checkout can be enabled through an approved payment provider after the business payment account is verified.",
  },
  {
    label: "PayPal",
    icon: "paypal",
    title: "PayPal",
    text: "PayPal can be offered on approved invoices where the connected business account and buyer location are supported.",
  },
  {
    label: "Bank",
    icon: "bank",
    title: "Bank / Wire Transfer",
    text: "Invoice-based bank or wire transfer can be used for approved custom packaging orders and larger business payments.",
  },
  {
    label: "US",
    icon: "transfer",
    title: "ACH / Zelle",
    text: "US payment options can be enabled where the relevant verified business account supports them.",
  },
  {
    label: "Wallets",
    icon: "wallet",
    title: "Digital Wallets",
    text: "Apple Pay, Google Pay or other wallet options can be enabled later when supported by the connected payment provider.",
  },
  {
    label: "Invoice",
    icon: "invoice",
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
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.32em] text-[#00A7C7]">
              Payment Options
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

            <a
              href="/#quote"
              className="mt-6 inline-flex rounded-full bg-[#FF6A00] px-7 py-3.5 text-sm font-black text-white transition hover:bg-[#007C91]"
            >
              Request a Quote
            </a>
          </div>

          <div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {paymentMethods.map((method) => (
                <article
                  key={method.title}
                  className="rounded-[1.5rem] border border-slate-200 bg-[#F7FAFC] p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#00C2E8]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#07111F] text-[#00C2E8]">
                      <PaymentIcon name={method.icon} />
                    </span>
                    <span className="rounded-full bg-[#00C2E8]/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.13em] text-[#007C91]">
                      {method.label}
                    </span>
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

          </div>
        </div>

        <div className="mt-10 rounded-[2rem] bg-[#07111F] p-6 text-white md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#00C2E8]">
            Payment flow
          </p>
          <h3 className="mt-3 text-2xl font-black md:text-3xl">
            From approved quote to production
          </h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {paymentSteps.map((step, index) => (
              <div key={step} className="flex gap-4 rounded-2xl bg-white/[0.06] p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FF6A00] text-sm font-black">
                  {index + 1}
                </span>
                <p className="text-sm font-bold leading-6 text-slate-200">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PaymentIcon({ name }: { name: string }) {
  const shared = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  if (name === "cards") {
    return (
      <svg {...shared}>
        <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
        <path d="M2.5 10h19M6.5 15h4" />
      </svg>
    );
  }

  if (name === "paypal") {
    return (
      <svg {...shared}>
        <rect x="3" y="4" width="18" height="13" rx="2" />
        <path d="M8 21h8M12 17v4M8 10h8m-3-3 3 3-3 3" />
      </svg>
    );
  }

  if (name === "bank") {
    return (
      <svg {...shared}>
        <path d="M2.5 9 12 3l9.5 6H2.5ZM4 21h16M5 10v8M10 10v8M14 10v8M19 10v8" />
      </svg>
    );
  }

  if (name === "transfer") {
    return (
      <svg {...shared}>
        <path d="M4 7h16m0 0-4-4m4 4-4 4M20 17H4m0 0 4-4m-4 4 4 4" />
      </svg>
    );
  }

  if (name === "wallet") {
    return (
      <svg {...shared}>
        <path d="M4 7V5.5A2.5 2.5 0 0 1 6.5 3H18M4 7h15a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a3 3 0 0 1-3-3V9a2 2 0 0 1 1-2Z" />
        <path d="M21 12h-6a2 2 0 0 0 0 4h6M16 14h.01" />
      </svg>
    );
  }

  return (
    <svg {...shared}>
      <path d="M6 3h9l4 4v14H6V3ZM15 3v5h4M9 12h7M9 16h7" />
    </svg>
  );
}

export default function FAQ() {
  const faqs = [
    {
      q: "Do you offer custom box sizes?",
      a: "Yes. We can produce custom sizes based on your product dimensions, quantity and packaging style.",
    },
    {
      q: "Can I order rigid boxes?",
      a: "Yes. We offer rigid boxes, drawer boxes, magnetic boxes, two-piece boxes and luxury packaging.",
    },
    {
      q: "Do you print butter paper?",
      a: "Yes. We can create custom printed butter paper, greaseproof paper and food wrapping paper.",
    },
    {
      q: "Can I upload my artwork?",
      a: "Yes. Artwork upload and approval system will be added in the client portal phase.",
    },
    {
      q: "Do you support USA and Europe clients?",
      a: "Yes. The website is planned for international clients including USA, UK, Europe, Canada and UAE.",
    },
  ];

  return (
    <section className="bg-white px-5 py-24 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.32em] text-[#FF6A00]">
            FAQ
          </p>

          <h2 className="mt-4 text-4xl font-black leading-tight text-[#07111F] md:text-6xl">
            Frequently asked questions
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Quick answers for customers who are planning custom packaging,
            printed boxes and food-safe wrapping solutions.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((item) => (
            <div
              key={item.q}
              className="rounded-[1.4rem] border border-slate-200 bg-[#F7FAFC] p-6"
            >
              <h3 className="text-lg font-black text-[#07111F]">{item.q}</h3>
              <p className="mt-3 leading-7 text-slate-600">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
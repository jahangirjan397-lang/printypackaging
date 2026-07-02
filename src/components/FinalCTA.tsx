export default function FinalCTA() {
  return (
    <section className="bg-white px-5 py-20 md:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-gradient-to-r from-[#FF6A00] to-[#00C2E8] p-10 text-center text-white">
        <h2 className="text-4xl font-black md:text-6xl">
          Start your packaging project today
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg">
          Share your product details and we will help you choose the right box, material and finishing.
        </p>
        <a
          href="#quote"
          className="mt-8 inline-flex rounded-full bg-[#07111F] px-8 py-4 font-black text-white transition hover:-translate-y-1"
        >
          Get Custom Quote
        </a>
      </div>
    </section>
  );
}
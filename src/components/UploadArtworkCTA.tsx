export default function UploadArtworkCTA() {
  return (
    <section className="bg-white px-5 py-24 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 rounded-[2rem] border border-slate-200 bg-[#F7FAFC] p-8 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.32em] text-[#FF6A00]">
            Artwork Upload
          </p>
          <h2 className="mt-4 text-4xl font-black text-[#07111F] md:text-5xl">
            Send your design files for print review
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Later this will become a client portal feature where customers upload
            dielines, logos and print-ready artwork.
          </p>
        </div>

        <div className="rounded-[2rem] bg-white p-6 shadow-xl">
          <div className="rounded-[1.5rem] border-2 border-dashed border-[#00C2E8] p-10 text-center">
            <p className="text-3xl font-black text-[#07111F]">Upload Artwork</p>
            <p className="mt-3 text-slate-600">PDF • AI • PSD • CDR • ZIP</p>
            <button className="mt-6 rounded-full bg-[#07111F] px-7 py-4 font-black text-white">
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
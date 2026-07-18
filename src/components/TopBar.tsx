const salesEmail = "sales@printypackaging.com";
const supportText = "USA • UK • Europe Quote Support";

export default function TopBar() {
  return (
    <div className="hidden bg-[#07111F] px-4 py-2 text-white md:block md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 text-xs font-bold">
        <p className="leading-5 text-slate-200">
          Premium Custom Boxes &bull; Butter Paper &bull; Food Packaging &bull;
          Labels & Stickers
        </p>

        <div className="flex items-center gap-4 text-right">
          <a
            href={`mailto:${salesEmail}`}
            className="text-[#00C2E8] transition hover:text-[#FF6A00]"
          >
            {salesEmail}
          </a>

          <span className="text-slate-500">|</span>

          <p className="text-[#00C2E8]">
            {supportText}
          </p>

          <span className="text-slate-500">|</span>

          <p className="text-slate-300">
            USA &bull; UK &bull; Europe &bull; UAE &bull; Worldwide
          </p>
        </div>
      </div>
    </div>
  );
}


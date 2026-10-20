import reviewsContent from "../../content/reviews.json";

type Review = { name: string; country?: string; rating: number; comment?: string; style?: string; date: string };

const reviews = (reviewsContent.reviews as Review[])
  .filter((r) => r.rating >= 1 && r.rating <= 5)
  .sort((a, b) => b.date.localeCompare(a.date));

// Approved reviews from people who used the dieline generator. Hidden until
// the first real review is approved.
export default function DielineReviews() {
  if (!reviews.length) return null;
  const average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  const stars = (n: number) => "★".repeat(Math.round(n)) + "☆".repeat(5 - Math.round(n));

  return (
    <section aria-labelledby="dieline-reviews-title" className="mt-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 id="dieline-reviews-title" className="text-2xl font-black text-[#07111F]">What people say about our dielines</h2>
        <p className="text-sm font-bold text-slate-600">
          <span className="text-[#FF6A00]" aria-hidden="true">{stars(average)}</span>{" "}
          {average.toFixed(1)} out of 5 from {reviews.length} review{reviews.length > 1 ? "s" : ""}
        </p>
      </div>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.slice(0, 12).map((r, i) => (
          <li key={`${r.date}-${i}`} className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-lg leading-none text-[#FF6A00]" aria-label={`${r.rating} out of 5 stars`}>{stars(r.rating)}</p>
            {r.comment && <p className="mt-2 text-sm text-slate-700">&ldquo;{r.comment}&rdquo;</p>}
            <p className="mt-3 text-xs font-bold text-slate-500">
              {r.name}
              {r.country ? `, ${r.country}` : ""}
              {r.style ? ` · ${r.style}` : ""} · {r.date}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

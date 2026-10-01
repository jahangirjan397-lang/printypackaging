import { customerReviews, reviewsProfileUrl } from "@/data/businessInfo";

// Renders only when genuine reviews have been added in data/businessInfo.ts
export default function CustomerReviewsSection() {
  if (customerReviews.length === 0) {
    return null;
  }

  const average =
    customerReviews.reduce((total, review) => total + review.rating, 0) /
    customerReviews.length;

  return (
    <section className="bg-white px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.32em] text-[#FF6A00]">
              Customer reviews
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-[#07111F] sm:text-4xl">
              What buyers say about Printy Packaging
            </h2>
          </div>
          <p className="text-sm font-black text-[#07111F]">
            <span className="text-[#FF6A00]">★</span> {average.toFixed(1)} / 5 ·{" "}
            {customerReviews.length} review{customerReviews.length === 1 ? "" : "s"}
            {reviewsProfileUrl && (
              <>
                {" · "}
                <a
                  href={reviewsProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#007C91] hover:text-[#FF6A00]"
                >
                  Read all reviews
                </a>
              </>
            )}
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {customerReviews.slice(0, 6).map((review) => (
            <figure
              key={`${review.name}-${review.company}`}
              className="flex flex-col rounded-[1.5rem] border border-slate-200 bg-[#F7FAFC] p-6"
            >
              <p
                aria-label={`${review.rating} out of 5 stars`}
                className="text-lg tracking-[0.15em] text-[#FF6A00]"
              >
                {"★".repeat(review.rating)}
                <span className="text-slate-300">{"★".repeat(5 - review.rating)}</span>
              </p>
              <blockquote className="mt-3 flex-1 leading-7 text-slate-700">
                “{review.text}”
              </blockquote>
              <figcaption className="mt-5 border-t border-slate-200 pt-4 text-sm">
                <span className="block font-black text-[#07111F]">{review.name}</span>
                <span className="text-slate-500">
                  {review.company} · {review.country} · via {review.source}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

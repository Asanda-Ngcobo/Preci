"use client";

import { ChevronLeft, ChevronRight } from "@deemlol/next-icons";
import { useEffect, useMemo, useState } from "react";

const satisfactionToStars = {
  excellent: 5,
  delightful: 4,
  satisfactory: 3,
  belowexpectation: 2,
  unacceptable: 1,
};

// Normalizes any casing/spacing/punctuation variant of a satisfaction
// label down to a key that matches satisfactionToStars, e.g.
// "Below Expectation", "below-expectation", "BELOW_EXPECTATION" all
// resolve to "belowexpectation".
function normalizeSatisfaction(value) {
  if (!value) return "";
  return value.toLowerCase().replace(/[^a-z]/g, "");
}

function ReviewsClient({ data = [] }) {
  const [current, setCurrent] = useState(0);

  // 1 card visible on mobile, 3 on lg+ (matches the lg:min-w-[33%] card width below).
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)"); // Tailwind's `lg`
    const updateVisibleCount = () => setVisibleCount(mql.matches ? 3 : 1);

    updateVisibleCount();
    mql.addEventListener("change", updateVisibleCount);
    return () => mql.removeEventListener("change", updateVisibleCount);
  }, []);

  const reviews = useMemo(() => {
    return data
      .map((review) => {
        const key = normalizeSatisfaction(review.satisfaction);
        const stars = satisfactionToStars[key] || 0;

        if (stars === 0 && review.satisfaction) {
          // Helps you spot future mismatches (new satisfaction labels,
          // typos in the DB, etc.) without silently dropping reviews.
          console.warn(
            `Unrecognized satisfaction value: "${review.satisfaction}" (normalized: "${key}")`
          );
        }

        return {
          name: review.name,
          satisfaction: review.satisfaction,
          recommendation: review.recommendation,
          stars,
        };
      })
      .filter((review) => review.stars > 0);
  }, [data]);

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;

    const totalStars = reviews.reduce(
      (total, review) => total + review.stars,
      0
    );

    return totalStars / reviews.length;
  }, [reviews]);

  // Clamp current whenever visibleCount changes (e.g. resizing from
  // desktop to mobile mid-scroll) so we never overshoot the track.
  useEffect(() => {
    const maxIndex = Math.max(reviews.length - visibleCount, 0);
    if (current > maxIndex) setCurrent(maxIndex);
  }, [visibleCount, reviews.length, current]);

  const maxIndex = Math.max(reviews.length - visibleCount, 0);

  const next = () => {
    if (current < maxIndex) {
      setCurrent(current + 1);
    }
  };

  const prev = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  return (
    <main className="min-h-screen py-16 px-6 w-full">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold  uppercase tracking-wide mb-3">
            Verified Users
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What our users feel about Preci
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Real feedback from people who have used Preci to
            understand their contracts and agreements.
          </p>

          {/* Overall Rating */}
          {reviews.length > 0 && (
            <div className="mt-8 flex flex-col items-center">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={
                      star <= Math.round(averageRating)
                        ? "text-yellow-400 text-3xl"
                        : "text-gray-300 text-3xl"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>

              <p className="mt-2 text-lg font-semibold text-gray-900">
                {averageRating.toFixed(1)} out of 5
              </p>

              <p className="text-sm text-gray-500">
                Based on {reviews.length} verified users
              </p>
            </div>
          )}
        </div>

        {/* Reviews */}
        {reviews.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500">No reviews available yet.</p>
          </div>
        ) : (
          <div className="relative w-full overflow-hidden py-10">
            {/* Navigation Buttons */}
            {current > 0 && (
              <button
                onClick={prev}
                className="flex justify-center items-center z-10
                absolute left-0 top-1/2 -translate-y-1/2
                bg-white border border-gray-300 text-black
                px-3 py-2 cursor-pointer rounded-full hover:bg-black/40
                w-10 h-10"
              >
                <ChevronLeft />
              </button>
            )}

            {current < maxIndex && (
              <button
                onClick={next}
                className="flex justify-center items-center z-10
                absolute right-0 top-1/2 -translate-y-1/2
                bg-white border border-gray-300 text-black
                px-3 py-2 cursor-pointer rounded-full hover:bg-black/40
                w-10 h-10"
              >
                <ChevronRight />
              </button>
            )}

            {/* Scrollable Track */}
            <div
              className="flex transition-transform min-w-[90%] duration-500 gap-6 px-4"
              style={{
                transform: `translateX(-${current * (100 / visibleCount)}%)`,
              }}
            >
              {reviews.map((review, index) => (
                <div
                  key={`${review.name}-${index}`}
                  className="min-w-full md:min-w-[33%] mx-auto min-h-50 flex flex-col justify-center items-center rounded-2xl shadow-lg overflow-hidden cursor-pointer"
                >
                  {/* User */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-semibold text-gray-700">
                      {review.name?.charAt(0)?.toUpperCase()}
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900">
                        {review.name}
                      </p>

                      <p className="text-xs text-green-600">✓ Verified user</p>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={
                          star <= review.stars
                            ? "text-yellow-400 text-xl"
                            : "text-gray-300 text-xl"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Recommendation */}
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      Would you recommend Preci?
                    </p>

                    <p className="text-gray-900 font-medium">
                      {review.recommendation || "Not provided"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default ReviewsClient;

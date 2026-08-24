"use client";

import { useMemo } from "react";

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

  return (
    <main className="min-h-screen bg-white py-16 px-6">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <div
                key={`${review.name}-${index}`}
                className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white"
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
        )}
      </div>
    </main>
  );
}

export default ReviewsClient;
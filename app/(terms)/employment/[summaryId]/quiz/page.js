"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/_lib/supabase/client";


const questions = [
  {
    key: "funnel",
    title: "Where did you hear about Préci?",
    options: ["TikTok", "Instagram", "Facebook", "Friend", "Other"],
  },
  {
    key: "satisfaction",
    title: "How satisfied were you with the summary?",
    options: [
      "Unacceptable ⭐",
      "Below Expectations ⭐⭐",
      "Satisfactory ⭐⭐⭐",
      "Delightful⭐⭐⭐⭐",
      "Excellent⭐⭐⭐⭐⭐",
   
    ],
  },
    {
    key: "recommendation",
    title: "Would you recommend Preci to your friend?",
    options: [
      "Yes",
      "Maybe",
      "No",
    ],
  },
];

export default function OnboardingSurveyPage() {
  const router = useRouter();
  const supabase = createClient();

  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [answers, setAnswers] = useState({
    funnel: "",
    satisfaction: "",
   recommendation: "",
    feedback: "",
  });

  const totalSteps = 4;

  const next = () => setStep((p) => p + 1);
  const back = () => setStep((p) => p - 1);

  const toggleArrayValue = (key, value) => {
    setAnswers((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((item) => item !== value)
        : [...prev[key], value],
    }));
  };

  const saveSurvey = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) throw authError;

     const { error } = await supabase.from("onboarding_surveys").insert({
  email: user.email,
  funnel: answers.funnel,
  satisfaction: answers.satisfaction,
  recommendation: answers.recommendation,
  feedback: answers.feedback,
});

if (error) throw error;

// 👇 mark user as surveyed
const { error: profileError } = await supabase
  .from("profiles")
  .update({ surveyed: true })
  .eq("id", user.id);

if (profileError) throw profileError;

      router.push("/users");
    } catch (err) {
      console.error("Survey submission failed:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = ((step + 1) / totalSteps) * 100;

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-xl">

        {/* Progress */}
        <div className="mb-8">
          <div className="mb-2 flex justify-between text-sm text-gray-500">
            <span>
              Question {step + 1} of {totalSteps}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>

          <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full bg-(--accent-secondary) transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* STEP 1–3 */}
        {step <= 2 && (
          <>
            <h1 className="mb-8 text-3xl font-bold">
              {questions[step].title}
            </h1>

            <div className="space-y-3">
              {questions[step].options.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setAnswers((prev) => ({
                      ...prev,
                      [questions[step].key]: option,
                    }));
                    next();
                  }}
                  className="w-full rounded-2xl border p-5 text-left hover:border-(--accent-secondary) transition"
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        )}

   

        {/* STEP 4 */}
        {step === 3 && (
          <>
            <h1 className="mb-4 text-3xl font-bold">
              Anything you would like us to improve?
            </h1>

            <p className="mb-6 text-gray-500">Optional</p>

            <textarea
              rows={6}
              value={answers.feedback}
              onChange={(e) =>
                setAnswers((prev) => ({
                  ...prev,
                  feedback: e.target.value,
                }))
              }
              className="w-full rounded-xl border p-4"
              placeholder="Tell us what you think..."
            />

            <button
              onClick={saveSurvey}
              disabled={isSubmitting}
              className={`mt-8 w-full rounded-xl py-4 font-medium text-white transition
                ${isSubmitting ? "bg-gray-400" : "bg-(--accent-primary) hover:bg-(--accent-secondary)"}
              `}
            >
              {isSubmitting ? "Saving..." : "Finish"}
            </button>
          </>
        )}

        {/* Back button */}
        {step > 0 && step < totalSteps && (
          <button onClick={back} className="mt-6 text-sm text-gray-500">
            ← Back
          </button>
        )}
      </div>
    </main>
  );
}
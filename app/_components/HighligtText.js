"use client";

import { useEffect, useState } from "react";

const SLUG_TEXT = {
  phone: "Your 24/36 months IPhone contract may be longer than that.",
  housing: "Your may be denied your deposit when you leave.",
  insurance: "Your family may be denied a claim when you are gone.",
  gym: "Your summer body gym membership can cost you more than what you signed up for.",
  car: "Car Finance Agreement Could Cost You More.",
  "credit-score": "Credit Report",
};

export default function HighlightText({ slug }) {
  const text = SLUG_TEXT[slug] || "South fricans lose hundreds of rands every year on hidden clauses.";
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => setVisible(true), 150);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <span
      // ✅ Avoid dynamic Tailwind class strings — use style for the transform
      className="text-(--accent-primary) transition-all duration-500 inline-block"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(4px)",
      }}
    >
      {text}
    </span>
  );
}

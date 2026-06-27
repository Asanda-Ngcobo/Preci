"use client";

import { useEffect, useState } from "react";

const SLUG_TEXT = {
  phone: "MTN or Vodacom Contract Could Cost You More.",
  housing: "Lease Agreement Could Cost You More.",
  insurance: "Insurance Policy Could be denied.",
  gym: "Gym Membership Contract Could Cost You More.",
  car: "Car Finance Agreement Could Cost You More.",
  "credit-score": "Credit Report",
};

export default function HighlightText({ slug }) {
  const text = SLUG_TEXT[slug] || "Contract Could Cost You More";
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
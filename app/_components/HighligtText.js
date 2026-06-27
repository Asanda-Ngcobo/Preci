"use client";

import { useEffect, useState } from "react";

const SLUG_TEXT = {
  phone: "MTN or Vodacom Contract",
  housing: "Rental Agreement",
  insurance: "Insurance Policy",
  gym: "Gym Membership Contract",
  car: "Car Finance Agreement",
  "credit-score": "Credit Report",
};

export default function HighlightText({ slug }) {
  const text = SLUG_TEXT[slug] || "Contract";

  const [visible, setVisible] = useState(true);

  // subtle loop animation (Stripe-style pulse change)
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => setVisible(true), 150);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className={`
        text-(--accent-primary)
        transition-all duration-500
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}
      `}
    >
      {text}
    </span>
  );
}
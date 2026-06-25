"use client";

import { useEffect, useState } from "react";

const contractTypes = [
  "Insurance Policy",
  "Lease Agreement",
  "Personal Loan",
  "Phone Contract",
  "Gym Membership",
  "Car Finance",
  "Car Tracker",
  "Home Loan",
];

export default function ContractTypeRotator() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % contractTypes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block font-bold text-(--accent-primary)">
      {contractTypes[activeIndex]}
    </span>
  );
}
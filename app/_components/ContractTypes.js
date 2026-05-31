'use client'
import { useEffect, useState } from "react";

const contract_types = [
  "Insurance Policy.",
  "Lease Agreement.",
  "Personal loan.",
  "Phone Contract.",
  "Gym Membership.",
  "Car Finance.",
  "Car Tracker.",
  "Home Loan.",
];

export default function ContractTypeRotator() {
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    setActiveIndex(0);
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % contract_types.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="md:text-3xl text-xl font-sans font-bold text-(--accent-primary)">
      {contract_types.map((type, index) => (
        <h1
          key={type}
          className={index === activeIndex ? "block" : "hidden"}
        >
          {type}
        </h1>
      ))}
    </div>
  );
}
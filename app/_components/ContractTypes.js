'use client'
import { useEffect, useState } from "react";

const contract_type = [
  { id: 1, type: "Phone Contract." },
  { id: 2, type: "Car Finance." },
  { id: 3, type: "Car Tracker." },
  { id: 4, type: "Home Loan." },
  { id: 5, type: "Lease Agreement." },
  { id: 6, type: "Personal loan." },
  { id: 7, type: "Insurance Policy." },
  { id: 8, type: "Gym Membership." },
];

export default function ContractTypeRotator() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % contract_type.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="md:text-3xl text-sm font-sans font-bold
     text-(--accent-secondary)">
      {contract_type.map((item, index) => (
        <h1
          key={item.id}
          className={index === activeIndex ? "block" : "hidden"}
        >
          {item.type}
        </h1>
      ))}
    </div>
  );
}

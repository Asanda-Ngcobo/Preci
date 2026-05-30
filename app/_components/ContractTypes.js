'use client'
import { useEffect, useState } from "react";

const contract_type = [
   { id: crypto.randomUUID(), type: "Insurance Policy." },
    { id: crypto.randomUUID(), type: "Lease Agreement." },
  { id: crypto.randomUUID(), type: "Personal loan." },
  { id: crypto.randomUUID(), type: "Phone Contract." },
  { id: crypto.randomUUID(), type: "Gym Membership." },
  { id: crypto.randomUUID(), type: "Car Finance." },
  { id: crypto.randomUUID(), type: "Car Tracker." },
  { id: crypto.randomUUID(), type: "Home Loan." },

  
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
    <div className="md:text-3xl text-xl font-sans font-bold
     text-(--accent-primary)">
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

"use client";

import { useEffect, useState } from "react";

const ROTATORS = {
  phone: ["MTN Contract", "Vodacom Contract", "Telkom Mobile Plan", "WiFi Contract"],
  insurance: ["Sanlam Policy", "Discovery Insurance", "Old Mutual Cover"],
  housing: ["Rental Lease", "Bond Agreement", "Rental Contract"],
  gym: ["Virgin Active Contract", "Planet Fitness Membership"],
  car: ["Car Finance Agreement", "Vehicle Installment Plan"],
  "credit-score": ["Credit Report", "Credit Bureau Record"],
  default: ["Contract", "Agreement", "Policy"],
};

export default function ContractTypeRotator({ slug }) {
  const list = ROTATORS[slug] || ROTATORS.default;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // ✅ Use list.length inside the callback — no need to list `list` as a dep
      // since ROTATORS is a module-level constant (stable reference)
      setIndex((prev) => (prev + 1) % list.length);
    }, 2000);

    return () => clearInterval(interval);
  // ✅ Depend on list reference, not list.length
  }, [list]);

  return (
    <span className="text-(--accent-primary) transition-all duration-300">
      {list[index]}
    </span>
  );
}
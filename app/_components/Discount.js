'use client'

import { useEffect, useState } from "react";

function Discount() {
  const getTimeLeft = () => {
    const now = new Date();
    const resetTime = new Date();
    resetTime.setHours(0, 30, 0, 0);

    if (now >= resetTime) {
      resetTime.setDate(resetTime.getDate() + 1);
    }

    const difference = resetTime.getTime() - now.getTime();

    return {
      hours: Math.floor(difference / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  };

  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const blocks = [
    { label: "Hours",   value: timeLeft?.hours   ?? 0 },
    { label: "Minutes", value: timeLeft?.minutes ?? 0 },
    { label: "Seconds", value: timeLeft?.seconds ?? 0 },
  ];

  return (
    <main className="sticky top-0 z-30 w-full bg-(--accent-secondary) text-white border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-3 flex flex-row items-center justify-center gap-4">
        <p className="text-sm md:text-base font-medium text-center">
          Women's Month Promo (100% off)
        </p>
        <div className="flex items-center gap-2 bg-(--accent-primary) rounded-sm px-2 py-1 shadow-lg">
          {blocks.map((item) => (
            <div key={item.label} className="min-w-fit text-center">
              <div className="text-xs font-bold">
                {String(item.value).padStart(2, "0")}
              </div>
              <div className="hidden lg:flex text-xs tracking-wide text-white/60">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Discount;

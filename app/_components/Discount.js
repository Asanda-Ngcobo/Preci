'use client'

import { useEffect, useMemo, useState } from "react";

function Discount() {
  const targetDate = useMemo(
    () => new Date("2026-06-30T23:59:59").getTime(),
    []
  );

  const calculateTimeLeft = () => {
    const now = Date.now();
    const difference = targetDate - now;

    if (difference <= 0) {
      return {
        expired: true,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      expired: false,
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      ),
      minutes: Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
      ),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeBlocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <main
      className="
        sticky top-0 z-50
        w-full
        bg-(--accent-primary)
        text-white
        border-b border-white/10
        backdrop-blur
      "
    >
      <div
        className="
          mx-auto
          flex flex-row md:flex-row
          items-center justify-center
          gap-3 md:gap-6
          px-4 py-3
          max-w-6xl
        "
      >
        <div className="text-sm md:text-base font-medium text-center w-50">
          🎉 Preci is free for
        </div>

        {timeLeft.expired ? (
          <div
            className="
              bg-green-500/20
              border border-green-400/30
              text-green-100
              px-4 py-2
              rounded-xl
              text-sm font-semibold
            "
          >
            Countdown Complete 🎉
          </div>
        ) : (
          <div
            className="
              flex items-center
              gap-2
              bg-[#6B7280]
              rounded-lg
              px-3 py-2
              shadow-lg
            "
          >
            {timeBlocks.map((item) => (
              <div
                key={item.label}
                className="
                  min-w-10
                  text-center
                  px-1
                "
              >
                <div className="text-[10px] md:text-lg font-bold tracking-tight">
                  {String(item.value).padStart(2, "0")}
                </div>

                <div className="hidden lg:flex text-[8px]
                 md:text-xs text-white/60 tracking-wide">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default Discount;
import React, { useState, useEffect } from "react";
import { weddingDetails } from "../config/wedding";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

export const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    completed: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date(weddingDetails.countdownTarget).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          completed: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        completed: false,
      });
    };

    // Calculate immediately and then set interval
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  if (timeLeft.completed) {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-center">
        <span className="font-serif text-lg font-bold tracking-[0.1em] text-[#B88B4A] uppercase animate-pulse">
          Celebration In Progress!
        </span>
        <span className="font-script text-2xl text-[#7D6249] mt-2 select-none">
          Mubarak &amp; Alhamdulillah
        </span>
      </div>
    );
  }

  const timeBlocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ];

  return (
    <div className="w-full flex flex-col items-center gap-4 my-6 px-2">
      {/* Title */}
      <h4 className="font-serif text-xs uppercase tracking-[0.2em] text-[#7D6249] font-bold">
        COUNTDOWN TO THE NIKKAH
      </h4>

      {/* Countdown Row */}
      <div className="grid grid-cols-4 gap-3 w-full max-w-[340px]">
        {timeBlocks.map((block, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center p-2 bg-[#F3E7D8]/80 border border-[#D4AF6A]/30 rounded-xl backdrop-blur-sm shadow-sm"
          >
            {/* Number */}
            <span className="font-serif text-2xl md:text-3xl font-semibold text-[#5C4028] tabular-nums tracking-tight">
              {formatNumber(block.value)}
            </span>
            {/* Label */}
            <span className="text-[10px] uppercase tracking-wider text-[#7D6249] mt-1 font-medium font-sans">
              {block.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Countdown;

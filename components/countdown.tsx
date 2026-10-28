"use client";

import { useState, useEffect } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type CountdownProps = {
  onFinished: () => void;
  onSecondsChange: (seconds: number) => void;
};

const targetDate = new Date("2026-11-30T00:00:00");

function calculateTimeLeft(): TimeLeft {
  const difference = targetDate.getTime() - new Date().getTime();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    days: Math.floor(
      difference / (1000 * 60 * 60 * 24)
    ),

    hours: Math.floor(
      (difference / (1000 * 60 * 60)) % 24
    ),

    minutes: Math.floor(
      (difference / (1000 * 60)) % 60
    ),

    seconds: Math.floor(
      (difference / 1000) % 60
    ),
  };
}

export default function Countdown({
  onFinished,
  onSecondsChange,
}: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const updateCountdown = () => {
      const newTime = calculateTimeLeft();

      setTimeLeft(newTime);

      const totalSeconds =
        newTime.days * 86400 +
        newTime.hours * 3600 +
        newTime.minutes * 60 +
        newTime.seconds;

      onSecondsChange(totalSeconds);

      if (totalSeconds <= 0) {
        onFinished();
      }
    };

    // langsung jalankan saat pertama kali
    updateCountdown();

    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [onFinished, onSecondsChange]);

  if (!timeLeft) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-10 py-10">

      {/* HARI */}
      <div className="flex flex-col items-center">
        <div className="flex h-16 w-20 items-center justify-center rounded-lg border border-white/30 bg-white/10">
          <span className="text-3xl font-bold text-white">
            {String(timeLeft.days).padStart(2, "0")}
          </span>
        </div>

        <span className="mt-2 text-[8px] font-semibold tracking-[3px] text-white/70">
          HARI
        </span>
      </div>

      <span className="text-xl text-white/70">:</span>

      {/* JAM */}
      <div className="flex flex-col items-center">
        <div className="flex h-16 w-20 items-center justify-center rounded-lg border border-white/30 bg-white/10">
          <span className="text-3xl font-bold text-white">
            {String(timeLeft.hours).padStart(2, "0")}
          </span>
        </div>

        <span className="mt-2 text-[8px] font-semibold tracking-[3px] text-white/70">
          JAM
        </span>
      </div>

      <span className="text-xl text-white/70">:</span>

      {/* MENIT */}
      <div className="flex flex-col items-center">
        <div className="flex h-16 w-20 items-center justify-center rounded-lg border border-white/30 bg-white/10">
          <span className="text-3xl font-bold text-white">
            {String(timeLeft.minutes).padStart(2, "0")}
          </span>
        </div>

        <span className="mt-2 text-[8px] font-semibold tracking-[3px] text-white/70">
          MENIT
        </span>
      </div>

      <span className="text-xl text-white/70">:</span>

      {/* DETIK */}
      <div className="flex flex-col items-center">
        <div className="flex h-16 w-20 items-center justify-center rounded-lg border border-white/30 bg-white/10">
          <span className="text-3xl font-bold text-white">
            {String(timeLeft.seconds).padStart(2, "0")}
          </span>
        </div>

        <span className="mt-2 text-[8px] font-semibold tracking-[3px] text-white/70">
          DETIK
        </span>
      </div>

    </div>
  );
}
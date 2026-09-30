"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { SALE_ENDS_AT, DEMO_MODE } from "@/lib/config";

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const endTimestamp = SALE_ENDS_AT.getTime();

    const updateTimer = () => {
      const now = Date.now();
      const diff = endTimestamp - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const { days, hours, minutes, seconds } = timeLeft;
  const isExpired = days === 0 && hours === 0 && minutes === 0 && seconds === 0;

  if (isExpired) {
    return (
      <time className="text-text-muted text-sm" dateTime={DEMO_MODE ? "" : new Date().toISOString()}>
        Offres terminees
      </time>
    );
  }

  if (!mounted) {
    return (
      <time className="text-text-muted text-sm" dateTime={DEMO_MODE ? "" : new Date().toISOString()}>
        Chargement...
      </time>
    );
  }

  return (
    <time className="font-mono font-semibold tabular-nums text-text" dateTime={DEMO_MODE ? "" : SALE_ENDS_AT.toISOString()}>
      <span className="flex items-center gap-1">
        <Clock className="w-4 h-4" aria-hidden="true" />
        <span className="sr-only">Fin des offres dans </span>
      </span>
      {days > 0 && (
        <>
          {days}
          <span className="text-text-muted ml-1 mr-2">j</span>
        </>
      )}
      {hours.toString().padStart(2, "0")}
      <span className="text-text-muted mx-1">:</span>
      {minutes.toString().padStart(2, "0")}
      <span className="text-text-muted mx-1">:</span>
      {seconds.toString().padStart(2, "0")}
    </time>
  );
}
"use client";

import { useEffect, useState } from "react";
import { formatTime } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

interface SessionTimerProps {
  durationSeconds: number;
  onExpire: () => void;
  onTick?: (remaining: number) => void;
}

export default function SessionTimer({
  durationSeconds,
  onExpire,
  onTick,
}: SessionTimerProps) {
  const [remaining, setRemaining] = useState(durationSeconds);

  useEffect(() => {
    if (remaining <= 0) {
      onExpire();
      return;
    }

    const interval = setInterval(() => {
      setRemaining((prev) => {
        const next = prev - 1;
        if (next <= 0) {
          onExpire();
          return 0;
        }
        onTick?.(next);
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [remaining, onExpire, onTick]);

  const percentage = (remaining / durationSeconds) * 100;
  const isWarning = percentage < 50;
  const isCritical = percentage < 20;

  let bgColor = "bg-emerald-600";
  let textColor = "text-emerald-400";

  if (isWarning && !isCritical) {
    bgColor = "bg-amber-600";
    textColor = "text-amber-400";
  } else if (isCritical) {
    bgColor = "bg-red-600";
    textColor = "text-red-400";
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${bgColor === "bg-emerald-600" ? "border-emerald-600/30 bg-emerald-600/10" : bgColor === "bg-amber-600" ? "border-amber-600/30 bg-amber-600/10" : "border-red-600/30 bg-red-600/10"} ${isCritical ? "animate-pulse" : ""}`}
      >
        {isCritical && <AlertCircle className={`w-5 h-5 ${textColor}`} />}
        <span className={`font-bold text-lg font-mono ${textColor}`}>
          {formatTime(remaining)}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-32 h-1 bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-full ${bgColor} transition-all duration-1000`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

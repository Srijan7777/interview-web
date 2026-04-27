"use client";

import { useEffect, useState } from "react";
import { formatTime } from "@/lib/utils";
import { AlertCircle, Timer } from "lucide-react";

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

  // Tone palette
  const tone = isCritical
    ? {
        text: "text-red-300",
        ring: "ring-red-500/30",
        bg: "bg-red-500/[0.07]",
        bar: "bg-red-500",
        dot: "bg-red-400",
        label: "Critical",
      }
    : isWarning
      ? {
          text: "text-amber-300",
          ring: "ring-amber-500/30",
          bg: "bg-amber-500/[0.06]",
          bar: "bg-amber-400",
          dot: "bg-amber-400",
          label: "Halfway",
        }
      : {
          text: "text-emerald-300",
          ring: "ring-emerald-500/25",
          bg: "bg-emerald-500/[0.05]",
          bar: "bg-emerald-400",
          dot: "bg-emerald-400",
          label: "On track",
        };

  return (
    <div
      className={`flex items-center gap-3 rounded-md ring-1 ${tone.ring} ${tone.bg} pl-3 pr-1 py-1.5`}
    >
      <div className="flex items-center gap-2">
        {isCritical ? (
          <AlertCircle className={`w-4 h-4 ${tone.text} animate-pulse`} />
        ) : (
          <Timer className={`w-3.5 h-3.5 ${tone.text}`} />
        )}
        <div className="flex flex-col leading-none">
          <span
            className={`session-eyebrow text-[9px] ${tone.text} opacity-75`}
          >
            {tone.label}
          </span>
        </div>
      </div>

      <div
        className={`num-badge font-bold text-[15px] tracking-tight ${tone.text}`}
      >
        {formatTime(remaining)}
      </div>

      {/* Horizontal micro progress bar */}
      <div className="w-20 h-1 bg-slate-800/70 rounded-full overflow-hidden mr-2">
        <div
          className={`h-full ${tone.bar} transition-all duration-1000 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

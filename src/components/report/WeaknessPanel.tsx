"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target } from "lucide-react";
import { getWeakTopics } from "@/lib/weakness-tracker";

export default function WeaknessPanel() {
  const [weaknesses, setWeaknesses] = useState<{ topic: string; avgScore: number; count: number }[]>([]);

  useEffect(() => {
    setWeaknesses(getWeakTopics(5));
  }, []);

  if (weaknesses.length === 0) return null;

  return (
    <Card className="bg-slate-900 border-slate-800 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Target className="w-5 h-5 text-red-400" />
        <h3 className="text-lg font-bold">Your Weak Areas</h3>
      </div>
      <p className="text-xs text-slate-400 mb-4">
        Based on your session history. Focus practice here.
      </p>

      <div className="space-y-2">
        {weaknesses.map((w) => (
          <div
            key={w.topic}
            className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700"
          >
            <div>
              <p className="text-sm font-medium text-slate-200 capitalize">
                {w.topic.replace(/-/g, " ")}
              </p>
              <p className="text-xs text-slate-500">
                {w.count} attempt{w.count > 1 ? "s" : ""}
              </p>
            </div>
            <Badge
              variant="outline"
              className={`${
                w.avgScore >= 6 ? "border-amber-600/40 text-amber-400"
                : "border-red-600/40 text-red-400"
              }`}
            >
              avg {w.avgScore.toFixed(1)}/10
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}

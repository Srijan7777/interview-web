"use client";

import { Card } from "@/components/ui/card";
import { DsaRoundQuestion } from "@/types";
import {
  Clock,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  Timer,
  Zap,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface TimeAnalysisPanelProps {
  questions: DsaRoundQuestion[];
  totalAllocated: number;
  totalTaken: number;
}

function statusColor(taken: number, allocated: number) {
  if (taken === 0) return "#475569";
  if (taken > allocated) return "#f43f5e";
  if (taken < allocated * 0.6) return "#10b981";
  return "#22d3ee";
}

export default function TimeAnalysisPanel({
  questions,
  totalAllocated,
  totalTaken,
}: TimeAnalysisPanelProps) {
  const efficiency =
    totalAllocated > 0 ? (totalAllocated - totalTaken) / totalAllocated : 0;
  const efficiencyPct = Math.round(efficiency * 100);

  const chartData = questions.map((q, idx) => ({
    name: `Q${idx + 1}`,
    title: q.problem.title,
    difficulty: q.problem.difficulty,
    allocated: q.allocatedMinutes,
    taken: q.timeTakenMinutes || 0,
    status: q.result || q.status,
    color: statusColor(q.timeTakenMinutes || 0, q.allocatedMinutes),
  }));

  const efficiencyLabel =
    efficiencyPct >= 20 ? "Ahead of pace" : efficiencyPct >= 0 ? "On pace" : "Behind pace";
  const efficiencyTone =
    efficiencyPct >= 20
      ? "text-emerald-300"
      : efficiencyPct >= 0
        ? "text-amber-300"
        : "text-rose-300";

  return (
    <Card className="bg-slate-900/60 border-slate-800/80 p-6 report-glass">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-cyan-500/15 text-cyan-300">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-cyan-300 font-medium">
              Pacing
            </div>
            <h3 className="text-base font-semibold text-white">Time Analysis</h3>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-[0.16em] text-slate-500">Total</div>
            <div className="text-base font-semibold text-white tabular-nums">
              {totalTaken}
              <span className="text-slate-500 text-xs">/{totalAllocated}m</span>
            </div>
          </div>
          <div
            className={`flex items-center gap-1.5 text-xs font-semibold border rounded-full px-2.5 py-1 ${
              efficiencyPct >= 20
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                : efficiencyPct >= 0
                  ? "bg-amber-500/10 border-amber-500/30 text-amber-300"
                  : "bg-rose-500/10 border-rose-500/30 text-rose-300"
            }`}
          >
            {efficiencyPct >= 0 ? <Zap className="w-3 h-3" /> : <Timer className="w-3 h-3" />}
            {efficiencyPct >= 0 ? "+" : ""}
            {efficiencyPct}%
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="rounded-xl border border-slate-800/60 bg-slate-950/40 p-4 mb-5">
        <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500 font-mono mb-2">
          Allocated vs taken (minutes)
        </div>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(51,65,85,0.4)" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                axisLine={{ stroke: "rgba(51,65,85,0.6)" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: "rgba(99,102,241,0.08)" }}
                contentStyle={{
                  background: "rgba(2,6,23,0.95)",
                  border: "1px solid rgba(51,65,85,0.6)",
                  borderRadius: 10,
                  fontSize: 12,
                  color: "#e2e8f0",
                  padding: "10px 12px",
                }}
                labelStyle={{ color: "#cbd5e1", fontWeight: 600, marginBottom: 4 }}
                formatter={(v, name) => [`${v}m`, name === "taken" ? "Taken" : "Allocated"]}
              />
              <Bar
                dataKey="allocated"
                fill="rgba(71,85,105,0.55)"
                radius={[6, 6, 0, 0]}
                isAnimationActive
                animationDuration={900}
              />
              <Bar
                dataKey="taken"
                radius={[6, 6, 0, 0]}
                isAnimationActive
                animationDuration={1100}
              >
                {chartData.map((d, i) => (
                  <Cell key={i} fill={d.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-4 mt-3 text-[11px] text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-slate-600" />
            Allocated
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" /> Fast
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400" /> On pace
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-rose-500" /> Over
          </span>
          <span className={`ml-auto font-medium ${efficiencyTone}`}>{efficiencyLabel}</span>
        </div>
      </div>

      {/* Per-question rows */}
      <div className="space-y-2.5">
        {questions.map((q, idx) => {
          const taken = q.timeTakenMinutes || 0;
          const allocated = q.allocatedMinutes;
          const pct = Math.min(100, allocated > 0 ? (taken / allocated) * 100 : 0);
          const over = taken > allocated;
          const fast = taken < allocated * 0.6 && taken > 0;
          const color = statusColor(taken, allocated);

          return (
            <div
              key={idx}
              className="rounded-lg border border-slate-800/60 bg-slate-950/30 px-4 py-3"
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-[10px] font-mono text-slate-500 shrink-0">
                    Q{idx + 1}
                  </span>
                  <span className="text-sm text-slate-200 font-medium truncate">
                    {q.problem.title}
                  </span>
                  <span
                    className={`text-[10px] font-medium border rounded-full px-2 py-0.5 capitalize shrink-0 ${
                      q.problem.difficulty === "easy"
                        ? "border-emerald-600/40 text-emerald-400 bg-emerald-500/5"
                        : q.problem.difficulty === "medium"
                          ? "border-amber-600/40 text-amber-400 bg-amber-500/5"
                          : "border-rose-600/40 text-rose-400 bg-rose-500/5"
                    }`}
                  >
                    {q.problem.difficulty}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0 text-xs">
                  <span className="font-mono tabular-nums" style={{ color }}>
                    {taken}
                    <span className="text-slate-600">/{allocated}m</span>
                  </span>
                  {fast && <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />}
                  {over && <TrendingDown className="w-3.5 h-3.5 text-rose-400" />}
                  {!over && !fast && q.status === "completed" && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  )}
                </div>
              </div>
              <div className="relative w-full h-1.5 bg-slate-800/80 rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 transition-all duration-700"
                  style={{ width: `${pct}%`, background: color }}
                />
                {over && (
                  <div
                    className="absolute inset-y-0 right-0 bg-rose-500/30"
                    style={{ width: `${Math.min(50, ((taken - allocated) / allocated) * 100)}%` }}
                  />
                )}
              </div>
              {q.result && (
                <div className="text-[10px] mt-1.5 font-mono uppercase tracking-[0.16em]">
                  <span
                    className={
                      q.result === "solved"
                        ? "text-emerald-400"
                        : q.result === "partial"
                          ? "text-amber-400"
                          : "text-rose-400"
                    }
                  >
                    · {q.result}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}

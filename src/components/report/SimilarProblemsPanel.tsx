"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DsaRoundQuestion } from "@/types";
import { Sparkles, ExternalLink } from "lucide-react";
import { findSimilarProblems } from "@/lib/rag-retrieval";

interface SimilarProblemsPanelProps {
  questions: DsaRoundQuestion[];
}

export default function SimilarProblemsPanel({ questions }: SimilarProblemsPanelProps) {
  // Pool similar problems across all round questions, dedupe by leetcodeNumber
  const seen = new Set<number>();
  const similar: any[] = [];
  for (const q of questions) {
    const anyP = q.problem as any;
    const results = findSimilarProblems(
      {
        topic: q.problem.topic,
        difficulty: q.problem.difficulty,
        tags: anyP.tags,
        leetcodeNumber: q.problem.leetcodeNumber,
      },
      3
    );
    for (const r of results) {
      if (!seen.has(r.leetcodeNumber)) {
        seen.add(r.leetcodeNumber);
        similar.push(r);
      }
    }
  }

  const top = similar.sort((a, b) => b.score - a.score).slice(0, 5);

  if (top.length === 0) return null;

  return (
    <Card className="bg-slate-900 border-slate-800 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-violet-400" />
        <h3 className="text-lg font-bold">Practice Next</h3>
      </div>
      <p className="text-xs text-slate-400 mb-4">
        Similar problems to deepen mastery
      </p>

      <div className="space-y-2">
        {top.map((p) => (
          <a
            key={p.leetcodeNumber}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-violet-500/50 transition-colors"
          >
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <span className="text-xs text-slate-500 font-mono">#{p.leetcodeNumber}</span>
              <span className="text-sm text-slate-200 truncate">{p.title}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-2">
              <Badge
                variant="outline"
                className={`text-[10px] ${
                  p.difficulty === "easy" ? "border-emerald-600/40 text-emerald-400"
                  : p.difficulty === "medium" ? "border-amber-600/40 text-amber-400"
                  : "border-red-600/40 text-red-400"
                }`}
              >
                {p.difficulty}
              </Badge>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </div>
          </a>
        ))}
      </div>
    </Card>
  );
}

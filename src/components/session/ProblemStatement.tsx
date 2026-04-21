"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Problem } from "@/types";
import { ExternalLink } from "lucide-react";

interface ProblemStatementProps {
  problem: Problem;
}

export default function ProblemStatement({ problem }: ProblemStatementProps) {
  return (
    <Card className="bg-slate-900 border-slate-800 overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-slate-800">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <h2 className="text-base font-bold text-white">{problem.title}</h2>
            <p className="text-xs text-slate-500 mt-1">LeetCode #{problem.leetcodeNumber}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge
            variant="outline"
            className={`border-0 text-xs font-semibold ${
              problem.difficulty === "easy"
                ? "bg-emerald-500/20 text-emerald-300"
                : problem.difficulty === "medium"
                  ? "bg-amber-500/20 text-amber-300"
                  : "bg-red-500/20 text-red-300"
            }`}
          >
            {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
          </Badge>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 text-sm text-slate-300">
          <div>
            <h3 className="font-semibold text-slate-100 mb-2">Description</h3>
            <p className="text-slate-400 leading-relaxed whitespace-pre-wrap">
              {problem.description || problem.approach || "A classic coding interview problem."}
            </p>
          </div>

          {problem.examples && problem.examples.length > 0 && (
            <div>
              <h3 className="font-semibold text-slate-100 mb-2">Examples</h3>
              <div className="space-y-3">
                {problem.examples.map((ex, i) => (
                  <div key={i} className="bg-slate-800/50 rounded p-3 border border-slate-700">
                    <div className="text-xs text-slate-500 mb-1">Example {i + 1}</div>
                    <div className="font-mono text-xs space-y-1 text-slate-300">
                      <div>
                        <span className="text-slate-500">Input:</span> {ex.input}
                      </div>
                      <div>
                        <span className="text-slate-500">Output:</span> {ex.output}
                      </div>
                      {ex.explanation && (
                        <div>
                          <span className="text-slate-500">Explain:</span> {ex.explanation}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="font-semibold text-slate-100 mb-2">Complexity</h3>
            <div className="space-y-1 text-slate-400 text-xs font-mono">
              <div>
                Time: <span className="text-slate-300">{problem.timeComplexity}</span>
              </div>
              <div>
                Space: <span className="text-slate-300">{problem.spaceComplexity}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-slate-100 mb-2">Tags</h3>
            <div className="flex flex-wrap gap-1">
              {problem.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs bg-slate-800 text-slate-300">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <h3 className="font-semibold text-slate-100 mb-2 text-xs">Companies Asking This</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {problem.companies.map((company) => (
                <Badge
                  key={company}
                  variant="outline"
                  className="bg-indigo-500/10 text-indigo-300 border-indigo-500/30 text-xs capitalize"
                >
                  {company}
                </Badge>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800">
            <a
              href={problem.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-xs font-medium"
            >
              View on LeetCode
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </ScrollArea>
    </Card>
  );
}

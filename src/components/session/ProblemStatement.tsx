"use client";

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Problem } from "@/types";
import {
  ExternalLink,
  Lightbulb,
  AlertTriangle,
  Gauge,
  Building2,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { getEdgeCases, getExpectedComplexity } from "@/lib/edge-cases";

interface ProblemStatementProps {
  problem: Problem;
}

export default function ProblemStatement({ problem }: ProblemStatementProps) {
  const [showHints, setShowHints] = useState(false);
  const [showEdgeCases, setShowEdgeCases] = useState(false);
  const anyProblem = problem as any;
  const hints: string[] = anyProblem.hints || [];
  const contentHtml: string = anyProblem.contentHtml || "";
  const topicTagsLeet: string[] = anyProblem.topicTagsLeet || [];
  const edgeCases = getEdgeCases(problem.leetcodeNumber);
  const expectedComplexity = getExpectedComplexity(problem.leetcodeNumber);

  const diffStyle =
    problem.difficulty === "easy"
      ? "text-emerald-300 ring-emerald-500/30 bg-emerald-500/10"
      : problem.difficulty === "medium"
        ? "text-amber-300 ring-amber-500/30 bg-amber-500/10"
        : "text-red-300 ring-red-500/30 bg-red-500/10";

  return (
    <div className="session-pane h-full flex flex-col overflow-hidden">
      {/* Header strip */}
      <div className="px-5 py-4 border-b hairline border-b-slate-800/60">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="session-eyebrow">Problem</span>
            <span className="session-eyebrow text-slate-600">·</span>
            <span className="num-badge text-[11px] text-slate-500">
              LC #{problem.leetcodeNumber}
            </span>
          </div>
          <span
            className={`text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded ring-1 ${diffStyle}`}
          >
            {problem.difficulty}
          </span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight leading-tight">
          {problem.title}
        </h2>
      </div>

      <ScrollArea className="flex-1 thin-scroll">
        <div className="px-5 py-5 space-y-6 text-sm text-slate-300">
          {/* Description */}
          <section>
            <SectionLabel>Description</SectionLabel>
            {contentHtml ? (
              <div
                className="problem-content text-slate-300 leading-[1.7]"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
            ) : (
              <p className="text-slate-300 leading-[1.7] whitespace-pre-wrap">
                {problem.description ||
                  problem.approach ||
                  "A classic coding interview problem."}
              </p>
            )}
          </section>

          {/* Examples */}
          {problem.examples && problem.examples.length > 0 && (
            <section>
              <SectionLabel>Examples</SectionLabel>
              <div className="space-y-3">
                {problem.examples.map((ex, i) => (
                  <div
                    key={i}
                    className="bg-black/40 rounded-md ring-1 ring-slate-800/80 overflow-hidden"
                  >
                    <div className="px-3 py-1.5 border-b border-slate-800/60 flex items-center gap-2">
                      <span className="text-[10px] font-mono text-slate-500 tracking-wider">
                        EXAMPLE {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="px-3 py-3 font-mono text-[12px] space-y-1.5 text-slate-200">
                      <div className="flex gap-2">
                        <span className="text-violet-400/80 select-none">
                          in
                        </span>
                        <span>{ex.input}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-emerald-400/80 select-none">
                          out
                        </span>
                        <span>{ex.output}</span>
                      </div>
                      {ex.explanation && (
                        <div className="flex gap-2 pt-1 border-t border-slate-800/40 mt-2">
                          <span className="text-slate-500 select-none">//</span>
                          <span className="text-slate-400">
                            {ex.explanation}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Hints */}
          {hints.length > 0 && (
            <section>
              <Disclosure
                open={showHints}
                onToggle={() => setShowHints(!showHints)}
                icon={<Lightbulb className="w-3.5 h-3.5 text-amber-400" />}
                label={`Hints (${hints.length})`}
                accent="amber"
              />
              {showHints && (
                <ul className="mt-3 space-y-2">
                  {hints.map((h, i) => (
                    <li
                      key={i}
                      className="text-xs text-slate-300 bg-amber-500/[0.04] border-l-2 border-amber-500/40 pl-3 py-2 pr-3 rounded-r"
                    >
                      <span className="font-semibold text-amber-200">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="mx-2 text-amber-500/40">·</span>
                      <span dangerouslySetInnerHTML={{ __html: h }} />
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          {/* Edge cases */}
          {edgeCases.length > 0 && (
            <section>
              <Disclosure
                open={showEdgeCases}
                onToggle={() => setShowEdgeCases(!showEdgeCases)}
                icon={<AlertTriangle className="w-3.5 h-3.5 text-red-400" />}
                label={`Edge Cases (${edgeCases.length})`}
                accent="red"
              />
              {showEdgeCases && (
                <ul className="mt-3 space-y-2">
                  {edgeCases.map((ec, i) => (
                    <li
                      key={i}
                      className="text-xs bg-red-500/[0.04] border-l-2 border-red-500/40 pl-3 py-2 pr-3 rounded-r space-y-1"
                    >
                      <div className="text-red-200 font-semibold">
                        {ec.label}
                      </div>
                      <div className="font-mono text-[11px] text-slate-400">
                        {ec.input}
                      </div>
                      <div className="font-mono text-[11px] text-slate-300">
                        →&nbsp;{ec.expected}
                      </div>
                      <div className="text-slate-500 italic">{ec.why}</div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          {/* Complexity */}
          <section>
            <SectionLabel>
              <Gauge className="w-3 h-3 inline mr-1.5 -mt-0.5" />
              Expected Complexity
            </SectionLabel>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-black/40 rounded-md ring-1 ring-slate-800 p-3">
                <div className="text-[9px] tracking-widest text-slate-500 font-mono uppercase mb-1">
                  Time
                </div>
                <div className="font-mono text-sm text-cyan-300">
                  {expectedComplexity?.time || problem.timeComplexity}
                </div>
              </div>
              <div className="bg-black/40 rounded-md ring-1 ring-slate-800 p-3">
                <div className="text-[9px] tracking-widest text-slate-500 font-mono uppercase mb-1">
                  Space
                </div>
                <div className="font-mono text-sm text-cyan-300">
                  {expectedComplexity?.space || problem.spaceComplexity}
                </div>
              </div>
            </div>
            {expectedComplexity?.note && (
              <div className="text-[11px] text-slate-500 italic mt-2 leading-relaxed">
                {expectedComplexity.note}
              </div>
            )}
          </section>

          {/* Tags */}
          <section>
            <SectionLabel>Tags</SectionLabel>
            <div className="flex flex-wrap gap-1.5">
              {(topicTagsLeet.length > 0 ? topicTagsLeet : problem.tags).map(
                (tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800/60 text-slate-300 ring-1 ring-slate-700/60"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </section>

          {/* Companies */}
          <section>
            <SectionLabel>
              <Building2 className="w-3 h-3 inline mr-1.5 -mt-0.5" />
              Asked at
            </SectionLabel>
            <div className="flex flex-wrap gap-1.5">
              {problem.companies.map((company) => (
                <span
                  key={company}
                  className="text-[11px] px-2 py-0.5 rounded bg-violet-500/10 text-violet-300 ring-1 ring-violet-500/25 capitalize"
                >
                  {company}
                </span>
              ))}
            </div>
          </section>

          <div className="pt-4 border-t border-slate-800/60">
            <a
              href={problem.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 text-xs font-medium transition group"
            >
              View on LeetCode
              <ExternalLink className="w-3 h-3 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="session-eyebrow text-slate-400 mb-3 flex items-center">
      {children}
    </h3>
  );
}

function Disclosure({
  open,
  onToggle,
  icon,
  label,
  accent,
}: {
  open: boolean;
  onToggle: () => void;
  icon: React.ReactNode;
  label: string;
  accent: "amber" | "red";
}) {
  const text = accent === "amber" ? "text-amber-300" : "text-red-300";
  return (
    <button
      onClick={onToggle}
      className={`flex items-center justify-between w-full px-3 py-2 rounded-md ring-1 ring-slate-800 hover:ring-slate-700 bg-black/30 transition group`}
    >
      <span className="flex items-center gap-2 text-xs font-semibold">
        {icon}
        <span className={text}>{label}</span>
      </span>
      <ChevronDown
        className={`w-3.5 h-3.5 text-slate-500 transition ${open ? "rotate-180" : ""}`}
      />
    </button>
  );
}

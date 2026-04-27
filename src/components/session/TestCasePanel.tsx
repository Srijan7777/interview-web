"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, ChevronRight, Zap } from "lucide-react";
import { TestResultItem } from "@/types";

interface TestCasePanelProps {
  results: TestResultItem[];
  running: boolean;
  passed: number;
  total: number;
}

export default function TestCasePanel({
  results,
  passed,
  total,
}: TestCasePanelProps) {
  const [activeCase, setActiveCase] = useState(0);

  if (results.length === 0) return null;

  const currentResult = results[activeCase];
  const passRate = total > 0 ? Math.round((passed / total) * 100) : 0;

  return (
    <div className="session-pane h-full flex flex-col overflow-hidden">
      {/* Header bar */}
      <div className="px-4 py-2.5 border-b hairline border-b-slate-800/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="session-eyebrow text-slate-300">Test Results</span>
          <div className="flex items-center gap-1.5">
            <span className="num-badge text-sm font-bold text-white">
              {passed}
            </span>
            <span className="text-slate-600 text-sm">/</span>
            <span className="num-badge text-sm font-bold text-slate-400">
              {total}
            </span>
            <span
              className={`ml-1 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                passRate === 100
                  ? "bg-emerald-500/15 text-emerald-300"
                  : "bg-red-500/15 text-red-300"
              }`}
            >
              {passRate}%
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
          <Zap className="w-3 h-3 text-cyan-400" />
          case #{activeCase + 1}
        </div>
      </div>

      {/* Body — case nav rail + detail */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left rail: case list */}
        <div className="w-[180px] flex-shrink-0 border-r hairline border-r-slate-800/60 overflow-y-auto thin-scroll bg-black/20">
          {results.map((result, idx) => {
            const isActive = idx === activeCase;
            const isPass = !result.error && result.passed;
            return (
              <button
                key={idx}
                onClick={() => setActiveCase(idx)}
                className={`w-full text-left px-3 py-2.5 border-b border-slate-800/40 transition flex items-center gap-2 ${
                  isActive
                    ? "bg-violet-500/10 border-l-2 border-l-violet-400"
                    : "border-l-2 border-l-transparent hover:bg-slate-800/30"
                }`}
              >
                {result.error ? (
                  <XCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                ) : isPass ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                )}
                <span
                  className={`text-xs font-mono truncate ${isActive ? "text-white" : "text-slate-400"}`}
                >
                  {result.label || `case ${idx + 1}`}
                </span>
                {isActive && (
                  <ChevronRight className="w-3 h-3 ml-auto text-violet-400 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Detail */}
        <div className="flex-1 overflow-y-auto thin-scroll p-4 space-y-3 min-w-0">
          {currentResult && (
            <>
              {/* Status banner */}
              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-md ring-1 ${
                  currentResult.error
                    ? "ring-red-500/30 bg-red-500/[0.06]"
                    : currentResult.passed
                      ? "ring-emerald-500/30 bg-emerald-500/[0.06]"
                      : "ring-red-500/30 bg-red-500/[0.06]"
                }`}
              >
                {currentResult.error ? (
                  <>
                    <XCircle className="w-4 h-4 text-red-400" />
                    <span className="text-xs font-bold text-red-300 uppercase tracking-wider">
                      Runtime Error
                    </span>
                  </>
                ) : currentResult.passed ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                      Accepted
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-red-400" />
                    <span className="text-xs font-bold text-red-300 uppercase tracking-wider">
                      Wrong Answer
                    </span>
                  </>
                )}
              </div>

              {/* Input */}
              <DiffBlock
                label="Input"
                content={String(currentResult.testCase ?? "")}
                tone="neutral"
              />

              {/* Error */}
              {currentResult.error && (
                <DiffBlock
                  label="Stderr"
                  content={currentResult.error}
                  tone="error"
                />
              )}

              {/* Expected vs actual */}
              {!currentResult.error && (
                <div className="grid grid-cols-1 gap-3">
                  <DiffBlock
                    label="Expected"
                    content={currentResult.expected || ""}
                    tone="neutral"
                  />
                  {currentResult.actual !== undefined && (
                    <DiffBlock
                      label="Your Output"
                      content={String(currentResult.actual)}
                      tone={currentResult.passed ? "pass" : "fail"}
                    />
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function DiffBlock({
  label,
  content,
  tone,
}: {
  label: string;
  content: string;
  tone: "neutral" | "pass" | "fail" | "error";
}) {
  const ring =
    tone === "pass"
      ? "ring-emerald-500/30"
      : tone === "fail"
        ? "ring-red-500/30"
        : tone === "error"
          ? "ring-red-500/40"
          : "ring-slate-800";
  const bg =
    tone === "pass"
      ? "bg-emerald-500/[0.04]"
      : tone === "fail"
        ? "bg-red-500/[0.04]"
        : tone === "error"
          ? "bg-red-500/[0.05]"
          : "bg-black/40";
  const labelTone =
    tone === "pass"
      ? "text-emerald-300"
      : tone === "fail"
        ? "text-red-300"
        : tone === "error"
          ? "text-red-300"
          : "text-slate-400";
  const textTone =
    tone === "pass"
      ? "text-emerald-100"
      : tone === "fail" || tone === "error"
        ? "text-red-100"
        : "text-slate-200";

  return (
    <div className={`rounded-md ring-1 ${ring} ${bg} overflow-hidden`}>
      <div className="px-3 py-1.5 border-b border-slate-800/60 flex items-center justify-between">
        <span className={`session-eyebrow ${labelTone}`}>{label}</span>
      </div>
      <div className={`mono-diff px-3 py-2.5 ${textTone} max-h-48 overflow-auto thin-scroll`}>
        {content}
      </div>
    </div>
  );
}

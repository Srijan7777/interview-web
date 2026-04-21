"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import dynamic from "next/dynamic";
import {
  CheckCircle2,
  AlertCircle,
  Zap,
  BookOpen,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { SessionReport } from "@/types";

const MonacoEditor = dynamic(() => import("@/components/session/MonacoEditor"), {
  ssr: false,
});

interface PageProps {
  params: Promise<{ sessionId: string }>;
}

export default function ReportPage({ params }: PageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sessionId, setSessionId] = React.useState("");

  React.useEffect(() => {
    params.then((p) => setSessionId(p.sessionId));
  }, [params]);

  const dataStr = searchParams.get("data");
  const report: SessionReport | null = dataStr ? JSON.parse(decodeURIComponent(dataStr)) : null;

  if (!report) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <Card className="bg-slate-900 border-slate-800 max-w-md">
          <div className="p-6 flex flex-col items-center gap-4">
            <AlertCircle className="w-12 h-12 text-red-500" />
            <h2 className="text-xl font-bold">Report Not Found</h2>
            <p className="text-slate-400 text-center">
              Could not load your interview report. Please try again.
            </p>
            <Button onClick={() => router.push("/setup")} className="w-full">
              Start New Session
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const scoreColor =
    report.score.overall >= 8
      ? "text-emerald-400"
      : report.score.overall >= 6
        ? "text-amber-400"
        : "text-red-400";

  const scoreBgColor =
    report.score.overall >= 8
      ? "bg-emerald-500/10 border-emerald-500/30"
      : report.score.overall >= 6
        ? "bg-amber-500/10 border-amber-500/30"
        : "bg-red-500/10 border-red-500/30";

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="border-b border-slate-800 bg-black/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Session Report</h1>
            <p className="text-slate-400 text-sm mt-1">{report.problem.title}</p>
          </div>
          <Button
            onClick={() => router.push("/setup")}
            variant="outline"
            className="border-slate-700"
          >
            <ChevronRight className="w-4 h-4 mr-2" />
            Next Session
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Score Section */}
        <div className={`rounded-lg border p-8 mb-8 ${scoreBgColor}`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-300 mb-2">OVERALL SCORE</h2>
              <div className={`text-6xl font-black ${scoreColor}`}>
                {report.score.overall}/10
              </div>
              <p className="text-slate-400 mt-3">
                {report.score.overall >= 8
                  ? "Excellent work! You're interview ready."
                  : report.score.overall >= 6
                    ? "Good progress. Keep practicing weak areas."
                    : "Keep grinding. You'll get there!"}
              </p>
            </div>

            {/* Score Breakdown */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900/50 rounded p-4 border border-slate-800">
                <p className="text-xs text-slate-500 mb-1">Correctness</p>
                <p className="text-2xl font-bold text-cyan-400">
                  {report.score.breakdown.correctness}/10
                </p>
              </div>
              <div className="bg-slate-900/50 rounded p-4 border border-slate-800">
                <p className="text-xs text-slate-500 mb-1">Efficiency</p>
                <p className="text-2xl font-bold text-violet-400">
                  {report.score.breakdown.efficiency}/10
                </p>
              </div>
              <div className="bg-slate-900/50 rounded p-4 border border-slate-800">
                <p className="text-xs text-slate-500 mb-1">Clarity</p>
                <p className="text-2xl font-bold text-amber-400">
                  {report.score.breakdown.clarity}/10
                </p>
              </div>
              <div className="bg-slate-900/50 rounded p-4 border border-slate-800">
                <p className="text-xs text-slate-500 mb-1">Completeness</p>
                <p className="text-2xl font-bold text-emerald-400">
                  {report.score.breakdown.completeness}/10
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Strengths */}
            {report.strengths.length > 0 && (
              <Card className="bg-slate-900 border-slate-800 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-lg font-bold">What Went Well</h3>
                </div>
                <ul className="space-y-2">
                  {report.strengths.map((s, i) => (
                    <li key={i} className="text-slate-300 text-sm">
                      ✓ {s}
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {/* Issues */}
            {report.issues.length > 0 && (
              <Card className="bg-slate-900 border-slate-800 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <h3 className="text-lg font-bold">Issues Found</h3>
                </div>
                <ul className="space-y-2">
                  {report.issues.map((issue, i) => (
                    <li key={i} className="text-slate-300 text-sm">
                      ✗ {issue}
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {/* Improvements */}
            {report.improvements.length > 0 && (
              <Card className="bg-slate-900 border-slate-800 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-5 h-5 text-amber-400" />
                  <h3 className="text-lg font-bold">Next Time</h3>
                </div>
                <ul className="space-y-2">
                  {report.improvements.map((imp, i) => (
                    <li key={i} className="text-slate-300 text-sm">
                      → {imp}
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Missing */}
            {report.missing.length > 0 && (
              <Card className="bg-slate-900 border-slate-800 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-lg font-bold">What's Missing</h3>
                </div>
                <ul className="space-y-2">
                  {report.missing.map((m, i) => (
                    <li key={i} className="text-slate-300 text-sm">
                      • {m}
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {/* Optimal Approach */}
            <Card className="bg-slate-900 border-slate-800 p-6">
              <h3 className="text-lg font-bold mb-4">Optimal Approach</h3>
              <p className="text-slate-300 text-sm mb-4">
                {report.optimalApproach.summary}
              </p>
              {report.optimalApproach.timeComplexity && (
                <div className="text-xs text-slate-400 space-y-1 font-mono">
                  <div>
                    <span className="text-slate-500">Time:</span>{" "}
                    {report.optimalApproach.timeComplexity}
                  </div>
                  <div>
                    <span className="text-slate-500">Space:</span>{" "}
                    {report.optimalApproach.spaceComplexity}
                  </div>
                </div>
              )}
            </Card>

            {/* Key Insights */}
            {report.optimalApproach.keyInsights.length > 0 && (
              <Card className="bg-slate-900 border-slate-800 p-6">
                <h3 className="text-lg font-bold mb-3">Key Insights</h3>
                <ul className="space-y-2">
                  {report.optimalApproach.keyInsights.map((insight, i) => (
                    <li key={i} className="text-slate-300 text-sm">
                      💡 {insight}
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>
        </div>

        {/* Optimal Code */}
        {report.optimalApproach.code && (
          <Card className="bg-slate-900 border-slate-800 mt-8 overflow-hidden">
            <div className="p-6 border-b border-slate-800">
              <h3 className="text-lg font-bold">Optimal Solution</h3>
            </div>
            <div className="h-96">
              <MonacoEditor
                value={report.optimalApproach.code}
                onChange={() => {}}
                language="javascript"
                height="100%"
                readOnly
              />
            </div>
          </Card>
        )}

        {/* Next Steps */}
        <Card className="bg-slate-900 border-slate-800 p-6 mt-8">
          <h3 className="text-lg font-bold mb-4">Recommended Next Steps</h3>
          <div className="space-y-3">
            {report.recommendation.shouldRetry && (
              <p className="text-slate-300 text-sm">
                ✓ <strong>Retry this problem</strong> in a few days to solidify your understanding.
              </p>
            )}
            {report.recommendation.suggestedTopics.length > 0 && (
              <div>
                <p className="text-slate-300 text-sm mb-2">
                  <strong>Study these topics:</strong>
                </p>
                <div className="flex flex-wrap gap-2">
                  {report.recommendation.suggestedTopics.map((topic) => (
                    <Badge key={topic} variant="secondary" className="bg-slate-800">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            <p className="text-slate-300 text-sm">
              Next target difficulty: <Badge>{report.recommendation.nextDifficulty}</Badge>
            </p>
          </div>
        </Card>

        {/* CTAs */}
        <div className="flex gap-3 mt-8 mb-8">
          <Button
            onClick={() => router.push("/setup")}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700"
          >
            <ChevronRight className="w-4 h-4 mr-2" />
            New Session
          </Button>
          <Button
            onClick={() => router.push("/dashboard")}
            variant="outline"
            className="flex-1 border-slate-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}

import React from "react";

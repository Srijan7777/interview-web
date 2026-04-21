"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Play, Clock } from "lucide-react";
import { Problem, SessionStartResponse, SessionTestResult } from "@/types";
import SessionTimer from "@/components/session/SessionTimer";
import ProblemStatement from "@/components/session/ProblemStatement";
import CompanyLogos from "@/components/session/CompanyLogos";
import TestCasePanel from "@/components/session/TestCasePanel";
import { formatTime } from "@/lib/utils";

const MonacoEditor = dynamic(() => import("@/components/session/MonacoEditor"), {
  ssr: false,
  loading: () => <Skeleton className="h-96 bg-slate-800" />,
});

interface PageProps {
  params: Promise<{ type: string }>;
}

const LANGUAGES = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
];

export default function SessionPage({ params }: PageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sessionData, setSessionData] = useState<SessionStartResponse | null>(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [testResults, setTestResults] = useState<SessionTestResult | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [sessionType, setSessionType] = useState("");
  const [experience, setExperience] = useState("");
  const [language, setLanguage] = useState("javascript");

  useEffect(() => {
    const initSession = async () => {
      try {
        const resolvedParams = await params;
        const exp = searchParams.get("exp") || "1-3";

        setSessionType(resolvedParams.type);
        setExperience(exp);

        const response = await fetch("/api/session/start", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: resolvedParams.type,
            experience: exp,
          }),
        });

        const data = await response.json();
        setSessionData(data);

        // Load code from localStorage if available, otherwise use code stub
        const savedCode = localStorage.getItem(`code-${data.sessionId}`);
        if (savedCode) {
          setCode(savedCode);
        } else {
          // Import stubs dynamically
          const { getCodeStub } = await import("@/lib/problem-stubs");
          const stub = getCodeStub(data.problem.leetcodeNumber, "javascript");
          setCode(stub);
        }
      } catch (error) {
        console.error("Failed to start session:", error);
      } finally {
        setLoading(false);
      }
    };

    initSession();
  }, [params, searchParams]);

  // Auto-save code every 30s
  useEffect(() => {
    const interval = setInterval(() => {
      if (sessionData && code) {
        localStorage.setItem(`code-${sessionData.sessionId}`, code);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [sessionData, code]);

  const handleTimerExpire = async () => {
    await submitSession("stuck");
  };

  const handleLanguageChange = async (newLanguage: string) => {
    setLanguage(newLanguage);

    if (!sessionData) return;

    const { getCodeStub } = await import("@/lib/problem-stubs");
    const stub = getCodeStub(sessionData.problem.leetcodeNumber, newLanguage);
    setCode(stub);
    setTestResults(null);
    setShowResults(false);
  };

  const handleRunTests = async () => {
    if (!sessionData) return;

    setSubmitting(true);
    try {
      const response = await fetch("/api/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          language,
          problemId: sessionData.problem.leetcodeNumber,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.error || "Failed to run tests");
        return;
      }

      setTestResults(result);
      setShowResults(true);
    } catch (error) {
      console.error("Error running tests:", error);
      alert("Failed to run tests");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (result: "solved" | "partial" | "stuck" = "solved") => {
    setSubmitting(true);

    try {
      if (!sessionData) return;

      // Record session completion
      const startTime = new Date(sessionData.startedAt).getTime();
      const endTime = Date.now();
      const timeMinutes = Math.round((endTime - startTime) / 60000);

      const completeRes = await fetch("/api/session/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: sessionData.sessionId,
          problemId: sessionData.problem.id,
          topic: sessionData.problem.topic,
          result,
          score: 3,
          timeMinutes,
          notes: "",
          difficulty: sessionData.problem.difficulty,
        }),
      });

      if (!completeRes.ok) throw new Error("Failed to complete session");

      // Generate report
      const reportRes = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: sessionData.sessionId,
          type: "dsa",
          problem: sessionData.problem,
          code,
          experience,
          timeTakenMinutes: timeMinutes,
          allocatedMinutes: Math.round(sessionData.duration / 60),
        }),
      });

      if (!reportRes.ok) throw new Error("Failed to generate report");

      const report = await reportRes.json();

      // Clear saved code
      localStorage.removeItem(`code-${sessionData.sessionId}`);

      // Redirect to report
      router.push(`/report/${sessionData.sessionId}?data=${encodeURIComponent(JSON.stringify(report))}`);
    } catch (error) {
      console.error("Error submitting session:", error);
      alert("Failed to submit session. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const submitSession = (result: "solved" | "partial" | "stuck") => {
    handleSubmit(result);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Skeleton className="h-8 w-48 mx-auto mb-4" />
          <Skeleton className="h-4 w-96 mx-auto" />
        </div>
      </div>
    );
  }

  if (!sessionData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <Card className="bg-slate-900 border-slate-800 max-w-md">
          <div className="p-6 flex flex-col items-center gap-4">
            <AlertCircle className="w-12 h-12 text-red-500" />
            <h2 className="text-xl font-bold">Failed to Load Session</h2>
            <p className="text-slate-400 text-center">
              Could not initialize your interview session. Please try again.
            </p>
            <Button onClick={() => router.push("/setup")} className="w-full">
              Back to Setup
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header with Timer */}
      <div className="border-b border-slate-800 bg-black/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-lg font-bold text-white">{sessionData.problem.title}</h1>
            <div className="flex gap-2 mt-2 mb-3">
              <Badge variant="outline" className="border-slate-700">
                {sessionData.problem.difficulty}
              </Badge>
              <Badge variant="outline" className="border-slate-700">
                {sessionData.problem.topic.replace(/-/g, " ")}
              </Badge>
            </div>
            <CompanyLogos companies={sessionData.problem.companies} />
          </div>

          <SessionTimer
            durationSeconds={sessionData.duration}
            onExpire={handleTimerExpire}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-6 max-w-7xl mx-auto w-full px-6 py-6 overflow-hidden">
        {/* Problem Panel */}
        <div className="w-96 flex-shrink-0 flex flex-col gap-4 overflow-auto">
          <ProblemStatement problem={sessionData.problem} />

          <Card className="bg-slate-900 border-slate-800 p-4">
            <h3 className="font-semibold mb-3 text-sm">Companies Asking This</h3>
            <div className="flex flex-wrap gap-2">
              {sessionData.problem.companies.map((company) => (
                <Badge key={company} variant="secondary" className="text-xs">
                  {company}
                </Badge>
              ))}
            </div>
          </Card>

          <Card className="bg-slate-900 border-slate-800 p-4">
            <h3 className="font-semibold mb-3 text-sm">Optimal Solution</h3>
            <p className="text-slate-400 text-xs leading-relaxed">{sessionData.problem.approach}</p>
            <div className="mt-3 space-y-1 text-xs text-slate-400">
              <div>
                <span className="text-slate-500">Time:</span> {sessionData.problem.timeComplexity}
              </div>
              <div>
                <span className="text-slate-500">Space:</span> {sessionData.problem.spaceComplexity}
              </div>
            </div>
          </Card>
        </div>

        <Separator orientation="vertical" className="bg-slate-800" />

        {/* Editor Panel */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          <Card className="bg-slate-900 border-slate-800 flex-1 overflow-hidden">
            <MonacoEditor value={code} onChange={setCode} language="javascript" />
          </Card>

          {/* Language Selector & Action Buttons */}
          <div className="space-y-3 flex flex-col h-full">
            {/* Language Selector */}
            <div className="flex gap-2 items-center">
              <label className="text-sm font-semibold text-slate-300">Language:</label>
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="px-3 py-2 rounded bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={handleRunTests}
                disabled={submitting}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                <Play className="w-4 h-4 mr-2" />
                {submitting ? "Running..." : "Run"}
              </Button>
              <Button
                onClick={() => submitSession("solved")}
                disabled={submitting}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Submit
              </Button>
            </div>

            {/* Submit Verdict Banner */}
            {showResults && testResults && (
              <div
                className={`p-3 rounded-lg border text-sm font-semibold ${
                  testResults.passed === testResults.total
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                    : testResults.results.some((r) => r.error)
                      ? "bg-red-500/10 border-red-500/30 text-red-300"
                      : "bg-red-500/10 border-red-500/30 text-red-300"
                }`}
              >
                {testResults.passed === testResults.total
                  ? `✓ Accepted — ${testResults.passed}/${testResults.total} test cases passed`
                  : testResults.results.some((r) => r.error)
                    ? "✗ Compilation Error"
                    : `✗ Wrong Answer — ${testResults.passed}/${testResults.total} test cases passed`}
              </div>
            )}

            {/* Test Cases Panel */}
            {showResults && testResults && (
              <TestCasePanel
                results={testResults.results}
                running={submitting}
                passed={testResults.passed}
                total={testResults.total}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

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
import { Problem, SessionStartResponse } from "@/types";
import SessionTimer from "@/components/session/SessionTimer";
import ProblemStatement from "@/components/session/ProblemStatement";
import { formatTime } from "@/lib/utils";

const MonacoEditor = dynamic(() => import("@/components/session/MonacoEditor"), {
  ssr: false,
  loading: () => <Skeleton className="h-96 bg-slate-800" />,
});

interface PageProps {
  params: Promise<{ type: string }>;
}

export default function SessionPage({ params }: PageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sessionData, setSessionData] = useState<SessionStartResponse | null>(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [sessionType, setSessionType] = useState("");
  const [experience, setExperience] = useState("");

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

        // Load code from localStorage if available
        const savedCode = localStorage.getItem(`code-${data.sessionId}`);
        if (savedCode) {
          setCode(savedCode);
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
          <div>
            <h1 className="text-lg font-bold text-white">{sessionData.problem.title}</h1>
            <div className="flex gap-2 mt-2">
              <Badge variant="outline" className="border-slate-700">
                {sessionData.problem.difficulty}
              </Badge>
              <Badge variant="outline" className="border-slate-700">
                {sessionData.problem.topic.replace(/-/g, " ")}
              </Badge>
            </div>
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

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={() => submitSession("solved")}
              disabled={submitting}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Play className="w-4 h-4 mr-2" />
              {submitting ? "Submitting..." : "Submit Solution"}
            </Button>
            <Button
              onClick={() => submitSession("partial")}
              disabled={submitting}
              variant="outline"
              className="flex-1 border-slate-700"
            >
              Partial Solution
            </Button>
            <Button
              onClick={() => submitSession("stuck")}
              disabled={submitting}
              variant="outline"
              className="flex-1 border-slate-700"
            >
              Give Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Save } from "lucide-react";
import { SessionStartResponse, HLDScenario, HLDFormData } from "@/types";
import SessionTimer from "@/components/session/SessionTimer";
import HLDTemplate from "@/components/session/HLDTemplate";

const ExcalidrawCanvas = dynamic(
  () => import("@/components/session/ExcalidrawCanvas").then((mod) => ({ default: mod.ExcalidrawCanvas })),
  {
    ssr: false,
    loading: () => <Skeleton className="h-96 bg-slate-800" />,
  }
);

const STORAGE_KEY_PREFIX = "hld-form-";

export default function HLDDesignPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sessionData, setSessionData] = useState<SessionStartResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [hldFormData, setHldFormData] = useState<HLDFormData>({
    functionalReqs: "",
    nonFunctionalReqs: "",
    entities: "",
    apiDesign: "",
    nfrPlan: "",
  });
  const excalidrawRef = useRef<any>(null);

  const sessionId = searchParams.get("sessionId");
  const experience = searchParams.get("exp") || "1-3";

  useEffect(() => {
    const initSession = async () => {
      try {
        if (!sessionId) {
          throw new Error("Missing sessionId");
        }

        // Fetch cached session data from read API
        const response = await fetch(`/api/session/read?sessionId=${sessionId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch session data");
        }

        const data = await response.json();
        setSessionData(data);

        // Load form state from sessionStorage
        const savedForm = localStorage.getItem(`${STORAGE_KEY_PREFIX}${sessionId}`);
        if (savedForm) {
          setHldFormData(JSON.parse(savedForm));
        }
      } catch (error) {
        console.error("Failed to load session:", error);
      } finally {
        setLoading(false);
      }
    };

    initSession();
  }, [sessionId]);

  // Auto-save form state every 30s
  useEffect(() => {
    if (!sessionId) return;

    const interval = setInterval(() => {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}${sessionId}`, JSON.stringify(hldFormData));
    }, 30000);

    return () => clearInterval(interval);
  }, [sessionId, hldFormData]);

  const handleTimerExpire = async () => {
    await handleHLDSubmit();
  };

  const handleHLDSubmit = async () => {
    if (!sessionData || !sessionData.scenario) return;

    setSubmitting(true);

    try {
      // Get Excalidraw description
      const excalidrawDescription = excalidrawRef.current?.getDescription?.() || "No diagram provided";

      // Build combined diagram description
      const diagramDescription = `
Functional Requirements:
${hldFormData.functionalReqs}

Non-Functional Requirements:
${hldFormData.nonFunctionalReqs}

Core Entities:
${hldFormData.entities}

API Design:
${hldFormData.apiDesign}

NFR Deep Dives:
${hldFormData.nfrPlan}

Architecture Diagram:
${excalidrawDescription}
`.trim();

      // Record session completion
      const startTime = new Date(sessionData.startedAt).getTime();
      const endTime = Date.now();
      const timeMinutes = Math.round((endTime - startTime) / 60000);

      const completeRes = await fetch("/api/session/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: sessionData.sessionId,
          problemId: sessionData.scenario.id,
          topic: "system-design",
          result: "solved",
          score: 3,
          timeMinutes,
          notes: "",
          difficulty: sessionData.scenario.complexity,
        }),
      });

      if (!completeRes.ok) throw new Error("Failed to complete session");

      // Generate HLD report
      const reportRes = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: sessionData.sessionId,
          type: "hld",
          scenario: sessionData.scenario,
          diagramDescription,
          experience,
          timeTakenMinutes: timeMinutes,
          allocatedMinutes: Math.round(sessionData.duration / 60),
        }),
      });

      if (!reportRes.ok) throw new Error("Failed to generate report");

      const report = await reportRes.json();

      // Clear saved form data
      localStorage.removeItem(`${STORAGE_KEY_PREFIX}${sessionData.sessionId}`);

      // Redirect to report
      setTimeout(() => {
        router.push(`/report/${sessionData.sessionId}?data=${encodeURIComponent(JSON.stringify(report))}`);
      }, 1000);
    } catch (error) {
      console.error("Error submitting HLD session:", error);
      alert("Failed to submit session. Please try again.");
      setSubmitting(false);
    }
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

  if (!sessionData || !sessionData.scenario) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <Card className="bg-slate-900 border-slate-800 max-w-md">
          <div className="p-6 flex flex-col items-center gap-4">
            <AlertCircle className="w-12 h-12 text-red-500" />
            <h2 className="text-xl font-bold">Failed to Load Design Session</h2>
            <p className="text-slate-400 text-center">
              Could not initialize your design session. Please try again.
            </p>
            <Button onClick={() => router.push("/setup")} className="w-full">
              Back to Setup
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const scenario = sessionData.scenario;

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <div className="border-b border-slate-800 bg-black/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-lg font-bold text-white">{scenario.title}</h1>
            <div className="flex gap-2 mt-2">
              <Badge variant="outline" className="border-slate-700">
                {scenario.complexity}
              </Badge>
              <Badge variant="outline" className="border-slate-700">
                system-design
              </Badge>
            </div>
          </div>

          <SessionTimer durationSeconds={sessionData.duration} onExpire={handleTimerExpire} />
        </div>
      </div>

      {/* Main Content — Split Pane */}
      <div className="flex-1 flex gap-6 max-w-7xl mx-auto w-full px-6 py-6 overflow-hidden">
        {/* Left Panel — 45% */}
        <div className="w-[45%] flex-shrink-0 overflow-hidden">
          <HLDTemplate
            scenario={scenario}
            value={hldFormData}
            onChange={setHldFormData}
          />
        </div>

        {/* Right Panel — 55% */}
        <div className="w-[55%] flex flex-col gap-4 min-w-0 overflow-hidden">
          {/* Canvas */}
          <Card className="bg-slate-900 border-slate-800 flex-1 overflow-hidden min-h-0">
            <ExcalidrawCanvas ref={excalidrawRef} />
          </Card>

          {/* Submit Button */}
          <Button
            onClick={handleHLDSubmit}
            disabled={submitting}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <Save className="w-4 h-4 mr-2" />
            {submitting ? "Submitting..." : "Submit Design"}
          </Button>
        </div>
      </div>
    </div>
  );
}

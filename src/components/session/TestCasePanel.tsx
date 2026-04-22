"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, XCircle } from "lucide-react";
import { TestResultItem } from "@/types";

interface TestCasePanelProps {
  results: TestResultItem[];
  running: boolean;
  passed: number;
  total: number;
}

export default function TestCasePanel({ results, running, passed, total }: TestCasePanelProps) {
  const [activeTab, setActiveTab] = useState("test-case");
  const [activeCase, setActiveCase] = useState(0);

  if (results.length === 0) {
    return null;
  }

  const currentResult = results[activeCase];

  return (
    <Card className="bg-slate-900 border-slate-800 h-full flex flex-col overflow-hidden">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="bg-slate-800 border-b border-slate-700 rounded-none w-full justify-start px-4">
          <TabsTrigger value="test-case" className="rounded-none">
            Input
          </TabsTrigger>
          <TabsTrigger value="output" className="rounded-none">
            Output
          </TabsTrigger>
        </TabsList>

        {/* Input Tab */}
        <TabsContent value="test-case" className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Test case selector tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {results.map((result, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCase(idx)}
                className={`px-3 py-1 rounded text-sm whitespace-nowrap transition ${
                  activeCase === idx
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {result.label}
              </button>
            ))}
          </div>

          {/* Input display */}
          {currentResult && (
            <div className="space-y-3">
              <div>
                <h4 className="text-xs font-semibold text-slate-300 mb-2">Test Input</h4>
                <div className="bg-black/50 border border-slate-700 rounded p-3 text-xs font-mono text-slate-200 overflow-x-auto max-h-64">
                  <pre className="whitespace-pre-wrap break-words">{currentResult.testCase}</pre>
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        {/* Output Tab */}
        <TabsContent value="output" className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Test case selector tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {results.map((result, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCase(idx)}
                className={`px-3 py-1 rounded text-sm whitespace-nowrap transition ${
                  activeCase === idx
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {result.label}
              </button>
            ))}
          </div>

          {/* Result display */}
          {currentResult && (
            <div className="space-y-3">
              {/* Status badge */}
              <div className="flex items-center gap-2">
                {currentResult.error ? (
                  <>
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <Badge className="bg-red-500/10 text-red-300 border-red-500/30">Error</Badge>
                  </>
                ) : currentResult.passed ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <Badge className="bg-emerald-500/10 text-emerald-300 border-emerald-500/30">Passed</Badge>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <Badge className="bg-red-500/10 text-red-300 border-red-500/30">Failed</Badge>
                  </>
                )}
              </div>

              {/* Error message */}
              {currentResult.error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                  <pre className="text-xs text-red-300 font-mono overflow-x-auto whitespace-pre-wrap">
                    {currentResult.error}
                  </pre>
                </div>
              )}

              {/* Expected output */}
              {!currentResult.error && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-300 mb-2">Expected Output</h4>
                  <div className="bg-black/50 border border-slate-700 rounded p-3 text-xs font-mono text-slate-200 overflow-x-auto max-h-40">
                    <pre className="whitespace-pre-wrap break-words">{currentResult.expected}</pre>
                  </div>
                </div>
              )}

              {/* Your output */}
              {!currentResult.error && currentResult.actual !== undefined && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-300 mb-2">Your Output</h4>
                  <div className={`rounded p-3 text-xs font-mono overflow-x-auto max-h-40 ${
                    currentResult.passed
                      ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-200"
                      : "bg-red-500/10 border border-red-500/30 text-red-200"
                  }`}>
                    <pre className="whitespace-pre-wrap break-words">{currentResult.actual}</pre>
                  </div>
                </div>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </Card>
  );
}

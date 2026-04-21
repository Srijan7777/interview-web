"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface TestResult {
  testCase: number;
  label: string;
  passed: boolean;
  expected: string;
  actual?: string;
  error?: string;
}

interface TestCasePanelProps {
  results: TestResult[] | null;
  running: boolean;
  passed: number;
  total: number;
}

export default function TestCasePanel({
  results,
  running,
  passed,
  total,
}: TestCasePanelProps) {
  if (!results || results.length === 0) {
    return (
      <Card className="bg-slate-900 border-slate-800 p-4">
        <p className="text-slate-400 text-sm">Run tests to see results here</p>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-900 border-slate-800 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-300">Results</span>
          <Badge
            variant="outline"
            className={`text-xs ${
              passed === total
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                : "bg-red-500/20 text-red-300 border-red-500/30"
            }`}
          >
            {passed}/{total} passed
          </Badge>
        </div>

        {running && (
          <span className="text-xs text-slate-400 animate-pulse">Running...</span>
        )}
      </div>

      {/* Test cases */}
      <Tabs defaultValue={`case-0`} className="w-full">
        <TabsList className="w-full rounded-none border-b border-slate-800 bg-slate-900">
          {results.map((result) => (
            <TabsTrigger
              key={result.testCase}
              value={`case-${result.testCase - 1}`}
              className={`text-xs ${
                result.passed
                  ? "text-emerald-400 hover:text-emerald-300"
                  : "text-red-400 hover:text-red-300"
              }`}
            >
              <span className="mr-1">
                {result.passed ? (
                  <CheckCircle2 className="w-3 h-3 inline" />
                ) : (
                  <AlertCircle className="w-3 h-3 inline" />
                )}
              </span>
              {result.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {results.map((result) => (
          <TabsContent key={result.testCase} value={`case-${result.testCase - 1}`}>
            <ScrollArea className="h-64 w-full">
              <div className="p-4 space-y-3">
                {result.error ? (
                  <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                    <div className="text-xs font-semibold text-red-300 mb-2">
                      Error
                    </div>
                    <div className="text-xs text-red-200 font-mono whitespace-pre-wrap break-words">
                      {result.error}
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Expected */}
                    <div>
                      <div className="text-xs font-semibold text-slate-400 mb-1">
                        Expected
                      </div>
                      <div className="bg-slate-800/50 rounded p-2 font-mono text-xs text-slate-300 break-words">
                        {result.expected}
                      </div>
                    </div>

                    {/* Actual */}
                    {result.actual && (
                      <div>
                        <div className="text-xs font-semibold text-slate-400 mb-1">
                          Your Output
                        </div>
                        <div
                          className={`rounded p-2 font-mono text-xs break-words ${
                            result.passed
                              ? "bg-emerald-500/10 text-emerald-300"
                              : "bg-red-500/10 text-red-300"
                          }`}
                        >
                          {result.actual}
                        </div>
                      </div>
                    )}

                    {/* Status */}
                    <div className="pt-2 border-t border-slate-700">
                      <div
                        className={`text-xs font-semibold ${
                          result.passed ? "text-emerald-400" : "text-red-400"
                        }`}
                      >
                        {result.passed ? "✓ Accepted" : "✗ Wrong Answer"}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
}

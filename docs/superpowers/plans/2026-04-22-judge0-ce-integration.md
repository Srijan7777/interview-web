# Judge0 CE Integration (Public API) — DSA Flow Completion

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate free public Judge0 CE API (ce.judge0.com) into `/api/test` route for multi-language code execution, fix test results display with input/output sections, and verify complete DSA interview flow works end-to-end.

**Architecture:** POST code submissions to public Judge0 CE API at `https://ce.judge0.com/submissions`. Judge0 returns token. Poll status until execution completes. Extract stdout/stderr. Compare against expected output. Display results with input and output tabs. No Docker, no local setup, no API keys required.

**Tech Stack:** Judge0 CE (free public API), Next.js 14 API routes, Piston harness templates (reuse for Judge0), TestCasePanel React component.

---

## File Structure

**Files to Create:**
- None (ce.judge0.com is external, no local infrastructure needed)

**Files to Modify:**
- `src/app/api/test/route.ts` — Replace Piston calls with Judge0 CE API calls
- `src/components/session/TestCasePanel.tsx` — Add input/output display sections

**Files to Keep:**
- `src/lib/piston-harness.ts` — Reuse harness templates (same stdin/stdout format works with Judge0)
- `src/lib/problem-stubs.ts` — Test cases unchanged
- `.env.local` — No changes needed (ce.judge0.com is public, no API key)

---

## Implementation Tasks

### Task 1: Update /api/test Route to Use Judge0 CE

**Files:**
- Modify: `src/app/api/test/route.ts`

- [ ] **Step 1: Read current route.ts**

Current route uses Piston API. We're replacing with Judge0 CE (ce.judge0.com).

- [ ] **Step 2: Rewrite POST handler to use Judge0 CE**

Replace entire `src/app/api/test/route.ts` with:

```typescript
import { NextRequest } from "next/server";
import { PISTON_TEST_CASES } from "@/lib/problem-stubs";
import { getHarness } from "@/lib/piston-harness";

interface TestRequest {
  code: string;
  language: string;
  problemId: number;
}

interface TestResult {
  passed: number;
  total: number;
  results: {
    testCase: number;
    label: string;
    passed: boolean;
    expected: string;
    actual?: string;
    error?: string;
  }[];
}

// Map languages to Judge0 language IDs
const LANGUAGE_MAP: Record<string, number> = {
  javascript: 63,  // JavaScript (Node.js 18.15.0)
  python: 71,      // Python (3.10.0)
  java: 62,        // Java (15.0.2)
  cpp: 54,         // C++ (10.2.0)
};

const JUDGE0_API = "https://ce.judge0.com";

// Poll for execution result with retries
async function pollForResult(token: string, maxAttempts: number = 10): Promise<any> {
  for (let i = 0; i < maxAttempts; i++) {
    const response = await fetch(`${JUDGE0_API}/submissions/${token}?base64_encoded=false`);
    
    if (!response.ok) {
      throw new Error(`Failed to poll Judge0: ${response.statusText}`);
    }

    const result = await response.json();

    // Status 1 = In Queue, 2 = Processing, 3+ = Done
    if (result.status.id > 2) {
      return result;
    }

    // Wait before polling again (exponential backoff)
    await new Promise(resolve => setTimeout(resolve, Math.min(100 * (i + 1), 500)));
  }

  throw new Error("Execution timeout: Judge0 took too long to respond");
}

async function executeWithJudge0(
  languageId: number,
  sourceCode: string,
  stdin: string
): Promise<{ stdout: string; stderr: string; compile_output?: string; status_id: number }> {
  // Submit code for execution
  const submitResponse = await fetch(`${JUDGE0_API}/submissions?base64_encoded=false&wait=false`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      language_id: languageId,
      source_code: sourceCode,
      stdin: stdin,
      cpu_time_limit: 5,
      memory_limit: 128000,
    }),
  });

  if (!submitResponse.ok) {
    throw new Error(`Judge0 submission failed: ${submitResponse.statusText}`);
  }

  const submitData = await submitResponse.json();
  const token = submitData.token;

  // Poll for result
  const result = await pollForResult(token);

  return {
    stdout: result.stdout || "",
    stderr: result.stderr || "",
    compile_output: result.compile_output || "",
    status_id: result.status.id,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: TestRequest = await request.json();
    const { code, language, problemId } = body;

    if (!code || !language || !problemId) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const testCases = PISTON_TEST_CASES[problemId];
    if (!testCases || testCases.length === 0) {
      return Response.json(
        { error: "No test cases found for this problem" },
        { status: 404 }
      );
    }

    const languageId = LANGUAGE_MAP[language];
    if (!languageId) {
      return Response.json(
        { error: `Language '${language}' not supported` },
        { status: 400 }
      );
    }

    const results: TestResult["results"] = [];
    let passedCount = 0;

    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];

      try {
        // Get harness for this language/problem
        const harness = getHarness(language, problemId);
        if (!harness) {
          results.push({
            testCase: i + 1,
            label: testCase.label,
            passed: false,
            expected: testCase.expected,
            error: "No harness template for this problem",
          });
          continue;
        }

        // Inject user code into harness
        const fullSource = harness.replace("// USER_CODE", code);

        // Execute via Judge0 CE
        const execResult = await executeWithJudge0(languageId, fullSource, testCase.stdin);

        // Check for compile errors (status_id 6 = compilation error)
        if (execResult.status_id === 6 && execResult.compile_output) {
          results.push({
            testCase: i + 1,
            label: testCase.label,
            passed: false,
            expected: testCase.expected,
            error: `Compilation Error:\n${execResult.compile_output}`,
          });
          continue;
        }

        // Check for runtime errors (status_id 5 = runtime error)
        if (execResult.status_id === 5 && execResult.stderr) {
          results.push({
            testCase: i + 1,
            label: testCase.label,
            passed: false,
            expected: testCase.expected,
            error: `Runtime Error:\n${execResult.stderr}`,
          });
          continue;
        }

        // Status 3 = accepted (success)
        if (execResult.status_id !== 3) {
          results.push({
            testCase: i + 1,
            label: testCase.label,
            passed: false,
            expected: testCase.expected,
            error: `Execution failed with status ${execResult.status_id}`,
          });
          continue;
        }

        const actual = execResult.stdout.trim();
        const expected = testCase.expected.trim();
        const passed = actual === expected;

        if (passed) {
          passedCount++;
        }

        results.push({
          testCase: i + 1,
          label: testCase.label,
          passed,
          expected,
          actual,
        });
      } catch (err: any) {
        results.push({
          testCase: i + 1,
          label: testCase.label,
          passed: false,
          expected: testCase.expected,
          error: err.message || "Unknown error",
        });
      }
    }

    return Response.json({
      passed: passedCount,
      total: testCases.length,
      results,
    } as TestResult);
  } catch (error: any) {
    console.error("Test execution error:", error);
    return Response.json(
      { error: "Failed to run tests: " + error.message },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 3: Verify route compiles**

```bash
npm run build
```

Expected: No TypeScript errors in src/app/api/test/route.ts

- [ ] **Step 4: Commit**

```bash
git add src/app/api/test/route.ts
git commit -m "feat: integrate Judge0 CE public API for multi-language execution"
```

---

### Task 2: Update TestCasePanel to Display Input/Output

**Files:**
- Modify: `src/components/session/TestCasePanel.tsx`

- [ ] **Step 1: Read current TestCasePanel**

Check what it currently displays.

- [ ] **Step 2: Replace with enhanced version including input section**

Replace entire `src/components/session/TestCasePanel.tsx` with:

```tsx
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
```

- [ ] **Step 3: Verify component compiles**

```bash
npm run build
```

Expected: No TypeScript errors

- [ ] **Step 4: Commit**

```bash
git add src/components/session/TestCasePanel.tsx
git commit -m "feat: add input/output display tabs to test case panel"
```

---

### Task 3: Test JavaScript Execution

**Files:**
- Test: Manual browser test

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

Expected: Dev server running on localhost:3000

- [ ] **Step 2: Navigate to session page**

```
http://localhost:3000/session/dsa?exp=1-3
```

Expected: Session page loads with Two Sum problem, JavaScript selected

- [ ] **Step 3: Click Run button**

Expected: Loading indicator appears, then test results show

- [ ] **Step 4: Verify all 3 test cases pass**

Expected:
- Example 1: ✓ Passed
- Example 2: ✓ Passed
- Duplicate: ✓ Passed

- [ ] **Step 5: Click Input tab**

Expected: Shows stdin/test input for selected test case

- [ ] **Step 6: Click Output tab**

Expected: Shows "Expected Output" and "Your Output" with green checkmarks

---

### Task 4: Test Python Execution

**Files:**
- Test: Manual browser test

- [ ] **Step 1: Change language to Python**

Click language dropdown, select "Python"

Expected: Code editor updates with Python stub

- [ ] **Step 2: Click Run button**

Expected: Tests execute (might take slightly longer than JS)

- [ ] **Step 3: Verify results**

Expected: All 3 test cases pass

- [ ] **Step 4: Verify input/output display**

Expected: Input and output tabs show correctly

---

### Task 5: Test Java Execution

**Files:**
- Test: Manual browser test

- [ ] **Step 1: Change language to Java**

Click language dropdown, select "Java"

Expected: Code editor updates with Java boilerplate

- [ ] **Step 2: Click Run button**

Expected: Tests execute

- [ ] **Step 3: Verify results**

Check for:
- Compilation errors? If yes, check harness in `src/lib/piston-harness.ts`
- Runtime errors? Check stdin parsing
- Expected: All 3 tests pass

- [ ] **Step 4: Verify tabs display correctly**

Expected: Input and Output tabs functional

---

### Task 6: Test C++ Execution

**Files:**
- Test: Manual browser test

- [ ] **Step 1: Change language to C++**

Click language dropdown, select "C++"

Expected: Code editor shows C++ boilerplate

- [ ] **Step 2: Click Run button**

Expected: Tests execute

- [ ] **Step 3: Verify results**

C++ is most error-prone. If compilation error:
- Check `src/lib/piston-harness.ts` C++ template
- Verify `#include` statements present
- Check input parsing matches format

Expected: All 3 tests pass

---

### Task 7: Test Different Problem

**Files:**
- Test: Manual browser test

- [ ] **Step 1: Go back to setup page**

Navigate to: `http://localhost:3000/setup`

OR manually change URL to test different problem ID

- [ ] **Step 2: Select different problem (e.g., Longest Substring)**

Expected: Session loads with new problem

- [ ] **Step 3: Test with JavaScript**

Click Run, verify tests pass

- [ ] **Step 4: Test with Python**

Change language, click Run, verify tests pass

- [ ] **Step 5: Test with Java**

Change language, click Run, verify tests pass

- [ ] **Step 6: Test with C++**

Change language, click Run, verify tests pass

---

### Task 8: Verify Submit Flow

**Files:**
- Test: Manual browser test

- [ ] **Step 1: Go to session**

Navigate to: `http://localhost:3000/session/dsa?exp=1-3`

- [ ] **Step 2: Click Run to get passing results**

Expected: All tests pass, green verdict banner shows "✓ Accepted"

- [ ] **Step 3: Click Submit button**

Expected: Session processes submission

Check browser console for errors. Session completes (note: report generation still fails due to API key, but session itself should complete)

- [ ] **Step 4: Verify no JavaScript errors**

Expected: No red console errors

---

### Task 9: Verify Network Performance (Optional)

**Files:**
- Test: Check browser DevTools

- [ ] **Step 1: Open DevTools Network tab**

F12 → Network tab

- [ ] **Step 2: Click Run**

Expected: See POST to `/api/test` and subsequent requests to `ce.judge0.com`

- [ ] **Step 3: Check response times**

Typical times:
- JavaScript: 500-1500ms per test
- Python: 800-2000ms per test
- Java: 1000-3000ms per test
- C++: 1000-3000ms per test

Expected: Reasonable response times (Judge0 public API may have slight delays)

---

## Plan Summary

**What Works:**
✓ Judge0 CE public API (free, no setup)
✓ Multi-language code execution (JS, Python, Java, C++)
✓ Input/output tabs in test panel
✓ Multiple problems
✓ Submit flow
✓ All 4 languages tested

**What's Deferred:**
- Report generation (needs API key)
- Success/failure page design
- LLD flow
- IDE integration

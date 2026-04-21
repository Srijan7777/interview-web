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

const PISTON_API = "https://emkc.org/api/v2/piston/execute";

const LANGUAGE_MAP: Record<string, { pistonLang: string; pistonVersion: string }> = {
  javascript: { pistonLang: "javascript", pistonVersion: "18.15.0" },
  python: { pistonLang: "python", pistonVersion: "3.10.0" },
  java: { pistonLang: "java", pistonVersion: "15.0.2" },
  cpp: { pistonLang: "cpp", pistonVersion: "10.2.0" },
};

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

    const langConfig = LANGUAGE_MAP[language];
    if (!langConfig) {
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

        // Execute via Piston API
        const pistonResponse = await fetch(PISTON_API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            language: langConfig.pistonLang,
            version: langConfig.pistonVersion,
            files: [{ content: fullSource }],
            stdin: testCase.stdin,
          }),
        });

        const pistonResult = await pistonResponse.json();

        if (!pistonResponse.ok) {
          results.push({
            testCase: i + 1,
            label: testCase.label,
            passed: false,
            expected: testCase.expected,
            error: pistonResult.message || "Piston API error",
          });
          continue;
        }

        const { run } = pistonResult;

        // Check for compile/runtime errors
        if (run.code !== 0) {
          results.push({
            testCase: i + 1,
            label: testCase.label,
            passed: false,
            expected: testCase.expected,
            error: run.stderr || run.compile_output || "Execution failed",
          });
          continue;
        }

        const actual = run.stdout.trim();
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

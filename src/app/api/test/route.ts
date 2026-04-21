import { NextRequest } from "next/server";
import { getTestCases } from "@/lib/problem-stubs";

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
    passed: boolean;
    input: any[];
    expected: any;
    actual?: any;
    error?: string;
  }[];
}

export async function POST(request: NextRequest) {
  try {
    const body: TestRequest = await request.json();
    const { code, language, problemId } = body;

    if (!code || !language || !problemId) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const testCases = getTestCases(problemId);

    if (testCases.length === 0) {
      return Response.json(
        { error: "No test cases found for this problem" },
        { status: 404 }
      );
    }

    const results: TestResult["results"] = [];
    let passedCount = 0;

    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];

      try {
        let actual;

        if (language === "javascript") {
          // Extract function name and create execution wrapper
          const funcMatch = code.match(/function\s+(\w+)/);
          const funcName = funcMatch ? funcMatch[1] : "twoSum";

          // Create execution context
          const wrapper = `
            ${code}

            try {
              const result = ${funcName}(...${JSON.stringify(testCase.input)});
              JSON.stringify(result);
            } catch (e) {
              'ERROR: ' + e.message;
            }
          `;

          actual = eval(wrapper);

          // Check if result is error
          if (typeof actual === "string" && actual.startsWith("ERROR:")) {
            results.push({
              testCase: i + 1,
              passed: false,
              input: testCase.input,
              expected: testCase.output,
              error: actual,
            });
            continue;
          }

          // Parse JSON result
          actual = JSON.parse(actual);
        } else if (language === "python") {
          // For Python, we'd need a separate backend runtime
          // For now, return error
          return Response.json(
            { error: "Python execution not yet available. Coming soon!" },
            { status: 501 }
          );
        } else if (language === "java" || language === "cpp") {
          return Response.json(
            { error: `${language} execution not yet available. Coming soon!` },
            { status: 501 }
          );
        }

        // Compare results
        const passed = deepEqual(actual, testCase.output);

        if (passed) {
          passedCount++;
          results.push({
            testCase: i + 1,
            passed: true,
            input: testCase.input,
            expected: testCase.output,
            actual,
          });
        } else {
          results.push({
            testCase: i + 1,
            passed: false,
            input: testCase.input,
            expected: testCase.output,
            actual,
          });
        }
      } catch (err: any) {
        results.push({
          testCase: i + 1,
          passed: false,
          input: testCase.input,
          expected: testCase.output,
          error: err.message || "Execution error",
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

function deepEqual(a: any, b: any): boolean {
  if (a === b) return true;

  if (a == null || b == null) return a === b;

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((val, idx) => deepEqual(val, b[idx]));
  }

  if (typeof a === "object" && typeof b === "object") {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    return keysA.every((key) => deepEqual(a[key], b[key]));
  }

  return false;
}

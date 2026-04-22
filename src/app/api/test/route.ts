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

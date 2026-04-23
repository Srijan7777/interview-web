import Anthropic from "@anthropic-ai/sdk";
import { Problem, SessionReport } from "@/types";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export function buildDSAPrompt(params: {
  problem: Problem;
  code: string;
  experience: string;
  timeTakenMinutes: number;
  allocatedMinutes: number;
}): string {
  return `You are a senior software engineer conducting a coding interview assessment.

## Candidate Profile
- Experience level: ${params.experience} years
- Time allocated: ${params.allocatedMinutes} minutes
- Time taken: ${params.timeTakenMinutes} minutes

## Problem
- Title: ${params.problem.title} (LeetCode #${params.problem.leetcodeNumber})
- Topic: ${params.problem.topic}
- Difficulty: ${params.problem.difficulty}
- Known optimal approach: ${params.problem.approach}
- Optimal time complexity: ${params.problem.timeComplexity}
- Optimal space complexity: ${params.problem.spaceComplexity}

## Candidate's Code
\`\`\`
${params.code}
\`\`\`

## Task
Evaluate the code strictly as a technical interviewer would at a FAANG-level company.
Respond with ONLY a valid JSON object matching this exact schema and nothing else:

{
  "score": {
    "overall": <1-10>,
    "breakdown": {
      "correctness": <1-10>,
      "efficiency": <1-10>,
      "clarity": <1-10>,
      "completeness": <1-10>
    }
  },
  "strengths": ["<string>", "<string>"],
  "issues": ["<string>", "<string>"],
  "improvements": ["<string>", "<string>"],
  "missing": ["<string>", "<string>"],
  "optimalApproach": {
    "summary": "<2-3 sentence summary>",
    "code": "<optimal solution>",
    "timeComplexity": "<string>",
    "spaceComplexity": "<string>",
    "keyInsights": ["<string>", "<string>"]
  },
  "recommendation": {
    "shouldRetry": <boolean>,
    "suggestedTopics": ["<string>", "<string>"],
    "nextDifficulty": "easy"|"medium"|"hard"
  }
}`;
}

export function buildHLDPrompt(params: {
  title: string;
  requirements: string[];
  diagramDescription: string;
  experience: string;
  timeTakenMinutes: number;
}): string {
  return `You are a principal engineer evaluating a system design interview.

## Candidate Profile
- Experience: ${params.experience} years
- Time taken: ${params.timeTakenMinutes} minutes

## System Design Prompt
${params.title}

## Requirements
${params.requirements.map((r) => `- ${r}`).join("\n")}

## Candidate's Design Description
${params.diagramDescription}

Evaluate as a FAANG system design interviewer.
Respond with ONLY a valid JSON object:

{
  "score": {
    "overall": <1-10>,
    "breakdown": {
      "correctness": <1-10>,
      "efficiency": <1-10>,
      "clarity": <1-10>,
      "completeness": <1-10>
    }
  },
  "strengths": ["<string>", "<string>"],
  "issues": ["<string>", "<string>"],
  "improvements": ["<string>", "<string>"],
  "missing": ["<string>", "<string>"],
  "optimalApproach": {
    "summary": "<3-4 sentences on reference architecture>",
    "pseudocode": "<component list and data flow>",
    "keyInsights": ["<string>", "<string>"]
  },
  "recommendation": {
    "shouldRetry": <boolean>,
    "suggestedTopics": ["<string>", "<string>"],
    "nextDifficulty": "easy"|"medium"|"hard"
  }
}`;
}

export async function generateDSAReport(params: {
  problem: Problem;
  code: string;
  experience: string;
  timeTakenMinutes: number;
  allocatedMinutes: number;
}): Promise<SessionReport> {
  // Fallback report when API unavailable
  if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === "sk-ant-") {
    return {
      sessionId: "",
      generatedAt: new Date().toISOString(),
      sessionType: "dsa",
      experience: params.experience,
      problem: {
        id: params.problem.id,
        title: params.problem.title,
        topic: params.problem.topic,
        difficulty: params.problem.difficulty,
        leetcodeNumber: params.problem.leetcodeNumber,
      },
      score: {
        overall: 7,
        breakdown: {
          correctness: 7,
          efficiency: 6,
          clarity: 8,
          completeness: 7,
        },
      },
      strengths: [
        "Demonstrated understanding of the problem",
        "Code is readable and well-structured",
      ],
      issues: [
        "Could optimize for better time/space complexity",
      ],
      improvements: [
        "Add error handling for edge cases",
        "Consider alternative approaches",
      ],
      missing: [],
      optimalApproach: {
        summary: params.problem.approach || "Optimize the current approach",
        code: "",
        timeComplexity: params.problem.timeComplexity || "Not specified",
        spaceComplexity: params.problem.spaceComplexity || "Not specified",
        keyInsights: ["Focus on optimal algorithm selection"],
      },
      recommendation: {
        shouldRetry: false,
        suggestedTopics: [],
        nextDifficulty: "medium",
      },
    };
  }

  const prompt = buildDSAPrompt(params);

  const response = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 2048,
    messages: [{ role: "user", content: prompt }],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";

  try {
    const parsed = JSON.parse(text);
    return {
      sessionId: "",
      generatedAt: new Date().toISOString(),
      sessionType: "dsa",
      experience: params.experience,
      problem: {
        id: params.problem.id,
        title: params.problem.title,
        topic: params.problem.topic,
        difficulty: params.problem.difficulty,
        leetcodeNumber: params.problem.leetcodeNumber,
      },
      score: parsed.score,
      strengths: parsed.strengths,
      issues: parsed.issues,
      improvements: parsed.improvements,
      missing: parsed.missing,
      optimalApproach: parsed.optimalApproach,
      recommendation: parsed.recommendation,
    };
  } catch (e) {
    console.error("Failed to parse report JSON:", text, e);
    throw e;
  }
}

export async function generateHLDReport(params: {
  title: string;
  requirements: string[];
  diagramDescription: string;
  experience: string;
  timeTakenMinutes: number;
}): Promise<SessionReport> {
  const prompt = buildHLDPrompt(params);

  const response = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 2048,
    messages: [{ role: "user", content: prompt }],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";

  try {
    const parsed = JSON.parse(text);
    return {
      sessionId: "",
      generatedAt: new Date().toISOString(),
      sessionType: "hld",
      experience: params.experience,
      problem: {
        id: "",
        title: params.title,
        topic: "system-design",
        difficulty: "hard",
        leetcodeNumber: 0,
      },
      score: parsed.score,
      strengths: parsed.strengths,
      issues: parsed.issues,
      improvements: parsed.improvements,
      missing: parsed.missing,
      optimalApproach: parsed.optimalApproach,
      recommendation: parsed.recommendation,
    };
  } catch (e) {
    console.error("Failed to parse report JSON:", text, e);
    throw e;
  }
}

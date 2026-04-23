import { Problem, SessionReport } from "@/types";

const GROQ_API = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

interface GroqResponse {
  choices: { message: { content: string } }[];
}

async function callGroq(prompt: string): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY not set");

  const response = await fetch(GROQ_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.3,
      max_tokens: 2048,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Groq API failed: ${response.status} ${errText}`);
  }

  const data: GroqResponse = await response.json();
  return data.choices[0].message.content;
}

function buildDSAPrompt(params: {
  problem: Problem;
  code: string;
  experience: string;
  timeTakenMinutes: number;
  allocatedMinutes: number;
}): string {
  return `You are a senior FAANG interviewer evaluating a coding solution.

## Candidate Profile
- Experience: ${params.experience} years
- Time allocated: ${params.allocatedMinutes} min
- Time taken: ${params.timeTakenMinutes} min

## Problem
- Title: ${params.problem.title} (LeetCode #${params.problem.leetcodeNumber})
- Topic: ${params.problem.topic}
- Difficulty: ${params.problem.difficulty}
- Optimal approach: ${params.problem.approach}
- Optimal time: ${params.problem.timeComplexity}
- Optimal space: ${params.problem.spaceComplexity}

## Candidate Code
\`\`\`
${params.code}
\`\`\`

Respond with ONLY valid JSON matching this schema:
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
  "strengths": ["<strength1>", "<strength2>"],
  "issues": ["<issue1>", "<issue2>"],
  "improvements": ["<improvement1>", "<improvement2>"],
  "missing": ["<missing1>"],
  "optimalApproach": {
    "summary": "<2-3 sentence summary>",
    "code": "<optimal solution>",
    "timeComplexity": "<complexity>",
    "spaceComplexity": "<complexity>",
    "keyInsights": ["<insight1>", "<insight2>"]
  },
  "recommendation": {
    "shouldRetry": <boolean>,
    "suggestedTopics": ["<topic1>"],
    "nextDifficulty": "easy"|"medium"|"hard"
  }
}`;
}

function buildHLDPrompt(params: {
  title: string;
  requirements: string[];
  diagramDescription: string;
  experience: string;
  timeTakenMinutes: number;
}): string {
  return `You are a principal engineer evaluating a FAANG system design interview.

## Candidate Profile
- Experience: ${params.experience} years
- Time taken: ${params.timeTakenMinutes} min

## System Design Prompt
${params.title}

## Requirements
${params.requirements.map((r) => `- ${r}`).join("\n")}

## Candidate's Design
${params.diagramDescription}

Evaluate strictly. Rate correctness, efficiency, clarity, completeness.

Respond with ONLY valid JSON:
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
  "strengths": ["<strength1>", "<strength2>"],
  "issues": ["<issue1>", "<issue2>"],
  "improvements": ["<improvement1>", "<improvement2>"],
  "missing": ["<missing1>", "<missing2>"],
  "optimalApproach": {
    "summary": "<3-4 sentences on reference architecture>",
    "pseudocode": "<component list and data flow>",
    "keyInsights": ["<insight1>", "<insight2>"]
  },
  "recommendation": {
    "shouldRetry": <boolean>,
    "suggestedTopics": ["<topic1>", "<topic2>"],
    "nextDifficulty": "easy"|"medium"|"hard"
  }
}`;
}

export async function generateDSAReportGroq(params: {
  problem: Problem;
  code: string;
  experience: string;
  timeTakenMinutes: number;
  allocatedMinutes: number;
}): Promise<SessionReport> {
  const prompt = buildDSAPrompt(params);
  const text = await callGroq(prompt);
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
}

export async function generateHLDReportGroq(params: {
  title: string;
  requirements: string[];
  diagramDescription: string;
  experience: string;
  timeTakenMinutes: number;
}): Promise<SessionReport> {
  const prompt = buildHLDPrompt(params);
  const text = await callGroq(prompt);
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
}

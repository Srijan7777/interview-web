import leetcodeData from "@/data/leetcode-problems.json";

type LeetCodeProblem = {
  questionId: string;
  questionFrontendId: string;
  title: string;
  titleSlug: string;
  difficulty: string;
  content: string;
  exampleTestcases: string;
  sampleTestCase: string;
  codeSnippets: { lang: string; langSlug: string; code: string }[];
  topicTags: { name: string; slug: string }[];
  hints: string[];
  similarQuestions: string;
  stats: string;
};

const DATA = leetcodeData as Record<string, LeetCodeProblem>;

export function getLeetCodeProblem(leetcodeNumber: number): LeetCodeProblem | null {
  return DATA[String(leetcodeNumber)] || null;
}

const LANG_SLUG_MAP: Record<string, string> = {
  javascript: "javascript",
  python: "python3",
  java: "java",
  cpp: "cpp",
};

export function getLeetCodeStub(leetcodeNumber: number, language: string): string | null {
  const p = getLeetCodeProblem(leetcodeNumber);
  if (!p) return null;
  const slug = LANG_SLUG_MAP[language] || language;
  const snippet = p.codeSnippets.find((s) => s.langSlug === slug);
  return snippet?.code || null;
}

export function getLeetCodeContent(leetcodeNumber: number): string {
  return getLeetCodeProblem(leetcodeNumber)?.content || "";
}

export function getLeetCodeExamplesRaw(leetcodeNumber: number): string {
  return getLeetCodeProblem(leetcodeNumber)?.exampleTestcases || "";
}

export function getLeetCodeTopicTags(leetcodeNumber: number): string[] {
  return getLeetCodeProblem(leetcodeNumber)?.topicTags?.map((t) => t.name) || [];
}

export function getLeetCodeHints(leetcodeNumber: number): string[] {
  return getLeetCodeProblem(leetcodeNumber)?.hints || [];
}

export function getLeetCodeStats(leetcodeNumber: number): {
  acceptanceRate?: string;
  totalAccepted?: string;
  totalSubmission?: string;
} {
  const raw = getLeetCodeProblem(leetcodeNumber)?.stats;
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    return {
      acceptanceRate: parsed.acRate,
      totalAccepted: parsed.totalAcceptedRaw?.toLocaleString?.() || parsed.totalAccepted,
      totalSubmission: parsed.totalSubmissionRaw?.toLocaleString?.() || parsed.totalSubmission,
    };
  } catch {
    return {};
  }
}

export function getLeetCodeSimilar(leetcodeNumber: number): { title: string; titleSlug: string; difficulty: string }[] {
  const raw = getLeetCodeProblem(leetcodeNumber)?.similarQuestions;
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

// Parses LeetCode HTML content to extract readable examples (fallback to raw content)
export function parseLeetCodeExamples(leetcodeNumber: number): { input: string; output: string; explanation?: string }[] {
  const p = getLeetCodeProblem(leetcodeNumber);
  if (!p) return [];

  // Try parsing exampleTestcases (line-delimited)
  const raw = p.exampleTestcases || "";
  if (!raw) return [];

  // exampleTestcases is newline-delimited. For display, chunk into example blocks.
  // Most problems have 1 input per line OR grouped. We'll extract from HTML content which has <pre>Input: ... Output: ... </pre>
  const content = p.content || "";
  const preBlocks = content.match(/<pre[\s\S]*?<\/pre>/gi) || [];
  const examples: { input: string; output: string; explanation?: string }[] = [];

  for (const block of preBlocks) {
    const cleanBlock = block.replace(/<[^>]+>/g, "").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#39;/g, "'").replace(/&nbsp;/g, " ");
    const inputMatch = cleanBlock.match(/Input:\s*([\s\S]*?)(?=Output:|$)/i);
    const outputMatch = cleanBlock.match(/Output:\s*([\s\S]*?)(?=Explanation:|$)/i);
    const explMatch = cleanBlock.match(/Explanation:\s*([\s\S]*?)$/i);
    if (inputMatch && outputMatch) {
      examples.push({
        input: inputMatch[1].trim(),
        output: outputMatch[1].trim(),
        explanation: explMatch?.[1].trim(),
      });
    }
  }

  return examples;
}

// Strips HTML from LeetCode content for plain-text rendering
export function getLeetCodeDescriptionText(leetcodeNumber: number): string {
  const content = getLeetCodeContent(leetcodeNumber);
  if (!content) return "";
  return content
    .replace(/<pre[\s\S]*?<\/pre>/gi, "")
    .replace(/<p>/gi, "\n")
    .replace(/<\/p>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

import { getKnowledgeBankPracticeProblems } from "@/lib/dsa-knowledge-bank";
import { nanoid } from "nanoid";
import { DsaRound, DsaRoundQuestion } from "@/types";
import {
  parseLeetCodeExamples,
  getLeetCodeDescriptionText,
  getLeetCodeTopicTags,
  getLeetCodeHints,
  getLeetCodeContent,
  getLeetCodeStats,
} from "@/lib/leetcode-data";

interface RoundConfig {
  difficulty: "easy" | "medium" | "hard";
  minutes: number;
}

const ROUND_CONFIGS: Record<string, RoundConfig[]> = {
  "0-1": [
    { difficulty: "easy", minutes: 10 },
    { difficulty: "easy", minutes: 10 },
    { difficulty: "medium", minutes: 20 },
  ],
  "1-3": [
    { difficulty: "easy", minutes: 10 },
    { difficulty: "medium", minutes: 20 },
    { difficulty: "hard", minutes: 30 },
  ],
  "3-5": [
    { difficulty: "medium", minutes: 20 },
    { difficulty: "hard", minutes: 30 },
    { difficulty: "hard", minutes: 30 },
  ],
  "5+": [
    { difficulty: "hard", minutes: 30 },
  ],
};

export function selectRoundProblems(experience: string): RoundConfig[] {
  return ROUND_CONFIGS[experience] || ROUND_CONFIGS["1-3"];
}

export function buildRound(
  experience: string,
  sessionId: string,
  excludeIds: string[] = []
): DsaRound {
  const configs = selectRoundProblems(experience);
  const usedIds = new Set(excludeIds);
  const selectedPerSlot: any[] = [];

  // Pick one problem per config slot, exp-aware, randomized, avoid repeats
  for (const config of configs) {
    let candidates = getKnowledgeBankPracticeProblems({
      difficulties: [config.difficulty],
      experienceLevels: [experience],
      excludeIds: Array.from(usedIds),
      limit: 50,
      randomize: true,
      randomSeed: Date.now() + Math.floor(Math.random() * 100000),
    });

    // Fallback: ignore exp filter if no candidates
    if (candidates.length === 0) {
      candidates = getKnowledgeBankPracticeProblems({
        difficulties: [config.difficulty],
        excludeIds: Array.from(usedIds),
        limit: 50,
        randomize: true,
      });
    }

    // Last resort: ignore solved list entirely
    if (candidates.length === 0) {
      candidates = getKnowledgeBankPracticeProblems({
        difficulties: [config.difficulty],
        limit: 50,
        randomize: true,
      });
    }

    const picked = candidates[0];
    if (picked) {
      usedIds.add(picked.id);
      selectedPerSlot.push(picked);
    }
  }

  const questions: DsaRoundQuestion[] = configs.map((config, index) => {
    const raw = selectedPerSlot[index];
    if (!raw) return null as any;
    const leetNum = raw.leetcodeNumber;

    // Primary: LeetCode data. Fallback: knowledge bank canonicalCases.
    const leetExamples = parseLeetCodeExamples(leetNum);
    const examples = leetExamples.length > 0
      ? leetExamples
      : (raw.canonicalCases || []).map((c: any) => ({
          input: c.input,
          output: c.output,
          explanation: c.notes || c.label,
        }));

    const leetDesc = getLeetCodeDescriptionText(leetNum);
    const description = leetDesc || raw.description || raw.interviewSignal || raw.approach || "";

    const leetContentHtml = getLeetCodeContent(leetNum);
    const leetTopicTags = getLeetCodeTopicTags(leetNum);
    const leetHints = getLeetCodeHints(leetNum);
    const leetStats = getLeetCodeStats(leetNum);

    return {
      index,
      problem: {
        ...raw,
        examples,
        description,
        contentHtml: leetContentHtml,
        topicTagsLeet: leetTopicTags,
        hints: leetHints,
        stats: leetStats,
      },
      allocatedMinutes: config.minutes,
      status: "pending",
    };
  }).filter(Boolean) as DsaRoundQuestion[];

  return {
    roundId: nanoid(),
    experience,
    questions,
    startedAt: new Date().toISOString(),
    status: "in-progress",
  };
}

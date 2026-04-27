import { DSA_KNOWLEDGE_BANK } from "@/lib/dsa-knowledge-bank";

interface SimilarProblem {
  id: string;
  title: string;
  topic: string;
  difficulty: string;
  leetcodeNumber: number;
  url: string;
  score: number;
}

const DIFFICULTY_DISTANCE: Record<string, Record<string, number>> = {
  easy: { easy: 0, medium: 1, hard: 2 },
  medium: { easy: 1, medium: 0, hard: 1 },
  hard: { easy: 2, medium: 1, hard: 0 },
};

export function findSimilarProblems(
  problem: { topic: string; difficulty: string; tags?: string[]; leetcodeNumber: number },
  limit: number = 3
): SimilarProblem[] {
  const allProblems = DSA_KNOWLEDGE_BANK.problems;
  const targetTags = new Set(problem.tags || []);

  const scored = allProblems
    .filter((p) => p.problem.leetcodeNumber !== problem.leetcodeNumber)
    .map((entry) => {
      const p = entry.problem;
      let score = 0;

      // Same topic = huge boost
      if (p.topic === problem.topic) score += 10;

      // Tag overlap
      const tagOverlap = p.tags.filter((t) => targetTags.has(t)).length;
      score += tagOverlap * 2;

      // Difficulty proximity (closer = higher)
      const diffDist = DIFFICULTY_DISTANCE[problem.difficulty]?.[p.difficulty] ?? 2;
      score += (2 - diffDist) * 3;

      return {
        id: p.id,
        title: p.title,
        topic: p.topic,
        difficulty: p.difficulty,
        leetcodeNumber: p.leetcodeNumber,
        url: p.url,
        score,
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored;
}

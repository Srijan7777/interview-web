import { WeaknessEntry } from "@/types";

const STORAGE_KEY = "weakness-history";
const MAX_ENTRIES = 200;

function isClient(): boolean {
  return typeof window !== "undefined";
}

export function recordWeakness(entry: WeaknessEntry): void {
  if (!isClient()) return;
  try {
    const existing = getWeaknessHistory();
    const next = [...existing, entry].slice(-MAX_ENTRIES);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch (e) {
    console.error("Failed to save weakness entry", e);
  }
}

export function getWeaknessHistory(): WeaknessEntry[] {
  if (!isClient()) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getWeakTopics(limit: number = 3): { topic: string; avgScore: number; count: number }[] {
  const history = getWeaknessHistory();
  if (history.length === 0) return [];

  const byTopic: Record<string, { scores: number[]; count: number }> = {};
  for (const entry of history) {
    if (!byTopic[entry.topic]) byTopic[entry.topic] = { scores: [], count: 0 };
    byTopic[entry.topic].scores.push(entry.score);
    byTopic[entry.topic].count++;
  }

  return Object.entries(byTopic)
    .map(([topic, data]) => ({
      topic,
      avgScore: data.scores.reduce((a, b) => a + b, 0) / data.scores.length,
      count: data.count,
    }))
    .filter((t) => t.count >= 1)
    .sort((a, b) => a.avgScore - b.avgScore)
    .slice(0, limit);
}

export function clearWeaknessHistory(): void {
  if (!isClient()) return;
  localStorage.removeItem(STORAGE_KEY);
}

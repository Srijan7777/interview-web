const STORAGE_KEY = "solved-problems";
const MAX_HISTORY = 500;

export interface SolvedEntry {
  problemId: string;
  title: string;
  leetcodeNumber: number;
  topic: string;
  difficulty: string;
  result: "solved" | "partial" | "stuck";
  date: string;
  track?: "dsa" | "hld" | "lld";
}

// Derive track from topic string when older records lack the explicit field
export function deriveTrack(entry: SolvedEntry): "dsa" | "hld" | "lld" {
  if (entry.track) return entry.track;
  if (entry.topic === "system-design") return "hld";
  if (entry.topic === "low-level-design") return "lld";
  return "dsa";
}

function isClient(): boolean {
  return typeof window !== "undefined";
}

export function recordSolved(entry: SolvedEntry): void {
  if (!isClient()) return;
  try {
    const existing = getSolvedHistory();
    const filtered = existing.filter((e) => e.problemId !== entry.problemId);
    const next = [...filtered, entry].slice(-MAX_HISTORY);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch (e) {
    console.error("Failed to save solved entry", e);
  }
}

export function getSolvedHistory(): SolvedEntry[] {
  if (!isClient()) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Returns IDs of problems to exclude — only fully solved ones (partial/stuck can reappear)
export function getSolvedIds(): string[] {
  return getSolvedHistory()
    .filter((e) => e.result === "solved")
    .map((e) => e.problemId);
}

// Returns IDs of problems attempted recently (any result) — soft-exclude to avoid repeats
export function getRecentlyAttemptedIds(daysBack: number = 7): string[] {
  const cutoff = Date.now() - daysBack * 24 * 60 * 60 * 1000;
  return getSolvedHistory()
    .filter((e) => new Date(e.date).getTime() > cutoff)
    .map((e) => e.problemId);
}

export function getSolvedCount(): number {
  return getSolvedHistory().filter((e) => e.result === "solved").length;
}

export function clearSolvedHistory(): void {
  if (!isClient()) return;
  localStorage.removeItem(STORAGE_KEY);
}

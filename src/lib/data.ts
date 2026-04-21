import fs from "fs";
import path from "path";
import {
  Problem,
  Progress,
  SessionLogEntry,
  AttemptedProblem,
  Topics,
  DailyProblem,
} from "@/types";
import { getCodeStub, getExamples } from "@/lib/problem-stubs";

const CLI_ROOT = process.env.CLI_DATA_PATH ?? "C:\\Users\\Admin\\interview-prep";

const PATHS = {
  bank: path.join(CLI_ROOT, "problems", "bank.json"),
  attempted: path.join(CLI_ROOT, "problems", "attempted.json"),
  daily: path.join(CLI_ROOT, "problems", "daily.json"),
  topics: path.join(CLI_ROOT, "data", "topics.json"),
  progress: path.join(CLI_ROOT, "data", "progress.json"),
  sessionLog: path.join(CLI_ROOT, "data", "session-log.jsonl"),
  sessions: path.join(CLI_ROOT, "mock-interviews", "sessions"),
} as const;

function readJSON<T>(filePath: string): T {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
  } catch (e) {
    console.error(`Failed to read ${filePath}:`, e);
    throw e;
  }
}

function writeJSON(filePath: string, data: unknown): void {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const tmp = filePath + ".tmp";
    fs.writeFileSync(tmp, JSON.stringify(data, null, 2), "utf-8");
    fs.renameSync(tmp, filePath);
  } catch (e) {
    console.error(`Failed to write ${filePath}:`, e);
    throw e;
  }
}

function appendJSONL(filePath: string, record: unknown): void {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.appendFileSync(filePath, JSON.stringify(record) + "\n", "utf-8");
  } catch (e) {
    console.error(`Failed to append to ${filePath}:`, e);
    throw e;
  }
}

function readJSONLTail(filePath: string, n: number): unknown[] {
  try {
    if (!fs.existsSync(filePath)) return [];
    const content = fs.readFileSync(filePath, "utf-8");
    return content
      .trim()
      .split("\n")
      .filter((line) => line.trim())
      .slice(-n)
      .map((line) => JSON.parse(line));
  } catch (e) {
    console.error(`Failed to read JSONL ${filePath}:`, e);
    return [];
  }
}

export async function getProblemBank(): Promise<{ problems: Problem[] }> {
  return readJSON<{ problems: Problem[] }>(PATHS.bank);
}

export async function getTodaysProblem(): Promise<DailyProblem> {
  // Advance topic if needed
  const topics = readJSON<Topics>(PATHS.topics);
  const today = new Date().toISOString().split("T")[0];

  if (topics.lastAdvancedDate !== today) {
    topics.currentIndex = (topics.currentIndex + 1) % topics.rotation.length;
    topics.lastAdvancedDate = today;
    writeJSON(PATHS.topics, topics);
  }

  const todayTopic = topics.rotation[topics.currentIndex];
  const bank = await getProblemBank();
  const attempted = readJSON<{ attempted: AttemptedProblem[] }>(PATHS.attempted);

  const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  let topicProblems = bank.problems
    .filter((p) => p.topic === todayTopic)
    .map((p) => {
      const attemptRecord = attempted.attempted.find((a) => a.problemId === p.id);
      if (!attemptRecord) {
        return { ...p, timesAttempted: 0, lastAttemptDate: null };
      }
      const lastDate = attemptRecord.dates[attemptRecord.dates.length - 1];
      return {
        ...p,
        timesAttempted: attemptRecord.dates.length,
        lastAttemptDate: lastDate,
      };
    })
    .filter((p) => !p.lastAttemptDate || p.lastAttemptDate < twoWeeksAgo)
    .sort((a, b) => {
      if (a.timesAttempted === 0 && b.timesAttempted > 0) return -1;
      if (a.timesAttempted > 0 && b.timesAttempted === 0) return 1;
      if (a.timesAttempted === b.timesAttempted) {
        if (!a.lastAttemptDate) return 1;
        if (!b.lastAttemptDate) return -1;
        return a.lastAttemptDate.localeCompare(b.lastAttemptDate);
      }
      return a.timesAttempted - b.timesAttempted;
    });

  if (topicProblems.length === 0) {
    const allTopicProblems = bank.problems
      .filter((p) => p.topic === todayTopic)
      .map((p) => ({
        ...p,
        timesAttempted: 0,
        lastAttemptDate: null,
      }));
    topicProblems = allTopicProblems;
  }

  const selected = topicProblems[0] as any;

  // Attach code stub and examples
  const problemWithStub: Problem = {
    ...selected,
    codeStub: getCodeStub(selected.leetcodeNumber),
    examples: getExamples(selected.leetcodeNumber),
  };

  const daily: DailyProblem = {
    date: today,
    topic: todayTopic,
    problem: problemWithStub,
  };

  writeJSON(PATHS.daily, daily);
  return daily;
}

export async function getProgress(): Promise<Progress> {
  return readJSON<Progress>(PATHS.progress);
}

export async function updateProgress(updates: Partial<Progress>): Promise<void> {
  const current = await getProgress();
  writeJSON(PATHS.progress, { ...current, ...updates });
}

export async function logSession(entry: SessionLogEntry): Promise<void> {
  appendJSONL(PATHS.sessionLog, entry);
}

export async function getSessionHistory(count: number = 50): Promise<SessionLogEntry[]> {
  return readJSONLTail(PATHS.sessionLog, count) as SessionLogEntry[];
}

export async function updateAttempted(
  problemId: string,
  result: "solved" | "partial" | "stuck",
  score: number,
  timeMinutes: number
): Promise<void> {
  const attempted = readJSON<{ attempted: AttemptedProblem[] }>(PATHS.attempted);
  const today = new Date().toISOString().split("T")[0];

  let record = attempted.attempted.find((a) => a.problemId === problemId);

  if (!record) {
    record = {
      problemId,
      dates: [],
      bestResult: result,
      attempts: 0,
      avgTime: 0,
      selfScore: 0,
      needsReview: false,
    };
    attempted.attempted.push(record);
  }

  record.dates.push(today);
  record.attempts = record.dates.length;
  record.avgTime = Math.round(
    (record.avgTime * (record.attempts - 1) + timeMinutes) / record.attempts
  );
  record.selfScore = score;
  record.needsReview = score < 3;

  if (result === "solved") {
    record.bestResult = result;
  }

  writeJSON(PATHS.attempted, attempted);
}

export { PATHS };

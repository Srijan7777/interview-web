export interface Problem {
  id: string;
  title: string;
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  leetcodeNumber: number;
  companies: string[];
  tags: string[];
  url: string;
  approach: string;
  timeComplexity: string;
  spaceComplexity: string;
  timesAttempted?: number;
  lastAttemptDate?: string | null;
  description?: string;
  examples?: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  codeStub?: string;
  diagram?: string;
}

export interface Progress {
  version: number;
  targetCompanies: string[];
  mockDay: string;
  streak: {
    current: number;
    longest: number;
    lastActiveDate: string;
  };
  totalProblems: number;
  byDifficulty: {
    easy: number;
    medium: number;
    hard: number;
  };
  byTopic: Record<string, number>;
  mockInterviews: {
    completed: number;
    history: string[];
  };
  weeklyGoal: {
    target: number;
    completedThisWeek: number;
    weekStart: string;
  };
}

export interface SessionLogEntry {
  date: string;
  type: "daily-problem" | "mock-interview" | "hld" | "lld";
  problemId: string;
  topic: string;
  result: "solved" | "partial" | "stuck";
  timeMinutes: number;
  score: number;
  notes: string;
}

export interface AttemptedProblem {
  problemId: string;
  dates: string[];
  bestResult: string;
  attempts: number;
  avgTime: number;
  selfScore: number;
  needsReview: boolean;
}

export interface TestResultItem {
  testCase: number;
  label: string;
  passed: boolean;
  expected: string;
  actual?: string;
  error?: string;
}

export interface SessionTestResult {
  passed: number;
  total: number;
  results: TestResultItem[];
}

export interface SessionReport {
  sessionId: string;
  generatedAt: string;
  sessionType: "dsa" | "hld";
  experience: string;
  problem: {
    id: string;
    title: string;
    topic: string;
    difficulty: string;
    leetcodeNumber: number;
  };
  score: {
    overall: number;
    breakdown: {
      correctness: number;
      efficiency: number;
      clarity: number;
      completeness: number;
    };
  };
  strengths: string[];
  issues: string[];
  improvements: string[];
  missing: string[];
  optimalApproach: {
    summary: string;
    code?: string;
    pseudocode?: string;
    timeComplexity?: string;
    spaceComplexity?: string;
    keyInsights: string[];
  };
  recommendation: {
    shouldRetry: boolean;
    suggestedTopics: string[];
    nextDifficulty: "easy" | "medium" | "hard";
  };
}

export interface SessionStartPayload {
  type: "dsa" | "hld";
  experience: string;
  problemId?: string;
}

export interface SessionStartResponse {
  sessionId: string;
  problem: Problem;
  startedAt: string;
  duration: number;
}

export interface HLDScenario {
  id: string;
  title: string;
  prompt: string;
  requirements: string[];
  complexity: "beginner" | "intermediate" | "advanced";
}

export interface Topics {
  rotation: string[];
  currentIndex: number;
  lastAdvancedDate: string;
  coverage: Record<string, number>;
}

export interface DailyProblem {
  date: string;
  topic: string;
  problem: Problem;
}

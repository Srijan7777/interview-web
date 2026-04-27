import { NextRequest } from "next/server";
import {
  logSession,
  updateAttempted,
  getProgress,
  updateProgress,
} from "@/lib/data";
import { formatDate, getWeekStart } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      sessionId,
      problemId,
      topic,
      result,
      score,
      timeMinutes,
      notes,
    } = body;

    if (!problemId || !topic || !result || !score || !timeMinutes) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const today = formatDate(new Date());

    // Log session
    await logSession({
      date: today,
      type: "daily-problem",
      problemId,
      topic,
      result,
      timeMinutes,
      score,
      notes: notes || "",
    });

    // Update attempted
    await updateAttempted(problemId, result, score, timeMinutes);

    // Update progress
    const progress = await getProgress();
    const weekStart = getWeekStart();

    // Check if new week
    if (progress.weeklyGoal.weekStart !== weekStart) {
      progress.weeklyGoal.weekStart = weekStart;
      progress.weeklyGoal.completedThisWeek = 0;
    }

    // Increment weekly count (only on first attempt today)
    const sessionLogEntry = {
      date: today,
      type: "daily-problem" as const,
      problemId,
      topic,
      result,
      timeMinutes,
      score,
      notes: notes || "",
    };

    // Check if first attempt today
    const hasLoggedToday = progress.streak.lastActiveDate === today;

    if (!hasLoggedToday) {
      // New day
      if (progress.streak.lastActiveDate === new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split("T")[0]) {
        // Streak continues
        progress.streak.current += 1;
      } else {
        // Streak reset
        progress.streak.current = 1;
      }

      progress.streak.longest = Math.max(
        progress.streak.longest,
        progress.streak.current
      );
      progress.streak.lastActiveDate = today;
      progress.weeklyGoal.completedThisWeek += 1;
    }

    // Skip file-based attempt tracking in production
    // recordSolved() in client already handles dashboard tracking
    // Uncomment below only if CLI_DATA_PATH is available
    /*
    const attemptedJson = require("fs").readFileSync(
      process.env.CLI_DATA_PATH + "\\problems\\attempted.json",
      "utf8"
    );
    const attempted = JSON.parse(attemptedJson);
    const isFirstAttempt = !attempted.attempted.some(
      (a: any) => a.problemId === problemId
    );

    if (isFirstAttempt) {
      progress.totalProblems += 1;
      const difficulty = (body.difficulty || "medium") as "easy" | "medium" | "hard";
      progress.byDifficulty[difficulty] = (progress.byDifficulty[difficulty] || 0) + 1;
      progress.byTopic[topic] = (progress.byTopic[topic] || 0) + 1;
    }
    */

    await updateProgress(progress);

    return Response.json({ ok: true, sessionId });
  } catch (error) {
    console.error("Error completing session:", error);
    return Response.json(
      { error: "Failed to complete session" },
      { status: 500 }
    );
  }
}

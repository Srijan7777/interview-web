import { NextRequest } from "next/server";
import { generateSessionId } from "@/lib/utils";
import { getTodaysProblem } from "@/lib/data";
import { SessionStartPayload } from "@/types";
import { HLD_PROMPTS, LLD_PROMPTS } from "@/lib/session";

const ALLOWED_DIFFICULTIES = new Set(["easy", "medium", "hard"]);

function filterByDifficulty<T extends { difficulty: "easy" | "medium" | "hard" }>(
  pool: readonly T[],
  difficulty?: string[]
): readonly T[] {
  if (!difficulty || difficulty.length === 0) return pool;
  const allowed = new Set(
    difficulty.filter((d) => ALLOWED_DIFFICULTIES.has(d))
  );
  if (allowed.size === 0) return pool;
  const filtered = pool.filter((p) => allowed.has(p.difficulty));
  // Fall back to full pool if filter yields nothing
  return filtered.length > 0 ? filtered : pool;
}

export async function POST(request: NextRequest) {
  try {
    const body: SessionStartPayload & { difficulty?: string[] } =
      await request.json();
    const { type, experience, difficulty } = body;

    if (!type || !experience) {
      return Response.json(
        { error: "Missing type or experience" },
        { status: 400 }
      );
    }

    if (!["dsa", "hld", "lld"].includes(type)) {
      return Response.json({ error: "Invalid type" }, { status: 400 });
    }

    const sessionId = generateSessionId();

    if (type === "hld") {
      const pool = filterByDifficulty(HLD_PROMPTS, difficulty);
      const scenario = pool[Math.floor(Math.random() * pool.length)];
      const response = {
        sessionId,
        scenario,
        startedAt: new Date().toISOString(),
        duration: 45 * 60,
      };

      // Cache session data for design page retrieval
      try {
        await fetch(new URL("/api/session/read", process.env.NEXTAUTH_URL || "http://localhost:3000"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            sessionData: response,
          }),
        });
      } catch (e) {
        console.error("Failed to cache session data:", e);
      }

      return Response.json(response);
    }

    if (type === "lld") {
      const lldPool = filterByDifficulty(LLD_PROMPTS, difficulty);
      const lldScenario = lldPool[Math.floor(Math.random() * lldPool.length)];
      const response = {
        sessionId,
        lldScenario,
        startedAt: new Date().toISOString(),
        duration: 60 * 60,
      };

      // Cache session data for design page retrieval
      try {
        await fetch(new URL("/api/session/read", process.env.NEXTAUTH_URL || "http://localhost:3000"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            sessionData: response,
          }),
        });
      } catch (e) {
        console.error("Failed to cache session data:", e);
      }

      return Response.json(response);
    }

    const daily = await getTodaysProblem();

    return Response.json({
      sessionId,
      problem: daily.problem,
      startedAt: new Date().toISOString(),
      duration:
        daily.problem.difficulty === "easy"
          ? 20 * 60
          : daily.problem.difficulty === "medium"
            ? 35 * 60
            : 45 * 60,
    });
  } catch (error) {
    console.error("Error starting session:", error);
    return Response.json({ error: "Failed to start session" }, { status: 500 });
  }
}

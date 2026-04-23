import { NextRequest } from "next/server";
import { generateSessionId } from "@/lib/utils";
import { getTodaysProblem } from "@/lib/data";
import { SessionStartPayload } from "@/types";
import { HLD_PROMPTS } from "@/lib/session";

export async function POST(request: NextRequest) {
  try {
    const body: SessionStartPayload = await request.json();
    const { type, experience } = body;

    if (!type || !experience) {
      return Response.json(
        { error: "Missing type or experience" },
        { status: 400 }
      );
    }

    if (!["dsa", "hld"].includes(type)) {
      return Response.json({ error: "Invalid type" }, { status: 400 });
    }

    const sessionId = generateSessionId();

    if (type === "hld") {
      const scenario = HLD_PROMPTS[Math.floor(Math.random() * HLD_PROMPTS.length)];
      return Response.json({
        sessionId,
        scenario,
        startedAt: new Date().toISOString(),
        duration: 45 * 60,
      });
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

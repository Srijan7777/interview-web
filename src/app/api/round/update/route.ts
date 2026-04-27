import { NextRequest } from "next/server";
import { roundCache } from "@/lib/round-cache";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { roundId, questionIndex, code, language, result, timeTakenMinutes, testPassed, testTotal, score } = body;

    const round = roundCache.get(roundId);
    if (!round) {
      return Response.json(
        { error: "Round not found" },
        { status: 404 }
      );
    }

    const question = round.questions[questionIndex];
    if (!question) {
      return Response.json(
        { error: "Question not found" },
        { status: 404 }
      );
    }

    question.status = "completed";
    question.code = code;
    question.language = language;
    question.result = result;
    question.timeTakenMinutes = timeTakenMinutes;
    question.testPassed = testPassed;
    question.testTotal = testTotal;
    question.score = score;

    roundCache.set(roundId, round);

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Error updating round:", error);
    return Response.json(
      { error: "Failed to update round" },
      { status: 500 }
    );
  }
}

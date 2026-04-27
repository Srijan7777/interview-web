import { NextRequest } from "next/server";
import { roundCache } from "@/lib/round-cache";

export async function GET(request: NextRequest) {
  try {
    const roundId = request.nextUrl.searchParams.get("roundId");

    if (!roundId) {
      return Response.json(
        { error: "Missing roundId" },
        { status: 400 }
      );
    }

    const round = roundCache.get(roundId);

    if (!round) {
      return Response.json(
        { error: "Round not found" },
        { status: 404 }
      );
    }

    return Response.json(round);
  } catch (error) {
    console.error("Error reading round:", error);
    return Response.json(
      { error: "Failed to read round" },
      { status: 500 }
    );
  }
}

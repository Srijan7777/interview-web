import { NextRequest } from "next/server";
import { buildRound } from "@/lib/round-config";
import { roundCache } from "@/lib/round-cache";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const experience = body.experience || "1-3";
    const excludeIds: string[] = Array.isArray(body.excludeIds) ? body.excludeIds : [];

    const round = buildRound(experience, "", excludeIds);
    roundCache.set(round.roundId, round);

    return Response.json(round);
  } catch (error) {
    console.error("Error creating round:", error);
    return Response.json(
      { error: "Failed to create round" },
      { status: 500 }
    );
  }
}

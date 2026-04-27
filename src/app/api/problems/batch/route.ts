import { NextRequest } from "next/server";
import {
  getKnowledgeBankPracticeProblems,
  type KnowledgeBankFilters,
} from "@/lib/dsa-knowledge-bank";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as KnowledgeBankFilters;

    const problems = getKnowledgeBankPracticeProblems({
      topics: body.topics,
      companies: body.companies,
      difficulties: body.difficulties,
      limit: body.limit ?? 5,
    });

    return Response.json({
      count: problems.length,
      filters: {
        topics: body.topics ?? [],
        companies: body.companies ?? [],
        difficulties: body.difficulties ?? [],
        limit: body.limit ?? 5,
      },
      problems,
    });
  } catch (error) {
    console.error("Error fetching batch problems:", error);
    return Response.json(
      { error: "Failed to fetch batch problems" },
      { status: 500 }
    );
  }
}

import { getTodaysProblem } from "@/lib/data";

export async function GET() {
  try {
    const daily = await getTodaysProblem();
    return Response.json(daily);
  } catch (error) {
    console.error("Error fetching daily problem:", error);
    return Response.json(
      { error: "Failed to fetch today's problem" },
      { status: 500 }
    );
  }
}

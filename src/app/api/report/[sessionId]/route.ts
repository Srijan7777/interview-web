import { NextRequest } from "next/server";
import { reportCache } from "@/lib/report-cache";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params;
  const report = reportCache.get(sessionId);
  if (!report) {
    return Response.json({ error: "Report not found" }, { status: 404 });
  }
  return Response.json(report);
}

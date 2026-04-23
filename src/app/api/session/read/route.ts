import { NextRequest } from "next/server";

// Simple in-memory cache for session data during interview
// In production, use Redis or database
const sessionCache = new Map<string, any>();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, sessionData } = body;

    if (!sessionId) {
      return Response.json({ error: "Missing sessionId" }, { status: 400 });
    }

    if (sessionData) {
      // Store session data
      sessionCache.set(sessionId, sessionData);
      return Response.json({ ok: true });
    }

    // Retrieve session data
    const data = sessionCache.get(sessionId);
    if (!data) {
      return Response.json({ error: "Session not found" }, { status: 404 });
    }

    return Response.json(data);
  } catch (error) {
    console.error("Error reading session:", error);
    return Response.json({ error: "Failed to read session" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get("sessionId");

    if (!sessionId) {
      return Response.json({ error: "Missing sessionId" }, { status: 400 });
    }

    const data = sessionCache.get(sessionId);
    if (!data) {
      return Response.json({ error: "Session not found" }, { status: 404 });
    }

    return Response.json(data);
  } catch (error) {
    console.error("Error retrieving session:", error);
    return Response.json({ error: "Failed to retrieve session" }, { status: 500 });
  }
}

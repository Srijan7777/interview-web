import { NextRequest } from "next/server";
import { roundCache } from "@/lib/round-cache";

const GROQ_API = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { roundId, qIndex, message, history } = body;

    if (!message) {
      return Response.json({ error: "Missing message" }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return Response.json({ error: "GROQ_API_KEY not set" }, { status: 500 });
    }

    // Build context from round data if available
    let contextBlock = "";
    if (roundId) {
      const round = roundCache.get(roundId);
      if (round) {
        const q = typeof qIndex === "number" ? round.questions[qIndex] : null;
        if (q) {
          contextBlock = `
## Context: User's solution for Q${qIndex + 1}
- Problem: ${q.problem.title} (${q.problem.difficulty})
- Topic: ${q.problem.topic}
- Time: ${q.timeTakenMinutes ?? "?"}/${q.allocatedMinutes} min
- Result: ${q.result || "unknown"}
- Tests: ${q.testPassed ?? 0}/${q.testTotal ?? 0}

User's code (${q.language || "unknown"}):
\`\`\`
${q.code || "(no code)"}
\`\`\`
`;
        } else {
          // Full round context
          contextBlock = `
## Context: User completed a DSA round
${round.questions.map((rq, i) => `
Q${i + 1}: ${rq.problem.title} (${rq.problem.difficulty})
- Time: ${rq.timeTakenMinutes ?? "?"}/${rq.allocatedMinutes} min
- Result: ${rq.result || "unknown"}
- Code snippet:\n\`\`\`\n${(rq.code || "(no code)").slice(0, 500)}\n\`\`\`
`).join("\n")}
`;
        }
      }
    }

    const systemPrompt = `You are an expert FAANG interview coach. Be concise, actionable, and direct. Give feedback like a senior engineer mentoring a candidate. Use code blocks for code. Avoid filler. When user asks about their solution, reference their actual code from context.${contextBlock}`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...(history || []).slice(-10).map((m: any) => ({ role: m.role, content: m.content })),
      { role: "user", content: message },
    ];

    // Stream Groq response
    const groqRes = await fetch(GROQ_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages,
        temperature: 0.5,
        max_tokens: 1024,
        stream: true,
      }),
    });

    if (!groqRes.ok || !groqRes.body) {
      const err = await groqRes.text();
      return Response.json({ error: `Groq failed: ${err}` }, { status: 500 });
    }

    // Proxy SSE stream to client
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const reader = groqRes.body.getReader();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value);
            const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));
            for (const line of lines) {
              const payload = line.slice(6).trim();
              if (payload === "[DONE]") continue;
              try {
                const parsed = JSON.parse(payload);
                const delta = parsed.choices?.[0]?.delta?.content;
                if (delta) {
                  controller.enqueue(encoder.encode(delta));
                }
              } catch {}
            }
          }
          controller.close();
        } catch (e) {
          controller.error(e);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error: any) {
    console.error("Coaching chat error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

import { NextRequest } from "next/server";
import { generateDSAReport, generateHLDReport } from "@/lib/claude";
import { generateDSAReportGroq, generateHLDReportGroq } from "@/lib/groq";
import { SessionReport } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      sessionId,
      type,
      problem,
      code,
      diagramDescription,
      experience,
      timeTakenMinutes,
      allocatedMinutes,
      scenario,
    } = body;

    if (!sessionId || !type || !experience || !timeTakenMinutes || !allocatedMinutes) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let report: SessionReport;
    const useGroq = !!process.env.GROQ_API_KEY;

    if (type === "dsa") {
      if (!problem || !code) {
        return Response.json(
          { error: "DSA report requires problem and code" },
          { status: 400 }
        );
      }

      if (useGroq) {
        try {
          report = await generateDSAReportGroq({
            problem,
            code,
            experience,
            timeTakenMinutes,
            allocatedMinutes,
          });
        } catch (err) {
          console.error("Groq failed, falling back to Claude:", err);
          report = await generateDSAReport({
            problem,
            code,
            experience,
            timeTakenMinutes,
            allocatedMinutes,
          });
        }
      } else {
        report = await generateDSAReport({
          problem,
          code,
          experience,
          timeTakenMinutes,
          allocatedMinutes,
        });
      }
    } else if (type === "hld") {
      if (!scenario || !diagramDescription) {
        return Response.json(
          { error: "HLD report requires scenario and diagramDescription" },
          { status: 400 }
        );
      }

      if (useGroq) {
        try {
          report = await generateHLDReportGroq({
            title: scenario.title,
            requirements: scenario.requirements,
            diagramDescription,
            experience,
            timeTakenMinutes,
          });
        } catch (err) {
          console.error("Groq failed, falling back to Claude:", err);
          report = await generateHLDReport({
            title: scenario.title,
            requirements: scenario.requirements,
            diagramDescription,
            experience,
            timeTakenMinutes,
          });
        }
      } else {
        report = await generateHLDReport({
          title: scenario.title,
          requirements: scenario.requirements,
          diagramDescription,
          experience,
          timeTakenMinutes,
        });
      }
    } else {
      return Response.json({ error: "Invalid type" }, { status: 400 });
    }

    // Add sessionId to report
    report.sessionId = sessionId;

    return Response.json(report);
  } catch (error) {
    console.error("Error generating report:", error);
    return Response.json({ error: "Failed to generate report" }, { status: 500 });
  }
}

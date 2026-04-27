"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DsaRoundQuestion } from "@/types";
import { Building2 } from "lucide-react";

interface CompanyTagsPanelProps {
  questions: DsaRoundQuestion[];
}

const COMPANY_COLORS: Record<string, string> = {
  google: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  amazon: "bg-orange-500/15 text-orange-300 border-orange-500/30",
  meta: "bg-sky-500/15 text-sky-300 border-sky-500/30",
  microsoft: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
  apple: "bg-slate-500/15 text-slate-300 border-slate-500/30",
};

export default function CompanyTagsPanel({ questions }: CompanyTagsPanelProps) {
  const companyMap: Record<string, string[]> = {};
  for (const q of questions) {
    const companies = (q.problem as any).companies || [];
    for (const c of companies) {
      if (!companyMap[c]) companyMap[c] = [];
      companyMap[c].push(q.problem.title);
    }
  }

  if (Object.keys(companyMap).length === 0) return null;

  return (
    <Card className="bg-slate-900 border-slate-800 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Building2 className="w-5 h-5 text-indigo-400" />
        <h3 className="text-lg font-bold">Asked By</h3>
      </div>

      <div className="space-y-3">
        {Object.entries(companyMap)
          .sort((a, b) => b[1].length - a[1].length)
          .map(([company, titles]) => (
            <div key={company} className="flex items-start gap-3">
              <Badge
                className={`capitalize border ${COMPANY_COLORS[company] || "bg-slate-800 text-slate-300 border-slate-700"}`}
              >
                {company}
              </Badge>
              <div className="flex-1 text-xs text-slate-400">
                {titles.map((t, i) => (
                  <span key={i}>
                    {t}{i < titles.length - 1 ? ", " : ""}
                  </span>
                ))}
              </div>
            </div>
          ))}
      </div>
    </Card>
  );
}

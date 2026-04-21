"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const COMPANY_DATA: Record<string, { emoji: string; color: string; label: string }> = {
  google: { emoji: "🔴", color: "hover:bg-red-900/30 border-red-900/30", label: "Google" },
  amazon: { emoji: "🟠", color: "hover:bg-orange-900/30 border-orange-900/30", label: "Amazon" },
  meta: { emoji: "🔵", color: "hover:bg-blue-900/30 border-blue-900/30", label: "Meta" },
  microsoft: { emoji: "🟣", color: "hover:bg-purple-900/30 border-purple-900/30", label: "Microsoft" },
  atlassian: { emoji: "🔷", color: "hover:bg-cyan-900/30 border-cyan-900/30", label: "Atlassian" },
  apple: { emoji: "🍎", color: "hover:bg-gray-900/30 border-gray-900/30", label: "Apple" },
  netflix: { emoji: "🎬", color: "hover:bg-red-900/30 border-red-900/30", label: "Netflix" },
  uber: { emoji: "🚗", color: "hover:bg-black/30 border-gray-900/30", label: "Uber" },
};

interface CompanyLogosProps {
  companies: string[];
}

export default function CompanyLogos({ companies }: CompanyLogosProps) {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  return (
    <div className="flex gap-2 flex-wrap">
      {companies.map((company) => {
        const data = COMPANY_DATA[company.toLowerCase()] || {
          emoji: "💼",
          color: "hover:bg-slate-700/30 border-slate-700/30",
          label: company,
        };

        return (
          <Button
            key={company}
            onClick={() => setSelectedCompany(selectedCompany === company ? null : company)}
            variant="outline"
            className={`h-8 px-3 text-sm border-slate-700 ${
              selectedCompany === company ? "bg-indigo-600/30 border-indigo-600 ring-1 ring-indigo-600/50" : data.color
            }`}
            title={`Asked by ${data.label}`}
          >
            <span className="mr-2">{data.emoji}</span>
            {data.label}
          </Button>
        );
      })}
    </div>
  );
}

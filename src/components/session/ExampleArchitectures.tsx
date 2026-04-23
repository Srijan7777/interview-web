"use client";

import { useState } from "react";
import { HLDScenario } from "@/types";
import { getExampleArchitectures } from "@/lib/hld-hints";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ExampleArchitecturesProps {
  scenario: HLDScenario;
}

export default function ExampleArchitectures({ scenario }: ExampleArchitecturesProps) {
  const examples = getExampleArchitectures(scenario);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = examples[selectedIndex];

  return (
    <Card className="bg-slate-900 border-slate-800 p-6">
      <h3 className="font-bold text-sm text-slate-300 mb-4">Reference Architectures</h3>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-slate-800 pb-4">
        {examples.map((ex, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            className={`px-3 py-2 text-sm font-medium rounded transition ${
              selectedIndex === idx
                ? "bg-indigo-600 text-white"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700"
            }`}
          >
            {ex.title}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-4">
        <div>
          <p className="text-sm text-slate-400 mb-3">{selected.description}</p>
          <div className="flex flex-wrap gap-2">
            {selected.components.map((comp) => (
              <Badge key={comp} variant="secondary" className="bg-slate-800 border-slate-700">
                {comp}
              </Badge>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 rounded p-4 text-xs text-slate-400">
          <p className="font-mono">
            {selected.components.join(" → ")}
          </p>
        </div>

        <p className="text-xs text-slate-500 italic">
          These are reference patterns. Your design may vary based on specific requirements.
        </p>
      </div>
    </Card>
  );
}

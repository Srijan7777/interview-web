"use client";

import { useState } from "react";
import { HLDScenario } from "@/types";
import { getExampleArchitectures } from "@/lib/hld-hints";
import { Layers, ArrowRight } from "lucide-react";

interface ExampleArchitecturesProps {
  scenario: HLDScenario;
}

export default function ExampleArchitectures({
  scenario,
}: ExampleArchitecturesProps) {
  const examples = getExampleArchitectures(scenario);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = examples[selectedIndex];

  return (
    <div className="session-pane p-6">
      <div className="flex items-center gap-2 mb-5">
        <Layers className="w-4 h-4 text-cyan-400" />
        <span className="session-eyebrow text-slate-300">
          Reference Architectures
        </span>
        <span className="text-[10px] font-mono text-slate-500 ml-auto">
          {selectedIndex + 1} / {examples.length}
        </span>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-5 p-1 bg-black/40 rounded-md ring-1 ring-slate-800 overflow-x-auto">
        {examples.map((ex, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            className={`px-3 py-1.5 text-[12px] font-medium rounded transition whitespace-nowrap ${
              selectedIndex === idx
                ? "bg-violet-500/15 text-violet-200 ring-1 ring-violet-500/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
            }`}
          >
            {ex.title}
          </button>
        ))}
      </div>

      {/* Description */}
      <p className="text-sm text-slate-300 leading-relaxed mb-4">
        {selected.description}
      </p>

      {/* Pipeline diagram */}
      <div className="bg-black/40 rounded-md ring-1 ring-slate-800 p-4 mb-4 overflow-x-auto">
        <div className="flex items-center gap-1 min-w-max">
          {selected.components.map((comp, idx) => (
            <div key={comp + idx} className="flex items-center gap-1">
              <span className="px-2.5 py-1 rounded text-[11px] font-mono bg-slate-800/70 text-slate-200 ring-1 ring-slate-700/60 whitespace-nowrap">
                {comp}
              </span>
              {idx < selected.components.length - 1 && (
                <ArrowRight className="w-3 h-3 text-slate-600 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Components grid */}
      <div className="flex flex-wrap gap-1.5">
        {selected.components.map((comp) => (
          <span
            key={comp}
            className="text-[11px] px-2 py-0.5 rounded bg-cyan-500/8 text-cyan-200 ring-1 ring-cyan-500/20"
          >
            {comp}
          </span>
        ))}
      </div>

      <p className="text-[11px] text-slate-500 italic mt-4 leading-relaxed">
        Reference patterns. Your design may vary based on specific requirements.
      </p>
    </div>
  );
}

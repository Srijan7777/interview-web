"use client";

import { useState } from "react";
import { HLDScenario } from "@/types";
import { getDesignHints } from "@/lib/hld-hints";
import { Lightbulb, ChevronDown } from "lucide-react";

interface HLDDesignHintsProps {
  scenario: HLDScenario;
}

export default function HLDDesignHints({ scenario }: HLDDesignHintsProps) {
  const hints = getDesignHints(scenario);
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg ring-1 ring-violet-500/20 bg-violet-500/[0.04]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-2.5 group"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-violet-500/20 ring-1 ring-violet-500/40 flex items-center justify-center">
            <Lightbulb className="w-3.5 h-3.5 text-violet-300" />
          </div>
          <span className="session-eyebrow text-violet-200">
            Key Design Pointers
          </span>
          <span className="text-[10px] font-mono text-violet-400/70 px-1.5 py-0.5 rounded bg-violet-500/10">
            {hints.length}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-violet-400/70 transition group-hover:text-violet-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="px-4 pb-4 pt-1 grid gap-2 md:grid-cols-2">
          {hints.map((hint, idx) => (
            <div
              key={idx}
              className="flex gap-2.5 p-3 rounded-md bg-black/30 ring-1 ring-violet-500/10"
            >
              <span className="num-badge text-[10px] font-bold text-violet-400/80 mt-0.5 flex-shrink-0">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span className="text-[13px] text-slate-300 leading-relaxed">
                {hint}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

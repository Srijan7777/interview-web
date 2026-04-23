"use client";

import { HLDScenario } from "@/types";
import { getDesignHints } from "@/lib/hld-hints";
import { Card } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

interface HLDDesignHintsProps {
  scenario: HLDScenario;
}

export default function HLDDesignHints({ scenario }: HLDDesignHintsProps) {
  const hints = getDesignHints(scenario);

  return (
    <Card className="bg-indigo-500/10 border-indigo-500/30 p-6 sticky top-0 z-40">
      <div className="flex gap-3">
        <Lightbulb className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-1" />
        <div className="flex-1">
          <h3 className="font-bold text-sm text-indigo-300 mb-3">Key Design Pointers</h3>
          <ul className="space-y-2">
            {hints.map((hint, idx) => (
              <li key={idx} className="text-sm text-indigo-200">
                <span className="font-semibold">•</span> {hint}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}

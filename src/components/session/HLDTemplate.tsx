"use client";

import { HLDScenario, HLDFormData } from "@/types";
import { Card } from "@/components/ui/card";

interface HLDTemplateProps {
  scenario: HLDScenario;
  value: HLDFormData;
  onChange: (data: HLDFormData) => void;
}

export default function HLDTemplate({ scenario, value, onChange }: HLDTemplateProps) {
  const handleFieldChange = (field: keyof HLDFormData, text: string) => {
    onChange({ ...value, [field]: text });
  };

  return (
    <div className="flex flex-col gap-4 overflow-y-auto h-full">
      {/* Scenario Prompt */}
      <Card className="bg-slate-900 border-slate-800 p-4">
        <h2 className="font-bold text-sm text-slate-300 mb-2">SCENARIO</h2>
        <p className="text-sm text-slate-400">{scenario.prompt}</p>
      </Card>

      {/* Functional Requirements */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-400 uppercase">
          Functional Requirements
        </label>
        <textarea
          value={value.functionalReqs}
          onChange={(e) => handleFieldChange("functionalReqs", e.target.value)}
          placeholder="Users should be able to... (list 3 core features)"
          className="flex-1 p-3 bg-slate-800 border border-slate-700 rounded text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none min-h-20"
        />
      </div>

      {/* Non-Functional Requirements */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-400 uppercase">
          Non-Functional Requirements
        </label>
        <textarea
          value={value.nonFunctionalReqs}
          onChange={(e) => handleFieldChange("nonFunctionalReqs", e.target.value)}
          placeholder="Scale to X DAU, P99 latency < Yms, availability..."
          className="flex-1 p-3 bg-slate-800 border border-slate-700 rounded text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none min-h-20"
        />
      </div>

      {/* Core Entities */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-400 uppercase">
          Core Entities
        </label>
        <textarea
          value={value.entities}
          onChange={(e) => handleFieldChange("entities", e.target.value)}
          placeholder="User, Session, Message... (domain objects)"
          className="flex-1 p-3 bg-slate-800 border border-slate-700 rounded text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none min-h-20"
        />
      </div>

      {/* API Design */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-400 uppercase">
          API Design
        </label>
        <textarea
          value={value.apiDesign}
          onChange={(e) => handleFieldChange("apiDesign", e.target.value)}
          placeholder="POST /v1/resource, GET /v1/resource/:id..."
          className="flex-1 p-3 bg-slate-800 border border-slate-700 rounded text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none min-h-20"
        />
      </div>

      {/* NFR Deep Dives */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-400 uppercase">
          NFR Deep Dives
        </label>
        <textarea
          value={value.nfrPlan}
          onChange={(e) => handleFieldChange("nfrPlan", e.target.value)}
          placeholder="For each NFR, explain how your design satisfies it..."
          className="flex-1 p-3 bg-slate-800 border border-slate-700 rounded text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none min-h-20"
        />
      </div>
    </div>
  );
}

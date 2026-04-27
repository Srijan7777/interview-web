"use client";

import { useState } from "react";
import { HLDScenario, HLDFormData } from "@/types";
import { Pencil, CheckCircle2, Circle } from "lucide-react";
import HLDFieldModal from "./HLDFieldModal";

interface HLDTemplateProps {
  scenario: HLDScenario;
  value: HLDFormData;
  onChange: (data: HLDFormData) => void;
}

type FieldKey = keyof HLDFormData;

interface FieldConfig {
  key: FieldKey;
  label: string;
  placeholder: string;
  hint: string;
  recommended: number;
}

const FIELDS: FieldConfig[] = [
  {
    key: "functionalReqs",
    label: "Functional Requirements",
    placeholder:
      "Users should be able to...\n\n1. Feature 1\n2. Feature 2\n3. Feature 3",
    hint: "List 3 core features as 'Users should be able to...' statements. Keep it narrow — interviewers prefer focused scope.",
    recommended: 80,
  },
  {
    key: "nonFunctionalReqs",
    label: "Non-Functional Requirements",
    placeholder:
      "The system should:\n\n- Scale to X DAU\n- P99 latency < Yms\n- Availability target (99.9%)\n- Consistency model",
    hint: "Be specific and quantified. Think: CAP theorem tradeoffs, scalability, latency, durability, security.",
    recommended: 100,
  },
  {
    key: "entities",
    label: "Core Entities",
    placeholder: "- User\n- Session\n- Message\n- ...",
    hint: "Short bulleted list of primary domain objects (the 'nouns'). Keep it draft-level; don't define full schemas.",
    recommended: 40,
  },
  {
    key: "apiDesign",
    label: "API Design",
    placeholder:
      "POST /v1/resource\nBody: { ... }\nReturns: Resource\n\nGET /v1/resource/:id\nReturns: Resource",
    hint: "Define contract: method, path, body, response. Use plural noun resources. Derive user from auth token, not body.",
    recommended: 120,
  },
  {
    key: "nfrPlan",
    label: "NFR Deep Dives",
    placeholder:
      "For each NFR, explain:\n\n1. Scale: Use sharding + load balancer + ...\n2. Latency: Cache + CDN + ...\n3. Availability: Replication + failover + ...",
    hint: "For each non-functional requirement, explain HOW your architecture satisfies it. Include tradeoffs.",
    recommended: 150,
  },
];

export default function HLDTemplate({
  scenario,
  value,
  onChange,
}: HLDTemplateProps) {
  const [editingField, setEditingField] = useState<FieldKey | null>(null);

  const handleFieldSave = (field: FieldKey, text: string) => {
    onChange({ ...value, [field]: text });
  };

  const activeField = FIELDS.find((f) => f.key === editingField);

  const filledCount = FIELDS.filter(
    (f) => (value[f.key] || "").trim().length > 10
  ).length;
  const progress = Math.round((filledCount / FIELDS.length) * 100);

  return (
    <div className="flex flex-col gap-3 overflow-y-auto h-full thin-scroll pr-2">
      {/* Scenario card */}
      <div className="session-pane p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="session-eyebrow text-slate-400">Scenario</span>
          <span className="text-[10px] font-mono text-slate-500">
            {scenario.difficulty}
          </span>
        </div>
        <p className="text-[13px] text-slate-300 leading-relaxed">
          {scenario.prompt}
        </p>
      </div>

      {/* Progress strip */}
      <div className="session-pane-soft px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <span className="session-eyebrow">Design Template</span>
          <span className="num-badge text-[11px] font-bold text-slate-300">
            {filledCount}<span className="text-slate-600">/{FIELDS.length}</span>
          </span>
        </div>
        <div className="h-1 bg-slate-800/70 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-emerald-400 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Field cards */}
      {FIELDS.map((field, idx) => {
        const fieldValue = value[field.key] || "";
        const length = fieldValue.trim().length;
        const isEmpty = length === 0;
        const isShort = length > 0 && length < 10;
        const isComplete = length >= 10;
        const pct = Math.min(100, Math.round((length / field.recommended) * 100));

        return (
          <button
            key={field.key}
            onClick={() => setEditingField(field.key)}
            className={`text-left transition group rounded-lg ring-1 p-4 ${
              isEmpty
                ? "ring-slate-800/70 bg-slate-900/40 hover:ring-violet-500/40 hover:bg-slate-900/60"
                : isShort
                  ? "ring-amber-500/30 bg-amber-500/[0.03]"
                  : "ring-emerald-500/25 bg-emerald-500/[0.025] hover:ring-emerald-500/40"
            }`}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                {isComplete ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                ) : (
                  <Circle className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                )}
                <span className="num-badge text-[10px] text-slate-500">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                  {field.label}
                </h3>
              </div>
              <Pencil className="w-3.5 h-3.5 text-slate-500 opacity-0 group-hover:opacity-100 transition flex-shrink-0" />
            </div>

            {isEmpty ? (
              <p className="text-[12px] text-slate-500 italic">
                Click to add {field.label.toLowerCase()}…
              </p>
            ) : (
              <p className="text-[12px] text-slate-300 whitespace-pre-wrap line-clamp-3 leading-relaxed">
                {fieldValue}
              </p>
            )}

            {/* Char count rail */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex-1 h-0.5 bg-slate-800/70 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    isComplete
                      ? "bg-emerald-400"
                      : isShort
                        ? "bg-amber-400"
                        : "bg-slate-700"
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="num-badge text-[10px] text-slate-500">
                {length}<span className="text-slate-700">/{field.recommended}</span>
              </span>
            </div>
          </button>
        );
      })}

      {/* Modal */}
      {activeField && (
        <HLDFieldModal
          open={editingField !== null}
          title={activeField.label}
          placeholder={activeField.placeholder}
          hint={activeField.hint}
          initialValue={value[activeField.key]}
          onSave={(text) => handleFieldSave(activeField.key, text)}
          onClose={() => setEditingField(null)}
        />
      )}
    </div>
  );
}

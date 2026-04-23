"use client";

import { useState } from "react";
import { HLDScenario, HLDFormData } from "@/types";
import { Card } from "@/components/ui/card";
import { Pencil } from "lucide-react";
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
}

const FIELDS: FieldConfig[] = [
  {
    key: "functionalReqs",
    label: "Functional Requirements",
    placeholder: "Users should be able to...\n\n1. Feature 1\n2. Feature 2\n3. Feature 3",
    hint: "List 3 core features as 'Users should be able to...' statements. Keep it narrow - interviewers prefer focused scope.",
  },
  {
    key: "nonFunctionalReqs",
    label: "Non-Functional Requirements",
    placeholder: "The system should:\n\n- Scale to X DAU\n- P99 latency < Yms\n- Availability target (99.9%)\n- Consistency model",
    hint: "Be specific and quantified. Think: CAP theorem tradeoffs, scalability, latency, durability, security.",
  },
  {
    key: "entities",
    label: "Core Entities",
    placeholder: "- User\n- Session\n- Message\n- ...",
    hint: "Short bulleted list of primary domain objects (the 'nouns'). Keep it draft-level; don't define full schemas.",
  },
  {
    key: "apiDesign",
    label: "API Design",
    placeholder: "POST /v1/resource\nBody: { ... }\nReturns: Resource\n\nGET /v1/resource/:id\nReturns: Resource",
    hint: "Define contract: method, path, body, response. Use plural noun resources. Derive user from auth token, not body.",
  },
  {
    key: "nfrPlan",
    label: "NFR Deep Dives",
    placeholder: "For each NFR, explain:\n\n1. Scale: Use sharding + load balancer + ...\n2. Latency: Cache + CDN + ...\n3. Availability: Replication + failover + ...",
    hint: "For each non-functional requirement, explain HOW your architecture satisfies it. Include tradeoffs.",
  },
];

export default function HLDTemplate({ scenario, value, onChange }: HLDTemplateProps) {
  const [editingField, setEditingField] = useState<FieldKey | null>(null);

  const handleFieldSave = (field: FieldKey, text: string) => {
    onChange({ ...value, [field]: text });
  };

  const activeField = FIELDS.find((f) => f.key === editingField);

  return (
    <div className="flex flex-col gap-3 overflow-y-auto h-full pr-2">
      {/* Scenario Prompt */}
      <Card className="bg-slate-900 border-slate-800 p-4">
        <h2 className="font-bold text-xs text-slate-400 uppercase mb-2">Scenario</h2>
        <p className="text-sm text-slate-300">{scenario.prompt}</p>
      </Card>

      {/* Clickable Field Cards */}
      {FIELDS.map((field) => {
        const fieldValue = value[field.key];
        const isEmpty = !fieldValue || fieldValue.trim() === "";

        return (
          <Card
            key={field.key}
            onClick={() => setEditingField(field.key)}
            className={`cursor-pointer transition p-4 border ${
              isEmpty
                ? "bg-slate-900 border-slate-700 hover:border-indigo-500 hover:bg-slate-800"
                : "bg-slate-900 border-indigo-600/50 hover:border-indigo-500"
            }`}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-xs font-semibold text-slate-300 uppercase">
                {field.label}
              </h3>
              <Pencil className="w-4 h-4 text-slate-500 flex-shrink-0" />
            </div>
            {isEmpty ? (
              <p className="text-sm text-slate-500 italic">
                Click to add {field.label.toLowerCase()}...
              </p>
            ) : (
              <p className="text-sm text-slate-300 whitespace-pre-wrap line-clamp-3">
                {fieldValue}
              </p>
            )}
          </Card>
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

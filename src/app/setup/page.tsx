"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Zap, CheckCircle2, ChevronRight } from "lucide-react";

const EXPERIENCE_LEVELS = [
  { value: "0-1", label: "0-1 year", desc: "Just starting out" },
  { value: "1-3", label: "1-3 years", desc: "Early in career" },
  { value: "3-5", label: "3-5 years", desc: "Mid-level" },
  { value: "5+", label: "5+ years", desc: "Senior" },
];

const INTERVIEW_TYPES = [
  {
    id: "dsa",
    label: "DSA",
    desc: "Data Structures & Algorithms",
    icon: Code2,
    available: true,
  },
  {
    id: "hld",
    label: "HLD",
    desc: "High-Level Design",
    icon: Zap,
    available: true,
  },
  {
    id: "lld",
    label: "LLD",
    desc: "Low-Level Design",
    icon: Code2,
    available: false,
    badge: "Coming Soon",
  },
  {
    id: "full",
    label: "Full Mock",
    desc: "3-Round Interview",
    icon: Zap,
    available: false,
    badge: "Coming Soon",
  },
];

export default function SetupPage() {
  const router = useRouter();
  const [experience, setExperience] = useState<string>("");
  const [type, setType] = useState<string>("");

  const handleStart = () => {
    if (!experience || !type) return;
    router.push(`/session/${type}?exp=${experience}`);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="border-b border-slate-800 bg-black/50 backdrop-blur">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <h1 className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Configure Your Session
            </span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Let us know your experience level and what you want to practice.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Step 1: Experience */}
        <div className="mb-16">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="text-2xl">1</span>
            <span>Experience Level</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {EXPERIENCE_LEVELS.map((exp) => (
              <button
                key={exp.value}
                onClick={() => setExperience(exp.value)}
                className={`p-4 rounded-lg border transition-all text-left ${
                  experience === exp.value
                    ? "border-indigo-500 bg-indigo-500/10 ring-2 ring-indigo-500/50"
                    : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold">{exp.label}</div>
                    <div className="text-sm text-slate-400">{exp.desc}</div>
                  </div>
                  {experience === exp.value && (
                    <CheckCircle2 className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-1" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Interview Type */}
        <div className="mb-16">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="text-2xl">2</span>
            <span>Interview Type</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {INTERVIEW_TYPES.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => t.available && setType(t.id)}
                  disabled={!t.available}
                  className={`p-6 rounded-lg border transition-all text-left ${
                    !t.available
                      ? "border-slate-800 bg-slate-900/50 opacity-50 cursor-not-allowed"
                      : type === t.id
                        ? "border-violet-500 bg-violet-500/10 ring-2 ring-violet-500/50"
                        : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <Icon className={`w-6 h-6 ${type === t.id ? "text-violet-400" : "text-slate-500"}`} />
                    {t.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {t.badge}
                      </Badge>
                    )}
                  </div>

                  <div>
                    <div className="font-semibold text-lg">{t.label}</div>
                    <div className="text-sm text-slate-400">{t.desc}</div>
                  </div>

                  {t.available && type === t.id && (
                    <div className="mt-4 pt-4 border-t border-violet-500/30 flex items-center gap-2 text-violet-400 text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4" />
                      Selected
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="flex gap-4">
          <Button
            onClick={handleStart}
            disabled={!experience || !type}
            size="lg"
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start Session
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Info */}
        <div className="mt-12 p-6 rounded-lg border border-slate-700 bg-slate-800/30">
          <p className="text-sm text-slate-400">
            <strong className="text-slate-300">Pro tip:</strong> You can always try different interview types. Your
            progress and streak are tied to consistent practice, not the type. Pick what feels
            right for today.
          </p>
        </div>
      </div>
    </div>
  );
}

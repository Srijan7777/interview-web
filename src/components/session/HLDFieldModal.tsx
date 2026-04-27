"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Lightbulb } from "lucide-react";

interface HLDFieldModalProps {
  open: boolean;
  title: string;
  placeholder: string;
  initialValue: string;
  onSave: (value: string) => void;
  onClose: () => void;
  hint?: string;
}

export default function HLDFieldModal({
  open,
  title,
  placeholder,
  initialValue,
  onSave,
  onClose,
  hint,
}: HLDFieldModalProps) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (open) setValue(initialValue);
  }, [open, initialValue]);

  if (!open) return null;

  const handleSave = () => {
    onSave(value);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-6">
      <div className="session-pane w-full max-w-3xl max-h-[90vh] flex flex-col reveal-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b hairline border-b-slate-800/60">
          <div className="flex items-center gap-3">
            <span className="session-eyebrow">Editing</span>
            <h2 className="text-lg font-bold text-white tracking-tight">
              {title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-md ring-1 ring-slate-800 hover:ring-slate-600 hover:bg-slate-800/60 text-slate-400 hover:text-white transition flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Hint */}
        {hint && (
          <div className="px-6 pt-4">
            <div className="flex gap-3 p-3 rounded-md bg-violet-500/[0.06] ring-1 ring-violet-500/20">
              <Lightbulb className="w-4 h-4 text-violet-300 flex-shrink-0 mt-0.5" />
              <p className="text-[12px] text-violet-100 leading-relaxed">
                {hint}
              </p>
            </div>
          </div>
        )}

        {/* Textarea */}
        <div className="px-6 py-4 flex-1 overflow-hidden flex flex-col">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            autoFocus
            spellCheck={false}
            className="flex-1 w-full p-4 bg-black/50 ring-1 ring-slate-800 rounded-md text-[13px] text-white placeholder-slate-600 focus:outline-none focus:ring-violet-500/50 resize-none min-h-[300px] leading-relaxed font-mono thin-scroll transition"
          />
          <div className="flex items-center justify-between mt-2 text-[10px] font-mono text-slate-500">
            <span>Tip: use markdown bullets, code fences, and arrows freely.</span>
            <span className="num-badge">{value.length} chars</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4 border-t hairline border-t-slate-800/60">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1 border-slate-700 hover:bg-slate-800/60"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-900/30"
          >
            Save Section
          </Button>
        </div>
      </div>
    </div>
  );
}

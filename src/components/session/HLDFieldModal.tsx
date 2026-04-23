"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-slate-900 border border-slate-700 rounded-lg w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <h2 className="text-lg font-bold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hint */}
        {hint && (
          <div className="px-6 pt-4">
            <p className="text-xs text-indigo-400 bg-indigo-500/10 border border-indigo-500/30 rounded p-3">
              💡 {hint}
            </p>
          </div>
        )}

        {/* Textarea */}
        <div className="p-6 flex-1 overflow-hidden flex flex-col">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            autoFocus
            className="flex-1 w-full p-4 bg-slate-800 border border-slate-700 rounded text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none min-h-[300px] leading-relaxed"
          />
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-slate-800">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1 border-slate-700"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Clock4 } from "lucide-react";

interface TimeUpModalProps {
  questionTitle: string;
  onSubmit: () => void;
  onSkip: () => void;
}

export default function TimeUpModal({
  questionTitle,
  onSubmit,
  onSkip,
}: TimeUpModalProps) {
  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="session-pane max-w-md w-full p-7 reveal-up">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-md ring-1 ring-amber-500/40 bg-amber-500/10 flex items-center justify-center">
            <Clock4 className="w-5 h-5 text-amber-300 live-dot" />
          </div>
          <div>
            <span className="session-eyebrow text-amber-300">Time Expired</span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Time's Up
            </h2>
          </div>
        </div>

        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
          The window for{" "}
          <span className="text-slate-200 font-semibold">"{questionTitle}"</span>{" "}
          has ended. Submit what you have or move to the next question.
        </p>

        <div className="flex gap-2">
          <Button
            onClick={onSubmit}
            className="flex-1 bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-900/30"
          >
            Submit Current Code
          </Button>
          <Button
            onClick={onSkip}
            variant="outline"
            className="flex-1 border-slate-700 hover:bg-slate-800/60 text-slate-300"
          >
            Skip & Next
          </Button>
        </div>
      </div>
    </div>
  );
}

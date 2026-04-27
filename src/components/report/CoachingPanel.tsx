"use client";

import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Send, Loader2 } from "lucide-react";
import { CoachMessage } from "@/types";

interface CoachingPanelProps {
  roundId: string;
}

const SUGGESTED_PROMPTS = [
  "Explain where my Q1 code went wrong",
  "What patterns should I study next?",
  "Walk me through the optimal solution",
  "How do I improve my time complexity?",
];

export default function CoachingPanel({ roundId }: CoachingPanelProps) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<CoachMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (userMsg?: string) => {
    const content = userMsg || input.trim();
    if (!content || loading) return;

    const userEntry: CoachMessage = {
      role: "user",
      content,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userEntry]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/coaching/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roundId,
          message: content,
          history: messages,
        }),
      });

      if (!res.ok || !res.body) {
        const err = await res.json().catch(() => ({ error: "failed" }));
        throw new Error(err.error || "Coach failed");
      }

      // Stream response
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "", timestamp: new Date().toISOString() },
      ]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        assistantContent += chunk;
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = {
            ...next[next.length - 1],
            content: assistantContent,
          };
          return next;
        });
      }
    } catch (e: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Error: ${e.message}`,
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!open) {
    return (
      <Card className="bg-gradient-to-r from-indigo-500/10 to-violet-500/10 border-indigo-500/30 p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <h3 className="text-lg font-bold">AI Coach</h3>
            </div>
            <p className="text-sm text-slate-400">
              Ask questions about your solutions, patterns, and interview strategy.
            </p>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Start Coaching
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-900 border-slate-800 flex flex-col h-[500px]">
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <h3 className="font-bold">AI Coach</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setOpen(false)}
          className="text-slate-400 hover:text-white"
        >
          Close
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="space-y-3">
            <p className="text-sm text-slate-400">Try asking:</p>
            <div className="grid grid-cols-1 gap-2">
              {SUGGESTED_PROMPTS.map((p, i) => (
                <button
                  key={i}
                  onClick={() => send(p)}
                  disabled={loading}
                  className="text-left px-3 py-2 rounded bg-slate-800/50 border border-slate-700 hover:border-indigo-500 text-sm text-slate-300 transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-lg px-4 py-2 text-sm whitespace-pre-wrap ${
                m.role === "user"
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-800 text-slate-200"
              }`}
            >
              {m.content || (loading && i === messages.length - 1 ? "..." : "")}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t border-slate-800">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder="Ask about your solution, patterns, or next steps..."
            disabled={loading}
            className="flex-1 px-3 py-2 rounded bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500 disabled:opacity-50"
          />
          <Button
            onClick={() => send()}
            disabled={loading || !input.trim()}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </Card>
  );
}

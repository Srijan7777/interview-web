"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Code2,
  Zap,
  TrendingUp,
  ChevronRight,
  Flame,
  BookOpen,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
            InterviewFlow
          </div>
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              Dashboard
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="inline-block px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-sm text-indigo-300 mb-6">
          🎯 Ace Your Next Technical Interview
        </div>

        <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
          <span className="block text-white">Crack Your Next</span>
          <span className="block bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
            Technical Interview
          </span>
        </h1>

        <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
          Real-time code editor, system design canvas, AI-powered feedback, and
          unlimited practice. Master DSA, LLD, HLD, and behavioral interviews in
          one place.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link href="/setup">
            <Button
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8"
            >
              Start Practicing
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button
              size="lg"
              variant="outline"
              className="border-slate-700 hover:bg-slate-800"
            >
              View Progress
            </Button>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-20 text-sm">
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
            <div className="text-indigo-400 font-bold">15+</div>
            <div className="text-slate-500 text-xs">DSA Problems</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
            <div className="text-violet-400 font-bold">8</div>
            <div className="text-slate-500 text-xs">HLD Scenarios</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
            <div className="text-purple-400 font-bold">AI</div>
            <div className="text-slate-500 text-xs">Feedback</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us?</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <Card className="bg-slate-900 border-slate-800 p-6 hover:border-indigo-500/50 transition">
            <Code2 className="w-10 h-10 text-indigo-400 mb-4" />
            <h3 className="text-lg font-bold mb-2">Code Like the Real Thing</h3>
            <p className="text-slate-400 text-sm">
              Full Monaco editor with syntax highlighting, autocomplete, and
              instant feedback. Write real code, not pseudo.
            </p>
          </Card>

          {/* Feature 2 */}
          <Card className="bg-slate-900 border-slate-800 p-6 hover:border-violet-500/50 transition">
            <Zap className="w-10 h-10 text-violet-400 mb-4" />
            <h3 className="text-lg font-bold mb-2">System Design Canvas</h3>
            <p className="text-slate-400 text-sm">
              Draw diagrams, design architectures, and explain with visual
              clarity. Built-in Excalidraw for HLD questions.
            </p>
          </Card>

          {/* Feature 3 */}
          <Card className="bg-slate-900 border-slate-800 p-6 hover:border-purple-500/50 transition">
            <TrendingUp className="w-10 h-10 text-purple-400 mb-4" />
            <h3 className="text-lg font-bold mb-2">AI-Powered Reports</h3>
            <p className="text-slate-400 text-sm">
              Get detailed feedback on correctness, efficiency, clarity, and
              next steps. Learn from every session.
            </p>
          </Card>

          {/* Feature 4 */}
          <Card className="bg-slate-900 border-slate-800 p-6 hover:border-indigo-500/50 transition">
            <Flame className="w-10 h-10 text-indigo-400 mb-4" />
            <h3 className="text-lg font-bold mb-2">Track Your Streak</h3>
            <p className="text-slate-400 text-sm">
              Build consistency with daily practice goals. See your progress
              across topics and companies.
            </p>
          </Card>

          {/* Feature 5 */}
          <Card className="bg-slate-900 border-slate-800 p-6 hover:border-violet-500/50 transition">
            <BookOpen className="w-10 h-10 text-violet-400 mb-4" />
            <h3 className="text-lg font-bold mb-2">20 DSA Topics</h3>
            <p className="text-slate-400 text-sm">
              Rotation through all major topics: Arrays, Trees, Graphs, DP,
              and more. Never get bored.
            </p>
          </Card>

          {/* Feature 6 */}
          <Card className="bg-slate-900 border-slate-800 p-6 hover:border-purple-500/50 transition">
            <Zap className="w-10 h-10 text-purple-400 mb-4" />
            <h3 className="text-lg font-bold mb-2">Company-Specific</h3>
            <p className="text-slate-400 text-sm">
              Filter by target company. See problems Google, Amazon, Meta, and
              others actually ask.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="bg-gradient-to-r from-indigo-600/20 to-violet-600/20 border border-indigo-500/30 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Ready to interview like a pro?</h2>
          <p className="text-slate-400 mb-6">
            Start with a DSA problem, move to system design, and get instant
            feedback. No signup required.
          </p>
          <Link href="/setup">
            <Button
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-10"
            >
              Begin Interview
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 text-center text-slate-500 text-sm">
        <p>Crack your next interview. Built for engineers, by engineers. 🚀</p>
      </footer>
    </div>
  );
}

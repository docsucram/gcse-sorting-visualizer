import React, { useState } from 'react';
import { ALGORITHMS } from '../constants/algorithms';
import { BookOpen, Check, X, HelpCircle, ChevronDown, ChevronUp, AlertTriangle, Lightbulb, Star } from 'lucide-react';

export default function RevisionCards({ activeAlgorithmId = 'bubble', isDarkMode = true }) {
  const [selectedAlgo, setSelectedAlgo] = useState(activeAlgorithmId);
  const [revealedQuestions, setRevealedQuestions] = useState({});

  const algo = ALGORITHMS[selectedAlgo] || ALGORITHMS.bubble;

  const toggleQuestion = (idx) => {
    setRevealedQuestions((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto p-4 sm:p-6">
      {/* Header and Algorithm Tabs */}
      <div className={`p-5 rounded-2xl border transition-colors ${
        isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
              <BookOpen className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold">GCSE Computer Science Revision Lab</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Exam board specifications (OCR J277, AQA 8525, Edexcel), complexities, mark schemes, and common traps.
              </p>
            </div>
          </div>
        </div>

        {/* Algorithm Selection Pills */}
        <div className="flex flex-wrap gap-2">
          {Object.values(ALGORITHMS).map((a) => (
            <button
              key={a.id}
              onClick={() => {
                setSelectedAlgo(a.id);
                setRevealedQuestions({});
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                selectedAlgo === a.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : isDarkMode
                  ? 'bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700/60'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
              }`}
            >
              <span>{a.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Fact Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Complexity Matrix */}
        <div className={`p-5 rounded-2xl border flex flex-col gap-4 transition-colors ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div>
            <span className="text-[11px] font-bold text-indigo-500 uppercase tracking-wider block">
              {algo.category}
            </span>
            <h3 className="text-xl font-bold mt-0.5">{algo.name}</h3>
            <p className="text-xs text-slate-400 mt-1">{algo.examBoardRelevance}</p>
          </div>

          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Time & Space Complexity</h4>
            
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/40">
                <span className="block text-[10px] text-slate-400 uppercase font-semibold">Best Time</span>
                <span className="text-sm font-mono font-bold text-emerald-400">{algo.complexity.bestTime}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/40">
                <span className="block text-[10px] text-slate-400 uppercase font-semibold">Average</span>
                <span className="text-sm font-mono font-bold text-amber-400">{algo.complexity.averageTime}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/40">
                <span className="block text-[10px] text-slate-400 uppercase font-semibold">Worst Time</span>
                <span className="text-sm font-mono font-bold text-rose-400">{algo.complexity.worstTime}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center pt-1">
              <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/40">
                <span className="block text-[10px] text-slate-400 uppercase font-semibold">Space Complexity</span>
                <span className="text-xs font-mono font-bold text-indigo-300">{algo.complexity.space}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/40">
                <span className="block text-[10px] text-slate-400 uppercase font-semibold">Stability</span>
                <span className={`text-xs font-bold flex items-center justify-center gap-1 ${
                  algo.complexity.stable ? 'text-emerald-400' : 'text-amber-400'
                }`}>
                  {algo.complexity.stable ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                  {algo.complexity.stable ? 'Stable' : 'Unstable'}
                </span>
              </div>
            </div>
          </div>

          {/* Complexity Explanation notes */}
          <div className="p-3 rounded-xl bg-slate-800/30 text-xs space-y-1.5 text-slate-300">
            <p><strong>Best Case:</strong> {algo.complexityNotes.best}</p>
            <p><strong>Worst Case:</strong> {algo.complexityNotes.worst}</p>
            <p><strong>Space / Memory:</strong> {algo.complexityNotes.space}</p>
          </div>
        </div>

        {/* Middle Column: Pros, Cons & Algorithm Description */}
        <div className={`p-5 rounded-2xl border flex flex-col gap-4 transition-colors ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">How It Works</h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {algo.description}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-500 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" /> Advantages (Pros)
            </h4>
            <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-300 list-disc list-inside">
              {algo.pros.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-500 flex items-center gap-1.5">
              <X className="w-3.5 h-3.5" /> Disadvantages (Cons)
            </h4>
            <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-300 list-disc list-inside">
              {algo.cons.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: GCSE Exam Tips & Practice Questions */}
        <div className={`p-5 rounded-2xl border flex flex-col gap-4 transition-colors ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          {/* Exam Tips / Traps */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
            <div className="flex items-center gap-1.5 font-bold mb-1.5 text-amber-400">
              <AlertTriangle className="w-4 h-4" />
              <span>GCSE Mark Scheme Traps</span>
            </div>
            <ul className="space-y-1 list-disc list-inside text-amber-200/90">
              {algo.examTips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>

          {/* Interactive Exam Questions with Mark Scheme Reveal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5" /> Past-Paper Style Questions
            </h4>

            {algo.examQuestions.map((q, idx) => {
              const isRevealed = revealedQuestions[idx];
              return (
                <div key={idx} className="p-3 rounded-xl border border-slate-700/50 bg-slate-800/30 text-xs">
                  <p className="font-semibold text-slate-200 mb-2">{q.question}</p>
                  <button
                    onClick={() => toggleQuestion(idx)}
                    className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
                  >
                    {isRevealed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    <span>{isRevealed ? 'Hide Mark Scheme' : 'Reveal Official Mark Scheme'}</span>
                  </button>

                  {isRevealed && (
                    <div className="mt-2.5 p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 text-xs animate-in fade-in">
                      <span className="font-bold block text-emerald-400 mb-0.5">Examiner Mark Scheme:</span>
                      {q.markScheme}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Global GCSE Comparison Table */}
      <div className={`p-5 rounded-2xl border transition-colors ${
        isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
          <Star className="w-4 h-4 text-amber-500" />
          GCSE Specification Algorithm Comparison Cheat Sheet
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2.5 px-3 font-semibold">Algorithm</th>
                <th className="py-2.5 px-3 font-semibold">Best Time</th>
                <th className="py-2.5 px-3 font-semibold">Average Time</th>
                <th className="py-2.5 px-3 font-semibold">Worst Time</th>
                <th className="py-2.5 px-3 font-semibold">Space (Memory)</th>
                <th className="py-2.5 px-3 font-semibold">Stable?</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(ALGORITHMS).map((a) => (
                <tr key={a.id} className="border-b border-slate-800/60 hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-sans font-bold text-slate-200">{a.name}</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">{a.complexity.bestTime}</td>
                  <td className="py-2.5 px-3 text-amber-400 font-bold">{a.complexity.averageTime}</td>
                  <td className="py-2.5 px-3 text-rose-400 font-bold">{a.complexity.worstTime}</td>
                  <td className="py-2.5 px-3 text-indigo-300">{a.complexity.space}</td>
                  <td className="py-2.5 px-3">
                    <span className={`inline-flex items-center gap-1 font-sans text-[11px] font-bold ${
                      a.complexity.stable ? 'text-emerald-400' : 'text-slate-400'
                    }`}>
                      {a.complexity.stable ? 'Yes' : 'No'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

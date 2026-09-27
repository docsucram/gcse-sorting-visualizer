import React, { useState } from 'react';
import { ALGORITHMS, AQA_NINE_MARK_QUESTION, SYLLABUS_BOARDS } from '../constants/algorithms';
import {
  BookOpen,
  Check,
  X,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Award,
  Sparkles,
  Star,
  FileCheck2,
  CheckCircle2,
} from 'lucide-react';

export default function RevisionCards({ activeAlgorithmId = 'bubble', isDarkMode = true }) {
  const [selectedAlgo, setSelectedAlgo] = useState(activeAlgorithmId);
  const [syllabusFilter, setSyllabusFilter] = useState('all'); // 'all' | 'aqa' | 'ocr'
  const [revealedQuestions, setRevealedQuestions] = useState({});
  const [showModelAnswer, setShowModelAnswer] = useState(false);
  const [checklist, setChecklist] = useState({});

  const algo = ALGORITHMS[selectedAlgo] || ALGORITHMS.bubble;

  const toggleQuestion = (idx) => {
    setRevealedQuestions((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const toggleChecklistItem = (idx) => {
    setChecklist((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  // Filtered algorithms based on board
  const displayedAlgos = Object.values(ALGORITHMS).filter((a) => {
    if (syllabusFilter === 'aqa') return a.aqaCore;
    if (syllabusFilter === 'ocr') return a.ocrCore;
    return true;
  });

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto p-4 sm:p-6">
      {/* Header and Syllabus Switcher */}
      <div className={`p-5 rounded-2xl border transition-colors ${
        isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
              <BookOpen className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold">GCSE Computer Science Revision Lab</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Exam board specifications (AQA 8525 & OCR J277), complexities, mark schemes, and essay scaffolds.
              </p>
            </div>
          </div>

          {/* Syllabus Board Filter */}
          <div className="flex items-center p-1 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs font-semibold">
            {Object.values(SYLLABUS_BOARDS).map((board) => (
              <button
                key={board.id}
                onClick={() => setSyllabusFilter(board.id)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  syllabusFilter === board.id
                    ? 'bg-indigo-600 text-white shadow-2xs font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {board.label}
              </button>
            ))}
          </div>
        </div>

        {/* Algorithm Selection Pills */}
        <div className="flex flex-wrap gap-2">
          {displayedAlgos.map((a) => (
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
              {a.aqaCore && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                  AQA Core
                </span>
              )}
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
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[11px] font-bold text-indigo-500 uppercase tracking-wider block">
                {algo.category}
              </span>
              {algo.aqaCore && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                  AQA 8525 Core
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold">{algo.name}</h3>
            <p className="text-xs text-slate-400 mt-0.5">{algo.examBoardRelevance}</p>
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
            <p><strong>Space / RAM:</strong> {algo.complexityNotes.space}</p>
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

      {/* AQA 9-Mark Extended Response Scenario & Evaluation Guide */}
      <div className={`p-5 sm:p-6 rounded-2xl border transition-colors ${
        isDarkMode ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border-indigo-500/40' : 'bg-gradient-to-br from-white via-slate-50 to-indigo-50/50 border-indigo-200 shadow-sm'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Award className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-bold text-base text-slate-100">
                {AQA_NINE_MARK_QUESTION.title}
              </h3>
              <p className="text-xs text-slate-400">
                Evaluation masterclass: Bubble Sort vs Merge Sort in real-world scenarios
              </p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold text-xs flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            9 Marks High-Tariff
          </span>
        </div>

        {/* Scenario Box */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs leading-relaxed text-slate-300 mb-5">
          <strong className="block text-indigo-400 font-bold mb-1.5 uppercase tracking-wider text-[11px]">
            Exam Scenario:
          </strong>
          <pre className="whitespace-pre-line font-sans m-0">
            {AQA_NINE_MARK_QUESTION.scenario}
          </pre>
        </div>

        {/* Analysis breakdown for System A vs System B */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          {AQA_NINE_MARK_QUESTION.keyPoints.map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border text-xs ${
                isDarkMode ? 'bg-slate-800/40 border-slate-700/60' : 'bg-white border-slate-200'
              }`}
            >
              <h4 className="font-bold text-sm text-slate-100 mb-1">{item.topic}</h4>
              <span className="inline-block px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold text-[11px] mb-2.5">
                {item.recommendation}
              </span>
              <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                {item.reasons.map((r, rIdx) => (
                  <li key={rIdx}>{r}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Interactive Self-Assessment Checklist */}
        <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 mb-4 text-xs">
          <h4 className="font-bold text-slate-200 mb-2 flex items-center gap-1.5">
            <FileCheck2 className="w-4 h-4 text-indigo-400" />
            <span>Examiner Criteria Checklist (Level 3 Band)</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
            {[
              'Analyzed time complexity of both Bubble Sort O(n²) and Merge Sort O(n log n)',
              'Addressed System A hardware: 2 KB RAM demands O(1) in-place Bubble Sort',
              'Analyzed recursive stack overhead risk on 2 KB microcontroller',
              'Addressed System B scale: 250,000 records requires Merge Sort to avoid freeze',
              'Noted server has sufficient RAM to accommodate Merge Sort O(n) auxiliary list',
              'Reached clear, justified final conclusions for both systems',
            ].map((crit, cIdx) => (
              <label
                key={cIdx}
                className="flex items-start gap-2 p-2 rounded-lg bg-slate-900/40 border border-slate-800 cursor-pointer hover:bg-slate-900/70 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={!!checklist[cIdx]}
                  onChange={() => toggleChecklistItem(cIdx)}
                  className="mt-0.5 accent-indigo-500 rounded"
                />
                <span className={checklist[cIdx] ? 'line-through text-slate-500' : 'text-slate-300'}>
                  {crit}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Reveal Exemplar Model Answer */}
        <div>
          <button
            onClick={() => setShowModelAnswer(!showModelAnswer)}
            className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-md shadow-indigo-600/30"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{showModelAnswer ? 'Hide Exemplar 9-Mark Model Answer' : 'Reveal Full 9/9 Mark Model Answer'}</span>
          </button>

          {showModelAnswer && (
            <div className="mt-3 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs sm:text-sm text-emerald-100 leading-relaxed animate-in fade-in">
              <strong className="block text-emerald-400 font-bold mb-2">
                Level 3 (9/9 Marks) Exemplar Model Essay:
              </strong>
              <p className="whitespace-pre-line text-slate-200">
                {AQA_NINE_MARK_QUESTION.modelAnswer}
              </p>
            </div>
          )}
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
                <th className="py-2.5 px-3 font-semibold">Syllabus Core</th>
                <th className="py-2.5 px-3 font-semibold">Best Time</th>
                <th className="py-2.5 px-3 font-semibold">Average Time</th>
                <th className="py-2.5 px-3 font-semibold">Worst Time</th>
                <th className="py-2.5 px-3 font-semibold">Space (RAM)</th>
                <th className="py-2.5 px-3 font-semibold">Stable?</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(ALGORITHMS).map((a) => (
                <tr key={a.id} className="border-b border-slate-800/60 hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-sans font-bold text-slate-200 flex items-center gap-1.5">
                    {a.name}
                  </td>
                  <td className="py-2.5 px-3 font-sans">
                    {a.aqaCore ? (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                        AQA & OCR
                      </span>
                    ) : a.ocrCore ? (
                      <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 font-bold text-[10px]">
                        OCR J277
                      </span>
                    ) : (
                      <span className="text-slate-500 text-[10px]">Extension</span>
                    )}
                  </td>
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

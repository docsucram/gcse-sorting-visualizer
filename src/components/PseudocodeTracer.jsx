import React, { useEffect, useRef } from 'react';
import { ALGORITHMS } from '../constants/algorithms';
import { Code2, Variable, Info } from 'lucide-react';

export default function PseudocodeTracer({
  algorithmId = 'bubble',
  activeLine = 1,
  variables = {},
  explanation = '',
  isDarkMode = true,
}) {
  const algo = ALGORITHMS[algorithmId] || ALGORITHMS.bubble;
  const pseudocode = algo.pseudocode || [];
  const activeLineRef = useRef(null);

  useEffect(() => {
    if (activeLineRef.current) {
      activeLineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [activeLine]);

  // Clean formatted variables
  const varEntries = Object.entries(variables).filter(([k, v]) => v !== undefined && k !== 'message');

  return (
    <div className={`flex flex-col h-full rounded-2xl border transition-colors ${
      isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
    }`}>
      {/* Header */}
      <div className={`flex items-center justify-between px-4 py-3 border-b text-xs font-semibold ${
        isDarkMode ? 'border-slate-800 text-slate-300' : 'border-slate-100 text-slate-700'
      }`}>
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-indigo-500" />
          <span>Official GCSE Exam Pseudocode (OCR / AQA)</span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 text-[10px] font-bold uppercase tracking-wider">
          Live Tracer
        </span>
      </div>

      {/* Code Editor Body */}
      <div className="flex-1 p-3 overflow-y-auto max-h-[340px] font-mono text-xs sm:text-[13px] leading-relaxed">
        {pseudocode.map((lineObj) => {
          const isActive = lineObj.line === activeLine;
          return (
            <div
              key={lineObj.line}
              ref={isActive ? activeLineRef : null}
              className={`flex items-start gap-3 px-2.5 py-1 rounded-lg transition-colors ${
                isActive
                  ? isDarkMode
                    ? 'bg-indigo-600/30 text-indigo-200 font-semibold ring-1 ring-indigo-500/60 shadow-sm'
                    : 'bg-indigo-50 text-indigo-900 font-semibold ring-1 ring-indigo-400/50 shadow-sm'
                  : isDarkMode
                  ? 'text-slate-400 hover:bg-slate-800/40'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className={`w-5 shrink-0 text-right select-none font-bold text-[11px] ${
                isActive ? 'text-indigo-400' : 'text-slate-500 dark:text-slate-600'
              }`}>
                {lineObj.line}
              </span>
              <pre className="flex-1 m-0 overflow-x-auto whitespace-pre font-mono">
                {lineObj.text}
              </pre>
            </div>
          );
        })}
      </div>

      {/* Live Variable Inspector */}
      <div className={`p-3 border-t ${
        isDarkMode ? 'border-slate-800 bg-slate-950/40' : 'border-slate-100 bg-slate-50/70'
      }`}>
        <div className="flex items-center gap-1.5 text-xs font-semibold mb-2 text-slate-500 dark:text-slate-400">
          <Variable className="w-3.5 h-3.5 text-amber-500" />
          <span>Variable Inspector</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {varEntries.length > 0 ? (
            varEntries.map(([key, val]) => (
              <span
                key={key}
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-mono font-medium ${
                  isDarkMode
                    ? 'bg-slate-800 text-amber-300 border border-slate-700'
                    : 'bg-white text-amber-700 border border-amber-200 shadow-2xs'
                }`}
              >
                <span className="text-slate-400 dark:text-slate-400 font-bold">{key}:</span>
                <span>{typeof val === 'boolean' ? (val ? 'True' : 'False') : JSON.stringify(val)}</span>
              </span>
            ))
          ) : (
            <span className="text-xs text-slate-400 italic">No variables active yet</span>
          )}
        </div>
      </div>

      {/* Live GCSE Explanation & Mark Scheme Commentary */}
      <div className={`p-3 border-t rounded-b-2xl ${
        isDarkMode ? 'border-slate-800 bg-indigo-950/20' : 'border-slate-100 bg-indigo-50/40'
      }`}>
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-snug">
            {explanation || 'Select play or step to trace algorithm execution.'}
          </p>
        </div>
      </div>
    </div>
  );
}

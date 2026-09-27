import React, { useState } from 'react';
import { Table, Copy, Check, ExternalLink, FastForward } from 'lucide-react';

export default function TraceTable({
  steps = [],
  currentStepIndex = 0,
  onJumpToStep = () => {},
  isDarkMode = true,
}) {
  const [copied, setCopied] = useState(false);

  // Extract all pass-end steps and initial step
  const passSteps = steps.filter((s, idx) => idx === 0 || s.isPassEnd);

  // Determine which pass step matches or precedes the current step
  const currentStep = steps[currentStepIndex] || steps[0];
  const activePass = currentStep?.pass ?? 0;

  const copyToClipboard = (format = 'markdown') => {
    if (passSteps.length === 0) return;

    let text = '';
    if (format === 'markdown') {
      text += '| Pass | Array State | Comparisons | Swaps / Shifts | Notes |\n';
      text += '| :--- | :--- | :---: | :---: | :--- |\n';
      passSteps.forEach((s) => {
        const passLabel = s.pass === 0 ? 'Initial' : `Pass ${s.pass}`;
        const arrayStr = `[${s.array.join(', ')}]`;
        text += `| ${passLabel} | \`${arrayStr}\` | ${s.comparisons} | ${s.swaps} | ${s.explanation.replace(/\|/g, '-')} |\n`;
      });
    } else {
      // CSV format
      text += 'Pass,Array State,Comparisons,Swaps,Notes\n';
      passSteps.forEach((s) => {
        const passLabel = s.pass === 0 ? 'Initial' : `Pass ${s.pass}`;
        text += `"${passLabel}","[${s.array.join(', ')}]",${s.comparisons},${s.swaps},"${s.explanation.replace(/"/g, '""')}"\n`;
      });
    }

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={`flex flex-col h-full rounded-2xl border transition-colors ${
      isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
    }`}>
      {/* Header */}
      <div className={`flex items-center justify-between px-4 py-3 border-b text-xs font-semibold ${
        isDarkMode ? 'border-slate-800 text-slate-300' : 'border-slate-100 text-slate-700'
      }`}>
        <div className="flex items-center gap-2">
          <Table className="w-4 h-4 text-emerald-500" />
          <span>GCSE Exam Trace Table (Pass-by-Pass)</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => copyToClipboard('markdown')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${
              copied
                ? 'bg-emerald-500/20 text-emerald-500'
                : isDarkMode
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
            title="Copy trace table formatted as Markdown for homework or notes"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
            {copied ? 'Copied MD!' : 'Copy Table'}
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="flex-1 p-3 overflow-auto max-h-[340px]">
        {passSteps.length > 0 ? (
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className={`border-b ${
                isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'
              }`}>
                <th className="py-2 px-2.5 font-semibold">Pass</th>
                <th className="py-2 px-2.5 font-semibold">Array State</th>
                <th className="py-2 px-2 font-semibold text-center">Cmp</th>
                <th className="py-2 px-2 font-semibold text-center">Swp</th>
                <th className="py-2 px-2.5 font-semibold">Exam Description</th>
              </tr>
            </thead>
            <tbody>
              {passSteps.map((s, idx) => {
                const isActiveRow = s.pass === activePass;
                // Find the index of this step in the global steps array
                const stepIdx = steps.indexOf(s);

                return (
                  <tr
                    key={idx}
                    onClick={() => stepIdx !== -1 && onJumpToStep(stepIdx)}
                    className={`cursor-pointer border-b transition-colors ${
                      isActiveRow
                        ? isDarkMode
                          ? 'bg-emerald-950/40 text-emerald-200 font-semibold'
                          : 'bg-emerald-50/80 text-emerald-900 font-semibold'
                        : isDarkMode
                        ? 'border-slate-800/60 hover:bg-slate-800/40 text-slate-300'
                        : 'border-slate-100 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <td className="py-2 px-2.5 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-bold ${
                        s.pass === 0
                          ? 'bg-slate-500/10 text-slate-500'
                          : isActiveRow
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-indigo-500/10 text-indigo-400'
                      }`}>
                        {s.pass === 0 ? 'Initial' : `Pass ${s.pass}`}
                      </span>
                    </td>
                    <td className="py-2 px-2.5 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <span className="text-slate-400">[</span>
                        {s.array.map((num, i) => {
                          const isSortedInThisStep = s.sortedIndices?.includes(i);
                          return (
                            <span
                              key={i}
                              className={`px-1 rounded ${
                                isSortedInThisStep
                                  ? 'bg-emerald-500/20 text-emerald-400 font-bold'
                                  : ''
                              }`}
                            >
                              {num}
                              {i < s.array.length - 1 ? ',' : ''}
                            </span>
                          );
                        })}
                        <span className="text-slate-400">]</span>
                      </div>
                    </td>
                    <td className="py-2 px-2 text-center text-slate-400">
                      {s.comparisons}
                    </td>
                    <td className="py-2 px-2 text-center text-slate-400">
                      {s.swaps}
                    </td>
                    <td className="py-2 px-2.5 font-sans text-xs text-slate-500 dark:text-slate-400 max-w-xs truncate" title={s.explanation}>
                      {s.explanation}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="flex items-center justify-center h-32 text-xs text-slate-400">
            Click Start or Step to populate the trace table.
          </div>
        )}
      </div>

      {/* Footer tip */}
      <div className={`p-2.5 px-4 border-t text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between ${
        isDarkMode ? 'border-slate-800 bg-slate-950/20' : 'border-slate-100 bg-slate-50/50'
      }`}>
        <span>💡 Click any pass row to jump straight to that pass.</span>
        <span className="hidden sm:inline">Matches 3–5 mark GCSE exam trace questions</span>
      </div>
    </div>
  );
}

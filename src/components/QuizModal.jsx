import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, Award, Flame, ArrowRight, X } from 'lucide-react';

export default function QuizModal({
  quiz = null,
  isOpen = false,
  onAnswer = () => {},
  onClose = () => {},
  quizStats = { score: 0, streak: 0, total: 0 },
  isDarkMode = true,
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  if (!isOpen || !quiz) return null;

  const isCorrect = selectedOption === quiz.correctIndex;

  const handleSelect = (idx) => {
    if (hasSubmitted) return;
    setSelectedOption(idx);
    setHasSubmitted(true);
    onAnswer(idx === quiz.correctIndex);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setHasSubmitted(false);
    onClose();
  };

  // Calculate GCSE Grade estimate (1 to 9)
  const accuracy = quizStats.total > 0 ? (quizStats.score / quizStats.total) * 100 : 0;
  let estimatedGrade = 4;
  if (quizStats.total >= 3) {
    if (accuracy >= 90) estimatedGrade = 9;
    else if (accuracy >= 80) estimatedGrade = 8;
    else if (accuracy >= 70) estimatedGrade = 7;
    else if (accuracy >= 60) estimatedGrade = 6;
    else if (accuracy >= 50) estimatedGrade = 5;
    else estimatedGrade = 4;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className={`relative w-full max-w-lg rounded-2xl p-6 shadow-2xl border transition-all ${
        isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        {/* Top bar with stats & streak */}
        <div className={`flex items-center justify-between pb-3 border-b mb-4 ${
          isDarkMode ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
              <HelpCircle className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-bold text-sm sm:text-base">Predict the Next Move</h3>
              <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Active Recall & GCSE Mark Scheme Check</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {quizStats.streak > 1 && (
              <span className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full animate-pulse ${
                isDarkMode ? 'text-amber-400 bg-amber-400/10' : 'text-amber-900 bg-amber-100 border border-amber-300'
              }`}>
                <Flame className="w-3.5 h-3.5 fill-amber-400" />
                {quizStats.streak} Streak
              </span>
            )}
            <span className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
              isDarkMode ? 'text-emerald-400 bg-emerald-400/10' : 'text-emerald-800 bg-emerald-100 border border-emerald-300'
            }`}>
              <Award className="w-3.5 h-3.5" />
              Grade {estimatedGrade}
            </span>
            <button
              onClick={handleNext}
              className={`p-1 rounded-lg transition-colors ${
                isDarkMode ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title="Skip question"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Question text */}
        <div className="my-4">
          <p className={`text-sm sm:text-base font-bold leading-snug ${
            isDarkMode ? 'text-slate-100' : 'text-slate-900'
          }`}>
            {quiz.question}
          </p>
        </div>

        {/* Interactive options */}
        <div className="space-y-2.5 my-4">
          {quiz.options.map((opt, idx) => {
            const isThisChosen = selectedOption === idx;
            const isThisCorrect = idx === quiz.correctIndex;

            let buttonStyle = isDarkMode
              ? 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-200'
              : 'bg-slate-50 hover:bg-slate-100 border-slate-300 text-slate-900 font-medium';

            if (hasSubmitted) {
              if (isThisCorrect) {
                buttonStyle = isDarkMode
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold ring-1 ring-emerald-500'
                  : 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-1 ring-emerald-500';
              } else if (isThisChosen && !isThisCorrect) {
                buttonStyle = isDarkMode
                  ? 'bg-rose-500/20 border-rose-500 text-rose-300 font-semibold ring-1 ring-rose-500'
                  : 'bg-rose-50 border-rose-500 text-rose-950 font-bold ring-1 ring-rose-500';
              } else {
                buttonStyle = isDarkMode
                  ? 'opacity-50 border-slate-700 text-slate-500'
                  : 'opacity-50 border-slate-200 text-slate-400';
              }
            }

            return (
              <button
                key={idx}
                disabled={hasSubmitted}
                onClick={() => handleSelect(idx)}
                className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${buttonStyle}`}
              >
                <span>{opt}</span>
                {hasSubmitted && isThisCorrect && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                )}
                {hasSubmitted && isThisChosen && !isThisCorrect && (
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback explanation */}
        {hasSubmitted && (
          <div className={`p-3.5 rounded-xl border mb-4 text-xs leading-relaxed animate-in fade-in ${
            isCorrect
              ? isDarkMode ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200' : 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : isDarkMode ? 'bg-rose-950/40 border-rose-500/40 text-rose-200' : 'bg-rose-50 border-rose-300 text-rose-950'
          }`}>
            <p className="font-bold mb-1 flex items-center gap-1.5">
              {isCorrect ? '✅ Exam Mark Awarded!' : '❌ Not quite!'}
            </p>
            <p className={isDarkMode ? 'text-slate-300' : 'text-slate-800 font-medium'}>{quiz.explanation}</p>
          </div>
        )}

        {/* Action Button */}
        {hasSubmitted && (
          <button
            onClick={handleNext}
            className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30"
          >
            <span>Continue Trace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

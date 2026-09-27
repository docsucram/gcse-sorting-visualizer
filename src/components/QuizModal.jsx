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
        isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'
      }`}>
        {/* Top bar with stats & streak */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-700/40 mb-4">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
              <HelpCircle className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-bold text-sm sm:text-base">Predict the Next Move</h3>
              <p className="text-xs text-slate-400">Active Recall & GCSE Mark Scheme Check</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {quizStats.streak > 1 && (
              <span className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full animate-pulse">
                <Flame className="w-3.5 h-3.5 fill-amber-400" />
                {quizStats.streak} Streak
              </span>
            )}
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full">
              <Award className="w-3.5 h-3.5" />
              Grade {estimatedGrade}
            </span>
            <button
              onClick={handleNext}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              title="Skip question"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Question text */}
        <div className="my-4">
          <p className="text-sm sm:text-base font-semibold text-slate-100 leading-snug">
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
              : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700';

            if (hasSubmitted) {
              if (isThisCorrect) {
                buttonStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold ring-1 ring-emerald-500';
              } else if (isThisChosen && !isThisCorrect) {
                buttonStyle = 'bg-rose-500/20 border-rose-500 text-rose-300 font-semibold ring-1 ring-rose-500';
              } else {
                buttonStyle = 'opacity-50 border-slate-700 text-slate-500';
              }
            }

            return (
              <button
                key={idx}
                disabled={hasSubmitted}
                onClick={() => handleSelect(idx)}
                className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-3 ${buttonStyle}`}
              >
                <span>{opt}</span>
                {hasSubmitted && isThisCorrect && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                )}
                {hasSubmitted && isThisChosen && !isThisCorrect && (
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback explanation */}
        {hasSubmitted && (
          <div className={`p-3.5 rounded-xl border mb-4 text-xs leading-relaxed animate-in fade-in ${
            isCorrect
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
              : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
          }`}>
            <p className="font-bold mb-1 flex items-center gap-1.5">
              {isCorrect ? '✅ Exam Mark Awarded!' : '❌ Not quite!'}
            </p>
            <p className="text-slate-300">{quiz.explanation}</p>
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

import React from 'react';
import { ALGORITHMS } from '../constants/algorithms';
import {
  Sparkles,
  BarChart3,
  Image as ImageIcon,
  Swords,
  BookOpen,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Keyboard,
  GraduationCap,
} from 'lucide-react';

export default function Navbar({
  activeView = 'visualizer', // 'visualizer' | 'race' | 'revision'
  onViewChange = () => {},
  visualizerMode = 'bars', // 'bars' | 'image'
  onVisualizerModeChange = () => {},
  selectedAlgorithm = 'bubble',
  onAlgorithmChange = () => {},
  isDarkMode = true,
  onToggleTheme = () => {},
  audioMode = 'chimes',
  onCycleAudio = () => {},
  onOpenShortcuts = () => {},
}) {
  return (
    <header className={`sticky top-0 z-40 w-full border-b backdrop-blur-md transition-colors ${
      isDarkMode ? 'bg-slate-950/85 border-slate-800 text-white' : 'bg-white/85 border-slate-200 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo and GCSE Badge */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-md shadow-indigo-500/20 text-white">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-sm sm:text-base tracking-tight leading-none">
                GCSE Sort Lab
              </h1>
              <span className="px-1.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 font-bold text-[10px] tracking-wide border border-indigo-500/20">
                OCR • AQA • Edexcel
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              Interactive GCSE Computer Science Visualizer
            </p>
          </div>
        </div>

        {/* View Switcher Tabs (Visualizer | Race | Revision) */}
        <nav className={`flex items-center p-1 rounded-xl border text-xs font-semibold ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          <button
            onClick={() => onViewChange('visualizer')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeView === 'visualizer'
                ? 'bg-indigo-600 text-white shadow-2xs font-bold'
                : isDarkMode
                ? 'text-slate-400 hover:text-slate-200'
                : 'text-slate-600 hover:text-slate-900 font-medium'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Visualizer</span>
          </button>

          <button
            onClick={() => onViewChange('race')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeView === 'race'
                ? 'bg-indigo-600 text-white shadow-2xs font-bold'
                : isDarkMode
                ? 'text-slate-400 hover:text-slate-200'
                : 'text-slate-600 hover:text-slate-900 font-medium'
            }`}
          >
            <Swords className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Race Mode</span>
          </button>

          <button
            onClick={() => onViewChange('revision')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeView === 'revision'
                ? 'bg-indigo-600 text-white shadow-2xs font-bold'
                : isDarkMode
                ? 'text-slate-400 hover:text-slate-200'
                : 'text-slate-600 hover:text-slate-900 font-medium'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Revision Cards</span>
          </button>
        </nav>

        {/* Right Tools: Algorithm selector, Dual Mode toggle, Theme, Audio */}
        <div className="flex items-center gap-2">
          {/* Algorithm selector (shown only in visualizer view) */}
          {activeView === 'visualizer' && (
            <div className="flex items-center gap-1.5">
              <select
                value={selectedAlgorithm}
                onChange={(e) => onAlgorithmChange(e.target.value)}
                className={`text-xs font-bold px-2.5 py-1.5 rounded-xl border outline-hidden transition-colors cursor-pointer ${
                  isDarkMode
                    ? 'bg-slate-800 border-slate-700 text-white hover:bg-slate-750'
                    : 'bg-white border-slate-200 text-slate-900 hover:bg-slate-50 shadow-2xs'
                }`}
              >
                {Object.values(ALGORITHMS).map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} {a.aqaCore ? '★ [AQA Core]' : ''}
                  </option>
                ))}
              </select>

              {/* Mode A (Bars) vs Mode B (Image Slices) */}
              <div className={`flex items-center p-0.5 rounded-xl border text-xs ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
              }`}>
                <button
                  onClick={() => onVisualizerModeChange('bars')}
                  className={`p-1.5 rounded-lg transition-all ${
                    visualizerMode === 'bars'
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : isDarkMode
                      ? 'text-slate-400 hover:text-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Mode A: Sleek Animated Bars"
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onVisualizerModeChange('image')}
                  className={`p-1.5 rounded-lg transition-all ${
                    visualizerMode === 'image'
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : isDarkMode
                      ? 'text-slate-400 hover:text-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Mode B: Vertical Image Slice Sorting"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Keyboard Shortcuts Button */}
          <button
            onClick={onOpenShortcuts}
            className={`p-2 rounded-xl border text-xs transition-colors hidden md:flex items-center ${
              isDarkMode ? 'border-slate-800 bg-slate-800/80 text-slate-300 hover:text-white' : 'border-slate-200 bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
            title="Keyboard shortcuts [?]"
          >
            <Keyboard className="w-4 h-4" />
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-xl border text-xs transition-colors ${
              isDarkMode ? 'border-slate-800 bg-slate-800/80 text-amber-400 hover:bg-slate-700' : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
            title="Toggle Dark / Light Mode"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}

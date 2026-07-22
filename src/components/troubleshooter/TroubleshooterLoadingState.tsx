import React from 'react';
import { AlertOctagon, Sparkles, Zap, FlaskConical, Search, Sliders } from 'lucide-react';

export const TroubleshooterLoadingState: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-3xl border border-[#E8E8EE] dark:border-slate-800 shadow-xs text-center space-y-8 animate-pulse">
      
      {/* Animated Spinner & Icon */}
      <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-[#E8E8FF] dark:border-slate-800 border-t-[#6C63FF] animate-spin" />
        <div className="w-12 h-12 rounded-2xl bg-[#E8E8FF] dark:bg-purple-950 flex items-center justify-center text-[#6C63FF] dark:text-violet-300">
          <AlertOctagon className="w-6 h-6 animate-bounce" />
        </div>
      </div>

      {/* Title & Subtitle */}
      <div className="space-y-2 max-w-md mx-auto">
        <h3 className="text-base sm:text-lg font-extrabold text-[#1A1A1D] dark:text-white">
          Gemini AI Diagnosing Experiment Failure...
        </h3>
        <p className="text-xs text-[#626268] dark:text-slate-400">
          Evaluating symptom patterns, reagent thermodynamics, and equipment variables against Good Laboratory Practice (GLP) standards.
        </p>
      </div>

      {/* Progress Steps Simulation */}
      <div className="max-w-sm mx-auto space-y-2 text-left text-xs font-semibold text-[#626268] dark:text-slate-300">
        <div className="p-3 rounded-2xl bg-[#FAF9FF] dark:bg-slate-950 border border-[#E8E8EE] dark:border-slate-800 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#6C63FF] animate-ping" />
          <span>Cross-referencing symptom matrix against protocol guidelines...</span>
        </div>
        <div className="p-3 rounded-2xl bg-[#FAF9FF] dark:bg-slate-950 border border-[#E8E8EE] dark:border-slate-800 flex items-center gap-2 opacity-80">
          <div className="w-2 h-2 rounded-full bg-amber-500" />
          <span>Formulating ranked root cause probabilities & solution steps...</span>
        </div>
        <div className="p-3 rounded-2xl bg-[#FAF9FF] dark:bg-slate-950 border border-[#E8E8EE] dark:border-slate-800 flex items-center gap-2 opacity-60">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Generating interactive bench checklist & confidence assessment...</span>
        </div>
      </div>

    </div>
  );
};

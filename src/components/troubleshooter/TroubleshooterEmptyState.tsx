import React from 'react';
import { 
  AlertOctagon, 
  Sparkles, 
  Zap, 
  FlaskConical, 
  Search, 
  ShieldCheck, 
  CheckCircle2, 
  ListChecks, 
  HelpCircle,
  Gauge
} from 'lucide-react';

interface TroubleshooterEmptyStateProps {
  onLoadSample: (sampleKey: 'gel' | 'western' | 'rna') => void;
}

export const TroubleshooterEmptyState: React.FC<TroubleshooterEmptyStateProps> = ({ onLoadSample }) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-3xl border border-[#E8E8EE] dark:border-slate-800 shadow-xs text-center space-y-6">
      
      {/* Icon Badge */}
      <div className="mx-auto w-16 h-16 rounded-3xl bg-[#E8E8FF] dark:bg-purple-950/80 flex items-center justify-center text-[#6C63FF] dark:text-violet-300 border border-[#C6C8FF] dark:border-purple-800 shadow-inner">
        <AlertOctagon className="w-8 h-8" />
      </div>

      {/* Main Text */}
      <div className="space-y-2 max-w-lg mx-auto">
        <h3 className="text-lg sm:text-xl font-extrabold text-[#1A1A1D] dark:text-white tracking-tight">
          AI Experiment Diagnostic Assistant
        </h3>
        <p className="text-xs sm:text-sm text-[#626268] dark:text-slate-300 leading-relaxed">
          Select an experiment type and describe the observed failure symptoms. BenchWise will systematically analyze potential root causes, parameter checks, and corrective action steps.
        </p>
      </div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-2xl mx-auto pt-2">
        
        <div className="p-4 rounded-2xl bg-[#FAF9FF] dark:bg-slate-950 border border-[#E8E8EE] dark:border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#6C63FF] dark:text-violet-300">
            <Zap className="w-4 h-4 text-amber-500" />
            Ranked Causes
          </div>
          <p className="text-[11px] text-[#626268] dark:text-slate-400">
            Probability breakdown from most likely to least likely root causes.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#FAF9FF] dark:bg-slate-950 border border-[#E8E8EE] dark:border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#6C63FF] dark:text-violet-300">
            <ListChecks className="w-4 h-4 text-emerald-500" />
            Bench Verification
          </div>
          <p className="text-[11px] text-[#626268] dark:text-slate-400">
            Interactive parameter checks (primers, pH, reagents, calibration).
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#FAF9FF] dark:bg-slate-950 border border-[#E8E8EE] dark:border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#6C63FF] dark:text-violet-300">
            <Gauge className="w-4 h-4 text-[#6C63FF]" />
            Confidence Meter
          </div>
          <p className="text-[11px] text-[#626268] dark:text-slate-400">
            Clear diagnostic confidence rating based on submitted detail.
          </p>
        </div>

      </div>

      {/* Quick Try Sample Button Prompt */}
      <div className="pt-4 border-t border-[#E8E8EE] dark:border-slate-800">
        <span className="text-xs font-bold text-[#626268] dark:text-slate-400 block mb-3 uppercase tracking-wider">
          Or try a pre-configured sample troubleshooting scenario:
        </span>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => onLoadSample('gel')}
            id="btn-empty-sample-gel"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold bg-[#E8E8FF] dark:bg-purple-950 hover:bg-[#C6C8FF] text-[#6C63FF] dark:text-violet-300 border border-[#C6C8FF] dark:border-purple-800 transition-all cursor-pointer"
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Gel Electrophoresis (No Bands)</span>
          </button>

          <button
            type="button"
            onClick={() => onLoadSample('western')}
            id="btn-empty-sample-western"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-[#1A1A1D] dark:text-slate-200 border border-[#E8E8EE] dark:border-slate-700 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Western Blot (High Background)</span>
          </button>

          <button
            type="button"
            onClick={() => onLoadSample('rna')}
            id="btn-empty-sample-rna"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-[#1A1A1D] dark:text-slate-200 border border-[#E8E8EE] dark:border-slate-700 transition-all cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-[#6C63FF]" />
            <span>RNA Extraction (Low Yield & Purity)</span>
          </button>
        </div>
      </div>

    </div>
  );
};

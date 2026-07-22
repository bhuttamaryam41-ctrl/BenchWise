import React from 'react';
import { FileCheck2, Sparkles, ShieldCheck, Zap, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface EmptyAuditStateProps {
  onLoadSample: (type: 'pcr' | 'western' | 'dna') => void;
}

export const EmptyAuditState: React.FC<EmptyAuditStateProps> = ({ onLoadSample }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-[#E8E8EE] dark:border-slate-800 p-8 text-center space-y-8 shadow-xs">
      
      {/* Visual Banner / Icon */}
      <div className="max-w-md mx-auto space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-[#E8E8FF] dark:bg-purple-950/80 text-[#6C63FF] dark:text-violet-300 flex items-center justify-center mx-auto shadow-sm">
          <FileCheck2 className="w-8 h-8 text-[#6C63FF]" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#E8E8FF] dark:bg-purple-950/60 text-[#6C63FF] dark:text-violet-300 border border-[#C6C8FF] dark:border-purple-800">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-Powered Bench Audit Ready</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-[#1A1A1D] dark:text-white tracking-tight">
            Ready for Scientific Protocol Audit
          </h3>

          <p className="text-xs sm:text-sm text-[#626268] dark:text-slate-300 leading-relaxed">
            Paste your experimental procedure or load a standard template on the left panel to receive an instant, multi-dimensional GLP protocol evaluation.
          </p>
        </div>
      </div>

      {/* Quick Load Example Presets */}
      <div className="bg-[#FAF9FF] dark:bg-slate-950/60 p-5 rounded-2xl border border-[#E8E8EE] dark:border-slate-800/80 max-w-lg mx-auto space-y-3">
        <span className="text-xs font-bold text-[#1A1A1D] dark:text-slate-200 block uppercase tracking-wider">
          Or try a pre-loaded sample protocol:
        </span>

        <div className="flex flex-wrap justify-center gap-2">
          <button
            id="load-sample-pcr-btn"
            onClick={() => onLoadSample('pcr')}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-[#C6C8FF] dark:border-purple-800 text-[#6C63FF] dark:text-violet-300 hover:bg-[#E8E8FF] transition-all cursor-pointer shadow-2xs flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>PCR Master Mix Protocol</span>
          </button>

          <button
            id="load-sample-western-btn"
            onClick={() => onLoadSample('western')}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-[#E8E8EE] dark:border-slate-800 text-[#1A1A1D] dark:text-slate-200 hover:border-[#C6C8FF] transition-all cursor-pointer shadow-2xs flex items-center gap-1.5"
          >
            <span>Western Blot Assay</span>
          </button>

          <button
            id="load-sample-dna-btn"
            onClick={() => onLoadSample('dna')}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-[#E8E8EE] dark:border-slate-800 text-[#1A1A1D] dark:text-slate-200 hover:border-[#C6C8FF] transition-all cursor-pointer shadow-2xs flex items-center gap-1.5"
          >
            <span>DNA Extraction Kit</span>
          </button>
        </div>
      </div>

      {/* Audit Checklist Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-2xl mx-auto pt-2">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-950 border border-[#E8E8EE] dark:border-slate-800 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-[#1A1A1D] dark:text-white">
            <CheckCircle2 className="w-4 h-4 text-[#6C63FF]" />
            <span>Stoichiometry Audit</span>
          </div>
          <p className="text-[11px] text-[#626268] dark:text-slate-400">
            Validates reagent concentrations, volumes, and buffer ratios for accuracy.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-950 border border-[#E8E8EE] dark:border-slate-800 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-[#1A1A1D] dark:text-white">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Biosafety & BSL Flags</span>
          </div>
          <p className="text-[11px] text-[#626268] dark:text-slate-400">
            Identifies chemical, biological, and thermal hazards before bench execution.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-950 border border-[#E8E8EE] dark:border-slate-800 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-[#1A1A1D] dark:text-white">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Missing Step Alerts</span>
          </div>
          <p className="text-[11px] text-[#626268] dark:text-slate-400">
            Flags critical pause points, missing control tubes, and unstated temperatures.
          </p>
        </div>
      </div>

    </div>
  );
};

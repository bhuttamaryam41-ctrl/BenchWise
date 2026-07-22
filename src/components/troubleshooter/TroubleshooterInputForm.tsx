import React from 'react';
import { TroubleshooterExperimentType } from '../../types';
import { 
  AlertOctagon, 
  Search, 
  RotateCcw, 
  Sparkles, 
  FlaskConical, 
  HelpCircle, 
  FileText,
  Sliders,
  CheckCircle2
} from 'lucide-react';

interface TroubleshooterInputFormProps {
  experimentType: TroubleshooterExperimentType;
  setExperimentType: (type: TroubleshooterExperimentType) => void;
  observedProblem: string;
  setObservedProblem: (text: string) => void;
  additionalDetails: string;
  setAdditionalDetails: (text: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClear: () => void;
  onLoadSample: (sampleKey: 'gel' | 'western' | 'rna') => void;
  isLoading: boolean;
  validationError: string | null;
}

export const EXPERIMENT_TYPES: TroubleshooterExperimentType[] = [
  'PCR',
  'qPCR',
  'Gel Electrophoresis',
  'DNA Extraction',
  'RNA Extraction',
  'Western Blot',
  'ELISA',
  'Cell Culture',
  'Microscopy',
  'Spectrophotometry',
  'Other'
];

export const TroubleshooterInputForm: React.FC<TroubleshooterInputFormProps> = ({
  experimentType,
  setExperimentType,
  observedProblem,
  setObservedProblem,
  additionalDetails,
  setAdditionalDetails,
  onSubmit,
  onClear,
  onLoadSample,
  isLoading,
  validationError
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-[#E8E8EE] dark:border-slate-800 shadow-xs space-y-6">
      
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-[#E8E8EE] dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#E8E8FF] dark:bg-purple-950 flex items-center justify-center text-[#6C63FF] dark:text-violet-300">
            <AlertOctagon className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-[#1A1A1D] dark:text-white">
              Experiment Failure Details
            </h2>
            <p className="text-[11px] text-[#626268] dark:text-slate-400">
              Describe symptoms and experimental conditions for AI diagnostics
            </p>
          </div>
        </div>

        {/* Clear button */}
        {(observedProblem || additionalDetails) && (
          <button
            type="button"
            onClick={onClear}
            disabled={isLoading}
            id="btn-clear-troubleshooter"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold text-[#626268] dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Quick Sample Presets */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-[#1A1A1D] dark:text-slate-200 flex items-center gap-1.5 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#6C63FF]" />
          Quick Load Sample Scenarios:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            type="button"
            id="sample-preset-gel"
            onClick={() => onLoadSample('gel')}
            disabled={isLoading}
            className="p-2.5 rounded-2xl bg-[#FAF9FF] dark:bg-slate-950 border border-[#E8E8EE] dark:border-slate-800 hover:border-[#C6C8FF] dark:hover:border-purple-800 text-left transition-all cursor-pointer group"
          >
            <span className="text-[11px] font-bold text-[#1A1A1D] dark:text-slate-200 block group-hover:text-[#6C63FF]">
              ⚡ No Bands on Gel
            </span>
            <span className="text-[10px] text-[#626268] dark:text-slate-400 block truncate">
              Gel Electrophoresis
            </span>
          </button>

          <button
            type="button"
            id="sample-preset-western"
            onClick={() => onLoadSample('western')}
            disabled={isLoading}
            className="p-2.5 rounded-2xl bg-[#FAF9FF] dark:bg-slate-950 border border-[#E8E8EE] dark:border-slate-800 hover:border-[#C6C8FF] dark:hover:border-purple-800 text-left transition-all cursor-pointer group"
          >
            <span className="text-[11px] font-bold text-[#1A1A1D] dark:text-slate-200 block group-hover:text-[#6C63FF]">
              ⚡ High Background
            </span>
            <span className="text-[10px] text-[#626268] dark:text-slate-400 block truncate">
              Western Blotting
            </span>
          </button>

          <button
            type="button"
            id="sample-preset-rna"
            onClick={() => onLoadSample('rna')}
            disabled={isLoading}
            className="p-2.5 rounded-2xl bg-[#FAF9FF] dark:bg-slate-950 border border-[#E8E8EE] dark:border-slate-800 hover:border-[#C6C8FF] dark:hover:border-purple-800 text-left transition-all cursor-pointer group"
          >
            <span className="text-[11px] font-bold text-[#1A1A1D] dark:text-slate-200 block group-hover:text-[#6C63FF]">
              ⚡ Low RNA Yield
            </span>
            <span className="text-[10px] text-[#626268] dark:text-slate-400 block truncate">
              RNA Extraction
            </span>
          </button>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        
        {/* Experiment Type Dropdown */}
        <div className="space-y-1.5">
          <label 
            htmlFor="experiment-type-select" 
            className="text-xs font-bold text-[#1A1A1D] dark:text-slate-200 flex items-center gap-1.5"
          >
            <FlaskConical className="w-3.5 h-3.5 text-[#6C63FF]" />
            Experiment Type <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <select
              id="experiment-type-select"
              value={experimentType}
              onChange={(e) => setExperimentType(e.target.value as TroubleshooterExperimentType)}
              disabled={isLoading}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-2xl bg-[#FAF9FF] dark:bg-slate-950 border border-[#E8E8EE] dark:border-slate-800 text-[#1A1A1D] dark:text-slate-100 focus:outline-none focus:border-[#6C63FF] dark:focus:border-purple-600 transition-all font-semibold"
            >
              {EXPERIMENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Observed Problem Textarea */}
        <div className="space-y-1.5">
          <label 
            htmlFor="observed-problem-textarea" 
            className="text-xs font-bold text-[#1A1A1D] dark:text-slate-200 flex items-center gap-1.5"
          >
            <AlertOctagon className="w-3.5 h-3.5 text-amber-500" />
            Observed Problem / Failed Symptom <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="observed-problem-textarea"
            rows={4}
            value={observedProblem}
            onChange={(e) => setObservedProblem(e.target.value)}
            disabled={isLoading}
            aria-invalid={Boolean(validationError)}
            aria-describedby={validationError ? "troubleshooter-validation-error" : undefined}
            placeholder="No DNA bands appeared after gel electrophoresis."
            className="w-full p-3.5 text-xs sm:text-sm rounded-2xl bg-[#FAF9FF] dark:bg-slate-950 border border-[#E8E8EE] dark:border-slate-800 text-[#1A1A1D] dark:text-slate-100 focus:outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/30 transition-all leading-relaxed placeholder:text-[#626268]/60 dark:placeholder:text-slate-500"
          />
          <span className="text-[10px] text-[#626268] dark:text-slate-400 block">
            Describe what went wrong (e.g. no signal, non-specific amplification, unexpected smear, low purity ratio).
          </span>
        </div>

        {/* Optional Additional Details Textarea */}
        <div className="space-y-1.5">
          <label 
            htmlFor="additional-details-textarea" 
            className="text-xs font-bold text-[#1A1A1D] dark:text-slate-200 flex items-center gap-1.5"
          >
            <Sliders className="w-3.5 h-3.5 text-[#6C63FF]" />
            Optional Additional Details & Bench Parameters
          </label>
          <textarea
            id="additional-details-textarea"
            rows={3}
            value={additionalDetails}
            onChange={(e) => setAdditionalDetails(e.target.value)}
            disabled={isLoading}
            placeholder="Reagent lot details, annealing temperature (e.g., 55°C), incubation time (30 mins), instrument calibration, controls included..."
            className="w-full p-3.5 text-xs sm:text-sm rounded-2xl bg-[#FAF9FF] dark:bg-slate-950 border border-[#E8E8EE] dark:border-slate-800 text-[#1A1A1D] dark:text-slate-100 focus:outline-none focus:border-[#6C63FF] dark:focus:border-purple-600 transition-all leading-relaxed placeholder:text-[#626268]/60 dark:placeholder:text-slate-500"
          />
          <span className="text-[10px] text-[#626268] dark:text-slate-400 block">
            Including specific buffer pH, temperatures, concentrations, or controls improves diagnostic precision.
          </span>
        </div>

        {/* Validation Error Banner */}
        {validationError && (
          <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/80 text-rose-800 dark:text-rose-200 text-xs flex items-start gap-2">
            <AlertOctagon className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Submit Action Button */}
        <div className="pt-2">
          <button
            type="submit"
            id="btn-analyze-troubleshoot-problem"
            disabled={isLoading || !observedProblem.trim()}
            className="w-full py-3.5 px-6 rounded-2xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#6C63FF] to-violet-600 hover:from-violet-600 hover:to-[#6C63FF] focus:outline-none shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Analyzing Problem with Gemini AI...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Analyze Problem & Diagnose Failure</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};

import React from 'react';
import { ExperimentType, ReviewGoal } from '../../types';
import { 
  FileText, 
  Sparkles, 
  Trash2, 
  FlaskConical, 
  Target, 
  AlertCircle, 
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

interface ProtocolInputFormProps {
  protocolText: string;
  setProtocolText: (text: string) => void;
  experimentType: ExperimentType;
  setExperimentType: (type: ExperimentType) => void;
  reviewGoal: ReviewGoal;
  setReviewGoal: (goal: ReviewGoal) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClear: () => void;
  onLoadSample: (type: 'pcr' | 'western' | 'dna') => void;
  isLoading: boolean;
  validationError: string | null;
}

export const EXPERIMENT_TYPES: ExperimentType[] = [
  'PCR',
  'qPCR',
  'Gel Electrophoresis',
  'DNA Extraction',
  'RNA Extraction',
  'Cell Culture',
  'Western Blot',
  'ELISA',
  'Microscopy',
  'Other'
];

export const REVIEW_GOALS: ReviewGoal[] = [
  'General Review',
  'Check for Missing Steps',
  'Improve Clarity',
  'Safety Review',
  'Reproducibility Review'
];

export const ProtocolInputForm: React.FC<ProtocolInputFormProps> = ({
  protocolText,
  setProtocolText,
  experimentType,
  setExperimentType,
  reviewGoal,
  setReviewGoal,
  onSubmit,
  onClear,
  onLoadSample,
  isLoading,
  validationError
}) => {
  const charCount = protocolText.length;
  const wordCount = protocolText.trim() ? protocolText.trim().split(/\s+/).length : 0;

  const placeholderExample = `1. Thaw 2X Taq Master Mix, primers (10 µM forward and reverse), and DNA template on ice.
2. In a sterile 0.2 mL PCR tube, combine the following reagents for a 50 µL reaction:
   - 2X Taq Master Mix: 25 µL
   - Forward Primer (10 µM): 2.5 µL
   - Reverse Primer (10 µM): 2.5 µL
   - DNA Template (50 ng/µL): 1.0 µL
   - Nuclease-free water: 19.0 µL
3. Mix gently by pipetting up and down 5 times, then spin briefly in a microcentrifuge.
4. Place tubes in thermal cycler programmed with:
   - Initial Denaturation: 95°C for 3 minutes
   - 35 Cycles: 95°C for 30s, 58°C for 30s, 72°C for 60s
   - Final Extension: 72°C for 5 minutes
   - Hold: 4°C indefinitely
5. Run 5 µL of PCR product on 1% agarose gel at 100V for 45 minutes.`;

  return (
    <form onSubmit={onSubmit} className="bg-white dark:bg-slate-900 rounded-3xl border border-[#E8E8EE] dark:border-slate-800 p-6 space-y-6 shadow-xs">
      
      {/* Form Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E8E8EE] dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-base sm:text-lg font-extrabold text-[#1A1A1D] dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#6C63FF]" />
            Submit Protocol
          </h2>
          <p className="text-xs text-[#626268] dark:text-slate-400">
            Paste your procedure or select a standard template below
          </p>
        </div>

        {/* Quick Sample Loader Chips */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            id="btn-sample-pcr"
            onClick={() => onLoadSample('pcr')}
            className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-[#E8E8FF] dark:bg-purple-950 text-[#6C63FF] dark:text-violet-300 border border-[#C6C8FF] hover:bg-[#d5d7ff] transition-all cursor-pointer"
            title="Load PCR Sample"
          >
            + PCR Sample
          </button>
          <button
            type="button"
            id="btn-sample-western"
            onClick={() => onLoadSample('western')}
            className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-all cursor-pointer"
            title="Load Western Blot Sample"
          >
            + Western Blot
          </button>
        </div>
      </div>

      {/* Protocol Multi-line Text Area */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-[#1A1A1D] dark:text-slate-200">
          <label htmlFor="protocol-text-editor">
            Experimental Protocol Procedure <span className="text-rose-500">*</span>
          </label>
          <span className="font-mono text-[11px] text-[#626268] dark:text-slate-400 font-normal">
            {charCount} chars • {wordCount} words
          </span>
        </div>

        <textarea
          id="protocol-text-editor"
          value={protocolText}
          onChange={(e) => setProtocolText(e.target.value)}
          placeholder={`Paste or type your protocol steps here...\n\nExample:\n${placeholderExample}`}
          rows={12}
          aria-invalid={Boolean(validationError)}
          aria-describedby={validationError ? "protocol-validation-error" : undefined}
          className={`w-full p-4 text-xs sm:text-sm font-mono rounded-2xl bg-[#FFFEFC] dark:bg-slate-950 text-[#1A1A1D] dark:text-slate-100 border transition-all focus:outline-none leading-relaxed resize-y ${
            validationError
              ? 'border-rose-400 dark:border-rose-600 focus:ring-2 focus:ring-rose-500/30'
              : 'border-[#E8E8EE] dark:border-slate-800 focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/30'
          }`}
        />

        {/* Validation Error Message */}
        {validationError && (
          <div id="protocol-validation-error" className="flex items-center gap-2 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-200 font-medium">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400" />
            <span>{validationError}</span>
          </div>
        )}
      </div>

      {/* Select Dropdowns: Experiment Type & Review Goal */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Experiment Type Dropdown */}
        <div className="space-y-1.5">
          <label 
            htmlFor="experiment-type-select"
            className="text-xs font-bold text-[#1A1A1D] dark:text-slate-200 flex items-center gap-1.5"
          >
            <FlaskConical className="w-3.5 h-3.5 text-[#6C63FF]" />
            Experiment Type
          </label>
          <select
            id="experiment-type-select"
            value={experimentType}
            onChange={(e) => setExperimentType(e.target.value as ExperimentType)}
            className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl bg-[#FFFEFC] dark:bg-slate-950 text-[#1A1A1D] dark:text-slate-100 border border-[#E8E8EE] dark:border-slate-800 focus:outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/20 transition-all cursor-pointer"
          >
            {EXPERIMENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Review Goal Dropdown */}
        <div className="space-y-1.5">
          <label 
            htmlFor="review-goal-select"
            className="text-xs font-bold text-[#1A1A1D] dark:text-slate-200 flex items-center gap-1.5"
          >
            <Target className="w-3.5 h-3.5 text-[#6C63FF]" />
            Review Goal
          </label>
          <select
            id="review-goal-select"
            value={reviewGoal}
            onChange={(e) => setReviewGoal(e.target.value as ReviewGoal)}
            className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl bg-[#FFFEFC] dark:bg-slate-950 text-[#1A1A1D] dark:text-slate-100 border border-[#E8E8EE] dark:border-slate-800 focus:outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/20 transition-all cursor-pointer"
          >
            {REVIEW_GOALS.map((goal) => (
              <option key={goal} value={goal}>
                {goal}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Primary & Secondary Action Buttons */}
      <div className="flex items-center gap-3 pt-2 border-t border-[#E8E8EE] dark:border-slate-800">
        <button
          type="submit"
          id="btn-review-protocol-submit"
          disabled={isLoading}
          className={`flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-xs sm:text-sm text-white shadow-md transition-all cursor-pointer ${
            isLoading
              ? 'bg-slate-400 dark:bg-slate-700 cursor-not-allowed opacity-70'
              : 'bg-[#6C63FF] hover:bg-[#5a51e6] shadow-[#6C63FF]/25 hover:shadow-lg hover:shadow-[#6C63FF]/35 active:scale-[0.99]'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>{isLoading ? 'Auditing Protocol...' : 'Review Protocol'}</span>
        </button>

        <button
          type="button"
          id="btn-clear-protocol-input"
          onClick={onClear}
          disabled={isLoading || !protocolText}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-full text-xs font-bold text-[#626268] dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-[#E8E8EE] dark:border-slate-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          title="Clear text field"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Clear</span>
        </button>
      </div>

    </form>
  );
};

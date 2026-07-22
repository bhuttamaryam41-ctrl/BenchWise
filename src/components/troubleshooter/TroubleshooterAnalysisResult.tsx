import React, { useState } from 'react';
import { TroubleshooterAnalysisResult as TroubleshooterResultType } from '../../types';
import { 
  AlertOctagon, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  ListChecks, 
  Copy, 
  Check, 
  Printer, 
  RotateCcw, 
  Gauge, 
  Calendar, 
  FlaskConical, 
  Info, 
  ShieldCheck, 
  FileText,
  Sliders,
  HelpCircle,
  Lightbulb,
  ArrowRight
} from 'lucide-react';

interface TroubleshooterAnalysisResultProps {
  analysis: TroubleshooterResultType;
  onReset: () => void;
}

export const TroubleshooterAnalysisResult: React.FC<TroubleshooterAnalysisResultProps> = ({
  analysis,
  onReset
}) => {
  const [copied, setCopied] = useState(false);
  const [checkedParams, setCheckedParams] = useState<Record<string, boolean>>({});

  const handleCopyReport = () => {
    const textReport = `
==================================================
BENCHWISE EXPERIMENT TROUBLESHOOTING REPORT
Date: ${analysis.reviewDate} at ${analysis.timestamp}
Experiment Type: ${analysis.experimentType}
Status: ${analysis.status}
==================================================

OBSERVED PROBLEM:
${analysis.observedProblem}

${analysis.additionalDetails ? `ADDITIONAL DETAILS:\n${analysis.additionalDetails}\n` : ''}
CONFIDENCE LEVEL: ${analysis.confidenceScore}% (${analysis.confidenceCategory})
CONFIDENCE EXPLANATION: ${analysis.confidenceExplanation}

EXECUTIVE DIAGNOSTIC SUMMARY:
${analysis.summary}

MOST LIKELY ROOT CAUSES (RANKED):
${analysis.mostLikelyCauses.map((c, idx) => `#${idx + 1} [${c.likelihood} Likelihood - ${c.likelihoodPercentage}%] ${c.cause}: ${c.explanation}`).join('\n\n')}

RECOMMENDED STEP-BY-STEP SOLUTIONS:
${analysis.possibleSolutions.map((s) => `Step ${s.stepNumber}: ${s.title}\n${s.actionableSteps.map(a => `  • ${a}`).join('\n')}`).join('\n\n')}

BENCH PARAMETERS TO VERIFY:
${analysis.parametersToVerify.map(p => `[${p.status}] ${p.parameterName}: ${p.guideline}`).join('\n')}

PREVENTION TIPS:
${analysis.preventionTips.map(t => `• ${t}`).join('\n')}

EDUCATIONAL NOTES & MECHANISMS:
${analysis.educationalNotes.map(e => `• ${e}`).join('\n')}

FINAL RECOMMENDATION:
${analysis.finalRecommendation}

DISCLAIMER:
BenchWise provides AI-assisted experiment troubleshooting for educational and research support purposes only. Always verify protocols, reagent specifications, and safety requirements before performing experiments.
`;
    navigator.clipboard.writeText(textReport.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const toggleParamCheck = (id: string) => {
    setCheckedParams(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getConfidenceBadgeColor = (category: string) => {
    switch (category) {
      case 'Very High':
        return 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'High':
        return 'bg-purple-50 dark:bg-purple-950/60 text-[#6C63FF] dark:text-purple-300 border-[#C6C8FF] dark:border-purple-800';
      case 'Moderate':
        return 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      default:
        return 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800';
    }
  };

  const getLikelihoodBadge = (likelihood: string) => {
    switch (likelihood) {
      case 'High':
        return 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800';
      case 'Medium':
        return 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  const confidencePct = Math.min(100, Math.max(0, analysis.confidenceScore || 85));

  return (
    <div className="space-y-6">
      
      {/* 1. Action & Export Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-[#E8E8EE] dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#E8E8FF] dark:bg-purple-950 text-[#6C63FF] dark:text-violet-300 border border-[#C6C8FF] dark:border-purple-800">
            {analysis.experimentType}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            Diagnostic Complete
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyReport}
            id="btn-copy-troubleshoot-report"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[#1A1A1D] dark:text-slate-200 border border-[#E8E8EE] dark:border-slate-700 transition-all cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-[#6C63FF]" />}
            <span>{copied ? 'Copied Report' : 'Copy Report'}</span>
          </button>

          <button
            onClick={handlePrint}
            id="btn-print-troubleshoot-report"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[#1A1A1D] dark:text-slate-200 border border-[#E8E8EE] dark:border-slate-700 transition-all cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-[#6C63FF]" />
            <span className="hidden sm:inline">Print / PDF</span>
          </button>

          <button
            onClick={onReset}
            id="btn-troubleshoot-new-analysis"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#E8E8FF] dark:bg-purple-950 hover:bg-[#C6C8FF] text-[#6C63FF] dark:text-violet-300 border border-[#C6C8FF] dark:border-purple-800 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>New Analysis</span>
          </button>
        </div>
      </div>

      {/* 2. Diagnostic Metadata Card */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-[#E8E8EE] dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-[#E8E8EE] dark:border-slate-800 pb-3">
          <h3 className="text-xs sm:text-sm font-bold text-[#1A1A1D] dark:text-white flex items-center gap-2 uppercase tracking-wider">
            <AlertOctagon className="w-4 h-4 text-[#6C63FF]" />
            Diagnostic Case Summary
          </h3>
          <span className="text-xs font-mono font-semibold text-[#626268] dark:text-slate-400">
            {analysis.reviewDate} • {analysis.timestamp}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#FAF9FF] dark:bg-slate-950/80 border border-[#E8E8EE] dark:border-slate-800 space-y-1.5">
          <span className="text-[10px] font-bold text-[#626268] dark:text-slate-400 uppercase tracking-wider block flex items-center gap-1">
            <AlertOctagon className="w-3 h-3 text-amber-500" /> Reported Failure Symptom:
          </span>
          <p className="text-xs sm:text-sm font-semibold text-[#1A1A1D] dark:text-slate-200 leading-relaxed">
            "{analysis.observedProblem}"
          </p>
          {analysis.additionalDetails && (
            <p className="text-xs text-[#626268] dark:text-slate-400 pt-1 border-t border-[#E8E8EE] dark:border-slate-800">
              <strong>Additional Details:</strong> {analysis.additionalDetails}
            </p>
          )}
        </div>
      </div>

      {/* 3. Executive Diagnostic Summary & Visual Confidence Meter */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-[#E8E8EE] dark:border-slate-800 shadow-xs space-y-6">
        
        {/* Executive Summary */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-[#1A1A1D] dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#6C63FF]" />
            Executive Diagnostic Summary
          </h3>
          <p className="text-xs sm:text-sm text-[#626268] dark:text-slate-300 leading-relaxed bg-[#FFFEFC] dark:bg-slate-950 p-4 rounded-2xl border border-[#E8E8EE] dark:border-slate-800">
            {analysis.summary}
          </p>
        </div>

        {/* Visual Confidence Meter Component (Reused BenchWise Style) */}
        <div className="p-5 rounded-2xl bg-[#FAF9FF] dark:bg-slate-950/80 border border-[#E8E8EE] dark:border-slate-800 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-[#6C63FF]" />
              <span className="text-xs font-extrabold text-[#1A1A1D] dark:text-white uppercase tracking-wider">
                Confidence Meter
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold border ${getConfidenceBadgeColor(analysis.confidenceCategory)}`}>
                {analysis.confidenceCategory} Confidence
              </span>
              <span className="text-sm font-mono font-extrabold text-[#1A1A1D] dark:text-white">
                {confidencePct}%
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden relative">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-[#6C63FF] via-purple-500 to-emerald-500 transition-all duration-1000 ease-out"
              style={{ width: `${confidencePct}%` }}
            />
          </div>

          {/* Explanation */}
          <p className="text-xs text-[#626268] dark:text-slate-400 leading-relaxed pt-1">
            {analysis.confidenceExplanation}
          </p>
        </div>

      </div>

      {/* 4. Most Likely Causes Card */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-[#E8E8EE] dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-[#1A1A1D] dark:text-white flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-500" />
          Most Likely Root Causes (Ranked by Probability)
        </h3>

        <div className="space-y-3">
          {analysis.mostLikelyCauses.map((item, idx) => (
            <div 
              key={item.id || idx}
              className="p-4 rounded-2xl bg-[#FAF9FF] dark:bg-slate-950/60 border border-[#E8E8EE] dark:border-slate-800 space-y-2"
            >
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <h4 className="text-xs sm:text-sm font-bold text-[#1A1A1D] dark:text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#E8E8FF] dark:bg-purple-950 text-[#6C63FF] font-bold text-[11px] flex items-center justify-center shrink-0">
                    #{idx + 1}
                  </span>
                  {item.cause}
                </h4>
                
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border ${getLikelihoodBadge(item.likelihood)}`}>
                    {item.likelihood} Likelihood
                  </span>
                  <span className="text-xs font-mono font-bold text-[#1A1A1D] dark:text-slate-200">
                    {item.likelihoodPercentage}%
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#626268] dark:text-slate-300 pl-4 border-l-2 border-[#6C63FF]/50 dark:border-purple-600/50 leading-relaxed">
                <strong>Mechanism:</strong> {item.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Possible Solutions Card */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-[#E8E8EE] dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-[#1A1A1D] dark:text-white flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Step-by-Step Corrective Solutions
        </h3>

        <div className="space-y-3">
          {analysis.possibleSolutions.map((sol, idx) => (
            <div 
              key={sol.id || idx}
              className="p-4 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/60 space-y-2"
            >
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-xs sm:text-sm font-bold text-[#1A1A1D] dark:text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-[11px] flex items-center justify-center shrink-0">
                    {sol.stepNumber || idx + 1}
                  </span>
                  {sol.title}
                </h4>
                {sol.targetCause && (
                  <span className="text-[10px] font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-300 dark:border-emerald-800">
                    Addresses: {sol.targetCause}
                  </span>
                )}
              </div>

              <ul className="space-y-1.5 pl-2 pt-1">
                {sol.actionableSteps.map((step, stepIdx) => (
                  <li key={stepIdx} className="text-xs text-[#626268] dark:text-slate-300 flex items-start gap-2">
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Parameters to Verify Checklist Card */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-[#E8E8EE] dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#1A1A1D] dark:text-white flex items-center gap-2">
            <ListChecks className="w-4 h-4 text-[#6C63FF]" />
            Bench Verification Checklist
          </h3>
          <span className="text-[11px] font-bold text-[#626268] dark:text-slate-400">
            Interactive Bench Checks
          </span>
        </div>

        <p className="text-xs text-[#626268] dark:text-slate-400">
          Tick off each critical parameter on your lab bench before repeating the experiment run:
        </p>

        <div className="space-y-2">
          {analysis.parametersToVerify.map((param, idx) => {
            const checkKey = param.id || `param-${idx}`;
            const isChecked = !!checkedParams[checkKey];
            const isCritical = param.status === 'Critical';

            return (
              <button
                key={checkKey}
                type="button"
                id={`param-check-item-${idx}`}
                onClick={() => toggleParamCheck(checkKey)}
                className={`w-full text-left p-3.5 rounded-2xl border flex items-start gap-3 transition-all cursor-pointer ${
                  isChecked
                    ? 'bg-[#FAF9FF] dark:bg-slate-950/80 border-[#C6C8FF] dark:border-purple-800 text-[#1A1A1D] dark:text-slate-200'
                    : 'bg-[#FAF9FF] dark:bg-slate-950/40 border-[#E8E8EE] dark:border-slate-800 text-[#1A1A1D] dark:text-slate-200 hover:border-[#C6C8FF] dark:hover:border-slate-700'
                }`}
              >
                <div className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                  isChecked ? 'bg-[#6C63FF] border-[#6C63FF] text-white' : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900'
                }`}>
                  {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>

                <div className="space-y-0.5 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-xs font-bold ${isChecked ? 'line-through opacity-70' : 'text-[#1A1A1D] dark:text-white'}`}>
                      {param.parameterName}
                    </span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold border ${
                      isCritical
                        ? 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-200'
                        : 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-200'
                    }`}>
                      {param.status}
                    </span>
                  </div>
                  <p className={`text-xs text-[#626268] dark:text-slate-400 leading-relaxed ${isChecked ? 'line-through opacity-70' : ''}`}>
                    {param.guideline}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 7. Prevention Tips Card */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-[#E8E8EE] dark:border-slate-800 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-[#1A1A1D] dark:text-white flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          Prevention Tips for Future Runs
        </h3>

        <ul className="space-y-2">
          {analysis.preventionTips.map((tip, idx) => (
            <li 
              key={idx}
              className="p-3 rounded-xl bg-[#FAF9FF] dark:bg-slate-950/60 border border-[#E8E8EE] dark:border-slate-800 text-xs text-[#1A1A1D] dark:text-slate-200 flex items-start gap-2.5"
            >
              <Sparkles className="w-4 h-4 text-[#6C63FF] shrink-0 mt-0.5" />
              <span className="leading-relaxed">{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 8. Educational Notes Card */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-[#E8E8EE] dark:border-slate-800 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-[#1A1A1D] dark:text-white flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-[#6C63FF]" />
          Educational Notes & Biochemical Mechanisms
        </h3>

        <ul className="space-y-2">
          {analysis.educationalNotes.map((note, idx) => (
            <li 
              key={idx}
              className="p-3 rounded-xl bg-purple-50/60 dark:bg-slate-950/60 border border-purple-100 dark:border-slate-800 text-xs text-[#1A1A1D] dark:text-slate-200 flex items-start gap-2.5"
            >
              <FlaskConical className="w-4 h-4 text-[#6C63FF] shrink-0 mt-0.5" />
              <span className="leading-relaxed">{note}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 9. Final Recommendation Verdict Card */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-[#E8E8EE] dark:border-slate-800 shadow-xs space-y-2">
        <h3 className="text-xs font-bold text-[#626268] dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          Final Troubleshooting Recommendation
        </h3>
        <p className="text-xs sm:text-sm font-semibold text-[#1A1A1D] dark:text-slate-200 bg-purple-50/80 dark:bg-purple-950/40 p-4 rounded-2xl border border-purple-200/80 dark:border-purple-800/80 leading-relaxed">
          {analysis.finalRecommendation}
        </p>
      </div>

      {/* 10. Educational Disclaimer Card */}
      <div className="bg-[#FAF9FF] dark:bg-slate-950/90 p-5 rounded-3xl border border-[#C6C8FF]/60 dark:border-slate-800 shadow-xs space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-[#6C63FF] dark:text-violet-300 uppercase tracking-wider">
          <Info className="w-4 h-4 shrink-0 text-[#6C63FF]" />
          <span>Educational Disclaimer</span>
        </div>
        <p className="text-xs text-[#626268] dark:text-slate-400 leading-relaxed">
          BenchWise provides AI-assisted experiment troubleshooting for educational and research support purposes only. The analysis is intended to help identify potential failure causes and encourage systematic troubleshooting, but it should not replace institutional Standard Operating Procedures (SOPs), laboratory supervision, safety training, or professional scientific judgment. Always verify protocols, reagent specifications, and laboratory safety requirements before performing any experiment.
        </p>
      </div>

    </div>
  );
};

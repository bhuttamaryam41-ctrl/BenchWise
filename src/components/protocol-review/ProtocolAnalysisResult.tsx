import React, { useState } from 'react';
import { ProtocolReviewAnalysis } from '../../types';
import { 
  Award, 
  Sparkles, 
  AlertTriangle, 
  HelpCircle, 
  Lightbulb, 
  ShieldAlert, 
  CheckCircle2, 
  FileCheck2, 
  Copy, 
  Check, 
  Printer, 
  Clock, 
  FlaskConical,
  RotateCcw,
  Gauge,
  Calendar,
  FileText,
  Target,
  Info,
  ShieldCheck
} from 'lucide-react';

interface ProtocolAnalysisResultProps {
  analysis: ProtocolReviewAnalysis;
  onReset: () => void;
}

export const ProtocolAnalysisResult: React.FC<ProtocolAnalysisResultProps> = ({
  analysis,
  onReset
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAudit = () => {
    const textReport = `
==================================================
BENCHWISE PROTOCOL REVIEW & AUDIT REPORT
Date: ${analysis.reviewDate || new Date().toLocaleDateString()} at ${analysis.timestamp}
Experiment Type: ${analysis.experimentType}
Review Goal: ${analysis.reviewGoal}
Protocol Length: ${analysis.wordCount || 0} words (${analysis.charCount || 0} chars)
Status: ${analysis.status || 'Completed'}
==================================================

OVERALL QUALITY SCORE: ${analysis.qualityScore}/100
CONFIDENCE LEVEL: ${analysis.confidenceScore || 90}% (${analysis.confidenceCategory || 'Very High'})
CONFIDENCE EXPLANATION: ${analysis.confidenceExplanation}
FINAL RECOMMENDATION: ${analysis.finalRecommendation}

EXECUTIVE SUMMARY:
${analysis.summary}

POTENTIAL ISSUES (${analysis.potentialIssues.length}):
${analysis.potentialIssues.map(i => `• [${i.severity} Severity] ${i.title}: ${i.description} -> Corrective Fix: ${i.recommendation}`).join('\n')}

MISSING INFORMATION:
${analysis.missingInformation.map(m => `• ${m}`).join('\n')}

SUGGESTED OPTIMIZATIONS:
${analysis.suggestedImprovements.map(s => `• ${s}`).join('\n')}

SAFETY CONSIDERATIONS (${analysis.safetyConsiderations.bslLevel}):
• Required PPE: ${analysis.safetyConsiderations.ppeRequired.join(', ')}
• Hazards: ${analysis.safetyConsiderations.hazards.join(', ')}
${analysis.safetyConsiderations.safetyNotes.map(n => `• ${n}`).join('\n')}

GOOD LABORATORY PRACTICE GUIDELINES:
${analysis.bestPractices.map(b => `• ${b}`).join('\n')}

DISCLAIMER:
BenchWise provides AI-assisted protocol reviews for educational and research support purposes only. Always verify protocols, reagent specifications, and safety requirements before performing experiments.
`;
    navigator.clipboard.writeText(textReport.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  // Score color helper
  const getScoreColorClass = (score: number) => {
    if (score >= 85) return 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800';
    if (score >= 70) return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800';
    return 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800';
  };

  // Confidence Category color helper
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

  const confidencePct = Math.min(100, Math.max(0, analysis.confidenceScore || 90));

  return (
    <div className="space-y-6">
      
      {/* 1. Top Action & Export Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-[#E8E8EE] dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#E8E8FF] dark:bg-purple-950 text-[#6C63FF] dark:text-violet-300 border border-[#C6C8FF] dark:border-purple-800">
            {analysis.experimentType}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            {analysis.reviewGoal}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyAudit}
            id="btn-copy-audit-report"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[#1A1A1D] dark:text-slate-200 border border-[#E8E8EE] dark:border-slate-700 transition-all cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-[#6C63FF]" />}
            <span>{copied ? 'Copied Report' : 'Copy Report'}</span>
          </button>

          <button
            onClick={handlePrint}
            id="btn-print-audit-report"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[#1A1A1D] dark:text-slate-200 border border-[#E8E8EE] dark:border-slate-700 transition-all cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-[#6C63FF]" />
            <span className="hidden sm:inline">Print / PDF</span>
          </button>

          <button
            onClick={onReset}
            id="btn-audit-another-protocol"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#E8E8FF] dark:bg-purple-950 hover:bg-[#C6C8FF] text-[#6C63FF] dark:text-violet-300 border border-[#C6C8FF] dark:border-purple-800 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>New Audit</span>
          </button>
        </div>
      </div>

      {/* 2. Professional Report Metadata Card */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-[#E8E8EE] dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-[#E8E8EE] dark:border-slate-800 pb-3">
          <h3 className="text-xs sm:text-sm font-bold text-[#1A1A1D] dark:text-white flex items-center gap-2 uppercase tracking-wider">
            <FileCheck2 className="w-4 h-4 text-[#6C63FF]" />
            Protocol Review Audit Metadata
          </h3>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            Status: {analysis.status || 'Completed'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-2xl bg-[#FAF9FF] dark:bg-slate-950/60 border border-[#E8E8EE] dark:border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-[#626268] dark:text-slate-400 uppercase tracking-wider block flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#6C63FF]" /> Date & Time
            </span>
            <span className="font-semibold text-[#1A1A1D] dark:text-slate-200 block truncate">
              {analysis.reviewDate || 'Today'} • {analysis.timestamp || 'Just now'}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-[#FAF9FF] dark:bg-slate-950/60 border border-[#E8E8EE] dark:border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-[#626268] dark:text-slate-400 uppercase tracking-wider block flex items-center gap-1">
              <FlaskConical className="w-3 h-3 text-[#6C63FF]" /> Experiment
            </span>
            <span className="font-semibold text-[#1A1A1D] dark:text-slate-200 block truncate">
              {analysis.experimentType}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-[#FAF9FF] dark:bg-slate-950/60 border border-[#E8E8EE] dark:border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-[#626268] dark:text-slate-400 uppercase tracking-wider block flex items-center gap-1">
              <Target className="w-3 h-3 text-[#6C63FF]" /> Audit Focus
            </span>
            <span className="font-semibold text-[#1A1A1D] dark:text-slate-200 block truncate">
              {analysis.reviewGoal}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-[#FAF9FF] dark:bg-slate-950/60 border border-[#E8E8EE] dark:border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-[#626268] dark:text-slate-400 uppercase tracking-wider block flex items-center gap-1">
              <FileText className="w-3 h-3 text-[#6C63FF]" /> Protocol Size
            </span>
            <span className="font-semibold text-[#1A1A1D] dark:text-slate-200 block truncate font-mono">
              {analysis.wordCount || 0} words ({analysis.charCount || 0} chars)
            </span>
          </div>
        </div>
      </div>

      {/* 3. Quality Score & Confidence Meter Header Grid */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-[#E8E8EE] dark:border-slate-800 shadow-xs space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Quality Score Circle */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-[#FAF9FF] dark:bg-slate-950/60 border border-[#E8E8EE] dark:border-slate-800 text-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#626268] dark:text-slate-400 mb-2 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#6C63FF]" />
              Overall Quality Score
            </span>
            
            <div className="relative inline-flex items-center justify-center mb-3">
              <div className="w-24 h-24 rounded-full border-4 border-[#E8E8FF] dark:border-slate-800 flex items-center justify-center bg-white dark:bg-slate-900 shadow-inner">
                <span className="text-3xl font-extrabold text-[#1A1A1D] dark:text-white">
                  {analysis.qualityScore}
                </span>
                <span className="text-xs text-[#626268] dark:text-slate-400 font-bold">/100</span>
              </div>
            </div>

            <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${getScoreColorClass(analysis.qualityScore)}`}>
              {analysis.qualityScore >= 85 ? 'HIGH QUALITY • READY' : 'MODERATE • REVISION RECOMMENDED'}
            </span>
          </div>

          {/* Scientific Audit Verdict & Final Recommendation */}
          <div className="md:col-span-7 space-y-3">
            <div className="flex items-center gap-2 border-b border-[#E8E8EE] dark:border-slate-800 pb-2.5">
              <Sparkles className="w-5 h-5 text-[#6C63FF]" />
              <h3 className="text-base sm:text-lg font-extrabold text-[#1A1A1D] dark:text-white">
                Scientific Audit Verdict
              </h3>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-bold text-[#626268] dark:text-slate-400 uppercase tracking-wider block">
                Final Recommendation:
              </span>
              <p className="text-xs sm:text-sm font-semibold text-[#1A1A1D] dark:text-slate-200 bg-purple-50/80 dark:bg-purple-950/40 p-3.5 rounded-xl border border-purple-200/80 dark:border-purple-800/80 leading-relaxed">
                {analysis.finalRecommendation}
              </p>
            </div>
          </div>

        </div>

        {/* 4. Visual Confidence Meter Card */}
        <div className="p-5 rounded-2xl bg-[#FAF9FF] dark:bg-slate-950/80 border border-[#E8E8EE] dark:border-slate-800 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-[#6C63FF]" />
              <span className="text-xs font-extrabold text-[#1A1A1D] dark:text-white uppercase tracking-wider">
                Confidence Meter
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold border ${getConfidenceBadgeColor(analysis.confidenceCategory || 'Very High')}`}>
                {analysis.confidenceCategory || 'Very High'} Confidence
              </span>
              <span className="text-sm font-mono font-extrabold text-[#1A1A1D] dark:text-white">
                {confidencePct}%
              </span>
            </div>
          </div>

          {/* Visual Progress Bar */}
          <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden relative">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-[#6C63FF] via-purple-500 to-emerald-500 transition-all duration-1000 ease-out"
              style={{ width: `${confidencePct}%` }}
            />
          </div>

          {/* Confidence Explanation */}
          <p className="text-xs text-[#626268] dark:text-slate-400 leading-relaxed pt-1">
            {analysis.confidenceExplanation || 'The protocol contains sufficient detail for a reliable review. Confidence may decrease when essential experimental information is missing.'}
          </p>
        </div>
      </div>

      {/* 5. Executive Protocol Summary Card */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-[#E8E8EE] dark:border-slate-800 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-[#1A1A1D] dark:text-white flex items-center gap-2">
          <FileCheck2 className="w-4 h-4 text-[#6C63FF]" />
          Executive Protocol Summary
        </h3>
        <p className="text-xs sm:text-sm text-[#626268] dark:text-slate-300 leading-relaxed bg-[#FFFEFC] dark:bg-slate-950 p-4 rounded-2xl border border-[#E8E8EE] dark:border-slate-800">
          {analysis.summary}
        </p>
      </div>

      {/* 6. Potential Issues Card */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-[#E8E8EE] dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-[#1A1A1D] dark:text-white flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          Potential Issues & Flaws ({analysis.potentialIssues.length})
        </h3>

        <div className="space-y-3">
          {analysis.potentialIssues.map((issue) => {
            const isHigh = issue.severity === 'High';
            return (
              <div 
                key={issue.id}
                className={`p-4 rounded-2xl border space-y-2 ${
                  isHigh 
                    ? 'bg-rose-50/60 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/60' 
                    : 'bg-amber-50/60 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/60'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs sm:text-sm font-bold text-[#1A1A1D] dark:text-white flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${isHigh ? 'bg-rose-500' : 'bg-amber-500'}`} />
                    {issue.title}
                  </h4>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${
                    isHigh 
                      ? 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-200' 
                      : 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-200'
                  }`}>
                    {issue.severity} Severity
                  </span>
                </div>

                <p className="text-xs text-[#626268] dark:text-slate-300 pl-4 border-l-2 border-slate-300 dark:border-slate-700">
                  {issue.description}
                </p>

                <div className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 p-2.5 rounded-xl border border-emerald-200/80 dark:border-emerald-800/80 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Corrective Fix:</strong> {issue.recommendation}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 7. Missing Information Card */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-[#E8E8EE] dark:border-slate-800 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-[#1A1A1D] dark:text-white flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-[#6C63FF]" />
          Missing Information & Ambiguities
        </h3>

        <ul className="space-y-2">
          {analysis.missingInformation.map((item, idx) => (
            <li 
              key={idx}
              className="p-3 rounded-xl bg-[#FAF9FF] dark:bg-slate-950/60 border border-[#E8E8EE] dark:border-slate-800 text-xs text-[#1A1A1D] dark:text-slate-200 flex items-start gap-2.5"
            >
              <span className="w-5 h-5 rounded-full bg-[#E8E8FF] text-[#6C63FF] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 8. Suggested Improvements Card */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-[#E8E8EE] dark:border-slate-800 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-[#1A1A1D] dark:text-white flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          Suggested Yield & Clarity Optimizations
        </h3>

        <ul className="space-y-2">
          {analysis.suggestedImprovements.map((imp, idx) => (
            <li 
              key={idx}
              className="p-3 rounded-xl bg-[#FAF9FF] dark:bg-slate-950/60 border border-[#E8E8EE] dark:border-slate-800 text-xs text-[#1A1A1D] dark:text-slate-200 flex items-start gap-2.5"
            >
              <Sparkles className="w-4 h-4 text-[#6C63FF] shrink-0 mt-0.5" />
              <span className="leading-relaxed">{imp}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 9. Safety Considerations Card */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-[#E8E8EE] dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#E8E8EE] dark:border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-[#1A1A1D] dark:text-white flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-emerald-600" />
            Safety & Biosafety Level Guidelines
          </h3>
          <span className="px-3 py-0.5 rounded-full text-xs font-extrabold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
            {analysis.safetyConsiderations.bslLevel} Standard
          </span>
        </div>

        {/* PPE Required */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#626268] dark:text-slate-400 uppercase tracking-wider block">
            Required Personal Protective Equipment (PPE):
          </span>
          <div className="flex flex-wrap gap-2">
            {analysis.safetyConsiderations.ppeRequired.map((ppe, idx) => (
              <span 
                key={idx}
                className="px-3 py-1 rounded-xl text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
              >
                ✓ {ppe}
              </span>
            ))}
          </div>
        </div>

        {/* Chemical & Bio Hazards */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#626268] dark:text-slate-400 uppercase tracking-wider block">
            Identified Chemical / Biological Hazards:
          </span>
          <div className="flex flex-wrap gap-2">
            {analysis.safetyConsiderations.hazards.map((haz, idx) => (
              <span 
                key={idx}
                className="px-3 py-1 rounded-xl text-xs font-semibold bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
              >
                ⚠ {haz}
              </span>
            ))}
          </div>
        </div>

        {/* Safety Notes */}
        <div className="space-y-1.5 pt-1">
          <span className="text-xs font-bold text-[#626268] dark:text-slate-400 uppercase tracking-wider block">
            Handling & Disposal Precautions:
          </span>
          <ul className="space-y-1 text-xs text-[#626268] dark:text-slate-300 list-disc list-inside">
            {analysis.safetyConsiderations.safetyNotes.map((note, idx) => (
              <li key={idx}>{note}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* 10. Best Practices Card */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-[#E8E8EE] dark:border-slate-800 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-[#1A1A1D] dark:text-white flex items-center gap-2">
          <FlaskConical className="w-4 h-4 text-[#6C63FF]" />
          Good Laboratory Practice (GLP) Bench Guidelines
        </h3>

        <ul className="space-y-2">
          {analysis.bestPractices.map((practice, idx) => (
            <li 
              key={idx}
              className="p-3 rounded-xl bg-purple-50/60 dark:bg-slate-950/60 border border-purple-100 dark:border-slate-800 text-xs text-[#1A1A1D] dark:text-slate-200 flex items-start gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-[#6C63FF] shrink-0 mt-0.5" />
              <span className="leading-relaxed">{practice}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 11. Educational Disclaimer Card */}
      <div className="bg-[#FAF9FF] dark:bg-slate-950/90 p-5 rounded-3xl border border-[#C6C8FF]/60 dark:border-slate-800 shadow-xs space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-[#6C63FF] dark:text-violet-300 uppercase tracking-wider">
          <Info className="w-4 h-4 shrink-0 text-[#6C63FF]" />
          <span>Educational Disclaimer</span>
        </div>
        <p className="text-xs text-[#626268] dark:text-slate-400 leading-relaxed">
          BenchWise provides AI-assisted protocol reviews for educational and research support purposes only. The analysis is intended to help identify potential issues and encourage good laboratory practices, but it should not replace institutional Standard Operating Procedures (SOPs), laboratory supervision, safety training, or professional scientific judgment. Always verify protocols, reagent specifications, and laboratory safety requirements before performing any experiment.
        </p>
      </div>

    </div>
  );
};

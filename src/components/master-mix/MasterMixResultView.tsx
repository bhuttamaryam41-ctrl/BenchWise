import React, { useState } from 'react';
import { MasterMixCalculationResult } from '../../types';
import { 
  Calculator, 
  FlaskConical, 
  Copy, 
  Check, 
  Printer, 
  Download, 
  Info, 
  CheckCircle2, 
  Sparkles, 
  FileText,
  Sliders,
  Layers,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';

interface MasterMixResultViewProps {
  result: MasterMixCalculationResult;
  onReset: () => void;
}

export const MasterMixResultView: React.FC<MasterMixResultViewProps> = ({ result, onReset }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCalculation = () => {
    const textReport = `
==================================================
BENCHWISE MASTER MIX VOLUMETRIC CALCULATION
Calculated At: ${result.calculatedAt}
Experiment Type: ${result.experimentType}
==================================================

SUMMARY:
• Number of Samples: ${result.numSamples}
• Extra Volume Overhead: ${result.extraVolumePercent}%
• Final Reaction Equivalents: ${result.finalReactionsCount.toFixed(2)}
• Total Master Mix Volume: ${result.totalReactionVolume.toFixed(2)} µL
• Single Reaction Volume: ${result.sumSingleRxnVol.toFixed(2)} µL

MASTER MIX REAGENT BREAKDOWN:
------------------------------------------------------------------
${'Reagent Name'.padEnd(32, ' ')} | 1 Rxn (µL) | Total Required (µL)
------------------------------------------------------------------
${result.reagents
  .map(
    (r) =>
      `${r.name.padEnd(32, ' ')} | ${r.volPerRxn.toFixed(2).padStart(10, ' ')} | ${r.totalVol.toFixed(2).padStart(19, ' ')}`
  )
  .join('\n')}
------------------------------------------------------------------
TOTAL: ${result.sumSingleRxnVol.toFixed(2)} µL per rxn | ${result.totalReactionVolume.toFixed(2)} µL batch

CALCULATION NOTES:
• Extra Volume: ${result.notes.extraVolumeExplanation}
• Prepared Reactions: ${result.notes.totalReactionsPrepared}
• Pipetting Recommendation: ${result.notes.pipettingRecommendation}

==================================================
BenchWise Laboratory Calculator - Deterministic Volumetric Engine
`;

    navigator.clipboard.writeText(textReport.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportTextFile = () => {
    const textContent = `BenchWise Master Mix Calculation (${result.experimentType})\nDate: ${result.calculatedAt}\n\n` +
      `Samples: ${result.numSamples}\n` +
      `Overhead: +${result.extraVolumePercent}%\n` +
      `Final Reaction Equivalents: ${result.finalReactionsCount.toFixed(2)}\n` +
      `Total Volume: ${result.totalReactionVolume.toFixed(2)} µL\n\n` +
      `Reagent Breakdown:\n` +
      result.reagents.map(r => `- ${r.name}: ${r.volPerRxn.toFixed(2)} µL per rxn → Total ${r.totalVol.toFixed(2)} µL`).join('\n') +
      `\n\nPipetting Recommendation: ${result.notes.pipettingRecommendation}\n`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `MasterMix_${result.experimentType}_${result.numSamples}samples.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* 1. Export & Action Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-[#E8E8EE] dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#E8E8FF] dark:bg-purple-950 text-[#6C63FF] dark:text-violet-300 border border-[#C6C8FF] dark:border-purple-800">
            {result.experimentType}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Calculation Ready
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyCalculation}
            id="btn-copy-master-mix-calc"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[#1A1A1D] dark:text-slate-200 border border-[#E8E8EE] dark:border-slate-700 transition-all cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-[#6C63FF]" />}
            <span>{copied ? 'Copied' : 'Copy Calculation'}</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            id="btn-print-master-mix-calc"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[#1A1A1D] dark:text-slate-200 border border-[#E8E8EE] dark:border-slate-700 transition-all cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-[#6C63FF]" />
            <span className="hidden sm:inline">Print / PDF</span>
          </button>

          <button
            type="button"
            onClick={handleExportTextFile}
            id="btn-export-txt-master-mix-calc"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[#1A1A1D] dark:text-slate-200 border border-[#E8E8EE] dark:border-slate-700 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#6C63FF]" />
            <span className="hidden sm:inline">Export Text</span>
          </button>
        </div>
      </div>

      {/* 2. Summary Card */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-[#E8E8EE] dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#E8E8EE] dark:border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-[#1A1A1D] dark:text-white flex items-center gap-2 uppercase tracking-wider">
            <Calculator className="w-4 h-4 text-[#6C63FF]" />
            Master Mix Batch Summary
          </h3>
          <span className="text-xs font-mono font-semibold text-[#626268] dark:text-slate-400">
            {result.calculatedAt}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          
          <div className="p-3.5 rounded-2xl bg-[#FAF9FF] dark:bg-slate-950 border border-[#E8E8EE] dark:border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-[#626268] dark:text-slate-400 uppercase tracking-wider block">
              Experiment Type
            </span>
            <span className="text-sm font-extrabold text-[#6C63FF] dark:text-violet-300 block">
              {result.experimentType}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FAF9FF] dark:bg-slate-950 border border-[#E8E8EE] dark:border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-[#626268] dark:text-slate-400 uppercase tracking-wider block">
              Number of Samples
            </span>
            <span className="text-sm font-extrabold text-[#1A1A1D] dark:text-white block">
              {result.numSamples} rxns
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FAF9FF] dark:bg-slate-950 border border-[#E8E8EE] dark:border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-[#626268] dark:text-slate-400 uppercase tracking-wider block">
              Final Rxn Equivalents
            </span>
            <span className="text-sm font-extrabold text-[#1A1A1D] dark:text-white block">
              {result.finalReactionsCount.toFixed(2)}x
            </span>
            <span className="text-[10px] text-[#626268] dark:text-slate-500 block">
              (+{result.extraVolumePercent}% extra)
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 space-y-1">
            <span className="text-[10px] font-bold text-[#6C63FF] dark:text-violet-300 uppercase tracking-wider block">
              Total Master Mix Vol
            </span>
            <span className="text-sm font-extrabold text-[#6C63FF] dark:text-violet-200 block">
              {result.totalReactionVolume.toFixed(2)} µL
            </span>
            <span className="text-[10px] text-[#626268] dark:text-slate-400 block">
              ({result.sumSingleRxnVol.toFixed(2)} µL / rxn)
            </span>
          </div>

        </div>
      </div>

      {/* 3. Master Mix Volumetric Dosing Table */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-[#E8E8EE] dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#1A1A1D] dark:text-white flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-[#6C63FF]" />
            Volumetric Reagent Breakdown
          </h3>
          <span className="text-xs font-bold text-[#6C63FF] bg-[#E8E8FF] dark:bg-purple-950 px-2.5 py-1 rounded-full border border-[#C6C8FF] dark:border-purple-800">
            Multiplier: {result.finalReactionsCount.toFixed(2)}x
          </span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#E8E8EE] dark:border-slate-800">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#FAF9FF] dark:bg-slate-950 text-[#626268] dark:text-slate-400 border-b border-[#E8E8EE] dark:border-slate-800 font-bold">
                <th className="p-3.5">Reagent Name</th>
                <th className="p-3.5 text-right">Vol per Rxn (µL)</th>
                <th className="p-3.5 text-right text-[#6C63FF] dark:text-violet-300">Total Required Volume (µL)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8EE] dark:divide-slate-800 bg-white dark:bg-slate-900">
              {result.reagents.map((reagent, idx) => (
                <tr key={reagent.id || idx} className="hover:bg-[#FAF9FF] dark:hover:bg-slate-950/50 transition-colors">
                  <td className="p-3.5 font-bold text-[#1A1A1D] dark:text-slate-100 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#6C63FF]" />
                    {reagent.name}
                  </td>
                  <td className="p-3.5 text-right font-mono font-semibold text-[#626268] dark:text-slate-300">
                    {reagent.volPerRxn.toFixed(2)} µL
                  </td>
                  <td className="p-3.5 text-right font-mono font-extrabold text-[#6C63FF] dark:text-violet-300 text-sm">
                    {reagent.totalVol.toFixed(2)} µL
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-[#E8E8EE] dark:border-slate-800 font-extrabold bg-[#FAF9FF] dark:bg-slate-950 text-[#1A1A1D] dark:text-white">
                <td className="p-3.5 uppercase tracking-wider">
                  Total Volume
                </td>
                <td className="p-3.5 text-right font-mono">
                  {result.sumSingleRxnVol.toFixed(2)} µL
                </td>
                <td className="p-3.5 text-right font-mono text-[#6C63FF] dark:text-violet-300 text-sm">
                  {result.totalReactionVolume.toFixed(2)} µL
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* 4. Calculation Notes Card */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-[#E8E8EE] dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-[#1A1A1D] dark:text-white flex items-center gap-2">
          <Info className="w-4 h-4 text-[#6C63FF]" />
          Calculation Notes & Wet-Lab Guidance
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="p-4 rounded-2xl bg-[#FAF9FF] dark:bg-slate-950 border border-[#E8E8EE] dark:border-slate-800 space-y-1">
            <span className="text-xs font-bold text-[#6C63FF] dark:text-violet-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              Overhead Buffer
            </span>
            <p className="text-xs text-[#626268] dark:text-slate-300 leading-relaxed">
              {result.notes.extraVolumeExplanation}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF9FF] dark:bg-slate-950 border border-[#E8E8EE] dark:border-slate-800 space-y-1">
            <span className="text-xs font-bold text-[#6C63FF] dark:text-violet-300 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#6C63FF]" />
              Prepared Equivalents
            </span>
            <p className="text-xs text-[#626268] dark:text-slate-300 leading-relaxed">
              {result.notes.totalReactionsPrepared}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-800/80 space-y-1">
            <span className="text-xs font-bold text-[#6C63FF] dark:text-violet-300 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Pipetting Order
            </span>
            <p className="text-xs text-[#626268] dark:text-slate-300 leading-relaxed">
              {result.notes.pipettingRecommendation}
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};

import React from 'react';
import { MasterMixIngredient } from '../../types';
import { 
  Calculator, 
  FlaskConical, 
  Plus, 
  Trash2, 
  RotateCcw, 
  Info, 
  AlertCircle,
  HelpCircle,
  Sliders,
  CheckCircle2,
  Wand2
} from 'lucide-react';

export type MasterMixExpType = 'PCR' | 'qPCR' | 'RT-PCR';

interface MasterMixInputFormProps {
  experimentType: MasterMixExpType;
  setExperimentType: (type: MasterMixExpType) => void;
  numSamples: number | string;
  setNumSamples: (val: number | string) => void;
  reactionVolume: number | string;
  setReactionVolume: (val: number | string) => void;
  extraVolumePercent: number;
  setExtraVolumePercent: (val: number) => void;
  reagents: MasterMixIngredient[];
  setReagents: React.Dispatch<React.SetStateAction<MasterMixIngredient[]>>;
  onCalculate: (e: React.FormEvent) => void;
  onReset: () => void;
  onLoadPreset: (expType: MasterMixExpType) => void;
  validationErrors: string[];
}

export const MasterMixInputForm: React.FC<MasterMixInputFormProps> = ({
  experimentType,
  setExperimentType,
  numSamples,
  setNumSamples,
  reactionVolume,
  setReactionVolume,
  extraVolumePercent,
  setExtraVolumePercent,
  reagents,
  setReagents,
  onCalculate,
  onReset,
  onLoadPreset,
  validationErrors
}) => {

  const handleExperimentTypeChange = (newType: MasterMixExpType) => {
    setExperimentType(newType);
    onLoadPreset(newType);
  };

  const handleReagentNameChange = (id: string, name: string) => {
    setReagents((prev) =>
      prev.map((r) => (r.id === id ? { ...r, name } : r))
    );
  };

  const handleReagentVolChange = (id: string, valStr: string) => {
    const parsed = parseFloat(valStr);
    const volPerRxn = isNaN(parsed) ? 0 : Math.max(0, parsed);
    setReagents((prev) =>
      prev.map((r) => (r.id === id ? { ...r, volPerRxn } : r))
    );
  };

  const handleAddReagent = () => {
    const newId = `reagent-${Date.now()}`;
    setReagents((prev) => [
      ...prev,
      {
        id: newId,
        name: 'New Custom Additive',
        volPerRxn: 1.0,
      },
    ]);
  };

  const handleRemoveReagent = (id: string) => {
    if (reagents.length <= 1) return;
    setReagents((prev) => prev.filter((r) => r.id !== id));
  };

  const currentReagentSum = reagents.reduce((sum, r) => sum + (Number(r.volPerRxn) || 0), 0);
  const targetRxnVol = Number(reactionVolume) || 0;
  const volumeDiff = targetRxnVol - currentReagentSum;

  const handleAutoAdjustWater = () => {
    const waterIndex = reagents.findIndex(
      (r) => r.name.toLowerCase().includes('water') || r.name.toLowerCase().includes('h2o')
    );
    if (waterIndex !== -1) {
      const otherReagentsSum = reagents.reduce(
        (sum, r, idx) => (idx === waterIndex ? sum : sum + (Number(r.volPerRxn) || 0)),
        0
      );
      const neededWater = Math.max(0, targetRxnVol - otherReagentsSum);
      setReagents((prev) =>
        prev.map((r, idx) => (idx === waterIndex ? { ...r, volPerRxn: parseFloat(neededWater.toFixed(2)) } : r))
      );
    } else {
      // Add Water reagent
      const neededWater = Math.max(0, volumeDiff);
      setReagents((prev) => [
        ...prev,
        {
          id: `reagent-${Date.now()}`,
          name: 'Nuclease-Free Water',
          volPerRxn: parseFloat(neededWater.toFixed(2)),
        },
      ]);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-[#E8E8EE] dark:border-slate-800 shadow-xs space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E8E8EE] dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#E8E8FF] dark:bg-purple-950 flex items-center justify-center text-[#6C63FF] dark:text-violet-300">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-[#1A1A1D] dark:text-white">
              Master Mix Input Parameters
            </h2>
            <p className="text-[11px] text-[#626268] dark:text-slate-400">
              Deterministic volumetric calculation for reaction scaling
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onReset}
          id="btn-reset-master-mix-form"
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold text-[#626268] dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-all cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      <form onSubmit={onCalculate} className="space-y-6">
        
        {/* Experiment Type & Reaction Parameters Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Experiment Type Dropdown */}
          <div className="space-y-1.5 sm:col-span-2">
            <label 
              htmlFor="exp-type-select" 
              className="text-xs font-bold text-[#1A1A1D] dark:text-slate-200 flex items-center gap-1.5"
            >
              <FlaskConical className="w-3.5 h-3.5 text-[#6C63FF]" />
              Experiment Type <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['PCR', 'qPCR', 'RT-PCR'] as MasterMixExpType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  id={`btn-select-exp-${type.toLowerCase()}`}
                  onClick={() => handleExperimentTypeChange(type)}
                  className={`py-2 px-3 rounded-2xl text-xs font-bold transition-all cursor-pointer border ${
                    experimentType === type
                      ? 'bg-[#6C63FF] text-white border-[#6C63FF] shadow-xs'
                      : 'bg-[#FAF9FF] dark:bg-slate-950 text-[#1A1A1D] dark:text-slate-200 border-[#E8E8EE] dark:border-slate-800 hover:border-[#C6C8FF] dark:hover:border-purple-800'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Number of Samples */}
          <div className="space-y-1.5">
            <label 
              htmlFor="num-samples-input" 
              className="text-xs font-bold text-[#1A1A1D] dark:text-slate-200 flex items-center gap-1.5"
            >
              <Sliders className="w-3.5 h-3.5 text-[#6C63FF]" />
              Number of Samples <span className="text-rose-500">*</span>
            </label>
            <input
              id="num-samples-input"
              type="number"
              min="1"
              max="1000"
              value={numSamples}
              onChange={(e) => setNumSamples(e.target.value)}
              placeholder="e.g. 10"
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-2xl bg-[#FAF9FF] dark:bg-slate-950 border border-[#E8E8EE] dark:border-slate-800 text-[#1A1A1D] dark:text-slate-100 font-bold focus:outline-none focus:border-[#6C63FF] dark:focus:border-purple-600 transition-all"
            />
          </div>

          {/* Single Reaction Volume (µL) */}
          <div className="space-y-1.5">
            <label 
              htmlFor="rxn-vol-input" 
              className="text-xs font-bold text-[#1A1A1D] dark:text-slate-200 flex items-center gap-1.5"
            >
              <FlaskConical className="w-3.5 h-3.5 text-[#6C63FF]" />
              Reaction Volume (µL) <span className="text-rose-500">*</span>
            </label>
            <input
              id="rxn-vol-input"
              type="number"
              step="0.5"
              min="0.1"
              max="500"
              value={reactionVolume}
              onChange={(e) => setReactionVolume(e.target.value)}
              placeholder="e.g. 25"
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-2xl bg-[#FAF9FF] dark:bg-slate-950 border border-[#E8E8EE] dark:border-slate-800 text-[#1A1A1D] dark:text-slate-100 font-bold focus:outline-none focus:border-[#6C63FF] dark:focus:border-purple-600 transition-all"
            />
          </div>

        </div>

        {/* Extra Volume (%) Dropdown with Explanation */}
        <div className="p-4 rounded-2xl bg-[#FAF9FF] dark:bg-slate-950 border border-[#E8E8EE] dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <label 
              htmlFor="extra-volume-select" 
              className="text-xs font-bold text-[#1A1A1D] dark:text-slate-200 flex items-center gap-1.5"
            >
              <Info className="w-3.5 h-3.5 text-[#6C63FF]" />
              Extra Overhead Volume Buffer (%)
            </label>
            <select
              id="extra-volume-select"
              value={extraVolumePercent}
              onChange={(e) => setExtraVolumePercent(Number(e.target.value))}
              className="px-3 py-1.5 text-xs font-bold rounded-xl bg-white dark:bg-slate-900 border border-[#E8E8EE] dark:border-slate-800 text-[#6C63FF] dark:text-violet-300 focus:outline-none focus:border-[#6C63FF] transition-all"
            >
              <option value={0}>0% (Exact Volume)</option>
              <option value={5}>5% Extra Overhead</option>
              <option value={10}>10% Extra (Standard)</option>
              <option value={15}>15% Extra Overhead</option>
              <option value={20}>20% Extra Overhead</option>
            </select>
          </div>
          <p className="text-[11px] text-[#626268] dark:text-slate-400 leading-relaxed">
            💡 Additional volume compensates for dead volume in pipette tips, tube wall surface adhesion, and multi-dispense liquid loss during repetitive pipetting.
          </p>
        </div>

        {/* Reagent Table Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#1A1A1D] dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <FlaskConical className="w-3.5 h-3.5 text-[#6C63FF]" />
              Reaction Composition Table
            </span>

            <button
              type="button"
              id="btn-reset-preset-recipe"
              onClick={() => onLoadPreset(experimentType)}
              className="text-[11px] font-bold text-[#6C63FF] hover:underline cursor-pointer flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset {experimentType} Recipe
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#E8E8EE] dark:border-slate-800">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#FAF9FF] dark:bg-slate-950 text-[#626268] dark:text-slate-400 border-b border-[#E8E8EE] dark:border-slate-800">
                  <th className="p-3 font-semibold">Reagent Name</th>
                  <th className="p-3 font-semibold w-32">Vol per Rxn (µL)</th>
                  <th className="p-3 font-semibold text-center w-16">Remove</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E8EE] dark:divide-slate-800 bg-white dark:bg-slate-900">
                {reagents.map((reagent, idx) => (
                  <tr key={reagent.id} className="hover:bg-[#FAF9FF] dark:hover:bg-slate-950/50 transition-colors">
                    <td className="p-2.5">
                      <input
                        type="text"
                        value={reagent.name}
                        id={`reagent-name-input-${idx}`}
                        onChange={(e) => handleReagentNameChange(reagent.id, e.target.value)}
                        placeholder="Reagent Name"
                        className="w-full px-2.5 py-1.5 text-xs font-semibold rounded-xl bg-[#FAF9FF] dark:bg-slate-950 border border-[#E8E8EE] dark:border-slate-800 text-[#1A1A1D] dark:text-slate-100 focus:outline-none focus:border-[#6C63FF] transition-all"
                      />
                    </td>
                    <td className="p-2.5">
                      <input
                        type="number"
                        step="0.05"
                        min="0"
                        id={`reagent-vol-input-${idx}`}
                        value={reagent.volPerRxn === 0 ? '' : reagent.volPerRxn}
                        onChange={(e) => handleReagentVolChange(reagent.id, e.target.value)}
                        placeholder="0.00"
                        className="w-full px-2.5 py-1.5 text-xs font-bold rounded-xl bg-[#FAF9FF] dark:bg-slate-950 border border-[#E8E8EE] dark:border-slate-800 text-[#6C63FF] dark:text-violet-300 focus:outline-none focus:border-[#6C63FF] transition-all"
                      />
                    </td>
                    <td className="p-2.5 text-center">
                      <button
                        type="button"
                        id={`btn-remove-reagent-${idx}`}
                        onClick={() => handleRemoveReagent(reagent.id)}
                        disabled={reagents.length <= 1}
                        className="p-1.5 text-[#626268] hover:text-rose-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        title="Remove Reagent"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Reagent & Auto-Balance Water Controls */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <button
              type="button"
              id="btn-add-reagent"
              onClick={handleAddReagent}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#E8E8FF] dark:bg-purple-950 text-[#6C63FF] dark:text-violet-300 border border-[#C6C8FF] dark:border-purple-800 hover:bg-[#C6C8FF] transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Reagent</span>
            </button>

            {Math.abs(volumeDiff) > 0.01 && (
              <button
                type="button"
                id="btn-auto-adjust-water"
                onClick={handleAutoAdjustWater}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 transition-all cursor-pointer"
              >
                <Wand2 className="w-3.5 h-3.5 text-amber-600" />
                <span>Auto-adjust Water ({volumeDiff > 0 ? `+${volumeDiff.toFixed(2)}` : volumeDiff.toFixed(2)} µL)</span>
              </button>
            )}
          </div>

          {/* Volume Sum Comparison Notice */}
          <div className={`p-3 rounded-2xl text-xs flex items-center justify-between gap-2 border ${
            Math.abs(volumeDiff) < 0.01
              ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
              : 'bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200'
          }`}>
            <div className="flex items-center gap-2">
              {Math.abs(volumeDiff) < 0.01 ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              )}
              <span>
                <strong>Sum of Reagents:</strong> {currentReagentSum.toFixed(2)} µL / <strong>Target Rxn Vol:</strong> {targetRxnVol.toFixed(2)} µL
              </span>
            </div>

            {Math.abs(volumeDiff) >= 0.01 && (
              <span className="font-bold text-[11px] underline shrink-0 cursor-pointer" onClick={handleAutoAdjustWater}>
                Fix mismatch
              </span>
            )}
          </div>

        </div>

        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200 text-xs space-y-1">
            {validationErrors.map((err, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                <span>{err}</span>
              </div>
            ))}
          </div>
        )}

        {/* Main Calculate Button */}
        <div className="pt-2">
          <button
            type="submit"
            id="btn-calculate-master-mix"
            className="w-full py-3.5 px-6 rounded-2xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#6C63FF] to-violet-600 hover:from-violet-600 hover:to-[#6C63FF] focus:outline-none shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Calculator className="w-4 h-4" />
            <span>Calculate Master Mix Volumes</span>
          </button>
        </div>

      </form>
    </div>
  );
};

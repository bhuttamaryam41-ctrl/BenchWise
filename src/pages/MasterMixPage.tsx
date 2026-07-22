import React, { useState } from 'react';
import { MasterMixIngredient, MasterMixCalculationResult } from '../types';
import { MasterMixInputForm, MasterMixExpType } from '../components/master-mix/MasterMixInputForm';
import { MasterMixResultView } from '../components/master-mix/MasterMixResultView';
import { Calculator, Sparkles, HelpCircle, CheckCircle2 } from 'lucide-react';

const PRESET_RECIPES: Record<MasterMixExpType, { rxnVolume: number; reagents: MasterMixIngredient[] }> = {
  'PCR': {
    rxnVolume: 25,
    reagents: [
      { id: '1', name: '2X PCR Master Mix', volPerRxn: 12.50 },
      { id: '2', name: 'Forward Primer (10 µM)', volPerRxn: 1.00 },
      { id: '3', name: 'Reverse Primer (10 µM)', volPerRxn: 1.00 },
      { id: '4', name: 'DNA Template', volPerRxn: 2.00 },
      { id: '5', name: 'Nuclease-Free Water', volPerRxn: 8.50 },
    ]
  },
  'qPCR': {
    rxnVolume: 20,
    reagents: [
      { id: '1', name: '2X SYBR Green / Probe Master Mix', volPerRxn: 10.00 },
      { id: '2', name: 'Forward Primer (10 µM)', volPerRxn: 0.80 },
      { id: '3', name: 'Reverse Primer (10 µM)', volPerRxn: 0.80 },
      { id: '4', name: 'cDNA / DNA Template', volPerRxn: 2.00 },
      { id: '5', name: 'Nuclease-Free Water', volPerRxn: 6.40 },
    ]
  },
  'RT-PCR': {
    rxnVolume: 20,
    reagents: [
      { id: '1', name: '5X Reverse Transcriptase Buffer', volPerRxn: 4.00 },
      { id: '2', name: 'dNTP Mix (10 mM)', volPerRxn: 1.00 },
      { id: '3', name: 'Primer (Oligo dT / Random Hexamer)', volPerRxn: 1.00 },
      { id: '4', name: 'Reverse Transcriptase Enzyme', volPerRxn: 1.00 },
      { id: '5', name: 'Total RNA Template', volPerRxn: 5.00 },
      { id: '6', name: 'Nuclease-Free Water', volPerRxn: 8.00 },
    ]
  }
};

export const MasterMixPage: React.FC = () => {
  const [experimentType, setExperimentType] = useState<MasterMixExpType>('PCR');
  const [numSamples, setNumSamples] = useState<number | string>(10);
  const [reactionVolume, setReactionVolume] = useState<number | string>(25);
  const [extraVolumePercent, setExtraVolumePercent] = useState<number>(10);
  const [reagents, setReagents] = useState<MasterMixIngredient[]>(PRESET_RECIPES.PCR.reagents);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Function to calculate deterministic master mix volumes
  const calculateResult = (
    type: MasterMixExpType,
    samplesVal: number | string,
    volVal: number | string,
    extraPct: number,
    reagentList: MasterMixIngredient[]
  ): { errors: string[]; result: MasterMixCalculationResult | null } => {
    const errors: string[] = [];
    const samples = parseInt(String(samplesVal), 10);
    const totalRxnVol = parseFloat(String(volVal));

    if (isNaN(samples) || samples < 1) {
      errors.push('Number of samples must be a positive integer (at least 1).');
    }

    if (isNaN(totalRxnVol) || totalRxnVol <= 0) {
      errors.push('Reaction volume must be greater than 0 µL.');
    }

    if (!reagentList || reagentList.length === 0) {
      errors.push('At least one reagent must be specified in the composition table.');
    }

    if (reagentList.some(r => typeof r.volPerRxn !== 'number' || isNaN(r.volPerRxn) || r.volPerRxn < 0)) {
      errors.push('Reagent volumes cannot be negative or invalid numbers.');
    }

    if (errors.length > 0) {
      return { errors, result: null };
    }

    const extraMultiplier = 1 + extraPct / 100;
    const finalReactionsCount = samples * extraMultiplier;
    const totalReactionVolume = totalRxnVol * finalReactionsCount;

    const calculatedReagents = reagentList.map((r) => ({
      id: r.id,
      name: r.name || 'Unnamed Reagent',
      volPerRxn: r.volPerRxn,
      totalVol: parseFloat((r.volPerRxn * finalReactionsCount).toFixed(2))
    }));

    const sumSingleRxnVol = reagentList.reduce((sum, r) => sum + (r.volPerRxn || 0), 0);
    const extraEquivalents = samples * (extraPct / 100);

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const result: MasterMixCalculationResult = {
      experimentType: type,
      numSamples: samples,
      reactionVolume: totalRxnVol,
      extraVolumePercent: extraPct,
      finalReactionsCount,
      totalReactionVolume: parseFloat(totalReactionVolume.toFixed(2)),
      reagents: calculatedReagents,
      sumSingleRxnVol: parseFloat(sumSingleRxnVol.toFixed(2)),
      notes: {
        extraVolumeExplanation: `+${extraPct}% extra volume overhead added (+${extraEquivalents.toFixed(2)} reaction equivalents) to compensate for multi-dispense tip dead volume and tube wall loss.`,
        totalReactionsPrepared: `Prepared for ${finalReactionsCount.toFixed(2)} reaction equivalents total (${samples} target samples × ${extraMultiplier.toFixed(2)}x scaling multiplier).`,
        pipettingRecommendation: `Add reagents on ice in order of decreasing volume: Water → Buffer / Master Mix → Primers → Template DNA → Enzyme last. Pulse-vortex and spin down prior to dispensing into reaction tubes.`
      },
      calculatedAt: `${dateStr} at ${timeStr}`
    };

    return { errors: [], result };
  };

  // Perform calculation on load / state change
  const { errors, result: calculationResult } = calculateResult(
    experimentType,
    numSamples,
    reactionVolume,
    extraVolumePercent,
    reagents
  );

  const handleLoadPreset = (presetType: MasterMixExpType) => {
    const preset = PRESET_RECIPES[presetType];
    setExperimentType(presetType);
    setReactionVolume(preset.rxnVolume);
    setReagents(preset.reagents);
    setValidationErrors([]);
  };

  const handleReset = () => {
    setExperimentType('PCR');
    setNumSamples(10);
    setReactionVolume(25);
    setExtraVolumePercent(10);
    setReagents(PRESET_RECIPES.PCR.reagents);
    setValidationErrors([]);
  };

  const handleCalculateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (errors.length > 0) {
      setValidationErrors(errors);
    } else {
      setValidationErrors([]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="space-y-2 border-b border-[#E8E8EE] dark:border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#E8E8FF] dark:bg-purple-950 text-[#6C63FF] dark:text-violet-300 border border-[#C6C8FF] dark:border-purple-800">
          <Calculator className="w-3.5 h-3.5 text-[#6C63FF]" />
          <span>Deterministic Volumetric Calculation Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1D] dark:text-white tracking-tight">
          Master Mix Calculator
        </h1>
        <p className="text-xs sm:text-sm text-[#626268] dark:text-slate-300 max-w-3xl">
          Accurately calculate master mix reagent volumes for PCR, qPCR, and RT-PCR reactions with automatic pipetting overhead compensation. Prevents manual calculation errors on the bench.
        </p>
      </div>

      {/* Main Two-Column Layout: Left Inputs, Right Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column – Inputs */}
        <div className="lg:col-span-5 space-y-6">
          <MasterMixInputForm
            experimentType={experimentType}
            setExperimentType={setExperimentType}
            numSamples={numSamples}
            setNumSamples={setNumSamples}
            reactionVolume={reactionVolume}
            setReactionVolume={setReactionVolume}
            extraVolumePercent={extraVolumePercent}
            setExtraVolumePercent={setExtraVolumePercent}
            reagents={reagents}
            setReagents={setReagents}
            onCalculate={handleCalculateSubmit}
            onReset={handleReset}
            onLoadPreset={handleLoadPreset}
            validationErrors={validationErrors.length > 0 ? validationErrors : errors}
          />
        </div>

        {/* Right Column – Calculated Results */}
        <div className="lg:col-span-7 space-y-6">
          {calculationResult && (validationErrors.length === 0 && errors.length === 0) ? (
            <MasterMixResultView
              result={calculationResult}
              onReset={handleReset}
            />
          ) : (
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-rose-200 dark:border-rose-900 shadow-xs text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600 flex items-center justify-center mx-auto">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-rose-800 dark:text-rose-200">
                Invalid Input Parameters
              </h3>
              <p className="text-xs text-[#626268] dark:text-slate-400 max-w-md mx-auto">
                Please fix the input errors in the left panel to display the Master Mix volumetric calculation results.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

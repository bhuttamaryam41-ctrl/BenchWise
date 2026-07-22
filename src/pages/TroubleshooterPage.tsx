import React, { useState } from 'react';
import { TroubleshooterExperimentType, TroubleshooterAnalysisResult } from '../types';
import { TroubleshooterInputForm } from '../components/troubleshooter/TroubleshooterInputForm';
import { TroubleshooterEmptyState } from '../components/troubleshooter/TroubleshooterEmptyState';
import { TroubleshooterLoadingState } from '../components/troubleshooter/TroubleshooterLoadingState';
import { TroubleshooterAnalysisResult as AnalysisResultView } from '../components/troubleshooter/TroubleshooterAnalysisResult';
import { AlertOctagon } from 'lucide-react';

export const TroubleshooterPage: React.FC = () => {
  const [experimentType, setExperimentType] = useState<TroubleshooterExperimentType>('Gel Electrophoresis');
  const [observedProblem, setObservedProblem] = useState<string>('');
  const [additionalDetails, setAdditionalDetails] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<TroubleshooterAnalysisResult | null>(null);

  // Handle preset sample loading
  const handleLoadSample = (sampleKey: 'gel' | 'western' | 'rna') => {
    setValidationError(null);
    if (sampleKey === 'gel') {
      setExperimentType('Gel Electrophoresis');
      setObservedProblem('No DNA bands appeared after agarose gel electrophoresis. Only primer-dimers were visible at the bottom of the gel.');
      setAdditionalDetails('Standard 1% agarose gel run at 100V for 45 minutes in 1x TAE buffer. Ethidium bromide added. Amplification conducted with 35 cycles at 58°C annealing temperature.');
    } else if (sampleKey === 'western') {
      setExperimentType('Western Blot');
      setObservedProblem('High uniform background signal across the entire PVDF membrane making specific target bands unidentifiable.');
      setAdditionalDetails('Blocked in 5% non-fat milk for 30 minutes at room temperature. Primary antibody diluted 1:500 incubated overnight at 4°C. Washed 2 times with TBST for 3 minutes.');
    } else if (sampleKey === 'rna') {
      setExperimentType('RNA Extraction');
      setObservedProblem('Extremely low RNA yield (under 5 ng/µL) and poor A260/A280 purity ratio (1.45) with visible degradation smear on denaturing gel.');
      setAdditionalDetails('Extracted from tissue using TRIzol reagent. Homogenized at room temperature without liquid nitrogen. Eluted in 30 µL nuclease-free water.');
    }
  };

  // Handle Form Reset
  const handleClear = () => {
    setObservedProblem('');
    setAdditionalDetails('');
    setValidationError(null);
    setAnalysisResult(null);
  };

  // Handle Form Submission & Gemini AI Diagnostics
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!observedProblem.trim()) {
      setValidationError('Please describe the observed problem or failure symptom before analyzing.');
      return;
    }

    setValidationError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/troubleshoot-experiment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          experimentType,
          observedProblem,
          additionalDetails,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to complete experiment troubleshooting analysis.');
      }

      setAnalysisResult(data.result);
    } catch (err: any) {
      console.error('Experiment troubleshooting error:', err);
      setValidationError(err.message || 'An error occurred during diagnostic analysis. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-2 border-b border-[#E8E8EE] dark:border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#E8E8FF] dark:bg-purple-950 text-[#6C63FF] dark:text-violet-300 border border-[#C6C8FF] dark:border-purple-800">
          <AlertOctagon className="w-3.5 h-3.5 text-[#6C63FF]" />
          <span>Gemini AI Experiment Troubleshooter</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1D] dark:text-white tracking-tight">
          Experiment Failure Troubleshooter
        </h1>
        <p className="text-xs sm:text-sm text-[#626268] dark:text-slate-300 max-w-3xl">
          Describe your failed laboratory experiment to identify probable root causes, step-by-step corrective solutions, parameter verification checklists, and educational notes powered by Gemini AI.
        </p>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Input Form */}
        <div className="lg:col-span-5 space-y-6">
          <TroubleshooterInputForm
            experimentType={experimentType}
            setExperimentType={setExperimentType}
            observedProblem={observedProblem}
            setObservedProblem={setObservedProblem}
            additionalDetails={additionalDetails}
            setAdditionalDetails={setAdditionalDetails}
            onSubmit={handleSubmit}
            onClear={handleClear}
            onLoadSample={handleLoadSample}
            isLoading={isLoading}
            validationError={validationError}
          />
        </div>

        {/* Right Column: AI Analysis Output / Empty State / Loading State */}
        <div className="lg:col-span-7 space-y-6">
          {isLoading ? (
            <TroubleshooterLoadingState />
          ) : analysisResult ? (
            <AnalysisResultView
              analysis={analysisResult}
              onReset={handleClear}
            />
          ) : (
            <TroubleshooterEmptyState onLoadSample={handleLoadSample} />
          )}
        </div>

      </div>

    </div>
  );
};

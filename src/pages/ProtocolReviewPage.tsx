import React, { useState } from 'react';
import { ExperimentType, ReviewGoal, ProtocolReviewAnalysis } from '../types';
import { ProtocolInputForm } from '../components/protocol-review/ProtocolInputForm';
import { EmptyAuditState } from '../components/protocol-review/EmptyAuditState';
import { LoadingAuditState } from '../components/protocol-review/LoadingAuditState';
import { ProtocolAnalysisResult } from '../components/protocol-review/ProtocolAnalysisResult';
import { 
  SAMPLE_PCR_TEXT, 
  SAMPLE_WESTERN_TEXT, 
  SAMPLE_DNA_EXTRACTION_TEXT 
} from '../data/protocolReviewMock';
import { FileCheck } from 'lucide-react';

export const ProtocolReviewPage: React.FC = () => {
  const [protocolText, setProtocolText] = useState<string>('');
  const [experimentType, setExperimentType] = useState<ExperimentType>('PCR');
  const [reviewGoal, setReviewGoal] = useState<ReviewGoal>('General Review');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<ProtocolReviewAnalysis | null>(null);

  // Handle loading sample template protocols
  const handleLoadSample = (sampleType: 'pcr' | 'western' | 'dna') => {
    setValidationError(null);
    if (sampleType === 'pcr') {
      setProtocolText(SAMPLE_PCR_TEXT);
      setExperimentType('PCR');
      setReviewGoal('General Review');
    } else if (sampleType === 'western') {
      setProtocolText(SAMPLE_WESTERN_TEXT);
      setExperimentType('Western Blot');
      setReviewGoal('Check for Missing Steps');
    } else if (sampleType === 'dna') {
      setProtocolText(SAMPLE_DNA_EXTRACTION_TEXT);
      setExperimentType('DNA Extraction');
      setReviewGoal('Reproducibility Review');
    }
  };

  // Handle Form Clear
  const handleClear = () => {
    setProtocolText('');
    setValidationError(null);
    setAnalysisResult(null);
  };

  // Handle Form Submit & Real Gemini AI Protocol Review
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!protocolText.trim()) {
      setValidationError('Please enter or paste an experimental protocol procedure before reviewing.');
      return;
    }

    setValidationError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/review-protocol', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          protocolText,
          experimentType,
          reviewGoal,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to complete protocol review analysis.');
      }

      setAnalysisResult(data.result);
    } catch (err: any) {
      console.error('Protocol review submission error:', err);
      setValidationError(err.message || 'An error occurred during protocol audit. Please check your network connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="space-y-2 border-b border-[#E8E8EE] dark:border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#E8E8FF] dark:bg-purple-950 text-[#6C63FF] dark:text-violet-300 border border-[#C6C8FF] dark:border-purple-800">
          <FileCheck className="w-3.5 h-3.5 text-[#6C63FF]" />
          <span>Gemini AI Protocol Audit Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1D] dark:text-white tracking-tight">
          Laboratory Protocol Review
        </h1>
        <p className="text-xs sm:text-sm text-[#626268] dark:text-slate-300 max-w-3xl">
          Paste your experimental protocol procedure to receive an instant, AI-assisted scientific audit covering stoichiometry, missing steps, biosafety guidelines, and GLP optimizations powered by Gemini.
        </p>
      </div>

      {/* Main Two-Column Layout: Left Input Panel, Right Results Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column – Input Form */}
        <div className="lg:col-span-5 space-y-6">
          <ProtocolInputForm
            protocolText={protocolText}
            setProtocolText={setProtocolText}
            experimentType={experimentType}
            setExperimentType={setExperimentType}
            reviewGoal={reviewGoal}
            setReviewGoal={setReviewGoal}
            onSubmit={handleSubmit}
            onClear={handleClear}
            onLoadSample={handleLoadSample}
            isLoading={isLoading}
            validationError={validationError}
          />
        </div>

        {/* Right Column – Results / Empty / Loading Panel */}
        <div className="lg:col-span-7 space-y-6">
          {isLoading ? (
            <LoadingAuditState />
          ) : analysisResult ? (
            <ProtocolAnalysisResult
              analysis={analysisResult}
              onReset={handleClear}
            />
          ) : (
            <EmptyAuditState onLoadSample={handleLoadSample} />
          )}
        </div>

      </div>

    </div>
  );
};

export type Page = 'home' | 'protocol-review' | 'troubleshooter' | 'master-mix' | 'about';

export type ExperimentType = 
  | 'PCR'
  | 'qPCR'
  | 'Gel Electrophoresis'
  | 'DNA Extraction'
  | 'RNA Extraction'
  | 'Cell Culture'
  | 'Western Blot'
  | 'ELISA'
  | 'Microscopy'
  | 'Spectrophotometry'
  | 'Other';

export type TroubleshooterExperimentType = ExperimentType;

export interface TroubleshooterCause {
  id: string;
  rank: number;
  cause: string;
  likelihood: 'High' | 'Medium' | 'Low';
  likelihoodPercentage: number;
  explanation: string;
}

export interface TroubleshooterSolution {
  id: string;
  stepNumber: number;
  title: string;
  actionableSteps: string[];
  targetCause?: string;
}

export interface TroubleshooterParameterCheck {
  id: string;
  parameterName: string;
  status: 'Critical' | 'Warning' | 'Optimal';
  guideline: string;
}

export interface TroubleshooterAnalysisResult {
  experimentType: TroubleshooterExperimentType;
  observedProblem: string;
  additionalDetails?: string;
  summary: string;
  confidenceScore: number;
  confidenceCategory: 'Very High' | 'High' | 'Moderate' | 'Low';
  confidenceExplanation: string;
  mostLikelyCauses: TroubleshooterCause[];
  possibleSolutions: TroubleshooterSolution[];
  parametersToVerify: TroubleshooterParameterCheck[];
  preventionTips: string[];
  educationalNotes: string[];
  finalRecommendation: string;
  timestamp: string;
  reviewDate: string;
  status: 'Completed' | 'Pending' | 'Error';
}

export type ReviewGoal = 
  | 'General Review'
  | 'Check for Missing Steps'
  | 'Improve Clarity'
  | 'Safety Review'
  | 'Reproducibility Review';

export interface ProtocolReviewIssue {
  id: string;
  title: string;
  severity: 'High' | 'Medium' | 'Low';
  description: string;
  recommendation: string;
}

export interface ProtocolReviewAnalysis {
  protocolTitle?: string;
  experimentType: ExperimentType;
  reviewGoal: ReviewGoal;
  qualityScore: number;
  confidenceLevel: string;
  confidenceScore: number; // 0 to 100
  confidenceCategory: 'Very High' | 'High' | 'Moderate' | 'Low';
  confidenceExplanation: string;
  summary: string;
  potentialIssues: ProtocolReviewIssue[];
  missingInformation: string[];
  suggestedImprovements: string[];
  safetyConsiderations: {
    bslLevel: 'BSL-1' | 'BSL-2';
    ppeRequired: string[];
    hazards: string[];
    safetyNotes: string[];
  };
  bestPractices: string[];
  finalRecommendation: string;
  timestamp: string;
  reviewDate: string;
  wordCount: number;
  charCount: number;
  status: 'Completed' | 'Pending' | 'Error';
}

export interface ProtocolStep {
  id: number;
  title: string;
  action: string;
  duration?: string;
  temperature?: string;
  reagents?: string[];
  criticalNote?: string;
  status: 'valid' | 'warning' | 'info';
}

export interface Protocol {
  id: string;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  biosafetyLevel: 'BSL-1' | 'BSL-2';
  description: string;
  reagents: { name: string; stockConc: string; finalConc: string; storage: string }[];
  steps: ProtocolStep[];
  auditNotes: string[];
}

export interface TroubleshootingIssue {
  id: string;
  title: string;
  category: string;
  symptom: string;
  possibleCauses: { cause: string; probability: string; fix: string }[];
  preventativeTips: string[];
}

export interface MasterMixIngredient {
  id: string;
  name: string;
  stockConc?: string;
  finalConc?: string;
  volPerRxn: number; // in uL
  unit?: string;
}

export interface MasterMixCalculationResult {
  experimentType: 'PCR' | 'qPCR' | 'RT-PCR';
  numSamples: number;
  reactionVolume: number;
  extraVolumePercent: number;
  finalReactionsCount: number;
  totalReactionVolume: number;
  reagents: {
    id: string;
    name: string;
    volPerRxn: number;
    totalVol: number;
  }[];
  sumSingleRxnVol: number;
  notes: {
    extraVolumeExplanation: string;
    totalReactionsPrepared: string;
    pipettingRecommendation: string;
  };
  calculatedAt: string;
}

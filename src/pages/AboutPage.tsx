import React from 'react';
import { 
  Info, 
  Dna, 
  ShieldCheck, 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  BookOpen, 
  FlaskConical,
  Target,
  Users,
  Sparkles
} from 'lucide-react';
import { Page } from '../types';

interface AboutPageProps {
  onNavigate: (page: Page) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Hero Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 dark:bg-purple-950/80 text-violet-700 dark:text-violet-300 border border-purple-200/80 dark:border-purple-800">
          <Info className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
          <span>About BenchWise</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Bridging Experimental Theory and Wet-Lab Reproducibility
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          BenchWise was created to transform how biotechnology students, laboratory researchers, and educators prepare, audit, and troubleshoot molecular biology protocols before picking up a pipette.
        </p>
      </div>

      {/* Core Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-purple-100 dark:border-slate-800 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-100/70 dark:bg-purple-950 text-violet-600 dark:text-violet-400 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Our Mission
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            To eliminate costly wet-lab trial-and-error by providing intelligent protocol auditing, standardized GLP compliance checks, and precise stoichiometry tools that empower life science researchers to achieve consistent, reproducible results.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-purple-100 dark:border-slate-800 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100/70 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Educational Purpose
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Biotechnology education requires both conceptual mastery and meticulous physical execution. BenchWise acts as a digital teaching assistant, helping students understand the 'why' behind buffer pH, enzyme kinetics, annealing Tm matching, and biosafety protocols.
          </p>
        </div>

      </div>

      {/* Core Guiding Pillars */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Core Scientific Pillars
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Every feature in BenchWise is built around established standards of Good Laboratory Practice (GLP).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-purple-100 dark:border-slate-800 shadow-xs space-y-3">
            <ShieldCheck className="w-8 h-8 text-violet-600 dark:text-violet-400" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              GLP & ISO Standards
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Standardized formatting for biosafety levels, pause points, reagent storage, and tracking.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-purple-100 dark:border-slate-800 shadow-xs space-y-3">
            <Award className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Stoichiometric Precision
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Automated volumetric calculations with built-in pipetting dead-volume buffers.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-purple-100 dark:border-slate-800 shadow-xs space-y-3">
            <FlaskConical className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Systematic Diagnostic Trees
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Probabilistic troubleshooting models for PCR, Western blot, and cell transformations.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-purple-100 dark:border-slate-800 shadow-xs space-y-3">
            <BookOpen className="w-8 h-8 text-teal-600 dark:text-teal-400" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Open Educational Access
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Designed for undergraduate courses, academic research labs, and training programs.
            </p>
          </div>

        </div>
      </div>

      {/* Biosafety Statement Box */}
      <div className="p-8 rounded-3xl bg-slate-900 text-slate-200 space-y-4 border border-purple-900/40 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-violet-300 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              Institutional Biosafety & Compliance Notice
            </h3>
            <p className="text-xs text-slate-400">
              Compliance Standard ISO 17025 / GLP Guidance
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          BenchWise is an educational and experimental planning platform. All protocol steps, buffer concentrations, and troubleshooting recommendations are generated based on published peer-reviewed standards and manufacturer guidelines. Always verify protocol parameters with your Institutional Biosafety Committee (IBC), facility Safety Data Sheets (SDS), and primary supervisor prior to physical wet-lab execution.
        </p>

        <div className="pt-2 flex items-center gap-4">
          <button
            onClick={() => onNavigate('protocol-review')}
            className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            Explore Protocol Reviews
          </button>
        </div>
      </div>

    </div>
  );
};

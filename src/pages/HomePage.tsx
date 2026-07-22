import React from 'react';
import { 
  FileCheck, 
  HelpCircle, 
  Calculator, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  FlaskConical, 
  Dna, 
  Layers, 
  GraduationCap, 
  Atom, 
  Check, 
  Search,
  ExternalLink
} from 'lucide-react';
import { Page } from '../types';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 pb-12">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-24">
        {/* Subtle background glow graphics */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-purple-400/15 dark:bg-purple-600/15 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-indigo-400/15 dark:bg-indigo-600/10 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-10 w-[300px] h-[250px] bg-teal-400/10 dark:bg-teal-600/10 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#E8E8FF] dark:bg-purple-950/80 text-[#6C63FF] dark:text-violet-300 border border-[#C6C8FF] dark:border-purple-800/80 shadow-xs uppercase tracking-wider font-mono">
                <Sparkles className="w-3.5 h-3.5 text-[#6C63FF] dark:text-violet-400" />
                <span>Next Gen Lab Intel</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#1A1A1D] dark:text-white tracking-tight leading-[1.05]">
                Optimize <i className="font-serif-italic text-[#6C63FF] dark:text-violet-400 font-normal">Biotech</i> Research At The Bench.
              </h1>

              <p className="text-base sm:text-lg text-[#626268] dark:text-slate-300 max-w-2xl leading-relaxed">
                Empowering biotechnology researchers, students, and educators with automated protocol audits, reaction stoichiometry, and systematic troubleshooting tools for reproducible wet-lab outcomes.
              </p>

              {/* Call to Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  id="hero-cta-protocol-review"
                  onClick={() => onNavigate('protocol-review')}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#6C63FF] hover:bg-[#5a51e6] text-white font-semibold text-sm shadow-lg shadow-[#6C63FF]/20 hover:shadow-xl hover:shadow-[#6C63FF]/30 transition-all cursor-pointer"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <button
                  id="hero-cta-master-mix"
                  onClick={() => onNavigate('master-mix')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white dark:bg-slate-900 hover:bg-[#FAF9FF] dark:hover:bg-slate-800 text-[#1A1A1D] dark:text-slate-200 font-semibold text-sm border border-[#E8E8EE] dark:border-slate-800 shadow-xs transition-all cursor-pointer"
                >
                  <Calculator className="w-4 h-4 text-[#6C63FF] dark:text-violet-400" />
                  <span>Master Mix Calculator</span>
                </button>
              </div>

              {/* Quick Trust Badges */}
              <div className="pt-4 border-t border-purple-100 dark:border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>GLP & ISO Standard Checks</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-violet-500" />
                  <span>Verified Reagent Stoichiometry</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-indigo-500" />
                  <span>Zero Wet-Lab Lag</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Preview Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl p-1 bg-gradient-to-b from-purple-200 via-indigo-100 to-purple-50 dark:from-purple-900/40 dark:via-slate-800/60 dark:to-slate-900/40 shadow-xl shadow-purple-500/10">
                <div className="bg-white dark:bg-slate-900 rounded-xl p-5 space-y-4 border border-purple-100/80 dark:border-slate-800">
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-purple-50 dark:border-slate-800 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950 text-violet-700 dark:text-violet-300 flex items-center justify-center font-bold text-xs border border-purple-200/50 dark:border-purple-800">
                        PCR
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          Taq Polymerase PCR Protocol
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          Audit ID: #PR-2026-9042 • BSL-1
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      Passed Audit
                    </span>
                  </div>

                  {/* Audit Check Points Mockup */}
                  <div className="space-y-2.5">
                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-purple-100/60 dark:border-slate-800 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                          Annealing Tm Window Validated
                        </span>
                        <span className="text-slate-500 dark:text-slate-400">
                          Primer Tm = 58.2°C. Thermal cycle set to 58°C (Ideal delta: 3°C).
                        </span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/50 flex items-start gap-2.5">
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <span className="font-semibold text-amber-900 dark:text-amber-200 block">
                          Reagent Stability Flag
                        </span>
                        <span className="text-amber-800/80 dark:text-amber-300/80">
                          dNTP freeze-thaw count &gt; 4. Recommend fresh aliquot to preserve efficiency.
                        </span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-purple-100/60 dark:border-slate-800 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                          Extension Time vs Amplicon Length
                        </span>
                        <span className="text-slate-500 dark:text-slate-400">
                          60s extension allocated for 1.2 kb target fragment. (Rate: 1 min/kb).
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Action bar inside mock */}
                  <div className="pt-2 flex items-center justify-between text-xs border-t border-purple-50 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400">
                      Total Volume: 50.0 µL / rxn
                    </span>
                    <button
                      onClick={() => onNavigate('protocol-review')}
                      className="text-violet-600 dark:text-violet-400 hover:underline font-semibold flex items-center gap-1"
                    >
                      View Full Protocol Audit &rarr;
                    </button>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="bg-purple-50/60 dark:bg-slate-900/60 border-y border-purple-100 dark:border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-violet-600 dark:text-violet-400">
                99.4%
              </div>
              <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                Reagent Dosing Accuracy
              </p>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
                250+
              </div>
              <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                Standard Lab Protocols
              </p>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-purple-600 dark:text-purple-400">
                45%
              </div>
              <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                Reduction in Bench Re-work
              </p>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-teal-600 dark:text-teal-400">
                100%
              </div>
              <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                GLP / ISO Audit Compliant
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features / Module Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Core Modules for Wet-Lab Success
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Purpose-built tools designed to eliminate stoichiometry errors, identify protocol pitfalls, and streamline experimental planning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Protocol Review */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-purple-100 dark:border-slate-800 shadow-xs hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-md transition-all flex flex-col justify-between space-y-4 group">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-purple-100 dark:bg-purple-950 text-violet-600 dark:text-violet-400 flex items-center justify-center group-hover:scale-105 transition-transform border border-purple-200/60 dark:border-purple-800">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Protocol Review & Audit
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Automated auditing of incubation temperatures, buffer concentrations, Tm matching, biosafety levels, and critical step pause points.
              </p>
            </div>
            <button
              id="feature-card-protocol-review-btn"
              onClick={() => onNavigate('protocol-review')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-600 dark:text-violet-400 group-hover:gap-2 transition-all pt-2"
            >
              <span>Explore Protocols</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: Troubleshooter */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-purple-100 dark:border-slate-800 shadow-xs hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-md transition-all flex flex-col justify-between space-y-4 group">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-105 transition-transform border border-indigo-200/60 dark:border-indigo-800">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Diagnostic Troubleshooter
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Step-by-step root cause analysis for PCR failures, Western blot background noise, cell transformation issues, and gel smearing.
              </p>
            </div>
            <button
              id="feature-card-troubleshooter-btn"
              onClick={() => onNavigate('troubleshooter')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:gap-2 transition-all pt-2"
            >
              <span>Start Diagnostic</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: Master Mix Calculator */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-purple-100 dark:border-slate-800 shadow-xs hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-md transition-all flex flex-col justify-between space-y-4 group">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 flex items-center justify-center group-hover:scale-105 transition-transform border border-violet-200/60 dark:border-violet-800">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Master Mix Calculator
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Precise stoichiometric master mix scaling with buffer safety overheads, stock concentration conversions, and printable bench sheets.
              </p>
            </div>
            <button
              id="feature-card-master-mix-btn"
              onClick={() => onNavigate('master-mix')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-600 dark:text-violet-400 group-hover:gap-2 transition-all pt-2"
            >
              <span>Calculate Mix</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* 3-Step Biotech Workflow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-purple-900/40">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 blur-3xl rounded-full pointer-events-none" />

          <div className="space-y-8 relative z-10">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
                Systematic Methodology
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold">
                How BenchWise Works
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                A seamless 3-stage protocol verification process designed for wet-lab execution.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="bg-slate-800/80 p-6 rounded-2xl border border-purple-800/40 space-y-3">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h4 className="font-bold text-base text-white">
                  Protocol Input or Selection
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Choose from standardized GLP protocol templates or enter custom enzymatic and reaction parameters.
                </p>
              </div>

              <div className="bg-slate-800/80 p-6 rounded-2xl border border-purple-800/40 space-y-3">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h4 className="font-bold text-base text-white">
                  Automated Kinetic Audit
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Calculates annealing Tm deltas, stock dilution factors, pause points, and biosafety warnings.
                </p>
              </div>

              <div className="bg-slate-800/80 p-6 rounded-2xl border border-purple-800/40 space-y-3">
                <div className="w-8 h-8 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h4 className="font-bold text-base text-white">
                  Bench Execution & Logs
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Export clear, printable bench-top execution steps with timer anchors and reagent volume guides.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Designed for the Entire Life Sciences Community
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Tailored capabilities for every stage of academic and professional biotechnology research.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-purple-100 dark:border-slate-800 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-violet-600 dark:text-violet-400 flex items-center justify-center border border-purple-200/50 dark:border-purple-800">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Biotech Students
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Master wet-lab calculations, understand reaction kinetics, and learn step-by-step troubleshooting for molecular biology courses and undergraduate research.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-purple-100 dark:border-slate-800 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-200/50 dark:border-indigo-800">
              <Atom className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Lab Researchers & Postdocs
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Standardize protocols across research groups, scale reaction master mixes with error buffers, and rapidly isolate experimental anomalies.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-purple-100 dark:border-slate-800 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 flex items-center justify-center border border-violet-200/50 dark:border-violet-800">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Educators & Lab Managers
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Provide student lab sections with verified GLP SOPs, reduce reagent waste, and ensure compliance with institutional safety standards.
            </p>
          </div>

        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-purple-500/15">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold">
              Ready to Optimize Your Next Wet-Lab Experiment?
            </h3>
            <p className="text-purple-100 text-xs sm:text-sm max-w-xl">
              Access protocol reviews, test reaction stoichiometry, and resolve lab troubleshooting hurdles in seconds.
            </p>
          </div>
          <button
            id="bottom-cta-btn"
            onClick={() => onNavigate('protocol-review')}
            className="px-6 py-3.5 rounded-xl bg-white text-purple-900 hover:bg-purple-50 font-bold text-sm shadow-lg transition-all shrink-0 cursor-pointer"
          >
            Launch Protocol Review
          </button>
        </div>
      </section>

    </div>
  );
};

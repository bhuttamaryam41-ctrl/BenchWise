import React from 'react';
import { Dna, ShieldAlert, Award, BookOpen, ExternalLink } from 'lucide-react';
import { Page } from '../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-purple-900/30 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Column 1: Brand & Bio */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 via-indigo-600 to-purple-500 text-white flex items-center justify-center shadow-xs">
                <Dna className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white">
                Bench<span className="text-violet-400">Wise</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Standardized laboratory protocol review and stoichiometric optimization platform built for biotechnology research, academic wet labs, and educational rigor.
            </p>
            <div className="flex items-center gap-2 text-xs text-purple-300 font-medium">
              <Award className="w-4 h-4 text-purple-400" />
              <span>GLP & ISO 17025 Compliant Standard Logic</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-100 mb-3">
              Platform Modules
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  id="footer-link-review"
                  onClick={() => onNavigate('protocol-review')}
                  className="hover:text-purple-300 transition-colors"
                >
                  Protocol Review & Audits
                </button>
              </li>
              <li>
                <button
                  id="footer-link-troubleshooter"
                  onClick={() => onNavigate('troubleshooter')}
                  className="hover:text-purple-300 transition-colors"
                >
                  Diagnostic Troubleshooter
                </button>
              </li>
              <li>
                <button
                  id="footer-link-mastermix"
                  onClick={() => onNavigate('master-mix')}
                  className="hover:text-purple-300 transition-colors"
                >
                  Master Mix Dosing Calculator
                </button>
              </li>
              <li>
                <button
                  id="footer-link-about"
                  onClick={() => onNavigate('about')}
                  className="hover:text-purple-300 transition-colors"
                >
                  About & Educational Mission
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Scientific Resources */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-100 mb-3">
              Lab Standards & Reference
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-violet-400" />
                <span>Molecular Biology Protocols (MBP)</span>
              </li>
              <li className="flex items-center gap-1">
                <span>Biosafety Levels (BSL-1 / BSL-2)</span>
              </li>
              <li className="flex items-center gap-1">
                <span>Nearest-Neighbor Thermodynamics</span>
              </li>
              <li className="flex items-center gap-1">
                <span>Stoichiometry & Reagent Stocking</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Biosafety & Educational Disclaimer */}
          <div className="bg-slate-950/70 p-4 rounded-2xl border border-purple-900/40 space-y-2">
            <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>Educational & Research Disclaimer</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              BenchWise provides protocol analysis and calculations for academic, educational, and pre-experimental research planning. Users must consult institutional safety committees (IBC), manufacturer SDS documents, and laboratory SOPs prior to performing physical bench work.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 BenchWise Science Tools. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Academic Use</span>
            <span className="hover:text-slate-400 cursor-pointer">Biosafety Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

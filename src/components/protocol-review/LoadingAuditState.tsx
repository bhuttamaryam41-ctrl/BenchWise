import React, { useEffect, useState } from 'react';
import { Loader2, FlaskConical, Thermometer, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';

export const LoadingAuditState: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: 'Parsing protocol syntax and step structure...', icon: FlaskConical },
    { title: 'Auditing thermal cycler & incubation parameters...', icon: Thermometer },
    { title: 'Checking reagent stoichiometry & stock dilutions...', icon: FlaskConical },
    { title: 'Verifying biosafety level and chemical hazard rules...', icon: ShieldCheck },
    { title: 'Generating GLP recommendations & quality score...', icon: Sparkles }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-[#E8E8EE] dark:border-slate-800 p-10 text-center space-y-8 shadow-xs min-h-[450px] flex flex-col justify-center items-center">
      
      {/* Animated Spinner Icon */}
      <div className="relative">
        <div className="w-20 h-20 rounded-3xl bg-[#E8E8FF] dark:bg-purple-950/80 text-[#6C63FF] flex items-center justify-center mx-auto shadow-md">
          <Loader2 className="w-10 h-10 animate-spin text-[#6C63FF]" />
        </div>
        <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#6C63FF] text-white">
          AUDITING
        </span>
      </div>

      <div className="space-y-2 max-w-md">
        <h3 className="text-xl font-extrabold text-[#1A1A1D] dark:text-white tracking-tight">
          BenchWise Protocol Audit In Progress
        </h3>
        <p className="text-xs text-[#626268] dark:text-slate-400">
          Our scientific audit engine is verifying steps, safety guidelines, and stoichiometric parameters.
        </p>
      </div>

      {/* Progress Stepper List */}
      <div className="w-full max-w-md bg-[#FAF9FF] dark:bg-slate-950/60 p-5 rounded-2xl border border-[#E8E8EE] dark:border-slate-800 text-left space-y-3">
        {steps.map((step, idx) => {
          const IconComponent = step.icon;
          const isDone = idx < currentStep;
          const isCurrent = idx === currentStep;

          return (
            <div 
              key={idx}
              className={`flex items-center gap-3 text-xs transition-all ${
                isDone 
                  ? 'text-emerald-700 dark:text-emerald-400 font-medium' 
                  : isCurrent 
                  ? 'text-[#6C63FF] dark:text-violet-300 font-bold' 
                  : 'text-slate-400 dark:text-slate-600 opacity-60'
              }`}
            >
              <div className="shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 animate-spin text-[#6C63FF]" />
                ) : (
                  <IconComponent className="w-4 h-4 text-slate-300 dark:text-slate-700" />
                )}
              </div>
              <span className="line-clamp-1">{step.title}</span>
            </div>
          );
        })}
      </div>

    </div>
  );
};

import React, { useState } from 'react';
import { WORKED_EXAMPLES } from '../data/curriculumData';
import { MathView } from './MathView';
import { Lightbulb, ChevronRight, RotateCcw, Check, Sparkles } from 'lucide-react';

interface WorkedExamplesSectionProps {
  isProjectorMode?: boolean;
}

export const WorkedExamplesSection: React.FC<WorkedExamplesSectionProps> = ({ isProjectorMode = false }) => {
  // Revealed steps per example id
  const [revealedSteps, setRevealedSteps] = useState<Record<string, number>>({
    'ex-1': 1, // Start with first step visible (the LHS statement)
    'ex-2': 1
  });

  const [activeExampleIndex, setActiveExampleIndex] = useState(0);

  const currentExample = WORKED_EXAMPLES[activeExampleIndex];
  const currentRevealed = revealedSteps[currentExample.id] ?? 1;
  const totalSteps = currentExample.steps.length;
  const isFinished = currentRevealed >= totalSteps;

  const handleNextStep = (id: string, max: number) => {
    setRevealedSteps(prev => ({
      ...prev,
      [id]: Math.min((prev[id] ?? 1) + 1, max)
    }));
  };

  const handleReset = (id: string) => {
    setRevealedSteps(prev => ({
      ...prev,
      [id]: 1
    }));
  };

  const handleRevealAll = (id: string, max: number) => {
    setRevealedSteps(prev => ({
      ...prev,
      [id]: max
    }));
  };

  return (
    <div className={`space-y-6 ${isProjectorMode ? 'text-lg' : ''}`}>
      {/* Recurring Prompt Banner */}
      <div className="bg-teal-900 text-white rounded-xl p-5 border border-teal-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-teal-800/80 border border-teal-700/60 flex items-center justify-center shrink-0 text-teal-300 font-bold">
            💡
          </div>
          <div>
            <span className="text-[11px] font-bold tracking-wider uppercase text-teal-300 block">
              The Golden Guiding Question
            </span>
            <p className="text-sm sm:text-base font-semibold text-white tracking-wide">
              "What is the one thing that makes the two sides look different? Remove that thing."
            </p>
          </div>
        </div>
        <div className="text-xs text-teal-200/80 font-medium sm:text-right shrink-0">
          Targeted Problem Solving
        </div>
      </div>

      {/* Example Selector Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        {WORKED_EXAMPLES.map((ex, idx) => (
          <button
            key={ex.id}
            onClick={() => setActiveExampleIndex(idx)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
              activeExampleIndex === idx
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>{ex.title}</span>
            <span className="text-[11px] opacity-75">
              ({revealedSteps[ex.id] ?? 1}/{ex.steps.length} steps)
            </span>
          </button>
        ))}
      </div>

      {/* Main Example Display */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        {/* Card Header & Math Statement */}
        <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 uppercase tracking-wider mb-1">
                <span>Worked Demonstration</span>
                <span>·</span>
                <span>{currentExample.title}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                Prove that{' '}
                <span className="text-slate-900 inline-block px-2 py-0.5 bg-white border border-slate-200 rounded-md shadow-2xs">
                  <MathView math={currentExample.statement} block={false} />
                </span>
              </h3>
            </div>

            {/* Stepper Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleReset(currentExample.id)}
                className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 flex items-center gap-1 transition-colors"
                title="Reset to line 1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>

              <button
                onClick={() => handleRevealAll(currentExample.id, totalSteps)}
                className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
              >
                Reveal All
              </button>

              <button
                onClick={() => handleNextStep(currentExample.id, totalSteps)}
                disabled={isFinished}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all ${
                  isFinished
                    ? 'bg-emerald-600 text-white cursor-default'
                    : 'bg-teal-700 hover:bg-teal-800 text-white shadow-xs'
                }`}
              >
                {isFinished ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Proof Complete!</span>
                  </>
                ) : (
                  <>
                    <span>Next step</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* "Think First" Box */}
          <div className="mt-5 p-4 bg-amber-50 border border-amber-200/80 rounded-xl flex items-start gap-3">
            <div className="w-7 h-7 rounded-md bg-amber-200 text-amber-800 flex items-center justify-center shrink-0 text-sm font-bold mt-0.5">
              🤔
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block mb-0.5">
                Think First (Teacher & Student Inner Monologue)
              </span>
              <p className="text-sm font-medium text-amber-950 italic leading-relaxed">
                "{currentExample.thinkFirst}"
              </p>
            </div>
          </div>
        </div>

        {/* Step-by-Step Proof Rows */}
        <div className="p-5 sm:p-6 space-y-4">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center justify-between border-b border-slate-100 pb-2">
            <span>Proof Working Lines</span>
            <span>Reason & Justification</span>
          </div>

          <div className="space-y-3">
            {currentExample.steps.slice(0, currentRevealed).map((step, idx) => {
              const isLastLine = idx === currentExample.steps.length - 1;

              return (
                <div
                  key={idx}
                  className={`p-3 sm:p-4 rounded-xl border transition-all animate-fadeIn flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                    isLastLine && isFinished
                      ? 'bg-emerald-50/60 border-emerald-300'
                      : idx === currentRevealed - 1
                      ? 'bg-teal-50/40 border-teal-300'
                      : 'bg-slate-50/50 border-slate-200'
                  }`}
                >
                  {/* Math side */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-slate-600 w-6 shrink-0">
                      L{idx + 1}
                    </span>
                    <div className="text-base sm:text-lg font-medium text-slate-900 overflow-x-auto py-1">
                      <MathView math={step.math} block={false} />
                    </div>
                  </div>

                  {/* Reason tag */}
                  <div className="md:text-right shrink-0">
                    <span
                      className={`inline-block px-2.5 py-1 rounded text-xs font-semibold ${
                        isLastLine && isFinished
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {step.reason}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom stepper helper button if not finished */}
          {!isFinished && (
            <div className="pt-3 flex justify-center">
              <button
                onClick={() => handleNextStep(currentExample.id, totalSteps)}
                className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
              >
                <span>Reveal Next Step ({currentRevealed + 1} of {totalSteps})</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {isFinished && (
            <div className="pt-2 text-center text-xs font-semibold text-emerald-700 flex items-center justify-center gap-1.5">
              <Check className="w-4 h-4" />
              <span>Full identity demonstrated cleanly with zero cross-multiplication.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

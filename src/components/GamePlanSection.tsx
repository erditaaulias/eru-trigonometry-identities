import React, { useState } from 'react';
import { MathView } from './MathView';
import { AlertTriangle, CheckCircle, ShieldAlert, ArrowRight, Lightbulb } from 'lucide-react';

interface GamePlanSectionProps {
  isProjectorMode?: boolean;
}

export const GamePlanSection: React.FC<GamePlanSectionProps> = ({ isProjectorMode = false }) => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      num: 1,
      title: 'Choose the more complicated side',
      summary: 'Start from where you have more algebraic raw material to manipulate.',
      details:
        'It is almost always easier to simplify and compress a complex expression than to invent terms out of thin air. If one side has fractions, compound angles, or multiple functions, start on that side (usually LHS, but sometimes RHS). Write down "LHS =" and do not touch the RHS yet!',
      exampleMath: '\\text{Start with: } \\text{LHS} = \\dots',
      actionPrompt: 'Ask yourself: Which side gives me something concrete to do immediately?'
    },
    {
      num: 2,
      title: 'Name the enemies',
      summary: 'Circle anything unusual (tan, sec, cot, cosec, 2θ, A+B) and ask "can I convert to sin and cos?".',
      details:
        'Identify all reciprocal functions (sec, cosec, cot), tangent, compound arguments (A ± B), or multiple angles (2θ, 3θ). Converting unfamiliar terms into basic sine and cosine often unifies the entire expression into a single algebraic language.',
      exampleMath: '\\tan\\theta \\to \\frac{\\sin\\theta}{\\cos\\theta}, \\quad \\sec\\theta \\to \\frac{1}{\\cos\\theta}, \\quad \\operatorname{cosec}\\theta \\to \\frac{1}{\\sin\\theta}',
      actionPrompt: 'Ask yourself: Can I convert this back to standard sin and cos?'
    },
    {
      num: 3,
      title: 'Find a bridge',
      summary: 'Squared term → Pythagorean, 2θ → double angle, A+B → addition formula.',
      details:
        'Connect the structures on your working side with the target on the other side. A squared term calls for a Pythagorean identity (sin²θ + cos²θ ≡ 1). A double angle (2θ) must be bridged using sin2θ or cos2θ identities. A compound angle (A+B) bridges via the addition formulae.',
      exampleMath: '\\sin^2\\theta + \\cos^2\\theta \\equiv 1, \\quad \\cos 2\\theta \\equiv 1 - 2\\sin^2\\theta',
      actionPrompt: 'Look for: Squared terms, double angles (2θ), or compound brackets (A±B).'
    },
    {
      num: 4,
      title: 'Tidy up',
      summary: 'Common denominator, factorise, expand, cancel, one move per line.',
      details:
        'Apply algebraic hygiene. If you have two fractions, find a common denominator. If terms repeat, factorise them out. Expand brackets systematically and cancel identical factors between numerator and denominator. Perform only ONE logical move per line with clear working.',
      exampleMath: '\\frac{a}{b} + \\frac{c}{d} = \\frac{ad + bc}{bd}, \\quad \\frac{2\\sin\\theta\\cos\\theta}{2\\cos^2\\theta} = \\frac{\\sin\\theta}{\\cos\\theta}',
      actionPrompt: 'Discipline: Never rush two steps into one line. Keep working clear for Cambridge examiners!'
    },
    {
      num: 5,
      title: 'Finish',
      summary: 'Write "= RHS ∎"',
      details:
        'Conclude the proof cleanly. When your working matches the exact target expression on the right-hand side, write "= RHS" followed by the Q.E.D. halmos tombstone symbol (∎). Never leave your proof hanging without stating that the target was achieved.',
      exampleMath: '= \\sec\\theta \\operatorname{cosec}\\theta = \\text{RHS } \\blacksquare',
      actionPrompt: 'Celebrate: The chain of equalities from LHS directly to RHS is complete!'
    }
  ];

  return (
    <div className={`space-y-8 ${isProjectorMode ? 'text-lg' : ''}`}>
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 tracking-wider uppercase mb-1">
          <span>Section 2</span>
          <span>·</span>
          <span>Strategic Framework</span>
        </div>
        <h2 className={`font-bold text-slate-900 ${isProjectorMode ? 'text-3xl' : 'text-2xl'}`}>
          The 5-Step Game Plan
        </h2>
        <p className="text-slate-600 text-sm mt-1 max-w-3xl">
          Proving identities is not guessing — it is a structured algorithm. Follow these five consecutive steps to unravel any Cambridge A Level identity proof methodically.
        </p>
      </div>

      {/* The 5 Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {steps.map((step) => {
          const isSelected = activeStep === step.num;

          return (
            <div
              key={step.num}
              onClick={() => setActiveStep(isSelected ? null : step.num)}
              className={`bg-white border rounded-xl p-5 transition-all cursor-pointer relative flex flex-col justify-between ${
                isSelected
                  ? 'border-teal-500 shadow-sm ring-1 ring-teal-500/20'
                  : 'border-slate-200 hover:border-slate-300 hover:shadow-xs'
              } ${step.num === 5 ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-bold flex items-center justify-center text-sm">
                    {step.num}
                  </div>
                  <span className="text-xs font-semibold text-slate-600 uppercase">
                    Step 0{step.num}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base mb-2">
                  {step.title}
                </h3>

                <p className="text-sm font-medium text-teal-700 mb-3 leading-snug">
                  {step.summary}
                </p>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {step.details}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <div className="bg-slate-50 rounded-lg p-2 text-center text-xs text-slate-800 font-mono overflow-x-auto">
                  <MathView math={step.exampleMath} block={false} />
                </div>
                <div className="mt-2 text-[11px] text-slate-500 italic">
                  💡 {step.actionPrompt}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Golden Rules Warning Box */}
      <div className="bg-amber-50/70 border border-amber-300/80 rounded-xl p-6 relative overflow-hidden">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="space-y-3">
            <div>
              <span className="text-xs font-bold text-amber-800 tracking-wider uppercase block">
                Crucial Cambridge Exam Warning
              </span>
              <h3 className="text-lg font-bold text-amber-950">
                The Golden Rules: An Identity is NOT an Equation!
              </h3>
            </div>

            <p className="text-sm text-amber-900 leading-relaxed">
              In Pure Mathematics 3, students frequently lose all method marks by treating an identity like an algebraic equation to be solved. An identity <MathView math="\text{LHS} \equiv \text{RHS}" /> asserts that the two expressions are mathematically identical for all allowable values of the variable.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              <div className="bg-white/90 border border-amber-200/90 rounded-lg p-3 text-xs">
                <span className="font-bold text-red-600 block mb-1">❌ NEVER Move Terms</span>
                <span className="text-slate-700">Never subtract or add terms across the <code className="font-bold text-slate-900">≡</code> symbol. You cannot move terms to the other side.</span>
              </div>
              <div className="bg-white/90 border border-amber-200/90 rounded-lg p-3 text-xs">
                <span className="font-bold text-red-600 block mb-1">❌ NEVER Multiply Both Sides</span>
                <span className="text-slate-700">Never multiply both sides by a common denominator or cross-multiply. Doing so assumes what you are trying to prove!</span>
              </div>
              <div className="bg-white/90 border border-amber-200/90 rounded-lg p-3 text-xs">
                <span className="font-bold text-emerald-800 block mb-1">✅ Work on ONE Side Only</span>
                <span className="text-slate-700">Pick either LHS or RHS, keep it completely isolated, and rewrite it step-by-step until it directly matches the other side.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

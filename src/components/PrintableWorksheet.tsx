import React from 'react';
import { PRACTICE_QUESTIONS, TOOLKIT_FORMULAS } from '../data/curriculumData';
import { MathView } from './MathView';

export const PrintableWorksheet: React.FC = () => {
  return (
    <div className="hidden print:block text-black bg-white p-6 max-w-4xl mx-auto font-sans leading-relaxed">
      {/* Cambridge Exam Header */}
      <div className="border-b-2 border-black pb-4 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-bold tracking-tight uppercase">
              Cambridge International A Level Mathematics
            </h1>
            <h2 className="text-sm font-semibold text-gray-800">
              Pure Mathematics 3 (Paper 3) · Section 3.4 Further Trigonometric Identities
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              Classroom & Independent Practice Worksheet · Proving Identities: LHS ≡ RHS
            </p>
          </div>
          <div className="text-right text-xs">
            <span className="font-bold border border-black px-2 py-1 inline-block">
              Total Stars: 22 ★
            </span>
          </div>
        </div>

        {/* Candidate Info Grid */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-3 border-t border-gray-300 text-xs">
          <div>
            <span className="font-bold">Candidate Name: </span>
            <span className="border-b border-black inline-block w-36">&nbsp;</span>
          </div>
          <div>
            <span className="font-bold">Date: </span>
            <span className="border-b border-black inline-block w-28">&nbsp;</span>
          </div>
          <div>
            <span className="font-bold">Score / Stars: </span>
            <span className="border-b border-black inline-block w-20">&nbsp; / 22 ★</span>
          </div>
        </div>
      </div>

      {/* Instructions & Golden Rules */}
      <div className="border border-gray-400 p-3 mb-6 text-xs bg-gray-50 rounded">
        <span className="font-bold block mb-1">EXAMINATION INSTRUCTIONS & GOLDEN RULES:</span>
        <ul className="list-disc list-inside space-y-0.5 text-gray-800">
          <li>Prove that the Left Hand Side is identically equal to the Right Hand Side for each question.</li>
          <li><strong>An identity is NOT an equation:</strong> Do NOT move terms across the ≡ symbol, do NOT multiply both sides, and do NOT cross-multiply.</li>
          <li>Work strictly on one side only. Finish every completed proof with <code className="font-bold">= RHS ∎</code> (or <code className="font-bold">= LHS ∎</code>).</li>
          <li>Show all intermediate algebraic steps clearly. Full marks require explicit justification.</li>
        </ul>
      </div>

      {/* Quick Formula Toolkit Reference Box */}
      <div className="border border-gray-300 p-3 mb-6 text-xs bg-white rounded">
        <span className="font-bold block text-gray-900 mb-1">FORMULAE AND KEY IDENTITIES REFERENCE (MF19):</span>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
          <div>• <MathView math="\sin^2\theta + \cos^2\theta \equiv 1" /></div>
          <div>• <MathView math="1 + \tan^2\theta \equiv \sec^2\theta" /></div>
          <div>• <MathView math="1 + \cot^2\theta \equiv \operatorname{cosec}^2\theta" /></div>
          <div>• <MathView math="\sin 2A \equiv 2\sin A \cos A" /></div>
          <div>• <MathView math="\cos 2A \equiv \cos^2 A - \sin^2 A \equiv 2\cos^2 A - 1 \equiv 1 - 2\sin^2 A" /></div>
          <div>• <MathView math="\tan 2A \equiv \frac{2\tan A}{1 - \tan^2 A}" /></div>
          <div>• <MathView math="\sin(A \pm B) \equiv \sin A \cos B \pm \cos A \sin B" /></div>
          <div>• <MathView math="\cos(A \pm B) \equiv \cos A \cos B \mp \sin A \sin B" /></div>
        </div>
      </div>

      {/* Questions with writing areas */}
      <div className="space-y-6">
        {PRACTICE_QUESTIONS.map((q, idx) => (
          <div key={q.id} className="print-card border border-gray-300 rounded p-4 break-inside-avoid">
            <div className="flex justify-between items-center mb-2 border-b border-gray-200 pb-1 text-xs">
              <span className="font-bold">
                Question {q.code} ({'★'.repeat(q.stars)})
              </span>
              <span className="text-gray-600">
                Level {q.level} · [{q.stars} {q.stars === 1 ? 'Mark' : 'Marks'}]
              </span>
            </div>

            <div className="my-2 font-bold text-base text-center py-1">
              Prove that: &nbsp; <MathView math={q.statement} block={false} />
            </div>

            {q.hint && (
              <div className="text-[10px] text-gray-500 italic mb-2">
                Guidance: {q.hint}
              </div>
            )}

            {/* Blank handwriting box */}
            <div className="print-write-box border border-dashed border-gray-400 rounded min-h-[140px] p-2 text-xs text-gray-400">
              <span>Candidate Working:</span>
            </div>
          </div>
        ))}
      </div>

      {/* End of paper reflection */}
      <div className="mt-8 pt-4 border-t border-gray-300 break-inside-avoid text-xs">
        <h3 className="font-bold text-sm mb-2">Exit Reflection:</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-gray-300 p-2 min-h-[70px]">
            <span className="font-semibold block mb-1">Which step helped you the most today?</span>
          </div>
          <div className="border border-gray-300 p-2 min-h-[70px]">
            <span className="font-semibold block mb-1">The hardest thing for me was...</span>
          </div>
        </div>
      </div>

      {/* Cambridge Footer */}
      <div className="mt-8 text-center text-[10px] text-gray-500 border-t border-gray-200 pt-2">
        Cambridge A Level Mathematics · Pure Mathematics 3 · 3.4 Further Trigonometric Identities · End of Worksheet
      </div>
    </div>
  );
};

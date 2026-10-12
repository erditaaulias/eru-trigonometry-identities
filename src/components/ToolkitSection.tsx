import React, { useState } from 'react';
import { TOOLKIT_FORMULAS } from '../data/curriculumData';
import { MathView } from './MathView';
import { Eye, EyeOff, RotateCcw, Sparkles, BookOpen, Layers } from 'lucide-react';

interface ToolkitSectionProps {
  isProjectorMode?: boolean;
}

export const ToolkitSection: React.FC<ToolkitSectionProps> = ({ isProjectorMode = false }) => {
  const [isFlashcardMode, setIsFlashcardMode] = useState(false);
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Pythagorean', 'Quotient/Reciprocal', 'Addition', 'Double Angle'];

  const toggleReveal = (id: string) => {
    setRevealedIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const revealAll = () => {
    const allRevealed: Record<string, boolean> = {};
    TOOLKIT_FORMULAS.forEach(f => {
      allRevealed[f.id] = true;
    });
    setRevealedIds(allRevealed);
  };

  const hideAll = () => {
    setRevealedIds({});
  };

  const filteredFormulas = selectedCategory === 'All'
    ? TOOLKIT_FORMULAS
    : TOOLKIT_FORMULAS.filter(f => f.category === selectedCategory);

  const totalCards = filteredFormulas.length;
  const revealedCount = filteredFormulas.filter(f => revealedIds[f.id]).length;

  return (
    <div className={`space-y-6 ${isProjectorMode ? 'text-lg' : ''}`}>
      {/* Header and Controls */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 tracking-wider uppercase mb-1">
              <span>Section 1</span>
              <span>·</span>
              <span>Formula Reference</span>
            </div>
            <h2 className={`font-bold text-slate-900 ${isProjectorMode ? 'text-3xl' : 'text-2xl'}`}>
              Identity Toolkit
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-2xl">
              The foundational building blocks required for Cambridge Pure Mathematics 3.4. Notice every identity uses the <code className="bg-slate-100 px-1 py-0.5 rounded text-teal-700 font-bold">≡</code> symbol because it holds for all valid angles.
            </p>
          </div>

          {/* Flashcard Toggle */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => {
                setIsFlashcardMode(!isFlashcardMode);
                if (!isFlashcardMode) hideAll();
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                isFlashcardMode
                  ? 'bg-teal-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{isFlashcardMode ? 'Flashcard Mode Active' : 'Start Flashcard Recall'}</span>
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {isFlashcardMode && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium">
                Revealed: <span className="font-bold text-teal-700">{revealedCount}/{totalCards}</span>
              </span>
              <button
                onClick={revealAll}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-medium flex items-center gap-1"
              >
                <Eye className="w-3 h-3" /> Reveal All
              </button>
              <button
                onClick={hideAll}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-medium flex items-center gap-1"
              >
                <EyeOff className="w-3 h-3" /> Hide All
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Formulas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFormulas.map((formula) => {
          const isRevealed = revealedIds[formula.id];

          return (
            <div
              key={formula.id}
              className={`bg-white border rounded-xl p-4 sm:p-5 transition-all flex flex-col justify-between ${
                isFlashcardMode
                  ? 'border-teal-200 hover:border-teal-400 hover:shadow-xs cursor-pointer'
                  : 'border-slate-200'
              }`}
              onClick={() => {
                if (isFlashcardMode) toggleReveal(formula.id);
              }}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-semibold text-teal-700 uppercase tracking-wide">
                    {formula.category}
                  </span>
                  <span className="text-xs text-slate-400 font-medium truncate max-w-[150px]">
                    {formula.name}
                  </span>
                </div>

                {/* Formula Statement */}
                <div className="my-3 py-2 px-3 bg-slate-50/70 rounded-lg border border-slate-100">
                  {isFlashcardMode ? (
                    <div className="space-y-3">
                      <div className="text-center font-medium text-slate-800">
                        <MathView math={`${formula.lhs} \\equiv`} block={false} />
                        <span className="text-slate-400 ml-2 font-serif text-lg">?</span>
                      </div>

                      <div className="pt-2 border-t border-slate-200/60 min-h-[48px] flex items-center justify-center">
                        {isRevealed ? (
                          <div className="text-teal-900 font-semibold animate-fadeIn">
                            <MathView math={formula.rhs} block={false} />
                          </div>
                        ) : (
                          <span className="text-xs text-teal-700 font-medium bg-teal-50 px-2.5 py-1 rounded border border-teal-200">
                            Tap card to reveal RHS
                          </span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-slate-900 font-semibold py-1">
                      <MathView math={`${formula.lhs} \\equiv ${formula.rhs}`} block={false} />
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Identities hold for all valid θ</span>
                {isFlashcardMode && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleReveal(formula.id);
                    }}
                    className="text-teal-700 font-medium hover:underline flex items-center gap-1"
                  >
                    {isRevealed ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    <span>{isRevealed ? 'Hide' : 'Reveal'}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Summary Reference Card */}
      <div className="bg-slate-900 text-slate-100 rounded-xl p-5 sm:p-6 border border-slate-800">
        <h3 className="font-semibold text-white text-base flex items-center gap-2 mb-3">
          <BookOpen className="w-4 h-4 text-teal-400" />
          <span>Cambridge Pure 3.4 Key Takeaway</span>
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          The Cambridge Pure 3 syllabus focuses on choosing the most efficient identity. For cosine double-angle, 
          remember that <MathView math="\cos 2A" /> has three identical faces: 
          <span className="font-mono text-teal-300 mx-1">
            <MathView math="\cos^2 A - \sin^2 A \equiv 2\cos^2 A - 1 \equiv 1 - 2\sin^2 A" />
          </span>. 
          Selecting the form that eliminates the constant term <code className="text-teal-300">1</code> is often the fastest path to proof!
        </p>
      </div>
    </div>
  );
};

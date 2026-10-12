import React, { useState, useEffect } from 'react';
import { PRACTICE_QUESTIONS, HINT_LADDER_STEPS } from '../data/curriculumData';
import { PracticeQuestion } from '../types';
import { MathView } from './MathView';
import { 
  CheckCircle2, 
  Circle, 
  Star, 
  HelpCircle, 
  ChevronRight, 
  RotateCcw, 
  Eye, 
  EyeOff, 
  Sparkles, 
  BookOpen, 
  MessageSquareQuote,
  Layers
} from 'lucide-react';

interface PracticeSectionProps {
  isProjectorMode?: boolean;
  onStarsChange?: (earned: number, total: number) => void;
}

export const PracticeSection: React.FC<PracticeSectionProps> = ({ 
  isProjectorMode = false,
  onStarsChange 
}) => {
  // Completion tracking
  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('trig_practice_completed');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Student working text notes
  const [workingMap, setWorkingMap] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('trig_practice_working');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Step reveal count per question
  const [revealedStepsMap, setRevealedStepsMap] = useState<Record<string, number>>({});

  // Hint ladder modal/card state per question
  const [hintVisibleMap, setHintVisibleMap] = useState<Record<string, boolean>>({});

  // Filter level
  const [activeLevel, setActiveLevel] = useState<'ALL' | 'A' | 'B' | 'C'>('ALL');

  // Reflection responses
  const [reflectionHelpful, setReflectionHelpful] = useState<string>(() => {
    try {
      return localStorage.getItem('trig_reflection_helpful') || '';
    } catch {
      return '';
    }
  });

  const [reflectionHardest, setReflectionHardest] = useState<string>(() => {
    try {
      return localStorage.getItem('trig_reflection_hardest') || '';
    } catch {
      return '';
    }
  });

  // Save to localStorage whenever completion changes
  useEffect(() => {
    try {
      localStorage.setItem('trig_practice_completed', JSON.stringify(completedMap));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [completedMap]);

  useEffect(() => {
    try {
      localStorage.setItem('trig_practice_working', JSON.stringify(workingMap));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [workingMap]);

  useEffect(() => {
    try {
      localStorage.setItem('trig_reflection_helpful', reflectionHelpful);
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [reflectionHelpful]);

  useEffect(() => {
    try {
      localStorage.setItem('trig_reflection_hardest', reflectionHardest);
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [reflectionHardest]);

  // Compute stats
  const totalQuestions = PRACTICE_QUESTIONS.length;
  const totalPossibleStars = PRACTICE_QUESTIONS.reduce((acc, q) => acc + q.stars, 0);

  const completedQuestionsCount = PRACTICE_QUESTIONS.filter(q => completedMap[q.id]).length;
  const earnedStars = PRACTICE_QUESTIONS.reduce((acc, q) => {
    return acc + (completedMap[q.id] ? q.stars : 0);
  }, 0);

  useEffect(() => {
    if (onStarsChange) {
      onStarsChange(earnedStars, totalPossibleStars);
    }
  }, [earnedStars, totalPossibleStars, onStarsChange]);

  const toggleDone = (id: string) => {
    setCompletedMap(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleWorkingChange = (id: string, text: string) => {
    setWorkingMap(prev => ({
      ...prev,
      [id]: text
    }));
  };

  const advanceProofLine = (q: PracticeQuestion) => {
    const current = revealedStepsMap[q.id] ?? 0;
    const max = q.proofLines.length;
    setRevealedStepsMap(prev => ({
      ...prev,
      [q.id]: Math.min(current + 1, max)
    }));
  };

  const resetProof = (q: PracticeQuestion) => {
    setRevealedStepsMap(prev => ({
      ...prev,
      [q.id]: 0
    }));
  };

  const revealAllLines = (q: PracticeQuestion) => {
    setRevealedStepsMap(prev => ({
      ...prev,
      [q.id]: q.proofLines.length
    }));
  };

  const toggleHint = (id: string) => {
    setHintVisibleMap(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredQuestions = activeLevel === 'ALL'
    ? PRACTICE_QUESTIONS
    : PRACTICE_QUESTIONS.filter(q => q.level === activeLevel);

  return (
    <div className={`space-y-6 ${isProjectorMode ? 'text-lg' : ''}`}>
      {/* Progress & Stats Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 tracking-wider uppercase mb-1">
              <span>Section 5</span>
              <span>·</span>
              <span>Graded Problem Set</span>
            </div>
            <h2 className={`font-bold text-slate-900 ${isProjectorMode ? 'text-3xl' : 'text-2xl'}`}>
              Graded Identity Practice
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-2xl">
              11 carefully structured Cambridge Pure 3 exam questions. Level A builds foundational confidence (1★), Level B introduces fraction and double-angle manipulation (2★), and Level C tests multi-step decomposition (3★).
            </p>
          </div>

          {/* Star & Completion Tally */}
          <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-xl p-3.5 self-start md:self-auto">
            <div className="text-center px-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Completed</span>
              <span className="text-lg font-bold text-slate-900 tabular-nums">
                {completedQuestionsCount} / {totalQuestions}
              </span>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div className="text-center px-2">
              <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block flex items-center justify-center gap-0.5">
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                <span>Stars</span>
              </span>
              <span className="text-lg font-bold text-amber-600 tabular-nums">
                {earnedStars} / {totalPossibleStars}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1.5">
            <span>Overall Progress</span>
            <span className="font-mono tabular-nums">{Math.round((earnedStars / totalPossibleStars) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-teal-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${(earnedStars / totalPossibleStars) * 100}%` }}
            />
          </div>
        </div>

        {/* Level Filters */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-500 mr-1">Filter by Tier:</span>
          {(['ALL', 'A', 'B', 'C'] as const).map(lvl => {
            const count = lvl === 'ALL'
              ? PRACTICE_QUESTIONS.length
              : PRACTICE_QUESTIONS.filter(q => q.level === lvl).length;
            
            return (
              <button
                key={lvl}
                onClick={() => setActiveLevel(lvl)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  activeLevel === lvl
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{lvl === 'ALL' ? 'All Questions' : `Level ${lvl}`}</span>
                <span className="text-[10px] opacity-75">
                  ({count})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-5">
        {filteredQuestions.map((q) => {
          const isDone = Boolean(completedMap[q.id]);
          const workingText = workingMap[q.id] || '';
          const revealedCount = revealedStepsMap[q.id] ?? 0;
          const isHintOpen = Boolean(hintVisibleMap[q.id]);
          const isFullyRevealed = revealedCount >= q.proofLines.length;

          return (
            <div
              key={q.id}
              className={`bg-white border rounded-xl p-5 sm:p-6 transition-all shadow-xs ${
                isDone ? 'border-emerald-300 bg-emerald-50/20' : 'border-slate-200'
              }`}
            >
              {/* Question Top Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div
                    className={`px-2.5 py-1 rounded text-xs font-bold font-mono ${
                      q.level === 'A'
                        ? 'bg-emerald-100 text-emerald-800'
                        : q.level === 'B'
                        ? 'bg-teal-100 text-teal-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {q.code}
                  </div>

                  {/* Stars Badge */}
                  <div className="flex items-center text-amber-500">
                    {Array.from({ length: q.stars }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    ))}
                    <span className="text-xs text-slate-500 ml-1.5 font-medium">
                      Level {q.level} ({q.stars} {q.stars === 1 ? 'star' : 'stars'})
                    </span>
                  </div>
                </div>

                {/* Mark as Done Checkbox Button */}
                <button
                  onClick={() => toggleDone(q.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all self-start sm:self-auto ${
                    isDone
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4 text-slate-400" />}
                  <span>{isDone ? 'Marked as Done (Earned)' : 'Mark as Done'}</span>
                </button>
              </div>

              {/* Identity Statement */}
              <div className="my-4 p-4 bg-slate-50 rounded-xl border border-slate-100 text-center font-bold text-lg sm:text-xl text-slate-900">
                <MathView math={q.statement} block={false} />
              </div>

              {/* Student Working Textarea */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                  <label htmlFor={`working-${q.id}`}>Your Working & Rough Notes:</label>
                  <span className="text-[11px] text-slate-400">Auto-saved</span>
                </div>
                <textarea
                  id={`working-${q.id}`}
                  value={workingText}
                  onChange={(e) => handleWorkingChange(q.id, e.target.value)}
                  placeholder="Draft your proof here (e.g. LHS = ... then convert to sin and cos)..."
                  className="w-full h-24 p-3 text-xs font-mono bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                />
              </div>

              {/* Action Buttons: Hint Ladder & Reveal Model Proof */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleHint(q.id)}
                    className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{isHintOpen ? 'Hide Hint' : 'Hint ladder'}</span>
                  </button>

                  <button
                    onClick={() => advanceProofLine(q)}
                    disabled={isFullyRevealed}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      isFullyRevealed
                        ? 'bg-slate-100 text-slate-400 cursor-default'
                        : 'bg-teal-700 hover:bg-teal-800 text-white'
                    }`}
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                    <span>
                      {revealedCount === 0
                        ? 'Reveal model proof (line 1)'
                        : isFullyRevealed
                        ? 'All lines revealed'
                        : `Next line (${revealedCount + 1}/${q.proofLines.length})`}
                    </span>
                  </button>

                  {revealedCount > 0 && !isFullyRevealed && (
                    <button
                      onClick={() => revealAllLines(q)}
                      className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium"
                    >
                      Show all
                    </button>
                  )}

                  {revealedCount > 0 && (
                    <button
                      onClick={() => resetProof(q)}
                      className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs"
                      title="Hide model proof"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="text-[11px] text-slate-400">
                  {revealedCount > 0 && (
                    <span>Proof lines shown: {revealedCount}/{q.proofLines.length}</span>
                  )}
                </div>
              </div>

              {/* Hint Drawer */}
              {isHintOpen && (
                <div className="mt-3 p-3.5 bg-amber-50/80 border border-amber-200 rounded-xl text-xs space-y-2 animate-fadeIn">
                  <div className="flex items-center gap-1.5 font-bold text-amber-900">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Clue for {q.code}:</span>
                  </div>
                  <p className="text-slate-800">{q.hint}</p>
                  <div className="text-[11px] text-amber-800/80 pt-1 border-t border-amber-200/50">
                    💡 Universal Ladder: 1. Complicated side → 2. Name enemies → 3. Find bridge → 4. Common denominator / cancel → 5. "= RHS ∎"
                  </div>
                </div>
              )}

              {/* Line-by-Line Model Proof Display */}
              {revealedCount > 0 && (
                <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 border-b border-slate-200 pb-2">
                    <span>Model Proof (Cambridge Exact)</span>
                    <span className="text-[11px] text-teal-700">Line-by-line reveal</span>
                  </div>

                  <div className="space-y-2">
                    {q.proofLines.slice(0, revealedCount).map((step, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 bg-white border border-slate-200 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-2 text-xs"
                      >
                        <div className="font-mono text-slate-900 text-sm overflow-x-auto">
                          <MathView math={step.math} block={false} />
                        </div>
                        {step.reason && (
                          <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded self-start md:self-auto shrink-0">
                            {step.reason}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  {isFullyRevealed && (
                    <div className="text-center text-xs font-semibold text-emerald-800 pt-1">
                      ∎ Identity verified completely!
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Student Reflection Box */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <MessageSquareQuote className="w-5 h-5 text-teal-700" />
          <h3 className="font-bold text-slate-900 text-lg">
            Personal Mathematical Reflection
          </h3>
        </div>
        <p className="text-xs text-slate-600">
          Metacognition is essential for mastering Cambridge Pure Mathematics 3. Take 2 minutes to summarize your learning today.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Which step helped you the most today?
            </label>
            <textarea
              value={reflectionHelpful}
              onChange={(e) => setReflectionHelpful(e.target.value)}
              placeholder="e.g. Asking what is the one thing that makes the two sides look different, or using cos2θ = 1 - 2sin²θ to cancel 1s..."
              className="w-full h-24 p-3 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              The hardest thing for me was…
            </label>
            <textarea
              value={reflectionHardest}
              onChange={(e) => setReflectionHardest(e.target.value)}
              placeholder="e.g. Recognizing when to factorise difference of squares, or resisting the urge to cross-multiply both sides..."
              className="w-full h-24 p-3 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

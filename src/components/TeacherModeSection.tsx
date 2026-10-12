import React, { useState } from 'react';
import { 
  Clock, 
  GraduationCap, 
  Maximize2, 
  Minimize2, 
  Printer, 
  CheckCircle2, 
  Users, 
  Volume2, 
  FileText,
  AlertCircle
} from 'lucide-react';

interface TeacherModeSectionProps {
  isProjectorMode: boolean;
  onToggleProjector: () => void;
  onPrint: () => void;
}

export const TeacherModeSection: React.FC<TeacherModeSectionProps> = ({
  isProjectorMode,
  onToggleProjector,
  onPrint,
}) => {
  const [completedBlocks, setCompletedBlocks] = useState<Record<number, boolean>>({});

  const toggleBlock = (index: number) => {
    setCompletedBlocks(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const lessonPlan = [
    {
      time: '10 min',
      title: 'Toolkit Recall Quiz',
      icon: <Clock className="w-4 h-4 text-teal-700" />,
      focus: 'Flashcard Memory Consolidation',
      details:
        'Switch the Toolkit to Flashcard Mode. Cold-call students on basic Pythagorean identities, quotient/reciprocal definitions, and specifically the three expressions of cos2A. Emphasize instantaneous recall of the definitions.',
      teacherPrompt: 'Teacher instruction: "Before we prove complex identities, our tools must be automatic. Tap to reveal and verify."'
    },
    {
      time: '15 min',
      title: 'Teacher Thinks Aloud (Examples 1 & 2)',
      icon: <Volume2 className="w-4 h-4 text-teal-700" />,
      focus: 'Cognitive Modeling & The "Think First" Sentence',
      details:
        'Project Worked Examples. Always say the "Think first" sentence ALOUD to model metacognition before writing any algebraic symbols: Example 1: "LHS has two different functions. RHS is a product of reciprocals. Convert to sin and cos." Example 2: "We see 2θ on the LHS and only θ on the RHS, so use double angle. Because the numerator starts with 1 −, choose cos2θ ≡ 1 − 2sin²θ so the 1s cancel." Reveal one step at a time.',
      teacherPrompt: 'Crucial Habit: Never write a line without speaking the strategic reason out loud first.'
    },
    {
      time: '10 min',
      title: 'Guided Example in Pairs with the Hint Ladder',
      icon: <Users className="w-4 h-4 text-teal-700" />,
      focus: 'Collaborative Problem-Solving',
      details:
        'Students partner up to tackle an unrevealed identity. When a pair gets stuck, enforce the Universal Hint Ladder protocol: they are only permitted to inspect one rung at a time before discussing for 60 seconds.',
      teacherPrompt: 'Coaching move: "Do not give the identity away. Ask: What is the one thing making the two sides look different? Remove that thing."'
    },
    {
      time: '20 min',
      title: 'Creative Corner & Practice Differentiation',
      icon: <FileText className="w-4 h-4 text-teal-700" />,
      focus: 'Dual Roads, Examiner Traps, & Graded Drills',
      details:
        'All students complete Creative Corner A (Two Roads: proving both directions) and B (Examiner critique: spotting the skipped denominator proof). Fast finishers attempt Activity C (Build Your Own Trap with the numeric checker). Simultaneously, students work through Practice Level A and Level B questions.',
      teacherPrompt: 'Differentiation note: Level A cements confidence; Level B exercises double angles; Level C provides stretch.'
    },
    {
      time: '5 min',
      title: 'Reflection & Exit Ticket',
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-800" />,
      focus: 'Metacognitive Wrap-Up & Homework Assignment',
      details:
        'Students complete the two reflection questions in the app: "Which step helped you the most today?" and "The hardest thing for me was…". Level C and any uncompleted Practice questions are assigned as homework.',
      teacherPrompt: 'Exit check: Ask 2 students to share their answer to "Which step helped you the most today?"'
    }
  ];

  return (
    <div className={`space-y-6 ${isProjectorMode ? 'text-lg' : ''}`}>
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 tracking-wider uppercase mb-1">
              <span>Section 6</span>
              <span>·</span>
              <span>Instructional Architecture</span>
            </div>
            <h2 className={`font-bold text-slate-900 ${isProjectorMode ? 'text-3xl' : 'text-2xl'}`}>
              Teacher Mode & Lesson Orchestration
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-2xl">
              Turn-key pedagogical roadmap calibrated for a standard 60-minute Cambridge A Level Pure Mathematics 3 lesson.
            </p>
          </div>

          {/* Quick Classroom Display and Print Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleProjector}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold border transition-all ${
                isProjectorMode
                  ? 'bg-teal-700 text-white border-teal-600 shadow-xs'
                  : 'bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200'
              }`}
            >
              {isProjectorMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              <span>{isProjectorMode ? 'Exit Projector View' : 'Projector View (Enlarge Text)'}</span>
            </button>

            <button
              onClick={onPrint}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white shadow-xs transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Worksheet</span>
            </button>
          </div>
        </div>
      </div>

      {/* 60-Minute Lesson Timeline */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-teal-700" />
            <h3 className="font-bold text-slate-900 text-base sm:text-lg">
              Suggested 60-Minute Lesson Flow
            </h3>
          </div>
          <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded border border-teal-200">
            Total: 60 Minutes
          </span>
        </div>

        <div className="space-y-4">
          {lessonPlan.map((block, idx) => {
            const isCompleted = completedBlocks[idx];

            return (
              <div
                key={idx}
                onClick={() => toggleBlock(idx)}
                className={`p-4 sm:p-5 rounded-xl border transition-all cursor-pointer ${
                  isCompleted
                    ? 'bg-slate-50 border-slate-200 opacity-60'
                    : 'bg-white border-slate-200 hover:border-teal-300 hover:shadow-2xs'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-teal-100 text-teal-800">
                      {block.time}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                      {block.title}
                    </h4>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    {block.focus}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                  {block.details}
                </p>

                <div className="p-2.5 bg-teal-50/60 rounded-lg border border-teal-100 text-xs text-teal-950 font-medium flex items-start gap-2">
                  <span className="shrink-0 text-sm">💡</span>
                  <span>{block.teacherPrompt}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Examiner Trap & Pedagogical Advice Box */}
      <div className="bg-slate-900 text-slate-100 rounded-xl p-5 sm:p-6 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-white text-base">
            Essential Cambridge Examiner Advice to Recite
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300 leading-relaxed">
          <div className="p-3.5 bg-slate-800/80 rounded-lg border border-slate-700 space-y-1">
            <span className="font-bold text-teal-300 block">1. The "Assume the Result" Trap</span>
            <p>
              Students who start with <code className="text-amber-300">LHS = RHS</code> and cross-multiply receive 0 method marks from Cambridge examiners. Always emphasize: Start on one side, keep manipulating until it equals the target, then write <code className="text-teal-300">= RHS ∎</code>.
            </p>
          </div>
          <div className="p-3.5 bg-slate-800/80 rounded-lg border border-slate-700 space-y-1">
            <span className="font-bold text-teal-300 block">2. Choosing the Right cos2A Form</span>
            <p>
              When an expression starts with <code className="text-teal-300">1 - cos2θ</code>, students must choose <code className="text-amber-300">cos2θ ≡ 1 - 2sin²θ</code> so the <code className="text-teal-300">1</code> cancels cleanly without minus sign errors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

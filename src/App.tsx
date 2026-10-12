import React, { useState } from 'react';
import { TabId } from './types';
import { Navbar } from './components/Navbar';
import { ToolkitSection } from './components/ToolkitSection';
import { GamePlanSection } from './components/GamePlanSection';
import { WorkedExamplesSection } from './components/WorkedExamplesSection';
import { CreativeCornerSection } from './components/CreativeCornerSection';
import { PracticeSection } from './components/PracticeSection';
import { TeacherModeSection } from './components/TeacherModeSection';
import { PrintableWorksheet } from './components/PrintableWorksheet';
import { Sparkles, Compass, Lightbulb, CheckCircle2, GraduationCap, BookOpen } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('toolkit');
  const [isProjectorMode, setIsProjectorMode] = useState<boolean>(false);
  const [starsStats, setStarsStats] = useState<{ earned: number; total: number }>({
    earned: 0,
    total: 22
  });

  const handlePrint = () => {
    window.print();
  };

  const handleToggleProjector = () => {
    setIsProjectorMode(prev => !prev);
  };

  const handleStarsChange = (earned: number, total: number) => {
    setStarsStats({ earned, total });
  };

  return (
    <div className={`min-h-screen flex flex-col bg-slate-50 text-slate-900 transition-all ${
      isProjectorMode ? 'text-lg leading-relaxed' : 'text-sm sm:text-base'
    }`}>
      {/* Interactive Top Navbar (Hidden when printing) */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isProjectorMode={isProjectorMode}
        onToggleProjector={handleToggleProjector}
        onPrint={handlePrint}
        starsEarned={starsStats.earned}
        totalStars={starsStats.total}
      />

      {/* Main Screen Content (Hidden when printing, PrintableWorksheet shown instead) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 print:hidden">
        {/* Projector Mode Indicator Banner */}
        {isProjectorMode && (
          <div className="mb-6 p-3 bg-teal-900 text-teal-100 rounded-xl flex items-center justify-between text-xs sm:text-sm font-medium border border-teal-800 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-400"></span>
              <span>Projector View Active: High-contrast, enlarged typography optimized for classroom presentation.</span>
            </div>
            <button
              onClick={handleToggleProjector}
              className="text-white underline hover:text-teal-200 ml-4 font-semibold"
            >
              Exit
            </button>
          </div>
        )}

        {/* Content by Active Tab */}
        {activeTab === 'toolkit' && (
          <ToolkitSection isProjectorMode={isProjectorMode} />
        )}

        {activeTab === 'gameplan' && (
          <GamePlanSection isProjectorMode={isProjectorMode} />
        )}

        {activeTab === 'examples' && (
          <WorkedExamplesSection isProjectorMode={isProjectorMode} />
        )}

        {activeTab === 'creative' && (
          <CreativeCornerSection isProjectorMode={isProjectorMode} />
        )}

        {activeTab === 'practice' && (
          <PracticeSection 
            isProjectorMode={isProjectorMode} 
            onStarsChange={handleStarsChange} 
          />
        )}

        {activeTab === 'teacher' && (
          <TeacherModeSection 
            isProjectorMode={isProjectorMode}
            onToggleProjector={handleToggleProjector}
            onPrint={handlePrint}
          />
        )}
      </main>

      {/* Printable Sheet (Revealed ONLY during print) */}
      <PrintableWorksheet />

      {/* Footer */}
      <footer className="mt-auto bg-slate-900 text-slate-400 border-t border-slate-800 py-6 px-4 sm:px-6 lg:px-8 print:hidden text-center text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-slate-300 font-medium">
            Cambridge A Level Mathematics · Pure Mathematics 3 · 3.4 Further Trigonometric Identities
          </div>
          <div className="text-slate-500 text-xs">
            Proving <span className="text-teal-400 font-bold">LHS ≡ RHS</span> without equation cross-multiplication
          </div>
        </div>
      </footer>
    </div>
  );
}

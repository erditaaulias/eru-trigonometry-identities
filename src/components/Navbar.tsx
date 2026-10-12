import React from 'react';
import { TabId } from '../types';
import { 
  BookOpen, 
  Compass, 
  Lightbulb, 
  Sparkles, 
  CheckCircle2, 
  GraduationCap, 
  Maximize2, 
  Minimize2, 
  Printer 
} from 'lucide-react';

interface NavbarProps {
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
  isProjectorMode: boolean;
  onToggleProjector: () => void;
  onPrint: () => void;
  starsEarned: number;
  totalStars: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  isProjectorMode,
  onToggleProjector,
  onPrint,
  starsEarned,
  totalStars,
}) => {
  const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: 'toolkit', label: 'Toolkit', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'gameplan', label: 'Game Plan', icon: <Compass className="w-4 h-4" /> },
    { id: 'examples', label: 'Worked Examples', icon: <Lightbulb className="w-4 h-4" /> },
    { id: 'creative', label: 'Creative Corner', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'practice', label: 'Practice', icon: <CheckCircle2 className="w-4 h-4" /> },
    { id: 'teacher', label: 'Teacher Mode', icon: <GraduationCap className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-slate-100 shadow-sm print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-teal-600/30 border border-teal-500/40 flex items-center justify-center font-bold text-teal-300 text-lg">
              ≡
            </div>
            <div>
              <span className="font-semibold text-base sm:text-lg tracking-tight text-white block leading-tight">
                Proving Trigonometric Identities
              </span>
              <span className="text-[11px] text-teal-400 font-medium hidden sm:block">
                Cambridge A Level Pure Mathematics 3 (3.4)
              </span>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="hidden lg:flex items-center space-x-1 overflow-x-auto py-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  {tab.id === 'practice' && (
                    <span className="ml-1 text-[10px] bg-slate-800 text-teal-300 px-1.5 py-0.5 rounded border border-slate-700 font-mono">
                      ★ {starsEarned}/{totalStars}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onToggleProjector}
              title={isProjectorMode ? 'Exit Projector View' : 'Projector View (large text)'}
              aria-label="Projector view"
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                isProjectorMode
                  ? 'bg-teal-600 text-white border-teal-500'
                  : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
              }`}
            >
              {isProjectorMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              <span className="hidden md:inline">
                {isProjectorMode ? 'Normal View' : 'Projector View'}
              </span>
            </button>

            <button
              onClick={onPrint}
              title="Print worksheet without solutions"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium bg-teal-600 hover:bg-teal-500 text-white transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print Worksheet</span>
            </button>
          </div>
        </div>

        {/* Mobile Nav Tabs Bar */}
        <div className="flex lg:hidden overflow-x-auto py-2 gap-1 border-t border-slate-800 no-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 transition-colors ${
                  isActive
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                    : 'text-slate-300 hover:text-white bg-slate-800/50'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

import React, { useState } from 'react';
import { MathView } from './MathView';
import { HINT_LADDER_STEPS } from '../data/curriculumData';
import { 
  Split, 
  HelpCircle, 
  Sparkles, 
  Calculator, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  EyeOff, 
  ArrowDown, 
  Copy, 
  Check 
} from 'lucide-react';

interface CreativeCornerSectionProps {
  isProjectorMode?: boolean;
}

export const CreativeCornerSection: React.FC<CreativeCornerSectionProps> = ({ isProjectorMode = false }) => {
  // Activity A state
  const [route1Working, setRoute1Working] = useState('');
  const [route2Working, setRoute2Working] = useState('');
  const [showModelA, setShowModelA] = useState(false);

  // Activity B state
  const [examinerAnswer, setExaminerAnswer] = useState('');
  const [showModelB, setShowModelB] = useState(false);

  // Activity C state
  const [customLhsText, setCustomLhsText] = useState('\\frac{1 - \\cos 2\\theta}{\\sin 2\\theta}');
  const [customRhsText, setCustomRhsText] = useState('\\tan\\theta');
  const [thetaDeg, setThetaDeg] = useState<number>(35);
  const [jsLhs, setJsLhs] = useState('(1 - cos(2*t)) / sin(2*t)');
  const [jsRhs, setJsRhs] = useState('tan(t)');
  const [evalResult, setEvalResult] = useState<{
    tested: boolean;
    val1?: number;
    val2?: number;
    match?: boolean;
    error?: string;
  }>({ tested: false });

  // Hint ladder state: how many rungs are revealed
  const [hintRungsRevealed, setHintRungsRevealed] = useState<number>(1);

  // Active tab inside Creative Corner
  const [activeActivity, setActiveActivity] = useState<'A' | 'B' | 'C' | 'ladder'>('A');

  // Evaluate JS math safely
  const runNumericCheck = () => {
    try {
      const rad = (thetaDeg * Math.PI) / 180;
      // Define mathematical environment
      const sin = (x: number) => Math.sin(x);
      const cos = (x: number) => Math.cos(x);
      const tan = (x: number) => Math.tan(x);
      const sec = (x: number) => 1 / Math.cos(x);
      const cosec = (x: number) => 1 / Math.sin(x);
      const cot = (x: number) => 1 / Math.tan(x);

      // Safe evaluation wrapper
      const evaluateExpr = (expr: string) => {
        // Replace common syntax if student typed Math.sin or simple sin
        const cleaned = expr.trim();
        const fn = new Function('t', 'sin', 'cos', 'tan', 'sec', 'cosec', 'cot', 'Math', `return (${cleaned});`);
        return fn(rad, sin, cos, tan, sec, cosec, cot, Math);
      };

      const val1 = Number(evaluateExpr(jsLhs));
      const val2 = Number(evaluateExpr(jsRhs));

      if (isNaN(val1) || isNaN(val2)) {
        setEvalResult({
          tested: true,
          error: 'Evaluation yielded NaN (Check for division by zero or invalid angle).'
        });
        return;
      }

      const match = Math.abs(val1 - val2) < 1e-6;
      setEvalResult({
        tested: true,
        val1,
        val2,
        match
      });
    } catch (err: unknown) {
      setEvalResult({
        tested: true,
        error: err instanceof Error ? err.message : 'Invalid math expression'
      });
    }
  };

  const loadSampleTrap = (lhsMath: string, rhsMath: string, lhsCode: string, rhsCode: string) => {
    setCustomLhsText(lhsMath);
    setCustomRhsText(rhsMath);
    setJsLhs(lhsCode);
    setJsRhs(rhsCode);
    setEvalResult({ tested: false });
  };

  return (
    <div className={`space-y-6 ${isProjectorMode ? 'text-lg' : ''}`}>
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 tracking-wider uppercase mb-1">
          <span>Section 4</span>
          <span>·</span>
          <span>Higher-Order Thinking</span>
        </div>
        <h2 className={`font-bold text-slate-900 ${isProjectorMode ? 'text-3xl' : 'text-2xl'}`}>
          Creative Corner & Diagnostic Arena
        </h2>
        <p className="text-slate-600 text-sm mt-1 max-w-3xl">
          Move beyond routine drills. Explore dual proof trajectories, spot subtle examiner justification traps, forge your own disguised trigonometric traps, and climb the progressive Hint Ladder.
        </p>

        {/* Activity Selectors */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
          <button
            onClick={() => setActiveActivity('A')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeActivity === 'A'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Split className="w-3.5 h-3.5" />
            <span>A. Two Roads, One Destination</span>
          </button>
          <button
            onClick={() => setActiveActivity('B')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeActivity === 'B'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>B. Be the Examiner</span>
          </button>
          <button
            onClick={() => setActiveActivity('C')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeActivity === 'C'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>C. Build Your Own Trap</span>
          </button>
          <button
            onClick={() => setActiveActivity('ladder')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeActivity === 'ladder'
                ? 'bg-teal-700 text-white'
                : 'bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>🪜 The Universal Hint Ladder</span>
          </button>
        </div>
      </div>

      {/* ACTIVITY A: TWO ROADS, ONE DESTINATION */}
      {activeActivity === 'A' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs space-y-6">
          <div>
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block">
              Activity A: Symmetry of Proof
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-1">
              Two Roads, One Destination
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Prove the identity below in <strong>two different ways</strong>: first travelling <span className="font-semibold text-slate-800">LHS → RHS</span>, and then travelling backwards <span className="font-semibold text-slate-800">RHS → LHS</span>.
            </p>
            <div className="my-4 p-4 bg-slate-50 border border-slate-200 rounded-lg text-center font-semibold text-lg text-slate-900">
              <MathView math="\frac{1 + \sin\theta}{\cos\theta} \equiv \frac{\cos\theta}{1 - \sin\theta}" block={false} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Route 1 */}
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-teal-800 uppercase">Route 1: LHS → RHS</span>
                  <span className="text-xs text-slate-400">Start: (1 + sinθ)/cosθ</span>
                </div>
                <p className="text-xs text-slate-600 mb-2">
                  Draft your working below. Hint: What conjugate factor could you multiply the numerator and denominator by?
                </p>
                <textarea
                  value={route1Working}
                  onChange={(e) => setRoute1Working(e.target.value)}
                  placeholder="Type your steps here (e.g. multiply numerator and denominator by 1 - sinθ)..."
                  className="w-full h-32 p-3 text-xs font-mono bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                />
              </div>

              {showModelA && (
                <div className="mt-4 p-3 bg-teal-50/70 border border-teal-200 rounded-lg text-xs animate-fadeIn">
                  <span className="font-bold text-teal-900 block mb-1">Model Answer Route 1:</span>
                  <p className="text-slate-800 mb-1">
                    Multiply top and bottom by <MathView math="(1 - \sin\theta)" />:
                  </p>
                  <div className="font-mono text-teal-950 py-1 overflow-x-auto">
                    <MathView math="\to \frac{1 - \sin^2\theta}{\cos\theta(1 - \sin\theta)} = \frac{\cos^2\theta}{\cos\theta(1 - \sin\theta)} = \frac{\cos\theta}{1 - \sin\theta} = \text{RHS } \blacksquare" block={false} />
                  </div>
                </div>
              )}
            </div>

            {/* Route 2 */}
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-teal-800 uppercase">Route 2: RHS → LHS</span>
                  <span className="text-xs text-slate-400">Start: cosθ/(1 - sinθ)</span>
                </div>
                <p className="text-xs text-slate-600 mb-2">
                  Draft your reverse working below. Hint: What conjugate factor clears the denominator?
                </p>
                <textarea
                  value={route2Working}
                  onChange={(e) => setRoute2Working(e.target.value)}
                  placeholder="Type your steps here (e.g. multiply numerator and denominator by 1 + sinθ)..."
                  className="w-full h-32 p-3 text-xs font-mono bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                />
              </div>

              {showModelA && (
                <div className="mt-4 p-3 bg-teal-50/70 border border-teal-200 rounded-lg text-xs animate-fadeIn">
                  <span className="font-bold text-teal-900 block mb-1">Model Answer Route 2:</span>
                  <p className="text-slate-800 mb-1">
                    Multiply top and bottom by <MathView math="(1 + \sin\theta)" />:
                  </p>
                  <div className="font-mono text-teal-950 py-1 overflow-x-auto">
                    <MathView math="\to \frac{\cos\theta(1 + \\sin\theta)}{1 - \sin^2\theta} = \frac{\cos\theta(1 + \sin\theta)}{\cos^2\theta} = \frac{1 + \sin\theta}{\cos\theta} = \text{LHS } \blacksquare" block={false} />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={() => setShowModelA(!showModelA)}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              {showModelA ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{showModelA ? 'Hide Model Answers' : 'Show Model Answers'}</span>
            </button>
            <span className="text-xs text-slate-500">
              Notice: Multiplying by conjugate <MathView math="(1 \pm \sin\theta)" /> creates a difference of squares <MathView math="1 - \sin^2\theta = \cos^2\theta" />!
            </span>
          </div>
        </div>
      )}

      {/* ACTIVITY B: BE THE EXAMINER */}
      {activeActivity === 'B' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs space-y-6">
          <div>
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block">
              Activity B: Examiner Diagnostic
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-1">
              Be the Examiner: Spot the Missing Step
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Below is an actual student script submitted for the proof of{' '}
              <span className="font-bold text-slate-900">
                <MathView math="\frac{\sin 2\theta}{1 + \cos 2\theta} \equiv \tan\theta" block={false} />
              </span>.
            </p>
          </div>

          {/* Student's Proof Submission Card */}
          <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-5 space-y-3 font-mono">
            <div className="flex items-center justify-between text-xs font-bold text-amber-900">
              <span>Candidate Script 104B</span>
              <span className="bg-amber-200 px-2 py-0.5 rounded text-amber-950 font-sans">Under Inspection</span>
            </div>

            <div className="p-3 bg-white border border-amber-200 rounded-lg text-slate-900 text-sm overflow-x-auto leading-loose">
              <MathView 
                math="\text{LHS} = \frac{2\sin\theta\cos\theta}{1 + \cos^2\theta - \sin^2\theta} = \frac{2\sin\theta\cos\theta}{\cos^2\theta + \cos^2\theta} = \frac{2\sin\theta\cos\theta}{2\cos^2\theta} = \frac{\sin\theta}{\cos\theta} = \tan\theta" 
                block={false} 
              />
            </div>
          </div>

          {/* Diagnostic Question */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-900">
              Is it correct? Which line is under-justified, and how would an examiner grade it?
            </label>
            <textarea
              value={examinerAnswer}
              onChange={(e) => setExaminerAnswer(e.target.value)}
              placeholder="Critique the student's solution: where did the denominator term cos²θ + cos²θ come from? Did they explain it? What would be a faster choice of identity?..."
              className="w-full h-28 p-3 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
            />

            <button
              onClick={() => setShowModelB(!showModelB)}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              {showModelB ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{showModelB ? 'Hide Examiner Critique' : 'Reveal Model Examiner Report'}</span>
            </button>
          </div>

          {showModelB && (
            <div className="p-4 bg-teal-50/80 border border-teal-300 rounded-xl space-y-2 text-xs sm:text-sm text-slate-800 animate-fadeIn">
              <span className="font-bold text-teal-950 block">Official Examiner Commentary & Model Analysis:</span>
              <p>
                <strong>The result is valid</strong>, but line 2 skips a critical reason:
              </p>
              <div className="bg-white p-2.5 rounded border border-teal-200 font-mono text-center my-2 text-slate-900">
                <MathView math="1 + \cos^2\theta - \sin^2\theta = (\sin^2\theta + \cos^2\theta) + \cos^2\theta - \sin^2\theta = 2\cos^2\theta" block={false} />
              </div>
              <p>
                Because the candidate replaced <MathView math="1 - \sin^2\theta" /> with <MathView math="\cos^2\theta" /> silently without stating it, an examiner may penalise a lack of working.
              </p>
              <p className="font-medium text-teal-900 pt-1">
                <strong>Cleaner Proof:</strong> A cleaner proof uses <MathView math="\cos 2\theta \equiv 2\cos^2\theta - 1" />, so <MathView math="1 + \cos 2\theta \equiv 2\cos^2\theta" /> directly!
              </p>
              <p className="text-slate-600 italic">
                <strong>Lesson:</strong> Every line needs a reason, and choosing the right form of <MathView math="\cos 2\theta" /> saves substantial work!
              </p>
            </div>
          )}
        </div>
      )}

      {/* ACTIVITY C: BUILD YOUR OWN TRAP */}
      {activeActivity === 'C' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block">
                  Activity C: Peer Challenge & Verification
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  Build Your Own Trap (Disguised Identity Creator)
                </h3>
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-1">
              Follow the 4-step creative blueprint to disguise a simple identity, then use the numerical verification engine to test candidate angles.
            </p>
          </div>

          {/* 4 Instructions Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-bold flex items-center justify-center mb-1">1</span>
              <span className="font-semibold text-xs text-slate-900 block mb-1">Start simple</span>
              <p className="text-[11px] text-slate-600">Start from a simple true identity, e.g. <MathView math="\sin^2\theta + \cos^2\theta \equiv 1" /> or <MathView math="\tan\theta \equiv \sin\theta/\cos\theta" />.</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-bold flex items-center justify-center mb-1">2</span>
              <span className="font-semibold text-xs text-slate-900 block mb-1">Disguise it</span>
              <p className="text-[11px] text-slate-600">Disguise it: multiply, add terms, convert to tan/sec, replace with double angle <MathView math="2\theta" />.</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-bold flex items-center justify-center mb-1">3</span>
              <span className="font-semibold text-xs text-slate-900 block mb-1">Hide original</span>
              <p className="text-[11px] text-slate-600">Cover up your starting equation so only the final LHS and RHS are visible.</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-bold flex items-center justify-center mb-1">4</span>
              <span className="font-semibold text-xs text-slate-900 block mb-1">Swap & prove</span>
              <p className="text-[11px] text-slate-600">Swap with a partner and challenge them to find your bridge and prove it!</p>
            </div>
          </div>

          {/* Student Statement Input */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 space-y-4">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Identity Statement to Challenge a Partner:
            </span>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <span className="text-sm font-bold text-slate-700 shrink-0">Show that</span>
              <input
                type="text"
                value={customLhsText}
                onChange={(e) => setCustomLhsText(e.target.value)}
                placeholder="e.g. (1 - cos2θ)/sin2θ"
                className="w-full sm:w-1/2 p-2.5 text-xs font-mono bg-white border border-slate-300 rounded-lg"
              />
              <span className="font-bold text-teal-800 text-xl shrink-0">≡</span>
              <input
                type="text"
                value={customRhsText}
                onChange={(e) => setCustomRhsText(e.target.value)}
                placeholder="e.g. tanθ"
                className="w-full sm:w-1/2 p-2.5 text-xs font-mono bg-white border border-slate-300 rounded-lg"
              />
            </div>
          </div>

          {/* Numeric Verification Engine */}
          <div className="border border-teal-200 bg-teal-50/40 rounded-xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-teal-800 uppercase tracking-wider block">
                  Numeric Sanity Checker
                </span>
                <p className="text-xs text-slate-600">
                  Enter JS mathematical expressions for both sides. The engine tests angle <MathView math="\theta" /> in degrees.
                </p>
              </div>

              {/* Sample Presets */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] text-slate-500">Presets:</span>
                <button
                  onClick={() => loadSampleTrap('\\sin^2\\theta + \\cos^2\\theta', '1', 'sin(t)**2 + cos(t)**2', '1')}
                  className="px-2 py-1 bg-white border border-slate-200 text-slate-700 rounded text-[11px] hover:bg-slate-50"
                >
                  Pythagorean
                </button>
                <button
                  onClick={() => loadSampleTrap('\\frac{1-\\cos 2\\theta}{\\sin 2\\theta}', '\\tan\\theta', '(1 - cos(2*t)) / sin(2*t)', 'tan(t)')}
                  className="px-2 py-1 bg-white border border-slate-200 text-slate-700 rounded text-[11px] hover:bg-slate-50"
                >
                  Double Angle
                </button>
                <button
                  onClick={() => loadSampleTrap('\\tan\\theta + \\cot\\theta', '\\sec\\theta \\operatorname{cosec}\\theta', 'tan(t) + cot(t)', 'sec(t) * cosec(t)')}
                  className="px-2 py-1 bg-white border border-slate-200 text-slate-700 rounded text-[11px] hover:bg-slate-50"
                >
                  Reciprocals
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  LHS JS expression:
                </label>
                <input
                  type="text"
                  value={jsLhs}
                  onChange={(e) => setJsLhs(e.target.value)}
                  placeholder="e.g. (1 - cos(2*t)) / sin(2*t)"
                  className="w-full p-2 text-xs font-mono bg-white border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  RHS JS expression:
                </label>
                <input
                  type="text"
                  value={jsRhs}
                  onChange={(e) => setJsRhs(e.target.value)}
                  placeholder="e.g. tan(t)"
                  className="w-full p-2 text-xs font-mono bg-white border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Test Angle θ (degrees):
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={thetaDeg}
                    onChange={(e) => setThetaDeg(Number(e.target.value))}
                    className="w-full p-2 text-xs font-mono bg-white border border-slate-300 rounded-lg"
                  />
                  <button
                    onClick={() => setThetaDeg(Math.floor(Math.random() * 80) + 5)}
                    className="px-2 py-1 text-xs bg-white border border-slate-300 rounded-lg hover:bg-slate-100 shrink-0"
                    title="Random Angle"
                  >
                    🎲
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={runNumericCheck}
                className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Evaluate at θ = {thetaDeg}° (to 6 d.p.)</span>
              </button>
            </div>

            {/* Results Display */}
            {evalResult.tested && (
              <div className="mt-3 p-3 bg-white border border-slate-200 rounded-lg text-xs">
                {evalResult.error ? (
                  <div className="text-red-600 flex items-center gap-2">
                    <XCircle className="w-4 h-4" />
                    <span>Error: {evalResult.error}</span>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                      <div className="space-x-4 font-mono">
                        <span>LHS: <strong>{evalResult.val1?.toFixed(6)}</strong></span>
                        <span>RHS: <strong>{evalResult.val2?.toFixed(6)}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {evalResult.match ? (
                          <span className="text-emerald-700 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Matches to 6 decimal places!</span>
                          </span>
                        ) : (
                          <span className="text-red-600 font-bold flex items-center gap-1">
                            <XCircle className="w-4 h-4" />
                            <span>Difference detected! (Not an identity)</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Epistemic disclaimer required by curriculum */}
            <div className="text-[11px] text-amber-900 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
              ⚠️ <strong>Epistemic Warning:</strong> A numeric match is <em>evidence</em>, not a proof! Two non-identical curves can cross at specific test angles. A rigorous proof requires algebraic equivalence across all allowable domain values without assuming equality beforehand.
            </div>
          </div>
        </div>
      )}

      {/* UNIVERSAL HINT LADDER */}
      {activeActivity === 'ladder' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block">
                Structured Scaffolding
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                The Universal Hint Ladder
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                When stuck on any identity, do not jump straight to the full answer. Reveal one rung at a time to build your problem-solving resilience.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setHintRungsRevealed(Math.min(hintRungsRevealed + 1, HINT_LADDER_STEPS.length))}
                disabled={hintRungsRevealed >= HINT_LADDER_STEPS.length}
                className="px-3.5 py-2 bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>Reveal Next Rung</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setHintRungsRevealed(1)}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium"
              >
                Reset to Rung 1
              </button>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {HINT_LADDER_STEPS.map((stepText, idx) => {
              const isRevealed = idx < hintRungsRevealed;
              const isCurrentRung = idx === hintRungsRevealed - 1;

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-4 ${
                    isRevealed
                      ? isCurrentRung
                        ? 'bg-teal-50/70 border-teal-300 shadow-xs'
                        : 'bg-slate-50 border-slate-200'
                      : 'bg-slate-50/30 border-dashed border-slate-200 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                        isRevealed
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-500 uppercase block">
                        Rung 0{idx + 1}
                      </span>
                      {isRevealed ? (
                        <p className="text-sm font-semibold text-slate-900">
                          {stepText}
                        </p>
                      ) : (
                        <p className="text-xs text-slate-400 italic">
                          Locked — try resolving the current rung first
                        </p>
                      )}
                    </div>
                  </div>

                  {isRevealed && (
                    <span className="text-xs font-semibold text-teal-700 shrink-0">
                      Active Guide
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

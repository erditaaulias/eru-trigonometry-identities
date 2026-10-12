export type TabId = 
  | 'toolkit'
  | 'gameplan'
  | 'examples'
  | 'creative'
  | 'practice'
  | 'teacher';

export interface FormulaItem {
  id: string;
  category: 'Pythagorean' | 'Quotient/Reciprocal' | 'Addition' | 'Double Angle';
  lhs: string; // LaTeX for LHS
  rhs: string; // LaTeX for RHS
  name: string;
}

export interface ProofStep {
  math: string;
  reason?: string;
}

export interface WorkedExample {
  id: string;
  title: string;
  statement: string;
  thinkFirst: string;
  steps: ProofStep[];
}

export interface PracticeQuestion {
  id: string;
  code: string; // e.g. "A1", "B2", "C3"
  level: 'A' | 'B' | 'C';
  stars: number;
  statement: string;
  hint?: string;
  proofLines: ProofStep[];
}

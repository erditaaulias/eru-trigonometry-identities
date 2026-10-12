import { FormulaItem, WorkedExample, PracticeQuestion } from '../types';

export const TOOLKIT_FORMULAS: FormulaItem[] = [
  // Pythagorean
  {
    id: 'pyth-1',
    category: 'Pythagorean',
    lhs: '\\sin^2\\theta + \\cos^2\\theta',
    rhs: '1',
    name: 'Primary Pythagorean Identity'
  },
  {
    id: 'pyth-2',
    category: 'Pythagorean',
    lhs: '1 + \\tan^2\\theta',
    rhs: '\\sec^2\\theta',
    name: 'Tangent-Secant Identity'
  },
  {
    id: 'pyth-3',
    category: 'Pythagorean',
    lhs: '1 + \\cot^2\\theta',
    rhs: '\\operatorname{cosec}^2\\theta',
    name: 'Cotangent-Cosecant Identity'
  },
  // Quotient / Reciprocal
  {
    id: 'quot-1',
    category: 'Quotient/Reciprocal',
    lhs: '\\tan\\theta',
    rhs: '\\frac{\\sin\\theta}{\\cos\\theta}',
    name: 'Tangent Quotient'
  },
  {
    id: 'quot-2',
    category: 'Quotient/Reciprocal',
    lhs: '\\cot\\theta',
    rhs: '\\frac{\\cos\\theta}{\\sin\\theta}',
    name: 'Cotangent Quotient'
  },
  {
    id: 'quot-3',
    category: 'Quotient/Reciprocal',
    lhs: '\\sec\\theta',
    rhs: '\\frac{1}{\\cos\\theta}',
    name: 'Secant Reciprocal'
  },
  {
    id: 'quot-4',
    category: 'Quotient/Reciprocal',
    lhs: '\\operatorname{cosec}\\theta',
    rhs: '\\frac{1}{\\sin\\theta}',
    name: 'Cosecant Reciprocal'
  },
  // Addition
  {
    id: 'add-1',
    category: 'Addition',
    lhs: '\\sin(A \\pm B)',
    rhs: '\\sin A \\cos B \\pm \\cos A \\sin B',
    name: 'Sine Compound Angle'
  },
  {
    id: 'add-2',
    category: 'Addition',
    lhs: '\\cos(A \\pm B)',
    rhs: '\\cos A \\cos B \\mp \\sin A \\sin B',
    name: 'Cosine Compound Angle'
  },
  {
    id: 'add-3',
    category: 'Addition',
    lhs: '\\tan(A \\pm B)',
    rhs: '\\frac{\\tan A \\pm \\tan B}{1 \\mp \\tan A \\tan B}',
    name: 'Tangent Compound Angle'
  },
  // Double angle
  {
    id: 'dbl-1',
    category: 'Double Angle',
    lhs: '\\sin 2A',
    rhs: '2\\sin A \\cos A',
    name: 'Double Angle Sine'
  },
  {
    id: 'dbl-2',
    category: 'Double Angle',
    lhs: '\\cos 2A',
    rhs: '\\cos^2 A - \\sin^2 A \\equiv 2\\cos^2 A - 1 \\equiv 1 - 2\\sin^2 A',
    name: 'Double Angle Cosine (3 Forms)'
  },
  {
    id: 'dbl-3',
    category: 'Double Angle',
    lhs: '\\tan 2A',
    rhs: '\\frac{2\\tan A}{1 - \\tan^2 A}',
    name: 'Double Angle Tangent'
  }
];

export const WORKED_EXAMPLES: WorkedExample[] = [
  {
    id: 'ex-1',
    title: 'Example 1',
    statement: '\\tan\\theta + \\cot\\theta \\equiv \\sec\\theta \\operatorname{cosec}\\theta',
    thinkFirst: 'LHS has two different functions. RHS is a product of reciprocals. Convert to sin and cos.',
    steps: [
      {
        math: '\\text{LHS} = \\tan\\theta + \\cot\\theta',
        reason: 'Start with the more complicated left side'
      },
      {
        math: '= \\frac{\\sin\\theta}{\\cos\\theta} + \\frac{\\cos\\theta}{\\sin\\theta}',
        reason: 'convert to sin and cos'
      },
      {
        math: '= \\frac{\\sin^2\\theta + \\cos^2\\theta}{\\sin\\theta \\cos\\theta}',
        reason: 'common denominator'
      },
      {
        math: '= \\frac{1}{\\sin\\theta \\cos\\theta}',
        reason: 'Pythagorean'
      },
      {
        math: '= \\left(\\frac{1}{\\cos\\theta}\\right)\\left(\\frac{1}{\\sin\\theta}\\right) = \\sec\\theta \\operatorname{cosec}\\theta = \\text{RHS } \\blacksquare',
        reason: 'reciprocal definitions'
      }
    ]
  },
  {
    id: 'ex-2',
    title: 'Example 2',
    statement: '\\frac{1 - \\cos 2\\theta}{\\sin 2\\theta} \\equiv \\tan\\theta',
    thinkFirst: "We see 2θ on the LHS and only θ on the RHS, so use double angle. Because the numerator starts with '1 −', choose cos2θ ≡ 1 − 2sin²θ so the 1s cancel.",
    steps: [
      {
        math: '\\text{LHS} = \\frac{1 - \\cos 2\\theta}{\\sin 2\\theta}',
        reason: 'Start with the LHS containing compound argument 2θ'
      },
      {
        math: '= \\frac{1 - (1 - 2\\sin^2\\theta)}{2\\sin\\theta\\cos\\theta}',
        reason: 'double angle formulae'
      },
      {
        math: '= \\frac{2\\sin^2\\theta}{2\\sin\\theta\\cos\\theta}',
        reason: 'simplify numerator'
      },
      {
        math: '= \\frac{\\sin\\theta}{\\cos\\theta} = \\tan\\theta = \\text{RHS } \\blacksquare',
        reason: 'cancel 2sinθ, quotient identity'
      }
    ]
  }
];

export const HINT_LADDER_STEPS = [
  'Which side is more complicated?',
  'Convert everything to sin and cos.',
  'Look for a squared term or a 2θ.',
  'Try a common denominator.',
  'Try working from the other side.',
  'Ask a friend or your teacher.'
];

export const PRACTICE_QUESTIONS: PracticeQuestion[] = [
  // LEVEL A (1 Star)
  {
    id: 'q-a1',
    code: 'A1',
    level: 'A',
    stars: 1,
    statement: '\\tan\\theta \\operatorname{cosec}\\theta \\equiv \\sec\\theta',
    hint: 'Convert tanθ and cosecθ to sinθ and cosθ, then simplify.',
    proofLines: [
      {
        math: '\\text{LHS} = \\left(\\frac{\\sin\\theta}{\\cos\\theta}\\right)\\left(\\frac{1}{\\sin\\theta}\\right)',
        reason: 'Convert to sinθ and cosθ'
      },
      {
        math: '= \\frac{1}{\\cos\\theta}',
        reason: 'Cancel sinθ'
      },
      {
        math: '= \\sec\\theta \\quad \\blacksquare',
        reason: 'Reciprocal definition (= RHS)'
      }
    ]
  },
  {
    id: 'q-a2',
    code: 'A2',
    level: 'A',
    stars: 1,
    statement: '(\\sin\\theta + \\cos\\theta)^2 \\equiv 1 + \\sin 2\\theta',
    hint: 'Expand the bracket on the LHS and look for a Pythagorean identity and double angle.',
    proofLines: [
      {
        math: '\\text{LHS} = \\sin^2\\theta + 2\\sin\\theta\\cos\\theta + \\cos^2\\theta',
        reason: 'Expand the bracket'
      },
      {
        math: '= (\\sin^2\\theta + \\cos^2\\theta) + 2\\sin\\theta\\cos\\theta',
        reason: 'Group squared terms'
      },
      {
        math: '= 1 + \\sin 2\\theta \\quad \\blacksquare',
        reason: 'Pythagorean identity and sin2θ formula (= RHS)'
      }
    ]
  },
  {
    id: 'q-a3',
    code: 'A3',
    level: 'A',
    stars: 1,
    statement: '\\sin 2\\theta \\equiv \\frac{2\\tan\\theta}{1 + \\tan^2\\theta}',
    hint: 'The RHS is more complicated. Substitute 1 + tan²θ ≡ sec²θ and simplify.',
    proofLines: [
      {
        math: '\\text{RHS} = \\frac{2\\tan\\theta}{\\sec^2\\theta}',
        reason: 'Use 1 + tan²θ ≡ sec²θ (work from RHS)'
      },
      {
        math: '= 2\\left(\\frac{\\sin\\theta}{\\cos\\theta}\\right)\\cos^2\\theta',
        reason: 'Express in sinθ and cosθ'
      },
      {
        math: '= 2\\sin\\theta\\cos\\theta',
        reason: 'Cancel cosθ'
      },
      {
        math: '= \\sin 2\\theta \\quad \\blacksquare',
        reason: 'Double angle sine identity (= LHS)'
      }
    ]
  },

  // LEVEL B (2 Stars)
  {
    id: 'q-b1',
    code: 'B1',
    level: 'B',
    stars: 2,
    statement: '\\frac{1 - \\cos 2\\theta}{\\sin 2\\theta} \\equiv \\tan\\theta',
    hint: 'Express both cos2θ and sin2θ in terms of single-angle θ functions.',
    proofLines: [
      {
        math: '\\text{Using } 1 - \\cos 2\\theta \\equiv 2\\sin^2\\theta \\text{ and } \\sin 2\\theta \\equiv 2\\sin\\theta\\cos\\theta:',
        reason: 'Double angle identities'
      },
      {
        math: '\\text{LHS} = \\frac{2\\sin^2\\theta}{2\\sin\\theta\\cos\\theta}',
        reason: 'Substitute into LHS'
      },
      {
        math: '= \\tan\\theta \\quad \\blacksquare',
        reason: 'Cancel 2sinθ, quotient identity (= RHS)'
      }
    ]
  },
  {
    id: 'q-b2',
    code: 'B2',
    level: 'B',
    stars: 2,
    statement: '\\cos 2\\theta \\equiv \\frac{1 - \\tan^2\\theta}{1 + \\tan^2\\theta}',
    hint: 'Work from RHS: replace tanθ with sinθ/cosθ and clear the fractions.',
    proofLines: [
      {
        math: '\\text{RHS} = \\frac{1 - \\sin^2\\theta/\\cos^2\\theta}{1 + \\sin^2\\theta/\\cos^2\\theta}',
        reason: 'Convert tanθ to sinθ/cosθ (work from RHS)'
      },
      {
        math: '= \\frac{\\cos^2\\theta - \\sin^2\\theta}{\\cos^2\\theta + \\sin^2\\theta}',
        reason: 'Multiply top and bottom by cos²θ'
      },
      {
        math: '= \\frac{\\cos 2\\theta}{1} = \\cos 2\\theta \\quad \\blacksquare',
        reason: 'Use cos²θ + sin²θ = 1 and double angle cos (= LHS)'
      }
    ]
  },
  {
    id: 'q-b3',
    code: 'B3',
    level: 'B',
    stars: 2,
    statement: '\\frac{\\sin(A+B)}{\\cos A \\cos B} \\equiv \\tan A + \\tan B',
    hint: 'Expand sin(A+B) using the addition formula and split into two fractions.',
    proofLines: [
      {
        math: '\\text{LHS} = \\frac{\\sin A \\cos B + \\cos A \\sin B}{\\cos A \\cos B}',
        reason: 'Expand numerator using addition formula'
      },
      {
        math: '= \\frac{\\sin A}{\\cos A} + \\frac{\\sin B}{\\cos B}',
        reason: 'Split over common denominator and cancel terms'
      },
      {
        math: '= \\tan A + \\tan B \\quad \\blacksquare',
        reason: 'Tangent quotient definitions (= RHS)'
      }
    ]
  },
  {
    id: 'q-b4',
    code: 'B4',
    level: 'B',
    stars: 2,
    statement: '\\frac{\\sin\\theta}{1 + \\cos\\theta} + \\frac{1 + \\cos\\theta}{\\sin\\theta} \\equiv 2\\operatorname{cosec}\\theta',
    hint: 'Find a common denominator sinθ(1 + cosθ) and expand the numerator carefully.',
    proofLines: [
      {
        math: '\\text{LHS} = \\frac{\\sin^2\\theta + (1 + \\cos\\theta)^2}{\\sin\\theta(1 + \\cos\\theta)}',
        reason: 'Put over common denominator'
      },
      {
        math: '= \\frac{\\sin^2\\theta + 1 + 2\\cos\\theta + \\cos^2\\theta}{\\sin\\theta(1 + \\cos\\theta)}',
        reason: 'Expand (1 + cosθ)²'
      },
      {
        math: '= \\frac{2 + 2\\cos\\theta}{\\sin\\theta(1 + \\cos\\theta)}',
        reason: 'Use sin²θ + cos²θ = 1'
      },
      {
        math: '= \\frac{2(1 + \\cos\\theta)}{\\sin\\theta(1 + \\cos\\theta)} = \\frac{2}{\\sin\\theta} = 2\\operatorname{cosec}\\theta \\quad \\blacksquare',
        reason: 'Factorise numerator, cancel (1 + cosθ), reciprocal'
      }
    ]
  },
  {
    id: 'q-b5',
    code: 'B5',
    level: 'B',
    stars: 2,
    statement: '\\operatorname{cosec}2\\theta + \\cot 2\\theta \\equiv \\cot\\theta',
    hint: 'Convert both terms on LHS to sin2θ and cos2θ, then simplify the combined numerator.',
    proofLines: [
      {
        math: '\\text{LHS} = \\frac{1}{\\sin 2\\theta} + \\frac{\\cos 2\\theta}{\\sin 2\\theta}',
        reason: 'Express in reciprocal and quotient definitions'
      },
      {
        math: '= \\frac{1 + \\cos 2\\theta}{\\sin 2\\theta}',
        reason: 'Combine over common denominator'
      },
      {
        math: '= \\frac{2\\cos^2\\theta}{2\\sin\\theta\\cos\\theta}',
        reason: 'Substitute 1 + cos2θ ≡ 2cos²θ and sin2θ ≡ 2sinθcosθ'
      },
      {
        math: '= \\frac{\\cos\\theta}{\\sin\\theta} = \\cot\\theta \\quad \\blacksquare',
        reason: 'Cancel 2cosθ, quotient identity (= RHS)'
      }
    ]
  },

  // LEVEL C (3 Stars)
  {
    id: 'q-c1',
    code: 'C1',
    level: 'C',
    stars: 3,
    statement: '\\sin 3\\theta \\equiv 3\\sin\\theta - 4\\sin^3\\theta',
    hint: 'Write 3θ = 2θ + θ, apply the addition formula, then expand double angle terms.',
    proofLines: [
      {
        math: '\\sin 3\\theta = \\sin(2\\theta + \\theta)',
        reason: 'Partition 3θ as 2θ + θ'
      },
      {
        math: '= \\sin 2\\theta\\cos\\theta + \\cos 2\\theta\\sin\\theta',
        reason: 'Addition formula for sine'
      },
      {
        math: '= 2\\sin\\theta\\cos^2\\theta + (1 - 2\\sin^2\\theta)\\sin\\theta',
        reason: 'Substitute sin2θ = 2sinθcosθ and cos2θ = 1 - 2sin²θ'
      },
      {
        math: '= 2\\sin\\theta(1 - \\sin^2\\theta) + \\sin\\theta - 2\\sin^3\\theta',
        reason: 'Replace cos²θ with 1 - sin²θ'
      },
      {
        math: '= 2\\sin\\theta - 2\\sin^3\\theta + \\sin\\theta - 2\\sin^3\\theta = 3\\sin\\theta - 4\\sin^3\\theta \\quad \\blacksquare',
        reason: 'Expand and collect like terms (= RHS)'
      }
    ]
  },
  {
    id: 'q-c2',
    code: 'C2',
    level: 'C',
    stars: 3,
    statement: '\\frac{1 + \\sin\\theta}{1 - \\sin\\theta} \\equiv (\\sec\\theta + \\tan\\theta)^2',
    hint: 'Work from RHS: express secθ and tanθ in sin and cos, then factorise the denominator using difference of squares.',
    proofLines: [
      {
        math: '\\text{RHS} = \\left(\\frac{1 + \\sin\\theta}{\\cos\\theta}\\right)^2',
        reason: 'Combine fractions inside bracket (work from RHS)'
      },
      {
        math: '= \\frac{(1 + \\sin\\theta)^2}{\\cos^2\\theta}',
        reason: 'Square numerator and denominator'
      },
      {
        math: '= \\frac{(1 + \\sin\\theta)^2}{1 - \\sin^2\\theta}',
        reason: 'Pythagorean identity cos²θ = 1 - sin²θ'
      },
      {
        math: '= \\frac{(1 + \\sin\\theta)^2}{(1 - \\sin\\theta)(1 + \\sin\\theta)}',
        reason: 'Factorise denominator as difference of two squares'
      },
      {
        math: '= \\frac{1 + \\sin\\theta}{1 - \\sin\\theta} \\quad \\blacksquare',
        reason: 'Cancel common factor (1 + sinθ) (= LHS)'
      }
    ]
  },
  {
    id: 'q-c3',
    code: 'C3',
    level: 'C',
    stars: 3,
    statement: '\\cos(A+B)\\cos(A-B) \\equiv \\cos^2 A - \\sin^2 B',
    hint: 'Expand both compound angles and multiply out as a difference of two squares.',
    proofLines: [
      {
        math: '\\text{LHS} = (\\cos A \\cos B - \\sin A \\sin B)(\\cos A \\cos B + \\sin A \\sin B)',
        reason: 'Expand both factors using cosine addition and subtraction'
      },
      {
        math: '= \\cos^2 A \\cos^2 B - \\sin^2 A \\sin^2 B',
        reason: 'Expand difference of two squares: (x - y)(x + y) = x² - y²'
      },
      {
        math: '= \\cos^2 A(1 - \\sin^2 B) - (1 - \\cos^2 A)\\sin^2 B',
        reason: 'Substitute cos²B = 1 - sin²B and sin²A = 1 - cos²A'
      },
      {
        math: '= \\cos^2 A - \\cos^2 A \\sin^2 B - \\sin^2 B + \\cos^2 A \\sin^2 B = \\cos^2 A - \\sin^2 B \\quad \\blacksquare',
        reason: 'Expand and cancel matching product terms (= RHS)'
      }
    ]
  }
];

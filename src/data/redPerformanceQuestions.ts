export interface GuideSection {
  label: string;
  paragraphs?: string[];
  bullets?: string[];
  formula?: { left: string; numerator: string; denominator: string; caption: string };
}

export interface GuideItem {
  key: string;
  symbol: string;
  name: string;
  summary: string;
  sections: GuideSection[];
}

export interface ReferenceGuide {
  title: string;
  items: GuideItem[];
}

export interface Question {
  id: string;
  moduleId: string;
  question: string;
  type: 'input' | 'select' | 'checkbox' | 'multi-input';
  unit?: string;
  formula?: string;
  reference?: { name: string; url: string };
  options?: { value: string; score: number; label: string }[];
  scoringRules?: { min?: number; max?: number; score: number; description: string }[];
  multiInputFields?: Array<{
    name: string;
    label: string;
    unit: string;
    placeholder: string;
    min?: number;
    max?: number;
    tooltip?: string;
  }>;
  referenceGuide?: ReferenceGuide;
}

export interface Module {
  id: string;
  name: string;
  nameEn: string;
  focus: string;
  questions: Question[];
}

export const redPerformanceModules: Module[] = [
  {
    id: 'method-validation',
    name: 'Method Validation Assessment',
    nameEn: 'Analytical Method Robustness & Compliance',
    focus: 'Evaluating method validation rigor, specificity, and operational robustness',
    questions: [
      {
        id: 'q1',
        moduleId: 'method-validation',
        question: 'Q1: Method Validation Rigor and Compliance - Evaluates whether the method has undergone systematic validation by authoritative bodies (e.g., ICH, FDA, GB standards)',
        type: 'select',
        options: [
          { 
            value: 'full-validation', 
            score: 100, 
            label: 'A (100 pts): Strictly follows national/international standards, completed full validation including accuracy, precision, specificity, linearity, range with complete compliance reports' 
          },
          { 
            value: 'core-validation', 
            score: 75, 
            label: 'B (75 pts): Completed core validation procedures with legally accepted data support, meets general laboratory quality system requirements' 
          },
          { 
            value: 'partial-validation', 
            score: 50, 
            label: 'C (50 pts): Insufficient validation, lacking key indicator verification (e.g., long-term stability testing), data may only support preliminary application' 
          },
          { 
            value: 'basic-test', 
            score: 25, 
            label: 'D (25 pts): Only performed simple basic testing, lacking systematic validation data' 
          },
          { 
            value: 'no-validation', 
            score: 0, 
            label: 'E (0 pts): Not validated at any level, results highly uncertain' 
          }
        ]
      },
      {
        id: 'q2',
        moduleId: 'method-validation',
        question: 'Q2: Analytical Specificity and Matrix Interference Resistance - Evaluates method\'s ability to accurately identify or quantify target analytes in complex backgrounds (e.g., excipients, impurities, degradation products)',
        type: 'select',
        options: [
          { 
            value: 'high-selectivity', 
            score: 100, 
            label: 'A (100 pts): Highly selective, unaffected by matrix interferences at substrate level or even below salt level, fully resistant to matrix effects' 
          },
          { 
            value: 'good-selectivity', 
            score: 75, 
            label: 'B (75 pts): Good selectivity, matrix interference relatively weak, can be eliminated through simple pretreatment or optimized conditions' 
          },
          { 
            value: 'moderate-interference', 
            score: 50, 
            label: 'C (50 pts): Matrix interference exists, requires additional matrix matching or correction procedures, but similar analogues may still interfere under certain conditions' 
          },
          { 
            value: 'poor-specificity', 
            score: 25, 
            label: 'D (25 pts): Poor specificity, highly susceptible to similar sample matrix or background impurity interference, results prone to false positives/negatives or systematic bias' 
          },
          { 
            value: 'no-specificity', 
            score: 0, 
            label: 'E (0 pts): No specificity, cannot distinguish or identify target analytes in complex matrices' 
          }
        ]
      },
      {
        id: 'q3',
        moduleId: 'method-validation',
        question: 'Q3: Operational Robustness and Method Transfer Reliability - Evaluates method\'s tolerance to minor experimental variations (e.g., pH, temperature, flow rate, operator changes)',
        type: 'select',
        options: [
          { 
            value: 'robust-doe', 
            score: 100, 
            label: 'A (100 pts): Systematic robustness evaluation (e.g., DoE experiments), proven stable under normal operational condition fluctuations with consistent results' 
          },
          { 
            value: 'core-parameters', 
            score: 75, 
            label: 'B (75 pts): Completed core parameter usage testing, method stable in standard experimental environment' 
          },
          { 
            value: 'sensitive-small', 
            score: 50, 
            label: 'C (50 pts): Sensitive to operational details, minor environmental or condition variations may cause result fluctuations, requiring system correction' 
          },
          { 
            value: 'weak-method', 
            score: 25, 
            label: 'D (25 pts): Weak method, only works under strictly controlled conditions, minor parameter drift causes significant personnel-dependent variance, lacking migration capability' 
          },
          { 
            value: 'unstable', 
            score: 0, 
            label: 'E (0 pts): Lacks stability, experimental results have inherent randomness, cannot be validated through repeat verification' 
          }
        ]
      },
      {
        id: 'q4',
        moduleId: 'method-validation',
        question: 'Q4: Precision-Accuracy Collaborative Index (PACI) - Comprehensively evaluates the balance between recovery rate (accuracy) and RSD (precision), assessing core data robustness',
        type: 'multi-input',
        formula: 'Score = 100 × exp(-0.5 × ((R-100)/3)²) × 1/(1+(RSD/2.5)²)',
        multiInputFields: [
          {
            name: 'recovery',
            label: 'R (Average Spike Recovery Rate)',
            unit: '%',
            placeholder: 'Enter recovery rate (80-120)',
            min: 0,
            max: 200,
            tooltip: 'Source: Spike recovery experiment data reported in the method validation report.'
          },
          {
            name: 'rsd',
            label: 'RSD (Relative Standard Deviation)',
            unit: '%',
            placeholder: 'Enter RSD (0-20)',
            min: 0,
            max: 100,
            tooltip: 'Source: Precision experiment data reported in the method validation report (repeatability or intermediate precision).'
          }
        ]
      },
      {
        id: 'q5',
        moduleId: 'method-validation',
        question: 'Q5: Sensitivity-Linearity Fidelity Score (SLFS) - Evaluates method\'s linear fit quality and whether sensitivity exceeds regulatory threshold',
        type: 'multi-input',
        formula: 'Score = 100 × ((r²-0.99)/0.0099)⁴ × cos(π/2 × LOD/C_req)',
        multiInputFields: [
          {
            name: 'r2',
            label: 'r² (Coefficient of Determination)',
            unit: '',
            placeholder: 'Enter r² value (0.990-1.000)',
            min: 0.99,
            max: 1.0
          },
          {
            name: 'lod',
            label: 'LOD (Actual Limit of Detection)',
            unit: 'concentration unit',
            placeholder: 'Enter LOD',
            min: 0
          },
          {
            name: 'creq',
            label: 'C_req (Regulatory Maximum LOD Threshold)',
            unit: 'concentration unit',
            placeholder: 'Enter regulatory threshold (e.g., 2.0)',
            min: 0
          }
        ],
        referenceGuide: {
          title: 'Data Entry Reference',
          items: [
            {
              key: 'r2',
              symbol: 'r²',
              name: 'Coefficient of Determination',
              summary: 'Measures how well the calibration response values fit a straight line across concentration; the closer to 1, the better the linearity.',
              sections: [
                {
                  label: 'Data Source',
                  bullets: [
                    'Validated method: use the r² value reported in the method validation report.',
                    'Literature method: use the r² value reported in the cited publication.',
                    'Not yet validated: an expected value may be entered, clearly labelled as an estimate.'
                  ]
                },
                {
                  label: 'How to Enter',
                  paragraphs: [
                    'Enter the coefficient of determination r², not the correlation coefficient r. If the report only provides r, square it first. For example, r = 0.9995 corresponds to r² = 0.9990.'
                  ]
                },
                {
                  label: 'Reference Range',
                  bullets: [
                    'Assay / content determination: r² ≥ 0.998 typically required.',
                    'Impurity determination: r² ≥ 0.980 typically required.'
                  ]
                }
              ]
            },
            {
              key: 'lod',
              symbol: 'LOD',
              name: 'Limit of Detection',
              summary: 'The lowest concentration of the analyte that the method can reliably detect.',
              sections: [
                {
                  label: 'Data Source',
                  bullets: [
                    'Validated method: use the LOD reported in the method validation report.',
                    'Literature method: use the LOD reported in the cited publication; the unit must match C_req.',
                    'Not yet validated: an expected or reference value may be entered, clearly labelled as an estimate.'
                  ]
                },
                {
                  label: 'Calculation (for reference)',
                  paragraphs: [
                    'If the report does not state the LOD directly, it can be derived by the signal-to-noise approach recommended in ICH Q2(R2):'
                  ],
                  formula: {
                    left: 'LOD',
                    numerator: '3 × N',
                    denominator: 'S',
                    caption: 'where N is the baseline noise of the blank sample and S is the slope of the calibration curve.'
                  }
                },
                {
                  label: 'How to Enter',
                  paragraphs: [
                    'Enter a numeric value in the same unit as the calibration curve (e.g., μg/mL).'
                  ]
                }
              ]
            },
            {
              key: 'creq',
              symbol: 'C_reg',
              name: 'Regulatory Threshold',
              summary: 'The detection limit required by the intended use of the method.',
              sections: [
                {
                  label: 'How to Enter',
                  bullets: [
                    'If a regulation or pharmacopoeia states the detection limit directly, enter that value.',
                    'If it only states a reporting or acceptance limit for the sample, convert it — typically one tenth of that limit. For example, a limit of 1.0 μg/mL is entered as 0.1.'
                  ]
                },
                {
                  label: 'Units',
                  paragraphs: [
                    'Must be identical to the unit used for the calibration curve and for LOD.'
                  ]
                }
              ]
            }
          ]
        }
      }
    ]
  }
];

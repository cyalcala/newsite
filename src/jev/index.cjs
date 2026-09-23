'use strict';

const { callSystemOne, isJevConfigured, DEFAULT_MODEL } = require('./client.cjs');

const DECISIONS = Object.freeze({
  ACCEPT: 'ACCEPT',
  REVISE: 'REVISE',
  RETRY: 'RETRY',
  SIMPLIFY: 'SIMPLIFY',
  COMPARE: 'COMPARE',
  ESCALATE_TO_GEMINI: 'ESCALATE_TO_GEMINI'
});

const DEFAULT_CRITERIA_MAP = {
  [DECISIONS.ACCEPT]: 'Meets all requirements, design-system tokens, and visual quality standards.',
  [DECISIONS.REVISE]: 'Direction is sound but requires targeted refinements (e.g. typography, spacing, or contrast).',
  [DECISIONS.RETRY]: 'Fundamentally flawed or deviates significantly from architectural/design goals.',
  [DECISIONS.SIMPLIFY]: 'Visually cluttered, unnecessarily complex, or over-engineered.',
  [DECISIONS.COMPARE]: 'Tradeoffs are mixed; requires comparative evaluation between multiple approaches.',
  [DECISIONS.ESCALATE_TO_GEMINI]: 'Ambiguous, high-risk, or architectural dilemma requiring deep generative reasoning.'
};

/**
 * Core judgment primitive.
 * Dispatches a bounded decision task to Jev 1.13 and returns typed probabilities.
 */
async function judge({
  task = 'Evaluate implementation or design choice',
  context = '',
  state = '',
  options = [DECISIONS.ACCEPT, DECISIONS.REVISE, DECISIONS.SIMPLIFY, DECISIONS.ESCALATE_TO_GEMINI],
  criteria = null,
  model = DEFAULT_MODEL,
  timeoutMs = 15000
} = {}) {
  // Normalize state and context
  const fullState = [
    task ? `Task: ${task}` : '',
    context ? `Context: ${context}` : '',
    state ? `State/Properties:\n${state}` : ''
  ].filter(Boolean).join('\n\n');

  // Build criteria map for choice question
  let criteriaMap = {};
  if (criteria && typeof criteria === 'object' && !Array.isArray(criteria)) {
    criteriaMap = { ...criteria };
  } else if (Array.isArray(options)) {
    for (const opt of options) {
      criteriaMap[opt] = DEFAULT_CRITERIA_MAP[opt] || `Option: ${opt}`;
    }
  } else {
    criteriaMap = { ...DEFAULT_CRITERIA_MAP };
  }

  // Ensure options map is non-empty
  if (Object.keys(criteriaMap).length < 2) {
    criteriaMap[DECISIONS.ACCEPT] = DEFAULT_CRITERIA_MAP[DECISIONS.ACCEPT];
    criteriaMap[DECISIONS.REVISE] = DEFAULT_CRITERIA_MAP[DECISIONS.REVISE];
  }

  const result = await callSystemOne({
    model,
    state: fullState,
    questions: {
      decision: {
        type: 'choice',
        instructions: task || 'Select the most appropriate decision for the given state and criteria.',
        criteria: criteriaMap
      }
    },
    timeoutMs
  });

  const candidate = result.answers?.decision;
  const validAnswer = candidate && Object.hasOwn(criteriaMap, candidate.choice)
    && Number.isFinite(candidate.confidence) && candidate.confidence >= 0 && candidate.confidence <= 1
    && candidate.probabilities && typeof candidate.probabilities === 'object'
    && Object.keys(criteriaMap).every(key => Number.isFinite(candidate.probabilities[key])
      && candidate.probabilities[key] >= 0 && candidate.probabilities[key] <= 1)
    && Object.keys(candidate.probabilities).every(key => Object.hasOwn(criteriaMap, key))
    && Math.abs(Object.values(candidate.probabilities).reduce((sum, p) => sum + p, 0) - 1) < 0.02;
  if (!result.ok || !validAnswer) {
    return {
      ok: false,
      decision: DECISIONS.ESCALATE_TO_GEMINI,
      confidence: 0,
      probabilities: {},
      error: result.error || 'Invalid Jev decision response',
      status: result.status,
      fallback: true,
      recommendation: 'Jev is unavailable. The calling agent (Codex or Gemini) should continue by making the decision directly.'
    };
  }

  const answer = result.answers.decision;
  return {
    ok: true,
    decision: answer.choice,
    confidence: answer.confidence ?? 0,
    probabilities: answer.probabilities ?? {},
    usage: result.usage,
    model: result.model,
    fallback: false
  };
}

/**
 * Evaluates whether a website design iteration should be accepted, revised, simplified, or retried.
 */
async function evaluateDesign({
  componentName = 'Component',
  state = '',
  rules = '',
  criteria = null,
  model = DEFAULT_MODEL
} = {}) {
  const defaultRules = `
Design Tokens:
- Palette: Paper #f7f3ec, Surface #eee9df, Ink #1c1917, Muted #645b4f, Rule #c9c1b4, Accent #3f43ea.
- Typography: Display Bricolage Grotesque (tracking -.055em), Body Public Sans (16-18px), Labels JetBrains Mono (11-12px uppercase).
- Spacing Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 120.
- Layout: Max 1360px width, 48px desktop gutters, 0px corners on editorial media, 4px on buttons. No card enclosures.
`.trim();

  const decisionCriteria = criteria || {
    ACCEPT: 'Design adheres strictly to tokens, clear hierarchy, responsive layout, and editorial feel.',
    REVISE: 'Design is acceptable overall but has specific token, spacing, or typography discrepancies.',
    SIMPLIFY: 'Design has visual clutter, unnecessary elements, excessive borders, or heavy decorative styling.',
    RETRY: 'Design breaks layout hierarchy or contradicts core brand aesthetic.',
    ESCALATE_TO_GEMINI: 'Tradeoff is non-trivial or subjective; Gemini needs to reason about requirements.'
  };

  const fullContext = `Evaluating: ${componentName}\n\nDesign Rules:\n${rules || defaultRules}`;

  return judge({
    task: `Evaluate ${componentName} design quality and compliance with design system`,
    context: fullContext,
    state,
    options: Object.keys(decisionCriteria),
    criteria: decisionCriteria,
    model
  });
}

/**
 * Chooses between multiple candidate design implementations (e.g. Variant A vs Variant B vs Neither).
 */
async function chooseVariant({
  task = 'Choose the superior UI variant',
  goal = 'Optimize visual hierarchy and design-system alignment',
  variants = {}, // e.g. { 'Variant_A': 'description...', 'Variant_B': 'description...' }
  criteria = null,
  model = DEFAULT_MODEL
} = {}) {
  const variantKeys = Object.keys(variants);
  const optionsMap = {};

  for (const key of variantKeys) {
    optionsMap[key] = `Select ${key}: ${variants[key]}`;
  }
  optionsMap['NEITHER_REVISE'] = 'Neither variant is acceptable; Gemini should revise the approach.';

  const fullState = variantKeys.map(k => `### ${k}\n${variants[k]}`).join('\n\n');

  return judge({
    task,
    context: `Goal: ${goal}`,
    state: fullState,
    criteria: criteria || optionsMap,
    model
  });
}

/**
 * Checks whether a component conforms to the established Cyrus design system.
 */
async function checkConsistency({
  componentName = 'Component',
  properties = '',
  criteria = null,
  model = DEFAULT_MODEL
} = {}) {
  const consistencyCriteria = criteria || {
    CONSISTENT: 'Fully compliant with color tokens, font families, spacing scale, and border-radius rules.',
    INCONSISTENT_TOKENS: 'Uses unauthorized colors, hex codes, or unapproved styling tokens.',
    INCONSISTENT_SPACING: 'Uses non-scale spacing values (scale is 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 120).',
    INCONSISTENT_TYPOGRAPHY: 'Uses incorrect font size, line-height, letter-spacing, or unapproved font family.',
    ESCALATE_TO_GEMINI: 'Nuanced edge case requiring Gemini contextual understanding.'
  };

  return judge({
    task: `Check design-system consistency for ${componentName}`,
    context: 'Cyrus Alcala design system (Warm editorial, strict 1360px grid, 4px button radius, 0px media radius)',
    state: properties,
    criteria: consistencyCriteria,
    model
  });
}

/**
 * Determines whether Gemini should continue iterating on a design or finalize it.
 */
async function shouldIterate({
  componentName = 'Component',
  iteration = 1,
  currentStatus = '',
  remainingIssues = [],
  model = DEFAULT_MODEL
} = {}) {
  const criteria = {
    ACCEPT_AND_STOP: 'Design is polished and meets all criteria; stop iterating to avoid over-engineering.',
    CONTINUE_ITERATING: 'Meaningful flaws remain that can be resolved in a single focused pass.',
    SIMPLIFY_CURRENT: 'Iteration is increasing complexity instead of improving clarity; prune back.',
    ESCALATE_TO_GEMINI: 'Unclear direction requiring Gemini to pause and reconsider requirements.'
  };

  const state = [
    `Current Iteration: ${iteration}`,
    `Status: ${currentStatus}`,
    `Remaining Issues: ${remainingIssues.length > 0 ? remainingIssues.join(', ') : 'None documented'}`
  ].join('\n');

  return judge({
    task: `Decide iteration continuation for ${componentName}`,
    context: 'Avoid endless polishing cycles; accept when good enough according to design rules.',
    state,
    criteria,
    model
  });
}

/**
 * Classifies a design defect to route it to the appropriate remediation action.
 */
async function classifyDesignIssue({
  description = '',
  symptoms = '',
  model = DEFAULT_MODEL
} = {}) {
  const criteria = {
    TYPOGRAPHY: 'Issue stems from font size, font family, line-height, or letter-spacing.',
    SPACING_OR_LAYOUT: 'Issue stems from padding, margins, alignment, flexbox/grid layout, or overflow.',
    COLOR_OR_CONTRAST: 'Issue relates to color tokens, background contrast, text readability, or accent usage.',
    COMPLEXITY: 'Issue is caused by too many visual elements, cards, shadows, or decorative noise.',
    RESPONSIVENESS: 'Issue manifests specifically on mobile or tablet breakpoints.',
    CONTENT_OR_COPY: 'Issue relates to wording, hierarchy of titles, or information clarity.'
  };

  const state = `Description: ${description}\nSymptoms: ${symptoms}`;

  return judge({
    task: 'Classify the root cause of this design defect',
    context: 'Cyrus Alcala portfolio redesign',
    state,
    criteria,
    model
  });
}

module.exports = {
  judge,
  evaluateDesign,
  chooseVariant,
  checkConsistency,
  shouldIterate,
  classifyDesignIssue,
  isJevConfigured,
  DECISIONS,
  DEFAULT_MODEL
};

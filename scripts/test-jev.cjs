#!/usr/bin/env node
'use strict';

const {
  judge,
  evaluateDesign,
  chooseVariant,
  checkConsistency,
  shouldIterate,
  classifyDesignIssue,
  isJevConfigured,
  DECISIONS,
  DEFAULT_MODEL
} = require('../src/jev/index.cjs');

async function runTests() {
  console.log('====================================================');
  console.log(' Jev 1.13 Integration & Smoke Test Suite');
  console.log(` Target Model: ${DEFAULT_MODEL}`);
  console.log('====================================================\n');

  let passed = 0;
  let total = 0;

  function assert(condition, name, details = '') {
    total++;
    if (condition) {
      console.log(`  [PASS] ${name}`);
      passed++;
    } else {
      console.error(`  [FAIL] ${name} ${details ? '- ' + details : ''}`);
    }
  }

  // Check 1: Key configuration check
  console.log('1. Checking Environment & Authentication Configuration...');
  const configured = isJevConfigured();
  assert(configured, 'OpenRouter API key is detected securely');

  if (!configured) {
    console.error('\nERROR: Cannot proceed with live smoke tests without OPENROUTER_API_KEY.\n');
    process.exit(1);
  }

  // Check 2: Core Smoke Test requested by specification
  console.log('\n2. Running Core Smoke Test (Retain vs Revise vs Replace)...');
  const smokeTask = 'Decide next architectural action for inquiry contact dialog';
  const smokeState = `
Component: Inquiry Dialog
Current State: Native semantic HTML dialog with progressive enhancement.
Features: Honeypot field, Google Forms direct post, fallback iframe, 4px button radius.
Design match: Uses warm paper background (#f7f3ec), ink text (#1c1917), and accent CTA (#3f43ea).
No cards, zero external client-side JS libraries.
`.trim();

  const smokeOptions = {
    RETAIN_CURRENT_COMPONENT: 'The component fulfills requirements and matches design system tokens; keep it.',
    REVISE_COMPONENT: 'The component is mostly good but needs minor styling or accessibility fixes.',
    REPLACE_COMPONENT: 'The component is obsolete or fundamentally flawed; build a new one.'
  };

  const smokeResult = await judge({
    task: smokeTask,
    state: smokeState,
    criteria: smokeOptions
  });

  assert(smokeResult.ok === true, 'Smoke test API call succeeded');
  assert(
    typeof smokeResult.decision === 'string' && smokeOptions[smokeResult.decision] !== undefined,
    `Valid decision returned: "${smokeResult.decision}"`
  );
  assert(typeof smokeResult.confidence === 'number' && smokeResult.confidence >= 0, `Confidence returned: ${smokeResult.confidence}`);
  assert(smokeResult.probabilities && Object.keys(smokeResult.probabilities).length > 0, 'Probability distribution returned');

  // Check 3: evaluateDesign() helper test
  console.log('\n3. Testing evaluateDesign() on Hero Section...');
  const evalResult = await evaluateDesign({
    componentName: 'Masthead and Hero Section',
    state: 'Hero uses Bricolage Grotesque font with -0.055em tracking, 48px desktop gutters, warm paper #f7f3ec background, and clear commercial proposition.'
  });

  assert(evalResult.ok === true, 'evaluateDesign() call succeeded');
  assert(['ACCEPT', 'REVISE', 'SIMPLIFY', 'RETRY'].includes(evalResult.decision), `evaluateDesign decision valid: "${evalResult.decision}"`);

  // Check 4: chooseVariant() helper test
  console.log('\n4. Testing chooseVariant() layout comparison...');
  const chooseResult = await chooseVariant({
    task: 'Select hero layout for CyrusAlcala.com',
    goal: 'Editorial feel, authentic portrait anchor, avoid generic SaaS aesthetic',
    variants: {
      Variant_Editorial: 'Large Bricolage display headline, subtle authentic portrait with caption, 48px gutters, no generic cards.',
      Variant_Corporate_SaaS: 'Center aligned text, floating 3D glassmorphic cards, gradient drop shadows, 5 CTA buttons.'
    }
  });

  assert(chooseResult.ok === true, 'chooseVariant() call succeeded');
  assert(typeof chooseResult.decision === 'string', `chooseVariant decision: "${chooseResult.decision}" (confidence: ${chooseResult.confidence})`);

  // Check 5: checkConsistency() helper test
  console.log('\n5. Testing checkConsistency() against Cyrus Design Tokens...');
  const consistencyResult = await checkConsistency({
    componentName: 'Service Action Button',
    properties: 'Background #3f43ea, border-radius: 4px, font: Public Sans 16px, min-height: 48px, hover #3034bc'
  });

  assert(consistencyResult.ok === true, 'checkConsistency() call succeeded');
  assert(typeof consistencyResult.decision === 'string', `checkConsistency decision: "${consistencyResult.decision}"`);

  // Check 6: Graceful Fallback Test (when API key is missing or invalid)
  console.log('\n6. Testing Graceful Fallback handling...');
  const originalKey = process.env.OPENROUTER_API_KEY;
  try {
    // Temporarily unset key to simulate unavailable Jev service
    delete process.env.OPENROUTER_API_KEY;
    const fallbackResult = await judge({
      task: 'Fallback test when offline',
      state: 'Test state'
    });

    assert(fallbackResult.ok === false, 'Fallback reports ok=false without throwing');
    assert(fallbackResult.fallback === true, 'fallback flag is true');
    assert(fallbackResult.decision === DECISIONS.ESCALATE_TO_GEMINI, 'Escalates cleanly to ESCALATE_TO_GEMINI');
    assert(typeof fallbackResult.recommendation === 'string', 'Provides actionable fallback recommendation for Gemini');
  } finally {
    process.env.OPENROUTER_API_KEY = originalKey;
  }

  // Summary
  console.log('\n====================================================');
  console.log(` Test Summary: ${passed}/${total} checks passed`);
  console.log('====================================================\n');

  if (passed === total) {
    console.log('All Jev 1.13 smoke and integration tests PASSED successfully.');
    process.exit(0);
  } else {
    console.error('Some tests failed.');
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Unhandled test runner error:', err);
  process.exit(1);
});

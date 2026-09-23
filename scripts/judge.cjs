#!/usr/bin/env node
'use strict';

const path = require('node:path');
const {
  judge,
  evaluateDesign,
  chooseVariant,
  checkConsistency,
  shouldIterate,
  classifyDesignIssue,
  DECISIONS
} = require('../src/jev/index.cjs');

function printHelp() {
  console.log(`
Jev 1.13 Judgment CLI for Codex and Gemini / Antigravity

USAGE:
  node scripts/judge.cjs [options]

TASKS:
  --task evaluate       Evaluate design iteration against design system
                        [--component <name>] [--state <text>] [--rules <text>]

  --task choose         Choose between alternative UI variants
                        [--goal <text>] [--variants <json-map>]

  --task consistency    Check component adherence to design tokens & grid
                        [--component <name>] [--state <text>]

  --task iterate        Determine whether to continue polishing or finalize
                        [--component <name>] [--iteration <num>] [--issues <comma-separated>]

  --task classify       Classify design defect to route remediation
                        [--description <text>] [--symptoms <text>]

  --task general        Generic decision primitive
                        [--options <comma-separated>] [--context <text>] [--state <text>]

JSON INPUT:
  --json '<json-payload>'   Pass complete payload directly as JSON string

EXAMPLES:
  node scripts/judge.cjs --task evaluate --component "Footer" --state "Dark background #1c1917, Public Sans text, 48px padding"
  node scripts/judge.cjs --task choose --variants '{"A":"Single column 48px padding","B":"Three column nested cards"}'
  node scripts/judge.cjs --task general --options "ACCEPT,REVISE,RETRY" --state "Uses unapproved purple #7c3aed"
`);
}

function parseArgs() {
  const args = process.argv.slice(2);
  const parsed = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--help' || arg === '-h') {
      parsed.help = true;
    } else if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const next = args[i + 1];
      if (next && !next.startsWith('--')) {
        parsed[key] = next;
        i++;
      } else {
        parsed[key] = true;
      }
    }
  }

  return parsed;
}

async function run() {
  const flags = parseArgs();

  if (flags.help || Object.keys(flags).length === 0) {
    printHelp();
    process.exit(0);
  }

  try {
    let result;

    if (flags.json) {
      const payload = JSON.parse(flags.json);
      result = await judge(payload);
    } else {
      const task = flags.task || 'general';

      switch (task) {
        case 'evaluate':
          result = await evaluateDesign({
            componentName: flags.component || 'Component',
            state: flags.state || '',
            rules: flags.rules || ''
          });
          break;

        case 'choose': {
          let variants = {};
          if (flags.variants) {
            try {
              variants = JSON.parse(flags.variants);
            } catch (_) {
              variants = {
                Variant_A: flags.variants,
                Variant_B: 'Alternative option'
              };
            }
          }
          result = await chooseVariant({
            goal: flags.goal || 'Select optimal design variant',
            variants
          });
          break;
        }

        case 'consistency':
          result = await checkConsistency({
            componentName: flags.component || 'Component',
            properties: flags.state || ''
          });
          break;

        case 'iterate':
          result = await shouldIterate({
            componentName: flags.component || 'Component',
            iteration: flags.iteration ? parseInt(flags.iteration, 10) : 1,
            remainingIssues: flags.issues ? flags.issues.split(',').map(s => s.trim()) : []
          });
          break;

        case 'classify':
          result = await classifyDesignIssue({
            description: flags.description || flags.state || '',
            symptoms: flags.symptoms || ''
          });
          break;

        case 'general':
        default: {
          const options = flags.options ? flags.options.split(',').map(s => s.trim()) : undefined;
          result = await judge({
            task: flags.instructions || flags.task || 'Make decision',
            context: flags.context || '',
            state: flags.state || '',
            options
          });
          break;
        }
      }
    }

    console.log(JSON.stringify(result, null, 2));
    process.exit(0);
  } catch (err) {
    const errorResult = {
      ok: false,
      decision: DECISIONS.ESCALATE_TO_GEMINI,
      error: 'Invalid input or unexpected CLI failure',
      fallback: true,
      recommendation: 'CLI encountered an exception; the calling agent should proceed directly.'
    };
    console.log(JSON.stringify(errorResult, null, 2));
    process.exit(0);
  }
}

run();

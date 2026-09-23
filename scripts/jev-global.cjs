#!/usr/bin/env node
'use strict';
// This file is copied to the global skill with its own pinned SDK and adapter.
const fs = require('node:fs');
const { judge } = require('../src/jev/index.cjs');

async function run() {
  if (process.argv.includes('--help')) {
    console.log('Jev 1.13: pipe JSON {task, state, context, criteria} to stdin, or pass --file <path>. Text evidence only.');
    return;
  }
  const fileIndex = process.argv.indexOf('--file');
  const input = fs.readFileSync(fileIndex >= 0 ? process.argv[fileIndex + 1] : 0, 'utf8');
  const payload = JSON.parse(input.replace(/^\uFEFF/, ''));
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)
      || typeof payload.task !== 'string' || typeof payload.state !== 'string'
      || !payload.criteria || typeof payload.criteria !== 'object' || Array.isArray(payload.criteria)
      || Object.keys(payload.criteria).length < 2
      || !Object.values(payload.criteria).every(value => typeof value === 'string')) {
    throw new Error('Invalid input');
  }
  const result = await judge(payload);
  if (result.fallback) result.decision = 'ESCALATE_TO_CODEX';
  console.log(JSON.stringify(result, null, 2));
  if (!result.ok) process.exitCode = 1;
}
run().catch(() => {
  console.log(JSON.stringify({ ok: false, decision: 'ESCALATE_TO_CODEX', fallback: true,
    error: 'Invalid JSON input or CLI failure', recommendation: 'Codex should continue directly.' }));
  process.exitCode = 1;
});

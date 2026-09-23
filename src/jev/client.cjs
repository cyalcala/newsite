'use strict';
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');

// Load only Jev settings, keeping existing process environment precedence.
function loadEnv() {
  try {
    const env = fs.readFileSync(path.resolve('.env'), 'utf8');
    for (const line of env.split(/\r?\n/)) {
      const match = line.match(/^\s*(OPENROUTER_API_KEY|OPENROUTER_BASE_URL|JEV_MODEL|JEV_API_KEY_FILE)\s*=\s*(.*?)\s*$/);
      if (match && !process.env[match[1]]) {
        process.env[match[1]] = match[2].replace(/^(['"])(.*)\1$/, '$2');
      }
    }
  } catch { /* Optional project environment. */ }
  if (!process.env.OPENROUTER_API_KEY) {
    try {
      process.env.OPENROUTER_API_KEY = fs.readFileSync(
        process.env.JEV_API_KEY_FILE || path.join(os.homedir(), 'Desktop', 'jev777.txt'), 'utf8'
      ).trim();
    } catch { /* Report missing credentials only when invoked. */ }
  }
}
loadEnv();
const DEFAULT_MODEL = 'typesafe/jev-1.13';
const DEFAULT_BASE_URL = 'https://openrouter.ai/api';
const isJevConfigured = () => Boolean(process.env.OPENROUTER_API_KEY);
const failure = (error, status) => ({ ok: false, error, status, fallback: true });

async function callSystemOne({ model = DEFAULT_MODEL, state, questions, timeoutMs = 15000 }) {
  if (model !== DEFAULT_MODEL || (process.env.JEV_MODEL && process.env.JEV_MODEL !== DEFAULT_MODEL)) {
    return failure('This integration requires typesafe/jev-1.13');
  }
  // Reject alternate hosts before transmitting the credential.
  if ((process.env.OPENROUTER_BASE_URL || DEFAULT_BASE_URL).replace(/\/+$/, '') !== DEFAULT_BASE_URL) {
    return failure('This integration requires the OpenRouter System One endpoint');
  }
  if (!isJevConfigured()) return failure('OPENROUTER_API_KEY is not configured');
  if (!Number.isFinite(timeoutMs) || timeoutMs <= 0 || timeoutMs > 30000) {
    return failure('timeoutMs must be between 1 and 30000');
  }
  try {
    const { TypeSafeClient } = require('@typesafe-ai/sdk');
    const client = new TypeSafeClient({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: DEFAULT_BASE_URL,
      timeout: timeoutMs,
      retry: { maxRetries: 0 },
      logLevel: 'off'
    });
    const response = await client.systemOne({ model, state, questions });
    if (!/^typesafe\/jev-1\.13(?:-\d{8})?$/.test(response.model || '')) {
      return failure('Provider returned an unexpected model');
    }
    return { ok: true, model: response.model, answers: response.answers, usage: response.usage };
  } catch (error) {
    // Provider errors can echo request content. Return fixed diagnostic text only.
    const status = Number.isInteger(error.status) ? error.status : undefined;
    return failure(status ? `OpenRouter request failed (HTTP ${status})` : 'Jev request failed or timed out', status);
  }
}
module.exports = { callSystemOne, isJevConfigured, DEFAULT_MODEL, DEFAULT_BASE_URL };

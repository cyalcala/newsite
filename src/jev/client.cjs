'use strict';

const fs = require('node:fs');
const path = require('node:path');

// Safe environment loading
function loadEnv() {
  if (process.env.OPENROUTER_API_KEY) {
    return;
  }
  
  // Try native Node.js loadEnvFile first
  const envPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    try {
      if (typeof process.loadEnvFile === 'function') {
        process.loadEnvFile(envPath);
      } else {
        const content = fs.readFileSync(envPath, 'utf8');
        for (const line of content.split('\n')) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith('#')) continue;
          const eqIdx = trimmed.indexOf('=');
          if (eqIdx !== -1) {
            const k = trimmed.slice(0, eqIdx).trim();
            const v = trimmed.slice(eqIdx + 1).trim();
            if (!process.env[k]) process.env[k] = v;
          }
        }
      }
    } catch (_) {
      // ignore
    }
  }

  // Fallback check to desktop jev777.txt if still missing
  if (!process.env.OPENROUTER_API_KEY) {
    const desktopKeyPath = 'C:\\Users\\admin\\Desktop\\jev777.txt';
    if (fs.existsSync(desktopKeyPath)) {
      try {
        const key = fs.readFileSync(desktopKeyPath, 'utf8').trim();
        if (key) {
          process.env.OPENROUTER_API_KEY = key;
        }
      } catch (_) {
        // ignore
      }
    }
  }
}

loadEnv();

const DEFAULT_MODEL = process.env.JEV_MODEL || 'typesafe/jev-1.13';
const DEFAULT_BASE_URL = (process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api').replace(/\/+$/, '');

function getApiKey() {
  return process.env.OPENROUTER_API_KEY || '';
}

function isJevConfigured() {
  return Boolean(getApiKey());
}

/**
 * Execute a raw System One call to OpenRouter.
 * Uses @typesafe-ai/sdk if available, with resilient native fetch fallback.
 */
async function callSystemOne({ model = DEFAULT_MODEL, state, questions, timeoutMs = 15000 }) {
  const apiKey = getApiKey();
  if (!apiKey) {
    return {
      ok: false,
      error: 'OPENROUTER_API_KEY is not configured',
      fallback: true
    };
  }

  // Attempt using @typesafe-ai/sdk first
  try {
    const sdk = require('@typesafe-ai/sdk');
    if (sdk && sdk.TypeSafeClient) {
      const client = new sdk.TypeSafeClient({
        apiKey,
        baseURL: DEFAULT_BASE_URL,
        timeout: timeoutMs
      });

      // Prepare questions compatible with SDK
      const formattedQuestions = {};
      for (const [key, q] of Object.entries(questions)) {
        if (q.type === 'choice') {
          formattedQuestions[key] = sdk.choice(q.instructions, q.criteria);
        } else if (q.type === 'noul') {
          formattedQuestions[key] = sdk.noul(q.instructions, q.criteria);
        } else if (q.type === 'score') {
          formattedQuestions[key] = sdk.score(q.instructions, q.criteria);
        } else {
          formattedQuestions[key] = q;
        }
      }

      const response = await client.systemOne({
        model,
        state,
        questions: formattedQuestions
      });

      return {
        ok: true,
        data: response,
        model: response.model || model,
        answers: response.answers,
        usage: response.usage,
        provider: response.provider || 'TypeSafe',
        id: response.id
      };
    }
  } catch (sdkErr) {
    // If SDK fails with validation or network error, attempt direct fetch fallback
    // If error is 4xx client error (e.g. auth failed), don't mask it
    if (sdkErr.status && sdkErr.status >= 400 && sdkErr.status < 500) {
      return {
        ok: false,
        error: sdkErr.message || `API error (${sdkErr.status})`,
        status: sdkErr.status,
        fallback: true
      };
    }
  }

  // Direct fetch fallback
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    const res = await fetch(`${DEFAULT_BASE_URL}/v1/systemone`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model,
        state,
        questions
      }),
      signal: controller.signal
    });

    clearTimeout(timer);

    if (!res.ok) {
      const errorText = await res.text();
      return {
        ok: false,
        status: res.status,
        error: `HTTP ${res.status}: ${errorText}`,
        fallback: true
      };
    }

    const data = await res.json();
    return {
      ok: true,
      data,
      model: data.model || model,
      answers: data.answers,
      usage: data.usage,
      provider: data.provider || 'TypeSafe',
      id: data.id
    };
  } catch (fetchErr) {
    return {
      ok: false,
      error: fetchErr.name === 'AbortError' ? 'Request timed out' : fetchErr.message,
      fallback: true
    };
  }
}

module.exports = {
  callSystemOne,
  isJevConfigured,
  DEFAULT_MODEL,
  DEFAULT_BASE_URL
};

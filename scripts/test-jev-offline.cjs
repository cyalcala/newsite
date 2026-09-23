'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { judge } = require('../src/jev/index.cjs');
const { callSystemOne, DEFAULT_MODEL } = require('../src/jev/client.cjs');
const criteria = { ACCEPT: 'Meets requirements', REVISE: 'Needs changes' };
const payload = { task: 'Review a synthetic component', state: 'Requirements met', criteria };
const valid = { model: DEFAULT_MODEL, answers: { decision: { type: 'choice', choice: 'ACCEPT',
  confidence: 0.9, probabilities: { ACCEPT: 0.9, REVISE: 0.1 } } }, usage: { input_tokens: 10, output_tokens: 2 } };

test('Jev transport and structured failure contracts', async t => {
  const original = { key: process.env.OPENROUTER_API_KEY, url: process.env.OPENROUTER_BASE_URL,
    model: process.env.JEV_MODEL, fetch: global.fetch };
  process.env.OPENROUTER_API_KEY = 'synthetic-test-credential';
  process.env.OPENROUTER_BASE_URL = 'https://openrouter.ai/api';
  process.env.JEV_MODEL = DEFAULT_MODEL;
  try {
    await t.test('sends the exact model to OpenRouter and parses a choice', async () => {
      global.fetch = async (url, init) => {
        assert.equal(url, 'https://openrouter.ai/api/v1/systemone');
        assert.equal(JSON.parse(init.body).model, DEFAULT_MODEL);
        assert.equal(new Headers(init.headers).get('Authorization'), 'Bearer synthetic-test-credential');
        return Response.json(valid);
      };
      assert.equal((await judge(payload)).decision, 'ACCEPT');
    });
    await t.test('rejects another model and host before network access', async () => {
      global.fetch = async () => { throw new Error('Network must not be called'); };
      assert.match((await judge({ ...payload, model: 'typesafe/jev-latest' })).error, /requires/);
      process.env.OPENROUTER_BASE_URL = 'https://example.invalid/api';
      assert.match((await judge(payload)).error, /requires/);
      process.env.OPENROUTER_BASE_URL = 'https://openrouter.ai/api';
    });
    await t.test('missing key produces a non-blocking fallback', async () => {
      delete process.env.OPENROUTER_API_KEY;
      assert.equal((await judge(payload)).fallback, true);
      process.env.OPENROUTER_API_KEY = 'synthetic-test-credential';
    });
    await t.test('HTTP errors never expose response bodies or retry', async () => {
      let calls = 0;
      global.fetch = async () => { calls++; return new Response('synthetic-test-credential', { status: 401 }); };
      const result = await judge(payload);
      assert.equal(result.status, 401);
      assert.equal(result.fallback, true);
      assert.equal(JSON.stringify(result).includes('synthetic-test-credential'), false);
      assert.equal(calls, 1);
    });
    await t.test('timeout cancels the request and does not retry', async () => {
      let calls = 0;
      global.fetch = (_, init) => new Promise((resolve, reject) => {
        calls++;
        init.signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')), { once: true });
      });
      assert.equal((await judge({ ...payload, timeoutMs: 20 })).fallback, true);
      assert.equal(calls, 1);
    });
    await t.test('unknown choice, invalid probabilities and model mismatch fail closed', async () => {
      for (const body of [
        { ...valid, model: 'typesafe/jev-2' },
        { ...valid, answers: { decision: { ...valid.answers.decision, choice: 'UNKNOWN' } } },
        { ...valid, answers: { decision: { ...valid.answers.decision, probabilities: { ACCEPT: 0.2, REVISE: 0.1 } } } },
        { ...valid, answers: {} }
      ]) {
        global.fetch = async () => Response.json(body);
        assert.equal((await judge(payload)).fallback, true);
      }
    });
    await t.test('invalid timeout is rejected', async () => {
      assert.equal((await callSystemOne({ timeoutMs: Infinity })).fallback, true);
    });
  } finally {
    global.fetch = original.fetch;
    for (const [key, value] of Object.entries({ OPENROUTER_API_KEY: original.key,
      OPENROUTER_BASE_URL: original.url, JEV_MODEL: original.model })) {
      if (value === undefined) delete process.env[key]; else process.env[key] = value;
    }
  }
});

# Jev 1.13 Judgment Layer Integration

This document defines the architecture, configuration, operational guidelines, and usage patterns for the **Jev 1.13** judgment layer integrated into `cyrusalcala.com`.

---

## 1. Executive Summary & Purpose

The Jev judgment layer acts as a fast, calibrated, structured decision primitive for **Gemini operating inside Antigravity** during the ongoing redesign of Cyrus Alcala's personal website.

### Operating Model

```text
                   ANTIGRAVITY

                       │
                       ▼

                    GEMINI
              reasoning + coding
              design implementation

                │             │
                │             │
                ▼             ▼

           Implementation    JEV (System One)
                            judgment
                            routing
                            evaluation

                                │
                                ▼

                         structured decision
                       (calibrated probabilities)

                                │
                                ▼

                              GEMINI

                                │
                                ▼

                          next iteration
```

- **Gemini's Role**: Deep reasoning, code generation, CSS styling, responsive layout implementation, bug-fixing, creative prose.
- **Jev's Role**: Fast (70–500ms), bounded decisions, choosing between alternative UI candidates, evaluating against design tokens, determining whether to continue or stop iterating, classifying design defects.

---

## 2. Technical Specifications & Dependencies

- **Model Version**: `typesafe/jev-1.13` (System One decision model by TypeSafe AI, version `1.13.0`).
- **Provider**: OpenRouter API (`https://openrouter.ai/api/v1/systemone`).
- **Installed Package**: `@typesafe-ai/sdk` (`^0.6.0`).
- **Zero-Dependency Core**: The static site generation pipeline (`scripts/build-site.cjs` and `scripts/validate-site.cjs`) remains 100% dependency-free.
- **Resilient Transport**: `src/jev/client.cjs` uses `@typesafe-ai/sdk` with an automatic Node 22 native `fetch` fallback.

---

## 3. Configuration & Secret Management

### Environment Variables

| Variable | Description | Default |
|---|---|---|
| `OPENROUTER_API_KEY` | Secret OpenRouter API key | *Required* (loaded from `.env` or `jev777.txt`) |
| `JEV_MODEL` | Pinned Jev model identifier | `typesafe/jev-1.13` |
| `OPENROUTER_BASE_URL` | Base URL for OpenRouter API | `https://openrouter.ai/api` |

### Security Safeguards

- The API key was transferred securely from `C:\Users\admin\Desktop\jev777.txt` to `.env`.
- `.env`, `.env.*`, `*jev777*`, and `jev777.txt` are explicitly ignored in `.gitignore`.
- Keys are never logged, printed to console, or included in test outputs.
- A sanitized `.env.example` template is committed to the repository for onboarding.

---

## 4. Architectural Boundaries: Do's and Don'ts

| Task Type | Handled By | Rationale |
|---|---|---|
| Evaluating whether a component meets design tokens | **JEV** | Bounded rubric evaluation with confidence score |
| Choosing between Variant A vs Variant B vs Neither | **JEV** | Fast comparative selection with probability distribution |
| Deciding when an iteration is polished enough to stop | **JEV** | Prevents endless over-polishing loops |
| Classifying a layout defect (e.g. typography vs spacing) | **JEV** | Direct routing to remediation focus |
| Writing CSS rules, classes, or grid properties | **GEMINI** | Open-ended code synthesis is Gemini's responsibility |
| Creating semantic HTML or progressive enhancement JS | **GEMINI** | Full implementation requires contextual coding |
| Fixing complex responsive edge cases | **GEMINI** | Multi-file reasoning and debugging |
| Writing portfolio copy, case descriptions, resumes | **GEMINI** | Jev is a non-generative decision model; it does not write prose |

---

## 5. Usage Reference for Gemini & Developers

### Option A: Programmatic Import (CommonJS)

```javascript
const {
  judge,
  evaluateDesign,
  chooseVariant,
  checkConsistency,
  shouldIterate,
  classifyDesignIssue,
  DECISIONS
} = require('./src/jev/index.cjs');

// 1. Generic Bounded Judgment
const result = await judge({
  task: 'Decide button styling',
  state: 'Background #3f43ea, border-radius 4px, font Public Sans',
  options: ['ACCEPT', 'REVISE', 'RETRY']
});
console.log(result.decision);     // "ACCEPT"
console.log(result.confidence);   // 0.85
console.log(result.probabilities);// { ACCEPT: 0.85, REVISE: 0.12, RETRY: 0.03 }

// 2. Evaluate Design against Cyrus Tokens
const review = await evaluateDesign({
  componentName: 'Work Card',
  state: 'Uses #eee9df surface, 24px padding, 0px image corner radius, no generic card shadow'
});

// 3. Compare UI Variants
const choice = await chooseVariant({
  task: 'Choose hero layout',
  goal: 'Editorial personality with authentic portrait',
  variants: {
    Variant_A: 'Left-aligned Bricolage headline with right-aligned portrait and caption',
    Variant_B: 'Centered corporate layout with 3D glassmorphic background'
  }
});

// 4. Consistency Audit
const audit = await checkConsistency({
  componentName: 'Navigation Link',
  properties: 'Color: #1c1917, hover: #3f43ea, font-size: 14px'
});
```

### Option B: CLI Invocation (Antigravity Friendly)

Gemini can invoke Jev via `scripts/judge.cjs` from the shell:

```bash
# Evaluate a component against design rules
node scripts/judge.cjs --task evaluate --component "Masthead" --state "Warm paper #f7f3ec, Bricolage display logo"

# Choose between layout variants
node scripts/judge.cjs --task choose --goal "Editorial warmth" --variants '{"A":"48px gutters, single column","B":"Nested 3-column cards"}'

# Check consistency against design tokens
node scripts/judge.cjs --task consistency --component "Action Button" --state "Background #3f43ea, 4px border-radius"

# General structured decision
node scripts/judge.cjs --task general --options "ACCEPT,REVISE,RETRY" --state "Text contrast is 8.5:1"
```

The CLI outputs clean, parseable JSON:
```json
{
  "ok": true,
  "decision": "ACCEPT",
  "confidence": 0.88,
  "probabilities": {
    "ACCEPT": 0.88,
    "REVISE": 0.10,
    "RETRY": 0.02
  },
  "usage": {
    "input_tokens": 420,
    "output_tokens": 48,
    "cost": 0.00001764
  },
  "model": "typesafe/jev-1.13-20260917",
  "fallback": false
}
```

---

## 6. Graceful Degradation & Fallback Strategy

Jev is strictly additive and non-blocking:
1. **Network or Key Failure**: If OpenRouter is unreachable, timed out, or credentials are invalid, all Jev functions return:
   ```json
   {
     "ok": false,
     "decision": "ESCALATE_TO_GEMINI",
     "confidence": 0,
     "probabilities": {},
     "error": "Error description",
     "fallback": true,
     "recommendation": "Jev judgment unavailable. Gemini should make the decision directly."
   }
   ```
2. **Never Blocks Build**: The website build (`node scripts/build-site.cjs`) never depends on Jev.
3. **No Exceptions**: Uncaught network errors are caught internally; callers receive structured fallback objects rather than thrown crashes.

---

## 7. Verification & Smoke Testing

To run the complete automated smoke test suite:

```bash
npm run test:jev
```

Or directly:
```bash
node scripts/test-jev.cjs
```

The smoke suite verifies:
1. Secure environment variable loading.
2. Core 3-way decision test (`RETAIN_CURRENT_COMPONENT`, `REVISE_COMPONENT`, `REPLACE_COMPONENT`).
3. `evaluateDesign()` with sample hero section.
4. `chooseVariant()` layout comparison.
5. `checkConsistency()` design token verification.
6. Offline/failure fallback escalation to `ESCALATE_TO_GEMINI`.

# Jev 1.13 integration for Codex and Gemini

Jev is a hosted decision model, not a locally installed model binary. Model: `typesafe/jev-1.13`. Official client: `@typesafe-ai/sdk@0.6.0`, exactly pinned in the project and global skill. No latest alias or alternate provider is used.

The [official OpenRouter SDK guide](https://openrouter.ai/docs/guides/community/typesafe-sdk) confirms the SDK and endpoint `https://openrouter.ai/api/v1/systemone`. Responses can name a dated 1.13 snapshot, such as `typesafe/jev-1.13-20260917`.

## Architecture

`Codex/Gemini -> Node CLI -> src/jev/index.cjs -> official SDK -> OpenRouter -> structured judgment -> calling agent`

Jev is development tooling. The static Node/CommonJS website builds without calling Jev. Nothing is added to the browser bundle or Cloudflare deployment.

- `src/jev/client.cjs`: credential resolution, fixed model/provider, 15-second default timeout, no SDK logs, sanitized errors, no automatic retries.
- `src/jev/index.cjs`: judge plus existing evaluateDesign, chooseVariant, checkConsistency, shouldIterate, classifyDesignIssue helpers. Portfolio helpers retain Cyrus design rules.
- `scripts/judge.cjs`: existing project CLI, usable by Codex and Gemini.
- `scripts/jev-global.cjs`: generic JSON CLI for the global skill. Requires explicit criteria; maps fallback to ESCALATE_TO_CODEX.

The global CLI calls only generic judge, never the portfolio helpers. Its adapter and SDK are installed independently, so it works when this repository is closed, moved, or unavailable.

## Codex across projects

Installed at `C:/Users/admin/.codex/skills/jev/`, with automatic skill selection enabled. A Jev section in `C:/Users/admin/.codex/AGENTS.md` directs Codex to consult it at meaningful app/website decision boundaries. Existing instructions are preserved. Project AGENTS.md documents the local integration.

New tasks load global instructions. If an open task has cached its skill catalog, start a new task or reopen Codex; the CLI is available immediately. This applies to this computer's local Codex installation, not cloud environments or other computers.

Use Jev for comparing alternatives, explicit rule compliance, regression classification, and iteration acceptance. Codex still codes, debugs, inspects screenshots, runs tests, and owns the final decision. Jev receives text evidence, not screenshots. Its confidence is advisory, not proof. Skip trivial edits and avoid repeated calls seeking a preferred answer.

From any project, create a non-secret decision.json:

```json
{
  "task": "Choose next action",
  "state": "The component meets the project's documented spacing rules and passed keyboard testing.",
  "criteria": {
    "ACCEPT": "All requirements met",
    "REVISE": "An explicit requirement is unmet",
    "ESCALATE_TO_CODEX": "Insufficient evidence"
  }
}
```

```powershell
node "$env:USERPROFILE/.codex/skills/jev/scripts/judge.cjs" --file decision.json
```

The CLI also accepts JSON on stdin and --help. Optional input: context, timeoutMs (1-30000). Output: ok, decision, confidence, probabilities, model, usage, fallback. Exit 1 means invalid input/unavailable Jev; Codex continues directly. The project CLI retains its original exit-zero fallback contract; inspect ok/fallback.

Project example:

```powershell
npm run judge -- --task evaluate --component Hero --state "Observed portfolio properties"
```

Send concise task-relevant evidence to OpenRouter, never credentials, private user records, or entire repositories. Calls incur OpenRouter usage.

## Configuration

| Variable | Purpose |
| --- | --- |
| OPENROUTER_API_KEY | Credential; process environment wins over project .env |
| JEV_API_KEY_FILE | Optional fallback key-file path; default ~/Desktop/jev777.txt |
| JEV_MODEL | Optional; only typesafe/jev-1.13 accepted |
| OPENROUTER_BASE_URL | Optional; only https://openrouter.ai/api accepted |

The supplied Desktop credential was verified against the project's ignored .env. Other projects need no credential copy: the global runner reads the original key file. .env, .env.* except .env.example, and *jev777* are ignored. No secret is stored in the skill or agent instructions. The loader reads only the four named settings; use simple unquoted or matching quoted values without inline comments or interpolation.

Provider errors and SDK logs are suppressed. Model/provider mismatches fail before sending credentials. Answers require a known choice, finite confidence, and complete probability distribution. Failures return ok:false and fallback:true. The project retains ESCALATE_TO_GEMINI for compatibility, with a recommendation applicable to Codex too; the global runner uses ESCALATE_TO_CODEX. There is no alternate-model failover or automatic retry.

## Install and verify

Node >=20 is required; verified on Node 22.13.1.

```powershell
npm ci --ignore-scripts
npm run install:jev:codex
npm run test:jev:offline
npm run test:jev
npm run build
npm run validate
```

The installer honors CODEX_HOME, otherwise ~/.codex. It copies the adapter, generic CLI, skill instructions and lockfile, installs the pinned SDK, and appends global routing instructions once. Re-run after adapter updates. Gemini configuration is untouched. docs/jev-skill.md is the maintained skill source.

Verification on 2026-09-23:
- Existing live suite: 15/15 passed, including authentication, decisions, helpers, and missing-key fallback.
- Offline suite: 7 behavioral cases plus parent test passed, covering timeouts, no retries, safe errors, fixed provider/model, and malformed answers.
- Global invocation outside the repository: ACCEPT, model typesafe/jev-1.13-20260917.
- SDK installation audit: zero reported vulnerabilities.
- Skill validator passed; Node syntax checks passed.
- Site build produced 11 pages. The current validator reports 11 `missing main` issues because concurrent website edits added attributes to main while the unchanged validator requires the exact string `<main id="main">`. This unrelated validator mismatch is not caused by Jev. The pre-existing QA report was preserved.
- Secret audit checked working-tree files, Git index/diff, Git logs, global skill, and global instructions without printing the key; no matches outside the intended ignored credential configuration were found.
- No dedicated lint or TypeScript checks are configured; Node syntax checks complement the static build and validator.

Live tests make small billable calls. Offline tests mock transport. No deployment is required.

## Troubleshooting and removal

Missing key: check variable/file presence without printing contents. A process variable or project .env overrides the Desktop fallback. HTTP 401/403: check key permissions. HTTP 402: check balance. HTTP 429: resume later. Timeout: continue directly and check connectivity. Invalid model/URL: restore exact defaults. Invalid answer: improve criteria/evidence and reason directly. Missing SDK: run the installer again.

To disable globally, remove only the Jev section from global AGENTS.md and the ~/.codex/skills/jev directory. Project tools remain usable. No background service needs stopping. Project removal involves its adapter, CLI, dependency, npm scripts, and Jev instructions; the static build is independent.

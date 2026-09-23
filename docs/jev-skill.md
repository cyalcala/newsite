---
name: jev
description: Consult Jev 1.13 through OpenRouter for bounded app and website decisions, comparing alternatives, checking explicit design rules, and deciding whether to revise or finish an iteration.
---

# Jev judgments for Codex

Use Jev at meaningful decision boundaries across app and website projects when an independent bounded judgment adds value. Codex owns implementation and the final decision. Skip trivial edits, open-ended creation, debugging, and decisions already settled by deterministic tests.

Read the current project's instructions and actual design rules first. Supply concise text observations, explicit criteria, and two or more alternatives. Include a revise/neither/escalate option where useful. Never import the portfolio's colors, fonts, or spacing rules into other projects. Jev receives text, not screenshots: inspect the UI yourself and provide measured observations; do not claim Jev visually inspected it.

Run from the current project using PowerShell (resolve the skill folder containing this file):

```powershell
@'
{"task":"Choose the next action","state":"The button meets the project's size and contrast requirements; keyboard activation was tested.","criteria":{"ACCEPT":"All stated requirements are met","REVISE":"A stated requirement remains unmet","ESCALATE_TO_CODEX":"Evidence is insufficient"}}
'@ | node "$env:USERPROFILE/.codex/skills/jev/scripts/judge.cjs"
```

The CLI also accepts `--file <json-path>` and `--help`. Use the actual skill path if CODEX_HOME is customized. Input keys: task (string), state (string), criteria (map of labels to descriptions), optional context (string) and timeoutMs (1–30000; default 15000). Model is fixed to typesafe/jev-1.13. Output: ok, decision, confidence, probabilities, model, usage, fallback. Exit 1 means unavailable or invalid input; continue directly rather than blocking the project.

Send only task-relevant non-secret evidence to OpenRouter. Never include credentials, private user records, or whole repositories. The runner reads OPENROUTER_API_KEY, the working directory's .env, or JEV_API_KEY_FILE (default ~/Desktop/jev777.txt), without printing it. Do not read the key into the conversation. SDK logging is disabled. Calls incur OpenRouter usage.

One call per meaningful decision is normally enough. Do not retry repeatedly for a preferred answer. Low confidence, missing evidence, or disagreement with test results means Codex reasons directly and gathers evidence. Jev's answer is advice, not proof of correctness, permission, or a replacement for accessibility/security/testing checks. Network, authentication, or timeout failures should not interrupt development. No automatic failover to a different model or provider.

This is a local development skill, not a browser dependency or a background service. Node >=20 and the bundled @typesafe-ai/sdk 0.6.0 are required. The source repository's scripts/install-jev-codex.cjs refreshes the skill and installs its pinned dependency. See docs/jev-integration.md in that repository for maintenance and removal.

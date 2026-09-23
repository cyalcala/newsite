# Project workflow

This is a static Node/CommonJS site deployed from `build/` to Cloudflare Pages.
Read README.md before editing. Source templates: src/pages.cjs; styling: src/site.css;
browser enhancements: src/site.js. Build with `npm run build`, then `npm run validate`.
No .ai/manifest.yaml is currently present.

## Jev 1.13

Use the global Jev skill for meaningful bounded app/website decisions. For this
portfolio, `npm run judge -- --task evaluate --component "Name" --state "Observed properties"`
also exposes the existing project-specific design helpers. See docs/jev-integration.md.
Use actual project rules and measured evidence. Codex owns implementation, browser
inspection, and final judgment; Jev is advisory and must not block development.
Keep credentials out of prompts, source, output, and the static browser bundle.
Run `npm run test:jev:offline` after changing the adapter. `npm run test:jev` makes
small billable OpenRouter calls and verifies real authentication.

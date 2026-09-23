# cyrusalcala.com

Cyrus Alcala's portfolio and commercial website. Live at https://cyrusalcala.com, hosted by Cloudflare Pages project `cyrusalcala`.

## Build and preview

Requires Node.js; the build has no package dependencies.

```sh
node scripts/build-site.cjs
node scripts/validate-site.cjs
npx serve build -l 4178
```

Edit `src/pages.cjs` for content and page templates, `src/site.css` for layout, and `src/site.js` for progressive enhancements. `src/fonts.css` defines locally hosted fonts. Rebuild after edits; do not edit generated HTML directly.

## Structure

- `build/`: complete deployable static site, original video samples, posters, photographs and downloads.
- `src/`: readable source for Home, Work, Services, About, Hire Me, four work pages and 404.
- `scripts/build-site.cjs`: generates HTML, CSS, JavaScript, metadata, sitemap, robots and headers.
- `scripts/validate-site.cjs`: validates local links, fragments, page structure and preserved media.
- `scripts/check-deployment.cjs`: checks deployed routes, downloads and 404 behavior.
- `docs/overhaul/`: Design Loop evidence, decisions, independent reviews, screenshots and release records.
- Original `.dc.html` files, `assets/`, `uploads/`, `support.js` and `scripts/tpl.js`: retained legacy/source material.

The new site renders complete content without JavaScript. Native details elements provide disclosures and mobile navigation. Videos use native controls and `preload="none"`; a small enhancement prevents simultaneous playback.

## Content and evidence

The four offers are websites, AI video, social media, and AI systems/automation. Website starter pricing is explicitly scoped. Case studies distinguish working projects and demonstrations from client outcomes. Do not add unverified metrics, clients or testimonials.

The Google AI Professional Certificate is documented from Cyrus's supplied PDF, with Coursera and PDF links on Hire Me. Grok Bots is a user-reported capability. See `docs/overhaul/credential-evidence.md` and `portfolio-evidence.md` for provenance.

## Deploy

```sh
npx wrangler pages deploy build --project-name=cyrusalcala --branch=main
node scripts/check-deployment.cjs https://cyrusalcala.com
```

Use a separate branch name for a Cloudflare preview. Verify the deployed HTML and MIME types as well as HTTP status. Generated review-frame HTML is local QA only and must not ship.

## Backup and rollback

The complete pre-overhaul tracked repository is preserved in the pushed tag `backup/pre-design-loop-2026-09-13` at commit `fd28b17f97771e81bbc872e54730ab74a11c25f9`. The original served bundle is also archived under `docs/overhaul/archive/`. No original video or source archive was removed.

For rollback, check that tag out in a separate directory and deploy its `build/` directory to the same Pages project. Avoid resetting an active working copy. The extraction and asset-finishing scripts document one-time migration steps; they are not part of the normal build.

Design rules and verification limits are recorded in `docs/overhaul/design-system.md` and `docs/overhaul/qa-summary.md`.

## Unified inquiries

All outreach actions use the published Google Form configured in `src/contact.cjs`. Change that single URL/label, then rebuild to update every page. See `docs/unified-contact/README.md` for the form structure, owner workflow, backup and validation. Do not reintroduce separate mailto or calendar calls to action without an explicit change in the contact strategy.

## Jev 1.13 judgment layer

A structured decision layer using **Jev 1.13** (`typesafe/jev-1.13`) via OpenRouter, available to Codex and Gemini to evaluate bounded UI choices, tokens, and redesign iterations.

```sh
# Install/refresh the Codex skill across local projects
npm run install:jev:codex

# Offline tests (no API calls)
npm run test:jev:offline

# Run live smoke tests
npm run test:jev

# CLI judgment
npm run judge -- --task evaluate --component "Header" --state "Warm paper #f7f3ec, Bricolage display logo"
```

See [docs/jev-integration.md](docs/jev-integration.md) for full architecture, API reference, and operational boundaries.

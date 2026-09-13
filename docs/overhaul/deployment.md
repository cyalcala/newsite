# Release record

The overhaul is authorized for the existing Cloudflare Pages project cyrusalcala and its existing domains. No unrelated project or DNS record was changed.

Pre-overhaul backup: pushed Git tag backup/pre-design-loop-2026-09-13, commit fd28b17f97771e81bbc872e54730ab74a11c25f9.

Reviewed preview: https://e543b26d.cyrusalcala.pages.dev (branch codex-design-loop-preview). All17 route/download checks passed. Final typography and spacing corrections were rebuilt and checked locally after this preview. Production release details are appended after deployment succeeds.

## Production deployment — 2026-09-13

- Source/build commit: 78a78c9d483263faffb9a49452f552309ded6209 (pushed to origin/main and independently confirmed with ls-remote).
- Command: npx wrangler pages deploy build --project-name=cyrusalcala --branch=main
- Result: success; deployment https://0b2e59e5.cyrusalcala.pages.dev
- Live custom domain: https://cyrusalcala.com
- All17 production route/download checks passed; expected PDF, DOCX, CSS, JavaScript, image and sitemap MIME types confirmed. The unknown route returns404.
- Custom-domain browser capture confirms the refreshed heading, layout and real portrait with no horizontal overflow or console errors. See qa/production-home.png and qa/production-http.json.
- Cloudflare modifies custom-domain responses (including its managed robots response and email protection), so HTML/robots byte counts differ from the direct Pages preview. The shared CSS matches the final build at22739 bytes.

The subsequent documentation commit adds this deployment record and production evidence; it does not change the deployed site artifact. The original backup tag remains remotely available.

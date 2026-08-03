repo: cyalcala/newsite
branch: main

# Cyrus Alcala — Website

The go-to person for AI builds (AI video content · workflow automation · consulting).
Relaunch of cyrusalcala.com. Deployed via Cloudflare Pages.

## Source of truth
- `Cyrus Alcala.dc.html` — the site (Design Component: template + logic + tweak props). EDIT THIS.
- `build/index.html` — compiled, self-contained deploy artifact (all images/CSS/JS inlined). GENERATED from the source; do not hand-edit. Re-compile after source changes.
- `assets/headshot-dark.webp` — hero portrait (charcoal sweater).
- `assets/headshot-polo.webp` — About portrait (indigo polo).
- `assets/Cyrus-Alcala-Resume.docx` — résumé download.
- `Cyrus Alcala — Directions.dc.html` — early positioning brief + 3 visual directions (kept for reference; NOT part of the live site).

## Deploy (Claude Code)
Cloudflare Pages, project serves `build/` as web root:
    wrangler pages deploy build --project-name=<cf-project>
Then attach custom domain cyrusalcala.com to the Pages project (Cloudflare dashboard → Pages → Custom domains). Confirm og:image/twitter:image absolute URLs point to https://cyrusalcala.com/assets/headshot-dark.webp.

## Screen map
| Screen | Built from |
| --- | --- |
| Full one-page site (hero, What I build, How it works, Track record, About, Building in public, Contact/footer) | `Cyrus Alcala.dc.html` → `build/index.html` |

## Last sync
date: 2026-08-03
### Updated in this project
- Built the relaunch one-page site from résumé + LinkedIn + brand positioning.
- Positioning: go-to for AI builds — video content, workflow automation, consulting; 80% win-clients / 20% build-in-public.
- Placed real headshots; added OG/Twitter share meta.
- Compiled self-contained `build/index.html` for Cloudflare Pages.

## Pending
- Swap "Book a call" CTAs to a Google Calendar Appointment Schedule link (calendar.app.google/…) once provided; email mailto is the current fallback.
- Optional: dedicated 1200×630 social share card; replace placeholder LinkedIn post titles in "Building in public" with real posts.

# HVAC Ad Crew Feature Integration & Native Inquiry Form

**Project**: CyrusAlcala.com (`c:\Users\admin\Desktop\cyrusalcala-newsite`)  
**Integrated Project**: HVAC Ad Crew (`https://hvacadcrew.com`, local source `c:\Users\admin\Desktop\ad-agency-cyrus`)  
**Date**: September 2026  
**Status**: Completed & Verified (0 validation errors, 11 static pages)

---

## 1. Executive Summary & Objective

The goal of this initiative was twofold:
1. **Surgically integrate HVAC Ad Crew** into CyrusAlcala.com as a featured commercial project demonstrating Cyrus Alcala’s capabilities in conversion website design, web development, offer architecture, and short-form AI video advertising.
2. **Replace the external Google Form link** across the entire portfolio with a native, high-contrast, professionally styled inquiry form in the footer while seamlessly retaining Cyrus's active Google Forms endpoint as the backend response destination.

### Core Directives & Constraints
- **Commercial Selling Power**: The project is framed as an active commercial system and proof of capability—not an academic "case study" (per explicit instruction, the term "case study" was removed site-wide).
- **Brand Identity Separation**: HVAC Ad Crew remains an independent brand. Its dark screening-room aesthetic (`#0c0b0a`, warm amber `#f59e0b`) is encapsulated inside its showcase and media players, preserving CyrusAlcala.com's editorial design system (warm paper `#f7f3ec`, ink `#1c1917`, cobalt `#3f43ea`, Bricolage Grotesque + Public Sans).
- **Zero Hallucination**: No fabricated client ROI, ROAS, or artificial metrics. The project is presented truthfully as an independent commercial build and vertical business system.
- **Form Resiliency**: Submissions post directly to Google Forms without navigating the visitor away from the site, supported by client validation, honeypot spam protection, and a manual Google Form fallback link.

---

## 2. Integrated Pages & Routing Architecture

| Route | Role | Integration Details |
|---|---|---|
| `/work/hvac-ad-crew/` | Dedicated Project Showcase | Full breakdown of offer design, website architecture, and 6 curated commercial AI video ads with rationales and script quotes. |
| `/` (Homepage) | Hero Work Item | Positioned as `01 / HVAC AD CREW` in `SELECTED WORK / 2026` with real desktop UI screenshot. |
| `/work/` | Portfolio Index | Positioned as `01 / WEB & AI VIDEO` with live project link and full build overview. |
| `/services/` | Proof Links | Integrated into `01 / Websites` ("See HVAC Ad Crew for an example of a fast, focused conversion landing page") and `02 / AI video` ("See the 6 sample ads in the HVAC Ad Crew build"). |
| `/work/video/` | Creative Cross-link | Featured in the AI video production portfolio as an applied commercial campaign. |
| All 11 Pages | Global Footer (`#contact`) | Native inquiry form embedded in the dark footer across every page. |

---

## 3. Assets & Media Pipeline

All assets were imported locally into CyrusAlcala.com's asset pipeline:

- **Commercial AI Video Ads** (`build/assets/hvac/`):
  - `ad6-phone-bill.mp4` + `ad6-phone-bill.jpg` (Angle 01: Financing / Price objection reframing)
  - `ad1-same-house.mp4` + `ad1-same-house.jpg` (Angle 02: Energy costs / Punchy utility bill hook)
  - `ad8-membership.mp4` + `ad8-membership.jpg` (Angle 03: Membership / Monthly recurring revenue)
  - `ad7-vents.mp4` + `ad7-vents.jpg` (Angle 04: Air quality / Invisible problem made visceral)
  - `ad2-fall-rush.mp4` + `ad2-fall-rush.jpg` (Angle 05: Seasonal urgency / Shoulder season booking)
  - `ad5-before-after.mp4` + `ad5-before-after.jpg` (Angle 06: Visual proof / Clean silent installation reel)
- **UI Screenshots** (`build/assets/projects/`):
  - `hvac-ad-crew.webp` (Desktop UI capture, 1280px)
  - `hvac-ad-crew-mobile.webp` (Mobile UI capture, 390px)

---

## 4. Native Inquiry Form Implementation

### Form Endpoint & Field Mapping
The native form posts to Cyrus's live Google Form response handler:
- **Action URL**: `https://docs.google.com/forms/d/e/1FAIpQLSenJuHOxItC77bmI8-NOXxlWSe9aqQRHDt6HlMerQXPgHKB8A/formResponse`
- **Name Field**: `entry.25383299` (Required)
- **Email Field**: `entry.668403667` (Required)
- **Service Field**: `entry.1640468941` (Choice chips: Websites, AI video, Social media, AI systems and automation, Hiring opportunity, Something else)
- **Details Field**: `entry.923088650` (Required textarea)
- **Channel Field**: `entry.377038454` (Choice chips: Email, Messenger)
- **Honeypot Anti-Spam**: `inquiry_hp` (Hidden; bots filling this are dropped silently)

### Progressive Enhancement Flow
1. **Validation**: JavaScript checks required inputs and email format on submit. Invalid inputs receive accessible inline error messages and visual focus outlines.
2. **Submission**:
   - Asynchronous `fetch` with `mode: 'no-cors'` posts payload directly to Google Forms.
   - If `fetch` fails or is blocked by network extensions, the form falls back to submitting via the hidden `<iframe>` target (`hidden_form_iframe`), ensuring 100% submission delivery.
3. **Success State**: Form hides with `[hidden]` and `.inquiry-success` reveals smoothly, presenting:
   > **01 / INQUIRY SENT**  
   > **Thanks — I have what I need to take a look.**  
   > I’ll review what you shared and reply using the contact details you provided.  
   > *[Send another inquiry ↺]*
4. **Fallback Link**: A direct link to Google Forms is provided below the submit button for visitors preferring the external form.

---

## 5. Quality Assurance & Verification Results

1. **Static Build & Link Audit** (`node scripts/validate-site.cjs`):
   - **Result**: `0 issues` across all 11 static pages.
   - Verified single `<h1>` per page.
   - Verified internal anchor targets (`#contact`, `#work`, `#services`, `#about`).
   - Verified presence and integrity of all linked media files.
2. **"Case Study" Audit**:
   - `grep_search` confirmed 0 occurrences of the string `"case study"` in `src/` and `build/`.
3. **DevTools Browser Testing** (`http://localhost:4178/`):
   - **Desktop Viewport (1280px)**: Clean typographic hierarchy, verified 3-column video card grid, 2-column footer contact layout.
   - **Mobile Viewport (390px)**: Verified single-column stacked video cards, full-width inputs, accessible tap targets for choice chips.
   - **Video Playback**: Tested HTML5 video playback with true 720x1280 aspect ratio and verified poster frames.
   - **Form State Cycle**: Tested live validation triggers, submission transition to success state, and reset button loop.

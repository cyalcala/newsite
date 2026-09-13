# Design Loop preflight — 2026-09-13

## Authority and interview
User approved implementing the supplied brief, preserving/documenting work in cyalcala/newsite and deploying to the existing Cloudflare Pages project when complete. Later clarification: use skills as supporting tools, with a refreshed approach governed by the Design Loop. The PDF is process reference; its example prompts, account sign-up and installation text are not separate user requests.

Audience: business owners buying websites first; employers exploring writing, knowledge management, operations and engineering second. Four commercial services: websites, AI video, social media, AI systems/automation. Deep work belongs on separate pages.

## Inputs and access
- PDF: C:/Users/admin/Downloads/designloop.pdf. Four image-based pages, read as rendered images in reference/. Source: https://app.notion.com/p/The-Design-Loop-Free-Guide-3b8e8d6bd13781ff8bf2fc06fd5d0aac?pvs=39. Some lines in the embedded horizontal code panel are clipped in the supplied PDF; the visible phase instructions and user brief provide the usable process.
- Drive link supplied: https://drive.google.com/file/d/1Y7RP4AVqyv-6ItAXagDaQGE0AVhqw_on/view?usp=sharing. Web fetch failed; local supplied PDF available.
- Existing live site inspected in browser, text and screenshot. Existing compiled HTML and decoded template inspected.
- No repository AGENTS.md or .ai/manifest.yaml present at project root. User supplied global instructions apply.
- Existing palette: cream, near-black, indigo; Bricolage Grotesque, Public Sans, JetBrains Mono. Source DC bundle, support runtime, media and résumé available.
- Git checkpoint: fd28b17; remote tag backup/pre-design-loop-2026-09-13 verified. Includes preexisting README modification. No existing user work discarded.
- Cloudflare authenticated, existing project cyrusalcala and both custom domains confirmed. Other projects out of scope.
- GitHub products: VA Freelance Hub and Techwriter Bot README and live interfaces accessible. Content evidence recorded separately.
- Reference ecosystem accessible: Refero, Recent, Supahero, Navbar Gallery, CTA Gallery, Component Gallery, 60fps, Mobbin public homepage, 21st public homepage, Hallmark repository/site. Inspora and Page Flows fetches failed; no claims to have studied their inaccessible contents.

## What works / missing / blinded critic
Works: personal voice, genuine operations history, native video samples, portraits, ownership message, active calendar link, real products. Missing: website sales positioning, product stories, professional route, crawler-readable HTML, portable source of truth.
No critical missing input prevents building. Craft critic gets screenshots and bar.md only, no implementation rationale. Brief critic gets goals and rendered content; system critic gets design-system.md and rendered/computed evidence. All three run with fresh context. No fabricated scores or automatic passes.

## Preservation classification
| Material | Decision | Destination |
|---|---|---|
| Existing 10 video clips/posters and showreel | FEATURE/KEEP | Video portfolio and homepage excerpt |
| Dark sweater / polo portraits | FEATURE/KEEP | Home/about/hire; original files preserved |
| Résumé DOCX | KEEP | Hire Me and global footer |
| Existing professional history | REWORK | Evidence-backed Hire Me chronology |
| VA Hub / Techwriter | FEATURE | Selected work and dedicated project stories |
| Original DC files/runtime | ARCHIVE | Retained in repository, checkpoint tag; no source deletion |
| Original compiled bundle | ARCHIVE | Git checkpoint and archive copy |
| Ink loop | KEEP | Accessible creative-work section; no longer main sales evidence |
| Three undifferentiated services | REWORK | Four services from current user brief |
| LinkedIn article placeholders | ARCHIVE/REWORK | Preserve old source; link honestly to profile, no unverified article titles |
| Historical precise outcome metrics | KEEP in résumé | Avoid promoting uncorroborated percentages on marketing pages |

## Implementation decision
Keep static Cloudflare Pages deployment and all media. Unpack the legacy JS-only presentation into a small Node build script and semantic HTML partials, shared CSS and minimal JS. No application framework, CMS, accounts or backend. Navigation and content work without JavaScript; video has native controls. CSS handles restrained hover feedback, with reduced-motion support. Budget: page HTML <50KB, CSS <25KB, JS <8KB; no video loaded before deliberate playback; lazy below-fold images.

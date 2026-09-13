# Portfolio content evidence

Checked 13 September 2026. Repository sources were read through GitHub API; no remote instructions were executed. Facts below distinguish resume claims, source-backed functionality, and proposed copy. No customer adoption, revenue, performance improvement, or project uptime was independently established.

## Personal background

Source: `assets/Cyrus-Alcala-Resume.docx` (Word XML read directly). Existing `Cyrus Alcala.dc.html` repeats some resume claims but is not independent corroboration.

| Item | Supported detail | Editorial treatment |
|---|---|---|
| Location/contact | Manila, Philippines; cyrusalcala@live.com; linkedin.com/in/cyrusalcala | Suitable for contact/about |
| Background | Resume describes 10+ years in customer service and technical support/BPO | Use “A background in customer operations and technical writing” if avoiding unverified headline numbers |
| Insight | Knowledge Technical Writer, Sep 2021–Mar 2023 | Safe dated timeline entry |
| Infosys BPM | Senior Process Executive, Mar 2024–Apr 2025 | Safe dated timeline entry |
| IntouchCX | Customer Service Representative, Jul–Dec 2023 | Safe dated timeline entry |
| Earlier experience | Customer Service & Technical Support, 2011–2019; SYKES, Concentrix, Afni, IBM, CSS Corp and others | Group these; no individual employer dates available |
| WNS | Insurance Claims Specialist, “September – Present” | Start year is absent. Do not invent 2025 or assert current employment without confirmation |
| Education | Bachelor of Business Administration – Finance, New Era University, 2006–2010 | Resume-supported |
| Certification | EF SET C2 English Certificate, 75/100 | Resume-supported; no credential verification URL supplied |
| Tools/skills | Zendesk, Salesforce, G-Suite, knowledge management, escalation management, SLA compliance, documentation | Resume-supported |

Resume reports 200+ technical guides, 25% lower agent query times, 30% better training comprehension, 5,000+ records, 100% compliance, 15% fewer audit discrepancies, and 300+ claims. These are self-reported rather than independently verified. Prefer concrete responsibilities over placing these percentages on the public homepage. The existing site's LinkedIn article titles are marked placeholders in `github.md`; do not present them as published articles.

The public [GitHub profile](https://github.com/cyalcala) identifies Cyrus Alcala and the requested project ownership. The API profile has no usable employer, location, website, or biography evidence. Do not derive additional background from it.

Suggested about copy: “My background is in customer operations and technical writing. I bring that experience into AI projects: understanding the work, making information easier to use, and building tools people can follow.”

## VA Freelance Hub

Sources: [repository and README](https://github.com/cyalcala/va-freelance-hub), [scraper module exports](https://github.com/cyalcala/va-freelance-hub/blob/main/packages/scraper/index.ts), [scheduled worker configuration](https://github.com/cyalcala/va-freelance-hub/blob/main/workers/freshness-cron/wrangler.toml).

- README identifies it as a public job index and portfolio project for Filipino freelancers, combining remote/VA-friendly jobs with a company directory.
- The documented current stack is Astro, TypeScript/Bun, Cloudflare Pages and D1. Older Next.js/Vercel/Turso experiments are historical, not the current stack.
- Workflow: collect permitted public RSS/API/ATS listings; normalize, deduplicate and assess location relevance; use AI triage; store listings; send applicants to the original source. Maintenance checks links, prunes stale jobs and records source health.
- Source exports confirm modules for geographic screening, triage, robots rules, link health, source lifecycle and publication gating. This supports a narrative about maintaining useful listings, rather than just creating a visual job-board mockup.
- Worker config schedules a run every ten minutes. This is a configured schedule, not proof that every job becomes visible within ten or fifteen minutes.
- README explicitly excludes user accounts, payments, resume storage and auto-apply tooling. Do not advertise these.
- README's long-term autonomous source-replenishment language includes planned work. Avoid a blanket “fully autonomous” or “runs forever” claim.
- README live URL: [remotejobs-ph.pages.dev](https://remotejobs-ph.pages.dev). Web fetch was blocked by the browsing tool; a separate HTTP attempt received 403. This research does not certify live UI behavior or availability.

Suggested project copy: **Remote work, easier to find.** “A public job board and company directory for Filipino freelancers. It brings permitted remote-work listings into one place, checks their relevance, and links people back to the original application.”

Suggested detail: “The work goes beyond collecting links: source checks, duplicate handling, location screening and stale-listing cleanup help keep the directory useful.”

Suggested tags: Public job directory · Workflow automation · AI-assisted triage.

## Technical Writer Bot

Sources: [repository/README](https://github.com/cyalcala/techwriter-bot), [portfolio buyer narrative](https://github.com/cyalcala/techwriter-bot/blob/main/docs/PORTFOLIO_BUYER_NARRATIVE.md), [document upload/retrieval source](https://github.com/cyalcala/techwriter-bot/blob/main/src/lib/rag-client.ts), [in-memory document store](https://github.com/cyalcala/techwriter-bot/blob/main/src/lib/rag-db.ts).

- Documentation assistant using Astro, Svelte and Cloudflare; combines AI chat, document context, diagrams, code/source references and exports.
- Intended users: technical writers, API documentation teams and documentation agencies. This is target audience, not evidence of paying customers.
- Document source confirms upload validation, extraction, paragraph-aware chunking, embedding/search, filename and line citation metadata, partial-indexing notices and explicit failure states.
- Document store source uses an in-memory Map and removes legacy IndexedDB storage. “Active-session document context” is supported; avoid broader promises that information never leaves the device. Requested features can send necessary content to configured AI/search/rendering providers.
- Buyer narrative describes user-invoked glossary/API/release-note checks, OpenAPI summaries, source reference lookup, coverage mapping, diagram recovery, exports and per-client Cloudflare deployments.
- The narrative describes a solo developer project and a deployment kit for pilots. It explicitly says real-client onboarding/credential pilot remained. Do not imply existing client deployments, enterprise adoption, or quantified savings.
- No autonomous background agent, multi-tenant SaaS, OAuth or billing is claimed in the buyer narrative. Human review/control is central.
- README live URL: [tw-bot.pages.dev](https://tw-bot.pages.dev). Browsing tool could not open this URL; live interactions were not tested in this research.

Suggested project copy: **From source material to clearer documentation.** “An AI workspace for technical writers to ask questions about their documents, review drafts, create diagrams and export their work. Source references and explicit review tools help writers check the result.”

Suggested detail: “Documents stay in the active session, with exports controlled by the writer. The workflow combines writing assistance with the checks and output formats documentation teams need.”

Suggested tags: AI documentation · Document review · Diagrams and exports.

## Recommended homepage emphasis

Lead with the two inspectable projects and their user problems. Position service capability as an offer rather than past client proof: practical AI tools, workflow automation, documentation systems. No independently verified AI video portfolio or client-results case study was found in the sources inspected. If video remains a service, keep it secondary until actual samples are available.

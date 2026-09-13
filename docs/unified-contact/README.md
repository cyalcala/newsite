# Unified contact — 2026-09-13

## Change

Every inquiry action now reads “Let's talk” and opens one published Google Form. The header, mobile menu, homepage hero, service inquiries, employer inquiries, project-end calls to action and footer use src/contact.cjs as the shared destination/label. Duplicate email and calendar prompts were removed. Service navigation, portfolio links, social profiles, résumé and credential downloads retain their purposes and destinations. CSS and JavaScript are unchanged.

Public form: https://docs.google.com/forms/d/e/1FAIpQLSenJuHOxItC77bmI8-NOXxlWSe9aqQRHDt6HlMerQXPgHKB8A/viewform

## Form reconstruction record

Title: Let's talk — Cyrus Alcala

Description: Have a project in mind or a hiring opportunity? Tell me a little about it. I'll reply using the contact details you provide.

1. Name — required short answer.
2. Email — required short answer, text/email validation.
3. What are you reaching out about? — required multiple choice: Websites; AI video; Social media; AI systems and automation; Hiring opportunity; Something else.
4. Tell me a little about it — required paragraph. Helper: A few sentences is enough. If you prefer Messenger, include your profile link here.
5. Preferred reply channel — optional multiple choice: Email; Messenger.

No file uploads or budget questions. Public responder access: anyone with the link. No one-response restriction, verified-account collection or public response summary. Email is entered through the explicit validated question. New-response email notifications are enabled for the owner. A new private spreadsheet, Let's talk — Cyrus Alcala (Responses), is linked. Real inquiry data is kept in Google Workspace, not copied into this public repository.

Owner management: Google Forms → Let's talk — Cyrus Alcala → Responses. Use View in Sheets for the linked spreadsheet. Keep the existing form published when editing it; replacing it requires updating src/contact.cjs and rebuilding.

## Backup and validation

Pre-change repository: pushed tag backup/pre-unified-contact-2026-09-13 at af05565. The earlier full-design backup also remains available.

- All ten generated pages pass static structure, links, fragments and asset checks.
- Forty inquiry links across ten page templates (including desktop/mobile navigation variants) use the one destination and label; no mailto or calendar outreach remains.
- Phone layout at375px has no horizontal overflow. Mobile menu link was followed successfully to the published form.
- Signed-out browser can access the five fields. Invalid email input produces a validation error. No test inquiry was submitted, preserving an empty response inbox.
- The form's Google-provided UI language follows the visitor's locale; question content remains English.

See link-audit.json, static-validation.json and screenshots in this directory. Release details are appended after production verification.

## Production release

Deployed source commit: 54e4924.
Cloudflare Pages deployment: https://e3636455.cyrusalcala.pages.dev
Live domain: https://cyrusalcala.com

All ten deployed page templates return200 and contain the expected forty consistent inquiry links, with no remaining mailto/calendar outreach. The live homepage action was followed in the browser and opened the correct published Google Form. See production-checks.json. CSS, JavaScript, assets and downloads were not changed by this release. The form editor and linked response sheet were left available in Chrome for the owner.

The subsequent documentation commit records production evidence only. To roll back the website, deploy build/ from backup/pre-unified-contact-2026-09-13 in a separate checkout. The new Google Form and linked spreadsheet are separate Workspace resources; rolling back the site does not delete them or their responses.

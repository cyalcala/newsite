# Cyrus design system — Working edition 1

Character: an independent maker's working portfolio. Clear commercial language, real screens and a human presence. A large typographic cover opens into an edited project catalogue. Design variance high; motion low; content density moderate.

## Tokens
Paper #f7f3ec; surface #eee9df; ink #1c1917; muted #645b4f; rule #c9c1b4; accent #3f43ea; accent hover #3034bc; inverse #fffdf9. Existing warm identity retained, composition rebuilt. Accent reserved for primary actions and small editorial details, not gradients or large fills.

Display: existing self-hosted Bricolage Grotesque, 500–700, tracking -.055em, line-height .98–1.06. Hero 64–112px on desktop, 44–60px mobile. Body: existing Public Sans, 16–18px, line-height 1.6. Labels: JetBrains Mono, 11–12px uppercase, line-height 1.5, tracking .06em. Optional Georgia italic is an editorial emphasis, never body or controls.

Grid: maximum 1360px, desktop gutters 48px (32px tablet), 20px phone. 12-column conceptual grid; large feature image vs narrow caption. Breakpoints 1000/700px. Home opening uses type as the primary anchor and a portrait with personal caption. Feature rows alternate a broad full-width project with two deliberately unequal work columns. Services are numbered open rows. Reading pages use an aside plus main column. Mobile becomes a single reading order with images above explanations and no horizontal carousel.

Spacing scale: 4,8,12,16,20,24,32,40,48,64,80,96,120. Section gaps 80–120 desktop and 56–72 mobile. Corners 0px for editorial media, 4px for buttons, circles only for tiny status or portrait crop where appropriate. Shadows only subtle physical screenshot shadow within project stage. No generic enclosing cards.

Images: real screenshots captured from linked products, captioned September 2026; screenshots are evidence of interface, not proof of results. Preserve their ratio and allow full-size opening. Original supplied portraits; original video clips and posters. AI creative samples clearly described as demonstration/concept work, never customer proof. No fabricated dashboards or stock people.

Motion: CSS color/underline/image scale feedback 180–300ms, no entrance gating. Native video only after user play. Reduced-motion disables transform transitions and smooth scrolling. Native document scrolling and keyboard navigation. Focus uses a visible 3px accent outline; buttons >=44px. Navigation uses a native details menu on small screens and ordinary anchors. No-JS remains functional.

Shared components: masthead, page introduction, project stage/caption, numbered service row, editorial split, details disclosure, contact band and footer. All generated pages share one stylesheet and template. Case pages: back link, project title/plain-language purpose, role/status, screenshot, problem/approach/workflow/limits, technical disclosure, live/source and related work.

## Reading versus metadata
Substantive narrative and service descriptions use 16–18px body text. Short image captions, ancillary notes, metadata and link labels use 12–14px; this prevents the metadata competing with the project title. The logo's location strap is a 9–10px graphic identifier, not a reading paragraph. Display tracking may range from -.04 to -.06em according to size; optional serif emphasis is -.065em. These role distinctions are explicit, not permission to shrink substantive copy. Footer wordmark is identity artwork and is intentionally larger than the heading scale.

Technology: static semantic HTML, plain CSS, minimal progressive enhancement JS, existing Pages host. No React/runtime unpacking needed for reading. Existing source and media retained in Git. Asset sources and snapshot date recorded in preflight/evidence.

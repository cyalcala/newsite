# cyrusalcala.com

Marketing site for Cyrus Alcala — AI video, workflow automation, and consulting for service businesses.

**Live:** https://cyrusalcala.com · **Host:** Cloudflare Pages (project `cyrusalcala`)

---

## Quick start

```bash
npx wrangler pages deploy build --project-name=cyrusalcala
```

To preview locally, serve `build/` with any static server that supports HTTP Range requests (needed for video seeking):

```bash
npx serve build -l 4178
```

---

## Repository layout

| Path | What it is |
|---|---|
| `build/` | **The deploy artifact.** Everything Cloudflare serves. |
| `build/index.html` | The entire site — markup, CSS, JS, fonts and images, in one file. |
| `build/*.mp4`, `build/*.webp` | Video samples, hero loop, and poster frames (served as normal files). |
| `build/assets/` | Downloadable files, e.g. the résumé. |
| `assets/` | Source material, not deployed. Original high-res video and headshots. |
| `uploads/` | Raw source images. |

`build/index.html` is the only file that defines the site. There is no build step and no framework to install.

---

## How `build/index.html` works

It is a **Design Component (`.dc.html`) bundle**: a single file containing two JSON payloads plus a loader.

```
<script type="__bundler/manifest">   asset UUID -> base64 bytes (fonts, images)
<script type="__bundler/template">   the entire site HTML, as one JSON string
```

At load, the loader decodes the manifest into blob URLs, string-replaces each asset UUID inside the template, parses it, and **swaps `document.documentElement`** for the result.

Four consequences that will bite you if you edit this file casually:

### 1. The outer `<head>` is destroyed at runtime

Anything in the top-level `<head>` is thrown away when the template replaces the document. CSS that must survive belongs in **either**:

- the template's own `<style>` block (preferred — it becomes the live document), or
- the JS IIFE near the top of the file, which injects a `<style id="mobile-responsive-css">` **after** the swap.

Both are in use. New component CSS goes in the template `<style>`; the IIFE holds the mobile-menu and responsive overrides.

### 2. The template payload is a *quoted* JSON string

The stored payload is a newline followed by a quoted JSON string literal:

```
\n"<!DOCTYPE html>\n<html>..."
```

To rewrite it safely: `JSON.parse` the slice → edit plain HTML → `JSON.stringify` **keeping the outer quotes** → escape non-ASCII to `\uXXXX` → re-apply the generator's `</` → `</` escape, so a `</script>` inside the payload cannot terminate the host `<script>` tag.

`scripts/tpl.js` does exactly this. Use it rather than hand-editing escaped JSON.

Always re-`JSON.parse` **both** payloads before writing, and assert on the result. Every structural edit in this repo's history was gated behind post-condition checks for this reason.

### 3. The DC reconciler fights `<video>`

Any `<video>` the framework manages (marked `data-dc-tpl`) gets **paused**, has `loop` cleared, and has `muted`/`loop` **attributes stripped**. The hero loop therefore is not the templated element: `mountHeroVideo()` in the IIFE builds a fresh `<video>` in JS, replaces the templated one, and re-mounts until its node survives the framework's init phase. Set `muted`/`loop` as JS **properties**, not attributes.

### 4. Colours serve double duty

`#1c1917` is both the primary text colour on cream sections **and** the background of the dark contact band. Never blind-replace a hex across the file — key any colour change on the CSS property (`color:` vs `background:`). Relative asset URLs (`use-01.mp4`) pass through untouched, since only manifest UUIDs are substituted.

---

## Design system

### Palette — locked

This palette is the brand. Do not replace it as part of a "redesign"; improve craft within it.

| Role | Value |
|---|---|
| Page background | `#f7f3ec` |
| Section backgrounds | `#faf9f5`, `#fbf8f1` |
| Raised surface | `#fffdf9` |
| Hairline / border | `#e5dccb`, `#e8dfd1`, `#ece4d5` |
| Primary text | `#1c1917` |
| Body text | `#645b4f` |
| Muted text | `#6b6155`, `#665d50`, `#6f6659` |
| Accent (indigo) | `#3f43ea` — also `--accent`, set at runtime from component props |
| Eyebrow labels (clay) | `#9d4f28` |
| Dark bands | `#1c1917` background — muted text here goes **lighter** (`#a89e8f`), never darker |

The muted warm tones were darkened from their originals to reach WCAG AA on cream. Re-run the contrast audit after any colour edit.

### Type

- Display: **Bricolage Grotesque** (700/800)
- Body: **Public Sans**
- Mono / labels: **JetBrains Mono**
- `h1` `clamp(46px, 5.6vw, 78px)`, tracking `-.035em`
- `h2` `clamp(32px, 3.9vw, 52px)`, tracking `-.026em`

### Layout conventions

- Content max-width `1140px`, gutters `32px` desktop / `20px` mobile
- Section rhythm is deliberately varied (88–112px), not uniform
- **No uniform card grids.** Services and samples use editorial rows separated by hairline rules with an indigo edge marker on hover/active. This was a deliberate de-templating pass — reintroducing a `repeat(3,1fr)` card grid undoes it.
- Mobile breakpoint: **900px** (raised from 768px because the six-link nav wrapped between 769–900px)

---

## Sections

`top` → `showreel` → `build` → `samples` → `how` → `proof` → `about` → `writing` → `contact`

- **top** — two-column hero: copy left, muted autoplay video loop right (4:5)
- **showreel** — self-hosted reel with a custom play control
- **build** — three services as editorial rows, each icon carrying its own micro-animation
- **samples** — 10 video types: one player plus a selector list (see below)
- **contact** — dark band; inverted text rules apply

### Video handling

All video is **self-hosted**. There are no YouTube embeds — visible third-party player branding is considered off-brand here. The original reel survives only as a plain text link.

The samples section holds 10 clips but loads none of them up front:

- each `<video>` uses `preload="none"` plus a poster frame
- initial cost is ~164KB of posters instead of ~5MB of video
- clicking a row swaps `src`/`poster` and the caption, then `load()`s
- the play button reveals native controls on first play

### Media pipeline

Clips are generated with HiggsField (`seedance_2_5`) and encoded locally:

```bash
# sample clip: 720p, ~440KB, keeps audio
ffmpeg -i raw.mp4 -vf "scale=1280:720:flags=lanczos" -c:v libx264 -crf 30 -preset medium \
       -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart build/use-NN.mp4

# poster frame
ffmpeg -ss 1.5 -i raw.mp4 -frames:v 1 -vf "scale=960:540:flags=lanczos" \
       -c:v libwebp -quality 78 build/use-NN.webp

# seamless ambient loop (forward + reversed = no visible seam)
ffmpeg -i src.mp4 -filter_complex "[0:v]scale=1280:720,split[a][b];[b]reverse[r];[a][r]concat=n=2:v=1[out]" \
       -map "[out]" -an -c:v libx264 -crf 33 -movflags +faststart build/showreel-hero.mp4
```

Generation prompts must state the cream-and-indigo palette explicitly for brand-facing media, or output drifts dark. Sample clips are intentionally *not* brand-coloured — they represent varied client work; only the surrounding UI carries the brand.

---

## Content rules

- **No prices on the site.** Pricing is handled on the audit call.
- **No fabricated social proof.** The testimonial row is framed as turning *real* customer feedback into polished video. Marketing AI-generated testimonials as genuine is deceptive advertising and unlawful in many jurisdictions.
- Anything referenced by the template must actually exist in `build/` — a résumé link once shipped pointing at a file that was never copied there, and 404'd in production.

---

## Verifying a change

The in-app browser preview frequently cannot composite screenshots, so verify by **measurement** rather than by eye:

- computed contrast ratio for every text node (target: 0 failures at AA)
- `document.documentElement.scrollWidth > innerWidth` for overflow, at 360 / 800 / 950 / 1440
- interactive elements ≥ 44px tall
- hero video: `paused === false` and `currentTime` advancing
- no `#c8ff4d` / `#0b0b0f` anywhere (leftovers from a reverted dark theme)

Scroll-triggered behaviour (`IntersectionObserver`) cannot be tested when the preview reports `visibilityState: "hidden"` — check that on a real device.

---

## Deploying

```bash
npx wrangler pages deploy build --project-name=cyrusalcala
```

The custom domain edge-caches HTML. After deploying, verify with a cache-busting query rather than a plain fetch:

```bash
curl -s -L "https://cyrusalcala.com/?cb=$(date +%s)" | wc -c
```

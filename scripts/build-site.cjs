const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
process.chdir(root);

const pages = require('../src/pages.cjs');
const contact = require('../src/contact.cjs');

const nav = [
  ['/work/', 'Work'],
  ['/services/', 'Services'],
  ['/about/', 'About'],
  ['/hire/', 'Experience']
];

const link = (url, label, current) => `<a href="${url}"${current === url ? ' aria-current="page"' : ''}>${label}</a>`;

const serviceChips = contact.services.map((s, i) =>
  `<label class="chip"><input type="radio" name="${contact.entries.service}" value="${s}"${i === 0 ? ' checked' : ''}><span>${s}</span></label>`
).join('');

const channelChips = contact.channels.map((c, i) =>
  `<label class="chip"><input type="radio" name="${contact.entries.channel}" value="${c}"${i === 0 ? ' checked' : ''}><span>${c}</span></label>`
).join('');

// Reusable Inquiry Dialog (Accessible from Canvas and Subpages)
const inquiryDialogHtml = `
<div id="inquiry-dialog" class="inquiry-dialog" role="dialog" aria-modal="true" aria-labelledby="inquiry-modal-title">
  <div class="inquiry-backdrop"></div>
  <div class="inquiry-sheet" role="document">
    <div class="inquiry-drag-handle" aria-hidden="true"></div>
    <div class="inquiry-header">
      <div class="inquiry-header-text">
        <span class="eyebrow">START A PROJECT</span>
        <h2 id="inquiry-modal-title">Tell me what you need.</h2>
      </div>
      <button type="button" class="inquiry-close-btn" aria-label="Close inquiry dialog">✕</button>
    </div>
    <div class="inquiry-body">
      <p class="inquiry-intro">Have a website or digital project in mind? Share a few details and I’ll reply directly with clear scope, ideas, and next steps.</p>
      <form class="inquiry-form" action="${contact.action}" method="POST" target="hidden_form_iframe" novalidate>
        <div class="field-honeypot" aria-hidden="true" style="display:none">
          <label for="inquiry-hp">Website</label>
          <input type="text" id="inquiry-hp" name="inquiry_hp" tabindex="-1" autocomplete="off">
        </div>
        <div class="form-row duo">
          <div class="form-field">
            <label for="inquiry-name">Your Name <span class="required" aria-hidden="true">*</span></label>
            <input type="text" id="inquiry-name" name="${contact.entries.name}" required autocomplete="name" placeholder="Name or company">
            <span class="field-error" id="err-name" aria-live="polite"></span>
          </div>
          <div class="form-field">
            <label for="inquiry-email">Email Address <span class="required" aria-hidden="true">*</span></label>
            <input type="email" id="inquiry-email" name="${contact.entries.email}" required autocomplete="email" placeholder="name@domain.com">
            <span class="field-error" id="err-email" aria-live="polite"></span>
          </div>
        </div>
        <div class="form-field">
          <label>What can I help with? <span class="required" aria-hidden="true">*</span></label>
          <div class="choice-chips" role="radiogroup" aria-label="What are you reaching out about?">
            ${serviceChips}
          </div>
        </div>
        <div class="form-field">
          <label for="inquiry-details">Tell me about the project <span class="required" aria-hidden="true">*</span></label>
          <textarea id="inquiry-details" name="${contact.entries.details}" rows="3" required placeholder="A few sentences about your business, what you'd like to build, or what needs improvement."></textarea>
          <span class="field-error" id="err-details" aria-live="polite"></span>
        </div>
        <div class="form-field">
          <label>Preferred reply channel</label>
          <div class="choice-chips" role="radiogroup" aria-label="Preferred reply channel">
            ${channelChips}
          </div>
        </div>
        <div class="form-submit-row">
          <button type="submit" class="form-button">
            <span>Send inquiry</span>
            <span aria-hidden="true">→</span>
          </button>
          <p class="form-note">Direct personal reply. No marketing spam.</p>
        </div>
        <p class="form-fallback-note">Prefer the external form? <a href="${contact.fallbackUrl}" target="_blank" rel="noopener">Open Google Forms directly ↗</a></p>
      </form>
      <iframe name="hidden_form_iframe" id="hidden_form_iframe" style="display:none" tabindex="-1" aria-hidden="true"></iframe>
      <div class="inquiry-success" id="inquiry-success" hidden aria-live="polite">
        <div class="success-box">
          <span class="eyebrow" style="color:var(--accent)">01 / INQUIRY SENT</span>
          <h3>Thanks — I have what I need to take a look.</h3>
          <p>I’ll review what you shared and reply using the contact details you provided.</p>
          <div class="actions">
            <button type="button" class="form-button form-done-btn">Done</button>
            <button type="button" class="form-button form-reset-btn" style="background:transparent;border:1px solid #443e35;color:#fff">Send another inquiry ↺</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;

// Standard Subpage Footer
const footerHtml = `
<footer id="contact" class="contact">
  <div class="wrap">
    <div class="contact-top">
      <div>
        <span class="eyebrow">START A PROJECT</span>
        <h2>Have a project in mind?<br>Let's <span style="font-family:var(--font-serif);font-style:italic">talk.</span></h2>
      </div>
      <button type="button" class="form-button open-inquiry-btn">Start a project <span aria-hidden="true">↗</span></button>
    </div>
    <div class="contact-bottom">
      <div>Tell me a little about your business and what you need.<br>I’ll review what you share and get back to you with honest feedback and clear next steps.</div>
      <nav class="footer-links" aria-label="Footer navigation">
        <a href="/work/">Work ↗</a>
        <a href="/services/">Services ↗</a>
        <a href="/about/">About ↗</a>
        <a href="/hire/">Experience ↗</a>
        <a href="https://www.linkedin.com/in/cyrusalcala/" target="_blank" rel="noopener">LinkedIn ↗</a>
        <a href="https://github.com/cyalcala" target="_blank" rel="noopener">GitHub ↗</a>
        <a href="/lab/">The Lab ↗</a>
        <a href="${contact.resumeUrl}" target="_blank" rel="noopener">Résumé ↗</a>
      </nav>
    </div>
    <div class="footer-name" aria-hidden="true">CYRUS ALCALA</div>
    <div style="font-family:var(--font-mono);font-size:11px;color:var(--rule);margin-top:24px">
      © 2026 Cyrus Alcala · Websites, content &amp; digital systems · Manila, Philippines
    </div>
  </div>
</footer>`;

const version = '20260923';

for (const page of pages) {
  const isHome = page.path === '/';
  const isLab = page.path === '/lab/';
  const url = isHome ? '' : page.path;
  const current = page.path.startsWith('/work/') ? '/work/' : page.path;
  const links = nav.map(([href, label]) => link(href, label, current)).join('');

  let bodyContent = '';
  if (isLab) {
    bodyContent = `
      <a class="skip" href="#main">Skip to content</a>
      ${page.body}
      ${inquiryDialogHtml}
    `;
  } else {
    bodyContent = `
      <a class="skip" href="#main">Skip to content</a>
      <header class="masthead wrap">
        <a class="brand" href="/" aria-label="Cyrus Alcala home">
          cyrus alcala<span aria-hidden="true" class="accent">.</span>
          <small>WEBSITES &amp; DIGITAL PRODUCTS · MANILA</small>
        </a>
        <nav class="navlinks" aria-label="Main navigation">
          ${links}
          <button type="button" class="nav-contact open-inquiry-btn">Start a project <span aria-hidden="true">↗</span></button>
        </nav>
        <details class="mobile-nav">
          <summary>Menu <span aria-hidden="true">☰</span></summary>
          <nav aria-label="Mobile navigation">
            ${links}
            <button type="button" class="open-inquiry-btn mobile-contact-btn">Start a project ↗</button>
          </nav>
        </details>
      </header>
      <main id="main">${page.body}</main>
      ${footerHtml}
      ${inquiryDialogHtml}
    `;
  }

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${page.title} — Cyrus Alcala</title>
  <meta name="description" content="${page.description}">
  <link rel="canonical" href="https://cyrusalcala.com${page.path}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${page.title} — Cyrus Alcala">
  <meta property="og:description" content="${page.description}">
  <meta property="og:url" content="https://cyrusalcala.com${page.path}">
  <meta property="og:image" content="https://cyrusalcala.com/assets/social-card.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="theme-color" content="#ece7de">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/site.css?v=${version}">
  <script src="/site.js?v=${version}" defer></script>
  <script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Cyrus Alcala',
    url: 'https://cyrusalcala.com',
    image: 'https://cyrusalcala.com/assets/headshot-dark.webp',
    sameAs: ['https://github.com/cyalcala', 'https://www.linkedin.com/in/cyrusalcala/'],
    knowsAbout: ['Web design', 'Technical writing', 'Knowledge management', 'AI automation']
  })}</script>
</head>
<body>
  ${bodyContent}
</body>
</html>`;

  const out = isHome ? 'build/index.html' : `build${page.path}index.html`;
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
}

fs.writeFileSync('build/site.css', fs.readFileSync('src/fonts.css', 'utf8') + '\n' + fs.readFileSync('src/site.css', 'utf8'));
fs.copyFileSync('src/site.js', 'build/site.js');
fs.writeFileSync('build/robots.txt', 'User-agent: *\nAllow: /\nSitemap: https://cyrusalcala.com/sitemap.xml\n');
fs.writeFileSync('build/sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + pages.filter(p => p.path != '/404/').map(p => `<url><loc>https://cyrusalcala.com${p.path}</loc></url>`).join('') + '</urlset>');
fs.writeFileSync('build/favicon.svg', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="8" fill="#ece7de"/><text x="12" y="48" font-family="Georgia" font-size="55" fill="#141312">c</text><circle cx="50" cy="46" r="5" fill="#0c30ff"/></svg>');
fs.writeFileSync('build/_headers', '/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: SAMEORIGIN\n/site.css\n  Cache-Control: public, max-age=0, must-revalidate\n/site.js\n  Cache-Control: public, max-age=0, must-revalidate\n/assets/*\n  Cache-Control: public, max-age=86400\n/assets/Cyrus-Alcala-Resume-2026.pdf\n  Content-Type: application/pdf\n  Content-Disposition: inline; filename="Cyrus-Alcala-Resume-2026.pdf"\n  Cache-Control: public, max-age=3600\n');
fs.writeFileSync('build/_redirects', `/resume ${contact.resumeUrl} 302\n/resume/ ${contact.resumeUrl} 302\n`);
fs.mkdirSync('build/resume', { recursive: true });
fs.writeFileSync('build/resume/index.html', `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Cyrus Alcala — Résumé</title><meta http-equiv="refresh" content="0; url=${contact.resumeUrl}"><link rel="canonical" href="https://cyrusalcala.com${contact.resumeUrl}"><script>window.location.replace("${contact.resumeUrl}");</script></head><body><p>Opening Cyrus Alcala's résumé... If it does not open automatically, <a href="${contact.resumeUrl}">click here to view and download the PDF</a>.</p></body></html>`);
fs.copyFileSync('build/404/index.html', 'build/404.html');

console.log(`Built ${pages.length} static pages with shared assets.`);

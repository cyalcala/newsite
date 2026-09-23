const contact=require('./contact.cjs');
const A='<span aria-hidden="true">↗</span>';
const button=(href,text,secondary=false)=>`<a class="button${secondary?' secondary':''}" href="${href}"${(href.startsWith('http')||href.endsWith('.pdf'))?' target="_blank" rel="noopener"':''}>${text} ${A}</a>`;
const textlink=(href,text)=>`<a class="text-link" href="${href}"${(href.startsWith('http')||href.endsWith('.pdf'))?' target="_blank" rel="noopener"':''}>${text} ${A}</a>`;
const image=(src,alt,loading='lazy')=>`<img src="${src}" alt="${alt}" loading="${loading}" decoding="async" width="1280" height="720">`;
const intro=(label,title,lead)=>`<div class="wrap page-intro"><div class="label muted">${label}</div><h1>${title}</h1><p class="lead">${lead}</p></div>`;
const projectStage=(href,src,alt)=>`<a class="stage screenshot" href="${href}">${image(src,alt)}</a>`;
const feature=(href,src,alt,label,title,desc)=>`<article class="project-feature">${projectStage(href,src,alt)}<div class="project-info"><div class="label">${label}</div><h3>${title}</h3><p>${desc}</p>${textlink(href,'Explore the project')}</div></article>`;
const websiteArt=`<div class="website-art" aria-label="Cyrus Alcala website design system composition"><div class="art-line"><span>PROJECT 00 / PERSONAL WEBSITE</span><span>2026</span></div><div><div class="art-name">A clear offer.<br>A clear next step.</div><div class="art-type">Help the right people find their way.</div><div class="swatches" aria-hidden="true"><span style="background:#f7f3ec"></span><span style="background:#c9c1b4"></span><span style="background:#3f43ea"></span></div></div><div class="art-line"><span>DESIGN · DEVELOPMENT · DIRECTION</span><span>CA.</span></div></div>`;
const services=[
 ['websites','Websites','Help customers understand your offer, trust your business and know how to reach you.'],
 ['ai-video','AI video','Show what your product does and why it matters, in a format your audience can follow.'],
 ['social-media','Social media','Make your business recognizable across posts, graphics and reels, with layouts you can reuse.'],
 ['automation','AI systems &amp; automation','Put documents to work and reduce repetitive steps, with clear points for your team to review.']
];
const serviceRows=services.map(([id,name,desc],i)=>`<a class="service-row" href="/services/#${id}"><span class="label num">0${i+1}</span><h3>${name}</h3><p>${desc}</p><span class="arrow" aria-hidden="true">↗</span></a>`).join('');
const projects={
 hvac:{path:'/work/hvac-ad-crew/',title:'HVAC Ad Crew',description:'Explore an industry-specific landing page and AI video advertising system built to turn homeowner attention into booked HVAC work.',label:'01 / WEBSITE · AI VIDEO · COMMERCIAL SYSTEM',headline:'Turn homeowner attention<br>into <span class="serif">booked jobs.</span>',lead:'A focused commercial website and short-form AI video advertising system built around one specific trade: helping an HVAC company book more calls.',src:'/assets/projects/hvac-ad-crew.webp',alt:'HVAC Ad Crew live landing page with screening room video showcase',role:'Website design, development and AI video production',status:'Live working project',live:'https://hvacadcrew.com',repo:'https://github.com/cyalcala/ad-agency-cyrus',sections:`<section><h2>An offer designed around how homeowners buy.</h2><p>Homeowners facing a broken AC or a climbing electric bill make decisions fast, usually on a phone. They don’t read pitch decks or long brochures. They look for a contractor who understands the problem, offers straightforward pricing, and makes it simple to book.</p><p>HVAC Ad Crew pairs a fast, focused landing experience with six short-form AI video ads. Every part of the system is built to move a visitor from first impression to a booked service call.</p></section><section><h2>The website: clear choices, fast loading, no clutter.</h2><p>The landing page uses a high-contrast screening-room aesthetic: deep charcoal ground, warm amber accents, and clean typography. The page delivers the offer immediately above the fold, answers price and turnaround questions upfront, and removes hesitation with a free sample ad before asking for a commitment.</p><div class="workflow"><div><span class="label">01 / THE HOOK</span><h3>Address the pain.</h3><p>Lead with rising utility bills, seasonal deadlines, or replacement costs homeowners already feel.</p></div><div><span class="label">02 / THE PROMISE</span><h3>Clear, honest terms.</h3><p>A simple $2,000 monthly retainer, no long contracts, and a free ad on the client’s brand in 24 hours.</p></div><div><span class="label">03 / THE ACTION</span><h3>Frictionless inquiry.</h3><p>A 60-second mobile form capturing company, city, and primary service priority.</p></div></div></section><section id="commercial-ads"><h2>The AI video advertising system: 6 practical angles.</h2><p>Instead of generic stock footage, each video addresses a specific homeowner objection or seasonal priority. Compare the sample ads below to see how different angles can drive phone calls.</p><div class="hvac-ad-grid"><article class="hvac-ad-card"><video controls playsinline preload="none" poster="/assets/hvac/ad6-phone-bill.jpg" aria-label="Financing angle: monthly payment less than a phone bill"><source src="/assets/hvac/ad6-phone-bill.mp4" type="video/mp4"><a href="/assets/hvac/ad6-phone-bill.mp4">Download video</a></video><div class="ad-meta"><span class="label muted">ANGLE 01 · FINANCING</span><h3 class="ad-angle">Kills the price objection before it forms</h3><p class="ad-why">An $8,000 replacement stops the conversation cold. This ad reframes it as a monthly payment smaller than a phone bill, so the objection never lands.</p><p class="ad-quote">“I put off replacing this thing for two years because of the price tag. Turns out the monthly payment's less than my phone bill.”</p></div></article><article class="hvac-ad-card"><video controls playsinline preload="none" poster="/assets/hvac/ad1-same-house.jpg" aria-label="Energy costs angle: rising summer power bill"><source src="/assets/hvac/ad1-same-house.mp4" type="video/mp4"><a href="/assets/hvac/ad1-same-house.mp4">Download video</a></video><div class="ad-meta"><span class="label muted">ANGLE 02 · ENERGY COSTS</span><h3 class="ad-angle">Opens on a gut punch, not a logo</h3><p class="ad-why">Leads with a rising utility bill, the one number every homeowner already feels. Nobody scrolls past their own pain point.</p><p class="ad-quote">“Opened my July bill. Up almost half from a few years ago. Same house.”</p></div></article><article class="hvac-ad-card"><video controls playsinline preload="none" poster="/assets/hvac/ad8-membership.jpg" aria-label="Maintenance membership angle: recurring service agreement"><source src="/assets/hvac/ad8-membership.mp4" type="video/mp4"><a href="/assets/hvac/ad8-membership.mp4">Download video</a></video><div class="ad-meta"><span class="label muted">ANGLE 03 · MEMBERSHIP</span><h3 class="ad-angle">Turns one-time callers into monthly revenue</h3><p class="ad-why">Sells your maintenance plan as simple arithmetic instead of a pitch. Homeowners do the math and sign up, creating predictable recurring revenue.</p><p class="ad-quote">“Members pay less for the year than most folks pay for one emergency call. That's the whole thing.”</p></div></article><article class="hvac-ad-card"><video controls playsinline preload="none" poster="/assets/hvac/ad7-vents.jpg" aria-label="Air quality angle: visual duct inspection"><source src="/assets/hvac/ad7-vents.mp4" type="video/mp4"><a href="/assets/hvac/ad7-vents.jpg">Download video</a></video><div class="ad-meta"><span class="label muted">ANGLE 04 · AIR QUALITY</span><h3 class="ad-angle">Makes the invisible problem impossible to ignore</h3><p class="ad-why">Shows what is actually inside the ducts. Air quality sells itself the moment a homeowner sees what their family has been breathing all summer.</p><p class="ad-quote">“Family's been breathing through it all summer. If you can't remember the last time yours was changed, that's the answer.”</p></div></article><article class="hvac-ad-card"><video controls playsinline preload="none" poster="/assets/hvac/ad2-fall-rush.jpg" aria-label="Seasonal urgency angle: booking tune-ups before the cold rush"><source src="/assets/hvac/ad2-fall-rush.mp4" type="video/mp4"><a href="/assets/hvac/ad2-fall-rush.mp4">Download video</a></video><div class="ad-meta"><span class="label muted">ANGLE 05 · SEASONAL URGENCY</span><h3 class="ad-angle">Books October work while August is still hot</h3><p class="ad-why">Fills the shoulder season before the first cold night hits. By the time everyone else's phones ring off the hook, your schedule is already booked.</p><p class="ad-quote">“Every year, same thing. First cold night in October, phone rings off the hook. Book your furnace tune-up now, while I've still got open slots.”</p></div></article><article class="hvac-ad-card"><video controls playsinline preload="none" poster="/assets/hvac/ad5-before-after.jpg" aria-label="Visual proof angle: silent before and after installation"><source src="/assets/hvac/ad5-before-after.mp4" type="video/mp4"><a href="/assets/hvac/ad5-before-after.mp4">Download video</a></video><div class="ad-meta"><span class="label muted">ANGLE 06 · VISUAL PROOF</span><h3 class="ad-angle">Silent proof that runs on every feed</h3><p class="ad-why">No dialogue means it plays cleanly muted in any social feed. Pure visual proof of quality craftsmanship, the kind homeowners trust most.</p><p class="ad-quote">Clean installation walkthrough with no dialogue required.</p></div></article></div></section><section><h2>What this means for your business.</h2><p>Whether you run a home service company, sell a high-ticket service, or need more qualified leads, this project demonstrates what you can hire me to build:</p><ul><li>A fast, conversion-oriented website designed around how your customers actually decide</li><li>Short-form AI video ads tailored to your specific service angles and seasonal demand</li><li>A unified visual identity connecting your web presence, video advertising, and lead capture</li><li>Direct, single-point collaboration from initial brief to launch and handover</li></ul><div class="note-box">This independent build shows the commercial system in action. You can inspect both the live site and the complete codebase.</div></section><details class="disclosure"><summary>Technical details and production stack</summary><div><p>Built with Astro, Tailwind CSS, native HTML5 video and Cloudflare Pages. Zero heavy 3D framework dependencies: depth is achieved through CSS 3D transforms, lighting layers, and hardware-accelerated video compositing.</p><p>The site renders full static content and functions without JavaScript, with progressive enhancements for muted video hover loops and personalized city parameter injection.</p>${textlink('https://github.com/cyalcala/ad-agency-cyrus','Explore the repository on GitHub')}</div></details>`},
 va:{path:'/work/va-freelance-hub/',title:'VA Freelance Hub',description:'See how VA Freelance Hub brings remote jobs and company information together for Filipino freelancers, with links to original applications.',label:'02 / PRODUCT · WEB · AUTOMATION',headline:'Remote work.<br>Easier to <span class="serif">find.</span>',lead:'Find remote and virtual-assistant opportunities suited to Filipino talent. Browse jobs and company information, then apply at the original source.',src:'/assets/projects/va-hub.webp',alt:'Actual VA Freelance Hub homepage with remote-work headline and job categories',role:'Product design, web development and automation',status:'Live portfolio product',live:'https://remotejobs-ph.pages.dev',repo:'https://github.com/cyalcala/va-freelance-hub',sections:`<section><h2>Less searching across scattered job boards.</h2><p>Job hunting means sorting through duplicate listings and checking whether a role is open to your location. VA Freelance Hub brings relevant opportunities together so applicants have a more focused place to start.</p></section><section><h2>Find the information. Follow the opportunity.</h2><p>Browse jobs by category and explore the company directory. When a role looks right, follow its link to the original application. You do not need an account or résumé upload to browse.</p><p>I designed the site and built the listing workflow. It collects supported public sources, checks for duplicates and location relevance, and records source health to support maintenance.</p></section><section><h2>How the listings reach the board.</h2><div class="workflow"><div><span class="label">01 / COLLECT</span><h3>Find the opening.</h3><p>Collect listings from supported public job feeds and hiring systems.</p></div><div><span class="label">02 / ORGANIZE</span><h3>Make it useful.</h3><p>Standardize listings, remove duplicates and use AI to help assess location relevance.</p></div><div><span class="label">03 / CONNECT</span><h3>Get to the source.</h3><p>Show the source and link applicants to the original application.</p></div></div></section><section><h2>What you can evaluate here.</h2><p>If your project involves a directory or regularly updated information, this is a working example to inspect. It connects an organized public website with the workflow needed to maintain its content.</p><div class="note-box">Listings can change or expire. Check the employer’s original posting before applying; a scheduled refresh does not guarantee every source is current.</div></section><details class="disclosure"><summary>Technical details and current scope</summary><div><p>The site uses Astro, TypeScript, Cloudflare Pages and D1. A scheduled Worker starts the listing workflow. Link checks, expired-listing cleanup and source-health records support maintenance.</p><p>The public product is a job index: it does not take payments, store résumés or submit applications. The repository separates the current build from earlier experiments and planned improvements.</p>${textlink('https://github.com/cyalcala/va-freelance-hub','Read the source and documentation')}</div></details>`},
 tw:{path:'/work/techwriter-bot/',title:'Techwriter Bot',description:'Explore an AI writing workspace with document questions, draft review, diagrams and exports. Inspect how source references support human review.',label:'03 / PRODUCT · AI · TECHNICAL WRITING',headline:'From source material<br>to <span class="serif">clearer drafts.</span>',lead:'Give technical writers a place to ask questions about documents, review drafts and create diagrams. Source references help them check the work before sharing it.',src:'/assets/projects/techwriter.webp',alt:'Actual Technical Writer interface with document context and writing controls',role:'Product development, AI workflows and documentation',status:'Live portfolio product',live:'https://tw-bot.pages.dev',repo:'https://github.com/cyalcala/techwriter-bot',sections:`<section><h2>Make the source easier to work with.</h2><p>A polished draft is only useful if it explains the source correctly. Techwriter Bot brings document context and review tools into the writing process, drawing on my experience in technical documentation.</p></section><section><h2>Draft, check and export in one place.</h2><p>Ask questions, review a draft, create a diagram and export the result in one session. You choose the source material and which checks to run. References help you trace an answer back to the document.</p><p>I built the application and document workflow, including notices for incomplete file processing, unavailable sources and diagrams that need repair. Those details help writers know when to pause and check.</p></section><section><h2>From document to reviewed output.</h2><div class="workflow"><div><span class="label">01 / CONTEXT</span><h3>Bring the material.</h3><p>Add a source document or describe the writing task.</p></div><div><span class="label">02 / WORK</span><h3>Draft and examine.</h3><p>Ask questions and use review tools to shape the draft or diagram.</p></div><div><span class="label">03 / REVIEW</span><h3>Check, then export.</h3><p>Check the references, correct the result and export the work you want to keep.</p></div></div></section><section><h2>What this could mean for your workflow.</h2><p>For a documentation team, this is a concrete way to assess AI-assisted writing. Try the workflow and inspect the source to judge which parts could support your own process.</p><div class="note-box">Review AI output before using it. Document context lasts for the active session, so export work before leaving. AI and diagram features may send content to configured external providers.</div></section><details class="disclosure"><summary>Technical details and data handling</summary><div><p>The application uses Astro, Svelte and Cloudflare. It extracts document text into searchable passages and preserves filename and line references. Review tools and diagram rendering support the writing workflow.</p><p>Processing may use external providers even though document context is stored for the active session. Read the source and operational notes before deciding whether it fits your data requirements.</p>${textlink('https://github.com/cyalcala/techwriter-bot','Explore the implementation')}</div></details>`}
};
const casePage=p=>({path:p.path,title:p.title,description:p.description,body:`<div class="wrap"><a class="back" href="/work/">← All work</a></div>${intro(p.label,p.headline,p.lead)}<div class="wrap"><figure class="case-image"><div class="stage screenshot">${image(p.src,p.alt,'eager')}</div><figcaption><span>Product screenshot · September 2026. Live content may change.</span><a href="${p.src}">View full-size screenshot ↗</a></figcaption></figure></div><div class="wrap reading-grid section" style="padding-top:0"><aside><dl><div><dt>Project</dt><dd>${p.title}</dd></div><div><dt>My role</dt><dd>${p.role}</dd></div><div><dt>Status</dt><dd>${p.status}</dd></div></dl>${textlink(p.live,'Open live project')}${textlink(p.repo,'View GitHub')}</aside><div class="prose">${p.sections}<div class="actions">${button(p.live,'Try the project')}${textlink('/services/','See services and scope')}${textlink('/work/','Explore related work')}</div></div></div>`});
const canvasHomeHtml = `
<main id="main">
<div class="canvas" id="canvas" aria-label="Cyrus Alcala portfolio canvas">
  <!-- Top Navigation Header: Mode Switcher & Lab Controls -->
  <header class="top-header-wrap">
    <nav class="switcher top-nav" aria-label="Portfolio sections">
      <button class="active" id="realButton" type="button">Real work</button>
      <span class="nav-separator" aria-hidden="true">|</span>
      <button id="funButton" type="button">Playground</button>
    </nav>

    <div class="top-right-bar" aria-label="Lab and controls">
      <button class="layout-eyes-btn" id="layoutEyes" type="button" aria-label="Shuffle playground layout" title="Shuffle layout">
        <svg viewBox="0 0 58 28" width="48" height="24" fill="none" aria-hidden="true">
          <circle cx="14" cy="14" r="12" stroke="#0c30ff" stroke-width="2.5" fill="#fff"/>
          <circle cx="44" cy="14" r="12" stroke="#0c30ff" stroke-width="2.5" fill="#fff"/>
          <g id="pupilLeft"><circle cx="14" cy="14" r="5" fill="#0c30ff"/></g>
          <g id="pupilRight"><circle cx="44" cy="14" r="5" fill="#0c30ff"/></g>
        </svg>
      </button>
      <a href="/" class="lab-pill-btn" aria-label="Commercial Website">
        <span>← Commercial Site</span>
      </a>
    </div>
  </header>

  <!-- Real Work Field (Collage of Featured Commercial Projects) -->
  <section class="real-field" id="projectField" aria-label="Selected commercial projects">
    <!-- 01: HVAC Ad Crew -->
    <article class="project-card card-hvac" data-project="hvac" tabindex="0" role="button" aria-label="Explore HVAC Ad Crew commercial system">
      <span class="card-label">01 / Commercial Engine</span>
      <img src="/assets/projects/hvac-ad-crew.webp" alt="HVAC Ad Crew landing page with screening room aesthetics" width="1280" height="720" fetchpriority="high">
    </article>

    <!-- 02: VA Freelance Hub -->
    <article class="project-card card-va" data-project="va" tabindex="0" role="button" aria-label="Explore VA Freelance Hub product">
      <span class="card-label">02 / Product &amp; Automation</span>
      <img src="/assets/projects/va-hub.webp" alt="VA Freelance Hub interface showcasing remote job listings" width="1280" height="720">
    </article>

    <!-- 03: Techwriter Bot -->
    <article class="project-card card-tw" data-project="tw" tabindex="0" role="button" aria-label="Explore Techwriter Bot documentation tool">
      <span class="card-label">03 / AI &amp; Documentation</span>
      <img src="/assets/projects/techwriter.webp" alt="Techwriter Bot AI workspace interface" width="1280" height="720">
    </article>

    <!-- 00: Project Zero Art Card -->
    <article class="project-card card-art art-card" data-project="art" tabindex="0" role="button" aria-label="Explore Project Zero design system">
      <div>
        <div class="card-label" style="position:static;display:inline-flex;margin-bottom:14px">00 / System</div>
        <div class="art-headline">A clear offer.<br>A clear next step.</div>
        <div class="art-sub">Help the right people find their way.</div>
        <div class="art-swatches" aria-hidden="true">
          <span style="background:#ece7de"></span>
          <span style="background:#cfc7bc"></span>
          <span style="background:#0c30ff"></span>
        </div>
      </div>
      <div class="art-bottom">
        <span>CYRUS BENEDICT ALCALA</span>
        <span>2026</span>
      </div>
    </article>
  </section>

  <!-- Playground Field (Freely Arranged Sandbox Experiments) -->
  <section class="fun-field" id="funField" aria-label="Creative playground and prototypes">
    <!-- Ambient Sound Player -->
    <aside class="now-playing" aria-label="Now playing ambient audio">
      <div class="track-disc" id="trackDisc">
        <img src="/assets/headshot-dark.webp" alt="Ambient track vinyl art">
      </div>
      <div class="track-info">
        <span class="track-label">Now Playing</span>
        <span class="track-title" id="trackTitle">Midnight Manila — Lo-Fi Session</span>
      </div>
      <div class="track-controls">
        <button class="track-play-btn" id="trackPlay" type="button" aria-label="Play or pause audio">▶</button>
        <button class="track-play-btn" id="trackNext" type="button" aria-label="Next thought or track" style="background:#444">↻</button>
      </div>
      <div class="track-bars" id="trackBars" aria-hidden="true">
        <i></i><i></i><i></i><i></i>
      </div>
    </aside>

    <!-- Prototype Video 1 -->
    <figure class="fun-item fun-video-1">
      <video autoplay loop muted playsinline poster="/use-04.webp" aria-label="AI creative study concept">
        <source src="/use-04.mp4" type="video/mp4">
      </video>
    </figure>

    <!-- Prototype Video 2 -->
    <figure class="fun-item fun-video-2">
      <video autoplay loop muted playsinline poster="/use-01.webp" aria-label="Product demo concept">
        <source src="/use-01.mp4" type="video/mp4">
      </video>
    </figure>

    <!-- Prototype Video 3 -->
    <figure class="fun-item fun-video-3">
      <video autoplay loop muted playsinline poster="/use-09.webp" aria-label="Animated story concept">
        <source src="/use-09.mp4" type="video/mp4">
      </video>
    </figure>

    <!-- Sticker 1 -->
    <div class="fun-item fun-sticker-1">
      MANILA TO THE WORLD
    </div>

    <!-- Sticker 2 -->
    <div class="fun-item fun-sticker-2">
      <strong>BUILT, NOT PROMPTED</strong>
      Practical AI systems backed by real documentation and code.
    </div>
  </section>

  <!-- Cinematic About Takeover (.about-field) -->
  <section class="about-field" id="aboutField" aria-label="About Cyrus Alcala" aria-hidden="true">
    <div class="about-story">
      <p class="about-story-paragraph">
        <span>I was born and raised in Manila, building at the intersection</span>
        <span>of web design, technical communication, and practical AI.</span>
      </p>

      <p class="about-story-paragraph">
        <span>Before writing software or designing interfaces, I spent over a decade</span>
        <span>in customer operations and documentation—discovering how real people</span>
        <span>actually navigate complex tools and make buying decisions.</span>
      </p>

      <p class="about-story-paragraph">
        <span>My practice connects both worlds: editorial clarity for the reader,</span>
        <span>tactile delight for the user, and robust architecture for the owner.</span>
      </p>

      <p class="about-story-paragraph">
        <span>Whether it’s a high-converting commercial landing page, an AI-assisted</span>
        <span>writing workspace, or an automated pipeline, I build end-to-end.</span>
      </p>

      <div class="about-story-closing">
        <p class="about-story-paragraph" style="margin:0;font-weight:700">
          ALWAYS CURIOUS. ALWAYS BUILDING.
        </p>
        <svg class="hand-underline" viewBox="0 0 220 12" fill="none" aria-hidden="true">
          <path d="M2 7C45 2 175 2 218 8C160 11 60 11 12 9" stroke="#0c30ff" stroke-width="2.5" stroke-linecap="round"/>
        </svg>
      </div>

      <button class="about-back-btn" id="aboutBackBtn" type="button">
        ← Return to canvas
      </button>
    </div>
  </section>

  <!-- Bottom Dock (.bio) -->
  <footer class="bio" id="bio" aria-label="Bio and information drawer">
    <div class="bio-copy">
      <!-- Blue scalloped shape in playground mode -->
      <svg class="fun-bottom-shape" viewBox="0 0 420 46" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 23C10 8 20 8 30 23C40 38 50 38 60 23C70 8 80 8 90 23C100 38 110 38 120 23C130 8 140 8 150 23C160 38 170 38 180 23C190 8 200 8 210 23C220 38 230 38 240 23C250 8 260 8 270 23C280 38 290 38 300 23C310 8 320 8 330 23C340 38 350 38 360 23C370 8 380 8 390 23C400 38 410 38 420 23V46H0Z" fill="#0c30ff"/>
      </svg>
      <p>
        <span class="bio-text-real">Cyrus Alcala is a designer, developer &amp; AI systems builder in Manila</span>
        <span class="bio-text-fun">When I'm not shipping client systems, I'm building weird and useful experiments</span>
      </p>
    </div>
    <button class="portrait" id="portrait" type="button" aria-label="Open profile context and contact">
      <img src="/assets/headshot-dark.webp" alt="Cyrus Alcala">
    </button>
  </footer>

  <!-- Profile Popover (.profile-popover) -->
  <div class="profile-popover" id="profilePopover" aria-hidden="true">
    <div class="profile-tabs" role="tablist">
      <button class="active" id="careerButton" type="button" role="tab">Context</button>
      <button id="contactButton" type="button" role="tab">Let's talk</button>
    </div>

    <!-- Panel 1: Context -->
    <section class="profile-panel career-panel active" id="careerPanel" role="tabpanel">
      <p class="panel-heading">Where I've been</p>
      <div class="career-list">
        <div class="career-item">
          <div class="career-item-main">
            <span class="career-item-title">WNS Global Services</span>
            <span class="career-item-role">Claims Manager · Natural Hazards</span>
            <span class="career-item-location">Manila, Philippines</span>
          </div>
          <time>Now</time>
        </div>
        <div class="career-item">
          <div class="career-item-main">
            <span class="career-item-title">Infosys BPM</span>
            <span class="career-item-role">Senior Process Executive</span>
            <span class="career-item-location">Manila, Philippines</span>
          </div>
          <time>2025</time>
        </div>
        <div class="career-item">
          <div class="career-item-main">
            <span class="career-item-title">Insight Direct</span>
            <span class="career-item-role">Knowledge Technical Writer</span>
            <span class="career-item-location">Manila, Philippines</span>
          </div>
          <time>2023</time>
        </div>
      </div>

      <p class="panel-heading" style="margin-top:18px">Credentials</p>
      <div class="career-list">
        <div class="career-item">
          <div class="career-item-main">
            <span class="career-item-title">Google AI Professional Certificate</span>
            <span class="career-item-role">Coursera Specialization</span>
          </div>
          <time>2026</time>
        </div>
        <div class="career-item">
          <div class="career-item-main">
            <span class="career-item-title">EF SET C2 English Proficiency</span>
            <span class="career-item-role">Score 75/100 · Native/Bilingual</span>
          </div>
          <time>2026</time>
        </div>
      </div>

      <button class="about-link-btn" id="aboutButton" type="button">
        <span>More about my journey</span>
        <span aria-hidden="true">↗</span>
      </button>
    </section>

    <!-- Panel 2: Let's Talk -->
    <section class="profile-panel contact-panel" id="contactPanel" role="tabpanel">
      <div class="talk-box">
        <p class="talk-prompt">Have a website, video, or AI system in mind?</p>
        <div class="talk-actions">
          <button type="button" class="talk-inquiry-btn open-inquiry-btn">
            <span>Start inquiry</span>
            <span aria-hidden="true">↗</span>
          </button>
          <a class="talk-email-link" href="mailto:cyrusalcala@gmail.com">
            <span>cyrusalcala@gmail.com</span>
          </a>
        </div>
        <div class="talk-social-links">
          <a href="https://www.linkedin.com/in/cyrusalcala/" target="_blank" rel="noopener">LinkedIn ↗</a>
          <a href="https://github.com/cyalcala" target="_blank" rel="noopener">GitHub ↗</a>
          <a href="/assets/Cyrus-Alcala-Resume-2026.pdf" target="_blank" rel="noopener">Résumé ↗</a>
          <a href="/services/">Services ↗</a>
        </div>
      </div>
    </section>
  </div>

  <!-- Project Detail Slide Overlay (.project-view) -->
  <section class="project-view" id="projectView" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="infoTitle">
    <button class="view-backdrop" id="viewBackdrop" type="button" aria-label="Close project view"></button>
    <div class="project-scroll" id="projectScroll"></div>
    <aside class="project-info">
      <button class="close" id="closeProject" type="button" aria-label="Close project">×</button>
      <h1 id="infoTitle">Project Title</h1>
      <p class="year">Year <strong id="infoYear">2026</strong></p>
      <div class="rule"></div>
      <p class="desc" id="infoDesc"></p>
      <div class="actions">
        <a class="btn-action" id="infoLiveLink" href="#" target="_blank" rel="noopener">
          <span>Try Live Project</span>
          <span aria-hidden="true">↗</span>
        </a>
        <a class="btn-sub" id="infoRepoLink" href="#" target="_blank" rel="noopener">
          <span>Explore GitHub Repo</span>
          <span aria-hidden="true">↗</span>
        </a>
        <a class="btn-sub" id="infoCaseLink" href="#">
          <span>Read Full Case Study</span>
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </aside>
    <div class="scroll-hint" aria-hidden="true"><i id="scrollThumb"></i></div>
  </section>
  </div>
</main>
`;

const commercialHomeHtml = `
<div class="wrap">
  <!-- 1. Hero Section: Editorial Split with Immediate Visual Impact -->
  <section class="storefront-hero" aria-label="Website design and development">
    <div class="storefront-hero-split">
      <div class="storefront-hero-content">
        <div class="hero-badge">INDEPENDENT DESIGN &amp; DEVELOPMENT · MANILA</div>
        <h1>Get a website your business is proud to <span class="serif">send people to.</span></h1>
        <p class="lead">I design and build clean, fast websites for businesses ready to make a great first impression. Thoughtful typography, clear communication, and zero technical bloat—launched end-to-end.</p>
        <div class="hero-actions">
          <button type="button" class="form-button open-inquiry-btn">Start a project <span aria-hidden="true">↗</span></button>
          <a class="button secondary" href="#work">See the work <span aria-hidden="true">↓</span></a>
        </div>
        <div class="hero-status-note">
          <span class="dot" aria-hidden="true"></span>
          <span>Available for new projects · Single-page builds from ₱5,000 · Direct collaboration</span>
        </div>
      </div>
      
      <div class="storefront-hero-visual">
        <a class="featured-work-stage" href="/work/hvac-ad-crew/" aria-label="Explore featured project: HVAC Ad Crew">
          <div class="stage-topbar">
            <span class="stage-label">FEATURED PROJECT / 2026</span>
            <span class="stage-indicator">● LIVE BUILD</span>
          </div>
          <div class="stage-media">
            <img src="/assets/projects/hvac-ad-crew.webp" alt="HVAC Ad Crew landing page preview" width="1280" height="720" fetchpriority="high" loading="eager">
          </div>
          <div class="stage-caption">
            <div>
              <strong>HVAC Ad Crew</strong>
              <span>Commercial Landing Page &amp; Video System</span>
            </div>
            <span class="stage-arrow" aria-hidden="true">Explore build ↗</span>
          </div>
        </a>
      </div>
    </div>
  </section>

  <!-- 2. Selected Work Section -->
  <section id="work" class="section work-section" aria-label="Selected work and portfolio">
    <div class="section-head">
      <div>
        <span class="eyebrow label">SELECTED WORK</span>
        <h2>Real projects.<br>Built to <span class="serif">work.</span></h2>
      </div>
      <p>I don't show generic mockups or unverified metrics. Here is actual, inspectable work—designed around how real customers make decisions.</p>
    </div>

    <div class="work-catalogue">
      <!-- Project 01: HVAC Ad Crew -->
      <article class="catalogue-item">
        <a class="catalogue-stage screenshot" href="/work/hvac-ad-crew/">
          <img src="/assets/projects/hvac-ad-crew.webp" alt="HVAC Ad Crew live landing page" width="1280" height="720" loading="lazy">
        </a>
        <div class="catalogue-info">
          <div class="label muted">01 / COMMERCIAL WEBSITE &amp; VIDEO ADS</div>
          <h3>HVAC Ad Crew</h3>
          <p>A high-contrast landing page and short-form video advertising system built around how homeowners buy. Delivers the offer above the fold, answers pricing upfront, and removes booking hesitation.</p>
          <div class="catalogue-actions">
            <a class="text-link" href="/work/hvac-ad-crew/">Read project overview ↗</a>
            <a class="button secondary" href="https://hvacadcrew.com" target="_blank" rel="noopener">Open live site ↗</a>
          </div>
        </div>
      </article>

      <!-- Project 02: VA Freelance Hub -->
      <article class="catalogue-item">
        <a class="catalogue-stage screenshot" href="/work/va-freelance-hub/">
          <img src="/assets/projects/va-hub.webp" alt="VA Freelance Hub live website" width="1280" height="720" loading="lazy">
        </a>
        <div class="catalogue-info">
          <div class="label muted">02 / WEB DIRECTORY &amp; AUTOMATION</div>
          <h3>VA Freelance Hub</h3>
          <p>A public job directory and company index for Filipino remote talent. Connects supported public job sources, checks location relevance with AI triage, and links applicants directly to original applications.</p>
          <div class="catalogue-actions">
            <a class="text-link" href="/work/va-freelance-hub/">Read project overview ↗</a>
            <a class="button secondary" href="https://remotejobs-ph.pages.dev" target="_blank" rel="noopener">Open live site ↗</a>
          </div>
        </div>
      </article>

      <!-- Project 03: Techwriter Bot -->
      <article class="catalogue-item">
        <a class="catalogue-stage screenshot" href="/work/techwriter-bot/">
          <img src="/assets/projects/techwriter.webp" alt="Techwriter Bot interface" width="1280" height="720" loading="lazy">
        </a>
        <div class="catalogue-info">
          <div class="label muted">03 / AI APPLICATION &amp; DOCUMENTATION</div>
          <h3>Techwriter Bot</h3>
          <p>An AI workspace for technical writers to ask questions about source documents, review drafts, and generate diagrams. Grounded in source references so writers can verify every answer before sharing.</p>
          <div class="catalogue-actions">
            <a class="text-link" href="/work/techwriter-bot/">Read project overview ↗</a>
            <a class="button secondary" href="https://tw-bot.pages.dev" target="_blank" rel="noopener">Try application ↗</a>
          </div>
        </div>
      </article>

      <!-- Project 04: Commercial Video & Creative Direction -->
      <article class="catalogue-item">
        <a class="catalogue-stage screenshot" href="/work/video/">
          <img src="/use-04.webp" alt="AI commercial video demonstration" width="1280" height="720" loading="lazy">
        </a>
        <div class="catalogue-info">
          <div class="label muted">04 / COMMERCIAL VIDEO &amp; MOTION</div>
          <h3>Video Formats &amp; Direction</h3>
          <p>Ten AI-assisted short-form video formats, from silent social ads to product walkthroughs and explainer clips. Compare formats to find the right presentation style for your message.</p>
          <div class="catalogue-actions">
            <a class="text-link" href="/work/video/">Explore 10 video formats ↗</a>
          </div>
        </div>
      </article>
    </div>
  </section>

  <!-- 3. Recognizable Customer Reality -->
  <section class="section reality-section" aria-label="Common website problems">
    <div class="section-head">
      <div>
        <span class="eyebrow label">THE REALITY</span>
        <h2>Most websites don’t fail from lack of code.<br>They fail from <span class="serif">lack of clarity.</span></h2>
      </div>
      <p>Your customers make decisions on their phones in seconds. When a site feels outdated, slow, or confusing, they leave before you ever hear from them.</p>
    </div>

    <div class="reality-grid">
      <div class="reality-item">
        <span class="label num">01</span>
        <h3>Outdated presentation</h3>
        <p>Your business has grown, but your website still looks like it was put together years ago. You hesitate every time you send a prospect there because it doesn't reflect your actual quality.</p>
      </div>
      <div class="reality-item">
        <span class="label num">02</span>
        <h3>Unclear offers</h3>
        <p>Customers shouldn't have to hunt around to understand what you sell. If they can't tell what you do and how to get it within 5 seconds, they move on to a competitor who makes it obvious.</p>
      </div>
      <div class="reality-item">
        <span class="label num">03</span>
        <h3>Slow, bloated builds</h3>
        <p>Heavy WordPress themes and twenty plugins that make mobile visitors wait 5 seconds just to see a phone number. Customers shouldn't be waiting for your business to load.</p>
      </div>
    </div>
  </section>

  <!-- 4. Website Offer & Accessible Pricing -->
  <section id="offer" class="section offer-section" aria-label="Website packages and pricing">
    <div class="section-head">
      <div>
        <span class="eyebrow label">THE WEBSITE OFFER</span>
        <h2>Work that looks expensive.<br>Starting around <span class="serif">₱5,000.</span></h2>
      </div>
      <p>You don't need an agency retainer or a six-month committee to get a website your business is proud of. Clear scope, fixed pricing, and fast delivery.</p>
    </div>

    <div class="offer-grid">
      <!-- Starter Offer -->
      <div class="offer-card starter-card">
        <div class="offer-header">
          <span class="label accent-label">ACCESSIBLE ENTRY OFFER</span>
          <h3>Starter Website</h3>
          <div class="price-tag">₱5,000 <span class="price-sub">/ starting project</span></div>
          <p class="offer-lead">A focused, custom single-page website built to give your business an immediate, credible digital presence.</p>
        </div>
        <div class="offer-includes">
          <span class="label">WHAT'S INCLUDED</span>
          <ul>
            <li><strong>Custom design</strong> tailored to your business (no generic templates)</li>
            <li><strong>Clear copy structure</strong> so customers understand what you sell</li>
            <li><strong>Mobile-first responsiveness</strong> tested on real phones and tablets</li>
            <li><strong>Sub-second loading speed</strong> hosted on Cloudflare Pages</li>
            <li><strong>Direct inquiry form</strong> delivering leads straight to your email</li>
            <li><strong>Domain connection</strong> and free SSL security</li>
            <li><strong>Complete code ownership</strong> and handover instructions</li>
            <li><strong>3 to 7 day delivery</strong> with live private staging preview</li>
          </ul>
        </div>
        <div class="offer-action">
          <button type="button" class="form-button open-inquiry-btn">Start a ₱5,000 project <span aria-hidden="true">↗</span></button>
          <span class="offer-guarantee-note">Full preview on a private staging link before launch. Zero lock-in.</span>
        </div>
      </div>

      <!-- Custom / Multi-Page Offer -->
      <div class="offer-card custom-card">
        <div class="offer-header">
          <span class="label muted">EXPANDED CAPABILITY</span>
          <h3>Multi-Page &amp; Custom Builds</h3>
          <div class="price-tag">Custom Quote <span class="price-sub">/ transparent fixed scope</span></div>
          <p class="offer-lead">For businesses needing multiple service pages, project galleries, custom booking flows, or interactive digital tools.</p>
        </div>
        <div class="offer-includes">
          <span class="label">AVAILABLE INCLUSIONS</span>
          <ul>
            <li><strong>Multi-page architecture</strong> (Home, About, Services, Case Studies, Contact)</li>
            <li><strong>Detailed portfolio showcases</strong> with high-resolution media galleries</li>
            <li><strong>Booking &amp; intake flows</strong> connected to your scheduling tools or CRM</li>
            <li><strong>Commercial video integration</strong> and custom visual assets</li>
            <li><strong>Automated inquiry triage</strong> and lead notification pipelines</li>
            <li><strong>Comprehensive SEO metadata</strong>, OpenGraph tags, and sitemaps</li>
            <li><strong>Dedicated milestone previews</strong> at each development stage</li>
          </ul>
        </div>
        <div class="offer-action">
          <button type="button" class="button secondary open-inquiry-btn">Discuss a custom build <span aria-hidden="true">↗</span></button>
          <span class="offer-guarantee-note">Scope, deliverables, and timeline agreed upfront before any deposit.</span>
        </div>
      </div>
    </div>
  </section>

  <!-- 5. Process Section -->
  <section id="process" class="section process-section" aria-label="How we work together">
    <div class="section-head">
      <div>
        <span class="eyebrow label">HOW IT WORKS</span>
        <h2>Simple, straightforward steps.<br>From brief to <span class="serif">launch.</span></h2>
      </div>
      <p>No multi-month delays or confusing agency jargon. A clean, collaborative process where you know what to expect at every step.</p>
    </div>

    <div class="process-steps">
      <div class="process-step">
        <span class="step-num">01</span>
        <h3>Understand</h3>
        <p>A short conversation about what your business does, who your customers are, and what the website needs to achieve. We agree on scope, deliverables, and timeline.</p>
      </div>
      <div class="process-step">
        <span class="step-num">02</span>
        <h3>Design &amp; Build</h3>
        <p>I design and code your website from scratch. You receive a private staging URL to test the build live on your own phone and computer as it takes shape.</p>
      </div>
      <div class="process-step">
        <span class="step-num">03</span>
        <h3>Review &amp; Refine</h3>
        <p>We review the site together, refine copy and spacing, verify mobile responsiveness, and test forms to ensure everything works smoothly.</p>
      </div>
      <div class="process-step">
        <span class="step-num">04</span>
        <h3>Launch &amp; Handover</h3>
        <p>We connect your domain, verify speed and security caching, and transfer all files and repository access. You own 100% of your website.</p>
      </div>
    </div>
  </section>

  <!-- 6. More Than Websites (Expansion Path) -->
  <section class="section capabilities-section" aria-label="Broader digital capabilities">
    <div class="section-head">
      <div>
        <span class="eyebrow label">GROWTH PATH</span>
        <h2>Start with a website.<br>Build further when it <span class="serif">makes sense.</span></h2>
      </div>
      <p>A great website establishes your foundation. When your business is ready, we can layer on content, video, and automation without starting over.</p>
    </div>

    <div class="capabilities-grid">
      <div class="capability-item">
        <span class="label muted">CAPABILITY 01</span>
        <h3>Content &amp; Technical Writing</h3>
        <p>Complicated offers made simple. User guides, knowledge bases, FAQs, and product copy that save your team hours of answering the same customer questions.</p>
        <a class="text-link" href="/services/#content">Explore content scope ↗</a>
      </div>
      <div class="capability-item">
        <span class="label muted">CAPABILITY 02</span>
        <h3>Commercial Video</h3>
        <p>Short-form video ads and product demos built to play cleanly on silent social feeds, catch customer attention, and drive phone calls or website visits.</p>
        <a class="text-link" href="/work/video/">Watch sample formats ↗</a>
      </div>
      <div class="capability-item">
        <span class="label muted">CAPABILITY 03</span>
        <h3>Practical Automation &amp; AI</h3>
        <p>Repetitive customer intake, document triage, or internal workflows automated behind the scenes—reducing manual errors without costly monthly software fees.</p>
        <a class="text-link" href="/work/techwriter-bot/">Explore working AI tool ↗</a>
      </div>
    </div>
  </section>

  <!-- 7. About Cyrus (The Builder) -->
  <section id="about" class="section about-preview-section" aria-label="About Cyrus Alcala">
    <div class="about-split">
      <div class="about-portrait-col">
        <img src="/assets/headshot-polo.webp" alt="Portrait of Cyrus Alcala" width="600" height="700" loading="lazy">
      </div>
      <div class="about-content-col">
        <span class="eyebrow label">ABOUT THE BUILDER</span>
        <h2>One person who handles<br>the <span class="serif">whole thing.</span></h2>
        <p>I’m Cyrus Alcala, an independent designer and developer based in Manila.</p>
        <p>Before building custom websites and AI systems, I spent over a decade in enterprise customer operations, claims management, and technical documentation with companies like Infosys BPM and WNS.</p>
        <p>That background shapes how I build: customer empathy for the visitor, clear communication for the buyer, and clean, verifiable architecture for the business owner.</p>
        <p>When you hire me, you work directly with me. No account managers, no junior handoffs, no runaround.</p>
        <div class="credentials-bar">
          <div class="cred-item">
            <strong>Google AI Professional Certificate</strong>
            <span>Coursera Specialization Credential · 2026</span>
          </div>
          <div class="cred-item">
            <strong>EF SET C2 English Proficiency</strong>
            <span>Score 75/100 · Native / Bilingual Fluency</span>
          </div>
        </div>
        <div class="actions" style="margin-top:28px">
          <button type="button" class="form-button open-inquiry-btn">Start a project ↗</button>
          <a class="text-link" href="/hire/">Review enterprise career background &amp; résumé ↗</a>
          <a class="text-link" href="/lab/">Explore The Lab experiments ↗</a>
        </div>
      </div>
    </div>
  </section>

  <!-- 8. Buyer FAQ -->
  <section class="section faq-section" aria-label="Frequently asked questions">
    <div class="section-head">
      <div>
        <span class="eyebrow label">QUESTIONS &amp; ANSWERS</span>
        <h2>Frequently asked <span class="serif">questions.</span></h2>
      </div>
      <p>Honest answers to common questions about pricing, timelines, hosting, and how we work together.</p>
    </div>

    <div class="faq-list">
      <details class="faq-item">
        <summary>How much will my website cost?</summary>
        <p>Single-page starter websites begin at ₱5,000. For multi-page websites or projects requiring custom integrations, booking systems, or content writing, I provide a clear, fixed quote before any work begins so there are never surprise fees.</p>
      </details>
      <details class="faq-item">
        <summary>How long does a website project take?</summary>
        <p>Starter single-page websites typically take 3 to 7 days from our initial conversation to launch, provided you have your basic information ready. Multi-page or custom builds generally take 1 to 3 weeks.</p>
      </details>
      <details class="faq-item">
        <summary>What do I need to prepare before we start?</summary>
        <p>All you need to start is an idea of what your business offers, your logo (if you have one), and any photos or text you already use. If you don't have finished copy, don't worry—I help write clear, customer-friendly copy as part of the project.</p>
      </details>
      <details class="faq-item">
        <summary>Who handles hosting and domain registration?</summary>
        <p>I configure fast, secure hosting on Cloudflare Pages (which is free for standard static sites) with automated SSL security. If you already own a domain, we connect it seamlessly. If not, I guide you through registering one in your own name so you retain full ownership.</p>
      </details>
      <details class="faq-item">
        <summary>Can I update my website after launch?</summary>
        <p>Yes. You own 100% of the code, files, and assets. The site is built with clean, standard code without messy plugins. I provide clear handover notes, or you can have me handle ongoing updates on a simple per-task basis.</p>
      </details>
      <details class="faq-item">
        <summary>What happens if I need revisions?</summary>
        <p>Every project includes dedicated review and polish rounds on a private staging link before launch. You get to test everything on your phone and computer, and we adjust text, layout, and images until you're completely satisfied.</p>
      </details>
    </div>
  </section>

  <!-- 9. Final CTA Section -->
  <section class="section final-cta-section" aria-label="Start your website project">
    <div class="final-cta-box">
      <span class="eyebrow label">START A PROJECT</span>
      <h2>Ready for a website your business<br>is proud to <span class="serif">share?</span></h2>
      <p>Tell me a little about what you're building. I’ll review what you share and get back to you with honest feedback, clear options, and simple next steps.</p>
      <div class="actions">
        <button type="button" class="form-button open-inquiry-btn">Start a project <span aria-hidden="true">↗</span></button>
        <a class="button secondary" href="mailto:cyrusalcala@gmail.com">Or email me directly ↗</a>
      </div>
    </div>
  </section>
</div>
`;

const pages=[
  {path:'/',title:'Cyrus Alcala — Websites & Digital Products',description:'I design and build clean, fast websites your business is proud to share. Starting around ₱5,000 with sub-second speed, thoughtful typography, and full ownership.',body:commercialHomeHtml},
  {path:'/lab/',title:'The Lab · Experimental Playground',description:'Interactive canvas, ambient sound experiments, and motion studies by Cyrus Alcala.',body:canvasHomeHtml},
  {path:'/work/',title:'Selected Work',description:'See working websites, AI tools, and commercial video systems built by Cyrus Alcala. Inspect real screens, code, and live products.',body:`${intro('SELECTED WORK','Real builds.<br>Inspect the <span class="serif">craft.</span>','Browse working websites, AI applications, and video samples. Each project explains the problem, how it was built, and what you can evaluate.')}<div class="wrap full-work section" style="padding-top:0"><article class="project-feature"><a class="stage" href="/work/cyrusalcala/">${websiteArt}</a><div class="project-info"><div class="label">00 / WEBSITE &amp; DESIGN SYSTEM</div><h3>A website with a clear next step.</h3><p>See how services, work samples and professional experience come together to help a visitor decide and get in touch.</p>${textlink('/work/cyrusalcala/','Explore this website')}</div></article>${feature('/work/hvac-ad-crew/','/assets/projects/hvac-ad-crew.webp','HVAC Ad Crew website','01 / COMMERCIAL WEB &amp; VIDEO','HVAC Ad Crew','A focused landing page and short-form video advertising system built around how homeowners make buying decisions.')}${feature('/work/va-freelance-hub/','/assets/projects/va-hub.webp','VA Freelance Hub website','02 / WEB DIRECTORY &amp; AUTOMATION','VA Freelance Hub','Browse remote jobs and company information for Filipino freelancers, then follow the opportunity to its original source.')}${feature('/work/techwriter-bot/','/assets/projects/techwriter.webp','Technical Writer application','03 / AI &amp; DOCUMENTATION','Techwriter Bot','Ask questions about source documents, review drafts, and create diagrams in one focused writing workspace.')}${feature('/work/video/','/use-04.webp','AI-generated beverage advertising concept','04 / VIDEO &amp; MOTION','Commercial Video Formats','Compare ten video formats, from silent social ads to product walkthroughs and explainer clips.')}<div class="note-box">These self-initiated builds and commercial projects show the work you can inspect. Inspect live links and GitHub repositories to evaluate code quality.</div><div class="actions">${textlink('https://github.com/cyalcala','More builds on GitHub')}${textlink('https://www.linkedin.com/in/cyrusalcala/','Notes and updates on LinkedIn')}</div></div>`},
  {path:'/services/',title:'Services & Scope',description:'Website design and development, technical writing, commercial video, and practical automation. Starter websites from ₱5,000 with sub-second speed.',body:`${intro('SERVICES / WORK WITH ME','Websites and digital tools.<br>Built with <span class="serif">care.</span>','Clear communication, thoughtful design, and reliable development. Here is what I can build for your business.')}<div class="wrap"><section id="websites" class="offer"><span class="label muted">01</span><div><div class="label accent">PRIMARY DOORWAY</div><h2>Websites</h2><p style="margin-top:24px">Give customers a clear picture of what you do, why it matters, and how to reach you. Engineered for speed, mobile decision-making, and effortless inquiries.</p><p class="price">Starter single-page from ₱5,000 · Custom multi-page quotes</p><p class="note">Clear deliverables and timeline agreed upfront. You inspect the functional staging build before paying the final milestone.</p><div class="actions">${button(contact.url,contact.label)}</div></div><div><h3>What your website includes</h3><ul><li>Clean typography and clear copy structure shaped around your offer</li><li>Sub-second loading speed on Cloudflare Pages (zero bloated frameworks)</li><li>Readable, responsive layouts on phone, tablet, and desktop</li><li>Friction-free inquiry modal and automated notification routing</li><li>Complete source repository and instructions for managing your build</li><li>3 to 7 day delivery for single-page starter launches</li></ul><p class="note-box">Your website serves as the anchor for all future advertising, ensuring message consistency across every channel.</p>${textlink('/work/hvac-ad-crew/','See an applied commercial website: HVAC Ad Crew')}${textlink('/work/cyrusalcala/','See the system behind this site')}</div></section><section id="content" class="offer"><span class="label muted">02</span><div><h2>Content &amp; technical writing</h2><p style="margin-top:24px">Complicated products made easy to understand. User guides, knowledge bases, FAQs, and product copy that save your team hours of answering the same customer questions.</p>${textlink('/work/techwriter-bot/','Explore technical documentation workspace')}</div><div><h3>Clear documentation &amp; copy</h3><ul><li>Customer-facing guides and knowledge bases built to reduce support tickets</li><li>Onboarding checklists and Standard Operating Procedures (SOPs)</li><li>Product explanations and interface copy that eliminate confusion</li><li>Clean Markdown or Git-backed documentation your team can maintain</li></ul>${textlink(contact.url,contact.label)}</div></section><section id="ai-video" class="offer"><span class="label muted">03</span><div><h2>Commercial video &amp; ads</h2><p style="margin-top:24px">Short-form video ads tailored to specific buying angles (pricing reframes, utility costs, seasonal urgency, visual proof). Designed to play cleanly on silent social feeds.</p>${textlink('/work/video/','Watch 10 creative format samples')}${textlink('/work/hvac-ad-crew/','See commercial video in action: HVAC Ad Crew')}</div><div><h3>Direct-response video assets</h3><ul><li>A concept and script focused on what your audience needs to know</li><li>AI-assisted visuals and editing shaped around your message</li><li>Video files sized for your agreed social and advertising channels</li><li>A visual direction you can carry into future campaigns</li></ul>${textlink(contact.url,contact.label)}</div></section><section id="automation" class="offer"><span class="label muted">04</span><div><h2>AI systems &amp;<br>automation</h2><p style="margin-top:24px">Make information easier to find and routine work easier to handle. Start with a specific task, such as document Q&amp;A assistants or automated inquiry triage.</p>${textlink('/work/techwriter-bot/','Explore a working AI tool')}</div><div><h3>Practical, zero-bloat AI workflows</h3><ul><li>A mapped workflow and prototype you can test before expanding</li><li>An assistant, document tool, or integration fitted to the task</li><li>Clear human review steps so your team knows what to verify</li><li>Instructions that explain how to use and maintain the workflow</li></ul><details class="disclosure"><summary>Technical capabilities</summary><div><p>Capabilities include AI assistants, agents, document workflows, integrations, and custom workers. We choose tools around your task, data, and budget.</p></div></details>${textlink(contact.url,contact.label)}</div></section><section id="how" class="section process"><span class="eyebrow label">HOW WE WORK</span><h2>Know what to expect.<br>At <span class="serif">every step.</span></h2><div class="workflow"><div><span class="label">01 / SCOPE</span><h3>Agree the brief.</h3><p>20-minute alignment on your offer, customer questions, and timeline. Deliverables and price are locked in before work starts.</p></div><div><span class="label">02 / PREVIEW</span><h3>Test the build.</h3><p>Review the fully functional system on a private Cloudflare staging URL. Your feedback shapes the final polish.</p></div><div><span class="label">03 / HAND OVER</span><h3>Launch &amp; handover.</h3><p>Domain connected, security and caching verified, and all source files transferred. You own everything.</p></div></div><div class="actions">${button(contact.url,contact.label)}</div><p class="gallery-note">Have a question about what your business needs? Start an inquiry and we'll figure out the right scope together.</p></section></div>`},
  {path:'/about/',title:'About Cyrus',description:'Work directly with Cyrus Alcala on websites, content, and practical AI. See how his enterprise operations and technical-writing background shapes clean, reliable systems.',body:`${intro('A LITTLE ABOUT ME','Your goals.<br>A <span class="serif">hands-on</span> partner.','I’m Cyrus Alcala, an independent designer and developer in Manila. I help businesses explain their offer, build websites they are proud of, and put AI to practical use.')}<section class="wrap about-large section" style="padding-top:0"><img src="/assets/headshot-polo.webp" alt="Portrait of Cyrus Alcala" width="600" height="700" loading="eager"><div class="prose"><section><h2>Your customers need clarity. So does your team.</h2><p>Before building websites and AI tools, I worked for over a decade in customer operations, claims management, and technical documentation with companies like Infosys BPM and WNS. That meant helping real people find answers, follow processes, and resolve complex issues.</p><p>I bring that experience to every website I build: clear language for the visitor, responsive controls for the user, and maintainable, documented code for whoever manages it.</p></section><section><h2>One point of contact, from idea to handover.</h2><p>Websites are my primary focus. Video, technical content, and workflow automation support the same business goals. We start with your current priority and agree on a clear scope you can evaluate.</p><p>My Google AI Professional Certificate through Coursera adds formal structured training to hands-on engineering. The portfolio lets you inspect what I have built; the Experience page covers my professional background and credentials.</p><div class="actions">${textlink('/work/','Explore the work')}${textlink('/hire/','Professional background')}</div></section></div></section><section id="writing" class="wrap section" style="padding-top:0"><div class="section-head"><div><span class="eyebrow label">WRITING &amp; BUILDING IN PUBLIC</span><h2>Look closer<br>before you <span class="serif">decide.</span></h2></div><p>Read how the tools work, what they include, and where their limits are. Project documentation is on GitHub; professional updates are on LinkedIn.</p></div><div class="inline-links">${textlink('https://github.com/cyalcala/techwriter-bot/tree/main/docs','Techwriter project documentation')}${textlink('https://github.com/cyalcala/va-freelance-hub/tree/main/docs','VA Hub project documentation')}${textlink('https://www.linkedin.com/in/cyrusalcala/','Follow on LinkedIn')}</div></section>`},
  {path:'/hire/',title:'Experience & Credentials',description:'Review Cyrus Alcala’s enterprise experience in technical writing, customer operations, and AI engineering. Verify credentials and download his résumé.',body:`${intro('PROFESSIONAL BACKGROUND','Experience you<br>can <span class="serif">review.</span>','Bring technical writing, customer operations, and hands-on web development to your project or team. Review my background, inspect working builds, and download the résumé.')}<section class="wrap reading-grid section" style="padding-top:0"><aside><img src="/assets/headshot-dark.webp" alt="Cyrus Alcala" width="220" height="260" style="margin-bottom:24px"><dl><div><dt>Based in</dt><dd>Manila, Philippines</dd></div><div><dt>Focus</dt><dd>Website Design &amp; Dev<br>Technical Documentation<br>Knowledge Systems<br>Customer Operations</dd></div></dl>${textlink(contact.resumeUrl,'View résumé (PDF)')}${textlink(contact.url,contact.label)}</aside><div class="prose"><section><h2>Help your team find answers and use them.</h2><p>Your business needs tools and pages that people can understand and act on. My background combines enterprise documentation, customer support, and process governance with hands-on web and AI development.</p><p>The projects below demonstrate that approach: organizing job information for freelancers and building a document workspace for technical writers. You can inspect both before we speak.</p><div class="actions">${textlink('/work/techwriter-bot/','Technical writing meets AI')}${textlink('/work/va-freelance-hub/','See the job directory')}</div></section><section id="credentials"><span class="eyebrow label">CONTINUING EDUCATION</span><h2>Google AI<br>Professional Certificate</h2><p>Issued by Google through Coursera · August 27, 2026<br>Awarded to Cyrus Benedict Alcala.</p><p>Eight courses covering AI fundamentals, prompt patterns, research, technical communication, content creation, data analysis, application building, and edge deployment.</p><div class="actions">${button('https://www.coursera.org/account/accomplishments/specialization/2VVHEY7DVHBG','Verify credential on Coursera')}${textlink('/assets/Google-AI-Professional-Certificate.pdf','View certificate PDF')}</div><h3>Additional credentials</h3><p>EF SET C2 English Certificate · 75/100 (Native/Bilingual Fluency)</p><p>Bachelor of Business Administration, Finance<br>New Era University · 2006–2010</p></section><section id="experience"><span class="eyebrow label">CAREER TIMELINE</span><h2>Enterprise experience.</h2><div class="timeline"><div class="timeline-row"><div class="date">SEP 2025 — PRESENT</div><div><h3>Claims Manager — Natural Hazards</h3><p>WNS Global Services · Manila, Philippines</p><p>Adjudicate complex claims records, verify data integrity across risk assessment workflows, and author procedural documentation for faster analyst onboarding.</p></div></div><div class="timeline-row"><div class="date">MAR 2024 — APR 2025</div><div><h3>Senior Process Executive — Financial Services</h3><p>Infosys BPM · Manila, Philippines</p><p>Maintained 5,000+ financial-service records at 100% SLA compliance and reduced audit discrepancies by 15% through data governance and verification.</p></div></div><div class="timeline-row"><div class="date">SEP 2021 — MAR 2023</div><div><h3>Knowledge Technical Writer</h3><p>Insight Direct · Manila, Philippines</p><p>Authored and maintained 200+ technical guides and knowledge-base articles, contributing to a 25% reduction in query resolution time and 30% training improvement.</p></div></div><div class="timeline-row"><div class="date">2011 — DEC 2023</div><div><h3>Customer Service &amp; Technical Support Specialist</h3><p>IntouchCX, SYKES &amp; other BPO companies · Manila, Philippines</p><p>Frontline telecom, insurance, and financial support, multi-channel technical troubleshooting, Zendesk and Salesforce administration, and escalation handling.</p></div></div></div><p>Full professional details, metric-backed career impact, and technical platforms are available in the résumé.</p></section><section><h2>Where I can contribute.</h2><ul><li>Website design and static development on Cloudflare</li><li>Authoring technical guides, knowledge bases, SOPs, and product documentation</li><li>AI &amp; documentation engineering: prompt patterns, RAG systems, and edge deployment</li><li>Customer operations, escalation resolution, and content governance</li><li>Zendesk, Salesforce, Jira, Confluence, and Google Workspace</li></ul><div class="actions">${button(contact.url,contact.label)}${textlink(contact.resumeUrl,'View & download résumé')}</div></section></div></section>`},
  casePage(projects.hvac),casePage(projects.va),casePage(projects.tw),
  {path:'/work/cyrusalcala/',title:'Project zero · This website',description:'See how this website helps visitors understand services, inspect relevant work and start a conversation through one simple inquiry path.',body:`${intro('00 / WEBSITE · ART DIRECTION · DESIGN SYSTEM','Make your offer<br>easier to <span class="serif">understand.</span>','This website shows how a broad set of services can become a clear buying journey: understand the offer, inspect the work and start one conversation.')}<div class="wrap case-image">${websiteArt}</div><section class="wrap reading-grid section" style="padding-top:0"><aside><dl><div><dt>Project</dt><dd>cyrusalcala.com</dd></div><div><dt>My role</dt><dd>Direction, design, content and development</dd></div><div><dt>Type</dt><dd>Personal portfolio and commercial website</dd></div></dl>${textlink('https://github.com/cyalcala/newsite','View source')}</aside><div class="prose"><section><h2>Help visitors make a decision.</h2><p>A visitor should not have to piece together what you offer. This site puts services, relevant work and the next step within reach, with deeper detail on separate pages.</p><p>Buyers can compare services and inspect examples. Employers can review experience and credentials. Every inquiry leads to one short form.</p></section><section><h2>Make the business recognizable.</h2><p>Consistent type, color and spacing connect the pages. Project images show the work itself, while short summaries help visitors decide what to explore.</p><p>That same visual direction can carry into social graphics and campaign pages, giving future content a useful starting point.</p></section><section><h2>Make existing work easier to discover.</h2><p>The showreel, ten video samples, project stories and résumé each have a clear place. Visitors can browse a short selection or go deeper without reading everything.</p></section><section><h2>Keep the experience easy to use.</h2><p>Pages open with readable content. The layout adapts to smaller screens, navigation stays simple and videos play when the visitor chooses.</p><div class="note-box">This self-initiated website demonstrates the design and build approach. Conversion results have not been measured.</div></section><details class="disclosure"><summary>Explore the design and build documentation</summary><div><p>The project records its design system, reference teardown, preservation decisions and review process in GitHub.</p>${textlink('https://github.com/cyalcala/newsite/tree/main/docs/overhaul','Read the project record')}</div></details><div class="actions">${button(contact.url,contact.label)}${textlink('/work/','Back to selected work')}</div></div></section>`},
  {path:'/work/video/',title:'Video & creative work',description:'Find a video direction for your product or message. Watch ten AI-assisted concepts, including demos, explainers, social ads and training formats.',body:''},
  {path:'/404/',title:'Page not found',description:'Find your way back to Cyrus Alcala’s work, services and contact information.',body:`${intro('404 / A SMALL DETOUR','Let’s get you<br><span class="serif">back on track.</span>','This page could not be found. Browse the work or return home to find the service you need.')}<div class="wrap actions section" style="padding-top:0">${button('/','Back to home')}${textlink('/work/','Explore the work')}</div>`}
 ];
const videoTypes=[['Product demo','Show the details that help someone understand a product.'],['Explainer','Make an idea easier to follow, one visual step at a time.'],['Corporate brand','Give viewers a feel for the business through its tone and visual style.'],['Social media ad','Put one clear message at the center of a short video.'],['UGC-style creative','Explore a conversational presentation style. The people and endorsements are synthetic, not customer testimony.'],['Event recap','See an event-style story built from selected moments. This is a concept, not coverage of a client event.'],['Real estate','Explore a visual walkthrough format. The property presentation is illustrative.'],['Training & onboarding','Show how a process can become a clear visual explanation.'],['Animated story','Use animation to give an idea a simple, memorable story.'],['Immersive concept','Explore a more atmospheric visual direction, presented as a standard video.']];
pages.find(p=>p.path==='/work/video/').body=`${intro('03 / VIDEO · SOCIAL · CREATIVE EXPLORATION','Make your message<br>easier to <span class="serif">see.</span>','Show a product, explain an idea or introduce a service. Browse the concept videos below to find a format and direction for your own message.')}<section id="showreel" class="wrap"><div class="video-reel"><video controls playsinline preload="none" poster="/showreel-poster.webp" aria-label="AI creative showreel"><source src="/showreel.mp4" type="video/mp4"><a href="/showreel.mp4">Download showreel</a></video></div><p class="gallery-note">AI-assisted concept reel. These samples demonstrate creative direction rather than client campaign results. ${textlink('https://youtu.be/LFMjlGj_4JM','Original reel link')}</p></section><section id="samples" class="wrap section"><div class="section-head"><div><span class="eyebrow label">THE SAMPLE LIBRARY</span><h2>Choose a format<br>for your <span class="serif">message.</span></h2></div><p>Compare the examples below. Each shows a different way to present information; press play on the one you want to watch.</p></div><div class="video-list">${videoTypes.map(([title,desc],i)=>{const n=String(i+1).padStart(2,'0');return `<article><video controls playsinline preload="none" poster="/use-${n}.webp" aria-label="${title} demonstration"><source src="/use-${n}.mp4" type="video/mp4"><a href="/use-${n}.mp4">Download ${title} sample</a></video><h3><span class="label muted">${n} / </span>${title}</h3><p>${desc}</p></article>`}).join('')}</div><div class="note-box">These are AI-generated concepts exploring format range. For an applied commercial system combining video ads with a conversion landing page, see ${textlink('/work/hvac-ad-crew/','HVAC Ad Crew')}.</div></section><section class="wrap section" style="padding-top:0"><div class="section-head"><div><span class="eyebrow label">FROM THE ORIGINAL SITE</span><h2>Studies in <span class="serif">indigo.</span></h2></div><p>A quieter example of motion: an ink study exploring color and atmosphere.</p></div><video controls playsinline preload="none" poster="/hero-poster.webp" aria-label="Indigo ink visual study" style="max-height:480px;background:var(--surface);width:100%"><source src="/showreel-hero.mp4" type="video/mp4"></video><div class="actions">${button(contact.url,contact.label)}${textlink('/work/','Back to selected work')}</div></section>`;
module.exports=pages;

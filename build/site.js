// ==========================================================================
// CyrusAlcala.com — Interactive Canvas & Motion System
// Inspired by kiaradigregorio.com, elevated for Cyrus Alcala
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const realButton = document.getElementById('realButton');
  const funButton = document.getElementById('funButton');
  const portrait = document.getElementById('portrait');
  const profilePopover = document.getElementById('profilePopover');
  const careerButton = document.getElementById('careerButton');
  const contactButton = document.getElementById('contactButton');
  const careerPanel = document.getElementById('careerPanel');
  const contactPanel = document.getElementById('contactPanel');
  const aboutButton = document.getElementById('aboutButton');
  const aboutBackBtn = document.getElementById('aboutBackBtn');
  const projectView = document.getElementById('projectView');
  const projectScroll = document.getElementById('projectScroll');
  const closeProject = document.getElementById('closeProject');
  const viewBackdrop = document.getElementById('viewBackdrop');
  const scrollThumb = document.getElementById('scrollThumb');
  const layoutEyes = document.getElementById('layoutEyes');
  const pupilLeft = document.getElementById('pupilLeft');
  const pupilRight = document.getElementById('pupilRight');
  const trackPlayBtn = document.getElementById('trackPlay');
  const trackDisc = document.getElementById('trackDisc');
  const trackBars = document.getElementById('trackBars');
  const trackTitle = document.getElementById('trackTitle');
  const trackNextBtn = document.getElementById('trackNext');

  // --- Canvas Systems (Only active on /lab/ canvas) ---
  if (canvas) {
    // --- 1. Mode Switching: Real Work vs. Playground ---
    if (realButton && funButton) {
      realButton.addEventListener('click', () => {
        canvas.classList.remove('fun-mode');
        realButton.classList.add('active');
        funButton.classList.remove('active');
      });

      funButton.addEventListener('click', () => {
        canvas.classList.add('fun-mode');
        funButton.classList.add('active');
        realButton.classList.remove('active');
      });
    }

    // --- 2. Draggable Cards Physics (Desktop & Large Screens) ---
    let highestZ = 30;
  const draggables = document.querySelectorAll('.project-card, .fun-item');

  draggables.forEach(item => {
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let initialLeft = 0;
    let initialTop = 0;
    let dragDistance = 0;

    item.addEventListener('pointerdown', e => {
      if (window.innerWidth <= 768) return; // Allow native mobile scrolling
      if (e.target.closest('button, a, input')) return;

      isDragging = true;
      dragDistance = 0;
      startX = e.clientX;
      startY = e.clientY;

      const rect = item.getBoundingClientRect();
      const parentRect = canvas.getBoundingClientRect();
      initialLeft = rect.left - parentRect.left;
      initialTop = rect.top - parentRect.top;

      highestZ += 1;
      item.style.zIndex = highestZ;
      item.classList.add('dragging');
      item.setPointerCapture(e.pointerId);
    });

    item.addEventListener('pointermove', e => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      dragDistance = Math.hypot(dx, dy);

      if (dragDistance > 5) {
        const nextLeft = initialLeft + dx;
        const nextTop = initialTop + dy;
        item.style.left = `${nextLeft}px`;
        item.style.top = `${nextTop}px`;
      }
    });

    const endDrag = e => {
      if (!isDragging) return;
      isDragging = false;
      item.classList.remove('dragging');
      try {
        item.releasePointerCapture(e.pointerId);
      } catch (_) {}

      // If dragged only slightly, treat as click to open
      if (dragDistance < 6 && item.classList.contains('project-card')) {
        const projId = item.dataset.project;
        if (projId) openProjectModal(projId);
      }
    };

    item.addEventListener('pointerup', endDrag);
    item.addEventListener('pointercancel', endDrag);

    // Click handler fallback for touch/keyboard
    item.addEventListener('click', e => {
      if (dragDistance >= 6) return;
      if (e.target.closest('button, a')) return;
      const projId = item.dataset.project;
      if (projId) openProjectModal(projId);
    });
  });

  // --- 3. Project Detail Slide Overlay (.project-view) ---
  const projectDatabase = {
    hvac: {
      title: 'HVAC Ad Crew',
      year: '2026',
      role: 'Website Design · Conversion Architecture · AI Video Ads',
      status: 'Live Commercial Engine',
      description: 'A focused commercial website and short-form AI video advertising system built around one specific trade: helping an HVAC company book more calls. Features 6 targeted video angles that reframe high-ticket objections into easy decisions.',
      liveUrl: 'https://hvacadcrew.com',
      repoUrl: 'https://github.com/cyalcala/ad-agency-cyrus',
      caseUrl: '/work/hvac-ad-crew/',
      slides: [
        { type: 'img', src: '/assets/projects/hvac-ad-crew.webp', alt: 'HVAC Ad Crew live landing page with screening room aesthetics' },
        { type: 'video', src: '/assets/hvac/ad6-phone-bill.mp4', poster: '/assets/hvac/ad6-phone-bill.jpg', label: 'Angle 01 · Monthly Financing' },
        { type: 'video', src: '/assets/hvac/ad1-same-house.mp4', poster: '/assets/hvac/ad1-same-house.jpg', label: 'Angle 02 · Rising Energy Costs' },
        { type: 'video', src: '/assets/hvac/ad8-membership.mp4', poster: '/assets/hvac/ad8-membership.jpg', label: 'Angle 03 · Maintenance Membership' },
        { type: 'video', src: '/assets/hvac/ad7-vents.mp4', poster: '/assets/hvac/ad7-vents.jpg', label: 'Angle 04 · Air Quality Visual Proof' }
      ]
    },
    va: {
      title: 'VA Freelance Hub',
      year: '2026',
      role: 'Product Design · Fullstack Development · Cloudflare Automation',
      status: 'Live Portfolio Product',
      description: 'A focused remote work index connecting Filipino freelancers with direct, verified opportunities across global tech and services companies. Ingests job feeds, de-duplicates listings, and runs location verification.',
      liveUrl: 'https://remotejobs-ph.pages.dev',
      repoUrl: 'https://github.com/cyalcala/va-freelance-hub',
      caseUrl: '/work/va-freelance-hub/',
      slides: [
        { type: 'img', src: '/assets/projects/va-hub.webp', alt: 'VA Freelance Hub interface showcasing remote listings' }
      ]
    },
    tw: {
      title: 'Techwriter Bot',
      year: '2026',
      role: 'AI Workflows · Svelte Interface · Technical Documentation Engine',
      status: 'Live Portfolio Product',
      description: 'An AI-assisted technical writing workspace for document questioning, draft review, diagram generation, and verifiable citations. Preserves line references and source context so writers can audit AI responses.',
      liveUrl: 'https://tw-bot.pages.dev',
      repoUrl: 'https://github.com/cyalcala/techwriter-bot',
      caseUrl: '/work/techwriter-bot/',
      slides: [
        { type: 'img', src: '/assets/projects/techwriter.webp', alt: 'Techwriter Bot document workspace and review tools' }
      ]
    },
    art: {
      title: 'Project Zero / Portfolio',
      year: '2026',
      role: 'Art Direction · Design Tokens · Interaction Engineering',
      status: 'Production System',
      description: 'The editorial portfolio architecture you are currently browsing. Inspired by the spatial freedom of kiaradigregorio.com, elevated with an accessible dual-mode canvas, tactile physics, and rich mobile responsiveness.',
      liveUrl: '/',
      repoUrl: 'https://github.com/cyalcala/newsite',
      caseUrl: '/work/cyrusalcala/',
      slides: [
        { type: 'img', src: '/assets/social-card.png', alt: 'Design system overview and visual composition' }
      ]
    }
  };

  function openProjectModal(id) {
    const data = projectDatabase[id];
    if (!data || !projectView) return;

    document.getElementById('infoTitle').textContent = data.title;
    document.getElementById('infoYear').textContent = data.year;
    document.getElementById('infoDesc').textContent = data.description;
    
    const liveLink = document.getElementById('infoLiveLink');
    if (liveLink) {
      liveLink.href = data.liveUrl;
      liveLink.style.display = data.liveUrl ? 'inline-flex' : 'none';
    }

    const repoLink = document.getElementById('infoRepoLink');
    if (repoLink) {
      repoLink.href = data.repoUrl;
      repoLink.style.display = data.repoUrl ? 'inline-flex' : 'none';
    }

    const caseLink = document.getElementById('infoCaseLink');
    if (caseLink) {
      caseLink.href = data.caseUrl;
      caseLink.style.display = data.caseUrl ? 'inline-flex' : 'none';
    }

    // Build slides
    if (projectScroll) {
      projectScroll.innerHTML = data.slides.map(s => {
        if (s.type === 'video') {
          return `
            <figure class="slide">
              <div class="slide-media">
                <video controls playsinline preload="metadata" poster="${s.poster}">
                  <source src="${s.src}" type="video/mp4">
                </video>
              </div>
            </figure>
          `;
        }
        return `
          <figure class="slide">
            <div class="slide-media">
              <img src="${s.src}" alt="${s.alt}" loading="lazy" decoding="async">
            </div>
          </figure>
        `;
      }).join('');
      projectScroll.scrollTop = 0;
    }

    projectView.classList.add('preparing');
    requestAnimationFrame(() => {
      projectView.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  function closeProjectModal() {
    if (!projectView) return;
    projectView.classList.remove('open');
    document.body.style.overflow = '';
    // Pause any playing videos in slides
    projectView.querySelectorAll('video').forEach(v => v.pause());
    setTimeout(() => {
      projectView.classList.remove('preparing');
    }, 450);
  }

  if (closeProject) closeProject.addEventListener('click', closeProjectModal);
  if (viewBackdrop) viewBackdrop.addEventListener('click', closeProjectModal);

  // Sync scroll indicator thumb with slide scroll
  if (projectScroll && scrollThumb) {
    projectScroll.addEventListener('scroll', () => {
      const maxScroll = projectScroll.scrollHeight - projectScroll.clientHeight;
      if (maxScroll <= 0) return;
      const progress = projectScroll.scrollTop / maxScroll;
      const maxThumbMove = 56; // 84px track - 22px thumb - padding
      scrollThumb.style.transform = `translateY(${progress * maxThumbMove}px)`;
    });
  }

  // --- 4. Profile Popover & About Takeover ---
  if (portrait && profilePopover) {
    portrait.addEventListener('click', e => {
      e.stopPropagation();
      profilePopover.classList.toggle('open');
    });

    document.addEventListener('click', e => {
      if (profilePopover.classList.contains('open') && !profilePopover.contains(e.target) && !portrait.contains(e.target)) {
        profilePopover.classList.remove('open');
      }
    });

    if (careerButton && contactButton && careerPanel && contactPanel) {
      careerButton.addEventListener('click', () => {
        careerButton.classList.add('active');
        contactButton.classList.remove('active');
        careerPanel.classList.add('active');
        contactPanel.classList.remove('active');
      });

      contactButton.addEventListener('click', () => {
        contactButton.classList.add('active');
        careerButton.classList.remove('active');
        contactPanel.classList.add('active');
        careerPanel.classList.remove('active');
      });
    }
  }

  // About Takeover Toggle
  if (aboutButton && canvas) {
    aboutButton.addEventListener('click', () => {
      if (profilePopover) profilePopover.classList.remove('open');
      canvas.classList.add('about-mode');
    });
  }

  if (aboutBackBtn && canvas) {
    aboutBackBtn.addEventListener('click', () => {
      canvas.classList.remove('about-mode');
    });
  }

  // Keyboard Escape Handler for All Modals
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (projectView && projectView.classList.contains('open')) {
        closeProjectModal();
      } else if (canvas && canvas.classList.contains('about-mode')) {
        canvas.classList.remove('about-mode');
      } else if (profilePopover && profilePopover.classList.contains('open')) {
        profilePopover.classList.remove('open');
      }
    }
  });

  // --- 5. Interactive Tracking Eyes Widget ---
  if (pupilLeft && pupilRight) {
    document.addEventListener('mousemove', e => {
      if (!canvas || !canvas.classList.contains('fun-mode')) return;
      const eyes = layoutEyes?.getBoundingClientRect();
      if (!eyes) return;

      const eyeCenterX = eyes.left + eyes.width / 2;
      const eyeCenterY = eyes.top + eyes.height / 2;
      const dx = e.clientX - eyeCenterX;
      const dy = e.clientY - eyeCenterY;
      const angle = Math.atan2(dy, dx);
      const distance = Math.min(Math.hypot(dx, dy) / 40, 5); // Clamped eye pupil distance

      const px = Math.cos(angle) * distance;
      const py = Math.sin(angle) * distance;

      pupilLeft.setAttribute('transform', `translate(${px}, ${py})`);
      pupilRight.setAttribute('transform', `translate(${px}, ${py})`);
    });

    // Clicking eyes shuffles/scatters playground cards
    if (layoutEyes) {
      layoutEyes.addEventListener('click', () => {
        const funItems = document.querySelectorAll('.fun-item');
        funItems.forEach(item => {
          const randomRot = (Math.random() * 16 - 8).toFixed(1);
          const randomScale = (0.95 + Math.random() * 0.1).toFixed(2);
          item.style.transform = `rotate(${randomRot}deg) scale(${randomScale})`;
        });
      });
    }
  }

  // --- 6. Ambient Sound Player Simulation ---
  const thoughtMessages = [
    "Currently testing AI video workflows at 2am...",
    "Listening: Midnight Manila Lo-Fi Session",
    "Writing documentation for verifiable AI agents",
    "Designing spatial interfaces with tactile physics",
    "Exploring Grok prompt patterns for knowledge systems"
  ];
  let thoughtIndex = 0;
  let isPlayingAudio = false;

  if (trackPlayBtn && trackBars && trackDisc) {
    trackPlayBtn.addEventListener('click', () => {
      isPlayingAudio = !isPlayingAudio;
      trackPlayBtn.textContent = isPlayingAudio ? '❚❚' : '▶';
      trackPlayBtn.setAttribute('aria-pressed', isPlayingAudio);
      
      if (isPlayingAudio) {
        trackBars.classList.add('is-active');
        trackDisc.classList.add('is-playing');
        if (portrait) portrait.classList.add('is-spinning');
      } else {
        trackBars.classList.remove('is-active');
        trackDisc.classList.remove('is-playing');
        if (portrait) portrait.classList.remove('is-spinning');
      }
    });

    if (trackNextBtn && trackTitle) {
      trackNextBtn.addEventListener('click', () => {
        thoughtIndex = (thoughtIndex + 1) % thoughtMessages.length;
        trackTitle.textContent = thoughtMessages[thoughtIndex];
        trackTitle.style.animation = 'none';
        void trackTitle.offsetWidth;
        trackTitle.style.animation = 'panelIn 0.3s ease both';
      });
    }
  }
}

  // --- 7. Inquiry Modal Dialog Integration ---
  const dialog = document.getElementById('inquiry-dialog');
  if (dialog) {
    const closeBtn = dialog.querySelector('.inquiry-close-btn');
    const backdrop = dialog.querySelector('.inquiry-backdrop');
    const doneBtn = dialog.querySelector('.form-done-btn');
    const firstInput = dialog.querySelector('#inquiry-name');

    function openInquiryDialog() {
      dialog.classList.add('is-active');
      void dialog.offsetWidth;
      dialog.classList.add('is-visible');
      document.body.style.overflow = 'hidden';
      if (window.innerWidth > 700 && firstInput) {
        setTimeout(() => firstInput.focus(), 120);
      }
    }

    function closeInquiryDialog() {
      dialog.classList.remove('is-visible');
      document.body.style.overflow = '';
      setTimeout(() => dialog.classList.remove('is-active'), 280);
    }

    document.addEventListener('click', e => {
      const trigger = e.target.closest('.open-inquiry-btn, a[href="#contact"], a[href="#inquiry"]');
      if (trigger) {
        e.preventDefault();
        if (profilePopover) profilePopover.classList.remove('open');
        openInquiryDialog();
      }
    });

    if (closeBtn) closeBtn.addEventListener('click', closeInquiryDialog);
    if (backdrop) backdrop.addEventListener('click', closeInquiryDialog);
    if (doneBtn) doneBtn.addEventListener('click', closeInquiryDialog);

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && dialog.classList.contains('is-visible')) {
        closeInquiryDialog();
      }
    });
  }

  // --- 8. Contact Form Async Submission with Validation ---
  const form = document.querySelector('.inquiry-form');
  const successBox = document.getElementById('inquiry-success');
  if (form && successBox) {
    const submitBtn = form.querySelector('.form-button');
    const nameInput = form.querySelector('[name="entry.25383299"]');
    const emailInput = form.querySelector('[name="entry.668403667"]');
    const detailsInput = form.querySelector('[name="entry.923088650"]');
    const resetBtn = successBox.querySelector('.form-reset-btn');

    form.addEventListener('submit', async event => {
      event.preventDefault();

      if (!nameInput?.value.trim() || !emailInput?.value.trim() || !detailsInput?.value.trim()) {
        alert('Please fill in all required fields (Name, Email, and Project Details).');
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending inquiry...';
      }

      try {
        const formData = new FormData(form);
        const params = new URLSearchParams();
        for (const [key, val] of formData.entries()) {
          if (key !== 'inquiry_hp') params.append(key, val);
        }

        await fetch(form.action, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: params.toString()
        });

        form.hidden = true;
        successBox.hidden = false;
      } catch (_) {
        form.submit();
        form.hidden = true;
        successBox.hidden = false;
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send inquiry →';
        }
      }
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        form.reset();
        form.hidden = false;
        successBox.hidden = true;
      });
    }
  }
});

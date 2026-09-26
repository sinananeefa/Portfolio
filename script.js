/**
 * Muhammed Sinan Aneefa — Interactive Portfolio Logic
 * High-Performance, Zero-Latency Motion & Instant Scrolling Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // -------------------------------------------------------------------------
  // 0. High-Speed Preloader (0% to 100% in ~350ms)
  // -------------------------------------------------------------------------
  const preloader = document.getElementById('preloader');
  const preloaderCounter = document.getElementById('preloaderCounter');
  const preloaderProgress = document.getElementById('preloaderProgress');

  if (preloader) {
    let currentPercent = 0;
    const duration = prefersReducedMotion ? 100 : 380;
    const startTime = performance.now();

    function updatePreloader(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      currentPercent = Math.floor(progress * 100);

      if (preloaderCounter) {
        preloaderCounter.textContent = `LOADING... ${currentPercent}%`;
      }
      if (preloaderProgress) {
        preloaderProgress.style.width = `${currentPercent}%`;
      }

      if (progress < 1) {
        requestAnimationFrame(updatePreloader);
      } else {
        setTimeout(() => {
          preloader.classList.add('fade-out');
          initHeroAnimations();
        }, 80);
      }
    }

    requestAnimationFrame(updatePreloader);
  }

  // -------------------------------------------------------------------------
  // 1. Dark / Light Theme Toggle with LocalStorage
  // -------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const htmlRoot = document.documentElement;

  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = htmlRoot.getAttribute('data-theme');
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      htmlRoot.setAttribute('data-theme', nextTheme);
      localStorage.setItem('portfolio-theme', nextTheme);
    });
  }

  // -------------------------------------------------------------------------
  // 2. Zero-Latency Native Smooth Anchor Navigation
  // -------------------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const headerOffset = 70;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
          });
        }
      }
    });
  });

  // -------------------------------------------------------------------------
  // 3. Mobile Navigation Drawer
  // -------------------------------------------------------------------------
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerLinks = document.querySelectorAll('.drawer-link, .drawer-cv-btn');

  function toggleDrawer() {
    const isOpen = mobileDrawer.classList.contains('open');
    if (isOpen) {
      mobileDrawer.classList.remove('open');
      hamburgerBtn.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    } else {
      mobileDrawer.classList.add('open');
      hamburgerBtn.classList.add('active');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
      mobileDrawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  if (hamburgerBtn && mobileDrawer) {
    hamburgerBtn.addEventListener('click', toggleDrawer);

    drawerLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (mobileDrawer.classList.contains('open')) {
          toggleDrawer();
        }
      });
    });
  }

  // -------------------------------------------------------------------------
  // 4. Hero Auto-Rotating Photo Slider
  // -------------------------------------------------------------------------
  const slides = document.querySelectorAll('.slider-slide');
  let currentSlide = 0;

  if (slides.length > 1 && !prefersReducedMotion) {
    setInterval(() => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }, 4000);
  }

  // -------------------------------------------------------------------------
  // 5. About Section Bio Accordion
  // -------------------------------------------------------------------------
  const readBioToggle = document.getElementById('readBioToggle');
  const expandedBio = document.getElementById('expandedBio');
  const readBioLabel = document.getElementById('readBioLabel');

  if (readBioToggle && expandedBio) {
    readBioToggle.addEventListener('click', () => {
      const isOpen = expandedBio.classList.contains('open');
      if (isOpen) {
        expandedBio.classList.remove('open');
        readBioLabel.innerHTML = 'Read Full Story &plus;';
      } else {
        expandedBio.classList.add('open');
        readBioLabel.innerHTML = 'Show Less &minus;';
      }
      if (typeof ScrollTrigger !== 'undefined') {
        setTimeout(() => ScrollTrigger.refresh(), 300);
      }
    });
  }

  // -------------------------------------------------------------------------
  // 6. WhatsApp Inline Form Integration
  // -------------------------------------------------------------------------
  const sendWhatsAppBtn = document.getElementById('sendWhatsAppBtn');
  const waName = document.getElementById('waName');
  const waEmail = document.getElementById('waEmail');
  const waTopic = document.getElementById('waTopic');
  const waMessage = document.getElementById('waMessage');

  if (sendWhatsAppBtn) {
    sendWhatsAppBtn.addEventListener('click', () => {
      const name = (waName ? waName.value.trim() : '');
      const email = (waEmail ? waEmail.value.trim() : '');
      const topic = (waTopic ? waTopic.value : 'General Inquiry');
      const message = (waMessage ? waMessage.value.trim() : '');

      if (!name || !message) {
        alert('Please provide your name and message details.');
        return;
      }

      const text = `Hi Sinan,\n\nMy name is ${name}${email ? ` (${email})` : ''}.\nTopic: ${topic}\n\nMessage:\n${message}`;
      const encodedText = encodeURIComponent(text);
      const waUrl = `https://wa.me/919496595249?text=${encodedText}`;

      window.open(waUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // -------------------------------------------------------------------------
  // 7. Copy to Clipboard Functionality
  // -------------------------------------------------------------------------
  const copyButtons = document.querySelectorAll('.btn-copy');

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', function () {
      const targetId = this.getAttribute('data-target');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const textToCopy = targetEl.textContent.trim();
        navigator.clipboard.writeText(textToCopy).then(() => {
          const originalHTML = this.innerHTML;
          this.classList.add('copied');
          this.innerHTML = `<span>Copied!</span>`;

          setTimeout(() => {
            this.classList.remove('copied');
            this.innerHTML = originalHTML;
          }, 1800);
        }).catch(() => {
          alert(`Copied: ${textToCopy}`);
        });
      }
    });
  });

  // -------------------------------------------------------------------------
  // 8. Snappy, High-FPS GSAP Scroll Animations
  // -------------------------------------------------------------------------
  function initHeroAnimations() {
    if (typeof gsap === 'undefined' || prefersReducedMotion) return;

    gsap.from('.hero-status-pill', {
      opacity: 0,
      y: 14,
      duration: 0.45,
      ease: 'power2.out',
    });

    gsap.from('.hero-intro-name, .hero-huge-headline', {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.5,
      ease: 'power2.out',
      delay: 0.1,
    });

    gsap.from('.hero-value-prop, .hero-actions, .hero-social-urls', {
      opacity: 0,
      y: 15,
      stagger: 0.08,
      duration: 0.45,
      ease: 'power2.out',
      delay: 0.2,
    });
  }

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && !prefersReducedMotion) {
    gsap.registerPlugin(ScrollTrigger);

    // Section Tag Mono & Headings slide-up + fade quickly on entry
    document.querySelectorAll('.section-tag-mono, .section-main-heading, .about-heading').forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 93%',
          once: true,
        },
        opacity: 0,
        y: 18,
        duration: 0.4,
        ease: 'power2.out',
      });
    });

    // Skill Subsections: Clean block reveal with clearProps so all tiles are always 100% visible
    document.querySelectorAll('.skill-subsection').forEach((sub) => {
      gsap.from(sub, {
        scrollTrigger: {
          trigger: sub,
          start: 'top 95%',
          once: true,
        },
        opacity: 0,
        y: 12,
        duration: 0.35,
        ease: 'power2.out',
        clearProps: 'all'
      });
    });

    // Project Cards: Fast, responsive reveal (0.05s delay)
    document.querySelectorAll('.selected-work-grid, .other-projects-grid').forEach((grid) => {
      const cards = grid.querySelectorAll('.work-card');
      if (cards.length > 0) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: grid,
            start: 'top 90%',
            once: true,
          },
          opacity: 0,
          y: 20,
          stagger: 0.06,
          duration: 0.45,
          ease: 'power2.out',
          clearProps: 'all'
        });
      }
    });

    // Timeline item reveal
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length > 0) {
      gsap.from(timelineItems, {
        scrollTrigger: {
          trigger: '.timeline-wrapper',
          start: 'top 90%',
          once: true,
        },
        opacity: 0,
        x: -15,
        duration: 0.45,
        ease: 'power2.out',
        clearProps: 'all'
      });
    }

    // Contact Form & Channels reveal
    const contactLayout = document.querySelector('.contact-layout');
    if (contactLayout) {
      gsap.from(contactLayout, {
        scrollTrigger: {
          trigger: '#contact',
          start: 'top 88%',
          once: true,
        },
        opacity: 0,
        y: 20,
        duration: 0.45,
        ease: 'power2.out',
        clearProps: 'all'
      });
    }

    window.addEventListener('resize', () => {
      ScrollTrigger.refresh();
    }, { passive: true });
  }
});

/* ============================================================
   CARING HEART FAMILY NURSE PRACTITIONER — Global JavaScript
   ============================================================
   EDIT GUIDE:
   ┌─ NAV LINKS ──────────────────────────────────────────────┐
   │  Edit the NAV_LINKS array below.                         │
   │  Each item: { label, href, cta: true/false }             │
   │  cta: true  → renders as the red pill "Make Appt" button │
   └──────────────────────────────────────────────────────────┘
   ┌─ FOOTER ─────────────────────────────────────────────────┐
   │  Edit FOOTER_CONFIG below.                               │
   │  Change phone, address, tagline, nav links etc.          │
   └──────────────────────────────────────────────────────────┘
   ┌─ LOGO / SITE NAME ───────────────────────────────────────┐
   │  Edit SITE_CONFIG below.                                 │
   └──────────────────────────────────────────────────────────┘
   ============================================================ */

(function () {
  'use strict';

  /* ══════════════════════════════════════════════════════════
     ★  SITE CONFIG — edit this section to update site-wide
     ══════════════════════════════════════════════════════════ */

  // ── GitHub Pages subdirectory base path ──────────────────
  // If your site moves to a custom domain at the root, set this to ''.
  const BASE_PATH = '/caringheartnp';

  const SITE_CONFIG = {
    // Swap this to a local path once you have your logo saved, e.g. '/assets/img/logo.png'
    logoSrc:    'https://static.wixstatic.com/media/a3267d_44c54a165a7044ec81f2a28ec9357a76%7Emv2.png',
    logoAlt:    'Caring Heart Family Nurse Practitioner Logo',
    siteName:   'Caring Heart',
    siteTagline:'Family Nurse Practitioner',
    phone:      '(407) 550-7077',
    phoneTel:   '4075507077',
  };

  /* ──────────────────────────────────────────────────────────
     NAV LINKS
     label : text shown in the nav bar
     href  : site-relative path, e.g. /home/  (BASE_PATH is prepended automatically)
     cta   : true = styled as the red pill button on the right
  ────────────────────────────────────────────────────────── */
  const NAV_LINKS = [
    { label: 'Home',                href: '/home/' },
    { label: 'Services Available',  href: '/services/' },
    { label: 'Patient Portal',      href: 'https://app.elationpassport.com/passport/login/', external: true },
    { label: 'Our Team',            href: '/our-team/' },
    { label: 'Privacy Policy',      href: '/privacy-policy/' },
    { label: 'Make an Appointment', href: 'https://app.elationemr.com/book/caringheart', cta: true, target: '_blank', external: true },
  ];

  /* ──────────────────────────────────────────────────────────
     FOOTER CONFIG
     navLinks mirrors NAV_LINKS but you can trim / reorder
  ────────────────────────────────────────────────────────── */
  const FOOTER_CONFIG = {
    blurb: 'Compassionate, personalized primary care for Palm Coast, Florida families — in the office or in the comfort of your home.',
    navLinks: [
      { label: 'Home',                href: '/home/' },
      { label: 'Services Available',  href: '/services/' },
      { label: 'Make an Appointment', href: 'https://app.elationemr.com/book/caringheart', external: true },
      { label: 'Patient Portal',      href: 'https://app.elationpassport.com/passport/login/', external: true },
      { label: 'Our Team',            href: '/our-team/' },
      { label: 'Privacy Policy',      href: '/privacy-policy/' },
    ],
    address: 'Serving the Palm Coast, Florida region',
  };

  // Prepend BASE_PATH to any href that doesn't start with http/https/#/mailto/tel
  function resolveHref(href) {
    if (!href) return href;
    if (/^(https?:|mailto:|tel:|#)/.test(href)) return href;
    return BASE_PATH + href;
  }

  /* ══════════════════════════════════════════════════════════
     NAV INJECTION
     Looks for <div id="site-nav-placeholder"></div> in each
     page and replaces it with the full header HTML.
     ══════════════════════════════════════════════════════════ */
  function buildNav() {
    const placeholder = document.getElementById('site-nav-placeholder');
    if (!placeholder) return;

    const linkItems = NAV_LINKS.map(link => {
      const cls = link.cta ? 'nav-cta' : '';
      const target = link.target ? ` target="${link.target}"` : '';
      return `<li><a href="${resolveHref(link.href)}"${cls ? ` class="${cls}"` : ''}${target}>${link.label}</a></li>`;
    }).join('\n            ');

    placeholder.outerHTML = `
<div class="emergency-bar">
  <strong>Medical Emergency?</strong> Call <strong>911</strong> immediately.
  For appointments call
  <a href="tel:${SITE_CONFIG.phoneTel}" style="color:var(--color-gold-light);font-weight:600;">${SITE_CONFIG.phone}</a>
</div>

<nav class="site-nav" role="navigation" aria-label="Main navigation">
  <div class="container nav-inner">

    <a href="${resolveHref('/home/')}" class="nav-logo" aria-label="${SITE_CONFIG.siteName} — Home">
      <img src="${SITE_CONFIG.logoSrc}" alt="${SITE_CONFIG.logoAlt}">
      <div class="nav-logo-text">
        <span class="name">${SITE_CONFIG.siteName}</span>
        <span class="tagline">${SITE_CONFIG.siteTagline}</span>
      </div>
    </a>

    <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>

    <ul class="nav-links" role="list">
      ${linkItems}
    </ul>

  </div>
</nav>`;
  }

  /* ══════════════════════════════════════════════════════════
     FOOTER INJECTION
     Looks for <div id="site-footer-placeholder"></div>
     ══════════════════════════════════════════════════════════ */
  function buildFooter() {
    const placeholder = document.getElementById('site-footer-placeholder');
    if (!placeholder) return;

    const footerNavItems = FOOTER_CONFIG.navLinks.map(link =>
      `<li><a href="${resolveHref(link.href)}">${link.label}</a></li>`
    ).join('\n            ');

    placeholder.outerHTML = `
<footer class="site-footer" role="contentinfo">
  <div class="container">
    <div class="footer-grid">

      <div class="footer-brand">
        <div class="name">${SITE_CONFIG.siteName}</div>
        <div class="tagline">${SITE_CONFIG.siteTagline}</div>
        <p>${FOOTER_CONFIG.blurb}</p>
      </div>

      <div class="footer-col">
        <h4>Navigation</h4>
        <ul>${footerNavItems}</ul>
      </div>

      <div class="footer-col">
        <h4>Contact</h4>
        <address>
          Phone: <a href="tel:${SITE_CONFIG.phoneTel}">${SITE_CONFIG.phone}</a><br><br>
          ${FOOTER_CONFIG.address}<br><br>
          <a href="${resolveHref('/appointment/')}">Book an Appointment &rarr;</a>
        </address>
      </div>

    </div>

    <div class="footer-bottom">
      <span>&copy; <span id="footer-year"></span> ${SITE_CONFIG.siteName} ${SITE_CONFIG.siteTagline}. All rights reserved.</span>
      <a href="/privacy-policy/">Privacy Policy</a>
    </div>
  </div>
</footer>`;
  }

  /* ══════════════════════════════════════════════════════════
     ACTIVE NAV LINK — highlights the current page
     ══════════════════════════════════════════════════════════ */
  function setActiveNav() {
    const currentPath = window.location.pathname.replace(/\/$/, '');
    // Strip the base path so we can compare against the short hrefs in NAV_LINKS
    const strippedPath = currentPath.startsWith(BASE_PATH)
      ? currentPath.slice(BASE_PATH.length)
      : currentPath;
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (!href || /^(https?:|mailto:|tel:)/.test(href)) return;
      // Strip base path from the link href too before comparing
      const linkPath = href.startsWith(BASE_PATH)
        ? href.slice(BASE_PATH.length).replace(/\/$/, '')
        : new URL(href, window.location.origin).pathname.replace(/\/$/, '');
      if (linkPath === strippedPath || (strippedPath === '' && linkPath === '/home')) {
        link.classList.add('active');
      }
    });
  }

  /* ══════════════════════════════════════════════════════════
     MOBILE NAV TOGGLE
     ══════════════════════════════════════════════════════════ */
  function initMobileNav() {
    const toggle   = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', false);
      });
    });

    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', false);
      }
    });
  }

  /* ══════════════════════════════════════════════════════════
     SCROLL REVEAL (Intersection Observer)
     ══════════════════════════════════════════════════════════ */
  function initReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    elements.forEach(el => observer.observe(el));
  }

  /* ══════════════════════════════════════════════════════════
     NAV SHADOW ON SCROLL
     ══════════════════════════════════════════════════════════ */
  function initNavScroll() {
    const nav = document.querySelector('.site-nav');
    if (!nav) return;
    window.addEventListener('scroll', () => {
      nav.style.boxShadow = window.scrollY > 10
        ? '0 4px 24px rgba(46,40,38,0.14)'
        : '0 2px 8px rgba(46,40,38,0.08)';
    }, { passive: true });
  }

  /* ══════════════════════════════════════════════════════════
     SMOOTH ANCHOR SCROLLING
     ══════════════════════════════════════════════════════════ */
  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const navHeight = document.querySelector('.site-nav')?.offsetHeight || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

  /* ══════════════════════════════════════════════════════════
     FOOTER YEAR
     ══════════════════════════════════════════════════════════ */
  function setFooterYear() {
    const el = document.getElementById('footer-year');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ══════════════════════════════════════════════════════════
     INIT — runs on every page load
     ══════════════════════════════════════════════════════════ */
  document.addEventListener('DOMContentLoaded', () => {
    buildNav();          // ← inject header + emergency bar
    buildFooter();       // ← inject footer
    setActiveNav();      // ← highlight current page link
    initMobileNav();     // ← hamburger toggle
    initReveal();        // ← scroll fade-in animations
    initNavScroll();     // ← nav shadow on scroll
    initSmoothAnchors(); // ← smooth # anchor scrolling
    setFooterYear();     // ← dynamic copyright year
  });

})();

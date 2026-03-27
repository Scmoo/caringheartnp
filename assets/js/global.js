/* ============================================================
   CARING HEART FAMILY NURSE PRACTITIONER — Global JavaScript
   ============================================================ */

(function () {
  'use strict';

  // ── Active Nav Link ─────────────────────────────────────────
  function setActiveNav() {
    const path = window.location.pathname;
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (!href) return;
      // Normalize both paths for comparison
      const linkPath = new URL(href, window.location.origin).pathname.replace(/\/$/, '');
      const currentPath = path.replace(/\/$/, '');
      if (linkPath === currentPath || (currentPath === '' && linkPath === '/home')) {
        link.classList.add('active');
      }
    });
  }

  // ── Mobile Nav Toggle ───────────────────────────────────────
  function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a nav link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', false);
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', false);
      }
    });
  }

  // ── Scroll Reveal (Intersection Observer) ───────────────────
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

  // ── Sticky Nav Shadow on Scroll ─────────────────────────────
  function initNavScroll() {
    const nav = document.querySelector('.site-nav');
    if (!nav) return;

    window.addEventListener('scroll', () => {
      nav.style.boxShadow = window.scrollY > 10
        ? '0 4px 24px rgba(46,40,38,0.14)'
        : '0 2px 8px rgba(46,40,38,0.08)';
    }, { passive: true });
  }

  // ── Smooth Anchor Scrolling ──────────────────────────────────
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

  // ── Current Year in Footer ───────────────────────────────────
  function setFooterYear() {
    const el = document.getElementById('footer-year');
    if (el) el.textContent = new Date().getFullYear();
  }

  // ── Init ────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    setActiveNav();
    initMobileNav();
    initReveal();
    initNavScroll();
    initSmoothAnchors();
    setFooterYear();
  });

})();

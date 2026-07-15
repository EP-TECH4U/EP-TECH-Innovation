/* ============================================================
   EP TECH INNOVATION — main script
   Mobile nav · scroll reveals · header state · counters ·
   hero network canvas · pillar node-link effect · form ·
   back-to-top · active-link tracking
   ============================================================ */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  /* ---------------------------------------------------------
     1. Mobile nav toggle
     --------------------------------------------------------- */
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  var backdrop = document.getElementById('navBackdrop');

  function openNav() {
    links.classList.add('is-open');
    backdrop.classList.add('is-open');
    toggle.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeNav() {
    links.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  if (toggle) {
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.contains('is-open');
      if (isOpen) closeNav();
      else openNav();
    });
  }
  if (backdrop) backdrop.addEventListener('click', closeNav);

  var navLinkEls = document.querySelectorAll('.nav__link[data-link]');
  navLinkEls.forEach(function (el) {
    el.addEventListener('click', closeNav);
  });

  // close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });

  // close if resized to desktop while open
  window.addEventListener('resize', function () {
    if (window.innerWidth > 860) closeNav();
  });

  /* ---------------------------------------------------------
     2. Header scroll state + active link tracking
     --------------------------------------------------------- */
  var header = document.getElementById('siteHeader');
  var sections = document.querySelectorAll('section[id]');
  var backToTop = document.getElementById('backToTop');

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;

    if (header) {
      if (y > 40) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
    }

    if (backToTop) {
      if (y > 700) backToTop.classList.add('is-visible');
      else backToTop.classList.remove('is-visible');
    }

    // active nav link
    var scrollPos = y + (window.innerHeight * 0.35);
    sections.forEach(function (sec) {
      var top = sec.offsetTop;
      var bottom = top + sec.offsetHeight;
      var id = sec.getAttribute('id');
      var link = document.querySelector('.nav__link[href="#' + id + '"]');
      if (!link) return;
      if (scrollPos >= top && scrollPos < bottom) {
        navLinkEls.forEach(function (l) { l.classList.remove('active'); });
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

  var scrollCue = document.getElementById('scrollCue');
  if (scrollCue) {
    scrollCue.addEventListener('click', function () {
      var about = document.getElementById('about');
      if (about) about.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---------------------------------------------------------
     3. Scroll-triggered reveal animations
     --------------------------------------------------------- */
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach(function (el, i) {
      // slight stagger per section based on index within its parent
      el.style.transitionDelay = (i % 5) * 70 + 'ms';
      revealObserver.observe(el);
    });
  } else {
    // fallback / reduced motion: show everything immediately
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------------------------------------------------------
     4. Number counters (member count)
     --------------------------------------------------------- */
  var counters = document.querySelectorAll('.counter');

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10) || 0;
    if (prefersReducedMotion) {
      el.textContent = target;
      return;
    }
    var duration = 1400;
    var startTime = null;

    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach(function (c) { counterObserver.observe(c); });
  } else {
    counters.forEach(animateCounter);
  }

  /* ---------------------------------------------------------
     5. Hero network canvas — nodes drifting + connecting lines
     --------------------------------------------------------- */
  var canvas = document.getElementById('networkCanvas');
  if (canvas && !prefersReducedMotion) {
    var ctx = canvas.getContext('2d');
    var hero = document.querySelector('.hero');
    var nodes = [];
    var NODE_COUNT = 46;
    var LINK_DIST = 140;
    var rafId = null;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      var rect = hero.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function makeNodes() {
      var rect = hero.getBoundingClientRect();
      nodes = [];
      for (var i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: Math.random() * 1.4 + 0.8
        });
      }
    }

    function draw() {
      var rect = hero.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      // update + draw nodes
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > rect.width) n.vx *= -1;
        if (n.y < 0 || n.y > rect.height) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(143,191,63,0.55)';
        ctx.fill();
      }

      // draw links between close nodes
      for (var a = 0; a < nodes.length; a++) {
        for (var b = a + 1; b < nodes.length; b++) {
          var dx = nodes[a].x - nodes[b].x;
          var dy = nodes[a].y - nodes[b].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST) {
            var opacity = (1 - dist / LINK_DIST) * 0.16;
            ctx.beginPath();
            ctx.moveTo(nodes[a].x, nodes[a].y);
            ctx.lineTo(nodes[b].x, nodes[b].y);
            ctx.strokeStyle = 'rgba(143,191,63,' + opacity + ')';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      rafId = requestAnimationFrame(draw);
    }

    function init() {
      resize();
      makeNodes();
      if (rafId) cancelAnimationFrame(rafId);
      draw();
    }

    var resizeTimeout;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(init, 200);
    });

    init();

    // pause when hero is off-screen to save cycles
    if ('IntersectionObserver' in window) {
      var heroObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            if (!rafId) draw();
          } else if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
          }
        });
      }, { threshold: 0 });
      heroObserver.observe(hero);
    }
  } else if (canvas) {
    // reduced motion: hide canvas entirely, rely on static glow
    canvas.style.display = 'none';
  }

  /* ---------------------------------------------------------
     6. About pillars — node-link hover effect
     Draws faint connecting lines between hovered pillar and
     its neighbours to reinforce the "network" signature.
     --------------------------------------------------------- */
  var pillarGrid = document.getElementById('pillarGrid');
  if (pillarGrid) {
    var pillars = pillarGrid.querySelectorAll('.pillar');
    pillars.forEach(function (p) {
      p.addEventListener('mouseenter', function () {
        pillars.forEach(function (other) {
          if (other !== p) other.classList.add('is-linked');
        });
      });
      p.addEventListener('mouseleave', function () {
        pillars.forEach(function (other) { other.classList.remove('is-linked'); });
      });
      p.addEventListener('focus', function () {
        pillars.forEach(function (other) {
          if (other !== p) other.classList.add('is-linked');
        });
      });
      p.addEventListener('blur', function () {
        pillars.forEach(function (other) { other.classList.remove('is-linked'); });
      });
    });
  }

  /* ---------------------------------------------------------
     7. Newsletter form — lightweight client-side handling
     Note: this demo has no backend wired up. Swap the
     setTimeout block for a real fetch() call to your
     form endpoint (Formspree, Mailchimp, your own API, etc).
     --------------------------------------------------------- */
  var form = document.getElementById('newsletterForm');
  var formNote = document.getElementById('formNote');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nameInput = form.querySelector('input[name="name"]');
      var emailInput = form.querySelector('input[name="email"]');
      var submitBtn = form.querySelector('button[type="submit"]');
      var label = submitBtn.querySelector('.btn__label');

      if (!nameInput.value.trim() || !emailInput.checkValidity()) {
        formNote.textContent = 'Please enter a valid name and email.';
        formNote.style.color = 'var(--rust)';
        return;
      }

      var originalText = label.textContent;
      label.textContent = 'Signing up...';
      submitBtn.disabled = true;

      // Placeholder for real submission — replace with fetch() to your endpoint.
      setTimeout(function () {
        label.textContent = originalText;
        submitBtn.disabled = false;
        formNote.style.color = 'var(--moss)';
        formNote.textContent = 'You\'re on the list, ' + nameInput.value.trim().split(' ')[0] + '. Welcome aboard!';
        form.reset();
      }, 900);
    });
  }

  /* ---------------------------------------------------------
     8. Footer year
     --------------------------------------------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();

/* ============================================
   Headcam.app — Main JS
   Progressive enhancement — site works without JS
   ============================================ */

(function () {
  'use strict';

  // Mark JS as loaded for progressive enhancement (hero entrance)
  document.body.classList.add('js-loaded');

  // --- Sticky nav background on scroll ---
  var nav = document.getElementById('nav');
  var hero = document.getElementById('hero');

  var navObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        nav.classList.toggle('scrolled', !entry.isIntersecting);
      });
    },
    { threshold: 0, rootMargin: '-64px 0px 0px 0px' }
  );
  navObserver.observe(hero);

  // --- Scroll-reveal on .reveal elements ---
  var reveals = document.querySelectorAll('.reveal');

  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach(function (el) {
    revealObserver.observe(el);
  });

  // --- Mobile hamburger toggle ---
  var toggle = document.getElementById('nav-toggle');
  var links = document.getElementById('nav-links');

  toggle.addEventListener('click', function () {
    var expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    links.classList.toggle('open');
  });

  links.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      toggle.setAttribute('aria-expanded', 'false');
      links.classList.remove('open');
    }
  });

  // --- Rotating hero text ---
  var rotatingEl = document.getElementById('rotating-text');
  var phrases = [
    'head tracker.',
    'live camera.',
    'streaming studio.'
  ];
  var phraseIndex = 0;

  function rotateText() {
    rotatingEl.classList.add('fade-out');
    setTimeout(function () {
      phraseIndex = (phraseIndex + 1) % phrases.length;
      rotatingEl.textContent = phrases[phraseIndex];
      rotatingEl.classList.remove('fade-out');
      rotatingEl.classList.add('fade-in');
      rotatingEl.offsetHeight; // force reflow
      rotatingEl.classList.remove('fade-in');
    }, 350);
  }

  setInterval(rotateText, 2800);

  // --- Smooth scrolling for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // --- Scroll progress bar ---
  var scrollProgress = document.getElementById('scroll-progress');

  window.addEventListener('scroll', function () {
    var scrollTop = document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';
  }, { passive: true });

  // --- Mouse glow + 3D tilt on feature cards ---
  var canHover = window.matchMedia('(hover: hover)').matches;

  if (canHover) {
    var featuresGrid = document.querySelector('.features-grid');

    if (featuresGrid) {
      featuresGrid.addEventListener('mousemove', function (e) {
        var cards = featuresGrid.querySelectorAll('.feature-card');
        cards.forEach(function (card) {
          var rect = card.getBoundingClientRect();
          var x = e.clientX - rect.left;
          var y = e.clientY - rect.top;

          // Only apply if mouse is over this card
          if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            // Glow position
            card.style.setProperty('--glow-x', x + 'px');
            card.style.setProperty('--glow-y', y + 'px');

            // 3D tilt (max ~4 degrees)
            var centerX = rect.width / 2;
            var centerY = rect.height / 2;
            var rotateY = ((x - centerX) / centerX) * 4;
            var rotateX = ((centerY - y) / centerY) * 4;
            card.style.transform = 'perspective(600px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
          }
        });
      });

      featuresGrid.addEventListener('mouseleave', function () {
        var cards = featuresGrid.querySelectorAll('.feature-card');
        cards.forEach(function (card) {
          card.style.transform = '';
        });
      });

      // Reset individual cards on mouseleave
      var allCards = featuresGrid.querySelectorAll('.feature-card');
      allCards.forEach(function (card) {
        card.addEventListener('mouseleave', function () {
          card.style.transform = '';
        });
      });
    }
  }
})();

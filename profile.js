// Enable scroll-reveal animations only when JS is running
document.body.classList.add('js-ready');

// ─── VISITOR COUNTER ────────────────────────────────────────────────────────
(function () {
  const KEY_COUNT = 'ak_visit_count';
  const KEY_LAST  = 'ak_visit_last';

  // Increment count on each page load
  const count = parseInt(localStorage.getItem(KEY_COUNT) || '0', 10) + 1;
  localStorage.setItem(KEY_COUNT, count);
  localStorage.setItem(KEY_LAST, new Date().toLocaleString());

  // Triple-click on footer logo to reveal counter
  const logo = document.querySelector('.footer-logo');
  if (logo) {
    logo.addEventListener('click', (function () {
      let clicks = 0, timer = null;
      return function () {
        clicks++;
        clearTimeout(timer);
        timer = setTimeout(() => { clicks = 0; }, 600);
        if (clicks >= 3) {
          clicks = 0;
          document.getElementById('visit-count-num').textContent = localStorage.getItem(KEY_COUNT) || '0';
          document.getElementById('visit-last-date').textContent = localStorage.getItem(KEY_LAST) || '—';
          const panel = document.getElementById('visit-counter');
          panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
        }
      };
    })());
  }
})();
// ────────────────────────────────────────────────────────────────────────────

// SCROLL REVEAL
const reveals = document.querySelectorAll('.reveal, .timeline-item');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); }
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// SKILL BARS — animate width on scroll into view
const skillBars = document.querySelectorAll('.skill-bar');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.width = e.target.dataset.width + '%';
      barObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
skillBars.forEach(b => barObserver.observe(b));

// PARALLAX — subtle vertical shift on hero photo while scrolling
window.addEventListener('scroll', () => {
  const photo = document.querySelector('.hero-photo');
  if (photo) photo.style.transform = `scale(1.03) translateY(${window.scrollY * 0.08}px)`;
});

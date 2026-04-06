// Enable scroll-reveal animations only when JS is running
document.body.classList.add('js-ready');

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

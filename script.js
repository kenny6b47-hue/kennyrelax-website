// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Mobile nav toggle ──
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.innerHTML = open ? '&times;' : '&#9776;';
  document.body.style.overflow = open ? 'hidden' : '';
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.innerHTML = '&#9776;';
    document.body.style.overflow = '';
  });
});

// ── Scroll-driven video scrubbing ──
const videoContainer = document.getElementById('videoScrollContainer');
const video          = document.getElementById('trailerVideo');
const videoBar       = document.getElementById('videoBar');
const scrollHint     = document.getElementById('scrollHint');

let hintHidden = false;

if (videoContainer && video) {
  video.load();

  window.addEventListener('scroll', () => {
    const rect        = videoContainer.getBoundingClientRect();
    const totalScroll = videoContainer.offsetHeight - window.innerHeight;
    const scrolled    = -rect.top;
    const progress    = Math.max(0, Math.min(1, scrolled / totalScroll));

    if (video.readyState >= 2 && video.duration) {
      video.currentTime = progress * video.duration;
    }

    if (videoBar) videoBar.style.width = (progress * 100) + '%';

    if (!hintHidden && scrolled > 60) {
      hintHidden = true;
      if (scrollHint) scrollHint.style.opacity = '0';
    }
  }, { passive: true });
}

// ── Scroll-reveal ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

const fadeStyle = document.createElement('style');
fadeStyle.textContent = `
  .fade-up { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease, transform 0.6s ease; }
  .fade-up.visible { opacity: 1; transform: translateY(0); }
`;
document.head.appendChild(fadeStyle);

document.querySelectorAll(
  '.about-grid, .spotify-embed, .stream-links, .show-item, .merch-card, .contact-grid'
).forEach(el => {
  el.classList.add('fade-up');
  revealObserver.observe(el);
});

// ── Contact form ──
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const note = document.getElementById('formNote');
  note.textContent = "Message sent! We'll be in touch soon.";
  this.reset();
  setTimeout(() => { note.textContent = ''; }, 5000);
});

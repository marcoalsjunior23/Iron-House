/* ═══════════════════════════════════════════
   IRON HOUSE — script.js
═══════════════════════════════════════════ */

/* ── CURSOR CUSTOMIZADO ── */
const cursor     = document.querySelector('.cursor');
const cursorRing = document.querySelector('.cursor-ring');

if (cursor && cursorRing) {
  document.addEventListener('mousemove', e => {
    cursor.style.left     = e.clientX + 'px';
    cursor.style.top      = e.clientY + 'px';
    cursorRing.style.left = e.clientX + 'px';
    cursorRing.style.top  = e.clientY + 'px';
  });

  document.querySelectorAll('a, button, .eq-item, .modal-close').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width  = '20px';
      cursor.style.height = '20px';
      cursorRing.style.width  = '52px';
      cursorRing.style.height = '52px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width  = '10px';
      cursor.style.height = '10px';
      cursorRing.style.width  = '36px';
      cursorRing.style.height = '36px';
    });
  });
}

/* ── NAVBAR SHRINK ── */
window.addEventListener('scroll', () => {
  document.getElementById('mainNav')
    ?.classList.toggle('scrolled', window.scrollY > 60);
});

/* ── ACTIVE NAV LINK ── */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

/* ── MOBILE MENU ── */
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');

navToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = navToggle.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      const delay = parseFloat(e.target.dataset.delay || 0);
      setTimeout(() => e.target.classList.add('visible'), delay * 1000);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObs.observe(el));

/* ── CONTADOR ANIMADO ── */
function animateCounter(el) {
  const target   = parseFloat(el.dataset.target);
  const isFloat  = target % 1 !== 0;
  const suffix   = el.dataset.suffix || '';
  const duration = 2000;
  const steps    = duration / 16;
  const inc      = target / steps;
  let cur = 0;

  const iv = setInterval(() => {
    cur += inc;
    if (cur >= target) { cur = target; clearInterval(iv); }
    el.textContent = (target >= 1000
      ? Math.floor(cur).toLocaleString('pt-BR')
      : isFloat ? cur.toFixed(1)
      : Math.floor(cur)) + suffix;
  }, 16);
}

const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.count-num').forEach(el => counterObs.observe(el));

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
    navLinks?.classList.remove('open');
  });
});
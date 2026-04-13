// ── NAV SCROLL ──
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 40
      ? 'rgba(15,26,20,0.98)'
      : 'rgba(15,26,20,0.95)';
  });
}

// ── LIGHTBOX ──
let lbImgs = [], lbIdx = 0;

function initLightbox() {
  const lb = document.getElementById('lightbox');
  if (!lb) return;

  const lbImg = document.getElementById('lbImg');

  // Collect all gallery images
  const thumbs = document.querySelectorAll('.model-thumb');
  const mainImg = document.querySelector('.model-main-img');

  function openLb(i) {
    lbIdx = i;
    lbImg.src = lbImgs[i];
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLb() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  function navLb(d) {
    lbIdx = (lbIdx + d + lbImgs.length) % lbImgs.length;
    lbImg.src = lbImgs[lbIdx];
  }

  // Click main image
  if (mainImg) {
    mainImg.addEventListener('click', () => openLb(0));
  }

  // Click thumbs
  thumbs.forEach((thumb, i) => {
    const src = thumb.querySelector('img').src;
    lbImgs.push(src);
    thumb.addEventListener('click', () => {
      // Update main image
      if (mainImg) mainImg.src = src;
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
    thumb.setAttribute('data-lb-index', i);
  });

  // Double click thumb to open lightbox
  thumbs.forEach((thumb, i) => {
    thumb.addEventListener('dblclick', () => openLb(i));
  });

  // Also clicking main image opens lightbox
  if (mainImg) {
    lbImgs = Array.from(thumbs).map(t => t.querySelector('img').src);
  }

  lb.querySelector('.lb-close').addEventListener('click', closeLb);
  lb.querySelector('.lb-prev').addEventListener('click', () => navLb(-1));
  lb.querySelector('.lb-next').addEventListener('click', () => navLb(1));
  lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });

  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowRight') navLb(1);
    if (e.key === 'ArrowLeft') navLb(-1);
  });
}

// ── CONTACT FORM ──
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sent! ✓';
    btn.style.background = '#16a34a';
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      form.reset();
    }, 3000);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initLightbox();
  initContactForm();

  // Fade in on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.model-card, .feature-card, .stat-block').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
});

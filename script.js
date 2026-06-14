/* ============================================================
   FINCA EL MAGUEYAL — script.js
   Navbar · Mobile Menu · Scroll Reveal · Parallax · Counters
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────────────────
     1. NAVBAR — scroll state
  ────────────────────────────────────────── */
  const navbar = document.querySelector('.navbar');

  const updateNavbar = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  /* ──────────────────────────────────────────
     2. MOBILE MENU
  ────────────────────────────────────────── */
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.nav-mobile');
  const mobileLinks = document.querySelectorAll('.nav-mobile a, .nav-mobile .close-btn');

  const openMenu = () => {
    hamburger.classList.add('active');
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', () => {
    if (mobileMenu.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  /* ──────────────────────────────────────────
     3. SMOOTH SCROLL para anclas internas
  ────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ──────────────────────────────────────────
     4. INTERSECTION OBSERVER — scroll reveal
  ────────────────────────────────────────── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ──────────────────────────────────────────
     5. PARALLAX hero background
  ────────────────────────────────────────── */
  const heroBg = document.querySelector('.hero-bg');

  const parallaxHero = () => {
    if (!heroBg) return;
    const scrollY = window.scrollY;
    const speed = 0.35;
    heroBg.style.transform = `scale(1.08) translateY(${scrollY * speed}px)`;
  };

  window.addEventListener('scroll', parallaxHero, { passive: true });

  /* ──────────────────────────────────────────
     6. COUNTER ANIMATION (estadísticas)
  ────────────────────────────────────────── */
  const counters = document.querySelectorAll('.counter');

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const step = 16;
    const increment = target / (duration / step);
    let current = 0;

    const update = () => {
      current += increment;
      if (current >= target) {
        el.textContent = target + suffix;
        return;
      }
      el.textContent = Math.floor(current) + suffix;
      setTimeout(update, step);
    };
    update();
  };

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(c => counterObserver.observe(c));

  /* ──────────────────────────────────────────
     7. TIMELINE — staggered reveal
  ────────────────────────────────────────── */
  const timelineItems = document.querySelectorAll('.timeline-item');

  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Stagger the items
          const items = document.querySelectorAll('.timeline-item');
          items.forEach((item, i) => {
            setTimeout(() => {
              item.classList.add('visible');
            }, i * 150);
          });
          timelineObserver.disconnect();
        }
      });
    },
    { threshold: 0.2 }
  );

  if (timelineItems.length > 0) {
    timelineItems.forEach(item => item.classList.add('reveal'));
    timelineObserver.observe(timelineItems[0]);
  }

  /* ──────────────────────────────────────────
     8. MÓDULO CARDS — staggered reveal
  ────────────────────────────────────────── */
  const moduloCards = document.querySelectorAll('.modulo-card');
  moduloCards.forEach((card, i) => {
    card.classList.add('reveal');
    card.style.transitionDelay = `${i * 0.08}s`;
  });

  /* ──────────────────────────────────────────
     9. FORMULARIO — feedback visual
  ────────────────────────────────────────── */
  const form = document.querySelector('.contact-form-el');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const original = btn.textContent;

      btn.textContent = '✓ Mensaje enviado';
      btn.style.background = '#25D366';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 3000);
    });
  }

  /* ──────────────────────────────────────────
     10. ACTIVE NAV LINK — highlight en scroll
  ────────────────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const highlightNav = () => {
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(a => a.classList.remove('active-link'));
        const active = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (active) active.classList.add('active-link');
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });

  /* ──────────────────────────────────────────
     11. HOVER LIFT — café cards
  ────────────────────────────────────────── */
  document.querySelectorAll('.cafe-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.willChange = 'transform';
    });
    card.addEventListener('mouseleave', () => {
      card.style.willChange = 'auto';
    });
  });

});

/* ──────────────────────────────────────────
   12. Reduced motion support
────────────────────────────────────────── */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.reveal').forEach(el => {
    el.classList.add('visible');
  });
}

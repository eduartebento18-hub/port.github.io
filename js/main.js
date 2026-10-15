(() => {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav-links');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu');
    }));
  }
  const year = document.getElementById('current-year');
  if (year) year.textContent = new Date().getFullYear();
  const backTop = document.getElementById('back-top');
  const updateBackTop = () => backTop?.classList.toggle('visible', window.scrollY > 450);
  window.addEventListener('scroll', updateBackTop, { passive: true });
  updateBackTop();
  const revealItems = document.querySelectorAll('.section-heading, .player-card, .status-message, .stat-box, .ability-card, .quest-card, .archive-intro, .timeline-entry, .contact-inner');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    revealItems.forEach(item => { item.classList.add('reveal'); observer.observe(item); });
  } else revealItems.forEach(item => item.classList.add('is-visible'));
})();

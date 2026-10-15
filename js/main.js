(() => {
  const btn = document.getElementById('menu-btn'), nav = document.getElementById('nav');
  const set = o => { nav.classList.toggle('open', o); btn.setAttribute('aria-expanded', String(o)); btn.setAttribute('aria-label', o ? 'Fechar menu' : 'Abrir menu'); };
  btn.addEventListener('click', () => set(!nav.classList.contains('open')));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => set(false)));
  document.getElementById('year').textContent = new Date().getFullYear();
  if (!('IntersectionObserver' in window)) return;
  document.documentElement.classList.add('js');
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .1 });
  document.querySelectorAll('.card,.val,.mini-card,.timeline li,.cta-panel').forEach(el => { el.classList.add('rv'); io.observe(el); });
  const links = [...nav.querySelectorAll('a[href^="#"]:not(.cta-sm)')];
  const so = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) links.forEach(l => l.classList.toggle('on', l.getAttribute('href') === '#' + e.target.id)); }), { rootMargin: '-45% 0px -50% 0px' });
  links.forEach(l => { const s = document.querySelector(l.getAttribute('href')); if (s) so.observe(s); });
})();

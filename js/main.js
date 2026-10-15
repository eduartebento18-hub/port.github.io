(() => {
  const btn = document.getElementById('menu-btn'), nav = document.getElementById('nav');
  const set = open => { nav.classList.toggle('open', open); btn.setAttribute('aria-expanded', String(open)); btn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu'); };
  btn.addEventListener('click', () => set(!nav.classList.contains('open')));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => set(false)));
  document.getElementById('year').textContent = new Date().getFullYear();
})();

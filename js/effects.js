(() => {
  const $ = s => document.querySelector(s);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Notificação de sistema (1x por sessão)
  const intro = $('#intro');
  if (intro) {
    let seen = false;
    try { seen = sessionStorage.getItem('intro') === '1'; } catch (e) {}
    if (seen || reduce) intro.remove();
    else {
      document.body.classList.add('locked');
      const end = () => { intro.classList.add('done'); document.body.classList.remove('locked'); try { sessionStorage.setItem('intro', '1'); } catch (e) {} };
      const lines = [...intro.querySelectorAll('[data-line]')];
      let i = 0, ended = false;
      const next = () => {
        if (ended) return;
        if (i >= lines.length) { setTimeout(end, 900); return; }
        const el = lines[i++], txt = el.dataset.line; let c = 0;
        lines.forEach(l => l.classList.remove('on')); el.classList.add('on'); el.textContent = '';
        const t = setInterval(() => { el.textContent = txt.slice(0, ++c); if (c >= txt.length) { clearInterval(t); el.classList.remove('on'); el.classList.add('on'); setTimeout(next, 380); } }, 24);
      };
      intro.addEventListener('click', () => { ended = true; end(); });
      next();
    }
  }

  // Brasas roxas subindo
  const cv = $('#embers');
  if (cv && !reduce) {
    const x = cv.getContext('2d'); let w, h; const P = [];
    const size = () => { w = cv.width = innerWidth; h = cv.height = innerHeight; };
    const mk = () => ({ x: Math.random() * w, y: h + 10, r: Math.random() * 1.8 + .4, v: Math.random() * .6 + .2, a: Math.random() * .5 + .2 });
    size(); addEventListener('resize', size);
    for (let i = 0; i < Math.min(70, w / 18); i++) { const p = mk(); p.y = Math.random() * h; P.push(p); }
    (function loop() {
      x.clearRect(0, 0, w, h); x.shadowBlur = 8; x.shadowColor = '#a66bff';
      for (const p of P) {
        p.y -= p.v; p.x += Math.sin(p.y / 60) * .3;
        if (p.y < -10) Object.assign(p, mk());
        x.beginPath(); x.fillStyle = `rgba(190,140,255,${p.a})`; x.arc(p.x, p.y, p.r, 0, 6.283); x.fill();
      }
      requestAnimationFrame(loop);
    })();
  }

  // Aura no cursor
  const aura = $('#aura');
  if (aura && !reduce && matchMedia('(pointer:fine)').matches)
    addEventListener('pointermove', e => { aura.style.transform = `translate(${e.clientX}px,${e.clientY}px)`; aura.style.opacity = 1; }, { passive: true });

  // Barra de progresso de scroll
  const bar = $('#progress');
  const prog = () => { if (bar) bar.style.width = (scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight) * 100) + '%'; };
  addEventListener('scroll', prog, { passive: true }); prog();

  // Feixe de scan na foto
  const frame = $('.profile-frame');
  if (frame) { const b = document.createElement('i'); b.className = 'scan-beam'; frame.appendChild(b); }

  // ARISE
  const btn = $('#arise-btn'), arise = $('#arise');
  if (btn && arise) btn.addEventListener('click', () => {
    if (arise.classList.contains('go')) return;
    arise.classList.add('go'); document.body.classList.add('shake');
    setTimeout(() => { arise.classList.remove('go'); document.body.classList.remove('shake'); }, 2300);
  });
})();

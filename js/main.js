/* Interações acessíveis do portfólio */
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector("#menu-toggle");
  const links = document.querySelector("#nav-links");
  const backTop = document.querySelector("#back-top");
  const year = document.querySelector("#current-year");
  if (year) year.textContent = new Date().getFullYear();

  const closeMenu = () => {
    if (!toggle || !links) return;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
    links.classList.remove("open");
  };
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      links.classList.toggle("open", open);
    });
    links.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") { closeMenu(); toggle.focus(); }
    });
    window.addEventListener("resize", () => { if (window.innerWidth > 760) closeMenu(); });
  }

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });
    revealItems.forEach(item => observer.observe(item));
  } else revealItems.forEach(item => item.classList.add("is-visible"));

  const updateBackTop = () => {
    if (backTop) backTop.classList.toggle("visible", window.scrollY > 450);
  };
  window.addEventListener("scroll", updateBackTop, { passive: true });
  updateBackTop();
  document.querySelectorAll('a[target="_blank"]').forEach(link => link.setAttribute("rel", "noopener noreferrer"));
});

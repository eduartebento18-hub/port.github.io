/**
 * Eduarte Calixto — Portfolio
 * JavaScript moderno e sem dependências externas.
 */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* =========================================================
       Elementos principais
    ========================================================== */

    const menuToggle = document.querySelector("#menu-toggle");
    const menu = document.querySelector("#menu");
    const menuOpenIcon = document.querySelector("#menu-open-icon");
    const menuCloseIcon = document.querySelector("#menu-close-icon");

    const backToTop = document.querySelector("#back-to-top");
    const currentYear = document.querySelector("#current-year");

    const navigationLinks = document.querySelectorAll(
        '#menu a[href^="#"]'
    );

    const revealElements = document.querySelectorAll(".reveal");

    /* =========================================================
       Ano automático do footer
    ========================================================== */

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    /* =========================================================
       Menu mobile
    ========================================================== */

    const setMenuState = (isOpen) => {
        if (!menu || !menuToggle) {
            return;
        }

        menu.classList.toggle("hidden", !isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Fechar menu" : "Abrir menu"
        );

        if (menuOpenIcon) {
            menuOpenIcon.classList.toggle("hidden", isOpen);
        }

        if (menuCloseIcon) {
            menuCloseIcon.classList.toggle("hidden", !isOpen);
        }
    };

    if (menuToggle && menu) {
        menuToggle.addEventListener("click", () => {
            const isOpen =
                menuToggle.getAttribute("aria-expanded") === "true";

            setMenuState(!isOpen);
        });
    }

    /* Fechar menu após selecionar uma seção */

    navigationLinks.forEach((link) => {
        link.addEventListener("click", () => {
            setMenuState(false);
        });
    });

    /* Fechar menu com Escape */

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            setMenuState(false);

            if (menuToggle) {
                menuToggle.focus();
            }
        }
    });

    /* Fechar menu quando a tela voltar para desktop */

    window.addEventListener("resize", () => {
        if (window.innerWidth >= 768) {
            setMenuState(false);
        }
    });

    /* =========================================================
       Scroll reveal
    ========================================================== */

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    } else {
        /* Fallback para navegadores sem IntersectionObserver */
        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });
    }

    /* =========================================================
       Botão voltar ao topo
    ========================================================== */

    const updateBackToTop = () => {
        if (!backToTop) {
            return;
        }

        const shouldShow = window.scrollY > 500;

        backToTop.classList.toggle(
            "is-visible",
            shouldShow
        );
    };

    if (backToTop) {
        window.addEventListener(
            "scroll",
            updateBackToTop,
            { passive: true }
        );

        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });

        updateBackToTop();
    }

    /* =========================================================
       Links externos — segurança adicional
    ========================================================== */

    const externalLinks = document.querySelectorAll(
        'a[target="_blank"]'
    );

    externalLinks.forEach((link) => {
        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );
    });
});
/* ===================================
   SCROLL.JS — Smooth scroll com Lenis
   Integra com o ScrollTrigger do GSAP
   para que as animações de scroll sigam
   o scroll suavizado.
   =================================== */

// Expõe globalmente para outros scripts usarem
window.lenis = null;

(function () {
    // Verifica se Lenis carregou
    if (typeof Lenis === 'undefined') {
        console.warn('Lenis não carregou — usando scroll nativo.');
        return;
    }

    const lenis = new Lenis({
        duration: 1.4,          // tempo até "parar" o momentum
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
        smoothWheel: true,
        smoothTouch: false,     // touch nativo é melhor no mobile
        touchMultiplier: 2,
    });

    window.lenis = lenis;

    // ===== Integração com GSAP ScrollTrigger =====
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        // Cada update do Lenis dispara um update do ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        // GSAP ticker controla o RAF do Lenis (sincronizado)
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);
    } else {
        // Fallback: RAF próprio
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }

    // ===== Scroll suave para links âncora =====
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                lenis.scrollTo(target, {
                    offset: -80, // compensa altura do nav
                    duration: 1.6,
                });
            }
        });
    });
})();

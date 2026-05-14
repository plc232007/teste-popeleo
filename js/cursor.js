/* ===================================
   CURSOR.JS — Cursor customizado
   Dois elementos: dot (preciso) e ring
   (segue com delay/lerp para efeito sedoso).
   =================================== */

(function () {
    // Desabilita em dispositivos touch
    if (window.matchMedia('(hover: none)').matches) return;

    const cursor = document.getElementById('cursor');
    const dot = cursor.querySelector('.cursor__dot');
    const ring = cursor.querySelector('.cursor__ring');

    // Posições do mouse e do ring (separadas para criar delay)
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let dotX = 0, dotY = 0;

    // Captura posição do mouse
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Loop de animação — lerp (interpolação linear)
    function animate() {
        // dot segue rapidinho (lerp 0.6)
        dotX += (mouseX - dotX) * 0.6;
        dotY += (mouseY - dotY) * 0.6;
        dot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;

        // ring segue com mais delay (lerp 0.15) — efeito de "perseguir"
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;

        requestAnimationFrame(animate);
    }
    animate();

    // ===== HOVER EM ELEMENTOS INTERATIVOS =====
    const interactive = 'a, button, [data-link], .about__cta, .timeline__item';

    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(interactive)) {
            cursor.classList.add('cursor--hover');
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(interactive)) {
            cursor.classList.remove('cursor--hover');
        }
    });

    // Esconde cursor quando sai da janela
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
})();

/* ===================================
   LOADER.JS — Tela de carregamento
   Simula um progresso de 0 a 100% e
   esconde o loader quando completa.
   =================================== */

(function () {
    const loader = document.getElementById('loader');
    const percentEl = document.getElementById('loader-percent');
    const barEl = document.getElementById('loader-bar');

    let progress = 0;
    const duration = 1800; // 1.8s total
    const startTime = performance.now();

    function tick(now) {
        const elapsed = now - startTime;
        // easing easeOutQuart — começa rápido, desacelera no fim
        const t = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - t, 4);
        progress = Math.floor(eased * 100);

        percentEl.textContent = progress;
        barEl.style.width = progress + '%';

        if (t < 1) {
            requestAnimationFrame(tick);
        } else {
            // Espera 300ms no 100% antes de esconder
            setTimeout(hideLoader, 300);
        }
    }

    function hideLoader() {
        loader.classList.add('loader--hidden');

        // Dispara evento custom que outros scripts podem ouvir
        document.dispatchEvent(new CustomEvent('loaderDone'));

        // Remove o loader do DOM depois da animação
        setTimeout(() => {
            loader.style.display = 'none';
        }, 1400);
    }

    // Inicia quando a página estiver totalmente carregada
    window.addEventListener('load', () => {
        requestAnimationFrame(tick);
    });

    // Fallback: se em 5s o load não disparou, força o início
    setTimeout(() => {
        if (progress === 0) requestAnimationFrame(tick);
    }, 5000);
})();

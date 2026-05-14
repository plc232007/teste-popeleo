(function () {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion && typeof gsap !== 'undefined') {
        gsap.globalTimeline.timeScale(3);
    }

    function setupHeroCanvas() {
        const canvas = document.getElementById('hero-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let w = 0;
        let h = 0;
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        function resize() {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const rect = canvas.getBoundingClientRect();

            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;

            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(dpr, dpr);

            w = rect.width;
            h = rect.height;

            targetX = w / 2;
            targetY = h / 2;
        }

        window.addEventListener('resize', resize);
        resize();

        window.addEventListener('mousemove', (event) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = event.clientX - rect.left;
            mouseY = event.clientY - rect.top;
        });

        function draw(time) {
            targetX += (mouseX - targetX) * 0.04;
            targetY += (mouseY - targetY) * 0.04;

            ctx.clearRect(0, 0, w, h);

            const slow = time * 0.0002;
            const pulse = (Math.sin(slow) + 1) * 0.5;
            const haloX = w * 0.5 + Math.cos(slow * 0.9) * w * 0.04;
            const haloY = h * 0.42 + Math.sin(slow * 1.2) * h * 0.02;

            const base = ctx.createLinearGradient(0, 0, 0, h);
            base.addColorStop(0, 'rgba(140, 39, 48, 0.18)');
            base.addColorStop(0.45, 'rgba(20, 13, 11, 0)');
            base.addColorStop(1, 'rgba(20, 13, 11, 0.35)');
            ctx.fillStyle = base;
            ctx.fillRect(0, 0, w, h);

            const haloRadius = Math.max(w, h) * (0.24 + pulse * 0.05);
            const halo = ctx.createRadialGradient(haloX, haloY, 0, haloX, haloY, haloRadius);
            halo.addColorStop(0, 'rgba(236, 211, 152, 0.22)');
            halo.addColorStop(0.35, 'rgba(199, 163, 91, 0.12)');
            halo.addColorStop(1, 'rgba(20, 13, 11, 0)');
            ctx.fillStyle = halo;
            ctx.fillRect(0, 0, w, h);

            const cursorRadius = Math.max(w, h) * 0.45;
            const cursorGlow = ctx.createRadialGradient(
                targetX,
                targetY,
                0,
                targetX,
                targetY,
                cursorRadius
            );
            cursorGlow.addColorStop(0, 'rgba(199, 163, 91, 0.16)');
            cursorGlow.addColorStop(0.35, 'rgba(107, 31, 34, 0.11)');
            cursorGlow.addColorStop(1, 'rgba(20, 13, 11, 0)');
            ctx.fillStyle = cursorGlow;
            ctx.fillRect(0, 0, w, h);

            requestAnimationFrame(draw);
        }

        requestAnimationFrame(draw);
    }

    setupHeroCanvas();

    const yearEl = document.querySelector('[data-year]');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    console.log(
        '%cLeo XIV - Exposicao Sacra',
        'color: #c7a35b; font-size: 16px; font-family: serif;'
    );
    console.log(
        '%cHTML, CSS, JS, GSAP, Lenis.',
        'color: #c9b89b; font-size: 12px;'
    );

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh();
            }
        }, 200);
    });
})();

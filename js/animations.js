(function () {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP or ScrollTrigger not available.');
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    function animateHero() {
        const tl = gsap.timeline({
            defaults: { ease: 'expo.out', duration: 1.2 },
        });

        tl.to('.hero__word', {
            y: 0,
            stagger: 0.15,
        })
        .from('.hero__meta > span', {
            y: 18,
            opacity: 0,
            stagger: 0.08,
            duration: 0.7,
        }, '-=0.9')
        .from('.hero__eyebrow', {
            y: 18,
            opacity: 0,
            duration: 0.7,
        }, '-=0.7')
        .from('.hero__lead', {
            y: 26,
            opacity: 0,
            duration: 0.85,
        }, '-=0.7')
        .from('.hero__actions a', {
            y: 18,
            opacity: 0,
            stagger: 0.1,
            duration: 0.75,
        }, '-=0.6')
        .from('.hero__facts li', {
            y: 18,
            opacity: 0,
            stagger: 0.08,
            duration: 0.75,
        }, '-=0.55')
        .from('.hero__footer', {
            y: 20,
            opacity: 0,
            duration: 0.8,
        }, '-=0.55')
        .from('.nav', {
            y: -24,
            opacity: 0,
            duration: 0.8,
        }, '-=1.05');
    }

    function navScroll() {
        const nav = document.getElementById('nav');
        if (!nav) return;

        ScrollTrigger.create({
            start: 'top -50',
            end: 99999,
            onUpdate: (self) => {
                nav.classList.toggle('nav--scrolled', self.scroll() > 50);
            },
        });
    }

    function splitTexts() {
        if (typeof SplitType === 'undefined') return;

        document.querySelectorAll('[data-split]').forEach((el) => {
            const split = new SplitType(el, { types: 'words, chars' });

            gsap.from(split.words, {
                y: '100%',
                opacity: 0,
                duration: 1,
                ease: 'expo.out',
                stagger: 0.035,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            });
        });
    }

    function fadeUpSections() {
        const targets = [
            '.prologue__panel p',
            '.prologue__links a',
            '.prologue__fact',
            '.stats__item',
            '.exhibit__card',
            '.insignia__art',
            '.insignia__copy > *',
            '.timeline__item',
            '.quote__panel > *',
            '.library__card',
            '.footer__grid > div',
            '.footer__credits',
        ];

        targets.forEach((selector) => {
            gsap.utils.toArray(selector).forEach((el) => {
                gsap.fromTo(
                    el,
                    { y: 36, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.1,
                        ease: 'expo.out',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 86%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            });
        });
    }

    function animateStats() {
        gsap.utils.toArray('.stats__number').forEach((el) => {
            const fullText = el.textContent;
            const target = parseInt(fullText.replace(/\D/g, ''), 10);
            if (Number.isNaN(target)) return;

            const suffix = el.innerHTML.includes('<sup>') ? '<sup>&ordm;</sup>' : '';
            const obj = { val: 0 };

            gsap.to(obj, {
                val: target,
                duration: 2,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 88%',
                    toggleActions: 'play none none reverse',
                },
                onUpdate: () => {
                    el.innerHTML = Math.floor(obj.val) + suffix;
                },
            });
        });
    }

    function heroParallax() {
        gsap.to('.hero__title', {
            yPercent: 24,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
            },
        });

        gsap.to('.hero__content', {
            yPercent: -10,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
            },
        });
    }

    function popeInteractiveImages() {
        const frames = gsap.utils.toArray('.pope-float');
        if (!frames.length) return;

        gsap.from(frames, {
            y: 64,
            opacity: 0,
            scale: 0.94,
            duration: 1.35,
            ease: 'expo.out',
            stagger: 0.1,
            delay: 0.2,
        });

        frames.forEach((frame) => {
            const speedValue = Number(frame.dataset.speed);
            const speed = Number.isFinite(speedValue) ? speedValue : 18;

            gsap.to(frame, {
                yPercent: speed,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1,
                },
            });
        });

        if (window.matchMedia('(hover: none)').matches) return;

        const movers = frames.map((frame) => {
            const inner = frame.querySelector('.pope-float__inner') || frame;
            const depthValue = Number(frame.dataset.depth);
            const rotateValue = Number(frame.dataset.rotate);
            const depth = Number.isFinite(depthValue) ? depthValue : 20;
            const rotate = Number.isFinite(rotateValue) ? rotateValue : 5;

            return {
                depth,
                rotate,
                x: gsap.quickTo(inner, 'x', { duration: 0.8, ease: 'expo.out' }),
                y: gsap.quickTo(inner, 'y', { duration: 0.8, ease: 'expo.out' }),
                rotation: gsap.quickTo(inner, 'rotation', { duration: 0.8, ease: 'expo.out' }),
            };
        });

        window.addEventListener('mousemove', (event) => {
            const x = (event.clientX / window.innerWidth - 0.5) * 2;
            const y = (event.clientY / window.innerHeight - 0.5) * 2;

            movers.forEach((mover) => {
                mover.x(x * mover.depth);
                mover.y(y * mover.depth * 0.55);
                mover.rotation(x * mover.rotate);
            });
        });
    }

    function parallaxMedia() {
        gsap.utils.toArray('[data-parallax]').forEach((el) => {
            const amount = Number(el.dataset.parallax) || 10;

            gsap.to(el, {
                yPercent: amount,
                ease: 'none',
                scrollTrigger: {
                    trigger: el,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                },
            });
        });

        gsap.utils.toArray('.exhibit__media img').forEach((img) => {
            gsap.fromTo(
                img,
                { scale: 1.12 },
                {
                    scale: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: img,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1,
                    },
                }
            );
        });
    }

    function footerTitle() {
        gsap.from('.footer__title', {
            y: 90,
            opacity: 0,
            duration: 1.5,
            ease: 'expo.out',
            scrollTrigger: {
                trigger: '.footer',
                start: 'top 80%',
            },
        });
    }

    function init() {
        navScroll();
        splitTexts();
        fadeUpSections();
        animateStats();
        heroParallax();
        popeInteractiveImages();
        parallaxMedia();
        footerTitle();
    }

    function startExperience() {
        if (document.body.dataset.animated) return;
        document.body.dataset.animated = 'true';

        animateHero();
        init();
        setTimeout(() => ScrollTrigger.refresh(), 240);
    }

    document.addEventListener('loaderDone', startExperience);
    setTimeout(startExperience, 3000);
})();

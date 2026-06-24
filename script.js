/* ═══════════════════════════════════════
   PORTFOLIO — script.js
   Salah Eddine Ghar
═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    // ─── NAVBAR: scroll shadow + active link ────────────────────────────
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');

    function onScroll() {
        // Navbar shadow
        navbar.classList.toggle('scrolled', window.scrollY > 40);

        // Active nav link
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 110;
            if (window.scrollY >= top) current = section.id;
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();


    // ─── HAMBURGER MENU ─────────────────────────────────────────────────
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    hamburger?.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', isOpen);
        // Animate bars
        const bars = hamburger.querySelectorAll('span');
        if (isOpen) {
            bars[0].style.transform = 'translateY(7px) rotate(45deg)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
        } else {
            bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
        }
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            const bars = hamburger.querySelectorAll('span');
            bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
        });
    });


    // ─── SMOOTH SCROLL ──────────────────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });


    // ─── REVEAL ON SCROLL ───────────────────────────────────────────────
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Stagger siblings
                const siblings = entry.target.parentElement.querySelectorAll('.reveal-up');
                let delay = 0;
                siblings.forEach(sib => {
                    if (sib === entry.target) {
                        sib.style.transitionDelay = `${delay * 80}ms`;
                        sib.classList.add('visible');
                    }
                    delay++;
                });
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));


    // ─── ANIMATED COUNTER ───────────────────────────────────────────────
    function animateCounter(el) {
        const target = parseInt(el.dataset.target, 10);
        const duration = 1400;
        const start = performance.now();

        function step(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = target;
        }
        requestAnimationFrame(step);
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.stat-n[data-target]').forEach(animateCounter);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) counterObserver.observe(heroStats);


    // ─── EXPAND / COLLAPSE PROJECT DETAILS ──────────────────────────────
    document.querySelectorAll('.expand-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.target;
            const panel = document.getElementById(targetId);
            if (!panel) return;

            const isOpen = panel.classList.toggle('open');
            btn.classList.toggle('open', isOpen);
            btn.querySelector('.expand-text').textContent = isOpen ? 'Masquer les détails' : 'Voir les détails';

            // Scroll into view smoothly when opening
            if (isOpen) {
                setTimeout(() => {
                    const articleTop = btn.closest('.project-item').getBoundingClientRect().top
                        + window.scrollY - 100;
                    window.scrollTo({ top: articleTop, behavior: 'smooth' });
                }, 150);
            }
        });
    });


    // ─── TIMELINE HOVER: highlight dot ──────────────────────────────────
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            const dot = item.querySelector('.tl-dot');
            if (dot && !dot.classList.contains('tl-dot--active')) {
                dot.style.borderColor = 'var(--accent)';
                dot.style.background = 'var(--accent-muted)';
            }
        });
        item.addEventListener('mouseleave', () => {
            const dot = item.querySelector('.tl-dot');
            if (dot && !dot.classList.contains('tl-dot--active')) {
                dot.style.borderColor = '';
                dot.style.background = '';
            }
        });
    });


    // ─── LANGUAGE BARS: animate on scroll ───────────────────────────────
    const langFills = document.querySelectorAll('.lang-fill');
    langFills.forEach(fill => fill.style.width = '0');

    const langObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            langFills.forEach(fill => {
                const targetWidth = fill.style.width || fill.getAttribute('style').match(/width:\s*(\S+)/)?.[1];
                fill.style.width = fill.dataset.width || targetWidth;
            });
            langObserver.disconnect();
        }
    }, { threshold: 0.3 });

    // Store original widths as data attr
    langFills.forEach(fill => {
        const match = fill.getAttribute('style')?.match(/width:\s*(\d+%)/);
        if (match) fill.dataset.width = match[1];
        fill.style.width = '0';
    });

    const skillsSection = document.getElementById('skills');
    if (skillsSection) langObserver.observe(skillsSection);


    // ─── SKILL PILLS: wave effect on hover over container ───────────────
    document.querySelectorAll('.skill-block').forEach(block => {
        const pills = block.querySelectorAll('.pill');
        block.addEventListener('mouseenter', () => {
            pills.forEach((pill, i) => {
                setTimeout(() => {
                    pill.style.transform = 'translateY(-2px)';
                    setTimeout(() => { pill.style.transform = ''; }, 200);
                }, i * 40);
            });
        });
    });


    // ─── COPY EMAIL ON CLICK (contact) ──────────────────────────────────
    const emailRow = document.querySelector('a[href^="mailto:"].contact-row');
    if (emailRow) {
        emailRow.addEventListener('click', (e) => {
            // Let native mailto open, but also show a brief copy indicator
            const val = emailRow.querySelector('.c-value');
            if (!val) return;
            const original = val.textContent;
            navigator.clipboard?.writeText('gharsalah140@gmail.com').then(() => {
                val.textContent = 'Copié ! ✓';
                setTimeout(() => { val.textContent = original; }, 1800);
            }).catch(() => {}); // fallback: let mailto open normally
        });
    }


    // ─── FOOTER YEAR ────────────────────────────────────────────────────
    const yearEl = document.querySelector('.footer-copy');
    if (yearEl) {
        yearEl.textContent = yearEl.textContent.replace('2025', new Date().getFullYear());
    }

});
